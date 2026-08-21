import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore, HouseType } from '../../app/store/useAuthStore';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { HouseBadge } from '../../components/magical/HouseBadge';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { apiRequest } from '../../services/api.client';
import { User, Shield, Download, Lock, Palette } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, setHouse } = useAuthStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleHouseChange = async (newHouse: HouseType) => {
    try {
      await apiRequest('/users/house', {
        method: 'POST',
        body: JSON.stringify({ house: newHouse }),
      });
      setHouse(newHouse);
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportJson = async () => {
    setIsExporting(true);
    try {
      const data = await apiRequest('/export/json');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `harry_potter_diary_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportMarkdown = async () => {
    try {
      const token = localStorage.getItem('hp_access_token');
      const res = await fetch('/api/v1/export/markdown', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const text = await res.text();
      const blob = new Blob([text], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `harry_potter_diary_${new Date().toISOString().split('T')[0]}.md`;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-gold-500/20">
        <h1 className="font-serif text-3xl font-bold text-gold-400 flex items-center gap-2">
          <User className="w-6 h-6 text-gold-500" />
          Wizard Profile & Preferences
        </h1>
        <p className="font-serif italic text-parchment-300 text-xs mt-1">
          Manage your Hogwarts house theme, settings, and diary backups
        </p>
      </div>

      {/* User Information Card */}
      <ParchmentCard dark className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-parchment-100">{user?.name}</h2>
            <p className="text-xs font-sans text-parchment-300">{user?.email}</p>
          </div>
          {user && <HouseBadge house={user.house} size="lg" />}
        </div>
      </ParchmentCard>

      {/* Hogwarts House Customizer */}
      <ParchmentCard dark className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-gold-400 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Hogwarts House Theme System
        </h3>
        <p className="text-xs text-parchment-300">
          Switching your house allegiance updates the visual palette across your diary.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { id: 'gryffindor', label: '🦁 Gryffindor', bg: 'hover:border-amber-400' },
            { id: 'slytherin', label: '🐍 Slytherin', bg: 'hover:border-emerald-400' },
            { id: 'ravenclaw', label: '🦅 Ravenclaw', bg: 'hover:border-blue-400' },
            { id: 'hufflepuff', label: '🦡 Hufflepuff', bg: 'hover:border-yellow-400' },
          ].map((h) => (
            <button
              key={h.id}
              onClick={() => handleHouseChange(h.id as HouseType)}
              className={`p-3 rounded-lg border text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
                user?.house === h.id
                  ? 'bg-gold-500/20 border-gold-400 text-gold-300 font-bold scale-105 shadow-glow'
                  : `bg-black/30 border-stone-800 text-parchment-300 ${h.bg}`
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      </ParchmentCard>

      {/* Data Export & Backup Section */}
      <ParchmentCard dark className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-gold-400 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Data Export & Offline Snapshot Backup
        </h3>
        <p className="text-xs text-parchment-300">
          Export your entire personal diary dataset into portable formats.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <MagicalButton
            variant="gold"
            size="md"
            onClick={handleExportJson}
            disabled={isExporting}
          >
            Export as JSON Dataset
          </MagicalButton>

          <MagicalButton
            variant="ghost"
            size="md"
            onClick={handleExportMarkdown}
          >
            Export as Markdown Document
          </MagicalButton>
        </div>
      </ParchmentCard>

      {/* Link to Chamber of Secrets */}
      <ParchmentCard dark className="flex items-center justify-between border-purple-500/30">
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-purple-300 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-400" />
            Chamber of Secrets
          </h3>
          <p className="text-xs text-parchment-300">
            Password changes, Muffliato private entry locks, and security logs
          </p>
        </div>

        <Link to="/chamber">
          <MagicalButton variant="spell" size="sm">
            Enter Chamber →
          </MagicalButton>
        </Link>
      </ParchmentCard>
    </div>
  );
};
