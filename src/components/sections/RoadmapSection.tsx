import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Target, Calendar, BookOpen, Award } from 'lucide-react';
import { MindCraftLogo } from '../ui/Logo';

const RoadmapStep = ({ step, index, stepX, pathY, isEven, offsetY, carX }: any) => {
  const distance = useTransform(carX, (val: number) => Math.abs(val - stepX));
  const scale = useTransform(distance, [0, 300, 600], [1.15, 1, 1]);
  const glowOpacity = useTransform(distance, [0, 300, 600], [1, 0, 0]);

  return (
    <motion.div
        className="absolute top-1/2 flex flex-col items-center w-48 md:w-64 text-center z-20"
        style={{ left: `calc(10vw + ${stepX}px)`, marginTop: pathY + offsetY - 40, scale, willChange: "transform" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "0px -100px 0px 0px" }}
    >
        <div className="relative">
            <motion.div className={`absolute inset-0 rounded-2xl ${step.color} blur-xl`} style={{ opacity: glowOpacity, willChange: "opacity" }}/>
            <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg mb-3 md:mb-4 transform rotate-3 hover:rotate-0 transition-transform duration-300 ring-4 ring-white dark:ring-gray-900`}>
                <step.icon size={24} className="md:w-8 md:h-8" />
            </div>
        </div>
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden w-full">
            <h3 className="text-base md:text-lg font-bold mb-1 text-gray-900 dark:text-white relative z-10">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-[10px] md:text-xs leading-relaxed relative z-10">{step.desc}</p>
        </div>
        <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700 -z-10 ${isEven ? 'top-full h-12 md:h-16' : 'bottom-full h-12 md:h-16 origin-bottom rotate-180'}`}/>
    </motion.div>
  );
};

