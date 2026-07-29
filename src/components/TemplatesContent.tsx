import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Copy,
  Check,
  ExternalLink,
  FilePenLine,
  Megaphone,
  BookOpen,
  Sparkles,
  FolderOpen,
} from 'lucide-react';
import { TypewriterIcon } from './TypewriterIcon';

interface TemplatesContentProps {
  enableCopy?: boolean;
  theme?: 'dark' | 'light';
}

export const TemplatesContent: React.FC<TemplatesContentProps> = ({ enableCopy = true, theme = 'dark' }) => {
  const isLight = theme === 'light';
  const [copied, setCopied] = useState(false);
  const [copyDisabledNotice, setCopyDisabledNotice] = useState(false);
  const [comingSoonToast, setComingSoonToast] = useState(false);

  const templateText = '[Tahun X] Type - Language - Week Title (dd/mm/yyyy)';

  const handleCopy = () => {
    if (!enableCopy) {
      setCopyDisabledNotice(true);
      setTimeout(() => setCopyDisabledNotice(false), 2500);
      return;
    }
    navigator.clipboard.writeText(templateText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const handlePlaybookClick = () => {
    setComingSoonToast(true);
    setTimeout(() => {
      setComingSoonToast(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 relative">
      {/* 3-Second Toast Popup for Playbook User Manual */}
      <AnimatePresence>
        {copyDisabledNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-20 right-6 z-50 flex items-center space-x-3 rounded-xl border px-5 py-3.5 shadow-2xl ring-1 ${
              isLight
                ? 'bg-white border-rose-200 text-slate-800 ring-rose-500/30'
                : 'bg-[#1e1e1e] border-rose-500/30 text-white ring-rose-500/50'
            }`}
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isLight ? 'bg-rose-100 text-rose-600' : 'bg-rose-600/20 text-rose-400'}`}>
              <Copy className="h-4 w-4" />
            </div>
            <div>
              <p className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>COPY DISABLED</p>
              <p className={`text-xs font-medium ${isLight ? 'text-rose-600' : 'text-rose-300'}`}>
                Copy feature is disabled in Settings.
              </p>
            </div>
          </motion.div>
        )}
        {comingSoonToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-20 right-6 z-50 flex items-center space-x-3 rounded-xl border px-5 py-3.5 shadow-2xl ring-1 ${
              isLight
                ? 'bg-white border-indigo-200 text-slate-800 ring-indigo-500/30'
                : 'bg-[#1e1e1e] border-indigo-500/30 text-white ring-indigo-500/50'
            }`}
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isLight ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-600/20 text-indigo-400'}`}>
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>PLAYBOOK</p>
              <p className={`text-xs font-medium ${isLight ? 'text-indigo-600' : 'text-indigo-300'}`}>
                Coming Soon! Feature under development.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Badge Divider: MASTER FILES */}
      <div className="flex justify-center pt-2 pb-2">
        <div className={`px-8 py-2.5 rounded-xl border text-sm font-extrabold tracking-widest uppercase shadow-lg ring-1 ${
          isLight
            ? 'bg-white border-slate-200 text-indigo-600 ring-black/5 shadow-slate-200'
            : 'bg-[#161616] border-white/15 text-indigo-400 ring-white/5 shadow-black/40'
        }`}>
          MASTER FILES
        </div>
      </div>

      {/* Divided Square Grid for Master Files */}
      <div className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory">
        {/* Card 1: TEKS MISA */}
        <a
          href="https://drive.google.com/drive/folders/1ya5029YGQHuT7ZRB8VmRrl5TkHOwswCZ?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className={`group snap-start min-w-[260px] md:min-w-[280px] flex-1 rounded-2xl border p-6 shadow-xl transition-all active:scale-98 relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 shadow-slate-200/50'
              : 'bg-[#161616] border-white/10 hover:border-indigo-500/50 hover:bg-[#1a1a1a] hover:shadow-indigo-500/10'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border group-hover:bg-indigo-600 group-hover:text-white transition-all ${
              isLight
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'bg-indigo-600/15 border-indigo-500/30 text-indigo-400'
            }`}>
              <TypewriterIcon className="h-6 w-6" />
            </div>
            <ExternalLink className={`h-4 w-4 transition-colors ${isLight ? 'text-slate-400 group-hover:text-indigo-600' : 'text-slate-500 group-hover:text-indigo-400'}`} />
          </div>

          <div className="mt-5 space-y-1.5">
            <h4 className={`text-lg font-extrabold tracking-wider uppercase transition-colors ${
              isLight ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-indigo-300'
            }`}>
              TEKS MISA
            </h4>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Access Teks Misa&apos;s PowerPoint template here.
            </p>
          </div>
        </a>

        {/* Card 2: PANDUAN MISA */}
        <a
          href="https://drive.google.com/drive/folders/1LldYbhtFgJlCeoaPIa0dpw8NqkXtUrGr?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className={`group snap-start min-w-[260px] md:min-w-[280px] flex-1 rounded-2xl border p-6 shadow-xl transition-all active:scale-98 relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 shadow-slate-200/50'
              : 'bg-[#161616] border-white/10 hover:border-purple-500/50 hover:bg-[#1a1a1a] hover:shadow-purple-500/10'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border group-hover:bg-purple-600 group-hover:text-white transition-all ${
              isLight
                ? 'bg-purple-50 border-purple-200 text-purple-600'
                : 'bg-purple-600/15 border-purple-500/30 text-purple-400'
            }`}>
              <FilePenLine className="h-6 w-6" />
            </div>
            <ExternalLink className={`h-4 w-4 transition-colors ${isLight ? 'text-slate-400 group-hover:text-purple-600' : 'text-slate-500 group-hover:text-purple-400'}`} />
          </div>

          <div className="mt-5 space-y-1.5">
            <h4 className={`text-lg font-extrabold tracking-wider uppercase transition-colors ${
              isLight ? 'text-slate-900 group-hover:text-purple-600' : 'text-white group-hover:text-purple-300'
            }`}>
              PANDUAN MISA
            </h4>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Access Panduan Misa&apos;s Word template here.
            </p>
          </div>
        </a>

        {/* Card 3: PENGUMUMAN */}
        <a
          href="https://drive.google.com/drive/folders/14UCiM9sybe22j23L-lIuwB32ba8JLzGm?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className={`group snap-start min-w-[260px] md:min-w-[280px] flex-1 rounded-2xl border p-6 shadow-xl transition-all active:scale-98 relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 shadow-slate-200/50'
              : 'bg-[#161616] border-white/10 hover:border-amber-500/50 hover:bg-[#1a1a1a] hover:shadow-amber-500/10'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border group-hover:bg-amber-600 group-hover:text-white transition-all ${
              isLight
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'bg-amber-600/15 border-amber-500/30 text-amber-400'
            }`}>
              <Megaphone className="h-6 w-6" />
            </div>
            <ExternalLink className={`h-4 w-4 transition-colors ${isLight ? 'text-slate-400 group-hover:text-amber-600' : 'text-slate-500 group-hover:text-amber-400'}`} />
          </div>

          <div className="mt-5 space-y-1.5">
            <h4 className={`text-lg font-extrabold tracking-wider uppercase transition-colors ${
              isLight ? 'text-slate-900 group-hover:text-amber-600' : 'text-white group-hover:text-amber-300'
            }`}>
              PENGUMUMAN
            </h4>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Access Pengumuman&apos;s PowerPoint template here.
            </p>
          </div>
        </a>
      </div>

      {/* TITLE TEMPLATE Main Square */}
      <div className={`rounded-2xl border p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50'
          : 'bg-[#161616] border-white/10 text-white'
      }`}>
        {/* Left Aligned Header */}
        <div className={`border-b pb-4 text-left ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <h3 className={`text-lg md:text-xl font-bold tracking-wide uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
            TITLE TEMPLATE
          </h3>
        </div>

        {/* Content Body */}
        <div className={`rounded-xl border p-5 md:p-6 text-sm md:text-base leading-relaxed space-y-4 font-sans ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-800'
            : 'bg-[#121212] border-white/5 text-slate-200'
        }`}>
          {/* Clickable Copy Box with Centered Text */}
          <button
            onClick={handleCopy}
            className={`group w-full flex items-center justify-center relative rounded-xl border px-4 py-4 text-center transition-all active:scale-[0.99] shadow-inner ${
              isLight
                ? 'bg-white border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50/50'
                : 'bg-[#161616] border-indigo-500/30 hover:border-indigo-500 hover:bg-[#1f1f1f]'
            }`}
          >
            <code className={`text-sm md:text-base font-mono font-semibold transition-colors text-center pr-12 ${
              isLight ? 'text-indigo-700 group-hover:text-indigo-900' : 'text-indigo-300 group-hover:text-white'
            }`}>
              {templateText}
            </code>
            <div className="absolute right-4 flex items-center">
              {copied ? (
                <span className="flex items-center space-x-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </span>
              ) : (
                <span className={`flex items-center space-x-1.5 text-xs font-medium transition-colors border px-2.5 py-1 rounded-md ${
                  isLight
                    ? 'text-slate-600 bg-slate-100 border-slate-200 group-hover:text-indigo-600'
                    : 'text-slate-400 bg-white/5 border-white/10 group-hover:text-indigo-400'
                }`}>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </span>
              )}
            </div>
          </button>

          {/* Usage Example Small Text */}
          <p className={`text-xs font-mono text-center pt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>Usage Example:</span>{' '}
            [Tahun A] Mingguan - Bahasa Jawa - Minggu Biasa XVII (25 - 26 07 2026)
          </p>
        </div>
      </div>

      {/* 3. USER MANUAL Square */}
      <div className={`rounded-2xl border p-6 md:p-8 shadow-2xl space-y-4 relative overflow-hidden ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50'
          : 'bg-[#161616] border-white/10 text-white'
      }`}>
        <div className={`border-b pb-3 text-left flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <div className="flex items-center space-x-2">
            <BookOpen className={`h-5 w-5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
            <h3 className={`text-lg md:text-xl font-bold tracking-wide uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
              USER MANUAL
            </h3>
          </div>
          <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-md ${
            isLight
              ? 'text-amber-700 bg-amber-100 border border-amber-300'
              : 'text-amber-400/80 bg-amber-400/10 border border-amber-400/20'
          }`}>
            Coming Soon
          </span>
        </div>

        {/* Clickable Field */}
        <button
          onClick={handlePlaybookClick}
          className={`group text-left w-full rounded-xl border p-5 transition-all active:scale-[0.99] space-y-2 ${
            isLight
              ? 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-slate-100/80'
              : 'bg-[#121212] border-white/5 hover:border-indigo-500/40 hover:bg-[#181818]'
          }`}
        >
          <p className={`text-sm md:text-base leading-relaxed font-medium ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
            Need help or tutorials about everything? Click this field to read the &quot;Divisi Teks Misa Playbook&quot; for comprehensive guidelines on the Teks Misa Division.
          </p>
          <p className={`text-xs font-semibold ${isLight ? 'text-indigo-600 group-hover:text-indigo-700' : 'text-indigo-400 group-hover:text-indigo-300'}`}>
            Read Divisi Teks Misa Playbook &gt;
          </p>
        </button>
      </div>
    </div>
  );
};
