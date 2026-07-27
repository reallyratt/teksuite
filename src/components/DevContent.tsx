import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  ListChecks,
} from 'lucide-react';

interface DevContentProps {
  onLock: () => void;
}

type DevTabId = 'otmt' | 'atf' | 'tksr';

const extractTagContent = (rawText: string, startTag: string, endTag: string): string => {
  const startIndex = rawText.indexOf(startTag);
  if (startIndex === -1) return '';
  const contentStart = startIndex + startTag.length;
  let endIndex = rawText.indexOf(endTag, contentStart);
  if (endIndex === -1 && endTag.startsWith('<<')) {
    endIndex = rawText.indexOf(endTag.substring(2), contentStart);
  }
  if (endIndex === -1) return rawText.substring(contentStart).trim();
  return rawText.substring(contentStart, endIndex).trim();
};

export const DevContent: React.FC<DevContentProps> = ({ onLock }) => {
  // Google Doc fetched notes
  const [mlstnsText, setMlstnsText] = useState<string>('');
  const [otmtText, setOtmtText] = useState<string>('');
  const [atfText, setAtfText] = useState<string>('');
  const [tksrText, setTksrText] = useState<string>('');
  const [loadingDoc, setLoadingDoc] = useState<boolean>(true);

  // Active Tab state for Tools section
  const [activeTab, setActiveTab] = useState<DevTabId>('otmt');

  // Calendar State
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

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
          // Fallback to direct fetch
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
          const parsedMlstns = extractTagContent(text, 'in>>mlstns>>', '<<out<<mlstns');
          if (parsedMlstns) setMlstnsText(parsedMlstns);

          const parsedOtmt = extractTagContent(text, 'in>>otmt>>', '<<out<<otmt');
          if (parsedOtmt) setOtmtText(parsedOtmt);

          const parsedAtf = extractTagContent(text, 'in>>atf>>', '<<out<<atf');
          if (parsedAtf) setAtfText(parsedAtf);

          const parsedTksr = extractTagContent(text, 'in>>tksr>>', '<<out<<tksr');
          if (parsedTksr) setTksrText(parsedTksr);
        }
      } catch (err) {
        console.error('Failed to fetch doc content for Developer page:', err);
      } finally {
        setLoadingDoc(false);
      }
    };

    fetchDoc();
  }, []);

  // Calendar Navigation Handlers
  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleResetToToday = () => {
    setCurrentDate(new Date());
  };

  // Calendar calculations
  const calYear = currentDate.getFullYear();
  const calMonth = currentDate.getMonth();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = monthNames[calMonth];

  // First day of current month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDayOfMonth = new Date(calYear, calMonth, 1).getDay();
  // Total days in current month
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  // Total days in previous month
  const daysInPrevMonth = new Date(calYear, calMonth, 0).getDate();

  // Helper to format notes into styled lines
  const renderFormattedNotes = (rawText: string, fallbackText: string) => {
    const textToRender = rawText.trim() ? rawText : fallbackText;
    const lines = textToRender.split('\n');

    return (
      <div className="space-y-2">
        {lines.map((line, index) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={index} className="h-1" />;

          // Check if line is a header (no leading bullet '-')
          const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•');
          const isHeader = !isBullet && trimmed.length > 0;

          if (isHeader) {
            return (
              <p
                key={index}
                className="text-sm font-extrabold text-indigo-400 uppercase tracking-wider pt-2 first:pt-0"
              >
                {trimmed}
              </p>
            );
          }

          const content = isBullet ? trimmed.substring(1).trim() : trimmed;

          return (
            <div key={index} className="flex items-start space-x-2.5 text-slate-200">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
              <span className="text-sm font-medium leading-relaxed">{content}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const defaultMlstns = `- freeshow template\n- uji coba freeshow\n- perizinan freeshow\n- template ppt v2.0\n- Tekser - pocket quality control`;

  const defaultOtmt = `Bugs\n- Pemenggalan lagu\n- Placeholder di lagu persembahan\n- Small font enter ketika linebreak\n- Prioritas pemenggalan teks\n- Font scaling di pengumuman maker\n\nUpcoming Feature\n- Rich text\n- Custom field maker`;

  const defaultAtf = `Database\n- Scan and format KA\n- Scan and format PS\n- Scan and format MB\n- Scan and format Tahun A\n- Scan and format Tahun B\n- Scan and format Tahun C\n- Scan and format Tahun Ganjil\n- Scan and format Tahun Genap`;

  const defaultTksr = `Finish the other two first`;

  const tabsConfig: { id: DevTabId; title: string; text: string; fallback: string }[] = [
    {
      id: 'otmt',
      title: 'OTOMATEKS',
      text: otmtText,
      fallback: defaultOtmt,
    },
    {
      id: 'atf',
      title: 'ARTEKSFAK',
      text: atfText,
      fallback: defaultAtf,
    },
    {
      id: 'tksr',
      title: 'TEKSER',
      text: tksrText,
      fallback: defaultTksr,
    },
  ];

  const currentTabObj = tabsConfig.find((t) => t.id === activeTab) || tabsConfig[0];

  return (
    <div className="space-y-8 relative">
      {/* Top Logout Button Bar */}
      <div className="flex items-center justify-end">
        <button
          onClick={onLock}
          className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-all active:scale-95"
        >
          <LogOut className="h-3.5 w-3.5 text-indigo-400" />
          <span>Logout</span>
        </button>
      </div>

      {/* 1. ACROSS SQUARE: MILESTONES (like NYAOSI PIRSA) */}
      <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 md:p-8 shadow-2xl space-y-4 relative overflow-hidden">
        {/* Left Aligned Header */}
        <div className="border-b border-white/10 pb-3 text-left flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ListChecks className="h-5 w-5 text-indigo-400" />
            <h3 className="text-lg md:text-xl font-bold text-white tracking-wide uppercase">
              MILESTONES
            </h3>
          </div>
        </div>

        {/* Content Body Box */}
        <div className="rounded-xl bg-[#121212] border border-white/5 p-5 md:p-6 text-slate-200 text-sm md:text-base leading-relaxed font-sans">
          {renderFormattedNotes(mlstnsText, defaultMlstns)}
        </div>
      </div>

      {/* 2. MIDDLE DIVIDER SQUARE (like TOOLS divider, without text) */}
      <div className="flex justify-center pt-1 pb-1">
        <div className="h-2.5 w-20 rounded-full bg-[#161616] border border-white/15 shadow-lg shadow-black/40 ring-1 ring-white/5" />
      </div>

      {/* 3. SPLIT SECTION: Left Tabs + Right Calendar (Side by Side Horizontally) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN: MULTI-TAB BOX (OTOMATEKS, ARTEKSFAK, TEKSER) */}
        <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-2xl space-y-5 relative overflow-hidden">
          {/* Tab Selector Row with Smooth Square Highlight / Slider */}
          <div className="border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {tabsConfig.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="devTabSlider"
                        className="absolute inset-0 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30 border border-indigo-400/30"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Notes Content Box */}
          <div className="rounded-xl bg-[#121212] border border-white/5 p-5 text-slate-200 text-sm leading-relaxed min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                {renderFormattedNotes(currentTabObj.text, currentTabObj.fallback)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: CALENDAR WIDGET */}
        <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-2xl space-y-4 relative overflow-hidden">
          {/* Calendar Header: < Month, Year > */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <button
              onClick={handlePrevMonth}
              title="Previous Month"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all active:scale-95 border border-white/5"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={handleResetToToday}
              title="Click to reset to current month"
              className="flex items-center space-x-2 group"
            >
              <CalendarIcon className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-extrabold text-white tracking-wide uppercase group-hover:text-indigo-300 transition-colors">
                {monthName} {calYear}
              </span>
            </button>

            <button
              onClick={handleNextMonth}
              title="Next Month"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all active:scale-95 border border-white/5"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
              {/* Previous Month Days */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => {
                const dayNum = daysInPrevMonth - firstDayOfMonth + i + 1;
                return (
                  <div
                    key={`prev-${i}`}
                    className="p-2 text-slate-600 font-normal select-none"
                  >
                    {dayNum}
                  </div>
                );
              })}

              {/* Current Month Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const isToday =
                  dayNum === today.getDate() &&
                  calMonth === today.getMonth() &&
                  calYear === today.getFullYear();

                return (
                  <div
                    key={`curr-${dayNum}`}
                    className={`p-2 rounded-lg transition-all select-none ${
                      isToday
                        ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/40 ring-1 ring-indigo-400'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {dayNum}
                  </div>
                );
              })}

              {/* Next Month Days Padding */}
              {Array.from({
                length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7,
              }).map((_, i) => (
                <div
                  key={`next-${i}`}
                  className="p-2 text-slate-600 font-normal select-none"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
