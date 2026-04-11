"use client";

import { useEffect, useState } from "react";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const montserrat = Montserrat({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });

function StaticText({ node, className, style = {} }: any) {
  if (!node) return null;
  return (
    <div 
      className={className}
      style={{
        transform: `translate(${node.x ?? 0}px, ${node.y ?? 0}px)`,
        whiteSpace: 'pre-wrap',
        ...style
      }}
    >
      {node.text}
    </div>
  );
}

export default function ModernSerenityPublished({ data, invitationId }: { data: any; invitationId: string }) {
  const [scrollY, setScrollY] = useState(0);
  const media = data.media || {};
  const t = data.textContent || {};
  const rsvpFields = data.rsvpFields || [];

  const [rsvpState, setRsvpState] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId, fields: rsvpState, fieldDefs: rsvpFields }),
      });
      const r = await res.json();
      if (r.error) {
        alert("Error submitting RSVP: " + r.error);
      } else {
        setSubmitted(true);
      }
    } catch {
      alert("Failed to submit RSVP. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className={`relative min-h-screen ${montserrat.className} bg-white text-slate-800`}>
      {/* ─── MakeMyInvites Watermark ── */}
      <a
        href="https://makemyinvites.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg rounded-full px-4 py-2 hover:shadow-xl transition-all hover:scale-105 group"
      >
        <span className="text-base">💌</span>
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 group-hover:text-slate-900 transition-colors">
          Made with MakeMyInvites
        </span>
      </a>
      {/* HERO SECTION */}
      <section className="relative w-full h-[100vh] overflow-hidden flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${media.heroImage}')`,
            transform: `translateY(${scrollY * 0.4}px) scale(1.1)`,
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        <div
          className="relative z-20 text-center text-white mt-auto pb-32 px-6 flex flex-col items-center"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <StaticText node={t["p1"]} className={`${playfair.className} text-6xl md:text-8xl font-medium tracking-tight mb-6 leading-none drop-shadow-2xl`} />
            <StaticText node={t["amp"]} className="text-4xl italic font-light opacity-80 mx-2 mb-6" />
            <StaticText node={t["p2"]} className={`${playfair.className} text-6xl md:text-8xl font-medium tracking-tight mb-6 leading-none drop-shadow-2xl`} />
          </div>
          <StaticText node={t["hero-subtitle"]} className="text-sm md:text-base tracking-[0.4em] uppercase font-medium opacity-90" />
        </div>
      </section>

      {/* DETAILS SECTION */}
      <section className="relative z-30 bg-white py-32 px-6 shadow-2xl flex flex-col items-center">
        <div className="w-px h-24 bg-slate-300 mx-auto mb-16" />
        <StaticText node={t["details-title"]} className={`${playfair.className} text-4xl md:text-5xl text-slate-900 mb-16 text-center`} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-24 text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center group">
            <span className="text-3xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">✨</span>
            <StaticText node={t["lbl-when"]} className="text-sm font-bold tracking-[0.2em] uppercase text-slate-400 mb-3" />
            <StaticText node={t["date"]} className={`${playfair.className} text-2xl text-slate-800`} />
            <StaticText node={t["time"]} className="text-slate-500 mt-2" />
          </div>

          <div className="flex flex-col items-center group">
            <span className="text-3xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">🥂</span>
            <StaticText node={t["lbl-where"]} className="text-sm font-bold tracking-[0.2em] uppercase text-slate-400 mb-3" />
            <StaticText node={t["venue"]} className={`${playfair.className} text-2xl text-slate-800`} />
            <StaticText node={t["address"]} className="text-slate-500 mt-2" />
          </div>
        </div>
      </section>

      {/* STORY + RSVP SPLIT SECTION */}
      <section className="w-full flex flex-col md:flex-row items-stretch min-h-[80vh] bg-slate-50 relative z-20">
        <div className="w-full md:w-1/2 p-16 md:p-32 flex flex-col justify-center items-start">
          <StaticText node={t["story-title"]} className={`${playfair.className} text-4xl md:text-5xl text-slate-900 mb-8`} />
          <StaticText node={t["story-desc"]} className="text-lg text-slate-600 leading-relaxed font-light mb-12 text-left" />

          {/* RSVP CARD */}
          <div className="bg-white p-8 border border-slate-100 shadow-xl rounded-2xl w-full max-w-sm">
            <StaticText node={t["rsvp-title"]} className="text-sm font-bold tracking-[0.2em] uppercase text-slate-900 mb-6 text-center block w-full" />

            {submitted ? (
              <div className="text-center py-8">
                <p className="text-2xl mb-3">🎉</p>
                <p className={`${playfair.className} text-xl text-slate-900 mb-2`}>Thank you!</p>
                <p className="text-slate-500 text-sm">Your RSVP has been received. We can&apos;t wait to celebrate with you.</p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="flex flex-col gap-4">
                {rsvpFields.map((f: any) =>
                  f.type === "checkbox" ? (
                    <label key={f.id} className="flex items-center gap-3 mt-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        onChange={(e) => setRsvpState({ ...rsvpState, [f.id]: e.target.checked })}
                        required={f.required}
                        className="w-4 h-4 rounded border-slate-300 focus:ring-slate-900"
                      />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                        {f.label} {f.required && <span className="text-rose-500">*</span>}
                      </span>
                    </label>
                  ) : (
                    <input
                      key={f.id}
                      type={f.type}
                      required={f.required}
                      placeholder={`${f.label}${f.required ? " *" : ""}`}
                      onChange={(e) => setRsvpState({ ...rsvpState, [f.id]: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-shadow placeholder:text-slate-400"
                    />
                  )
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting
                    ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : (t["btn-rsvp"]?.text || "Send RSVP")}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-full relative overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${media.storyImage}')`,
              transform: `scale(1.2) translateY(${(scrollY - 600) * 0.15}px)`,
            }}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-24 text-center z-30 relative flex flex-col items-center border-t-4 border-slate-800">
        <StaticText node={t["footer-names"]} className={`${playfair.className} text-5xl italic mb-6 opacity-90`} />
        <StaticText node={t["footer-sub"]} className="text-xs uppercase tracking-[0.4em] text-slate-400" />
      </footer>
    </div>
  );
}
