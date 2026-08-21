import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store/useAuthStore';
import { ParchmentCard } from '../../components/magical/ParchmentCard';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { apiRequest } from '../../services/api.client';
import { Lock, ShieldAlert, Key, Trash2 } from 'lucide-react';

export const ChamberOfSecretsPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setIsLoading(true);

    try {
      await apiRequest('/users/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setMsg({ type: 'success', text: 'Spell passcode successfully updated.' });
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Failed to update passcode.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('⚠️ WARNING: Are you sure you wish to permanently destroy your diary and all memories inside the Chamber of Secrets? This action cannot be undone.')) {
      return;
    }

    try {
      await apiRequest('/users/account', { method: 'DELETE' });
      logout();
      navigate('/welcome');
    } catch (e: any) {
      alert(e.message || 'Failed to delete account.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-purple-500/30">
        <h1 className="font-serif text-3xl font-bold text-purple-300 flex items-center gap-2">
          <Lock className="w-6 h-6 text-purple-400" />
          Chamber of Secrets — Security & Privacy
        </h1>
        <p className="font-serif italic text-parchment-300 text-xs mt-1">
          High-level privacy controls, passcode protection, and account destruction
        </p>
      </div>

      {msg && (
        <div
          className={`p-4 rounded border text-xs font-sans ${
            msg.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/80 border-red-500/50 text-red-200'
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Change Password Card */}
      <ParchmentCard dark className="space-y-4 border-purple-500/30">
        <h3 className="font-serif text-lg font-bold text-gold-400 flex items-center gap-2">
          <Key className="w-5 h-5" />
          Change Spell Passcode
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-parchment-300 mb-1">
              Current Passcode
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/40 border border-gold-500/30 rounded text-parchment-100 text-sm focus:outline-none focus:border-gold-400"
            />
          </div>

          <div>
            <label className="block text-xs font-serif uppercase tracking-widest text-parchment-300 mb-1">
              New Passcode (Min 8 characters)
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/40 border border-gold-500/30 rounded text-parchment-100 text-sm focus:outline-none focus:border-gold-400"
            />
          </div>

          <MagicalButton type="submit" variant="gold" size="md" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Passcode'}
          </MagicalButton>
        </form>
      </ParchmentCard>

      {/* Danger Zone: Account Deletion */}
      <ParchmentCard dark className="space-y-4 border-red-500/40 bg-red-950/20">
        <h3 className="font-serif text-lg font-bold text-red-400 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Danger Zone — Account Deletion
        </h3>
        <p className="text-xs text-parchment-300">
          Permanently delete your account and remove all personal diary entries, mood records, and memories from MongoDB.
        </p>

        <button
          onClick={handleDeleteAccount}
          className="px-4 py-2.5 rounded bg-red-950 border border-red-500/60 text-red-300 font-serif text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-red-900 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          Permanently Delete Account
        </button>
      </ParchmentCard>
    </div>
  );
};
