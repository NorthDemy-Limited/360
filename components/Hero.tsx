export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050a15]">
      <style>{`
        @keyframes dynamicZoomDutse {
          0% { 
            transform: scale(1.0); 
            filter: brightness(1.5) contrast(1.25);
          }
          100% { 
            transform: scale(3.5); 
            filter: brightness(1.1) contrast(1.4);
          }
        }
        @keyframes radarPing {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
      `}</style>
      
      {/* Premium Background Adapter with Continuous Dynamic Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a15] via-[#050a15]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000" 
          alt="Jigawa Dutse Tech Map" 
          className="w-full h-full object-cover opacity-40 mix-blend-screen hue-rotate-180"
          style={{ 
            animation: 'dynamicZoomDutse 20s infinite alternate ease-in-out',
            transformOrigin: '40% 30%' 
          }}
        />
        
        {/* Animated dynamic pinpoint adaptors */}
        <div className="absolute top-[30%] left-[40%] z-10">
          <div className="w-3 h-3 bg-brand-accent rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(0,208,132,1)]" />
          <div className="w-16 h-16 border-2 border-brand-accent rounded-full absolute top-1/2 left-1/2" style={{ animation: 'radarPing 3s infinite cubic-bezier(0.215, 0.61, 0.355, 1)' }} />
          <div className="w-24 h-24 border border-brand-accent/50 rounded-full absolute top-1/2 left-1/2" style={{ animation: 'radarPing 3s infinite cubic-bezier(0.215, 0.61, 0.355, 1) 1s' }} />
        </div>
        
        <div className="absolute bottom-[35%] right-[25%] z-10">
          <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(59,130,246,1)]" />
          <div className="w-12 h-12 border-2 border-blue-400 rounded-full absolute top-1/2 left-1/2" style={{ animation: 'radarPing 4s infinite cubic-bezier(0.215, 0.61, 0.355, 1) 2s' }} />
        </div>
        
        {/* Ambient glow clouds */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px] animate-pulse z-0" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] animate-pulse delay-1000 z-0" />
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">Broadcasting Live • Dutse, Jigawa</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              360 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Radio</span> <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">&amp; Television</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-light">
              Voice of the Horizon – Broadcasting Peace, Culture &amp; Truth across the digital frontier.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative overflow-hidden bg-brand-accent text-[#050a15] font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-105 hover:shadow-[0_0_40px_rgba(0,208,132,0.4)]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <svg className="relative z-10" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                <span className="relative z-10">Listen Live (98.5 FM)</span>
              </button>
              
              <button className="group relative overflow-hidden bg-white/5 border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all backdrop-blur-md hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
                <span>Watch Live TV</span>
              </button>
            </div>
          </div>
          
          {/* Right Content - Glassmorphic On-Air Status */}
          <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-gray-300 font-semibold tracking-wide text-xs uppercase flex items-center gap-2">
                  <svg className="text-yellow-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>
                  Studio Status
                </h3>
                <span className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-[10px] font-bold border border-brand-accent/20 flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,208,132,0.2)]">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
                  LIVE NOW
                </span>
              </div>
              
              <div className="space-y-4 relative z-10">
                {/* Radio Status Card */}
                <div className="bg-black/20 rounded-2xl p-5 border border-white/5 flex items-center justify-between hover:border-brand-accent/30 transition-all hover:bg-black/40 hover:shadow-lg group/card cursor-pointer">
                  <div>
                    <div className="text-brand-accent text-[10px] font-bold mb-1.5 tracking-widest uppercase">Radio 98.5 FM</div>
                    <div className="text-white font-medium">Barke Da Sallah &amp; Pulse</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center group-hover/card:bg-brand-accent group-hover/card:text-[#050a15] transition-all transform group-hover/card:scale-110 group-hover/card:shadow-[0_0_20px_rgba(0,208,132,0.4)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                </div>
                
                {/* TV Status Card */}
                <div className="bg-black/20 rounded-2xl p-5 border border-white/5 flex items-center justify-between hover:border-blue-400/30 transition-all hover:bg-black/40 hover:shadow-lg group/card cursor-pointer">
                  <div>
                    <div className="text-blue-400 text-[10px] font-bold mb-1.5 tracking-widest uppercase">360 TV Digital</div>
                    <div className="text-white font-medium">Morning Live Broadcast</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover/card:bg-blue-500 group-hover/card:text-white transition-all transform group-hover/card:scale-110 group-hover/card:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
