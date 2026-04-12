"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Libre_Baskerville, Nunito } from "next/font/google";
import EditorShell from "@/components/editor/EditorShell";
import { useEditor } from "@/components/editor/EditorContext";
import { EditableText } from "@/components/editor/EditableText";
import { StandardEditorRsvp } from "@/components/templates/StandardEditorRsvp";

const serif = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });
const round = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"] });

const DEFAULT_MEDIA = {
  heroImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=2000",
  storyImage: "https://images.unsplash.com/photo-1522673606560-1314db25a76a?auto=format&fit=crop&q=80&w=2000",
};

const DEFAULT_RSVP = [
  { id: "f1", type: "text", label: "Full Name", required: true },
  { id: "f2", type: "email", label: "Email", required: true },
  { id: "f3", type: "text", label: "Song requests", required: false },
  { id: "f4", type: "checkbox", label: "Can't wait!", required: false },
];

function Preview() {
  const { isEditing, media, scrollY, showRsvp } = useEditor();
  return (
    <div className={`relative min-h-screen ${round.className} bg-gradient-to-b from-rose-50 via-orange-50/40 to-amber-50 text-stone-800`}>
      <section className="relative min-h-[100svh] flex flex-col items-center justify-end pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.heroImage}')`, transform: `translateY(${scrollY * 0.25}px) scale(1.08)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-100/95 via-orange-100/40 to-transparent" />
        <div className="relative z-10 text-center max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-rose-200/60 text-[10px] font-bold tracking-[0.35em] uppercase text-rose-600 mb-8">Wedding</div>
          <div className="flex flex-wrap justify-center items-baseline gap-2 sm:gap-4 mb-4">
            <EditableText id="p1" defaultText="Amelia" isEditing={isEditing} className={`${serif.className} text-4xl sm:text-6xl md:text-7xl font-bold text-rose-950`} />
            <EditableText id="amp" defaultText="&" isEditing={isEditing} className={`${serif.className} text-2xl sm:text-4xl text-orange-500 italic`} />
            <EditableText id="p2" defaultText="Noah" isEditing={isEditing} className={`${serif.className} text-4xl sm:text-6xl md:text-7xl font-bold text-rose-950`} />
          </div>
          <EditableText id="hero-subtitle" defaultText="Are getting married" isEditing={isEditing} className="text-sm tracking-[0.25em] uppercase text-rose-800/70 font-semibold" />
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-rose-200/50 shadow-xl p-10 sm:p-14 text-center">
          <EditableText id="details-title" defaultText="The details" isEditing={isEditing} className={`${serif.className} text-3xl sm:text-4xl text-rose-950 mb-10`} />
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 p-6 border border-rose-100">
              <EditableText id="lbl-when" defaultText="When" isEditing={isEditing} className="text-[10px] font-bold tracking-[0.25em] uppercase text-rose-500 mb-2" />
              <EditableText id="date" defaultText="May 9, 2026" isEditing={isEditing} className={`${serif.className} text-xl`} />
              <EditableText id="time" defaultText="4:30 PM" isEditing={isEditing} className="text-stone-500 text-sm mt-1" />
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 p-6 border border-orange-100">
              <EditableText id="lbl-where" defaultText="Where" isEditing={isEditing} className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-600 mb-2" />
              <EditableText id="venue" defaultText="Rosewood Estate" isEditing={isEditing} className={`${serif.className} text-xl`} />
              <EditableText id="address" defaultText="Napa Valley" isEditing={isEditing} className="text-stone-500 text-sm mt-1" />
            </div>
          </div>
        </div>
      </section>
      <section className={`flex flex-col ${showRsvp ? "md:flex-row" : ""} bg-white/50`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 p-10 sm:p-16 flex flex-col justify-center">
            <EditableText id="story-title" defaultText="Celebrate with us" isEditing={isEditing} className={`${serif.className} text-3xl sm:text-4xl text-rose-950 mb-6`} />
            <EditableText id="story-desc" defaultText="We would be honoured to share this day with you—sunset vows, garden cocktails, and dancing under string lights." isEditing={isEditing} className="text-stone-600 leading-relaxed mb-10" />
            <div className="bg-white/95 border border-rose-200/60 rounded-3xl p-8 shadow-lg">
              <EditableText id="rsvp-title" defaultText="RSVP" isEditing={isEditing} className={`${serif.className} text-xs font-bold tracking-[0.2em] uppercase text-rose-900 mb-6 text-center block w-full`} />
              <StandardEditorRsvp palette="coralCream" />
            </div>
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : ""} min-h-[45vh] relative rounded-t-[3rem] md:rounded-none overflow-hidden`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')` }} />
        </div>
      </section>
      <footer className="py-16 text-center bg-gradient-to-r from-rose-600 to-orange-500 text-white">
        <EditableText id="footer-names" defaultText="Amelia & Noah" isEditing={isEditing} className={`${serif.className} text-3xl sm:text-4xl mb-3`} />
        <EditableText id="footer-sub" defaultText="With love" isEditing={isEditing} className="text-[10px] uppercase tracking-[0.35em] text-white/80" />
      </footer>
      {!isEditing && (
        <a href="/" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/95 border border-rose-200 rounded-full px-3 py-2 text-[10px] font-bold uppercase text-rose-600 shadow-lg">
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-white flex items-center justify-center text-[10px]">M</span>
          <span className="hidden sm:inline">MakeMyInvites</span>
        </a>
      )}
    </div>
  );
}

function TemplateContent() {
  const searchParams = useSearchParams();
  return (
    <EditorShell templateSlug="sunrise-garden" config={{ defaultMedia: DEFAULT_MEDIA, defaultRsvpFields: DEFAULT_RSVP }} editSlug={searchParams.get("editSlug")}>
      <Preview />
    </EditorShell>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-rose-50 flex items-center justify-center text-rose-300 text-xs uppercase">Loading…</div>}>
      <TemplateContent />
    </Suspense>
  );
}
