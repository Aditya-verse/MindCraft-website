import React from 'react';
import { motion } from 'framer-motion';
import { Brain, FileText, Target, Trophy, Sparkles, TrendingUp, Star, ArrowRight } from 'lucide-react';

export const FeaturesSection = ({ onFeatureClick }: any) => {
  const features = [
    {
      title: "MindCraft AI Tutor",
      subtitle: "Personalized Learning Assistant",
      desc: "MindCraft AI Tutor acts as an intelligent virtual teacher that helps students understand difficult concepts easily.",
      keyFunctionalities: [
        "Breaks complex topics into simple explanations and analogies",
        "Adapts explanations based on user's learning style",
        "Provides step-by-step guidance instead of direct answers",
        "Supports multiple subjects (science, math, coding, etc.)"
      ],
      benefits: [
        "Improves conceptual clarity",
        "Reduces dependency on teachers/tutors",
        "Enables self-paced learning",
        "Helps weak students grasp topics faster"
      ],
      rating: "4.9",
      size: "12.5mb",
      downloads: "1.2m",
      icon: Brain,
      color: "text-blue-600",
      bg: "bg-blue-50",
      blobColor: "text-blue-500"
    },
    {
      title: "PDF to Mind-Quiz",
      subtitle: "Automated Content Conversion",
      desc: "This feature converts study materials (PDFs/documents) into interactive quizzes automatically using AI.",
      keyFunctionalities: [
        "Extracts important information from documents",
        "Generates Multiple Choice Questions (MCQs)",
        "Generates Short Answer Questions and Flashcards",
        "Works within seconds using AI processing"
      ],
      benefits: [
        "Saves time in manual question creation",
        "Promotes active learning instead of passive reading",
        "Helps in quick revision",
        "Useful for exam preparation"
      ],
      rating: "4.8",
      size: "8.2mb",
      downloads: "850k",
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50",
      blobColor: "text-purple-500"
    },
    {
      title: "Adaptive Mind Maps",
      subtitle: "Smart Learning Visualization",
      desc: "This feature creates dynamic mind maps based on student performance and knowledge gaps.",
      keyFunctionalities: [
        "Analyzes quiz performance",
        "Identifies weak areas and knowledge gaps",
        "Automatically generates visual mind maps",
        "Connects related concepts for better understanding"
      ],
      benefits: [
        "Enhances visual learning",
        "Improves memory retention",
        "Helps students see the big picture of subjects",
        "Provides personalized study paths"
      ],
      rating: "4.7",
      size: "15mb",
      downloads: "2m",
      icon: Target,
      color: "text-green-600",
      bg: "bg-green-50",
      blobColor: "text-green-500"
    },
    {
      title: "Gamified Streaks",
      subtitle: "Motivation System",
      desc: "This feature adds game-like elements to studying to increase engagement and consistency.",
      keyFunctionalities: [
        "Earn XP (Experience Points) for completing tasks",
        "Maintain daily study streaks",
        "Compete with others via global leaderboard",
        "Unlock achievements and rewards"
      ],
      benefits: [
        "Increases student motivation",
        "Builds consistent study habits",
        "Encourages healthy competition",
        "Makes learning fun and engaging"
      ],
      rating: "5.0",
      size: "18mb",
      downloads: "500k",
      icon: Trophy,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      blobColor: "text-yellow-500"
    },
    {
      title: "Brain-Sync Flashcards",
      subtitle: "Spaced Repetition System",
      desc: "This feature uses scientifically proven spaced repetition algorithms to improve memory.",
      keyFunctionalities: [
        "Shows flashcards at the optimal time before forgetting",
        "Adjusts frequency based on performance",
        "Tracks remembered vs forgotten concepts"
      ],
      benefits: [
        "Boosts long-term memory retention",
        "Reduces forgetting rate",
        "Improves exam performance",
        "Efficient revision technique"
      ],
      rating: "4.6",
      size: "10mb",
      downloads: "3.5m",
      icon: Sparkles,
      color: "text-orange-600",
      bg: "bg-orange-50",
      blobColor: "text-orange-500"
    },
    {
      title: "Focus Analytics",
      subtitle: "Performance Tracking System",
      desc: "This feature provides insights into student learning progress and performance.",
      keyFunctionalities: [
        "Tracks active recall success rate and study time",
        "Tracks streak consistency",
        "Displays progress using visual dashboards",
        "Shows mastery level of subjects"
      ],
      benefits: [
        "Helps students identify strengths and weaknesses",
        "Improves study planning",
        "Provides data-driven learning decisions",
        "Increases accountability"
      ],
      rating: "5.0",
      size: "14mb",
      downloads: "1m",
      icon: TrendingUp,
      color: "text-rose-600",
      bg: "bg-rose-50",
      blobColor: "text-rose-500"
    },
    {
      title: "Beta Access Features",
      subtitle: "Advanced Capabilities",
      desc: "Experimental or upcoming features for enhanced learning experience.",
      keyFunctionalities: [
        "Advanced analytics",
        "Improved AI recommendations",
        "New learning tools and integrations"
      ],
      benefits: [
        "Early access to innovative features",
        "Continuous system improvement",
        "Better user experience over time"
      ],
      rating: "5.0",
      size: "∞",
      downloads: "Limited",
      icon: Star,
      color: "text-white",
      bg: "bg-gradient-to-br from-indigo-600 to-purple-700",
      blobColor: "text-purple-400",
      isSpecial: true
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
       {/* Background elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/5 rounded-full blur-[80px] md:blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/5 rounded-full blur-[80px] md:blur-[100px]" />
       </div>

       <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="text-center mb-12 md:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block mb-3 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs md:text-sm font-bold tracking-wide uppercase">
            Features
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Everything You Need to Excel
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Powerful tools designed to optimize your learning journey, personalized just for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: feature.isSpecial ? 1.02 : 1 }}
              onClick={() => onFeatureClick(feature)}
              className={`group relative p-6 md:p-8 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col h-full ${
                feature.isSpecial 
                  ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl md:shadow-2xl shadow-purple-900/20 border border-gray-700' 
                  : 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl md:hover:shadow-2xl border border-gray-100 dark:border-gray-700'
              }`}
            >
              {/* Special Background for Last Item */}
              {feature.isSpecial && (
                <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
                  <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-purple-500/20 rounded-full blur-3xl -mr-12 md:-mr-16 -mt-12 md:-mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-blue-500/20 rounded-full blur-3xl -ml-12 md:-ml-16 -mb-12 md:-mb-16"></div>
                </div>
              )}

              {/* Header */}
              <div className="flex justify-between items-start mb-5 md:mb-6 relative z-10">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={24} className="md:w-8 md:h-8" />
                </div>
                {feature.isSpecial && (
                  <span className="px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] md:text-xs font-bold uppercase tracking-wide">
                    Beta Access
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="mb-6 relative z-10 flex-1">
                <h3 className={`text-xl md:text-2xl font-bold mb-2 md:mb-3 ${feature.isSpecial ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${feature.isSpecial ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                  {feature.desc}
                </p>
              </div>

              {/* Footer / Stats */}
              <div className={`pt-5 md:pt-6 border-t flex items-center justify-between relative z-10 ${feature.isSpecial ? 'border-gray-700' : 'border-gray-100 dark:border-gray-700'}`}>
                <div className="flex items-center gap-1">
                  <Star size={14} className="md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                  <span className={`font-bold text-sm md:text-base ${feature.isSpecial ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{feature.rating}</span>
                </div>
                <div className={`text-xs md:text-sm font-medium ${feature.isSpecial ? 'text-purple-300' : 'text-blue-600 dark:text-blue-400'} group-hover:underline flex items-center gap-1`}>
                  Learn more <ArrowRight size={12} className="md:w-[14px] md:h-[14px]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
