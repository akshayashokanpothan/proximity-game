import type { Theme } from '../types/game';

export interface WordEntry {
  word: string;
  riddle: string;
  rhymeWord?: string;
  affinity: [string, string];
  associations: Record<string, number>; // word -> proximity score (0-100)
}

export interface ThemeDatabase {
  id: string;
  name: string;
  icon: string;
  badge: string;
  description: string;
  wordPool: WordEntry[];
}

export const THEME_DATABASE: ThemeDatabase[] = [
  {
    id: 'kitchen-alchemy',
    name: 'Kitchen Alchemy',
    icon: '🍳',
    badge: 'CUISINE',
    description: 'Culinary tools, cooking techniques, and kitchen magic',
    wordPool: [
      { word: 'WHISK', riddle: 'Spun rapidly to fold air into liquid batter.', rhymeWord: 'RISK', affinity: ['SPATULA', 'BEATER'], associations: { 'SPATULA': 94, 'BEATER': 91, 'BLENDER': 88, 'MIXER': 85, 'LADLE': 82, 'SKILLET': 76, 'OVEN': 68, 'COOK': 65, 'CHEF': 62 } },
      { word: 'SPATULA', riddle: 'Flexible blade used to flip and scrape food.', rhymeWord: 'DRACULA', affinity: ['SKILLET', 'TURNER'], associations: { 'WHISK': 94, 'SKILLET': 90, 'PAN': 86, 'FLIPPER': 82, 'COOK': 75, 'KNIFE': 60 } },
      { word: 'SKILLET', riddle: 'Heavy shallow pan crafted for searing meats.', rhymeWord: 'LET', affinity: ['PAN', 'STOVE'], associations: { 'PAN': 92, 'SPATULA': 90, 'OVEN': 85, 'SEAR': 80, 'FRY': 75, 'CHEF': 65 } },
      { word: 'BLENDER', riddle: 'High speed blades pureeing smoothies and soups.', rhymeWord: 'ENDER', affinity: ['MIXER', 'WHISK'], associations: { 'MIXER': 92, 'WHISK': 88, 'JUICER': 84, 'PULSE': 78, 'SMOOTHIE': 74 } },
      { word: 'COLANDER', riddle: 'Perforated bowl used to drain cooked pasta.', rhymeWord: 'SALAMANDER', affinity: ['STRAINER', 'SIEVING'], associations: { 'STRAINER': 95, 'PASTA': 88, 'DRAIN': 84, 'BOWL': 75, 'WATER': 60 } },
      { word: 'CLEAVER', riddle: 'Heavy rectangular axe forged for thick cuts.', rhymeWord: 'BEAVER', affinity: ['KNIFE', 'BUTCHER'], associations: { 'KNIFE': 93, 'BUTCHER': 90, 'MEAT': 85, 'CHOP': 80, 'BLADE': 75 } },
      { word: 'LADLE', riddle: 'Deep cupped spoon designed to scoop warm soup.', rhymeWord: 'CRADLE', affinity: ['SOUP', 'SPOON'], associations: { 'SOUP': 92, 'SPOON': 88, 'BOWL': 82, 'BROTH': 78, 'COOK': 65 } },
      { word: 'GRIDDLE', riddle: 'Flat heated surface perfect for morning pancakes.', rhymeWord: 'MIDDLE', affinity: ['PANCAKE', 'STOVE'], associations: { 'SKILLET': 88, 'PANCAKE': 85, 'SEAR': 78, 'BREAKFAST': 74, 'COOK': 65 } },
      { word: 'MORTAR', riddle: 'Heavy bowl used with pestle to grind herbs.', rhymeWord: 'PORTER', affinity: ['PESTLE', 'HERBS'], associations: { 'PESTLE': 96, 'SPICE': 88, 'GRIND': 84, 'HERB': 80, 'BOWL': 70 } },
      { word: 'PESTLE', riddle: 'Club shaped tool pressed to crush whole spices.', rhymeWord: 'NESTLE', affinity: ['MORTAR', 'GRIND'], associations: { 'MORTAR': 96, 'GRIND': 88, 'CRUSH': 84, 'SPICE': 80 } },
      { word: 'RAMEKIN', riddle: 'Small ceramic dish for baking individual souffles.', rhymeWord: 'MANNEQUIN', affinity: ['BAKE', 'SOUFFLE'], associations: { 'SOUFFLE': 92, 'BAKE': 85, 'DISH': 80, 'OVEN': 75 } },
      { word: 'TOASTER', riddle: 'Heats sliced bread until golden and crisp.', rhymeWord: 'COASTER', affinity: ['BREAD', 'SLICE'], associations: { 'BREAD': 90, 'TOAST': 88, 'CRISP': 82, 'BAGEL': 78 } },
      { word: 'ROASTER', riddle: 'Large deep pan crafted for oven turkey.', rhymeWord: 'COASTER', affinity: ['OVEN', 'TURKEY'], associations: { 'OVEN': 92, 'PAN': 86, 'TURKEY': 82, 'BAKE': 78 } },
      { word: 'GRATER', riddle: 'Sharpened metal teeth shredding blocks of cheese.', rhymeWord: 'ATER', affinity: ['CHEESE', 'SHRED'], associations: { 'CHEESE': 93, 'SHRED': 88, 'ZEST': 82, 'PARMESAN': 78 } },
      { word: 'SIFTER', riddle: 'Fine mesh basket aeration of dry flour.', rhymeWord: 'DRIFTER', affinity: ['FLOUR', 'BAKE'], associations: { 'FLOUR': 94, 'MESH': 88, 'BAKE': 82, 'POWDER': 76 } },
      { word: 'TUREEN', riddle: 'Covered serving bowl crafted for hot broths.', rhymeWord: 'QUEEN', affinity: ['SOUP', 'BOWL'], associations: { 'SOUP': 92, 'LADLE': 86, 'BROTH': 80, 'BOWL': 75 } },
      { word: 'CROCKERY', riddle: 'Earthenware dishes used for serving dining feasts.', rhymeWord: 'MOCKERY', affinity: ['PLATE', 'DISH'], associations: { 'PLATE': 90, 'CERAMIC': 84, 'DISH': 80, 'TABLE': 70 } },
      { word: 'APRON', riddle: 'Protective cloth garment tied around the waist.', rhymeWord: 'MATRON', affinity: ['CHEF', 'CLOTH'], associations: { 'CHEF': 90, 'CLOTH': 82, 'COOK': 78, 'CLEAN': 65 } },
      { word: 'SKIMMER', riddle: 'Flat perforated spoon removing foam from stock.', rhymeWord: 'GLIMMER', affinity: ['SPOON', 'STOCK'], associations: { 'LADLE': 88, 'SOUP': 82, 'FOAM': 78, 'STRAINER': 75 } },
      { word: 'THERMOMETER', riddle: 'Probe measuring internal meat temperatures accurately.', rhymeWord: 'METER', affinity: ['TEMP', 'PROBE'], associations: { 'PROBE': 90, 'HEAT': 85, 'MEAT': 80, 'DEGREES': 75 } },
      { word: 'CORKSCREW', riddle: 'Helical metal tool pulling corks from bottles.', rhymeWord: 'SCREW', affinity: ['WINE', 'BOTTLE'], associations: { 'WINE': 95, 'BOTTLE': 90, 'OPENER': 85, 'CORK': 80 } },
      { word: 'CORER', riddle: 'Tubular blade extracting seed centers from apples.', rhymeWord: 'POURER', affinity: ['APPLE', 'FRUIT'], associations: { 'APPLE': 92, 'FRUIT': 86, 'BLADE': 78, 'SEED': 72 } },
      { word: 'PEELER', riddle: 'Swiveling razor blade stripping vegetable skins thin.', rhymeWord: 'DEALER', affinity: ['POTATO', 'SKIN'], associations: { 'POTATO': 92, 'VEGGIE': 86, 'SKIN': 80, 'BLADE': 75 } },
      { word: 'ZESTER', riddle: 'Tiny grating holes shaving citrus peels finely.', rhymeWord: 'TESTER', affinity: ['LEMON', 'CITRUS'], associations: { 'LEMON': 93, 'CITRUS': 88, 'PEEL': 84, 'GRATER': 80 } },
      { word: 'CUTTER', riddle: 'Sharp shaped mold pressing biscuits from dough.', rhymeWord: 'BUTTER', affinity: ['DOUGH', 'BISCUIT'], associations: { 'DOUGH': 90, 'COOKIE': 86, 'MOLD': 80, 'BAKE': 75 } },
      { word: 'MOLD', riddle: 'Hollow form shaping chilled gelatin or pastries.', rhymeWord: 'GOLD', affinity: ['GELATIN', 'SHAPE'], associations: { 'BAKE': 82, 'SHAPE': 78, 'CAKE': 72, 'PASTRY': 68 } },
      { word: 'ROLLINGPIN', riddle: 'Wooden cylinder flattening pastry dough evenly.', rhymeWord: 'PIN', affinity: ['DOUGH', 'PASTRY'], associations: { 'DOUGH': 94, 'PASTRY': 88, 'BAKE': 82, 'FLOUR': 78 } },
      { word: 'DUTCHOVEN', riddle: 'Heavy enameled cast iron pot for braising.', rhymeWord: 'OVEN', affinity: ['POT', 'STEW'], associations: { 'STEW': 92, 'POT': 88, 'ROAST': 84, 'CASTIRON': 80 } },
      { word: 'SAUCEPAN', riddle: 'Deep cooking pot with long handle and lid.', rhymeWord: 'PAN', affinity: ['POT', 'SOUP'], associations: { 'POT': 92, 'SAUCE': 88, 'BOIL': 82, 'STOVE': 76 } },
      { word: 'WOK', riddle: 'High sloped bowl pan for rapid stir frying.', rhymeWord: 'ROCK', affinity: ['STIRFRY', 'PAN'], associations: { 'STIRFRY': 95, 'PAN': 88, 'CHEF': 80, 'HEAT': 75 } },
      { word: 'STEAMER', riddle: 'Tiered perforated baskets cooking dumplings with vapor.', rhymeWord: 'DREAMER', affinity: ['VAPOR', 'BAMBOO'], associations: { 'VAPOR': 90, 'DUMPLING': 86, 'BOIL': 80, 'VEGGIE': 74 } },
      { word: 'DEEPFRYER', riddle: 'Vessel holding boiling oil for crispy food.', rhymeWord: 'FRYER', affinity: ['OIL', 'CRISPY'], associations: { 'OIL': 92, 'CHIPS': 86, 'FRY': 82, 'TEMP': 75 } },
      { word: 'KETTLE', riddle: 'Vessel whistling loud when water reaches boil.', rhymeWord: 'SETTLE', affinity: ['TEA', 'BOIL'], associations: { 'TEA': 94, 'WATER': 88, 'BOIL': 84, 'STEAM': 78 } },
      { word: 'TEAPOT', riddle: 'Ceramic vessel steeping loose leaves in hot water.', rhymeWord: 'SPOT', affinity: ['TEA', 'BREW'], associations: { 'TEA': 95, 'BREW': 88, 'CUP': 82, 'LEAF': 76 } },
      { word: 'PRESS', riddle: 'Piston device forcing espresso through ground beans.', rhymeWord: 'EXPRESS', affinity: ['COFFEE', 'FRENCH'], associations: { 'COFFEE': 94, 'ESPRESSO': 90, 'BREW': 85, 'FILTER': 78 } },
      { word: 'PERCOLATOR', riddle: 'Pot circulating boiling water gravity through coffee grounds.', rhymeWord: 'ELEVATOR', affinity: ['COFFEE', 'BREW'], associations: { 'COFFEE': 92, 'BREW': 86, 'POT': 80, 'HEAT': 74 } },
      { word: 'GRINDER', riddle: 'Rotary burrs crushing whole roasted coffee beans.', rhymeWord: 'BINDER', affinity: ['BEANS', 'BURR'], associations: { 'BEANS': 92, 'COFFEE': 88, 'CRUSH': 82, 'POWDER': 76 } },
      { word: 'SCALES', riddle: 'Precision digital weight sensor for baker ratios.', rhymeWord: 'BALES', affinity: ['WEIGHT', 'GRAMS'], associations: { 'WEIGHT': 90, 'BAKE': 84, 'GRAMS': 80, 'RATIO': 74 } },
      { word: 'TIMER', riddle: 'Audible countdown bell signaling baking time done.', rhymeWord: 'CLIMBER', affinity: ['BELL', 'MINUTES'], associations: { 'CLOCK': 88, 'OVEN': 84, 'BAKE': 80, 'ALARM': 75 } },
      { word: 'TIN', riddle: 'Metal baking mold holding muffin or loaf batter.', rhymeWord: 'PIN', affinity: ['LOAF', 'MUFFIN'], associations: { 'BAKE': 88, 'MUFFIN': 84, 'BREAD': 80, 'OVEN': 75 } },
      { word: 'BLANCHER', riddle: 'Pot pairing boiling water with ice bath plunge.', rhymeWord: 'RANCHER', affinity: ['ICE', 'BOIL'], associations: { 'BOIL': 88, 'ICE': 84, 'VEGGIE': 78, 'WATER': 72 } },
      { word: 'TUREEN', riddle: 'Lidded china vessel keeping rich soups hot.', rhymeWord: 'SCREEN', affinity: ['SOUP', 'CHINA'], associations: { 'SOUP': 90, 'BOWL': 84, 'SERVING': 78 } },
      { word: 'CARVER', riddle: 'Long slender knife slicing roast poultry neatly.', rhymeWord: 'STARVER', affinity: ['KNIFE', 'ROAST'], associations: { 'KNIFE': 92, 'MEAT': 86, 'ROAST': 82, 'SLICE': 78 } },
      { word: 'CLEAVER', riddle: 'Thick heavy blade severing bone joints cleanly.', rhymeWord: 'WEAVER', affinity: ['BONE', 'CHOP'], associations: { 'KNIFE': 90, 'MEAT': 85, 'CHOP': 80 } },
      { word: 'CUTLERY', riddle: 'Collection of knives forks and silver spoons.', rhymeWord: 'BUTLERY', affinity: ['SILVER', 'FORK'], associations: { 'FORK': 90, 'SPOON': 88, 'KNIFE': 86, 'DINNER': 80 } },
      { word: 'CROCK', riddle: 'Earthenware jar fermenting pickles or kimchi slowly.', rhymeWord: 'ROCK', affinity: ['PICKLE', 'FERMENT'], associations: { 'JAR': 88, 'PICKLE': 84, 'BRINE': 80 } },
      { word: 'CANISTER', riddle: 'Airtight storage tub keeping flour and sugar fresh.', rhymeWord: 'MINISTER', affinity: ['SUGAR', 'FLOUR'], associations: { 'FLOUR': 88, 'SUGAR': 84, 'JAR': 80, 'STORE': 72 } },
      { word: 'SPICEBOX', riddle: 'Compartmented tin housing aromatic curry pods.', rhymeWord: 'BOX', affinity: ['CURRY', 'PODS'], associations: { 'SPICE': 94, 'CURRY': 88, 'POD': 80 } },
      { word: 'MEATGRINDER', riddle: 'Hand crank spiral pushing chuck into minced patties.', rhymeWord: 'FINDER', affinity: ['MINCE', 'BEEF'], associations: { 'BEEF': 90, 'MINCE': 86, 'BURGER': 80 } },
      { word: 'SALADSPINNER', riddle: 'Centrifugal basket drying washed leafy greens fast.', rhymeWord: 'WINNER', affinity: ['LETTUCE', 'GREENS'], associations: { 'LETTUCE': 92, 'GREENS': 88, 'DRY': 82 } },
      { word: 'EGGSEPARATOR', riddle: 'Slotted spoon draining white away from yolk.', rhymeWord: 'WAITOR', affinity: ['YOLK', 'WHITE'], associations: { 'EGG': 95, 'YOLK': 90, 'BAKE': 80 } }
    ]
  },
  {
    id: 'deep-cosmos',
    name: 'Deep Cosmos',
    icon: '🚀',
    badge: 'ASTRONOMY',
    description: 'Stellar phenomena, intergalactic bodies, and space exploration',
    wordPool: [
      { word: 'SUPERNOVA', riddle: 'Colossal stellar explosion ending a star life cycle.', rhymeWord: 'NOVA', affinity: ['STAR', 'EXPLOSION'], associations: { 'NEBULA': 93, 'BLACKHOLE': 90, 'PULSAR': 87, 'GALAXY': 84, 'STAR': 78, 'GRAVITY': 74 } },
      { word: 'NEBULA', riddle: 'Interstellar cloud of glowing dust and ionized gas.', rhymeWord: 'FORMULA', affinity: ['GAS', 'CLOUD'], associations: { 'SUPERNOVA': 93, 'STAR': 88, 'COSMOS': 84, 'GAS': 78, 'DUST': 72 } },
      { word: 'BLACKHOLE', riddle: 'Gravitational singularity where light cannot escape.', rhymeWord: 'POLE', affinity: ['SINGULARITY', 'GRAVITY'], associations: { 'GRAVITY': 94, 'SINGULARITY': 90, 'EVENT': 85, 'VOID': 80 } },
      { word: 'PULSAR', riddle: 'Magnetized rotating neutron star emitting periodic radiation.', rhymeWord: 'QUASAR', affinity: ['STAR', 'RADIATION'], associations: { 'QUASAR': 92, 'NEUTRON': 88, 'STAR': 82, 'BEAM': 76 } },
      { word: 'QUASAR', riddle: 'Extremely luminous active galactic nucleus driven by black holes.', rhymeWord: 'PULSAR', affinity: ['NUCLEUS', 'GALAXY'], associations: { 'PULSAR': 92, 'GALAXY': 88, 'LIGHT': 82, 'BLACKHOLE': 80 } },
      { word: 'ASTEROID', riddle: 'Rocky minor planet orbiting in space belts.', rhymeWord: 'ANDROID', affinity: ['ROCK', 'BELT'], associations: { 'COMET': 90, 'METEOR': 86, 'ORBIT': 80, 'SPACE': 75 } },
      { word: 'METEOR', riddle: 'Streak of light when space rock enters atmosphere.', rhymeWord: 'SECTOR', affinity: ['ROCK', 'LIGHT'], associations: { 'ASTEROID': 90, 'COMET': 86, 'CRATER': 80 } },
      { word: 'COMET', riddle: 'Icy small body developing glowing tail near Sun.', rhymeWord: 'PLANET', affinity: ['ICE', 'TAIL'], associations: { 'ASTEROID': 90, 'ICE': 85, 'ORBIT': 80, 'TAIL': 75 } },
      { word: 'GALAXY', riddle: 'Gravitationally bound system of billions of stars.', rhymeWord: 'TAXONOMY', affinity: ['STARS', 'SPIRAL'], associations: { 'MILKYWAY': 94, 'STARS': 90, 'COSMOS': 86, 'SPIRAL': 80 } },
      { word: 'PARALLAX', riddle: 'Apparent shift of star position from orbital view.', rhymeWord: 'CLIMAX', affinity: ['SHIFT', 'ORBIT'], associations: { 'DISTANCE': 88, 'STAR': 82, 'ORBIT': 78 } },
      { word: 'EXOPLANET', riddle: 'Alien planet orbiting a distant star system.', rhymeWord: 'PLANET', affinity: ['ALIEN', 'ORBIT'], associations: { 'PLANET': 94, 'STAR': 88, 'ORBIT': 82, 'KEPLER': 76 } },
      { word: 'MAGNETAR', riddle: 'Neutron star powered by intense magnetic fields.', rhymeWord: 'AVATAR', affinity: ['MAGNETIC', 'STAR'], associations: { 'PULSAR': 92, 'NEUTRON': 88, 'FIELD': 82 } },
      { word: 'ECLIPSE', riddle: 'Obscuration of celestial body by passing shadow.', rhymeWord: 'ELLIPSE', affinity: ['SHADOW', 'MOON'], associations: { 'SOLAR': 92, 'MOON': 88, 'SHADOW': 84, 'SUN': 80 } },
      { word: 'ORBIT', riddle: 'Curved gravitational path of celestial body round another.', rhymeWord: 'HOBBIT', affinity: ['PATH', 'GRAVITY'], associations: { 'GRAVITY': 90, 'PLANET': 85, 'PATH': 80, 'LOOP': 75 } },
      { word: 'TELESCOPE', riddle: 'Optical instrument magnifying distant galactic light.', rhymeWord: 'SCOPE', affinity: ['OPTIC', 'LENS'], associations: { 'HUBBLE': 92, 'LENS': 86, 'LIGHT': 80, 'STAR': 75 } },
      { word: 'ASTRONAUT', riddle: 'Trained commander exploring cosmic vacuum realms.', rhymeWord: 'JUGGERNAUT', affinity: ['SUIT', 'SPACE'], associations: { 'ROCKET': 90, 'SPACE': 86, 'SUIT': 82, 'NASA': 78 } },
      { word: 'COSMOS', riddle: 'Harmonious order of the total universe.', rhymeWord: 'PROS', affinity: ['UNIVERSE', 'SPACE'], associations: { 'GALAXY': 90, 'UNIVERSE': 88, 'SPACE': 84 } },
      { word: 'SINGULARITY', riddle: 'Core point of infinite density inside black holes.', rhymeWord: 'CHARITY', affinity: ['DENSITY', 'BLACKHOLE'], associations: { 'BLACKHOLE': 95, 'DENSITY': 90, 'PHYSICS': 80 } },
      { word: 'HELIOSPHERE', riddle: 'Bubble region of space dominated by solar winds.', rhymeWord: 'SPHERE', affinity: ['SOLAR', 'WIND'], associations: { 'SOLAR': 90, 'SUN': 86, 'WIND': 80 } },
      { word: 'CHROMOSPHERE', riddle: 'Reddish gaseous layer of the solar atmosphere.', rhymeWord: 'SPHERE', affinity: ['SUN', 'GAS'], associations: { 'SUN': 92, 'SOLAR': 88, 'ATMOSPHERE': 82 } },
      { word: 'PHOTOSPHERE', riddle: 'Visible glowing outer surface of our sun.', rhymeWord: 'SPHERE', affinity: ['SUN', 'LIGHT'], associations: { 'SUN': 94, 'LIGHT': 88, 'SURFACE': 82 } },
      { word: 'LIGHTYEAR', riddle: 'Distance light travels through vacuum in one year.', rhymeWord: 'YEAR', affinity: ['DISTANCE', 'SPEED'], associations: { 'DISTANCE': 92, 'SPEED': 88, 'TIME': 80 } },
      { word: 'GRAVITY', riddle: 'Fundamental force attracting physical masses together.', rhymeWord: 'DEPRAVITY', affinity: ['FORCE', 'MASS'], associations: { 'MASS': 92, 'ORBIT': 88, 'FORCE': 84 } },
      { word: 'SOLAR', riddle: 'Pertaining to energy and radiation from suns.', rhymeWord: 'POLAR', affinity: ['SUN', 'RAY'], associations: { 'SUN': 94, 'RAY': 88, 'HEAT': 80 } },
      { word: 'LUNAR', riddle: 'Pertaining to Earth orbiting natural satellite moon.', rhymeWord: 'TUNER', affinity: ['MOON', 'CRATER'], associations: { 'MOON': 96, 'CRATER': 88, 'ORBIT': 82 } },
      { word: 'ZENITH', riddle: 'Imaginary point directly overhead in celestial sphere.', rhymeWord: 'MONOLITH', affinity: ['OVERHEAD', 'SKY'], associations: { 'SKY': 88, 'POINT': 82, 'APEX': 80 } },
      { word: 'NADIR', riddle: 'Point on celestial sphere directly beneath observer.', rhymeWord: 'CADIR', affinity: ['BOTTOM', 'SPHERE'], associations: { 'ZENITH': 90, 'POINT': 82, 'BOTTOM': 78 } },
      { word: 'SOLSTICE', riddle: 'Sun reaching its highest or lowest excursion.', rhymeWord: 'JUSTICE', affinity: ['SUN', 'SEASON'], associations: { 'SUN': 90, 'SUMMER': 84, 'WINTER': 84 } },
      { word: 'EQUINOX', riddle: 'Time when day and night have equal length.', rhymeWord: 'BOX', affinity: ['DAY', 'NIGHT'], associations: { 'SUN': 90, 'DAY': 84, 'NIGHT': 84 } },
      { word: 'CRATER', riddle: 'Bowl shaped depression left by meteor impact.', rhymeWord: 'GREATER', affinity: ['IMPACT', 'MOON'], associations: { 'METEOR': 90, 'MOON': 86, 'IMPACT': 82 } },
      { word: 'CORONA', riddle: 'Aura of plasma surrounding solar atmosphere.', rhymeWord: 'SONA', affinity: ['PLASMA', 'SUN'], associations: { 'SUN': 94, 'PLASMA': 88, 'ECLIPSE': 84 } },
      { word: 'PROTOSUN', riddle: 'Early dense gas ball before nuclear fusion.', rhymeWord: 'SUN', affinity: ['FUSION', 'GAS'], associations: { 'SUN': 92, 'STAR': 86, 'GAS': 80 } },
      { word: 'SUPERCLUSTER', riddle: 'Massive group of smaller galaxy clusters bound.', rhymeWord: 'CLUSTER', affinity: ['GALAXY', 'GROUP'], associations: { 'GALAXY': 94, 'COSMOS': 88, 'GROUP': 82 } },
      { word: 'QUARK', riddle: 'Elementary particle building blocks of matter.', rhymeWord: 'MARK', affinity: ['PARTICLE', 'PHYSICS'], associations: { 'ATOM': 90, 'PHYSICS': 85, 'PARTICLE': 82 } },
      { word: 'PHOTON', riddle: 'Quantum particle of electromagnetic light energy.', rhymeWord: 'PROTON', affinity: ['LIGHT', 'QUANTUM'], associations: { 'LIGHT': 95, 'QUANTUM': 90, 'ENERGY': 84 } },
      { word: 'PROTON', riddle: 'Subatomic particle with positive electrical charge.', rhymeWord: 'PHOTON', affinity: ['ATOM', 'CHARGE'], associations: { 'ATOM': 92, 'ELECTRON': 88, 'CHARGE': 82 } },
      { word: 'NEUTRON', riddle: 'Neutral subatomic particle inside atomic nuclei.', rhymeWord: 'ELECTRON', affinity: ['ATOM', 'NEUTRAL'], associations: { 'ATOM': 92, 'PROTON': 88, 'STAR': 82 } },
      { word: 'ELECTRON', riddle: 'Subatomic particle carrying negative charge around nucleus.', rhymeWord: 'PROTON', affinity: ['ATOM', 'CHARGE'], associations: { 'ATOM': 92, 'CHARGE': 86, 'ORBIT': 80 } },
      { word: 'APOGEE', riddle: 'Farthest point in satellite Earth orbit path.', rhymeWord: 'GEE', affinity: ['ORBIT', 'POINT'], associations: { 'ORBIT': 90, 'PERIGEE': 88, 'EARTH': 80 } },
      { word: 'PERIGEE', riddle: 'Closest point of orbiting moon to Earth.', rhymeWord: 'GEE', affinity: ['ORBIT', 'MOON'], associations: { 'ORBIT': 90, 'APOGEE': 88, 'MOON': 82 } },
      { word: 'AZIMUTH', riddle: 'Angular measurement in spherical coordinate system.', rhymeWord: 'MOUTH', affinity: ['ANGLE', 'DEGREE'], associations: { 'ANGLE': 88, 'COORD': 84, 'COMPASS': 78 } },
      { word: 'PERIHELION', riddle: 'Point in planet orbit closest to sun.', rhymeWord: 'HELION', affinity: ['SUN', 'ORBIT'], associations: { 'SUN': 92, 'ORBIT': 88, 'APHELION': 84 } },
      { word: 'APHELION', riddle: 'Point in planet orbit furthest from sun.', rhymeWord: 'HELION', affinity: ['SUN', 'ORBIT'], associations: { 'SUN': 92, 'ORBIT': 88, 'PERIHELION': 84 } },
      { word: 'REDSHIFT', riddle: 'Increase in electromagnetic wavelength due to expansion.', rhymeWord: 'SHIFT', affinity: ['LIGHT', 'EXPANSION'], associations: { 'SPECTRUM': 90, 'HUBBLE': 86, 'LIGHT': 82 } },
      { word: 'BLUESHIFT', riddle: 'Decrease in wavelength as celestial objects approach.', rhymeWord: 'SHIFT', affinity: ['SPECTRUM', 'LIGHT'], associations: { 'SPECTRUM': 90, 'REDSHIFT': 86 } },
      { word: 'ASTRONOMY', riddle: 'Scientific study of celestial space objects.', rhymeWord: 'ECONOMY', affinity: ['SPACE', 'SCIENCE'], associations: { 'SPACE': 94, 'SCIENCE': 88, 'STAR': 84 } },
      { word: 'ASTROPHYSICS', riddle: 'Branch of space science applying physics laws.', rhymeWord: 'PHYSICS', affinity: ['PHYSICS', 'SPACE'], associations: { 'PHYSICS': 94, 'SPACE': 90, 'SCIENCE': 85 } },
      { word: 'COSMOLOGY', riddle: 'Study of origin and evolution of cosmos.', rhymeWord: 'BIOLOGY', affinity: ['ORIGIN', 'UNIVERSE'], associations: { 'COSMOS': 92, 'UNIVERSE': 90, 'BIGBANG': 86 } },
      { word: 'TECTONICS', riddle: 'Large scale motion of planetary crustal plates.', rhymeWord: 'ELECTRONICS', affinity: ['CRUST', 'PLATE'], associations: { 'PLANET': 88, 'CRUST': 84, 'ROCK': 78 } },
      { word: 'DARKMATTER', riddle: 'Hypothetical invisible form of mass binding galaxies.', rhymeWord: 'MATTER', affinity: ['MASS', 'INVISIBLE'], associations: { 'MASS': 92, 'GRAVITY': 88, 'VOID': 82 } }
    ]
  },
  {
    id: 'speakeasy-bar',
    name: 'Speakeasy Bar',
    icon: '🍸',
    badge: 'MIXOLOGY',
    description: 'Classic cocktails, fine spirits, and secret lounges',
    wordPool: [
      { word: 'NEGRONI', riddle: 'Equal parts Gin, Campari, and Sweet Vermouth.', rhymeWord: 'PONI', affinity: ['GIN', 'CAMPARI'], associations: { 'MANHATTAN': 93, 'CAMPARI': 91, 'GIN': 88, 'VERMOUTH': 85, 'COCKTAIL': 82, 'BOURBON': 79 } },
      { word: 'MANHATTAN', riddle: 'Rye whiskey mixed with vermouth and bitters.', rhymeWord: 'SATAN', affinity: ['WHISKEY', 'VERMOUTH'], associations: { 'NEGRONI': 93, 'WHISKEY': 90, 'VERMOUTH': 86, 'BITTERS': 82 } },
      { word: 'MARTINI', riddle: 'Gin and dry vermouth garnished with olive.', rhymeWord: 'ZUCCHINI', affinity: ['GIN', 'OLIVE'], associations: { 'GIN': 94, 'VERMOUTH': 90, 'OLIVE': 86, 'SHAKEN': 80 } },
      { word: 'DAIQUIRI', riddle: 'Rum citrus lime juice and simple syrup.', rhymeWord: 'INQUIRY', affinity: ['RUM', 'LIME'], associations: { 'RUM': 94, 'LIME': 90, 'SYRUP': 84, 'SHAKER': 78 } },
      { word: 'SAZERAC', riddle: 'Cognac or rye whiskey rinsed with absinthe.', rhymeWord: 'BACK', affinity: ['ABSINTHE', 'RYE'], associations: { 'ABSINTHE': 92, 'RYE': 88, 'BITTERS': 84, 'WHISKEY': 80 } },
      { word: 'CAMPARI', riddle: 'Bittersweet red Italian aperitif infused with herbs.', rhymeWord: 'SAFARI', affinity: ['HERBAL', 'BITTER'], associations: { 'NEGRONI': 95, 'BITTER': 90, 'APERITIF': 86, 'RED': 78 } },
      { word: 'VERMOUTH', riddle: 'Aromatized fortified wine flavored with botanicals.', rhymeWord: 'MOUTH', affinity: ['WINE', 'BOTANICAL'], associations: { 'MARTINI': 92, 'NEGRONI': 90, 'WINE': 84, 'HERB': 78 } },
      { word: 'BOURBON', riddle: 'American barrel aged whiskey distilled from corn.', rhymeWord: 'RIBBON', affinity: ['WHISKEY', 'CORN'], associations: { 'WHISKEY': 95, 'BARREL': 88, 'CORN': 82, 'SCOTCH': 80 } },
      { word: 'ABSINTHE', riddle: 'Anise flavored high proof spirit wormwood botanical.', rhymeWord: 'PLINTH', affinity: ['ANISE', 'HERB'], associations: { 'SAZERAC': 92, 'GREEN': 86, 'ANISE': 82, 'SPIRIT': 78 } },
      { word: 'BITTERS', riddle: 'Concentrated botanical alcohol drops added for aroma.', rhymeWord: 'FITTERS', affinity: ['AROMA', 'DROPS'], associations: { 'MANHATTAN': 90, 'DROPS': 84, 'AROMA': 80, 'HERB': 75 } },
      { word: 'SHAKER', riddle: 'Metal canister used to chill stirred cocktails.', rhymeWord: 'MAKER', affinity: ['ICE', 'STRAINER'], associations: { 'ICE': 90, 'COCKTAIL': 88, 'STRAINER': 84, 'MIX': 80 } },
      { word: 'JIGGER', riddle: 'Hourglass shaped metal tool measuring liquor ounces.', rhymeWord: 'DIGGER', affinity: ['OUNCE', 'POUR'], associations: { 'POUR': 92, 'MEASURE': 88, 'SHOT': 82, 'BAR': 76 } },
      { word: 'MUDDLER', riddle: 'Wooden pestle mashing mint leaves and fruit.', rhymeWord: 'FUDDLER', affinity: ['MINT', 'PESTLE'], associations: { 'MOJITO': 94, 'MINT': 90, 'CRUSH': 84, 'LIME': 80 } },
      { word: 'HIGHBALL', riddle: 'Tall glass filled with liquor and carbonated mixer.', rhymeWord: 'BALL', affinity: ['GLASS', 'SODA'], associations: { 'GLASS': 90, 'WHISKEY': 84, 'SODA': 80, 'ICE': 75 } },
      { word: 'SPEAKEASY', riddle: 'Illicit secret lounge operating behind hidden doors.', rhymeWord: 'EASY', affinity: ['SECRET', 'LOUNGE'], associations: { 'BAR': 92, 'LOUNGE': 88, 'SECRET': 84, 'DRINK': 78 } },
      { word: 'SOMMELIER', riddle: 'Trained wine professional managing cellar pairings.', rhymeWord: 'CAVALIER', affinity: ['WINE', 'CELLAR'], associations: { 'WINE': 95, 'CELLAR': 88, 'BOTTLE': 82 } },
      { word: 'DECANT', riddle: 'Pouring wine into vessel to separate sediment.', rhymeWord: 'CANT', affinity: ['WINE', 'VESSEL'], associations: { 'WINE': 92, 'BOTTLE': 86, 'POUR': 82 } },
      { word: 'TEQUILA', riddle: 'Distilled spirit crafted from blue agave plants.', rhymeWord: 'ATTILA', affinity: ['AGAVE', 'MEXICO'], associations: { 'AGAVE': 95, 'MEZCAL': 90, 'MARGARITA': 88, 'SHOT': 82 } },
      { word: 'MEZCAL', riddle: 'Smoky agave spirit roasted in underground pits.', rhymeWord: 'LOCAL', affinity: ['AGAVE', 'SMOKE'], associations: { 'TEQUILA': 92, 'SMOKE': 88, 'AGAVE': 84 } },
      { word: 'COGNAC', riddle: 'Double distilled French grape brandy aged in oak.', rhymeWord: 'ZODIAC', affinity: ['BRANDY', 'OAK'], associations: { 'BRANDY': 94, 'OAK': 88, 'WINE': 82 } },
      { word: 'GARNISH', riddle: 'Citrus peel or olive added to decorate drink.', rhymeWord: 'VARNISH', affinity: ['OLIVE', 'PEEL'], associations: { 'OLIVE': 90, 'PEEL': 86, 'LIME': 82 } },
      { word: 'ICEBALL', riddle: 'Spherical slow melting ice cube inside whiskey glasses.', rhymeWord: 'BALL', affinity: ['ICE', 'GLASS'], associations: { 'ICE': 94, 'WHISKEY': 88, 'GLASS': 82 } },
      { word: 'COCKTAIL', riddle: 'Mixed alcoholic drink blending spirits with aromas.', rhymeWord: 'DETAIL', affinity: ['SPIRITS', 'DRINK'], associations: { 'DRINK': 92, 'BAR': 88, 'MIX': 84 } },
      { word: 'INFUSION', riddle: 'Steeping herbs or fruits inside neutral spirits.', rhymeWord: 'CONFUSION', affinity: ['HERBS', 'FLAVOR'], associations: { 'FLAVOR': 88, 'HERB': 84, 'SPIRIT': 80 } },
      { word: 'LIQUEUR', riddle: 'Sweetened spirit flavored with cream herbs or nuts.', rhymeWord: 'MANICURE', affinity: ['SWEET', 'FLAVOR'], associations: { 'SWEET': 88, 'SPIRIT': 84, 'SYRUP': 80 } },
      { word: 'PROHIBITION', riddle: 'Historical era banning manufacturing and sale of alcohol.', rhymeWord: 'AMBITION', affinity: ['BAN', 'SECRET'], associations: { 'SPEAKEASY': 92, 'HISTORY': 84, 'LAW': 78 } },
      { word: 'TAVERN', riddle: 'Rustic establishment serving ales and warm meals.', rhymeWord: 'CAVERN', affinity: ['ALE', 'BAR'], associations: { 'BAR': 90, 'PUB': 88, 'BEER': 84 } },
      { word: 'DISTILLERY', riddle: 'Facility where fermented mash is heated to spirits.', rhymeWord: 'STILLERY', affinity: ['STILL', 'BARREL'], associations: { 'WHISKEY': 90, 'BARREL': 86, 'SPIRIT': 82 } },
      { word: 'BARREL', riddle: 'Charred oak cask aging bourbon over years.', rhymeWord: 'CARREL', affinity: ['OAK', 'AGE'], associations: { 'OAK': 92, 'WHISKEY': 90, 'AGE': 84 } },
      { word: 'BEER', riddle: 'Fermented malt beverage flavored with bitter hops.', rhymeWord: 'DEER', affinity: ['HOPS', 'MALT'], associations: { 'ALE': 92, 'HOPS': 88, 'PUB': 84 } },
      { word: 'CIDER', riddle: 'Fermented juice pressed from fresh sweet apples.', rhymeWord: 'RIDER', affinity: ['APPLE', 'JUICE'], associations: { 'APPLE': 94, 'JUICE': 86, 'DRINK': 80 } },
      { word: 'CHAMPAGNE', riddle: 'Effervescent sparkling white wine from French region.', rhymeWord: 'CAMPAIGN', affinity: ['SPARKLING', 'WINE'], associations: { 'WINE': 94, 'BUBBLES': 88, 'TOAST': 82 } },
      { word: 'GIN', riddle: 'Clear liquor redistilled with fragrant juniper berries.', rhymeWord: 'PIN', affinity: ['JUNIPER', 'BERRY'], associations: { 'NEGRONI': 92, 'MARTINI': 90, 'JUNIPER': 88 } },
      { word: 'RUM', riddle: 'Distilled spirit crafted from sugarcane molasses juice.', rhymeWord: 'HUM', affinity: ['SUGAR', 'CANE'], associations: { 'DAIQUIRI': 92, 'MOJITO': 90, 'SUGAR': 84 } },
      { word: 'VODKA', riddle: 'Neutral spirit distilled from potatoes or grain.', rhymeWord: 'SHOTKA', affinity: ['GRAIN', 'POTATO'], associations: { 'MARTINI': 88, 'DRINK': 84, 'SHOT': 80 } },
      { word: 'SYRUP', riddle: 'Concentrated sugar liquid adding sweetness to drinks.', rhymeWord: 'STIRRUP', affinity: ['SUGAR', 'SWEET'], associations: { 'SUGAR': 92, 'SWEET': 86, 'MIX': 80 } },
      { word: 'CITRUS', riddle: 'Acidic lime or lemon juice balancing cocktail sugar.', rhymeWord: 'MITRUS', affinity: ['LIME', 'LEMON'], associations: { 'LIME': 92, 'LEMON': 90, 'SOUR': 84 } },
      { word: 'BITTERNESS', riddle: 'Sharp botanical taste profile provided by herbs.', rhymeWord: 'SWEETNESS', affinity: ['HERBS', 'TASTE'], associations: { 'BITTERS': 92, 'TASTE': 84, 'HERB': 80 } },
      { word: 'STIRRER', riddle: 'Glass rod blending ice and liquids gently.', rhymeWord: 'ERRER', affinity: ['ICE', 'MIX'], associations: { 'MIX': 88, 'SPOON': 84, 'ICE': 80 } },
      { word: 'STRAINER', riddle: 'Perforated metal disk holding back ice chunks.', rhymeWord: 'TRAINER', affinity: ['SHAKER', 'ICE'], associations: { 'SHAKER': 92, 'ICE': 86, 'POUR': 80 } },
      { word: 'SHOTGLASS', riddle: 'Small glass holding single measure of liquor.', rhymeWord: 'GLASS', affinity: ['LIQUOR', 'DRINK'], associations: { 'SHOT': 94, 'GLASS': 88, 'BAR': 82 } },
      { word: 'PITCHER', riddle: 'Large container used to serve sangria to groups.', rhymeWord: 'RICHER', affinity: ['SANGRIA', 'SERVING'], associations: { 'GLASS': 84, 'DRINK': 80, 'SERVING': 76 } },
      { word: 'BREWERY', riddle: 'Facility where malt and hops are converted to beer.', rhymeWord: 'JEWELRY', affinity: ['BEER', 'HOPS'], associations: { 'BEER': 94, 'HOPS': 88, 'ALE': 84 } },
      { word: 'LOUNGE', riddle: 'Plush comfortable bar room for relaxed drinking.', rhymeWord: 'SPONGE', affinity: ['BAR', 'SEAT'], associations: { 'BAR': 90, 'SPEAKEASY': 86, 'CLUB': 80 } },
      { word: 'SALOON', riddle: 'Historic western bar featuring swinging wooden doors.', rhymeWord: 'BALLOON', affinity: ['BAR', 'WHISKEY'], associations: { 'BAR': 88, 'TAVERN': 84, 'PUB': 80 } },
      { word: 'NIGHTCLUB', riddle: 'Venue featuring loud music dancing and evening drinks.', rhymeWord: 'CLUB', affinity: ['MUSIC', 'DANCE'], associations: { 'BAR': 84, 'DANCE': 80, 'PARTY': 76 } },
      { word: 'BARTENDER', riddle: 'Skilled mixologist crafting cocktails behind the counter.', rhymeWord: 'ENDER', affinity: ['MIXOLOGIST', 'CHEF'], associations: { 'BAR': 94, 'DRINK': 88, 'MIX': 82 } },
      { word: 'PUB', riddle: 'British neighborhood drinking house serving draft ales.', rhymeWord: 'CLUB', affinity: ['ALE', 'BAR'], associations: { 'BEER': 92, 'BAR': 88, 'ALE': 84 } },
      { word: 'DRAUGHT', riddle: 'Beer served fresh from pressurized keg spigots.', rhymeWord: 'CRAFT', affinity: ['KEG', 'BEER'], associations: { 'BEER': 94, 'KEG': 90, 'TAP': 86 } },
      { word: 'SPIGOT', riddle: 'Valve tap controlling liquid flow from wooden barrels.', rhymeWord: 'BIGOT', affinity: ['TAP', 'BARREL'], associations: { 'TAP': 90, 'BARREL': 84, 'POUR': 80 } }
    ]
  }
];

