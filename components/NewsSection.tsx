export default function NewsSection() {
  const news = [
    {
      id: 1,
      tag: "LOCAL DUTSE",
      date: "2024-08-08",
      title: "Jigawa State Executive Council Approves N12B Road Expansion Project in Dutse",
      excerpt: "The infrastructure upgrade will connect major commercial hubs in Dutse, easing traffic and boosting agricultural productivity across the region.",
      imageUrl: "https://images.unsplash.com/photo-1541888059030-5807eb8e3a24?w=800&q=80",
    },
    {
      id: 2,
      tag: "JIGAWA NEWS",
      date: "2024-08-07",
      title: "360 Radio & TV Launches Solar-Powered Rural Broadcast Booster",
      excerpt: "The new transmitter ensures uninterrupted FM and TV signal reach to remote farming communities in eastern Jigawa, promoting inclusivity.",
      imageUrl: "https://images.unsplash.com/photo-1590483736622-398541e21b77?w=800&q=80",
    },
    {
      id: 3,
      tag: "BUSINESS",
      date: "2024-08-06",
      title: "Federal University Dutse Collaborates with 360 Media for Youth Academy",
      excerpt: "A new joint internship program will train 50 mass communication students annually in modern digital broadcasting workflows.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-brand-accent"></span>
              <span className="text-brand-accent font-bold text-xs tracking-[0.2em] uppercase">Newsroom Bulletins</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Latest News from <br className="hidden md:block"/>Dutse &amp; Jigawa
            </h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-100 rounded-full text-sm font-bold text-gray-700 hover:border-gray-200 hover:bg-gray-50 transition-all">
            Explore All News
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {news.map((item, index) => (
            <article 
              key={item.id} 
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="h-56 relative overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-5 left-5 z-20">
                  <span className="backdrop-blur-md bg-white/80 text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm tracking-wider uppercase">
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold mb-4 tracking-wide uppercase">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {item.date}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
                  {item.excerpt}
                </p>
                <div className="mt-auto flex items-center text-blue-600 font-bold text-sm group-hover:text-blue-700 transition-colors gap-2">
                  <span className="relative overflow-hidden">
                    Read Full Article
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  </span>
                  <svg className="transform group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-50 rounded-full text-sm font-bold text-gray-900 transition-colors hover:bg-gray-100 w-full">
            Explore All News
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
