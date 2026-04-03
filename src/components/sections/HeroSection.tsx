import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Sparkles, Download, TrendingUp, Award, CheckCircle, Brain, Target, Scan, Zap } from 'lucide-react';

const FloatingElement = ({ delay, x, y, icon: Icon, className, mouseX, mouseY, depth = 1 }: any) => {
  const xMotion = useTransform(mouseX, [-0.5, 0.5], [-40 * depth, 40 * depth]);
  const yMotion = useTransform(mouseY, [-0.5, 0.5], [-40 * depth, 40 * depth]);
  const zMotion = useTransform(mouseY, [-0.5, 0.5], [-30 * depth, 30 * depth]);
  const rotateXMotion = useTransform(mouseY, [-0.5, 0.5], [15 * depth, -15 * depth]);
  const rotateYMotion = useTransform(mouseX, [-0.5, 0.5], [-15 * depth, 15 * depth]);

  return (
    <motion.div
      style={{ 
        x: xMotion, 
        y: yMotion, 
        z: zMotion,
        rotateX: rotateXMotion,
        rotateY: rotateYMotion,
        zIndex: depth * 10,
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        initial={{ x, y, opacity: 0, scale: 0 }}
        animate={{ 
          y: [y, y - 15, y + 15, y],
          rotateZ: [0, 8, -8, 0],
          opacity: 1,
          scale: 1
        }}
        transition={{ 
          duration: 4 + delay, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: delay * 0.2
        }}
        whileHover={{ scale: 1.25, rotateZ: 15, z: 50, transition: { duration: 0.3, type: "spring" } }}
        className={`p-3 md:p-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 cursor-pointer ${className}`}
      >
        <Icon size={24} className="md:w-8 md:h-8" />
      </motion.div>
    </motion.div>
  );
};

export const HeroSection = ({ onDownloadClick, onExploreClick }: any) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const xBack = useTransform(smoothMouseX, [-0.5, 0.5], [-50, 50]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const phoneZ = useTransform(smoothMouseY, [-0.5, 0.5], [0, 50]);

  return (
    <section 
      className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] lg:min-h-screen flex items-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero Section"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
         <motion.div style={{ y: y1, x: xBack }} className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
         <motion.div style={{ y: y2, x: useTransform(xBack, v => -v) }} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left z-20 mt-10 lg:mt-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs md:text-sm font-semibold mb-6 md:mb-8">
              <Sparkles size={14} /> <span>v2.0 is now live!</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-4 md:mb-6 tracking-tight">
              Your Personal AI <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Exam Superpower</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 md:px-0">
              Generate study plans, take AI-powered quizzes, and track your progress. 
              All the tools you need to ace your exams in one app.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start w-full sm:w-auto px-4 md:px-0">
              <button 
                onClick={onDownloadClick} 
                className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base md:text-lg shadow-xl shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                <Download size={20} /> Download App
              </button>
              <button 
                onClick={onExploreClick} 
                className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-base md:text-lg transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
              >
                Explore Features
              </button>
            </motion.div>
          </div>

          {/* Right 3D Phone & Floating Elements - Hidden on mobile, visible on lg */}
          <div className="relative h-[600px] hidden lg:flex items-center justify-center perspective-1000" aria-label="Interactive Phone Mockup Animation">
             <motion.div 
               style={{ rotateX, rotateY, z: phoneZ, transformStyle: "preserve-3d" }} 
               className="relative w-full h-full flex items-center justify-center"
             >
                {/* 3D Phone Mockup */}
                <motion.div 
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 1, -1, 0]
                  }} 
                  transition={{ 
                    duration: 5, 
                    ease: "easeInOut", 
                    repeat: Infinity 
                  }} 
                  style={{ transform: "translateZ(20px)" }}
                  className="relative w-[300px] h-[600px] rounded-[3rem] bg-gray-900 border-[8px] border-gray-800 shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col z-20"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-xl z-30"></div>
                  
                  <div className="w-full h-full bg-white dark:bg-gray-950 overflow-hidden relative flex flex-col">
                    <div className="h-10 w-full bg-gray-100 dark:bg-gray-900 flex justify-between px-6 items-center text-[10px] font-bold text-gray-500">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2.5 bg-gray-400 rounded-sm"></div>
                        <div className="w-3 h-2.5 bg-gray-400 rounded-sm"></div>
                      </div>
                    </div>

                    <div className="p-6 pb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Hello, Alex 👋</h3>
                      <p className="text-xs text-gray-500">Let's crush those exams!</p>
                    </div>

                    <div className="px-6 py-4 grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl">
                        <div className="text-blue-500 mb-2"><TrendingUp size={20}/></div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">85%</div>
                        <div className="text-[10px] text-gray-500">Progress</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-2xl">
                        <div className="text-purple-500 mb-2"><Award size={20}/></div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">12</div>
                        <div className="text-[10px] text-gray-500">Streak</div>
                      </div>
                    </div>

                    <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-t-[2rem] p-6 shadow-inner">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Today's Focus</h4>
                      <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-xl flex items-center gap-3 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-purple-500' : 'bg-green-500'}`}>
                              {i}
                            </div>
                            <div className="flex-1">
                              <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                              <div className="h-1.5 w-12 bg-gray-100 dark:bg-gray-700 rounded"></div>
                            </div>
                            <CheckCircle size={16} className="text-gray-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Interactive Floating Icons */}
                <FloatingElement 
                  delay={0} x={-220} y={-100} depth={2} 
                  icon={Brain} 
                  className="bg-blue-50 dark:bg-blue-900/20 text-blue-500 border border-blue-100 dark:border-blue-800" 
                  mouseX={smoothMouseX} mouseY={smoothMouseY} 
                />
                <FloatingElement 
                  delay={1.5} x={240} y={50} depth={3} 
                  icon={Target} 
                  className="bg-green-50 dark:bg-green-900/20 text-green-500 border border-green-100 dark:border-green-800" 
                  mouseX={smoothMouseX} mouseY={smoothMouseY} 
                />
                <FloatingElement 
                  delay={0.8} x={200} y={-180} depth={1.5} 
                  icon={Scan} 
                  className="bg-cyan-50 dark:bg-cyan-900/20 text-cyan-500 border border-cyan-100 dark:border-cyan-800" 
                  mouseX={smoothMouseX} mouseY={smoothMouseY} 
                />
                <FloatingElement 
                  delay={2.2} x={-180} y={150} depth={2.5} 
                  icon={Zap} 
                  className="bg-purple-50 dark:bg-purple-900/20 text-purple-500 border border-purple-100 dark:border-purple-800" 
                  mouseX={smoothMouseX} mouseY={smoothMouseY} 
                />
                
                {/* Floating "Verified" Badge */}
                <motion.div 
                  style={{ 
                    x: useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]), 
                    y: useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]), 
                    z: 60,
                    transform: "translateZ(60px)"
                  }} 
                  animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
                  className="absolute bottom-20 -left-12 p-5 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl flex items-center gap-4 z-40"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-green-500 animate-ping absolute opacity-75"></div>
                    <div className="w-4 h-4 rounded-full bg-green-500 relative border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Accuracy</span>
                    <span className="text-base font-bold text-gray-900 dark:text-white">99.9% Verified</span>
                  </div>
                </motion.div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
