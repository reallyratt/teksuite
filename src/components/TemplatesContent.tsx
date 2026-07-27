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
}

export const TemplatesContent: React.FC<TemplatesContentProps> = ({ enableCopy = true }) => {
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
            className="fixed top-20 right-6 z-50 flex items-center space-x-3 rounded-xl border border-rose-500/30 bg-[#1e1e1e] px-5 py-3.5 shadow-2xl text-white ring-1 ring-rose-500/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600/20 text-rose-400">
              <Copy className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">COPY DISABLED</p>
              <p className="text-xs text-rose-300 font-medium">
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
            className="fixed top-20 right-6 z-50 flex items-center space-x-3 rounded-xl border border-indigo-500/30 bg-[#1e1e1e] px-5 py-3.5 shadow-2xl text-white ring-1 ring-indigo-500/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">PLAYBOOK</p>
              <p className="text-xs text-indigo-300 font-medium">
                Coming Soon! Feature under development.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Badge Divider: MASTER FILES */}
      <div className="flex justify-center pt-2 pb-2">
        <div className="px-8 py-2.5 rounded-xl bg-[#161616] border border-white/15 text-sm font-extrabold tracking-widest text-indigo-400 uppercase shadow-lg shadow-black/40 ring-1 ring-white/5">
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
          className="group snap-start min-w-[260px] md:min-w-[280px] flex-1 rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-xl transition-all hover:border-indigo-500/50 hover:bg-[#1a1a1a] hover:shadow-indigo-500/10 active:scale-98 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <TypewriterIcon className="h-6 w-6" />
            </div>
            <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </div>

          <div className="mt-5 space-y-1.5">
            <h4 className="text-lg font-extrabold tracking-wider text-white uppercase group-hover:text-indigo-300 transition-colors">
              TEKS MISA
            </h4>
            <p className="text-xs text-slate-400">
              Access Teks Misa&apos;s PowerPoint template here.
            </p>
          </div>
        </a>

        {/* Card 2: PANDUAN MISA */}
        <a
          href="https://drive.google.com/drive/folders/1LldYbhtFgJlCeoaPIa0dpw8NqkXtUrGr?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="group snap-start min-w-[260px] md:min-w-[280px] flex-1 rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-xl transition-all hover:border-indigo-500/50 hover:bg-[#1a1a1a] hover:shadow-indigo-500/10 active:scale-98 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/15 border border-purple-500/30 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <FilePenLine className="h-6 w-6" />
            </div>
            <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
          </div>

          <div className="mt-5 space-y-1.5">
            <h4 className="text-lg font-extrabold tracking-wider text-white uppercase group-hover:text-purple-300 transition-colors">
              PANDUAN MISA
            </h4>
            <p className="text-xs text-slate-400">
              Access Panduan Misa&apos;s Word template here.
            </p>
          </div>
        </a>

        {/* Card 3: PENGUMUMAN */}
        <a
          href="https://drive.google.com/drive/folders/14UCiM9sybe22j23L-lIuwB32ba8JLzGm?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="group snap-start min-w-[260px] md:min-w-[280px] flex-1 rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-xl transition-all hover:border-amber-500/50 hover:bg-[#1a1a1a] hover:shadow-amber-500/10 active:scale-98 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600/15 border border-amber-500/30 text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-all">
              <Megaphone className="h-6 w-6" />
            </div>
            <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </div>

          <div className="mt-5 space-y-1.5">
            <h4 className="text-lg font-extrabold tracking-wider text-white uppercase group-hover:text-amber-300 transition-colors">
              PENGUMUMAN
            </h4>
            <p className="text-xs text-slate-400">
              Access Pengumuman&apos;s PowerPoint template here.
            </p>
          </div>
        </a>
      </div>

      {/* TITLE TEMPLATE Main Square */}
      <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Left Aligned Header */}
        <div className="border-b border-white/10 pb-4 text-left">
          <h3 className="text-lg md:text-xl font-bold text-white tracking-wide uppercase">
            TITLE TEMPLATE
          </h3>
        </div>

        {/* Content Body */}
        <div className="rounded-xl bg-[#121212] border border-white/5 p-5 md:p-6 text-slate-200 text-sm md:text-base leading-relaxed space-y-4 font-sans">
          {/* Clickable Copy Box with Centered Text */}
          <button
            onClick={handleCopy}
            className="group w-full flex items-center justify-center relative rounded-xl border border-indigo-500/30 bg-[#161616] px-4 py-4 text-center transition-all hover:border-indigo-500 hover:bg-[#1f1f1f] active:scale-[0.99] shadow-inner"
          >
            <code className="text-sm md:text-base font-mono font-semibold text-indigo-300 group-hover:text-white transition-colors text-center pr-12">
              {templateText}
            </code>
            <div className="absolute right-4 flex items-center">
              {copied ? (
                <span className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1.5 text-xs font-medium text-slate-400 group-hover:text-indigo-400 transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </span>
              )}
            </div>
          </button>

          {/* Usage Example Small Text */}
          <p className="text-xs text-slate-400 font-mono text-center pt-1">
            <span className="text-slate-300 font-bold">Usage Example:</span>{' '}
            [Tahun A] Mingguan - Bahasa Jawa - Minggu Biasa XVII (25 - 26 07 2026)
          </p>
        </div>
      </div>

      {/* 3. USER MANUAL Square */}
      <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 md:p-8 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="border-b border-white/10 pb-3 text-left flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <h3 className="text-lg md:text-xl font-bold text-white tracking-wide uppercase">
              USER MANUAL
            </h3>
          </div>
          <span className="text-[10px] uppercase font-bold text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-md">
            Coming Soon
          </span>
        </div>

        {/* Clickable Field */}
        <button
          onClick={handlePlaybookClick}
          className="group text-left w-full rounded-xl bg-[#121212] border border-white/5 p-5 transition-all hover:border-indigo-500/40 hover:bg-[#181818] active:scale-[0.99] space-y-2"
        >
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
            Need help or tutorials about everything? Click this field to read the &quot;Divisi Teks Misa Playbook&quot; for comprehensive guidelines on the Teks Misa Division.
          </p>
          <p className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
            Read Divisi Teks Misa Playbook &gt;
          </p>
        </button>
      </div>
    </div>
  );
};
