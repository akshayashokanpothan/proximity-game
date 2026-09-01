import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, X, ShieldCheck, AlertTriangle, Eye, RotateCcw } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface RevealAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetWord: string;
  themeName: string;
  totalGuesses: number;
  highestScore: number;
  timeTakenSeconds: number;
  onConfirmSurrender: () => void;
}

export const RevealAdModal: React.FC<RevealAdModalProps> = ({
  isOpen,
  onClose,
  targetWord,
  themeName,
  totalGuesses,
  highestScore,
  timeTakenSeconds,
  onConfirmSurrender,
}) => {
  const [adStage, setAdStage] = useState<'idle' | 'ad1' | 'ad2' | 'ad3' | 'revealed'>('idle');
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    if (isOpen) {
      setAdStage('idle');
      setCountdown(5);
    }
  }, [isOpen]);

  // 3-Stage non-skippable ad timer logic
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (adStage === 'ad1') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      } else {
        soundFx.playUnlock();
        setAdStage('ad2');
        setCountdown(5);
      }
    } else if (adStage === 'ad2') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      } else {
        soundFx.playUnlock();
        setAdStage('ad3');
        setCountdown(5);
      }
    } else if (adStage === 'ad3') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      } else {
        soundFx.playWin();
        setAdStage('revealed');
      }
    }
    return () => clearTimeout(timer);
  }, [adStage, countdown]);

  if (!isOpen) return null;

  const startAdSequence = () => {
    soundFx.playClick();
    setAdStage('ad1');
    setCountdown(5);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const strokeDashoffset = 126 - (countdown / 5) * 126;

  const getSponsorDetails = () => {
    switch (adStage) {
      case 'ad1':
        return {
          title: '⚡ CRED MAX PAY',
          desc: 'Zero-fee instant settlement and premium rewards engine.',
          badge: 'STAGE 1/3'
        };
      case 'ad2':
        return {
          title: '💎 NEXUS SYNAPSE AI',
          desc: 'High-speed cognitive embeddings for vector distance analysis.',
          badge: 'STAGE 2/3'
        };
      case 'ad3':
        return {
          title: '🌐 QUANTUM CLOUD EDGE',
          desc: 'Sub-millisecond global neural network compute infrastructure.',
          badge: 'STAGE 3/3'
        };
      default:
        return { title: '', desc: '', badge: '' };
    }
  };

  const sponsor = getSponsorDetails();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="w-full max-w-lg glass-panel rounded-2xl p-6 border border-rose-500/40 bg-[#121216]/95 backdrop-blur-xl text-center relative overflow-hidden shadow-[0_0_60px_rgba(255,51,102,0.25)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2 text-rose-500">
              <Eye className="w-5 h-5 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                GATED WORD REVEAL GATE
              </span>
            </div>

            {adStage === 'idle' || adStage === 'revealed' ? (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="touch-target w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-cred-muted hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </div>

          {/* Body Content by Stage */}
          {adStage === 'idle' && (
            <div className="py-3 text-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/40 flex items-center justify-center mx-auto mb-3 text-rose-500 shadow-[0_0_20px_rgba(255,51,102,0.3)]">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1.5 font-sans">
                FORFEIT & REVEAL SECRET WORD?
              </h3>
              <p className="text-xs text-cred-muted max-w-xs mx-auto mb-5 leading-relaxed">
                You have completed <strong className="text-white font-mono">{totalGuesses} guesses</strong> in <strong className="text-white">{themeName}</strong>. 
                Watch a 3-stage non-skippable sponsor ad sequence to unlock the secret target word.
              </p>

              <button
                onClick={startAdSequence}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white font-mono text-xs sm:text-sm font-extrabold tracking-wider shadow-[0_0_25px_rgba(255,51,102,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Unlock className="w-4 h-4" />
                <span>START 3-STAGE REVEAL AD GATE</span>
              </button>
            </div>
          )}

          {(adStage === 'ad1' || adStage === 'ad2' || adStage === 'ad3') && (
            <div className="py-4 text-center">
              {/* Progress Indicator Bar */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${adStage === 'ad1' ? 'bg-[#FF3366] text-white' : 'bg-white/10 text-white/50'}`}>
                  AD 1/3
                </span>
                <span className="text-white/20">➔</span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${adStage === 'ad2' ? 'bg-[#FF3366] text-white' : 'bg-white/10 text-white/50'}`}>
                  AD 2/3
                </span>
                <span className="text-white/20">➔</span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${adStage === 'ad3' ? 'bg-[#FF3366] text-white' : 'bg-white/10 text-white/50'}`}>
                  AD 3/3
                </span>
              </div>

              {/* Sponsor Ad Box */}
              <div className="glass-panel p-5 rounded-2xl border border-rose-500/30 mb-4 relative overflow-hidden bg-[#0D0D12]">
                <div className="flex items-center justify-between text-[11px] font-mono text-cred-subtle mb-3">
                  <span className="flex items-center gap-1 text-rose-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> NON-SKIPPABLE SPONSOR
                  </span>
                  <span className="text-rose-400 font-bold">{sponsor.badge}</span>
                </div>

                <div className="my-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-widest font-mono">
                    {sponsor.title}
                  </div>
                  <p className="text-xs text-cred-muted mt-1 leading-relaxed">
                    {sponsor.desc}
                  </p>
                </div>

                {/* SVG Circular Countdown Ring */}
                <div className="relative w-16 h-16 mx-auto my-4 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 50 50">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="#FF3366"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="126"
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="absolute font-mono text-lg font-bold text-white">
                    {countdown}s
                  </span>
                </div>

                <span className="text-[10px] font-mono text-rose-400 font-semibold block">
                  LOCK ACTIVE — {countdown}s REMAINING IN STAGE
                </span>
              </div>
            </div>
          )}

          {adStage === 'revealed' && (
            <div className="py-3 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/40 text-rose-500 text-xs font-mono font-bold mb-3">
                <AlertTriangle className="w-3.5 h-3.5" /> AD SEQUENCE COMPLETED
              </div>

              {/* Neon Decrypt Target Word Display */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-panel p-5 rounded-2xl border border-rose-500/40 bg-[#0B0B0F] mb-4 text-center"
              >
                <span className="text-[10px] font-mono text-cred-subtle uppercase tracking-widest block mb-1">
                  SECRET TARGET WORD UNVEILED:
                </span>
                <div className="text-3xl font-mono font-extrabold text-[#FF3366] tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,51,102,0.6)]">
                  {targetWord}
                </div>
              </motion.div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-2 mb-5 text-center font-mono">
                <div className="glass-panel p-2.5 rounded-xl border border-white/10">
                  <div className="text-sm font-bold text-white">{totalGuesses}</div>
                  <div className="text-[9px] text-cred-subtle">GUESSES</div>
                </div>
                <div className="glass-panel p-2.5 rounded-xl border border-white/10">
                  <div className="text-sm font-bold text-[#FFB800]">{highestScore}%</div>
                  <div className="text-[9px] text-cred-subtle">PEAK HEAT</div>
                </div>
                <div className="glass-panel p-2.5 rounded-xl border border-white/10">
                  <div className="text-sm font-bold text-white">{formatTime(timeTakenSeconds)}</div>
                  <div className="text-[9px] text-cred-subtle">TIME</div>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onConfirmSurrender();
                }}
                className="w-full py-3.5 rounded-xl bg-cred-card border border-white/15 text-xs font-mono font-bold text-white active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4 text-cred-muted" />
                <span>START NEW MATCH</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
