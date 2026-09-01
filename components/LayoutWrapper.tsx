"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CommercialPopup from "./CommercialPopup";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExcluded = pathname === '/login' ||
                     pathname?.startsWith('/admin') || 
                     pathname?.startsWith('/station-manager') || 
                     pathname?.startsWith('/news-editor') || 
                     pathname?.startsWith('/program-officer') || 
                     pathname?.startsWith('/presenter') ||
                     pathname?.startsWith('/media-storage') ||
                     pathname?.startsWith('/commercial-ads') ||
                     pathname?.startsWith('/staff-directory') ||
                     pathname?.startsWith('/internal-notices');

  if (isExcluded) {
    return <main className="flex-1 min-h-screen h-screen overflow-hidden bg-[#030712]">{children}</main>;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-md">
        <TopBar />
        <Navbar />
      </header>
      <main className="flex-1">{children}</main>
      <CommercialPopup />
      <Footer />
    </>
  );
}
