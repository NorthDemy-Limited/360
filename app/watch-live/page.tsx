import React from 'react';

export default function WatchLivePage() {
  const schedule = [
    {
      id: 1,
      time: "06:00 - 09:00",
      title: "Barke Da Sallah & Morning Pulse",
      presenter: "Balarabe Hadejia & Hadiza Gumel",
      status: "On Air",
    },
    {
      id: 2,
      time: "12:00 - 14:00",
      title: "Arewa Heritage & Cultural Beats",
      presenter: "Balarabe Hadejia",
      status: "Scheduled",
    },
    {
      id: 3,
      time: "19:00 - 20:00",
      title: "360 TV Evening News Bulletin (Hausa & English)",
      presenter: "Malam Aminu Kazaure",
      status: "Scheduled",
    },
  ];

  return (
    <div className="bg-[#050a15] min-h-screen py-16 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-up" style={{ animationDelay: '0s' }}>
          <span className="inline-block bg-red-500/10 text-red-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-4 border border-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            LIVE DIGITAL TV • DUTSE CHANNEL
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
            Watch 360 TV Live
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
            High Definition digital television broadcast streaming live directly from Dutse Main Studio.
          </p>
        </div>

        {/* Video Player Container (Theater Mode) */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-[0_30px_60px_-15px_rgba(220,38,38,0.15)] overflow-hidden mb-16 border border-white/10 transition-transform duration-500 hover:shadow-[0_40px_80px_-15px_rgba(220,38,38,0.25)] group animate-fade-up" style={{ animationDelay: '0.2s' }}>
          
          {/* Main Video Area (Aspect Ratio 16:9) */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
            
            {/* Top Left Badge */}
            <div className="absolute top-4 md:top-6 left-4 md:top-6 md:left-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
              <span className="text-white text-xs font-bold tracking-wider">360 TV DUTSE</span>
            </div>

            {/* Video Element Placeholder */}
            <video 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              poster="https://images.unsplash.com/photo-1600109151240-8b17c72957b9?q=80&w=2000"
              controls
            >
              Your browser does not support HTML5 video.
            </video>
            
            {/* Fallback Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Player Bottom Info Bar (Glassmorphic) */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden bg-white/5 backdrop-blur-2xl border-t border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <span className="text-red-400 text-xs font-bold tracking-widest uppercase block mb-1">
                CURRENT BROADCAST
              </span>
              <h2 className="text-white text-xl md:text-2xl font-bold mb-1">
                360 Morning Live Broadcast - Dutse Studios
              </h2>
              <p className="text-slate-400 text-xs md:text-sm">
                3450 Concurrent Viewers Streaming Live
              </p>
            </div>
            
            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <button className="w-full md:w-auto bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Pop-Out Player
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </button>
            </div>
          </div>
        </div>

        {/* TV Guide Schedule List */}
        <div className="max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-bold text-white tracking-wide">360 TV Television Guide</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schedule.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#0f172a] border border-white/5 rounded-xl p-5 md:p-6 flex flex-col justify-between gap-4 shadow-sm hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.2)] hover:border-red-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2 text-sm font-bold text-red-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {item.time}
                  </div>
                  {item.status === "On Air" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-widest shadow-[0_0_10px_rgba(220,38,38,0.2)]">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(220,38,38,1)]"></span>
                      On Air
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-white/5 text-slate-400 border border-white/10 uppercase tracking-widest">
                      Scheduled
                    </span>
                  )}
                </div>
                
                <div className="space-y-1 relative z-10">
                  <h4 className="text-lg font-bold text-white leading-tight group-hover:text-red-400 transition-colors duration-300">{item.title}</h4>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Host: {item.presenter}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
