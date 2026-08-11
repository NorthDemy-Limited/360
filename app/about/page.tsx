import React from 'react';

export default function AboutPage() {
  const leadership = [
    {
      id: 1,
      name: "Alhaji Ibrahim Dutse",
      role: "General Manager / CEO",
      department: "MANAGEMENT",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200",
    },
    {
      id: 2,
      name: "Malama Hadiza Gumel",
      role: "Station Controller",
      department: "MANAGEMENT",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    },
    {
      id: 3,
      name: "Malam Aminu Kazaure",
      role: "Editor-in-Chief",
      department: "NEWSROOM",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200",
    },
    {
      id: 4,
      name: "Fatima Garba",
      role: "Head of Programming",
      department: "PROGRAMS",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
    },
    {
      id: 5,
      name: "Balarabe Hadejia",
      role: "Senior On-Air Personality",
      department: "PROGRAMS",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    },
    {
      id: 6,
      name: "Engr. Danladi Ringim",
      role: "Chief Broadcast Engineer",
      department: "ENGINEERING",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    }
  ];

  return (
    <div className="bg-[#050a15] min-h-screen relative overflow-hidden">
      
      {/* Ambient Dark Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <style>{`
        @keyframes fadeInSlideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-staggered {
          animation: fadeInSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-staggered" style={{ animationDelay: '0s' }}>
          <span className="inline-block bg-blue-500/10 text-blue-400 font-bold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            About Our Station
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-md">
            360 Radio & Television
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            Headquartered in Dutse, Jigawa State, 360 Radio & Television is a premier broadcasting organization committed to reliable journalism, rich cultural showcase, and community service.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          <div className="group bg-[#0f172a] rounded-3xl p-10 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] animate-staggered" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
              <svg className="text-blue-400" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed">
              To inform, educate, and entertain the diverse communities of Jigawa State and Northwest Nigeria through ethical journalism, high-quality audio-visual broadcasting, and innovative educational programming.
            </p>
          </div>

          <div className="group bg-[#0f172a] rounded-3xl p-10 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] animate-staggered" style={{ animationDelay: '0.4s' }}>
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
              <svg className="text-emerald-400" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-slate-400 leading-relaxed">
              To be the most trusted, accessible, and progressive media platform in Northwest Nigeria, bridging communities in Dutse, Hadejia, Gumel, Ringim, and Kazaure with national and global dialogue.
            </p>
          </div>

        </div>

        {/* Leadership Team Section */}
        <div className="animate-staggered" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Station Leadership Team
            </h2>
            <p className="text-slate-400 font-medium">
              Dedicated media professionals directing broadcast operations in Dutse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((leader, index) => (
              <div 
                key={leader.id} 
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300 flex items-center gap-6 cursor-pointer hover:bg-white/10"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 relative">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">
                    {leader.department}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {leader.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
