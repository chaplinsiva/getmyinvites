"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EditorShell from "@/components/editor/EditorShell";
import { useEditor } from "@/components/editor/EditorContext";
import { EditableText } from "@/components/editor/EditableText";

// Google Fonts
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
const cormorant = Cormorant_Garamond({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });
const dmSans = DM_Sans({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

const DEFAULT_MEDIA = {
  heroImage: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&q=80&w=2000",
  storyImage: "https://images.unsplash.com/photo-1604604993810-b5228ce40f64?auto=format&fit=crop&q=80&w=2000",
};

const DEFAULT_RSVP = [
  { id: "f1", type: "text", label: "Your Full Name", required: true },
  { id: "f2", type: "email", label: "Email Address", required: true },
  { id: "f3", type: "number", label: "Number of Guests", required: true },
  { id: "f4", type: "text", label: "Dietary Preferences", required: false },
  { id: "f5", type: "checkbox", label: "Attending with pleasure!", required: false },
];

// ─── Decorative SVG Mandala ──────────────────────────────────────────────────
function MandalaDecor({ className = "", size = 300 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 200 200" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      {[...Array(12)].map((_, i) => (
        <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.3" opacity="0.12" transform={`rotate(${i * 15} 100 100)`} />
      ))}
      {[...Array(8)].map((_, i) => (
        <ellipse key={`e${i}`} cx="100" cy="40" rx="12" ry="25" stroke="currentColor" strokeWidth="0.4" opacity="0.18" transform={`rotate(${i * 45} 100 100)`} />
      ))}
    </svg>
  );
}

// ─── Gold Divider ────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8 sm:my-12">
      <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-400/60" />
      <span className="text-amber-400 text-xl opacity-70">✦</span>
      <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-400/60" />
    </div>
  );
}

// ─── RSVP form ───────────────────────────────────────────────────────────────
function RoyalMandalaRsvp({ invitationId }: { invitationId?: string }) {
  const { isEditing, rsvpFields } = useEditor();

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4">
        {rsvpFields.map((f) =>
          f.type === "checkbox" ? (
            <div key={f.id} className="flex items-center gap-3 mt-1 pointer-events-none">
              <input type="checkbox" readOnly className="w-4 h-4 rounded accent-amber-600" />
              <span className="text-sm text-amber-100/80">{f.label} {f.required && <span className="text-red-400">*</span>}</span>
            </div>
          ) : (
            <div key={f.id} className="pointer-events-none">
              <input type={f.type} placeholder={`${f.label}${f.required ? " *" : ""}`} readOnly className="w-full px-4 py-3 bg-white/5 border border-amber-400/30 rounded-lg text-sm placeholder:text-amber-200/40 text-white focus:outline-none" />
            </div>
          )
        )}
        <div className="w-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center h-12 mt-2">
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
          <label key={f.id} className="flex items-center gap-3 mt-1 cursor-pointer group">
            <input type="checkbox" name={f.id} required={f.required} className="w-4 h-4 rounded accent-amber-500" />
            <span className="text-sm text-amber-100/80 group-hover:text-amber-100 transition-colors">{f.label} {f.required && <span className="text-red-400">*</span>}</span>
          </label>
        ) : (
          <input key={f.id} type={f.type} name={f.id} required={f.required} placeholder={`${f.label}${f.required ? " *" : ""}`} className="w-full px-4 py-3 bg-white/5 border border-amber-400/30 rounded-lg text-sm text-white placeholder:text-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all" />
        )
      )}
      <button type="submit" className="w-full py-4 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/30 hover:-translate-y-0.5 active:translate-y-0">
        Send RSVP
      </button>
    </form>
  );
}

