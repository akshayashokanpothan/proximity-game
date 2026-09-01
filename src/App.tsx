import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { ThemeSelector } from './components/ThemeSelector';
import { ProximityDial } from './components/ProximityDial';
import { GuessInput } from './components/GuessInput';
import { ProximityStream } from './components/ProximityStream';
import { HintAdModal } from './components/HintAdModal';
import { VictoryModal } from './components/VictoryModal';
import { RevealAdModal } from './components/RevealAdModal';
import type { Theme, Guess, ScoreTier, DynamicHint, SavedSession } from './types/game';
import { calculateSemanticScore, getScoreTier } from './utils/semanticEngine';
import { getNonRepeatingTargetWord, generateRandomHint } from './data/themeDatabase';
import { soundFx } from './utils/soundEngine';
import { Gift, ArrowLeft, RotateCcw, Lock, Unlock } from 'lucide-react';

const STORAGE_KEY = 'proximity_engine_session_v1';

export default function App() {
  const [screen, setScreen] = useState<'selector' | 'gameplay'>('selector');
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isSurrendered, setIsSurrendered] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Dynamic Hints & Modals
  const [isHintModalOpen, setIsHintModalOpen] = useState<boolean>(false);
  const [isRevealModalOpen, setIsRevealModalOpen] = useState<boolean>(false);
  const [unlockedHintIndex, setUnlockedHintIndex] = useState<number>(0);
  const [unlockedHintsList, setUnlockedHintsList] = useState<DynamicHint[]>([]);

  // Timers
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  // Restore session from LocalStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: SavedSession = JSON.parse(raw);
        if (saved.activeTheme) {
          setActiveTheme(saved.activeTheme);
          setGuesses(saved.guesses || []);
          setIsWon(saved.isWon || false);
          setIsSurrendered(saved.isSurrendered || false);
          setUnlockedHintIndex(saved.unlockedHintIndex || 0);
          setUnlockedHintsList(saved.unlockedHintsList || []);
          setStartTime(saved.startTime || Date.now());
          setEndTime(saved.endTime || 0);
          setScreen('gameplay');
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save session state to LocalStorage
  useEffect(() => {
    try {
      if (activeTheme && screen === 'gameplay') {
        const session: SavedSession = {
          activeTheme,
          guesses,
          isWon,
          isSurrendered,
          unlockedHintIndex,
          unlockedHintsList,
          startTime,
          endTime,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [activeTheme, guesses, isWon, isSurrendered, unlockedHintIndex, unlockedHintsList, startTime, endTime, screen]);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      soundFx.enabled = !prev;
      return !prev;
    });
  };

  const handleSelectTheme = (baseTheme: Theme) => {
    const picked = getNonRepeatingTargetWord(baseTheme.id, baseTheme.targetWord);
    
    const configuredTheme: Theme = {
      ...baseTheme,
      targetWord: picked.word,
      preloadedWords: picked.entry?.associations || baseTheme.preloadedWords,
    };

    setActiveTheme(configuredTheme);
    setGuesses([]);
    setIsWon(false);
    setIsSurrendered(false);
    setUnlockedHintIndex(0);
    setUnlockedHintsList([]);
    setStartTime(Date.now());
    setEndTime(0);
    setScreen('gameplay');
  };

  const handleSubmitGuess = (wordRaw: string) => {
    if (!activeTheme || isWon || isSurrendered) return;

    const word = wordRaw.trim().toUpperCase();
    if (guesses.some((g) => g.word === word)) {
      soundFx.playClick();
      return;
    }

    const score = calculateSemanticScore(word, activeTheme);
    const tier: ScoreTier = getScoreTier(score);

    const allScores = [...guesses.map((g) => g.score), score].sort((a, b) => b - a);
    const newRank = allScores.indexOf(score) + 1;

    const newGuess: Guess = {
      id: `${word}-${Date.now()}`,
      word: word,
      score: score,
      tier: tier,
      rank: newRank,
      timestamp: Date.now(),
      rankChange: guesses.length > 0 ? Math.max(0, guesses.length + 1 - newRank) : 0,
    };

    const updatedGuesses = [...guesses, newGuess];
    setGuesses(updatedGuesses);

    if (score === 100) {
      soundFx.playWin();
      setIsWon(true);
      setEndTime(Date.now());
    } else {
      soundFx.playHeat(score);
    }
  };

  const handleUnlockNextHint = () => {
    if (!activeTheme) return;
    const newHint = generateRandomHint(activeTheme.targetWord, activeTheme);
    setUnlockedHintsList((prev) => [...prev, newHint]);
    setUnlockedHintIndex((prev) => prev + 1);
  };

  const handleConfirmSurrender = () => {
    setIsSurrendered(true);
    setIsRevealModalOpen(false);
    localStorage.removeItem(STORAGE_KEY);
    setScreen('selector');
  };

  const handlePlayAgain = () => {
    setIsWon(false);
    setIsSurrendered(false);
    setGuesses([]);
    localStorage.removeItem(STORAGE_KEY);
    setScreen('selector');
  };

  const highestScore = guesses.length > 0 ? Math.max(...guesses.map((g) => g.score)) : 0;
  const latestWord = guesses.length > 0 ? guesses[guesses.length - 1].word : undefined;

  // Gated Word Reveal Requirement (10 guesses minimum)
  const isRevealUnlocked = guesses.length >= 10;

  return (
    <div className="min-h-screen-dvh bg-[#08080A] text-white flex flex-col justify-between selection:bg-[#00FF66] selection:text-black bg-grid-pattern relative">
      {/* Background Glows */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        attemptsCount={guesses.length}
        activeThemeName={activeTheme ? activeTheme.name : ''}
      />

      {/* Main Responsive Arena Container */}
      <main className="flex-1 pb-12 w-full max-w-7xl mx-auto px-4 lg:px-8">
        <AnimatePresence mode="wait">
          {screen === 'selector' ? (
            <motion.div
              key="selector-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ThemeSelector
                onSelectTheme={handleSelectTheme}
                activeTheme={activeTheme}
              />
            </motion.div>
          ) : (
            <motion.div
              key="gameplay-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="py-4"
            >
              {/* Dual-Experience Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* LEFT COLUMN */}
                <div className="lg:col-span-5 lg:sticky lg:top-6 glass-panel p-4 sm:p-6 rounded-3xl border border-white/10 shadow-xl">
                  {/* Gameplay Top Bar Controls */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setScreen('selector');
                      }}
                      className="touch-target px-3 py-2 rounded-xl bg-cred-card border border-white/10 text-xs font-mono text-cred-muted hover:text-white transition-all flex items-center gap-1.5 active:scale-95 shrink-0"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>REALMS</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setIsHintModalOpen(true);
                        }}
                        className="touch-target px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FFB800]/15 to-[#FF3366]/15 border border-[#FFB800]/40 text-xs font-mono text-[#FFB800] hover:brightness-125 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,184,0,0.2)] active:scale-95 font-bold shrink-0"
                      >
                        <Gift className="w-4 h-4" />
                        <span>HINT ({unlockedHintIndex}/5)</span>
                      </button>

                      {/* GATED REVEAL BUTTON (LOCKED UNTIL 10 GUESSES) */}
                      <button
                        disabled={!isRevealUnlocked || isWon || isSurrendered}
                        onClick={() => {
                          if (!isRevealUnlocked) return;
                          soundFx.playClick();
                          setIsRevealModalOpen(true);
                        }}
                        className={`touch-target px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                          isRevealUnlocked && !isWon && !isSurrendered
                            ? 'bg-rose-500/20 border border-rose-500/50 text-rose-400 hover:bg-rose-500/30 shadow-[0_0_15px_rgba(255,51,102,0.35)] animate-pulse cursor-pointer'
                            : 'bg-white/5 border border-white/5 text-cred-subtle cursor-not-allowed opacity-50'
                        }`}
                        title={
                          isRevealUnlocked
                            ? 'Unlock 3-Stage Reveal Ad Gate'
                            : `Locked — Requires 10 guesses (${guesses.length}/10)`
                        }
                      >
                        {isRevealUnlocked ? (
                          <Unlock className="w-3.5 h-3.5 text-rose-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-cred-subtle" />
                        )}
                        <span>
                          {isRevealUnlocked ? 'REVEAL' : `REVEAL (${guesses.length}/10)`}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setGuesses([]);
                          setIsWon(false);
                        }}
                        className="touch-target w-10 h-10 rounded-xl bg-cred-card border border-white/10 text-cred-muted hover:text-white transition-colors flex items-center justify-center shrink-0"
                        title="Reset Guesses"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Active Theme Info Header */}
                  {activeTheme && (
                    <div className="mb-3 text-center">
                      <span className="text-[10px] font-mono text-cred-subtle uppercase tracking-widest block">
                        ACTIVE REALM
                      </span>
                      <h2 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                        <span>{activeTheme.icon}</span>
                        <span>{activeTheme.name}</span>
                      </h2>
                    </div>
                  )}

                  {/* Proximity Thermometer Centerpiece */}
                  <ProximityDial score={highestScore} latestWord={latestWord} />

                  {/* Primary Guess Input */}
                  <GuessInput onSubmitGuess={handleSubmitGuess} disabled={isWon || isSurrendered} />
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-7">
                  <ProximityStream guesses={guesses} />
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* CRED Rewarded Ad & Dynamic Multi-Archetype Hint Modal */}
      <HintAdModal
        isOpen={isHintModalOpen}
        onClose={() => setIsHintModalOpen(false)}
        unlockedHintsList={unlockedHintsList}
        unlockedHintIndex={unlockedHintIndex}
        onUnlockNextHint={handleUnlockNextHint}
      />

      {/* 3-Stage Non-Skippable Reveal Ad Modal */}
      <RevealAdModal
        isOpen={isRevealModalOpen}
        onClose={() => setIsRevealModalOpen(false)}
        targetWord={activeTheme ? activeTheme.targetWord : ''}
        themeName={activeTheme ? activeTheme.name : ''}
        totalGuesses={guesses.length}
        highestScore={highestScore}
        timeTakenSeconds={Math.max(1, Math.round(((endTime || Date.now()) - startTime) / 1000))}
        onConfirmSurrender={handleConfirmSurrender}
      />

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={isWon}
        targetWord={activeTheme ? activeTheme.targetWord : ''}
        themeName={activeTheme ? activeTheme.name : ''}
        totalGuesses={guesses.length}
        timeTakenSeconds={Math.max(1, Math.round(((endTime || Date.now()) - startTime) / 1000))}
        guessHistoryScores={guesses.map((g) => g.score)}
        onPlayAgain={handlePlayAgain}
      />

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-white/5 text-[10px] font-mono text-cred-subtle px-4">
        PROXIMITY ENGINE • CRED NEO-BRUTALIST ARCHITECTURE
      </footer>
    </div>
  );
}
