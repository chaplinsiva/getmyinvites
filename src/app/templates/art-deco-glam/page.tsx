"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Cinzel, Raleway } from "next/font/google";
import EditorShell from "@/components/editor/EditorShell";
import { useEditor } from "@/components/editor/EditorContext";
import { EditableText } from "@/components/editor/EditableText";
import { StandardEditorRsvp } from "@/components/templates/StandardEditorRsvp";

const deco = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const sans = Raleway({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const DEFAULT_MEDIA = {
  heroImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000",
  storyImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2000",
};

const DEFAULT_RSVP = [
  { id: "f1", type: "text", label: "Guest name", required: true },
  { id: "f2", type: "email", label: "Email", required: true },
  { id: "f3", type: "number", label: "Party size", required: true },
  { id: "f4", type: "checkbox", label: "Black tie ready", required: false },
];

function DecoCorners({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden>
      <path d="M10 10h25v2H12v23h-2V10zm55 0h25v25h-2V12H65v-2zM10 65v25h25v-2H12V65h-2zm78 0h2v25H65v2h25V65z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function Preview() {
  const { isEditing, media, scrollY, showRsvp } = useEditor();
  return (
    <div className={`relative min-h-screen ${sans.className} bg-[#0c1222] text-amber-100`}>
      <section className="relative min-h-[100svh] flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('${media.heroImage}')`, transform: `scale(1.08) translateY(${scrollY * 0.1}px)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1222] via-[#0c1222]/92 to-[#0c1222]" />
        <DecoCorners className="absolute top-8 left-8 w-24 h-24 text-amber-500/40" />
        <DecoCorners className="absolute bottom-8 right-8 w-24 h-24 text-amber-500/40 rotate-180" />
        <div className="relative z-10 text-center max-w-4xl border border-amber-500/25 px-8 sm:px-16 py-16 bg-slate-900/50 backdrop-blur-sm">
          <p className={`${deco.className} text-[10px] sm:text-xs tracking-[0.6em] text-amber-500/90 mb-8`}>AN EVENING OF CELEBRATION</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-6">
            <EditableText id="p1" defaultText="Vivienne" isEditing={isEditing} className={`${deco.className} text-3xl sm:text-5xl md:text-6xl font-semibold text-amber-50 tracking-[0.15em]`} />
            <EditableText id="amp" defaultText="&" isEditing={isEditing} className={`${deco.className} text-2xl text-amber-500`} />
            <EditableText id="p2" defaultText="Sterling" isEditing={isEditing} className={`${deco.className} text-3xl sm:text-5xl md:text-6xl font-semibold text-amber-50 tracking-[0.15em]`} />
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto mb-6" />
          <EditableText id="hero-subtitle" defaultText="Request the pleasure of your company" isEditing={isEditing} className="text-xs tracking-[0.3em] uppercase text-amber-200/60" />
        </div>
      </section>
      <section className="py-20 px-6 border-y border-amber-500/20">
        <div className="max-w-4xl mx-auto">
          <EditableText id="details-title" defaultText="The soirée" isEditing={isEditing} className={`${deco.className} text-center text-2xl sm:text-3xl mb-14 tracking-[0.2em]`} />
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="border border-amber-500/25 p-8 text-center bg-slate-900/40">
              <EditableText id="lbl-when" defaultText="When" isEditing={isEditing} className={`${deco.className} text-[10px] tracking-[0.35em] text-amber-500 mb-4`} />
              <EditableText id="date" defaultText="September 19, 2026" isEditing={isEditing} className={`${deco.className} text-xl`} />
              <EditableText id="time" defaultText="7:00 PM" isEditing={isEditing} className="text-amber-200/45 text-sm mt-2" />
            </div>
            <div className="border border-amber-500/25 p-8 text-center bg-slate-900/40">
              <EditableText id="lbl-where" defaultText="Where" isEditing={isEditing} className={`${deco.className} text-[10px] tracking-[0.35em] text-amber-500 mb-4`} />
              <EditableText id="venue" defaultText="The Crystal Room" isEditing={isEditing} className={`${deco.className} text-xl`} />
              <EditableText id="address" defaultText="Chicago, IL" isEditing={isEditing} className="text-amber-200/45 text-sm mt-2" />
            </div>
          </div>
        </div>
      </section>
      <section className={`flex flex-col-reverse ${showRsvp ? "md:flex-row" : ""}`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 px-8 py-16 md:py-24 bg-[#080d18]">
            <EditableText id="story-title" defaultText="Cocktails & jazz" isEditing={isEditing} className={`${deco.className} text-2xl sm:text-3xl mb-6 tracking-wider`} />
            <EditableText id="story-desc" defaultText="Black tie. Champagne tower at midnight. Your presence is our finest gift." isEditing={isEditing} className="text-amber-200/50 leading-relaxed mb-10 max-w-lg" />
            <div className="border border-amber-500/30 bg-slate-900/90 p-8 rounded-sm">
              <EditableText id="rsvp-title" defaultText="RSVP" isEditing={isEditing} className={`${deco.className} text-xs tracking-[0.35em] text-amber-400 mb-6 text-center block w-full`} />
              <StandardEditorRsvp palette="goldNavy" />
            </div>
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : ""} min-h-[50vh] relative`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')` }} />
          <div className="absolute inset-0 bg-gradient-to-l from-[#080d18]/80 to-transparent hidden md:block" />
        </div>
      </section>
      <footer className="py-16 text-center border-t border-amber-500/20">
        <EditableText id="footer-names" defaultText="Vivienne & Sterling" isEditing={isEditing} className={`${deco.className} text-2xl sm:text-4xl text-amber-200 tracking-[0.2em]`} />
        <EditableText id="footer-sub" defaultText="Cheers" isEditing={isEditing} className={`${deco.className} text-[10px] tracking-[0.45em] text-amber-600/70 mt-6`} />
      </footer>
      {!isEditing && (
        <a href="/" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-slate-900/90 border border-amber-600/30 rounded-sm px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-amber-200">
          <span className="w-5 h-5 bg-amber-500 text-slate-950 flex items-center justify-center text-[10px]">M</span>
          <span className="hidden sm:inline">MakeMyInvites</span>
        </a>
      )}
    </div>
  );
}

function TemplateContent() {
  const searchParams = useSearchParams();
  return (
    <EditorShell templateSlug="art-deco-glam" config={{ defaultMedia: DEFAULT_MEDIA, defaultRsvpFields: DEFAULT_RSVP }} editSlug={searchParams.get("editSlug")}>
      <Preview />
    </EditorShell>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c1222] flex items-center justify-center text-amber-500/40 text-xs uppercase">Loading…</div>}>
      <TemplateContent />
    </Suspense>
  );
}
