import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Star, Menu, Download, Shield, Sparkles, Send } from 'lucide-react';

export const AIDemoSection = () => {
  const [messages, setMessages] = useState<any[]>([
    { id: 'init', role: 'ai', text: "Hi! I'm MindBot. 🤖\n\nWhat exam are you preparing for today? I can help you create a study plan, explain complex topics, or generate practice questions!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent, text?: string) => {
    if (e) e.preventDefault();
    const msgText = text || inputValue;
    if (!msgText.trim()) return;

    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random().toString(36).substr(2, 9), role: 'user', text: msgText }]);
    setInputValue("");
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let aiResponseText = "";
    let isPromo = false;
    
    const lowerText = msgText.toLowerCase();
    
    if (lowerText.includes('upload') || lowerText.includes('scan') || lowerText.includes('voice') || lowerText.includes('plan') || lowerText.includes('schedule')) {
      aiResponseText = "I'd love to help you with that! However, this demo is limited. To get detailed answers, personalized study plans, and advanced AI tutoring for this topic, please download the full MindCraft app.";
      isPromo = true;
    } else if (lowerText.includes('quantum')) {
      aiResponseText = "Quantum Entanglement describes how two particles become linked, such that the state of one instantly influences the other, no matter the distance. Einstein called it 'spooky action at a distance'. \n\nI can generate a visual simulation of this concept for you. Download the app to see it in action!";
      isPromo = true;
    } else if (lowerText.includes('gatsby')) {
      aiResponseText = "The Great Gatsby explores themes of decadence, idealism, and the American Dream. Gatsby's love for Daisy is a symbol of his desire for the unattainable past. \n\nWant a full character map or chapter summaries? The full app has comprehensive literary guides.";
      isPromo = true;
    } else if (lowerText.includes('calculus') || lowerText.includes('derivative') || lowerText.includes('solve')) {
      aiResponseText = "A derivative represents the rate at which a function changes at any given point. Geometrically, it's the slope of the tangent line. \n\nFor example, the derivative of x² is 2x. \n\nNeed to solve complex problems? Snap a photo in the app for step-by-step solutions!";
      isPromo = true;
    } else if (lowerText.includes('powerhouse') || lowerText.includes('cell')) {
      aiResponseText = "The mitochondria is the powerhouse of the cell! ⚡\n\nIt generates most of the chemical energy needed to power the cell's biochemical reactions. Want to see a 3D model of a cell? Check out the full app!";
      isPromo = true;
    } else {
      aiResponseText = "That's a great question! I can help you break it down, create a study schedule for it, or generate a quiz. Download the full app to unlock my full potential!";
      isPromo = true;
    }

    setMessages(prev => [...prev, { 
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9) + '-ai',
      role: 'ai', 
      text: aiResponseText,
      isPromo: isPromo 
    }]);
    setIsTyping(false);
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs md:text-sm font-bold mb-4 md:mb-6">
              <Bot size={16} /> <span>AI Tutor Demo</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Experience the <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Future of Learning</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-base md:text-xl text-gray-600 dark:text-gray-400 mb-8 md:mb-10 leading-relaxed">
              Our AI doesn't just give answers. It teaches you *how* to answer.
              Interactive, personalized, and always available.
            </motion.p>
            
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
               <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Try asking:</p>
               <div className="flex flex-wrap gap-2 md:gap-3">
                 {['Explain Quantum Entanglement', 'Summarize The Great Gatsby', 'Calculus Derivatives'].map((q, i) => (
                   <motion.button 
                     key={q} 
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.2 + (i * 0.1) }}
                     onClick={() => handleSendMessage(undefined, q)} 
                     className="px-4 py-2.5 md:px-5 md:py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs md:text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-left shadow-sm hover:shadow-md"
                   >
                     {q}
                   </motion.button>
                 ))}
               </div>
            </div>

            <div className="flex gap-4 md:gap-6 items-center">
               <div className="flex -space-x-3 md:-space-x-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-white dark:border-gray-950 bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-xs overflow-hidden shadow-sm">
                     <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                   </div>
                 ))}
               </div>
               <div className="flex flex-col justify-center">
                 <div className="flex items-center gap-1 text-yellow-500 mb-0.5">
                   <Star size={14} className="md:w-4 md:h-4" fill="currentColor" />
                   <Star size={14} className="md:w-4 md:h-4" fill="currentColor" />
                   <Star size={14} className="md:w-4 md:h-4" fill="currentColor" />
                   <Star size={14} className="md:w-4 md:h-4" fill="currentColor" />
                   <Star size={14} className="md:w-4 md:h-4" fill="currentColor" />
                 </div>
                 <span className="font-bold text-sm md:text-base text-gray-900 dark:text-white">10,000+ Students</span>
               </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[2rem] md:rounded-[2.5rem] blur-2xl transform rotate-3"></div>
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 h-[450px] md:h-[500px] flex flex-col relative overflow-hidden z-10 w-full sm:w-[95%] mx-auto">
               {/* Chat Header */}
               <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-20">
                 <div className="flex items-center gap-2 md:gap-3">
                   <div className="relative">
                     <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                       <Bot size={18} className="md:w-5 md:h-5" />
                     </div>
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                   </div>
                   <div>
                     <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-white">MindBot</h3>
                     <p className="text-[10px] md:text-xs text-blue-500 font-medium">Online • AI Tutor</p>
                   </div>
                 </div>
                 <button className="p-1.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                   <Menu size={18} className="md:w-5 md:h-5 text-gray-500" />
                 </button>
               </div>
               
               {/* Chat Messages */}
               <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                 <AnimatePresence initial={false}>
                   {messages.map((msg: any) => (
                     <motion.div
                       key={msg.id}
                       initial={{ opacity: 0, scale: 0.9, y: 10 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       transition={{ type: "spring", damping: 25, stiffness: 300 }}
                       className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                     >
                       <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                         <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm text-xs md:text-sm leading-relaxed ${
                           msg.role === 'user' 
                             ? 'bg-blue-600 text-white rounded-br-none' 
                             : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700'
                         }`}>
                           <div className="whitespace-pre-wrap">{msg.text}</div>
                           
                           {msg.isPromo && (
                             <motion.div 
                               initial={{ opacity: 0, height: 0 }}
                               animate={{ opacity: 1, height: 'auto' }}
                               transition={{ delay: 0.5 }}
                               className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-100 dark:border-gray-700"
                             >
                               <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                                 <Download size={14} className="md:w-4 md:h-4" /> Download Full App
                               </button>
                               <p className="text-[10px] md:text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                                 <Shield size={10} className="md:w-3 md:h-3" /> Verified by MindCraft
                               </p>
                             </motion.div>
                           )}
                         </div>
                         <div className={`text-[9px] md:text-[10px] text-gray-400 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                           {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </div>
                       </div>
                       
                       {/* Avatars */}
                       <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-auto ${msg.role === 'user' ? 'ml-1.5 md:ml-2 order-2 bg-gray-200 overflow-hidden' : 'mr-1.5 md:mr-2 order-1 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md'}`}>
                         {msg.role === 'user' ? (
                           <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-full h-full object-cover" />
                         ) : (
                           <Bot size={12} className="md:w-[14px] md:h-[14px]" />
                         )}
                       </div>
                     </motion.div>
                   ))}
                   {isTyping && (
                     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key="typing-indicator" className="flex justify-start items-end">
                       <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md mr-1.5 md:mr-2 flex-shrink-0">
                         <Bot size={12} className="md:w-[14px] md:h-[14px]" />
                       </div>
                       <div className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl md:rounded-2xl rounded-bl-none shadow-sm flex gap-1 md:gap-1.5 border border-gray-200 dark:border-gray-700">
                         <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce"></span>
                         <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                         <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>

               {/* Input Area */}
               <div className="p-3 md:p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                 <form onSubmit={(e) => handleSendMessage(e)} className="relative flex items-center gap-2">
                   <button type="button" className="p-2 md:p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg md:rounded-xl transition-colors">
                     <Sparkles size={18} className="md:w-5 md:h-5" />
                   </button>
                   <input 
                     type="text" 
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     placeholder="Ask anything..."
                     className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-lg md:rounded-xl py-2.5 md:py-3 px-3 md:px-4 focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-white placeholder-gray-400 transition-all text-sm md:text-base"
                   />
                   <button 
                     type="submit"
                     disabled={!inputValue.trim()}
                     className="p-2 md:p-3 bg-blue-600 text-white rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                   >
                     <Send size={18} className="md:w-5 md:h-5" />
                   </button>
                 </form>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
