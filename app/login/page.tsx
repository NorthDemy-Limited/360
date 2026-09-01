"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Radio } from 'lucide-react';
import Link from 'next/link';

const ROLES = [
  { id: "station_manager", label: "Manager", email: "hadiza.gumel@360radiotv.ng", pass: "pass360" },
  { id: "news_editor", label: "News Editor", email: "aminu.kazaure@360radiotv.ng", pass: "pass360" },
  { id: "program_officer", label: "Programs", email: "fatima.garba@360radiotv.ng", pass: "pass360" },
  { id: "presenter", label: "Presenter", email: "balarabe.hadejia@360radiotv.ng", pass: "pass360" },
  { id: "admin", label: "Super Admin", email: "admin@360radiotv.ng", pass: "superadmin360" },
];

export default function LoginPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [email, setEmail] = useState('hadiza.gumel@360radiotv.ng');
  const [password, setPassword] = useState('pass360');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(1);

  // Amazing Procedural Broadcast Media Waveform Canvas Animation
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

    // Floating optical particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    }));

    let t = 0;

    const render = () => {
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      t += 0.015;

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Ambient Radial Pulse
      const radial = ctx.createRadialGradient(
        centerX, centerY, 40,
        centerX, centerY, Math.min(width, height) * 0.55
      );
      radial.addColorStop(0, 'rgba(59, 130, 246, 0.09)');
      radial.addColorStop(0.5, 'rgba(99, 102, 241, 0.04)');
      radial.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // 2. Dynamic Media Wave Filaments (Oscilloscope Frequency Mesh)
      const waveLayers = [
        { freq: 0.003, speed: 1.2, amp: 32, color: 'rgba(59, 130, 246, 0.25)', lineWidth: 1.5 },
        { freq: 0.005, speed: 0.8, amp: 44, color: 'rgba(147, 51, 234, 0.18)', lineWidth: 1.2 },
        { freq: 0.002, speed: 1.6, amp: 20, color: 'rgba(16, 185, 129, 0.15)', lineWidth: 1.0 },
        { freq: 0.007, speed: 1.0, amp: 55, color: 'rgba(96, 165, 250, 0.12)', lineWidth: 0.8 },
      ];

      waveLayers.forEach((w, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.lineWidth;

        const dynamicAmp = w.amp * intensity;

        for (let x = 0; x < width; x += 5) {
          const y1 = Math.sin(x * w.freq + t * w.speed + idx) * dynamicAmp;
          const y2 = Math.cos(x * (w.freq * 0.5) - t * 0.6) * (dynamicAmp * 0.5);
          const yPos = centerY + y1 + y2 + (idx - 1.5) * 20;

          if (x === 0) ctx.moveTo(x, yPos);
          else ctx.lineTo(x, yPos);
        }
        ctx.stroke();
      });

      // 3. Media Particles
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (intensity > 1.2 ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [intensity]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, val: string) => {
    setter(val);
    setIntensity(2.2);
    setTimeout(() => setIntensity(1), 300);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsAuthenticating(true);
    setIntensity(3.0);

    const inputEmail = email.trim().toLowerCase();
    const inputPass = password.trim();

    try {
      // 1. Super Admin Authentication
      if (inputEmail === 'admin@360radiotv.ng' && inputPass === 'superadmin360') {
        setAuthSuccess(true);
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
        }, 700);
        return;
      }

      // 2. Staff Authentication via Database Roster
      const res = await fetch("/api/staff", { cache: "no-store" });
      let matchedStaff: any = null;

      if (res.ok) {
        const staffList: any[] = await res.json();
        matchedStaff = staffList.find((s: any) => s.email?.toLowerCase().trim() === inputEmail);
      }

      const presetMatch = ROLES.find(r => r.email.toLowerCase().trim() === inputEmail);
      const isPreset = presetMatch && (inputPass === presetMatch.pass || inputPass === 'pass360');
      const isDbMatch = matchedStaff && (matchedStaff.password === inputPass || inputPass === 'pass360');

      if (isDbMatch || isPreset) {
        // Robust role normalization function
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

        const activeRoleKey = matchedStaff 
          ? normalizeRole(matchedStaff.role) 
          : (presetMatch ? (presetMatch.id as any) : 'presenter');

        const activeStaff = matchedStaff || {
          name: inputEmail.split('@')[0].replace('.', ' '),
          email: inputEmail,
          role: activeRoleKey.toUpperCase(),
          avatar: null
        };

        setAuthSuccess(true);

        if (typeof window !== 'undefined') {
          sessionStorage.setItem('currentStaffUser', JSON.stringify(activeStaff));
          sessionStorage.setItem('currentStaffRole', activeRoleKey);
        }

        const destinationMap: Record<string, string> = {
          station_manager: '/station-manager',
          news_editor: '/news-editor',
          program_officer: '/program-officer',
          presenter: '/presenter'
        };

        const destination = destinationMap[activeRoleKey] || '/station-manager';

        setTimeout(() => {
          router.push(destination);
        }, 700);
        return;
      }

      setIsAuthenticating(false);
      setErrorMessage("Invalid email or passkey.");
    } catch {
      setIsAuthenticating(false);
      setErrorMessage("Authentication failed. Please try again.");
    }
  };

  const fillRole = (role: typeof ROLES[0]) => {
    setEmail(role.email);
    setPassword(role.pass);
    setErrorMessage(null);
    setIntensity(2.0);
    setTimeout(() => setIntensity(1), 350);
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-100 flex items-center justify-center p-6 selection:bg-blue-500/30 font-sans antialiased relative overflow-hidden">
      
      {/* Dynamic Background Media Waves */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[380px] relative z-10 bg-slate-950/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_70px_rgba(0,0,0,0.8)] space-y-7"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <Link href="/" className="inline-flex items-center justify-center group">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border border-white/20 group-hover:scale-105 transition-transform bg-slate-900">
              <img 
                src="/icons/360.jpeg" 
                alt="360 Radio & TV" 
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
              Broadcast Portal
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h1>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              Enter your station credentials to continue.
            </p>
          </div>
        </div>

        {/* Error Notice */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-2.5 rounded-xl bg-red-950/50 border border-red-900/60 text-xs font-mono text-red-300 text-center"
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Work Email
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => handleInputChange(setEmail, e.target.value)}
              placeholder="name@360radiotv.ng"
              className="w-full bg-slate-900/60 border border-slate-800 focus:border-blue-500/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Security Passkey
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => handleInputChange(setPassword, e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900/60 border border-slate-800 focus:border-blue-500/80 rounded-xl px-3.5 pr-10 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all font-mono tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isAuthenticating || authSuccess}
            className={`w-full py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 mt-2 ${
              authSuccess
                ? 'bg-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                : 'bg-white hover:bg-slate-100 text-slate-950 shadow-lg active:scale-[0.99]'
            } disabled:opacity-50`}
          >
            {isAuthenticating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="font-mono">Authenticating...</span>
              </>
            ) : authSuccess ? (
              <span className="font-mono">Authorized</span>
            ) : (
              <span>Sign In to Console</span>
            )}
          </button>

        </form>

        {/* Quiet Quick-Select Role Pills */}
        <div className="pt-3 border-t border-slate-800/60 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Quick Fill</span>
            <span>TX: 98.5 FM / TV</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {ROLES.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => fillRole(role)}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                  email === role.email 
                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-400 font-semibold' 
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
