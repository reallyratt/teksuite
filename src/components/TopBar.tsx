import React, { useState, useRef, useEffect } from 'react';
import { Menu, BellRing, Briefcase, CheckCircle, FilePenLine, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId } from '../types';
import { getActiveMilestones, MilestoneTask } from '../utils/milestones';
import { TypewriterIcon } from './TypewriterIcon';

interface TopBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onSelectTab: (tab: TabId) => void;
  theme?: 'dark' | 'light';
}

export const TopBar: React.FC<TopBarProps> = ({
  sidebarOpen,
  onToggleSidebar,
  onSelectTab,
  theme = 'dark',
}) => {
  const [milestonesOpen, setMilestonesOpen] = useState(false);
  const [activeTasks, setActiveTasks] = useState<MilestoneTask[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLight = theme === 'light';

  // Evaluate active milestones on mount & when opening dropdown
  useEffect(() => {
    setActiveTasks(getActiveMilestones());
  }, [milestonesOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMilestonesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTaskIcon = (category: string) => {
    switch (category) {
      case 'Teks Misa':
        // OTOMATEKS icon (typewriter)
        return <TypewriterIcon className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />;
      case 'Panduan Misa':
        // ARTEKSFAK icon (paper with pen)
        return <FilePenLine className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />;
      case 'Pengumuman':
        return <Megaphone className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />;
      default:
        return <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />;
    }
  };

  return (
    <header
      id="top-bar-header"
      className={`h-16 shrink-0 w-full border-b px-4 flex items-center justify-between relative z-30 transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800 shadow-xs'
          : 'bg-[#121212] border-white/10 text-slate-200'
      }`}
    >
      {/* Left side: 3-bar toggle button (centered at 36px from left edge, aligned with 72px sidebar icons) */}
      <div className="flex items-center justify-center">
        <button
          id="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Sidebar"
          className={`group flex h-10 w-10 items-center justify-center rounded-xl border transition-all active:scale-95 ${
            isLight
              ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Menu className={`h-5 w-5 ${isLight ? 'text-slate-700' : 'text-slate-200'}`} />
        </button>
      </div>

      {/* Middle: TEKSUITE logo shortcut to Home (Perfectly Centered) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
        <button
          id="teksuite-home-shortcut"
          onClick={() => onSelectTab('home')}
          className="group flex items-center space-x-2 rounded-lg px-3 py-1.5 transition-all hover:opacity-90 active:scale-98"
          title="Go to Home Tab"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-md shadow-indigo-500/20">
            <Briefcase className="h-4 w-4" />
          </div>
          <span className={`text-xl font-black tracking-tighter select-none ${isLight ? 'text-slate-900' : 'text-white'}`}>
            TEKS<span className="text-indigo-500">UITE</span>
          </span>
        </button>
      </div>

      {/* Far Right: Square notification ring button -> UNIVERSAL TASKS Dropdown Popup */}
      <div className="relative" ref={dropdownRef}>
        <button
          id="milestones-ring-btn"
          onClick={() => setMilestonesOpen((prev) => !prev)}
          aria-label="Universal Tasks"
          className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-95 ring-1 ${
            milestonesOpen
              ? 'bg-indigo-600/20 text-indigo-500 ring-indigo-500/50'
              : isLight
              ? 'bg-slate-100 text-indigo-600 ring-slate-200 hover:ring-indigo-500/30 hover:bg-slate-200'
              : 'bg-white/5 text-indigo-400 ring-white/10 hover:ring-indigo-500/30 hover:bg-white/10'
          }`}
        >
          <BellRing className="h-5 w-5" />
          {activeTasks.length > 0 && (
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </span>
          )}
        </button>

        {/* Dropdown Popup */}
        <AnimatePresence>
          {milestonesOpen && (
            <motion.div
              id="milestones-dropdown-popup"
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={`absolute right-0 mt-3 w-80 md:w-96 rounded-xl border p-4 shadow-2xl z-50 ring-1 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800 ring-black/5'
                  : 'bg-[#1e1e1e] border-white/10 text-white ring-black/50'
              }`}
            >
              <div className={`flex items-center justify-between border-b pb-2.5 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <div className="flex items-center space-x-2">
                  <BellRing className="h-4 w-4 text-indigo-500" />
                  <h3 className={`font-extrabold text-xs uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    UNIVERSAL TASKS
                  </h3>
                </div>
                <span className="rounded-full bg-indigo-600/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-600">
                  {activeTasks.length}
                </span>
              </div>

              <div className="mt-3 max-h-80 overflow-y-auto space-y-2 pr-1">
                {activeTasks.length === 0 ? (
                  <div className={`flex items-center justify-center h-24 border border-dashed rounded-lg ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/[0.02]'}`}>
                    <span className="text-sm text-slate-400 font-medium italic">
                      No Active Tasks
                    </span>
                  </div>
                ) : (
                  activeTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center space-x-3 rounded-lg border px-3 py-2.5 text-xs transition-all ${
                        isLight
                          ? 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                          : 'border-white/5 bg-[#141414] text-slate-200 hover:bg-white/[0.04]'
                      }`}
                    >
                      {getTaskIcon(task.category)}
                      <p className={`font-semibold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {task.title}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
