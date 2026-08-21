import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore, HouseType } from '../../app/store/useAuthStore';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { apiRequest } from '../../services/api.client';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [house, setHouseSelection] = useState<HouseType>('unassigned');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, house }),
      });

      setAuth(res.user, res.tokens.accessToken, res.tokens.refreshToken);

      if (house === 'unassigned') {
        navigate('/house-selection');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
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
            <span className="text-3xl">🪶</span>
            <h2 className="font-serif text-2xl font-bold text-gold-400">Create Magical Diary</h2>
            <p className="text-xs font-serif text-parchment-300">
              Begin your enchanted journal journey
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
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 border border-gold-500/30 rounded text-parchment-100 focus:outline-none focus:border-gold-400 text-sm"
                placeholder="Harry Potter"
              />
            </div>

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
                placeholder="harry@hogwarts.edu"
              />
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-widest text-parchment-200 mb-1">
                Spell Passcode (Min 8 characters)
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 border border-gold-500/30 rounded text-parchment-100 focus:outline-none focus:border-gold-400 text-sm"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-widest text-parchment-200 mb-1">
                Hogwarts House (Optional)
              </label>
              <select
                value={house}
                onChange={(e) => setHouseSelection(e.target.value as HouseType)}
                className="w-full px-4 py-2.5 bg-stone-900 border border-gold-500/30 rounded text-parchment-100 focus:outline-none focus:border-gold-400 text-sm"
              >
                <option value="unassigned">🧙 Let the Sorting Hat Decide Later</option>
                <option value="gryffindor">🦁 Gryffindor</option>
                <option value="slytherin">🐍 Slytherin</option>
                <option value="ravenclaw">🦅 Ravenclaw</option>
                <option value="hufflepuff">🦡 Hufflepuff</option>
              </select>
            </div>

            <MagicalButton type="submit" variant="gold" size="lg" disabled={isLoading} className="w-full">
              {isLoading ? 'Creating...' : 'Open Your Diary'}
            </MagicalButton>
          </form>

          <div className="text-center text-xs text-parchment-300 pt-2 border-t border-gold-500/20">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-400 hover:underline font-bold">
              Log In
            </Link>
          </div>
        </ParchmentCard>
      </motion.div>
    </div>
  );
};
