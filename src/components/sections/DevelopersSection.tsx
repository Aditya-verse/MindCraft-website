import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Code2, Smartphone, TestTube2, Zap, Star, ArrowUpRight, Terminal, Coffee } from 'lucide-react';

const developers = [
  {
    name: "Aryan Bavkar",
    role: "Main Developer",
    tagline: "Architecting the future of learning",
    initials: "AB",
    gradient: "from-blue-500 via-cyan-400 to-blue-600",
    glowClass: "shadow-blue-500/40",
    borderClass: "border-blue-500/30 dark:border-blue-500/30",
    icon: Code2,
    github: "#",
    linkedin: "#",
    skills: ["React", "Node.js", "Firebase"],
    badge: "🏗️ Architect",
    fun: { emoji: "☕", label: "Coffees today", value: "7", stat1: "Commits", val1: "420+", stat2: "PRs Merged", val2: "69" },
  },
  {
    name: "Aditya Mane",
    role: "Android Developer",
    tagline: "Building apps that just feel right",
    initials: "AM",
    gradient: "from-purple-500 via-pink-400 to-rose-500",
    glowClass: "shadow-purple-500/40",
    borderClass: "border-purple-500/30 dark:border-purple-500/30",
    icon: Smartphone,
    image: "https://avatars.githubusercontent.com/u/108990623?v=4",
    github: "https://github.com/Aditya-verse",
    linkedin: "https://www.linkedin.com/in/adityamane-software-dev/",
    skills: ["Kotlin", "Jetpack Compose", "APIs"],
    badge: "📱 Android",
    fun: { emoji: "🚀", label: "Apps shipped", value: "3", stat1: "Stars", val1: "100+", stat2: "Followers", val2: "50+" },
  },
  {
    name: "Aditya Kudalkar",
    role: "Android Developer",
    tagline: "Crafting pixel-perfect user experiences",
    initials: "AK",
    gradient: "from-orange-500 via-amber-400 to-yellow-500",
    glowClass: "shadow-orange-500/40",
    borderClass: "border-orange-500/30 dark:border-orange-500/30",
    icon: Smartphone,
    github: "#",
    linkedin: "#",
    skills: ["Android", "UI/UX", "Java"],
    badge: "📱 Android",
    fun: { emoji: "🎨", label: "Screens designed", value: "30+", stat1: "Bugs Fixed", val1: "∞", stat2: "Dark Mode", val2: "Fan ✅" },
  },
  {
    name: "Prasad Khade",
    role: "QA Engineer",
    tagline: "Hunting bugs before they hunt users",
    initials: "PK",
    gradient: "from-green-500 via-emerald-400 to-teal-500",
    glowClass: "shadow-green-500/40",
    borderClass: "border-green-500/30 dark:border-green-500/30",
    icon: TestTube2,
    github: "#",
    linkedin: "#",
    skills: ["Testing", "QA", "Automation"],
    badge: "🧪 QA",
    fun: { emoji: "🐛", label: "Bugs caught", value: "200+", stat1: "Test Cases", val1: "150+", stat2: "Pass Rate", val2: "98%" },
  },
];

