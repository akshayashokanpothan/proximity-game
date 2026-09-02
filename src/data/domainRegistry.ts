export interface DomainCategory {
  id: string;
  name: string;
  icon: string;
  badge: string;
  description: string;
  targetPool: string[];
}

export const EMERGENCY_FALLBACK_NOUNS = [
  "TURBINE", "COMPASS", "ANCHOR", "BEACON", "MAGNET",
  "LANTERN", "PRISM", "PENDULUM", "HARBOR", "CIRCUIT"
];

export const DOMAIN_REGISTRY: Record<string, DomainCategory> = {
  "engineering": {
    id: "engineering",
    name: "Engineering",
    icon: "⚙️",
    badge: "MECHANICS",
    description: "Machines, structures, mechanics, and circuits!",
    targetPool: [
      "TURBINE", "BLUEPRINT", "PISTON", "GEAR", "CIRCUIT", "TRANSISTOR", "CANTILEVER",
      "DYNAMO", "WELDING", "CHASSIS", "BEARING", "RIVET", "HYDRAULIC", "PULLEY",
      "ACTUATOR", "SOLENOID", "GASKET", "VALVE", "CONVEYOR", "FLANGE", "MANIFOLD",
      "TERMINAL", "RESISTOR", "CAPACITOR", "INDUCTOR", "STEERING", "FLYWHEEL", "CAMSHAFT"
    ]
  },
  "kitchen-cooking": {
    id: "kitchen-cooking",
    name: "Kitchen & Cooking",
    icon: "🍳",
    badge: "KITCHEN",
    description: "Yummy food, cooking tools, and kitchen fun!",
    targetPool: [
      "WHISK", "SPATULA", "SKILLET", "MORTAR", "COLANDER", "LADLE", "SIEVE",
      "BLENDER", "PEELER", "KETTLE", "GRATER", "SAUCEPAN", "TONGS", "CLEAVER",
      "RAMEKIN", "THERMOMETER", "ROLLINGPIN", "CORKSCREW", "TUREEN", "POT", "PAN"
    ]
  },
  "outer-space": {
    id: "outer-space",
    name: "Outer Space",
    icon: "🚀",
    badge: "SPACE",
    description: "Rockets, shiny stars, and floating in space!",
    targetPool: [
      "SUPERNOVA", "PULSAR", "NEBULA", "ASTEROID", "TELESCOPE", "QUASAR", "COMET",
      "SHUTTLE", "SATELLITE", "ROVER", "CRATER", "MODULE", "SPECTROMETER", "ASTRONAUT"
    ]
  },
  "drinks-bar": {
    id: "drinks-bar",
    name: "Drinks & Lounges",
    icon: "🍸",
    badge: "DRINKS",
    description: "Fizzy drinks, ice cubes, and cozy cafes!",
    targetPool: [
      "SHAKER", "BITTERS", "JIGGER", "DECANTER", "BOURBON", "GARNISH", "NEGRONI",
      "VERMOUTH", "CAMPARI", "MOCKTAIL", "CIDER", "ESPRESSO", "CASK", "SIPHON"
    ]
  },
  "animals-nature": {
    id: "animals-nature",
    name: "Animals & Nature",
    icon: "🌿",
    badge: "NATURE",
    description: "Cute animals, green trees, and jungle camouflage!",
    targetPool: [
      "CHAMELEON", "GECKO", "IGUANA", "PANTHER", "LEOPARD", "ELEPHANT", "LEMUR",
      "PARROT", "FLAMINGO", "FALCON", "DOLPHIN", "OCTOPUS", "CHEETAH", "ORCA"
    ]
  },
  "robots-tech": {
    id: "robots-tech",
    name: "Robots & Tech",
    icon: "⚡",
    badge: "ROBOTS",
    description: "Cool gadgets, computers, and glowing neon circuits!",
    targetPool: [
      "NEURAL", "SYNAPSE", "CYBORG", "MICROPROCESSOR", "DRONE", "ANDROID", "MECHA",
      "SENSOR", "FIRMWARE", "ALGORITHM", "ENCRYPTION", "FIREWALL", "SERVER"
    ]
  },
  "sports-games": {
    id: "sports-games",
    name: "Sports & Games",
    icon: "⚽",
    badge: "SPORTS",
    description: "Running, big stadiums, and winning trophies!",
    targetPool: [
      "MARATHON", "TRIATHLON", "ATHLETE", "STADIUM", "MEDAL", "TROPHY", "WHISTLE",
      "REFEREE", "GYMNASTICS", "ARCHERY", "BASKETBALL", "VOLLEYBALL", "RACQUET"
    ]
  },
  "movies-cinema": {
    id: "movies-cinema",
    name: "Movies & Cinema",
    icon: "🎬",
    badge: "MOVIES",
    description: "Movie stars, popcorn, and big screen stories!",
    targetPool: [
      "SCREENPLAY", "PROJECTOR", "DIRECTOR", "CINEMATOGRAPHY", "SOUNDTRACK", "PRODUCER",
      "DOCUMENTARY", "BLOCKBUSTER", "ANIMATION", "OSCAR", "PREMIERE", "SCRIPT"
    ]
  },
  "aviation": {
    id: "aviation",
    name: "Aviation",
    icon: "✈️",
    badge: "FLIGHT",
    description: "Aircraft, flight instruments, and high sky navigation!",
    targetPool: [
      "PROPELLER", "ALTIMETER", "FUSELAGE", "RUDDER", "COCKPIT", "AILERON", "TURBOPROP",
      "BI PLANE", "HANGAR", "ALTITUDE", "GLIDER", "DIRIGIBLE", "BEACON", "TAXIWAY"
    ]
  }
};

/**
 * Custom topic keyword mapper for domain target nouns
 */
export function getCustomDomainTargets(customInput: string): string[] {
  const clean = customInput.trim().toLowerCase();
  
  if (clean.includes("engineer") || clean.includes("machine") || clean.includes("build")) {
    return DOMAIN_REGISTRY["engineering"].targetPool;
  }
  if (clean.includes("avi") || clean.includes("fly") || clean.includes("plane")) {
    return DOMAIN_REGISTRY["aviation"].targetPool;
  }
  if (clean.includes("space") || clean.includes("star") || clean.includes("sky")) {
    return DOMAIN_REGISTRY["outer-space"].targetPool;
  }
  if (clean.includes("cook") || clean.includes("food") || clean.includes("eat")) {
    return DOMAIN_REGISTRY["kitchen-cooking"].targetPool;
  }
  if (clean.includes("bot") || clean.includes("tech") || clean.includes("code")) {
    return DOMAIN_REGISTRY["robots-tech"].targetPool;
  }

  // Emergency curated domain noun fallbacks
  return EMERGENCY_FALLBACK_NOUNS;
}
