export default function ScheduleSection() {
  const schedule = [
    {
      id: 1,
      type: "BOTH",
      time: "06:00 - 09:00",
      title: "Barke Da Sallah & Morning Pulse",
      host: "Balarabe Hadejia & Hadiza Gumel",
      status: "On Air",
      bgGradient: "from-green-500/10 to-transparent",
    },
    {
      id: 2,
      type: "RADIO",
      time: "10:00 - 11:30",
      title: "Jigawa Business & Agriculture Today",
      host: "Fatima Garba",
      status: "Scheduled",
      bgGradient: "from-transparent to-transparent",
    },
    {
      id: 3,
      type: "BOTH",
      time: "12:00 - 14:00",
      title: "Arewa Heritage & Cultural Beats",
      host: "Balarabe Hadejia",
      status: "Scheduled",
      bgGradient: "from-transparent to-transparent",
    },
    {
      id: 4,
      type: "RADIO",
      time: "15:00 - 16:30",
      title: "Youth Voice & Innovation Hour",
      host: "Zainab Suleiman",
      status: "Scheduled",
      bgGradient: "from-transparent to-transparent",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0f1d] text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-brand-accent shadow-[0_0_10px_rgba(0,208,132,0.8)]"></span>
              <span className="text-brand-accent font-bold text-xs tracking-[0.2em] uppercase">Broadcast Schedule</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Today's Featured Broadcasts</h2>
          </div>
          <button className="group relative bg-white/5 border border-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 text-sm overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">View Full Weekly Schedule</span>
            <svg className="relative z-10 transform group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {schedule.map((item) => (
            <div key={item.id} className={`group relative bg-[#121929] border border-white/5 rounded-2xl p-8 hover:border-brand-accent/30 transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(0,208,132,0.15)]`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-50`} />
              
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${item.type === 'BOTH' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-gray-800 text-gray-300 border border-gray-700'} tracking-wider`}>
                    {item.type}
                  </span>
                  <span className="text-sm font-semibold text-gray-400 flex items-center gap-2">
                    <svg className="text-brand-accent" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {item.time}
                  </span>
                </div>
                {item.status === "On Air" ? (
                  <span className="text-xs font-bold px-3 py-1.5 bg-brand-accent/10 text-brand-accent border border-brand-accent/30 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(0,208,132,0.1)]">
                    <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_5px_rgba(0,208,132,1)]"></span>
                    ON AIR
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-3 py-1.5 bg-white/5 text-gray-400 border border-white/10 rounded-full uppercase tracking-wider">
                    {item.status}
                  </span>
                )}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">{item.title}</h3>
                <p className="text-gray-400 font-medium">
                  <span className="text-gray-500">Host:</span> {item.host}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
