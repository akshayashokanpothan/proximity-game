import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Lock, X, Play, CheckCircle, Sparkles, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';
import type { DynamicHint } from '../types/game';

interface HintAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedHintsList: DynamicHint[];
  unlockedHintIndex: number; // 0, 1, 2...
  onUnlockNextHint: () => void;
}

export const HintAdModal: React.FC<HintAdModalProps> = ({
  isOpen,
  onClose,
  unlockedHintsList,
  unlockedHintIndex,
  onUnlockNextHint,
}) => {
  const [adStage, setAdStage] = useState<'idle' | 'ad1' | 'ad2' | 'revealed'>('idle');
  const [countdown, setCountdown] = useState<number>(5);
  const [isScratched, setIsScratched] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setAdStage('idle');
      setCountdown(5);
      setIsScratched(false);
    }
  }, [isOpen]);

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
        setAdStage('revealed');
        onUnlockNextHint();
      }
    }
    return () => clearTimeout(timer);
  }, [adStage, countdown, onUnlockNextHint]);

  if (!isOpen) return null;

  const currentHintObj: DynamicHint | undefined = unlockedHintsList[unlockedHintIndex - 1] || unlockedHintsList[unlockedHintsList.length - 1];

  const startAdFlow = () => {
    soundFx.playClick();
    setAdStage('ad1');
    setCountdown(5);
  };

  const strokeDashoffset = 126 - (countdown / 5) * 126;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="w-full max-w-lg glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 bg-[#121216]/95 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden max-h-[90dvh] touch-scroll select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800]">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base tracking-tight font-sans">
                  HELPER CLUE VAULT
                </h3>
                <span className="text-[9px] font-mono text-cred-subtle uppercase">
                  GET A FUN HINT
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="touch-target w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-cred-muted hover:text-white transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Review Earned Clues Accordion */}
          {unlockedHintsList.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full py-2 px-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-[#FFB800]"
              >
                <span>YOUR EARNED CLUES ({unlockedHintsList.length})</span>
                {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-2 mt-2"
                  >
                    {unlockedHintsList.map((hint, idx) => (
                      <div key={idx} className="glass-panel p-2.5 rounded-xl border border-white/10 text-left">
                        <span className="text-[9px] font-mono text-[#00FF66] tracking-widest uppercase font-bold px-1.5 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/30 inline-block mb-1">
                          CLUE #{idx + 1} • {hint.badge}
                        </span>
                        <p className="text-xs font-bold text-white font-sans">
                          {hint.text}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Body Content by Stage */}
          {adStage === 'idle' && (
            <div className="text-center py-2 sm:py-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-purple-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-3 text-[#FFB800] shadow-[0_0_25px_rgba(255,184,0,0.3)]">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 uppercase tracking-wide">
                UNLOCK CLUE #{unlockedHintIndex + 1}
              </h4>
              <p className="text-xs text-cred-muted max-w-xs mx-auto mb-5 leading-relaxed">
                Watch two quick 5-second helper videos to unlock your next clue!
              </p>

              <button
                onClick={startAdFlow}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FF3366] text-black font-mono text-xs sm:text-sm font-extrabold tracking-wider shadow-[0_0_20px_rgba(255,184,0,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>WATCH 2 QUICK VIDEOS (0/2 WATCHED)</span>
              </button>
            </div>
          )}

          {(adStage === 'ad1' || adStage === 'ad2') && (
            <div className="py-4 text-center">
              {/* Sponsor Card */}
              <div className="glass-panel p-4 rounded-2xl border border-white/15 mb-4 relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-cred-subtle mb-2">
                  <span className="flex items-center gap-1 text-[#00FF66]">
                    <ShieldCheck className="w-3.5 h-3.5" /> HELPER VIDEO
                  </span>
                  <span>VIDEO {adStage === 'ad1' ? '1' : '2'} / 2</span>
                </div>

                <div className="my-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-widest font-mono">
                    {adStage === 'ad1' ? '⚡ HELPER VIDEO 1' : '💎 HELPER VIDEO 2'}
                  </div>
                  <p className="text-[11px] text-cred-muted mt-1">
                    Here comes a quick helper video! Your clue unlocks in a few seconds.
                  </p>
                </div>

                {/* SVG Countdown Ring */}
                <div className="relative w-14 h-14 mx-auto my-3 flex items-center justify-center">
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
                      stroke={adStage === 'ad1' ? '#FFB800' : '#00FF66'}
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="126"
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="absolute font-mono text-base font-bold text-white">
                    {countdown}s
                  </span>
                </div>

                <span className="text-[10px] font-mono text-cred-subtle">
                  VIDEO MOVES FORWARD IN {countdown} SECONDS...
                </span>
              </div>
            </div>
          )}

          {adStage === 'revealed' && (
            <div className="py-3 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-bold mb-3">
                <CheckCircle className="w-3.5 h-3.5" /> CLUE READY!
              </div>

              {/* Shimmer Scratch Card Reveal Container */}
              <div className="relative glass-panel p-5 rounded-2xl border border-white/20 overflow-hidden mb-5">
                {!isScratched ? (
                  <div
                    onClick={() => {
                      soundFx.playUnlock();
                      setIsScratched(true);
                    }}
                    className="cursor-pointer active:scale-98 py-5 flex flex-col items-center justify-center bg-gradient-to-r from-purple-900/40 via-cred-card to-amber-900/40 rounded-xl border border-white/10"
                  >
                    <Sparkles className="w-7 h-7 text-[#FFB800] mb-1.5 animate-bounce" />
                    <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                      TAP TO SEE YOUR CLUE
                    </span>
                    <span className="text-[9px] font-mono text-cred-subtle mt-0.5">
                      SCRATCH TO REVEAL
                    </span>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-3"
                  >
                    {currentHintObj && (
                      <span className="text-[10px] font-mono text-[#00FF66] tracking-widest uppercase font-bold px-2 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/30 inline-block mb-2">
                        {currentHintObj.badge}
                      </span>
                    )}
                    <p className="text-sm sm:text-base font-bold text-white font-sans leading-relaxed">
                      {currentHintObj ? currentHintObj.text : 'Clue unlocked!'}
                    </p>
                  </motion.div>
                )}
              </div>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-cred-card border border-white/15 text-xs font-mono font-bold text-white active:scale-95 transition-all min-h-[44px]"
              >
                BACK TO GAME
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
