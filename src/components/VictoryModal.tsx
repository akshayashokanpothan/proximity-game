import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Clock, Target, Flame, Copy, Check } from 'lucide-react';
import { launchVictoryConfetti } from '../utils/confetti';
import { soundFx } from '../utils/soundEngine';

interface VictoryModalProps {
  isOpen: boolean;
  targetWord: string;
  themeName: string;
  totalGuesses: number;
  timeTakenSeconds: number;
  guessHistoryScores: number[];
  onPlayAgain: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  targetWord,
  themeName,
  totalGuesses,
  timeTakenSeconds,
  guessHistoryScores,
  onPlayAgain,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      soundFx.playWin();
      launchVictoryConfetti();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleCopyShare = () => {
    soundFx.playClick();
    const historySnippet = guessHistoryScores.slice(-5).map(s => `${s}%`).join(' ➔ ');
    const shareText = 
`🎉 WOW! I WON THE SECRET WORD GAME!
🎯 Topic: [${themeName.toUpperCase()}]
🏆 Secret Word: ${targetWord.toUpperCase()}
🔥 Found in ${totalGuesses} guesses (${formatTime(timeTakenSeconds)})!
📈 Temperature Path: ${historySnippet}
✨ Play the Secret Word Game now!`;

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const points = guessHistoryScores.map((score, index) => {
    const x = (index / Math.max(1, guessHistoryScores.length - 1)) * 260 + 20;
    const y = 80 - (score / 100) * 60;
    return `${x},${y}`;
  }).join(' ');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-[#00FF66]/30 shadow-[0_0_80px_rgba(0,255,102,0.25)] text-center relative overflow-hidden"
        >
          {/* Top Decorative Banner */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FF66] via-[#00F0FF] to-[#8B5CF6]" />

          {/* Trophy Icon */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#00FF66]/20 to-[#00F0FF]/20 border border-[#00FF66]/50 flex items-center justify-center mx-auto mb-4 text-[#00FF66] shadow-[0_0_35px_rgba(0,255,102,0.4)]">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          {/* Title Header */}
          <span className="text-xs font-mono tracking-widest text-[#00FF66] uppercase font-bold px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 inline-block mb-2">
            🎉 WOW! YOU WON!
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans mb-1">
            YOU FOUND THE SECRET WORD <span className="text-[#00FF66]">{targetWord}</span>!
          </h2>
          <p className="text-xs text-cred-muted font-sans mb-6">
            Topic: <strong className="text-white">{themeName}</strong>
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="glass-panel p-3 rounded-2xl border border-white/10 text-center">
              <Target className="w-4 h-4 text-[#00FF66] mx-auto mb-1" />
              <div className="text-lg font-extrabold font-mono text-white">{totalGuesses}</div>
              <div className="text-[10px] font-mono text-cred-subtle uppercase">GUESSES</div>
            </div>
            <div className="glass-panel p-3 rounded-2xl border border-white/10 text-center">
              <Clock className="w-4 h-4 text-[#00F0FF] mx-auto mb-1" />
              <div className="text-lg font-extrabold font-mono text-white">{formatTime(timeTakenSeconds)}</div>
              <div className="text-[10px] font-mono text-cred-subtle uppercase">TIME TAKEN</div>
            </div>
            <div className="glass-panel p-3 rounded-2xl border border-white/10 text-center">
              <Flame className="w-4 h-4 text-[#FF3366] mx-auto mb-1" />
              <div className="text-lg font-extrabold font-mono text-[#00FF66]">100%</div>
              <div className="text-[10px] font-mono text-cred-subtle uppercase">HOTTEST!</div>
            </div>
          </div>

          {/* Temperature Progression SVG Chart */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-6 text-left">
            <div className="flex items-center justify-between text-xs font-mono text-cred-subtle mb-2">
              <span>TEMPERATURE TRAJECTORY</span>
              <span className="text-[#00FF66]">COLD ➔ 100% HOT</span>
            </div>
            <div className="w-full h-24 bg-[#0B0B0F] rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center p-2">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                
                {guessHistoryScores.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="#00FF66"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                    style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,102,0.6))' }}
                  />
                )}

                {guessHistoryScores.map((score, idx) => {
                  const x = (idx / Math.max(1, guessHistoryScores.length - 1)) * 260 + 20;
                  const y = 80 - (score / 100) * 60;
                  return (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={score === 100 ? '#00FF66' : '#FFB800'}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleCopyShare}
              className="w-full py-4 rounded-xl bg-[#00FF66] text-[#08080A] font-mono text-sm font-extrabold tracking-wider shadow-[0_0_25px_rgba(0,255,102,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED TO SHARE!' : 'SHARE YOUR WIN'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onPlayAgain();
              }}
              className="w-full py-3.5 rounded-xl bg-cred-card border border-white/15 text-xs font-mono font-bold text-white hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-cred-muted" />
              <span>PLAY AGAIN!</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
