"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  LogOutIcon,
  KeyRound,
  X,
  Check,
  Loader2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [currentUser, setCurrentUser] = useState<{
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    avatar?: string | null;
    phone?: string | null;
    mustChangePassword?: boolean;
  } | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    name: '',
    phone: '',
    avatar: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Determine current role based on URL or session
  const [currentRole, setCurrentRole] = useState(() => {
    if (pathname?.includes('/news-editor')) return 'news_editor';
    if (pathname?.includes('/program-officer')) return 'program_officer';
    if (pathname?.includes('/presenter')) return 'presenter';
    if (pathname?.includes('/station-manager')) return 'station_manager';
    
    if (typeof window !== 'undefined') {
      const storedRole = sessionStorage.getItem('currentStaffRole');
      if (storedRole) return storedRole;
    }
    return 'station_manager';
  });

  useEffect(() => {
    let newRole = currentRole;
    if (pathname?.includes('/news-editor')) newRole = 'news_editor';
    else if (pathname?.includes('/program-officer')) newRole = 'program_officer';
    else if (pathname?.includes('/presenter')) newRole = 'presenter';
    else if (pathname?.includes('/station-manager')) newRole = 'station_manager';
    
    if (newRole !== currentRole) {
      setCurrentRole(newRole);
    }
    sessionStorage.setItem('currentStaffRole', newRole);

    // Load active staff user info
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('currentStaffUser');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCurrentUser(parsed);
          setProfileFormData({
            name: parsed.name || '',
            phone: parsed.phone || '',
            avatar: parsed.avatar || '',
            newPassword: '',
            confirmPassword: ''
          });
        } catch {
          // ignore error
        }
      }
    }
  }, [pathname, currentRole]);

  const defaultRoleDetails = {
    station_manager: { name: "Malama Hadiza Gumel", title: "STATION MANAGER", badge: "bg-slate-100/10 text-slate-100 border-slate-500/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]" },
    news_editor: { name: "Malam Aminu Kazaure", title: "NEWS EDITOR", badge: "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]" },
    program_officer: { name: "Fatima Garba", title: "PROGRAM OFFICER", badge: "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]" },
    presenter: { name: "Balarabe Hadejia", title: "ON-AIR PRESENTER", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]" }
  };

  const displayName = currentUser?.name || defaultRoleDetails[currentRole as keyof typeof defaultRoleDetails]?.name || "Staff Member";
  const displayTitle = defaultRoleDetails[currentRole as keyof typeof defaultRoleDetails]?.title || "BROADCAST STAFF";
  const displayBadge = defaultRoleDetails[currentRole as keyof typeof defaultRoleDetails]?.badge || "bg-slate-800 text-slate-300 border-slate-700";

  const allLinks = [
    { name: "Manager Dashboard", href: "/station-manager", icon: LayoutDashboard, roles: ['station_manager'] },
    { name: "Editorial Desk", href: "/news-editor", icon: Newspaper, roles: ['news_editor'] },
    { name: "Scheduler Grid", href: "/program-officer", icon: CalendarDays, roles: ['program_officer'] },
    { name: "Live Studio Panel", href: "/presenter", icon: Radio, roles: ['presenter'] },
    { name: "Broadcast Media", href: "/media-storage", icon: FolderOpen, roles: ['station_manager', 'program_officer'] },
    { name: "Commercial Ads", href: "/commercial-ads", icon: Megaphone, roles: ['station_manager'] },
    { name: "Staff Directory", href: "/admin/staff-directory", icon: Users, roles: ['station_manager'] },
    { name: "Internal Notices", href: "/internal-notices", icon: Bell, roles: ['station_manager', 'news_editor', 'program_officer', 'presenter'] },
  ];

  const visibleLinks = allLinks.filter(link => link.roles.includes(currentRole));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.id) {
      setProfileMessage({ text: "Demo profile saved locally in session.", type: "success" });
      setTimeout(() => setIsProfileModalOpen(false), 1500);
      return;
    }

    if (profileFormData.newPassword && profileFormData.newPassword !== profileFormData.confirmPassword) {
      setProfileMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    setIsSavingProfile(true);
    setProfileMessage(null);

    try {
      const res = await fetch(`/api/staff/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileFormData.name.trim(),
          phone: profileFormData.phone.trim() || null,
          avatar: profileFormData.avatar.trim() || null,
          password: profileFormData.newPassword.trim() ? profileFormData.newPassword.trim() : undefined,
          mustChangePassword: false
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setCurrentUser(updated);
        sessionStorage.setItem('currentStaffUser', JSON.stringify(updated));
        setProfileMessage({ text: "Profile and security passkey updated successfully!", type: "success" });
        setTimeout(() => {
          setIsProfileModalOpen(false);
          setProfileMessage(null);
        }, 1200);
      } else {
        setProfileMessage({ text: "Failed to update profile.", type: "error" });
      }
    } catch {
      setProfileMessage({ text: "Network error saving profile.", type: "error" });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // PRESENTER STUDIO OVERRIDE
  if (currentRole === 'presenter') {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col font-sans overflow-hidden text-slate-300 selection:bg-emerald-500/30 relative">
        <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="group flex items-center gap-2 bg-[#0a0a0a]/80 backdrop-blur-md border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white px-3.5 py-2 rounded-full text-xs font-mono"
          >
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            <span>Profile &amp; Passkey</span>
          </button>

          <button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('currentStaffUser');
                sessionStorage.removeItem('currentStaffRole');
              }
              router.push('/login');
            }}
            className="group flex items-center gap-3 bg-[#0a0a0a]/80 backdrop-blur-md border border-slate-800 hover:border-red-500/50 hover:bg-red-950/40 text-slate-400 hover:text-red-400 px-4 py-2.5 rounded-full transition-all duration-300 shadow-2xl"
          >
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 w-0 group-hover:w-auto group-hover:opacity-100 transition-all overflow-hidden whitespace-nowrap">Sign Out</span>
            <LogOutIcon className="w-4 h-4 shrink-0" />
          </button>
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
      
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-[280px] bg-[#020617]/60 backdrop-blur-3xl border-r border-slate-800/50 flex flex-col justify-between shrink-0 relative z-30 shadow-[4px_0_40px_rgba(0,0,0,0.6)]"
      >
        <div className="overflow-y-auto flex-1 admin-sidebar-scrollbar px-3">
          
          {/* Station Brand Header */}
          <div className="p-3 sticky top-0 bg-[#020617]/95 backdrop-blur-xl z-20 pt-6 pb-4 border-b border-slate-800/50">
            <Link href="/" className="flex items-center gap-4 mb-6 px-1 group cursor-pointer">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-slate-700/60 bg-slate-900 shrink-0">
                <img 
                  src="/icons/360.jpeg" 
                  alt="360 Radio & TV" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="font-extrabold text-sm leading-tight tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">360 RADIO &amp; TV</h1>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-0.5">Dutse Terminal</p>
              </div>
            </Link>
            
            {/* User Profile Card */}
            <div 
              onClick={() => setIsProfileModalOpen(true)}
              className="bg-gradient-to-b from-slate-800/40 to-slate-900/60 rounded-2xl p-4 border border-slate-700/50 hover:border-blue-500/50 transition-all shadow-lg relative overflow-hidden group cursor-pointer"
              title="Click to manage profile and update password"
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative shrink-0">
                  {currentUser?.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={displayName} 
                      className="w-11 h-11 rounded-full object-cover border border-slate-600 shadow-inner"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-mono font-bold text-xs shadow-inner">
                      {getInitials(displayName)}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-extrabold text-white leading-tight mb-1 truncate">{displayName}</h3>
                  <span className={`inline-block text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${displayBadge}`}>
                    {displayTitle}
                  </span>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] font-mono text-slate-400 group-hover:text-blue-400 transition-colors">
                <span>Passkey &amp; Profile</span>
                <span>Edit →</span>
              </div>
            </div>

          </div>

          {/* Navigation Links */}
          <div className="py-6">
            <div className="px-3 mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Workspace</span>
            </div>
            
            <nav className="space-y-1.5">
              {visibleLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-300 relative group overflow-hidden ${
                      isActive 
                        ? 'bg-slate-800/90 text-white shadow-lg border border-slate-700/80' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 relative z-10">
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
        
        {/* Top Control Bar */}
        <header className="h-[72px] border-b border-slate-800/40 bg-[#020617]/40 backdrop-blur-2xl px-8 flex items-center justify-between shrink-0 relative z-40">
          
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-[0.2em] uppercase">
              {displayTitle} TERMINAL
            </h2>

            {currentUser?.mustChangePassword && (
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="hidden lg:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono px-3 py-1 rounded-full animate-pulse"
              >
                <AlertCircle className="w-3 h-3" />
                First-time login: Click to set permanent passkey
              </button>
            )}
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
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('currentStaffUser');
                    sessionStorage.removeItem('currentStaffRole');
                  }
                  router.push('/login');
                }}
                className="text-slate-400 hover:text-red-400 transition-all p-2 bg-slate-800/30 hover:bg-red-500/10 rounded-xl border border-slate-700/50 hover:border-red-500/30"
                title="Logout of Staff Console"
              >
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

      {/* Staff Profile & Password Update Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    Staff Account &amp; Passkey Settings
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Update personal info and set permanent password.</p>
                </div>
                <button onClick={() => setIsProfileModalOpen(false)} className="text-slate-500 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {profileMessage && (
                <div className={`mb-4 p-3 rounded-xl text-xs font-mono ${profileMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'}`}>
                  {profileMessage.text}
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileFormData.name}
                    onChange={e => setProfileFormData({ ...profileFormData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileFormData.phone}
                    onChange={e => setProfileFormData({ ...profileFormData, phone: e.target.value })}
                    placeholder="+234 803 000 0000"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">
                    Avatar Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={profileFormData.avatar}
                    onChange={e => setProfileFormData({ ...profileFormData, avatar: e.target.value })}
                    placeholder="Leave blank for clean monogram"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="block text-[10px] font-mono uppercase text-blue-400 font-bold tracking-wider mb-2">
                    Update Security Password
                  </span>
                  <div className="space-y-2">
                    <input
                      type="password"
                      value={profileFormData.newPassword}
                      onChange={e => setProfileFormData({ ...profileFormData, newPassword: e.target.value })}
                      placeholder="New Secret Password"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                    />
                    {profileFormData.newPassword && (
                      <input
                        type="password"
                        value={profileFormData.confirmPassword}
                        onChange={e => setProfileFormData({ ...profileFormData, confirmPassword: e.target.value })}
                        placeholder="Confirm New Password"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                  >
                    {isSavingProfile ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    Save Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
