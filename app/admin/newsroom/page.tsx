"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, PenTool, Trash2, X, LayoutTemplate } from 'lucide-react';

export default function NewsroomCMSPage() {
  const [activeTab, setActiveTab] = useState("All News (4)");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    "All News (4)", "Local Dutse", "Jigawa News", "Politics", "Culture & Arts", "Business", "Sports"
  ];

  const articles = [
    { id: 1, headline: "Jigawa State Executive Council Approves N12B Road Expansion Project in Dutse Metropolis", desc: "The infrastructure upgrade will connect major commercial hubs in Dutse, ...", category: "Local Dutse", author: "Malam Aminu Kazaure", date: "2026-08-08", status: "Published" },
    { id: 2, headline: "360 Radio & TV Launches Solar-Powered Rural Broadcast Booster in Hadejia Emirate", desc: "The new transmitter ensures uninterrupted FM and TV signal reach to ...", category: "Jigawa News", author: "Amina Usman", date: "2026-08-07", status: "Published" },
    { id: 3, headline: "Federal University Dutse Collaborates with 360 Media for Youth Media Academy", desc: "A new joint internship program will train 50 mass communication students...", category: "Business", author: "Fatima Garba", date: "2026-08-06", status: "Published" },
    { id: 4, headline: "Dutse Annual Cultural & Agricultural Expo Set for November 2026", desc: "Farmers, artisans, and cultural troupes from all 27 Local Government Areas...", category: "Culture & Arts", author: "Balarabe Hadejia", date: "2026-08-05", status: "Published" },
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
            MODULE 2: NEWSROOM CONTENT MANAGEMENT
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            Newsroom Bureau
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Write, review, edit, and publish news bulletins for public reading on the digital platform.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create News Article
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
            placeholder="Search headline..." 
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
                <th className="px-6 py-4">Headline</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Publish Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 max-w-md">
                    <h4 className="text-sm font-bold text-slate-200 mb-1 leading-snug">{article.headline}</h4>
                    <p className="text-xs text-slate-500 font-medium truncate">{article.desc}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block bg-blue-500/10 text-blue-400 border-blue-500/20 whitespace-nowrap">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap">
                    {article.author}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap">
                    {article.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border inline-block ${
                      article.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="text-slate-500 hover:text-blue-400 transition-colors p-1.5 hover:bg-blue-500/10 rounded-lg"
                      >
                        <PenTool className="w-4 h-4" />
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

      {/* Create News Article Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsCreateModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl relative z-10 shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-blue-500" />
                Compose News Article
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Headline <span className="text-blue-500">*</span></label>
                <input type="text" placeholder="e.g. Jigawa Executive Council Approves New Infrastructure Grant..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-700" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category <span className="text-blue-500">*</span></label>
                  <select defaultValue="Local Dutse" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none">
                    <option>Local Dutse</option>
                    <option>Jigawa News</option>
                    <option>Politics</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Author / Bureau Editor <span className="text-blue-500">*</span></label>
                  <input type="text" defaultValue="Alhaji Ibrahim Dutse" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Short Summary (Excerpt) <span className="text-blue-500">*</span></label>
                <textarea rows={2} placeholder="One or two sentences highlighting the story..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none placeholder:text-slate-700"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Article Content <span className="text-blue-500">*</span></label>
                <textarea rows={6} placeholder="Write full news article content here..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-y leading-relaxed placeholder:text-slate-700"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Featured Image URL</label>
                <input type="url" defaultValue="https://images.unsplash.com/photo-15900484..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-xs" />
                <p className="text-[10px] text-slate-600 mt-1 flex items-center gap-2">
                  Or pick preset photo: 
                  <span className="w-6 h-6 bg-slate-800 rounded-md inline-block overflow-hidden border border-slate-700"><img src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=50" className="w-full h-full object-cover grayscale opacity-50"/></span>
                  <span className="w-6 h-6 bg-slate-800 rounded-md inline-block overflow-hidden border border-slate-700"><img src="https://images.unsplash.com/photo-1541872575897-4f61f7d54406?w=50" className="w-full h-full object-cover grayscale opacity-50"/></span>
                  <span className="w-6 h-6 bg-slate-800 rounded-md inline-block overflow-hidden border border-slate-700"><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=50" className="w-full h-full object-cover grayscale opacity-50"/></span>
                </p>
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-between bg-slate-950/50 rounded-b-2xl shrink-0">
              <select defaultValue="Published" className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none font-bold">
                <option>Draft</option>
                <option>Review Pending</option>
                <option>Published</option>
                <option>Archived</option>
              </select>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsCreateModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                  Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                  Save Article
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}

      {/* Edit News Article Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl relative z-10 shadow-2xl flex flex-col max-h-[90vh]"
          >
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-blue-500" />
                Edit News Article
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Headline <span className="text-blue-500">*</span></label>
                <input type="text" defaultValue="Jigawa State Executive Council Approves N12B Road Expansion Project in Dutse Metropolis" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category <span className="text-blue-500">*</span></label>
                  <select defaultValue="Local Dutse" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none font-medium">
                    <option>Local Dutse</option>
                    <option>Jigawa News</option>
                    <option>Politics</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Author / Bureau Editor <span className="text-blue-500">*</span></label>
                  <input type="text" defaultValue="Malam Aminu Kazaure" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Short Summary (Excerpt) <span className="text-blue-500">*</span></label>
                <textarea rows={2} defaultValue="The infrastructure upgrade will connect major commercial hubs in Dutse, easing traffic and boosting agricultural transport." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-y font-medium"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Article Content <span className="text-blue-500">*</span></label>
                <textarea rows={6} defaultValue="The Executive Council of Jigawa State has formally approved a N12 Billion allocation for the dualisation and expansion of major arterial roads across the Dutse capital metropolis.&#10;&#10;Speaking during a press briefing at the Government House in Dutse, the Commissioner for Works and Transport announced that the 18-kilometer stretch connecting the Central Market through the Federal Secretariat to the Airport Road will be completed within 12 months." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-y font-medium leading-relaxed"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Featured Image URL</label>
                <input type="url" defaultValue="https://images.unsplash.com/photo-15900484..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-xs" />
                <p className="text-[10px] text-slate-600 mt-1 flex items-center gap-2">
                  Or pick preset photo: 
                  <span className="w-6 h-6 bg-slate-800 rounded-md inline-block overflow-hidden border border-slate-700"><img src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=50" className="w-full h-full object-cover grayscale opacity-50"/></span>
                  <span className="w-6 h-6 bg-slate-800 rounded-md inline-block overflow-hidden border border-slate-700"><img src="https://images.unsplash.com/photo-1541872575897-4f61f7d54406?w=50" className="w-full h-full object-cover grayscale opacity-50"/></span>
                  <span className="w-6 h-6 bg-slate-800 rounded-md inline-block overflow-hidden border border-slate-700"><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=50" className="w-full h-full object-cover grayscale opacity-50"/></span>
                </p>
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-between bg-slate-950/50 rounded-b-2xl shrink-0">
              <select defaultValue="Published" className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none font-bold">
                <option>Draft</option>
                <option>Review Pending</option>
                <option>Published</option>
                <option>Archived</option>
              </select>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsEditModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                  Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                  Save Article
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}
