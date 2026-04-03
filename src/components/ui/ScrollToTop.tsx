import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { MindCraftLogo } from './Logo';

export const ScrollToTop = () => {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        aria-label="Scroll to top"
      >
        <MindCraftLogo className={`w-6 h-6 md:w-8 md:h-8 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        <ArrowUp className={`w-5 h-5 md:w-6 md:h-6 text-blue-600 absolute transition-opacity duration-300 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} />
        
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: -70, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="hidden md:block absolute right-0 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-lg pointer-events-none"
            >
              Back to Top 🚀
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};
