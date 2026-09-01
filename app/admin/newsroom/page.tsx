"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, PenTool, Trash2, X, LayoutTemplate, Loader2 } from 'lucide-react';

export default function NewsroomCMSPage() {
  const [activeTab, setActiveTab] = useState("All News");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "Local Dutse",
    content: "",
    imageUrl: ""
  });

  const tabs = [
    "All News", "Local Dutse", "Jigawa News", "Politics", "Culture & Arts", "Business", "Sports"
  ];

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news?all=true");
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreate = async () => {
    if (!formData.title || !formData.content) return;
    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsCreateModalOpen(false);
        setFormData({ title: "", category: "Local Dutse", content: "", imageUrl: "" });
        fetchNews();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All News" || article.category === activeTab;
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
                  <th className="px-6 py-4">Headline</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Publish Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 max-w-md">
                      <h4 className="text-sm font-bold text-slate-200 mb-1 leading-snug">{article.title}</h4>
                      <p className="text-xs text-slate-500 font-medium truncate">{article.content.substring(0, 80)}...</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block bg-blue-500/10 text-blue-400 border-blue-500/20 whitespace-nowrap">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap">
                      {article.author?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap">
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Unpublished'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border inline-block ${
                        article.isPublished ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {article.isPublished ? 'Published' : 'Draft'}
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
      )}

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
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Jigawa Executive Council Approves..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-700" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category <span className="text-blue-500">*</span></label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="Local Dutse">Local Dutse</option>
                    <option value="Jigawa News">Jigawa News</option>
                    <option value="Politics">Politics</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Article Content <span className="text-blue-500">*</span></label>
                <textarea 
                  rows={6} 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Write full news article content here..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-y leading-relaxed placeholder:text-slate-700"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Featured Image URL</label>
                <input 
                  type="url" 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-xs" 
                />
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-4 bg-slate-950/50 rounded-b-2xl shrink-0">
              <button onClick={() => setIsCreateModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                Save Article
              </button>
            </div>

          </motion.div>
        </div>
      )}
      
      {/* Edit modal omitted for brevity as per implementation focus on create/read */}
    </div>
  );
}
