"use client";

import React, { useState } from 'react';

export default function SchedulePage() {
  const [activeNetwork, setActiveNetwork] = useState("All");
  const [activeDay, setActiveDay] = useState("Saturday");

  const networks = [
    { id: "All", label: "All Broadcasts" },
    { id: "Radio", label: "Radio 98.5 FM" },
    { id: "TV", label: "360 TV Channel" }
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const allPrograms = [
    {
      id: 1,
      network: "BOTH", 
      category: "News & Current Affairs",
      time: "06:00 - 09:00",
      title: "Barke Da Sallah & Morning Pulse",
      description: "The flagship morning news and current affairs show covering Dutse municipality, Jigawa state policies, and national affairs.",
      host: "Balarabe Hadejia & Hadiza Gumel",
      producer: "Malam Aminu Kazaure",
      status: "On Air"
    },
    {
      id: 2,
      network: "RADIO",
      category: "Business & Economy",
      time: "10:00 - 11:30",
      title: "Jigawa Business & Agriculture Today",
      description: "In-depth focus on wheat farming, sesame trade, and small business empowerment across Dutse and Hadejia emirates.",
      host: "Fatima Garba",
      producer: "Kabiru Ringim",
      status: "Scheduled"
    },
    {
      id: 3,
      network: "BOTH",
      category: "Culture & Heritage",
      time: "12:00 - 14:00",
      title: "Arewa Heritage & Cultural Beats",
      description: "Celebrating Hausa music, traditional poetry (Wa'azi & Waka), oral histories, and cultural festivals in Jigawa State.",
      host: "Balarabe Hadejia",
      producer: "Usman Dutse",
      status: "Scheduled"
    },
    {
      id: 4,
      network: "RADIO",
      category: "Education & Youth",
      time: "15:00 - 16:30",
      title: "Youth Voice & Innovation Hour",
      description: "Interactive call-in show highlighting tech startups, Federal University Dutse research, and youth entrepreneurship.",
      host: "Zainab Suleiman",
      producer: "Fatima Garba",
      status: "Scheduled"
    },
    {
      id: 5,
      network: "TV",
      category: "News & Current Affairs",
      time: "19:00 - 20:00",
      title: "360 TV Evening News Bulletin (Hausa & English)",
      description: "Comprehensive evening news report live from the 360 TV Main Studio in Dutse.",
      host: "Malam Aminu Kazaure",
      producer: "Alhaji Ibrahim Dutse",
      status: "Scheduled"
    },
    {
      id: 6,
      network: "RADIO",
      category: "Sports",
      time: "20:30 - 22:00",
      title: "Jigawa Sports Round-up",
      description: "Highlights from Jigawa Golden Stars FC, local grassroots tournaments, and international football news.",
      host: "Mustapha Babura",
      producer: "Kabiru Ringim",
      status: "Scheduled"
    }
  ];

  const filteredPrograms = allPrograms.filter(prog => {
    if (activeNetwork === "All") return true;
    if (activeNetwork === "Radio") return prog.network === "RADIO" || prog.network === "BOTH";
    if (activeNetwork === "TV") return prog.network === "TV" || prog.network === "BOTH";
    return true;
  });

  return (
    <div className="bg-[#050a15] min-h-screen pt-32 sm:pt-36 pb-16 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-staggered {
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 animate-staggered" style={{ animationDelay: '0s' }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 tracking-widest uppercase mb-4">
            BROADCAST SCHEDULE
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
            Radio &amp; TV Program Guide
          </h1>
          <p className="text-slate-400 font-medium max-w-xl mx-auto text-sm md:text-base">
            Explore complete broadcast timetables for 360 Radio 98.5 FM and 360 TV Digital.
          </p>
        </div>

        {/* Sticky Glassmorphic Filter Controls */}
        <div className="sticky top-28 sm:top-32 z-40 bg-[#0f172a]/70 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] p-4 md:p-6 mb-12 flex flex-col items-center animate-staggered" style={{ animationDelay: '0.1s' }}>
          
          {/* Network Toggle */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {networks.map(net => (
              <button
                key={net.id}
                onClick={() => setActiveNetwork(net.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  activeNetwork === net.id
                    ? (net.id === 'TV' ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' : net.id === 'Radio' ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]')
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {net.id === 'Radio' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                )}
                {net.id === 'TV' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
                )}
                {net.label}
              </button>
            ))}
          </div>

          {/* Days Toggle */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 w-full bg-black/20 p-2 rounded-2xl">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`text-xs md:text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeDay === day
                    ? 'bg-white/10 text-white shadow-sm border border-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

        </div>

        {/* Schedule List */}
        <div className="space-y-5">
          {filteredPrograms.map((prog, index) => (
            <div 
              key={`${prog.id}-${activeNetwork}`} 
              className={`bg-[#0f172a] rounded-2xl border border-white/5 p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden group animate-staggered ${
                prog.network === 'BOTH' ? 'hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.3)]' :
                prog.network === 'RADIO' ? 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]' :
                'hover:border-red-500/50 hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.3)]'
              }`}
              style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
            >
              
              {/* Program Details */}
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${
                    prog.network === 'BOTH' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    prog.network === 'RADIO' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {prog.network}
                  </span>
                  
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {prog.category}
                  </span>
                </div>

                <h3 className={`text-xl md:text-2xl font-extrabold text-white mb-3 transition-colors duration-300 ${
                  prog.network === 'BOTH' ? 'group-hover:text-blue-400' :
                  prog.network === 'RADIO' ? 'group-hover:text-emerald-400' :
                  'group-hover:text-red-400'
                }`}>
                  {prog.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-2xl">
                  {prog.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 bg-white/5 inline-flex p-3 rounded-xl border border-white/5">
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <strong className="text-slate-300">Host:</strong> {prog.host}
                  </span>
                  <span className="hidden md:block text-slate-600">•</span>
                  <span className="flex items-center gap-2">
                    <strong className="text-slate-300">Producer:</strong> {prog.producer}
                  </span>
                </div>
              </div>

              {/* Time and Status Area */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:w-36 shrink-0 border-t md:border-t-0 border-white/10 pt-6 md:pt-0 relative z-10">
                <div className="flex items-center gap-2 text-base font-extrabold text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {prog.time}
                </div>
                
                {prog.status === 'On Air' ? (
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]"></span>
                    On Air
                  </span>
                ) : (
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold bg-white/5 text-slate-400 border border-white/10 uppercase tracking-widest">
                    Scheduled
                  </span>
                )}

                {/* Hover Reveal Button */}
                <button className={`mt-auto w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${
                  prog.network === 'BOTH' ? 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]' :
                  prog.network === 'RADIO' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' :
                  'bg-red-600 hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                }`}>
                  {prog.status === 'On Air' ? 'Listen Now' : 'Set Reminder'}
                </button>
              </div>

              {/* Background Accent Gradient on Hover */}
              <div className={`absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-current to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none ${
                prog.network === 'BOTH' ? 'text-blue-500' :
                prog.network === 'RADIO' ? 'text-emerald-500' :
                'text-red-500'
              }`}></div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
