import type { Theme, ScoreTier } from '../types/game';
import { getCustomDomainTargets } from '../data/domainRegistry';

export const DEFAULT_THEMES: Theme[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    icon: '⚙️',
    targetWord: 'TURBINE',
    badge: 'MECHANICS',
    description: 'Machines, structures, mechanics, and circuits!',
    clues: [
      "It has 7 letters and starts with 'T'.",
      "A rotary mechanical device that extracts energy from fluid flow!",
      "Key component in jet engines and power plants."
    ],
    preloadedWords: {
      'TURBINE': 100,
      'BLUEPRINT': 92,
      'PISTON': 89,
      'GEAR': 86,
      'CIRCUIT': 83,
      'TRANSISTOR': 80,
      'CANTILEVER': 76,
      'DYNAMO': 72,
      'WELDING': 68,
      'CHASSIS': 64,
      'ENGINE': 60,
      'MACHINE': 52,
      'BUILD': 40
    }
  },
  {
    id: 'kitchen-cooking',
    name: 'Kitchen & Cooking',
    icon: '🍳',
    targetWord: 'WHISK',
    badge: 'KITCHEN',
    description: 'Yummy food, cooking tools, and kitchen fun!',
    clues: [
      "It has 5 letters and starts with 'W'.",
      "Tool used to mix eggs and whip cream fast!",
      "It has wire loops to spin air into batter."
    ],
    preloadedWords: {
      'WHISK': 100,
      'SPATULA': 94,
      'BEATER': 91,
      'BLENDER': 88,
      'MIXER': 85,
      'LADLE': 82,
      'TONGS': 79,
      'SKILLET': 76,
      'PAN': 72,
      'OVEN': 68
    }
  },
  {
    id: 'outer-space',
    name: 'Outer Space',
    icon: '🚀',
    targetWord: 'SUPERNOVA',
    badge: 'SPACE',
    description: 'Rockets, shiny stars, and floating in space!',
    clues: [
      "It has 9 letters and starts with 'S'.",
      "A gigantic giant star exploding in deep space!",
      "Leaves behind neutron stars and black holes."
    ],
    preloadedWords: {
      'SUPERNOVA': 100,
      'NEBULA': 93,
      'BLACKHOLE': 90,
      'PULSAR': 87,
      'GALAXY': 84,
      'STAR': 78
    }
  },
  {
    id: 'drinks-bar',
    name: 'Drinks & Lounges',
    icon: '🍸',
    targetWord: 'NEGRONI',
    badge: 'DRINKS',
    description: 'Fizzy drinks, ice cubes, and cozy cafes!',
    clues: [
      "It has 7 letters and starts with 'N'.",
      "Famous cold drink mixed with Gin and citrus peel.",
      "Served over big cold ice cubes."
    ],
    preloadedWords: {
      'NEGRONI': 100,
      'MANHATTAN': 93,
      'CAMPARI': 91,
      'GIN': 88,
      'SHAKER': 73
    }
  },
  {
    id: 'animals-nature',
    name: 'Animals & Nature',
    icon: '🌿',
    targetWord: 'CHAMELEON',
    badge: 'NATURE',
    description: 'Cute animals, green trees, and jungle camouflage!',
    clues: [
      "It has 9 letters and starts with 'C'.",
      "A cool lizard that changes colors to hide!",
      "Has long sticky tongue to catch bugs."
    ],
    preloadedWords: {
      'CHAMELEON': 100,
      'GECKO': 92,
      'IGUANA': 89,
      'LIZARD': 86
    }
  },
  {
    id: 'robots-tech',
    name: 'Robots & Tech',
    icon: '⚡',
    targetWord: 'NEURAL',
    badge: 'ROBOTS',
    description: 'Cool gadgets, computers, and glowing neon circuits!',
    clues: [
      "It has 6 letters and starts with 'N'.",
      "Brain connection that helps computers think!",
      "Used in smart robots and brain chips."
    ],
    preloadedWords: {
      'NEURAL': 100,
      'SYNAPSE': 94,
      'CYBORG': 78
    }
  },
  {
    id: 'sports-games',
    name: 'Sports & Games',
    icon: '⚽',
    targetWord: 'MARATHON',
    badge: 'SPORTS',
    description: 'Running, big stadiums, and winning trophies!',
    clues: [
      "It has 8 letters and starts with 'M'.",
      "Super long running race across the city!",
      "Tests how fast and far runners can go."
    ],
    preloadedWords: {
      'MARATHON': 100,
      'SPRINT': 93,
      'TRIATHLON': 90
    }
  },
  {
    id: 'movies-cinema',
    name: 'Movies & Cinema',
    icon: '🎬',
    targetWord: 'SCREENPLAY',
    badge: 'MOVIES',
    description: 'Movie stars, popcorn, and big screen stories!',
    clues: [
      "It has 10 letters and starts with 'S'.",
      "The written story book that actors read for movies!",
      "Tells directors what scenes and words to film."
    ],
    preloadedWords: {
      'SCREENPLAY': 100,
      'SCRIPT': 94,
      'DIRECTOR': 90
    }
  }
];

