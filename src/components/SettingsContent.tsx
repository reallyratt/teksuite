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
  const isLight = theme === 'light';

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className={`text-3xl font-black tracking-wider uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
          SETTINGS
        </h2>
        <p className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          System Preferences & Workspace Customization
        </p>
      </div>

      {/* 1. APPEARANCE SECTION */}
      <div className={`rounded-2xl border p-6 md:p-8 shadow-xl space-y-5 ${
        isLight ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50' : 'bg-[#161616] border-white/10 text-white'
      }`}>
        <div className={`border-b pb-3 flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <h3 className="text-sm font-extrabold tracking-widest uppercase text-indigo-500">
            APPEARANCE
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Dark Theme Button */}
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'border-indigo-500 bg-indigo-600/15 text-white ring-1 ring-indigo-500/50 shadow-lg'
                : isLight
                ? 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                : 'border-white/10 bg-[#121212] text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <Moon className={`h-6 w-6 mb-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-slate-400'}`} />
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
              Dark Theme
            </span>
          </button>

          {/* Light Theme Button */}
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-all ${
              theme === 'light'
                ? 'border-indigo-500 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-500/50 shadow-md font-bold'
                : isLight
                ? 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                : 'border-white/10 bg-[#121212] text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <Sun className={`h-6 w-6 mb-2 ${theme === 'light' ? 'text-amber-500' : 'text-slate-400'}`} />
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
              Light Theme
            </span>
          </button>
        </div>
      </div>

      {/* 2. ACCESSIBILITY SECTION */}
      <div className={`rounded-2xl border p-6 md:p-8 shadow-xl space-y-5 ${
        isLight ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50' : 'bg-[#161616] border-white/10 text-white'
      }`}>
        <div className={`border-b pb-3 flex items-center justify-between ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <h3 className="text-sm font-extrabold tracking-widest uppercase text-indigo-500">
            ACCESSIBILITY
          </h3>
        </div>

        <div className="space-y-4">
          {/* Scroll Visual Toggle */}
          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#121212] border-white/5'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <p className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Scroll Visual</p>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Turn on or off custom styled scrollbars & indicators
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setScrollVisual(!scrollVisual)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                scrollVisual ? 'bg-indigo-600' : isLight ? 'bg-slate-300' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  scrollVisual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Copy Ability Toggle */}
          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#121212] border-white/5'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                <Copy className="h-5 w-5" />
              </div>
              <div>
                <p className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Copy Ability</p>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Allow copying text and templates to clipboard
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setEnableCopy(!enableCopy)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                enableCopy ? 'bg-indigo-600' : isLight ? 'bg-slate-300' : 'bg-slate-700'
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
