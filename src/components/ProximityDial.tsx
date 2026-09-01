import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ShieldAlert, Zap, Snowflake } from 'lucide-react';
import { getScoreTier, getTierColor } from '../utils/semanticEngine';
import type { ScoreTier } from '../types/game';

interface ProximityDialProps {
  score: number; // 0 to 100
  latestWord?: string;
}

export const ProximityDial: React.FC<ProximityDialProps> = ({
  score,
  latestWord,
}) => {
  const [displayScore, setDisplayScore] = useState<number>(0);
  const tier: ScoreTier = getScoreTier(score);
  const color = getTierColor(tier);

  // Animated number count-up effect
  useEffect(() => {
    let start = displayScore;
    const end = score;
    if (start === end) return;

    const duration = 600; // ms
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.round(start + (end - start) * progress);
      setDisplayScore(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [score]);

  // SVG Radial Circle geometry
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getTierIcon = () => {
    switch (tier) {
      case 'target': return <Zap className="w-5 h-5 text-[#00FF66] animate-bounce" />;
      case 'extreme': return <Flame className="w-5 h-5 text-[#EC4899] animate-pulse" />;
      case 'hot': return <Flame className="w-5 h-5 text-[#F97316]" />;
      case 'lukewarm': return <ShieldAlert className="w-5 h-5 text-[#F59E0B]" />;
      case 'freezing': return <Snowflake className="w-5 h-5 text-[#3B82F6]" />;
    }
  };

  const getTierLabel = () => {
    switch (tier) {
      case 'target': return 'TARGET HIT 🎯';
      case 'extreme': return 'EXTREME HEAT 🔥';
      case 'hot': return 'HOT & CLOSE ⚡';
      case 'lukewarm': return 'LUKEWARM 🌤️';
      case 'freezing': return 'FREEZING COLD ❄️';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-4">
      {/* Dial Glass Outer Ring */}
      <div className="relative w-44 h-44 flex items-center justify-center rounded-full glass-panel p-2 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        {/* SVG Arc Progress Bar */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background Ring */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Progress Glowing Ring */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0 0 10px ${color})`,
              transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.6s ease'
            }}
          />
        </svg>

        {/* Dial Center Content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 mb-0.5">
            {getTierIcon()}
          </div>
          <div className="text-4xl font-extrabold font-mono tracking-tight text-white drop-shadow-md">
            {displayScore}<span className="text-xl text-cred-muted">%</span>
          </div>
          <span
            className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full mt-1 uppercase"
            style={{
              color: color,
              backgroundColor: `${color}15`,
              border: `1px solid ${color}40`,
            }}
          >
            {getTierLabel()}
          </span>
        </div>
      </div>

      {/* Latest Word Tag */}
      {latestWord && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-xs font-mono text-cred-muted flex items-center gap-2"
        >
          <span>LAST GUESS:</span>
          <span className="text-white font-bold uppercase tracking-wider px-2 py-0.5 bg-white/5 rounded border border-white/10">
            {latestWord}
          </span>
        </motion.div>
      )}
    </div>
  );
};
