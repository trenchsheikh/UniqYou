# UniqYou

A comprehensive Vite + React + TypeScript + Tailwind CSS web/mobile application for self-screening minor learning/attention differences. UniqYou offers friendly, educational guidance and is not medical advice.

## Features

- **Comprehensive Screening**: Covers 14 neurodevelopmental and learning difference domains
- **AI Chat Companion**: Professional AI assistant (Dr. Sarah Chen) for personalized guidance
- **Privacy-First**: All data stored locally on your device
- **Mobile-First Design**: Responsive design with iOS-inspired glassmorphism
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **Dark Mode Support**: Automatic and manual dark mode switching

## Screened Conditions

### Neurodevelopmental & Learning Differences
- ADHD (Attention-Deficit/Hyperactivity Disorder)
- Autism Spectrum Disorder (ASD)
- Dyslexia (reading & language processing)
- Dyscalculia (math/numbers difficulty)
- Dysgraphia (writing difficulty)
- Dyspraxia / Developmental Coordination Disorder (motor coordination)
- Auditory Processing Disorder (APD)
- Visual Processing Disorder

### Other Related Conditions / Traits
- Tourette's Syndrome / Tic Disorders
- OCD (Obsessive Compulsive traits)
- Anxiety traits
- Depression traits
- Social Communication Disorder
- Sensory Processing Disorder

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3.4.0 with custom glassmorphism utilities
- **Icons**: Lucide React
- **AI**: Google Gemini Pro API integration
- **Storage**: LocalStorage for data persistence
- **Build Tool**: Vite 4.5.0

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd uniqyou

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Google Gemini API key

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# Google Gemini API Configuration
VITE_GEMINI_API_KEY=your_actual_api_key_here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

**Important**: Never commit your `.env` file to version control. The `.env.example` file is provided as a template.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── GlassCard.tsx   # Glassmorphism card component
│   ├── Header.tsx      # App header
│   ├── TabBar.tsx      # Mobile navigation
│   ├── ProgressBar.tsx # Screening progress indicator
│   ├── QuestionCard.tsx # Question display with text input
│   ├── ResultBadge.tsx # Result band indicators
│   ├── ScoreBar.tsx    # Visual score representation
│   ├── Toast.tsx       # Notification system
│   └── ChatUI.tsx      # AI chat interface
├── features/           # Feature-specific code
│   ├── screen/         # Screening functionality
│   │   ├── questions.ts # Question bank
│   │   ├── useScreening.ts # Screening logic hook
│   │   └── ScreenPage.tsx # Screening page
│   ├── results/        # Results display
│   │   └── ResultsPage.tsx
│   └── chat/          # AI chat functionality
│       ├── aiClient.ts # AI API integration
│       └── ChatPage.tsx
├── pages/             # Main application pages
│   ├── HomePage.tsx   # Landing page
│   ├── AboutPage.tsx  # Information page
│   └── PrivacyPage.tsx # Privacy policy
├── lib/               # Utility libraries
│   ├── storage.ts     # LocalStorage management
│   ├── accessibility.ts # Accessibility utilities
│   └── utils.ts       # General utilities
├── types/             # TypeScript type definitions
│   └── index.ts       # Core interfaces
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## Design System

### Color Palette
- **Primary**: Soft teal (#14b8a6) to blue (#0ea5e9) gradient
- **Neutrals**: Slate color family for text and borders
- **Background**: Subtle gradient from slate-50 to blue-50

### Glassmorphism Utilities
- `backdrop-blur-xl` for background blur
- `bg-white/10` for translucent backgrounds
- `border-white/20` for subtle borders
- `shadow-glass` for custom glass shadows

### Typography
- **Font Stack**: SF Pro Display fallback with system fonts
- **Headings**: text-2xl for main headings
- **Body**: text-base for readable content
- **Spacing**: iOS-inspired generous padding and margins

## AI Integration

The application features Dr. Sarah Chen, a professional AI psychologist who:
- Provides evidence-based information and strategies
- Offers personalized guidance based on screening results
- Maintains professional boundaries and ethical guidelines
- Never provides medical diagnoses
- Always encourages professional consultation when appropriate

## Privacy & Security

- **Local Storage**: All data stored on user's device
- **No Analytics**: Zero tracking or data collection
- **AI Privacy**: Conversations processed securely via API
- **Data Control**: Users can clear all data at any time
- **Consent Management**: Clear privacy controls and preferences

## Accessibility Features

- **WCAG AA Compliance**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Page Announcements**: Screen reader notifications

## Mobile Optimization

- **Responsive Design**: Works on all screen sizes
- **Touch Targets**: Minimum 44px tap targets
- **Mobile Navigation**: Bottom tab bar for mobile
- **Gesture Support**: Touch-friendly interactions
- **Performance**: Optimized for mobile devices

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

UniqYou is an educational tool designed to promote understanding and self-awareness. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

## Support

For questions, suggestions, or support:
- Email: samitahir018@gmail.com
- Take a screening to get started
- Chat with our AI companion for guidance
