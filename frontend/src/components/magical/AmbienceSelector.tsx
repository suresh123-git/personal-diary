import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioStore, TrackType } from '../../app/store/useAudioStore';
import { Volume2, VolumeX, Flame, CloudRain, BookOpen, Check } from 'lucide-react';

const TRACKS: { id: TrackType; label: string; icon: string; desc: string }[] = [
  { id: 'fireplace', label: 'Great Hall Fireplace', icon: '🪵', desc: 'Warm crackling wood logs' },
  { id: 'rain', label: 'Castle Window Rain', icon: '🌧️', desc: 'Soft rain filtering against glass' },
  { id: 'library', label: 'Hogwarts Library', icon: '📚', desc: 'Quiet, deep resonant study tone' },
];

export const AmbienceSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPlaying, track, volume, togglePlay, setTrack, setVolume } = useAudioStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTrackData = TRACKS.find((t) => t.id === track) || TRACKS[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Ambience Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Ambient Soundscapes & Volume Settings"
        className={`px-2.5 py-1.5 rounded-md text-xs font-serif flex items-center gap-1.5 transition-all cursor-pointer ${
          isPlaying
            ? 'bg-purple-900/60 border border-purple-400 text-purple-200 shadow-glow'
            : 'bg-black/30 border border-stone-800 text-parchment-300 hover:border-gold-500/40'
        }`}
      >
        <span className="text-sm">{currentTrackData.icon}</span>
        <span className="hidden lg:inline font-semibold">
          {isPlaying ? 'Ambience ON' : 'Ambience'}
        </span>
        <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'text-purple-300 animate-pulse' : 'text-parchment-300'}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 parchment-dark-bg border border-purple-500/40 rounded-xl p-4 shadow-2xl z-50 text-parchment-100 space-y-4"
          >
            {/* Header & Play/Pause */}
            <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
              <span className="font-serif text-xs font-bold text-gold-400 uppercase tracking-wider">
                🎵 Hogwarts Soundscapes
              </span>
              <button
                onClick={togglePlay}
                className={`px-2.5 py-1 rounded text-xs font-serif uppercase tracking-wider flex items-center gap-1 cursor-pointer ${
                  isPlaying
                    ? 'bg-red-950/80 border border-red-500/50 text-red-300'
                    : 'bg-gold-500/20 border border-gold-400 text-gold-300'
                }`}
              >
                {isPlaying ? (
                  <>
                    <VolumeX className="w-3 h-3" /> Stop
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3" /> Play
                  </>
                )}
              </button>
            </div>

            {/* Track Options */}
            <div className="space-y-1.5">
              {TRACKS.map((t) => {
                const isSelected = track === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTrack(t.id);
                      if (!isPlaying) togglePlay();
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-purple-900/40 border-purple-400 text-purple-200'
                        : 'bg-black/30 border-stone-800 text-parchment-200 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{t.icon}</span>
                      <div>
                        <span className="font-serif text-xs font-bold block text-parchment-100">
                          {t.label}
                        </span>
                        <span className="text-[10px] font-sans text-parchment-300/80">
                          {t.desc}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                  </button>
                );
              })}
            </div>

            {/* Volume Control */}
            <div className="pt-2 border-t border-purple-500/20 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-serif text-parchment-300">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
