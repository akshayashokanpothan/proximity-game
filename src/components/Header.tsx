import React from 'react';
import { Volume2, VolumeX, Sparkles, Disc, Zap, LayoutGrid } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';
import type { VisualMode } from '../types/game';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  visualMode: VisualMode;
  onToggleVisualMode: () => void;
  attemptsCount: number;
  activeThemeName: string;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  visualMode,
  onToggleVisualMode,
  attemptsCount,
  activeThemeName,
}) => {
  const isMinimal = visualMode === 'minimal';

  return (
    <header className={`w-full max-w-7xl mx-auto px-4 lg:px-8 pt-4 pb-3 flex items-center justify-between border-b select-none transition-colors duration-300 ${
      isMinimal ? 'border-neutral-200/80 bg-[#FBFBFC]' : 'border-white/5'
    }`}>
      {/* Branding & Engine Pill */}
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
          isMinimal
            ? 'bg-neutral-900 text-white shadow-xs'
            : 'bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.3)]'
        }`}>
          <Disc className={`w-4 h-4 ${!isMinimal ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-base sm:text-lg font-bold tracking-tight font-sans ${
              isMinimal ? 'text-neutral-900' : 'text-white'
            }`}>
              SECRET <span className={isMinimal ? 'text-neutral-500 font-normal' : 'text-[#00FF66]'}>WORD GAME</span>
            </h1>
            <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider border rounded-full font-medium ${
              isMinimal ? 'bg-neutral-100 text-neutral-600 border-neutral-200' : 'bg-white/5 text-[#00FF66] border-[#00FF66]/30'
            }`}>
              v1.0
            </span>
          </div>
          <p className={`text-[10px] sm:text-[11px] font-mono font-medium tracking-wider ${
            isMinimal ? 'text-neutral-500' : 'text-cred-muted'
          }`}>
            HOT & COLD WORD FINDER 🎯
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* DUAL VISUAL MODE TOGGLE BUTTON */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleVisualMode();
          }}
          className={`touch-target px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all flex items-center gap-1.5 active:scale-95 shrink-0 ${
            !isMinimal
              ? 'bg-[#00FF66]/15 border border-[#00FF66]/40 text-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.25)]'
              : 'bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50 shadow-xs'
          }`}
          title="Toggle between Neon Cyber & Modern Minimal Mode"
        >
          {!isMinimal ? (
            <>
              <Zap className="w-3.5 h-3.5 fill-[#00FF66]" />
              <span className="hidden sm:inline">⚡ NEON CYBER</span>
              <span className="sm:hidden">NEON</span>
            </>
          ) : (
            <>
              <LayoutGrid className="w-3.5 h-3.5 text-neutral-600" />
              <span className="hidden sm:inline">◻ MODERN MINIMAL</span>
              <span className="sm:hidden">MINIMAL</span>
            </>
          )}
        </button>

        {activeThemeName && (
          <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border ${
            isMinimal ? 'bg-white border-neutral-200 text-neutral-700 shadow-xs' : 'bg-cred-card border-white/10 text-cred-subtle'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isMinimal ? 'text-neutral-500' : 'text-[#FFB800]'}`} />
            <span className={`font-medium ${isMinimal ? 'text-neutral-900' : 'text-white'}`}>{activeThemeName}</span>
          </div>
        )}

        {attemptsCount > 0 && (
          <div className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold border ${
            isMinimal ? 'bg-neutral-100 border-neutral-200 text-neutral-800' : 'bg-[#1A1A22] border-white/10 text-[#00FF66]'
          }`}>
            {String(attemptsCount).padStart(2, '0')} GUESSES
          </div>
        )}

        <button
          onClick={() => {
            soundFx.playClick();
            onToggleSound();
          }}
          className={`touch-target w-9 h-9 rounded-lg border transition-colors flex items-center justify-center shrink-0 ${
            isMinimal ? 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 shadow-xs' : 'bg-cred-card border-white/10 text-cred-muted hover:text-white'
          }`}
          title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          aria-label={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
        >
          {soundEnabled ? (
            <Volume2 className={`w-4 h-4 ${isMinimal ? 'text-neutral-800' : 'text-[#00FF66]'}`} />
          ) : (
            <VolumeX className="w-4 h-4 text-rose-500" />
          )}
        </button>
      </div>
    </header>
  );
};
