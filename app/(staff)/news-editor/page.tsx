"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  FileEdit, 
  AlertTriangle, 
  MapPin, 
  Plus, 
  Search, 
  Filter, 
  Trash2,
  X,
  CheckCircle2,
  Loader2,
  Edit,
  Upload
} from 'lucide-react';

export default function NewsEditorDashboard() {
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Local Dutse');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fetchArticles = () => {
    fetch('/api/news?all=true')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setImageUrl(data.url);
      } else {
        console.error(data.error);
        alert('Upload failed: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveArticle = async () => {
    setIsSubmitting(true);
    try {
      const url = editingArticleId ? `/api/news/${editingArticleId}` : '/api/news';
      const method = editingArticleId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          content,
          imageUrl: imageUrl || undefined,
          isPublished
        })
      });

      if (res.ok) {
        setIsEditorModalOpen(false);
        setEditingArticleId(null);
        fetchArticles(); // refresh table
        // Reset form
        setTitle('');
        setContent('');
        setImageUrl('');
        setIsPublished(false);
      } else {
        const errorData = await res.json();
        console.error('Failed to save article', errorData);
        alert('Failed to save article: ' + JSON.stringify(errorData.error));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (article: any) => {
    setEditingArticleId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setContent(article.content);
    setImageUrl(article.imageUrl || '');
    setIsPublished(article.isPublished);
    setIsEditorModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchArticles();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Metrics calculation
  const publishedCount = articles.filter(a => a.isPublished).length;
  const draftCount = articles.filter(a => !a.isPublished).length;
  const breakingNewsCount = articles.filter(a => a.category === 'Breaking' && a.isPublished).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* 4-Column Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Published Stories */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20">
              <Newspaper className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Published News</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">{loading ? '-' : publishedCount}</span>
            <span className="text-xs text-slate-400 mb-1 font-medium">Stories Live</span>
          </div>
        </motion.div>

        {/* Pending Drafts */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
              <FileEdit className="w-5 h-5 text-amber-400" />
            </div>
            {draftCount > 0 && (
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-amber-400 tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Action Required
              </span>
            )}
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Drafts Queue</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">{loading ? '-' : draftCount}</span>
            <span className="text-xs text-slate-400 mb-1 font-medium">Awaiting Approval</span>
          </div>
        </motion.div>

        {/* Breaking Alerts */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            {breakingNewsCount > 0 && (
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-red-400 tracking-widest bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                Active
              </span>
            )}
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Breaking News Ticker</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">{loading ? '-' : breakingNewsCount}</span>
            <span className="text-xs text-slate-400 mb-1 font-medium">Headline Scrolling</span>
          </div>
        </motion.div>

        {/* Field Reporters */}
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Field Reporters</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">8</span>
            <span className="text-xs text-slate-400 mb-1 font-medium">Active in LGAs</span>
          </div>
        </motion.div>

      </div>

      {/* Main Content Area */}
      <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 shadow-xl overflow-hidden flex flex-col">
        
        {/* Table Header / Toolbar */}
        <div className="p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/50">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Newsroom Editorial Desk</h3>
            <p className="text-xs text-slate-400 font-medium">Manage publications, review drafts, and publish breaking news.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search headlines..." 
                className="pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full md:w-64"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all">
              <Filter className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                setEditingArticleId(null);
                setTitle('');
                setContent('');
                setImageUrl('');
                setIsPublished(false);
                setIsEditorModalOpen(true);
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Article
            </button>
          </div>
        </div>

        {/* Editorial Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] uppercase tracking-widest font-bold text-slate-500">
                <th className="px-6 py-4">Headline & Excerpt</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
                    Loading articles...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No articles found. Click "New Article" to create one.
                  </td>
                </tr>
              ) : articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 max-w-sm">
                    <h4 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">{article.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{article.content}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 whitespace-nowrap">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-300 whitespace-nowrap">{article.author?.name || 'Unknown'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs font-bold text-slate-500 whitespace-nowrap">
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Unpublished'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm whitespace-nowrap ${
                      article.isPublished 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {article.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(article)} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(article.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
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

      {/* Article Editor Modal */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsEditorModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl relative z-10 shadow-2xl flex flex-col max-h-full overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-xl border border-blue-500/20">
                  <FileEdit className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">Newsroom Editor</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{editingArticleId ? "Updating Story" : "Drafting New Story"}</p>
                </div>
              </div>
              <button onClick={() => setIsEditorModalOpen(false)} className="text-slate-500 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-xl transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 admin-sidebar-scrollbar">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Headline <span className="text-blue-500">*</span></label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter compelling news headline..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-700" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option>Local Dutse</option>
                    <option>Jigawa News</option>
                    <option>Breaking</option>
                    <option>Politics</option>
                    <option>Culture & Arts</option>
                    <option>Business</option>
                    <option>Sports</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Author / Bureau</label>
                  <input type="text" disabled defaultValue="Malam Aminu Kazaure (Auto-assigned)" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 cursor-not-allowed" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Story Content <span className="text-blue-500">*</span></label>
                <textarea 
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the full news body here (minimum 100 characters)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none placeholder:text-slate-700"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Featured Image URL</label>
                <div className="flex gap-4">
                  <input 
                    type="url" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Paste URL or upload file..." 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" 
                  />
                  <div className="relative shrink-0 w-40">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                      disabled={isUploading}
                    />
                    <button type="button" className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-6 py-3 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 w-full h-full relative z-0">
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {isUploading ? 'Uploading...' : 'Upload File'}
                    </button>
                  </div>
                </div>
                {/* Live Image Preview */}
                {imageUrl && (
                  <div className="mt-4 rounded-2xl overflow-hidden border border-slate-800 h-48 relative bg-slate-950 flex items-center justify-center group">
                    <div className="absolute inset-0 bg-slate-900 flex items-center justify-center -z-10">
                      <Loader2 className="w-5 h-5 text-slate-700 animate-spin" />
                    </div>
                    <img 
                      src={imageUrl} 
                      alt="Featured Preview" 
                      className="w-full h-full object-cover transition-opacity duration-300" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('border-red-500/30');
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-bold text-white tracking-widest uppercase">Live Preview</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 shrink-0 bg-slate-900/80 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  Status: 
                  <select 
                    value={isPublished ? "Published" : "Draft"}
                    onChange={(e) => setIsPublished(e.target.value === "Published")}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-300 focus:outline-none appearance-none"
                  >
                    <option value="Draft">Save as Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsEditorModalOpen(false)} className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
                  Discard
                </button>
                <button 
                  onClick={handleSaveArticle}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                     <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" /> Save Article</>
                  )}
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}

    </motion.div>
  );
}
