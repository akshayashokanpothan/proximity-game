import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface GuessInputProps {
  onSubmitGuess: (word: string) => void;
  disabled?: boolean;
}

export const GuessInput: React.FC<GuessInputProps> = ({
  onSubmitGuess,
  disabled = false,
}) => {
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
    // Scroll input smoothly into view when mobile virtual keyboard opens
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg mx-auto my-3">
      <div className="relative flex items-center glass-panel p-1.5 rounded-2xl border border-white/15 focus-within:border-[#00FF66] focus-within:shadow-[0_0_20px_rgba(0,255,102,0.25)] transition-all duration-300">
        <div className="pl-3 text-cred-muted shrink-0">
          <Sparkles className="w-4 h-4 text-[#00FF66] animate-pulse" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          disabled={disabled}
          placeholder="TYPE A WORD (e.g. WHISK, STAR)..."
          className="w-full bg-transparent px-3 py-3 text-sm sm:text-base font-mono tracking-wider font-bold text-white placeholder-cred-subtle outline-none uppercase min-h-[44px]"
        />

        <motion.button
          whileTap={{ scale: 0.94 }}
          type="submit"
          disabled={!inputValue.trim() || disabled}
          className={`touch-target px-4 py-3 rounded-xl font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all shrink-0 min-h-[44px] ${
            inputValue.trim() && !disabled
              ? 'bg-[#00FF66] text-[#08080A] shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer'
              : 'bg-white/5 text-cred-subtle cursor-not-allowed border border-white/5'
          }`}
        >
          <span>SUBMIT</span>
          <Send className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </form>
  );
};
