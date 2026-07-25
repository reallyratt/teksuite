import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  ExternalLink,
  FilePenLine,
  Keyboard,
  Sparkles,
} from 'lucide-react';

export const HomeContent: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [comingSoonToast, setComingSoonToast] = useState(false);

  // Live updating clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleArteksfakClick = () => {
    setComingSoonToast(true);
    setTimeout(() => {
      setComingSoonToast(false);
    }, 3000);
  };

  // Date formatting helpers
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayName = dayNames[time.getDay()];
  const dd = String(time.getDate()).padStart(2, '0');
  const mm = String(time.getMonth() + 1).padStart(2, '0');
  const yyyy = time.getFullYear();
  const formattedDate = `${dayName}, ${dd} / ${mm} / ${yyyy}`;

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const formattedClock = `${hours}:${minutes}:${seconds}`;

  return (
    <div className="space-y-8 relative">
      {/* 3-Second Toast Popup for ARTEKSFAK */}
      <AnimatePresence>
        {comingSoonToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-6 z-50 flex items-center space-x-3 rounded-xl border border-indigo-500/30 bg-[#1e1e1e] px-5 py-3.5 shadow-2xl text-white ring-1 ring-indigo-500/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">ARTEKSFAK</p>
              <p className="text-xs text-indigo-300 font-medium">
                Coming Soon! Feature under development.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transparent Time Section */}
      <div className="py-2 flex flex-col items-center justify-center text-center space-y-4">
        {/* Date Day */}
        <div className="flex items-center space-x-2 rounded-full bg-white/[0.05] border border-white/10 px-4 py-1.5 text-xs font-semibold text-slate-300">
          <Calendar className="h-4 w-4 text-indigo-400" />
          <span>{formattedDate}</span>
        </div>

        {/* Centered Clock */}
        <div className="space-y-2">
          <div className="text-5xl md:text-7xl font-black tracking-tight text-white font-mono bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-sm">
            {formattedClock}
          </div>

          {/* MINGGU ALPHA 67 replacing REAL-TIME text */}
          <p className="text-sm md:text-base uppercase tracking-widest text-indigo-400 font-extrabold">
            MINGGU ALPHA 67
          </p>
        </div>
      </div>

      {/* Second Square: NYAOSI PIRSA */}
      <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Left Aligned Header */}
        <div className="border-b border-white/10 pb-4 text-left">
          <h3 className="text-lg md:text-xl font-bold text-white tracking-wide uppercase">
            NYAOSI PIRSA
          </h3>
        </div>

        {/* Content Body */}
        <div className="rounded-xl bg-[#121212] border border-white/5 p-5 md:p-6 text-slate-200 text-sm md:text-base leading-relaxed space-y-4 font-sans">
          <div className="font-semibold text-indigo-300 text-base flex items-center space-x-2">
            <span>🐇 NYAOSI PIRSA 🐇</span>
          </div>

          <p className="text-slate-300 font-medium">
            Mohon perhatian bagi petugas minggu ini tanggal 25 - 26 Juli 2026
          </p>

          <div className="space-y-1.5 pl-2 text-slate-200 font-medium border-l-2 border-indigo-500/40">
            <p>🐰 Minggu Biasa XVII</p>
            <p>🐰 Doa Sebelum Misa: MOHON PANGGILAN</p>
            <p>🐰 Anamnese: 2B</p>
            <p>🐰 Bapa Kami: Pater Noster 2</p>
          </div>

          <div className="pt-3 border-t border-white/10 text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300 uppercase tracking-wider">
              Catatan Kaki
            </p>
            <p>- Terdapat 2 versi bacaan injil. Petugas menyesuaikan.</p>
          </div>
        </div>
      </div>

      {/* Middle Squared Text Section Divider: TOOLS */}
      <div className="flex justify-center pt-2 pb-2">
        <div className="px-8 py-2.5 rounded-xl bg-[#161616] border border-white/15 text-sm font-extrabold tracking-widest text-indigo-400 uppercase shadow-lg shadow-black/40 ring-1 ring-white/5">
          TOOLS
        </div>
      </div>

      {/* 2 Square Tools Below */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tool 1: OTOMATEKS */}
        <a
          href="https://otomateks.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-xl transition-all hover:border-indigo-500/50 hover:bg-[#1a1a1a] hover:shadow-indigo-500/10 active:scale-98 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            {/* Typewriter Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Keyboard className="h-6 w-6" />
            </div>
            <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </div>

          <div className="mt-5 space-y-2">
            <h4 className="text-lg font-extrabold tracking-wider text-white group-hover:text-indigo-300 transition-colors">
              OTOMATEKS
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Turn &apos;Panduan Misa&apos; file into useable PowerPoint file in
              several minutes.
            </p>
          </div>
        </a>

        {/* Tool 2: ARTEKSFAK */}
        <button
          onClick={handleArteksfakClick}
          className="group text-left w-full rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-xl transition-all hover:border-indigo-500/50 hover:bg-[#1a1a1a] hover:shadow-indigo-500/10 active:scale-98 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            {/* Paper with Pen Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <FilePenLine className="h-6 w-6" />
            </div>
            <span className="text-[10px] uppercase font-bold text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">
              Coming Soon
            </span>
          </div>

          <div className="mt-5 space-y-2">
            <h4 className="text-lg font-extrabold tracking-wider text-white group-hover:text-indigo-300 transition-colors">
              ARTEKSFAK
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Make &apos;Panduan File&apos; within seconds using premade
              database.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
