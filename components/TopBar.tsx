export default function TopBar() {
  return (
    <div className="bg-brand-primary text-white text-xs py-2 px-4 flex flex-col sm:flex-row justify-between items-center border-b border-white/10">
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
        <span className="text-gray-300">Broadcasting from Dutse, Jigawa State, Nigeria</span>
        <span className="hidden sm:inline mx-2 text-gray-500">•</span>
        <span className="text-gray-400">Radio: 98.5 FM | TV: 360 Digital Channel</span>
      </div>
      <div className="flex gap-4 font-medium">
        <button className="flex items-center gap-1 text-brand-accent hover:text-white transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
          Listen Live (98.5 FM)
        </button>
        <button className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
          Watch Live TV
        </button>
      </div>
    </div>
  );
}
