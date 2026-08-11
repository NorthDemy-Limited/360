"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Save, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function StationSettingsPage() {
  const staff = [
    { id: 1, name: "Alhaji Ibrahim Dutse", email: "admin@360radiotv.ng", role: "SUPER ADMIN", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150" },
    { id: 2, name: "Malama Hadiza Gumel", email: "manager@360radiotv.ng", role: "STATION MANAGER", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" },
    { id: 3, name: "Malam Aminu Kazaure", email: "news@360radiotv.ng", role: "NEWS EDITOR", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150" },
    { id: 4, name: "Fatima Garba", email: "programs@360radiotv.ng", role: "PROGRAM OFFICER", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150" },
    { id: 5, name: "Balarabe Hadejia", email: "presenter@360radiotv.ng", role: "PRESENTER", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  ];

  return (
    <div className="space-y-6 relative max-w-5xl min-h-full mx-auto xl:mx-0">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
            MODULE 9: STATION CONFIGURATION
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            Station Settings & System Admin
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Manage station profile, broadcast parameters, social links, and user security permissions.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(51,65,85,0.3)] transition-all flex items-center gap-2 shrink-0 border border-slate-600"
        >
          <Save className="w-4 h-4" />
          Save Station Settings
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Settings Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-slate-100 mb-6 pb-4 border-b border-slate-800/50 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-400" />
              Station Branding & Location
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Station Organization Name <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="360 Radio & Television" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-bold text-slate-100" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Station Motto / Tagline <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="Voice of the Horizon - Broadcasting Peace, Culture & Truth" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" defaultValue="+234 803 360 0000" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Official Email <span className="text-red-500">*</span></label>
                  <input type="email" defaultValue="info@360radiotv.ng" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-6 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Address</label>
                  <input type="text" defaultValue="No. 1 Broad Street, Central Business District" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
                </div>
                <div className="md:col-span-3 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">City</label>
                  <input type="text" defaultValue="Dutse" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
                </div>
                <div className="md:col-span-3 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">State</label>
                  <input type="text" defaultValue="Jigawa State" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-800/50">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Facebook</label>
                  <input type="url" defaultValue="https://facebook.com/360radiotvdutse" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-mono text-slate-400 text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Twitter / X</label>
                  <input type="url" defaultValue="https://twitter.com/360radiotvdutse" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-mono text-slate-400 text-xs" />
                </div>
              </div>
              
              <button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-[0_0_15px_rgba(51,65,85,0.3)] transition-all border border-slate-600">
                Save Configuration
              </button>

            </div>
          </div>
        </motion.div>

        {/* User Roles Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl h-full">
            <h3 className="text-lg font-bold text-slate-100 mb-6 pb-4 border-b border-slate-800/50 flex items-center gap-2">
              <ShieldCheck className="text-emerald-500 w-5 h-5" />
              User Roles & Access Control
            </h3>
            
            <p className="text-xs text-slate-400 font-medium mb-6">
              Station personnel accounts and their permissions:
            </p>

            <div className="space-y-4">
              {staff.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700/50 group">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-700 shadow-sm" />
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 absolute -bottom-1 -right-1 bg-slate-900 rounded-full" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-slate-100 transition-colors">{user.name}</h4>
                      <p className="text-[10px] font-medium text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300 bg-slate-950 px-2 py-1 rounded-md shadow-sm border border-slate-800">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
