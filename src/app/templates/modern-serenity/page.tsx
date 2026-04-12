"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Playfair_Display, Montserrat } from "next/font/google";
import EditorShell from "@/components/editor/EditorShell";
import { useEditor } from "@/components/editor/EditorContext";
import { EditableText } from "@/components/editor/EditableText";

const playfair = Playfair_Display({ subsets: ["latin"] });
const montserrat = Montserrat({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

const DEFAULT_MEDIA = {
  heroImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000",
  storyImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000",
};

const DEFAULT_RSVP = [
  { id: "f1", type: "text", label: "Your Full Name", required: true },
  { id: "f2", type: "email", label: "Your Email Address", required: true },
  { id: "f3", type: "text", label: "Dietary Restrictions", required: false },
  { id: "f4", type: "checkbox", label: "Joyfully Attending!", required: false },
];

// ─── RSVP form integrated with the live published API ─────────────────────
function ModernSerenityRsvp({ invitationId }: { invitationId?: string }) {
  const { isEditing, rsvpFields } = useEditor();

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4">
        {rsvpFields.map((f) =>
          f.type === "checkbox" ? (
            <div key={f.id} className="flex items-center gap-3 mt-2 pointer-events-none">
              <input type="checkbox" readOnly className="w-4 h-4 rounded border-slate-300" />
              <span className="text-sm text-slate-600">{f.label} {f.required && <span className="text-rose-500">*</span>}</span>
            </div>
          ) : (
            <div key={f.id} className="pointer-events-none">
              <input type={f.type} placeholder={`${f.label}${f.required ? " *" : ""}`} readOnly className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400" />
            </div>
          )
        )}
        <div className="w-full bg-slate-900 rounded-xl flex items-center justify-center h-12 mt-2">
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
        const fields: Record<string, any> = {};
        rsvpFields.forEach((f) => {
          if (f.type === "checkbox") {
            fields[f.id] = formData.get(f.id) === "on";
          } else {
            fields[f.id] = formData.get(f.id);
          }
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
            <input type="checkbox" name={f.id} required={f.required} className="w-4 h-4 rounded text-slate-900 border-slate-300" />
            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{f.label} {f.required && <span className="text-rose-500">*</span>}</span>
          </label>
        ) : (
          <input key={f.id} type={f.type} name={f.id} required={f.required} placeholder={`${f.label}${f.required ? " *" : ""}`} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-slate-400" />
        )
      )}
      <button type="submit" className="w-full py-4 mt-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg hover:-translate-y-0.5">
        Send RSVP
      </button>
    </form>
  );
}