const FloatingOrb = ({ color, size, x, y, delay }: any) => (
  <motion.div
    className="absolute rounded-full pointer-events-none blur-3xl opacity-10 dark:opacity-20"
    style={{ background: color, width: size, height: size, left: x, top: y }}
    animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

export const DevelopersSection = () => {
  const [flipped, setFlipped] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-gray-950 relative overflow-hidden w-full transition-colors duration-300">
      {/* Ambient orbs */}
      <FloatingOrb color="#3b82f6" size={400} x="5%" y="10%" delay={0} />
      <FloatingOrb color="#a855f7" size={300} x="70%" y="60%" delay={2} />
      <FloatingOrb color="#10b981" size={250} x="85%" y="10%" delay={4} />
      <FloatingOrb color="#f97316" size={200} x="30%" y="70%" delay={1} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}/>

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase border border-gray-200 dark:border-white/10 backdrop-blur-sm"
          >
            <Zap size={12} className="animate-pulse" /> The Dream Team
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-gray-900 dark:text-white leading-none"
          >
            Meet the{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Creators</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
              />
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base md:text-lg"
          >
            Four humans on a mission to make studying feel like cheating — the right way.
          </motion.p>
          {/* Flip hint */}
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-gray-400 dark:text-gray-600 text-xs mt-3 flex items-center justify-center gap-1.5"
          >
            <Terminal size={11}/> Tap any card to see fun stats
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="flex flex-row overflow-x-auto md:overflow-visible pb-8 md:pb-0 gap-6 md:gap-6 snap-x snap-mandatory scrollbar-hide px-4 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4">
          {developers.map((dev, index) => {
            const Icon = dev.icon;
            const isFlipped = flipped === dev.name;
            const isHovered = hovered === dev.name;

            return (
              <motion.div
                key={dev.name}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                className="snap-center shrink-0 w-[270px] md:w-auto"
                style={{ perspective: '1200px' }}
              >
                <motion.div
                  className="relative w-full h-[390px] md:h-[420px] cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  onHoverStart={() => setHovered(dev.name)}
                  onHoverEnd={() => setHovered(null)}
                  onClick={() => setFlipped(isFlipped ? null : dev.name)}
                >

                  {/* ── FRONT ── */}
                  <div
                    className={`absolute inset-0 rounded-3xl border ${dev.borderClass} bg-white dark:bg-gray-900 shadow-xl dark:shadow-2xl overflow-hidden`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Gradient top bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${dev.gradient}`}/>
                    {/* Hover glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${dev.gradient} opacity-0`}
                      animate={{ opacity: isHovered ? 0.05 : 0 }}
                      transition={{ duration: 0.4 }}
                    />
                    {/* Badge */}
                    <div className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r ${dev.gradient} text-white shadow-lg`}>
                      {dev.badge}
                    </div>

                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-7 gap-0">
                      {/* Avatar */}
                      <div className="relative mb-6">
                        <motion.div
                          className={`absolute -inset-2 rounded-full bg-gradient-to-r ${dev.gradient} opacity-50 blur-md`}
                          animate={{ rotate: isHovered ? 360 : 0 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        {dev.image ? (
                          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                            <img src={dev.image} alt={dev.name} className="w-full h-full object-cover"/>
                          </div>
                        ) : (
                          <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${dev.gradient} flex items-center justify-center text-3xl font-black text-white shadow-2xl`}>
                            {dev.initials}
                          </div>
                        )}
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 shadow-lg"/>
                      </div>

                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1 text-center">{dev.name}</h3>
                      <div className="flex items-center gap-1.5 mb-4">
                        <Icon size={11} className="text-gray-400"/>
                        <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest font-semibold">{dev.role}</p>
                      </div>
                      <p className="text-gray-400 dark:text-gray-500 text-xs text-center italic mb-5 leading-relaxed px-2">"{dev.tagline}"</p>

                      <div className="flex flex-wrap gap-2 justify-center mb-5">
                        {dev.skills.map(skill => (
                          <span key={skill} className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r ${dev.gradient} text-white shadow-sm`}>
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <a href={dev.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 transition-all text-xs font-medium"
                        >
                          <Github size={12}/> GitHub
                        </a>
                        <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 transition-all text-xs font-medium"
                        >
                          <Linkedin size={12}/> LinkedIn
                        </a>
                      </div>

                      <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
                        className="text-[10px] text-gray-400 dark:text-gray-600 mt-4 flex items-center gap-1"
                      >
                        <Star size={8}/> Tap to see stats
                      </motion.p>
                    </div>
                  </div>

                  {/* ── BACK ── */}
                  <div
                    className={`absolute inset-0 rounded-3xl border ${dev.borderClass} overflow-hidden`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    onClick={() => setFlipped(null)}
                  >
                    {/* Full image for Aditya, gradient for others */}
                    {dev.image ? (
                      <>
                        <img src={dev.image} alt={dev.name} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
                      </>
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${dev.gradient} relative`}>
                        {/* Decorative circles */}
                        <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-white/10 rounded-full"/>
                        <div className="absolute bottom-[-40px] left-[-40px] w-64 h-64 bg-black/20 rounded-full"/>
                      </div>
                    )}

                    {/* Stats overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* Top — big emoji + label */}
                      <div className="text-center mt-4">
                        <div className="text-5xl mb-2">{dev.fun.emoji}</div>
                        <div className="text-white/80 text-xs uppercase tracking-widest">{dev.fun.label}</div>
                        <div className="text-4xl font-black text-white mt-1">{dev.fun.value}</div>
                      </div>

                      {/* Mid stats */}
                      <div className="flex gap-3 justify-center">
                        <div className="flex-1 bg-black/30 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/10">
                          <div className="text-white font-black text-xl">{dev.fun.val1}</div>
                          <div className="text-white/60 text-[10px] uppercase tracking-wide mt-0.5">{dev.fun.stat1}</div>
                        </div>
                        <div className="flex-1 bg-black/30 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/10">
                          <div className="text-white font-black text-xl">{dev.fun.val2}</div>
                          <div className="text-white/60 text-[10px] uppercase tracking-wide mt-0.5">{dev.fun.stat2}</div>
                        </div>
                      </div>

                      {/* Bottom — name + social */}
                      <div>
                        <h3 className="text-xl font-black text-white mb-1">{dev.name}</h3>
                        <p className="text-white/60 text-xs mb-3">{dev.role}</p>
                        <div className="flex gap-2">
                          <a href={dev.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-sm border border-white/20 transition-all"
                          >
                            <Github size={12}/> GitHub <ArrowUpRight size={10}/>
                          </a>
                          <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-sm border border-white/20 transition-all"
                          >
                            <Linkedin size={12}/> LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm">
            <Coffee size={18} className="text-amber-500"/>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Built with <span className="text-pink-500 font-bold">passion</span>,{' '}
              <span className="text-amber-500 font-bold">coffee</span>, and way too many{' '}
              <span className="text-blue-500 font-bold">late nights</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
