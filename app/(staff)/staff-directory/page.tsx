"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter } from 'lucide-react';

export default function StaffDirectoryPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-teal-400" />
            Staff Directory
          </h1>
          <p className="text-sm font-medium text-slate-400">Manage station personnel and shift rosters.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="bg-slate-900/50 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-teal-500 w-64 transition-colors"
            />
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm px-4 py-2.5 rounded-xl border border-slate-700 transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800/60 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
        <Users className="w-16 h-16 text-slate-700 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Personnel Database</h3>
        <p className="text-slate-400 text-sm max-w-md">Accessing human resources database. Connect with Dutse Headquarters to sync latest records.</p>
      </div>
    </motion.div>
  );
}
