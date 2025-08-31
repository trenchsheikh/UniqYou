# UniqYou - Quick Start Guide

## What is UniqYou?

UniqYou is a comprehensive screening and support tool for exploring neurodevelopmental and learning differences. It provides:

- **14-Domain Screening**: ADHD, Autism, Dyslexia, Dyscalculia, Dysgraphia, Dyspraxia, Auditory/Visual Processing, Tourette's, OCD, Anxiety, Depression, Social Communication, and Sensory Processing
- **AI Chat Companion**: Dr. Sarah Chen, a professional AI psychologist for personalized guidance
- **Privacy-First**: All data stored locally on your device
- **Mobile-First Design**: Beautiful iOS-inspired glassmorphism interface

## Quick Setup

```bash
# Clone and setup
git clone <repository-url>
cd uniqyou
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Google Gemini API key

# Start development
npm run dev
```

## Environment Setup

Before running the app, create a `.env` file with your Google Gemini API key:

```bash
VITE_GEMINI_API_KEY=your_actual_api_key_here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

**Note**: The app will work with fallback responses if no API key is provided.

## Key Features

### 🧠 Comprehensive Screening
- Multi-step questionnaire covering 14 different domains
- Text input options for additional context
- Progress tracking and review system
- Personalized results with actionable tips

### 🤖 AI Chat Integration
- Professional AI psychologist (Dr. Sarah Chen)
- Context-aware responses based on screening results
- Evidence-based strategies and resources
- Professional boundaries and ethical guidelines

### 🎨 Beautiful Design
- Glassmorphism UI with backdrop blur effects
- iOS-inspired spacing and typography
- Dark mode support
- Mobile-responsive design

### 🔒 Privacy & Security
- Local data storage only
- No analytics or tracking
- User consent management
- Data control and clearing options

## Development Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Code linting
npm run type-check   # TypeScript checking
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 4.5.0
- **Styling**: Tailwind CSS 3.4.0
- **AI**: Google Gemini Pro API
- **Icons**: Lucide React
- **Storage**: LocalStorage

## Project Structure

```
src/
├── components/       # Reusable UI components
├── features/        # Feature modules (screen, chat, results)
├── pages/          # Main application pages
├── lib/            # Utilities and helpers
├── types/          # TypeScript definitions
└── index.css       # Global styles
```

## Getting Started

1. **Take a Screening**: Start with the comprehensive questionnaire
2. **Review Results**: Get personalized insights and tips
3. **Chat with AI**: Ask Dr. Sarah Chen for guidance
4. **Explore Resources**: Discover strategies and support options

## Important Notes

- **Educational Tool Only**: Not a substitute for professional medical advice
- **Privacy First**: All data stays on your device
- **Professional AI**: Maintains ethical boundaries and disclaimers
- **Accessibility**: WCAG AA compliant with full keyboard support

## Support

- Email: hello@uniqyou.app
- Take a screening to get started
- Chat with our AI companion for guidance

---

**Disclaimer**: UniqYou is an educational tool designed to promote understanding and self-awareness. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

