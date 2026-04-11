import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { invitationId, fields, fieldDefs } = await req.json();

    if (!invitationId) {
      return NextResponse.json({ error: "Missing invitationId" }, { status: 400 });
    }

    const supabase = await createClient();

    // Build human-readable responses: { "Your Full Name": "John", "Email": "john@..." }
    const responses: Record<string, any> = {};
    let guestName = "Guest";
    let guestEmail: string | null = null;

    if (fieldDefs && fields) {
      for (const def of fieldDefs) {
        const val = fields[def.id];
        responses[def.label] = val ?? null;

        // Smart extraction for core DB columns
        const lbl = def.label.toLowerCase();
        if (lbl.includes("name") && typeof val === "string" && val.trim()) {
          guestName = val.trim();
        }
        if ((lbl.includes("email") || lbl.includes("e-mail")) && typeof val === "string" && val.trim()) {
          guestEmail = val.trim();
        }
      }
    }

    const { error } = await supabase.from("rsvps").insert({
      invitation_id: invitationId,
      guest_name: guestName,
      guest_email: guestEmail,
      attending: true,
      dietary_requirements: JSON.stringify(responses),
      plus_ones: 0,
    });

    if (error) {
      console.error("RSVP insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("RSVP route error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
