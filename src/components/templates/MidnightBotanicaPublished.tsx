"use client";

import { useEffect, useState } from "react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import InvitationShareDock from "@/components/invitation/InvitationShareDock";
import { getCoupleFromCustomizedData, invitationFlags } from "@/lib/invitation-share";
import { StaticInvitationText } from "./StaticInvitationText";
import PublishedRsvpBlock from "./PublishedRsvpBlock";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"] });
const sans = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

function LeafFrame({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden>
      <path d="M100 20C60 50 20 90 20 130c0 35 25 50 50 50s50-25 50-50c0-40-40-80-80-110" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <path d="M100 20c40 30 80 70 80 110 0 35-25 50-50 50s-50-25-50-50c0-40 40-80 80-110" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

export default function MidnightBotanicaPublished({ data, invitationId }: { data: any; invitationId: string }) {
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
    <div className={`relative min-h-screen ${sans.className} text-emerald-50 bg-[#031a14]`}>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(16,185,129,0.12),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none -z-10" />
      {showShare && (
        <InvitationShareDock shareUrl="" heroImageUrl={media.heroImage} nameFirst={couple.first} nameSecond={couple.second} variant="dark" />
      )}
      <a href="/" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-emerald-950/90 backdrop-blur border border-emerald-500/25 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-emerald-200 hover:bg-emerald-900 transition-colors">
        <span className="w-5 h-5 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center text-[10px] font-serif">M</span>
        <span className="hidden sm:inline">MakeMyInvites</span>
      </a>

      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-cover bg-center scale-110" style={{ backgroundImage: `url('${media.heroImage}')`, transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#031a14]/80 via-[#031a14]/65 to-[#031a14]" />
        <LeafFrame className="absolute top-8 right-8 w-40 h-40 text-emerald-400/30" />
        <LeafFrame className="absolute bottom-24 left-4 w-48 h-48 text-teal-400/20 scale-x-[-1]" />
        <div className="relative z-10 text-center max-w-4xl mx-auto py-24">
          <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-emerald-300/70 mb-10">Under the stars</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-6">
            <StaticInvitationText node={t.p1} className={`${display.className} text-5xl sm:text-7xl md:text-8xl font-semibold text-emerald-50`} />
            <StaticInvitationText node={t.amp} className={`${display.className} text-3xl sm:text-5xl text-teal-300/90 italic`} />
            <StaticInvitationText node={t.p2} className={`${display.className} text-5xl sm:text-7xl md:text-8xl font-semibold text-emerald-50`} />
          </div>
          <StaticInvitationText node={t["hero-subtitle"]} className="text-sm tracking-[0.35em] uppercase text-emerald-200/60" />
        </div>
      </section>

      <section className="relative py-24 px-6 border-y border-emerald-500/15 bg-emerald-950/40">
        <div className="max-w-3xl mx-auto text-center">
          <StaticInvitationText node={t["details-title"]} className={`${display.className} text-4xl sm:text-5xl text-emerald-100 mb-14`} />
          <div className="grid sm:grid-cols-2 gap-12 text-left sm:text-center">
            <div>
              <StaticInvitationText node={t["lbl-when"]} className="text-[10px] font-bold tracking-[0.3em] uppercase text-teal-400/80 mb-3" />
              <StaticInvitationText node={t.date} className={`${display.className} text-2xl text-emerald-50`} />
              <StaticInvitationText node={t.time} className="text-emerald-300/50 text-sm mt-2" />
            </div>
            <div>
              <StaticInvitationText node={t["lbl-where"]} className="text-[10px] font-bold tracking-[0.3em] uppercase text-teal-400/80 mb-3" />
              <StaticInvitationText node={t.venue} className={`${display.className} text-2xl text-emerald-50`} />
              <StaticInvitationText node={t.address} className="text-emerald-300/50 text-sm mt-2" />
            </div>
          </div>
        </div>
      </section>

      <section className={`flex flex-col-reverse ${showRsvp ? "md:flex-row" : ""} items-stretch`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 px-8 py-20 md:py-28 flex flex-col justify-center bg-[#04221a]">
            <StaticInvitationText node={t["story-title"]} className={`${display.className} text-3xl sm:text-5xl text-emerald-100 mb-6`} />
            <StaticInvitationText node={t["story-desc"]} className="text-emerald-200/55 leading-relaxed mb-10 max-w-md" />
            <PublishedRsvpBlock invitationId={invitationId} rsvpFields={rsvpFields} palette="emeraldNight" titleFontClassName={display.className} t={t} />
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : "md:w-full"} min-h-[50vh] relative`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')`, transform: `translateY(${(scrollY - 400) * 0.06}px) scale(1.05)` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04221a]/70 to-transparent md:block hidden" />
        </div>
      </section>

      <footer className="py-20 text-center border-t border-emerald-500/20 bg-[#021510]">
        <StaticInvitationText node={t["footer-names"]} className={`${display.className} text-3xl sm:text-5xl text-emerald-200/90 italic`} />
        <StaticInvitationText node={t["footer-sub"]} className="text-[10px] uppercase tracking-[0.4em] text-emerald-500/50 mt-6" />
      </footer>
    </div>
  );
}
