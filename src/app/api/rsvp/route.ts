import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { invitationId, fields, fieldDefs } = await req.json();

    if (!invitationId) {
      return NextResponse.json({ error: "Missing invitationId" }, { status: 400 });
    }

    const supabase = await createClient();

    // ─── Smart label-based mapping ───────────────────────────────────────────
    // fieldDefs = [{ id, label, type, required }, ...]
    // fields    = { [fieldId]: value, ... }
    // We find the field whose label contains common keywords and pull its value.

    function findByLabel(keywords: string[]): string | null {
      if (!fieldDefs) return null;
      const def = fieldDefs.find((f: any) =>
        keywords.some((kw) => f.label?.toLowerCase().includes(kw))
      );
      return def ? (fields?.[def.id] ?? null) : null;
    }

    const guestName =
      findByLabel(["name", "guest", "your name"]) || "Guest";

    const guestEmail =
      findByLabel(["email", "e-mail"]);

    const attendingRaw = findByLabel(["attending", "attend", "coming", "rsvp"]);
    let attending = true;
    if (attendingRaw !== null) {
      // Could be boolean (checkbox) or string like "yes"/"no"
      if (typeof attendingRaw === "boolean") attending = attendingRaw;
      else attending = !["no", "false", "0", "not attending"].includes(String(attendingRaw).toLowerCase());
    }

    const dietary = findByLabel(["dietary", "allerg", "food", "restriction"]);

    const plusOnesRaw = findByLabel(["plus", "guest", "additional", "extra"]);
    const plusOnes = plusOnesRaw ? parseInt(String(plusOnesRaw), 10) || 0 : 0;

    // ─── Build a human-readable responses object for display ─────────────────
    const responses: Record<string, any> = {};
    if (fieldDefs) {
      for (const def of fieldDefs) {
        responses[def.label] = fields?.[def.id] ?? null;
      }
    }

    const { error } = await supabase.from("rsvps").insert({
      invitation_id: invitationId,
      guest_name: guestName,
      guest_email: guestEmail || null,
      attending,
      dietary_requirements: dietary || null,
      plus_ones: isNaN(plusOnes) ? 0 : plusOnes,
      // Full named responses stored in the extra column for display
      // (Add a migration: ALTER TABLE rsvps ADD COLUMN IF NOT EXISTS responses JSONB)
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
