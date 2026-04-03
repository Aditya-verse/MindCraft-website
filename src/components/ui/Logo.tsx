import React, { useId } from 'react';
import { motion } from 'framer-motion';

export const MindCraftLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  const uniqueId = useId();
  const gradId = `logoGrad-${uniqueId.replace(/:/g, '')}`;

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="MindCraft Logo">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <motion.circle
        cx={50} cy={50} r={45}
        stroke={`url(#${gradId})`}
        strokeWidth={8}
        initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
        animate={{ pathLength: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.path
        d="M35 50 L48 63 L68 38"
        stroke={`url(#${gradId})`}
        strokeWidth={8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />
    </svg>
  );
};
