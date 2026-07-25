import React from 'react';
import {
  Home,
  LayoutTemplate,
  Users,
  Code2,
  Settings,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId } from '../types';

interface SidebarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  isOpen: boolean;
  isMobile: boolean;
  onCloseMobile: () => void;
}

interface NavMenuItem {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavMenuItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'developer', label: 'Developer Page', icon: Code2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  isMobile,
  onCloseMobile,
}) => {
  const handleItemClick = (tabId: TabId) => {
    onSelectTab(tabId);
    if (isMobile) {
      onCloseMobile();
    }
  };

  // Mobile Drawer Navigation
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              id="sidebar-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden"
            />

            {/* Mobile Drawer */}
            <motion.aside
              id="sidebar-mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#121212] shadow-2xl md:hidden"
            >
              <div className="flex h-16 items-center px-5 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    Navigation
                  </span>
                </div>
              </div>

              <nav className="flex-1 space-y-1.5 p-3 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`sidebar-tab-mobile-${item.id}`}
                      onClick={() => handleItemClick(item.id)}
                      className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-xs'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <Icon
                          className={`h-5 w-5 shrink-0 ${
                            isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 text-indigo-400" />}
                    </button>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop Inline Animated Sidebar (Perfectly aligned with layout height)
  return (
    <motion.aside
      id="sidebar-desktop-panel"
      animate={{ width: isOpen ? 240 : 72 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="hidden h-full shrink-0 flex-col border-r border-white/10 bg-[#121212] z-20 md:flex overflow-hidden"
    >
      <nav className="flex-1 space-y-2 p-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`sidebar-tab-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              title={!isOpen ? item.label : undefined}
              className={`group flex w-full items-center rounded-xl py-3 px-3.5 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {/* Icon Container */}
              <div className="flex shrink-0 items-center justify-center h-5 w-5">
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isActive
                      ? 'text-indigo-400'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
              </div>

              {/* Text Label - smoothly shown when expanded */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3.5 overflow-hidden whitespace-nowrap text-left tracking-wide"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
};
