import type { ScreeningResult, Response } from '../../types';

export interface AIContext {
  results?: ScreeningResult[];
  responses?: Response[];
  userPreferences?: {
    allowAIChat: boolean;
  };
}

export interface AIResponse {
  message: string;
  suggestions?: string[];
  resources?: string[];
}

class AIClient {
  private context: AIContext = {};
  private apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  private apiUrl = import.meta.env.VITE_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  setContext(context: AIContext) {
    this.context = context;
  }

  async testConnection(): Promise<boolean> {
    try {
      if (!this.apiKey) {
        return false;
      }
      
      if (!this.apiKey.startsWith('AIza')) {
        return false;
      }
      
      const testRequest = {
        contents: [{
          parts: [{
            text: "Hello, this is a test message."
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 50,
        }
      };

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testRequest)
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  private createSystemPrompt(): string {
    let prompt = `You are Dr. Sarah Chen, a compassionate and highly qualified clinical psychologist specializing in neurodevelopmental disorders, learning differences, and mental health. You have over 15 years of experience working with individuals across the lifespan and are known for your warm, professional approach.

IMPORTANT: Keep all responses SHORT and CONCISE - maximum 1-3 lines. Be direct, helpful, and to the point.

Your expertise includes:
- ADHD (Attention-Deficit/Hyperactivity Disorder)
- Autism Spectrum Disorder (ASD)
- Dyslexia, Dyscalculia, Dysgraphia, and Dyspraxia
- Auditory and Visual Processing Disorders
- Tourette's Syndrome and Tic Disorders
- OCD (Obsessive-Compulsive Disorder)
- Anxiety and Depression
- Social Communication Disorders
- Sensory Processing Disorders

IMPORTANT GUIDELINES:
1. Keep responses SHORT - maximum 1-3 lines
2. Be direct, helpful, and to the point
3. Provide evidence-based information and practical strategies
4. NEVER make medical diagnoses - you are providing educational information only
5. Always remind users that you are not a medical professional and they should consult healthcare providers for proper evaluation
6. Base your responses on screening results when available
7. Offer specific, actionable advice and coping strategies
8. Be encouraging and focus on strengths and potential
9. Suggest appropriate resources and professional help when needed
10. Use clear, accessible language while maintaining professional expertise
11. Always prioritize the user's wellbeing and safety

Current context:`;

    if (this.context.results && this.context.results.length > 0) {
      prompt += `\n\nThe user has completed a screening with the following results:\n`;
      this.context.results.forEach(result => {
        prompt += `- ${result.domain.replace('-', ' ')}: ${result.band} level (${result.normalized.toFixed(1)}%)\n`;
      });
      
      if (this.context.responses && this.context.responses.length > 0) {
        const textInputs = this.context.responses
          .filter(r => r.textInput && r.textInput.trim().length > 0)
          .slice(0, 5); // Limit to 5 examples to avoid overwhelming the context
        
        if (textInputs.length > 0) {
          prompt += `\nThe user provided additional context in their responses:\n`;
          textInputs.forEach((response, index) => {
            const question = this.getQuestionText(response.questionId);
            prompt += `${index + 1}. ${question}: "${response.textInput}"\n`;
          });
        }
      }
    } else {
      prompt += `\n\nThe user has not completed a screening yet. Encourage them to do so for more personalized guidance.`;
    }

    prompt += `\n\nRemember: You are providing educational information and support, not medical advice. Always be encouraging, professional, and kind.`;

    return prompt;
  }

  private getQuestionText(questionId: string): string {
    // This would ideally come from the questions data, but for now we'll use a simple mapping
    const domain = questionId.split('-')[0];
    const domainLabels: Record<string, string> = {
      'adhd': 'ADHD',
      'autism': 'Autism',
      'dyslexia': 'Dyslexia',
      'dyscalculia': 'Dyscalculia',
      'dysgraphia': 'Dysgraphia',
      'dyspraxia': 'Dyspraxia',
      'auditory-processing': 'Auditory Processing',
      'visual-processing': 'Visual Processing',
      'tourettes': 'Tourette\'s',
      'ocd': 'OCD',
      'anxiety': 'Anxiety',
      'depression': 'Depression',
      'social-communication': 'Social Communication',
      'sensory-processing': 'Sensory Processing'
    };
    return domainLabels[domain] || 'General';
  }

  async ask(message: string): Promise<AIResponse> {
    try {
      if (!this.apiKey) {
        return this.generateContextualResponse(message.toLowerCase());
      }
      
      if (!this.apiKey.startsWith('AIza')) {
        return this.generateContextualResponse(message.toLowerCase());
      }
      
      if (this.apiKey.length < 30) {
        return this.generateContextualResponse(message.toLowerCase());
      }
      
      const systemPrompt = this.createSystemPrompt();
      
      const requestBody = {
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser message: ${message}\n\nPlease respond as Dr. Sarah Chen, providing professional, kind, and helpful guidance.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 150,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      // Try the primary model first
      let response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      // If primary model fails, try fallback model
      if (!response.ok && response.status === 404) {
        console.log('Primary model failed, trying fallback model...');
        const fallbackUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        response = await fetch(`${fallbackUrl}?key=${this.apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response Error:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          errorText
        });
        throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Parse the AI response to extract suggestions and resources
        const suggestions = this.extractSuggestions(aiResponse);
        const resources = this.extractResources(aiResponse);
        
        return {
          message: aiResponse,
          suggestions,
          resources
        };
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('AI API Error:', error);
      
      // Fallback to contextual response if API fails
      return this.generateContextualResponse(message.toLowerCase());
    }
  }

  private extractSuggestions(text: string): string[] {
    // Simple extraction of suggestions from AI response
    const suggestions: string[] = [];
    const lines = text.split('\n');
    
    for (const line of lines) {
      if (line.includes('•') || line.includes('-') || line.includes('*')) {
        const suggestion = line.replace(/^[•\-*]\s*/, '').trim();
        if (suggestion && suggestion.length > 10) {
          suggestions.push(suggestion);
        }
      }
    }
    
    return suggestions.slice(0, 4); // Limit to 4 suggestions
  }

  private extractResources(text: string): string[] {
    // Simple extraction of resources from AI response
    const resources: string[] = [];
    const lines = text.split('\n');
    
    for (const line of lines) {
      if (line.toLowerCase().includes('resource') || 
          line.toLowerCase().includes('website') || 
          line.toLowerCase().includes('organization') ||
          line.toLowerCase().includes('support group')) {
        const resource = line.trim();
        if (resource && resource.length > 10) {
          resources.push(resource);
        }
      }
    }
    
    return resources.slice(0, 3); // Limit to 3 resources
  }

  private generateContextualResponse(message: string): AIResponse {
    // Fallback response if API fails
    
    if (message.includes('help') || message.includes('support')) {
      return {
        message: `I'm experiencing technical difficulties, but help is available. Consider reaching out to a licensed mental health professional, your primary care physician, or local support groups. Seeking help is a sign of strength.`,
        suggestions: [
          'Contact a mental health professional',
          'Speak with your primary care doctor',
          'Look into local support groups',
          'Research educational resources'
        ]
      };
    }

    if (message.includes('adhd') || message.includes('attention') || message.includes('focus')) {
      return {
        message: `For ADHD and attention challenges, try breaking tasks into smaller chunks, using timers, and creating distraction-free environments. Consider speaking with a healthcare professional for personalized guidance.`,
        suggestions: [
          'Try the Pomodoro technique (25-minute focused work sessions)',
          'Create a dedicated workspace with minimal distractions',
          'Use apps or tools to help with time management',
          'Consider speaking with a healthcare professional'
        ]
      };
    }

    if (message.includes('autism') || message.includes('social') || message.includes('sensory')) {
      return {
        message: `For autism-related traits, create predictable routines, use visual schedules, and identify sensory triggers. Connect with autism support organizations for personalized guidance.`,
        suggestions: [
          'Create predictable daily routines',
          'Use visual schedules or planners',
          'Identify and manage sensory triggers',
          'Connect with autism support communities'
        ]
      };
    }

    if (message.includes('dyslexia') || message.includes('reading') || message.includes('learning')) {
      return {
        message: `For dyslexia and learning differences, try multi-sensory approaches, audiobooks, and text-to-speech software. Work with educational specialists for personalized strategies.`,
        suggestions: [
          'Try audiobooks alongside reading',
          'Use text-to-speech software',
          'Break reading into smaller sections',
          'Connect with dyslexia support organizations'
        ]
      };
    }

    return {
      message: `I'm experiencing technical difficulties. If you need immediate support, contact a mental health professional, crisis helpline, or trusted person. Your wellbeing is important.`,
      suggestions: [
        'Reach out to a mental health professional',
        'Contact a crisis helpline if needed',
        'Talk to someone you trust',
        'Seek immediate medical attention if in crisis'
      ]
    };
  }
}

export const aiClient = new AIClient();

