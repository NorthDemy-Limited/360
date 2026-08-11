export default function ContactInfoSection() {
  return (
    <section className="py-8 bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* Address */}
            <div className="p-6 flex items-start gap-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-full shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-1">Station Address</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  No. 1 Broad Street, Commercial District, Dutse, Jigawa State
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="p-6 flex items-start gap-4">
              <div className="bg-green-50 text-green-600 p-3 rounded-full shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-1">Studio Lines</h4>
                <p className="text-gray-500 text-sm">
                  +234 803 360 0000
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 flex items-start gap-4">
              <div className="bg-purple-50 text-purple-600 p-3 rounded-full shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <h4 className="text-gray-900 font-bold text-sm mb-1">Official Email</h4>
                <p className="text-gray-500 text-sm">
                  info@360radiotv.ng
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
