import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId } from '../types';
import { HomeContent } from './HomeContent';
import { TemplatesContent } from './TemplatesContent';
import { UsersContent } from './UsersContent';
import { SettingsContent } from './SettingsContent';
import { DevContent } from './DevContent';
import {
  Home,
  LayoutTemplate,
  Users,
  Code2,
  Settings,
  Sparkles,
  Terminal,
  User,
  Lock,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

interface MainContentProps {
  activeTab: TabId;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  scrollVisual: boolean;
  setScrollVisual: (val: boolean) => void;
  enableCopy: boolean;
  setEnableCopy: (val: boolean) => void;
}

const tabInfo: Record<
  TabId,
  {
    title: string;
    tabText: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badgeText: string;
  }
> = {
  home: {
    title: 'Home',
    tabText: 'This is the Home Tab',
    description: 'Welcome to your main TEKSUITE overview dashboard. Manage system resources and daily activities.',
    icon: Home,
    badgeText: 'Primary Workspace',
  },
  templates: {
    title: 'Templates',
    tabText: 'This is the Templates Tab',
    description: 'Explore and manage pre-built design patterns, code boilerplates, and workflow configurations.',
    icon: LayoutTemplate,
    badgeText: 'Resource Library',
  },
  users: {
    title: 'Users',
    tabText: 'This is the Users Tab',
    description: 'Manage active team members, user access privileges, roles, and administrative profiles.',
    icon: Users,
    badgeText: 'Access Control',
  },
  developer: {
    title: 'Developer',
    tabText: 'This is the Developer Tab',
    description: 'Access API keys, integration endpoints, system logs, webhooks, and developer tools.',
    icon: Code2,
    badgeText: 'Developer Hub',
  },
  settings: {
    title: 'Settings',
    tabText: 'This is the Settings Tab',
    description: 'Configure workspace preferences, security protocols, notifications, and custom themes.',
    icon: Settings,
    badgeText: 'Configuration',
  },
};

export const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  theme,
  setTheme,
  scrollVisual,
  setScrollVisual,
  enableCopy,
  setEnableCopy,
}) => {
  const current = tabInfo[activeTab];
  const IconComponent = current.icon;

  // State for Developer Page password protection
  const [devUsername, setDevUsername] = useState('');
  const [devPassword, setDevPassword] = useState('');
  const [devUnlocked, setDevUnlocked] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleDevLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (devUsername.trim() === 'cay' && devPassword === '12345678') {
      setDevUnlocked(true);
      setAuthError('');
    } else {
      setAuthError('Access Denied: Invalid Username or Password');
    }
  };

  const handleLockDeveloper = () => {
    setDevUnlocked(false);
  };

  return (
    <main
      id="main-content-view"
      className={`flex-1 p-6 md:p-10 overflow-y-auto min-h-0 relative transition-colors duration-300 overscroll-y-none ${
        theme === 'light' ? 'bg-slate-100 text-slate-800' : 'bg-[#0a0a0a] text-slate-200'
      } ${!scrollVisual ? '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden' : ''}`}
    >
      {/* Top Ambient Glow - Extended upwards to prevent gradient cutoff on elastic overscroll */}
      <div className="absolute -top-48 left-0 right-0 h-[520px] bg-gradient-to-b from-indigo-500/20 via-indigo-500/8 to-transparent pointer-events-none z-0" />

      <div className="mx-auto max-w-4xl relative z-10 space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-6"
          >
            {activeTab === 'home' ? (
              <HomeContent theme={theme} />
            ) : activeTab === 'templates' ? (
              <TemplatesContent enableCopy={enableCopy} theme={theme} />
            ) : activeTab === 'users' ? (
              <UsersContent theme={theme} />
            ) : activeTab === 'settings' ? (
              <SettingsContent
                theme={theme}
                setTheme={setTheme}
                scrollVisual={scrollVisual}
                setScrollVisual={setScrollVisual}
                enableCopy={enableCopy}
                setEnableCopy={setEnableCopy}
              />
            ) : activeTab === 'developer' && !devUnlocked ? (
              <div className="mx-auto max-w-md my-8">
                <div className={`rounded-2xl border p-6 md:p-8 shadow-2xl relative overflow-hidden ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50'
                    : 'bg-[#161616] border-white/10 text-white'
                }`}>
                  {/* Subtle Accent Glow */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

                  {/* RESTRICTED AREA Title above the username box */}
                  <div className="text-center mb-6">
                    <h2 className={`text-lg md:text-xl font-extrabold tracking-widest uppercase ${
                      theme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}>
                      RESTRICTED AREA
                    </h2>
                  </div>

                  <form onSubmit={handleDevLogin} className="space-y-4">
                    {/* User Input Box with Icon inside */}
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 pointer-events-none text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        id="dev-username-input"
                        value={devUsername}
                        onChange={(e) => setDevUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm font-mono transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          theme === 'light'
                            ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                            : 'bg-[#121212] border-white/10 text-white placeholder-slate-500'
                        }`}
                      />
                    </div>

                    {/* Password Input Box with Icon inside */}
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 pointer-events-none text-slate-400">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type="password"
                        id="dev-password-input"
                        value={devPassword}
                        onChange={(e) => setDevPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm font-mono transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                          theme === 'light'
                            ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                            : 'bg-[#121212] border-white/10 text-white placeholder-slate-500'
                        }`}
                      />
                    </div>

                    {authError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-2.5 text-xs text-rose-500"
                      >
                        <ShieldAlert className="h-4 w-4 shrink-0" />
                        <span>{authError}</span>
                      </motion.div>
                    )}

                    {/* Access Button */}
                    <button
                      type="submit"
                      id="dev-access-submit-btn"
                      className="w-full mt-2 flex items-center justify-center rounded-xl bg-indigo-600 py-3 text-sm font-extrabold tracking-wider text-white uppercase shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 active:scale-98"
                    >
                      ACCESS
                    </button>
                  </form>
                </div>
              </div>
            ) : activeTab === 'developer' && devUnlocked ? (
              <DevContent onLock={handleLockDeveloper} theme={theme} />
            ) : (
              /* Default Page Content */
              <>
                {/* Active Environment Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                    Active Environment
                  </div>

                  {activeTab === 'developer' && devUnlocked && (
                    <button
                      onClick={handleLockDeveloper}
                      className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                    >
                      <Lock className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Lock Page</span>
                    </button>
                  )}
                </div>

                {/* Main Heading */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-tight">
                    {current.title}
                  </h2>
                  <div className="h-0.5 w-24 bg-indigo-500 mt-4"></div>
                </div>

                {/* Primary Card with exact Tab Text */}
                <div className="bg-[#161616] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-300 text-xl font-light leading-relaxed tracking-wide">
                        <span className="text-white font-semibold">
                          {current.tabText}
                        </span>
                      </p>
                      <p className="mt-3 text-sm text-slate-400 max-w-xl">
                        {current.description}
                      </p>
                    </div>

                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>

                  {activeTab === 'developer' && devUnlocked && (
                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center space-x-2 text-xs text-emerald-400 font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Developer Authentication Granted for session user (cay)</span>
                    </div>
                  )}
                </div>

                {/* Secondary Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#161616] p-5 rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Status</span>
                      <Sparkles className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div className="text-base font-medium text-white">
                      Active Navigation Node
                    </div>
                    <p className="text-xs text-slate-400">
                      Connected to TEKSUITE client dashboard.
                    </p>
                  </div>

                  <div className="bg-[#161616] p-5 rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <span>Milestones</span>
                      <Terminal className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div className="text-base font-medium text-white">
                      Missing Milestones
                    </div>
                    <p className="text-xs text-slate-400">
                      Top-right bell ring popup reflects current milestone state.
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Middle Footer */}
        <footer className="pt-10 pb-6 text-center space-y-1">
          <p className={`text-xs md:text-sm font-semibold ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
            Authored by Cay
          </p>
          <p className={`text-[11px] font-extrabold tracking-widest uppercase ${theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}`}>
            v1.6 stable
          </p>
        </footer>
      </div>
    </main>
  );
};
