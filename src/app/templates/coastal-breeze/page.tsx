"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import EditorShell from "@/components/editor/EditorShell";
import { useEditor } from "@/components/editor/EditorContext";
import { EditableText } from "@/components/editor/EditableText";
import { StandardEditorRsvp } from "@/components/templates/StandardEditorRsvp";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const DEFAULT_MEDIA = {
  heroImage: "https://images.unsplash.com/photo-1507525428037-b723cf961d3e?auto=format&fit=crop&q=80&w=2000",
  storyImage: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=2000",
};

const DEFAULT_RSVP = [
  { id: "f1", type: "text", label: "Name", required: true },
  { id: "f2", type: "email", label: "Email", required: true },
  { id: "f3", type: "text", label: "Traveling from", required: false },
  { id: "f4", type: "checkbox", label: "Beach party yes!", required: false },
];

function Preview() {
  const { isEditing, media, scrollY, showRsvp } = useEditor();
  return (
    <div className={`relative min-h-screen ${jakarta.className} bg-[#e8f4f4] text-teal-950`}>
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.heroImage}')`, transform: `translateY(${scrollY * 0.2}px) scale(1.06)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/55 via-cyan-900/35 to-[#e8f4f4]" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-white/90 text-xs font-semibold tracking-widest uppercase mb-10">
            <span className="h-px w-8 bg-white/50" />
            Save the date
            <span className="h-px w-8 bg-white/50" />
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 items-center mb-4">
            <EditableText id="p1" defaultText="Maya" isEditing={isEditing} className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg" />
            <EditableText id="amp" defaultText="&" isEditing={isEditing} className="text-3xl sm:text-5xl text-cyan-200 font-light" />
            <EditableText id="p2" defaultText="Leo" isEditing={isEditing} className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg" />
          </div>
          <EditableText id="hero-subtitle" defaultText="Tying the knot by the sea" isEditing={isEditing} className="text-sm font-medium tracking-[0.2em] uppercase text-cyan-100/90" />
        </div>
      </section>
      <section className="relative -mt-16 mx-4 sm:mx-auto max-w-4xl rounded-[2rem] bg-white shadow-xl border border-teal-100 p-10 sm:p-14 z-20">
        <EditableText id="details-title" defaultText="Weekend plans" isEditing={isEditing} className="text-center text-2xl sm:text-3xl font-extrabold text-teal-900 mb-10" />
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="rounded-2xl bg-teal-50/80 p-6 border border-teal-100">
            <EditableText id="lbl-when" defaultText="When" isEditing={isEditing} className="text-[10px] font-bold tracking-[0.25em] uppercase text-teal-600 mb-2" />
            <EditableText id="date" defaultText="July 18, 2026" isEditing={isEditing} className="text-xl font-bold" />
            <EditableText id="time" defaultText="Golden hour ceremony" isEditing={isEditing} className="text-teal-700/70 text-sm mt-1" />
          </div>
          <div className="rounded-2xl bg-cyan-50/80 p-6 border border-cyan-100">
            <EditableText id="lbl-where" defaultText="Where" isEditing={isEditing} className="text-[10px] font-bold tracking-[0.25em] uppercase text-cyan-700 mb-2" />
            <EditableText id="venue" defaultText="Driftwood Beach Club" isEditing={isEditing} className="text-xl font-bold" />
            <EditableText id="address" defaultText="San Diego, CA" isEditing={isEditing} className="text-teal-700/70 text-sm mt-1" />
          </div>
        </div>
      </section>
      <section className={`mt-20 flex flex-col ${showRsvp ? "md:flex-row" : ""}`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 px-8 py-16 md:py-24 order-2 md:order-1">
            <EditableText id="story-title" defaultText="Barefoot welcome party" isEditing={isEditing} className="text-3xl sm:text-4xl font-extrabold text-teal-900 mb-6" />
            <EditableText id="story-desc" defaultText="Friday bonfire, Saturday vows in the sand, Sunday brunch. Pack sunscreen and your best linen." isEditing={isEditing} className="text-teal-800/80 leading-relaxed mb-10 max-w-md" />
            <div className="bg-white/90 border border-teal-200/60 rounded-[2rem] p-8 shadow-lg">
              <EditableText id="rsvp-title" defaultText="RSVP" isEditing={isEditing} className="text-xs font-bold tracking-[0.2em] uppercase text-teal-800 mb-6 text-center block w-full" />
              <StandardEditorRsvp palette="tealSand" />
            </div>
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : ""} min-h-[48vh] relative order-1 md:order-2 rounded-t-[2.5rem] md:rounded-none overflow-hidden`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')` }} />
        </div>
      </section>
      <footer className="py-16 mt-8 text-center bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-[3rem]">
        <EditableText id="footer-names" defaultText="Maya & Leo" isEditing={isEditing} className="text-2xl sm:text-4xl font-extrabold" />
        <EditableText id="footer-sub" defaultText="See you in the surf" isEditing={isEditing} className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-100/90 mt-4" />
      </footer>
      {!isEditing && (
        <a href="/" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/95 border border-teal-200 rounded-full px-3 py-2 text-[10px] font-bold uppercase text-teal-700 shadow-md">
          <span className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px]">M</span>
          <span className="hidden sm:inline">MakeMyInvites</span>
        </a>
      )}
    </div>
  );
}

function TemplateContent() {
  const searchParams = useSearchParams();
  return (
    <EditorShell templateSlug="coastal-breeze" config={{ defaultMedia: DEFAULT_MEDIA, defaultRsvpFields: DEFAULT_RSVP }} editSlug={searchParams.get("editSlug")}>
      <Preview />
    </EditorShell>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#e8f4f4] flex items-center justify-center text-teal-400 text-xs uppercase">Loading…</div>}>
      <TemplateContent />
    </Suspense>
  );
}
