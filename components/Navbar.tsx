"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Listen Live", href: "/listen-live" },
    { name: "Watch Live", href: "/watch-live" },
    { name: "Newsroom", href: "/newsroom" },
    { name: "Schedule", href: "/schedule" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-sm py-0' : 'bg-white border-transparent py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white font-black rounded-xl w-12 h-12 flex items-center justify-center text-xl shadow-lg group-hover:scale-105 transition-transform">
              360
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl leading-tight text-brand-primary tracking-tight">
                360 <span className="text-gray-900 font-bold">RADIO</span> <span className="text-red-500">&amp;</span> <span className="text-red-500 font-bold">TV</span>
              </span>
              <span className="text-xs text-blue-600 font-bold tracking-widest uppercase">Dutse, Jigawa State</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-6 py-2.5 rounded-full flex items-center gap-2 transition-transform hover:scale-105 shadow-[0_4px_20px_-5px_rgba(37,99,235,0.4)]">
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              <svg className="relative z-10" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
              <span className="relative z-10 tracking-wide">Login</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-full hover:bg-blue-50 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white/95 backdrop-blur-2xl border-t border-gray-100 absolute w-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 visible shadow-xl' : 'opacity-0 -translate-y-4 invisible'}`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-4 py-3 rounded-xl text-base font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <button className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-4 py-4 rounded-xl flex justify-center items-center gap-2 shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
              Login to Account
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
