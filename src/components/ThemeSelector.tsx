import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, PlusCircle, CheckCircle2 } from 'lucide-react';
import type { Theme } from '../types/game';
import { DEFAULT_THEMES, createCustomTheme } from '../utils/semanticEngine';
import { soundFx } from '../utils/soundEngine';

interface ThemeSelectorProps {
  onSelectTheme: (theme: Theme) => void;
  activeTheme: Theme | null;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  onSelectTheme,
  activeTheme,
}) => {
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
      <div className="text-center mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cred-card border border-white/10 mb-4 shadow-[0_0_20px_rgba(0,255,102,0.15)]"
        >
          <Sparkles className="w-4 h-4 text-[#00FF66]" />
          <span className="text-xs font-mono tracking-wider text-cred-muted uppercase font-semibold">
            Neo-Luxury Proximity Arena
          </span>
        </motion.div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans mb-3">
          CHOOSE YOUR <span className="text-metallic">SEMANTIC REALM</span>
        </h2>
        <p className="text-xs sm:text-base text-cred-muted max-w-lg mx-auto font-sans leading-relaxed">
          Navigate the vector space of human thought. Enter any custom topic or select a curated preset domain.
        </p>
      </div>

      {/* 1. PRIMARY ENTRY POINT: Custom Theme Input Field (AT THE TOP) */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl mb-8 max-w-3xl mx-auto border border-[#00F0FF]/30 shadow-[0_0_25px_rgba(0,240,255,0.15)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-[#00F0FF]" />
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase font-sans">
              Custom Realm Generator (Primary Entry)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#00F0FF] uppercase tracking-wider font-semibold">
            TYPE ANY TOPIC
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
            placeholder="e.g. Cyberpunk City, 90s Cartoons, Quantum Physics..."
            className="flex-1 bg-[#0B0B0F] border border-white/15 focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-cred-subtle outline-none transition-all font-sans min-h-[44px]"
          />
          <button
            type="submit"
            className="touch-target px-5 py-3 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-xs font-mono font-bold text-[#00F0FF] hover:bg-[#00F0FF]/25 active:scale-95 transition-all flex items-center justify-center shrink-0"
          >
            SET REALM
          </button>
        </form>
        {isCustomMode && customInput.trim() && (
          <p className="mt-2.5 text-xs text-[#00F0FF] font-mono flex items-center gap-1.5">
            <span>✓ Active Custom Realm:</span>
            <strong className="uppercase bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/30">{customInput}</strong>
          </p>
        )}
      </div>

      {/* 2. SECONDARY SECTION: Curated Theme Chips (DIRECTLY BELOW CUSTOM INPUT) */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono tracking-widest text-cred-muted uppercase font-bold">
            Or Choose A Curated Preset Realm ({DEFAULT_THEMES.length})
          </span>
          <span className="text-xs font-mono text-[#00FF66]">
            SUGGESTED DOMAINS
          </span>
        </div>

        {/* Responsive Grid: Mobile Snap Scroll, 2-col on Tablet, 4-col on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto touch-scroll snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {DEFAULT_THEMES.map((theme) => {
            const isSelected = !isCustomMode && selectedThemeId === theme.id;
            return (
              <motion.button
                key={theme.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChipSelect(theme)}
                className={`snap-center shrink-0 w-[240px] sm:w-auto relative text-left p-5 rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#16161E] border-2 border-[#00FF66] shadow-[0_0_30px_rgba(0,255,102,0.25)]'
                    : 'glass-panel hover:border-white/20'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 text-[#00FF66]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
                <div className="text-3xl mb-3">{theme.icon}</div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white text-base tracking-tight">
                    {theme.name}
                  </h3>
                </div>
                <p className="text-xs text-cred-muted line-clamp-2 leading-relaxed">
                  {theme.description}
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-white/5 text-white/70">
                    {theme.badge}
                  </span>
                  <span className="text-[11px] font-mono text-[#00FF66] font-semibold">
                    PLAY ➔
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
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLaunchMatch}
          className="gradient-border-btn px-10 py-4 text-sm sm:text-base font-bold font-mono tracking-wider text-white shadow-2xl inline-flex items-center gap-3 active:scale-95"
        >
          <Play className="w-5 h-5 text-[#00FF66] fill-[#00FF66]" />
          <span>INITIALIZE MATCH</span>
        </motion.button>
      </div>
    </div>
  );
};
