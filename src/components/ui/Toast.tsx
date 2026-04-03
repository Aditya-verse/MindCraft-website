import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Check } from 'lucide-react';

export const useToast = () => {
  const [toast, setToast] = useState<{ isVisible: boolean; type: 'success' | 'loading' | 'info' | 'error'; message: string; progress: number; }>({ isVisible: false, type: 'success', message: '', progress: 0 });
  const showToast = (message: string, type: 'success' | 'loading' | 'info' | 'error' = 'success') => { 
      setToast({ isVisible: true, type, message, progress: 0 }); 
      if (type !== 'loading') { setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 4000); } 
  };
  return { toast, showToast, setToast };
};

export const Toast = ({ isVisible, message, type, progress, onClose }: any) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          role="alert"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 dark:bg-gray-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px] w-11/12 max-w-sm md:w-auto"
        >
          <div className={`p-2 rounded-full ${type === 'loading' ? 'bg-blue-500/20 text-blue-400' : type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
            {type === 'loading' ? <Sparkles className="animate-spin" size={20}/> : type === 'error' ? <X size={20}/> : <Check size={20}/>}
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{message}</p>
            {type === 'loading' && (
              <div className="h-1 w-full bg-gray-800 rounded-full mt-2 overflow-hidden">
                <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
          <button onClick={onClose} aria-label="Close notification"><X size={16} className="opacity-50 hover:opacity-100"/></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
