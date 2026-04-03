import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Brain, Clock, Layers, TrendingUp } from 'lucide-react';

export const WhyChooseUsSection = () => {
  const reasons = [
    { icon: Zap, title: "Lightning Fast Learning", desc: "Cut study time in half with targeted AI summaries and focused practice." },
    { icon: Brain, title: "Adaptive Intelligence", desc: "The platform learns how you learn, adjusting difficulty on the fly." },
    { icon: Clock, title: "24/7 Availability", desc: "Your personal tutor never sleeps. Ask complex questions anytime." },
    { icon: Layers, title: "All-in-One Workspace", desc: "No more switching between flashcard apps, planners, and notes." }
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              className="inline-block mb-3 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs md:text-sm font-bold tracking-wide uppercase"
            >
              Why Choose Us
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
              The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Advantage</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              MindCraft isn't just another study app. It's a complete paradigm shift in how you prepare for exams, combining cutting-edge AI with proven cognitive science.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              {reasons.map((reason, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3 md:gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <reason.icon size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 text-gray-900 dark:text-white">{reason.title}</h4>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{reason.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative w-full mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 mix-blend-overlay z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Students studying together" 
                className="w-full h-auto object-cover min-h-[250px] md:min-h-auto"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Stats Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-white/20 z-20"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                    <TrendingUp size={16} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">Average Grade Increase</div>
                    <div className="text-lg md:text-xl font-black text-gray-900 dark:text-white">+2.5 GPA Points</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
