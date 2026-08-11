export default function SponsorSection() {
  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="group relative bg-[#0a0f1d] rounded-3xl p-8 md:p-14 shadow-2xl overflow-hidden transition-transform duration-700 hover:scale-[1.02]">
          
          {/* Animated Ambient Glows */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-accent/30 rounded-full blur-[100px] animate-pulse group-hover:bg-brand-accent/40 transition-colors duration-700" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] animate-pulse delay-1000 group-hover:bg-blue-500/40 transition-colors duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm text-yellow-400 font-bold text-xs tracking-wider uppercase shadow-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                Featured Sponsor
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Jigawa Agro-Allied <br className="hidden md:block" />Fertilizer Campaign
              </h2>
              <p className="text-gray-300 text-base md:text-lg max-w-2xl font-light">
                <span className="font-semibold text-white">Client:</span> Jigawa State Agricultural Development Authority <span className="mx-2 text-gray-500">|</span> <span className="font-semibold text-white">Slot:</span> Morning News &amp; Afternoon Drive
              </p>
            </div>
            
            <div className="shrink-0 relative">
              <div className="absolute inset-0 bg-brand-accent/50 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <button className="relative bg-brand-accent text-[#0a0f1d] hover:bg-emerald-400 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(0,208,132,0.5)]">
                Advertise with 360 Media
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
