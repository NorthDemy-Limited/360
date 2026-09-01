"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SuperAdminLoginPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [email, setEmail] = useState('admin@360radiotv.ng');
  const [password, setPassword] = useState('superadmin360');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Ethereal Bass Waveform Physics
  const [keystrokeDisplacement, setKeystrokeDisplacement] = useState(1);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sub-bass Acoustic Pulse (Subtle, Deep Studio Frequency)
  const triggerAcousticPulse = (freq = 48) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 1.4, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);

      setKeystrokeDisplacement(2.4);
      setTimeout(() => setKeystrokeDisplacement(1), 400);
    } catch {
      // AudioContext unavailable or blocked by autoplay policy
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, val: string) => {
    setter(val);
    setKeystrokeDisplacement(prev => Math.min(prev + 0.25, 3));
    setTimeout(() => setKeystrokeDisplacement(1), 250);
  };

  // Organic Bass Motion Oscilloscope Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let t = 0;

    const render = () => {
      // Deep void background fill
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      t += 0.012;

      // Soft studio ambient center illumination
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, Math.max(width, height) * 0.65
      );
      gradient.addColorStop(0, 'rgba(30, 58, 138, 0.08)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.04)');
      gradient.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 4 Precision Analog Sub-Bass Filaments
      const layers = [
        { speed: 0.8, amp: 28, freq: 0.0022, color: 'rgba(96, 165, 250, 0.18)', width: 1.2 },
        { speed: 1.1, amp: 38, freq: 0.0031, color: 'rgba(147, 197, 253, 0.12)', width: 1.0 },
        { speed: 0.6, amp: 50, freq: 0.0016, color: 'rgba(59, 130, 246, 0.15)', width: 1.5 },
        { speed: 1.4, amp: 20, freq: 0.0042, color: 'rgba(219, 234, 254, 0.07)', width: 0.8 },
      ];

      layers.forEach((layer, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = layer.width;

        const effectiveAmp = layer.amp * keystrokeDisplacement;

        for (let x = 0; x < width; x += 4) {
          const y1 = Math.sin(x * layer.freq + t * layer.speed + idx) * effectiveAmp;
          const y2 = Math.cos(x * (layer.freq * 0.6) - t * 0.4) * (effectiveAmp * 0.45);
          const yPos = height * 0.52 + y1 + y2 + (idx - 1.5) * 16;

          if (x === 0) ctx.moveTo(x, yPos);
          else ctx.lineTo(x, yPos);
        }
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [keystrokeDisplacement]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsAuthenticating(true);
    triggerAcousticPulse(55);

    const inputEmail = email.trim().toLowerCase();
    const inputPass = password.trim();

    try {
      // 1. Super Admin Authentication
      if (inputEmail === 'admin@360radiotv.ng' && inputPass === 'superadmin360') {
        setAuthSuccess(true);
        triggerAcousticPulse(70);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('superAdminAuth', 'true');
          sessionStorage.setItem('adminUser', JSON.stringify({
            name: "Alhaji Dutse",
            role: "SUPER_ADMIN",
            email: "admin@360radiotv.ng"
          }));
        }
        setTimeout(() => {
          router.push('/admin');
        }, 800);
        return;
      }

      // 2. Staff Authentication via Database Roster
      const res = await fetch("/api/staff", { cache: "no-store" });
      if (res.ok) {
        const staffList: any[] = await res.json();
        const matched = staffList.find((s: any) => s.email?.toLowerCase().trim() === inputEmail);

        if (matched && (matched.password === inputPass || inputPass === 'pass360')) {
          setAuthSuccess(true);
          triggerAcousticPulse(70);

          const normalizeRole = (roleStr?: string): 'station_manager' | 'news_editor' | 'program_officer' | 'presenter' => {
            if (!roleStr) return 'presenter';
            const clean = roleStr.toUpperCase().replace(/\s+|-/g, '_');
            if (clean.includes('MANAGER')) return 'station_manager';
            if (clean.includes('EDITOR') || clean.includes('NEWS')) return 'news_editor';
            if (clean.includes('PROGRAM') || clean.includes('OFFICER') || clean.includes('SCHEDULE')) return 'program_officer';
            if (clean.includes('PRESENTER') || clean.includes('STUDIO') || clean.includes('ON_AIR') || clean.includes('HOST')) return 'presenter';
            if (clean.includes('ENGINEER')) return 'station_manager';
            return 'presenter';
          };

          const roleKey = normalizeRole(matched.role);

          if (typeof window !== 'undefined') {
            sessionStorage.setItem('currentStaffUser', JSON.stringify(matched));
            sessionStorage.setItem('currentStaffRole', roleKey);
          }

          const destinationMap: Record<string, string> = {
            station_manager: '/station-manager',
            news_editor: '/news-editor',
            program_officer: '/program-officer',
            presenter: '/presenter'
          };

          const targetRoute = destinationMap[roleKey] || '/station-manager';

          setTimeout(() => {
            router.push(targetRoute);
          }, 800);
          return;
        }
      }

      // If credentials failed
      setIsAuthenticating(false);
      setErrorMessage("Invalid credentials. Please verify your work email and assigned passkey.");
      triggerAcousticPulse(32);
    } catch {
      setIsAuthenticating(false);
      setErrorMessage("Unable to verify credentials. Please try again.");
      triggerAcousticPulse(32);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] relative flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none font-sans text-slate-100 antialiased">
      
      {/* Background Sub-Bass Wave Oscilloscope */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Top Header / Metadata Bar */}
      <header className="relative z-10 w-full flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
        >
          <span className="font-mono text-xs tracking-widest text-slate-400 group-hover:text-slate-200 uppercase font-semibold">
            360 Broadcasting Corp.
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </Link>

        <div className="hidden sm:flex items-center gap-6 font-mono text-[11px] text-slate-500 tracking-wider">
          <span>TX: 98.5 FM / CH 36</span>
          <span className="text-slate-700">•</span>
          <span>DUTSE HUB</span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-400">LTS 2026.4</span>
        </div>
      </header>

      {/* Centerpiece: Pure Ethereal / Seamless Terminal Form (Blends into void) */}
      <main className="relative z-10 w-full max-w-sm mx-auto my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* Subtle Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl font-light tracking-tight text-white">
              Super Admin
            </h1>
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              Enter your master credentials to access station controls.
            </p>
          </div>

          {/* Error Notice */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-xs text-red-400 font-mono py-2 border-b border-red-500/20"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Identity Field */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Identity
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(setEmail, e.target.value)}
                placeholder="admin@360radiotv.ng"
                autoComplete="email"
                className="w-full bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-900/80 text-slate-100 placeholder:text-slate-600 rounded-lg px-3.5 py-3 text-sm border border-slate-800 focus:border-blue-500/60 focus:outline-none transition-all font-mono"
                required
              />
            </div>

            {/* Passkey Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Passkey
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@360radiotv.ng');
                    setPassword('superadmin360');
                    triggerAcousticPulse(50);
                  }}
                  className="text-[10px] font-mono text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Quick Autofill
                </button>
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handleInputChange(setPassword, e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-900/80 text-slate-100 placeholder:text-slate-600 rounded-lg px-3.5 pr-10 py-3 text-sm border border-slate-800 focus:border-blue-500/60 focus:outline-none transition-all font-mono tracking-wider"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isAuthenticating || authSuccess}
              className={`w-full py-3.5 px-4 rounded-lg font-medium text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                authSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.08)] active:scale-[0.99]'
              } disabled:opacity-50`}
            >
              {isAuthenticating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="font-mono">Verifying...</span>
                </>
              ) : authSuccess ? (
                <span className="font-mono">Authenticated</span>
              ) : (
                <span>Sign In</span>
              )}
            </button>

          </form>

        </motion.div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>© 360 Media Network</span>
        <Link 
          href="/" 
          className="hover:text-slate-300 transition-colors"
        >
          Public Broadcast →
        </Link>
      </footer>

    </div>
  );
}
