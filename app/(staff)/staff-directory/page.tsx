"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, Loader2, Shield } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  phone: string | null;
}

export default function StaffDirectoryPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRole, setActiveRole] = useState("All");

  useEffect(() => {
    fetch("/api/staff", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setStaff(data);
      })
      .catch(e => console.warn(e))
      .finally(() => setLoading(false));
  }, []);

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const filtered = staff.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) || person.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRole === "All" || person.role === activeRole;
    return matchesSearch && matchesRole;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12 font-sans"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-teal-400" />
            Station Staff Directory
          </h1>
          <p className="text-sm font-medium text-slate-400">Official broadcast staff roster and contact directory.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search roster..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-slate-900/50 border border-slate-700 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-teal-500 w-full transition-colors font-mono"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-12 border border-slate-800/60 flex flex-col items-center justify-center text-center">
          <Users className="w-12 h-12 text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Staff Found</h3>
          <p className="text-xs text-slate-400">No staff members match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((person) => (
            <div 
              key={person.id}
              className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-3.5 mb-4">
                {person.avatar ? (
                  <img 
                    src={person.avatar} 
                    alt={person.name} 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700" 
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-mono font-bold text-sm shadow-inner">
                    {getInitials(person.name)}
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-bold text-white">{person.name}</h3>
                  <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 mt-1">
                    {person.role.replace("_", " ")}
                  </span>
                </div>
              </div>

              <div className="space-y-1 font-mono text-[11px] text-slate-400 pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{person.email}</span>
                </div>
                {person.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{person.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
