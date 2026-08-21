import React from 'react';
import { motion } from 'framer-motion';

interface ParchmentCardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const ParchmentCard: React.FC<ParchmentCardProps> = ({
  children,
  className = '',
  dark = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-lg p-6 relative overflow-hidden transition-all ${
        dark ? 'parchment-dark-bg text-parchment-100 border border-gold-500/20' : 'parchment-bg text-parchment-900 border border-parchment-700/30'
      } ${className}`}
    >
      {/* Decorative Antique Gold Corner Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold-500/40" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold-500/40" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold-500/40" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold-500/40" />

      {children}
    </motion.div>
  );
};
