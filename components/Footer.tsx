"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Radio, Tv, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address");
      return;
    }

    setErrorMsg("");
    setSubscribing(true);

    // Simulate reactive subscription dispatch
    setTimeout(() => {
      setSubscribing(false);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 600);
  };

  return (
    <footer className="bg-slate-950 text-white pt-24 pb-8 border-t border-white/5 relative overflow-hidden font-sans">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform shrink-0 border border-slate-700/50 bg-slate-900">
                <img 
                  src="/icons/360.jpeg" 
                  alt="360 Radio & TV" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl leading-tight text-white tracking-tight">
                  360 <span className="text-gray-300">RADIO</span> <span className="text-red-500">&amp; TV</span>
                </span>
                <span className="text-xs text-blue-400 font-bold tracking-widest uppercase">Dutse, Jigawa State</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Voice of the Horizon – Broadcasting Peace, Culture, and Truth across the digital frontier. Engaging Jigawa State and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/listen-live" className="group bg-slate-900 border border-blue-500/30 hover:border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                <Radio className="w-4 h-4" />
                98.5 FM Dutse
              </Link>
              <Link href="/watch-live" className="group bg-slate-900 border border-red-500/30 hover:border-red-500 text-red-400 hover:bg-red-600 hover:text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                <Tv className="w-4 h-4" />
                360 TV Channel
              </Link>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black mb-6 tracking-wider text-sm uppercase">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home Page</Link></li>
              <li><Link href="/newsroom" className="hover:text-blue-400 transition-colors">Newsroom Bulletin</Link></li>
              <li><Link href="/schedule" className="hover:text-blue-400 transition-colors">Broadcast Schedule</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About 360 Media</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Address */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-black mb-6 tracking-wider text-sm uppercase">Contact Info</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li className="flex items-start gap-3 group">
                <MapPin className="shrink-0 text-blue-500 mt-0.5 group-hover:scale-110 transition-transform w-5 h-5" />
                <span>No. 1 Broad Street, Commercial District, Dutse, Jigawa State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="shrink-0 text-blue-500 group-hover:scale-110 transition-transform w-5 h-5" />
                <a href="tel:+2349029535000" className="hover:text-blue-400 transition-colors">+234 902 953 5000</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="shrink-0 text-blue-500 group-hover:scale-110 transition-transform w-5 h-5" />
                <span>info@360radiotv.ng</span>
              </li>
            </ul>
          </div>

          {/* Real-time Responsive Stay Updated Card */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-black mb-2 tracking-wider text-sm uppercase">Stay Updated</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Get breaking news bulletins, program alerts, and live broadcast updates directly in your inbox.
            </p>

            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center space-y-1.5 mb-6"
                >
                  <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Subscribed Successfully!</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Thank you for subscribing to 360 Radio &amp; TV daily dispatches.
                  </p>
                </motion.div>
              ) : (
                <form className="mb-6 relative" onSubmit={handleSubscribe}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..." 
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                    disabled={subscribing}
                  />
                  <button 
                    type="submit" 
                    disabled={subscribing}
                    className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
                    title="Subscribe"
                  >
                    {subscribing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                  {errorMsg && (
                    <span className="text-[11px] text-red-400 mt-1 block pl-1">
                      {errorMsg}
                    </span>
                  )}
                </form>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-slate-900 p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-600 transition-all hover:scale-110 hover:-translate-y-1" aria-label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-slate-900 p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-400 transition-all hover:scale-110 hover:-translate-y-1" aria-label="Twitter / X">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-slate-900 p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-pink-600 transition-all hover:scale-110 hover:-translate-y-1" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="bg-slate-900 p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-red-600 transition-all hover:scale-110 hover:-translate-y-1" aria-label="YouTube">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} 360 Radio &amp; Television, Dutse, Jigawa State. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
