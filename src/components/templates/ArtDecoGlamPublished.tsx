"use client";

import { useEffect, useState } from "react";
import { Cinzel, Raleway } from "next/font/google";
import InvitationShareDock from "@/components/invitation/InvitationShareDock";
import { getCoupleFromCustomizedData, invitationFlags } from "@/lib/invitation-share";
import { StaticInvitationText } from "./StaticInvitationText";
import PublishedRsvpBlock from "./PublishedRsvpBlock";

const deco = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const sans = Raleway({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

function DecoCorners({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden>
      <path d="M10 10h25v2H12v23h-2V10zm55 0h25v25h-2V12H65v-2zM10 65v25h25v-2H12V65h-2zm78 0h2v25H65v2h25V65z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export default function ArtDecoGlamPublished({ data, invitationId }: { data: any; invitationId: string }) {
  const [scrollY, setScrollY] = useState(0);
  const media = data.media || {};
  const t = data.textContent || {};
  const rsvpFields = data.rsvpFields || [];
  const couple = getCoupleFromCustomizedData(data);
  const { showRsvp, showShare } = invitationFlags(data);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className={`relative min-h-screen ${sans.className} bg-[#0c1222] text-amber-100`}>
      <div className="fixed inset-0 bg-[linear-gradient(135deg,rgba(180,130,40,0.07)_0%,transparent_40%,rgba(180,130,40,0.05)_100%)] pointer-events-none -z-10" />
      {showShare && <InvitationShareDock shareUrl="" heroImageUrl={media.heroImage} nameFirst={couple.first} nameSecond={couple.second} variant="dark" />}
      <a href="/" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900/90 border border-amber-600/30 rounded-sm px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-amber-200/90">
        <span className="w-5 h-5 bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-serif">M</span>
        <span className="hidden sm:inline">MakeMyInvites</span>
      </a>

      <section className="relative min-h-[100svh] flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('${media.heroImage}')`, transform: `scale(1.08) translateY(${scrollY * 0.1}px)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1222] via-[#0c1222]/92 to-[#0c1222]" />
        <DecoCorners className="absolute top-8 left-8 w-24 h-24 text-amber-500/40" />
        <DecoCorners className="absolute bottom-8 right-8 w-24 h-24 text-amber-500/40 rotate-180" />
        <div className="relative z-10 text-center max-w-4xl border border-amber-500/25 px-8 sm:px-16 py-16 sm:py-20 bg-slate-900/50 backdrop-blur-sm">
          <p className={`${deco.className} text-[10px] sm:text-xs tracking-[0.6em] text-amber-500/90 mb-8`}>AN EVENING OF CELEBRATION</p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 mb-6">
            <StaticInvitationText node={t.p1} className={`${deco.className} text-3xl sm:text-5xl md:text-6xl font-semibold text-amber-50 tracking-[0.15em]`} />
            <StaticInvitationText node={t.amp} className={`${deco.className} text-2xl text-amber-500`} />
            <StaticInvitationText node={t.p2} className={`${deco.className} text-3xl sm:text-5xl md:text-6xl font-semibold text-amber-50 tracking-[0.15em]`} />
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto mb-6" />
          <StaticInvitationText node={t["hero-subtitle"]} className="text-xs tracking-[0.3em] uppercase text-amber-200/60" />
        </div>
      </section>

      <section className="py-20 px-6 border-y border-amber-500/20">
        <div className="max-w-4xl mx-auto">
          <StaticInvitationText node={t["details-title"]} className={`${deco.className} text-center text-2xl sm:text-3xl text-amber-100 mb-14 tracking-[0.2em]`} />
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="border border-amber-500/25 p-8 text-center bg-slate-900/40">
              <StaticInvitationText node={t["lbl-when"]} className={`${deco.className} text-[10px] tracking-[0.35em] text-amber-500 mb-4`} />
              <StaticInvitationText node={t.date} className={`${deco.className} text-xl text-amber-50`} />
              <StaticInvitationText node={t.time} className="text-amber-200/45 text-sm mt-2" />
            </div>
            <div className="border border-amber-500/25 p-8 text-center bg-slate-900/40">
              <StaticInvitationText node={t["lbl-where"]} className={`${deco.className} text-[10px] tracking-[0.35em] text-amber-500 mb-4`} />
              <StaticInvitationText node={t.venue} className={`${deco.className} text-xl text-amber-50`} />
              <StaticInvitationText node={t.address} className="text-amber-200/45 text-sm mt-2" />
            </div>
          </div>
        </div>
      </section>

      <section className={`flex flex-col-reverse ${showRsvp ? "md:flex-row" : ""}`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 px-8 py-16 md:py-24 flex flex-col justify-center bg-[#080d18]">
            <StaticInvitationText node={t["story-title"]} className={`${deco.className} text-2xl sm:text-3xl text-amber-100 mb-6 tracking-wider`} />
            <StaticInvitationText node={t["story-desc"]} className="text-amber-200/50 leading-relaxed mb-10 max-w-lg" />
            <PublishedRsvpBlock invitationId={invitationId} rsvpFields={rsvpFields} palette="goldNavy" titleFontClassName={deco.className} t={t} />
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : ""} min-h-[50vh] relative`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')` }} />
          <div className="absolute inset-0 bg-gradient-to-l from-[#080d18]/80 to-transparent hidden md:block" />
        </div>
      </section>

      <footer className="py-16 text-center border-t border-amber-500/20">
        <StaticInvitationText node={t["footer-names"]} className={`${deco.className} text-2xl sm:text-4xl text-amber-200 tracking-[0.2em]`} />
        <StaticInvitationText node={t["footer-sub"]} className={`${deco.className} text-[10px] tracking-[0.45em] text-amber-600/70 mt-6`} />
      </footer>
    </div>
  );
}
