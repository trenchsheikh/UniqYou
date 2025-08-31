import React, { useEffect } from 'react';
import { Shield, Lock, Eye, Smartphone, Globe, MessageCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { accessibility } from '../lib/accessibility';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    accessibility.announcePageChange('Privacy Policy');
  }, []);

  return (
    <div className="min-h-screen pb-20 pt-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <GlassCard className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 text-white mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            How we protect your data and privacy
          </p>
        </GlassCard>

        {/* Overview */}
        <GlassCard className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Our Commitment to Privacy
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            At UniqYou, we believe that privacy is a fundamental human right. We've designed our 
            platform with privacy-first principles, ensuring that your personal information stays 
            exactly where it belongs - with you.
          </p>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            This privacy policy explains how we handle your data, what we collect (and don't collect), 
            and how you maintain complete control over your information.
          </p>
        </GlassCard>

        {/* What We Don't Collect */}
        <GlassCard className="mb-6 border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-900/20">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
            What We Don't Collect
          </h2>
          <div className="space-y-3 text-red-700 dark:text-red-300">
            <div className="flex items-start space-x-2">
              <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Personal identifying information (name, email, phone number)</span>
            </div>
            <div className="flex items-start space-x-2">
              <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>IP addresses or location data</span>
            </div>
            <div className="flex items-start space-x-2">
              <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Device fingerprints or tracking cookies</span>
            </div>
            <div className="flex items-start space-x-2">
              <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Analytics or usage statistics</span>
            </div>
            <div className="flex items-start space-x-2">
              <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>Third-party tracking or advertising</span>
            </div>
          </div>
        </GlassCard>

        {/* What We Store Locally */}
        <GlassCard className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            What We Store Locally
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Screening Responses
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your answers to screening questions are stored in your device's local storage. 
                  This allows you to review and edit your responses before completing the screening.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                <Eye className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Screening Results
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your calculated scores and personalized insights are stored locally so you can 
                  reference them later and share them with healthcare professionals if desired.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  User Preferences
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Settings like AI chat permissions and dark mode preferences are stored locally 
                  to personalize your experience.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Data Security */}
        <GlassCard className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Data Security
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                🔒 Local Storage Only
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                All data is stored in your browser's local storage (localStorage). 
                This means your information never leaves your device and cannot be accessed by our servers.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                🚫 No Server Storage
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                We don't have databases or servers that store your personal information. 
                Even if our servers were compromised, your data would remain safe.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                🌐 No Network Transmission
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Your screening responses and results are never transmitted over the internet. 
                They exist solely on your device.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* AI Chat Privacy */}
        <GlassCard className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            AI Chat Privacy
          </h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p>
              Our AI chat feature is designed with privacy in mind:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Local Processing:</strong> AI responses are generated locally using pre-trained models</li>
              <li><strong>No Data Sharing:</strong> Your conversations are not sent to external AI services</li>
              <li><strong>Context Control:</strong> You choose whether the AI can access your screening results</li>
              <li><strong>Chat History:</strong> Message history is stored locally and can be cleared anytime</li>
            </ul>
            <p className="mt-3">
              <strong>Note:</strong> The AI responses are educational and supportive in nature. 
              They should not be considered medical advice.
            </p>
          </div>
        </GlassCard>

        {/* Your Rights */}
        <GlassCard className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Your Data Rights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                📱 Complete Control
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                You can view, edit, or delete your data at any time through the app interface.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                🗑️ Easy Deletion
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Clear all your data with a single button click in the app settings.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                📊 Export Data
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Download your screening results to share with healthcare professionals.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20">
              <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                🔄 Start Fresh
              </h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Reset your screening and start over with a clean slate anytime.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Third-Party Services */}
        <GlassCard className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Third-Party Services
          </h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p>
              UniqYou is designed to be completely self-contained:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>No Analytics:</strong> We don't use Google Analytics, Mixpanel, or similar services</li>
              <li><strong>No Advertising:</strong> We don't integrate with ad networks or tracking pixels</li>
              <li><strong>No Social Media:</strong> We don't include social media sharing or tracking</li>
              <li><strong>No External APIs:</strong> All functionality is built into the app itself</li>
            </ul>
            <p className="mt-3">
              The only external connections are for loading the app itself and any CDN resources 
              (which don't collect personal data).
            </p>
          </div>
        </GlassCard>

        {/* Data Retention */}
        <GlassCard className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Data Retention
          </h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p>
              <strong>Local Storage:</strong> Your data remains on your device until you choose to remove it.
            </p>
            <p>
              <strong>No Automatic Deletion:</strong> We don't automatically delete your data after any time period.
            </p>
            <p>
              <strong>Browser Clearing:</strong> If you clear your browser's local storage, your data will be removed.
            </p>
            <p>
              <strong>App Uninstall:</strong> Uninstalling the app will remove all locally stored data.
            </p>
          </div>
        </GlassCard>

        {/* Children's Privacy */}
        <GlassCard className="mb-6 border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/20">
          <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-4">
            Children's Privacy
          </h2>
          <div className="space-y-3 text-amber-700 dark:text-amber-300">
            <p>
              <strong>Age Restriction:</strong> UniqYou is designed for adults (18+) and is not intended for children.
            </p>
            <p>
              <strong>Parental Guidance:</strong> If you're a parent or guardian, please supervise any use by minors.
            </p>
            <p>
              <strong>Educational Use:</strong> The tool may be used in educational settings with appropriate supervision.
            </p>
            <p>
              <strong>Professional Consultation:</strong> Children with learning differences should be evaluated by qualified professionals.
            </p>
          </div>
        </GlassCard>

        {/* Changes to Policy */}
        <GlassCard className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Changes to This Policy
          </h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p>
              We may update this privacy policy from time to time. When we do:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>We'll update the date at the bottom of this page</li>
              <li>We'll notify users through the app if there are significant changes</li>
              <li>We'll maintain the same privacy-first principles</li>
              <li>We'll never reduce your privacy protections</li>
            </ul>
            <p className="mt-3">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
        </GlassCard>

        {/* Contact */}
        <GlassCard className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Questions About Privacy?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            If you have any questions about this privacy policy or our data practices, 
            please don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('about')}
              className="glass-button"
            >
              Contact Us
            </button>
            <button
              onClick={() => onNavigate('chat')}
              className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with AI Dr. Chen
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
