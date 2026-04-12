"use client";

import { useState } from "react";
import { PUBLISHED_RSVP_PALETTES } from "./template-rsvp-palettes";

export default function PublishedRsvpBlock({
  invitationId,
  rsvpFields,
  palette,
  titleFontClassName,
  t,
}: {
  invitationId: string;
  rsvpFields: any[];
  palette: keyof typeof PUBLISHED_RSVP_PALETTES;
  titleFontClassName: string;
  t: Record<string, { text?: string } | undefined>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ui = PUBLISHED_RSVP_PALETTES[palette];

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const fields: Record<string, unknown> = {};
    rsvpFields.forEach((f) => {
      fields[f.id] = f.type === "checkbox" ? formData.get(f.id) === "on" : formData.get(f.id);
    });
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId, fields, fieldDefs: rsvpFields }),
      });
      const r = await res.json();
      if (r.error) alert("Error submitting RSVP: " + r.error);
      else setSubmitted(true);
    } catch {
      alert("Failed to submit RSVP. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={ui.card}>
      <p className={`${titleFontClassName} text-sm font-bold tracking-[0.2em] uppercase mb-6 text-center block w-full`}>{t["rsvp-title"]?.text || "RSVP"}</p>

      {submitted ? (
        <div className="text-center py-8">
          <p className="text-2xl mb-3">🎉</p>
          <p className={`${titleFontClassName} ${ui.thankYouTitle}`}>Thank you!</p>
          <p className={ui.thankYouSub}>Your RSVP has been received.</p>
        </div>
      ) : (
        <form onSubmit={handleRsvpSubmit} className="flex flex-col gap-4">
          {rsvpFields.map((f: any) =>
            f.type === "checkbox" ? (
              <label key={f.id} className="flex items-center gap-3 mt-2 cursor-pointer group">
                <input type="checkbox" name={f.id} required={f.required} className="w-4 h-4 rounded accent-current" />
                <span className={ui.label}>
                  {f.label} {f.required && <span className="text-rose-500">*</span>}
                </span>
              </label>
            ) : (
              <input key={f.id} type={f.type} name={f.id} required={f.required} placeholder={`${f.label}${f.required ? " *" : ""}`} className={ui.input} />
            )
          )}
          <button type="submit" disabled={isSubmitting} className={ui.btn}>
            {isSubmitting ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : t["btn-rsvp"]?.text || "Send RSVP"}
          </button>
        </form>
      )}
    </div>
  );
}
