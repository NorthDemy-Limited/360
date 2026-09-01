"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Radio, Tv, PlayCircle } from "lucide-react";

export default function Hero() {
  const [radioStream, setRadioStream] = useState<any>(null);
  const [tvStream, setTvStream] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const loadStreams = async () => {
      try {
        const [radioRes, tvRes] = await Promise.all([
          fetch('/api/streams?type=RADIO', { cache: 'no-store' }),
          fetch('/api/streams?type=TV', { cache: 'no-store' })
        ]);
        if (isMounted) {
          if (radioRes.ok) setRadioStream(await radioRes.json());
          if (tvRes.ok) setTvStream(await tvRes.json());
        }
      } catch (e) {
        console.warn("Live stream fetch notice:", e);
      }
    };
    loadStreams();
    return () => { isMounted = false; };
  }, []);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative min-h-[100vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-32 pb-16 lg:pt-20 lg:pb-0">
      <style>{`
        @keyframes dynamicZoomDutse {
          0% { 
            transform: scale(1.0); 
            filter: brightness(1.2) contrast(1.1);
          }
          100% { 
            transform: scale(1.4); 
            filter: brightness(0.8) contrast(1.3);
          }
        }
        @keyframes radarPing {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; border-width: 2px; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; border-width: 0px; }
        }
      `}</style>
      
      {/* Cinematic Background Adapter */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradients to blend image into the dark UI */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />
        
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2500" 
          alt="Jigawa Dutse Tech Map" 
          className="w-full h-full object-cover opacity-60 mix-blend-screen hue-rotate-180"
          style={{ 
            animation: 'dynamicZoomDutse 30s infinite alternate ease-in-out',
            transformOrigin: '40% 30%' 
          }}
        />
        
        {/* Animated radar pings */}
        <div className="absolute top-[30%] left-[40%] z-10">
          <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(239,68,68,1)]" />
          <div className="w-16 h-16 border-red-500 rounded-full absolute top-1/2 left-1/2" style={{ animation: 'radarPing 3s infinite cubic-bezier(0.215, 0.61, 0.355, 1)' }} />
          <div className="w-24 h-24 border border-red-500/50 rounded-full absolute top-1/2 left-1/2" style={{ animation: 'radarPing 3s infinite cubic-bezier(0.215, 0.61, 0.355, 1) 1s' }} />
        </div>
        
        <div className="absolute bottom-[35%] right-[25%] z-10">
          <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(59,130,246,1)]" />
          <div className="w-12 h-12 border-blue-500 rounded-full absolute top-1/2 left-1/2" style={{ animation: 'radarPing 4s infinite cubic-bezier(0.215, 0.61, 0.355, 1) 2s' }} />
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]" />
              <span className="text-xs font-bold text-slate-300 tracking-[0.2em] uppercase">Broadcasting Live • Dutse, Jigawa</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              360 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Radio</span> <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">&amp; Television</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-300 max-w-lg leading-relaxed font-medium">
              Voice of the Horizon – Broadcasting Peace, Culture &amp; Truth across the digital frontier.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
              <Link href="/listen-live" className="group relative w-full sm:w-auto overflow-hidden bg-white text-slate-950 font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-transform hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <div className="absolute inset-0 bg-blue-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Radio className="w-5 h-5 relative z-10 shrink-0" />
                <span className="relative z-10 tracking-wide text-sm sm:text-base">Listen Live (98.5 FM)</span>
              </Link>
              
              <Link href="/watch-live" className="group relative w-full sm:w-auto overflow-hidden bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all backdrop-blur-md hover:bg-slate-800 hover:shadow-xl">
                <Tv className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors shrink-0" />
                <span className="text-sm sm:text-base">Watch Live TV</span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Glassmorphic On-Air Status */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, type: "spring" }}
          >
            <div className="bg-slate-900/40 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-slate-300 font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-amber-400" />
                  Studio Status
                </h3>
                <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-[10px] font-black border border-red-500/20 flex items-center gap-1.5 uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  LIVE NOW
                </span>
              </div>
              
              <div className="space-y-4 relative z-10">
                {/* Radio Status Card */}
                <Link href="/listen-live" className="block bg-slate-950/50 rounded-2xl p-5 border border-white/5 flex items-center justify-between hover:border-blue-500/30 transition-all hover:bg-slate-900 hover:shadow-lg group/card">
                  <div>
                    <div className="text-blue-400 text-[10px] font-black mb-1.5 tracking-widest uppercase">
                      Radio 98.5 FM • {radioStream?.isOnline ? "ONLINE" : "OFFLINE"}
                    </div>
                    <div className="text-white font-bold text-lg leading-tight truncate max-w-[220px]">
                      {radioStream?.currentShow || "Barke Da Sallah & Pulse"}
                    </div>
                    <div className="text-slate-500 text-xs mt-1 font-medium">98.5 FM Digital Broadcast</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover/card:bg-blue-600 group-hover/card:text-white transition-all transform group-hover/card:scale-110 group-hover/card:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    <Radio className="w-5 h-5" />
                  </div>
                </Link>
                
                {/* TV Status Card */}
                <Link href="/watch-live" className="block bg-slate-950/50 rounded-2xl p-5 border border-white/5 flex items-center justify-between hover:border-red-500/30 transition-all hover:bg-slate-900 hover:shadow-lg group/card">
                  <div>
                    <div className="text-red-400 text-[10px] font-black mb-1.5 tracking-widest uppercase">
                      360 TV Digital • {tvStream?.isOnline ? "LIVE" : "OFFLINE"}
                    </div>
                    <div className="text-white font-bold text-lg leading-tight truncate max-w-[220px]">
                      {tvStream?.currentShow || "360 Live Broadcast"}
                    </div>
                    <div className="text-slate-500 text-xs mt-1 font-medium">Dutse Main Studio Feed</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center group-hover/card:bg-red-600 group-hover/card:text-white transition-all transform group-hover/card:scale-110 group-hover/card:shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                    <Tv className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
