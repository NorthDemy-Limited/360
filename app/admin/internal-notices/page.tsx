"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pin, Calendar, User, X, Trash2, BellRing } from 'lucide-react';

export default function InternalNoticesPage() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [urgency, setUrgency] = useState('Standard (FYI)');
  const [targetAudience, setTargetAudience] = useState('All Staff');
  const [isPinned, setIsPinned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNotices = () => {
    fetch('/api/notices')
      .then(res => res.json())
      .then(data => {
        setNotices(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  React.useEffect(() => {
    fetchNotices();
  }, []);

  const handlePostNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          body,
          urgency,
          targetAudience,
          isPinned
        })
      });
      if (res.ok) {
        setIsPostModalOpen(false);
        setTitle('');
        setBody('');
        setIsPinned(false);
        fetchNotices();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notice?')) return;
    try {
      const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' });
      if (res.ok) fetchNotices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 relative max-w-4xl min-h-full mx-auto xl:mx-0">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-2">
            MODULE 8: INTERNAL ANNOUNCEMENTS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            Internal Notice Board
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Broadcast official notices, engineering maintenance alerts, and staff updates securely within the network.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsPostModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Post New Notice
        </motion.button>
      </motion.div>

      {/* Notice Feed */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {notices.map((notice) => (
          <motion.div 
            whileHover={{ y: -2 }}
            key={notice.id} 
            className={`rounded-2xl p-6 border shadow-xl relative group transition-all overflow-hidden ${
              notice.pinned 
                ? 'bg-orange-950/20 border-orange-500/30 backdrop-blur-xl' 
                : 'bg-slate-900/50 border-slate-800 backdrop-blur-xl hover:border-slate-700'
            }`}
          >
            {notice.pinned && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400"></div>
            )}

            <div className="flex items-center gap-3 mb-4">
              {notice.pinned && (
                <span className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                  <Pin className="w-3 h-3" />
                  Pinned Notice
                </span>
              )}
              <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                Posted {new Date(notice.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-100 mb-2 leading-snug pr-8 flex items-center gap-2">
              {notice.title}
              {notice.urgency === 'High' && <span className="bg-amber-500/10 text-amber-500 text-[9px] px-2 py-0.5 rounded border border-amber-500/20">High Priority</span>}
              {notice.urgency === 'Critical' && <span className="bg-red-500/10 text-red-500 text-[9px] px-2 py-0.5 rounded border border-red-500/20">CRITICAL</span>}
            </h3>
            
            <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6">
              {notice.body}
            </p>
            
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <User className="w-3.5 h-3.5" />
              Issued by: <span className="text-slate-400">{notice.author?.name || 'System Admin'}</span>
              <span className="mx-2 text-slate-700">•</span>
              Target: <span className="text-slate-400">{notice.targetAudience}</span>
            </div>

            <button onClick={() => handleDelete(notice.id)} className="absolute right-6 top-6 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 bg-slate-900/80 p-2 rounded-lg border border-slate-700">
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Post Internal Notice Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsPostModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg relative z-10 shadow-2xl flex flex-col"
          >
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <BellRing className="w-5 h-5 text-orange-500" />
                Post Internal Notice
              </h3>
              <button onClick={() => setIsPostModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              <form id="notice-form" onSubmit={handlePostNotice} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Notice Title <span className="text-orange-500">*</span></label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Studio A Routine Maintenance" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium placeholder:text-slate-700" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Urgency</label>
                    <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none appearance-none">
                      <option>Standard (FYI)</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Audience</label>
                    <select value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none appearance-none">
                      <option>All Staff</option>
                      <option>Newsroom</option>
                      <option>Presenters</option>
                      <option>Technical</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message Body <span className="text-orange-500">*</span></label>
                  <textarea 
                    placeholder="Write clear notice details..." 
                    rows={5}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium resize-none placeholder:text-slate-700"
                    required
                  ></textarea>
                </div>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                      className="peer sr-only" 
                    />
                    <div className="w-5 h-5 border-2 border-slate-700 bg-slate-950 rounded peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all"></div>
                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors">
                    Pin to top of Dashboard and Presenter Notice Board
                  </span>
                </label>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-4 shrink-0 bg-slate-950/50 rounded-b-2xl">
              <button onClick={() => setIsPostModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button 
                form="notice-form"
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Notice'}
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}
