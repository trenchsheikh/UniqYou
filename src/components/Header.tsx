import React from 'react';
import { Brain, Menu } from 'lucide-react';


interface HeaderProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenu = false }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                UniqYou
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Learning & Attention Screening
              </p>
            </div>
          </div>

          {/* Menu Button */}
          {showMenu && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-xl glass hover:bg-white/20 dark:hover:bg-slate-800/30 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
