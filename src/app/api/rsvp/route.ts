import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { invitationId, fields } = await req.json();

    if (!invitationId || !fields) {
      return NextResponse.json({ error: "Missing invitationId or fields" }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase.from("rsvps").insert({
      invitation_id: invitationId,
      guest_name: fields.name || fields.guest_name || "Guest",
      guest_email: fields.email || fields.guest_email || null,
      attending: fields.attending !== false,
      dietary_requirements: fields.dietary || fields.dietary_requirements || null,
      plus_ones: parseInt(fields.plus_ones || "0", 10),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
