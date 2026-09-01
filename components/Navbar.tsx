"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PlayCircle, Radio, Tv } from "lucide-react";

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
    { name: "Listen Live", href: "/listen-live", highlight: true },
    { name: "Watch Live", href: "/watch-live" },
    { name: "Newsroom", href: "/newsroom" },
    { name: "Schedule", href: "/schedule" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-md py-0' : 'bg-slate-950/85 backdrop-blur-md py-1.5 sm:py-2 border-b border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 sm:gap-3 cursor-pointer group z-50">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform shrink-0 border border-slate-700/50 bg-slate-900">
              <img 
                src="/icons/360.jpeg" 
                alt="360 Radio & TV" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-extrabold text-xl sm:text-2xl leading-tight tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                360 <span className="font-bold opacity-90">RADIO</span> <span className="text-red-500">&amp;</span> <span className="text-red-500 font-bold">TV</span>
              </span>
              <span className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase ${scrolled ? 'text-blue-600' : 'text-blue-400'}`}>
                Dutse, Jigawa State
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all group overflow-hidden ${
                  link.highlight 
                  ? 'text-white' 
                  : scrolled 
                    ? 'text-gray-600 hover:text-blue-600' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.highlight && (
                  <div className="absolute inset-0 bg-red-600 rounded-full z-0 group-hover:bg-red-500 transition-colors" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_5px_rgba(255,255,255,1)]" />
                  )}
                  {link.name}
                </span>
                {!link.highlight && (
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${scrolled ? 'bg-blue-600' : 'bg-white'}`} />
                )}
              </Link>
            ))}
          </div>

          {/* Public Audience Live Tuner Button (Audience / PWA Experience) */}
          <div className="hidden md:flex items-center gap-3 z-50">
            <Link 
              href="/watch-live" 
              className={`group relative overflow-hidden text-xs font-extrabold px-5 py-2.5 rounded-full flex items-center gap-2 transition-transform hover:scale-105 shadow-md border ${
                scrolled 
                ? 'bg-red-600 text-white border-red-500 hover:bg-red-500' 
                : 'bg-red-600 text-white border-red-500/80 hover:bg-red-500'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="tracking-wide">Watch 360 TV</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors ${
                isOpen || scrolled 
                ? 'text-gray-900 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / PWA Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 pt-24"
          >
            <div className="px-4 pb-6 space-y-2 flex flex-col h-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-4 rounded-2xl text-lg font-bold transition-colors ${
                      link.highlight
                      ? 'bg-red-50 text-red-600 border border-red-100 flex items-center justify-between'
                      : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {link.highlight && <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]" />}
                      {link.name}
                    </span>
                    {link.highlight && <PlayCircle className="w-5 h-5 text-red-500" />}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className="pt-6 mt-auto mb-10 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link 
                  href="/listen-live"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white text-base font-bold px-4 py-3.5 rounded-2xl flex justify-center items-center gap-2 shadow-lg"
                >
                  <Radio className="w-5 h-5" />
                  <span>Listen to 98.5 FM Live</span>
                </Link>

                <Link 
                  href="/watch-live"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-red-600 hover:bg-red-500 text-white text-base font-bold px-4 py-3.5 rounded-2xl flex justify-center items-center gap-2 shadow-lg"
                >
                  <Tv className="w-5 h-5" />
                  <span>Watch 360 TV Live</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
