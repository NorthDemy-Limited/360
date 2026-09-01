"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tv, Clock, Maximize, Activity, Users, Radio, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function WatchLivePage() {
  const [streamConfig, setStreamConfig] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [liveViewers, setLiveViewers] = useState(1);

  useEffect(() => {
    fetchTVData();

    // Real-time presence session
    const sessionId = typeof window !== 'undefined' 
      ? (sessionStorage.getItem('tvSessionId') || (() => {
          const id = 'tv_' + Math.random().toString(36).substring(2, 9);
          sessionStorage.setItem('tvSessionId', id);
          return id;
        })())
      : 'tv_' + Math.random().toString(36).substring(2, 9);

    const sendHeartbeat = async () => {
      try {
        const res = await fetch('/api/presence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'TV', sessionId, action: 'heartbeat' })
        });
        if (res.ok) {
          const data = await res.json();
          setLiveViewers(data.activeCount || 1);
        }
      } catch (e) {
        // Silently handle heartbeat error
      }
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 15000);

    return () => {
      clearInterval(interval);
      fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'TV', sessionId, action: 'leave' }),
        keepalive: true
      }).catch(() => {});
    };
  }, []);

  const fetchTVData = async () => {
    try {
      // 1. Fetch TV Stream Config with no-store to get live updates
      const streamRes = await fetch('/api/streams?type=TV', { cache: 'no-store' });
      if (streamRes.ok) {
        const streamData = await streamRes.json();
        setStreamConfig(streamData);
      }

      // 2. Fetch Schedule
      const schedRes = await fetch('/api/schedule');
      if (schedRes.ok) {
        const schedData = await schedRes.json();
        setSchedule(schedData.slice(0, 4));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Universal parser for YouTube, TikTok, and direct stream URLs
  const renderVideoPlayer = (url: string) => {
    if (!url) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 h-full">
          <Tv className="w-16 h-16 mb-4 opacity-40 text-red-500" />
          <p className="text-base font-bold text-slate-300">Live TV Stream Offline</p>
          <p className="text-xs text-slate-500 mt-1">Check back during scheduled broadcast hours.</p>
        </div>
      );
    }

    // Comprehensive YouTube URL Matcher (watch?v=, youtu.be/, live/, shorts/, embed/)
    const ytRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/|shorts\/)([^#&?]*).*/;
    const ytMatch = url.match(ytRegex);
    const videoId = (ytMatch && ytMatch[2].length === 11) ? ytMatch[2] : null;

    if (videoId) {
      return (
        <iframe
          key={videoId}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
          title="360 TV Live Broadcast"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      );
    }

    // TikTok Video / Embed Matcher
    if (url.includes('tiktok.com')) {
      const match = url.match(/\/video\/(\d+)/);
      const tiktokId = match ? match[1] : '';
      if (tiktokId) {
        return (
          <iframe
            key={tiktokId}
            src={`https://www.tiktok.com/embed/v2/${tiktokId}`}
            title="TikTok Video Feed"
            allow="autoplay; encrypted-media;"
            allowFullScreen
            className="w-full h-full border-0"
          />
        );
      }
    }

    // Direct MP4 / HLS Video Element
    return (
      <video 
        key={url}
        className="w-full h-full object-cover"
        controls
        autoPlay
        playsInline
      >
        <source src={url} type="video/mp4" />
        Your browser does not support HTML5 video streaming.
      </video>
    );
  };

  const formatScheduleTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const end = new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-28 pb-16 relative overflow-hidden">
      
      {/* Background Cinematic Ambilight Glow */}
      <div className="absolute top-[30vh] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/20 rounded-[100%] blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 font-black px-5 py-2 rounded-full text-xs tracking-widest uppercase mb-4 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Tv className="w-4 h-4" />
            LIVE DIGITAL TV • DUTSE CHANNEL
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
            Watch <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">360 TV</span> Live
          </h1>
          <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
            High Definition digital television broadcast streaming live directly from Dutse Main Studio via YouTube &amp; Cloud CDN.
          </p>
        </motion.div>

        {/* Video Player Container (Theater Mode) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-xl rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(239,68,68,0.2)] overflow-hidden mb-20 border border-white/10 group"
        >
          
          {/* Main Video Area (Aspect Ratio 16:9) */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
            
            {/* Top Left Badge */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              <span className={`w-2 h-2 rounded-full ${streamConfig?.isOnline ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]' : 'bg-slate-500'}`}></span>
              <span className="text-white text-xs font-black tracking-widest uppercase">
                {streamConfig?.isOnline ? "360 TV DUTSE • LIVE" : "360 TV • OFFLINE"}
              </span>
            </div>
            
            {/* Top Right Viewer Count */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] text-slate-300">
              <Users className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold tracking-wider">
                {streamConfig?.isOnline ? `${liveViewers.toLocaleString()} Watching` : "Offline"}
              </span>
            </div>

            {/* Video Player Render */}
            <div className="w-full h-full">
              {renderVideoPlayer(streamConfig?.streamUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
            </div>
            
            {/* Fallback Overlay to blend edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Player Bottom Info Bar (Glassmorphic) */}
          <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden bg-white/5 border-t border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-2">
              <span className="flex items-center gap-2 text-red-500 text-xs font-black tracking-widest uppercase">
                <Activity className="w-4 h-4 animate-pulse" /> CURRENT BROADCAST
              </span>
              <h2 className="text-white text-2xl md:text-3xl font-black leading-tight">
                {streamConfig?.currentShow || "360 Digital Live Transmission"}
              </h2>
              <p className="text-slate-400 text-sm font-medium">
                Live from Dutse Main Studios • Hausa &amp; English
              </p>
            </div>
            
            <div className="relative z-10 shrink-0 w-full md:w-auto flex items-center gap-4">
              <Link 
                href="/listen-live" 
                className="w-full md:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-6 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Radio className="w-4 h-4 text-blue-400" />
                Switch to Radio 98.5 FM
              </Link>
            </div>
          </div>
        </motion.div>

        {/* TV Guide Schedule List */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[2px] w-8 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
            <h3 className="text-2xl font-black text-white tracking-wide">Television Program Guide</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schedule.length === 0 ? (
              <div className="col-span-2 text-center text-slate-500 py-8 bg-slate-900/40 rounded-2xl border border-slate-800">
                No upcoming scheduled broadcasts found.
              </div>
            ) : (
              schedule.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                  className={`group relative bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:border-red-500/30 hover:bg-slate-900/80 hover:-translate-y-1 cursor-pointer ${
                    item.isLive ? 'border-red-900/30 bg-slate-900/60 shadow-[0_10px_30px_-10px_rgba(239,68,68,0.2)]' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex items-center justify-between relative z-10">
                    <div className={`flex items-center gap-2 text-sm font-bold ${item.isLive ? "text-red-400" : "text-slate-500"}`}>
                      <Clock className="w-4 h-4" />
                      {formatScheduleTime(item.startTime, item.endTime)}
                    </div>
                    {item.isLive ? (
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_5px_rgba(255,255,255,1)]"></span>
                        ON AIR
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-bold bg-white/5 text-slate-400 border border-white/10 uppercase tracking-widest">
                        {item.type}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1.5 relative z-10">
                    <h4 className="text-xl font-black text-white leading-tight group-hover:text-red-400 transition-colors duration-300">{item.title}</h4>
                    <p className="text-slate-400 text-sm font-medium">
                      <span className="text-slate-500 uppercase text-xs tracking-widest font-bold mr-2">Host</span> 
                      {item.host?.name || "360 Broadcaster"}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
