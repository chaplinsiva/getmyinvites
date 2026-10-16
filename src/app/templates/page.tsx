"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TemplatesPage() {
  const [activeMedia, setActiveMedia] = useState<"video" | "poster">("video");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#FFF9F2] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF70]/40 bg-[#FAF2E8] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#6D214F] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#6D214F]">
              Signature Wedding Invitation Template
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#29212A] leading-tight">
            Traditional Indian Chibi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D214F] via-[#922D6A] to-[#D4AF70] italic">
              Wedding Invitation
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#29212A]/75 font-light leading-relaxed">
            Our signature hand-illustrated Indian couple chibi design under a royal floral mandap with traditional marigold garlands and auspicious Ganpati shloka. 
            Available in two formats: <strong>Animated Video (1080p)</strong> and <strong>Static Poster (300 DPI)</strong>.
          </p>
        </div>

        {/* Media Switcher Tab */}
        <div className="flex justify-center">
          <div className="inline-flex bg-[#FAF2E8] p-1.5 rounded-full border border-[#D4AF70]/40 shadow-inner">
            <button
              onClick={() => setActiveMedia("video")}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeMedia === "video"
                  ? "bg-[#6D214F] text-[#FFF9F2] shadow-md shadow-[#6D214F]/25"
                  : "text-[#29212A]/70 hover:text-[#29212A]"
              }`}
            >
              <span>🎬 Animated Video (1080p)</span>
            </button>
            <button
              onClick={() => setActiveMedia("poster")}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeMedia === "poster"
                  ? "bg-[#6D214F] text-[#FFF9F2] shadow-md shadow-[#6D214F]/25"
                  : "text-[#29212A]/70 hover:text-[#29212A]"
              }`}
            >
              <span>🖼️ Printable Poster (300 DPI)</span>
            </button>
          </div>
        </div>

        {/* Main Showcase Grid for the Template */}
        <div className="bg-white rounded-3xl border border-[#D4AF70]/30 shadow-xl overflow-hidden p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Live Visual (Video player or Static Poster) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF70]/40 bg-[#FAF2E8] group">
              {activeMedia === "video" ? (
                <div className="relative w-full h-full">
                  <video
                    src="/wedding-animation.mp4"
                    autoPlay
                    loop
                    muted={!isAudioPlaying}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Audio Mute/Unmute toggle */}
                  <button
                    onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    aria-label="Toggle audio"
                    className="absolute bottom-4 right-4 z-20 px-3.5 py-2 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-[#FFF9F2] text-xs font-semibold flex items-center gap-1.5 shadow-lg border border-white/20 transition-all hover:scale-105"
                  >
                    <span>{isAudioPlaying ? "🔊 Sound On" : "🔇 Unmute Audio"}</span>
                  </button>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src="/poster-template.jpg"
                    alt="Traditional Indian Chibi Wedding Poster Template"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              {/* Format Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-full bg-[#29212A]/85 backdrop-blur-md text-[#FFF9F2] text-xs font-semibold border border-[#D4AF70]/30 shadow-md">
                  {activeMedia === "video" ? "🎬 1080p Animated Video" : "🖼️ Ultra HD 300 DPI Poster"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Template Details & Options */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6D214F]">
                Hand-Illustrated Chibi Design
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#29212A]">
                {activeMedia === "video" 
                  ? "Live Animated Video Invitation" 
                  : "Ultra HD Wedding Invitation Poster"}
              </h2>
              <p className="text-sm sm:text-base text-[#29212A]/75 font-light leading-relaxed">
                {activeMedia === "video"
                  ? "A 1080p vertical motion-graphic invitation complete with musical beats, animated elements, and dynamic typography customized with your couple names and ceremony schedule."
                  : "A print-ready 300 DPI poster suitable for WhatsApp invitations and physical framing. Choose royal fonts like Rozha One, Great Vibes, Playfair, and Montserrat."}
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#FAF2E8]/70 border border-[#D4AF70]/30 space-y-1">
                <p className="text-xs font-bold text-[#6D214F] flex items-center gap-1.5">
                  <span>✓</span>
                  <span>Drag & Drop Editor</span>
                </p>
                <p className="text-[11px] text-[#29212A]/70">
                  Click and drag any text block anywhere on the invitation canvas.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF2E8]/70 border border-[#D4AF70]/30 space-y-1">
                <p className="text-xs font-bold text-[#6D214F] flex items-center gap-1.5">
                  <span>✓</span>
                  <span>{activeMedia === "video" ? "1080p MP4 Video" : "300 DPI Ultra HD"}</span>
                </p>
                <p className="text-[11px] text-[#29212A]/70">
                  {activeMedia === "video" 
                    ? "Full 1080p vertical video ready for WhatsApp Status & Instagram Story." 
                    : "Zero watermark, high-resolution PNG ready for print and sharing."}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF2E8]/70 border border-[#D4AF70]/30 space-y-1">
                <p className="text-xs font-bold text-[#6D214F] flex items-center gap-1.5">
                  <span>✓</span>
                  <span>Instant Free Preview</span>
                </p>
                <p className="text-[11px] text-[#29212A]/70">
                  Preview in real-time in your browser for 100% free with no account needed.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF2E8]/70 border border-[#D4AF70]/30 space-y-1">
                <p className="text-xs font-bold text-[#6D214F] flex items-center gap-1.5">
                  <span>✓</span>
                  <span>Instant Delivery via UPI</span>
                </p>
                <p className="text-[11px] text-[#29212A]/70">
                  Pay {activeMedia === "video" ? "₹99" : "₹49"} via GPay/PhonePe QR code for immediate download.
                </p>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3.5">
              <Link
                href={`/editor?mode=${activeMedia}`}
                className="flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-[#6D214F] via-[#7F265C] to-[#6D214F] text-[#FFF9F2] text-sm font-bold text-center hover:brightness-105 shadow-xl shadow-[#6D214F]/25 border border-[#D4AF70]/40 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Customize This {activeMedia === "video" ? "Video" : "Poster"} Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D4AF70]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <button
                onClick={() => setActiveMedia(activeMedia === "video" ? "poster" : "video")}
                className="py-4 px-6 rounded-full bg-white hover:bg-[#FAF2E8] text-[#29212A] text-sm font-semibold border border-[#D4AF70]/40 transition-all active:scale-95"
              >
                Switch to {activeMedia === "video" ? "Printable Poster" : "Animated Video"}
              </button>
            </div>
          </div>
        </div>

        {/* Both Formats Side-by-Side Quick Cards */}
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-serif font-bold text-[#29212A]">
              Choose Your Preferred Format
            </h3>
            <p className="text-xs sm:text-sm text-[#29212A]/70">
              Both formats use the same beautiful hand-illustrated Indian chibi design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Poster Card */}
            <div className="p-8 rounded-3xl bg-white border border-[#D4AF70]/30 shadow-md hover:shadow-xl transition-all space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6D214F]/10 border border-[#6D214F]/20 flex items-center justify-center text-2xl">
                  🖼️
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6D214F]">Print & Digital Poster</span>
                  <h4 className="text-2xl font-serif font-bold text-[#29212A]">Traditional Chibi Poster</h4>
                </div>
                <p className="text-sm text-[#29212A]/75 font-light leading-relaxed">
                  Best for framing, wedding signage, and sending as a high-resolution image over WhatsApp and email.
                </p>
                <div className="space-y-1.5 text-xs text-[#29212A]/80">
                  <p>• <strong>Free Preview:</strong> Unlimited watermarked PNG download</p>
                  <p>• <strong>Ultra HD Unlock:</strong> ₹49 clean 300 DPI print-ready export</p>
                  <p>• <strong>Customization:</strong> Drag and drop couple names, shlokas & venue</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#D4AF70]/20">
                <Link
                  href="/editor?mode=poster"
                  className="w-full py-3.5 rounded-full bg-[#FAF2E8] hover:bg-[#6D214F] text-[#6D214F] hover:text-[#FFF9F2] border border-[#6D214F]/30 font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Open Poster in Editor</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Video Card */}
            <div className="p-8 rounded-3xl bg-white border border-[#D4AF70]/30 shadow-md hover:shadow-xl transition-all space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6D214F]/10 border border-[#6D214F]/20 flex items-center justify-center text-2xl">
                  🎬
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6D214F]">Animated Video (MP4)</span>
                  <h4 className="text-2xl font-serif font-bold text-[#29212A]">Traditional Chibi Video</h4>
                </div>
                <p className="text-sm text-[#29212A]/75 font-light leading-relaxed">
                  Best for WhatsApp Status, Instagram Story, and creating an immersive experience with celebratory wedding music.
                </p>
                <div className="space-y-1.5 text-xs text-[#29212A]/80">
                  <p>• <strong>Free Preview:</strong> Free live animated playback directly in browser</p>
                  <p>• <strong>Full 1080p Unlock:</strong> ₹99 full-length MP4 video with music</p>
                  <p>• <strong>Customization:</strong> Live text overlays rendered onto video</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#D4AF70]/20">
                <Link
                  href="/editor?mode=video"
                  className="w-full py-3.5 rounded-full bg-[#6D214F] hover:bg-[#56183D] text-[#FFF9F2] font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md shadow-[#6D214F]/20 flex items-center justify-center gap-1.5"
                >
                  <span>Open Video in Editor</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#29212A] via-[#401931] to-[#29212A] border border-[#D4AF70]/30 p-8 sm:p-12 text-[#FFF9F2] text-center space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF70]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-[#D4AF70]/20 border border-[#D4AF70]/30 text-[#D4AF70] text-xs font-semibold uppercase tracking-wider">
              No Sign-Up or App Download Needed
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Ready to Personalize Your Wedding Invitation?
            </h2>
            <p className="text-sm sm:text-base text-[#FFF9F2]/75 font-light leading-relaxed">
              Open the Canva-style editor right now in your browser. Move text anywhere, pick your royal colors, and preview instantly.
            </p>
            <div className="pt-2">
              <Link
                href="/editor"
                className="inline-flex px-8 py-3.5 rounded-full bg-gradient-to-r from-[#6D214F] via-[#D4AF70] to-[#6D214F] text-[#FFF9F2] font-bold text-sm shadow-xl border border-[#D4AF70]/40 hover:brightness-110 active:scale-95 transition-all"
              >
                Launch Poster & Video Editor Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
