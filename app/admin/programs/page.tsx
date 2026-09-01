"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, CalendarClock, Edit2, Trash2, X, Radio, Tv, MonitorPlay, Loader2 } from 'lucide-react';

export default function ProgramManagementPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    medium: "RADIO",
    category: "News & Current Affairs",
    time: "08:00 - 09:00",
    presenter: "",
    producer: "",
    status: "Scheduled"
  });

  const tabs = [
    "All", "News & Current Affairs", "Culture & Heritage", "Entertainment & Music", "Education & Youth", "Religion & Ethics", "Business & Economy", "Sports"
  ];

  const fetchPrograms = async () => {
    try {
      const res = await fetch("/api/schedule");
      if (res.ok) {
        const data = await res.json();
        setPrograms(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleCreate = async () => {
    if (!formData.name) return;
    try {
      // Build date objects for today with the given time
      const today = new Date();
      const [startHours, startMinutes] = formData.time.split(' - ')[0].split(':');
      const [endHours, endMinutes] = formData.time.split(' - ')[1].split(':');
      
      const startDateTime = new Date(today);
      startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
      
      const endDateTime = new Date(today);
      endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.name,
          type: formData.medium,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          hostId: "cm0w3xxxb0000abc123456789" // Dummy host id for admin page if no user selected
        })
      });
      if (res.ok) {
        setIsCreateModalOpen(false);
        setFormData({
          name: "", desc: "", medium: "RADIO", category: "News & Current Affairs",
          time: "08:00 - 09:00", presenter: "", producer: "", status: "Scheduled"
        });
        fetchPrograms();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPrograms = programs.filter(prog => {
    const matchesSearch = prog.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || prog.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 relative min-h-full">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-2">
            MODULE 1: BROADCAST SCHEDULES
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            Program Management
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Manage daily timetables, presenter rosters, and broadcast statuses for Radio & TV across the 360 Media network.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Program
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-800 shadow-xl flex flex-col xl:flex-row gap-4 items-start xl:items-center"
      >
        <div className="relative w-full xl:w-80 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search program or host..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)] border border-blue-500' 
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Data Table */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Program Name</th>
                  <th className="px-6 py-4">Medium</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Presenter / Producer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredPrograms.map((prog) => (
                  <tr key={prog.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <h4 className="text-sm font-bold text-slate-200 mb-1">{prog.name}</h4>
                      <p className="text-xs text-slate-500 font-medium truncate max-w-xs">{prog.desc}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border flex items-center w-fit gap-1.5 ${
                        prog.medium === 'BOTH' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        prog.medium === 'RADIO' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}>
                        {prog.medium === 'BOTH' && <MonitorPlay className="w-3 h-3" />}
                        {prog.medium === 'RADIO' && <Radio className="w-3 h-3" />}
                        {prog.medium === 'TV' && <Tv className="w-3 h-3" />}
                        {prog.medium}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-400">
                      {prog.category}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                        <CalendarClock className="w-3.5 h-3.5 text-slate-500" />
                        {prog.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-200 mb-0.5">{prog.presenter}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Prod: {prog.producer}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border inline-block ${
                        prog.status === 'On Air' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {prog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setIsEditModalOpen(true)}
                          className="text-slate-500 hover:text-blue-400 transition-colors p-1.5 hover:bg-blue-500/10 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-slate-500 hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* --- MODALS --- */}
      
      {/* Create New Program Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h3 className="text-xl font-bold text-slate-100">Create New Program</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Program Name <span className="text-blue-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Dutse Morning Pulse" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-700" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Medium <span className="text-blue-500">*</span></label>
                  <select 
                    value={formData.medium}
                    onChange={(e) => setFormData({...formData, medium: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="RADIO">Radio</option>
                    <option value="TV">TV</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category <span className="text-blue-500">*</span></label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option>News & Current Affairs</option>
                    <option>Culture & Heritage</option>
                    <option>Sports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Presenter (Host) <span className="text-blue-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.presenter}
                    onChange={(e) => setFormData({...formData, presenter: e.target.value})}
                    placeholder="e.g. Balarabe Hadejia" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-700" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Producer <span className="text-blue-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.producer}
                    onChange={(e) => setFormData({...formData, producer: e.target.value})}
                    placeholder="e.g. Fatima Garba" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-700" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Time Slot <span className="text-blue-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    placeholder="08:00 - 09:00" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                <textarea 
                  rows={3} 
                  value={formData.desc}
                  onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  placeholder="Short outline of the broadcast program..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none placeholder:text-slate-700"
                ></textarea>
              </div>

            </div>
            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-4 bg-slate-950/50 rounded-b-2xl">
              <button onClick={() => setIsCreateModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                Save Program
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Program Schedule Modal omitted for brevity */}

    </div>
  );
}
