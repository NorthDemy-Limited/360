"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Plus, Edit2, Trash2, X, Calendar, Loader2, Check, Upload, Image as ImageIcon, Video } from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  clientName: string;
  targetMedia: string;
  placement: string;
  mediaUrl?: string | null;
  value: number;
  startDate: string;
  endDate: string;
  status: string;
}

export default function AdvertisementBoardPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    targetMedia: "BANNER",
    placement: "Full Screen Popup",
    mediaUrl: "",
    value: 250000,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: "ACTIVE"
  });

  const [editFormData, setEditFormData] = useState<Campaign | null>(null);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/commercials", { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data);
      }
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
        alert(data.error || "Failed to upload file");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading file");
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.clientName) {
      alert("Advert title and client name are required.");
      return;
    }
    setActionLoadingId("create");
    try {
      const res = await fetch("/api/commercials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          startDate: new Date(formData.startDate).toISOString(),
          endDate: new Date(formData.endDate).toISOString(),
          value: Number(formData.value)
        })
      });
      if (res.ok) {
        setIsCreateModalOpen(false);
        setFormData({
          title: "", clientName: "", targetMedia: "BANNER", placement: "Full Screen Popup", mediaUrl: "", value: 250000,
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: "ACTIVE"
        });
        fetchCampaigns();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const openEditModal = (campaign: Campaign) => {
    setEditFormData({
      ...campaign,
      startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : '',
      endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
      mediaUrl: campaign.mediaUrl || ""
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
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

  return (
    <div className="space-y-6 relative min-h-full font-sans">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-2 font-mono">
            MODULE 6: COMMERCIAL ADVERTISEMENTS &amp; MEDIA
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            Commercial Advert Campaigns
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Upload banner image creatives, promo videos, and manage 20s rotation intervals and top marquee announcements.
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
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-12 text-center text-slate-400">
          <Megaphone className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Active Campaigns</h3>
          <p className="text-xs">Click &quot;Create Advert Campaign&quot; to launch a new advert with banner or video.</p>
        </div>
      ) : (
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
                  <th className="px-6 py-4">Creative / Title</th>
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4 text-center">Type / Placement</th>
                  <th className="px-6 py-4">Value (Pricing)</th>
                  <th className="px-6 py-4">Duration Dates</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {campaign.mediaUrl ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-black border border-slate-700 shrink-0 relative flex items-center justify-center">
                            {campaign.mediaUrl.match(/\.(mp4|webm|mov)$/i) || campaign.targetMedia === 'VIDEO' ? (
                              <Video className="w-5 h-5 text-red-400" />
                            ) : (
                              <img src={campaign.mediaUrl} alt="" className="w-full h-full object-cover" />
                            )}
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center text-slate-500">
                            <Megaphone className="w-4 h-4" />
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-slate-200 max-w-[200px] leading-snug">{campaign.title}</h4>
                          {campaign.mediaUrl && (
                            <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1 mt-0.5">
                              <ImageIcon className="w-3 h-3" /> Media Attached
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-slate-400 max-w-[200px] leading-snug">{campaign.clientName}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border inline-block bg-amber-500/10 text-amber-500 border-amber-500/20 whitespace-nowrap shadow-[0_0_10px_rgba(245,158,11,0.1)] mb-1">
                        {campaign.targetMedia}
                      </span>
                      <br/>
                      <span className="text-[9px] font-bold text-slate-400 tracking-widest">
                        {campaign.placement}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-emerald-400">₦{campaign.value?.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span className="max-w-[200px] leading-snug">
                          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border inline-block ${
                        campaign.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => openEditModal(campaign)}
                          className="text-slate-400 hover:text-amber-400 transition-colors p-1.5 hover:bg-amber-500/10 rounded-lg"
                          title="Edit Campaign"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(campaign.id, campaign.title)}
                          disabled={actionLoadingId === campaign.id}
                          className="text-slate-400 hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded-lg disabled:opacity-50"
                          title="Delete Campaign"
                        >
                          {actionLoadingId === campaign.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
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

      {/* Create Advert Campaign Modal */}
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
                <Megaphone className="w-5 h-5 text-amber-500" />
                New Advert Campaign
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-5 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Advert Title <span className="text-amber-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Jigawa Fertilizer Promotion 2026" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder:text-slate-700" 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Client Name <span className="text-amber-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.clientName}
                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                    placeholder="e.g. Jigawa Agro Ltd" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder:text-slate-700" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Media Format <span className="text-amber-500">*</span></label>
                  <select 
                    value={formData.targetMedia}
                    onChange={(e) => setFormData({...formData, targetMedia: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none font-medium"
                  >
                    <option value="BANNER">Banner (Web Image &amp; Pop-up)</option>
                    <option value="VIDEO">Video (Promo Video &amp; TV)</option>
                    <option value="AUDIO">Audio (Radio 98.5 FM Jingle)</option>
                    <option value="BOTH">Simulcast (Radio &amp; TV)</option>
                  </select>
                </div>
              </div>

              {/* Upload Media Asset (Banner Image or Promo Video) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                  <span>Upload Creative (Banner Image or Video)</span>
                  {formData.mediaUrl && <span className="text-emerald-400 text-[10px] font-mono">Creative Attached</span>}
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-amber-500 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                    {uploadingMedia ? <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> : <Upload className="w-4 h-4 text-amber-500" />}
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
                    placeholder="or paste image/video URL..." 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Placement Slot</label>
                  <select 
                    value={formData.placement}
                    onChange={(e) => setFormData({...formData, placement: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all appearance-none font-medium"
                  >
                    <option value="Full Screen Popup">Full Screen Popup (10s max, 20s queue)</option>
                    <option value="Bottom Right Popup">Bottom Right Popup (10s max, 20s queue)</option>
                    <option value="Top Marquee">Top Marquee (Website Ticker)</option>
                    <option value="Standard">Standard Slot (Homepage Billboard)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pricing Value (₦)</label>
                  <input 
                    type="number" 
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: Number(e.target.value)})}
                    placeholder="250000" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder:text-slate-700 font-mono" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium [color-scheme:dark]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">End Date</label>
                  <input 
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium [color-scheme:dark]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="PENDING">Pending</option>
                    <option value="EXPIRED">Expired</option>
                  </select>
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-4 bg-slate-950/50 rounded-b-2xl shrink-0">
              <button onClick={() => setIsCreateModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleCreate}
                disabled={actionLoadingId === "create"}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {actionLoadingId === "create" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Launch Campaign
              </button>
            </div>

          </motion.div>
        </div>
      )}

      {/* Edit Advert Campaign Modal */}
      {isEditModalOpen && editFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl relative z-10 shadow-2xl flex flex-col max-h-[90vh]"
          >
            
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-amber-500" />
                Edit Advert Campaign
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-5 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Advert Title <span className="text-amber-500">*</span></label>
                <input 
                  type="text" 
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-medium" 
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Client Name <span className="text-amber-500">*</span></label>
                  <input 
                    type="text" 
                    value={editFormData.clientName}
                    onChange={(e) => setEditFormData({...editFormData, clientName: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Media Format <span className="text-amber-500">*</span></label>
                  <select 
                    value={editFormData.targetMedia}
                    onChange={(e) => setEditFormData({...editFormData, targetMedia: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 appearance-none font-medium"
                  >
                    <option value="BANNER">Banner (Web Image &amp; Pop-up)</option>
                    <option value="VIDEO">Video (Promo Video &amp; TV)</option>
                    <option value="AUDIO">Audio (Radio 98.5 FM Jingle)</option>
                    <option value="BOTH">Simulcast (Radio &amp; TV)</option>
                  </select>
                </div>
              </div>

              {/* Edit Creative File Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                  <span>Upload Creative (Banner Image or Video)</span>
                  {editFormData.mediaUrl && <span className="text-emerald-400 text-[10px] font-mono">Creative Attached</span>}
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-amber-500 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
                    {uploadingMedia ? <Loader2 className="w-4 h-4 animate-spin text-amber-500" /> : <Upload className="w-4 h-4 text-amber-500" />}
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
                    placeholder="or paste image/video URL..." 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Placement Slot</label>
                  <select 
                    value={editFormData.placement}
                    onChange={(e) => setEditFormData({...editFormData, placement: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 appearance-none font-medium"
                  >
                    <option value="Full Screen Popup">Full Screen Popup (10s max, 20s queue)</option>
                    <option value="Bottom Right Popup">Bottom Right Popup (10s max, 20s queue)</option>
                    <option value="Top Marquee">Top Marquee (Website Ticker)</option>
                    <option value="Standard">Standard Slot (Homepage Billboard)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pricing Value (₦)</label>
                  <input 
                    type="number" 
                    value={editFormData.value}
                    onChange={(e) => setEditFormData({...editFormData, value: Number(e.target.value)})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-mono font-medium" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
                  <input 
                    type="date" 
                    value={editFormData.startDate}
                    onChange={(e) => setEditFormData({...editFormData, startDate: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium [color-scheme:dark]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">End Date</label>
                  <input 
                    type="date" 
                    value={editFormData.endDate}
                    onChange={(e) => setEditFormData({...editFormData, endDate: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium [color-scheme:dark]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                  <select 
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="PENDING">Pending</option>
                    <option value="EXPIRED">Expired</option>
                  </select>
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-4 bg-slate-950/50 rounded-b-2xl shrink-0">
              <button onClick={() => setIsEditModalOpen(false)} className="text-sm font-bold text-slate-400 hover:text-slate-200 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                disabled={actionLoadingId === editFormData.id}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {actionLoadingId === editFormData.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Save Changes
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}
