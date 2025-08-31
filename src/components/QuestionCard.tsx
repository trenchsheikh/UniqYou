import React, { useState } from 'react';
import type { Question, Response } from '../types';
import { GlassCard } from './GlassCard';
import { cn } from '../lib/utils';

interface QuestionCardProps {
  question: Question;
  response?: Response;
  onResponse: (questionId: string, value: number, textInput?: string) => void;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  response,
  onResponse,
  className = ''
}) => {
  const [textInput, setTextInput] = useState(response?.textInput || '');

  // Update text input when response changes (e.g., when navigating between questions)
  React.useEffect(() => {
    setTextInput(response?.textInput || '');
  }, [response?.textInput]);

  const handleOptionClick = (value: number) => {
    onResponse(question.id, value, textInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent, value: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionClick(value);
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setTextInput(newText);
    
    // Always save text input, even if no option is selected yet
    // This ensures user's context is never lost
    if (response?.value !== undefined) {
      // If an option is selected, update the full response
      onResponse(question.id, response.value, newText);
    } else {
      // If no option is selected yet, create a temporary response with just the text
      // The value will be updated when an option is selected
      onResponse(question.id, 0, newText); // Use 0 as temporary value
    }
  };

  // Auto-save text input when component unmounts or user navigates away
  React.useEffect(() => {
    return () => {
      // Save any unsaved text input when leaving the question
      if (textInput.trim() && textInput !== (response?.textInput || '')) {
        const valueToSave = response?.value !== undefined ? response.value : 0;
        onResponse(question.id, valueToSave, textInput);
      }
    };
  }, [question.id, textInput, response?.textInput, response?.value, onResponse]);

  return (
    <GlassCard className={cn('w-full max-w-2xl mx-auto', className)}>
      <div className="space-y-6">
        {/* Question Text */}
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            {question.text}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Select the option that best describes your experience
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = response?.value === option.value;
            
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.value)}
                onKeyDown={(e) => handleKeyDown(e, option.value)}
                className={cn(
                  'w-full p-4 rounded-xl text-left transition-all duration-200',
                  'border-2 focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:outline-none',
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200'
                    : 'border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50/50 dark:hover:bg-primary-900/10'
                )}
                aria-pressed={isSelected}
                role="radio"
                aria-label={`Option ${option.label} for question about ${question.text}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.label}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Text Input Section - Always Visible */}
        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700">
          <label htmlFor={`text-input-${question.id}`} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {question.textInputLabel || 'Additional context (optional)'}
          </label>
          <textarea
            id={`text-input-${question.id}`}
            value={textInput}
            onChange={handleTextInputChange}
            placeholder={question.textInputPlaceholder || 'Add any additional details, examples, or context that might help...'}
            className={cn(
              'w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600',
              'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100',
              'focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:outline-none',
              'resize-none transition-all duration-200',
              'placeholder:text-slate-500 dark:placeholder:text-slate-400'
            )}
            rows={3}
            maxLength={500}
          />
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
            <span>Optional - helps provide more context</span>
            <span>{textInput.length}/500</span>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
          <p>💡 Be honest - there are no right or wrong answers</p>
          <p>🔒 Your responses are stored locally on your device only</p>
          <p>✍️ You can add more details to help understand your experience better</p>
        </div>
      </div>
    </GlassCard>
  );
};
