import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { ProgressBar } from '../../components/ProgressBar';
import { QuestionCard } from '../../components/QuestionCard';
import { useScreening } from './useScreening';
import { accessibility } from '../../lib/accessibility';
import { cn } from '../../lib/utils';
import { questions } from './questions';

interface ScreenPageProps {
  onNavigate: (page: string) => void;
}

export const ScreenPage: React.FC<ScreenPageProps> = ({ onNavigate }) => {
  const {
    currentStep,
    responses,
    isComplete,
    getCurrentQuestion,
    getProgress,
    goToNext,
    goToPrevious,
    goToStep,
    canGoNext,
    canGoPrevious,
    isLastStep,
    submitResponse,
    completeScreening,
    resetScreening,
    totalQuestions
  } = useScreening();

  const [showReview, setShowReview] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(getCurrentQuestion());

  useEffect(() => {
    setCurrentQuestion(getCurrentQuestion());
    accessibility.announcePageChange(`Question ${currentStep + 1} of ${totalQuestions}`);
  }, [currentStep, getCurrentQuestion, totalQuestions]);

  const handleResponse = (questionId: string, value: number, textInput?: string) => {
    submitResponse(questionId, value, textInput);
  };

  const handleNext = () => {
    if (isLastStep()) {
      setShowReview(true);
    } else {
      goToNext();
    }
  };

  const handlePrevious = () => {
    if (showReview) {
      setShowReview(false);
    } else {
      goToPrevious();
    }
  };

  const handleComplete = () => {
    completeScreening();
    onNavigate('results');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? This will clear all your responses.')) {
      resetScreening();
      setShowReview(false);
    }
  };

  const progress = getProgress();

  if (isComplete) {
    return (
      <div className="min-h-screen pb-20 pt-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <GlassCard className="text-center p-8">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Screening Complete!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Great job completing the screening! Let's see your results and get some personalized insights.
            </p>
            <button
              onClick={() => onNavigate('results')}
              className="glass-button bg-primary-500 text-white hover:bg-primary-600"
            >
              View Results
            </button>
          </GlassCard>
        </div>
      </div>
    );
  }

  if (showReview) {
    return (
      <div className="min-h-screen pb-20 pt-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <GlassCard className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                Review Your Responses
              </h1>
              <div className="flex gap-3">
                <button
                  onClick={handlePrevious}
                  className="glass-button"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Questions
                </button>
                <button
                  onClick={handleComplete}
                  className="glass-button bg-primary-500 text-white hover:bg-primary-600"
                >
                  Complete Screening
                </button>
              </div>
            </div>
            
            <ProgressBar current={totalQuestions} total={totalQuestions} showText={false} />
          </GlassCard>

          <div className="space-y-4">
            {responses.map((response, index) => {
              const question = questions.find(q => q.id === response.questionId);
              if (!question) return null;
              
              const option = question.options.find(opt => opt.value === response.value);
              
              return (
                <GlassCard key={response.questionId} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                        Question {index + 1}
                      </p>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">
                        {question.text}
                      </p>
                      <p className="text-primary-600 dark:text-primary-400 text-sm mt-1">
                        Your answer: {option?.label}
                      </p>
                      {response.textInput && (
                        <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                            Additional details:
                          </p>
                          <p className="text-slate-700 dark:text-slate-300 text-sm">
                            {response.textInput}
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setShowReview(false);
                        goToStep(index);
                      }}
                      className="glass-button p-2 ml-4"
                    >
                      Edit
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Progress */}
        <GlassCard className="mb-6">
          <ProgressBar 
            current={progress.current} 
            total={progress.total} 
            className="mb-4"
          />
          
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious()}
              className={cn(
                'glass-button flex items-center space-x-2',
                !canGoPrevious() && 'opacity-50 cursor-not-allowed'
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {progress.current} of {progress.total}
            </span>
            
            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className={cn(
                'glass-button flex items-center space-x-2',
                !canGoNext() && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span>{isLastStep() ? 'Review' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </GlassCard>

        {/* Question */}
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            response={responses.find(r => r.questionId === currentQuestion.id)}
            onResponse={handleResponse}
          />
        )}

        {/* Actions */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleReset}
            className="glass-button text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};
