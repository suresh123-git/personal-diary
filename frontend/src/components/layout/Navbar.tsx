import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../app/store/useAuthStore';
import { useAudioStore } from '../../app/store/useAudioStore';
import { HouseBadge } from '../magical/HouseBadge';
import { AmbienceSelector } from '../magical/AmbienceSelector';
import { DailyRitualModal } from '../../features/diary/DailyRitualModal';
import { BookOpen, Sparkles, Calendar, Archive, User, Lock, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { isPlaying, togglePlay, track } = useAudioStore();
  const [isRitualOpen, setIsRitualOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: BookOpen },
    { label: 'Diary', path: '/diary', icon: BookOpen },
    { label: 'Pensieve', path: '/pensieve', icon: Sparkles },
    { label: 'Calendar', path: '/calendar', icon: Calendar },
    { label: 'Vault', path: '/memories', icon: Archive },
    { label: 'Chamber', path: '/chamber', icon: Lock },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-gold-500/20 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 group shrink-0">
          <span className="text-2xl group-hover:rotate-12 transition-transform">🪶</span>
          <div className="flex flex-col justify-center leading-tight whitespace-nowrap">
            <h1 className="font-serif text-sm sm:text-base font-bold text-gold-400 tracking-wider leading-none">
              {user?.name ? `${user.name}'s` : 'Harry Potter'}
            </h1>
            <p className="text-[9px] sm:text-[10px] font-serif text-parchment-300 uppercase tracking-widest leading-none mt-1">
              Personal Diary
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-serif uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40 shadow-sm'
                    : 'text-parchment-200 hover:text-gold-400 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User House & Audio Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Audio Ambience Soundscape Menu */}
          <AmbienceSelector />

          {/* Daily Ritual Button */}
          <button
            onClick={() => setIsRitualOpen(true)}
            title="Launch Daily Reflection Ritual"
            className="px-2.5 py-1.5 rounded-md text-xs font-serif bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20 flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ritual</span>
          </button>

          {user && <HouseBadge house={user.house} size="sm" />}
          
          <button
            onClick={handleLogout}
            title="Log Out (Nox)"
            className="p-1.5 rounded-md text-parchment-300 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <DailyRitualModal isOpen={isRitualOpen} onClose={() => setIsRitualOpen(false)} />
      </div>
    </header>
  );
};
