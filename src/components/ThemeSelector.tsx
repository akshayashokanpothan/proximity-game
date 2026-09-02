import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, PlusCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import type { Theme, VisualMode } from '../types/game';
import { DEFAULT_THEMES, createCustomTheme } from '../utils/semanticEngine';
import { soundFx } from '../utils/soundEngine';

interface ThemeSelectorProps {
  onSelectTheme: (theme: Theme) => void;
  activeTheme: Theme | null;
  visualMode?: VisualMode;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  onSelectTheme,
  activeTheme,
  visualMode = 'graphics',
}) => {
  const isMinimal = visualMode === 'minimal';
  const [selectedThemeId, setSelectedThemeId] = useState<string>(
    activeTheme ? activeTheme.id : DEFAULT_THEMES[0].id
  );
  const [customInput, setCustomInput] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  const handleChipSelect = (theme: Theme) => {
    soundFx.playClick();
    setSelectedThemeId(theme.id);
    setIsCustomMode(false);
  };

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const customTheme = createCustomTheme(customInput);
    soundFx.playClick();
    setSelectedThemeId(customTheme.id);
    setIsCustomMode(true);
  };

  const handleLaunchMatch = () => {
    soundFx.playSubmit();
    let themeToStart: Theme;
    if (isCustomMode && customInput.trim()) {
      themeToStart = createCustomTheme(customInput);
    } else {
      const found = DEFAULT_THEMES.find((t) => t.id === selectedThemeId);
      themeToStart = found || DEFAULT_THEMES[0];
    }
    onSelectTheme(themeToStart);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 sm:py-10">
      {/* Hero Welcome Header */}
      <div className="text-center mb-6 sm:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-3 ${
            isMinimal ? 'bg-neutral-100 border-neutral-200 text-neutral-700' : 'bg-cred-card border-white/10 text-cred-muted shadow-[0_0_20px_rgba(0,255,102,0.15)]'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${isMinimal ? 'text-neutral-700' : 'text-[#00FF66]'}`} />
          <span className="text-xs font-mono tracking-wider uppercase font-semibold">
            FUN SECRET WORD FINDER
          </span>
        </motion.div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-sans mb-2 ${
          isMinimal ? 'text-neutral-900' : 'text-white'
        }`}>
          CAN YOU FIND THE <span className={isMinimal ? 'text-neutral-600 underline decoration-neutral-300' : 'text-metallic'}>SECRET WORD?</span>
        </h2>
        <p className={`text-xs sm:text-base max-w-lg mx-auto font-sans leading-relaxed ${
          isMinimal ? 'text-neutral-500' : 'text-cred-muted'
        }`}>
          Type words to see how close you are. The warmer you get, the closer you are!
        </p>
      </div>

      {/* CUTE 3-STEP EASY INSTRUCTION BANNER */}
      <div className={`p-4 sm:p-5 rounded-2xl mb-8 max-w-3xl mx-auto border transition-colors ${
        isMinimal ? 'bg-neutral-50 border-neutral-200/80' : 'glass-panel border-[#00FF66]/20 bg-[#0E1310]/80'
      }`}>
        <div className={`flex items-center gap-2 mb-3 font-mono text-xs font-bold uppercase tracking-wider ${
          isMinimal ? 'text-neutral-800' : 'text-[#00FF66]'
        }`}>
          <HelpCircle className="w-4 h-4" />
          <span>HOW TO PLAY IN 3 EASY STEPS:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
            isMinimal ? 'bg-white border-neutral-200 shadow-xs' : 'glass-panel border-white/10'
          }`}>
            <span className="text-xl">🎨</span>
            <div>
              <h4 className={`text-xs font-bold mb-0.5 ${isMinimal ? 'text-neutral-900' : 'text-white'}`}>1. Pick a Topic</h4>
              <p className={`text-[11px] leading-tight ${isMinimal ? 'text-neutral-500' : 'text-cred-muted'}`}>Choose animals, kitchen, or type your own topic!</p>
            </div>
          </div>
          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
            isMinimal ? 'bg-white border-neutral-200 shadow-xs' : 'glass-panel border-white/10'
          }`}>
            <span className="text-xl">🌡️</span>
            <div>
              <h4 className={`text-xs font-bold mb-0.5 ${isMinimal ? 'text-neutral-900' : 'text-white'}`}>2. Check Temperature</h4>
              <p className={`text-[11px] leading-tight ${isMinimal ? 'text-neutral-500' : 'text-cred-muted'}`}>Guesses show if you are 🥶 Cold or 🔥 Super Hot!</p>
            </div>
          </div>
          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
            isMinimal ? 'bg-white border-neutral-200 shadow-xs' : 'glass-panel border-white/10'
          }`}>
            <span className="text-xl">🎯</span>
            <div>
              <h4 className={`text-xs font-bold mb-0.5 ${isMinimal ? 'text-neutral-900' : 'text-white'}`}>3. Find Secret Word</h4>
              <p className={`text-[11px] leading-tight ${isMinimal ? 'text-neutral-500' : 'text-cred-muted'}`}>Keep guessing until you hit 100% to win!</p>
            </div>
          </div>
        </div>
      </div>

      {/* 1. PRIMARY ENTRY POINT: Custom Theme Input Field (AT THE TOP) */}
      <div className={`p-5 sm:p-6 rounded-2xl mb-8 max-w-3xl mx-auto border ${
        isMinimal
          ? 'bg-white border-neutral-200 shadow-xs'
          : 'glass-panel border-[#00F0FF]/30 shadow-[0_0_25px_rgba(0,240,255,0.15)]'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PlusCircle className={`w-4 h-4 ${isMinimal ? 'text-neutral-700' : 'text-[#00F0FF]'}`} />
            <h3 className={`text-xs sm:text-sm font-bold tracking-wide uppercase font-sans ${
              isMinimal ? 'text-neutral-900' : 'text-white'
            }`}>
              Type Any Topic You Like!
            </h3>
          </div>
          <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
            isMinimal ? 'text-neutral-500' : 'text-[#00F0FF]'
          }`}>
            YOUR OWN TOPIC
          </span>
        </div>
        <form onSubmit={handleCustomInputSubmit} className="flex gap-3">
          <input
            type="text"
            value={customInput}
            onChange={(e) => {
              setCustomInput(e.target.value);
              if (!isCustomMode) setIsCustomMode(true);
            }}
            placeholder="Type anything like Dinosaurs, Toys, Cartoons..."
            className={`flex-1 rounded-xl px-4 py-3 text-xs sm:text-sm outline-none transition-all font-sans min-h-[44px] ${
              isMinimal
                ? 'bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:bg-white'
                : 'bg-[#0B0B0F] border border-white/15 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] text-white placeholder-cred-subtle'
            }`}
          />
          <button
            type="submit"
            className={`touch-target px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center shrink-0 ${
              isMinimal
                ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-xs'
                : 'bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/25 active:scale-95'
            }`}
          >
            SET TOPIC
          </button>
        </form>
        {isCustomMode && customInput.trim() && (
          <p className={`mt-2.5 text-xs font-mono flex items-center gap-1.5 ${
            isMinimal ? 'text-neutral-700' : 'text-[#00F0FF]'
          }`}>
            <span>✓ Ready to Play:</span>
            <strong className={`uppercase px-2 py-0.5 rounded border ${
              isMinimal ? 'bg-neutral-100 border-neutral-200 text-neutral-900' : 'bg-[#00F0FF]/10 border-[#00F0FF]/30'
            }`}>{customInput}</strong>
          </p>
        )}
      </div>

      {/* 2. SECONDARY SECTION: Curated Theme Chips */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between px-1">
          <span className={`text-xs font-mono tracking-widest uppercase font-bold ${
            isMinimal ? 'text-neutral-500' : 'text-cred-muted'
          }`}>
            Or Choose A Fun Preset Topic ({DEFAULT_THEMES.length})
          </span>
          <span className={`text-xs font-mono ${isMinimal ? 'text-neutral-800' : 'text-[#00FF66]'}`}>
            FUN TOPICS
          </span>
        </div>

        {/* Responsive Grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto touch-scroll snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {DEFAULT_THEMES.map((theme) => {
            const isSelected = !isCustomMode && selectedThemeId === theme.id;
            return (
              <motion.button
                key={theme.id}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleChipSelect(theme)}
                className={`snap-center shrink-0 w-[240px] sm:w-auto relative text-left p-5 rounded-2xl transition-all duration-200 ${
                  isSelected
                    ? isMinimal
                      ? 'bg-white border-2 border-neutral-900 shadow-sm'
                      : 'bg-[#16161E] border-2 border-[#00FF66] shadow-[0_0_30px_rgba(0,255,102,0.25)]'
                    : isMinimal
                      ? 'bg-white border border-neutral-200 shadow-xs hover:border-neutral-300'
                      : 'glass-panel hover:border-white/20'
                }`}
              >
                {isSelected && (
                  <div className={`absolute top-3 right-3 ${isMinimal ? 'text-neutral-900' : 'text-[#00FF66]'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
                <div className="text-3xl mb-3">{theme.icon}</div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-bold text-base tracking-tight ${
                    isMinimal ? 'text-neutral-900' : 'text-white'
                  }`}>
                    {theme.name}
                  </h3>
                </div>
                <p className={`text-xs line-clamp-2 leading-relaxed ${
                  isMinimal ? 'text-neutral-500' : 'text-cred-muted'
                }`}>
                  {theme.description}
                </p>
                <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
                  isMinimal ? 'border-neutral-100' : 'border-white/5'
                }`}>
                  <span className={`text-[10px] font-mono tracking-widest px-2 py-0.5 rounded ${
                    isMinimal ? 'bg-neutral-100 text-neutral-600' : 'bg-white/5 text-white/70'
                  }`}>
                    {theme.badge}
                  </span>
                  <span className={`text-[11px] font-mono font-semibold ${
                    isMinimal ? 'text-neutral-900' : 'text-[#00FF66]'
                  }`}>
                    PLAY THIS ➔
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Initialize Match CTA */}
      <div className="text-center pb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLaunchMatch}
          className={`px-10 py-4 text-sm sm:text-base font-bold font-mono tracking-wider transition-all inline-flex items-center gap-3 active:scale-95 ${
            isMinimal
              ? 'bg-neutral-900 text-white rounded-xl shadow-sm hover:bg-neutral-800'
              : 'gradient-border-btn text-white shadow-2xl'
          }`}
        >
          <Play className={`w-5 h-5 ${isMinimal ? 'text-white fill-white' : 'text-[#00FF66] fill-[#00FF66]'}`} />
          <span>START GAME!</span>
        </motion.button>
      </div>
    </div>
  );
};
