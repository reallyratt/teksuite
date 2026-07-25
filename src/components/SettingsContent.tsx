import React from 'react';
import { Sun, Moon, Eye, Copy, Check } from 'lucide-react';

interface SettingsContentProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  scrollVisual: boolean;
  setScrollVisual: (val: boolean) => void;
  enableCopy: boolean;
  setEnableCopy: (val: boolean) => void;
}

export const SettingsContent: React.FC<SettingsContentProps> = ({
  theme,
  setTheme,
  scrollVisual,
  setScrollVisual,
  enableCopy,
  setEnableCopy,
}) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-wider uppercase text-white">
          SETTINGS
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          System Preferences & Workspace Customization
        </p>
      </div>

      {/* 1. APPEARANCE SECTION */}
      <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 md:p-8 shadow-xl space-y-5">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <h3 className="text-sm font-extrabold tracking-widest uppercase text-indigo-400">
            APPEARANCE
          </h3>
          <span className="text-[11px] font-mono text-slate-500">Theme Engine</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Dark Theme Button */}
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'border-indigo-500 bg-indigo-600/15 text-white ring-1 ring-indigo-500/50 shadow-lg'
                : 'border-white/10 bg-[#121212] text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <Moon className={`h-6 w-6 mb-2 ${theme === 'dark' ? 'text-indigo-400' : ''}`} />
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
              Dark Theme
            </span>
            {theme === 'dark' && (
              <span className="mt-2 text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded">
                Active
              </span>
            )}
          </button>

          {/* Light Theme Button */}
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-all ${
              theme === 'light'
                ? 'border-indigo-500 bg-indigo-600/15 text-white ring-1 ring-indigo-500/50 shadow-lg'
                : 'border-white/10 bg-[#121212] text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <Sun className={`h-6 w-6 mb-2 ${theme === 'light' ? 'text-amber-400' : ''}`} />
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
              Light Theme
            </span>
            {theme === 'light' && (
              <span className="mt-2 text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded">
                Active
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. ACCESSIBILITY SECTION */}
      <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 md:p-8 shadow-xl space-y-5">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <h3 className="text-sm font-extrabold tracking-widest uppercase text-indigo-400">
            ACCESSIBILITY
          </h3>
          <span className="text-[11px] font-mono text-slate-500">Controls</span>
        </div>

        <div className="space-y-4">
          {/* Scroll Visual Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#121212] border border-white/5">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Scroll Visual</p>
                <p className="text-xs text-slate-400">
                  Turn on or off custom styled scrollbars & indicators
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setScrollVisual(!scrollVisual)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                scrollVisual ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  scrollVisual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Enable / Disable Copy Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#121212] border border-white/5">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Copy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Enable Copy</p>
                <p className="text-xs text-slate-400">
                  Allow copying text and templates to clipboard
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setEnableCopy(!enableCopy)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                enableCopy ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  enableCopy ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