// Your Red Bull F1 Car SVG
const F1CarSVG = () => (
  <svg viewBox="0 0 1000 350" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <linearGradient id="matte-navy" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#222533"/>
        <stop offset="40%" stopColor="#181a24"/>
        <stop offset="100%" stopColor="#0f1118"/>
      </linearGradient>
      <linearGradient id="wing-red" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF1E3D"/>
        <stop offset="100%" stopColor="#CC001B"/>
      </linearGradient>
      <linearGradient id="carbon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1f1f1f"/>
        <stop offset="100%" stopColor="#0a0a0a"/>
      </linearGradient>
      <linearGradient id="tyre" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1c1c1c"/>
        <stop offset="100%" stopColor="#080808"/>
      </linearGradient>
      <filter id="shadow-blur">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feComponentTransfer><feFuncA type="linear" slope="0.6"/></feComponentTransfer>
      </filter>
      <g id="bull-shape">
        <path d="M106.8,42.4 c-4.5,-2.7 -11.6,-3.6 -18.8,-0.9 c-3.6,1.3 -6.3,4.5 -10.7,5.4 c-4.5,0.9 -10.7,0 -16.1,1.8 c-3.6,1.3 -6.3,3.6 -8.9,6.3 c-2.7,2.7 -6.3,5.4 -8.9,8.1 c-2.7,2.7 -5.4,5.4 -5.4,8.1 c0,2.7 1.8,4.5 3.6,5.4 c1.8,0.9 4.5,0.9 6.3,0 c1.8,-0.9 2.7,-2.7 3.6,-4.5 c0.9,-1.8 1.8,-3.6 3.6,-4.5 c1.8,-0.9 3.6,-1.8 6.3,-1.8 c2.7,0 5.4,0.9 8.1,2.7 c2.7,1.8 4.5,4.5 6.3,7.2 c1.8,2.7 2.7,6.3 2.7,8.9 c0,2.7 -0.9,5.4 -1.8,7.2 c-0.9,1.8 -2.7,3.6 -4.5,4.5 c-1.8,0.9 -4.5,1.8 -6.3,1.8 c-1.8,0 -3.6,0 -5.4,-0.9 c-1.8,-0.9 -3.6,-1.8 -5.4,-3.6 c-1.8,-1.8 -3.6,-3.6 -5.4,-4.5 c-1.8,-0.9 -3.6,-1.8 -5.4,-1.8 c-1.8,0 -3.6,0.9 -4.5,1.8 c-0.9,0.9 -1.8,2.7 -1.8,4.5 c0,1.8 0,3.6 0.9,5.4 c0.9,1.8 1.8,3.6 3.6,4.5 c1.8,0.9 3.6,1.8 6.3,1.8 c2.7,0 5.4,-0.9 7.2,-1.8 c1.8,-0.9 3.6,-2.7 4.5,-4.5 c0.9,-1.8 1.8,-3.6 1.8,-5.4 c0,-1.8 -0.9,-3.6 -1.8,-5.4 c-0.9,-1.8 -2.7,-3.6 -4.5,-4.5 c-1.8,-0.9 -4.5,-1.8 -6.3,-1.8 c-1.8,0 -3.6,0.9 -4.5,1.8 l 5.4,8.1 l 7.2,-2.7 l 6.3,8.9 l 10.7,-3.6 c 2.7,3.6 4.5,7.2 4.5,11.6 c 0,5.4 -1.8,10.7 -4.5,15.2 l 6.3,-2.7 c 1.8,-1.8 3.6,-4.5 4.5,-7.2 c 0.9,-2.7 1.8,-5.4 1.8,-8.9 c 0,-3.6 -0.9,-7.2 -2.7,-10.7 c -1.8,-3.6 -3.6,-7.2 -6.3,-9.8 c 3.6,0.9 7.2,1.8 10.7,1.8 c 3.6,0 7.2,-0.9 10.7,-1.8 c 3.6,-0.9 6.3,-2.7 8.9,-5.4 c 2.7,-2.7 4.5,-6.3 5.4,-9.8 c 0.9,-3.6 0.9,-7.2 0,-10.7 c -0.9,-3.6 -2.7,-7.2 -5.4,-9.8 c -2.7,-2.7 -6.3,-5.4 -9.8,-7.2 Z"/>
        <path d="M 0,90 c 4.5,0 8.9,-1.8 12.5,-4.5 c 3.6,-2.7 6.3,-6.3 8.1,-10.7 c 1.8,-4.5 2.7,-8.9 2.7,-14.3 c 0,-5.4 -0.9,-10.7 -2.7,-15.2 c 8.9,2.7 17.9,3.6 26.8,1.8 c 8.9,-1.8 17,-5.4 24.1,-10.7 c -8.9,-0.9 -17.9,0.9 -25.9,4.5 c -8.1,3.6 -15.2,8.9 -20.6,15.2 c -1.8,4.5 -2.7,9.8 -2.7,15.2 c 0,4.5 -0.9,8.9 -2.7,12.5 c -1.8,3.6 -4.5,6.3 -8.1,8.1 c -3.6,1.8 -7.2,2.7 -11.6,2.7 Z"/>
      </g>
      <path id="tire-top" d="M -30,0 A 30,30 0 0,1 30,0"/>
      <path id="tire-bottom" d="M 30,0 A 30,30 0 0,1 -30,0"/>
    </defs>

    {/* SHADOW */}
    <ellipse cx="500" cy="285" rx="380" ry="10" fill="#000000" filter="url(#shadow-blur)"/>

    {/* REAR WING */}
    <path d="M 830 160 L 890 160 L 880 200 L 830 200 Z" fill="url(#carbon)"/>
    <path d="M 850 135 L 940 135 L 930 155 L 845 155 Z" fill="#111"/>
    <text x="895" y="150" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="10" fill="#FFF" textAnchor="middle" letterSpacing="1">{'AT&T'}</text>
    <path d="M 845 155 L 945 155 L 910 230 L 835 230 Z" fill="url(#wing-red)"/>
    <line x1="885" y1="215" x2="905" y2="215" stroke="#111" strokeWidth="4"/>
    <line x1="890" y1="205" x2="910" y2="205" stroke="#111" strokeWidth="4"/>
    <line x1="895" y1="195" x2="915" y2="195" stroke="#111" strokeWidth="4"/>
    <line x1="900" y1="185" x2="920" y2="185" stroke="#111" strokeWidth="4"/>
    <text x="890" y="178" fontSize="20" fontFamily="'Arial Black', sans-serif" fill="#FFF" textAnchor="middle" letterSpacing="1.5">ESSO</text>
    <path d="M 810 185 L 850 185 L 850 190 L 810 190 Z" fill="#111"/>
    <path d="M 810 205 L 850 205 L 850 210 L 810 210 Z" fill="#111"/>

    {/* SUSPENSION REAR */}
    <line x1="770" y1="210" x2="840" y2="245" stroke="#111" strokeWidth="6"/>
    <line x1="800" y1="180" x2="840" y2="245" stroke="#111" strokeWidth="4"/>

    {/* CHASSIS */}
    <path d="
      M 140 245 
      C 160 235, 180 230, 240 220 
      C 300 210, 360 200, 420 185 
      C 440 180, 455 175, 470 180 
      L 500 170
      C 510 150, 520 130, 540 125
      L 590 125
      C 650 128, 700 145, 820 160
      L 820 200
      C 800 230, 780 240, 750 240
      L 300 255
      Z
    " fill="url(#matte-navy)"/>

    {/* YELLOW ACCENTS */}
    <path d="M 145 242 L 140 225 L 205 205 L 235 240 Z" fill="#FFD600"/>
    <path d="
      M 545 125 
      L 600 125 
      C 630 125, 660 140, 715 155
      C 715 165, 710 175, 700 190
      C 650 190, 580 180, 540 165 
      Z
    " fill="#FFD600"/>
    <circle cx="205" cy="222" r="14" fill="#FFD600"/>

    {/* BULL LOGOS */}
    <g transform="translate(195, 218) scale(0.12) rotate(-10)">
      <use href="#bull-shape" fill="#DE0A2A"/>
    </g>
    <g transform="translate(620, 160) scale(0.65) scale(-1, 1)">
      <use href="#bull-shape" fill="none" stroke="#FFD600" strokeWidth="6" strokeLinejoin="round"/>
    </g>
    <g transform="translate(620, 160) scale(0.65) scale(-1, 1)">
      <use href="#bull-shape" fill="#DE0A2A"/>
    </g>

    {/* RED AERO STRIPES */}
    <path d="M 285 220 C 350 220, 480 210, 520 195 C 550 185, 620 190, 700 190" stroke="#DE0A2A" strokeWidth="3.5" fill="none"/>
    <line x1="335" y1="250" x2="790" y2="235" stroke="#DE0A2A" strokeWidth="2.5"/>

    {/* FLOOR & BARGEBOARDS */}
    <path d="M 330 252 L 780 238 L 780 245 L 330 260 Z" fill="url(#carbon)"/>
    <path d="M 335 252 L 335 225 L 350 230 L 350 252 Z" fill="#111"/>
    <path d="M 360 252 L 360 215 L 375 225 L 375 252 Z" fill="#181a24"/>
    <path d="M 385 250 L 385 205 L 420 215 L 420 250 Z" fill="#111"/>
    <path d="M 430 248 L 430 200 L 470 200 L 470 245 Z" fill="#1a1c26"/>
    <path d="M 410 240 L 420 230 L 430 240 Z" fill="#000"/>
    <path d="M 430 240 L 440 230 L 450 240 Z" fill="#000"/>
    <path d="M 470 200 C 470 180, 485 180, 500 180 L 515 180 L 515 200 Z" fill="#050505"/>

    {/* SPONSORS */}
    <text x="340" y="210" fontFamily="'Times New Roman', Times, serif" fontSize="12" fill="#FFF" letterSpacing="1.5">ASTON MARTIN</text>
    <path d="M 320 207 L 330 204 L 335 207 L 330 210 Z" fill="#FFF"/>
    <ellipse cx="365" cy="235" rx="14" ry="6" fill="#007A33"/>
    <text x="365" y="238" fontFamily="Arial, sans-serif" fontSize="6" fontWeight="bold" fill="#FFD600" textAnchor="middle">RAUCH</text>
    <text x="488" y="225" fontFamily="Arial, sans-serif" fontSize="5" fill="#FFF" textAnchor="middle">PUMA</text>
    <path d="M 488 215 C 485 210, 490 208, 492 212 C 494 210, 495 215, 488 215 Z" fill="#FFF"/>
    <text x="535" y="180" fontFamily="Arial, sans-serif" fontSize="6" fontWeight="bold" fill="#FFF" letterSpacing="0.5">citrix</text>
    <g transform="translate(520, 235) scale(0.95, 1.25)">
      <text x="0" y="0" fontFamily="'Arial Black', Impact, sans-serif" fontSize="44" fill="#DE0A2A" letterSpacing="-1">Red Bull</text>
    </g>
    <text x="710" y="230" fontFamily="Arial, sans-serif" fontSize="4" fill="#FFF">IBM</text>
    <text x="735" y="230" fontFamily="Arial, sans-serif" fontSize="4" fill="#FFF">SIEMENS</text>
    <text x="725" y="208" fontFamily="'Arial Black', sans-serif" fontSize="14" fill="#FFF">HONDA</text>
    <text x="725" y="218" fontFamily="Arial, sans-serif" fontSize="6" fill="#FFF" letterSpacing="0.2">The power of dreams</text>
    <text x="770" y="175" fontFamily="'Arial Black', Impact, sans-serif" fontSize="28" fill="#DE0A2A" stroke="#FFF" strokeWidth="1.5" fontStyle="italic">33</text>

    {/* HALO & COCKPIT */}
    <circle cx="505" cy="165" r="9" fill="#111"/>
    <path d="M 500 162 L 512 165 L 510 170 L 498 167 Z" fill="#FFD600"/>
    <path d="M 445 180 C 450 165, 470 155, 520 160" stroke="#181a24" strokeWidth="7" fill="none" strokeLinecap="round"/>
    <path d="M 445 180 C 450 165, 470 155, 520 160" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <line x1="485" y1="156" x2="495" y2="180" stroke="#181a24" strokeWidth="6"/>

    {/* FRONT WING */}
    <path d="M 80 245 L 150 240 L 150 255 L 80 260 Z" fill="url(#carbon)"/>
    <path d="M 110 235 C 130 235, 150 240, 160 245 L 160 255 C 140 250, 120 245, 110 245 Z" fill="#181a24"/>
    <rect x="85" y="235" width="55" height="22" rx="2" fill="#111"/>
    <text x="112" y="250" fontFamily="'Arial Black', sans-serif" fontSize="11" fill="#FFF" textAnchor="middle">Mobil 1</text>
    <path d="M 140 230 C 150 230, 160 235, 165 240 L 160 245 C 150 240, 140 235, 135 235 Z" fill="#111"/>
    <path d="M 130 225 C 140 225, 150 230, 155 235 L 150 240 C 140 235, 130 230, 125 230 Z" fill="#1a1c26"/>

    {/* SUSPENSION FRONT */}
    <line x1="260" y1="245" x2="330" y2="200" stroke="#111" strokeWidth="4"/>
    <line x1="260" y1="245" x2="360" y2="220" stroke="#111" strokeWidth="3.5"/>
    <line x1="260" y1="245" x2="230" y2="215" stroke="#111" strokeWidth="4"/>

    {/* REAR WHEEL */}
    <g transform="translate(830, 240)">
      <circle cx="0" cy="0" r="48" fill="url(#tyre)"/>
      <circle cx="0" cy="0" r="34" fill="#111" stroke="#222" strokeWidth="3"/>
      <circle cx="0" cy="0" r="28" fill="#181a24"/>
      <circle cx="0" cy="0" r="16" fill="#111"/>
      <circle cx="0" cy="0" r="6" fill="#DE0A2A"/>
      <circle cx="0" cy="0" r="41" fill="none" stroke="#FFF" strokeWidth="1.5"/>
    </g>

    {/* FRONT WHEEL */}
    <g transform="translate(260, 245)">
      <circle cx="0" cy="0" r="45" fill="url(#tyre)"/>
      <circle cx="0" cy="0" r="32" fill="#111" stroke="#222" strokeWidth="3"/>
      <circle cx="0" cy="0" r="26" fill="#181a24"/>
      <circle cx="0" cy="0" r="15" fill="#111"/>
      <circle cx="0" cy="0" r="5" fill="#DE0A2A"/>
      <circle cx="0" cy="0" r="38" fill="none" stroke="#FFF" strokeWidth="1.5"/>
    </g>
  </svg>
);

export const RoadmapSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const steps = [
    { title: "Sign Up", desc: "Create your free account in seconds.", icon: Users, color: "bg-blue-500" },
    { title: "Set Goals", desc: "Input your exam dates and target grades.", icon: Target, color: "bg-purple-500" },
    { title: "Get Plan", desc: "Receive your personalized AI study schedule.", icon: Calendar, color: "bg-green-500" },
    { title: "Start Learning", desc: "Follow the plan, take quizzes, and track progress.", icon: BookOpen, color: "bg-orange-500" },
    { title: "Ace Exam", desc: "Walk into your exam with confidence.", icon: Award, color: "bg-pink-500" }
  ];

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-75%"]);

  const pathWidth = 3500;
  const pathHeight = 400;
  const waveCount = 2.5;

  const getTrackY = (xPos: number) => {
    const startFlat = 400;
    const endFlat = pathWidth - 400;
    if (xPos <= startFlat || xPos >= endFlat) return 0;
    const activeWidth = endFlat - startFlat;
    const progress = (xPos - startFlat) / activeWidth;
    const windowFn = Math.pow(Math.sin(progress * Math.PI), 2);
    const wave = Math.sin(progress * Math.PI * 2 * waveCount);
    return wave * windowFn * (pathHeight / 2);
  };

  const points: string[] = [];
  for (let i = 0; i <= 200; i++) {
    const px = (i / 200) * pathWidth;
    points.push(`${px},${getTrackY(px)}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  const carX = useTransform(scrollYProgress, [0.1, 0.9], [0, pathWidth]);
  const carY = useTransform(carX, (val) => getTrackY(val));
  const carRotate = useTransform(carX, (val) => {
    const y1 = getTrackY(val);
    const y2 = getTrackY(val + 1);
    return Math.atan(y2 - y1) * (180 / Math.PI);
  });

  const startShutterY = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], ["0%", "-95%", "-95%", "0%"]);
  const endShutterY  = useTransform(scrollYProgress, [0.8, 0.85, 0.95, 1],  ["0%", "-95%", "-95%", "0%"]);

  const GARAGE_H = 180;

  const Garage = ({ shutterY, label, left }: any) => (
    <div className="absolute w-48 md:w-64 flex flex-col items-center"
      style={{ left, top: '50%', marginTop: -(GARAGE_H / 2), height: GARAGE_H }}>
      <div className="absolute -top-8 w-full text-center z-50">
        <div className="inline-block px-4 py-1 md:px-6 md:py-1.5 bg-gray-900 border border-blue-500/50 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.6)]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-black tracking-[0.2em] text-[10px] md:text-sm">{label}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gray-950 border-x-[10px] border-t-[10px] border-gray-800 rounded-t-3xl shadow-inner z-20 flex justify-between px-4 py-6">
        <div className="w-1.5 h-full bg-blue-500/20 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"/>
        <div className="w-1.5 h-full bg-purple-500/20 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"/>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-24 h-24 border-4 border-white rounded-full"/>
        </div>
      </div>
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden rounded-t-3xl border-x-[10px] border-t-[10px] border-transparent">
        <motion.div style={{ y: shutterY }} className="absolute top-0 w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 flex flex-col justify-evenly border-b-8 border-yellow-500 shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
          {[...Array(15)].map((_, i) => <div key={i} className="w-full h-0.5 bg-black/50"/>)}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
            <MindCraftLogo className="w-16 h-16 md:w-20 md:h-20 text-white"/>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <section ref={containerRef} id="roadmap" className="h-[400vh] relative bg-white dark:bg-gray-950">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="absolute top-6 left-0 right-0 z-20 text-center px-4 pointer-events-none">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
            className="inline-block mb-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs md:text-sm font-bold tracking-wide uppercase"
          >Your Journey</motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
            Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Success</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base px-4">
            Scroll down to travel through your learning roadmap.
          </p>
        </div>

        <motion.div style={{ x, willChange: "transform" }} className="flex items-center relative h-[600px] min-w-[4500px] pl-[10vw] mt-10 md:mt-0">
          {/* Road track */}
          <div className="absolute top-1/2 left-[10vw] -translate-y-1/2 w-[3500px] h-[500px] pointer-events-none">
            <svg className="w-full h-full overflow-visible" viewBox="0 -250 3500 500">
              {/* White kerb edges */}
              <path d={pathD} fill="none" stroke="#ffffff" strokeWidth="110"/>
              {/* Red kerb dashes */}
              <path d={pathD} fill="none" stroke="#ef4444" strokeWidth="110" strokeDasharray="30 30"/>
              {/* Dark asphalt road */}
              <path d={pathD} fill="none" stroke="#1e293b" strokeWidth="90"/>
              {/* White centre dash line */}
              <path d={pathD} fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="20 20" opacity="0.5"/>
            </svg>
          </div>

          <Garage shutterY={startShutterY} label="MINDCRAFT" left="calc(10vw - 96px)"/>
          <Garage shutterY={endShutterY}   label="MINDCRAFT" left={`calc(10vw + ${pathWidth}px - 96px)`}/>

          {/* Your Red Bull Car */}
          <motion.div
            className="absolute left-[10vw] top-1/2 z-30 origin-center pointer-events-none"
            style={{ x: carX, y: carY, rotate: carRotate, willChange: "transform", marginTop: -21, width: 120, height: 42 }}
          >
            {/* scaleX(-1) flips the car so it faces right (forward direction) */}
            <div style={{ transform: 'scaleX(-1)', width: '100%', height: '100%' }}>
              <F1CarSVG />
            </div>
          </motion.div>

          {steps.map((step, index) => {
            const stepX = 400 + (index * (pathWidth - 800) / (steps.length - 1));
            const pathY = getTrackY(stepX);
            const isEven = index % 2 === 0;
            return (
              <RoadmapStep key={index} step={step} index={index} stepX={stepX} pathY={pathY} isEven={isEven} offsetY={isEven ? -195 : 155} carX={carX}/>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
