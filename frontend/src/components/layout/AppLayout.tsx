import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { MagicalParticles } from '../magical/MagicalParticles';
import { BookOpen, Sparkles, Calendar, Archive, User } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  const mobileNavItems = [
    { label: 'Diary', path: '/diary', icon: BookOpen },
    { label: 'Pensieve', path: '/pensieve', icon: Sparkles },
    { label: 'Calendar', path: '/calendar', icon: Calendar },
    { label: 'Vault', path: '/memories', icon: Archive },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col relative bg-background">
      <MagicalParticles />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 relative z-10 pb-20 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-gold-500/20 px-2 py-2 flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-1 text-[10px] font-serif uppercase tracking-wider ${
                isActive ? 'text-gold-400 font-bold' : 'text-parchment-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
