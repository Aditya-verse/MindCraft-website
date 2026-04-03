import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MindCraftLogo } from '../ui/Logo';

export const OnboardingModal = ({ isOpen, onClose, onComplete }: any) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please fill in your name and email.');
      return;
    }
    onComplete(formData);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-8 text-white text-center">
          <MindCraftLogo className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-1">Join MindCraft</h2>
          <p className="text-blue-100 text-sm">Create your free account to get started.</p>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.name}
                onChange={e => { setFormData({ ...formData, name: e.target.value }); setError(''); }}
                className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                placeholder="e.g. Alex Johnson"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={formData.email}
                onChange={e => { setFormData({ ...formData, email: e.target.value }); setError(''); }}
                className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">Phone <span className="text-gray-400 font-normal text-xs">(optional)</span></label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-sm md:text-base"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20 text-base"
            >
              Create Free Account →
            </button>
          </form>
          <p className="text-center text-xs text-gray-500 mt-4">
            By signing up, you agree to our{' '}
            <button onClick={onClose} className="text-blue-600 hover:underline">Terms of Service</button>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
