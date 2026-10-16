import Hero from "@/components/home/Hero";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full bg-[#FFF9F2]">
      <Hero />

      {/* Feature Highlights Section */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF2E8]/60 relative border-t border-[#D4AF70]/20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-[#6D214F]/10 border border-[#6D214F]/20 text-[#6D214F] text-xs font-bold uppercase tracking-wider">
              Easy & Fast
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#29212A] font-serif">
              Everything You Need to Create Your Perfect Invite
            </h2>
            <p className="text-base sm:text-lg text-[#29212A]/75 font-light">
              No complicated design software or login required. Just open the editor, customize your wedding text, and download immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#FFF9F2] border border-[#D4AF70]/30 shadow-sm hover:shadow-xl hover:shadow-[#6D214F]/10 hover:border-[#D4AF70] transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#D4AF70]/40 flex items-center justify-center text-2xl shadow-sm text-[#6D214F]">
                  🎨
                </div>
                <h3 className="text-xl font-bold text-[#29212A] font-serif">Canva-Style Drag & Drop Editor</h3>
                <p className="text-[#29212A]/75 text-sm leading-relaxed">
                  Click and drag any text on the poster. Choose from royal calligraphy fonts (Great Vibes, Playfair, Cinzel, Rozha One) and traditional Indian wedding colors like royal burgundy and champagne gold.
                </p>
              </div>
              <div className="pt-6 border-t border-[#D4AF70]/20 mt-6">
                <Link href="/editor" className="text-xs font-bold text-[#6D214F] hover:text-[#56183D] flex items-center gap-1">
                  Try the Editor →
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#FFF9F2] border border-[#D4AF70]/30 shadow-sm hover:shadow-xl hover:shadow-[#6D214F]/10 hover:border-[#D4AF70] transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#D4AF70]/40 flex items-center justify-center text-2xl shadow-sm">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-[#29212A] font-serif">Free Download (Watermarked)</h3>
                <p className="text-[#29212A]/75 text-sm leading-relaxed">
                  Want to draft and show family members before finalizing? Download unlimited instant previews with a subtle watermark for 100% free with no login needed.
                </p>
              </div>
              <div className="pt-6 border-t border-[#D4AF70]/20 mt-6">
                <span className="text-xs font-bold text-[#6D214F]">Instant PNG Export</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#FFF9F2] border border-[#D4AF70]/30 shadow-sm hover:shadow-xl hover:shadow-[#6D214F]/10 hover:border-[#D4AF70] transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#D4AF70]/40 flex items-center justify-center text-2xl shadow-sm text-[#D4AF70]">
                  💎
                </div>
                <h3 className="text-xl font-bold text-[#29212A] font-serif">Pay & Download Ultra HD</h3>
                <p className="text-[#29212A]/75 text-sm leading-relaxed">
                  Ready to send to your guests? Pay just ₹49 via UPI/QR code or Card to unlock the watermark-free Ultra HD 300 DPI poster ready for WhatsApp & physical print.
                </p>
              </div>
              <div className="pt-6 border-t border-[#D4AF70]/20 mt-6">
                <span className="text-xs font-bold text-[#D4AF70]">Zero Watermark • Print Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Step-by-Step Guide */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF9F2]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-[#29212A] font-serif">How to Make Your Wedding Invitation</h2>
            <p className="text-[#29212A]/70 text-sm">3 simple steps to a stunning wedding poster</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 p-6 rounded-2xl bg-[#FAF2E8]/80 border border-[#D4AF70]/25">
              <div className="w-10 h-10 rounded-full bg-[#6D214F] text-[#FFF9F2] font-bold text-sm flex items-center justify-center mx-auto border border-[#D4AF70]/30 shadow-sm">1</div>
              <h4 className="font-bold text-[#29212A]">Open the Poster Editor</h4>
              <p className="text-xs text-[#29212A]/70">Click &quot;Design Poster&quot; to load our hand-illustrated Indian chibi wedding poster in your browser.</p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-[#FAF2E8]/80 border border-[#D4AF70]/25">
              <div className="w-10 h-10 rounded-full bg-[#8E2D67] text-[#FFF9F2] font-bold text-sm flex items-center justify-center mx-auto border border-[#D4AF70]/30 shadow-sm">2</div>
              <h4 className="font-bold text-[#29212A]">Customize Text & Fonts</h4>
              <p className="text-xs text-[#29212A]/70">Type couple names, date, venue, and drag text blocks anywhere you want on the invitation.</p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-[#FAF2E8]/80 border border-[#D4AF70]/25">
              <div className="w-10 h-10 rounded-full bg-[#D4AF70] text-[#29212A] font-bold text-sm flex items-center justify-center mx-auto border border-[#D4AF70]/50 shadow-sm">3</div>
              <h4 className="font-bold text-[#29212A]">Download & Share</h4>
              <p className="text-xs text-[#29212A]/70">Download for free with a watermark, or unlock clean Ultra HD (₹49) and share directly via WhatsApp!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Big Action CTA Banner */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#29212A] via-[#401931] to-[#29212A] relative overflow-hidden text-[#FFF9F2] text-center border-t border-[#D4AF70]/25">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-[#D4AF70]">
            Start Designing Your Invitation Today
          </h2>
          <p className="text-base sm:text-lg text-[#FFF9F2]/80 font-light">
            No registration needed. Open the Canva-style editor right now and preview your personalized wedding poster in under 60 seconds.
          </p>
          <div className="pt-4">
            <Link
              href="/editor"
              className="inline-flex px-8 py-4 rounded-full bg-gradient-to-r from-[#6D214F] via-[#D4AF70] to-[#6D214F] text-[#FFF9F2] font-bold text-base shadow-2xl hover:brightness-110 active:scale-95 transition-all border border-[#D4AF70]/40"
            >
              Open Poster Editor Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
