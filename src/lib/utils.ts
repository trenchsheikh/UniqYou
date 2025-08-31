import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercentage(value: number, max: number): string {
  const percentage = Math.round((value / max) * 100);
  return `${percentage}%`;
}

export function getDomainLabel(domain: string): string {
  const labels: Record<string, string> = {
    'adhd': 'ADHD',
    'autism': 'Autism Spectrum',
    'dyslexia': 'Dyslexia',
    'dyscalculia': 'Dyscalculia',
    'dysgraphia': 'Dysgraphia',
    'dyspraxia': 'Dyspraxia',
    'auditory-processing': 'Auditory Processing',
    'visual-processing': 'Visual Processing',
    'tourettes': 'Tourette\'s Syndrome',
    'ocd': 'OCD Traits',
    'anxiety': 'Anxiety Traits',
    'depression': 'Depression Traits',
    'social-communication': 'Social Communication',
    'sensory-processing': 'Sensory Processing'
  };
  
  return labels[domain] || domain.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function getBandColor(band: 'low' | 'moderate' | 'elevated'): string {
  switch (band) {
    case 'low':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    case 'moderate':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
    case 'elevated':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
    default:
      return 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-900/20';
  }
}
