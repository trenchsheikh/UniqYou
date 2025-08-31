import React, { useEffect } from 'react';
import { Shield, AlertTriangle, Mail, Heart, MessageCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { accessibility } from '../lib/accessibility';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    accessibility.announcePageChange('About');
  }, []);

  return (
    <div className="min-h-screen pb-20 pt-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            About UniqYou
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Your friendly companion for exploring learning and attention differences, 
            providing insights and strategies to help you understand your unique mind.
          </p>
        </div>

        <div className="space-y-8">
          <GlassCard>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
              What is UniqYou?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              UniqYou is a comprehensive screening and support tool designed to help individuals 
              explore various aspects of their learning and attention patterns. We focus on 
              neurodevelopmental differences like ADHD, autism traits, dyslexia, and other 
              learning challenges.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Our mission is to provide educational information, practical strategies, and 
              supportive resources to help you better understand yourself and thrive in your 
              daily life.
            </p>
          </GlassCard>

          {/* What We Screen */}
          <GlassCard className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              What We Screen
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">ADHD Traits</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Attention, focus, organization, and impulse control patterns
                </p>
              </div>
              <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Autism Traits</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Social interaction, sensory processing, and routine preferences
                </p>
              </div>
              <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Dyslexia</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Reading, writing, and language processing patterns
                </p>
              </div>
            </div>
          </GlassCard>

          {/* How It Works */}
          <GlassCard className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              How It Works
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Take the Screening
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Answer a series of questions about your experiences and patterns. 
                    The screening takes about 10-15 minutes to complete.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Get Your Results
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Receive personalized insights and scores for each area, 
                    along with helpful tips and strategies.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Explore Further
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Chat with our AI companion for personalized advice, 
                    or use your results to guide conversations with professionals.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Important Limitations */}
          <GlassCard className="mb-6 border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/20">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-4">
                  Important Limitations
                </h2>
                <div className="space-y-3 text-amber-700 dark:text-amber-300">
                  <p>
                    <strong>Not a Diagnosis:</strong> This screening is for educational purposes only. 
                    It cannot and should not replace professional evaluation.
                  </p>
                  <p>
                    <strong>Self-Report Bias:</strong> Results are based on your self-perception, 
                    which may not always reflect objective reality.
                  </p>
                  <p>
                    <strong>Cultural Context:</strong> Questions and scoring are based on Western 
                    cultural norms and may not be appropriate for all backgrounds.
                  </p>
                  <p>
                    <strong>Age Considerations:</strong> The screening is designed for adults. 
                    Children and adolescents may need different approaches.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Privacy & Security */}
          <GlassCard className="mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-primary-500 mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                  Privacy & Security
                </h2>
                <div className="space-y-3 text-slate-700 dark:text-slate-300">
                  <p>
                    <strong>Local Storage:</strong> All your data is stored locally on your device. 
                    We never see your responses or results.
                  </p>
                  <p>
                    <strong>No Tracking:</strong> We don't use analytics, cookies, or any tracking 
                    mechanisms. Your privacy is our priority.
                  </p>
                  <p>
                    <strong>Data Control:</strong> You can clear your data at any time through the 
                    app settings or by clearing your browser's local storage.
                  </p>
                  <p>
                    <strong>AI Privacy:</strong> When you chat with our AI, conversations are processed 
                    locally and not stored on external servers.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* When to Seek Professional Help */}
          <GlassCard className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              When to Seek Professional Help
            </h2>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p>
                Consider speaking with a healthcare professional if you experience:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Significant distress or impairment in daily functioning</li>
                <li>Thoughts of self-harm or harm to others</li>
                <li>Severe anxiety, depression, or mood changes</li>
                <li>Difficulty maintaining relationships or employment</li>
                <li>Substance use or other coping mechanisms</li>
              </ul>
              <p className="mt-3">
                <strong>Remember:</strong> Seeking help is a sign of strength, not weakness. 
                Mental health professionals are trained to help you navigate these challenges.
              </p>
            </div>
          </GlassCard>

          {/* Contact & Support */}
          <GlassCard className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Contact & Support
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Get in Touch
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  Have questions, suggestions, or feedback? We'd love to hear from you.
                </p>
                <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">hello@uniqyou.app</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Support Resources
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  Looking for additional support and resources?
                </p>
                <button
                  onClick={() => onNavigate('chat')}
                  className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with AI Dr. Chen
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Footer */}
          <GlassCard className="text-center">
            <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400 mb-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for the neurodiverse community</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              UniqYou is an educational tool designed to promote understanding and self-awareness. 
              Always consult qualified professionals for medical advice.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
