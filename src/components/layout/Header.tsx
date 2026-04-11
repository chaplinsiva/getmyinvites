"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/login/actions";

export default function Header({ user }: { user: any }) {
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Invitations", href: "/invitations" },
    { name: "About Us", href: "/about" },
  ];

  if (pathname.startsWith("/templates")) {
    return null;
  }

  if (user) {
    navLinks.push({ name: "Dashboard", href: "/dashboard" });
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-4"
          : "bg-white/50 backdrop-blur-sm py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-extrabold tracking-tighter text-slate-900 flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-serif group-hover:rotate-12 transition-transform duration-300">
            M
          </span>
          MakeMyInvites
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative ${
                  isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-slate-900 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600">{user.email}</span>
              <form action={logout}>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-900 text-sm font-medium hover:bg-slate-50 transition-all duration-200 active:scale-95"
                >
                  Log out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all duration-200 hover:shadow-lg hover:shadow-slate-900/20 active:scale-95"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-slate-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
           <span className={`w-6 h-0.5 bg-slate-900 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
           <span className={`w-6 h-0.5 bg-slate-900 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
           <span className={`w-6 h-0.5 bg-slate-900 transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium ${
                pathname === link.href ? "text-slate-900" : "text-slate-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <form action={logout} className="mt-2 w-full">
               <button
                 type="submit"
                 className="w-full px-6 py-3 rounded-full border border-slate-200 text-slate-900 font-medium hover:bg-slate-50"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Log out
               </button>
            </form>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 text-center w-full px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
