import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface MindBotProps {
  onMascotClick?: () => void;
}

const MindBot: React.FC<MindBotProps> = ({ onMascotClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    "Need study tips? 📚",
    "Exam anxiety? I can help! 😌",
    "Let's crush those goals! 🚀",
    "Ask me anything! 💡",
    "Time for a quiz? ⏱️"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  if (!isVisible) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onMascotClick?.();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-4 pointer-events-none">
      {/* Mascot Container */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="MindBot Mascot"
        className="relative pointer-events-auto cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onMascotClick}
        onKeyDown={handleKeyDown}
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.1, rotate: 0 }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        {/* Speech Bubble */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, scale: 0.8, x: 20, y: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20, y: 10 }}
              className="absolute left-full bottom-full mb-2 ml-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-2xl rounded-bl-none shadow-xl border border-gray-100 dark:border-gray-700 whitespace-nowrap text-sm font-bold"
            >
              {messages[messageIndex]}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bot Body */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 flex items-center justify-center relative overflow-hidden border-2 border-white dark:border-gray-800">
          {/* Eyes Container */}
          <div className="flex gap-2 relative z-10 mt-1">
            {/* Left Eye */}
            <motion.div 
              className="w-3 h-4 bg-white rounded-full relative overflow-hidden"
              animate={{ scaleY: [1, 0.1, 1, 1, 1] }}
              transition={{ duration: 3, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
            >
              <div className="absolute top-1 right-0.5 w-1.5 h-1.5 bg-black rounded-full"></div>
            </motion.div>
            {/* Right Eye */}
            <motion.div 
              className="w-3 h-4 bg-white rounded-full relative overflow-hidden"
              animate={{ scaleY: [1, 0.1, 1, 1, 1] }}
              transition={{ duration: 3, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
            >
              <div className="absolute top-1 right-0.5 w-1.5 h-1.5 bg-black rounded-full"></div>
            </motion.div>
          </div>

          {/* Mouth */}
          <div className="absolute bottom-4 w-2 h-1 bg-black/20 rounded-full"></div>

          {/* Shine */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
        </div>

        {/* Close Button (visible on hover) */}
        <button 
          aria-label="Close Mascot"
          onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
          className="absolute -top-2 -right-2 bg-gray-200 dark:bg-gray-700 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-100 hover:text-red-500"
        >
          <X size={12} />
        </button>
      </motion.div>
    </div>
  );
};

export default MindBot;
