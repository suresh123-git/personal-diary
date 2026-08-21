import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuillEditor } from './QuillEditor';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { apiRequest } from '../../services/api.client';
import { useAudioStore } from '../../app/store/useAudioStore';
import { format } from 'date-fns';
import { Star, Lock, Tag, MapPin, CloudSun, Save, ArrowLeft, CheckCircle } from 'lucide-react';

export const DiaryEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setTrackByMood } = useAudioStore();
  const isNew = !id || id === 'new';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState('Calm');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [entryId, setEntryId] = useState<string | null>(isNew ? null : id);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load existing entry if editing
  useEffect(() => {
    if (!isNew && id) {
      apiRequest(`/diary/${id}`)
        .then((entry) => {
          setTitle(entry.title);
          setContent(entry.content);
          setDate(entry.date);
          setMood(entry.mood || 'Calm');
          setTags(entry.tags || []);
          setLocation(entry.location || '');
          setWeather(entry.weather || '');
          setIsFavorite(entry.isFavorite || false);
          setIsPrivate(entry.isPrivate || false);
          setEntryId(entry._id);
          setSaveStatus('saved');
          setErrorMsg(null);
        })
        .catch((e) => {
          console.error(e);
          setErrorMsg(e.message || 'Failed to load entry');
        });
    }
  }, [id, isNew]);

  // Debounced Autosave Effect
  useEffect(() => {
    if (!title && !content) return;

    setSaveStatus('unsaved');

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(() => {
      handleAutosave();
    }, 2500);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [title, content, date, mood, tags, location, weather, isFavorite, isPrivate]);

  const handleAutosave = async () => {
    if (!title.trim()) return;
    setSaveStatus('saving');
    setErrorMsg(null);

    const payload = {
      title,
      content: content || '<p></p>',
      date,
      mood,
      tags,
      location,
      weather,
      isFavorite,
      isPrivate,
    };

    try {
      if (entryId) {
        await apiRequest(`/diary/${entryId}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
      } else {
        const created = await apiRequest('/diary', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setEntryId(created._id);
        navigate(`/diary/${created._id}/edit`, { replace: true });
      }
      setSaveStatus('saved');
      setLastSavedTime(format(new Date(), 'hh:mm:ss a'));
      setErrorMsg(null);
    } catch (e: any) {
      console.error('Autosave failed:', e);
      setSaveStatus('unsaved');
      setErrorMsg(e.message || 'Failed to save diary entry');
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Editor Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gold-500/20">
        <button
          onClick={() => navigate('/diary')}
          className="flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-parchment-300 hover:text-gold-400 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Archives
        </button>

        {/* Autosave Status Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-serif">
            {saveStatus === 'saving' && (
              <span className="text-amber-400 animate-pulse flex items-center gap-1">
                <Save className="w-3.5 h-3.5 animate-spin" /> Saving draft...
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Saved {lastSavedTime ? `at ${lastSavedTime}` : ''}
              </span>
            )}
            {saveStatus === 'unsaved' && (
              <span className="text-parchment-300 italic">Unsaved changes...</span>
            )}
          </div>

          <MagicalButton
            size="sm"
            variant="gold"
            onClick={handleAutosave}
          >
            Save Entry
          </MagicalButton>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-950/80 border border-red-500/60 rounded text-red-200 text-xs font-sans flex items-center justify-between">
          <span>⚠️ {errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-red-400 font-bold uppercase hover:text-red-200">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Entry Metadata Section */}
      <ParchmentCard dark className="space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of Today's Memory..."
            className="flex-1 font-serif text-2xl md:text-3xl font-bold bg-transparent border-b border-gold-500/30 text-gold-400 placeholder:text-parchment-700 focus:outline-none focus:border-gold-400 pb-1"
          />

          {/* Date Picker */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-black/40 border border-gold-500/30 rounded px-3 py-1.5 text-xs font-serif text-parchment-200 focus:outline-none focus:border-gold-400"
          />
        </div>

        {/* Metadata Badges & Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {/* Mood */}
          <div>
            <label className="block text-[10px] font-serif uppercase tracking-widest text-parchment-300 mb-1">
              Mood
            </label>
            <select
              value={mood}
              onChange={(e) => {
                const newMood = e.target.value;
                setMood(newMood);
                setTrackByMood(newMood);
              }}
              className="w-full bg-black/40 border border-gold-500/30 rounded px-3 py-1.5 text-xs font-sans text-parchment-200"
            >
              <option value="Ecstatic">🤩 Ecstatic</option>
              <option value="Happy">😊 Happy</option>
              <option value="Calm">😌 Calm</option>
              <option value="Neutral">😐 Neutral</option>
              <option value="Sad">😔 Sad</option>
              <option value="Anxious">😰 Anxious</option>
              <option value="Tired">😴 Tired</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[10px] font-serif uppercase tracking-widest text-parchment-300 mb-1">
              Location
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gold-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Great Hall, Hogwarts"
                className="w-full bg-black/40 border border-gold-500/30 rounded pl-8 pr-3 py-1.5 text-xs font-sans text-parchment-200"
              />
            </div>
          </div>

          {/* Weather */}
          <div>
            <label className="block text-[10px] font-serif uppercase tracking-widest text-parchment-300 mb-1">
              Weather
            </label>
            <div className="relative">
              <CloudSun className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gold-400" />
              <input
                type="text"
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                placeholder="Starry Night"
                className="w-full bg-black/40 border border-gold-500/30 rounded pl-8 pr-3 py-1.5 text-xs font-sans text-parchment-200"
              />
            </div>
          </div>

          {/* Favorites & Muffliato Private Lock Toggles */}
          <div className="flex items-center gap-2 pt-5">
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex-1 py-1.5 px-2 rounded border text-xs font-serif flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                isFavorite
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-black/30 border-stone-800 text-parchment-300 hover:border-stone-600'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              Favorite
            </button>

            <button
              type="button"
              onClick={() => setIsPrivate(!isPrivate)}
              className={`flex-1 py-1.5 px-2 rounded border text-xs font-serif flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                isPrivate
                  ? 'bg-purple-900/40 border-purple-400 text-purple-300'
                  : 'bg-black/30 border-stone-800 text-parchment-300 hover:border-stone-600'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Muffliato
            </button>
          </div>
        </div>

        {/* Tags Input */}
        <div>
          <label className="block text-[10px] font-serif uppercase tracking-widest text-parchment-300 mb-1">
            Tags (Press Enter to add)
          </label>
          <div className="flex flex-wrap items-center gap-2 p-2 bg-black/40 border border-gold-500/30 rounded">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gold-500/20 text-gold-300 border border-gold-500/40 text-xs px-2 py-0.5 rounded flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-400 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tag..."
              className="bg-transparent text-xs text-parchment-100 focus:outline-none flex-1 min-w-[100px]"
            />
          </div>
        </div>
      </ParchmentCard>

      {/* TipTap Rich Text Parchment Editor */}
      <QuillEditor
        content={content}
        onChange={(newHtml) => setContent(newHtml)}
      />
    </div>
  );
};
