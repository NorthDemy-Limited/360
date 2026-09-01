"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Radio, 
  Clock, 
  Activity, 
  Headphones, 
  Tv, 
  Volume2, 
  VolumeX, 
  Loader2, 
  Wifi, 
  RadioTower, 
  Sparkles,
  RefreshCw,
  Share2
} from 'lucide-react';
import Link from 'next/link';

export default function ListenLivePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);

  const [streamConfig, setStreamConfig] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [liveListeners, setLiveListeners] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Presence session id
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      const existing = sessionStorage.getItem('radioSessionId');
      if (existing) return existing;
      const newId = 'radio_' + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem('radioSessionId', newId);
      return newId;
    }
    return 'radio_' + Math.random().toString(36).substring(2, 9);
  });

  useEffect(() => {
    fetchRadioData();

    // Fetch initial listener presence count
    fetch('/api/presence?type=RADIO', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data.listeners !== undefined) setLiveListeners(data.listeners);
      })
      .catch(() => {});
  }, []);

  // Update MediaSession on mobile locks-screen & bluetooth
  useEffect(() => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      const showTitle = streamConfig?.currentShow || "Barke Da Sallah & Pulse";
      navigator.mediaSession.metadata = new MediaMetadata({
        title: showTitle,
        artist: "360 Radio 98.5 FM Dutse",
        album: "Live Broadcast • Jigawa State",
        artwork: [
          { src: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
          { src: "/icons/icon-512x512.svg", sizes: "512x512", type: "image/svg+xml" }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => togglePlay());
      navigator.mediaSession.setActionHandler('pause', () => togglePlay());
    }
  }, [streamConfig]);

  // Audio Event Listeners for Buffering & Volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
      setStreamError(null);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setIsBuffering(false);
    };
    const handleError = (e: any) => {
      // Only log/show error if audio actually has a source and was attempting to play
      if (audio.src && audio.src !== "" && audio.src !== window.location.href) {
        console.warn("Audio stream interrupted:", e);
        setIsBuffering(false);
        setIsPlaying(false);
        setStreamError("Stream temporarily buffering or offline. Tap Retry to reconnect.");
      }
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [volume, isMuted]);

  // Send presence heartbeat while actively listening
  useEffect(() => {
    let interval: any;

    if (isPlaying) {
      const sendHeartbeat = async () => {
        try {
          const res = await fetch('/api/presence', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'RADIO', sessionId, action: 'heartbeat' })
          });
          if (res.ok) {
            const data = await res.json();
            setLiveListeners(data.activeCount || 1);
          }
        } catch (e) {}
      };

      sendHeartbeat();
      interval = setInterval(sendHeartbeat, 15000);
    } else {
      fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'RADIO', sessionId, action: 'leave' }),
        keepalive: true
      }).catch(() => {});
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, sessionId]);

  const fetchRadioData = async () => {
    try {
      const [streamRes, schedRes] = await Promise.all([
        fetch('/api/streams?type=RADIO', { cache: 'no-store' }),
        fetch('/api/schedule', { cache: 'no-store' })
      ]);

      if (streamRes.ok) {
        const streamData = await streamRes.json();
        setStreamConfig(streamData);
      }

      if (schedRes.ok) {
        const schedData = await schedRes.json();
        setSchedule(schedData);
      }
    } catch (e) {
      console.error("Failed to fetch radio data:", e);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setIsBuffering(false);
    } else {
      setIsBuffering(true);
      setStreamError(null);

      const primaryUrl = streamConfig?.streamUrl || "https://stream.zeno.fm/f3wvbbqndg8uv";
      const backupUrl = "https://icecast.omroep.nl/radio1-bb-mp3";

      if (audio.src !== primaryUrl && audio.src !== backupUrl) {
        audio.src = primaryUrl;
      }

      const startPlayback = (url: string, isRetry = false) => {
        audio.src = url;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setIsBuffering(false);
            setStreamError(null);
          })
          .catch(error => {
            if (error.name === 'AbortError') return;
            if (!isRetry && url !== backupUrl) {
              console.warn("Primary radio feed failed, switching to backup live feed...");
              startPlayback(backupUrl, true);
            } else {
              console.warn("Live radio playback error:", error.message);
              setStreamError("Unable to connect to live stream. Tap Retry to reconnect.");
              setIsBuffering(false);
              setIsPlaying(false);
            }
          });
      };

      startPlayback(audio.src || primaryUrl);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: "360 Radio 98.5 FM Dutse",
          text: `Listening to ${streamConfig?.currentShow || "Live Broadcast"} on 360 Radio 98.5 FM Dutse!`,
          url: window.location.href
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Stream link copied to clipboard!");
    }
  };

  const formatScheduleTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const end = new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-28 pb-16 relative overflow-hidden">
      
      {/* Cinematic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      {/* Real HTML5 Audio Element */}
      <audio ref={audioRef} preload="none" playsInline crossOrigin="anonymous" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-black px-5 py-2 rounded-full text-xs tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            <Radio className="w-4 h-4" />
            LIVE STREAMING • 98.5 FM DUTSE
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
            Listen <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Live</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Broadcasting live 24/7 across Jigawa State with high fidelity digital stereo audio feed.
          </p>
        </motion.div>

        {/* Premium Glassmorphic Player Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`relative bg-slate-900/50 backdrop-blur-3xl border rounded-[2.5rem] p-8 md:p-12 mb-16 flex flex-col gap-8 transition-all duration-700 overflow-hidden shadow-2xl ${
            isPlaying 
              ? 'shadow-[0_0_80px_-20px_rgba(37,99,235,0.4)] border-blue-500/40 bg-slate-900/70' 
              : 'border-white/10 hover:border-slate-700'
          }`}
        >
          
          {/* Ambient background glow inside player */}
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 ${isPlaying ? 'bg-blue-600/20' : 'bg-transparent'}`} />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Main Controls Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Visualizer & Icon Container */}
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl flex items-center justify-center shrink-0 border shadow-2xl relative overflow-hidden transition-all duration-500 ${
                isPlaying 
                  ? 'bg-slate-950 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
                  : 'bg-slate-950/60 border-white/10'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 to-transparent" />
                
                {isBuffering ? (
                  <Loader2 className="w-10 h-10 text-blue-400 animate-spin relative z-10" />
                ) : isPlaying ? (
                  // Dynamic Multi-Bar EQ Visualizer
                  <div className="flex items-end justify-center gap-1.5 w-full h-14 relative z-10 px-4">
                    {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                      <motion.div 
                        key={bar} 
                        className="w-2 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-sm"
                        animate={{
                          height: ["15%", "100%", "30%", "85%", "15%"]
                        }}
                        transition={{
                          duration: 0.5 + (bar % 3) * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: bar * 0.08
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Headphones className="w-12 h-12 text-slate-500" />
                )}
              </div>
              
              {/* Stream Info */}
              <div className="space-y-2">
                <div className={`flex items-center gap-2 font-black text-xs tracking-[0.2em] uppercase ${isPlaying ? 'text-blue-400' : 'text-slate-500'}`}>
                  {isBuffering ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      CONNECTING FEED...
                    </>
                  ) : isPlaying ? (
                    <>
                      <Activity className="w-4 h-4 animate-pulse text-blue-400" />
                      PLAYING LIVE (98.5 FM)
                    </>
                  ) : (
                    <>
                      <Radio className="w-4 h-4" />
                      ON AIR NOW
                    </>
                  )}
                </div>
                <h2 className="text-white font-black text-2xl md:text-4xl leading-tight drop-shadow-md">
                  {streamConfig?.currentShow || "Barke Da Sallah & Pulse"}
                </h2>
                <div className="text-slate-400 text-xs md:text-sm font-bold flex flex-wrap items-center gap-3 pt-1">
                  <span>98.5 FM Stereo Feed</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span>Dutse Studio</span>
                  {isPlaying && (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-black border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      {liveListeners.toLocaleString()} {liveListeners === 1 ? 'Listener' : 'Listeners'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Big Play/Pause Button */}
            <div className="flex flex-col items-center gap-3 relative z-10 shrink-0">
              <motion.button 
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={togglePlay}
                disabled={isBuffering}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
                  isPlaying 
                  ? 'bg-slate-900 hover:bg-slate-800 border-2 border-blue-500/60 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
                  : 'bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_40px_rgba(37,99,235,0.5)]'
                }`}
              >
                {isBuffering ? (
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-10 h-10 text-white fill-current" />
                ) : (
                  <Play className="w-10 h-10 text-white fill-current ml-1" />
                )}
              </motion.button>
              <span className="text-slate-400 text-[11px] font-black tracking-widest uppercase">
                {isBuffering ? "Connecting..." : isPlaying ? "Pause Live Stream" : "Tap to Listen"}
              </span>
            </div>

          </div>

          {/* Bottom Bar: Volume Slider & Actions */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            
            {/* Volume Control */}
            <div className="flex items-center gap-3 w-full sm:w-64">
              <button 
                onClick={toggleMute}
                className="text-slate-400 hover:text-white p-1 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-red-400" />
                ) : (
                  <Volume2 className="w-5 h-5 text-blue-400" />
                )}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer"
              />
              <span className="text-[11px] font-mono text-slate-500 w-8 text-right">
                {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="px-4 py-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Stream
              </button>
              <Link 
                href="/watch-live" 
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
              >
                <Tv className="w-3.5 h-3.5" /> Watch Live TV
              </Link>
            </div>

          </div>

          {/* Error Banner if connection fails */}
          <AnimatePresence>
            {streamError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-red-950/60 border border-red-800/60 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold text-red-300"
              >
                <span>{streamError}</span>
                <button 
                  onClick={togglePlay}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retry
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

        {/* Schedule Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <h3 className="text-2xl font-black text-white tracking-wide">Today's Broadcast Lineup</h3>
            </div>
          </div>
          
          <div className="space-y-4">
            {schedule.length === 0 ? (
              <div className="text-center text-slate-500 py-8 bg-slate-900/40 rounded-2xl border border-slate-800">
                No scheduled programs found.
              </div>
            ) : (
              schedule.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  className={`group relative bg-slate-900/40 border border-white/5 rounded-[1.5rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-900/80 cursor-pointer ${
                    item.isLive ? 'shadow-[0_10px_30px_-10px_rgba(37,99,235,0.2)] border-blue-900/30 bg-slate-900/60' : ''
                  }`}
                >
                  {/* Hover gradient sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                  
                  <div className="space-y-3 relative z-10">
                    <div className={`flex items-center gap-2 text-sm font-bold ${item.isLive ? "text-blue-400" : "text-slate-500"}`}>
                      <Clock className="w-4 h-4" />
                      {formatScheduleTime(item.startTime, item.endTime)}
                    </div>
                    <h4 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                    <p className="text-slate-400 text-sm font-medium">
                      <span className="text-slate-500 uppercase text-xs tracking-widest font-bold mr-2">Host</span> 
                      {item.host?.name || "360 Broadcaster"}
                    </p>
                  </div>
                  
                  <div className="shrink-0 mt-2 md:mt-0 relative z-10">
                    {item.isLive ? (
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] uppercase tracking-widest">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,1)]" />
                        ON AIR NOW
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold bg-white/5 text-slate-400 border border-white/10 uppercase tracking-widest">
                        {item.type}
                      </span>
                    )}
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
