import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '../lib/utils';

interface TypingIndicatorProps {
  isVisible: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
      <Bot className="w-5 h-5 text-primary-500" />
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">Dr. Sarah Chen is typing...</span>
    </div>
  );
};

interface ChatUIProps {
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  className?: string;
  typingMessage?: string;
}

export const ChatUI: React.FC<ChatUIProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
  className = '',
  typingMessage
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const smoothScrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      // If user is near bottom, enable auto-scroll
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
      setShouldAutoScroll(isNearBottom);
    }
  };

  useEffect(() => {
    // Auto-scroll to new messages when they arrive
    if (messages.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        smoothScrollToBottom();
      }, 100);
    }
  }, [messages.length]);

  // Also scroll when typing message updates
  useEffect(() => {
    if (typingMessage) {
      setTimeout(() => {
        smoothScrollToBottom();
      }, 50);
    }
  }, [typingMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      // Always scroll to bottom when user sends a message
      setTimeout(() => {
        smoothScrollToBottom();
      }, 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <GlassCard className={cn('h-full flex flex-col', className)}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef} onScroll={handleScroll}>
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Hello! I'm UniqYou</p>
            <p className="text-sm">
              I'm here to help you explore learning and attention patterns. Ask me anything!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl',
                  message.role === 'user'
                    ? 'bg-primary-500 text-white rounded-br-md'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-md'
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))
        )}
        
        {/* Typing Indicator */}
        <TypingIndicator isVisible={isLoading} />
        
        {/* Typing Message */}
        {typingMessage && (
          <div className="flex justify-start">
            <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-md">
              <p className="text-sm leading-relaxed">
                {typingMessage}
                <span className="inline-block w-2 h-4 bg-slate-400 ml-1 animate-pulse"></span>
              </p>
            </div>
          </div>
        )}
        
        {/* Scroll to Bottom Button */}
        {!shouldAutoScroll && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setShouldAutoScroll(true);
                smoothScrollToBottom();
              }}
              className="px-3 py-2 rounded-lg bg-primary-500 text-white text-sm hover:bg-primary-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>↓</span>
              <span>New Messages</span>
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/20 dark:border-slate-700/30">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 glass-input"
            disabled={isLoading}
            aria-label="Type your message"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={cn(
              'p-3 rounded-xl transition-all duration-200',
              'bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 dark:disabled:bg-slate-600',
              'text-white disabled:text-slate-500 dark:disabled:text-slate-400',
              'focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:outline-none'
            )}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </GlassCard>
  );
};
