"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import EditorShell from "@/components/editor/EditorShell";
import { useEditor } from "@/components/editor/EditorContext";
import { EditableText } from "@/components/editor/EditableText";
import { StandardEditorRsvp } from "@/components/templates/StandardEditorRsvp";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"] });
const sans = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const DEFAULT_MEDIA = {
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000",
  storyImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000",
};

const DEFAULT_RSVP = [
  { id: "f1", type: "text", label: "Your Full Name", required: true },
  { id: "f2", type: "email", label: "Email", required: true },
  { id: "f3", type: "number", label: "Guests", required: false },
  { id: "f4", type: "checkbox", label: "Joyfully attending", required: false },
];

function LeafFrame({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden>
      <path d="M100 20C60 50 20 90 20 130c0 35 25 50 50 50s50-25 50-50c0-40-40-80-80-110" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <path d="M100 20c40 30 80 70 80 110 0 35-25 50-50 50s-50-25-50-50c0-40 40-80 80-110" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

function Preview() {
  const { isEditing, media, scrollY, showRsvp } = useEditor();
  return (
    <div className={`relative min-h-screen ${sans.className} text-emerald-50 bg-[#031a14]`}>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(16,185,129,0.12),transparent_55%)] pointer-events-none -z-10" />
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.heroImage}')`, transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#031a14]/80 via-[#031a14]/65 to-[#031a14]" />
        <LeafFrame className="absolute top-8 right-8 w-40 h-40 text-emerald-400/30" />
        <div className="relative z-10 text-center max-w-4xl py-24">
          <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-emerald-300/70 mb-10">Under the stars</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-6">
            <EditableText id="p1" defaultText="Ivy" isEditing={isEditing} className={`${display.className} text-5xl sm:text-7xl md:text-8xl font-semibold`} />
            <EditableText id="amp" defaultText="&" isEditing={isEditing} className={`${display.className} text-3xl sm:text-5xl text-teal-300/90 italic`} />
            <EditableText id="p2" defaultText="Marcus" isEditing={isEditing} className={`${display.className} text-5xl sm:text-7xl md:text-8xl font-semibold`} />
          </div>
          <EditableText id="hero-subtitle" defaultText="invite you to their forest celebration" isEditing={isEditing} className="text-sm tracking-[0.35em] uppercase text-emerald-200/60" />
        </div>
      </section>
      <section className="relative py-24 px-6 border-y border-emerald-500/15 bg-emerald-950/40">
        <div className="max-w-3xl mx-auto text-center">
          <EditableText id="details-title" defaultText="Ceremony & reception" isEditing={isEditing} className={`${display.className} text-4xl sm:text-5xl mb-14`} />
          <div className="grid sm:grid-cols-2 gap-12">
            <div>
              <EditableText id="lbl-when" defaultText="When" isEditing={isEditing} className="text-[10px] font-bold tracking-[0.3em] uppercase text-teal-400/80 mb-3" />
              <EditableText id="date" defaultText="June 21, 2026" isEditing={isEditing} className={`${display.className} text-2xl`} />
              <EditableText id="time" defaultText="4:00 PM" isEditing={isEditing} className="text-emerald-300/50 text-sm mt-2" />
            </div>
            <div>
              <EditableText id="lbl-where" defaultText="Where" isEditing={isEditing} className="text-[10px] font-bold tracking-[0.3em] uppercase text-teal-400/80 mb-3" />
              <EditableText id="venue" defaultText="The Greenhouse" isEditing={isEditing} className={`${display.className} text-2xl`} />
              <EditableText id="address" defaultText="Portland, Oregon" isEditing={isEditing} className="text-emerald-300/50 text-sm mt-2" />
            </div>
          </div>
        </div>
      </section>
      <section className={`flex flex-col-reverse ${showRsvp ? "md:flex-row" : ""}`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 px-8 py-20 md:py-28 flex flex-col justify-center bg-[#04221a]">
            <EditableText id="story-title" defaultText="Dinner & dancing" isEditing={isEditing} className={`${display.className} text-3xl sm:text-5xl mb-6`} />
            <EditableText id="story-desc" defaultText="Join us for an evening among ferns and fairy lights. Formal garden attire welcome." isEditing={isEditing} className="text-emerald-200/55 leading-relaxed mb-10 max-w-md" />
            <div className="bg-emerald-950/60 border border-emerald-400/25 rounded-2xl p-6 sm:p-8">
              <EditableText id="rsvp-title" defaultText="Kindly reply" isEditing={isEditing} className={`${display.className} text-xs font-bold tracking-[0.3em] uppercase text-emerald-300 mb-6 text-center block w-full`} />
              <StandardEditorRsvp palette="emeraldNight" />
            </div>
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : "md:w-full"} min-h-[50vh] relative`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04221a]/70 to-transparent hidden md:block" />
        </div>
      </section>
      <footer className="py-20 text-center border-t border-emerald-500/20 bg-[#021510]">
        <EditableText id="footer-names" defaultText="Ivy & Marcus" isEditing={isEditing} className={`${display.className} text-3xl sm:text-5xl text-emerald-200/90 italic`} />
        <EditableText id="footer-sub" defaultText="With love" isEditing={isEditing} className="text-[10px] uppercase tracking-[0.4em] text-emerald-500/50 mt-6" />
      </footer>
      {!isEditing && (
        <a href="/" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-emerald-950/90 border border-emerald-500/25 rounded-full px-3 py-2 text-[10px] font-bold uppercase text-emerald-200">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center text-[10px]">M</span>
          <span className="hidden sm:inline">MakeMyInvites</span>
        </a>
      )}
    </div>
  );
}

function TemplateContent() {
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("editSlug");
  return (
    <EditorShell templateSlug="midnight-botanica" config={{ defaultMedia: DEFAULT_MEDIA, defaultRsvpFields: DEFAULT_RSVP }} editSlug={editSlug}>
      <Preview />
    </EditorShell>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#031a14] flex items-center justify-center text-emerald-400/50 text-xs uppercase tracking-widest">Loading…</div>}>
      <TemplateContent />
    </Suspense>
  );
}
