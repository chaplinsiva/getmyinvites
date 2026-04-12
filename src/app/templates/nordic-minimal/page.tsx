"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DM_Serif_Display, Manrope } from "next/font/google";
import EditorShell from "@/components/editor/EditorShell";
import { useEditor } from "@/components/editor/EditorContext";
import { EditableText } from "@/components/editor/EditableText";
import { StandardEditorRsvp } from "@/components/templates/StandardEditorRsvp";

const serif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"] });
const sans = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const DEFAULT_MEDIA = {
  heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000",
  storyImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=2000",
};

const DEFAULT_RSVP = [
  { id: "f1", type: "text", label: "Name", required: true },
  { id: "f2", type: "email", label: "Email", required: true },
  { id: "f3", type: "checkbox", label: "Attending", required: false },
];

function Preview() {
  const { isEditing, media, scrollY, showRsvp } = useEditor();
  return (
    <div className={`relative min-h-screen ${sans.className} bg-slate-50 text-slate-800`}>
      <section className="min-h-[92svh] flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 min-h-[50vh] md:min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.heroImage}')`, transform: `translateY(${scrollY * 0.12}px) scale(1.05)` }} />
        </div>
        <div className="w-full md:w-2/5 flex flex-col justify-center px-10 py-16 md:py-24 bg-white">
          <div className="w-12 h-px bg-slate-300 mb-12" />
          <div className="space-y-2 mb-8">
            <EditableText id="p1" defaultText="Elin" isEditing={isEditing} className={`${serif.className} text-4xl sm:text-5xl md:text-6xl text-slate-900`} />
            <EditableText id="amp" defaultText="&" isEditing={isEditing} className={`${serif.className} text-2xl text-slate-400 italic`} />
            <EditableText id="p2" defaultText="Jonas" isEditing={isEditing} className={`${serif.className} text-4xl sm:text-5xl md:text-6xl text-slate-900`} />
          </div>
          <EditableText id="hero-subtitle" defaultText="Wedding celebration" isEditing={isEditing} className="text-xs tracking-[0.35em] uppercase text-slate-500 font-medium" />
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-3 gap-16 border-t border-slate-200">
        <div>
          <EditableText id="details-title" defaultText="Details" isEditing={isEditing} className={`${serif.className} text-2xl text-slate-900`} />
        </div>
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-12">
          <div>
            <EditableText id="lbl-when" defaultText="When" isEditing={isEditing} className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400 mb-4" />
            <EditableText id="date" defaultText="August 2, 2026" isEditing={isEditing} className={`${serif.className} text-xl`} />
            <EditableText id="time" defaultText="15:00" isEditing={isEditing} className="text-slate-500 text-sm mt-2" />
          </div>
          <div>
            <EditableText id="lbl-where" defaultText="Where" isEditing={isEditing} className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400 mb-4" />
            <EditableText id="venue" defaultText="Sjöboden" isEditing={isEditing} className={`${serif.className} text-xl`} />
            <EditableText id="address" defaultText="Stockholm" isEditing={isEditing} className="text-slate-500 text-sm mt-2" />
          </div>
        </div>
      </section>
      <section className={`flex flex-col-reverse ${showRsvp ? "md:flex-row" : ""} border-t border-slate-200 bg-white`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 px-10 py-20 md:border-r border-slate-200">
            <EditableText id="story-title" defaultText="Join us" isEditing={isEditing} className={`${serif.className} text-3xl text-slate-900 mb-6`} />
            <EditableText id="story-desc" defaultText="A quiet ceremony by the water, followed by dinner and toasts. Dress: formal minimal." isEditing={isEditing} className="text-slate-600 font-light leading-relaxed mb-12 max-w-md" />
            <div className="border border-slate-200 rounded-xl p-8 shadow-sm bg-white">
              <EditableText id="rsvp-title" defaultText="Reply" isEditing={isEditing} className={`${serif.className} text-xs font-bold tracking-[0.2em] uppercase text-slate-800 mb-6 text-center block w-full`} />
              <StandardEditorRsvp palette="ice" />
            </div>
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : ""} min-h-[48vh] relative`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')` }} />
        </div>
      </section>
      <footer className="py-16 text-center bg-slate-900 text-white">
        <EditableText id="footer-names" defaultText="Elin & Jonas" isEditing={isEditing} className={`${serif.className} text-2xl sm:text-3xl`} />
        <EditableText id="footer-sub" defaultText="Tack" isEditing={isEditing} className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mt-6" />
      </footer>
      {!isEditing && (
        <a href="/" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-2 text-[10px] font-semibold uppercase text-slate-500">
          <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex text-[10px] items-center justify-center">M</span>
          <span className="hidden sm:inline">MakeMyInvites</span>
        </a>
      )}
    </div>
  );
}

function TemplateContent() {
  const searchParams = useSearchParams();
  return (
    <EditorShell templateSlug="nordic-minimal" config={{ defaultMedia: DEFAULT_MEDIA, defaultRsvpFields: DEFAULT_RSVP }} editSlug={searchParams.get("editSlug")}>
      <Preview />
    </EditorShell>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-xs uppercase">Loading…</div>}>
      <TemplateContent />
    </Suspense>
  );
}
