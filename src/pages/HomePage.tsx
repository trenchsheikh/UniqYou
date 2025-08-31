import React, { useState, useEffect } from 'react';
import { Brain, MessageCircle, Shield, ClipboardList } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Toast } from '../components/Toast';
import type { ToastType } from '../components/Toast';
import { storage } from '../lib/storage';
import { accessibility } from '../lib/accessibility';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [showConsent, setShowConsent] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  useEffect(() => {
    // Check if user has given consent
    const hasConsented = storage.loadConsent();
    if (!hasConsented) {
      setShowConsent(true);
    }
    
    // Announce page change
    accessibility.announcePageChange('Home');
  }, []);

  const handleStartScreening = () => {
    onNavigate('screen');
  };

  const handleConsent = (allowAI: boolean) => {
    storage.savePreferences({ 
      allowAIChat: allowAI
    });
    setShowConsent(false);
    setToast({
      message: 'Preferences saved! Your data stays local and private.',
      type: 'success'
    });
  };

  const hasExistingData = storage.hasData();

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="pt-8 pb-12 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 text-white mb-6">
              <Brain className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                UniqYou
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Your friendly companion for exploring learning and attention differences. 
              Take a quick screening, get insights, and discover helpful strategies.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleStartScreening}
              className="btn-primary"
            >
              <ClipboardList className="w-5 h-5 mr-2" />
              Start Screening
            </button>
            <button
                  onClick={() => onNavigate('chat')}
                  className="btn-secondary"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with AI Dr. Chen</span>
                </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 mb-12">
            What UniqYou Offers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <GlassCard className="text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Quick Screening
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Take a brief, confidential screening to understand your learning and attention patterns.
              </p>
            </GlassCard>

            <GlassCard className="text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                AI Companion
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Chat with our friendly AI to get personalized tips, strategies, and resources.
              </p>
            </GlassCard>

            <GlassCard className="text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Privacy First
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your data stays on your device. No tracking, no analytics, complete privacy.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Existing Results Section */}
      {hasExistingData && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <GlassCard className="max-w-2xl mx-auto text-center p-6">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
                Continue Your Journey
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                You have previous screening results. Would you like to review them or start a new screening?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => onNavigate('results')}
                  className="glass-button bg-primary-500 text-white hover:bg-primary-600"
                >
                  View Results
                </button>
                <button
                  onClick={() => onNavigate('screen')}
                  className="glass-button"
                >
                  New Screening
                </button>
              </div>
            </GlassCard>
          </div>
        </section>
      )}

      {/* Consent Banner */}
      {showConsent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="text-center mb-6">
              <Shield className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Welcome to UniqYou!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your privacy is important to us. All data is stored locally on your device only.
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                  defaultChecked={false}
                  id="ai-consent"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Allow AI chat to use my screening responses for personalized help
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleConsent(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
              >
                Continue
              </button>
              <button
                onClick={() => handleConsent(true)}
                className="flex-1 px-4 py-2 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-200"
              >
                Allow AI Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
