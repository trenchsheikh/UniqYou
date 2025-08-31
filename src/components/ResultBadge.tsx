import React from 'react';
import { cn, getBandColor } from '../lib/utils';

interface ResultBadgeProps {
  band: 'low' | 'moderate' | 'elevated';
  className?: string;
}

export const ResultBadge: React.FC<ResultBadgeProps> = ({ band, className = '' }) => {
  const colors = getBandColor(band);
  const labels = {
    low: 'Low',
    moderate: 'Moderate',
    elevated: 'Elevated'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        colors,
        className
      )}
    >
      {labels[band]}
    </span>
  );
};
