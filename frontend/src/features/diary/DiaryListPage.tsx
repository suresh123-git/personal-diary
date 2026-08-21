import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { apiRequest } from '../../services/api.client';
import { Search, Plus, Star, Lock, Filter, Tag } from 'lucide-react';

export const DiaryListPage: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, [search, selectedTag, selectedMood, onlyFavorites, page]);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.set('page', page.toString());
      queryParams.set('limit', '8');
      if (search) queryParams.set('search', search);
      if (selectedTag) queryParams.set('tag', selectedTag);
      if (selectedMood) queryParams.set('mood', selectedMood);
      if (onlyFavorites) queryParams.set('isFavorite', 'true');

      const res = await apiRequest(`/diary?${queryParams.toString()}`);
      const items = Array.isArray(res) ? res : res?.items || res?.data || [];
      setEntries(items);
      setTotalPages(res?.meta?.pages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-gold-500/20">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gold-400">Search the Archives</h1>
          <p className="font-serif italic text-parchment-300 text-xs mt-1">
            Explore your historic diary entries and memories
          </p>
        </div>

        <Link to="/diary/new">
          <MagicalButton variant="gold" size="md">
            <Plus className="w-4 h-4" /> Begin New Entry
          </MagicalButton>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <ParchmentCard dark className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gold-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Accio — Search title, content, or tags..."
              className="w-full bg-black/40 border border-gold-500/30 rounded pl-9 pr-3 py-2 text-xs font-sans text-parchment-100 placeholder:text-parchment-700 focus:outline-none focus:border-gold-400"
            />
          </div>

          {/* Mood Filter */}
          <select
            value={selectedMood}
            onChange={(e) => {
              setSelectedMood(e.target.value);
              setPage(1);
            }}
            className="bg-stone-900 border border-gold-500/30 rounded px-3 py-2 text-xs font-sans text-parchment-200"
          >
            <option value="">All Moods</option>
            <option value="Ecstatic">🤩 Ecstatic</option>
            <option value="Happy">😊 Happy</option>
            <option value="Calm">😌 Calm</option>
            <option value="Neutral">😐 Neutral</option>
            <option value="Sad">😔 Sad</option>
            <option value="Anxious">😰 Anxious</option>
          </select>

          {/* Favorites Only Toggle */}
          <button
            onClick={() => {
              setOnlyFavorites(!onlyFavorites);
              setPage(1);
            }}
            className={`px-3 py-2 rounded border text-xs font-serif flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
              onlyFavorites
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                : 'bg-black/30 border-stone-800 text-parchment-300 hover:border-stone-600'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
            Favorites Only
          </button>
        </div>
      </ParchmentCard>

      {/* Entry Grid */}
      {isLoading ? (
        <div className="text-center py-12 font-serif text-gold-400 animate-pulse">
          ✨ Searching Hogwarts Archives...
        </div>
      ) : entries.length === 0 ? (
        <ParchmentCard dark className="text-center py-12">
          <span className="text-4xl block mb-2">📜</span>
          <h3 className="font-serif text-lg font-bold text-gold-400 mb-1">No Entries Found</h3>
          <p className="font-serif italic text-xs text-parchment-300 max-w-sm mx-auto">
            No memories match your query. Try clearing filters or write a new entry!
          </p>
        </ParchmentCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <Link key={entry._id} to={`/diary/${entry._id}`}>
              <ParchmentCard dark className="h-full hover:border-gold-400/60 transition-all group">
                <div className="flex items-center justify-between text-xs text-parchment-300 mb-2">
                  <span className="font-serif text-gold-400">{entry.date}</span>
                  <div className="flex items-center gap-2">
                    {entry.isFavorite && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                    {entry.isPrivate && <Lock className="w-3.5 h-3.5 text-purple-400" />}
                    <span className="bg-black/40 px-2 py-0.5 rounded text-[10px]">{entry.mood}</span>
                  </div>
                </div>

                <h3 className="font-serif font-bold text-lg text-parchment-100 group-hover:text-gold-400 transition-colors line-clamp-1 mb-2">
                  {entry.title}
                </h3>

                <p className="text-xs font-sans text-parchment-200/80 line-clamp-3 mb-3">
                  {entry.plainTextContent || 'Enchanted entry content...'}
                </p>

                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-gold-500/10">
                    {entry.tags.map((t: string) => (
                      <span key={t} className="text-[10px] font-sans text-parchment-300 bg-white/5 px-2 py-0.5 rounded flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5 text-gold-500" />
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </ParchmentCard>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1.5 rounded bg-black/40 border border-gold-500/30 text-xs font-serif text-parchment-200 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="font-serif text-xs text-parchment-300">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1.5 rounded bg-black/40 border border-gold-500/30 text-xs font-serif text-parchment-200 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
