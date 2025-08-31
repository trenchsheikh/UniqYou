import React from 'react';
import { cn } from '../lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  className = '',
  showText = true 
}) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className={cn('w-full', className)}>
      {showText && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Question {current} of {total}
          </span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`Progress: ${current} of ${total} questions completed`}
        />
      </div>
    </div>
  );
};
