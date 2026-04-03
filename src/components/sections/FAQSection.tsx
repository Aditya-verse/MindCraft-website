import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare } from 'lucide-react';

const FAQItem = ({ faq, index, activeIndex, setActiveIndex }: any) => {
  const isOpen = activeIndex === index;
  return (
    <motion.div 
      layout
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${isOpen ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/20 md:scale-[1.01] z-10' : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700'}`}
    >
      <button 
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-colors duration-500 ${isOpen ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
            <span className="font-bold text-sm md:text-lg">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <span className={`font-bold text-base md:text-xl pr-2 ${isOpen ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{faq.q}</span>
        </div>
        <div className={`p-1.5 rounded-full transition-transform duration-500 shrink-0 ${isOpen ? 'rotate-180 bg-white/20 text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-400'}`}>
          <ChevronDown size={18} className="md:w-5 md:h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 md:p-6 pt-0 md:pt-0 pl-[3.25rem] md:pl-[4.5rem] text-blue-50 leading-relaxed text-sm md:text-base">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const faqs = [
    { q: "Is MindCraft free to use?", a: "Yes! The core features are free forever. We also offer a Premium plan for unlimited AI access, advanced analytics, and priority support." },
    { q: "How does the AI study plan work?", a: "Our AI analyzes your syllabus, exam date, and learning pace to create a day-by-day schedule that adapts as you progress. It automatically reschedules if you miss a day." },
    { q: "Can I use it offline?", a: "You can download study materials, flashcards, and quizzes for offline access with our mobile app. Your progress syncs automatically when you reconnect." },
    { q: "Is my data secure?", a: "Absolutely. We use bank-level encryption to protect your data and never share it with third parties. Your study materials remain strictly confidential." },
  ];

  return (
    <section id="faq" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-500/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block mb-3 md:mb-4 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs md:text-sm font-bold tracking-wide uppercase">
              Support
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white leading-tight">
              Got Questions? <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">We've Got Answers.</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 md:mb-8 leading-relaxed">
              Everything you need to know about MindCraft and how it can transform your learning experience.
            </p>
            <div className="p-4 md:p-6 bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg md:shadow-xl flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <MessageSquare size={20} className="md:w-6 md:h-6" />
              </div>
              <div>
                <p className="font-bold text-sm md:text-base text-gray-900 dark:text-white">Still have questions?</p>
                <a href="mailto:support.mindcraft@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline text-xs md:text-sm break-all">Contact Support</a>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 space-y-4 md:space-y-6">
            {faqs.map((faq, i) => (
              <FAQItem 
                key={i} 
                faq={faq} 
                index={i} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
