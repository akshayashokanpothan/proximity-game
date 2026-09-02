import type { Theme, DynamicHint } from '../types/game';
import { DOMAIN_REGISTRY, getCustomDomainTargets, EMERGENCY_FALLBACK_NOUNS } from './domainRegistry';

const PLAYED_WORDS_KEY = 'orbit_played_target_words';

/**
 * Returns stored history of recently played target words per theme ID (max 10).
 */
export function getPlayedTargetWords(themeId: string): string[] {
  try {
    const raw = localStorage.getItem(`${PLAYED_WORDS_KEY}_${themeId}`);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore storage errors
  }
  return [];
}

/**
 * Saves played target word to session history.
 */
export function recordPlayedTargetWord(themeId: string, word: string) {
  try {
    const history = getPlayedTargetWords(themeId);
    const updated = [word.toUpperCase(), ...history.filter((w) => w !== word.toUpperCase())].slice(0, 10);
    localStorage.setItem(`${PLAYED_WORDS_KEY}_${themeId}`, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Guarded Target Word Picker Logic:
 * Ensures target word is NEVER the category/theme name itself!
 */
export function getGuardedTargetWord(themeId: string, themeName: string): string {
  const domainCategory = DOMAIN_REGISTRY[themeId];
  let pool: string[] = [];

  if (domainCategory && domainCategory.targetPool.length > 0) {
    pool = domainCategory.targetPool;
  } else {
    pool = getCustomDomainTargets(themeName);
  }

  const cleanThemeName = themeName.trim().toUpperCase();
  const cleanThemeId = themeId.trim().toUpperCase();

  // HARD FILTER: Remove theme name & theme ID from pool
  let filtered = pool.filter((w) => {
    const wordUpper = w.trim().toUpperCase();
    return wordUpper !== cleanThemeName && wordUpper !== cleanThemeId;
  });

  // SESSION HISTORY CHECK: Filter out last 10 played target words
  const playedHistory = getPlayedTargetWords(themeId);
  const unplayed = filtered.filter((w) => !playedHistory.includes(w.toUpperCase()));

  if (unplayed.length > 0) {
    filtered = unplayed;
  }

  // GUARANTEED SAFE PICK
  let picked = filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : null;

  if (!picked || picked.trim().toUpperCase() === cleanThemeName) {
    // Emergency Fallback Nouns
    const emergencyFilter = EMERGENCY_FALLBACK_NOUNS.filter((w) => w !== cleanThemeName);
    picked = emergencyFilter[Math.floor(Math.random() * emergencyFilter.length)] || "TURBINE";
  }

  const finalTarget = picked.trim().toUpperCase();
  recordPlayedTargetWord(themeId, finalTarget);

  return finalTarget;
}

export function generateRandomHint(targetWord: string, theme: Theme): DynamicHint {
  const cleanTarget = targetWord.trim().toUpperCase();
  const len = cleanTarget.length;

  const archetypes = [
    {
      archetype: 'LETTER_REVEAL' as const,
      badge: 'LETTER REVEAL',
      text: `The 2nd character in this secret word is '${cleanTarget[1] || cleanTarget[0]}'.`
    },
    {
      archetype: 'PHONETIC_PATTERN' as const,
      badge: 'PHONETIC PATTERN',
      text: `Contains ${sumVowels(cleanTarget)} vowels and is ${len} letters long.`
    },
    {
      archetype: 'CRYPTIC_RIDDLE' as const,
      badge: 'CRYPTIC RIDDLE',
      text: `A key secret noun in ${theme.name} starting with '${cleanTarget[0]}'.`
    },
    {
      archetype: 'RHYME_STRUCTURE' as const,
      badge: 'RHYME & STRUCTURE',
      text: `A ${len}-letter word that ends with the letter '${cleanTarget[len - 1]}'.`
    },
    {
      archetype: 'VECTOR_AFFINITY' as const,
      badge: 'VECTOR AFFINITY',
      text: `High vector proximity to ${theme.name.toLowerCase()} items.`
    }
  ];

  return archetypes[Math.floor(Math.random() * archetypes.length)];
}

function sumVowels(word: string): number {
  return (word.match(/[AEIOU]/gi) || []).length;
}

// Re-export for compatibility
export const getNonRepeatingTargetWord = (themeId: string, themeName: string) => {
  const word = getGuardedTargetWord(themeId, themeName);
  return { word, entry: null };
};
