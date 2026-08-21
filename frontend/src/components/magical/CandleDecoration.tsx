import React from 'react';

interface CandleDecorationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CandleDecoration: React.FC<CandleDecorationProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightMap = {
    sm: 'h-16 w-4',
    md: 'h-24 w-6',
    lg: 'h-32 w-8',
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Candle Flame Flicker Effect */}
      <div className="relative mb-0.5">
        <div className="w-3 h-5 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full animate-flicker blur-[0.5px] shadow-[0_0_15px_#F59E0B]" />
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-2.5 bg-white rounded-full opacity-90 blur-[0.2px]" />
      </div>

      {/* Candle Body */}
      <div className={`bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 rounded-t-sm shadow-md border-x border-amber-400/30 ${heightMap[size]}`}>
        <div className="w-full h-2 bg-amber-200/60 rounded-t-sm" />
      </div>

      {/* Candle Wax Drips */}
      <div className="w-full h-1 bg-amber-300/80 rounded-b-full shadow-inner" />
    </div>
  );
};
