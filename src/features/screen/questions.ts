import type { Question } from '../../types';

export const questions: Question[] = [
  // ADHD Questions
  {
    id: 'adhd-1',
    domain: 'adhd',
    text: 'How often do you find it difficult to stay focused on tasks that require sustained attention?',
    type: 'likert',
    options: [
      { id: 'adhd-1-1', label: 'Never', value: 0 },
      { id: 'adhd-1-2', label: 'Rarely', value: 1 },
      { id: 'adhd-1-3', label: 'Sometimes', value: 2 },
      { id: 'adhd-1-4', label: 'Often', value: 3 },
      { id: 'adhd-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'Can you give an example of when this happens?',
    textInputPlaceholder: 'Describe a specific situation...'
  },
  {
    id: 'adhd-2',
    domain: 'adhd',
    text: 'How often do you find yourself easily distracted by external stimuli or unrelated thoughts?',
    type: 'likert',
    options: [
      { id: 'adhd-2-1', label: 'Never', value: 0 },
      { id: 'adhd-2-2', label: 'Rarely', value: 1 },
      { id: 'adhd-2-3', label: 'Sometimes', value: 2 },
      { id: 'adhd-2-4', label: 'Often', value: 3 },
      { id: 'adhd-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of things tend to distract you?',
    textInputPlaceholder: 'Describe specific distractions...'
  },
  {
    id: 'adhd-3',
    domain: 'adhd',
    text: 'How often do you struggle with organizing tasks and activities?',
    type: 'likert',
    options: [
      { id: 'adhd-3-1', label: 'Never', value: 0 },
      { id: 'adhd-3-2', label: 'Rarely', value: 1 },
      { id: 'adhd-3-3', label: 'Sometimes', value: 2 },
      { id: 'adhd-3-4', label: 'Often', value: 3 },
      { id: 'adhd-3-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of organization do you find most challenging?',
    textInputPlaceholder: 'Describe specific challenges...'
  },
  {
    id: 'adhd-4',
    domain: 'adhd',
    text: 'How often do you feel restless or fidgety when you need to sit still?',
    type: 'likert',
    options: [
      { id: 'adhd-4-1', label: 'Never', value: 0 },
      { id: 'adhd-4-2', label: 'Rarely', value: 1 },
      { id: 'adhd-4-3', label: 'Sometimes', value: 2 },
      { id: 'adhd-4-4', label: 'Often', value: 3 },
      { id: 'adhd-4-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What situations make you feel most restless?',
    textInputPlaceholder: 'Describe specific situations...'
  },
  {
    id: 'adhd-5',
    domain: 'adhd',
    text: 'How often do you forget to complete tasks or follow through on commitments?',
    type: 'likert',
    options: [
      { id: 'adhd-5-1', label: 'Never', value: 0 },
      { id: 'adhd-5-2', label: 'Rarely', value: 1 },
      { id: 'adhd-5-3', label: 'Sometimes', value: 2 },
      { id: 'adhd-5-4', label: 'Often', value: 3 },
      { id: 'adhd-5-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'Can you give an example of when this happens?',
    textInputPlaceholder: 'Describe a specific situation...'
  },

  // Autism Questions
  {
    id: 'autism-1',
    domain: 'autism',
    text: 'How often do you prefer to do things the same way every time?',
    type: 'likert',
    options: [
      { id: 'autism-1-1', label: 'Never', value: 0 },
      { id: 'autism-1-2', label: 'Rarely', value: 1 },
      { id: 'autism-1-3', label: 'Sometimes', value: 2 },
      { id: 'autism-1-4', label: 'Often', value: 3 },
      { id: 'autism-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What routines or patterns do you prefer to maintain?',
    textInputPlaceholder: 'Describe your preferred routines...'
  },
  {
    id: 'autism-2',
    domain: 'autism',
    text: 'How often do you notice small sounds that others do not?',
    type: 'likert',
    options: [
      { id: 'autism-2-1', label: 'Never', value: 0 },
      { id: 'autism-2-2', label: 'Rarely', value: 1 },
      { id: 'autism-2-3', label: 'Sometimes', value: 2 },
      { id: 'autism-2-4', label: 'Often', value: 3 },
      { id: 'autism-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of sounds do you notice most?',
    textInputPlaceholder: 'Describe specific sounds...'
  },
  {
    id: 'autism-3',
    domain: 'autism',
    text: 'How often do you find it difficult to work out what someone is thinking or feeling?',
    type: 'likert',
    options: [
      { id: 'autism-3-1', label: 'Never', value: 0 },
      { id: 'autism-3-2', label: 'Rarely', value: 1 },
      { id: 'autism-3-3', label: 'Sometimes', value: 2 },
      { id: 'autism-3-4', label: 'Often', value: 3 },
      { id: 'autism-3-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What social situations do you find most challenging?',
    textInputPlaceholder: 'Describe specific situations...'
  },
  {
    id: 'autism-4',
    domain: 'autism',
    text: 'How often do you have intense interests in specific topics or activities?',
    type: 'likert',
    options: [
      { id: 'autism-4-1', label: 'Never', value: 0 },
      { id: 'autism-4-2', label: 'Rarely', value: 1 },
      { id: 'autism-4-3', label: 'Sometimes', value: 2 },
      { id: 'autism-4-4', label: 'Often', value: 3 },
      { id: 'autism-4-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What are some of your main interests?',
    textInputPlaceholder: 'Describe your interests...'
  },

  // Dyslexia Questions
  {
    id: 'dyslexia-1',
    domain: 'dyslexia',
    text: 'How often do you find it difficult to read words accurately?',
    type: 'likert',
    options: [
      { id: 'dyslexia-1-1', label: 'Never', value: 0 },
      { id: 'dyslexia-1-2', label: 'Rarely', value: 1 },
      { id: 'dyslexia-1-3', label: 'Sometimes', value: 2 },
      { id: 'dyslexia-1-4', label: 'Often', value: 3 },
      { id: 'dyslexia-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of words do you find most challenging?',
    textInputPlaceholder: 'Describe specific challenges...'
  },
  {
    id: 'dyslexia-2',
    domain: 'dyslexia',
    text: 'How often do you find it difficult to spell words correctly?',
    type: 'likert',
    options: [
      { id: 'dyslexia-2-1', label: 'Never', value: 0 },
      { id: 'dyslexia-2-2', label: 'Rarely', value: 1 },
      { id: 'dyslexia-2-3', label: 'Sometimes', value: 2 },
      { id: 'dyslexia-2-4', label: 'Often', value: 3 },
      { id: 'dyslexia-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of words do you find hardest to spell?',
    textInputPlaceholder: 'Describe specific examples...'
  },
  {
    id: 'dyslexia-3',
    domain: 'dyslexia',
    text: 'How often do you find it difficult to understand what you read?',
    type: 'likert',
    options: [
      { id: 'dyslexia-3-1', label: 'Never', value: 0 },
      { id: 'dyslexia-3-2', label: 'Rarely', value: 1 },
      { id: 'dyslexia-3-3', label: 'Sometimes', value: 2 },
      { id: 'dyslexia-3-4', label: 'Often', value: 3 },
      { id: 'dyslexia-3-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of reading material do you find most challenging?',
    textInputPlaceholder: 'Describe specific challenges...'
  },

  // Dyscalculia Questions
  {
    id: 'dyscalculia-1',
    domain: 'dyscalculia',
    text: 'How often do you find it difficult to understand basic math concepts?',
    type: 'likert',
    options: [
      { id: 'dyscalculia-1-1', label: 'Never', value: 0 },
      { id: 'dyscalculia-1-2', label: 'Rarely', value: 1 },
      { id: 'dyscalculia-1-3', label: 'Sometimes', value: 2 },
      { id: 'dyscalculia-1-4', label: 'Often', value: 3 },
      { id: 'dyscalculia-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What math concepts do you find most challenging?',
    textInputPlaceholder: 'Describe specific concepts...'
  },
  {
    id: 'dyscalculia-2',
    domain: 'dyscalculia',
    text: 'How often do you struggle with mental arithmetic?',
    type: 'likert',
    options: [
      { id: 'dyscalculia-2-1', label: 'Never', value: 0 },
      { id: 'dyscalculia-2-2', label: 'Rarely', value: 1 },
      { id: 'dyscalculia-2-3', label: 'Sometimes', value: 2 },
      { id: 'dyscalculia-2-4', label: 'Often', value: 3 },
      { id: 'dyscalculia-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of calculations do you find hardest?',
    textInputPlaceholder: 'Describe specific examples...'
  },
  {
    id: 'dyscalculia-3',
    domain: 'dyscalculia',
    text: 'How often do you find it difficult to remember mathematical formulas or procedures?',
    type: 'likert',
    options: [
      { id: 'dyscalculia-3-1', label: 'Never', value: 0 },
      { id: 'dyscalculia-3-2', label: 'Rarely', value: 1 },
      { id: 'dyscalculia-3-3', label: 'Sometimes', value: 2 },
      { id: 'dyscalculia-3-4', label: 'Often', value: 3 },
      { id: 'dyscalculia-3-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What formulas or procedures do you struggle with most?',
    textInputPlaceholder: 'Describe specific examples...'
  },

  // Dysgraphia Questions
  {
    id: 'dysgraphia-1',
    domain: 'dysgraphia',
    text: 'How often do you find it difficult to write clearly and coherently?',
    type: 'likert',
    options: [
      { id: 'dysgraphia-1-1', label: 'Never', value: 0 },
      { id: 'dysgraphia-1-2', label: 'Rarely', value: 1 },
      { id: 'dysgraphia-1-3', label: 'Sometimes', value: 2 },
      { id: 'dysgraphia-1-4', label: 'Often', value: 3 },
      { id: 'dysgraphia-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What aspects of writing do you find most challenging?',
    textInputPlaceholder: 'Describe specific challenges...'
  },
  {
    id: 'dysgraphia-2',
    domain: 'dysgraphia',
    text: 'How often do you struggle with organizing your thoughts when writing?',
    type: 'likert',
    options: [
      { id: 'dysgraphia-2-1', label: 'Never', value: 0 },
      { id: 'dysgraphia-2-2', label: 'Rarely', value: 1 },
      { id: 'dysgraphia-2-3', label: 'Sometimes', value: 2 },
      { id: 'dysgraphia-2-4', label: 'Often', value: 3 },
      { id: 'dysgraphia-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of writing tasks do you find hardest to organize?',
    textInputPlaceholder: 'Describe specific examples...'
  },

  // Dyspraxia Questions
  {
    id: 'dyspraxia-1',
    domain: 'dyspraxia',
    text: 'How often do you find it difficult to coordinate your movements?',
    type: 'likert',
    options: [
      { id: 'dyspraxia-1-1', label: 'Never', value: 0 },
      { id: 'dyspraxia-1-2', label: 'Rarely', value: 1 },
      { id: 'dyspraxia-1-3', label: 'Sometimes', value: 2 },
      { id: 'dyspraxia-1-4', label: 'Often', value: 3 },
      { id: 'dyspraxia-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of movements do you find most challenging?',
    textInputPlaceholder: 'Describe specific challenges...'
  },
  {
    id: 'dyspraxia-2',
    domain: 'dyspraxia',
    text: 'How often do you struggle with activities that require fine motor skills?',
    type: 'likert',
    options: [
      { id: 'dyspraxia-2-1', label: 'Never', value: 0 },
      { id: 'dyspraxia-2-2', label: 'Rarely', value: 1 },
      { id: 'dyspraxia-2-3', label: 'Sometimes', value: 2 },
      { id: 'dyspraxia-2-4', label: 'Often', value: 3 },
      { id: 'dyspraxia-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What fine motor activities do you find most difficult?',
    textInputPlaceholder: 'Describe specific activities...'
  },

  // Auditory Processing Questions
  {
    id: 'auditory-processing-1',
    domain: 'auditory-processing',
    text: 'How often do you find it difficult to understand speech in noisy environments?',
    type: 'likert',
    options: [
      { id: 'auditory-processing-1-1', label: 'Never', value: 0 },
      { id: 'auditory-processing-1-2', label: 'Rarely', value: 1 },
      { id: 'auditory-processing-1-3', label: 'Sometimes', value: 2 },
      { id: 'auditory-processing-1-4', label: 'Often', value: 3 },
      { id: 'auditory-processing-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of noisy environments do you find most challenging?',
    textInputPlaceholder: 'Describe specific situations...'
  },
  {
    id: 'auditory-processing-2',
    domain: 'auditory-processing',
    text: 'How often do you need people to repeat what they said?',
    type: 'likert',
    options: [
      { id: 'auditory-processing-2-1', label: 'Never', value: 0 },
      { id: 'auditory-processing-2-2', label: 'Rarely', value: 1 },
      { id: 'auditory-processing-2-3', label: 'Sometimes', value: 2 },
      { id: 'auditory-processing-2-4', label: 'Often', value: 3 },
      { id: 'auditory-processing-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of speech do you find hardest to understand?',
    textInputPlaceholder: 'Describe specific challenges...'
  },

  // Visual Processing Questions
  {
    id: 'visual-processing-1',
    domain: 'visual-processing',
    text: 'How often do you find it difficult to distinguish between similar-looking letters or numbers?',
    type: 'likert',
    options: [
      { id: 'visual-processing-1-1', label: 'Never', value: 0 },
      { id: 'visual-processing-1-2', label: 'Rarely', value: 1 },
      { id: 'visual-processing-1-3', label: 'Sometimes', value: 2 },
      { id: 'visual-processing-1-4', label: 'Often', value: 3 },
      { id: 'visual-processing-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'Which letters or numbers do you find most confusing?',
    textInputPlaceholder: 'Describe specific examples...'
  },
  {
    id: 'visual-processing-2',
    domain: 'visual-processing',
    text: 'How often do you struggle with visual organization or spatial awareness?',
    type: 'likert',
    options: [
      { id: 'visual-processing-2-1', label: 'Never', value: 0 },
      { id: 'visual-processing-2-2', label: 'Rarely', value: 1 },
      { id: 'visual-processing-2-3', label: 'Sometimes', value: 2 },
      { id: 'visual-processing-2-4', label: 'Often', value: 3 },
      { id: 'visual-processing-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of visual organization do you find challenging?',
    textInputPlaceholder: 'Describe specific challenges...'
  },

  // Tourette's Questions
  {
    id: 'tourettes-1',
    domain: 'tourettes',
    text: 'How often do you experience involuntary movements or tics?',
    type: 'likert',
    options: [
      { id: 'tourettes-1-1', label: 'Never', value: 0 },
      { id: 'tourettes-1-2', label: 'Rarely', value: 1 },
      { id: 'tourettes-1-3', label: 'Sometimes', value: 2 },
      { id: 'tourettes-1-4', label: 'Often', value: 3 },
      { id: 'tourettes-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of movements or tics do you experience?',
    textInputPlaceholder: 'Describe specific examples...'
  },
  {
    id: 'tourettes-2',
    domain: 'tourettes',
    text: 'How often do you experience involuntary vocal sounds or words?',
    type: 'likert',
    options: [
      { id: 'tourettes-2-1', label: 'Never', value: 0 },
      { id: 'tourettes-2-2', label: 'Rarely', value: 1 },
      { id: 'tourettes-2-3', label: 'Sometimes', value: 2 },
      { id: 'tourettes-2-4', label: 'Often', value: 3 },
      { id: 'tourettes-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of vocal sounds or words do you experience?',
    textInputPlaceholder: 'Describe specific examples...'
  },

  // OCD Questions
  {
    id: 'ocd-1',
    domain: 'ocd',
    text: 'How often do you experience intrusive thoughts that are difficult to control?',
    type: 'likert',
    options: [
      { id: 'ocd-1-1', label: 'Never', value: 0 },
      { id: 'ocd-1-2', label: 'Rarely', value: 1 },
      { id: 'ocd-1-3', label: 'Sometimes', value: 2 },
      { id: 'ocd-1-4', label: 'Often', value: 3 },
      { id: 'ocd-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of intrusive thoughts do you experience?',
    textInputPlaceholder: 'Describe specific examples...'
  },
  {
    id: 'ocd-2',
    domain: 'ocd',
    text: 'How often do you feel the need to perform certain behaviors or rituals?',
    type: 'likert',
    options: [
      { id: 'ocd-2-1', label: 'Never', value: 0 },
      { id: 'ocd-2-2', label: 'Rarely', value: 1 },
      { id: 'ocd-2-3', label: 'Sometimes', value: 2 },
      { id: 'ocd-2-4', label: 'Often', value: 3 },
      { id: 'ocd-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of behaviors or rituals do you feel compelled to perform?',
    textInputPlaceholder: 'Describe specific examples...'
  },

  // Anxiety Questions
  {
    id: 'anxiety-1',
    domain: 'anxiety',
    text: 'How often do you experience excessive worry or anxiety?',
    type: 'likert',
    options: [
      { id: 'anxiety-1-1', label: 'Never', value: 0 },
      { id: 'anxiety-1-2', label: 'Rarely', value: 1 },
      { id: 'anxiety-1-3', label: 'Sometimes', value: 2 },
      { id: 'anxiety-1-4', label: 'Often', value: 3 },
      { id: 'anxiety-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of situations cause you the most worry or anxiety?',
    textInputPlaceholder: 'Describe specific situations...'
  },
  {
    id: 'anxiety-2',
    domain: 'anxiety',
    text: 'How often do you feel nervous or on edge?',
    type: 'likert',
    options: [
      { id: 'anxiety-2-1', label: 'Never', value: 0 },
      { id: 'anxiety-2-2', label: 'Rarely', value: 1 },
      { id: 'anxiety-2-3', label: 'Sometimes', value: 2 },
      { id: 'anxiety-2-4', label: 'Often', value: 3 },
      { id: 'anxiety-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What situations make you feel most nervous or on edge?',
    textInputPlaceholder: 'Describe specific situations...'
  },

  // Depression Questions
  {
    id: 'depression-1',
    domain: 'depression',
    text: 'How often do you feel down, depressed, or hopeless?',
    type: 'likert',
    options: [
      { id: 'depression-1-1', label: 'Never', value: 0 },
      { id: 'depression-1-2', label: 'Rarely', value: 1 },
      { id: 'depression-1-3', label: 'Sometimes', value: 2 },
      { id: 'depression-1-4', label: 'Often', value: 3 },
      { id: 'depression-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What situations or circumstances affect your mood most?',
    textInputPlaceholder: 'Describe specific examples...'
  },
  {
    id: 'depression-2',
    domain: 'depression',
    text: 'How often do you have little interest or pleasure in doing things?',
    type: 'likert',
    options: [
      { id: 'depression-2-1', label: 'Never', value: 0 },
      { id: 'depression-2-2', label: 'Rarely', value: 1 },
      { id: 'depression-2-3', label: 'Sometimes', value: 2 },
      { id: 'depression-2-4', label: 'Often', value: 3 },
      { id: 'depression-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What activities or interests have you lost pleasure in?',
    textInputPlaceholder: 'Describe specific activities...'
  },

  // Social Communication Questions
  {
    id: 'social-communication-1',
    domain: 'social-communication',
    text: 'How often do you find it difficult to understand social cues or body language?',
    type: 'likert',
    options: [
      { id: 'social-communication-1-1', label: 'Never', value: 0 },
      { id: 'social-communication-1-2', label: 'Rarely', value: 1 },
      { id: 'social-communication-1-3', label: 'Sometimes', value: 2 },
      { id: 'social-communication-1-4', label: 'Often', value: 3 },
      { id: 'social-communication-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What types of social cues do you find most challenging?',
    textInputPlaceholder: 'Describe specific examples...'
  },
  {
    id: 'social-communication-2',
    domain: 'social-communication',
    text: 'How often do you struggle with maintaining conversations?',
    type: 'likert',
    options: [
      { id: 'social-communication-2-1', label: 'Never', value: 0 },
      { id: 'social-communication-2-2', label: 'Rarely', value: 1 },
      { id: 'social-communication-2-3', label: 'Sometimes', value: 2 },
      { id: 'social-communication-2-4', label: 'Often', value: 3 },
      { id: 'social-communication-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What aspects of conversation do you find most challenging?',
    textInputPlaceholder: 'Describe specific challenges...'
  },

  // Sensory Processing Questions
  {
    id: 'sensory-processing-1',
    domain: 'sensory-processing',
    text: 'How often do you find certain sounds, lights, or textures overwhelming?',
    type: 'likert',
    options: [
      { id: 'sensory-processing-1-1', label: 'Never', value: 0 },
      { id: 'sensory-processing-1-2', label: 'Rarely', value: 1 },
      { id: 'sensory-processing-1-3', label: 'Sometimes', value: 2 },
      { id: 'sensory-processing-1-4', label: 'Often', value: 3 },
      { id: 'sensory-processing-1-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What sensory experiences do you find most overwhelming?',
    textInputPlaceholder: 'Describe specific sounds, lights, textures...'
  },
  {
    id: 'sensory-processing-2',
    domain: 'sensory-processing',
    text: 'How often do you seek out or avoid certain sensory experiences?',
    type: 'likert',
    options: [
      { id: 'sensory-processing-2-1', label: 'Never', value: 0 },
      { id: 'sensory-processing-2-2', label: 'Rarely', value: 1 },
      { id: 'sensory-processing-2-3', label: 'Sometimes', value: 2 },
      { id: 'sensory-processing-2-4', label: 'Often', value: 3 },
      { id: 'sensory-processing-2-5', label: 'Very often', value: 4 }
    ],
    textInputLabel: 'What sensory experiences do you seek out or avoid?',
    textInputPlaceholder: 'Describe specific sounds, textures, lights, etc...'
  }
];

export const getQuestionsByDomain = (domain: string) => {
  return questions.filter(q => q.domain === domain);
};

export const getTotalQuestions = () => questions.length;
