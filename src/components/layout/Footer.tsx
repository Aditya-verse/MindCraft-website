import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MindCraftLogo } from '../ui/Logo';
import { Instagram, Linkedin, Github, Mail, MapPin, MessageSquare, Smartphone, X, Check } from 'lucide-react';
import { db } from '../../firebase.ts';
import { collection, addDoc } from 'firebase/firestore';

export const Footer = ({ onNavigate }: any) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackEmail] = useState('support.mindcraft@gmail.com');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [feedbackQuery, setFeedbackQuery] = useState('');
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !feedbackQuery) return;
    setIsSending(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        name: userName,
        email: userEmail,
        message: feedbackQuery,
        createdAt: new Date().toISOString(),
      });
      setIsSending(false);
      setIsFeedbackSent(true);
      setTimeout(() => {
        setShowFeedbackModal(false);
        setIsFeedbackSent(false);
        setFeedbackQuery('');
        setUserEmail('');
        setUserName('');
      }, 3000);
    } catch (err) {
      console.error('Feedback error:', err);
      setIsSending(false);
    }
  };

  return (
    <>
      <footer className="bg-white dark:bg-gray-950 pt-16 md:pt-20 pb-8 md:pb-10 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <MindCraftLogo className="w-8 h-8 md:w-10 md:h-10" />
                <span className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">MindCraft</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8 max-w-sm text-base md:text-lg">
                Empowering students with AI-driven tools to master any subject and ace every exam.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/aditya_devx/" target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-600" aria-label="Instagram"><Instagram size={20}/></a>
                <a href="https://www.linkedin.com/in/adityamane-software-dev/" target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-600" aria-label="LinkedIn"><Linkedin size={20}/></a>
                <a href="https://github.com/Aditya-verse" target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-600" aria-label="GitHub"><Github size={20}/></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-gray-900 dark:text-white">Product</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
                <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-blue-600 transition-colors">Features</button></li>
                <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('roadmap')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-blue-600 transition-colors">Roadmap</button></li>
                <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('reviews')?.scrollIntoView({behavior:'smooth'}), 100); }} className="hover:text-blue-600 transition-colors">Reviews</button></li>
                <li><button className="hover:text-blue-600 transition-colors relative group flex items-center gap-2">
                  <Smartphone size={16} /> App Store
                  <span className="absolute -top-3 -right-6 bg-blue-100 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">SOON</span>
                </button></li>
                <li><button className="hover:text-blue-600 transition-colors relative group flex items-center gap-2">
                  <Smartphone size={16} /> Google Play
                  <span className="absolute -top-3 -right-6 bg-blue-100 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">SOON</span>
                </button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-gray-900 dark:text-white">Contact</h4>
              <ul className="space-y-3 md:space-y-4 text-gray-600 dark:text-gray-400 text-sm md:text-base">
                <li className="flex items-center gap-2"><Mail size={16} className="shrink-0"/> <a href="mailto:support.mindcraft@gmail.com" className="hover:text-blue-600 transition-colors truncate">support.mindcraft@gmail.com</a></li>
                <li className="flex items-center gap-2"><MapPin size={16} className="shrink-0"/> <span>India, Maharashtra</span></li>
                <li className="mt-4">
                    <button onClick={() => setShowFeedbackModal(true)} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
                        <MessageSquare size={16} /> Send Feedback
                    </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-gray-500">
            <div className="text-xs md:text-sm text-center md:text-left">© {new Date().getFullYear()} MindCraft. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-10">
              <button onClick={() => onNavigate('privacy')} className="hover:text-blue-600 transition-colors text-xs md:text-sm font-medium">Privacy Policy</button>
              <button onClick={() => onNavigate('terms')} className="hover:text-blue-600 transition-colors text-xs md:text-sm font-medium">Terms of Service</button>
              <button onClick={() => onNavigate('cookies')} className="hover:text-blue-600 transition-colors text-xs md:text-sm font-medium">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>

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
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
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
                      <label className="block text-sm font-bold mb-1">Your Name</label>
                      <input 
                        type="text" 
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full p-2.5 md:p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
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
                    <button disabled={isSending} type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 text-sm md:text-base disabled:opacity-50">
                      {isSending ? 'Sending...' : 'Send Message'}
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
    </>
  );
};
