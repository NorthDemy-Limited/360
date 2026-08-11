"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Plus, X, Calendar, Target, CheckCircle2, DollarSign } from 'lucide-react';

export default function CommercialAdsDashboard() {
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Commercial & Ads</h1>
            <p className="text-sm font-medium text-slate-400">Manage radio and TV ad campaigns, sponsors, and revenue tracking.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCampaignModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Campaign
            </button>
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800/60 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
          <BarChart3 className="w-16 h-16 text-slate-700 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Ad Server Online</h3>
          <p className="text-slate-400 text-sm max-w-md">Commercial insertion system is running normally. 32/35 slots fulfilled for today&apos;s broadcast schedule.</p>
        </div>
      </motion.div>

      {/* New Campaign Modal */}
      <AnimatePresence>
        {isCampaignModalOpen && (
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Plus className="w-6 h-6 text-amber-400" />
                    Create New Campaign
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Configure a new commercial run for a client.</p>
                </div>
                <button 
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white bg-slate-800/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); setIsCampaignModalOpen(false); }}>
                
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Client Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., MTN Nigeria" 
                      className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600 font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Campaign Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Summer Promo 2026" 
                      className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600 font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Scheduling */}
                <div className="bg-slate-800/30 p-5 rounded-2xl border border-slate-800 space-y-5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" /> Scheduling & Duration
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Start Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors font-medium color-scheme-dark"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">End Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500 transition-colors font-medium color-scheme-dark"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Target Broadcast Slots</label>
                    <div className="flex flex-wrap gap-3">
                      {['Morning Drive', 'Mid-Day', 'Evening Drive', 'Night Time', 'Weekend Prime'].map((slot) => (
                        <label key={slot} className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg cursor-pointer hover:border-amber-500/50 transition-colors">
                          <input type="checkbox" className="accent-amber-500" />
                          <span className="text-xs font-medium text-slate-300">{slot}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Value & Target */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Target className="w-3 h-3" /> Target Medium
                    </label>
                    <select className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors font-medium appearance-none">
                      <option>Radio (98.5 FM) Only</option>
                      <option>Television (360 TV) Only</option>
                      <option>Simulcast (Both)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <DollarSign className="w-3 h-3" /> Campaign Value (₦)
                    </label>
                    <input 
                      type="number" 
                      placeholder="Amount" 
                      className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex justify-end gap-3 mt-4">
                  <button 
                    type="button"
                    onClick={() => setIsCampaignModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Save Campaign
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
