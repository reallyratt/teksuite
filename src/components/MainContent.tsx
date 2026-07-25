import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId } from '../types';
import { HomeContent } from './HomeContent';
import { TemplatesContent } from './TemplatesContent';
import { UsersContent } from './UsersContent';
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
  Key,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

interface MainContentProps {
  activeTab: TabId;
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
    title: 'Developer Page',
    tabText: 'This is the Developer Page Tab',
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

export const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const current = tabInfo[activeTab];
  const IconComponent = current.icon;

  // State for Developer Page password protection
  const [devUsername, setDevUsername] = useState('');
  const [devPassword, setDevPassword] = useState('');
  const [devUnlocked, setDevUnlocked] = useState(false);
  const [authError, setAuthError] = useState('');

  // Toast for Settings page coming soon
  const [settingsToast, setSettingsToast] = useState(false);

  useEffect(() => {
    if (activeTab === 'settings') {
      setSettingsToast(true);
      const timer = setTimeout(() => {
        setSettingsToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

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
      className="flex-1 p-6 md:p-10 bg-[#0a0a0a] text-slate-200 overflow-y-auto min-h-0 relative"
    >
      {/* 3-Second Toast Popup for Settings */}
      <AnimatePresence>
        {settingsToast && (
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
              <p className="text-sm font-bold text-white uppercase">SETTINGS</p>
              <p className="text-xs text-indigo-300 font-medium">
                Coming Soon! Feature under development.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-[280px] bg-gradient-to-b from-indigo-500/10 via-indigo-500/5 to-transparent pointer-events-none z-0" />

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
              <HomeContent />
            ) : activeTab === 'templates' ? (
              <TemplatesContent />
            ) : activeTab === 'users' ? (
              <UsersContent />
            ) : activeTab === 'settings' ? (
              <div className="mx-auto max-w-md my-12 text-center">
                <div className="rounded-2xl border border-white/10 bg-[#161616] p-8 md:p-10 shadow-2xl space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-purple-500" />
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 shadow-lg">
                    <Settings className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">
                    SETTINGS
                  </h3>
                  <p className="text-sm text-indigo-300 font-medium">
                    Coming Soon! Feature under development.
                  </p>
                </div>
              </div>
            ) : activeTab === 'developer' && !devUnlocked ? (
              <div className="mx-auto max-w-md my-8">
                <div className="rounded-2xl border border-white/10 bg-[#161616] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                  {/* Subtle Accent Glow */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

                  {/* RESTRICTED AREA Title above the username box */}
                  <div className="text-center mb-6">
                    <h2 className="text-lg md:text-xl font-extrabold tracking-widest text-white uppercase">
                      RESTRICTED AREA
                    </h2>
                  </div>

                  <form onSubmit={handleDevLogin} className="space-y-4">
                    {/* User Input Box with Icon inside */}
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 pointer-events-none text-slate-500">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        id="dev-username-input"
                        value={devUsername}
                        onChange={(e) => setDevUsername(e.target.value)}
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#121212] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                      />
                    </div>

                    {/* Password Input Box with Icon inside */}
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 pointer-events-none text-slate-500">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type="password"
                        id="dev-password-input"
                        value={devPassword}
                        onChange={(e) => setDevPassword(e.target.value)}
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#121212] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                      />
                    </div>

                    {authError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-2.5 text-xs text-rose-400"
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
            ) : (
              /* Unlocked Developer Content or Default Page Content */
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
      </div>
    </main>
  );
};
