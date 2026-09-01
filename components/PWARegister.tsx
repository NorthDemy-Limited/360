"use client";

import { useEffect } from 'react';

export default function PWARegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('360 Media PWA ServiceWorker registered with scope:', registration.scope);
        })
        .catch((err) => {
          console.log('360 Media PWA ServiceWorker registration failed:', err);
        });
    }
  }, []);

  return null;
}
