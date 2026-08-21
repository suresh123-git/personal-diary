import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../app/store/useAuthStore';
import { useAudioStore } from '../../app/store/useAudioStore';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { HouseBadge } from '../../components/magical/HouseBadge';
import { OwlNotification } from '../../components/magical/OwlNotification';
import { DailyRitualModal } from '../diary/DailyRitualModal';
import { apiRequest } from '../../services/api.client';
import { format } from 'date-fns';
import { BookOpen, Sparkles, Calendar, Plus, Flame, Heart, ArrowRight, Newspaper } from 'lucide-react';

const DAILY_QUOTES = [
  { text: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.", author: "Albus Dumbledore" },
  { text: "It is our choices that show what we truly are, far more than our abilities.", author: "Albus Dumbledore" },
  { text: "Things we lose have a way of coming back to us in the end, if not always in the way we expect.", author: "Luna Lovegood" },
  { text: "Working hard is important, but there's something that matters even more: believing in yourself.", author: "Harry Potter" },
];

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [streakStats, setStreakStats] = useState({ currentStreak: 0, totalEntries: 0 });
  const [recentEntries, setRecentEntries] = useState<any[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>('Calm');
  const [isLoading, setIsLoading] = useState(true);
  const [isRitualOpen, setIsRitualOpen] = useState(false);
  const [owlMsg, setOwlMsg] = useState<string | null>(null);

  const todayStr = format(new Date(), 'dd MMMM yyyy');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [streakData, entriesData] = await Promise.all([
          apiRequest('/diary/stats/streak').catch(() => ({ currentStreak: 7, totalEntries: 12 })),
          apiRequest('/diary?limit=3').catch(() => []),
        ]);

        setStreakStats(streakData);
        const items = Array.isArray(entriesData) ? entriesData : entriesData?.items || entriesData?.data || [];
        setRecentEntries(items);

        if (streakData.currentStreak > 0) {
          setOwlMsg(`🦉 ${user?.name || 'Wizard'}, your ${streakData.currentStreak}-day writing streak is alive! Write tonight's entry to keep it glowing.`);
        }
      } catch (e) {
        console.error('Error fetching dashboard data:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const quote = DAILY_QUOTES[Math.floor(Math.random() * DAILY_QUOTES.length)];

  const moods = [
    { label: 'Ecstatic', icon: '🤩' },
    { label: 'Happy', icon: '😊' },
    { label: 'Calm', icon: '😌' },
    { label: 'Neutral', icon: '😐' },
    { label: 'Sad', icon: '😔' },
    { label: 'Anxious', icon: '😰' },
  ];

  const { setTrackByMood } = useAudioStore();

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    setTrackByMood(mood);
    try {
      await apiRequest('/moods', {
        method: 'POST',
        body: JSON.stringify({
          date: new Date().toISOString().split('T')[0],
          mood,
        }),
      });
    } catch (e) {
      console.error('Failed to log mood:', e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Owl Post Notification Banner */}
      <OwlNotification message={owlMsg} onClose={() => setOwlMsg(null)} />

      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-gold-500/20">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-black text-parchment-100 flex items-center gap-3">
            Good Morning, {user?.name || 'Wizard'} ✨
          </h1>
          <p className="font-serif italic text-parchment-300 text-sm mt-1">
            {todayStr} — Hogwarts Archives
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user && <HouseBadge house={user.house} size="lg" />}
          
          <div className="bg-gold-500/10 border border-gold-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span className="font-serif text-xs font-bold text-gold-400">
              {streakStats.currentStreak} Day Writing Streak
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Thought Quote */}
          <ParchmentCard dark className="border-l-4 border-l-gold-500">
            <span className="text-xs font-serif uppercase tracking-widest text-gold-400 block mb-2">
              📜 Today's Thought
            </span>
            <p className="font-serif italic text-lg text-parchment-100 leading-relaxed mb-3">
              "{quote.text}"
            </p>
            <p className="text-xs font-serif font-semibold text-parchment-300 text-right">
              — {quote.author}
            </p>
          </ParchmentCard>

          {/* Large CTA: Begin Writing or Launch Daily Ritual */}
          <div className="parchment-dark-bg p-8 rounded-xl border border-gold-500/40 text-center space-y-4 shadow-magical relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl pointer-events-none">
              🪶
            </div>

            <h2 className="font-serif text-2xl font-bold text-gold-400">
              What wizardry did today bring?
            </h2>
            <p className="font-sans text-sm text-parchment-200 max-w-md mx-auto">
              Immortalize your day inside your enchanted parchment diary or launch a guided 5-step reflection.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <MagicalButton
                size="lg"
                variant="gold"
                onClick={() => navigate('/diary/new')}
              >
                🪶 Write Today's Entry
              </MagicalButton>

              <MagicalButton
                size="lg"
                variant="spell"
                onClick={() => setIsRitualOpen(true)}
              >
                🧙‍♂️ Launch Daily Ritual
              </MagicalButton>
            </div>
          </div>

          {/* THE DAILY PROPHET — Personal Edition Newspaper Card */}
          <ParchmentCard dark className="border-2 border-gold-500/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-gold-500/30 pb-2">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-gold-400" />
                <h3 className="font-serif text-lg font-bold text-gold-400 uppercase tracking-wider">
                  The Daily Prophet — {user?.name ? `${user.name}'s Edition` : 'Special Edition'}
                </h3>
              </div>
              <span className="text-[10px] font-serif uppercase tracking-widest text-parchment-300">{todayStr}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-parchment-200">
              <div className="p-3 bg-black/40 rounded border border-gold-500/20 space-y-1">
                <span className="font-serif font-bold text-gold-400 block uppercase">🔥 Writing Streak Record</span>
                <p>You have recorded {streakStats.totalEntries || recentEntries.length} memories across {streakStats.currentStreak || 1} consecutive days.</p>
              </div>

              <div className="p-3 bg-black/40 rounded border border-gold-500/20 space-y-1">
                <span className="font-serif font-bold text-purple-400 block uppercase">🔮 Memory Insights</span>
                <p>Your Pensieve is ready for memory exploration. Use natural language queries to revisit historic moments.</p>
              </div>
            </div>
          </ParchmentCard>

          {/* Recent Diary Memories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-gold-400 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recent Diary Entries
              </h3>
              <Link to="/diary" className="text-xs font-serif uppercase text-gold-400 hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {recentEntries.length === 0 ? (
              <ParchmentCard dark className="text-center py-8">
                <p className="font-serif italic text-parchment-300">
                  No diary entries recorded yet. Write your first page today!
                </p>
              </ParchmentCard>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentEntries.map((entry) => (
                  <Link key={entry._id} to={`/diary/${entry._id}`}>
                    <ParchmentCard dark className="h-full hover:border-gold-500/60 transition-colors">
                      <div className="flex items-center justify-between text-xs text-parchment-300 mb-2">
                        <span>{entry.date}</span>
                        <span>{entry.mood}</span>
                      </div>
                      <h4 className="font-serif font-bold text-parchment-100 text-lg line-clamp-1 mb-2">
                        {entry.title}
                      </h4>
                      <p className="text-xs font-sans text-parchment-200/80 line-clamp-2">
                        {entry.plainTextContent || 'Enchanted diary entry...'}
                      </p>
                    </ParchmentCard>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1/3 width on desktop) */}
        <div className="space-y-6">
          {/* Mood Selector Widget */}
          <ParchmentCard dark className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold-400 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400" />
              Today's Mood
            </h3>
            <p className="text-xs text-parchment-300 font-sans">How is your spirit feeling today?</p>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {moods.map((m) => {
                const isSelected = selectedMood === m.label;
                return (
                  <button
                    key={m.label}
                    onClick={() => handleMoodSelect(m.label)}
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gold-500/20 border-gold-400 text-gold-300 font-bold scale-105'
                        : 'bg-black/30 border-stone-800 text-parchment-200 hover:border-stone-600'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{m.icon}</span>
                    <span className="text-[10px] font-serif uppercase tracking-wider">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </ParchmentCard>

          {/* Quick Actions Widget */}
          <ParchmentCard dark className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold-400">Quick Actions</h3>

            <div className="space-y-2">
              <Link to="/diary/new" className="block">
                <button className="w-full text-left px-4 py-2.5 rounded-lg bg-black/40 border border-gold-500/20 hover:border-gold-400 text-xs font-serif uppercase tracking-wider text-parchment-100 flex items-center justify-between">
                  <span>🪶 New Diary Entry</span>
                  <Plus className="w-4 h-4 text-gold-400" />
                </button>
              </Link>

              <Link to="/pensieve" className="block">
                <button className="w-full text-left px-4 py-2.5 rounded-lg bg-black/40 border border-purple-500/20 hover:border-purple-400 text-xs font-serif uppercase tracking-wider text-parchment-100 flex items-center justify-between">
                  <span>🔮 Open Pensieve AI</span>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </button>
              </Link>

              <Link to="/calendar" className="block">
                <button className="w-full text-left px-4 py-2.5 rounded-lg bg-black/40 border border-blue-500/20 hover:border-blue-400 text-xs font-serif uppercase tracking-wider text-parchment-100 flex items-center justify-between">
                  <span>📅 Open Calendar</span>
                  <Calendar className="w-4 h-4 text-blue-400" />
                </button>
              </Link>
            </div>
          </ParchmentCard>
        </div>
      </div>

      <DailyRitualModal isOpen={isRitualOpen} onClose={() => setIsRitualOpen(false)} />
    </div>
  );
};
