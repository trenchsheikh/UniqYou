import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TabBar } from './components/TabBar';
import { HomePage } from './pages/HomePage';
import { ScreenPage } from './features/screen/ScreenPage';
import { ResultsPage } from './features/results/ResultsPage';
import { ChatPage } from './features/chat/ChatPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'screen':
        return <ScreenPage onNavigate={handleNavigate} />;
      case 'results':
        return <ResultsPage onNavigate={handleNavigate} />;
      case 'chat':
        return <ChatPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Header - only show on desktop */}
      {!isMobile && (
        <Header 
          showMenu={false}
        />
      )}

      {/* Main content */}
      <main id="main-content" className="relative">
        {renderPage()}
      </main>

      {/* Tab Bar - only show on mobile */}
      {isMobile && (
        <TabBar 
          activeTab={currentPage} 
          onTabChange={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
