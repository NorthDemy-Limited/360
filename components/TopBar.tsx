"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Tv, Megaphone } from 'lucide-react';

interface CommercialCampaign {
  id: string;
  clientName: string;
  title: string;
  targetMedia: string;
  placement: string;
  value: number;
  status: string;
}

export default function TopBar() {
  const [marqueeAds, setMarqueeAds] = useState<CommercialCampaign[]>([]);
  const [activeAdIndex, setActiveAdIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadCommercials = async () => {
      try {
        const res = await fetch('/api/commercials', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            // STRICT FILTERING: Only campaigns explicitly assigned to Top Marquee placement
            const topAds = data.filter((c: any) => {
              const p = (c.placement || '').toLowerCase();
              const isStatusActive = c.status === 'ACTIVE' || c.status === 'Active' || c.status === 'Running';
              return isStatusActive && (p.includes('marquee') || p.includes('top marquee'));
            });
            setMarqueeAds(topAds);
          }
        }
      } catch (err) {
        console.warn("TopBar commercials load notice:", err);
      }
    };
    loadCommercials();
    return () => { isMounted = false; };
  }, []);

  // Cycle through marquee ads if multiple exist
  useEffect(() => {
    if (marqueeAds.length <= 1) return;
    const interval = setInterval(() => {
      setActiveAdIndex((prev) => (prev + 1) % marqueeAds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [marqueeAds.length]);

  const currentMarquee = marqueeAds.length > 0 ? marqueeAds[activeAdIndex] : null;

  return (
    <div className="bg-[#050811] text-white text-xs border-b border-white/10 relative z-40 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
        
        {/* Left: Professional Top Marquee (STRICTLY ONLY Marquee-Assigned Ads) */}
        <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto">
          {currentMarquee ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMarquee.id || activeAdIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 text-xs truncate"
              >
                <span className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 shadow-sm">
                  <Megaphone className="w-3 h-3 text-amber-400" />
                  SPONSOR: {currentMarquee.clientName}
                </span>
                <span className="text-slate-200 font-semibold truncate">
                  {currentMarquee.title}
                </span>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-slate-300 font-medium truncate">
                Broadcasting from Dutse, Jigawa State, Nigeria
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
                Radio: 98.5 FM | TV: 360 Digital Channel
              </span>
            </div>
          )}
        </div>

        {/* Right: Live On-Air Tuners */}
        <div className="flex items-center gap-4 shrink-0 font-medium text-xs">
          <Link 
            href="/listen-live" 
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-bold"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Listen Live (98.5 FM)</span>
          </Link>

          <span className="text-slate-700">|</span>

          <Link 
            href="/watch-live" 
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors font-bold"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Watch Live TV</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
