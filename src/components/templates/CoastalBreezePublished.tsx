"use client";

import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import InvitationShareDock from "@/components/invitation/InvitationShareDock";
import { getCoupleFromCustomizedData, invitationFlags } from "@/lib/invitation-share";
import { StaticInvitationText } from "./StaticInvitationText";
import PublishedRsvpBlock from "./PublishedRsvpBlock";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function CoastalBreezePublished({ data, invitationId }: { data: any; invitationId: string }) {
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
    <div className={`relative min-h-screen ${jakarta.className} bg-[#e8f4f4] text-teal-950`}>
      <div className="fixed inset-0 -z-10 opacity-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(45,212,191,0.25),transparent_50%)]" />
      {showShare && <InvitationShareDock shareUrl="" heroImageUrl={media.heroImage} nameFirst={couple.first} nameSecond={couple.second} variant="light" />}
      <a href="/" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full px-4 py-2 border border-teal-200 shadow-md text-[10px] font-bold uppercase tracking-wider text-teal-700">
        <span className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px]">M</span>
        <span className="hidden sm:inline">MakeMyInvites</span>
      </a>

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
            <StaticInvitationText node={t.p1} className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg tracking-tight" />
            <StaticInvitationText node={t.amp} className="text-3xl sm:text-5xl text-cyan-200 font-light" />
            <StaticInvitationText node={t.p2} className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg tracking-tight" />
          </div>
          <StaticInvitationText node={t["hero-subtitle"]} className="text-sm font-medium tracking-[0.2em] uppercase text-cyan-100/90" />
        </div>
      </section>

      <section className="relative -mt-16 mx-4 sm:mx-auto max-w-4xl rounded-[2rem] bg-white shadow-xl shadow-teal-900/10 border border-teal-100 p-10 sm:p-14 z-20">
        <StaticInvitationText node={t["details-title"]} className="text-center text-2xl sm:text-3xl font-extrabold text-teal-900 mb-10" />
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="text-center sm:text-left rounded-2xl bg-teal-50/80 p-6 border border-teal-100">
            <StaticInvitationText node={t["lbl-when"]} className="text-[10px] font-bold tracking-[0.25em] uppercase text-teal-600 mb-2" />
            <StaticInvitationText node={t.date} className="text-xl font-bold text-teal-950" />
            <StaticInvitationText node={t.time} className="text-teal-700/70 text-sm mt-1" />
          </div>
          <div className="text-center sm:text-left rounded-2xl bg-cyan-50/80 p-6 border border-cyan-100">
            <StaticInvitationText node={t["lbl-where"]} className="text-[10px] font-bold tracking-[0.25em] uppercase text-cyan-700 mb-2" />
            <StaticInvitationText node={t.venue} className="text-xl font-bold text-teal-950" />
            <StaticInvitationText node={t.address} className="text-teal-700/70 text-sm mt-1" />
          </div>
        </div>
      </section>

      <section className={`mt-20 flex flex-col ${showRsvp ? "md:flex-row" : ""} items-stretch gap-0`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 px-8 py-16 md:py-24 flex flex-col justify-center order-2 md:order-1">
            <StaticInvitationText node={t["story-title"]} className="text-3xl sm:text-4xl font-extrabold text-teal-900 mb-6" />
            <StaticInvitationText node={t["story-desc"]} className="text-teal-800/80 leading-relaxed mb-10 max-w-md" />
            <PublishedRsvpBlock invitationId={invitationId} rsvpFields={rsvpFields} palette="tealSand" titleFontClassName={jakarta.className} t={t} />
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : ""} min-h-[48vh] relative order-1 md:order-2 rounded-t-[2.5rem] md:rounded-none overflow-hidden`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')`, transform: `translateY(${(scrollY - 550) * 0.07}px) scale(1.04)` }} />
        </div>
      </section>

      <footer className="py-16 mt-8 text-center bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-t-[3rem]">
        <StaticInvitationText node={t["footer-names"]} className="text-2xl sm:text-4xl font-extrabold tracking-tight" />
        <StaticInvitationText node={t["footer-sub"]} className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-100/90 mt-4" />
      </footer>
    </div>
  );
}
