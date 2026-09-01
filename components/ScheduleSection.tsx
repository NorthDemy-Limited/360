"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Tv, Clock, ArrowRight, Activity } from "lucide-react";

interface ScheduleItem {
  id: string;
  title: string;
  type: "RADIO" | "TV" | "BOTH" | string;
  startTime: string;
  endTime: string;
  isLive: boolean;
  host: { name: string; avatar: string | null };
}

export default function ScheduleSection() {
  const [activeTab, setActiveTab] = useState<"RADIO" | "TV">("RADIO");
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadSchedule = async () => {
      try {
        const res = await fetch('/api/schedule', { cache: 'no-store' });
        if (!res.ok) throw new Error("Failed to load schedule");
        const data = await res.json();
        
        if (!isMounted) return;

        if (Array.isArray(data)) {
          const now = new Date();
          const updatedSchedule = data.map((item: any) => {
            const start = new Date(item.startTime);
            const end = new Date(item.endTime);
            let isLive = false;
            if (now >= start && now <= end) {
              isLive = true;
            }
            return { ...item, isLive, start, end };
          });
          
          const futureOrLive = updatedSchedule.filter((item: any) => now <= item.end);
          setSchedule(futureOrLive);
        }
      } catch (err) {
        console.warn("Schedule load notice:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadSchedule();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSchedule = schedule.filter(item => item.type === activeTab || item.type === 'BOTH');

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Dynamic Background based on tab */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 blur-[120px] pointer-events-none transition-colors duration-1000 ${activeTab === 'RADIO' ? 'bg-blue-600/10' : 'bg-red-600/10'}`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className={`w-10 h-1 rounded-full transition-colors ${activeTab === 'RADIO' ? 'bg-blue-500' : 'bg-red-500'}`}></span>
              <span className={`font-bold text-xs tracking-widest uppercase flex items-center gap-2 transition-colors ${activeTab === 'RADIO' ? 'text-blue-400' : 'text-red-400'}`}>
                <Activity className="w-4 h-4" /> Broadcast Schedule
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Today's Featured <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">Programs</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto"
          >
            {/* Custom Interactive Tabs */}
            <div className="flex items-center bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("RADIO")}
                className={`relative flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold rounded-xl transition-colors z-10 flex items-center justify-center gap-2 ${
                  activeTab === "RADIO" ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {activeTab === "RADIO" && (
                  <motion.div
                    layoutId="scheduleTab"
                    className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Radio className="w-4 h-4" />
                Radio 98.5
              </button>
              <button
                onClick={() => setActiveTab("TV")}
                className={`relative flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold rounded-xl transition-colors z-10 flex items-center justify-center gap-2 ${
                  activeTab === "TV" ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {activeTab === "TV" && (
                  <motion.div
                    layoutId="scheduleTab"
                    className="absolute inset-0 bg-red-600 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Tv className="w-4 h-4" />
                360 TV
              </button>
            </div>

            <Link href="/schedule" className="group hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 text-white font-bold px-6 py-3.5 rounded-2xl hover:bg-white/10 transition-all text-sm backdrop-blur-sm">
              View Full Week
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSchedule.map((item, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={item.id} 
                className={`group relative border rounded-3xl p-8 transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1 ${
                  item.type === 'RADIO' 
                  ? 'border-blue-900/30 hover:border-blue-500/50 hover:shadow-[0_15px_40px_-15px_rgba(37,99,235,0.3)] bg-slate-900/50' 
                  : 'border-red-900/30 hover:border-red-500/50 hover:shadow-[0_15px_40px_-15px_rgba(220,38,38,0.3)] bg-slate-900/50'
                }`}
              >
                {/* Background Image Overlay on Hover */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
                  <img 
                    src={`https://images.unsplash.com/photo-${item.type === 'RADIO' ? '1598488035139-bdbb2231ce04' : '1588681664899-f142ff2dc9b1'}?q=80&w=800`} 
                    alt="" 
                    className="w-full h-full object-cover mix-blend-luminosity" 
                  />
                </div>
                
                <div className="relative z-10 flex justify-between items-start mb-10">
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                      item.type === 'RADIO' 
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-sm font-bold text-slate-300 flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 backdrop-blur-md">
                      <Clock className={`w-4 h-4 ${item.type === 'RADIO' ? 'text-blue-500' : 'text-red-500'}`} />
                      {new Date(item.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(item.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  {item.isLive ? (
                    <span className={`text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-widest ${
                      item.type === 'RADIO'
                      ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                      : 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                    }`}>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_5px_rgba(255,255,255,1)]"></span>
                      ON AIR NOW
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-3 py-1.5 bg-white/5 text-slate-400 border border-white/10 rounded-full uppercase tracking-wider">
                      Upcoming
                    </span>
                  )}
                </div>
                
                <div className="relative z-10">
                  <h3 className={`text-2xl font-black text-white mb-2 transition-colors ${item.type === 'RADIO' ? 'group-hover:text-blue-400' : 'group-hover:text-red-400'}`}>
                    {item.title}
                  </h3>
                  <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
                    <span className="text-slate-500 uppercase text-xs tracking-wider font-bold">Host</span> 
                    {item.host?.name || "TBA"}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-10 lg:hidden flex justify-center">
          <Link href="/schedule" className="group flex items-center justify-center w-full gap-2 bg-white/5 border border-white/10 text-white font-bold px-6 py-4 rounded-2xl hover:bg-white/10 transition-all text-sm">
            View Full Week
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
