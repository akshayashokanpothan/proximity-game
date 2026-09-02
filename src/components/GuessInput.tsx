import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';
import type { VisualMode } from '../types/game';

interface GuessInputProps {
  onSubmitGuess: (word: string) => void;
  disabled?: boolean;
  visualMode?: VisualMode;
}

export const GuessInput: React.FC<GuessInputProps> = ({
  onSubmitGuess,
  disabled = false,
  visualMode = 'graphics',
}) => {
  const isMinimal = visualMode === 'minimal';
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || disabled) return;

    soundFx.playSubmit();
    onSubmitGuess(inputValue.trim());
    setInputValue('');
  };

  const handleFocus = () => {
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg mx-auto my-3">
      <div className={`relative flex items-center p-1.5 rounded-2xl border transition-all duration-200 ${
        isMinimal
          ? 'bg-white border-neutral-300 focus-within:border-neutral-500 focus-within:ring-1 focus-within:ring-neutral-400 shadow-xs'
          : 'glass-panel border-white/15 focus-within:border-[#00FF66] focus-within:shadow-[0_0_20px_rgba(0,255,102,0.25)]'
      }`}>
        <div className={`pl-3 shrink-0 ${isMinimal ? 'text-neutral-400' : 'text-cred-muted'}`}>
          <Sparkles className={`w-4 h-4 ${isMinimal ? 'text-neutral-700' : 'text-[#00FF66] animate-pulse'}`} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          disabled={disabled}
          placeholder="TYPE YOUR GUESS HERE..."
          className={`w-full bg-transparent px-3 py-3 text-sm sm:text-base font-mono tracking-wider font-bold outline-none uppercase min-h-[44px] ${
            isMinimal ? 'text-neutral-900 placeholder-neutral-400' : 'text-white placeholder-cred-subtle'
          }`}
        />

        <motion.button
          whileTap={{ scale: 0.96 }}
          type="submit"
          disabled={!inputValue.trim() || disabled}
          className={`touch-target px-4 py-3 rounded-xl font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all shrink-0 min-h-[44px] ${
            inputValue.trim() && !disabled
              ? isMinimal
                ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-xs cursor-pointer'
                : 'bg-[#00FF66] text-[#08080A] shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer'
              : isMinimal
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
                : 'bg-white/5 text-cred-subtle cursor-not-allowed border border-white/5'
          }`}
        >
          <span>GUESS!</span>
          <Send className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </form>
  );
};
