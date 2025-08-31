import { useState, useEffect, useCallback } from 'react';
import type { Question, Response, ScreeningResult, Domain } from '../../types';
import { questions } from './questions';
import { storage } from '../../lib/storage';

export const useScreening = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<ScreeningResult[]>([]);

  // Load existing data on mount
  useEffect(() => {
    const savedResponses = storage.loadResponses();
    const savedResults = storage.loadResults();
    
    if (savedResponses.length > 0) {
      setResponses(savedResponses);
      setCurrentStep(savedResponses.length);
    }
    
    if (savedResults.length > 0) {
      setResults(savedResults);
      setIsComplete(true);
    }
  }, []);

  // Save responses whenever they change
  useEffect(() => {
    if (responses.length > 0) {
      storage.saveResponses(responses);
    }
  }, [responses]);

  // Save results whenever they change
  useEffect(() => {
    if (results.length > 0) {
      storage.saveResults(results);
    }
  }, [results]);

  const getCurrentQuestion = useCallback((): Question | null => {
    if (currentStep >= questions.length) return null;
    return questions[currentStep];
  }, [currentStep]);

  const getProgress = useCallback(() => {
    return {
      current: currentStep + 1,
      total: questions.length,
      percentage: Math.round(((currentStep + 1) / questions.length) * 100)
    };
  }, [currentStep]);

  const submitResponse = useCallback((questionId: string, value: number, textInput?: string) => {
    const newResponse: Response = { questionId, value, textInput };
    
    setResponses(prev => {
      const existingIndex = prev.findIndex(r => r.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        // If this is a temporary response (value = 0) and we already have a real response, preserve the real value
        if (value === 0 && updated[existingIndex].value !== 0) {
          updated[existingIndex] = { ...updated[existingIndex], textInput };
        } else {
          updated[existingIndex] = newResponse;
        }
        return updated;
      }
      return [...prev, newResponse];
    });
  }, []);

  const goToNext = useCallback(() => {
    if (currentStep < questions.length - 1) {
      // Clear the current question's response when moving to next
      const currentQuestion = questions[currentStep];
      if (currentQuestion) {
        setResponses(prev => prev.filter(r => r.questionId !== currentQuestion.id));
      }
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 0) {
      // Clear the current question's response when going back
      const currentQuestion = questions[currentStep];
      if (currentQuestion) {
        setResponses(prev => prev.filter(r => r.questionId !== currentQuestion.id));
      }
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < questions.length) {
      // Clear the current question's response when jumping to a step
      const currentQuestion = questions[currentStep];
      if (currentQuestion) {
        setResponses(prev => prev.filter(r => r.questionId !== currentQuestion.id));
      }
      setCurrentStep(step);
    }
  }, [currentStep, questions.length]);

  const getDomainTips = useCallback((domain: Domain): string[] => {
    const tipsMap: Record<Domain, string[]> = {
      'adhd': [
        'Try breaking tasks into smaller, manageable chunks',
        'Use timers or the Pomodoro technique',
        'Create a distraction-free study environment',
        'Consider speaking with a healthcare professional'
      ],
      'autism': [
        'Create predictable routines that work for you',
        'Use visual schedules or planners',
        'Practice self-advocacy in social situations',
        'Connect with neurodiversity communities'
      ],
      'dyslexia': [
        'Use audiobooks alongside reading',
        'Try text-to-speech software',
        'Break reading into smaller sections',
        'Use multi-sensory learning approaches'
      ],
      'dyscalculia': [
        'Use visual aids and manipulatives',
        'Break math problems into smaller steps',
        'Practice with real-world examples',
        'Consider math tutoring or specialized programs'
      ],
      'dysgraphia': [
        'Use speech-to-text software',
        'Practice typing skills',
        'Break writing into smaller tasks',
        'Use graphic organizers for planning'
      ],
      'dyspraxia': [
        'Practice fine motor activities regularly',
        'Use adaptive tools and equipment',
        'Break complex movements into steps',
        'Consider occupational therapy'
      ],
      'auditory-processing': [
        'Use visual cues and written instructions',
        'Request quiet environments for important conversations',
        'Ask people to speak clearly and face you',
        'Consider assistive listening devices'
      ],
      'visual-processing': [
        'Use high-contrast materials',
        'Break visual information into smaller parts',
        'Use color coding and organization systems',
        'Consider vision therapy if recommended'
      ],
      'tourettes': [
        'Learn stress management techniques',
        'Educate others about your condition',
        'Consider behavioral therapy approaches',
        'Connect with Tourette syndrome support groups'
      ],
      'ocd': [
        'Practice mindfulness and relaxation techniques',
        'Work with a therapist on exposure therapy',
        'Develop healthy coping mechanisms',
        'Consider cognitive behavioral therapy'
      ],
      'anxiety': [
        'Practice deep breathing and relaxation techniques',
        'Challenge negative thought patterns',
        'Gradually face feared situations',
        'Consider therapy or counseling'
      ],
      'depression': [
        'Maintain regular sleep and exercise routines',
        'Stay connected with supportive people',
        'Practice self-care and stress management',
        'Consider professional mental health support'
      ],
      'social-communication': [
        'Practice social skills in low-pressure situations',
        'Use social stories or scripts for common interactions',
        'Join social skills groups or clubs',
        'Consider social communication therapy'
      ],
      'sensory-processing': [
        'Identify and avoid overwhelming sensory experiences',
        'Use sensory tools like fidgets or noise-canceling headphones',
        'Create a sensory-friendly environment',
        'Consider occupational therapy for sensory integration'
      ]
    };
    
    return tipsMap[domain] || [
      'Consider speaking with a healthcare professional',
      'Research strategies that work for others with similar experiences',
      'Connect with support communities',
      'Keep a journal to track patterns and what helps'
    ];
  }, []);

  const calculateResults = useCallback((): ScreeningResult[] => {
    const domains: Domain[] = [
      'adhd', 'autism', 'dyslexia', 'dyscalculia', 'dysgraphia', 
      'dyspraxia', 'auditory-processing', 'visual-processing', 'tourettes', 
      'ocd', 'anxiety', 'depression', 'social-communication', 'sensory-processing'
    ];
    const results: ScreeningResult[] = [];

    domains.forEach(domain => {
      const domainQuestions = questions.filter(q => q.domain === domain);
      const domainResponses = responses.filter(r => 
        domainQuestions.some(q => q.id === r.questionId)
      );

      const rawScore = domainResponses.reduce((sum, r) => sum + r.value, 0);
      const maxScore = domainQuestions.length * 4; // Assuming 0-4 scale
      const normalized = (rawScore / maxScore) * 100;

      let band: 'low' | 'moderate' | 'elevated';
      let summaryText: string;

      if (normalized < 30) {
        band = 'low';
        summaryText = `Your responses suggest ${domain.replace('-', ' ')} traits are not significantly elevated at this time.`;
      } else if (normalized < 60) {
        band = 'moderate';
        summaryText = `Your responses suggest some ${domain.replace('-', ' ')} traits that may be worth exploring further.`;
      } else {
        band = 'elevated';
        summaryText = `Your responses suggest elevated ${domain.replace('-', ' ')} traits that may benefit from professional evaluation.`;
      }

      results.push({
        domain,
        rawScore,
        maxScore,
        normalized,
        band,
        summaryText,
        tips: getDomainTips(domain)
      });
    });

    return results;
  }, [responses, getDomainTips]);

  const completeScreening = useCallback(() => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setIsComplete(true);
    storage.saveResults(calculatedResults);
  }, [calculateResults]);

  const resetScreening = useCallback(() => {
    setCurrentStep(0);
    setResponses([]);
    setIsComplete(false);
    setResults([]);
    storage.clearAll();
  }, []);

  const canGoNext = useCallback(() => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;
    
    const hasResponse = responses.some(r => r.questionId === currentQuestion.id);
    return hasResponse;
  }, [currentStep, responses, getCurrentQuestion]);

  const canGoPrevious = useCallback(() => {
    return currentStep > 0;
  }, [currentStep]);

  const isLastStep = useCallback(() => {
    return currentStep === questions.length - 1;
  }, [currentStep]);

  return {
    // State
    currentStep,
    responses,
    isComplete,
    results,
    
    // Questions
    getCurrentQuestion,
    getProgress,
    
    // Navigation
    goToNext,
    goToPrevious,
    goToStep,
    canGoNext,
    canGoPrevious,
    isLastStep,
    
    // Actions
    submitResponse,
    completeScreening,
    resetScreening,
    
    // Data
    totalQuestions: questions.length
  };
};
