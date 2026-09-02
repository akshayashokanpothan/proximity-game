import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Clock, Target, Flame, Copy, Check } from 'lucide-react';
import { launchVictoryConfetti } from '../utils/confetti';
import { soundFx } from '../utils/soundEngine';
import type { VisualMode } from '../types/game';

interface VictoryModalProps {
  isOpen: boolean;
  targetWord: string;
  themeName: string;
  totalGuesses: number;
  timeTakenSeconds: number;
  guessHistoryScores: number[];
  onPlayAgain: () => void;
  visualMode?: VisualMode;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  targetWord,
  themeName,
  totalGuesses,
  timeTakenSeconds,
  guessHistoryScores,
  onPlayAgain,
  visualMode = 'graphics',
}) => {
  const isMinimal = visualMode === 'minimal';
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      soundFx.playWin();
      if (!isMinimal) {
        launchVictoryConfetti();
      }
    }
  }, [isOpen, isMinimal]);

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`w-full max-w-lg rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden border ${
            isMinimal
              ? 'bg-white border-neutral-200 text-neutral-900 shadow-xl'
              : 'glass-panel border-[#00FF66]/30 shadow-[0_0_80px_rgba(0,255,102,0.25)]'
          }`}
        >
          {/* Top Decorative Banner */}
          {!isMinimal && <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FF66] via-[#00F0FF] to-[#8B5CF6]" />}

          {/* Trophy Icon */}
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
            isMinimal
              ? 'bg-neutral-100 border-neutral-200 text-neutral-900 shadow-xs'
              : 'bg-gradient-to-tr from-[#00FF66]/20 to-[#00F0FF]/20 border-[#00FF66]/50 text-[#00FF66] shadow-[0_0_35px_rgba(0,255,102,0.4)]'
          }`}>
            <Trophy className={`w-8 h-8 ${!isMinimal ? 'animate-bounce' : ''}`} />
          </div>

          {/* Title Header */}
          <span className={`text-xs font-mono tracking-widest uppercase font-bold px-3 py-1 rounded-full border inline-block mb-2 ${
            isMinimal ? 'bg-neutral-100 border-neutral-200 text-neutral-700' : 'bg-[#00FF66]/10 border-[#00FF66]/30 text-[#00FF66]'
          }`}>
            🎉 TARGET FOUND!
          </span>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-sans mb-1 ${
            isMinimal ? 'text-neutral-900' : 'text-white'
          }`}>
            SECRET WORD WAS <span className={isMinimal ? 'text-neutral-900 underline decoration-neutral-400' : 'text-[#00FF66]'}>{targetWord}</span>
          </h2>
          <p className={`text-xs font-sans mb-6 ${isMinimal ? 'text-neutral-500' : 'text-cred-muted'}`}>
            Topic: <strong className={isMinimal ? 'text-neutral-900' : 'text-white'}>{themeName}</strong>
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className={`p-3 rounded-xl border text-center ${isMinimal ? 'bg-neutral-50 border-neutral-200' : 'glass-panel border-white/10'}`}>
              <Target className={`w-4 h-4 mx-auto mb-1 ${isMinimal ? 'text-neutral-700' : 'text-[#00FF66]'}`} />
              <div className={`text-lg font-extrabold font-mono ${isMinimal ? 'text-neutral-900' : 'text-white'}`}>{totalGuesses}</div>
              <div className={`text-[10px] font-mono uppercase ${isMinimal ? 'text-neutral-500' : 'text-cred-subtle'}`}>GUESSES</div>
            </div>
            <div className={`p-3 rounded-xl border text-center ${isMinimal ? 'bg-neutral-50 border-neutral-200' : 'glass-panel border-white/10'}`}>
              <Clock className={`w-4 h-4 mx-auto mb-1 ${isMinimal ? 'text-neutral-700' : 'text-[#00F0FF]'}`} />
              <div className={`text-lg font-extrabold font-mono ${isMinimal ? 'text-neutral-900' : 'text-white'}`}>{formatTime(timeTakenSeconds)}</div>
              <div className={`text-[10px] font-mono uppercase ${isMinimal ? 'text-neutral-500' : 'text-cred-subtle'}`}>TIME</div>
            </div>
            <div className={`p-3 rounded-xl border text-center ${isMinimal ? 'bg-neutral-50 border-neutral-200' : 'glass-panel border-white/10'}`}>
              <Flame className={`w-4 h-4 mx-auto mb-1 ${isMinimal ? 'text-neutral-700' : 'text-[#FF3366]'}`} />
              <div className={`text-lg font-extrabold font-mono ${isMinimal ? 'text-neutral-900' : 'text-[#00FF66]'}`}>100%</div>
              <div className={`text-[10px] font-mono uppercase ${isMinimal ? 'text-neutral-500' : 'text-cred-subtle'}`}>SCORE</div>
            </div>
          </div>

          {/* Temperature Progression SVG Chart */}
          <div className={`p-4 rounded-xl border mb-6 text-left ${isMinimal ? 'bg-neutral-50 border-neutral-200' : 'glass-panel border-white/10'}`}>
            <div className={`flex items-center justify-between text-xs font-mono mb-2 ${isMinimal ? 'text-neutral-500' : 'text-cred-subtle'}`}>
              <span>GUESS TRAJECTORY</span>
              <span className={isMinimal ? 'text-neutral-900 font-semibold' : 'text-[#00FF66]'}>0% ➔ 100%</span>
            </div>
            <div className={`w-full h-24 rounded-lg border relative overflow-hidden flex items-center justify-center p-2 ${
              isMinimal ? 'bg-white border-neutral-200' : 'bg-[#0B0B0F] border-white/5'
            }`}>
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="300" y2="20" stroke={isMinimal ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'} strokeDasharray="4" />
                <line x1="0" y1="50" x2="300" y2="50" stroke={isMinimal ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'} strokeDasharray="4" />
                <line x1="0" y1="80" x2="300" y2="80" stroke={isMinimal ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)'} strokeDasharray="4" />
                
                {guessHistoryScores.length > 1 && (
                  <polyline
                    fill="none"
                    stroke={isMinimal ? '#171717' : '#00FF66'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
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
                      r="3.5"
                      fill={score === 100 ? (isMinimal ? '#171717' : '#00FF66') : '#909090'}
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
              className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
                isMinimal
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-xs'
                  : 'bg-[#00FF66] text-[#08080A] shadow-[0_0_25px_rgba(0,255,102,0.4)] hover:brightness-110 active:scale-95'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED TO SHARE!' : 'SHARE YOUR WIN'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onPlayAgain();
              }}
              className={`w-full py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                isMinimal
                  ? 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-xs'
                  : 'bg-cred-card border-white/15 text-white hover:bg-white/10 active:scale-95'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>PLAY AGAIN!</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
