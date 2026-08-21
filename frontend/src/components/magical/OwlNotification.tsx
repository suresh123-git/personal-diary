import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OwlNotificationProps {
  message: string | null;
  onClose?: () => void;
}

export const OwlNotification: React.FC<OwlNotificationProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed top-20 right-6 z-50 max-w-sm bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-200 p-4 rounded-lg border border-gold-500/50 shadow-magical flex items-start gap-3"
      >
        <span className="text-2xl select-none">🦉</span>
        <div className="flex-1">
          <p className="font-serif font-semibold text-xs text-gold-400 uppercase tracking-widest mb-1">
            Owl Post Notification
          </p>
          <p className="text-sm font-sans text-parchment-100">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-amber-400/60 hover:text-amber-200 text-xs uppercase"
          >
            ✕
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
