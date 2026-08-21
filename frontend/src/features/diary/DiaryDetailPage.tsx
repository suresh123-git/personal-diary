import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { apiRequest } from '../../services/api.client';
import { Star, Lock, Edit3, Trash2, ArrowLeft, Calendar, MapPin, CloudSun, Tag } from 'lucide-react';

export const DiaryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [entry, setEntry] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      apiRequest(`/diary/${id}`)
        .then(setEntry)
        .catch((e) => console.error(e))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!id) return;
    try {
      const updated = await apiRequest(`/diary/${id}/favorite`, { method: 'POST' });
      setEntry(updated);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you wish to archive this diary memory?')) return;
    try {
      await apiRequest(`/diary/${id}`, { method: 'DELETE' });
      navigate('/diary');
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-16 font-serif text-gold-400 animate-pulse">
        ✨ Unrolling Enchanted Parchment...
      </div>
    );
  }

  if (!entry) {
    return (
      <ParchmentCard dark className="text-center py-12">
        <h3 className="font-serif text-xl font-bold text-red-400">Entry Not Found</h3>
        <p className="font-serif italic text-xs text-parchment-300 mt-2 mb-4">
          This diary entry may have been moved or archived.
        </p>
        <Link to="/diary">
          <MagicalButton variant="gold" size="sm">Back to Archives</MagicalButton>
        </Link>
      </ParchmentCard>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between pb-4 border-b border-gold-500/20">
        <button
          onClick={() => navigate('/diary')}
          className="flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-parchment-300 hover:text-gold-400 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Archives
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded border transition-colors ${
              entry.isFavorite
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-black/30 border-stone-800 text-parchment-300 hover:border-stone-600'
            }`}
            title="Toggle Favorite"
          >
            <Star className={`w-4 h-4 ${entry.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>

          <Link to={`/diary/${entry._id}/edit`}>
            <MagicalButton size="sm" variant="gold">
              <Edit3 className="w-3.5 h-3.5" /> Edit Page
            </MagicalButton>
          </Link>

          <button
            onClick={handleDelete}
            className="p-2 rounded bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/60 transition-colors cursor-pointer"
            title="Archive Entry"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Parchment View */}
      <div className="parchment-bg rounded-xl p-8 md:p-12 text-parchment-900 border-2 border-parchment-700/50 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Entry Title & Date Header */}
        <div className="border-b border-parchment-700/30 pb-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-serif italic text-parchment-700">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {entry.date}
            </span>
            <div className="flex items-center gap-3">
              {entry.mood && <span>Mood: <strong>{entry.mood}</strong></span>}
              {entry.isPrivate && <span className="flex items-center gap-1 text-purple-900 font-bold"><Lock className="w-3 h-3" /> Muffliato Protected</span>}
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-parchment-900">
            {entry.title}
          </h1>

          {(entry.location || entry.weather) && (
            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-parchment-700 pt-1">
              {entry.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gold-600" /> {entry.location}
                </span>
              )}
              {entry.weather && (
                <span className="flex items-center gap-1">
                  <CloudSun className="w-3 h-3 text-gold-600" /> {entry.weather}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Entry HTML Body */}
        <div
          className="prose max-w-none font-serif text-lg leading-relaxed text-parchment-900"
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />

        {/* Tags Footer */}
        {entry.tags && entry.tags.length > 0 && (
          <div className="pt-6 border-t border-parchment-700/30 flex flex-wrap gap-2">
            {entry.tags.map((tag: string) => (
              <span key={tag} className="text-xs font-sans bg-parchment-300/60 text-parchment-900 px-2.5 py-1 rounded flex items-center gap-1">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
