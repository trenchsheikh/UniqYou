import React, { useState, useEffect } from 'react';
import { Settings, ArrowLeft } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { ChatUI } from '../../components/ChatUI';
import { aiClient } from './aiClient';
import { storage } from '../../lib/storage';
import { accessibility } from '../../lib/accessibility';
import type { ChatMessage } from '../../types';
import { Toast } from '../../components/Toast';

interface ChatPageProps {
  onNavigate: (page: string) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userPreferences, setUserPreferences] = useState(storage.loadPreferences());
  const [apiAvailable, setApiAvailable] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);


  useEffect(() => {
    accessibility.announcePageChange('Chat');
    
    // Set AI context with user data
    const results = storage.loadResults();
    const responses = storage.loadResponses();
    
    const context = {
      results,
      responses,
      userPreferences
    };
    
    aiClient.setContext(context);

    // Test API connection
    const testAPI = async () => {
      const isConnected = await aiClient.testConnection();
      setApiAvailable(isConnected);
      if (!isConnected && messages.length === 0) {
        const fallbackMessage: ChatMessage = {
          id: 'fallback-notice',
          role: 'assistant',
          content: 'Hello! I\'m Dr. Sarah Chen. I\'m currently using offline responses, but I can still provide helpful guidance and strategies. What would you like to know about?',
          timestamp: new Date()
        };
        setMessages([fallbackMessage]);
      }
    };
    testAPI();

    // Add welcome message if no previous messages
    if (messages.length === 0) {
      let welcomeContent: string;
      if (!apiAvailable) {
        welcomeContent = 'Hello! I\'m Dr. Sarah Chen, a clinical psychologist specializing in neurodevelopmental disorders. I\'m currently using offline responses due to technical difficulties, but I can still provide helpful information and strategies. What would you like to know more about?';
      } else if (results.length > 0 && userPreferences.allowAIChat) {
        welcomeContent = `Hello! I'm Dr. Sarah Chen, a clinical psychologist specializing in neurodevelopmental disorders. I can see you've completed a screening and I'm here to help you understand your results and explore helpful strategies. What would you like to know more about?`;
      } else {
        welcomeContent = `Hello! I'm Dr. Sarah Chen, a clinical psychologist specializing in neurodevelopmental disorders. I'm here to provide you with professional guidance and support. Feel free to ask me anything, or consider taking a screening for more personalized help.`;
      }
      
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: welcomeContent,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [userPreferences, messages.length]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await aiClient.ask(message);
      
      // Start typing animation
      // setIsTyping(true); // Removed
      // setTypingMessage(''); // Removed
      
      // Small delay before starting to type
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate typing effect
      const words = aiResponse.message.split(' ');
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
        // setTypingMessage(prev => prev + (i === 0 ? '' : ' ') + words[i]); // Removed
      }
      
      // Complete the message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      // setIsTyping(false); // Removed
      // setTypingMessage(''); // Removed
    } catch (error) {
      console.error('AI response error:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      // setIsTyping(false); // Removed
      // setTypingMessage(''); // Removed
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onNavigate('home')}
              className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 shadow-sm"
              aria-label="Go back to home"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                Chat with AI Dr. Chen
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your AI companion for learning and attention support
              </p>
              <div className="flex items-center justify-center mt-2 space-x-2">
                <div className={`w-2 h-2 rounded-full ${apiAvailable ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {apiAvailable ? 'AI Connected' : 'Offline Mode'}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:bg-white dark:hover:bg-slate-700 transition-all duration-200 shadow-sm"
              aria-label="Chat settings"
            >
              <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <GlassCard className="mb-6 p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Chat Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="ai-access" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Allow AI to access screening data
                </label>
                <input
                  id="ai-access"
                  type="checkbox"
                  checked={userPreferences.allowAIChat}
                  onChange={(e) => {
                    const newPrefs = { ...userPreferences, allowAIChat: e.target.checked };
                    setUserPreferences(newPrefs);
                    storage.savePreferences(newPrefs);
                    
                    // Update AI context
                    const results = storage.loadResults();
                    const responses = storage.loadResponses();
                    aiClient.setContext({ results, responses, userPreferences: newPrefs });
                  }}
                  className="w-4 h-4 text-primary-500 bg-slate-100 border-slate-300 rounded focus:ring-primary-500 focus:ring-2"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="dark-mode" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Dark Mode
                </label>
                <select
                  id="dark-mode"
                  value={userPreferences.darkMode}
                  onChange={(e) => {
                    const newPrefs = { ...userPreferences, darkMode: e.target.value as 'light' | 'dark' | 'auto' };
                    setUserPreferences(newPrefs);
                    storage.savePreferences(newPrefs);
                    
                    // Apply theme
                    if (newPrefs.darkMode === 'dark' || (newPrefs.darkMode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }}
                  className="px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="auto">Auto</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              
              <button
                onClick={() => {
                  storage.clearAll();
                  setMessages([]);
                  setUserPreferences({ allowAIChat: true, darkMode: 'auto' });
                  setToast({
                    message: 'All data cleared successfully',
                    type: 'success'
                  });
                }}
                className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
              >
                Clear All Data
              </button>
            </div>
          </GlassCard>
        )}

        {/* AI Context Info */}
        {storage.loadResults().length > 0 && userPreferences.allowAIChat && (
          <GlassCard className="mb-6 p-4 border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20">
            <div className="flex items-start space-x-3">
              <div>
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">
                  AI Context Enabled
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  I can see your screening results and provide personalized advice. 
                  Ask me about specific areas or strategies!
                </p>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Chat Interface */}
        <div className="h-[600px] md:h-[700px]">
          <ChatUI
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            className="flex-1 h-full"
          />
        </div>

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};
