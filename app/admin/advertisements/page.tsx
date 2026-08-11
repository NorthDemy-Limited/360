"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Plus, Edit2, Trash2, X, Calendar } from 'lucide-react';

export default function AdvertisementBoardPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const campaigns = [
    { id: 1, title: "Jigawa Agro-Allied Fertilizer Campaign", client: "Jigawa State Agricultural Development Authority", type: "AUDIO", slot: "Morning News & Afternoon Drive", dates: "2026-08-01 to 2026-08-30", status: "Active" },
    { id: 2, title: "Dutse Microfinance Bank SME Loans", client: "Dutse Commercial Microfinance Bank", type: "VIDEO", slot: "360 TV Prime Time News Bulletin", dates: "2026-08-05 to 2026-09-05", status: "Active" },
    { id: 3, title: "Arewa Solar Home Systems Special Offer", client: "Arewa Green Energy Ltd, Dutse", type: "BANNER", slot: "Public Website Home Banner", dates: "2026-07-15 to 2026-08-15", status: "Active" },
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
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-2">
            MODULE 6: COMMERCIAL ADVERTISEMENTS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            Advertisement Campaigns
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Track commercial sponsor audio/video adverts, airtime slots, and client schedules across the network.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Advert Campaign
        </motion.button>
      </motion.div>

      {/* Data Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-6 py-4">Advert Title</th>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4 text-center">Type</th>
                <th className="px-6 py-4">Broadcast Slot</th>
                <th className="px-6 py-4">Duration Dates</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <h4 className="text-sm font-bold text-slate-200 max-w-[200px] leading-snug">{campaign.title}</h4>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-medium text-slate-400 max-w-[200px] leading-snug">{campaign.client}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block bg-amber-500/10 text-amber-500 border-amber-500/20 whitespace-nowrap shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-medium text-slate-300 max-w-[150px] leading-snug">{campaign.slot}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span className="max-w-[150px] leading-snug">{campaign.dates}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border inline-block bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="text-slate-500 hover:text-amber-500 transition-colors p-1.5 hover:bg-amber-500/10 rounded-lg"
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

      {/* Edit Advert Campaign Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl relative z-10 shadow-2xl flex flex-col"
          >
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-500" />
                Edit Advert Campaign
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Advert Title <span className="text-amber-500">*</span></label>
                <input type="text" defaultValue="Jigawa Agro-Allied Fertilizer Campaign" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Client Name <span className="text-amber-500">*</span></label>
                  <input type="text" defaultValue="Jigawa State Agricultural Development Authority" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Type <span className="text-amber-500">*</span></label>
                  <select defaultValue="Audio (Radio)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none font-medium">
                    <option>Audio (Radio)</option>
                    <option>Video (TV)</option>
                    <option>Banner (Web)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Airtime Broadcast Slot <span className="text-amber-500">*</span></label>
                <input type="text" defaultValue="Morning News & Afternoon Drive" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium" />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
                  <div className="relative">
                    <input type="date" defaultValue="2026-08-01" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium [color-scheme:dark]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">End Date</label>
                  <div className="relative">
                    <input type="date" defaultValue="2026-08-30" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium [color-scheme:dark]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                  <select defaultValue="Active" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none font-medium">
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Expired</option>
                  </select>
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-4 bg-slate-950/50 rounded-b-2xl shrink-0">
              <button onClick={() => setIsEditModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
                Save Campaign
              </button>
            </div>

          </motion.div>
        </div>
      )}

      {/* Create Advert Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl relative z-10 shadow-2xl flex flex-col"
          >
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-500" />
                New Advert Campaign
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Advert Title <span className="text-amber-500">*</span></label>
                <input type="text" placeholder="e.g. Jigawa Fertilizer Promotion" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder:text-slate-700" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Client Name <span className="text-amber-500">*</span></label>
                  <input type="text" placeholder="e.g. Jigawa Agro Ltd" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder:text-slate-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Type <span className="text-amber-500">*</span></label>
                  <select defaultValue="Audio (Radio)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none font-medium">
                    <option>Audio (Radio)</option>
                    <option>Video (TV)</option>
                    <option>Banner (Web)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Airtime Broadcast Slot <span className="text-amber-500">*</span></label>
                <input type="text" placeholder="Morning Drive & Evening News" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder:text-slate-700" />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
                  <div className="relative">
                    <input type="date" defaultValue="2026-08-09" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium [color-scheme:dark]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">End Date</label>
                  <div className="relative">
                    <input type="date" defaultValue="2026-09-30" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium [color-scheme:dark]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                  <select defaultValue="Active" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none font-medium">
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Expired</option>
                  </select>
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-4 bg-slate-950/50 rounded-b-2xl shrink-0">
              <button onClick={() => setIsCreateModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
                Save Campaign
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}
