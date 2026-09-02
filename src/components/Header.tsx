import React from 'react';
import { Volume2, VolumeX, Sparkles, Disc, Zap, Leaf } from 'lucide-react';
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
  return (
    <header className={`w-full max-w-7xl mx-auto px-4 lg:px-8 pt-4 pb-3 flex items-center justify-between border-b select-none transition-colors duration-300 ${
      visualMode === 'minimal' ? 'border-neutral-800 bg-[#121214]' : 'border-white/5'
    }`}>
      {/* Branding & Engine Pill */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
          visualMode === 'minimal'
            ? 'bg-neutral-800 border border-neutral-700 text-neutral-300'
            : 'bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.3)]'
        }`}>
          <Disc className={`w-5 h-5 ${visualMode === 'graphics' ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-extrabold tracking-wide text-white font-sans">
              SECRET <span className={visualMode === 'minimal' ? 'text-neutral-300' : 'text-[#00FF66]'}>WORD GAME</span>
            </h1>
            <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider border rounded-full font-semibold ${
              visualMode === 'minimal' ? 'bg-neutral-800 text-neutral-400 border-neutral-700' : 'bg-white/5 text-[#00FF66] border-[#00FF66]/30'
            }`}>
              v1.0
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-cred-muted font-mono font-semibold tracking-wider">
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
          className={`touch-target px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shrink-0 ${
            visualMode === 'graphics'
              ? 'bg-[#00FF66]/15 border border-[#00FF66]/40 text-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.25)]'
              : 'bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700'
          }`}
          title="Toggle between Heavy Graphics & Calm Minimal Mode"
        >
          {visualMode === 'graphics' ? (
            <>
              <Zap className="w-3.5 h-3.5 fill-[#00FF66]" />
              <span className="hidden sm:inline">⚡ HEAVY</span>
              <span className="sm:hidden">HEAVY</span>
            </>
          ) : (
            <>
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">🌿 MINIMAL</span>
              <span className="sm:hidden">MINIMAL</span>
            </>
          )}
        </button>

        {activeThemeName && (
          <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border ${
            visualMode === 'minimal' ? 'bg-neutral-800/80 border-neutral-700 text-neutral-300' : 'bg-cred-card border-white/10 text-cred-subtle'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span className="text-white font-medium">{activeThemeName}</span>
          </div>
        )}

        {attemptsCount > 0 && (
          <div className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${
            visualMode === 'minimal' ? 'bg-neutral-800 border-neutral-700 text-neutral-200' : 'bg-[#1A1A22] border-white/10 text-[#00FF66]'
          }`}>
            {String(attemptsCount).padStart(2, '0')} GUESSES
          </div>
        )}

        <button
          onClick={() => {
            soundFx.playClick();
            onToggleSound();
          }}
          className={`touch-target w-10 h-10 rounded-xl border transition-colors flex items-center justify-center shrink-0 ${
            visualMode === 'minimal' ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white' : 'bg-cred-card border-white/10 text-cred-muted hover:text-white'
          }`}
          title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          aria-label={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
        >
          {soundEnabled ? (
            <Volume2 className={`w-5 h-5 ${visualMode === 'minimal' ? 'text-neutral-200' : 'text-[#00FF66]'}`} />
          ) : (
            <VolumeX className="w-5 h-5 text-rose-500" />
          )}
        </button>
      </div>
    </header>
  );
};
