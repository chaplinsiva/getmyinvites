"use client";

import { useEffect, useState } from "react";
import { DM_Serif_Display, Manrope } from "next/font/google";
import InvitationShareDock from "@/components/invitation/InvitationShareDock";
import { getCoupleFromCustomizedData, invitationFlags } from "@/lib/invitation-share";
import { StaticInvitationText } from "./StaticInvitationText";
import PublishedRsvpBlock from "./PublishedRsvpBlock";

const serif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"] });
const sans = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function NordicMinimalPublished({ data, invitationId }: { data: any; invitationId: string }) {
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
    <div className={`relative min-h-screen ${sans.className} bg-slate-50 text-slate-800`}>
      {showShare && <InvitationShareDock shareUrl="" heroImageUrl={media.heroImage} nameFirst={couple.first} nameSecond={couple.second} variant="light" />}
      <a href="/" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 shadow-sm">
        <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">M</span>
        <span className="hidden sm:inline">MakeMyInvites</span>
      </a>

      <section className="min-h-[92svh] flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 min-h-[50vh] md:min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.heroImage}')`, transform: `translateY(${scrollY * 0.12}px) scale(1.05)` }} />
        </div>
        <div className="w-full md:w-2/5 flex flex-col justify-center px-10 py-16 md:py-24 bg-white">
          <div className="w-12 h-px bg-slate-300 mb-12" />
          <div className="space-y-2 mb-8">
            <StaticInvitationText node={t.p1} className={`${serif.className} text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight`} />
            <StaticInvitationText node={t.amp} className={`${serif.className} text-2xl text-slate-400 italic`} />
            <StaticInvitationText node={t.p2} className={`${serif.className} text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight`} />
          </div>
          <StaticInvitationText node={t["hero-subtitle"]} className="text-xs tracking-[0.35em] uppercase text-slate-500 font-medium" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-3 gap-16 md:gap-8 border-t border-slate-200">
        <div className="md:col-span-1">
          <StaticInvitationText node={t["details-title"]} className={`${serif.className} text-2xl text-slate-900`} />
        </div>
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-12">
          <div>
            <StaticInvitationText node={t["lbl-when"]} className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400 mb-4" />
            <StaticInvitationText node={t.date} className={`${serif.className} text-xl text-slate-900`} />
            <StaticInvitationText node={t.time} className="text-slate-500 text-sm mt-2" />
          </div>
          <div>
            <StaticInvitationText node={t["lbl-where"]} className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400 mb-4" />
            <StaticInvitationText node={t.venue} className={`${serif.className} text-xl text-slate-900`} />
            <StaticInvitationText node={t.address} className="text-slate-500 text-sm mt-2" />
          </div>
        </div>
      </section>

      <section className={`flex flex-col-reverse ${showRsvp ? "md:flex-row" : ""} border-t border-slate-200 bg-white`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 px-10 py-20 md:py-28 border-t md:border-t-0 md:border-r border-slate-200">
            <StaticInvitationText node={t["story-title"]} className={`${serif.className} text-3xl text-slate-900 mb-6`} />
            <StaticInvitationText node={t["story-desc"]} className="text-slate-600 leading-relaxed font-light mb-12 max-w-md" />
            <PublishedRsvpBlock invitationId={invitationId} rsvpFields={rsvpFields} palette="ice" titleFontClassName={serif.className} t={t} />
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : ""} min-h-[48vh] relative`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')`, transform: `translateY(${(scrollY - 700) * 0.05}px)` }} />
        </div>
      </section>

      <footer className="py-16 text-center bg-slate-900 text-white">
        <StaticInvitationText node={t["footer-names"]} className={`${serif.className} text-2xl sm:text-3xl`} />
        <StaticInvitationText node={t["footer-sub"]} className="text-[10px] uppercase tracking-[0.4em] text-slate-500 mt-6" />
      </footer>
    </div>
  );
}
