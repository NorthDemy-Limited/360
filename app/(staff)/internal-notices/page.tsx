"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Edit3, X, CheckCircle2, AlertTriangle, Users, Loader2, Pin } from 'lucide-react';

export default function InternalNoticesPage() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Segmenting state
  const [activeTab, setActiveTab] = useState<'INCOMING' | 'MY_POSTS'>('INCOMING');

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    urgency: 'Standard (FYI)',
    targetAudience: 'All Staff (Station-Wide)'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNotices = async () => {
    try {
      const res = await fetch('/api/notices');
      if (res.ok) setNotices(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          urgency: formData.urgency,
          targetAudience: formData.targetAudience,
          isPinned: formData.urgency.includes('Critical') // Auto-pin critical notices
        })
      });

      if (res.ok) {
        setIsPostModalOpen(false);
        setFormData({ title: '', body: '', urgency: 'Standard (FYI)', targetAudience: 'All Staff (Station-Wide)' });
        fetchNotices();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // We assume the user is "System Admin" (the mock user from API)
  const myPosts = notices.filter(n => n.author?.name === "System Admin");
  const incomingPosts = notices.filter(n => n.author?.name !== "System Admin");
  
  // If no other users have posted, just show everything in incoming except my posts, 
  // actually for demo purposes, if myPosts is everything, let's just show all in incoming and myPosts.
  // We'll simulate incoming by showing some system ones if we want, but accurate filtering is best.
  
  const displayedNotices = activeTab === 'INCOMING' ? notices : myPosts;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
              <Bell className="w-8 h-8 text-orange-400" />
              Internal Notices
            </h1>
            <p className="text-sm font-medium text-slate-400">Station-wide announcements and operational memos.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] transition-all flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Post Notice
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-800 pb-px">
          <button 
            onClick={() => setActiveTab('INCOMING')}
            className={`pb-3 text-sm font-bold transition-colors border-b-2 px-2 ${activeTab === 'INCOMING' ? 'border-orange-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
          >
            Incoming Notices
          </button>
          <button 
            onClick={() => setActiveTab('MY_POSTS')}
            className={`pb-3 text-sm font-bold transition-colors border-b-2 px-2 ${activeTab === 'MY_POSTS' ? 'border-orange-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
          >
            My Posted Notices
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center h-48 items-center">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        ) : displayedNotices.length === 0 ? (
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800/60 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
            <Bell className="w-16 h-16 text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Notices Found</h3>
            <p className="text-slate-400 text-sm max-w-md">There are no notices to display in this segment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedNotices.map((notice) => (
              <motion.div 
                key={notice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-slate-900/50 backdrop-blur-md border rounded-2xl p-6 transition-colors ${notice.urgency.includes('Critical') ? 'border-red-900/50 hover:border-red-500/50' : 'border-slate-800 hover:border-orange-500/30'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {notice.isPinned && <span className="bg-orange-500/20 text-orange-400 p-1.5 rounded-lg"><Pin className="w-3 h-3" /></span>}
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                        notice.urgency.includes('Critical') ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        notice.urgency.includes('High') ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {notice.urgency}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5 border border-slate-800 px-2.5 py-1 rounded-md bg-slate-800/50">
                        <Users className="w-3 h-3" /> {notice.targetAudience}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{notice.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {notice.body}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-700">
                    {notice.author?.name?.charAt(0) || 'A'}
                  </div>
                  <span className="text-xs font-bold text-slate-400">Posted by {notice.author?.name || 'Admin'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Post Notice Modal */}
      <AnimatePresence>
        {isPostModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Edit3 className="w-6 h-6 text-orange-400" />
                    Compose Internal Memo
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Broadcast an announcement to specific staff or the entire station.</p>
                </div>
                <button 
                  onClick={() => setIsPostModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white bg-slate-800/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Subject / Title <span className="text-orange-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Update on Studio B Equipment Maintenance" 
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-600 font-bold"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-slate-400" /> Urgency Level
                    </label>
                    <select 
                      value={formData.urgency}
                      onChange={e => setFormData({...formData, urgency: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors font-bold appearance-none"
                    >
                      <option>Standard (FYI)</option>
                      <option>High (Important Update)</option>
                      <option>Critical (Immediate Action Required)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Users className="w-3 h-3 text-slate-400" /> Target Audience
                    </label>
                    <select 
                      value={formData.targetAudience}
                      onChange={e => setFormData({...formData, targetAudience: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors font-bold appearance-none"
                    >
                      <option>All Staff (Station-Wide)</option>
                      <option>Newsroom Staff Only</option>
                      <option>On-Air Presenters Only</option>
                      <option>Technical & Studio Crew</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Notice Details <span className="text-orange-500">*</span></label>
                  <textarea 
                    rows={5}
                    value={formData.body}
                    onChange={e => setFormData({...formData, body: e.target.value})}
                    placeholder="Type the full details of your announcement here..."
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-slate-600 font-medium resize-none"
                    required
                  ></textarea>
                </div>

                <div className="pt-6 border-t border-slate-800 flex justify-end gap-3 mt-4">
                  <button 
                    type="button"
                    onClick={() => setIsPostModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all flex items-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} 
                    {isSubmitting ? 'Posting...' : 'Broadcast Notice'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
