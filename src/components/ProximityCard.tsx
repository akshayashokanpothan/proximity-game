import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowUp, Zap } from 'lucide-react';
import type { Guess, VisualMode } from '../types/game';
import { getTierColor } from '../utils/semanticEngine';

interface ProximityCardProps {
  guess: Guess;
  visualMode?: VisualMode;
}

export const ProximityCard: React.FC<ProximityCardProps> = ({
  guess,
  visualMode = 'graphics',
}) => {
  const color = getTierColor(guess.tier);
  const isTarget = guess.tier === 'target';
  const isMinimal = visualMode === 'minimal';

  // Minimal SaaS Light Mode Row
  if (isMinimal) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-colors bg-white ${
          isTarget ? 'border-neutral-900 shadow-xs' : 'border-neutral-200/80 hover:border-neutral-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-neutral-400 w-6">
            #{String(guess.rank).padStart(2, '0')}
          </span>
          <span className="font-mono font-bold text-sm tracking-wide text-neutral-900 uppercase">
            {guess.word}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {guess.rankChange && guess.rankChange > 0 ? (
            <span className="text-[10px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
              <ArrowUp className="w-3 h-3" /> +{guess.rankChange}
            </span>
          ) : null}

          <div className="flex items-center gap-2">
            <div className="w-20 sm:w-28 h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${guess.score}%`, backgroundColor: color }}
              />
            </div>
            <span className="font-mono font-extrabold text-xs text-neutral-900 w-10 text-right">
              {guess.score}%
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Preserved Graphics Heavy Dark Mode Card
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className={`w-full p-3.5 sm:p-4 rounded-2xl glass-panel relative overflow-hidden transition-all duration-300 border ${
        isTarget ? 'border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.3)] bg-[#00FF66]/10' : 'hover:border-white/20'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left Rank & Word */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-cred-subtle">
            #{guess.rank}
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
              <span>{guess.word}</span>
              {isTarget && <Zap className="w-4 h-4 text-[#00FF66] animate-bounce" />}
            </div>
            {guess.rankChange && guess.rankChange > 0 ? (
              <span className="text-[10px] font-mono text-[#00FF66] flex items-center gap-0.5 font-bold">
                <ArrowUp className="w-3 h-3" /> ▲ +{guess.rankChange} POSITIONS
              </span>
            ) : (
              <span className="text-[10px] font-mono text-cred-subtle">
                RANK POSITION #{guess.rank}
              </span>
            )}
          </div>
        </div>

        {/* Right Heat % Pill & Meter */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 mb-1">
            <Flame className="w-4 h-4" style={{ color: color }} />
            <span className="text-lg sm:text-xl font-mono font-extrabold text-white">
              {guess.score}%
            </span>
          </div>

          {/* Mini Linear Score Bar */}
          <div className="w-24 sm:w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${guess.score}%`, backgroundColor: color }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
