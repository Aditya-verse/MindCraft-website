import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MessageSquare, X, Check } from 'lucide-react';

export const LegalPage = ({ title, content, onNavigate }: any) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackEmail] = useState('support.mindcraft@gmail.com');
  const [userEmail, setUserEmail] = useState('');
  const [feedbackQuery, setFeedbackQuery] = useState('');
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFeedbackSent(true);
    setTimeout(() => {
      setShowFeedbackModal(false);
      setIsFeedbackSent(false);
      setFeedbackQuery('');
      setUserEmail('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 md:pt-32 pb-12 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 md:mb-8 font-medium">
          <ChevronRight className="rotate-180" size={20} /> Back to Home
        </button>
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-12 mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-8 md:mb-12 text-gray-900 dark:text-white">{title}</h1>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4 md:space-y-6 text-base md:text-lg overflow-x-hidden">
            {content}
          </div>
        </div>

        {/* Developer Feedback Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 md:p-12 text-center border border-blue-100 dark:border-blue-800">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">Have questions about our policies?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Our developer team is here to help. If you have any concerns or feedback regarding our terms or privacy practices, please let us know.
          </p>
          <button 
            onClick={() => setShowFeedbackModal(true)}
            className="w-full md:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 inline-flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <MessageSquare size={20} className="md:w-auto w-5 h-5"/> Send Feedback to Developers
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowFeedbackModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800"
            >
              {!isFeedbackSent ? (
                <>
                  <button onClick={() => setShowFeedbackModal(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full" aria-label="Close"><X size={20}/></button>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Send Feedback</h3>
                  <p className="text-gray-500 text-sm md:text-base mb-6">We'd love to hear your thoughts or answer any questions.</p>
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="block text-sm font-bold mb-1">To</label>
                      <input 
                        type="email" 
                        value={feedbackEmail}
                        readOnly
                        className="w-full p-2.5 md:p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 outline-none cursor-not-allowed text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1">Your Email</label>
                      <input 
                        type="email" 
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full p-2.5 md:p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1">Your Query / Feedback</label>
                      <textarea 
                        value={feedbackQuery}
                        onChange={e => setFeedbackQuery(e.target.value)}
                        className="w-full p-2.5 md:p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none h-24 md:h-32 resize-none text-sm md:text-base"
                        placeholder="Tell us what you think..."
                        required
                      />
                    </div>
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 text-sm md:text-base">
                      Send Message
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 md:py-10">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    className="w-16 h-16 md:w-20 md:h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6"
                  >
                    <Check size={32} className="md:w-10 md:h-10" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm md:text-base">Thanks for reaching out. We'll get back to you soon.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const PrivacyPolicy = ({ onNavigate }: any) => (
  <LegalPage 
    title="Privacy Policy" 
    onNavigate={onNavigate}
    content={
      <>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">1. Information We Collect</h3>
        <p>We collect information you provide directly to us when you create an account, use our services, or communicate with us. This may include your name, email address, and educational data.</p>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">2. How We Use Your Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect MindCraft and our users.</p>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">3. Data Security</h3>
        <p>We use industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
      </>
    } 
  />
);

export const TermsAndConditions = ({ onNavigate }: any) => (
  <LegalPage 
    title="Terms and Conditions" 
    onNavigate={onNavigate}
    content={
      <>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">1. Acceptance of Terms</h3>
        <p>By accessing and using MindCraft, you accept and agree to be bound by the terms and provision of this agreement.</p>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">2. User Conduct</h3>
        <p>You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of MindCraft.</p>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">3. Intellectual Property</h3>
        <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of MindCraft or its content suppliers.</p>
      </>
    } 
  />
);

export const CookiePolicy = ({ onNavigate }: any) => (
  <LegalPage 
    title="Cookie Policy" 
    onNavigate={onNavigate}
    content={
      <>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">1. What Are Cookies</h3>
        <p>Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.</p>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">2. How MindCraft Uses Cookies</h3>
        <p>When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies to enable certain functions of the Service, to provide analytics, and to store your preferences.</p>
      </>
    } 
  />
);
