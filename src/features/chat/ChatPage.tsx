import React, { useState, useEffect } from 'react';
import { MessageCircle, Bot, Settings, Trash2 } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { ChatUI } from '../../components/ChatUI';
import { aiClient } from './aiClient';
import type { AIContext } from './aiClient';
import { storage } from '../../lib/storage';
import { accessibility } from '../../lib/accessibility';
import type { ChatMessage } from '../../types';

interface ChatPageProps {
  onNavigate: (page: string) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userPreferences, setUserPreferences] = useState(storage.loadPreferences());
  const [apiAvailable, setApiAvailable] = useState(true);
  const [typingMessage, setTypingMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {
    accessibility.announcePageChange('Chat');
    
    // Set AI context with user data
    const results = storage.loadResults();
    const responses = storage.loadResponses();
    
    const context: AIContext = {
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
      setIsTyping(true);
      setTypingMessage('');
      
      // Small delay before starting to type
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate typing effect
      const words = aiResponse.message.split(' ');
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
        setTypingMessage(prev => prev + (i === 0 ? '' : ' ') + words[i]);
      }
      
      // Complete the message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setTypingMessage('');
    } catch (error) {
      console.error('AI response error:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
      setTypingMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
    }
  };

  const handleToggleAIAccess = () => {
    const newPreferences = {
      ...userPreferences,
      allowAIChat: !userPreferences.allowAIChat
    };
    
    setUserPreferences(newPreferences);
    storage.savePreferences(newPreferences);
    
    // Update AI context
    const results = storage.loadResults();
    const responses = storage.loadResponses();
    
    const context: AIContext = {
      results: newPreferences.allowAIChat ? results : [],
      responses: newPreferences.allowAIChat ? responses : [],
      userPreferences: newPreferences
    };
    
    aiClient.setContext(context);
  };

  const hasResults = storage.loadResults().length > 0;

  return (
    <div className="min-h-screen pb-20 pt-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <GlassCard className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  Chat with AI Dr. Chen
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your AI companion for learning and attention support
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <div className={`w-2 h-2 rounded-full ${apiAvailable ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {apiAvailable ? 'AI Connected' : 'Offline Mode'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-xl glass hover:bg-white/20 dark:hover:bg-slate-800/30 transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleClearChat}
                className="p-2 rounded-xl glass hover:bg-white/20 dark:hover:bg-slate-800/30 transition-colors text-red-500 hover:text-red-600"
                aria-label="Clear chat"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Settings Panel */}
        {showSettings && (
          <GlassCard className="mb-6 p-4">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
              Chat Settings
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={userPreferences.allowAIChat}
                  onChange={handleToggleAIAccess}
                  className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Allow AI to use my screening responses for personalized help
                </span>
              </label>
              
              <p className="text-xs text-slate-500 dark:text-slate-400">
                When enabled, the AI can provide more tailored advice based on your screening results. 
                Your data remains private and local.
              </p>
            </div>
          </GlassCard>
        )}

        {/* AI Context Info */}
        {hasResults && userPreferences.allowAIChat && (
          <GlassCard className="mb-6 p-4 border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-900/20">
            <div className="flex items-start space-x-3">
              <Bot className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
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
        <GlassCard className="h-[600px] overflow-hidden">
          <ChatUI
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading || isTyping}
            className="flex-1"
            typingMessage={typingMessage}
          />
        </GlassCard>

        {/* Quick Actions */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <GlassCard className="p-4 text-center">
            <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-2">
              Need a Screening?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Take a quick screening to get personalized insights
            </p>
            <button
              onClick={() => onNavigate('screen')}
              className="glass-button bg-primary-500 text-white hover:bg-primary-600"
            >
              Start Screening
            </button>
          </GlassCard>

          <GlassCard className="p-4 text-center">
            <h3 className="font-medium text-slate-800 dark:text-slate-200 mb-2">
              View Results
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Review your screening results and insights
            </p>
            <button
              onClick={() => onNavigate('results')}
              className="glass-button"
            >
              See Results
            </button>
          </GlassCard>
        </div>

        {/* Disclaimer */}
        <GlassCard className="mt-6 p-4 border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/20">
          <div className="flex items-start space-x-3">
            <MessageCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                AI Chat Disclaimer
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                I'm here to provide educational information and support, not medical advice. 
                Always consult healthcare professionals for medical concerns. 
                Your conversations are private and stored locally on your device.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
