import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MindCraftLogo } from '../ui/Logo';
import { Sun, Moon, Menu, X } from 'lucide-react';

export const Navbar = ({ onLoginClick, user, onLogoutClick, onNavigate, currentPage, isDark, toggleTheme }: any) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', id: 'features', status: 'working' },
    { name: 'Roadmap', id: 'roadmap', status: 'working' },
    { name: 'Reviews', id: 'reviews', status: 'working' },
    { name: 'FAQ', id: 'faq', status: 'working' },
    { name: 'Quizzes', id: 'quizzes', status: 'coming_soon' },
    { name: 'Study Plans', id: 'study-plans', status: 'coming_soon' },
  ];

  const handleNavClick = (id: string, status: string) => {
    if (status === 'working') {
      setIsMenuOpen(false);
      onNavigate('home');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <button onClick={() => { onNavigate('home'); window.scrollTo(0,0); }} className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 shrink-0">
          <MindCraftLogo className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Mind<span className="text-blue-600">Craft</span></span>
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(item => (
            <div key={item.name} className="relative group">
              <button 
                onClick={() => handleNavClick(item.id, item.status)} 
                className={`text-sm font-medium transition-colors focus:outline-none focus:text-blue-600 ${item.status === 'working' ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' : 'text-gray-400 cursor-not-allowed'}`}
              >
                {item.name}
              </button>
              {item.status === 'coming_soon' && (
                <span className="absolute -top-3 -right-4 text-[9px] font-bold bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">SOON</span>
              )}
            </div>
          ))}
          
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>

          <motion.button 
            whileTap={{ scale: 0.8, rotate: 15 }}
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" 
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  <Sun size={20} className="text-yellow-400"/>
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                  <Moon size={20} className="text-gray-600"/>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          {user ? (
            <div className="flex items-center gap-4">
               <button onClick={() => onNavigate('dashboard')} className="text-sm font-bold text-gray-900 dark:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1">Profile</button>
            </div>
          ) : (
            <button onClick={onLoginClick} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-600/20 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sign In</button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2 md:gap-4 shrink-0">
          <motion.button 
            whileTap={{ scale: 0.8, rotate: 15 }}
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:bg-gray-800 transition-colors" 
          >
            {isDark ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20} className="text-gray-600"/>}
          </motion.button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg absolute w-full left-0 top-full"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <button 
                    onClick={() => handleNavClick(item.id, item.status)}
                    className={`text-base md:text-lg font-medium text-left ${item.status === 'working' ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}
                  >
                    {item.name}
                  </button>
                  {item.status === 'coming_soon' && (
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">COMING SOON</span>
                  )}
                </div>
              ))}
              <div className="h-px bg-gray-200 dark:bg-gray-800 my-2"></div>
              {user ? (
                <button onClick={() => { setIsMenuOpen(false); onNavigate('dashboard'); }} className="text-base md:text-lg font-bold text-blue-600 text-left">Profile</button>
              ) : (
                <button onClick={() => { setIsMenuOpen(false); onLoginClick(); }} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">Sign In</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
