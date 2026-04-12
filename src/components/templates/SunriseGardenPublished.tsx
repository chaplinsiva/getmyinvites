"use client";

import { useEffect, useState } from "react";
import { Libre_Baskerville, Nunito } from "next/font/google";
import InvitationShareDock from "@/components/invitation/InvitationShareDock";
import { getCoupleFromCustomizedData, invitationFlags } from "@/lib/invitation-share";
import { StaticInvitationText } from "./StaticInvitationText";
import PublishedRsvpBlock from "./PublishedRsvpBlock";

const serif = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });
const round = Nunito({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function SunriseGardenPublished({ data, invitationId }: { data: any; invitationId: string }) {
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
    <div className={`relative min-h-screen ${round.className} bg-gradient-to-b from-rose-50 via-orange-50/40 to-amber-50 text-stone-800`}>
      <div className="fixed inset-0 opacity-[0.15] pointer-events-none -z-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f43f5e\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      {showShare && <InvitationShareDock shareUrl="" heroImageUrl={media.heroImage} nameFirst={couple.first} nameSecond={couple.second} variant="light" />}
      <a href="/" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-white/95 backdrop-blur rounded-full px-4 py-2 border border-rose-200 shadow-lg text-[10px] font-bold uppercase tracking-wider text-rose-600">
        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-white flex items-center justify-center text-[10px]">M</span>
        <span className="hidden sm:inline">MakeMyInvites</span>
      </a>

      <section className="relative min-h-[100svh] flex flex-col items-center justify-end pb-20 sm:pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.heroImage}')`, transform: `translateY(${scrollY * 0.25}px) scale(1.08)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-100/95 via-orange-100/40 to-transparent" />
        <div className="relative z-10 text-center max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-rose-200/60 text-[10px] font-bold tracking-[0.35em] uppercase text-rose-600 mb-8">Wedding</div>
          <div className="flex flex-wrap justify-center items-baseline gap-2 sm:gap-4 mb-4">
            <StaticInvitationText node={t.p1} className={`${serif.className} text-4xl sm:text-6xl md:text-7xl font-bold text-rose-950`} />
            <StaticInvitationText node={t.amp} className={`${serif.className} text-2xl sm:text-4xl text-orange-500 italic px-1`} />
            <StaticInvitationText node={t.p2} className={`${serif.className} text-4xl sm:text-6xl md:text-7xl font-bold text-rose-950`} />
          </div>
          <StaticInvitationText node={t["hero-subtitle"]} className="text-sm tracking-[0.25em] uppercase text-rose-800/70 font-semibold" />
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-rose-200/50 shadow-xl shadow-rose-200/30 p-10 sm:p-14 text-center">
          <StaticInvitationText node={t["details-title"]} className={`${serif.className} text-3xl sm:text-4xl text-rose-950 mb-10`} />
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 p-6 border border-rose-100">
              <StaticInvitationText node={t["lbl-when"]} className="text-[10px] font-bold tracking-[0.25em] uppercase text-rose-500 mb-2" />
              <StaticInvitationText node={t.date} className={`${serif.className} text-xl text-stone-900`} />
              <StaticInvitationText node={t.time} className="text-stone-500 text-sm mt-1" />
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 p-6 border border-orange-100">
              <StaticInvitationText node={t["lbl-where"]} className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-600 mb-2" />
              <StaticInvitationText node={t.venue} className={`${serif.className} text-xl text-stone-900`} />
              <StaticInvitationText node={t.address} className="text-stone-500 text-sm mt-1" />
            </div>
          </div>
        </div>
      </section>

      <section className={`flex flex-col ${showRsvp ? "md:flex-row" : ""} items-stretch bg-white/50`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 p-10 sm:p-16 md:p-20 flex flex-col justify-center">
            <StaticInvitationText node={t["story-title"]} className={`${serif.className} text-3xl sm:text-4xl text-rose-950 mb-6`} />
            <StaticInvitationText node={t["story-desc"]} className="text-stone-600 leading-relaxed mb-10" />
            <PublishedRsvpBlock invitationId={invitationId} rsvpFields={rsvpFields} palette="coralCream" titleFontClassName={serif.className} t={t} />
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : ""} min-h-[45vh] relative rounded-t-[3rem] md:rounded-none overflow-hidden shadow-inner`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')`, transform: `translateY(${(scrollY - 500) * 0.08}px) scale(1.06)` }} />
        </div>
      </section>

      <footer className="py-16 text-center bg-gradient-to-r from-rose-600 to-orange-500 text-white">
        <StaticInvitationText node={t["footer-names"]} className={`${serif.className} text-3xl sm:text-4xl mb-3`} />
        <StaticInvitationText node={t["footer-sub"]} className="text-[10px] uppercase tracking-[0.35em] text-white/80" />
      </footer>
    </div>
  );
}
