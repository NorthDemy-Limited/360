"use client";

import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Mic, 
  Volume2, 
  AlertOctagon, 
  Play,
  Pause,
  SkipForward,
  FastForward,
  MessageSquareWarning,
  Activity,
  ListVideo,
  Clock
} from 'lucide-react';

export default function PresenterStudioConsole() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Dynamic state
  const [currentProgram, setCurrentProgram] = useState<any>(null);
  const [nextProgram, setNextProgram] = useState<any>(null);
  const [timeLeftStr, setTimeLeftStr] = useState("00:00");
  
  const [soundboardItems, setSoundboardItems] = useState<any[]>([]);
  const [teleprompterNews, setTeleprompterNews] = useState<any[]>([]);

  // Audio Playback State
  const [masterVolume, setMasterVolume] = useState(0.8);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [playingSounds, setPlayingSounds] = useState<{ [key: string]: boolean }>({});

  // Teleprompter scrolling
  const prompterRef = useRef<HTMLDivElement>(null);

  // Stop all playing sounds (Emergency Mute)
  const stopAllSounds = () => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    setPlayingSounds({});
  };

  // Play or stop a specific sound
  const toggleSound = (item: any) => {
    let audio = audioRefs.current[item.id];
    
    // If it doesn't exist, create it
    if (!audio) {
      audio = new Audio(item.url);
      audio.addEventListener('ended', () => {
        setPlayingSounds(prev => ({ ...prev, [item.id]: false }));
      });
      audioRefs.current[item.id] = audio;
    }

    // Update its volume to the current master volume
    audio.volume = masterVolume;

    if (playingSounds[item.id]) {
      // It's playing, so stop it
      audio.pause();
      audio.currentTime = 0;
      setPlayingSounds(prev => ({ ...prev, [item.id]: false }));
    } else {
      // Play it
      audio.play().catch(e => console.error("Error playing sound:", e));
      setPlayingSounds(prev => ({ ...prev, [item.id]: true }));
    }
  };

  // Update volume of all currently playing sounds when slider changes
  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = masterVolume;
    });
  }, [masterVolume]);

  useEffect(() => {
    setMounted(true);
    
    // Initial fetch
    fetchDashboardData();

    // Time ticker
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);
      
      // Update countdown if we have a current program
      if (currentProgram) {
        const end = new Date(currentProgram.endTime);
        const diff = end.getTime() - now.getTime();
        if (diff > 0) {
          const m = Math.floor(diff / 60000);
          const s = Math.floor((diff % 60000) / 1000);
          setTimeLeftStr(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        } else {
          setTimeLeftStr("00:00");
          // Re-fetch when program ends
          if (diff > -5000) fetchDashboardData(); 
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      // Stop all sounds on unmount
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
      });
    };
  }, [currentProgram]);

  useEffect(() => {
    // Auto scroll teleprompter
    let scrollInterval: any;
    if (isPlaying && prompterRef.current) {
      scrollInterval = setInterval(() => {
        if (prompterRef.current) {
          prompterRef.current.scrollTop += 1;
        }
      }, 50);
    }
    return () => clearInterval(scrollInterval);
  }, [isPlaying]);

  const fetchDashboardData = async () => {
    try {
      // 1. Fetch Schedule
      const schedRes = await fetch('/api/schedule');
      if (schedRes.ok) {
        const data = await schedRes.json();
        const now = new Date();
        const live = data.find((p: any) => new Date(p.startTime) <= now && new Date(p.endTime) > now);
        const future = data.filter((p: any) => new Date(p.startTime) > now).sort((a: any, b: any) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        
        setCurrentProgram(live || null);
        setNextProgram(future[0] || null);
      }

      // 2. Fetch Media for Soundboard
      const mediaRes = await fetch('/api/media');
      if (mediaRes.ok) {
        const media = await mediaRes.json();
        // Filter out non-audio/video items
        const playable = media.filter((m: any) => m.type === 'Audio' || m.type === 'Video');
        setSoundboardItems(playable);
      }

      // 3. Fetch News for Teleprompter
      const newsRes = await fetch('/api/news');
      if (newsRes.ok) {
        const news = await newsRes.json();
        // Filter published news
        setTeleprompterNews(news.filter((n: any) => n.isPublished));
      }
    } catch (e) {
      console.error("Failed to fetch studio data:", e);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatTimeOnly = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="h-full w-full bg-[#050505] text-white p-4 md:p-6 flex flex-col overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full w-full max-w-[1800px] mx-auto z-10 relative"
      >
        
        {/* LEFT COLUMN: TIMERS & CUES (Span 3) */}
        <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col gap-6 h-full">
          
          {/* Glass Clock Panel */}
          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Clock className="w-6 h-6 text-slate-700 absolute top-6 left-6" />
            <h1 
              className="text-5xl xl:text-6xl font-black text-white font-mono tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] tabular-nums mt-4" 
              suppressHydrationWarning
            >
              {mounted ? formatTime(time) : '00:00:00'}
            </h1>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.4em] mt-4 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">WAT / GMT+1</span>
          </div>

          {/* Current Segment Status */}
          <div className="flex-1 bg-[#0a0a0a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              {currentProgram ? (
                <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,1)]"></span>
                  <span className="text-xs font-black uppercase text-red-500 tracking-[0.2em]">ON AIR LIVE</span>
                </div>
              ) : (
                <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  <span className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">OFF AIR</span>
                </div>
              )}
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                {currentProgram?.type || 'AUTO'}
              </span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2 tracking-tight">
                {currentProgram ? currentProgram.title : 'Station Automation'}
              </h2>
              <p className="text-slate-400 font-medium flex items-center gap-2">
                <Activity className="w-4 h-4" /> 
                {currentProgram ? 'Live Broadcast' : 'Playlist Running'}
              </p>
              
              <div className="mt-8 bg-black rounded-2xl border border-slate-800/80 p-6 relative overflow-hidden group">
                {currentProgram && (
                  <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-red-600 to-orange-500 w-full animate-[pulse_2s_infinite]"></div>
                )}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-900/10 blur-[40px] rounded-full group-hover:bg-red-900/20 transition-colors"></div>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-2 relative z-10">Segment Countdown</span>
                <div className={`text-5xl font-black font-mono tabular-nums tracking-tighter relative z-10 ${currentProgram ? 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'text-slate-600'}`}>
                  {timeLeftStr}
                </div>
                <p className="text-xs text-slate-400 font-bold mt-4 uppercase tracking-widest relative z-10 flex items-center gap-2">
                  <SkipForward className="w-4 h-4 text-slate-600" /> Next: {nextProgram ? nextProgram.title : 'TBD'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>


        {/* CENTER COLUMN: TELEPROMPTER (Span 6) */}
        <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col h-full bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none z-10 h-full w-full opacity-90"></div>
          
          {/* Read Line Indicator */}
          <div className="absolute top-1/2 left-0 w-full h-[60px] -translate-y-1/2 bg-white/5 border-y border-white/10 pointer-events-none z-10 flex items-center">
            <div className="w-1 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
            <div className="w-full h-full bg-gradient-to-r from-red-500/5 to-transparent"></div>
          </div>
          
          {/* Prompter Header */}
          <div className="p-4 md:px-8 md:py-5 border-b border-slate-800/80 bg-black/60 relative z-20 flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]'}`}></div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isPlaying ? 'text-emerald-500' : 'text-yellow-500'}`}>
                {isPlaying ? 'AUTO-SCROLL ACTIVE' : 'SCROLL PAUSED'}
              </span>
            </div>
            <div className="flex gap-2 bg-slate-900 rounded-full p-1 border border-slate-800">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => { if(prompterRef.current) prompterRef.current.scrollTop -= 50; }} className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-colors"><FastForward className="w-4 h-4 rotate-180"/></motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsPlaying(!isPlaying)} className={`p-2 rounded-full transition-colors ${isPlaying ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>
                {isPlaying ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => { if(prompterRef.current) prompterRef.current.scrollTop += 50; }} className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-colors"><FastForward className="w-4 h-4"/></motion.button>
            </div>
          </div>

          {/* Prompter Content */}
          <div ref={prompterRef} className="flex-1 overflow-y-auto no-scrollbar p-8 md:p-16 relative z-0">
            <article className="max-w-2xl mx-auto space-y-12 pb-[50vh] pt-[20vh]">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border-l-4 border-red-500 pl-6 py-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-r-xl"
              >
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 mb-3">
                  <AlertOctagon className="w-4 h-4" /> PRODUCER CUE
                </span>
                <p className="text-xl md:text-2xl font-bold text-white uppercase leading-relaxed">
                  {currentProgram ? `WELCOME TO ${currentProgram.title}. YOU ARE LIVE.` : 'STATION IS AUTOMATED. AWAITING NEXT LIVE SEGMENT.'}
                </p>
              </motion.div>

              {teleprompterNews.length === 0 ? (
                <div className="space-y-8">
                   <div className="flex items-center gap-4">
                    <div className="h-px bg-slate-800 flex-1"></div>
                    <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">NO NEWS SCRIPT LOADED</span>
                    <div className="h-px bg-slate-800 flex-1"></div>
                  </div>
                  <p className="text-3xl md:text-[42px] font-bold text-slate-500 leading-[1.5] tracking-wide text-center">
                    Awaiting news scripts from Editorial Desk...
                  </p>
                </div>
              ) : (
                teleprompterNews.map((newsItem, idx) => (
                  <div key={newsItem.id} className="space-y-8 mb-24">
                    <div className="flex items-center gap-4">
                      <div className="h-px bg-slate-800 flex-1"></div>
                      <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">STORY {idx + 1}: {newsItem.category}</span>
                      <div className="h-px bg-slate-800 flex-1"></div>
                    </div>
                    <h3 className="text-4xl text-emerald-400 font-black mb-8 uppercase leading-tight drop-shadow-sm">{newsItem.title}</h3>
                    
                    {/* Split content by paragraphs or double newlines to make readable prompter lines */}
                    {newsItem.content.split(/\n+/).filter(Boolean).map((para: string, pIdx: number) => (
                      <p key={pIdx} className="text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-300 leading-[1.5] tracking-wide">
                        {para}
                      </p>
                    ))}
                  </div>
                ))
              )}

            </article>
          </div>
        </motion.div>


        {/* RIGHT COLUMN: SOUNDBOARD & INTERCOM (Span 3) */}
        <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col gap-6 h-full">
          
          {/* Up Next Preview */}
          <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shrink-0 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] flex items-center gap-2">
                <ListVideo className="w-3.5 h-3.5" /> Up Next
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                {nextProgram ? formatTimeOnly(nextProgram.startTime) : '--:--'}
              </span>
            </div>
            <h4 className="text-xl font-bold text-slate-200 mt-2 truncate">
              {nextProgram ? nextProgram.title : 'End of Broadcast'}
            </h4>
          </div>

          {/* Master Soundboard */}
          <div className="flex-1 flex flex-col bg-[#0a0a0a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden relative">
            <div className="p-6 shrink-0 relative z-10 border-b border-slate-800/80 bg-slate-900/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-slate-500" /> SOUNDBOARD
                </h3>
                <span className="text-[10px] text-slate-500 font-mono bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                  VOL {Math.round(masterVolume * 100)}%
                </span>
              </div>
              
              {/* Volume Slider */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-slate-500 shrink-0" />
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={masterVolume}
                  onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 flex-1 content-start overflow-y-auto admin-sidebar-scrollbar p-6 relative z-10 pb-8">
              {soundboardItems.length === 0 ? (
                <div className="col-span-2 text-center text-slate-500 text-xs py-8">
                  No audio assets loaded. Upload via Broadcast Media.
                </div>
              ) : (
                soundboardItems.map((item, idx) => {
                  const isPlayingSound = playingSounds[item.id] || false;
                  
                  // Determine styles dynamically based on category or index for variety
                  let styleClass = "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white";
                  
                  if (item.category === 'Station Jingle') {
                    styleClass = "bg-blue-950/30 border-blue-900/50 text-blue-400 hover:bg-blue-600 hover:text-white shadow-[0_0_15px_rgba(29,78,216,0)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]";
                  } else if (item.category === 'Program Intro') {
                    styleClass = "bg-purple-950/30 border-purple-900/50 text-purple-400 hover:bg-purple-600 hover:text-white shadow-[0_0_15px_rgba(109,40,217,0)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]";
                  } else if (item.category === 'Commercial Advert') {
                    styleClass = "bg-emerald-950/30 border-emerald-900/50 text-emerald-400 hover:bg-emerald-600 hover:text-white shadow-[0_0_15px_rgba(4,120,87,0)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]";
                  } else {
                    // Fallback colors for other categories
                    const altColors = [
                      "bg-amber-950/30 border-amber-900/50 text-amber-400 hover:bg-amber-600 hover:text-white",
                      "bg-rose-950/30 border-rose-900/50 text-rose-400 hover:bg-rose-600 hover:text-white"
                    ];
                    styleClass = altColors[idx % 2];
                  }

                  // Override styles if currently playing
                  if (isPlayingSound) {
                    styleClass = "bg-indigo-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(79,70,229,0.6)] scale-[0.98]";
                  }

                  return (
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      key={item.id} 
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 group ${styleClass}`}
                      onClick={() => toggleSound(item)}
                    >
                      <span className="text-[10px] sm:text-xs font-black leading-tight text-center truncate w-full px-1">
                        {item.title}
                      </span>
                      <span className={`text-[9px] font-mono mt-2 flex items-center gap-1 px-2 py-0.5 rounded-md truncate max-w-[80%] ${isPlayingSound ? 'bg-white/20 text-white' : 'opacity-70 bg-black/20'}`}>
                        {isPlayingSound ? (
                          <span className="flex gap-0.5 items-center">
                            <span className="w-1 h-2 bg-current animate-pulse rounded-full"></span>
                            <span className="w-1 h-3 bg-current animate-[pulse_1s_infinite] rounded-full"></span>
                            <span className="w-1 h-2 bg-current animate-pulse rounded-full"></span>
                          </span>
                        ) : (
                          <Play className="w-2.5 h-2.5 shrink-0" />
                        )}
                        {isPlayingSound ? 'PLAYING' : item.category}
                      </span>
                    </motion.button>
                  );
                })
              )}

              {/* Emergency button at the end */}
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={stopAllSounds}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 bg-gradient-to-r from-red-600 to-red-500 border-red-400 text-white font-black col-span-2 hover:brightness-110 shadow-[0_0_20px_rgba(220,38,38,0.4)] mt-4"
              >
                <span className="text-[10px] sm:text-xs font-black leading-tight text-center uppercase tracking-[0.2em] flex items-center gap-2">
                  <Pause className="w-4 h-4 fill-current" />
                  Emergency Mute
                </span>
              </motion.button>
            </div>
            
            {/* Fade out bottom of soundboard */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-20"></div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
