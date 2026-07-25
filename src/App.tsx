import React, { useState, useEffect } from 'react';
import { TabId } from './types';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
    <div className="h-screen w-screen flex flex-col bg-[#0a0a0a] text-slate-200 font-sans antialiased overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation */}
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        onSelectTab={handleSelectTab}
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
        />

        {/* Main Content Workspace */}
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  );
}
