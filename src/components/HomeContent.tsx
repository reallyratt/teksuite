import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  ExternalLink,
  FilePenLine,
  Sparkles,
  FolderOpen,
} from 'lucide-react';
import { TypewriterIcon } from './TypewriterIcon';

const extractTagContent = (rawText: string, startTag: string, endTag: string): string => {
  const startIndex = rawText.indexOf(startTag);
  if (startIndex === -1) return '';
  const contentStart = startIndex + startTag.length;
  const endIndex = rawText.indexOf(endTag, contentStart);
  if (endIndex === -1) return rawText.substring(contentStart).trim();
  return rawText.substring(contentStart, endIndex).trim();
};

interface HomeContentProps {
  theme?: 'dark' | 'light';
}

export const HomeContent: React.FC<HomeContentProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const [time, setTime] = useState(new Date());
  const [comingSoonToast, setComingSoonToast] = useState(false);
  const [namaMinggu, setNamaMinggu] = useState<string>('MINGGU BIASA XVII');
  const [nyaosiText, setNyaosiText] = useState<string>('');

  // Fetch Google Doc content
  useEffect(() => {
    const fetchDoc = async () => {
      try {
        let text = '';
        try {
          const res = await fetch('/api/gdoc');
          if (res.ok) {
            text = await res.text();
          }
        } catch {
          // ignore error and try direct fetch
        }

        if (!text) {
          const directRes = await fetch(
            'https://docs.google.com/document/d/1jJst-YDMbhZVFSPCWrEC1d0PVZl6urMaZ3xGTo7t0MA/export?format=txt'
          );
          if (directRes.ok) {
            text = await directRes.text();
          }
        }

        if (text) {
          const parsedNama = extractTagContent(text, 'in>>nmmgg>>', '<<out<<nmmgg');
          if (parsedNama) {
            setNamaMinggu(parsedNama);
          }

          const parsedNyaosi = extractTagContent(text, 'in>>nyosprs>>', '<<out<<nyosprs');
          if (parsedNyaosi) {
            setNyaosiText(parsedNyaosi);
          }
        }
      } catch (err) {
        console.error('Failed to fetch doc content:', err);
      }
    };

    fetchDoc();
  }, []);

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

  const renderNyaosiContent = () => {
    if (!nyaosiText) {
      return (
        <>
          <div className={`font-semibold text-base flex items-center space-x-2 ${isLight ? 'text-indigo-600' : 'text-indigo-300'}`}>
            <span>🐇 NYAOSI PIRSA 🐇</span>
          </div>

          <p className={`font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            Mohon perhatian bagi petugas minggu ini tanggal 25 - 26 Juli 2026
          </p>

          <div className={`space-y-1.5 pl-2 font-medium border-l-2 ${isLight ? 'border-indigo-500 text-slate-800' : 'border-indigo-500/40 text-slate-200'}`}>
            <p>🐰 Minggu Biasa XVII</p>
            <p>🐰 Doa Sebelum Misa: MOHON PANGGILAN</p>
            <p>🐰 Anamnese: 2B</p>
            <p>🐰 Bapa Kami: Pater Noster 2</p>
          </div>

          <div className={`pt-3 border-t text-xs space-y-1 ${isLight ? 'border-slate-200 text-slate-500' : 'border-white/10 text-slate-400'}`}>
            <p className={`font-semibold uppercase tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
              Catatan Kaki
            </p>
            <p>- Terdapat 2 versi bacaan injil. Petugas menyesuaikan.</p>
          </div>
        </>
      );
    }

    const lines = nyaosiText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const headerLine = lines.find((l) => l.includes('NYAOSI PIRSA') || l.startsWith('🐇'));
    const bodyNotice = lines.find((l) => l.toLowerCase().includes('mohon perhatian'));
    const rabbitLines = lines.filter((l) => l.startsWith('🐰'));
    const catatanIndex = lines.findIndex((l) => l.toLowerCase().includes('catatan kaki'));
    const footnoteLines = catatanIndex !== -1 ? lines.slice(catatanIndex + 1) : [];

    if (rabbitLines.length === 0 && !headerLine) {
      return (
        <div className={`whitespace-pre-wrap font-medium leading-relaxed ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
          {nyaosiText}
        </div>
      );
    }

    return (
      <>
        {headerLine && (
          <div className={`font-semibold text-base flex items-center space-x-2 ${isLight ? 'text-indigo-600' : 'text-indigo-300'}`}>
            <span>{headerLine}</span>
          </div>
        )}

        {bodyNotice && (
          <p className={`font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{bodyNotice}</p>
        )}

        {rabbitLines.length > 0 && (
          <div className={`space-y-1.5 pl-2 font-medium border-l-2 ${isLight ? 'border-indigo-500 text-slate-800' : 'border-indigo-500/40 text-slate-200'}`}>
            {rabbitLines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}

        {catatanIndex !== -1 && (
          <div className={`pt-3 border-t text-xs space-y-1 ${isLight ? 'border-slate-200 text-slate-500' : 'border-white/10 text-slate-400'}`}>
            <p className={`font-semibold uppercase tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
              {lines[catatanIndex]}
            </p>
            {footnoteLines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}
      </>
    );
  };

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
              <p className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>ARTEKSFAK</p>
              <p className={`text-xs font-medium ${isLight ? 'text-indigo-600' : 'text-indigo-300'}`}>
                Coming Soon! Feature under development.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transparent Time Section */}
      <div className="py-2 flex flex-col items-center justify-center text-center space-y-4">
        {/* Date Day */}
        <div className={`flex items-center space-x-2 rounded-full border px-4 py-1.5 text-xs font-semibold ${
          isLight
            ? 'bg-slate-200/80 border-slate-300 text-slate-800 shadow-2xs'
            : 'bg-white/[0.05] border-white/10 text-slate-300'
        }`}>
          <Calendar className={`h-4 w-4 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
          <span>{formattedDate}</span>
        </div>

        {/* Centered Clock */}
        <div className="space-y-2">
          <div className={`text-5xl md:text-7xl font-black tracking-tight font-mono drop-shadow-xs ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {formattedClock}
          </div>

          {/* Dynamic Nama Minggu from Google Doc */}
          <p className={`text-sm md:text-base uppercase tracking-widest font-extrabold ${
            isLight ? 'text-indigo-600' : 'text-indigo-400'
          }`}>
            {namaMinggu}
          </p>
        </div>
      </div>

      {/* Second Square: NYAOSI PIRSA */}
      <div className={`rounded-2xl border p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50'
          : 'bg-[#161616] border-white/10 text-white'
      }`}>
        {/* Left Aligned Header */}
        <div className={`border-b pb-4 text-left ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <h3 className={`text-lg md:text-xl font-bold tracking-wide uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
            NYAOSI PIRSA
          </h3>
        </div>

        {/* Content Body */}
        <div className={`rounded-xl border p-5 md:p-6 text-sm md:text-base leading-relaxed space-y-4 font-sans ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-800'
            : 'bg-[#121212] border-white/5 text-slate-200'
        }`}>
          {renderNyaosiContent()}
        </div>
      </div>

      {/* SOURCE FILE Square */}
      <div className={`rounded-2xl border p-6 md:p-8 shadow-2xl space-y-4 relative overflow-hidden ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50'
          : 'bg-[#161616] border-white/10 text-white'
      }`}>
        <div className={`border-b pb-3 text-left flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <div className="flex items-center space-x-2">
            <FolderOpen className={`h-5 w-5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
            <h3 className={`text-lg md:text-xl font-bold tracking-wide uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
              SOURCE FILE
            </h3>
          </div>
        </div>

        {/* Clickable Field 1: Source File */}
        <a
          href="https://drive.google.com/drive/folders/1A2ggUvUuC9Dcm-MLhrI_NGsHDdJn1awu?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className={`group block text-left w-full rounded-xl border p-5 transition-all active:scale-[0.99] space-y-2 ${
            isLight
              ? 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-slate-100/80'
              : 'bg-[#121212] border-white/5 hover:border-indigo-500/40 hover:bg-[#181818]'
          }`}
        >
          <p className={`text-sm md:text-base leading-relaxed font-medium ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
            Click here for this month&apos;s active Source File to begin generating Panduan Misa.
          </p>
          <p className={`text-xs font-semibold ${isLight ? 'text-indigo-600 group-hover:text-indigo-700' : 'text-indigo-400 group-hover:text-indigo-300'}`}>
            Source File &gt;
          </p>
        </a>

        {/* Clickable Field 2: Panduan Misa */}
        <a
          href="https://drive.google.com/drive/folders/1H69RDtzg4HNQe7YV5gK8jJUPFDt8nekv?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className={`group block text-left w-full rounded-xl border p-5 transition-all active:scale-[0.99] space-y-2 ${
            isLight
              ? 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-slate-100/80'
              : 'bg-[#121212] border-white/5 hover:border-indigo-500/40 hover:bg-[#181818]'
          }`}
        >
          <p className={`text-sm md:text-base leading-relaxed font-medium ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
            Click here for this month&apos;s active Panduan Misa to begin generating Teks Misa.
          </p>
          <p className={`text-xs font-semibold ${isLight ? 'text-indigo-600 group-hover:text-indigo-700' : 'text-indigo-400 group-hover:text-indigo-300'}`}>
            Panduan Misa &gt;
          </p>
        </a>
      </div>

      {/* Middle Squared Text Section Divider: TOOLS */}
      <div className="flex justify-center pt-2 pb-2">
        <div className={`px-8 py-2.5 rounded-xl border text-sm font-extrabold tracking-widest uppercase shadow-lg ring-1 ${
          isLight
            ? 'bg-white border-slate-200 text-indigo-600 ring-black/5 shadow-slate-200'
            : 'bg-[#161616] border-white/15 text-indigo-400 ring-white/5 shadow-black/40'
        }`}>
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
          className={`group block rounded-2xl border p-6 shadow-xl transition-all active:scale-98 relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 shadow-slate-200/50'
              : 'bg-[#161616] border-white/10 hover:border-indigo-500/50 hover:bg-[#1a1a1a] hover:shadow-indigo-500/10'
          }`}
        >
          <div className="flex items-start justify-between">
            {/* Typewriter Icon */}
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border group-hover:bg-indigo-600 group-hover:text-white transition-all ${
              isLight
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'bg-indigo-600/15 border-indigo-500/30 text-indigo-400'
            }`}>
              <TypewriterIcon className="h-6 w-6" />
            </div>
            <ExternalLink className={`h-4 w-4 transition-colors ${isLight ? 'text-slate-400 group-hover:text-indigo-600' : 'text-slate-500 group-hover:text-indigo-400'}`} />
          </div>

          <div className="mt-5 space-y-2">
            <h4 className={`text-lg font-extrabold tracking-wider transition-colors ${
              isLight ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-indigo-300'
            }`}>
              OTOMATEKS
            </h4>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Turn &apos;Panduan Misa&apos; file into useable PowerPoint file in
              several minutes.
            </p>
          </div>
        </a>

        {/* Tool 2: ARTEKSFAK */}
        <button
          onClick={handleArteksfakClick}
          className={`group text-left w-full rounded-2xl border p-6 shadow-xl transition-all active:scale-98 relative overflow-hidden ${
            isLight
              ? 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 shadow-slate-200/50'
              : 'bg-[#161616] border-white/10 hover:border-indigo-500/50 hover:bg-[#1a1a1a] hover:shadow-indigo-500/10'
          }`}
        >
          <div className="flex items-start justify-between">
            {/* Paper with Pen Icon */}
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border group-hover:bg-indigo-600 group-hover:text-white transition-all ${
              isLight
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'bg-indigo-600/15 border-indigo-500/30 text-indigo-400'
            }`}>
              <FilePenLine className="h-6 w-6" />
            </div>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
              isLight
                ? 'text-amber-700 bg-amber-100 border border-amber-300'
                : 'text-amber-400/80 bg-amber-400/10 border border-amber-400/20'
            }`}>
              Coming Soon
            </span>
          </div>

          <div className="mt-5 space-y-2">
            <h4 className={`text-lg font-extrabold tracking-wider transition-colors ${
              isLight ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-indigo-300'
            }`}>
              ARTEKSFAK
            </h4>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Make &apos;Panduan File&apos; within seconds using premade
              database.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
