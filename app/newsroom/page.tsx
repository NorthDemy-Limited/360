"use client";

import React, { useState } from 'react';

export default function NewsroomPage() {
  const categories = ["All", "Local Dutse", "Jigawa News", "Politics", "Culture & Arts", "Business", "Sports"];
  
  const newsItems = [
    {
      id: 1,
      category: "Local Dutse",
      time: "2 Hours Ago",
      title: "Emir of Dutse Inaugurates New Community Development Projects",
      excerpt: "The Emir of Dutse has officially opened three new boreholes and a primary healthcare center in the metropolitan area, aiming to boost local living standards.",
      image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=800",
      featured: true
    },
    {
      id: 2,
      category: "Politics",
      time: "4 Hours Ago",
      title: "Jigawa State Assembly Passes 2026 Supplementary Budget",
      excerpt: "Lawmakers have unanimously agreed on the supplementary budget focusing on educational infrastructure across all 27 local government areas.",
      image: "https://images.unsplash.com/photo-1541872575897-4f61f7d54406?q=80&w=800",
      featured: false
    },
    {
      id: 3,
      category: "Business",
      time: "5 Hours Ago",
      title: "Dutse Tech Hub Announces Seed Funding for 10 Startups",
      excerpt: "Local tech entrepreneurs received a major boost today as the Dutse Tech Hub disbursed seed funding to scale their agritech and fintech solutions.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=800",
      featured: false
    },
    {
      id: 4,
      category: "Culture & Arts",
      time: "Yesterday",
      title: "Annual Durbar Festival Preparations Reach Fever Pitch",
      excerpt: "Colorful preparations are underway in the Emir's palace as horsemen and cultural troupes gear up for this year's spectacular Durbar festival.",
      image: "https://images.unsplash.com/photo-1563816694-8ceb11fc2e97?q=80&w=800",
      featured: false
    },
    {
      id: 5,
      category: "Sports",
      time: "Yesterday",
      title: "Jigawa Golden Stars Secure Crucial Away Victory",
      excerpt: "The state's beloved football team climbed out of the relegation zone following a stunning 2-1 away victory against regional rivals.",
      image: "https://images.unsplash.com/photo-1518605368461-1ee7c532066d?q=80&w=800",
      featured: false
    }
  ];

  const liveUpdates = [
    { time: "Just In", text: "Governor flags off Hadejia road construction." },
    { time: "5m ago", text: "Heavy rainfall recorded in Kazaure emirate." },
    { time: "12m ago", text: "Federal University Dutse announces matriculation date." },
    { time: "25m ago", text: "Market prices for sesame seeds hit all-time high." },
    { time: "1h ago", text: "State police command parries new security chiefs." }
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredNews = activeCategory === "All" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  const featuredArticle = filteredNews.find(item => item.featured) || filteredNews[0];
  const standardArticles = filteredNews.filter(item => item.id !== featuredArticle?.id);

  return (
    <div className="bg-[#050a15] min-h-screen relative overflow-hidden">
      
      {/* Ambient Dark Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <style>{`
        @keyframes staggerFadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-staggered {
          animation: staggerFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      {/* Main Header */}
      <div className="bg-[#050a15] border-b border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative z-10 animate-staggered" style={{ animationDelay: '0s' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
              The Newsroom
            </h1>
            <p className="text-slate-400 font-medium">
              Real-time updates, local politics, and cultural stories from Jigawa State.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase block mb-1">Dutse, Nigeria</span>
            <span className="text-white font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar (Frosted Glass) */}
      <div className="sticky top-0 z-40 bg-[#050a15]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 lg:px-8 py-4 animate-staggered" style={{ animationDelay: '0.1s' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex overflow-x-auto w-full hide-scrollbar gap-2 pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 shrink-0">
            <input 
              type="text" 
              placeholder="Search news..." 
              className="w-full bg-[#0f172a] border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <svg className="absolute right-3 top-2.5 text-slate-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Main Feed */}
          <div className="flex-1 space-y-10">
            
            {/* Featured Article */}
            {featuredArticle && (
              <div className="group relative bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 animate-staggered cursor-pointer" style={{ animationDelay: '0.2s' }}>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                    <img 
                      src={featuredArticle.image} 
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent md:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a] hidden md:block" />
                  </div>
                  
                  <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center relative">
                    <span className="inline-block bg-blue-500/10 text-blue-400 font-bold px-3 py-1 rounded-full text-[10px] tracking-widest uppercase mb-4 border border-blue-500/20 w-max">
                      {featuredArticle.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-slate-400 mb-6 line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest mt-auto">
                      <span>{featuredArticle.time}</span>
                      <span className="flex items-center gap-1 text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                        Read Story <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {standardArticles.map((article, index) => (
                <div 
                  key={article.id} 
                  className="group relative bg-[#0f172a] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] cursor-pointer animate-staggered"
                  style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Unveil Gradient Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                        Read Article
                      </span>
                    </div>
                  </div>
                  <div className="p-6 relative z-10 bg-[#0f172a]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                        {article.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {article.time}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Live Activity Sidebar */}
          <div className="w-full lg:w-80 shrink-0 animate-staggered" style={{ animationDelay: '0.6s' }}>
            <div className="sticky top-28 bg-[#0f172a] rounded-3xl p-6 border border-white/5 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <h3 className="text-lg font-extrabold text-white tracking-wide">Live Activity</h3>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
                </span>
              </div>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {liveUpdates.map((update, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    
                    {/* Glowing Node */}
                    <div className="flex items-center justify-center w-3 h-3 rounded-full border border-white/20 bg-[#050a15] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(15,23,42,1)] group-hover:bg-blue-500 group-hover:border-blue-500 transition-colors z-10 relative"></div>
                    
                    {/* Content Card */}
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white/5 border border-white/5 p-3 rounded-xl shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-shadow">
                      <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest block mb-1">
                        {update.time}
                      </span>
                      <p className="text-sm text-slate-300 leading-snug">
                        {update.text}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
