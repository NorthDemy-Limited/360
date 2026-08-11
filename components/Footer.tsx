export default function Footer() {
  return (
    <footer className="bg-[#0a0f1d] text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex-shrink-0 flex items-center gap-3 mb-6">
              <div className="bg-blue-600 text-white font-bold rounded-lg p-2 text-xl leading-none flex items-center justify-center">
                360
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-tight text-white">
                  360 <span className="text-gray-300">Radio</span> <span className="text-red-500">&amp; TV</span>
                </span>
                <span className="text-xs text-blue-400 font-medium">Dutse, Jigawa State</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Voice of the Horizon - Broadcasting Peace, Culture &amp; Truth
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="bg-transparent border border-brand-accent/50 text-brand-accent hover:bg-brand-accent hover:text-gray-900 text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>
                98.5 FM Dutse
              </button>
              <button className="bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect></svg>
                360 TV Channel
              </button>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-gray-300 font-bold mb-6 tracking-wide text-sm uppercase">Quick Navigation</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Home Page</a></li>
              <li><a href="#" className="flex items-center gap-1.5 text-brand-accent hover:text-brand-accent/80 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg> Listen Live Radio</a></li>
              <li><a href="#" className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect></svg> Watch Live TV</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Latest Newsroom Bulletins</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Broadcast Program Schedules</a></li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-gray-300 font-bold mb-6 tracking-wide text-sm uppercase">Station Address &amp; Info</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <svg className="shrink-0 mt-0.5 text-blue-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>No. 1 Broad Street, Commercial District, Dutse, Jigawa State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="shrink-0 text-blue-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+234 803 360 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="shrink-0 text-blue-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>info@360radiotv.ng</span>
              </li>
            </ul>
          </div>

          {/* Portal */}
          <div>
            <h4 className="text-gray-300 font-bold mb-6 tracking-wide text-sm uppercase">Staff Portal &amp; Socials</h4>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">
              Restricted management system for authorized station staff, editors, and producers.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Management Portal Login
            </button>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} 360 Radio &amp; Television, Dutse, Jigawa State. All Rights Reserved.</p>
          <p>Designed for 360 Media Organization - Dutse Metropolis</p>
        </div>
      </div>
    </footer>
  );
}