export function getScoreTier(score: number): ScoreTier {
  if (score >= 100) return 'target';
  if (score >= 90) return 'extreme';
  if (score >= 70) return 'hot';
  if (score >= 40) return 'lukewarm';
  return 'freezing';
}

export function getTierColor(tier: ScoreTier): string {
  switch (tier) {
    case 'target': return '#00FF66';   // Electric Lime
    case 'extreme': return '#EC4899';  // Radiant Magenta
    case 'hot': return '#F97316';      // Neon Orange
    case 'lukewarm': return '#F59E0B'; // Warm Amber
    case 'freezing': return '#3B82F6'; // Electric Blue
  }
}

export function getTierBgGradient(tier: ScoreTier): string {
  switch (tier) {
    case 'target': return 'from-[#00FF66]/20 to-[#00FF66]/5 border-[#00FF66]/50';
    case 'extreme': return 'from-[#EC4899]/20 to-[#EC4899]/5 border-[#EC4899]/50';
    case 'hot': return 'from-[#F97316]/20 to-[#F97316]/5 border-[#F97316]/50';
    case 'lukewarm': return 'from-[#F59E0B]/20 to-[#F59E0B]/5 border-[#F59E0B]/50';
    case 'freezing': return 'from-[#3B82F6]/20 to-[#3B82F6]/5 border-[#3B82F6]/50';
  }
}

export function calculateSemanticScore(guessRaw: string, theme: Theme): number {
  const guess = guessRaw.trim().toUpperCase();
  const target = theme.targetWord.toUpperCase();

  if (guess === target) return 100;

  if (theme.preloadedWords && typeof theme.preloadedWords[guess] === 'number') {
    return theme.preloadedWords[guess];
  }

  let score = 0;

  const dist = levenshteinDistance(guess, target);
  const maxLen = Math.max(guess.length, target.length);
  const editSimilarity = Math.max(0, (1 - dist / maxLen));
  score += editSimilarity * 35;

  const charOverlap = getCharOverlapRatio(guess, target);
  score += charOverlap * 30;

  const lenRatio = Math.min(guess.length, target.length) / Math.max(guess.length, target.length);
  score += lenRatio * 15;

  if (guess[0] === target[0]) score += 5;
  if (guess[guess.length - 1] === target[target.length - 1]) score += 3;

  const hashBonus = (hashString(guess + target) % 10);
  score += hashBonus;

  return Math.min(97, Math.max(5, Math.round(score)));
}

export function createCustomTheme(topicName: string): Theme {
  const cleanName = topicName.trim();
  const domainTargets = getCustomDomainTargets(cleanName);
  
  // Hard Filter: Never select custom input topicName as secret word!
  const cleanTopicUpper = cleanName.toUpperCase();
  const filtered = domainTargets.filter(t => t.toUpperCase() !== cleanTopicUpper);
  const targetWord = filtered[Math.floor(Math.random() * filtered.length)] || "TURBINE";

  return {
    id: `custom-${cleanName.toLowerCase().replace(/\s+/g, '-')}`,
    name: cleanName,
    icon: '✨',
    badge: 'CUSTOM',
    targetWord: targetWord,
    description: `Fun secret word game about ${cleanName}!`,
    clues: [
      `The secret word has ${targetWord.length} letters and starts with '${targetWord[0]}'.`,
      `A concrete domain entity related to ${cleanName}!`,
      `Ends with the letter '${targetWord[targetWord.length - 1]}'.`
    ],
    preloadedWords: {
      [targetWord]: 100
    }
  };
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function getCharOverlapRatio(a: string, b: string): number {
  const setA = new Set(a.split(''));
  const setB = new Set(b.split(''));
  let match = 0;
  setA.forEach(char => {
    if (setB.has(char)) match++;
  });
  return match / Math.max(setA.size, setB.size);
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
