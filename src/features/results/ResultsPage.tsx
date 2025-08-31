import React, { useEffect, useState } from 'react';
import { BarChart3, Lightbulb, RefreshCw, Share2, MessageCircle } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { ResultBadge } from '../../components/ResultBadge';
import { ScoreBar } from '../../components/ScoreBar';
import { storage } from '../../lib/storage';
import { accessibility } from '../../lib/accessibility';
import { getDomainLabel } from '../../lib/utils';
import type { ScreeningResult } from '../../types';

interface ResultsPageProps {
  onNavigate: (page: string) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ onNavigate }) => {
  const [results, setResults] = useState<ScreeningResult[]>([]);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const savedResults = storage.loadResults();
    if (savedResults.length > 0) {
      setResults(savedResults);
      setHasData(true);
    }
    
    accessibility.announcePageChange('Results');
  }, []);

  const handleNewScreening = () => {
    if (confirm('Start a new screening? This will clear your current results.')) {
      storage.clearAll();
      setResults([]);
      setHasData(false);
      onNavigate('screen');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My RUOkay Screening Results',
          text: 'Check out my learning and attention screening results from RUOkay!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      const resultsText = results.map(r => 
        `${getDomainLabel(r.domain)}: ${r.band} (${r.rawScore}/${r.maxScore})`
      ).join('\n');
      
      try {
        await navigator.clipboard.writeText(resultsText);
        alert('Results copied to clipboard!');
      } catch (error) {
        alert('Failed to copy results');
      }
    }
  };

  if (!hasData || results.length === 0) {
    return (
      <div className="min-h-screen pb-20 pt-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <GlassCard className="text-center p-8">
            <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              No Results Yet
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Complete a screening to see your personalized results and insights.
            </p>
            <button
              onClick={() => onNavigate('screen')}
              className="glass-button bg-primary-500 text-white hover:bg-primary-600"
            >
              Start Screening
            </button>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <GlassCard className="mb-6 text-center">
          <BarChart3 className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Your Screening Results
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Here's what your responses tell us about your learning and attention patterns
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={handleNewScreening}
              className="glass-button text-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Screening
            </button>
            <button
              onClick={handleShare}
              className="glass-button text-sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </button>
          </div>
        </GlassCard>

        {/* Disclaimer */}
        <GlassCard className="mb-6 border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/20">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                Important Disclaimer
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This screening is for educational purposes only and is not a medical diagnosis. 
                The results provide insights into patterns that may be worth discussing with a healthcare professional. 
                Always consult qualified professionals for medical advice.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Results */}
        <div className="space-y-6">
          {results.map((result) => (
            <GlassCard key={result.domain} className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                    {getDomainLabel(result.domain)}
                  </h3>
                  <ResultBadge band={result.band} />
                </div>
                
                <ScoreBar
                  score={result.rawScore}
                  maxScore={result.maxScore}
                  label={`Score: ${result.rawScore}/${result.maxScore}`}
                  className="mb-4"
                />
                
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  {result.summaryText}
                </p>
              </div>

              {/* Tips */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-800 dark:text-slate-200 flex items-center">
                  <Lightbulb className="w-4 h-4 text-primary-500 mr-2" />
                  Helpful Tips & Strategies
                </h4>
                <ul className="space-y-2">
                  {result.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Next Steps */}
        <GlassCard className="mt-8 p-6">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Next Steps
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-slate-700 dark:text-slate-300">
                Consider Professional Support
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Speak with your GP or healthcare provider</li>
                <li>• Consult with educational specialists</li>
                <li>• Connect with local support groups</li>
                <li>• Research workplace or school accommodations</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-slate-700 dark:text-slate-300">
                Explore Resources
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Try the AI chat for personalized tips</li>
                <li>• Research coping strategies online</li>
                <li>• Join online communities</li>
                <li>• Read books about neurodiversity</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onNavigate('chat')}
              className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with AI Dr. Chen
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
