import React from 'react';

interface HouseBadgeProps {
  house: 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff' | 'unassigned' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const HouseBadge: React.FC<HouseBadgeProps> = ({ house, size = 'md' }) => {
  const houseData: Record<string, { label: string; icon: string; style: string }> = {
    gryffindor: {
      label: 'Gryffindor',
      icon: '🦁',
      style: 'bg-red-950/80 text-amber-300 border-amber-500/50',
    },
    slytherin: {
      label: 'Slytherin',
      icon: '🐍',
      style: 'bg-emerald-950/80 text-emerald-200 border-emerald-500/50',
    },
    ravenclaw: {
      label: 'Ravenclaw',
      icon: '🦅',
      style: 'bg-blue-950/80 text-blue-200 border-amber-600/50',
    },
    hufflepuff: {
      label: 'Hufflepuff',
      icon: '🦡',
      style: 'bg-amber-950/80 text-yellow-300 border-stone-600/50',
    },
    unassigned: {
      label: 'Unsorted',
      icon: '🪄',
      style: 'bg-stone-900 text-stone-300 border-stone-700',
    },
  };

  const current = houseData[house.toLowerCase()] || houseData.unassigned;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs font-semibold',
    lg: 'px-4 py-1.5 text-sm font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-serif uppercase tracking-widest rounded-full border shadow-sm ${sizeClasses[size]} ${current.style}`}
    >
      <span>{current.icon}</span>
      <span>{current.label}</span>
    </span>
  );
};
