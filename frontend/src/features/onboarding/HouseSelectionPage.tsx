import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore, HouseType } from '../../app/store/useAuthStore';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { apiRequest } from '../../services/api.client';

interface HouseOption {
  id: HouseType;
  name: string;
  crest: string;
  traits: string;
  colors: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
}

const houses: HouseOption[] = [
  {
    id: 'gryffindor',
    name: 'Gryffindor',
    crest: '🦁',
    traits: 'Bravery, Chivalry, Daring & Nerve',
    colors: 'Deep Maroon Red & Antique Gold',
    bgGradient: 'from-red-950/80 via-amber-950/40 to-red-950/80',
    borderColor: 'border-amber-500/60',
    accentColor: 'text-amber-400',
  },
  {
    id: 'slytherin',
    name: 'Slytherin',
    crest: '🐍',
    traits: 'Ambition, Cunning, Leadership & Resourcefulness',
    colors: 'Emerald Green & Silver',
    bgGradient: 'from-emerald-950/80 via-stone-900/40 to-emerald-950/80',
    borderColor: 'border-emerald-500/60',
    accentColor: 'text-emerald-400',
  },
  {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    crest: '🦅',
    traits: 'Intelligence, Wit, Wisdom & Creativity',
    colors: 'Midnight Blue & Bronze',
    bgGradient: 'from-blue-950/80 via-indigo-950/40 to-blue-950/80',
    borderColor: 'border-blue-500/60',
    accentColor: 'text-blue-300',
  },
  {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    crest: '🦡',
    traits: 'Loyalty, Hard Work, Patience & Dedication',
    colors: 'Canary Warm Gold & Dark Wood',
    bgGradient: 'from-amber-950/80 via-stone-900/40 to-amber-950/80',
    borderColor: 'border-yellow-500/60',
    accentColor: 'text-yellow-400',
  },
];

export const HouseSelectionPage: React.FC = () => {
  const [selectedHouse, setSelectedHouse] = useState<HouseType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setHouse } = useAuthStore();
  const navigate = useNavigate();

  const handleConfirmHouse = async () => {
    if (!selectedHouse) return;
    setIsSubmitting(true);
    try {
      await apiRequest('/users/house', {
        method: 'POST',
        body: JSON.stringify({ house: selectedHouse }),
      });
      setHouse(selectedHouse);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-10 space-y-3"
      >
        <span className="text-4xl">🧙‍♂️</span>
        <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-gold-400">
          The Sorting Ceremony
        </h1>
        <p className="font-serif italic text-parchment-200 text-base md:text-lg">
          "Where does your story belong?" Choose your Hogwarts house to customize your diary theme.
        </p>
      </motion.div>

      {/* House Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-10">
        {houses.map((house) => {
          const isSelected = selectedHouse === house.id;
          return (
            <motion.div
              key={house.id}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setSelectedHouse(house.id)}
              className={`cursor-pointer rounded-xl p-6 border-2 transition-all relative overflow-hidden bg-gradient-to-b ${
                house.bgGradient
              } ${isSelected ? `${house.borderColor} shadow-magical ring-2 ring-gold-400` : 'border-parchment-700/30 opacity-80 hover:opacity-100'}`}
            >
              <div className="text-5xl mb-4">{house.crest}</div>
              <h3 className={`font-serif text-2xl font-bold uppercase tracking-wider mb-2 ${house.accentColor}`}>
                {house.name}
              </h3>
              <p className="text-sm font-sans text-parchment-200 mb-4">{house.traits}</p>
              <span className="text-xs font-serif italic text-parchment-300">
                Colors: {house.colors}
              </span>
            </motion.div>
          );
        })}
      </div>

      {selectedHouse && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <MagicalButton
            size="lg"
            variant="gold"
            disabled={isSubmitting}
            onClick={handleConfirmHouse}
          >
            {isSubmitting ? 'Sorting...' : `Welcome to ${selectedHouse.toUpperCase()} — Enter Dashboard`}
          </MagicalButton>
        </motion.div>
      )}
    </div>
  );
};
