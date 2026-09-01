import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-5 border-t border-white/5 bg-[#08080A]/80 backdrop-blur-md select-none">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-white/40">
        <div className="flex items-center gap-1.5 tracking-wider">
          <Terminal className="w-3.5 h-3.5 text-[#00FF66]" />
          <span>ORBIT ENGINE v1.0 // SEMANTIC GRAVITY</span>
        </div>

        <div className="flex items-center gap-1.5 font-semibold text-white/50 hover:text-white/90 transition-colors cursor-default">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB800] animate-pulse" />
          <span>Vibecoded by <strong className="text-white tracking-wide">Akshay Ashokan Pothan</strong></span>
        </div>
      </div>
    </footer>
  );
};
