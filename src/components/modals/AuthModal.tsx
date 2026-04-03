import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { MindCraftLogo } from '../ui/Logo';
import { auth, provider, db } from "../../firebase.ts";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const AuthModal = ({ isOpen, onClose, onAuth }: any) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    } else {
      // Reset state when closed
      setShowEmailForm(false);
      setIsLogin(true);
      setEmail('');
      setPassword('');
      setName('');
      setMobile('');
      setError('');
    }
  }, [isOpen]);

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        name: result.user.displayName,
        lastLogin: new Date().toISOString()
      }, { merge: true });

      onAuth({
        method: "google",
        name: result.user.displayName || "Google User",
        email: result.user.email,
        uid: result.user.uid,
      });
      onClose();
    } catch (error: any) {
      console.error("Firebase Error:", error);
      setError(error.message || "Failed to sign in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        onAuth({
          method: "email",
          email: result.user.email,
          uid: result.user.uid,
          name: result.user.displayName || email.split('@')[0], 
        });
        onClose();
      } else {
        if (!name.trim() || !mobile.trim()) {
           setError("Name and Mobile number are required.");
           setIsLoading(false);
           return;
        }
        
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // Create user doc
        await setDoc(doc(db, "users", result.user.uid), {
          email,
          name,
          mobile,
          createdAt: new Date().toISOString()
        });

        onAuth({
          method: "email",
          email: result.user.email,
          uid: result.user.uid,
          name: name,
        });
        onClose();
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white dark:bg-gray-900 w-full max-w-md p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 mx-4 max-h-[90vh] overflow-y-auto overflow-x-hidden"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <MindCraftLogo className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4" />
          <h2 id="auth-modal-title" className="text-xl md:text-2xl font-bold">
            {showEmailForm ? (isLogin ? 'Welcome Back' : 'Create Account') : 'Welcome to MindCraft'}
          </h2>
          <p className="text-gray-500 text-xs md:text-sm mt-2">
             Sign in to sync your progress across devices.
          </p>
        </div>

        {error && (
           <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
              {error}
           </div>
        )}

        {!showEmailForm ? (
          <div className="space-y-4">
            <button
              onClick={loginWithGoogle}
              disabled={isLoading}
              className="w-full py-3 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base disabled:opacity-50"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>

            <button
              onClick={() => setShowEmailForm(true)}
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none text-sm md:text-base disabled:opacity-50"
            >
              Continue with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailAuth} className="space-y-4">
             {!isLogin && (
               <>
                 <div className="space-y-1">
                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                   <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                       <User size={18} />
                     </div>
                     <input
                       type="text"
                       required
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                       placeholder="John Doe"
                     />
                   </div>
                 </div>
                 <div className="space-y-1">
                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
                   <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                       <Phone size={18} />
                     </div>
                     <input
                       type="tel"
                       required
                       value={mobile}
                       onChange={(e) => setMobile(e.target.value)}
                       className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                       placeholder="+1 (555) 000-0000"
                     />
                   </div>
                 </div>
               </>
             )}
             
             <div className="space-y-1">
               <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                   <Mail size={18} />
                 </div>
                 <input
                   type="email"
                   required
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                   placeholder="you@example.com"
                 />
               </div>
             </div>

             <div className="space-y-1">
               <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                   <Lock size={18} />
                 </div>
                 <input
                   type="password"
                   required
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                   placeholder="••••••••"
                 />
               </div>
             </div>

             <button
               type="submit"
               disabled={isLoading}
               className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none text-sm md:text-base disabled:opacity-50 mt-4"
             >
               {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
             </button>

             <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setError(''); }}
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline focus:outline-none"
                >
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </button>
             </div>
             
             <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="text-gray-500 text-xs hover:underline focus:outline-none"
                >
                  Back to options
                </button>
             </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