// ─── TEMPLATE PREVIEW (consumes EditorContext) ─────────────────────────────
function ModernSerenityPreview() {
  const { isEditing, media, scrollY, showRsvp } = useEditor();

  return (
    <div className={`relative min-h-screen ${montserrat.className} bg-white text-slate-800`}>

      {/* ─── HERO ─── */}
      <section className="relative w-full min-h-[100svh] overflow-hidden flex flex-col items-center justify-end">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${media.heroImage}')`,
            transform: `translateY(${scrollY * 0.3}px) scale(1.08)`,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

        {/* Name content */}
        <div
          className="relative z-20 text-center text-white pb-16 sm:pb-24 px-4 flex flex-col items-center w-full"
          style={{ transform: `translateY(${scrollY * -0.08}px)` }}
        >
          {/* Couple names — large on desktop, comfortable on mobile */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mb-3">
            <EditableText
              id="p1"
              defaultText="Sophia"
              isEditing={isEditing}
              className={`${playfair.className} text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight leading-none drop-shadow-2xl`}
            />
            <EditableText
              id="amp"
              defaultText="&"
              isEditing={isEditing}
              className="text-3xl sm:text-4xl italic font-light opacity-70 mx-1"
            />
            <EditableText
              id="p2"
              defaultText="Jackson"
              isEditing={isEditing}
              className={`${playfair.className} text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight leading-none drop-shadow-2xl`}
            />
          </div>

          <EditableText
            id="hero-subtitle"
            defaultText="Are getting married"
            isEditing={isEditing}
            className="text-xs sm:text-sm tracking-[0.35em] uppercase font-medium opacity-80"
          />

          {/* Scroll cue */}
          <div className="mt-10 sm:mt-16 flex flex-col items-center gap-2 animate-bounce opacity-40">
            <div className="w-px h-8 bg-white" />
            <span className="text-xs uppercase tracking-widest">Scroll</span>
          </div>
        </div>
      </section>

      {/* ─── DETAILS ─── */}
      <section className="relative z-30 bg-white py-16 sm:py-24 px-6 shadow-2xl flex flex-col items-center">
        <div className="w-px h-16 bg-slate-200 mx-auto mb-10" />
        <EditableText
          id="details-title"
          defaultText="The Details"
          isEditing={isEditing}
          className={`${playfair.className} text-3xl sm:text-5xl text-slate-900 mb-10 sm:mb-16 text-center`}
        />
        <div className="grid grid-cols-2 gap-6 sm:gap-16 text-center max-w-lg sm:max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-3 sm:mb-6 opacity-40">✨</span>
            <EditableText id="lbl-when" defaultText="When" isEditing={isEditing} className="text-[10px] sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-400 mb-2 sm:mb-3" />
            <EditableText id="date" defaultText="October 14, 2026" isEditing={isEditing} className={`${playfair.className} text-base sm:text-2xl text-slate-800`} />
            <EditableText id="time" defaultText="5:00 PM" isEditing={isEditing} className="text-slate-500 mt-1 sm:mt-2 text-sm" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl mb-3 sm:mb-6 opacity-40">🥂</span>
            <EditableText id="lbl-where" defaultText="Where" isEditing={isEditing} className="text-[10px] sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-400 mb-2 sm:mb-3" />
            <EditableText id="venue" defaultText="The Glass Sanctuary" isEditing={isEditing} className={`${playfair.className} text-base sm:text-2xl text-slate-800`} />
            <EditableText id="address" defaultText="Downtown Bay Area" isEditing={isEditing} className="text-slate-500 mt-1 sm:mt-2 text-sm" />
          </div>
        </div>
      </section>

      {/* ─── STORY + RSVP ─── */}
      <section className={`w-full flex flex-col-reverse items-stretch bg-slate-50 relative z-20 ${showRsvp ? "md:flex-row" : ""}`}>
        {/* Content: story text + RSVP form */}
        <div
          className={`px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-24 flex flex-col justify-center items-start ${showRsvp ? "w-full md:w-1/2" : "w-full max-w-3xl mx-auto"}`}
        >
          <EditableText
            id="story-title"
            defaultText="Join us."
            isEditing={isEditing}
            className={`${playfair.className} text-3xl sm:text-5xl text-slate-900 mb-4 sm:mb-8`}
          />
          <EditableText
            id="story-desc"
            defaultText="We couldn't be more excited to share this incredible milestone with our closest friends and family. Please join us for an evening of dinner, dancing, and celebration under the stars."
            isEditing={isEditing}
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-light mb-8 sm:mb-12 text-left"
          />

          {showRsvp && (
            <div className="bg-white p-6 sm:p-8 border border-slate-100 shadow-xl rounded-2xl w-full max-w-none sm:max-w-sm pointer-events-auto">
              <EditableText
                id="rsvp-title"
                defaultText="Formal RSVP"
                isEditing={isEditing}
                className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-slate-900 mb-5 sm:mb-6 text-center block w-full"
              />
              <ModernSerenityRsvp />
            </div>
          )}
        </div>

        {/* Story image */}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : "md:w-full"} min-h-[40vh] sm:min-h-[55vh] md:min-h-full relative overflow-hidden pointer-events-none`}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${media.storyImage}')`,
              transform: `scale(1.1) translateY(${(scrollY - 600) * 0.1}px)`,
            }}
          />
          {/* Gradient for mobile blend */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent md:hidden" />
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-900 text-white py-16 sm:py-24 text-center z-30 relative flex flex-col items-center border-t-4 border-slate-800 px-6">
        <EditableText
          id="footer-names"
          defaultText="Sophia & Jackson"
          isEditing={isEditing}
          className={`${playfair.className} text-4xl sm:text-5xl italic mb-4 sm:mb-6 opacity-90`}
        />
        <EditableText
          id="footer-sub"
          defaultText="Can't wait to see you there!"
          isEditing={isEditing}
          className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-400"
        />
      </footer>

      {/* Watermark */}
      {!isEditing && (
        <a
          href="/"
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md shadow-lg border border-slate-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-slate-700 hover:bg-white transition-all group"
        >
          <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-serif group-hover:rotate-12 transition-transform">M</span>
          <span className="hidden sm:block">Made with MakeMyInvites</span>
        </a>
      )}
    </div>
  );
}

// ─── PAGE (wraps preview in the shared EditorShell) ───────────────────────
function TemplateContent() {
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("editSlug");

  return (
    <EditorShell
      templateSlug="modern-serenity"
      config={{ defaultMedia: DEFAULT_MEDIA, defaultRsvpFields: DEFAULT_RSVP }}
      editSlug={editSlug}
    >
      <ModernSerenityPreview />
    </EditorShell>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-slate-400 tracking-widest text-xs uppercase">Loading Experience…</div>}>
      <TemplateContent />
    </Suspense>
  );
}
