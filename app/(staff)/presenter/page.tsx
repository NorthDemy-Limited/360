"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Volume2, 
  AlertOctagon, 
  Play,
  Pause,
  SkipForward,
  FastForward,
  MessageSquareWarning,
  Radio,
  Clock,
  Activity,
  ListVideo
} from 'lucide-react';

export default function PresenterStudioConsole() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const jingles = [
    { id: 1, name: "STATION ID FULL", duration: "0:15", type: "primary" },
    { id: 2, name: "NEWS INTRO (HEAVY)", duration: "0:08", type: "urgent" },
    { id: 3, name: "AD BUMPER IN", duration: "0:06", type: "secondary" },
    { id: 4, name: "AD BUMPER OUT", duration: "0:06", type: "secondary" },
    { id: 5, name: "MORNING SHOW THEME", duration: "0:30", type: "music" },
    { id: 6, name: "WEATHER BED", duration: "1:00", type: "music" },
    { id: 7, name: "SFX: APPLAUSE", duration: "0:04", type: "sfx" },
    { id: 8, name: "SFX: AIRHORN", duration: "0:02", type: "sfx" },
    { id: 9, name: "EMERGENCY OVERRIDE", duration: "---", type: "danger" },
  ];

  // Container variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="h-full w-full bg-[#050505] text-white p-4 md:p-6 flex flex-col overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full w-full max-w-[1800px] mx-auto z-10 relative"
      >
        
        {/* LEFT COLUMN: TIMERS & CUES (Span 3) */}
        <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col gap-6 h-full">
          
          {/* Glass Clock Panel */}
          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Clock className="w-6 h-6 text-slate-700 absolute top-6 left-6" />
            <h1 
              className="text-5xl xl:text-6xl font-black text-white font-mono tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] tabular-nums mt-4" 
              suppressHydrationWarning
            >
              {mounted ? formatTime(time) : '00:00:00'}
            </h1>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] mt-4 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">WAT / GMT+1</span>
          </div>

          {/* Current Segment Status */}
          <div className="flex-1 bg-[#0a0a0a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,1)]"></span>
                <span className="text-xs font-black uppercase text-red-500 tracking-[0.2em]">ON AIR LIVE</span>
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">98.5 FM</span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2 tracking-tight">Morning Pulse</h2>
              <p className="text-slate-400 font-medium flex items-center gap-2"><Activity className="w-4 h-4" /> Live Interview</p>
              
              <div className="mt-8 bg-black rounded-2xl border border-slate-800/80 p-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-600 to-orange-500 w-full animate-[pulse_2s_infinite]"></div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-900/10 blur-[40px] rounded-full group-hover:bg-red-900/20 transition-colors"></div>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-2 relative z-10">Segment Countdown</span>
                <div className="text-5xl font-black text-red-500 font-mono tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(239,68,68,0.4)] relative z-10">14:22</div>
                <p className="text-xs text-slate-400 font-bold mt-4 uppercase tracking-widest relative z-10 flex items-center gap-2">
                  <SkipForward className="w-4 h-4 text-slate-600" /> Next: Commercial Break
                </p>
              </div>
            </div>
          </div>
        </motion.div>


        {/* CENTER COLUMN: TELEPROMPTER (Span 6) */}
        <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col h-full bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
          
          {/* Prompter Visual Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none z-10 h-full w-full opacity-90"></div>
          
          {/* Read Line Indicator */}
          <div className="absolute top-1/2 left-0 w-full h-[60px] -translate-y-1/2 bg-white/5 border-y border-white/10 pointer-events-none z-10 flex items-center">
            <div className="w-1 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
            <div className="w-full h-full bg-gradient-to-r from-red-500/5 to-transparent"></div>
          </div>
          
          {/* Prompter Header */}
          <div className="p-4 md:px-8 md:py-5 border-b border-slate-800/80 bg-black/60 relative z-20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]'}`}></div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isPlaying ? 'text-emerald-500' : 'text-yellow-500'}`}>
                {isPlaying ? 'AUTO-SCROLL ACTIVE' : 'SCROLL PAUSED'}
              </span>
            </div>
            <div className="flex gap-2 bg-slate-900 rounded-full p-1 border border-slate-800">
              <motion.button whileTap={{ scale: 0.9 }} className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-colors"><FastForward className="w-4 h-4 rotate-180"/></motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsPlaying(!isPlaying)} className={`p-2 rounded-full transition-colors ${isPlaying ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>
                {isPlaying ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-colors"><FastForward className="w-4 h-4"/></motion.button>
            </div>
          </div>

          {/* Prompter Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-8 md:p-16 relative z-0">
            <article className="max-w-2xl mx-auto space-y-12 pb-[50vh]">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="border-l-4 border-red-500 pl-6 py-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-r-xl"
              >
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 mb-3">
                  <AlertOctagon className="w-4 h-4" /> PRODUCER CUE
                </span>
                <p className="text-xl md:text-2xl font-bold text-white uppercase leading-relaxed">WELCOME BACK TO THE MORNING PULSE. MENTION THE DUTSE CENTRAL MARKET FIRE BEFORE INTRODUCING THE GUEST.</p>
              </motion.div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px bg-slate-800 flex-1"></div>
                  <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">SEGMENT START</span>
                  <div className="h-px bg-slate-800 flex-1"></div>
                </div>
                
                <p className="text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-300 leading-[1.5] tracking-wide">
                  Good morning, Jigawa! You are listening to <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">98.5 FM</span>, and this is the Morning Pulse. 
                </p>
                
                <p className="text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-300 leading-[1.5] tracking-wide">
                  Before we dive into today's main discussion, we have an update on the situation at the <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.2)]">Dutse Central Market</span>. 
                </p>
                
                <p className="text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-300 leading-[1.5] tracking-wide">
                  The State Fire Service has confirmed that the minor fire which broke out early this morning has been <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.2)]">completely contained</span>. No casualties were reported.
                </p>
                
                <p className="text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-300 leading-[1.5] tracking-wide">
                  Now, joining us in the studio today is the <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Honorable Commissioner of Agriculture</span>...
                </p>
              </div>

            </article>
          </div>
        </motion.div>


        {/* RIGHT COLUMN: SOUNDBOARD & INTERCOM (Span 3) */}
        <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col gap-6 h-full">
          
          {/* Urgent Intercom */}
          <div className="bg-red-950/40 backdrop-blur-xl border border-red-900/60 rounded-3xl p-6 md:p-8 relative overflow-hidden shrink-0 shadow-[0_10px_40px_rgba(239,68,68,0.15)] group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-red-600/10 blur-[30px] rounded-full"></div>
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="p-2 bg-red-500/20 rounded-full border border-red-500/30">
                <MessageSquareWarning className="w-5 h-5 text-red-500 animate-pulse" />
              </div>
              <h3 className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">Producer Override</h3>
            </div>
            <p className="text-lg font-bold text-white leading-snug relative z-10 italic">
              "Wrap up interview in 2 mins! We are running tight on the commercial break."
            </p>
          </div>

          {/* Up Next Preview */}
          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shrink-0 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] flex items-center gap-2">
                <ListVideo className="w-3.5 h-3.5" /> Up Next
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded-md border border-slate-800">10:00 AM</span>
            </div>
            <h4 className="text-xl font-bold text-slate-200 mt-2">Jigawa Business Today</h4>
          </div>

          {/* Hardware Soundboard */}
          <div className="flex-1 flex flex-col bg-[#0a0a0a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 overflow-hidden relative">
            <div className="flex items-center justify-between mb-6 shrink-0 relative z-10">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-slate-500" /> MASTER SOUNDBOARD
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 flex-1 content-start overflow-y-auto admin-sidebar-scrollbar pr-2 relative z-10 pb-4">
              {jingles.map((jingle) => {
                const styleMap: Record<string, string> = {
                  primary: "bg-blue-950/30 border-blue-900/50 text-blue-400 hover:bg-blue-600 hover:text-white shadow-[0_0_15px_rgba(29,78,216,0)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]",
                  urgent: "bg-red-950/30 border-red-900/50 text-red-400 hover:bg-red-600 hover:text-white shadow-[0_0_15px_rgba(185,28,28,0)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]",
                  secondary: "bg-emerald-950/30 border-emerald-900/50 text-emerald-400 hover:bg-emerald-600 hover:text-white shadow-[0_0_15px_rgba(4,120,87,0)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]",
                  music: "bg-purple-950/30 border-purple-900/50 text-purple-400 hover:bg-purple-600 hover:text-white shadow-[0_0_15px_rgba(109,40,217,0)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]",
                  sfx: "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600",
                  danger: "bg-gradient-to-r from-yellow-500 to-amber-500 border-yellow-400 text-black font-black col-span-2 hover:brightness-110 shadow-[0_0_20px_rgba(245,158,11,0.4)]",
                };

                return (
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    key={jingle.id} 
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 group ${styleMap[jingle.type]}`}
                  >
                    <span className={`text-[10px] sm:text-xs font-black leading-tight text-center ${jingle.type === 'danger' ? 'tracking-[0.2em]' : ''}`}>
                      {jingle.name}
                    </span>
                    {jingle.type !== 'danger' && (
                      <span className="text-[9px] font-mono mt-2 opacity-70 flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-md">
                        <Play className="w-2.5 h-2.5" /> {jingle.duration}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
            
            {/* Fade out bottom of soundboard */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-20"></div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
