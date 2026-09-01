"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, X, Sparkles, ArrowRight, Clock, Volume2, VolumeX, Play } from 'lucide-react';
import Link from 'next/link';

interface CommercialCampaign {
  id: string;
  clientName: string;
  title: string;
  targetMedia: string;
  placement: string;
  mediaUrl?: string | null;
  value: number;
  status: string;
}

export default function CommercialPopup() {
  const [currentAd, setCurrentAd] = useState<CommercialCampaign | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const queueRef = useRef<CommercialCampaign[]>([]);
  const indexRef = useRef<number>(0);
  const countdownIntervalRef = useRef<any>(null);
  const nextAdTimeoutRef = useRef<any>(null);

  // Present an ad from the queue and start 10s countdown
  const displayAd = useCallback((ad: CommercialCampaign) => {
    if (!ad) return;

    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (nextAdTimeoutRef.current) clearTimeout(nextAdTimeoutRef.current);

    setCurrentAd(ad);
    setIsVisible(true);
    setSecondsRemaining(10);
    setIsVideoMuted(true);

    let count = 10;
    countdownIntervalRef.current = setInterval(() => {
      count -= 1;
      setSecondsRemaining(count);
      if (count <= 0) {
        clearInterval(countdownIntervalRef.current);
        closeAndScheduleNext();
      }
    }, 1000);
  }, []);

  // Close active popup and trigger next in queue after exactly 20 seconds
  const closeAndScheduleNext = useCallback(() => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (nextAdTimeoutRef.current) clearTimeout(nextAdTimeoutRef.current);

    setIsVisible(false);

    const queue = queueRef.current;
    if (!queue || queue.length === 0) return;

    // Advance queue index
    indexRef.current = (indexRef.current + 1) % queue.length;
    const nextAd = queue[indexRef.current];

    // 20-second cooldown interval before next advert surfaces
    const cooldownMs = 20000;

    nextAdTimeoutRef.current = setTimeout(() => {
      displayAd(nextAd);
    }, cooldownMs);
  }, [displayAd]);

  // Initial Load & Campaign Queue Fetch
  useEffect(() => {
    let isMounted = true;

    const fetchCommercials = async () => {
      try {
        const res = await fetch('/api/commercials', { cache: 'no-store' });
        if (res.ok) {
          const data: CommercialCampaign[] = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            const activeList = data.filter((c) => {
              const s = (c.status || '').toUpperCase();
              return s === 'ACTIVE' || s === 'RUNNING';
            });

            // Priority: Dedicated popup placements or all active campaigns
            const popupSpecific = activeList.filter((c) => {
              const p = (c.placement || '').toLowerCase();
              return p.includes('popup') || p.includes('full screen') || p.includes('bottom right');
            });

            const finalQueue = popupSpecific.length > 0 ? popupSpecific : activeList;

            // Sort highest paying campaign first
            finalQueue.sort((a, b) => (b.value || 0) - (a.value || 0));

            queueRef.current = finalQueue;
            indexRef.current = 0;

            if (finalQueue.length > 0) {
              // Initial impression after 1.8s page settle
              nextAdTimeoutRef.current = setTimeout(() => {
                displayAd(finalQueue[0]);
              }, 1800);
            }
          }
        }
      } catch (err) {
        console.warn("Commercial scheduler notice:", err);
      }
    };

    fetchCommercials();

    return () => {
      isMounted = false;
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (nextAdTimeoutRef.current) clearTimeout(nextAdTimeoutRef.current);
    };
  }, [displayAd]);

  if (!isVisible || !currentAd) return null;

  const isFullScreen = 
    currentAd.placement === 'Full Screen Popup' || 
    (currentAd.placement || '').toLowerCase().includes('full screen');

  const mediaUrl = currentAd.mediaUrl;
  const isVideo = 
    (currentAd.targetMedia || '').toUpperCase().includes('VIDEO') || 
    (mediaUrl && (mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm') || mediaUrl.endsWith('.mov')));

  const isImage = 
    mediaUrl && 
    (mediaUrl.endsWith('.jpg') || mediaUrl.endsWith('.jpeg') || mediaUrl.endsWith('.png') || mediaUrl.endsWith('.webp') || mediaUrl.endsWith('.gif'));

  return (
    <AnimatePresence>
      {/* 1. FULL SCREEN POPUP ADVERT */}
      {isFullScreen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl font-sans"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-[0_0_80px_rgba(245,158,11,0.25)] relative overflow-hidden text-white flex flex-col max-h-[90vh]"
          >
            {/* Ambient Lighting */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/20 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-[90px] pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-400 p-2 rounded-xl border border-amber-500/30">
                  <Megaphone className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block">
                    Special Sponsor Broadcast
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    Auto-closing in <span className="font-mono font-bold text-amber-300">{secondsRemaining}s</span>
                  </span>
                </div>
              </div>

              {/* Skip / Cancel Icon */}
              <button
                onClick={closeAndScheduleNext}
                className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-red-500/20 hover:text-red-400 text-slate-300 border border-slate-700 hover:border-red-500/40 px-3.5 py-1.5 rounded-xl transition-all font-mono text-xs font-bold"
                title="Cancel Advert (Next in 20s)"
              >
                <span>Skip</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable / Media Area */}
            <div className="space-y-4 relative z-10 my-2 overflow-y-auto pr-1">
              
              {/* Render Media Asset (Banner or Video) */}
              {isVideo && mediaUrl && (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-slate-800 shadow-xl group">
                  <video 
                    src={mediaUrl} 
                    autoPlay 
                    loop 
                    muted={isVideoMuted}
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setIsVideoMuted(!isVideoMuted)}
                    className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-xl border border-white/20 transition-all text-xs flex items-center gap-1.5"
                  >
                    {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    <span>{isVideoMuted ? "Unmute" : "Muted"}</span>
                  </button>
                </div>
              )}

              {isImage && mediaUrl && (
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 max-h-56">
                  <img 
                    src={mediaUrl} 
                    alt={currentAd.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Client: {currentAd.clientName}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">{currentAd.targetMedia}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {currentAd.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                Official commercial broadcast partner on 360 Radio &amp; Television Dutse. Reaching audiences across Northern Nigeria.
              </p>
            </div>

            {/* Bottom Progress Bar & Footer */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 shrink-0">
              <div className="w-full sm:w-1/2">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    key={currentAd.id + secondsRemaining}
                    initial={{ width: `${(secondsRemaining / 10) * 100}%` }}
                    animate={{ width: `${Math.max(0, ((secondsRemaining - 1) / 10) * 100)}%` }}
                    transition={{ duration: 1, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                  Next ad in queue rotates in 20s
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={closeAndScheduleNext}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  onClick={closeAndScheduleNext}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </motion.div>
        </motion.div>
      ) : (
        /* 2. BOTTOM RIGHT POPUP ADVERT */
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full font-sans"
        >
          <div className="bg-slate-950/95 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden text-white">
            
            {/* Corner Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-400 p-1.5 rounded-lg border border-amber-500/30">
                  <Megaphone className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                    Broadcast Sponsor ({secondsRemaining}s)
                  </span>
                  <span className="text-xs font-bold text-slate-200 truncate max-w-[150px] block">
                    {currentAd.clientName}
                  </span>
                </div>
              </div>

              {/* Cancel (X) */}
              <button 
                onClick={closeAndScheduleNext}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Dismiss Advert (Next in 20s)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Media Asset (if provided) */}
            {isVideo && mediaUrl && (
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video mb-3 border border-slate-800">
                <video src={mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            )}

            {isImage && mediaUrl && (
              <div className="relative rounded-xl overflow-hidden bg-slate-900 mb-3 max-h-36 border border-slate-800">
                <img src={mediaUrl} alt={currentAd.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Content */}
            <div className="space-y-1.5 mb-3">
              <h4 className="text-sm font-extrabold text-white leading-snug">
                {currentAd.title}
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                Featured campaign on 360 Radio &amp; Television.
              </p>
            </div>

            {/* Timer Progress */}
            <div className="mb-3">
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  key={currentAd.id + secondsRemaining}
                  initial={{ width: `${(secondsRemaining / 10) * 100}%` }}
                  animate={{ width: `${Math.max(0, ((secondsRemaining - 1) / 10) * 100)}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-[10px] font-mono text-slate-400">
                {currentAd.targetMedia}
              </span>
              <Link 
                href="/contact" 
                onClick={closeAndScheduleNext}
                className="inline-flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Partner with 360</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
