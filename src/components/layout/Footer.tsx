"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Do not show footer on full-screen editor
  if (pathname === "/editor") {
    return null;
  }

  return (
    <footer className="w-full bg-gradient-to-b from-[#241B25] via-[#1D151E] to-[#150F16] text-[#FFF9F2] border-t border-[#D4AF70]/25 relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-[#D4AF70]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-40 bg-[#6D214F]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#D4AF70]/15">
          {/* Brand Column with Logo and Tagline */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-block group" aria-label="GetMyInvites Home">
              <div className="relative inline-block p-2 rounded-2xl bg-[#FFF9F2]/[0.03] border border-[#D4AF70]/20 hover:border-[#D4AF70]/40 transition-all duration-300">
                <Image
                  src="/logos/LogoWithNameandTagline.png"
                  alt="GetMyInvites - Every Occasion. Beautifully Invited."
                  width={340}
                  height={170}
                  className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            <p className="text-[#FFF9F2]/75 text-sm leading-relaxed max-w-md font-light">
              Craft unforgettable wedding memories with our Canva-style poster editor and animated video maker. 
              Personalize traditional Indian wedding invitations in seconds, preview live for free, and download print-ready Ultra HD posters.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#D4AF70]/10 border border-[#D4AF70]/30 text-[#D4AF70] font-medium">
                🇮🇳 Handcrafted in India
              </span>
              <span className="px-3 py-1 rounded-full bg-[#6D214F]/30 border border-[#6D214F]/50 text-[#F5B5D6] font-medium">
                ⚡ Instant WhatsApp Share
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FFF9F2]/80 font-medium">
                💎 300 DPI Print Ready
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D4AF70] font-serif">
              Studio & Navigation
            </h3>
            <ul className="space-y-3 text-sm text-[#FFF9F2]/75 font-light">
              <li>
                <Link href="/" className="hover:text-[#D4AF70] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-[#D4AF70] transition-colors flex items-center gap-2">
                  <span>Templates</span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#6D214F] text-[#FFF9F2]">New</span>
                </Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-[#D4AF70] transition-colors">
                  Poster & Video Editor
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4AF70] transition-colors">
                  About Us & Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Features & Trust */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D4AF70] font-serif">
              Why Couples Love Us
            </h3>
            <ul className="space-y-2 text-xs text-[#FFF9F2]/75 font-light">
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF70]">✦</span>
                <span>No sign-up or registration required</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF70]">✦</span>
                <span>Free instant watermarked preview downloads</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF70]">✦</span>
                <span>Ultra HD 300 DPI poster unlock for ₹49</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF70]">✦</span>
                <span>1080p animated MP4 video render for ₹99</span>
              </li>
            </ul>

            <div className="p-3.5 rounded-2xl bg-black/30 border border-[#D4AF70]/20 space-y-1.5">
              <p className="text-xs text-[#D4AF70] font-semibold flex items-center gap-1.5">
                <span>🔒 Instant UPI & Card Payments</span>
              </p>
              <p className="text-[11px] text-[#FFF9F2]/60 leading-normal">
                Pay securely via GPay, PhonePe, Paytm QR code or Cards. Immediate instant download.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF9F2]/60">
          <p>© {new Date().getFullYear()} GetMyInvites. All rights reserved.</p>
          <p className="font-serif italic text-[#D4AF70]/80 text-sm">
            Every Occasion. Beautifully Invited.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#D4AF70] transition-colors">
              Home
            </Link>
            <Link href="/templates" className="hover:text-[#D4AF70] transition-colors">
              Templates
            </Link>
            <Link href="/editor" className="hover:text-[#D4AF70] transition-colors">
              Editor
            </Link>
            <Link href="/about" className="hover:text-[#D4AF70] transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
