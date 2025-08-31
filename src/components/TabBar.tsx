import React from 'react';
import { Home, ClipboardList, BarChart3, MessageCircle, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'screen', label: 'Screen', icon: ClipboardList, path: '/screen' },
  { id: 'results', label: 'Results', icon: BarChart3, path: '/results' },
  { id: 'chat', label: 'Chat', icon: MessageCircle, path: '/chat' },
  { id: 'about', label: 'About', icon: User, path: '/about' },
];

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-white/20 dark:border-slate-700/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px]',
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                )}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={cn(
                  'w-5 h-5 mb-1',
                  isActive ? 'scale-110' : 'scale-100'
                )} />
                <span className={cn(
                  'text-xs font-medium',
                  isActive ? 'font-semibold' : 'font-normal'
                )}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
