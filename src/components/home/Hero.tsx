import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF9F2] via-[#FAF2E8] to-[#FFF9F2] pt-24 pb-16">
      {/* Decorative gradient blur blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#D4AF70]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#6D214F]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline and CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF70]/40 bg-[#FFF9F2]/90 shadow-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#6D214F] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#6D214F]">
              Traditional Indian Poster & Animated Video Maker
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#29212A] leading-[1.15]">
            Design Your Dream <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D214F] via-[#922D6A] to-[#D4AF70] font-serif italic">
              Wedding Invitation
            </span>{" "}
            in Minutes
          </h1>

          <p className="text-base sm:text-lg text-[#29212A]/80 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Customize our hand-crafted Traditional Indian Chibi Wedding design as a <strong>Static Poster</strong> or <strong>Live Animated Video</strong> directly in our Canva-like editor. 
            Drag text, choose royal calligraphy fonts, and play animated previews for free. 
            <strong className="text-[#29212A] font-semibold block mt-1">No login or sign-up needed.</strong>
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6D214F]/10 border border-[#6D214F]/25 text-[#6D214F]">
              🎬 Free Live Video Preview
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF70]/15 border border-[#D4AF70]/35 text-[#7A5B28]">
              🖼️ Free Watermarked Poster Download
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D4AF70]/50 text-[#29212A] shadow-sm">
              💎 Ultra HD Poster (₹49) & 1080p Video (₹99)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-3">
            <Link
              href="/editor"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#6D214F] via-[#7F265C] to-[#6D214F] text-[#FFF9F2] font-bold text-base hover:brightness-105 shadow-xl shadow-[#6D214F]/25 border border-[#D4AF70]/40 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Customize This Poster Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D4AF70] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/templates"
              className="px-7 py-4 rounded-full bg-white text-[#29212A] font-semibold hover:bg-[#FAF2E8] transition-all border border-[#D4AF70]/40 shadow-sm active:scale-95 flex items-center justify-center"
            >
              Browse Templates
            </Link>
          </div>

          <p className="text-xs text-[#29212A]/50 text-center lg:text-left">
            ⚡ Quick edit in 2 minutes • Instant high-res export
          </p>
        </div>

        {/* Right Column: Live Poster Card Showcase */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] group">
            {/* Glowing Backdrop */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#6D214F] via-[#D4AF70] to-[#6D214F] rounded-3xl blur-xl opacity-30 group-hover:opacity-45 transition-opacity" />

            {/* Poster Card */}
            <div className="relative bg-white rounded-3xl p-3 shadow-2xl border-2 border-[#D4AF70]/30 overflow-hidden">
              <div className="relative aspect-[572/1024] w-full rounded-2xl overflow-hidden shadow-inner bg-[#FFF9F2]">
                <Image
                  src="/poster-template.jpg"
                  alt="Indian Traditional Wedding Poster Template"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Simulated live text showcase */}
                <div className="absolute inset-0 flex flex-col items-center pointer-events-none pt-[19%]">
                  <span className="font-rozha text-[#6D214F] text-xs font-bold tracking-wider">
                    || श्री गणेशाय नमः ||
                  </span>
                  <span className="font-montserrat text-[#29212A]/80 text-[8px] font-semibold tracking-widest uppercase mt-2">
                    Together With Their Families
                  </span>
                  <div className="font-great-vibes text-[#6D214F] text-2xl drop-shadow-sm mt-1">
                    Aarav & Diya
                  </div>
                  <span className="font-cinzel text-[#6D214F] text-[9px] font-bold tracking-wide uppercase mt-6">
                    12 December 2026
                  </span>
                </div>

                {/* Interactive Hover CTA Badge */}
                <Link
                  href="/editor"
                  className="absolute inset-0 bg-[#29212A]/50 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6 text-center"
                >
                  <span className="w-12 h-12 rounded-full bg-[#FFF9F2] text-[#6D214F] flex items-center justify-center shadow-lg text-xl transform group-hover:scale-110 transition-transform border border-[#D4AF70]/50">
                    ✏️
                  </span>
                  <span className="px-5 py-2.5 rounded-full bg-[#6D214F] text-[#FFF9F2] font-bold text-sm shadow-xl border border-[#D4AF70]/40">
                    Open in Canva Editor →
                  </span>
                  <span className="text-[11px] text-[#FFF9F2]/90 font-medium">
                    Edit names, date & download
                  </span>
                </Link>
              </div>

              {/* Card Meta */}
              <div className="pt-3 pb-1 px-1 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-[#29212A] text-sm">
                    Traditional Indian Chibi Wedding
                  </h3>
                  <p className="text-[11px] text-[#29212A]/60">
                    Hand-illustrated Mandap & Havan
                  </p>
                </div>
                <Link
                  href="/editor"
                  className="px-3.5 py-1.5 rounded-full bg-[#6D214F] hover:bg-[#56183D] text-[#FFF9F2] text-xs font-bold transition-colors border border-[#D4AF70]/30"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
