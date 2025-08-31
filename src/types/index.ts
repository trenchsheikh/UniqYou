export type Domain = 
  | 'adhd' 
  | 'autism' 
  | 'dyslexia' 
  | 'dyscalculia' 
  | 'dysgraphia' 
  | 'dyspraxia' 
  | 'auditory-processing' 
  | 'visual-processing'
  | 'tourettes'
  | 'ocd'
  | 'anxiety'
  | 'depression'
  | 'social-communication'
  | 'sensory-processing';

export interface QuestionOption {
  id: string;
  label: string;
  value: number;
}

export interface Question {
  id: string;
  domain: Domain;
  text: string;
  type: 'mcq' | 'likert';
  options: QuestionOption[];
  textInputLabel?: string;
  textInputPlaceholder?: string;
}

export interface Response {
  questionId: string;
  value: number;
  textInput?: string;
}

export interface ScreeningResult {
  domain: Domain;
  rawScore: number;
  maxScore: number;
  normalized: number;
  band: 'low' | 'moderate' | 'elevated';
  summaryText: string;
  tips: string[];
}

export interface UserPreferences {
  allowAIChat: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ScreeningState {
  currentStep: number;
  responses: Response[];
  isComplete: boolean;
  results: ScreeningResult[];
}
