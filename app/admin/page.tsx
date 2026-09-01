"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Radio, 
  Tv, 
  Newspaper, 
  Megaphone, 
  PlayCircle, 
  CalendarPlus, 
  CalendarDays,
  FileText, 
  BellRing,
  ArrowUpRight,
  Clock,
  Activity,
  Loader2,
  ShieldCheck
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

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

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Initializing Terminal...</p>
        </div>
      </div>
    );
  }

  if (data?.error || !data?.metrics) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-red-500/10 p-8 rounded-3xl border border-red-500/20 text-center max-w-md">
          <Activity className="w-12 h-12 text-red-500 mb-2" />
          <h3 className="text-lg font-bold text-red-400">Terminal Connection Error</h3>
          <p className="text-sm text-slate-400 font-medium">Failed to establish a secure connection to the database. If you just updated the database schema, please restart your development server.</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Welcome Hero Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Welcome Block */}
        <div className="lg:col-span-8 bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-slate-800/60 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10">
            <span className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">
              <Activity className="w-3.5 h-3.5" />
              System Status: Optimal
            </span>
            <h2 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Alhaji Dutse</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-xl leading-relaxed mb-8 text-sm">
              Your station terminal is securely connected to Dutse Headquarters. All primary broadcast streams (Radio 98.5 FM and 360 Digital TV) are currently online and performing optimally.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/admin/programs" className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-6 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2 group/btn">
                <CalendarPlus className="w-4 h-4 text-slate-700 group-hover/btn:scale-110 transition-transform" />
                Add Schedule
              </Link>
              <Link href="/admin/newsroom" className="bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-sm px-6 py-3 rounded-full border border-slate-700 transition-all flex items-center gap-2 group/btn">
                <FileText className="w-4 h-4 text-blue-400 group-hover/btn:scale-110 transition-transform" />
                Publish News
              </Link>
              <Link href="/admin/media-storage" className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-bold text-sm px-6 py-3 rounded-full border border-purple-500/30 transition-all flex items-center gap-2 group/btn">
                <ShieldCheck className="w-4 h-4 text-purple-400 group-hover/btn:scale-110 transition-transform" />
                Media Vault &amp; Authorization
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Date/Time Block */}
        <div className="lg:col-span-4 bg-gradient-to-br from-indigo-900/40 to-blue-900/20 backdrop-blur-md rounded-3xl p-8 border border-indigo-500/20 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <Clock className="w-24 h-24 text-indigo-300" />
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-1">Local Time</span>
            <h3 className="text-3xl font-bold text-white tracking-tight font-mono">08:45 AM</h3>
            <p className="text-indigo-200/60 text-sm mt-1">West Africa Time (WAT)</p>
          </div>
          <div className="relative z-10 mt-8">
            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-1">Date</span>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            <p className="text-indigo-200/60 text-sm mt-1">Dutse, Jigawa State</p>
          </div>
        </div>
      </motion.div>

      {/* Metric Cards Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Radio Card */}
        <motion.div whileHover={{ y: -5 }} className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 border border-slate-800/60 shadow-xl relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Radio className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-emerald-400 tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              Live
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">98.5 FM</h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-extrabold text-white">
                {data.metrics.radioListeners >= 1000 ? (data.metrics.radioListeners / 1000).toFixed(1) + 'k' : data.metrics.radioListeners}
              </span>
              <span className="text-xs text-slate-400 mb-1 font-medium">Active Listeners</span>
            </div>
            <Link href="/admin/live-radio" className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-emerald-400 text-xs font-bold transition-all flex items-center justify-center gap-2">
              <PlayCircle className="w-4 h-4" /> Monitor Stream
            </Link>
          </div>
        </motion.div>

        {/* TV Card */}
        <motion.div whileHover={{ y: -5 }} className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 border border-slate-800/60 shadow-xl relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20">
              <Tv className="w-6 h-6 text-red-400" />
            </div>
            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-red-400 tracking-widest bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              Live
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">360 Digital</h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-extrabold text-white">
                {data.metrics.tvViewers >= 1000 ? (data.metrics.tvViewers / 1000).toFixed(1) + 'k' : data.metrics.tvViewers}
              </span>
              <span className="text-xs text-slate-400 mb-1 font-medium">Active Viewers</span>
            </div>
            <Link href="/admin/live-tv" className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-red-400 text-xs font-bold transition-all flex items-center justify-center gap-2">
              <PlayCircle className="w-4 h-4" /> Monitor Stream
            </Link>
          </div>
        </motion.div>

        {/* Newsroom Card */}
        <motion.div whileHover={{ y: -5 }} className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 border border-slate-800/60 shadow-xl relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <Newspaper className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Newsroom</h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-extrabold text-white">{data.metrics.newsCount}</span>
              <span className="text-xs text-slate-400 mb-1 font-medium">Published Today</span>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:border-blue-500">
              View Articles <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Commercials Card */}
        <motion.div whileHover={{ y: -5 }} className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 border border-slate-800/60 shadow-xl relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
              <Megaphone className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Commercial</h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-extrabold text-white">{data.metrics.commercialCount}</span>
              <span className="text-xs text-slate-400 mb-1 font-medium">Active Adverts</span>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-amber-600 group-hover:border-amber-500">
              Manage Campaigns <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </motion.div>

      {/* Complex Tables Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Today's Broadcasts */}
        <div className="xl:col-span-2 bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800/60 shadow-xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <CalendarDays className="w-5 h-5" />
              </span>
              Today's Broadcast Schedule
            </h3>
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              Full Schedule
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {data.programs.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm font-medium">No programs scheduled for today.</div>
            ) : (
              data.programs.map((prog: any) => (
                <div key={prog.id} className="group bg-slate-800/40 hover:bg-slate-800/80 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border shrink-0 mt-0.5 shadow-sm ${
                      prog.type === 'BOTH' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      prog.type === 'RADIO' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {prog.type}
                    </span>
                    <div>
                      <h4 className="font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors">{prog.title}</h4>
                      <p className="text-xs text-slate-400 font-medium">Host: <span className="text-slate-300">{prog.host?.name || 'Unassigned'}</span></p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2.5">
                    <span className="text-sm font-bold text-slate-300 font-mono tracking-tight">
                      {new Date(prog.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(prog.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm ${
                      prog.isLive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-700/50 text-slate-400 border-slate-600'
                    }`}>
                      {prog.isLive ? 'On Air' : 'Scheduled'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Notices */}
        <div className="xl:col-span-1 bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800/60 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800 shrink-0">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <span className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                <BellRing className="w-5 h-5" />
              </span>
              Internal Notices
            </h3>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
            {data.notices.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm font-medium">No active notices.</div>
            ) : (
              data.notices.map((notice: any) => (
                <div key={notice.id} className={`rounded-2xl p-5 border transition-all ${
                  notice.urgency === 'Critical' || notice.urgency === 'High' 
                    ? 'bg-amber-500/5 border-amber-500/20' 
                    : 'bg-slate-800/40 border-slate-800'
                }`}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h4 className={`text-sm font-bold leading-snug ${notice.urgency === 'Critical' || notice.urgency === 'High' ? 'text-amber-400' : 'text-slate-200'}`}>
                      {notice.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2">
                    {notice.body}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-[10px] text-slate-500 font-medium">
                      By {notice.author?.name || 'System Admin'}
                    </p>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{new Date(notice.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <button className="w-full mt-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2">
            View All Notices <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </motion.div>

    </motion.div>
  );
}
