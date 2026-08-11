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
  Tv, 
  FolderOpen, 
  Megaphone, 
  Users, 
  Bell, 
  Settings,
  ChevronRight,
  LogOut,
  Globe
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Program Management", href: "/admin/programs", icon: CalendarDays },
    { name: "Newsroom CMS", href: "/admin/newsroom", icon: Newspaper },
    { name: "Live Radio Control", href: "/admin/live-radio", icon: Radio },
    { name: "Live TV Control", href: "/admin/live-tv", icon: Tv },
    { name: "Media Storage", href: "/admin/media-storage", icon: FolderOpen },
    { name: "Advertisement Board", href: "/admin/advertisements", icon: Megaphone },
    { name: "Staff Directory", href: "/admin/staff-directory", icon: Users },
    { name: "Internal Notices", href: "/admin/internal-notices", icon: Bell },
    { name: "Station Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="h-screen w-full bg-[#020817] flex font-sans overflow-hidden text-slate-300 selection:bg-blue-500/30">
      
      {/* Sidebar (Elevated & Futuristic) */}
      <motion.aside 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-[280px] bg-[#09090b]/80 backdrop-blur-2xl border-r border-slate-800 flex flex-col justify-between shrink-0 relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]"
      >
        <div className="overflow-y-auto flex-1 admin-sidebar-scrollbar pl-2 pr-2">
          {/* Station Brand Header */}
          <div className="p-6 sticky top-0 bg-[#09090b]/90 backdrop-blur-md border-b border-slate-800/50 z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-md opacity-40 animate-pulse"></div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-xs px-2.5 py-1.5 rounded-md flex items-center justify-center tracking-wider relative z-10 border border-white/10">
                  360
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-sm leading-tight tracking-wide text-white">360 RADIO & TV</h1>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">Dutse Portal</p>
              </div>
            </div>
            
            {/* Live Status Indicators */}
            <div className="flex flex-col gap-2 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Radio 98.5 FM</span>
                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                  Live
                </span>
              </div>
              <div className="w-full h-px bg-slate-800"></div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">360 Digital TV</span>
                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Modules */}
          <div className="p-4 py-6">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4 mb-4 block">
              Control Modules
            </span>
            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setIsHovered(link.name)}
                    onMouseLeave={() => setIsHovered(null)}
                    className="relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all group overflow-hidden"
                  >
                    {/* Active/Hover Background */}
                    <AnimatePresence>
                      {(isActive || isHovered === link.name) && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 bg-slate-800/60 rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-3 relative z-10">
                      <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'}`} strokeWidth={2.5} />
                      <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                        {link.name}
                      </span>
                    </div>

                    {isActive && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 rounded-full bg-blue-500 relative z-10 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Super Admin Feature Component */}
        <div className="p-4 border-t border-slate-800/80 bg-[#09090b]">
          <Link href="/" className="w-full mb-4 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700/50 hover:border-slate-600">
            <Globe className="w-3.5 h-3.5" />
            View Public Website
          </Link>
          
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-all overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150" 
                    alt="Admin" 
                    className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white leading-tight">Alhaji Dutse</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border border-blue-500/20">
                      SUPER ADMIN
                    </span>
                  </div>
                </div>
              </div>
              <LogOut className="w-4 h-4 text-slate-500 group-hover:text-red-400 transition-colors relative z-10" />
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-[#020817]">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

        <div className="p-6 lg:p-10 relative z-10 min-h-full">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
