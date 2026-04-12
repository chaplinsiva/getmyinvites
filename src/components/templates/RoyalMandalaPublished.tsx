"use client";

import { useState, useEffect } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import InvitationShareDock from "@/components/invitation/InvitationShareDock";
import { getCoupleFromCustomizedData, invitationFlags } from "@/lib/invitation-share";

const cormorant = Cormorant_Garamond({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });
const dmSans = DM_Sans({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

function MandalaDecor({ className = "", size = 300 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 200 200" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      {[...Array(12)].map((_, i) => (
        <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.3" opacity="0.12" transform={`rotate(${i * 15} 100 100)`} />
      ))}
      {[...Array(8)].map((_, i) => (
        <ellipse key={`e${i}`} cx="100" cy="40" rx="12" ry="25" stroke="currentColor" strokeWidth="0.4" opacity="0.18" transform={`rotate(${i * 45} 100 100)`} />
      ))}
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8 sm:my-12">
      <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-400/60" />
      <span className="text-amber-400 text-xl opacity-70">✦</span>
      <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-400/60" />
    </div>
  );
}

export default function RoyalMandalaPublished({ data, invitationId }: { data: any; invitationId: string }) {
  const [scrollY, setScrollY] = useState(0);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const media = data?.media || { heroImage: "", storyImage: "" };
  const rsvpFields = data?.rsvpFields || [];
  const tc = data?.textContent || {};
  const t = (id: string, fallback: string) => tc[id]?.text || fallback;
  const couple = getCoupleFromCustomizedData(data);
  const { showRsvp, showShare } = invitationFlags(data);

  const handleRsvp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fields: Record<string, any> = {};
    rsvpFields.forEach((f: any) => {
      fields[f.id] = f.type === "checkbox" ? formData.get(f.id) === "on" : formData.get(f.id);
    });
    await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invitationId, fields, fieldDefs: rsvpFields }),
    });
    setRsvpSubmitted(true);
  };

  return (
    <div className={`relative min-h-screen ${dmSans.className} text-white overflow-hidden`}>
      <div className="fixed inset-0 bg-gradient-to-br from-[#2D0A0A] via-[#4A0E0E] to-[#1A0505] -z-20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_60%_20%,_rgba(180,80,20,0.15),_transparent_70%)] -z-10" />

      {/* HERO */}
      <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.heroImage}')`, transform: `scale(1.1) translateY(${scrollY * 0.2}px)` }} />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#2D0A0A]/70 via-[#4A0E0E]/60 to-[#2D0A0A]/90" />
        <MandalaDecor className="absolute top-[-80px] right-[-80px] sm:top-[-50px] sm:right-[-50px] text-amber-400/20 z-10 pointer-events-none" size={350} />
        <MandalaDecor className="absolute bottom-[-100px] left-[-100px] text-amber-400/15 z-10 pointer-events-none" size={400} />

        <div className="relative z-20 text-center px-6 flex flex-col items-center max-w-3xl mx-auto">
          <div className="text-amber-400/80 text-4xl sm:text-5xl mb-4">🙏</div>
          <p className="text-amber-300/90 text-xs sm:text-sm tracking-[0.5em] uppercase font-light mb-8 sm:mb-12">{t("hero-blessing", "Shri Ganeshaya Namah")}</p>
          <GoldDivider />
          <p className="text-amber-100/60 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 sm:mb-10">{t("hero-invite-line", "Together with their families")}</p>
          <div className="flex flex-col items-center gap-1 sm:gap-2 mb-4">
            <h1 className={`${cormorant.className} text-6xl sm:text-7xl md:text-9xl font-light tracking-wider text-amber-50 drop-shadow-[0_4px_24px_rgba(212,175,55,0.3)]`}>{t("p1", "Priya")}</h1>
            <div className="flex items-center gap-4 my-2 sm:my-4">
              <div className="h-px w-8 sm:w-16 bg-amber-400/40" />
              <span className={`${cormorant.className} text-3xl sm:text-4xl text-amber-400 italic`}>{t("amp", "&")}</span>
              <div className="h-px w-8 sm:w-16 bg-amber-400/40" />
            </div>
            <h1 className={`${cormorant.className} text-6xl sm:text-7xl md:text-9xl font-light tracking-wider text-amber-50 drop-shadow-[0_4px_24px_rgba(212,175,55,0.3)]`}>{t("p2", "Rajesh")}</h1>
          </div>
          <p className="text-amber-200/60 text-sm sm:text-base max-w-md leading-relaxed mt-6 sm:mt-8 font-light">{t("hero-subtitle", "Request the honour of your presence at their wedding celebration")}</p>
          <GoldDivider />
        </div>
      </section>

      {/* DETAILS */}
      <section className="relative z-30 py-20 sm:py-32 px-6">
        <MandalaDecor className="absolute top-10 left-1/2 -translate-x-1/2 text-amber-400/5 pointer-events-none" size={500} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className={`${cormorant.className} text-4xl sm:text-6xl text-amber-100 mb-4`}>{t("details-title", "Wedding Ceremony")}</h2>
          <GoldDivider />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mt-12 sm:mt-16">
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-amber-400/10 backdrop-blur-sm">
              <span className="text-3xl mb-4">🪔</span>
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-amber-400/70 mb-3">{t("lbl-when", "Date")}</p>
              <p className={`${cormorant.className} text-xl sm:text-2xl text-amber-50`}>{t("date", "December 12, 2026")}</p>
            </div>
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-amber-400/10 backdrop-blur-sm">
              <span className="text-3xl mb-4">⏰</span>
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-amber-400/70 mb-3">{t("lbl-time", "Muhurat")}</p>
              <p className={`${cormorant.className} text-xl sm:text-2xl text-amber-50`}>{t("time", "7:30 PM Onwards")}</p>
            </div>
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-amber-400/10 backdrop-blur-sm">
              <span className="text-3xl mb-4">🏛️</span>
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-amber-400/70 mb-3">{t("lbl-venue", "Venue")}</p>
              <p className={`${cormorant.className} text-xl sm:text-2xl text-amber-50`}>{t("venue", "The Grand Palace")}</p>
              <p className="text-amber-200/40 text-sm mt-2">{t("address", "Jaipur, Rajasthan")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="relative z-20 py-16 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`${cormorant.className} text-3xl sm:text-5xl text-amber-100 mb-4`}>{t("events-title", "Celebration Events")}</h2>
            <GoldDivider />
          </div>
          <div className="space-y-6 sm:space-y-8">
            {[
              { icon: "🎶", name: t("e1-name", "Sangeet & Mehndi"), time: t("e1-time", "December 10 · 6:00 PM"), desc: t("e1-desc", "An evening of music, dance and mehndi celebrations with family and friends."), showLine: true },
              { icon: "💛", name: t("e2-name", "Haldi Ceremony"), time: t("e2-time", "December 11 · 10:00 AM"), desc: t("e2-desc", "A sacred ceremony where turmeric paste is applied to bless the couple."), showLine: true },
              { icon: "🔥", name: t("e3-name", "Wedding Ceremony & Reception"), time: t("e3-time", "December 12 · 7:30 PM"), desc: t("e3-desc", "The sacred pheras around the holy fire, followed by a grand reception dinner."), showLine: false },
            ].map((event, i) => (
              <div key={i} className="flex gap-4 sm:gap-6 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-amber-900/40">{event.icon}</div>
                  {event.showLine && <div className="w-px h-full min-h-[40px] bg-amber-400/20 mt-2" />}
                </div>
                <div className="pb-6 sm:pb-8">
                  <h3 className={`${cormorant.className} text-xl sm:text-2xl text-amber-100 mb-1`}>{event.name}</h3>
                  <p className="text-xs sm:text-sm text-amber-300/50 mb-2">{event.time}</p>
                  <p className="text-sm text-amber-100/50 font-light leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP + IMAGE */}
      <section className={`relative z-20 w-full flex flex-col-reverse items-stretch ${showRsvp ? "md:flex-row" : ""}`}>
        {showRsvp && (
          <div className="w-full md:w-1/2 px-6 py-12 sm:px-12 sm:py-20 md:px-16 flex flex-col justify-center items-center">
            <div className="w-full max-w-md">
              <h2 className={`${cormorant.className} text-3xl sm:text-4xl text-amber-100 mb-2 text-center`}>{t("rsvp-heading", "You are cordially invited")}</h2>
              <p className="text-amber-200/40 text-sm text-center mb-8">{t("rsvp-sub", "Please let us know if you can join our celebration")}</p>
              <div className="bg-white/[0.04] border border-amber-400/15 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-black/20">
                <p className="text-xs font-bold tracking-[0.4em] uppercase text-amber-400 mb-6 text-center">{t("rsvp-title", "RSVP")}</p>
                {rsvpSubmitted ? (
                  <div className="text-center py-8">
                    <p className="text-3xl mb-4">🎉</p>
                    <p className={`${cormorant.className} text-2xl text-amber-100 mb-2`}>Thank you!</p>
                    <p className="text-amber-200/50 text-sm">Your RSVP has been recorded.</p>
                  </div>
                ) : (
                  <form className="flex flex-col gap-4" onSubmit={handleRsvp}>
                    {rsvpFields.map((f: any) =>
                      f.type === "checkbox" ? (
                        <label key={f.id} className="flex items-center gap-3 mt-1 cursor-pointer group">
                          <input type="checkbox" name={f.id} required={f.required} className="w-4 h-4 rounded accent-amber-500" />
                          <span className="text-sm text-amber-100/80 group-hover:text-amber-100">{f.label} {f.required && <span className="text-red-400">*</span>}</span>
                        </label>
                      ) : (
                        <input key={f.id} type={f.type} name={f.id} required={f.required} placeholder={`${f.label}${f.required ? " *" : ""}`} className="w-full px-4 py-3 bg-white/5 border border-amber-400/30 rounded-lg text-sm text-white placeholder:text-amber-200/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all" />
                      )
                    )}
                    <button type="submit" className="w-full py-4 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg">Send RSVP</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
        <div className={`w-full ${showRsvp ? "md:w-1/2" : "md:w-full"} min-h-[45vh] sm:min-h-[55vh] md:min-h-full relative overflow-hidden`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${media.storyImage}')`, transform: `scale(1.1) translateY(${(scrollY - 1200) * 0.08}px)` }} />
          <div className="absolute inset-0 bg-gradient-to-l from-[#2D0A0A]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2D0A0A] to-transparent md:hidden" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-30 py-16 sm:py-24 text-center flex flex-col items-center px-6 border-t border-amber-400/10">
        <MandalaDecor className="absolute top-[-60px] left-1/2 -translate-x-1/2 text-amber-400/8 pointer-events-none" size={250} />
        <h2 className={`${cormorant.className} text-4xl sm:text-6xl text-amber-100/90 italic mb-4`}>{t("footer-names", "Priya & Rajesh")}</h2>
        <p className="text-amber-400/50 text-sm sm:text-base tracking-wider mb-2">{t("footer-tagline", "सात फेरे, सात जन्म")}</p>
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-amber-200/30 mt-4">{t("footer-sub", "We can't wait to celebrate with you!")}</p>
      </footer>

      {showShare && (
        <InvitationShareDock
          shareUrl=""
          heroImageUrl={media.heroImage}
          nameFirst={couple.first}
          nameSecond={couple.second}
          variant="dark"
        />
      )}

      {/* Watermark */}
      <a href="/" className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#2D0A0A]/90 backdrop-blur-md shadow-lg border border-amber-400/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-amber-200 hover:bg-[#2D0A0A] transition-all group">
        <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-serif group-hover:rotate-12 transition-transform">M</span>
        <span className="hidden sm:block">Made with MakeMyInvites</span>
      </a>
    </div>
  );
}
