import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';
import type { VisualMode } from '../types/game';

interface FooterProps {
  visualMode?: VisualMode;
}

export const Footer: React.FC<FooterProps> = ({ visualMode = 'graphics' }) => {
  const isMinimal = visualMode === 'minimal';

  return (
    <footer className={`w-full text-center py-6 border-t select-none transition-colors duration-300 ${
      isMinimal
        ? 'border-neutral-200/80 bg-[#FBFBFC]'
        : 'border-white/5 bg-[#08080A]/90 backdrop-blur-md'
    }`}>
      <div className={`max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono ${
        isMinimal ? 'text-neutral-500' : 'text-white/40'
      }`}>
        <div className="flex items-center gap-2 tracking-wider">
          <Terminal className={`w-3.5 h-3.5 ${isMinimal ? 'text-neutral-700' : 'text-[#00FF66]'}`} />
          <span>ORBIT ENGINE v1.0 // SEMANTIC GRAVITY</span>
        </div>

        <div className={`flex items-center gap-2 font-semibold cursor-default transition-colors ${
          isMinimal ? 'text-neutral-500 hover:text-neutral-800' : 'text-white/40 hover:text-white/80'
        }`}>
          <Sparkles className={`w-3.5 h-3.5 ${isMinimal ? 'text-neutral-600' : 'text-[#FFB800] animate-pulse'}`} />
          <span>Vibecoded by <strong className={`font-mono tracking-wide ${isMinimal ? 'text-neutral-900' : 'text-white'}`}>Akshay Ashokan Pothan</strong></span>
        </div>
      </div>
    </footer>
  );
};
