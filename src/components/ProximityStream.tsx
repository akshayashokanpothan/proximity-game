import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProximityCard } from './ProximityCard';
import type { Guess } from '../types/game';
import { Layers, Flame } from 'lucide-react';

interface ProximityStreamProps {
  guesses: Guess[];
}

export const ProximityStream: React.FC<ProximityStreamProps> = ({ guesses }) => {
  // Sort guesses by score descending (highest proximity on top)
  const sortedGuesses = [...guesses].sort((a, b) => b.score - a.score);

  if (guesses.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto my-8 p-8 text-center glass-panel rounded-2xl border border-dashed border-white/10">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-cred-muted">
          <Layers className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-white font-sans uppercase tracking-wider mb-1">
          NO GUESSES YET!
        </h4>
        <p className="text-xs text-cred-muted font-sans max-w-xs mx-auto">
          Type your first word above to see if you are 🥶 Cold or 🔥 Super Hot!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-6">
      <div className="flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#00FF66]" />
          <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
            YOUR GUESSES ({sortedGuesses.length})
          </span>
        </div>
        <span className="text-[10px] font-mono text-cred-subtle">
          WARMEST ON TOP
        </span>
      </div>

      <div className="relative space-y-1 min-h-[100px]">
        <AnimatePresence mode="popLayout">
          {sortedGuesses.map((guess) => (
            <ProximityCard key={guess.id} guess={guess} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
