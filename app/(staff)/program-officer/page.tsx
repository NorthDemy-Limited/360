"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  Radio, 
  Clock, 
  Settings2, 
  Plus, 
  MoreVertical,
  X,
  CheckCircle2,
  CalendarPlus
} from 'lucide-react';

export default function ProgramOfficerDashboard() {
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

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
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* 4-Column Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Today's Broadcasts */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20">
              <CalendarDays className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Today's Broadcasts</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">14</span>
            <span className="text-xs text-slate-400 mb-1 font-medium">Shows Logged</span>
          </div>
        </motion.div>

        {/* Current Program */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
              <Radio className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-emerald-400 tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              On Air Now
            </span>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Program</h3>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-white truncate">Morning Pulse</span>
            <span className="text-[10px] text-slate-400 font-medium">Ends in 45 mins</span>
          </div>
        </motion.div>

        {/* Unassigned Slots */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-amber-400 tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              Needs Hosts
            </span>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Unassigned Slots</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">2</span>
            <span className="text-xs text-slate-400 mb-1 font-medium">Slots Open</span>
          </div>
        </motion.div>

        {/* Studio Utilization */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-purple-500/10 p-3 rounded-2xl border border-purple-500/20">
              <Settings2 className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Studio Utilization</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">85%</span>
            <span className="text-xs text-slate-400 mb-1 font-medium">Efficiency</span>
          </div>
        </motion.div>

      </div>

      {/* Main Content Area */}
      <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 shadow-xl overflow-hidden flex flex-col">
        
        {/* Table Header / Toolbar */}
        <div className="p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/50">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Master Program Grid</h3>
            <p className="text-xs text-slate-400 font-medium">Manage studio timetables, host assignments, and broadcast streams.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setIsEditorModalOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
            >
              <CalendarPlus className="w-4 h-4" /> Book Slot
            </button>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] uppercase tracking-widest font-bold text-slate-500">
                <th className="px-6 py-4">Time Slot</th>
                <th className="px-6 py-4">Program & Category</th>
                <th className="px-6 py-4 text-center">Medium</th>
                <th className="px-6 py-4">Assigned Crew</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                { id: 1, time: "06:00 - 09:00", program: "Morning Pulse", category: "News & Lifestyle", medium: "BOTH", host: "Balarabe Hadejia", status: "Completed" },
                { id: 2, time: "10:00 - 11:30", program: "Jigawa Business Today", category: "Business", medium: "RADIO", host: "Fatima Garba", status: "On Air" },
                { id: 3, time: "12:00 - 14:00", program: "Arewa Heritage Beats", category: "Culture", medium: "TV", host: "Aliyu Ringim", status: "Scheduled" },
                { id: 4, time: "14:00 - 15:00", program: "Open Discussion", category: "Politics", medium: "RADIO", host: "Unassigned", status: "Scheduled" }
              ].map((prog) => (
                <tr key={prog.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-300 font-mono tracking-tight whitespace-nowrap">{prog.time}</span>
                  </td>
                  <td className="px-6 py-4">
                    <h4 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-blue-400 transition-colors whitespace-nowrap">{prog.program}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{prog.category}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border shadow-sm whitespace-nowrap ${
                      prog.medium === 'BOTH' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      prog.medium === 'RADIO' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {prog.medium}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-xs font-bold whitespace-nowrap ${prog.host === 'Unassigned' ? 'text-amber-400' : 'text-slate-300'}`}>
                      {prog.host}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {prog.status === 'On Air' ? (
                      <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm bg-emerald-500/10 text-emerald-400 border-emerald-500/20 inline-flex items-center gap-1.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        ON AIR
                      </span>
                    ) : prog.status === 'Completed' ? (
                      <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm bg-slate-800 text-slate-400 border-slate-700 whitespace-nowrap">
                        Completed
                      </span>
                    ) : (
                      <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm bg-blue-500/10 text-blue-400 border-blue-500/20 whitespace-nowrap">
                        Scheduled
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Program Editor Modal */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsEditorModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl relative z-10 shadow-2xl flex flex-col max-h-full overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-xl border border-blue-500/20">
                  <CalendarPlus className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">Program Scheduler</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Edit Airtime Slot</p>
                </div>
              </div>
              <button onClick={() => setIsEditorModalOpen(false)} className="text-slate-500 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-xl transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 admin-sidebar-scrollbar">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Program Name <span className="text-blue-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Enter program title..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-700" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Medium / Stream</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none">
                    <option>Radio 98.5 FM</option>
                    <option>360 Digital TV</option>
                    <option>Both (Simulcast)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none">
                    <option>News & Current Affairs</option>
                    <option>Culture & Lifestyle</option>
                    <option>Entertainment</option>
                    <option>Religion</option>
                    <option>Sports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Host / Presenter</label>
                  <input type="text" placeholder="Assign presenter..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Producer</label>
                  <input type="text" placeholder="Assign producer..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Start Time</label>
                  <input type="time" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">End Time</label>
                  <input type="time" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Program Rundown (Internal Notes)</label>
                <textarea 
                  rows={4}
                  placeholder="Topic outline, guest names, or special cues..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none placeholder:text-slate-700"
                ></textarea>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 shrink-0 bg-slate-900/80 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  Status: 
                  <select className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-300 focus:outline-none appearance-none">
                    <option>Scheduled</option>
                    <option>On Air</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsEditorModalOpen(false)} className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
                  Discard
                </button>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Save Slot
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}

    </motion.div>
  );
}
