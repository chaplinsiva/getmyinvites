import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// GET /api/invitation?slug=sophia-and-james
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ invitation: null });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: invitation } = await supabase
      .from("user_invitations")
      .select("*")
      .eq("custom_domain", slug)
      .eq("user_id", user.id)
      .single();

    return NextResponse.json({ invitation: invitation || null });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
