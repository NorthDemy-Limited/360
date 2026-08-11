"use client";

import React, { useState, useRef } from 'react';

export default function ListenLivePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // We use a placeholder stream URL. In a real app, replace this with the actual Icecast/Shoutcast URL.
      if (!audioRef.current.src) {
        audioRef.current.src = "https://icecast.omroep.nl/radio1-bb-mp3"; 
      }
      
      const playPromise = audioRef.current.play();
      setIsPlaying(true);

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Playback was prevented or interrupted by pause()
          if (error.name !== 'AbortError') {
            console.error("Audio playback error:", error);
          }
          setIsPlaying(false);
        });
      }
    }
  };

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
      time: "10:00 - 11:30",
      title: "Jigawa Business & Agriculture Today",
      presenter: "Fatima Garba",
      status: "Scheduled",
    },
    {
      id: 3,
      time: "12:00 - 14:00",
      title: "Arewa Heritage & Cultural Beats",
      presenter: "Balarabe Hadejia",
      status: "Scheduled",
    },
    {
      id: 4,
      time: "15:00 - 16:30",
      title: "Youth Voice & Innovation Hour",
      presenter: "Zainab Suleiman",
      status: "Scheduled",
    },
    {
      id: 5,
      time: "20:30 - 22:00",
      title: "Jigawa Sports Round-up",
      presenter: "Mustapha Babura",
      status: "Scheduled",
    },
  ];

  return (
    <div className="bg-[#050a15] min-h-screen py-16 relative overflow-hidden">
      
      <style>{`
        @keyframes eq-play {
          0% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
          100% { transform: scaleY(0.3); }
        }
        @keyframes bass-thump {
          0% { transform: scale(1); box-shadow: 0 0 20px rgba(0, 208, 132, 0.2); }
          50% { transform: scale(1.02); box-shadow: 0 0 50px rgba(0, 208, 132, 0.6); }
          100% { transform: scale(1); box-shadow: 0 0 20px rgba(0, 208, 132, 0.2); }
        }
        .animate-eq {
          animation: eq-play 1s ease-in-out infinite alternate;
          transform-origin: bottom;
        }
        .bass-hover:hover {
          animation: bass-thump 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 20px 50px -10px rgba(0, 208, 132, 0.4), 0 0 40px rgba(0, 208, 132, 0.2) inset;
          border-color: rgba(0, 208, 132, 0.5);
        }
      `}</style>

      {/* Audio Element */}
      <audio ref={audioRef} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-bold px-5 py-2 rounded-full text-xs tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,208,132,0.2)]">
            <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
            LIVE STREAMING • 98.5 FM DUTSE
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Listen Live to 360 Radio
          </h1>
          <p className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Broadcasting live 24/7 across Jigawa State with high fidelity stereo audio feed.
          </p>
        </div>

        {/* Premium Glassmorphic Player Card with Futuristic Bass Hover */}
        <div className="bass-hover bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 mb-20 relative flex flex-col md:flex-row items-center justify-between gap-10 transition-all duration-300">
          
          {/* Ambient background effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-accent/30 transition-colors" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex items-center gap-8 relative z-10 w-full md:w-auto">
            {/* Visualizer & Icon Container */}
            <div className="bg-[#0a0f1d] w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {isPlaying ? (
                // Animated EQ Visualizer
                <div className="flex items-end justify-center gap-1.5 w-full h-12">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <div 
                      key={bar} 
                      className="w-2 bg-brand-accent rounded-t-sm animate-eq" 
                      style={{ 
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${bar * 0.1}s`,
                        animationDuration: `${0.6 + Math.random() * 0.4}s`
                      }} 
                    />
                  ))}
                </div>
              ) : (
                // Static Radio Icon
                <svg className="text-brand-accent transition-transform transform group-hover:scale-110" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="2"></circle>
                  <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
                </svg>
              )}
            </div>
            
            {/* Stream Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-accent font-bold text-xs tracking-[0.2em] uppercase mb-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                {isPlaying ? "PLAYING LIVE" : "ON AIR NOW"}
              </div>
              <h2 className="text-white font-extrabold text-2xl md:text-4xl leading-tight drop-shadow-md">
                Barke Da Sallah &amp; Morning Pulse
              </h2>
              <p className="text-gray-400 text-xs md:text-sm font-medium">
                Transmitting on 98.5 FM Dutse • <span className="text-gray-300">1284 Active Listeners online</span>
              </p>
            </div>
          </div>
          
          {/* Play/Pause Button Area */}
          <div className="flex flex-col items-center gap-4 relative z-10 shrink-0 mt-6 md:mt-0">
            <button 
              onClick={togglePlay}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                isPlaying 
                ? 'bg-red-500 hover:bg-red-400 shadow-[0_0_40px_rgba(239,68,68,0.5)]' 
                : 'bg-brand-accent hover:bg-emerald-400 shadow-[0_0_40px_rgba(0,208,132,0.5)]'
              }`}
            >
              {isPlaying ? (
                <svg className="text-white" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              ) : (
                <svg className="text-[#050a15] ml-2" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              )}
            </button>
            <span className="text-gray-300 text-xs font-bold tracking-widest uppercase">
              {isPlaying ? "Pause Stream" : "Tap to Start"}
            </span>
          </div>
        </div>

        {/* Futuristic Schedule List */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[2px] w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            <h3 className="text-2xl font-bold text-white tracking-wide">Radio Schedule Lineup</h3>
          </div>
          <div className="space-y-5">
            {schedule.map((item, index) => (
              <div 
                key={item.id} 
                className="group relative bg-[#0a0f1d] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 overflow-hidden transition-all duration-300 hover:border-brand-accent/40 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(0,208,132,0.2)] cursor-pointer"
              >
                {/* Hover gradient sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/0 via-brand-accent/5 to-brand-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-2 text-sm font-bold text-brand-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {item.time}
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-brand-accent transition-colors">{item.title}</h4>
                  <p className="text-gray-500 text-sm font-medium">
                    <span className="text-gray-600 uppercase text-xs tracking-wider mr-2">Presenter</span> 
                    {item.presenter}
                  </p>
                </div>
                
                <div className="shrink-0 mt-2 md:mt-0 relative z-10">
                  {item.status === "On Air" ? (
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-brand-accent/10 text-brand-accent border border-brand-accent/30 shadow-[0_0_15px_rgba(0,208,132,0.15)]">
                      <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(0,208,132,1)]" />
                      ON AIR NOW
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-5 py-2 rounded-full text-xs font-bold bg-white/5 text-gray-400 border border-white/10 uppercase tracking-widest">
                      Scheduled
                    </span>
                  )}
                </div>
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
