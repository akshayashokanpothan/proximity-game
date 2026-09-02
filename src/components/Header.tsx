import React from 'react';
import { Volume2, VolumeX, Sparkles, Disc } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  attemptsCount: number;
  activeThemeName: string;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  attemptsCount,
  activeThemeName,
}) => {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 lg:px-8 pt-4 pb-3 flex items-center justify-between border-b border-white/5 select-none">
      {/* Branding & Engine Pill */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.3)] shrink-0">
          <Disc className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-extrabold tracking-wide text-white font-sans">
              SECRET <span className="text-[#00FF66]">WORD GAME</span>
            </h1>
            <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider bg-white/5 text-[#00FF66] border border-[#00FF66]/30 rounded-full font-semibold">
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
        {activeThemeName && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cred-card border border-white/10 text-xs font-mono text-cred-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span className="text-white font-medium">{activeThemeName}</span>
          </div>
        )}

        {attemptsCount > 0 && (
          <div className="px-3 py-1.5 rounded-full bg-[#1A1A22] border border-white/10 text-xs font-mono text-[#00FF66] font-bold">
            {String(attemptsCount).padStart(2, '0')} GUESSES
          </div>
        )}

        <button
          onClick={() => {
            soundFx.playClick();
            onToggleSound();
          }}
          className="touch-target w-10 h-10 rounded-xl bg-cred-card border border-white/10 text-cred-muted hover:text-white active:scale-95 transition-all flex items-center justify-center shrink-0"
          title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
          aria-label={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-[#00FF66]" />
          ) : (
            <VolumeX className="w-5 h-5 text-rose-500" />
          )}
        </button>
      </div>
    </header>
  );
};
