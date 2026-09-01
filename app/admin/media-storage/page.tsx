"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Upload, 
  LayoutGrid, 
  List, 
  Download, 
  Trash2, 
  X, 
  Music, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Radio, 
  Loader2,
  ShieldCheck,
  Check,
  Play,
  Pause,
  Link2,
  ExternalLink,
  FileAudio,
  HardDrive,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const MAX_AUDIO_LIMIT = 10;
const MAX_FILE_SIZE_MB = 20;

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export default function MediaStoragePage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // 10-Second Toast Notification State
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const toastTimerRef = useRef<any>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ id: Date.now().toString(), title, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 10000); // 10 seconds auto-fade
  };

  // Ingestion Mode
  const [ingestMode, setIngestMode] = useState<'audio_file' | 'audio_url' | 'video_url'>('audio_file');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [externalUrl, setExternalUrl] = useState('');
  const [autoAuthorize, setAutoAuthorize] = useState(true);

  // Audio Preview
  const [playingAssetId, setPlayingAssetId] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Station Jingle",
  });

  const tabs = ["All", "Audio", "Video", "Image", "Jingle", "Document"];

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/media", { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setMediaItems(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const uploadedFilesCount = mediaItems.filter(a => a.url && a.url.startsWith('/uploads/')).length;
  const isQuotaFull = uploadedFilesCount >= MAX_AUDIO_LIMIT;

  const handleToggleAuthorize = async (item: any) => {
    const newStatus = !item.isAuthorized;
    setActionLoadingId(item.id);

    // Optimistic UI state update
    setMediaItems(prev => prev.map(m => m.id === item.id ? { ...m, isAuthorized: newStatus } : m));

    try {
      const res = await fetch(`/api/media/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAuthorized: newStatus })
      });
      if (res.ok) {
        fetchMedia();
        if (newStatus) {
          showToast(
            "Asset Authorized Successfully", 
            `"${item.title}" is now authorized for on-air broadcast and production.`, 
            "success"
          );
        } else {
          showToast(
            "Authorization Revoked", 
            `"${item.title}" has been removed from authorized broadcast status.`, 
            "info"
          );
        }
      } else {
        // Rollback on failure
        setMediaItems(prev => prev.map(m => m.id === item.id ? { ...m, isAuthorized: item.isAuthorized } : m));
        showToast("Error", "Failed to update authorization status.", "warning");
      }
    } catch (e) {
      console.error(e);
      setMediaItems(prev => prev.map(m => m.id === item.id ? { ...m, isAuthorized: item.isAuthorized } : m));
      showToast("Error", "Network error updating authorization.", "warning");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSetLiveBroadcast = async (item: any) => {
    setActionLoadingId(item.id);
    try {
      const res = await fetch(`/api/media/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAuthorized: true, isActiveBroadcast: true })
      });
      if (res.ok) {
        fetchMedia();
        showToast(
          "🔴 Live Broadcast Feed Activated", 
          `"${item.title}" is now transmitting live on ${item.type === 'Video' ? '360 Digital TV' : 'Radio 98.5 FM'}.`,
          "success"
        );
      }
    } catch (e) {
      console.error(e);
      showToast("Error", "Failed to activate live broadcast feed.", "warning");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will free up storage space.`)) return;

    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (playingAssetId === id && previewAudioRef.current) {
          previewAudioRef.current.pause();
          setPlayingAssetId(null);
        }
        fetchMedia();
        showToast("Asset Deleted", `"${title}" has been removed and storage freed.`, "info");
      } else {
        alert("Failed to delete asset.");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred while deleting.");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Please provide a title.");
      return;
    }

    setIsUploading(true);
    try {
      if (ingestMode === 'audio_file') {
        if (!selectedFile) {
          alert("Please select an audio file.");
          setIsUploading(false);
          return;
        }

        if (isQuotaFull) {
          alert(`Storage quota reached (${MAX_AUDIO_LIMIT}/${MAX_AUDIO_LIMIT} uploaded files). Delete an existing asset before uploading more.`);
          setIsUploading(false);
          return;
        }

        const uploadData = new FormData();
        uploadData.append('file', selectedFile);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData
        });
        const uploadResult = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadResult.error || "Upload failed");

        const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2) + " MB";

        await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category,
            type: 'Audio',
            size: sizeMB,
            url: uploadResult.url,
            isAuthorized: autoAuthorize
          })
        });
      } else if (ingestMode === 'audio_url') {
        if (!externalUrl) {
          alert("Please provide an audio URL.");
          setIsUploading(false);
          return;
        }

        await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category || 'External Audio',
            type: 'Audio',
            size: 'Audio Stream',
            url: externalUrl,
            isAuthorized: autoAuthorize
          })
        });
      } else {
        if (!externalUrl) {
          alert("Please provide a video URL.");
          setIsUploading(false);
          return;
        }

        const isYouTube = externalUrl.includes('youtube.com') || externalUrl.includes('youtu.be');
        const isTikTok = externalUrl.includes('tiktok.com');
        const categoryTag = isYouTube ? 'YouTube Video' : isTikTok ? 'TikTok Video' : 'External Stream';

        await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category || categoryTag,
            type: 'Video',
            size: 'Cloud Stream',
            url: externalUrl,
            isAuthorized: autoAuthorize
          })
        });
      }

      setIsUploadModalOpen(false);
      setSelectedFile(null);
      setExternalUrl('');
      setFormData({ title: "", category: "Station Jingle" });
      fetchMedia();
      showToast(
        "Asset Ingested", 
        `"${formData.title}" was saved ${autoAuthorize ? 'and automatically authorized.' : 'and queued for sign-off.'}`,
        "success"
      );
    } catch (error: any) {
      alert(error.message || "Failed to save asset.");
    } finally {
      setIsUploading(false);
    }
  };

  const toggleAudioPreview = (asset: any) => {
    if (!previewAudioRef.current) return;

    if (playingAssetId === asset.id) {
      previewAudioRef.current.pause();
      setPlayingAssetId(null);
    } else {
      previewAudioRef.current.src = asset.url;
      previewAudioRef.current.play()
        .then(() => setPlayingAssetId(asset.id))
        .catch(err => {
          console.error("Preview playback error:", err);
          alert("Unable to preview this audio stream.");
        });
    }
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getIcon = (type: string) => {
    switch(type) {
      case 'Image': return <ImageIcon className="w-5 h-5 text-blue-400" />;
      case 'Video': return <Video className="w-5 h-5 text-red-400" />;
      case 'Audio': return <Music className="w-5 h-5 text-amber-400" />;
      case 'Jingle': return <Radio className="w-5 h-5 text-emerald-400" />;
      case 'Document': return <FileText className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 relative min-h-full pb-12">
      <audio 
        ref={previewAudioRef} 
        onEnded={() => setPlayingAssetId(null)}
        onError={() => setPlayingAssetId(null)}
      />

      {/* 10-Second Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className={`fixed top-6 right-6 z-50 max-w-md w-[calc(100%-3rem)] bg-slate-900/95 backdrop-blur-2xl border rounded-2xl p-4 shadow-[0_15px_50px_rgba(0,0,0,0.8)] text-white overflow-hidden ${
              toast.type === 'success' ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.25)]' :
              toast.type === 'warning' ? 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.25)]' :
              'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.25)]'
            }`}
          >
            <div className="flex items-start gap-3.5 relative z-10">
              <div className={`p-2 rounded-xl shrink-0 ${
                toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                toast.type === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white tracking-tight">{toast.title}</h4>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Live Status
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
              </div>
              <button 
                onClick={() => setToast(null)}
                className="text-slate-500 hover:text-white p-1 rounded-lg transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 10-Second Progress Bar */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
              className={`h-1 absolute bottom-0 left-0 ${
                toast.type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                toast.type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-400' :
                'bg-gradient-to-r from-blue-500 to-indigo-400'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest block mb-2">
            SUPER ADMIN GOVERNANCE • MODULE 5
          </span>
          <h2 className="text-3xl font-extrabold text-slate-100 mb-2 tracking-tight">
            Station Media Vault &amp; Live Dispatch
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl">
            Authorize incoming station assets, manage physical audio quota, and dispatch live feeds.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Ingest / Upload Asset
        </motion.button>
      </motion.div>

      {/* Storage Quota Bar */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl border ${isQuotaFull ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-purple-500/10 border-purple-500/20 text-purple-400'}`}>
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">Audio Storage Quota:</h4>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${isQuotaFull ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                {uploadedFilesCount} / {MAX_AUDIO_LIMIT} Upload Slots Used
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {isQuotaFull 
                ? "⚠️ Quota full! Delete existing files to free space."
                : `Max ${MAX_FILE_SIZE_MB}MB per audio file. External YouTube/TikTok URLs use 0MB quota.`
              }
            </p>
          </div>
        </div>

        <div className="w-full md:w-64 space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Quota Usage</span>
            <span>{Math.round((uploadedFilesCount / MAX_AUDIO_LIMIT) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div 
              className={`h-full transition-all duration-500 ${isQuotaFull ? 'bg-red-500' : 'bg-purple-500'}`}
              style={{ width: `${Math.min(100, (uploadedFilesCount / MAX_AUDIO_LIMIT) * 100)}%` }}
            />
          </div>
        </div>
      </div>

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
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {filteredMedia.map((item) => (
                <motion.div 
                  whileHover={{ y: -5 }}
                  key={item.id} 
                  className={`bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border shadow-xl transition-all group flex flex-col justify-between ${
                    item.isActiveBroadcast ? 'border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.2)]' : 'border-slate-800 hover:border-purple-500/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800 border border-slate-700`}>
                          {getIcon(item.type)}
                        </div>
                        {item.type === 'Audio' && (
                          <button 
                            onClick={() => toggleAudioPreview(item)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                              playingAssetId === item.id 
                                ? 'bg-amber-500 text-slate-950' 
                                : 'bg-slate-800 text-amber-400 hover:bg-amber-500/20'
                            }`}
                            title="Preview Audio"
                          >
                            {playingAssetId === item.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                          </button>
                        )}
                      </div>

                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                        item.isActiveBroadcast 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : item.isAuthorized 
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {item.isActiveBroadcast ? "🔴 ON-AIR" : item.isAuthorized ? "AUTHORIZED" : "PENDING"}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-200 mb-1 leading-snug group-hover:text-purple-400 transition-colors line-clamp-2" title={item.title}>
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-3">{item.category}</p>
                    <div className="text-[10px] font-medium text-slate-500 mb-4">
                      <span>{item.size} • {new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800/50">
                    {/* Admin Action Bar */}
                    <div className="flex items-center justify-between gap-2">
                      <button 
                        onClick={() => handleToggleAuthorize(item)}
                        disabled={actionLoadingId === item.id}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                          item.isAuthorized 
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30' 
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        }`}
                      >
                        {actionLoadingId === item.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : item.isAuthorized ? (
                          <X className="w-3 h-3" />
                        ) : (
                          <ShieldCheck className="w-3 h-3" />
                        )}
                        {item.isAuthorized ? "Revoke" : "Authorize"}
                      </button>

                      {item.isAuthorized && (
                        <button 
                          onClick={() => handleSetLiveBroadcast(item)}
                          disabled={actionLoadingId === item.id || item.isActiveBroadcast}
                          className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                            item.isActiveBroadcast 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-red-600 hover:bg-red-500 text-white shadow-md'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          {item.isActiveBroadcast ? "Live" : "Broadcast Live"}
                        </button>
                      )}

                      <button 
                        onClick={() => handleDelete(item.id, item.title)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded-lg ml-auto"
                        title="Delete asset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
                      <th className="px-6 py-4 text-center">Authorization</th>
                      <th className="px-6 py-4 text-right">Admin Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {filteredMedia.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-sm text-slate-200 max-w-sm truncate flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-slate-800 border border-slate-700`}>
                            {getIcon(item.type)}
                          </div>
                          <div>
                            <div className="truncate max-w-xs">{item.title}</div>
                            <span className="text-[10px] text-slate-500 font-mono">{item.size}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                            item.isActiveBroadcast 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                              : item.isAuthorized 
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {item.isActiveBroadcast ? "🔴 ON-AIR" : item.isAuthorized ? "AUTHORIZED" : "PENDING"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleToggleAuthorize(item)}
                              disabled={actionLoadingId === item.id}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                item.isAuthorized 
                                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30' 
                                  : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md'
                              }`}
                            >
                              {actionLoadingId === item.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : item.isAuthorized ? (
                                <X className="w-3 h-3" />
                              ) : (
                                <ShieldCheck className="w-3 h-3" />
                              )}
                              {item.isAuthorized ? "Revoke" : "Authorize"}
                            </button>

                            {item.isAuthorized && (
                              <button 
                                onClick={() => handleSetLiveBroadcast(item)}
                                disabled={actionLoadingId === item.id || item.isActiveBroadcast}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                  item.isActiveBroadcast ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-600 text-white hover:bg-red-500'
                                }`}
                              >
                                <Play className="w-3 h-3 fill-current" />
                                {item.isActiveBroadcast ? "Broadcasting" : "Broadcast"}
                              </button>
                            )}

                            <button 
                              onClick={() => handleDelete(item.id, item.title)}
                              className="text-slate-500 hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded-lg"
                              title="Delete asset"
                            >
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
      )}

      {/* Super Admin Ingest Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
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
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl flex flex-col relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-400" />
                  Super Admin Ingestion Engine
                </h3>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mode Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-6 text-center">
                <button 
                  type="button"
                  onClick={() => { setIngestMode('audio_file'); setSelectedFile(null); }}
                  className={`py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${ingestMode === 'audio_file' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  <FileAudio className="w-3.5 h-3.5" />
                  Audio File
                </button>
                <button 
                  type="button"
                  onClick={() => { setIngestMode('audio_url'); }}
                  className={`py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${ingestMode === 'audio_url' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  <Link2 className="w-3.5 h-3.5" />
                  Audio URL
                </button>
                <button 
                  type="button"
                  onClick={() => { setIngestMode('video_url'); }}
                  className={`py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${ingestMode === 'video_url' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  <Video className="w-3.5 h-3.5" />
                  Video URL
                </button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Asset Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Station Morning Ident"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option>Station Jingle</option>
                    <option>Commercial Advert</option>
                    <option>YouTube Stream / Video</option>
                    <option>TikTok Video Feed</option>
                    <option>Live Broadcast Clip</option>
                  </select>
                </div>

                {ingestMode === 'audio_file' ? (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Audio File (Max {MAX_FILE_SIZE_MB}MB) *</label>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                      accept="audio/*"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer"
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      {ingestMode === 'audio_url' ? "Direct Audio Stream URL *" : "YouTube / TikTok URL *"}
                    </label>
                    <input 
                      type="url" 
                      placeholder={ingestMode === 'audio_url' ? "https://stream.zeno.fm/..." : "https://www.youtube.com/watch?v=..."}
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 font-mono focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                )}

                {/* Auto-Authorize Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="autoAuth" 
                    checked={autoAuthorize} 
                    onChange={(e) => setAutoAuthorize(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="autoAuth" className="text-xs text-slate-300 font-bold cursor-pointer">
                    Authorize Immediately upon Ingest (Super Admin Privilege)
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button 
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isUploading}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Save Asset
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
