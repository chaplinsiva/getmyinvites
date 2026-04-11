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
      return NextResponse.json({ error: "Unauthorized. Please login again." }, { status: 401 });
    }

    // 1. Get the actual UUID of the template based on its slug
    const { data: template, error: tmplError } = await fallbackTemplateLookup(supabase, templateId);
    
    if (tmplError || !template) {
       return NextResponse.json({ error: "Template not found in Database." }, { status: 404 });
    }

    // 2. Insert or Upsert the customization data!
    const { data: invitation, error } = await supabase
      .from("user_invitations")
      .insert({ 
        user_id: user.id,
        template_id: template.id,
        title: `${customDomain} Wedding`,
        customized_data: data,
        custom_domain: customDomain,
        status: 'published'
      })
      .select()
      .single();

    if (error) {
      // 23505 is PostgreSQL Unique Violation Error Code
      if (error.code === '23505') {
         return NextResponse.json({ error: "Custom domain already taken! Please choose another one." }, { status: 400 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, invitation });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function fallbackTemplateLookup(supabase: any, slug: string) {
  return await supabase
      .from("templates")
      .select("id")
      .eq("slug", slug)
      .single();
}
