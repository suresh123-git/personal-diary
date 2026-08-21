import React, { useMemo } from 'react';

export const MagicalParticles: React.FC = () => {
  // Generate deterministic particles array to avoid hydration mismatches
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      top: `${(i * 37) % 95}%`,
      left: `${(i * 53) % 95}%`,
      size: `${(i % 3) + 2}px`,
      duration: `${(i % 4) + 3}s`,
      delay: `${(i % 3) * 0.8}s`,
      opacity: ((i % 5) + 3) / 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-gold-400 rounded-full animate-twinkle shadow-[0_0_8px_#F3C649]"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};
