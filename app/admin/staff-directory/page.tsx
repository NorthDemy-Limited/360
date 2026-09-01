"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Trash2, 
  X, 
  Users, 
  Loader2, 
  ShieldCheck, 
  KeyRound, 
  Copy, 
  Check, 
  RefreshCw, 
  Edit3, 
  CheckCircle2,
  Camera,
  AlertCircle
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  phone: string | null;
  password?: string;
  mustChangePassword?: boolean;
  createdAt: string;
}

const ROLES = [
  { id: "STATION_MANAGER", label: "Station Manager", desc: "Master control, compliance, and broadcast authorizations", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
  { id: "NEWS_EDITOR", label: "News Editor", desc: "Newsroom editorial desk, articles, and bulletins", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
  { id: "PROGRAM_OFFICER", label: "Program Officer", desc: "Broadcast program line-up, traffic, and schedules", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { id: "PRESENTER", label: "On-Air Presenter", desc: "Studio live shows, mic feeds, and studio presence", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  { id: "ENGINEERING", label: "Broadcast Engineer", desc: "TX transmitter, satellite feeds, and studio acoustics", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" }
];

export default function StaffDirectoryPage() {
  const [activeTab, setActiveTab] = useState("All Staff");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Modals
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [provisionedCredential, setProvisionedCredential] = useState<StaffMember | null>(null);
  const [copied, setCopied] = useState(false);

  // Floating Toast Notification
  const [toast, setToast] = useState<{ title: string; message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const toastTimerRef = useRef<any>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ title, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 8000);
  };

  // Form Data for Provisioning
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "PRESENTER",
    phone: "",
    avatar: "",
    password: ""
  });

  const [editFormData, setEditFormData] = useState<{
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    avatar: string;
    newPassword?: string;
  } | null>(null);

  // Generate random passkey
  const generatePasskey = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "360-";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/staff", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStaffList(data);
      }
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const openProvisionModal = () => {
    setFormData({
      name: "",
      email: "",
      role: "PRESENTER",
      phone: "",
      avatar: "",
      password: generatePasskey()
    });
    setIsProvisionModalOpen(true);
  };

  const handleProvisionStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and Work Email are required.");
      return;
    }

    setActionLoadingId("provision");
    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role,
          phone: formData.phone.trim() || null,
          avatar: formData.avatar.trim() || null, // Will remain null if not provided
          password: formData.password.trim() || generatePasskey()
        })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to provision staff account");
      }

      setIsProvisionModalOpen(false);
      setProvisionedCredential(result);
      fetchStaff();
      showToast("Staff Account Provisioned", `Created credentials for ${result.name} (${result.role}).`, "success");
    } catch (err: any) {
      alert(err.message || "Failed to create staff member");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData) return;

    setActionLoadingId(editFormData.id);
    try {
      const res = await fetch(`/api/staff/${editFormData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editFormData.name.trim(),
          email: editFormData.email.trim(),
          role: editFormData.role,
          phone: editFormData.phone.trim() || null,
          avatar: editFormData.avatar.trim() || null,
          password: editFormData.newPassword?.trim() ? editFormData.newPassword.trim() : undefined
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update staff");
      }

      setIsEditModalOpen(false);
      setEditFormData(null);
      fetchStaff();
      showToast("Profile Updated", "Staff details updated successfully.", "info");
    } catch (err: any) {
      alert(err.message || "Failed to update staff member");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteStaff = async (member: StaffMember) => {
    if (!confirm(`Are you sure you want to remove ${member.name} (${member.role}) from the station directory? This will revoke their portal access.`)) {
      return;
    }

    setActionLoadingId(member.id);
    try {
      const res = await fetch(`/api/staff?id=${member.id}`, { method: "DELETE" });
      if (res.ok) {
        fetchStaff();
        showToast("Staff Member Removed", `${member.name} was removed from the roster.`, "info");
      } else {
        alert("Failed to delete staff member.");
      }
    } catch {
      alert("Error deleting staff member.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const copyCredentialSlip = () => {
    if (!provisionedCredential) return;
    const slip = `==============================
360 BROADCAST NETWORK • STAFF CREDENTIALS
==============================
Staff Name:    ${provisionedCredential.name}
Role / Desk:   ${provisionedCredential.role}
Portal Login:  ${provisionedCredential.email}
Initial Pass:  ${provisionedCredential.password}
Login URL:     http://localhost:3001/admin/login
==============================
Please sign in and update your password on first launch.`;
    navigator.clipboard.writeText(slip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const filteredStaff = staffList.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) || person.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All Staff" || person.role === activeTab;
    return matchesSearch && matchesTab;
  });

  const tabOptions = ["All Staff", "STATION_MANAGER", "NEWS_EDITOR", "PROGRAM_OFFICER", "PRESENTER", "ENGINEERING"];

  return (
    <div className="space-y-8 relative min-h-full pb-16 font-sans text-slate-100">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 max-w-md w-[calc(100%-3rem)] bg-slate-900/95 backdrop-blur-xl border rounded-2xl p-4 shadow-2xl ${
              toast.type === 'success' ? 'border-emerald-500/50 text-white' :
              toast.type === 'error' ? 'border-red-500/50 text-white' :
              'border-blue-500/50 text-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-sm font-bold">{toast.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
              <button onClick={() => setToast(null)} className="text-slate-500 hover:text-white p-1 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block mb-2">
            STATION ADMINISTRATION • MODULE 7
          </span>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Staff Directory &amp; Role Provisioning
          </h1>
          <p className="text-xs text-slate-400 font-medium max-w-xl mt-1">
            Provision official staff credentials, assign station authority roles, and manage internal broadcast access.
          </p>
        </div>

        <button 
          onClick={openProvisionModal}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> Provision Staff Account
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-11 pr-4 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/80 transition-all font-mono"
          />
        </div>
        
        {/* Role Tabs */}
        <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {tabOptions.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all shrink-0 ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-slate-900/40 text-slate-400 hover:text-white border border-slate-800/80 hover:bg-slate-800/60'
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Roster Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : filteredStaff.length === 0 ? (
        <div className="bg-slate-900/30 rounded-3xl p-12 border border-slate-800/60 flex flex-col items-center justify-center text-center">
          <Users className="w-12 h-12 text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Staff Profiles Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-6">
            {searchQuery ? "No staff matches your current filter query." : "No staff accounts provisioned in this category yet."}
          </p>
          <button 
            onClick={openProvisionModal}
            className="px-5 py-2 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 text-xs font-bold transition-colors"
          >
            Provision First Staff
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredStaff.map((member) => {
            const roleConfig = ROLES.find(r => r.id === member.role) || {
              id: member.role,
              label: member.role,
              color: "text-slate-400 border-slate-700 bg-slate-800/50"
            };

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between transition-all group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar: If image provided, render image; otherwise render clean monogram initials without dummy photo */}
                      {member.avatar ? (
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-slate-200 font-mono font-black text-sm shadow-inner tracking-wider">
                          {getInitials(member.name)}
                        </div>
                      )}

                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                          {member.name}
                        </h3>
                        <span className={`inline-block text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mt-1.5 ${roleConfig.color}`}>
                          {roleConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-mono text-[11px] text-slate-400 py-3 border-t border-slate-800/60">
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                  <div className="text-[10px] font-mono text-slate-500">
                    ID: {member.id.substring(member.id.length - 6)}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditFormData({
                          id: member.id,
                          name: member.name,
                          email: member.email,
                          role: member.role,
                          phone: member.phone || "",
                          avatar: member.avatar || "",
                          newPassword: ""
                        });
                        setIsEditModalOpen(true);
                      }}
                      className="p-2 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs transition-colors"
                      title="Edit Staff Role / Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteStaff(member)}
                      disabled={actionLoadingId === member.id}
                      className="p-2 bg-slate-800/60 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg text-xs transition-colors"
                      title="Delete Staff Member Profile"
                    >
                      {actionLoadingId === member.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: Provision New Staff Member */}
      <AnimatePresence>
        {isProvisionModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    Provision Staff Account
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Admin-only generation of internal credentials.</p>
                </div>
                <button onClick={() => setIsProvisionModalOpen(false)} className="text-slate-500 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleProvisionStaff} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Hadiza Ibrahim Gumel"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                    Work Email (Login Identity) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g., hadiza.gumel@360radiotv.ng"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                      Assign Station Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    >
                      {ROLES.map(r => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 803 000 0000"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      Initial Temporary Passkey *
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFormData({ ...formData, password: generatePasskey() })}
                      className="text-[10px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Regenerate
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono font-bold tracking-wider"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                    Profile Picture URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.avatar}
                    onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="Leave blank for clean monogram initials"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    💡 If empty, the staff avatar remains blank (no random photos automatically added).
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 mt-6">
                  <button 
                    type="button"
                    onClick={() => setIsProvisionModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white font-mono"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={actionLoadingId === "provision"}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    {actionLoadingId === "provision" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                    Provision Credentials
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Credential Slip Onboarding Confirmation */}
      <AnimatePresence>
        {provisionedCredential && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_0_50px_rgba(16,185,129,0.15)] text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h2 className="text-lg font-bold text-white">Staff Account Provisioned</h2>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Share this credential slip with the staff member. They will use it for their initial login.
              </p>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left font-mono text-xs space-y-2 mb-6 shadow-inner">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-500">Name:</span>
                  <span className="text-white font-bold">{provisionedCredential.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-500">Assigned Role:</span>
                  <span className="text-blue-400 font-bold">{provisionedCredential.role}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-500">Work Email:</span>
                  <span className="text-white">{provisionedCredential.email}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-500">Temporary Passkey:</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {provisionedCredential.password}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={copyCredentialSlip}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied to Clipboard!" : "Copy Credential Slip"}
                </button>
                <button
                  onClick={() => setProvisionedCredential(null)}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Edit Staff Member */}
      <AnimatePresence>
        {isEditModalOpen && editFormData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-blue-400" />
                    Edit Staff Profile
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Modify authority role or reset security passkey.</p>
                </div>
                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                    Staff Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                    Work Email (Login Identity)
                  </label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                      Station Authority Role
                    </label>
                    <select
                      value={editFormData.role}
                      onChange={e => setEditFormData({ ...editFormData, role: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    >
                      {ROLES.map(r => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editFormData.phone}
                      onChange={e => setEditFormData({ ...editFormData, phone: e.target.value })}
                      placeholder="+234 803 000 0000"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                    Reset Security Passkey (Optional)
                  </label>
                  <input
                    type="text"
                    value={editFormData.newPassword || ""}
                    onChange={e => setEditFormData({ ...editFormData, newPassword: e.target.value })}
                    placeholder="Leave blank to keep existing password"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1.5">
                    Avatar Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editFormData.avatar}
                    onChange={e => setEditFormData({ ...editFormData, avatar: e.target.value })}
                    placeholder="Leave blank to use clean monogram"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 mt-6">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white font-mono"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={actionLoadingId === editFormData.id}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    {actionLoadingId === editFormData.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    Save Changes
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
