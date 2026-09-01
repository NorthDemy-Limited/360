"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Building2, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

export default function StationSettingsPage() {
  const [staff, setStaff] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/staff").then(res => res.json()),
      fetch("/api/settings").then(res => res.json())
    ]).then(([staffData, settingsData]) => {
      setStaff(staffData);
      setSettings(settingsData);
    }).catch(console.error)
    .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

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
          onClick={handleSave}
          disabled={saving}
          className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(51,65,85,0.3)] transition-all flex items-center gap-2 shrink-0 border border-slate-600"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Station Settings"}
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
                <input type="text" name="name" value={settings?.name || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-bold text-slate-100" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Station Motto / Tagline <span className="text-red-500">*</span></label>
                <input type="text" name="motto" value={settings?.motto || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" value={settings?.phone || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Official Email <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={settings?.email || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-6 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Address</label>
                  <input type="text" name="address" value={settings?.address || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
                </div>
                <div className="md:col-span-3 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">City</label>
                  <input type="text" name="city" value={settings?.city || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
                </div>
                <div className="md:col-span-3 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">State</label>
                  <input type="text" name="state" value={settings?.state || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-medium text-slate-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-800/50">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Facebook</label>
                  <input type="url" name="facebookUrl" value={settings?.facebookUrl || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-mono text-slate-400 text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Twitter / X</label>
                  <input type="url" name="twitterUrl" value={settings?.twitterUrl || ''} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:border-slate-500 transition-all font-mono text-slate-400 text-xs" />
                </div>
              </div>
              
              <button onClick={handleSave} disabled={saving} className="w-full bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-[0_0_15px_rgba(51,65,85,0.3)] transition-all border border-slate-600 flex items-center justify-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Configuration"}
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
                      <img src={user.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-700 shadow-sm" />
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
