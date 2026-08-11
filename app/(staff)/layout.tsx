"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Newspaper, 
  Radio, 
  FolderOpen, 
  Megaphone, 
  Users, 
  Bell, 
  LogOut,
  Globe,
  UserCircle,
  ActivitySquare,
  LogOutIcon
} from 'lucide-react';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  
  // Determine current role based on URL, or fallback to the last known role for shared routes
  const [currentRole, setCurrentRole] = useState(() => {
    if (pathname?.includes('/news-editor')) return 'news_editor';
    if (pathname?.includes('/program-officer')) return 'program_officer';
    if (pathname?.includes('/presenter')) return 'presenter';
    return 'station_manager'; // Default
  });

  React.useEffect(() => {
    if (pathname?.includes('/news-editor')) setCurrentRole('news_editor');
    else if (pathname?.includes('/program-officer')) setCurrentRole('program_officer');
    else if (pathname?.includes('/presenter')) setCurrentRole('presenter');
    else if (pathname?.includes('/station-manager')) setCurrentRole('station_manager');
  }, [pathname]);

  const roleDetails = {
    station_manager: { name: "Malama Hadiza Gumel", title: "STATION MANAGER", badge: "bg-slate-100/10 text-slate-100 border-slate-500/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]" },
    news_editor: { name: "Malam Aminu Kazaure", title: "NEWS EDITOR", badge: "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]" },
    program_officer: { name: "Fatima Garba", title: "PROGRAM OFFICER", badge: "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]" },
    presenter: { name: "Balarabe Hadejia", title: "ON-AIR PRESENTER", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]" }
  };

  const allLinks = [
    { name: "Manager Dashboard", href: "/station-manager", icon: LayoutDashboard, roles: ['station_manager'] },
    { name: "Editorial Desk", href: "/news-editor", icon: Newspaper, roles: ['news_editor'] },
    { name: "Scheduler Grid", href: "/program-officer", icon: CalendarDays, roles: ['program_officer'] },
    { name: "Live Studio Panel", href: "/presenter", icon: Radio, roles: ['presenter'] },
    { name: "Broadcast Media", href: "/media-storage", icon: FolderOpen, roles: ['station_manager', 'program_officer'] },
    { name: "Commercial Ads", href: "/commercial-ads", icon: Megaphone, roles: ['station_manager'] },
    { name: "Staff Directory", href: "/staff-directory", icon: Users, roles: ['station_manager'] },
    { name: "Internal Notices", href: "/internal-notices", icon: Bell, roles: ['station_manager', 'news_editor', 'program_officer', 'presenter'] },
  ];

  const visibleLinks = allLinks.filter(link => link.roles.includes(currentRole));

  // PRESENTER STUDIO OVERRIDE
  if (currentRole === 'presenter') {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col font-sans overflow-hidden text-slate-300 selection:bg-emerald-500/30 relative">
        {/* Premium Exit Button for Studio */}
        <div className="absolute top-6 right-6 z-50">
          <Link 
            href="/"
            className="group flex items-center gap-3 bg-[#0a0a0a]/80 backdrop-blur-md border border-slate-800 hover:border-red-500/50 hover:bg-red-950/40 text-slate-400 hover:text-red-400 px-4 py-2.5 rounded-full transition-all duration-300 shadow-2xl"
          >
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 w-0 group-hover:w-auto group-hover:opacity-100 transition-all overflow-hidden whitespace-nowrap">Sign Out</span>
            <LogOutIcon className="w-4 h-4 shrink-0" />
          </Link>
        </div>
        {children}
      </div>
    );
  }

  // STANDARD STAFF LAYOUT
  return (
    <div className="h-screen w-full bg-[#030712] flex font-sans overflow-hidden text-slate-300 selection:bg-indigo-500/30 relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      
      {/* Sidebar (Slate Studio UI) */}
      <motion.aside 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-[280px] bg-[#020617]/60 backdrop-blur-3xl border-r border-slate-800/50 flex flex-col justify-between shrink-0 relative z-30 shadow-[4px_0_40px_rgba(0,0,0,0.6)]"
      >
        <div className="overflow-y-auto flex-1 admin-sidebar-scrollbar px-3">
          
          {/* Station Brand Header */}
          <div className="p-3 sticky top-0 bg-[#020617]/95 backdrop-blur-xl z-20 pt-6 pb-4 border-b border-slate-800/50">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 mb-6 px-1 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-black text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-center tracking-wider relative z-10 border border-white/20 shadow-[inset_0_1px_rgba(255,255,255,0.2)]">
                  360
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-sm leading-tight tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">360 RADIO & TV</h1>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Dutse Terminal</p>
              </div>
            </motion.div>
            
            {/* User Profile Card (Elevated) */}
            <div className="bg-gradient-to-b from-slate-800/40 to-slate-900/60 rounded-2xl p-4 border border-slate-700/50 shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-slate-600 overflow-hidden shadow-inner">
                    <UserCircle className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-white leading-tight mb-1">{roleDetails[currentRole as keyof typeof roleDetails].name}</h3>
                  <span className={`inline-block text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${roleDetails[currentRole as keyof typeof roleDetails].badge}`}>
                    {roleDetails[currentRole as keyof typeof roleDetails].title}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Modules */}
          <div className="py-6 px-1">
            <span className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-3 mb-4">
              <ActivitySquare className="w-3.5 h-3.5" /> Workspace Modules
            </span>
            <nav className="space-y-1.5">
              {visibleLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href) && link.href !== '/admin';
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setIsHovered(link.name)}
                    onMouseLeave={() => setIsHovered(null)}
                    className="relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all group overflow-hidden"
                  >
                    <AnimatePresence>
                      {(isActive || isHovered === link.name) && (
                        <motion.div
                          layoutId="sidebar-active-staff"
                          className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-slate-800/20 rounded-xl border border-slate-700/50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-3 relative z-10">
                      <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-300'}`} strokeWidth={2.5} />
                      <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                        {link.name}
                      </span>
                    </div>

                    {isActive && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-1.5 h-1.5 rounded-full bg-indigo-400 relative z-10 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent relative overflow-hidden z-20">
        
        {/* Top Control Bar (Glassmorphic) */}
        <header className="h-[72px] border-b border-slate-800/40 bg-[#020617]/40 backdrop-blur-2xl px-8 flex items-center justify-between shrink-0 relative z-40">
          
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-[0.2em] uppercase">
              {roleDetails[currentRole as keyof typeof roleDetails].title} TERMINAL
            </h2>
          </div>

          <div className="flex items-center gap-6">
            
            {/* Live Encoders Status */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 px-4 py-1.5 rounded-full">
                <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,1)] animate-pulse"></span>
                  98.5 FM LIVE
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 px-4 py-1.5 rounded-full">
                <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] animate-pulse"></span>
                  360 TV LIVE
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-800/60 rounded-full"></div>

            <div className="flex items-center gap-3">
              <Link href="/" className="text-slate-400 hover:text-white transition-all p-2 bg-slate-800/30 hover:bg-slate-800/60 rounded-xl border border-slate-700/50 hover:border-slate-600">
                <Globe className="w-4 h-4" />
              </Link>
              <button className="text-slate-400 hover:text-red-400 transition-all p-2 bg-slate-800/30 hover:bg-red-500/10 rounded-xl border border-slate-700/50 hover:border-red-500/30">
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </header>

        {/* Dashboard Worksurface */}
        <div className="flex-1 overflow-y-auto admin-sidebar-scrollbar relative z-10 scroll-smooth">
          <div className="p-8 lg:p-12 min-h-full">
            <div className="max-w-[1600px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
