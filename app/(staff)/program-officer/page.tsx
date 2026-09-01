"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  CalendarDays, 
  Radio, 
  Clock, 
  Settings2, 
  MoreVertical,
  X,
  CheckCircle2,
  CalendarPlus,
  Loader2,
  Trash2,
  Edit2
} from 'lucide-react';

export default function ProgramOfficerDashboard() {
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time state for custom time picker
  const [startTimeInput, setStartTimeInput] = useState({ hour: '12', minute: '00', ampm: 'AM' });
  const [endTimeInput, setEndTimeInput] = useState({ hour: '01', minute: '00', ampm: 'PM' });

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    type: 'RADIO',
    description: '',
    hostId: ''
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [scheduleRes, usersRes] = await Promise.all([
        fetch('/api/schedule'),
        fetch('/api/staff')
      ]);
      if (scheduleRes.ok) {
        setPrograms(await scheduleRes.json());
      }
      if (usersRes.ok) {
        setUsers(await usersRes.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (prog?: any) => {
    if (prog) {
      const start = new Date(prog.startTime);
      const end = new Date(prog.endTime);
      
      const parseTime = (date: Date) => {
        let h = date.getHours();
        const m = date.getMinutes().toString().padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        if (h === 0) h = 12;
        return { hour: h.toString().padStart(2, '0'), minute: m, ampm };
      };

      setFormData({
        id: prog.id,
        title: prog.title,
        type: prog.type,
        description: prog.description || '',
        hostId: prog.hostId
      });
      setStartTimeInput(parseTime(start));
      setEndTimeInput(parseTime(end));
    } else {
      setFormData({ id: '', title: '', type: 'RADIO', description: '', hostId: '' });
      setStartTimeInput({ hour: '12', minute: '00', ampm: 'AM' });
      setEndTimeInput({ hour: '01', minute: '00', ampm: 'PM' });
    }
    setIsEditorModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this scheduled program?")) return;
    try {
      const res = await fetch(`/api/schedule/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveProgram = async () => {
    if (!formData.title || !formData.hostId) {
      alert("Please fill all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const today = new Date();
      
      const constructDate = (timeObj: any) => {
        const d = new Date(today);
        let h = parseInt(timeObj.hour);
        if (timeObj.ampm === 'PM' && h !== 12) h += 12;
        if (timeObj.ampm === 'AM' && h === 12) h = 0;
        d.setHours(h, parseInt(timeObj.minute), 0, 0);
        return d;
      };

      const startDateTime = constructDate(startTimeInput);
      const endDateTime = constructDate(endTimeInput);

      const url = formData.id ? `/api/schedule/${formData.id}` : '/api/schedule';
      const method = formData.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          type: formData.type,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          hostId: formData.hostId
        })
      });

      if (res.ok) {
        setIsEditorModalOpen(false);
        fetchData();
      } else {
        const error = await res.json();
        alert("Failed to save: " + JSON.stringify(error));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatus = (prog: any) => {
    const now = new Date();
    const start = new Date(prog.startTime);
    const end = new Date(prog.endTime);
    
    if (now < start) return { label: 'Scheduled', type: 'scheduled' };
    if (now >= start && now <= end) return { label: 'On Air', type: 'onair' };
    return { label: 'Completed', type: 'completed' };
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Custom Time Picker Component
  const TimePicker = ({ label, value, onChange }: any) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label} <span className="text-blue-500">*</span></label>
      <div className="flex items-center gap-2">
        <select 
          value={value.hour} 
          onChange={e => onChange({...value, hour: e.target.value})}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-blue-500 appearance-none text-center"
        >
          {Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        <span className="text-slate-400 font-bold">:</span>
        <select 
          value={value.minute} 
          onChange={e => onChange({...value, minute: e.target.value})}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-blue-500 appearance-none text-center"
        >
          {Array.from({length: 60}, (_, i) => i.toString().padStart(2, '0')).map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <div className="flex bg-slate-950 border border-slate-800 rounded-xl overflow-hidden ml-2">
          <button 
            type="button"
            onClick={() => onChange({...value, ampm: 'AM'})}
            className={`px-4 py-3 text-xs font-bold transition-colors ${value.ampm === 'AM' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            AM
          </button>
          <button 
            type="button"
            onClick={() => onChange({...value, ampm: 'PM'})}
            className={`px-4 py-3 text-xs font-bold transition-colors ${value.ampm === 'PM' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="show">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl group">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20">
              <CalendarDays className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Today's Broadcasts</h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-extrabold text-white font-mono tracking-tight">{programs.length}</span>
            <span className="text-xs text-slate-400 mb-1 font-medium">Shows Logged</span>
          </div>
        </motion.div>
        
        {/* Unassigned slots and studio utilization metrics kept static for visual appeal */}
      </div>

      <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/60 shadow-xl overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/50">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Master Program Grid</h3>
            <p className="text-xs text-slate-400 font-medium">Manage studio timetables, host assignments, and broadcast streams.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => openModal()}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center gap-2"
            >
              <CalendarPlus className="w-4 h-4" /> Book Slot
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-[10px] uppercase tracking-widest font-bold text-slate-500">
                <th className="px-6 py-4">Time Slot</th>
                <th className="px-6 py-4">Program & Category</th>
                <th className="px-6 py-4 text-center">Medium</th>
                <th className="px-6 py-4">Assigned Crew</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />Loading...</td></tr>
              ) : programs.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No programs scheduled.</td></tr>
              ) : programs.map((prog) => {
                const status = getStatus(prog);
                return (
                  <tr key={prog.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-300 font-mono tracking-tight whitespace-nowrap">
                        {new Date(prog.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                        {new Date(prog.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <h4 className="text-sm font-bold text-slate-200 mb-1 group-hover:text-blue-400 transition-colors whitespace-nowrap">{prog.title}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{prog.type}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border shadow-sm whitespace-nowrap ${
                        prog.type === 'BOTH' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        prog.type === 'RADIO' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {prog.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {prog.host?.avatar ? (
                          <img src={prog.host.avatar} alt="host" className="w-6 h-6 rounded-full" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
                            {prog.host?.name?.charAt(0) || '?'}
                          </div>
                        )}
                        <p className="text-xs font-bold text-slate-300 whitespace-nowrap">{prog.host?.name || 'Unassigned'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {status.type === 'onair' && (
                        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm bg-emerald-500/10 text-emerald-400 border-emerald-500/20 inline-flex items-center gap-1.5 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          ON AIR
                        </span>
                      )}
                      {status.type === 'scheduled' && (
                        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm bg-blue-500/10 text-blue-400 border-blue-500/20 whitespace-nowrap">
                          Scheduled
                        </span>
                      )}
                      {status.type === 'completed' && (
                        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm bg-slate-800 text-slate-400 border-slate-700 whitespace-nowrap">
                          Completed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openModal(prog)} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(prog.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" onClick={() => setIsEditorModalOpen(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl relative z-10 shadow-2xl flex flex-col max-h-full overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-xl border border-blue-500/20">
                  <CalendarPlus className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{formData.id ? 'Edit Slot' : 'Program Scheduler'}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{formData.id ? 'Modify Airtime Slot' : 'New Airtime Slot'}</p>
                </div>
              </div>
              <button onClick={() => setIsEditorModalOpen(false)} className="text-slate-500 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-xl transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 admin-sidebar-scrollbar">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Program Name <span className="text-blue-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter program title..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-700" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Medium / Stream <span className="text-blue-500">*</span></label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="RADIO">Radio 98.5 FM</option>
                    <option value="TV">360 Digital TV</option>
                    <option value="BOTH">Both (Simulcast)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Host / Presenter <span className="text-blue-500">*</span></label>
                  <select 
                    value={formData.hostId}
                    onChange={(e) => setFormData({...formData, hostId: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="" disabled>Select a Host</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TimePicker label="Start Time" value={startTimeInput} onChange={setStartTimeInput} />
                <TimePicker label="End Time" value={endTimeInput} onChange={setEndTimeInput} />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Program Rundown (Internal Notes)</label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Topic outline, guest names, or special cues..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none placeholder:text-slate-700"
                ></textarea>
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 shrink-0 bg-slate-900/80 flex items-center justify-end gap-4">
              <button onClick={() => setIsEditorModalOpen(false)} className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleSaveProgram}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} 
                {isSubmitting ? 'Saving...' : 'Save Slot'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