// ─── TEMPLATE PREVIEW ────────────────────────────────────────────────────────
function RoyalMandalaPreview() {
  const { isEditing, media, scrollY, showRsvp } = useEditor();

  return (
    <div className={`relative min-h-screen ${dmSans.className} text-white overflow-hidden`}>
      {/* Global background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#2D0A0A] via-[#4A0E0E] to-[#1A0505] -z-20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_60%_20%,_rgba(180,80,20,0.15),_transparent_70%)] -z-10" />

      {/* ─── HERO ─── */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background hero image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url('${media.heroImage}')`,
            transform: `scale(1.1) translateY(${scrollY * 0.2}px)`,
          }}
        />
        {/* Dark overlay with warm tint */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#2D0A0A]/70 via-[#4A0E0E]/60 to-[#2D0A0A]/90" />

        {/* Mandala decorations */}
        <MandalaDecor className="absolute top-[-80px] right-[-80px] sm:top-[-50px] sm:right-[-50px] text-amber-400/20 z-10 pointer-events-none" size={350} />
        <MandalaDecor className="absolute bottom-[-100px] left-[-100px] text-amber-400/15 z-10 pointer-events-none" size={400} />

        {/* Content */}
        <div className="relative z-20 text-center px-6 flex flex-col items-center max-w-3xl mx-auto">
          {/* Auspicious symbol */}
          <div className="text-amber-400/80 text-4xl sm:text-5xl mb-4 animate-pulse">🙏</div>
          <EditableText
            id="hero-blessing"
            defaultText="Shri Ganeshaya Namah"
            isEditing={isEditing}
            className="text-amber-300/90 text-xs sm:text-sm tracking-[0.5em] uppercase font-light mb-8 sm:mb-12"
          />

          <GoldDivider />

          <EditableText
            id="hero-invite-line"
            defaultText="Together with their families"
            isEditing={isEditing}
            className="text-amber-100/60 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 sm:mb-10"
          />

          {/* Couple names */}
          <div className="flex flex-col items-center gap-1 sm:gap-2 mb-4">
            <EditableText
              id="p1"
              defaultText="Priya"
              isEditing={isEditing}
              className={`${cormorant.className} text-6xl sm:text-7xl md:text-9xl font-light tracking-wider text-amber-50 drop-shadow-[0_4px_24px_rgba(212,175,55,0.3)]`}
            />
            <div className="flex items-center gap-4 my-2 sm:my-4">
              <div className="h-px w-8 sm:w-16 bg-amber-400/40" />
              <EditableText id="amp" defaultText="&" isEditing={isEditing} className={`${cormorant.className} text-3xl sm:text-4xl text-amber-400 italic`} />
              <div className="h-px w-8 sm:w-16 bg-amber-400/40" />
            </div>
            <EditableText
              id="p2"
              defaultText="Rajesh"
              isEditing={isEditing}
              className={`${cormorant.className} text-6xl sm:text-7xl md:text-9xl font-light tracking-wider text-amber-50 drop-shadow-[0_4px_24px_rgba(212,175,55,0.3)]`}
            />
          </div>

          <EditableText
            id="hero-subtitle"
            defaultText="Request the honour of your presence at their wedding celebration"
            isEditing={isEditing}
            className="text-amber-200/60 text-sm sm:text-base max-w-md leading-relaxed mt-6 sm:mt-8 font-light"
          />

          <GoldDivider />

          {/* Scroll cue */}
          <div className="mt-8 flex flex-col items-center gap-2 animate-bounce opacity-30">
            <div className="w-px h-10 bg-amber-400" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-amber-300">Scroll</span>
          </div>
        </div>
      </section>

      {/* ─── DETAILS SECTION ─── */}
      <section className="relative z-30 py-20 sm:py-32 px-6">
        {/* Subtle mandala bg */}
        <MandalaDecor className="absolute top-10 left-1/2 -translate-x-1/2 text-amber-400/5 pointer-events-none" size={500} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <EditableText
            id="details-title"
            defaultText="Wedding Ceremony"
            isEditing={isEditing}
            className={`${cormorant.className} text-4xl sm:text-6xl text-amber-100 mb-4`}
          />
          <GoldDivider />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mt-12 sm:mt-16">
            {/* Date */}
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-amber-400/10 backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500">
              <span className="text-3xl mb-4">🪔</span>
              <EditableText id="lbl-when" defaultText="Date" isEditing={isEditing} className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-amber-400/70 mb-3" />
              <EditableText id="date" defaultText="December 12, 2026" isEditing={isEditing} className={`${cormorant.className} text-xl sm:text-2xl text-amber-50`} />
            </div>
            {/* Time */}
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-amber-400/10 backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500">
              <span className="text-3xl mb-4">⏰</span>
              <EditableText id="lbl-time" defaultText="Muhurat" isEditing={isEditing} className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-amber-400/70 mb-3" />
              <EditableText id="time" defaultText="7:30 PM Onwards" isEditing={isEditing} className={`${cormorant.className} text-xl sm:text-2xl text-amber-50`} />
            </div>
            {/* Venue */}
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-amber-400/10 backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500">
              <span className="text-3xl mb-4">🏛️</span>
              <EditableText id="lbl-venue" defaultText="Venue" isEditing={isEditing} className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-amber-400/70 mb-3" />
              <EditableText id="venue" defaultText="The Grand Palace" isEditing={isEditing} className={`${cormorant.className} text-xl sm:text-2xl text-amber-50`} />
              <EditableText id="address" defaultText="Jaipur, Rajasthan" isEditing={isEditing} className="text-amber-200/40 text-sm mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── EVENTS TIMELINE ─── */}
      <section className="relative z-20 py-16 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <EditableText id="events-title" defaultText="Celebration Events" isEditing={isEditing} className={`${cormorant.className} text-3xl sm:text-5xl text-amber-100 mb-4`} />
            <GoldDivider />
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* Event 1 */}
            <div className="flex gap-4 sm:gap-6 items-start group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-amber-900/40">🎶</div>
                <div className="w-px h-full min-h-[40px] bg-amber-400/20 mt-2" />
              </div>
              <div className="pb-6 sm:pb-8">
                <EditableText id="e1-name" defaultText="Sangeet & Mehndi" isEditing={isEditing} className={`${cormorant.className} text-xl sm:text-2xl text-amber-100 mb-1`} />
                <EditableText id="e1-time" defaultText="December 10 · 6:00 PM" isEditing={isEditing} className="text-xs sm:text-sm text-amber-300/50 mb-2" />
                <EditableText id="e1-desc" defaultText="An evening of music, dance and mehndi celebrations with family and friends." isEditing={isEditing} className="text-sm text-amber-100/50 font-light leading-relaxed" />
              </div>
            </div>
            {/* Event 2 */}
            <div className="flex gap-4 sm:gap-6 items-start group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-amber-900/40">💛</div>
                <div className="w-px h-full min-h-[40px] bg-amber-400/20 mt-2" />
              </div>
              <div className="pb-6 sm:pb-8">
                <EditableText id="e2-name" defaultText="Haldi Ceremony" isEditing={isEditing} className={`${cormorant.className} text-xl sm:text-2xl text-amber-100 mb-1`} />
                <EditableText id="e2-time" defaultText="December 11 · 10:00 AM" isEditing={isEditing} className="text-xs sm:text-sm text-amber-300/50 mb-2" />
                <EditableText id="e2-desc" defaultText="A sacred ceremony where turmeric paste is applied to bless the couple." isEditing={isEditing} className="text-sm text-amber-100/50 font-light leading-relaxed" />
              </div>
            </div>
            {/* Event 3 */}
            <div className="flex gap-4 sm:gap-6 items-start group">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-amber-900/40">🔥</div>
              </div>
              <div>
                <EditableText id="e3-name" defaultText="Wedding Ceremony & Reception" isEditing={isEditing} className={`${cormorant.className} text-xl sm:text-2xl text-amber-100 mb-1`} />
                <EditableText id="e3-time" defaultText="December 12 · 7:30 PM" isEditing={isEditing} className="text-xs sm:text-sm text-amber-300/50 mb-2" />
                <EditableText id="e3-desc" defaultText="The sacred pheras around the holy fire, followed by a grand reception dinner." isEditing={isEditing} className="text-sm text-amber-100/50 font-light leading-relaxed" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STORY IMAGE + RSVP ─── */}
      <section className={`relative z-20 w-full flex flex-col-reverse items-stretch ${showRsvp ? "md:flex-row" : ""}`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 px-6 py-12 sm:px-12 sm:py-20 md:px-16 flex flex-col justify-center items-center">
            <div className="w-full max-w-md">
              <EditableText id="rsvp-heading" defaultText="You are cordially invited" isEditing={isEditing} className={`${cormorant.className} text-3xl sm:text-4xl text-amber-100 mb-2 text-center`} />
              <EditableText id="rsvp-sub" defaultText="Please let us know if you can join our celebration" isEditing={isEditing} className="text-amber-200/40 text-sm text-center mb-8" />

              <div className="bg-white/[0.04] border border-amber-400/15 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-black/20">
                <EditableText id="rsvp-title" defaultText="RSVP" isEditing={isEditing} className="text-xs font-bold tracking-[0.4em] uppercase text-amber-400 mb-6 text-center block w-full" />
                <RoyalMandalaRsvp />
              </div>
            </div>
          </div>
        )}

        {/* Image side */}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : "md:w-full"} min-h-[45vh] sm:min-h-[55vh] md:min-h-full relative overflow-hidden`}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${media.storyImage}')`,
              transform: `scale(1.1) translateY(${(scrollY - 1200) * 0.08}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#2D0A0A]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2D0A0A] to-transparent md:hidden" />
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-30 py-16 sm:py-24 text-center flex flex-col items-center px-6 border-t border-amber-400/10">
        <MandalaDecor className="absolute top-[-60px] left-1/2 -translate-x-1/2 text-amber-400/8 pointer-events-none" size={250} />
        <EditableText
          id="footer-names"
          defaultText="Priya & Rajesh"
          isEditing={isEditing}
          className={`${cormorant.className} text-4xl sm:text-6xl text-amber-100/90 italic mb-4`}
        />
        <EditableText
          id="footer-tagline"
          defaultText="सात फेरे, सात जन्म"
          isEditing={isEditing}
          className="text-amber-400/50 text-sm sm:text-base tracking-wider mb-2"
        />
        <EditableText
          id="footer-sub"
          defaultText="We can't wait to celebrate with you!"
          isEditing={isEditing}
          className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-amber-200/30 mt-4"
        />
      </footer>

      {/* Watermark */}
      {!isEditing && (
        <a href="/" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#2D0A0A]/90 backdrop-blur-md shadow-lg border border-amber-400/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-amber-200 hover:bg-[#2D0A0A] transition-all group">
          <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-serif group-hover:rotate-12 transition-transform">M</span>
          <span className="hidden sm:block">Made with MakeMyInvites</span>
        </a>
      )}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function TemplateContent() {
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("editSlug");

  return (
    <EditorShell
      templateSlug="royal-mandala"
      config={{ defaultMedia: DEFAULT_MEDIA, defaultRsvpFields: DEFAULT_RSVP }}
      editSlug={editSlug}
    >
      <RoyalMandalaPreview />
    </EditorShell>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#2D0A0A] flex items-center justify-center text-amber-400/50 tracking-widest text-xs uppercase">Loading Experience…</div>}>
      <TemplateContent />
    </Suspense>
  );
}
