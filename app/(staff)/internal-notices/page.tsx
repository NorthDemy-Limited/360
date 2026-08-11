"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Edit3, X, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

export default function InternalNoticesPage() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
              <Bell className="w-8 h-8 text-orange-400" />
              Internal Notices
            </h1>
            <p className="text-sm font-medium text-slate-400">Station-wide announcements and operational memos.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] transition-all flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Post Notice
            </button>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800/60 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
          <Bell className="w-16 h-16 text-slate-700 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Notice Board</h3>
          <p className="text-slate-400 text-sm max-w-md">No new urgent notices at this time. All broadcast and technical memos will appear here.</p>
        </div>
      </motion.div>

      {/* Post Notice Modal */}
      <AnimatePresence>
        {isPostModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl flex flex-col relative overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Edit3 className="w-6 h-6 text-orange-400" />
                    Compose Internal Memo
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Broadcast an announcement to specific staff or the entire station.</p>
                </div>
                <button 
                  onClick={() => setIsPostModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white bg-slate-800/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); setIsPostModalOpen(false); }}>
                
                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Subject / Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Update on Studio B Equipment Maintenance" 
                    className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-600 font-medium"
                    required
                  />
                </div>
                
                {/* Configuration Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-slate-400" /> Urgency Level
                    </label>
                    <select className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors font-medium appearance-none">
                      <option>Standard (FYI)</option>
                      <option>High (Important Update)</option>
                      <option>Critical (Immediate Action Required)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Users className="w-3 h-3 text-slate-400" /> Target Audience
                    </label>
                    <select className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors font-medium appearance-none">
                      <option>All Staff (Station-Wide)</option>
                      <option>Newsroom Staff Only</option>
                      <option>On-Air Presenters Only</option>
                      <option>Technical & Studio Crew</option>
                    </select>
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Notice Details</label>
                  <textarea 
                    rows={6}
                    placeholder="Type the full details of your announcement here..."
                    className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-600 font-medium resize-none"
                    required
                  ></textarea>
                </div>

                <div className="pt-6 border-t border-slate-800 flex justify-end gap-3 mt-4">
                  <button 
                    type="button"
                    onClick={() => setIsPostModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Broadcast Notice
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