export type HintArchetype = 'LETTER_REVEAL' | 'PHONETIC_PATTERN' | 'CRYPTIC_RIDDLE' | 'RHYME_STRUCTURE' | 'VECTOR_AFFINITY';

export interface DynamicHint {
  archetype: HintArchetype;
  badge: string;
  text: string;
}

/**
 * Dynamically generates a randomized cryptic hint matching one of 5 archetypes for a target word.
 */
export function generateRandomHint(targetWord: string, theme: Theme): DynamicHint {
  const word = targetWord.toUpperCase();
  const len = word.length;

  // Search database for word details if available
  let foundEntry: WordEntry | undefined;
  for (const dbTheme of THEME_DATABASE) {
    const match = dbTheme.wordPool.find(e => e.word.toUpperCase() === word);
    if (match) {
      foundEntry = match;
      break;
    }
  }

  const archetypes: HintArchetype[] = [
    'LETTER_REVEAL',
    'PHONETIC_PATTERN',
    'CRYPTIC_RIDDLE',
    'RHYME_STRUCTURE',
    'VECTOR_AFFINITY'
  ];

  // Pick random archetype
  const chosenArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];

  switch (chosenArchetype) {
    case 'LETTER_REVEAL': {
      // Pick random letter index (excluding 1st if possible for extra mystery)
      const randIdx = len > 2 ? 1 + Math.floor(Math.random() * (len - 1)) : 0;
      const posName = getOrdinalSuffix(randIdx + 1);
      return {
        archetype: 'LETTER_REVEAL',
        badge: '[LETTER REVEAL]',
        text: `The ${posName} character in this word is '${word[randIdx]}'.`
      };
    }
    case 'PHONETIC_PATTERN': {
      const vowels = (word.match(/[AEIOU]/g) || []).length;
      const consonants = len - vowels;
      return {
        archetype: 'PHONETIC_PATTERN',
        badge: '[PHONETIC PATTERN]',
        text: `Contains exactly ${vowels} vowel${vowels === 1 ? '' : 's'} and ${consonants} consonant${consonants === 1 ? '' : 's'}.`
      };
    }
    case 'CRYPTIC_RIDDLE': {
      const riddleText = foundEntry?.riddle || theme.clues[1] || `Key target concept inside the ${theme.name} domain.`;
      return {
        archetype: 'CRYPTIC_RIDDLE',
        badge: '[CRYPTIC RIDDLE]',
        text: `"${riddleText}"`
      };
    }
    case 'RHYME_STRUCTURE': {
      const rhyme = foundEntry?.rhymeWord || 'RISK';
      return {
        archetype: 'RHYME_STRUCTURE',
        badge: '[RHYME & STRUCTURE]',
        text: `A ${len}-letter word that rhymes with '${rhyme}'.`
      };
    }
    case 'VECTOR_AFFINITY': {
      const aff = foundEntry?.affinity || ['SPATULA', 'BEATER'];
      return {
        archetype: 'VECTOR_AFFINITY',
        badge: '[VECTOR AFFINITY]',
        text: `Shares high vector proximity with '${aff[0]}' and '${aff[1]}'.`
      };
    }
  }
}

