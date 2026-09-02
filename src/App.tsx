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
import { Footer } from './components/Footer';
import type { Theme, Guess, ScoreTier, DynamicHint, SavedSession, VisualMode } from './types/game';
import { calculateSemanticScore, getScoreTier } from './utils/semanticEngine';
import { getGuardedTargetWord, generateRandomHint } from './data/themeDatabase';
import { soundFx } from './utils/soundEngine';
import { Gift, ArrowLeft, RotateCcw, Lock, Unlock } from 'lucide-react';

const STORAGE_KEY = 'orbit_engine_session_v1';
const VISUAL_MODE_KEY = 'orbit_visual_mode_v1';

export default function App() {
  const [screen, setScreen] = useState<'selector' | 'gameplay'>('selector');
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isSurrendered, setIsSurrendered] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [visualMode, setVisualMode] = useState<VisualMode>('graphics');
  const [sessionId, setSessionId] = useState<string | null>(null);

  const isMinimal = visualMode === 'minimal';

  // Dynamic Hints & Cooldown
  const [isHintModalOpen, setIsHintModalOpen] = useState<boolean>(false);
  const [isRevealModalOpen, setIsRevealModalOpen] = useState<boolean>(false);
  const [unlockedHintIndex, setUnlockedHintIndex] = useState<number>(0);
  const [unlockedHintsList, setUnlockedHintsList] = useState<DynamicHint[]>([]);
  const [lastHintGuessCount, setLastHintGuessCount] = useState<number>(0);

  // Timers
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  // Restore visual mode from LocalStorage on mount
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem(VISUAL_MODE_KEY) as VisualMode;
      if (savedMode === 'minimal' || savedMode === 'graphics') {
        setVisualMode(savedMode);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

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
          setLastHintGuessCount(saved.lastHintGuessCount || 0);
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
          lastHintGuessCount,
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
  }, [activeTheme, guesses, isWon, isSurrendered, unlockedHintIndex, unlockedHintsList, lastHintGuessCount, startTime, endTime, screen]);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      soundFx.enabled = !prev;
      return !prev;
    });
  };

  const handleToggleVisualMode = () => {
    setVisualMode((prev) => {
      const next = prev === 'graphics' ? 'minimal' : 'graphics';
      try {
        localStorage.setItem(VISUAL_MODE_KEY, next);
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const handleSelectTheme = async (baseTheme: Theme) => {
    // GUARDED WORD PICKER: Ensures target word is NEVER the category/theme name itself!
    const targetWord = getGuardedTargetWord(baseTheme.id, baseTheme.name);
    
    const configuredTheme: Theme = {
      ...baseTheme,
      targetWord: targetWord,
      preloadedWords: baseTheme.preloadedWords,
    };

    setActiveTheme(configuredTheme);
    setGuesses([]);
    setIsWon(false);
    setIsSurrendered(false);
    setUnlockedHintIndex(0);
    setUnlockedHintsList([]);
    setLastHintGuessCount(0);
    setStartTime(Date.now());
    setEndTime(0);

    // Call FastAPI /api/game/start endpoint
    try {
      const res = await fetch('/api/game/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme_id: baseTheme.id })
      });
      if (res.ok) {
        const data = await res.json();
        setSessionId(data.session_id);
      }
    } catch {
      // Fallback to local session
    }

    setScreen('gameplay');
  };

  const handleSubmitGuess = async (wordRaw: string) => {
    if (!activeTheme || isWon || isSurrendered) return;

    const word = wordRaw.trim().toUpperCase();
    if (guesses.some((g) => g.word === word)) {
      soundFx.playClick();
      return;
    }

    let score = calculateSemanticScore(word, activeTheme);
    let tier: ScoreTier = getScoreTier(score);

    // Try FastAPI /api/game/guess if backend session active
    if (sessionId) {
      try {
        const res = await fetch('/api/game/guess', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, word: word })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.guess) {
            score = data.guess.score;
            tier = getScoreTier(score);
          }
        }
      } catch {
        // Fallback to local scoring
      }
    }

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

  const handleUnlockNextHint = async () => {
    if (!activeTheme) return;

    let newHint: DynamicHint | null = null;

    if (sessionId) {
      try {
        const res = await fetch('/api/game/hint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, ads_watched: 2 })
        });
        if (res.ok) {
          const data = await res.json();
          newHint = data.hint;
        }
      } catch {
        // Fallback to local hint engine
      }
    }

    if (!newHint) {
      newHint = generateRandomHint(activeTheme.targetWord, activeTheme);
    }

    setUnlockedHintsList((prev) => [...prev, newHint]);
    setLastHintGuessCount(guesses.length);
    setUnlockedHintIndex((prev) => prev + 1);
  };

  const handleConfirmSurrender = async () => {
    if (sessionId) {
      try {
        await fetch('/api/game/reveal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, ads_watched: 3 })
        });
      } catch {
        // Ignore fallback
      }
    }

    setIsSurrendered(true);
    setIsRevealModalOpen(false);
    localStorage.removeItem(STORAGE_KEY);
    setScreen('selector');
  };

  const handlePlayAgain = () => {
    setIsWon(false);
    setIsSurrendered(false);
    setGuesses([]);
    setSessionId(null);
    localStorage.removeItem(STORAGE_KEY);
    setScreen('selector');
  };

  const highestScore = guesses.length > 0 ? Math.max(...guesses.map((g) => g.score)) : 0;
  const latestWord = guesses.length > 0 ? guesses[guesses.length - 1].word : undefined;

  // Gated Word Reveal Requirement (10 guesses minimum)
  const isRevealUnlocked = guesses.length >= 10;

  // 10-Guess Cooldown Logic between consecutive hints
  const isFirstHint = unlockedHintIndex === 0;
  const guessesSinceLastHint = Math.max(0, guesses.length - lastHintGuessCount);
  const isHintUnlocked = isFirstHint || guessesSinceLastHint >= 10;
  const guessesNeededForNextHint = Math.max(0, 10 - guessesSinceLastHint);

  return (
    <div className={`min-h-screen-dvh flex flex-col justify-between selection:bg-[#00FF66] selection:text-black relative transition-colors duration-300 ${
      isMinimal ? 'bg-[#FBFBFC] text-neutral-900 font-sans' : 'bg-[#08080A] text-white bg-grid-pattern'
    }`}>
      {/* Background Glows (Graphics Heavy Mode Only) */}
      {!isMinimal && (
        <>
          <div className="fixed -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        visualMode={visualMode}
        onToggleVisualMode={handleToggleVisualMode}
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
              transition={{ duration: 0.15 }}
            >
              <ThemeSelector
                onSelectTheme={handleSelectTheme}
                activeTheme={activeTheme}
                visualMode={visualMode}
              />
            </motion.div>
          ) : (
            <motion.div
              key="gameplay-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="py-4"
            >
              {/* Dual-Experience Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* LEFT COLUMN */}
                <div className={`lg:col-span-5 lg:sticky lg:top-6 p-4 sm:p-6 rounded-2xl border transition-colors duration-200 ${
                  isMinimal ? 'bg-white border-neutral-200 shadow-xs' : 'glass-panel border-white/10 shadow-xl'
                }`}>
                  {/* Gameplay Top Bar Controls */}
                  <div className={`flex items-center justify-between mb-4 pb-3 border-b ${
                    isMinimal ? 'border-neutral-100' : 'border-white/5'
                  }`}>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setScreen('selector');
                      }}
                      className={`touch-target px-3 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 active:scale-95 shrink-0 ${
                        isMinimal
                          ? 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-xs'
                          : 'bg-cred-card border-white/10 text-cred-muted hover:text-white'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>TOPICS</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {/* HINT BUTTON WITH 10-GUESS COOLDOWN GATE */}
                      <button
                        disabled={!isHintUnlocked || isWon || isSurrendered}
                        onClick={() => {
                          if (!isHintUnlocked) return;
                          soundFx.playClick();
                          setIsHintModalOpen(true);
                        }}
                        className={`touch-target px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                          isHintUnlocked && !isWon && !isSurrendered
                            ? isMinimal
                              ? 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-xs cursor-pointer'
                              : 'bg-gradient-to-r from-[#FFB800]/15 to-[#FF3366]/15 border border-[#FFB800]/40 text-[#FFB800] hover:brightness-125 shadow-[0_0_12px_rgba(255,184,0,0.2)] active:scale-95 cursor-pointer'
                            : isMinimal
                              ? 'bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed'
                              : 'bg-white/5 border border-white/5 text-cred-subtle cursor-not-allowed opacity-60'
                        }`}
                        title={
                          isHintUnlocked
                            ? 'Need a Clue? (Watch 2 quick videos)'
                            : `Make 10 guesses first to unlock another clue! (${guessesSinceLastHint}/10 completed)`
                        }
                      >
                        {isHintUnlocked ? (
                          <Gift className={`w-4 h-4 ${isMinimal ? 'text-white' : 'text-[#FFB800]'}`} />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-cred-subtle" />
                        )}
                        <span>
                          {isHintUnlocked
                            ? `HINT (${unlockedHintIndex}/5)`
                            : `HINT IN ${guessesNeededForNextHint}G`}
                        </span>
                      </button>

                      {/* GATED REVEAL / GIVE UP BUTTON (LOCKED UNTIL 10 GUESSES) */}
                      <button
                        disabled={!isRevealUnlocked || isWon || isSurrendered}
                        onClick={() => {
                          if (!isRevealUnlocked) return;
                          soundFx.playClick();
                          setIsRevealModalOpen(true);
                        }}
                        className={`touch-target px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                          isRevealUnlocked && !isWon && !isSurrendered
                            ? isMinimal
                              ? 'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 shadow-xs cursor-pointer'
                              : 'bg-rose-500/20 border border-rose-500/50 text-rose-400 hover:bg-rose-500/30 shadow-[0_0_15px_rgba(255,51,102,0.35)] animate-pulse cursor-pointer'
                            : isMinimal
                              ? 'bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed'
                              : 'bg-white/5 border border-white/5 text-cred-subtle cursor-not-allowed opacity-50'
                        }`}
                        title={
                          isRevealUnlocked
                            ? 'Show Secret Word (Available after 10 guesses)'
                            : `Show Secret Word (Available after 10 guesses — ${guesses.length}/10 completed)`
                        }
                      >
                        {isRevealUnlocked ? (
                          <Unlock className="w-3.5 h-3.5 text-rose-600" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-cred-subtle" />
                        )}
                        <span>
                          {isRevealUnlocked ? 'GIVE UP' : `GIVE UP (${guesses.length}/10)`}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          soundFx.playClick();
                          setGuesses([]);
                          setIsWon(false);
                        }}
                        className={`touch-target w-10 h-10 rounded-xl border transition-colors flex items-center justify-center shrink-0 ${
                          isMinimal ? 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 shadow-xs' : 'bg-cred-card border-white/10 text-cred-muted hover:text-white'
                        }`}
                        title="Start Over"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Active Theme Info Header */}
                  {activeTheme && (
                    <div className="mb-3 text-center">
                      <span className={`text-[10px] font-mono uppercase tracking-widest block ${
                        isMinimal ? 'text-neutral-400' : 'text-cred-subtle'
                      }`}>
                        CURRENT TOPIC
                      </span>
                      <h2 className={`text-xl font-bold tracking-tight flex items-center justify-center gap-2 ${
                        isMinimal ? 'text-neutral-900' : 'text-white'
                      }`}>
                        <span>{activeTheme.icon}</span>
                        <span>{activeTheme.name}</span>
                      </h2>
                    </div>
                  )}

                  {/* Proximity Thermometer Centerpiece */}
                  <ProximityDial score={highestScore} latestWord={latestWord} visualMode={visualMode} />

                  {/* Primary Guess Input */}
                  <GuessInput onSubmitGuess={handleSubmitGuess} disabled={isWon || isSurrendered} visualMode={visualMode} />
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-7">
                  <ProximityStream guesses={guesses} visualMode={visualMode} />
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
        visualMode={visualMode}
      />

      {/* Anchored Neo-Luxury Footer */}
      <Footer visualMode={visualMode} />
    </div>
  );
}
