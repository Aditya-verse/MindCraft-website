import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

export const FeatureModal = ({ feature, onClose }: any) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feature) {
      modalRef.current?.focus();
    }
  }, [feature]);

  if (!feature) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true" aria-labelledby="feature-modal-title">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div 
        ref={modalRef}
        tabIndex={-1}
        layoutId={`feature-${feature.title}`} 
        className="relative bg-white dark:bg-gray-900 w-full max-w-2xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800"
      >
         <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full z-10 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Close details"><X size={20}/></button>
         <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${feature.color} ${feature.bg} flex items-center justify-center mb-4 md:mb-6`}>
           <feature.icon size={24} className="md:w-8 md:h-8" aria-hidden="true" />
         </div>
         <h2 id="feature-modal-title" className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{feature.title}</h2>
         <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">{feature.longDesc || feature.desc}</p>
         
         {feature.keyFunctionalities && (
           <div className="mb-6 md:mb-8">
             <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">Key Functionalities</h3>
             <ul className="space-y-2 md:space-y-3">
               {feature.keyFunctionalities.map((func: string, idx: number) => (
                 <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                   <ArrowRight size={18} className={`mt-0.5 shrink-0 ${feature.color}`} />
                   <span>{func}</span>
                 </li>
               ))}
             </ul>
           </div>
         )}
         
         {feature.benefits && (
           <div>
             <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">Benefits</h3>
             <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
               {feature.benefits.map((benefit: string, idx: number) => (
                 <div key={idx} className="p-3 md:p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                   <div className="font-bold mb-1.5 md:mb-2 flex items-center gap-2 text-sm md:text-base text-gray-900 dark:text-white">
                     <CheckCircle size={16} className="text-green-500 shrink-0"/> Benefit {idx + 1}
                   </div>
                   <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{benefit}</p>
                 </div>
               ))}
             </div>
           </div>
         )}
      </motion.div>
    </div>
  );
};
