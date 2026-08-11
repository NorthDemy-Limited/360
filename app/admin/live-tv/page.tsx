"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Tv, MonitorPlay, PowerOff, Settings2, ExternalLink } from 'lucide-react';

export default function LiveTVControlPage() {
  return (
    <div className="space-y-6 min-h-full relative">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-2">
            MODULE 4: LIVE TELEVISION CONTROL
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            360 TV Digital Encoder
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Manage high-definition HLS / MP4 video feed and digital TV channel broadcast status directly from the cloud console.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-red-600 hover:bg-red-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center gap-2"
        >
          <PowerOff className="w-4 h-4" />
          DISABLE TV STREAM (GO OFFLINE)
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-4">
        
        {/* Transmitter Status Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-1 bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between"
        >
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between mb-8">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CHANNEL STATUS</span>
            <span className="bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-red-500/20 flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              BROADCASTING LIVE
            </span>
          </div>

          <div className="relative z-10 mb-8">
            <h3 className="text-6xl font-black text-slate-100 mb-2 tracking-tight">3,450</h3>
            <p className="text-sm text-slate-400 font-medium leading-snug">Concurrent Digital TV Viewers</p>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-slate-800/50 pt-6">
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Resolution</p>
              <p className="text-sm text-slate-200 font-medium">1080p HD</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Codec</p>
              <p className="text-sm text-slate-200 font-medium">H.264 / AAC</p>
            </div>
          </div>
        </motion.div>

        {/* Monitor & Config Column */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Monitor Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl"
          >
            <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
              <Tv className="w-4 h-4 text-slate-500" />
              Monitor Live TV Broadcast Stream
            </h3>
            
            <div className="bg-[#020817] rounded-xl p-6 border border-slate-800/50 shadow-inner flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-transparent pointer-events-none group-hover:from-red-900/20 transition-all"></div>
              
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.15)] relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-xl blur animate-pulse"></div>
                  <MonitorPlay className="w-6 h-6 text-red-500 relative z-10" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-100 mb-1">360 Morning Live Broadcast - Dutse Studios</h4>
                  <p className="text-[10px] font-mono text-slate-500 truncate max-w-[200px] sm:max-w-xs">https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/...</p>
                </div>
              </div>
              
              <button className="relative z-10 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                <ExternalLink className="w-3.5 h-3.5" />
                Pop-Out Player
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
              TV Video Feed Configuration
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live TV Stream URL (HLS / MP4) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input type="url" defaultValue="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-11 text-sm font-mono text-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Currently Broadcasting Show <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="360 Morning Live Broadcast - Dutse Studios" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all" />
              </div>

              <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all">
                Update TV Encoder Settings
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
