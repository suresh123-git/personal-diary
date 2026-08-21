import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../app/store/useAuthStore';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { apiRequest } from '../../services/api.client';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setAuth(res.user, res.tokens.accessToken, res.tokens.refreshToken);

      if (!res.user.house || res.user.house === 'unassigned') {
        navigate('/house-selection');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <ParchmentCard dark className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-3xl">🔑</span>
            <h2 className="font-serif text-2xl font-bold text-gold-400">Alohomora — Log In</h2>
            <p className="text-xs font-serif text-parchment-300">
              Unlock your magical personal diary
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/80 border border-red-500/50 text-red-200 text-xs rounded font-sans">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-serif uppercase tracking-widest text-parchment-200 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 border border-gold-500/30 rounded text-parchment-100 focus:outline-none focus:border-gold-400 text-sm"
                placeholder="wizard@hogwarts.edu"
              />
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-widest text-parchment-200 mb-1">
                Spell Passcode
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 border border-gold-500/30 rounded text-parchment-100 focus:outline-none focus:border-gold-400 text-sm"
                placeholder="••••••••"
              />
            </div>

            <MagicalButton type="submit" variant="gold" size="lg" disabled={isLoading} className="w-full">
              {isLoading ? 'Unlocking...' : 'LUMOS — Enter'}
            </MagicalButton>
          </form>

          <div className="text-center text-xs text-parchment-300 pt-2 border-t border-gold-500/20">
            Don't have a diary yet?{' '}
            <Link to="/register" className="text-gold-400 hover:underline font-bold">
              Create Account
            </Link>
          </div>
        </ParchmentCard>
      </motion.div>
    </div>
  );
};
