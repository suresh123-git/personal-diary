import React from 'react';
import { motion } from 'framer-motion';

interface MagicalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'house' | 'ghost' | 'spell';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const MagicalButton: React.FC<MagicalButtonProps> = ({
  variant = 'gold',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs tracking-wider',
    md: 'px-5 py-2.5 text-sm tracking-widest',
    lg: 'px-8 py-3.5 text-base tracking-widest font-semibold',
  };

  const variantClasses = {
    gold: 'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-parchment-900 border border-gold-400/50 shadow-magical hover:brightness-110',
    house: 'bg-house-primary text-parchment-50 border border-gold-500/40 shadow-magical hover:brightness-110',
    ghost: 'bg-transparent text-parchment-200 border border-parchment-700/50 hover:border-gold-500/70 hover:text-gold-400',
    spell: 'bg-gradient-to-r from-purple-900 via-indigo-950 to-purple-900 text-gold-400 border border-purple-500/40 shadow-glow hover:shadow-magical',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      disabled={disabled}
      className={`font-serif rounded-md flex items-center justify-center gap-2 uppercase transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...(props as any)}
    >
      <span className="sparkle-spark">✨</span>
      {children}
    </motion.button>
  );
};
