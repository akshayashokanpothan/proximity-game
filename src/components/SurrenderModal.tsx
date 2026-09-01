import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, X, RotateCcw, AlertTriangle } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface SurrenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetWord: string;
  themeName: string;
  totalGuesses: number;
  highestScore: number;
  onConfirmSurrender: () => void;
}

export const SurrenderModal: React.FC<SurrenderModalProps> = ({
  isOpen,
  onClose,
  targetWord,
  themeName,
  totalGuesses,
  highestScore,
  onConfirmSurrender,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md glass-panel rounded-3xl p-6 border border-rose-500/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,51,102,0.2)]"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2 text-rose-500">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                REVEAL SECRET WORD
              </span>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="touch-target w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-cred-muted hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-3 text-rose-500">
              <Flag className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">
              SURRENDER MATCH?
            </h3>
            <p className="text-xs text-cred-muted max-w-xs mx-auto mb-4">
              Revealing the target word will end this match session for <strong className="text-white">{themeName}</strong>.
            </p>

            {/* Revealed Secret Word Container */}
            <div className="glass-panel p-4 rounded-2xl border border-white/15 bg-[#0B0B0F] mb-4">
              <span className="text-[10px] font-mono text-cred-subtle uppercase tracking-widest block mb-1">
                SECRET TARGET WORD IS:
              </span>
              <div className="text-2xl font-mono font-extrabold text-[#FF3366] tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,51,102,0.5)]">
                {targetWord}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs font-mono text-cred-muted mb-4">
              <span>GUESSES: {totalGuesses}</span>
              <span>•</span>
              <span>PEAK HEAT: {highestScore}%</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => {
                soundFx.playClick();
                onConfirmSurrender();
              }}
              className="w-full py-3.5 rounded-xl bg-rose-600 text-white font-mono text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(225,29,72,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>CONFIRM SURRENDER & QUIT</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-cred-card border border-white/10 text-xs font-mono text-cred-muted hover:text-white active:scale-95 transition-all min-h-[44px]"
            >
              KEEP GUESSING
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
