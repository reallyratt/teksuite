import React, { useState, useEffect } from 'react';
import { TabId } from './types';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Settings State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrollVisual, setScrollVisual] = useState<boolean>(false);
  const [enableCopy, setEnableCopy] = useState<boolean>(false);

  // Screen size listener to handle mobile responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col font-sans antialiased overflow-hidden transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-slate-100 text-slate-800 selection:bg-indigo-600 selection:text-white'
          : 'bg-[#0a0a0a] text-slate-200 selection:bg-indigo-500 selection:text-white'
      } ${enableCopy ? 'copy-enabled select-text' : 'select-none'} ${
        scrollVisual ? 'scroll-visual-enabled' : ''
      }`}
    >
      {/* Top Bar Navigation */}
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        onSelectTab={handleSelectTab}
        theme={theme}
      />

      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Panel Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          isOpen={sidebarOpen}
          isMobile={isMobile}
          onCloseMobile={() => setSidebarOpen(false)}
          theme={theme}
        />

        {/* Main Content Workspace */}
        <MainContent
          activeTab={activeTab}
          theme={theme}
          setTheme={setTheme}
          scrollVisual={scrollVisual}
          setScrollVisual={setScrollVisual}
          enableCopy={enableCopy}
          setEnableCopy={setEnableCopy}
        />
      </div>
    </div>
  );
}
