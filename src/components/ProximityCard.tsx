import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, Clock } from 'lucide-react';
import type { Guess } from '../types/game';
import { getTierColor } from '../utils/semanticEngine';

interface ProximityCardProps {
  guess: Guess;
}

export const ProximityCard: React.FC<ProximityCardProps> = ({ guess }) => {
  const color = getTierColor(guess.tier);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <motion.div
      layout
      layoutId={guess.id}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 26,
      }}
      className="relative glass-panel rounded-xl sm:rounded-2xl p-3.5 sm:p-4 mb-2.5 overflow-hidden border border-white/10 hover:border-white/20 transition-all shadow-md group"
    >
      {/* Background Subtle Progress Glow */}
      <div
        className="absolute top-0 bottom-0 left-0 opacity-15 pointer-events-none transition-all duration-700"
        style={{
          width: `${guess.score}%`,
          backgroundColor: color,
        }}
      />

      <div className="relative flex items-center justify-between z-10 gap-3">
        {/* Left: Rank & Word Details */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0B0B0F] border border-white/10 flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-cred-muted shrink-0 group-hover:border-white/20 transition-colors">
            #{String(guess.rank).padStart(2, '0')}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-extrabold tracking-wider text-white uppercase">
                {guess.word}
              </span>

              {guess.rankChange && guess.rankChange > 0 ? (
                <span className="inline-flex items-center text-[10px] font-mono font-bold text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.5 rounded border border-[#00FF66]/30">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> +{guess.rankChange}
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-cred-subtle mt-0.5">
              <span className="uppercase font-semibold" style={{ color: color }}>
                {guess.tier}
              </span>
              <span>•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-white/50">
                <Clock className="w-3 h-3" /> {formatTime(guess.timestamp)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Score Metric & Heat Pill */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="text-right font-mono">
            <div
              className="text-base sm:text-xl font-extrabold tracking-tight drop-shadow-sm"
              style={{ color: color }}
            >
              {guess.score}%
            </div>
            <div className="text-[9px] text-cred-subtle uppercase tracking-widest hidden sm:block">
              HEAT SCORE
            </div>
          </div>

          {guess.score >= 90 && (
            <div
              className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10"
              style={{ color: color }}
            >
              <Flame className="w-4 h-4 animate-bounce" />
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Fluid Progress Bar */}
      <div className="relative w-full h-1 bg-white/5 rounded-full mt-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${guess.score}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>
    </motion.div>
  );
};
