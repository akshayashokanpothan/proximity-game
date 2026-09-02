export type ScoreTier = 'freezing' | 'lukewarm' | 'hot' | 'extreme' | 'target';

export type VisualMode = 'graphics' | 'minimal';

export interface Guess {
  id: string;
  word: string;
  score: number; // 0 to 100
  tier: ScoreTier;
  rank: number; // 1 is target, higher is further away
  previousRank?: number;
  rankChange?: number; // e.g. +3 means moved up 3 ranks, -1 means dropped
  timestamp: number;
}

export interface Theme {
  id: string;
  name: string;
  icon: string;
  targetWord: string;
  description: string;
  badge: string;
  preloadedWords: Record<string, number>; // word -> proximity score (0-100)
  clues: string[];
}

export type HintArchetype = 'LETTER_REVEAL' | 'PHONETIC_PATTERN' | 'CRYPTIC_RIDDLE' | 'RHYME_STRUCTURE' | 'VECTOR_AFFINITY';

export interface DynamicHint {
  archetype: HintArchetype;
  badge: string;
  text: string;
}

export interface GameStats {
  totalGuesses: number;
  timeTakenSeconds: number;
  highestHeat: number;
  historyScores: number[];
}

export interface SavedSession {
  activeTheme: Theme;
  guesses: Guess[];
  isWon: boolean;
  isSurrendered: boolean;
  unlockedHintIndex: number;
  unlockedHintsList?: DynamicHint[];
  lastHintGuessCount?: number;
  startTime: number;
  endTime: number;
}
