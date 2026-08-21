import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { apiRequest } from '../../services/api.client';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthEntries, setMonthEntries] = useState<any[]>([]);

  const firstDay = startOfMonth(currentDate);
  const lastDay = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });

  useEffect(() => {
    const startDateStr = format(firstDay, 'yyyy-MM-dd');
    const endDateStr = format(lastDay, 'yyyy-MM-dd');

    apiRequest(`/diary?startDate=${startDateStr}&endDate=${endDateStr}&limit=100`)
      .then((res) => {
        const items = Array.isArray(res) ? res : res?.items || res?.data || [];
        setMonthEntries(items);
      })
      .catch((e) => console.error(e));
  }, [currentDate]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Calendar Month Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gold-500/20">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gold-400">Magical Calendar</h1>
          <p className="font-serif italic text-parchment-300 text-xs mt-1">
            Track daily reflections, moods, and historic journal entries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 rounded bg-black/40 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-serif font-bold text-lg text-parchment-100 min-w-[140px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 rounded bg-black/40 border border-gold-500/30 text-gold-400 hover:bg-gold-500/20"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <ParchmentCard dark className="p-4 sm:p-6">
        <div className="grid grid-cols-7 gap-2 text-center font-serif text-xs uppercase tracking-wider text-gold-400 pb-4 border-b border-gold-500/20">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-4">
          {days.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const dayEntries = monthEntries.filter((e) => e.date === dateKey);
            const hasEntry = dayEntries.length > 0;
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={dateKey}
                onClick={() => {
                  if (hasEntry) {
                    navigate(`/diary/${dayEntries[0]._id}`);
                  } else {
                    navigate(`/diary/new?date=${dateKey}`);
                  }
                }}
                className={`min-h-[80px] p-2 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                  isToday
                    ? 'bg-gold-500/20 border-gold-400 shadow-glow'
                    : hasEntry
                    ? 'bg-black/40 border-gold-500/30 hover:border-gold-400'
                    : 'bg-black/20 border-stone-900 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-serif font-bold">
                  <span className={isToday ? 'text-gold-400 font-extrabold' : 'text-parchment-300'}>
                    {format(day, 'd')}
                  </span>
                  {hasEntry && <span className="text-[10px]">🪶</span>}
                </div>

                {hasEntry ? (
                  <div className="text-[10px] font-sans text-parchment-200 truncate font-semibold">
                    {dayEntries[0].title}
                  </div>
                ) : (
                  <div className="opacity-0 hover:opacity-100 text-gold-400 text-center text-xs">
                    + Add
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ParchmentCard>
    </div>
  );
};
