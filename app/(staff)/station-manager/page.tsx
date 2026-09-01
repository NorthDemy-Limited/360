"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
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
  X,
  Radio,
  Tv,
  CheckCircle2,
  Play,
  Check,
  FolderOpen,
  RadioTower,
  Loader2,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function StationManagerDashboard() {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [mediaAssets, setMediaAssets] = useState<any[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // 10-Second Floating Toast State
  const [toast, setToast] = useState<{ id: string; title: string; message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const toastTimerRef = useRef<any>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ id: Date.now().toString(), title, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 10000); // 10-second duration
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setMediaAssets(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleToggleAuthorize = async (asset: any) => {
    const newStatus = !asset.isAuthorized;
    setActionLoadingId(asset.id);

    // Optimistic UI state update
    setMediaAssets(prev => prev.map(m => m.id === asset.id ? { ...m, isAuthorized: newStatus } : m));

    try {
      const res = await fetch(`/api/media/${asset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAuthorized: newStatus })
      });
      if (res.ok) {
        fetchMedia();
        if (newStatus) {
          showToast(
            "Asset Authorized Successfully", 
            `"${asset.title}" is now authorized for on-air broadcast and production.`, 
            "success"
          );
        } else {
          showToast(
            "Authorization Revoked", 
            `"${asset.title}" has been removed from authorized broadcast status.`, 
            "info"
          );
        }
      } else {
        setMediaAssets(prev => prev.map(m => m.id === asset.id ? { ...m, isAuthorized: asset.isAuthorized } : m));
        showToast("Error", "Failed to update authorization.", "warning");
      }
    } catch (e) {
      console.error(e);
      setMediaAssets(prev => prev.map(m => m.id === asset.id ? { ...m, isAuthorized: asset.isAuthorized } : m));
      showToast("Error", "Network error updating authorization.", "warning");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSetLiveBroadcast = async (asset: any) => {
    setActionLoadingId(asset.id);
    try {
      const res = await fetch(`/api/media/${asset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAuthorized: true, isActiveBroadcast: true })
      });
      if (res.ok) {
        fetchMedia();
        showToast(
          "🔴 Live Broadcast Feed Activated", 
          `"${asset.title}" is now transmitting live on ${asset.type === 'Video' ? '360 Digital TV' : 'Radio 98.5 FM'}.`,
          "success"
        );
      }
    } catch (e) {
      console.error(e);
      showToast("Error", "Failed to activate live broadcast feed.", "warning");
    } finally {
      setActionLoadingId(null);
    }
  };

  const pendingMedia = mediaAssets.filter(a => !a.isAuthorized);
  const authorizedMedia = mediaAssets.filter(a => a.isAuthorized);

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
      {/* 10-Second Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`fixed top-6 right-6 z-50 max-w-md w-[calc(100%-3rem)] bg-slate-900/95 backdrop-blur-2xl border rounded-2xl p-4 shadow-[0_15px_50px_rgba(0,0,0,0.8)] text-white overflow-hidden ${
              toast.type === 'success' ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.25)]' :
              toast.type === 'warning' ? 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.25)]' :
              'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.25)]'
            }`}
          >
            <div className="flex items-start gap-3.5 relative z-10">
              <div className={`p-2 rounded-xl shrink-0 ${
                toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                toast.type === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white tracking-tight">{toast.title}</h4>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Live Status
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
              </div>
              <button 
                onClick={() => setToast(null)}
                className="text-slate-500 hover:text-white p-1 rounded-lg transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 10-Second Countdown Progress Bar */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
              className={`h-1 absolute bottom-0 left-0 ${
                toast.type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                toast.type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-400' :
                'bg-gradient-to-r from-blue-500 to-indigo-400'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="space-y-8 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Page Title & Logistics Overview */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Station Operations & Broadcast Authorization</h1>
            <p className="text-sm font-medium text-slate-400">Authorize incoming media feeds, dispatch live broadcasts, and monitor station compliance.</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-2 px-4 shadow-xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Master Control Room Active</span>
          </div>
        </motion.div>

        {/* Incoming Media Notification Banner (If pending items exist) */}
        {pendingMedia.length > 0 && (
          <motion.div 
            variants={itemVariants}
            className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {pendingMedia.length} Media {pendingMedia.length === 1 ? 'Asset Requires' : 'Assets Require'} Authorization
                </h4>
                <p className="text-xs text-amber-400/80 mt-0.5">
                  Uploaded or imported assets must be authorized before going on-air.
                </p>
              </div>
            </div>
            <a 
              href="#media-dispatch" 
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shrink-0"
            >
              Review Queue
            </a>
          </motion.div>
        )}

        {/* 4-Column Operational Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {/* TX-1 Transmitter */}
          <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
                <RadioTower className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-emerald-400 tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </span>
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">TX-1 Main Transmitter</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">98.5 FM</span>
              <span className="text-xs text-slate-500 mb-1 font-bold">10kW Full Power</span>
            </div>
          </motion.div>

          {/* Pending Media Queue Metric */}
          <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
                <FolderOpen className="w-5 h-5 text-amber-400" />
              </div>
              {pendingMedia.length > 0 && (
                <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-amber-400 tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  Action Required
                </span>
              )}
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Authorization</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">{pendingMedia.length}</span>
              <span className="text-xs text-slate-500 mb-1 font-bold">Assets Awaiting Sign-off</span>
            </div>
          </motion.div>

          {/* Active Live Broadcast Feeds */}
          <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20">
                <Tv className="w-5 h-5 text-blue-400" />
              </div>
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-blue-400 tracking-widest bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                Live Feeds
              </span>
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Authorized Library</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">{authorizedMedia.length}</span>
              <span className="text-xs text-slate-500 mb-1 font-bold">Ready for Transmission</span>
            </div>
          </motion.div>

          {/* Shift Roster */}
          <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-purple-500/10 p-3 rounded-2xl border border-purple-500/20">
                <UserCheck className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active On-Duty Staff</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">18 / 19</span>
              <span className="text-xs text-slate-500 mb-1 font-bold">Staff Clocked In</span>
            </div>
          </motion.div>

        </div>

        {/* SECTION: Broadcast Media Authorization & Dispatch Console */}
        <motion.div 
          id="media-dispatch"
          variants={itemVariants} 
          className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                Media Authorization &amp; Live Feed Dispatcher
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Authorize incoming audio/video files and select which asset to broadcast live on Radio or TV at any moment.
              </p>
            </div>
            <Link 
              href="/media-storage" 
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
              Open Media Storage
            </Link>
          </div>

          {loadingMedia ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
            </div>
          ) : mediaAssets.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs bg-slate-950/40 rounded-2xl border border-slate-800/60">
              No media assets uploaded yet. Ingest media from the Media Storage page.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    <th className="pb-3 px-4">Asset Title</th>
                    <th className="pb-3 px-4 text-center">Type</th>
                    <th className="pb-3 px-4">Category</th>
                    <th className="pb-3 px-4 text-center">Authorization Status</th>
                    <th className="pb-3 px-4 text-right">Station Manager Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {mediaAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="py-4 px-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${asset.type === 'Audio' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                            {asset.type === 'Audio' ? <Radio className="w-4 h-4" /> : <Tv className="w-4 h-4" />}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white truncate max-w-[200px]" title={asset.title}>{asset.title}</h4>
                            <span className="text-[10px] text-slate-500 font-mono">{asset.size}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          {asset.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-slate-400">
                        {asset.category || "General Broadcast"}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                          asset.isActiveBroadcast 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                            : asset.isAuthorized 
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {asset.isActiveBroadcast ? "🔴 ON-AIR (ACTIVE)" : asset.isAuthorized ? "AUTHORIZED" : "PENDING SIGN-OFF"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          
                          {/* Toggle Authorize Button */}
                          <button 
                            onClick={() => handleToggleAuthorize(asset)}
                            disabled={actionLoadingId === asset.id}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                              asset.isAuthorized 
                                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30' 
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                            }`}
                          >
                            {actionLoadingId === asset.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : asset.isAuthorized ? (
                              <X className="w-3.5 h-3.5" />
                            ) : (
                              <ShieldCheck className="w-3.5 h-3.5" />
                            )}
                            {asset.isAuthorized ? "Revoke" : "Authorize"}
                          </button>

                          {/* Broadcast Live Switcher */}
                          {asset.isAuthorized && (
                            <button 
                              onClick={() => handleSetLiveBroadcast(asset)}
                              disabled={actionLoadingId === asset.id || asset.isActiveBroadcast}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                asset.isActiveBroadcast 
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default' 
                                  : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                              }`}
                            >
                              <Play className="w-3 h-3 fill-current" />
                              {asset.isActiveBroadcast ? "Broadcasting Live" : "Broadcast Live Now"}
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* SECTION: Hardware & Compliance */}
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
                Compliance &amp; Ad Fulfillment
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
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">NBC Compliance Log</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">100% Passed</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold">24-hour transmission audio archive compiled and verified for regulatory audit.</p>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Tech Log Modal */}
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
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl flex flex-col max-h-[85vh] relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Server className="w-5 h-5 text-indigo-400" />
                    Comprehensive Engineering Logs
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
