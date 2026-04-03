import React from 'react';
import { motion } from 'framer-motion';
import { Download, Star, CheckCircle } from 'lucide-react';

export const DownloadAppSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 relative overflow-hidden flex justify-center">
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-500/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-500/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="bg-gray-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-gray-800">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/30 rounded-full blur-[80px] md:blur-[100px] -mr-32 md:-mr-48 -mt-32 md:-mt-48" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-600/30 rounded-full blur-[80px] md:blur-[100px] -ml-32 md:-ml-48 -mb-32 md:-mb-48" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 text-white leading-tight">
                Ready to Upgrade <br className="hidden sm:block"/> Your Grades?
              </h2>
              <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0">
                Join over 10,000 students who have transformed their learning with MindCraft. 
                Download now and start your 7-day free trial of Premium.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 md:mb-10 px-4 sm:px-0">
                <button className="px-6 md:px-8 py-3.5 md:py-4 bg-white text-gray-900 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors shadow-xl">
                  <Download size={24} className="md:w-7 md:h-7" />
                  <div className="text-left">
                    <div className="text-[10px] md:text-xs">Download on the</div>
                    <div className="text-base md:text-xl leading-none">App Store</div>
                  </div>
                </button>
                <button className="px-6 md:px-8 py-3.5 md:py-4 bg-gray-800 text-white border border-gray-700 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-700 transition-colors shadow-xl">
                  <Download size={24} className="md:w-7 md:h-7" />
                  <div className="text-left">
                    <div className="text-[10px] md:text-xs">GET IT ON</div>
                    <div className="text-base md:text-xl leading-none">Google Play</div>
                  </div>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-900 bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 mb-1 justify-center sm:justify-start">
                    <Star size={14} className="md:w-4 md:h-4 fill-current"/>
                    <Star size={14} className="md:w-4 md:h-4 fill-current"/>
                    <Star size={14} className="md:w-4 md:h-4 fill-current"/>
                    <Star size={14} className="md:w-4 md:h-4 fill-current"/>
                    <Star size={14} className="md:w-4 md:h-4 fill-current"/>
                    <span className="text-white font-bold ml-1 text-sm md:text-base">4.9/5</span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 text-center sm:text-left">from 2,000+ reviews</div>
                </div>
              </div>
            </div>

            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] hidden md:flex items-center justify-center">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[240px] md:w-[280px] lg:w-[300px] h-[480px] md:h-[550px] lg:h-[600px] bg-gray-950 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden z-10"
              >
                 <div className="w-full h-full bg-gradient-to-b from-blue-900 to-gray-900 p-6 flex flex-col items-center justify-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-xl z-20"></div>
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500 rounded-3xl mb-6 shadow-lg shadow-blue-500/50 flex items-center justify-center text-white">
                      <Download size={40} className="md:w-12 md:h-12" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">MindCraft</div>
                    <div className="text-blue-200 text-sm mb-8 text-center px-4">Your AI Exam Superpower</div>
                    <div className="w-full space-y-3 md:space-y-4">
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="text-xs text-gray-400 text-center">Downloading... 75%</div>
                    </div>
                 </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/4 right-0 md:-right-10 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 flex items-center gap-3"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle size={16} className="md:w-5 md:h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-xs md:text-sm">Install Complete</div>
                  <div className="text-[10px] md:text-xs text-gray-500">Ready to learn!</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