function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const PLAYED_WORDS_STORAGE_KEY = 'proximity_played_words_history';

/**
 * Gets a non-repeating target word from theme database pool.
 */
export function getNonRepeatingTargetWord(themeId: string, defaultTargetWord: string): { word: string; entry?: WordEntry } {
  const db = THEME_DATABASE.find(t => t.id === themeId);
  if (!db || db.wordPool.length === 0) {
    return { word: defaultTargetWord };
  }

  // Load history from LocalStorage
  let playedHistory: Record<string, string[]> = {};
  try {
    const raw = localStorage.getItem(PLAYED_WORDS_STORAGE_KEY);
    if (raw) playedHistory = JSON.parse(raw);
  } catch {
    // Ignore storage errors
  }

  const themePlayed = playedHistory[themeId] || [];

  // Filter pool for unplayed words
  const unplayed = db.wordPool.filter(e => !themePlayed.includes(e.word.toUpperCase()));

  let chosenEntry: WordEntry;
  if (unplayed.length > 0) {
    chosenEntry = unplayed[Math.floor(Math.random() * unplayed.length)];
  } else {
    // Reset history if all 50+ words have been played!
    themePlayed.length = 0;
    chosenEntry = db.wordPool[Math.floor(Math.random() * db.wordPool.length)];
  }

  // Record choice in LocalStorage
  try {
    playedHistory[themeId] = [...(playedHistory[themeId] || []), chosenEntry.word.toUpperCase()];
    localStorage.setItem(PLAYED_WORDS_STORAGE_KEY, JSON.stringify(playedHistory));
  } catch {
    // Ignore storage errors
  }

  return { word: chosenEntry.word.toUpperCase(), entry: chosenEntry };
}
