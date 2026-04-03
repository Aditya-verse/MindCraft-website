import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Calendar, Award } from 'lucide-react';

export const HowItWorksSection = () => {
  const steps = [
    { icon: Upload, title: "1. Upload Materials", desc: "Share your syllabus, notes, or textbooks in any format." },
    { icon: Cpu, title: "2. AI Processing", desc: "Our engine analyzes and structures your content automatically." },
    { icon: Calendar, title: "3. Get Your Plan", desc: "Receive a day-by-day adaptive study schedule." },
    { icon: Award, title: "4. Ace Your Exam", desc: "Learn interactively, track mastery, and succeed." }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="inline-block mb-3 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs md:text-sm font-bold tracking-wide uppercase"
          >
            Simple Process
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">How <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">MindCraft</span> Works</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg px-2">
            From raw materials to exam mastery in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 relative">
          {/* Connecting Line (Only desktop) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 z-0"></div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-4 md:mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                <step.icon size={28} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed px-4 sm:px-0">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
