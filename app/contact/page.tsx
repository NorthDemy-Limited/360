"use client";

import React from 'react';

export default function ContactPage() {
  return (
    <div className="bg-[#050a15] min-h-screen relative overflow-hidden">
      
      {/* Ambient Dark Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-20 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up" style={{ animationDelay: '0s' }}>
          <span className="inline-block bg-blue-500/10 text-blue-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-4 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
            Contact 360 Radio & TV Studio
          </h1>
          <p className="text-slate-400 font-medium">
            Reach out for news tips, station advert placement, program sponsorship, or listener feedback.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Info Cards & Map */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            
            {/* Info Box */}
            <div className="bg-[#0f172a] rounded-3xl p-8 border border-white/5 shadow-sm space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] -mt-10 -mr-10"></div>
              
              {/* Address */}
              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-colors">
                  <svg className="text-blue-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Physical Address</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    No. 1 Broad Street, Commercial District, Dutse, Jigawa State, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">
                  <svg className="text-emerald-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Phone Lines</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    <a href="tel:+2349029535000" className="hover:text-emerald-400 transition-colors">+234 902 953 5000</a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-colors">
                  <svg className="text-purple-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email Address</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    info@360radiotv.ng
                  </p>
                </div>
              </div>
            </div>

            {/* Dark Map Hub */}
            <div className="bg-[#0f172a] rounded-3xl p-1 border border-white/5 shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#080d19] opacity-90 z-0 rounded-[23px]"></div>
              
              {/* Fake Map Grid Pattern */}
              <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
              
              <div className="relative z-10 p-5 h-48 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse"></span>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Dutse Broadcaster Hub Map</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 opacity-60">11.7011° N, 9.3338° E</span>
                </div>
                
                <div className="bg-[#050a15]/80 backdrop-blur-md rounded-xl p-3 border border-white/5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-start gap-2">
                    <svg className="text-red-500 shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <div>
                      <p className="text-xs font-bold text-white leading-snug">Commercial District, Broad Street Corridor, Dutse Municipality, Jigawa State.</p>
                      <p className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider">Opposite Federal Secretariat Complex • Dutse Capital Territory</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full lg:w-2/3 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-[#0f172a] rounded-3xl p-8 md:p-12 border border-white/5 shadow-sm">
              <h2 className="text-2xl font-bold text-white mb-8">Send Us a Direct Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="e.g. Garba Usman" 
                      className="w-full bg-[#050a15] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      placeholder="e.g. garba@example.com" 
                      className="w-full bg-[#050a15] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+234..." 
                      className="w-full bg-[#050a15] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inquiry Subject</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Radio Advert Rates" 
                      className="w-full bg-[#050a15] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message Content <span className="text-red-500">*</span></label>
                  <textarea 
                    rows={5}
                    placeholder="Type your message or news tip here..." 
                    className="w-full bg-[#050a15] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner resize-none"
                  ></textarea>
                </div>

                <button 
                  type="button" 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 group"
                >
                  <svg className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  Submit Contact Message
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
