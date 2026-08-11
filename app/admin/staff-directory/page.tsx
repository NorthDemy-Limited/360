"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Phone, Mail, Edit2, Trash2, X, Users } from 'lucide-react';

export default function StaffDirectoryPage() {
  const [activeTab, setActiveTab] = useState("All Staff (6)");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All Staff (6)", "Management", "Newsroom", "Programs", "Engineering", "Commercial", "Administration"];

  const staff = [
    { id: 1, name: "Alhaji Ibrahim Dutse", role: "General Manager / CEO", dept: "MANAGEMENT", phone: "+234 803 360 0001", email: "admin@360radiotv.ng", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150" },
    { id: 2, name: "Malama Hadiza Gumel", role: "Station Controller", dept: "MANAGEMENT", phone: "+234 803 360 0002", email: "manager@360radiotv.ng", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" },
    { id: 3, name: "Malam Aminu Kazaure", role: "Editor-in-Chief", dept: "NEWSROOM", phone: "+234 803 360 0003", email: "news@360radiotv.ng", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150" },
    { id: 4, name: "Fatima Garba", role: "Head of Programming", dept: "PROGRAMS", phone: "+234 803 360 0004", email: "programs@360radiotv.ng", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150" },
    { id: 5, name: "Balarabe Hadejia", role: "Senior On-Air Personality", dept: "PROGRAMS", phone: "+234 803 360 0005", email: "presenter@360radiotv.ng", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    { id: 6, name: "Engr. Danladi Ringim", role: "Chief Broadcast Engineer", dept: "ENGINEERING", phone: "+234 803 360 0006", email: "engineering@360radiotv.ng", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150" },
  ];

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
            MODULE 7: INTERNAL STAFF DIRECTORY
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            Station Staff Roster
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Internal directory of broadcasting staff, editors, producers, and engineering teams.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Staff Member
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
            placeholder="Search staff name..." 
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

      {/* Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {staff.map((person) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={person.id} 
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.1)] transition-all flex flex-col justify-between hover:border-blue-500/30 group"
          >
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={person.img} alt={person.name} className="w-14 h-14 rounded-xl object-cover border border-slate-700 shadow-sm" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-100 leading-tight group-hover:text-blue-400 transition-colors">{person.name}</h4>
                    <p className="text-xs font-medium text-slate-400 mt-1">{person.role}</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 shrink-0">
                  {person.dept}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-xs text-slate-300 font-medium bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/50">
                  <Phone className="w-4 h-4 text-slate-500" />
                  {person.phone}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 font-medium bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/50">
                  <Mail className="w-4 h-4 text-slate-500" />
                  {person.email}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <Users className="w-3.5 h-3.5" />
                Active Staff
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsEditModalOpen(true)} className="text-slate-500 hover:text-blue-400 transition-colors p-1.5 hover:bg-blue-500/10 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="text-slate-500 hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Edit Staff Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl relative z-10 shadow-2xl flex flex-col max-h-[90vh]"
          >
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Edit Staff Profile
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name <span className="text-blue-500">*</span></label>
                <input type="text" defaultValue="Alhaji Ibrahim Dutse" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Department <span className="text-blue-500">*</span></label>
                  <select defaultValue="Management" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none font-medium">
                    <option>Management</option>
                    <option>Newsroom</option>
                    <option>Programs</option>
                    <option>Engineering</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Position <span className="text-blue-500">*</span></label>
                  <input type="text" defaultValue="General Manager / CEO" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number <span className="text-blue-500">*</span></label>
                  <input type="tel" defaultValue="+234 803 360 0001" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address <span className="text-blue-500">*</span></label>
                  <input type="email" defaultValue="admin@360radiotv.ng" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Photo URL</label>
                <input type="url" defaultValue="https://images.unsplash.com/photo-1560250097-0b93528c311a" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono" />
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-4 bg-slate-950/50 rounded-b-2xl shrink-0">
              <button onClick={() => setIsEditModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                Save Staff Profile
              </button>
            </div>

          </motion.div>
        </div>
      )}

      {/* Add New Staff Member Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl relative z-10 shadow-2xl flex flex-col max-h-[90vh]"
          >
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Add New Staff Member
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name <span className="text-blue-500">*</span></label>
                <input type="text" placeholder="e.g. Alhaji Kabiru Ringim" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium placeholder:text-slate-700" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Department <span className="text-blue-500">*</span></label>
                  <select defaultValue="Programs" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none font-medium">
                    <option>Management</option>
                    <option>Newsroom</option>
                    <option>Programs</option>
                    <option>Engineering</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Position <span className="text-blue-500">*</span></label>
                  <input type="text" placeholder="Broadcast Presenter" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium placeholder:text-slate-700" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number <span className="text-blue-500">*</span></label>
                  <input type="tel" defaultValue="+234 803 000 0000" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address <span className="text-blue-500">*</span></label>
                  <input type="email" placeholder="staff@360radiotv.ng" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium placeholder:text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Photo URL</label>
                <input type="url" defaultValue="https://images.unsplash.com/photo-1534528741775-53994a69d..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono" />
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-4 bg-slate-950/50 rounded-b-2xl shrink-0">
              <button onClick={() => setIsCreateModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                Save Staff Profile
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}
