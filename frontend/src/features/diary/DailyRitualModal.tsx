import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParchmentModal } from '../../components/magical/ParchmentModal';
import { MagicalButton } from '../../components/magical/MagicalButton';
import { apiRequest } from '../../services/api.client';
import { format } from 'date-fns';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

interface DailyRitualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RITUAL_STEPS = [
  { key: 'joy', title: '1. Pure Joy & Magic', question: 'What brought a smile to your face or made you happy today?' },
  { key: 'learned', title: '2. Lessons & Wisdom', question: 'What new lesson, insight, or skill did you gain today?' },
  { key: 'challenge', title: '3. Trials Overcome', question: 'What challenged you today, and how did you handle it?' },
  { key: 'gratitude', title: '4. Heartfelt Gratitude', question: 'What 3 things are you most grateful for right now?' },
  { key: 'tomorrow', title: '5. Tomorrow’s Quest', question: 'What is your single primary goal for tomorrow?' },
];

export const DailyRitualModal: React.FC<DailyRitualModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    joy: '',
    learned: '',
    challenge: '',
    gratitude: '',
    tomorrow: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const step = RITUAL_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < RITUAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCompleteRitual();
    }
  };

  const handleCompleteRitual = async () => {
    setIsSubmitting(true);
    const todayStr = format(new Date(), 'yyyy-MM-dd');

    const htmlContent = `
<h2>✨ Daily Reflection Ritual — ${format(new Date(), 'MMMM d, yyyy')}</h2>
<p><strong>1. Joy & Magic:</strong> ${answers.joy || 'A peaceful day.'}</p>
<p><strong>2. Lessons Learned:</strong> ${answers.learned || 'Continued learning.'}</p>
<p><strong>3. Challenges Overcome:</strong> ${answers.challenge || 'Handled all obstacles with calm.'}</p>
<p><strong>4. Gratitude:</strong> ${answers.gratitude || 'Grateful for health and growth.'}</p>
<p><strong>5. Tomorrow’s Focus:</strong> ${answers.tomorrow || 'To accomplish my primary goal.'}</p>
    `.trim();

    try {
      const created = await apiRequest('/diary', {
        method: 'POST',
        body: JSON.stringify({
          title: `Daily Ritual — ${format(new Date(), 'MMMM d, yyyy')}`,
          content: htmlContent,
          date: todayStr,
          mood: 'Calm',
          tags: ['DailyRitual', 'Reflection'],
        }),
      });

      onClose();
      navigate(`/diary/${created._id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ParchmentModal isOpen={isOpen} onClose={onClose} title="🧙‍♂️ Daily Reflection Ritual">
      <div className="space-y-6">
        {/* Step Progress Bar */}
        <div className="flex items-center justify-between gap-1 text-[10px] font-serif uppercase tracking-widest text-parchment-700 pb-2 border-b border-parchment-700/30">
          <span>Step {currentStep + 1} of {RITUAL_STEPS.length}</span>
          <span className="font-bold">{step.title}</span>
        </div>

        {/* Step Question & Text Area */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-lg text-parchment-900">{step.question}</h4>
          <textarea
            rows={4}
            value={answers[step.key]}
            onChange={(e) => setAnswers({ ...answers, [step.key]: e.target.value })}
            placeholder="Write your answer here..."
            className="w-full p-3 rounded bg-parchment-50 border border-parchment-700/40 text-parchment-900 focus:outline-none focus:border-gold-600 text-sm font-body"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-parchment-700/30">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-xs font-serif text-parchment-900 hover:underline disabled:opacity-30"
          >
            ← Previous
          </button>

          <MagicalButton
            variant="gold"
            size="sm"
            disabled={isSubmitting}
            onClick={handleNext}
          >
            {currentStep === RITUAL_STEPS.length - 1 ? (
              <span>{isSubmitting ? 'Enchanting...' : 'Complete Ritual ✨'}</span>
            ) : (
              <span className="flex items-center gap-1">Next Step <ArrowRight className="w-3.5 h-3.5" /></span>
            )}
          </MagicalButton>
        </div>
      </div>
    </ParchmentModal>
  );
};
