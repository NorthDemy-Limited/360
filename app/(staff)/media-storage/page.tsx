"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  Upload, 
  X, 
  FileAudio, 
  FileVideo, 
  CheckCircle2, 
  Loader2, 
  Play, 
  Pause,
  FileText, 
  Download, 
  Link2, 
  ExternalLink,
  Trash2, 
  AlertTriangle,
  HardDrive,
  ShieldCheck,
  Check
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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [mediaAssets, setMediaAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // 10-Second Floating Toast State
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

  // Audio Preview State
  const [playingAssetId, setPlayingAssetId] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Station Jingle',
    targetMedium: 'Radio (98.5 FM)'
  });

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setMediaAssets(data);
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

  const uploadedFilesCount = mediaAssets.filter(a => a.url && a.url.startsWith('/uploads/')).length;
  const isQuotaFull = uploadedFilesCount >= MAX_AUDIO_LIMIT;

  const handleToggleAuthorize = async (asset: any) => {
    const newStatus = !asset.isAuthorized;
    setActionLoadingId(asset.id);

    // Optimistic UI state update
    setMediaAssets(prev => prev.map(m => m.id === asset.id ? { ...m, isAuthorized: newStatus } : m));

    try {
      const res = await fetch(`/api/media/${asset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAuthorized: newStatus })
      });
      if (res.ok) {
        fetchMedia();
        if (newStatus) {
          showToast(
            "Asset Authorized Successfully", 
            `"${asset.title}" is now authorized for on-air broadcast and production.`, 
            "success"
          );
        } else {
          showToast(
            "Authorization Revoked", 
            `"${asset.title}" has been removed from authorized broadcast status.`, 
            "info"
          );
        }
      } else {
        setMediaAssets(prev => prev.map(m => m.id === asset.id ? { ...m, isAuthorized: asset.isAuthorized } : m));
        showToast("Error", "Failed to update authorization.", "warning");
      }
    } catch (e) {
      console.error(e);
      setMediaAssets(prev => prev.map(m => m.id === asset.id ? { ...m, isAuthorized: asset.isAuthorized } : m));
      showToast("Error", "Network error updating authorization.", "warning");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSetLiveBroadcast = async (asset: any) => {
    setActionLoadingId(asset.id);
    try {
      const res = await fetch(`/api/media/${asset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAuthorized: true, isActiveBroadcast: true })
      });
      if (res.ok) {
        fetchMedia();
        showToast(
          "🔴 Live Broadcast Feed Activated", 
          `"${asset.title}" is now transmitting live on ${asset.type === 'Video' ? '360 Digital TV' : 'Radio 98.5 FM'}.`,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/') || file.name.match(/\.(mp4|mov|avi|mkv|webm)$/i)) {
        alert("Direct video file uploads are disabled to save server storage. Please switch to the 'Video URL' tab!");
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File is too large! Maximum allowed audio size is ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/') || file.name.match(/\.(mp4|mov|avi|mkv|webm)$/i)) {
        alert("Direct video file uploads are disabled to save server storage. Please switch to the 'Video URL' tab!");
        return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File is too large! Maximum allowed audio size is ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Please provide an asset title.");
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

        const mediaRes = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category,
            type: 'Audio',
            size: sizeMB,
            url: uploadResult.url,
            isAuthorized: false
          })
        });

        if (mediaRes.ok) {
          setIsUploadModalOpen(false);
          setSelectedFile(null);
          setFormData({ title: '', category: 'Station Jingle', targetMedium: 'Radio (98.5 FM)' });
          fetchMedia();
          showToast("Audio Ingested", `"${formData.title}" uploaded and queued for authorization.`, "success");
        }
      } else if (ingestMode === 'audio_url') {
        if (!externalUrl) {
          alert("Please provide an audio stream or file URL.");
          setIsUploading(false);
          return;
        }

        const mediaRes = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category || 'External Audio',
            type: 'Audio',
            size: 'Audio Stream',
            url: externalUrl,
            isAuthorized: false
          })
        });

        if (mediaRes.ok) {
          setIsUploadModalOpen(false);
          setExternalUrl('');
          setFormData({ title: '', category: 'Station Jingle', targetMedium: 'Radio (98.5 FM)' });
          fetchMedia();
          showToast("Audio URL Saved", `"${formData.title}" queued for authorization.`, "success");
        }
      } else {
        if (!externalUrl) {
          alert("Please provide a YouTube, TikTok, or video stream URL.");
          setIsUploading(false);
          return;
        }

        const isYouTube = externalUrl.includes('youtube.com') || externalUrl.includes('youtu.be');
        const isTikTok = externalUrl.includes('tiktok.com');
        const categoryTag = isYouTube ? 'YouTube Video' : isTikTok ? 'TikTok Video' : 'External Stream';

        const mediaRes = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category || categoryTag,
            type: 'Video',
            size: 'Cloud Stream',
            url: externalUrl,
            isAuthorized: false
          })
        });

        if (mediaRes.ok) {
          setIsUploadModalOpen(false);
          setExternalUrl('');
          setFormData({ title: '', category: 'Station Jingle', targetMedium: 'Radio (98.5 FM)' });
          fetchMedia();
          showToast("Video Stream Registered", `"${formData.title}" queued for authorization.`, "success");
        }
      }
    } catch (error: any) {
      alert(error.message || "Something went wrong.");
    } finally {
      setIsUploading(false);
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
        showToast("Asset Removed", `"${title}" was deleted and storage quota freed.`, "info");
      } else {
        alert("Failed to delete asset.");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred while deleting.");
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

  return (
    <>
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
              'border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.25)]'
            }`}
          >
            <div className="flex items-start gap-3.5 relative z-10">
              <div className={`p-2 rounded-xl shrink-0 ${
                toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                toast.type === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                'bg-indigo-500/20 text-indigo-400'
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

            {/* 10-Second Countdown Progress Bar */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
              className={`h-1 absolute bottom-0 left-0 ${
                toast.type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                toast.type === 'warning' ? 'bg-gradient-to-r from-amber-500 to-orange-400' :
                'bg-gradient-to-r from-indigo-500 to-blue-400'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 pb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
              <FolderOpen className="w-8 h-8 text-indigo-400" />
              Broadcast Media Storage
            </h1>
            <p className="text-sm font-medium text-slate-400">
              Manage audio jingles and cloud video streams (YouTube / TikTok) for live transmission.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Ingest Asset
            </button>
          </div>
        </div>

        {/* Storage Quota Monitor Banner */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl border ${isQuotaFull ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'}`}>
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">Audio Storage Quota:</h4>
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${isQuotaFull ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                  {uploadedFilesCount} / {MAX_AUDIO_LIMIT} Uploads Used
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isQuotaFull 
                  ? "⚠️ Quota full! To upload more audio, delete an existing video or audio asset below."
                  : `Max ${MAX_FILE_SIZE_MB}MB per audio file. External YouTube/TikTok videos use 0MB quota.`
                }
              </p>
            </div>
          </div>

          {/* Quota Progress Bar */}
          <div className="w-full md:w-64 space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Usage</span>
              <span>{Math.round((uploadedFilesCount / MAX_AUDIO_LIMIT) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div 
                className={`h-full transition-all duration-500 ${isQuotaFull ? 'bg-red-500' : 'bg-indigo-500'}`}
                style={{ width: `${Math.min(100, (uploadedFilesCount / MAX_AUDIO_LIMIT) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : mediaAssets.length === 0 ? (
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800/60 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
            <FolderOpen className="w-16 h-16 text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Media Vault Empty</h3>
            <p className="text-slate-400 text-sm max-w-md mb-6">Upload audio assets or import YouTube/TikTok videos for broadcasts.</p>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 font-bold text-sm px-6 py-2 rounded-xl transition-all"
            >
              Start Ingesting
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mediaAssets.map((asset) => (
              <motion.div 
                key={asset.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-slate-900/50 backdrop-blur-md border rounded-3xl p-5 transition-all group relative overflow-hidden flex flex-col justify-between ${
                  asset.isActiveBroadcast 
                    ? 'border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.2)]' 
                    : 'border-slate-800 hover:border-indigo-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-800 text-indigo-400 group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all">
                        {asset.type === 'Audio' ? (
                          <FileAudio className="w-6 h-6 text-amber-400" />
                        ) : asset.type === 'Video' ? (
                          <FileVideo className="w-6 h-6 text-red-400" />
                        ) : (
                          <FileText className="w-6 h-6 text-blue-400" />
                        )}
                      </div>

                      {/* Play Preview Button for Audio Assets */}
                      {asset.type === 'Audio' && (
                        <button 
                          onClick={() => toggleAudioPreview(asset)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                            playingAssetId === asset.id 
                              ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                              : 'bg-slate-800 hover:bg-amber-500/20 text-amber-400'
                          }`}
                          title="Preview Audio"
                        >
                          {playingAssetId === asset.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                      )}
                    </div>

                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border ${
                      asset.isActiveBroadcast 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : asset.isAuthorized 
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {asset.isActiveBroadcast ? "🔴 ON-AIR" : asset.isAuthorized ? "AUTHORIZED" : "PENDING"}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 truncate" title={asset.title}>{asset.title}</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-4">{asset.category}</p>
                </div>
                
                <div className="space-y-3 pt-3 border-t border-slate-800/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 font-mono">{asset.size}</span>
                    
                    <div className="flex items-center gap-1.5">
                      {asset.type === 'Video' ? (
                        <a 
                          href={asset.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold"
                          title="Open Stream"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <a 
                          href={asset.url} 
                          target="_blank" 
                          download 
                          className="p-2 bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}

                      <button 
                        onClick={() => handleDelete(asset.id, asset.title)}
                        className="p-2 bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-colors"
                        title="Delete asset & free up quota"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Authorization & Broadcast Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button 
                      onClick={() => handleToggleAuthorize(asset)}
                      disabled={actionLoadingId === asset.id}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        asset.isAuthorized 
                          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                      }`}
                    >
                      {actionLoadingId === asset.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : asset.isAuthorized ? (
                        <X className="w-3 h-3" />
                      ) : (
                        <ShieldCheck className="w-3 h-3" />
                      )}
                      {asset.isAuthorized ? "Revoke" : "Authorize"}
                    </button>

                    {asset.isAuthorized && (
                      <button 
                        onClick={() => handleSetLiveBroadcast(asset)}
                        disabled={actionLoadingId === asset.id || asset.isActiveBroadcast}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          asset.isActiveBroadcast 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default' 
                            : 'bg-red-600 hover:bg-red-500 text-white shadow-md'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        {asset.isActiveBroadcast ? "Live" : "Go Live"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Ingest Asset Modal */}
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Upload className="w-6 h-6 text-indigo-400" />
                    Ingest Media Asset
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Upload audio files (max {MAX_FILE_SIZE_MB}MB) or link external streams.</p>
                </div>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white bg-slate-800/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Ingestion Mode Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-6 relative z-10 text-center">
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
                  <FileVideo className="w-3.5 h-3.5" />
                  Video URL
                </button>
              </div>

              {/* Warning if Quota is Reached for Audio File Upload */}
              {ingestMode === 'audio_file' && isQuotaFull && (
                <div className="mb-4 p-4 bg-red-950/60 border border-red-800/80 rounded-2xl flex items-start gap-3 text-xs text-red-300">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white mb-0.5">Audio Upload Quota Full ({MAX_AUDIO_LIMIT}/{MAX_AUDIO_LIMIT})</strong>
                    To upload a new audio file, you must delete an existing video or audio asset from your library. Or use the <strong>Audio URL</strong> tab.
                  </div>
                </div>
              )}

              <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Asset Title <span className="text-indigo-500">*</span></label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder={ingestMode === 'audio_file' ? "e.g., Morning Jingle V2" : ingestMode === 'audio_url' ? "e.g., BBC Hausa Podcast Episode" : "e.g., Dutse Special Documentary"} 
                      className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors font-bold placeholder:text-slate-600"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Category <span className="text-indigo-500">*</span></label>
                      <select 
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors font-bold appearance-none"
                      >
                        {ingestMode !== 'video_url' ? (
                          <>
                            <option>Station Jingle</option>
                            <option>Commercial Advert</option>
                            <option>Interview Audio</option>
                            <option>Program Intro</option>
                            <option>Song / Music Track</option>
                          </>
                        ) : (
                          <>
                            <option>YouTube Stream / Video</option>
                            <option>TikTok Video Feed</option>
                            <option>Live TV Broadcast</option>
                            <option>News Video Clip</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Target Medium <span className="text-indigo-500">*</span></label>
                      <select 
                        value={formData.targetMedium}
                        onChange={e => setFormData({...formData, targetMedium: e.target.value})}
                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors font-bold appearance-none"
                      >
                        <option>Radio (98.5 FM)</option>
                        <option>Television (360 TV)</option>
                        <option>Cross-Platform (Both)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {ingestMode === 'audio_file' ? (
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Audio File (.mp3, .wav, .aac up to {MAX_FILE_SIZE_MB}MB) <span className="text-indigo-500">*</span></label>
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => !isQuotaFull && fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group ${
                        isQuotaFull 
                          ? 'border-red-800 bg-red-950/20 cursor-not-allowed'
                          : selectedFile 
                            ? 'border-amber-500 bg-amber-500/10' 
                            : 'border-slate-700 hover:border-amber-500 bg-slate-800/30'
                      }`}
                    >
                      <input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        accept="audio/*"
                        disabled={isQuotaFull}
                      />
                      {selectedFile ? (
                        <>
                          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-6 h-6 text-amber-400" />
                          </div>
                          <h4 className="font-bold text-white mb-1 truncate max-w-[200px]">{selectedFile.name}</h4>
                          <p className="text-xs text-amber-400 font-bold">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload</p>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors mb-4">
                            <FileAudio className="w-6 h-6 text-amber-400" />
                          </div>
                          <h4 className="font-bold text-white mb-1">{isQuotaFull ? "Upload disabled (Quota full)" : "Click or drag audio file here"}</h4>
                          <p className="text-xs text-slate-400 font-medium">Supports MP3, WAV, AAC up to {MAX_FILE_SIZE_MB}MB</p>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                      {ingestMode === 'audio_url' ? "Direct Audio Stream / File URL" : "External Video URL (YouTube / TikTok / Live Stream)"} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <input 
                        type="url" 
                        value={externalUrl}
                        onChange={e => setExternalUrl(e.target.value)}
                        placeholder={ingestMode === 'audio_url' ? "https://example.com/audio.mp3 or podcast feed..." : "https://www.youtube.com/watch?v=... or https://www.tiktok.com/@..."}
                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors font-mono text-sm placeholder:text-slate-600"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      💡 Uses 0MB server quota by streaming directly from the external cloud host.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 mt-8">
                  <button 
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isUploading || (ingestMode === 'audio_file' && (!selectedFile || isQuotaFull)) || (ingestMode !== 'audio_file' && !externalUrl)}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all flex items-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} 
                    {isUploading ? 'Processing...' : 'Save Media Asset'}
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
