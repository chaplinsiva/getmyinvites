"use client";

import { useEditor } from "@/components/editor/EditorContext";
import { EDITOR_RSVP_PALETTES, type EditorRsvpPalette } from "./template-rsvp-palettes";

export function StandardEditorRsvp({
  invitationId,
  palette,
}: {
  invitationId?: string;
  palette: keyof typeof EDITOR_RSVP_PALETTES;
}) {
  const { isEditing, rsvpFields } = useEditor();
  const p: EditorRsvpPalette = EDITOR_RSVP_PALETTES[palette];

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4">
        {rsvpFields.map((f) =>
          f.type === "checkbox" ? (
            <div key={f.id} className={`flex items-center gap-3 mt-2 ${p.readonlyWrap}`}>
              <input type="checkbox" readOnly className={p.readonlyCheckbox} />
              <span className="text-sm opacity-80">
                {f.label} {f.required && <span className="text-rose-500">*</span>}
              </span>
            </div>
          ) : (
            <div key={f.id} className={p.readonlyWrap}>
              <input type={f.type} placeholder={`${f.label}${f.required ? " *" : ""}`} readOnly className={p.liveInput} />
            </div>
          )
        )}
        <div className={p.readonlyFakeBtn}>
          <span className="text-white text-xs font-bold uppercase tracking-widest">Send RSVP</span>
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const fields: Record<string, unknown> = {};
        rsvpFields.forEach((f) => {
          fields[f.id] = f.type === "checkbox" ? formData.get(f.id) === "on" : formData.get(f.id);
        });
        await fetch("/api/rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ invitationId, fields, fieldDefs: rsvpFields }),
        });
        alert("Thank you! Your RSVP has been submitted 🎉");
      }}
    >
      {rsvpFields.map((f) =>
        f.type === "checkbox" ? (
          <label key={f.id} className="flex items-center gap-3 mt-2 cursor-pointer group">
            <input type="checkbox" name={f.id} required={f.required} className={p.readonlyCheckbox} />
            <span className={p.liveCheckboxLabel}>
              {f.label} {f.required && <span className="text-rose-500">*</span>}
            </span>
          </label>
        ) : (
          <input
            key={f.id}
            type={f.type}
            name={f.id}
            required={f.required}
            placeholder={`${f.label}${f.required ? " *" : ""}`}
            className={p.liveInput}
          />
        )
      )}
      <button type="submit" className={p.liveBtn}>
        Send RSVP
      </button>
    </form>
  );
}
