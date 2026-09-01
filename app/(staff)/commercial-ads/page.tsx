"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Plus, X, Calendar, Target, CheckCircle2, DollarSign, Layout, Loader2, Edit2, Trash2, Check, Upload, Image as ImageIcon, Video } from 'lucide-react';

interface Campaign {
  id: string;
  clientName: string;
  title: string;
  targetMedia: string;
  placement: string;
  mediaUrl?: string | null;
  value: number;
  startDate: string;
  endDate: string;
  status: string;
}

export default function CommercialAdsDashboard() {
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targetMedia: 'BANNER',
    placement: 'Full Screen Popup',
    mediaUrl: '',
    value: '250000'
  });

  const [editFormData, setEditFormData] = useState<Campaign | null>(null);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/commercials', { cache: 'no-store' });
      if (res.ok) setCampaigns(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMedia(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (isEdit && editFormData) {
          setEditFormData({ ...editFormData, mediaUrl: data.url });
        } else {
          setFormData({ ...formData, mediaUrl: data.url });
        }
      } else {
        alert(data.error || "Failed to upload media file");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading media file");
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.title || !formData.startDate || !formData.endDate || !formData.value) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/commercials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.clientName,
          title: formData.title,
          targetMedia: formData.targetMedia,
          placement: formData.placement,
          mediaUrl: formData.mediaUrl || null,
          value: parseFloat(formData.value),
          startDate: formData.startDate,
          endDate: formData.endDate
        })
      });

      if (res.ok) {
        setIsCampaignModalOpen(false);
        setFormData({
          clientName: '', title: '', startDate: new Date().toISOString().split('T')[0], endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], targetMedia: 'BANNER', placement: 'Full Screen Popup', mediaUrl: '', value: '250000'
        });
        fetchCampaigns();
      } else {
        alert("Failed to create campaign");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (camp: Campaign) => {
    setEditFormData({
      ...camp,
      startDate: camp.startDate ? new Date(camp.startDate).toISOString().split('T')[0] : '',
      endDate: camp.endDate ? new Date(camp.endDate).toISOString().split('T')[0] : '',
      mediaUrl: camp.mediaUrl || ""
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData || !editFormData.id) return;
    setActionLoadingId(editFormData.id);

    try {
      const res = await fetch(`/api/commercials/${editFormData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editFormData.title,
          clientName: editFormData.clientName,
          targetMedia: editFormData.targetMedia,
          placement: editFormData.placement,
          mediaUrl: editFormData.mediaUrl,
          value: Number(editFormData.value),
          startDate: new Date(editFormData.startDate).toISOString(),
          endDate: new Date(editFormData.endDate).toISOString(),
          status: editFormData.status
        })
      });

      if (res.ok) {
        setIsEditModalOpen(false);
        setEditFormData(null);
        fetchCampaigns();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the advert "${title}"?`)) return;
    setActionLoadingId(id);

    try {
      const res = await fetch(`/api/commercials/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchCampaigns();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            Commercial Ads &amp; Sponsorships
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1">Upload banner creatives, promo videos, and configure 20s rotation intervals.</p>
        </div>

        <button 
          onClick={() => setIsCampaignModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Overview Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Runs</p>
            <h3 className="text-2xl font-extrabold text-white">{campaigns.filter(c => c.status === 'ACTIVE').length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Target className="w-5 h-5" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Pipeline</p>
            <h3 className="text-2xl font-extrabold text-emerald-400 font-mono">
              ₦{campaigns.reduce((acc, curr) => acc + (curr.value || 0), 0).toLocaleString()}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Radio Jingles</p>
            <h3 className="text-2xl font-extrabold text-white">
              {campaigns.filter(c => (c.targetMedia || '').includes('Radio') || (c.targetMedia || '').includes('AUDIO')).length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <BarChart3 className="w-5 h-5" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Television &amp; Web</p>
            <h3 className="text-2xl font-extrabold text-white">
              {campaigns.filter(c => (c.targetMedia || '').includes('TV') || (c.targetMedia || '').includes('VIDEO') || (c.targetMedia || '').includes('BANNER')).length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <Layout className="w-5 h-5" />
          </div>
        </motion.div>
      </motion.div>

      {/* Campaigns Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-12 border border-slate-800/60 text-center flex flex-col items-center justify-center">
            <BarChart3 className="w-12 h-12 text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Active Campaigns</h3>
            <p className="text-xs text-slate-400 max-w-sm">No commercial campaigns currently loaded. Start a new run to place ads on air and on web.</p>
            <button 
              onClick={() => setIsCampaignModalOpen(true)}
              className="mt-6 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
            >
              Start a Campaign
            </button>
          </div>
        ) : (
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/50">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Active Ad Server Roster</h3>
                <p className="text-xs text-slate-400 font-medium">Commercial insertion system is fulfilling these campaigns.</p>
              </div>
            </div>
            <div className="overflow-x-auto min-h-[300px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] uppercase tracking-widest font-bold text-slate-500">
                    <th className="px-6 py-4">Client &amp; Title</th>
                    <th className="px-6 py-4">Creative / Medium</th>
                    <th className="px-6 py-4">Placement &amp; Pricing</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {campaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <h4 className="text-sm font-bold text-slate-200 mb-1">{camp.clientName}</h4>
                        <p className="text-xs text-slate-400 font-bold">{camp.title}</p>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-300">
                        <div className="flex items-center gap-2">
                          {camp.mediaUrl ? (
                            <span className="p-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                              {camp.mediaUrl.match(/\.(mp4|webm|mov)$/i) || camp.targetMedia === 'VIDEO' ? (
                                <Video className="w-3.5 h-3.5" />
                              ) : (
                                <ImageIcon className="w-3.5 h-3.5" />
                              )}
                            </span>
                          ) : null}
                          <span>{camp.targetMedia}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border shadow-sm bg-purple-500/10 text-purple-400 border-purple-500/20">
                            {camp.placement}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-emerald-400 font-mono">₦{camp.value?.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-slate-300 whitespace-nowrap">
                          {new Date(camp.startDate).toLocaleDateString()} - {new Date(camp.endDate).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm inline-flex items-center gap-1.5 ${
                          camp.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          {camp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(camp)}
                            className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
                            title="Edit Campaign"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(camp.id, camp.title)}
                            disabled={actionLoadingId === camp.id}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete Campaign"
                          >
                            {actionLoadingId === camp.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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

      {/* New Campaign Modal */}
      <AnimatePresence>
        {isCampaignModalOpen && (
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
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl flex flex-col relative overflow-hidden max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-6 relative z-10 shrink-0">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Plus className="w-6 h-6 text-purple-400" />
                    Create New Campaign
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Attach banner creatives or promo videos to your campaign.</p>
                </div>
                <button 
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white bg-slate-800/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-5 relative z-10 overflow-y-auto pr-1" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Client Name *</label>
                    <input 
                      type="text" 
                      value={formData.clientName}
                      onChange={e => setFormData({...formData, clientName: e.target.value})}
                      placeholder="e.g., MTN Nigeria" 
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600 font-bold text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Campaign Title *</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., 5G Network Rollout Q3" 
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600 font-bold text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Media Format</label>
                    <select 
                      value={formData.targetMedia}
                      onChange={e => setFormData({...formData, targetMedia: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-xs font-bold"
                    >
                      <option value="BANNER">Banner (Web Image &amp; Pop-up)</option>
                      <option value="VIDEO">Video (Promo Video &amp; TV)</option>
                      <option value="AUDIO">Audio (98.5 FM Jingle)</option>
                      <option value="BOTH">Simulcast (Radio &amp; TV)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Placement</label>
                    <select 
                      value={formData.placement}
                      onChange={e => setFormData({...formData, placement: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-xs font-bold"
                    >
                      <option value="Full Screen Popup">Full Screen Popup (10s max, 20s queue)</option>
                      <option value="Bottom Right Popup">Bottom Right Popup (10s max, 20s queue)</option>
                      <option value="Top Marquee">Top Marquee (Website Ticker)</option>
                      <option value="Standard">Standard Slot (Billboard)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Pricing Value (₦)</label>
                    <input 
                      type="number" 
                      value={formData.value}
                      onChange={e => setFormData({...formData, value: e.target.value})}
                      placeholder="250000" 
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors font-mono font-bold text-xs"
                      required
                    />
                  </div>
                </div>

                {/* Creative Media Upload (Banner Image or Promo Video) */}
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center justify-between">
                    <span>Upload Creative (Banner Image or Video)</span>
                    {formData.mediaUrl && <span className="text-emerald-400 font-mono text-[10px]">Creative Attached</span>}
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-purple-500 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                      {uploadingMedia ? <Loader2 className="w-4 h-4 animate-spin text-purple-400" /> : <Upload className="w-4 h-4 text-purple-400" />}
                      <span>{uploadingMedia ? "Uploading..." : "Upload File (PNG, JPG, MP4)"}</span>
                      <input 
                        type="file" 
                        accept="image/*,video/*" 
                        onChange={(e) => handleFileUpload(e, false)} 
                        className="hidden" 
                      />
                    </label>
                    <input 
                      type="text" 
                      value={formData.mediaUrl}
                      onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                      placeholder="or paste URL directly..." 
                      className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  {formData.mediaUrl && (
                    <div className="mt-2 p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-xs">{formData.mediaUrl}</span>
                      <button type="button" onClick={() => setFormData({ ...formData, mediaUrl: "" })} className="text-slate-500 hover:text-red-400 text-xs">
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Start Date</label>
                    <input 
                      type="date" 
                      value={formData.startDate}
                      onChange={e => setFormData({...formData, startDate: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-xs [color-scheme:dark]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">End Date</label>
                    <input 
                      type="date" 
                      value={formData.endDate}
                      onChange={e => setFormData({...formData, endDate: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-xs [color-scheme:dark]"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 shrink-0">
                  <button 
                    type="button" 
                    onClick={() => setIsCampaignModalOpen(false)}
                    className="px-6 py-2.5 text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    <span>Deploy Campaign</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Campaign Modal */}
      <AnimatePresence>
        {isEditModalOpen && editFormData && (
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
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl flex flex-col relative overflow-hidden max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-6 relative z-10 shrink-0">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Edit2 className="w-6 h-6 text-purple-400" />
                    Edit Commercial Campaign
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Update parameters for {editFormData.title}</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white bg-slate-800/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-5 relative z-10 overflow-y-auto pr-1" onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Client Name *</label>
                    <input 
                      type="text" 
                      value={editFormData.clientName}
                      onChange={e => setEditFormData({...editFormData, clientName: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors font-bold text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Campaign Title *</label>
                    <input 
                      type="text" 
                      value={editFormData.title}
                      onChange={e => setEditFormData({...editFormData, title: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors font-bold text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Media Format</label>
                    <select 
                      value={editFormData.targetMedia}
                      onChange={e => setEditFormData({...editFormData, targetMedia: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-xs font-bold"
                    >
                      <option value="BANNER">Banner (Web Image &amp; Pop-up)</option>
                      <option value="VIDEO">Video (Promo Video &amp; TV)</option>
                      <option value="AUDIO">Audio (Radio 98.5 FM Jingle)</option>
                      <option value="BOTH">Simulcast (Radio &amp; TV)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Placement</label>
                    <select 
                      value={editFormData.placement}
                      onChange={e => setEditFormData({...editFormData, placement: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-xs font-bold"
                    >
                      <option value="Full Screen Popup">Full Screen Popup (10s max, 20s queue)</option>
                      <option value="Bottom Right Popup">Bottom Right Popup (10s max, 20s queue)</option>
                      <option value="Top Marquee">Top Marquee (Website Ticker)</option>
                      <option value="Standard">Standard Slot (Billboard)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Pricing Value (₦)</label>
                    <input 
                      type="number" 
                      value={editFormData.value}
                      onChange={e => setEditFormData({...editFormData, value: Number(e.target.value)})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors font-mono font-bold text-xs"
                      required
                    />
                  </div>
                </div>

                {/* Edit Creative File Upload */}
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center justify-between">
                    <span>Upload Creative (Banner Image or Video)</span>
                    {editFormData.mediaUrl && <span className="text-emerald-400 font-mono text-[10px]">Creative Attached</span>}
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-purple-500 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                      {uploadingMedia ? <Loader2 className="w-4 h-4 animate-spin text-purple-400" /> : <Upload className="w-4 h-4 text-purple-400" />}
                      <span>{uploadingMedia ? "Uploading..." : "Upload File (PNG, JPG, MP4)"}</span>
                      <input 
                        type="file" 
                        accept="image/*,video/*" 
                        onChange={(e) => handleFileUpload(e, true)} 
                        className="hidden" 
                      />
                    </label>
                    <input 
                      type="text" 
                      value={editFormData.mediaUrl || ""}
                      onChange={(e) => setEditFormData({ ...editFormData, mediaUrl: e.target.value })}
                      placeholder="or paste URL directly..." 
                      className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  {editFormData.mediaUrl && (
                    <div className="mt-2 p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-xs">{editFormData.mediaUrl}</span>
                      <button type="button" onClick={() => setEditFormData({ ...editFormData, mediaUrl: "" })} className="text-slate-500 hover:text-red-400 text-xs">
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Start Date</label>
                    <input 
                      type="date" 
                      value={editFormData.startDate}
                      onChange={e => setEditFormData({...editFormData, startDate: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-xs [color-scheme:dark]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">End Date</label>
                    <input 
                      type="date" 
                      value={editFormData.endDate}
                      onChange={e => setEditFormData({...editFormData, endDate: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-xs [color-scheme:dark]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Status</label>
                    <select 
                      value={editFormData.status}
                      onChange={e => setEditFormData({...editFormData, status: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 text-xs font-bold"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="PENDING">Pending</option>
                      <option value="EXPIRED">Expired</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 shrink-0">
                  <button 
                    type="button" 
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-6 py-2.5 text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={actionLoadingId === editFormData.id}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {actionLoadingId === editFormData.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
