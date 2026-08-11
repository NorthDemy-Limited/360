"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Mic, Settings2, PowerOff, Activity } from 'lucide-react';

export default function LiveRadioControlPage() {
  return (
    <div className="space-y-6 relative min-h-full">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block mb-2">
            MODULE 3: LIVE RADIO CONTROL
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            Radio Stream Transmitter (98.5 FM)
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Configure live Icecast / Shoutcast audio encoder feed and broadcast metadata for the internet radio.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2"
        >
          <PowerOff className="w-4 h-4" />
          DISABLE LIVE STREAM (GO OFFLINE)
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4">
        
        {/* Transmitter Status Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[320px]"
        >
          
          {/* Animated Wave Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="absolute w-[200%] h-full top-0 left-0 animate-[pulse_4s_ease-in-out_infinite]" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#10b981" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,170.7C672,171,768,117,864,112C960,107,1056,155,1152,165.3C1248,176,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between mb-8">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">TRANSMITTER STATUS</span>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ON AIR (LIVE)
            </span>
          </div>

          <div className="relative z-10 mb-8">
            <h3 className="text-6xl font-black text-slate-100 mb-2 tracking-tight">1,284</h3>
            <p className="text-sm text-slate-400 font-medium">Concurrent Digital Listeners Connected</p>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-slate-800/50 pt-6">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Audio Bitrate</p>
              <p className="text-sm text-slate-200 font-medium">128 kbps Stereo</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Frequency</p>
              <p className="text-sm text-slate-200 font-medium">98.5 MHz</p>
            </div>
          </div>
        </motion.div>

        {/* Monitor Feed & Configuration */}
        <div className="space-y-6">
          
          {/* Monitor Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 shadow-xl"
          >
            <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
              <Radio className="w-4 h-4 text-slate-500" />
              Monitor Live Audio Broadcast Feed
            </h3>
            <div className="bg-[#020817] rounded-xl p-4 border border-slate-800/50 flex items-center justify-between group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-transparent pointer-events-none group-hover:from-emerald-900/20 transition-all"></div>
              
              <div className="flex items-center gap-4 overflow-hidden relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Mic className="text-emerald-500 w-5 h-5" />
                </div>
                <div className="truncate">
                  <h4 className="text-sm font-bold text-slate-100 mb-0.5 truncate">Barke Da Sallah & Morning Pulse</h4>
                  <p className="text-[10px] font-mono text-slate-500 truncate">https://stream.zeno.fm/f3wvbbqndg8uv</p>
                </div>
              </div>
              <button className="relative z-10 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)] ml-4">
                <Activity className="w-3.5 h-3.5" />
                Listen Live
              </button>
            </div>
          </motion.div>

          {/* Config Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl"
          >
            <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-slate-400" />
              Stream Encoding Configuration
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Radio Audio Stream URL <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Radio className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input type="url" defaultValue="https://stream.zeno.fm/f3wvbbqndg8uv" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-11 text-sm font-mono text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all" />
                </div>
                <p className="text-[10px] text-slate-500 font-medium mt-1">Supports Icecast / Shoutcast MP3 / AAC direct streaming links.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Currently Playing Show Title <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="Barke Da Sallah & Morning Pulse" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all" />
              </div>

              <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all">
                Update Stream Parameters
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
