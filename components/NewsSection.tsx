"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, TrendingUp, ChevronLeft, ChevronRight, X, User, Clock, Share2, Check } from "lucide-react";

interface NewsItem {
  id: string;
  category: string;
  publishedAt: string;
  title: string;
  content: string;
  imageUrl: string;
  author: { name: string; avatar: string | null };
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadNews = async () => {
      try {
        const res = await fetch('/api/news', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) setNews(data);
        }
      } catch (err) {
        console.warn("News load notice:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadNews();
    return () => { isMounted = false; };
  }, []);

  // Auto-changing feature
  useEffect(() => {
    if (news.length <= 3 || isHovered || selectedArticle) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [news.length, isHovered, selectedArticle]);

  // Handle ESC key to close article modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % news.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.origin + '/newsroom');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get exactly 3 visible items wrapped around the array
  const visibleNews = news.length > 3 
    ? [
        news[currentIndex],
        news[(currentIndex + 1) % news.length],
        news[(currentIndex + 2) % news.length],
      ]
    : news;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-2xl"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-1 bg-blue-600 rounded-full"></span>
              <span className="text-blue-600 font-bold text-xs tracking-widest uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Newsroom Bulletins
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Latest News from <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dutse &amp; Jigawa</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/newsroom" className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/30 group">
              Explore All News
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {visibleNews.map((item, index) => (
                <motion.article 
                  key={item.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  onClick={() => setSelectedArticle(item)}
                  className={`group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer ${
                    index > 0 ? 'hidden md:flex' : 'flex'
                  } ${index > 1 ? 'lg:flex hidden' : ''}`}
                >
                  <div className="h-60 relative overflow-hidden bg-slate-100 shrink-0">
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10 duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-500" />
                    <img 
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80'} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute top-5 left-5 z-20">
                      <span className="backdrop-blur-md bg-white/90 text-blue-600 text-[10px] font-black px-4 py-2 rounded-full shadow-lg tracking-widest uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col bg-white">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4 tracking-wider uppercase">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      {new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
                      {item.content}
                    </p>
                    <div className="mt-auto flex items-center text-blue-600 font-bold text-sm gap-2">
                      <span className="relative overflow-hidden">
                        Read Full Article
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                      </span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Carousel Navigation */}
          {news.length > 3 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button 
                onClick={handlePrev}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-lg transition-all"
                aria-label="Previous articles"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {news.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:shadow-lg transition-all"
                aria-label="Next articles"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/newsroom" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full text-sm font-bold transition-colors hover:bg-blue-600 w-full group">
            Explore All News
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col text-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Top Bar with Close Button */}
              <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-600 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedArticle.category}
                  </span>
                  <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    3 min read
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 text-xs font-semibold"
                    title="Copy Article Link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
                  </button>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                    aria-label="Close article"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Article Hero Media */}
              <div className="relative w-full h-72 sm:h-96 shrink-0 bg-slate-100">
                <img 
                  src={selectedArticle.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80'} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Body Content */}
              <div className="p-6 sm:p-10 space-y-6">
                
                {/* Meta Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                        {selectedArticle.author?.name ? selectedArticle.author.name.charAt(0).toUpperCase() : '3'}
                      </div>
                      <span className="text-slate-800 font-bold">{selectedArticle.author?.name || '360 Editorial Desk'}</span>
                    </div>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {new Date(selectedArticle.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                    {selectedArticle.title}
                  </h1>
                </div>

                {/* Paragraphs */}
                <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-4 font-normal">
                  {selectedArticle.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Footer Tag & Explore Link */}
                <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 font-mono">
                    Published under: <strong className="text-slate-700 uppercase">{selectedArticle.category}</strong>
                  </div>
                  <Link 
                    href="/newsroom"
                    onClick={() => setSelectedArticle(null)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider"
                  >
                    View All Newsroom Bulletins →
                  </Link>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
