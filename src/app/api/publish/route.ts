import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { templateId, customDomain, data } = await req.json();

    if (!customDomain || !data) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please login." }, { status: 401 });
    }

    // Get the template UUID
    const { data: template, error: tmplError } = await supabase
      .from("templates")
      .select("id")
      .eq("slug", templateId)
      .single();

    if (tmplError || !template) {
      return NextResponse.json({ error: "Template not found in database." }, { status: 404 });
    }

    // Check if this user already has an invitation with this custom_domain
    const { data: existing } = await supabase
      .from("user_invitations")
      .select("id, user_id")
      .eq("custom_domain", customDomain)
      .single();

    if (existing) {
      // Domain exists — only allow update if it belongs to this user
      if (existing.user_id !== user.id) {
        return NextResponse.json(
          { error: "This URL is already taken by another user. Please choose a different name." },
          { status: 400 }
        );
      }

      // UPDATE existing invitation
      const { data: updated, error } = await supabase
        .from("user_invitations")
        .update({
          customized_data: data,
          status: "published",
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

      return NextResponse.json({ success: true, invitation: updated, action: "updated" });
    }

    // INSERT new invitation
    const { data: invitation, error } = await supabase
      .from("user_invitations")
      .insert({
        user_id: user.id,
        template_id: template.id,
        title: `${customDomain} Wedding`,
        customized_data: data,
        custom_domain: customDomain,
        status: "published",
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This URL is already taken. Please choose another name." },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, invitation, action: "created" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
