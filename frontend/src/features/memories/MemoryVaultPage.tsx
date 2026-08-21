import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { apiRequest } from '../../services/api.client';
import { Archive, Star, Image, Calendar, Grid, List } from 'lucide-react';

export const MemoryVaultPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiRequest('/diary?isFavorite=true&limit=20')
      .then((res) => {
        const items = Array.isArray(res) ? res : res?.items || res?.data || [];
        setFavorites(items);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gold-500/20">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gold-400 flex items-center gap-2">
            <Archive className="w-6 h-6 text-gold-500" />
            The Memory Vault
          </h1>
          <p className="font-serif italic text-parchment-300 text-xs mt-1">
            Your collection of milestone events, starred memories, and photo moments
          </p>
        </div>

        <div className="flex items-center gap-1 bg-black/40 border border-gold-500/30 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'grid' ? 'bg-gold-500/20 text-gold-400' : 'text-parchment-300'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'timeline' ? 'bg-gold-500/20 text-gold-400' : 'text-parchment-300'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 font-serif text-gold-400 animate-pulse">
          ✨ Opening Memory Vault...
        </div>
      ) : favorites.length === 0 ? (
        <ParchmentCard dark className="text-center py-12">
          <Star className="w-8 h-8 text-gold-400 mx-auto mb-2" />
          <h3 className="font-serif text-lg font-bold text-gold-400 mb-1">Vault Empty</h3>
          <p className="font-serif italic text-xs text-parchment-300 max-w-sm mx-auto">
            Star your favorite diary entries to preserve them inside your permanent Memory Vault.
          </p>
        </ParchmentCard>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((item) => (
            <Link key={item._id} to={`/diary/${item._id}`}>
              <ParchmentCard dark className="h-full hover:border-gold-400/60 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gold-400 font-serif mb-2">
                    <span>{item.date}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <h3 className="font-serif font-bold text-parchment-100 text-base line-clamp-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-parchment-200/80 line-clamp-3">
                    {item.plainTextContent || 'Vault memory content...'}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-gold-500/10 text-[10px] font-serif uppercase tracking-widest text-parchment-300 flex items-center justify-between">
                  <span>Mood: {item.mood}</span>
                  <span>View Memory →</span>
                </div>
              </ParchmentCard>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4 relative border-l-2 border-gold-500/30 ml-4 pl-6">
          {favorites.map((item) => (
            <div key={item._id} className="relative">
              <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-gold-400 border-2 border-background shadow-glow" />
              <Link to={`/diary/${item._id}`}>
                <ParchmentCard dark className="hover:border-gold-400/60 transition-all">
                  <div className="flex items-center justify-between text-xs text-gold-400 font-serif mb-1">
                    <span>{item.date}</span>
                    <span className="bg-black/40 px-2 py-0.5 rounded">{item.mood}</span>
                  </div>
                  <h3 className="font-serif font-bold text-parchment-100 text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-parchment-200 line-clamp-2">
                    {item.plainTextContent}
                  </p>
                </ParchmentCard>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
