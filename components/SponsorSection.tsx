"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Sparkles, X, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CommercialCampaign {
  id: string;
  clientName: string;
  title: string;
  targetMedia: string;
  placement: string;
  value: number;
  startDate: string;
  endDate: string;
  status: string;
}

export default function SponsorSection() {
  const [campaigns, setCampaigns] = useState<CommercialCampaign[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    targetPlatform: 'BOTH',
    budgetRange: 'Standard (₦150k - ₦500k)'
  });

  useEffect(() => {
    let isMounted = true;
    const fetchCampaigns = async () => {
      try {
        const res = await fetch('/api/commercials', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            // Find active campaigns
            const activeOnly = data.filter((c: any) => c.status === 'ACTIVE' || c.status === 'Active' || c.status === 'Running');
            setCampaigns(activeOnly);
          }
        }
      } catch (err) {
        console.warn("Commercials load notice:", err);
      }
    };
    fetchCampaigns();
    return () => { isMounted = false; };
  }, []);

  // Cycle through active campaigns if multiple exist
  useEffect(() => {
    if (campaigns.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % campaigns.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [campaigns.length]);

  if (isDismissed) return null;

  const currentAd = campaigns[activeIdx] || {
    title: "Jigawa Agro-Allied Fertilizer Campaign",
    clientName: "Jigawa State Agricultural Development Authority",
    placement: "Morning News & Afternoon Drive",
    targetMedia: "BOTH"
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setIsInquiryModalOpen(false);
      setInquirySubmitted(false);
      setInquiryForm({
        businessName: '',
        contactPerson: '',
        phone: '',
        targetPlatform: 'BOTH',
        budgetRange: 'Standard (₦150k - ₦500k)'
      });
    }, 2000);
  };

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="group relative bg-[#0a0f1d] rounded-3xl p-6 sm:p-8 md:p-14 shadow-2xl overflow-hidden transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          
          {/* Animated Ambient Glows */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] animate-pulse group-hover:bg-blue-500/40 transition-colors duration-700" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px] animate-pulse delay-1000 group-hover:bg-emerald-500/30 transition-colors duration-700" />
          
          {/* Top Dismiss Button (X) */}
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-4 right-4 z-20 text-slate-500 hover:text-white p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-colors"
            title="Dismiss Sponsor Billboard"
            aria-label="Dismiss Sponsor Billboard"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-yellow-400 font-bold text-xs tracking-wider uppercase shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Featured Station Sponsor</span>
                  {(() => {
                    const m = (currentAd.targetMedia || '').toUpperCase();
                    if (m.includes('AUDIO') || m.includes('RADIO') || m.includes('98.5')) {
                      return <span className="text-blue-400 ml-1">• 98.5 FM RADIO</span>;
                    }
                    if (m.includes('VIDEO') || m.includes('TELEVISION') || m.includes('TV')) {
                      return <span className="text-red-400 ml-1">• 360 DIGITAL TV</span>;
                    }
                    return <span className="text-emerald-400 ml-1">• FM &amp; TV SIMULCAST</span>;
                  })()}
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {currentAd.title}
                </h2>

                <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
                  <span className="font-semibold text-white">Client:</span> {currentAd.clientName}{" "}
                  <span className="mx-2 text-slate-600">|</span>{" "}
                  <span className="font-semibold text-white">Slot:</span> {currentAd.placement || "Prime Time Broadcast"}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div className="shrink-0 relative w-full md:w-auto">
              <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <button 
                onClick={() => setIsInquiryModalOpen(true)}
                className="relative w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-4 rounded-2xl transition-all transform md:hover:scale-105 active:scale-95 shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 tracking-wide text-sm"
              >
                <Megaphone className="w-4 h-4 text-slate-950" />
                <span>Advertise with 360 Media</span>
              </button>
            </div>

          </div>

          {/* Multi-campaign indicators */}
          {campaigns.length > 1 && (
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mr-2">Commercial Roster:</span>
              <div className="flex gap-2">
                {campaigns.map((c, i) => (
                  <button
                    key={c.id || i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-2 rounded-full transition-all ${
                      activeIdx === i ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Interactive Advertising Rate Card & Inquiry Modal */}
      <AnimatePresence>
        {isInquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-[#020817]/80 backdrop-blur-md" 
              onClick={() => setIsInquiryModalOpen(false)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl relative z-10 shadow-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Broadcast Advertising Rates</h3>
                      <p className="text-xs text-slate-400">Reach millions across Radio (98.5 FM) and 360 Digital TV</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsInquiryModalOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {inquirySubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Inquiry Received</h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Our commercial traffic team will contact you within 2 business hours with official rate cards and slot availability.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 font-bold">
                          Organization / Brand Name *
                        </label>
                        <input 
                          type="text"
                          required
                          value={inquiryForm.businessName}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, businessName: e.target.value })}
                          placeholder="e.g. Dangote Agro Ltd"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 font-bold">
                          Contact Person *
                        </label>
                        <input 
                          type="text"
                          required
                          value={inquiryForm.contactPerson}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, contactPerson: e.target.value })}
                          placeholder="e.g. Marketing Lead"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 font-bold">
                          Phone Number *
                        </label>
                        <input 
                          type="tel"
                          required
                          value={inquiryForm.phone}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                          placeholder="+234 803 000 0000"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 font-bold">
                          Target Medium
                        </label>
                        <select 
                          value={inquiryForm.targetPlatform}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, targetPlatform: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="RADIO">Radio Only (98.5 FM)</option>
                          <option value="TV">360 Digital TV Only</option>
                          <option value="BOTH">Simulcast (Radio &amp; TV)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 font-bold">
                        Estimated Campaign Budget
                      </label>
                      <select 
                        value={inquiryForm.budgetRange}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, budgetRange: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Starter">Starter Tier (₦50,000 - ₦150,000)</option>
                        <option value="Standard">Standard (₦150,000 - ₦500,000)</option>
                        <option value="Prime">Prime Sponsorship (&gt; ₦500,000)</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <a href="tel:+2349029535000" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" /> +234 902 953 5000
                        </a>
                      </div>

                      <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                      >
                        <span>Submit Booking</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
