"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server,
  Activity,
  AlertTriangle,
  UserCheck,
  Zap,
  Mic2,
  HardDrive,
  Truck,
  ArrowUpRight,
  ShieldCheck,
  Wifi,
  FileCheck2,
  Megaphone,
  X
} from 'lucide-react';

export default function StationManagerDashboard() {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

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

  const hardwareLogs = [
    { id: 1, time: "10:14 AM", component: "Studio A - Master Out", issue: "Audio Peak Detected (+4dB)", status: "Resolved", type: "warning" },
    { id: 2, time: "09:30 AM", component: "Main Transmitter TX-1", issue: "Temperature spiked to 45°C", status: "Monitoring", type: "error" },
    { id: 3, time: "08:15 AM", component: "OB Van 2 (Kazaure)", issue: "Satellite link established", status: "Active", type: "success" },
    { id: 4, time: "07:00 AM", component: "Studio B - Mic 3", issue: "No phantom power detected", status: "Pending Fix", type: "error" }
  ];

  const fullHardwareLogs = [
    ...hardwareLogs,
    { id: 5, time: "06:45 AM", component: "Server Rack 2", issue: "Routine backup completed", status: "Success", type: "success" },
    { id: 6, time: "05:30 AM", component: "Studio C - Mixer", issue: "Firmware update applied v2.1", status: "Resolved", type: "success" },
    { id: 7, time: "04:12 AM", component: "Cooling Unit B", issue: "Fan RPM dropped below threshold", status: "Monitoring", type: "warning" },
    { id: 8, time: "02:00 AM", component: "Main Transmitter TX-2", issue: "Weekly diagnostics passed", status: "Success", type: "success" },
  ];

  return (
    <>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Page Title & Logistics Overview */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Logistics & Operations</h1>
            <p className="text-sm font-medium text-slate-400">Manage equipment health, staff deployment, and compliance metrics.</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-2 px-4 shadow-xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">All Facilities Operational</span>
          </div>
        </motion.div>

        {/* 4-Column Operational Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {/* Transmitter Array Health */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] p-6 shadow-2xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-blue-400 tracking-widest bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                  Main Tower
                </span>
              </div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Transmission Power</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 font-mono tracking-tight">4.2</span>
                <span className="text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-widest">kW</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              </div>
            </div>
          </motion.div>

          {/* Studio Equipment */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] p-6 shadow-2xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-purple-500/10 p-3 rounded-2xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  <Mic2 className="w-5 h-5 text-purple-400" />
                </div>
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-purple-400 tracking-widest bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                  1 Issue Detected
                </span>
              </div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Active Hardware</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 font-mono tracking-tight">24</span>
                <span className="text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-widest">Units Online</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                <span>Studio A Mic 3:</span>
                <span className="text-red-400">Offline</span>
              </div>
            </div>
          </motion.div>

          {/* Outside Broadcast (OB) Vans */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] p-6 shadow-2xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Truck className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">OB Fleet Deployment</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 font-mono tracking-tight">2</span>
                <span className="text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-widest">Vans Active</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                <span>Van 1 (Dutse Mkt):</span>
                <span className="text-emerald-400 flex items-center gap-1"><Wifi className="w-3 h-3"/> Transmitting</span>
              </div>
            </div>
          </motion.div>

          {/* Shift Attendance */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] p-6 shadow-2xl group relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Shift Roster (Current)</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 font-mono tracking-tight">18 <span className="text-slate-600 text-2xl">/ 19</span></span>
                <span className="text-xs text-slate-500 mb-1.5 font-bold uppercase tracking-widest">Staff Clocked</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                <span>Absent (Unexcused):</span>
                <span className="text-amber-400">1 (M. Kabir)</span>
              </div>
            </div>
          </motion.div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* SECTION 1: Hardware & Infrastructure Log */}
          <motion.div variants={itemVariants} className="bg-slate-900/30 backdrop-blur-2xl rounded-[2rem] p-8 border border-slate-700/40 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/60 shrink-0 relative z-10">
              <h3 className="text-sm font-black tracking-[0.1em] uppercase text-white flex items-center gap-3">
                <span className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
                  <Server className="w-4 h-4" />
                </span>
                Hardware Event Log
              </h3>
            </div>

            <div className="space-y-4 relative z-10">
              {hardwareLogs.map((log) => (
                <div key={log.id} className="group bg-slate-800/20 hover:bg-slate-800/60 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 p-2 rounded-xl border ${
                      log.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                      log.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                      'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}>
                      {log.type === 'error' ? <AlertTriangle className="w-4 h-4"/> : 
                       log.type === 'warning' ? <Activity className="w-4 h-4"/> : 
                       <HardDrive className="w-4 h-4"/>}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{log.component}</h4>
                      <p className="text-xs text-slate-400 font-medium">{log.issue}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2.5">
                    <span className="text-xs font-bold text-slate-500 font-mono tracking-tight">{log.time}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm ${
                      log.status === 'Resolved' || log.status === 'Active' || log.status === 'Success' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 
                      log.status === 'Monitoring' ? 'bg-amber-500/5 text-amber-400 border-amber-500/20' :
                      'bg-red-500/5 text-red-400 border-red-500/20'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsLogModalOpen(true)}
              className="w-full mt-6 py-3 rounded-xl bg-slate-800/30 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 relative z-10"
            >
              View Full Tech Log <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* SECTION 2: Compliance & Revenue Fulfillment */}
          <motion.div variants={itemVariants} className="bg-slate-900/30 backdrop-blur-2xl rounded-[2rem] p-8 border border-slate-700/40 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/60 shrink-0 relative z-10">
              <h3 className="text-sm font-black tracking-[0.1em] uppercase text-white flex items-center gap-3">
                <span className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                Compliance & Ad Fulfillment
              </h3>
            </div>

            <div className="space-y-6 relative z-10">
              
              {/* Ad Fulfillment Progress */}
              <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Commercial Fulfillment</span>
                  </div>
                  <span className="text-xs font-bold text-white font-mono">32 / 35 Slots</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-amber-500 w-[91%] rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                </div>
                <p className="text-[10px] text-slate-500 font-bold mt-3">3 commercials pending execution for Evening Drive Time.</p>
              </div>

              {/* NBC Log Compliance */}
              <div className="bg-slate-800/20 p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">NBC Broadcast Logs</span>
                  </div>
                  <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">Up To Date</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold mb-3">All program logs from yesterday successfully signed and archived to cold storage.</p>
                <button className="w-full py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-widest transition-all">
                  Download Latest Archive
                </button>
              </div>

              {/* Content Warnings */}
              <div className="flex items-center gap-4 bg-red-500/5 p-4 rounded-2xl border border-red-500/20">
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white mb-0.5">Political Broadcast Alert</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Unvetted political jingle detected in queue for 14:00. Requires Station Manager approval.</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* View Tech Log Modal */}
      <AnimatePresence>
        {isLogModalOpen && (
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
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-3xl w-full shadow-2xl max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <Server className="w-5 h-5 text-slate-400" />
                    Full Hardware Event Log
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Showing all recorded hardware anomalies and maintenance events for the past 24 hours.</p>
                </div>
                <button 
                  onClick={() => setIsLogModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto admin-sidebar-scrollbar pr-2 space-y-3">
                {fullHardwareLogs.map((log) => (
                  <div key={log.id} className="bg-slate-800/40 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 p-2 rounded-xl border ${
                        log.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                        log.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                        'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      }`}>
                        {log.type === 'error' ? <AlertTriangle className="w-4 h-4"/> : 
                         log.type === 'warning' ? <Activity className="w-4 h-4"/> : 
                         <HardDrive className="w-4 h-4"/>}
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{log.component}</h4>
                        <p className="text-xs text-slate-400 font-medium">{log.issue}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="text-xs font-bold text-slate-500 font-mono tracking-tight">{log.time}</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm ${
                        log.status === 'Resolved' || log.status === 'Active' || log.status === 'Success' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 
                        log.status === 'Monitoring' ? 'bg-amber-500/5 text-amber-400 border-amber-500/20' :
                        'bg-red-500/5 text-red-400 border-red-500/20'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
