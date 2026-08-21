import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../app/store/useAuthStore';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { CandleDecoration } from '../../components/magical/CandleDecoration';
import { MagicalParticles } from '../../components/magical/MagicalParticles';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#050814] via-[#090D1F] to-[#120B1A] text-center overflow-hidden">
      <MagicalParticles />

      {/* Floating Hogwarts Candle Decorations */}
      <div className="absolute top-12 left-8 md:left-24">
        <CandleDecoration size="md" />
      </div>
      <div className="absolute top-20 right-8 md:right-28">
        <CandleDecoration size="lg" />
      </div>
      <div className="absolute bottom-24 left-16 hidden md:block">
        <CandleDecoration size="sm" />
      </div>

      {/* Hogwarts Castle Silhouette Background Glow */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl mx-auto space-y-6"
      >
        <div className="inline-block p-4 rounded-full bg-gold-500/10 border border-gold-500/30 shadow-magical mb-2">
          <span className="text-4xl">🪶</span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-parchment-100 via-gold-400 to-parchment-200 tracking-wider">
          {user?.name ? `${user.name}'s` : 'Harry Potter'}
        </h1>
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-gold-400 tracking-widest uppercase -mt-3">
          Personal Diary
        </h2>

        <p className="font-serif italic text-lg md:text-xl text-parchment-200/90 max-w-md mx-auto">
          "Your memories. Your thoughts. Your magic."
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagicalButton
            size="lg"
            variant="gold"
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto"
          >
            LUMOS — Open Your Diary
          </MagicalButton>

          <Link to="/register" className="w-full sm:w-auto">
            <MagicalButton size="lg" variant="ghost" className="w-full sm:w-auto">
              Create Account
            </MagicalButton>
          </Link>
        </div>

        <p className="text-xs font-serif text-parchment-300/60 pt-6">
          🔒 Private & Confidential Personal Journal — Alohomora Protected
        </p>
      </motion.div>
    </div>
  );
};
