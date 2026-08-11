"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Upload, LayoutGrid, List, Download, Trash2, X, Music, Video, Image as ImageIcon, FileText, Radio } from 'lucide-react';

export default function MediaStoragePage() {
  const [activeTab, setActiveTab] = useState("All (4)");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All (4)", "Image", "Audio", "Video", "Jingle", "Document"];

  const mediaItems = [
    { id: 1, title: "360 Radio Station Jingle - Hausa Station ID", type: "Jingle", category: "Station Ident", size: "3.2 MB", date: "2026-08-01", icon: <Radio className="w-5 h-5" />, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { id: 2, title: "Dutse Central Market Opening Footage HD", type: "Video", category: "News Footage", size: "45 MB", date: "2026-08-03", icon: <Video className="w-5 h-5" />, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
    { id: 3, title: "360 TV Official Logo High Res Vector", type: "Image", category: "Brand Assets", size: "1.8 MB", date: "2026-07-28", icon: <ImageIcon className="w-5 h-5" />, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { id: 4, title: "Jigawa Agricultural Policy Brief 2026 (PDF)", type: "Document", category: "Press Release", size: "4.5 MB", date: "2026-08-02", icon: <FileText className="w-5 h-5" />, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
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
          <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest block mb-2">
            MODULE 5: MEDIA ARCHIVE STORAGE
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            Station Media Library
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Central cloud repository for audio jingles, broadcast assets, video clips, and documents.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Media File
        </motion.button>
      </motion.div>

      {/* Filters & View Toggle */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-800 shadow-xl flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div className="relative w-full lg:w-80 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search media by title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
          <div className="flex items-center gap-2 shrink-0">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.4)] border border-purple-500' 
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1 shrink-0">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-800 text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-800 text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Data View */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {mediaItems.map((item) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={item.id} 
                className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 shadow-xl hover:shadow-[0_0_20px_rgba(147,51,234,0.1)] transition-all group flex flex-col justify-between hover:border-purple-500/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color} border ${item.border}`}>
                      {item.icon}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 mb-2 leading-snug group-hover:text-purple-400 transition-colors line-clamp-2">{item.title}</h4>
                  <div className="text-[10px] font-medium text-slate-500 mb-4 flex flex-col gap-1">
                    <span>{item.size} • Uploaded {item.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                  <button className="text-xs font-bold text-purple-500 hover:text-purple-400 flex items-center gap-1.5 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                  <button className="text-slate-500 hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4 text-center">Type</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Size</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {mediaItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-sm text-slate-200 max-w-sm truncate flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color} border ${item.border}`}>
                          {React.cloneElement(item.icon, { className: "w-3.5 h-3.5" })}
                        </div>
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap">
                        {item.size}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="text-slate-500 hover:text-purple-400 transition-colors p-1.5 hover:bg-purple-500/10 rounded-lg">
                            <Download className="w-4 h-4" />
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
          </div>
        )}
      </motion.div>

      {/* Upload Media Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsUploadModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl relative z-10 shadow-2xl flex flex-col"
          >
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-500" />
                Upload Media File
              </h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">File Title <span className="text-purple-500">*</span></label>
                <input type="text" placeholder="e.g. Dutse Central Market Jingle" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all placeholder:text-slate-700" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Type <span className="text-purple-500">*</span></label>
                  <select defaultValue="Jingle" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none">
                    <option>Image</option>
                    <option>Audio</option>
                    <option>Video</option>
                    <option>Jingle</option>
                    <option>Document</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                  <input type="text" defaultValue="Station Ident" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Source URL <span className="text-purple-500">*</span></label>
                <input type="url" defaultValue="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all" />
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-4 bg-slate-950/50 rounded-b-2xl shrink-0">
              <button onClick={() => setIsUploadModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all">
                Upload Asset
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}
