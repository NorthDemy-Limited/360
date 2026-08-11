"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Search, Filter, Upload, MoreVertical, X, FileAudio, FileVideo, CheckCircle2 } from 'lucide-react';

export default function MediaStoragePage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
              <FolderOpen className="w-8 h-8 text-indigo-400" />
              Broadcast Media Storage
            </h1>
            <p className="text-sm font-medium text-slate-400">Manage audio and video assets for live transmission.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Upload Asset
            </button>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-800/60 shadow-xl min-h-[400px] flex flex-col items-center justify-center text-center">
          <FolderOpen className="w-16 h-16 text-slate-700 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Media Vault Connected</h3>
          <p className="text-slate-400 text-sm max-w-md">The centralized media storage system is active. Asset synchronization with Studio A and Studio B is currently optimal.</p>
        </div>
      </motion.div>

      {/* Upload Asset Modal */}
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
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Upload className="w-6 h-6 text-indigo-400" />
                    Ingest Media Asset
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Upload files directly to the centralized broadcast storage.</p>
                </div>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white bg-slate-800/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-5 relative z-10" onSubmit={(e) => { e.preventDefault(); setIsUploadModalOpen(false); }}>
                
                {/* Asset Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Asset Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Morning Jingle V2" 
                      className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 font-medium"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                      <select className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors font-medium appearance-none">
                        <option>Station Jingle</option>
                        <option>Commercial Advert</option>
                        <option>News B-Roll</option>
                        <option>Interview Audio</option>
                        <option>Program Intro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Target Medium</label>
                      <select className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors font-medium appearance-none">
                        <option>Radio (98.5 FM)</option>
                        <option>Television (360 TV)</option>
                        <option>Cross-Platform (Both)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Drag and Drop Zone */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Media File</label>
                  <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-800/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
                    <div className="flex gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                        <FileAudio className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                        <FileVideo className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>
                    <h4 className="font-bold text-white mb-1">Click or drag file to this area to upload</h4>
                    <p className="text-xs text-slate-400 font-medium">Supports MP3, WAV, MP4, and MOV formats up to 500MB.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 mt-8">
                  <button 
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Finalize Upload
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
