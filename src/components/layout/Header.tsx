"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Remove header when inside the dedicated full-screen editor
  if (pathname === "/editor") {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFF9F2]/95 backdrop-blur-md border-b border-[#D4AF70]/25 shadow-sm py-3.5"
          : "bg-[#FFF9F2]/80 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group transition-transform duration-200"
          aria-label="GetMyInvites Home"
        >
          <Image
            src="/logos/LogoWithName.png"
            alt="GetMyInvites"
            width={180}
            height={90}
            priority
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                  isActive ? "text-[#6D214F]" : "text-[#29212A]/75 hover:text-[#6D214F]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-gradient-to-r from-[#6D214F] to-[#D4AF70] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button - Templates */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/templates"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6D214F] via-[#7F265C] to-[#6D214F] text-[#FFF9F2] text-sm font-semibold hover:opacity-95 shadow-md shadow-[#6D214F]/20 hover:shadow-lg border border-[#D4AF70]/30 transition-all duration-200 active:scale-95 flex items-center gap-2"
          >
            <span>Templates</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#D4AF70]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          aria-label="Toggle navigation menu"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#D4AF70]/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
           <span className={`w-6 h-0.5 bg-[#29212A] transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
           <span className={`w-6 h-0.5 bg-[#29212A] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
           <span className={`w-6 h-0.5 bg-[#29212A] transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#FFF9F2]/95 backdrop-blur-md border-b border-[#D4AF70]/20 shadow-xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-semibold ${
                pathname === link.href ? "text-[#6D214F]" : "text-[#29212A]/80 hover:text-[#6D214F]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/templates"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 text-center w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#6D214F] to-[#7F265C] text-[#FFF9F2] font-semibold shadow-md border border-[#D4AF70]/30"
          >
            Explore Templates
          </Link>
        </div>
      </div>
    </header>
  );
}
