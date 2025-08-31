import type { Response, ScreeningResult, UserPreferences } from '../types';

const STORAGE_KEYS = {
  RESPONSES: 'uniqyou_responses',
  RESULTS: 'uniqyou_results',
  PREFERENCES: 'uniqyou_preferences',
  CONSENT: 'uniqyou_consent',
} as const;

export const storage = {
  // Responses
  saveResponses: (responses: Response[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESPONSES, JSON.stringify(responses));
    } catch (error) {
      console.error('Failed to save responses:', error);
    }
  },

  loadResponses: (): Response[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESPONSES);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load responses:', error);
      return [];
    }
  },

  // Results
  saveResults: (results: ScreeningResult[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
    } catch (error) {
      console.error('Failed to save results:', error);
    }
  },

  loadResults: (): ScreeningResult[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESULTS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load results:', error);
      return [];
    }
  },

  // Preferences
  savePreferences: (preferences: UserPreferences) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  },

  loadPreferences: (): UserPreferences => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return stored ? JSON.parse(stored) : {
        allowAIChat: false,
        darkMode: 'auto'
      };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {
        allowAIChat: false,
        darkMode: 'auto'
      };
    }
  },

  // Consent
  saveConsent: (consent: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONSENT, JSON.stringify(consent));
    } catch (error) {
      console.error('Failed to save consent:', error);
    }
  },

  loadConsent: (): boolean => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONSENT);
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.error('Failed to load consent:', error);
      return false;
    }
  },

  // Clear all data
  clearAll: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.RESPONSES);
      localStorage.removeItem(STORAGE_KEYS.RESULTS);
      localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
      localStorage.removeItem(STORAGE_KEYS.CONSENT);
    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  },

  // Check if data exists
  hasData: (): boolean => {
    return storage.loadResponses().length > 0 || storage.loadResults().length > 0;
  }
};
