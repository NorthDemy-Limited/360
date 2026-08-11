"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') || 
                  pathname?.startsWith('/station-manager') || 
                  pathname?.startsWith('/news-editor') || 
                  pathname?.startsWith('/program-officer') || 
                  pathname?.startsWith('/presenter') ||
                  pathname?.startsWith('/media-storage') ||
                  pathname?.startsWith('/commercial-ads') ||
                  pathname?.startsWith('/staff-directory') ||
                  pathname?.startsWith('/internal-notices');

  if (isAdmin) {
    return <main className="flex-1 min-h-screen h-screen overflow-hidden">{children}</main>;
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
