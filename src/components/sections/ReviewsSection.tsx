import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, X, Check, Quote } from 'lucide-react';

const BASE_REVIEWS = [
  { name: "Sarah J.",      role: "Medical Student",       text: "MindCraft completely changed how I study. The AI plans are an absolute lifesaver!", rating: 5, color: "from-blue-500 to-cyan-400" },
  { name: "Michael T.",    role: "High School Senior",     text: "I went from a C to an A in Math thanks to the adaptive quizzes. Genuinely unreal.", rating: 5, color: "from-purple-500 to-pink-400" },
  { name: "Emily R.",      role: "Law Student",            text: "The best study app I've ever used. I recommended it to my entire cohort.", rating: 4, color: "from-green-500 to-emerald-400" },
  { name: "David K.",      role: "Engineering Major",      text: "Instant feedback on complex problems is a total game changer for exam prep.", rating: 5, color: "from-orange-500 to-amber-400" },
  { name: "Lisa M.",       role: "Nursing Student",        text: "Finally an app that actually understands my learning pace. No fluff, just results.", rating: 5, color: "from-pink-500 to-rose-400" },
  { name: "Rahul S.",      role: "IIT Aspirant",           text: "Covered JEE syllabus systematically. My mock scores jumped 40 percentile points!", rating: 5, color: "from-indigo-500 to-violet-400" },
  { name: "Priya K.",      role: "CA Finalist",            text: "The recall-based quizzes are exactly what CA students need. Brilliant product.", rating: 5, color: "from-teal-500 to-cyan-400" },
  { name: "Jake L.",       role: "MCAT Prep",              text: "Having a personal AI tutor available 24/7 feels like actual superpowers.", rating: 5, color: "from-red-500 to-orange-400" },
  { name: "Ananya B.",     role: "Class 12 Student",       text: "Board exam prep has never felt this manageable. I actually enjoy studying now.", rating: 5, color: "from-yellow-500 to-amber-400" },
  { name: "Carlos M.",     role: "MBA Student",            text: "Spaced repetition + AI scheduling = the only productivity combo I need.", rating: 4, color: "from-sky-500 to-blue-400" },
];

// Split into two rows for the dual marquee
const ROW1 = BASE_REVIEWS.slice(0, 5);
const ROW2 = BASE_REVIEWS.slice(5);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={13} className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'} />
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: typeof BASE_REVIEWS[0] }) => (
  <div className="flex-shrink-0 w-[300px] md:w-[340px] mx-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-black/20 relative overflow-hidden group">
    {/* Gradient accent top bar */}
    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${review.color}`}/>
    {/* Quote icon */}
    <div className={`absolute top-4 right-4 bg-gradient-to-r ${review.color} rounded-full p-1.5 opacity-20 group-hover:opacity-40 transition-opacity`}>
      <Quote size={12} className="text-white"/>
    </div>

    <StarRating rating={review.rating}/>
    <p className="text-gray-600 dark:text-gray-300 mt-3 mb-5 text-sm leading-relaxed line-clamp-3">
      "{review.text}"
    </p>
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center font-black text-white text-sm shadow-md`}>
        {review.name[0]}
      </div>
      <div>
        <div className="font-bold text-gray-900 dark:text-white text-sm">{review.name}</div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{review.role}</div>
      </div>
    </div>
  </div>
);

const MarqueeRow = ({ items, reverse = false }: { items: typeof BASE_REVIEWS; reverse?: boolean }) => {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden py-3 group/row">
      <motion.div
        className="flex"
        animate={{ x: reverse ? ['0%', '33.33%'] : ['0%', '-33.33%'] }}
        transition={{ duration: reverse ? 35 : 30, repeat: Infinity, ease: 'linear' }}
        // Pause on hover of the whole row
        whileHover={{ animationPlayState: 'paused' } as any}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review}/>
        ))}
      </motion.div>
    </div>
  );
};

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState(BASE_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', role: 'Student', text: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    setReviews(prev => [{ ...newReview, color: "from-indigo-500 to-violet-400" }, ...prev]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setNewReview({ name: '', role: 'Student', text: '', rating: 5 }); }, 3000);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden relative transition-colors duration-300">

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[80px]"/>
      </div>

      {/* Header */}
      <div className="container mx-auto px-6 mb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold tracking-widest uppercase border border-yellow-200 dark:border-yellow-700/40"
        >
          <Star size={11} className="fill-current"/> Student Love
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 text-gray-900 dark:text-white"
        >
          Loved by{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500">
            Students
          </span>{' '}
          Worldwide
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-6 text-sm md:text-base"
        >
          Join thousands of students achieving their dreams — one session at a time.
        </motion.p>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-6 md:gap-10 mb-8"
        >
          {[
            { value: "10,000+", label: "Active Students" },
            { value: "4.9 ★", label: "App Store Rating" },
            { value: "98%", label: "Would Recommend" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full font-bold shadow-md hover:shadow-xl text-blue-600 dark:text-blue-400 flex items-center gap-2 mx-auto text-sm transition-all"
        >
          <MessageSquare size={16}/> Write a Review
        </motion.button>
      </div>

      {/* Marquee rows */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent pointer-events-none"/>
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent pointer-events-none"/>

        {/* Row 1 — left to right → pause on hover */}
        <MarqueeRow items={ROW1} reverse={false}/>
        {/* Row 2 — right to left → opposite rhythm */}
        <MarqueeRow items={ROW2} reverse={true}/>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}
            />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 z-10"
            >
              {!submitted ? (
                <>
                  <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X size={20}/></button>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <Star size={18} className="text-white fill-white"/>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Share your experience</h3>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300">Your Name</label>
                        <input type="text" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                          placeholder="e.g. Alex Smith" required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300">Role / Major</label>
                        <input type="text" value={newReview.role} onChange={e => setNewReview({...newReview, role: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                          placeholder="e.g. CS Major"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300">Rating</label>
                      <div className="flex gap-2">
                        {[1,2,3,4,5].map(s => (
                          <button key={s} type="button" onClick={() => setNewReview({...newReview, rating: s})}
                            className={`transition-transform hover:scale-125 ${s <= newReview.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
                            <Star size={22} fill="currentColor"/>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5 text-gray-700 dark:text-gray-300">Your Review</label>
                      <textarea value={newReview.text} onChange={e => setNewReview({...newReview, text: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none text-sm"
                        placeholder="Tell us what you think..."
                        required
                      />
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-blue-600/20 text-sm">
                      Submit Review ✨
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-500/20"
                  >
                    <Check size={36}/>
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">You're Awesome! 🚀</h3>
                  <p className="text-gray-500 text-sm">Thanks for sharing the love. Your review has been added to the flow.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
