import React from 'react';
import { cn, formatPercentage } from '../lib/utils';

interface ScoreBarProps {
  score: number;
  maxScore: number;
  label: string;
  className?: string;
  showPercentage?: boolean;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({
  score,
  maxScore,
  label,
  className = '',
  showPercentage = true
}) => {
  const percentage = (score / maxScore) * 100;
  
  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
        {showPercentage && (
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {formatPercentage(score, maxScore)}
          </span>
        )}
      </div>
      
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
        <div 
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            percentage < 30 
              ? 'bg-green-500' 
              : percentage < 60 
                ? 'bg-yellow-500' 
                : 'bg-red-500'
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={maxScore}
          aria-label={`${label} score: ${score} out of ${maxScore}`}
        />
      </div>
      
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
        <span>0</span>
        <span>{maxScore}</span>
      </div>
    </div>
  );
};
