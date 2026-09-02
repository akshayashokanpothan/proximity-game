import sqlite3
import json
import os
from database import get_db_connection, init_db

THEME_SEED_DATA = [
    {
        "id": "kitchen-cooking",
        "name": "Kitchen & Cooking",
        "icon": "🍳",
        "badge": "KITCHEN",
        "description": "Yummy food, cooking tools, and kitchen fun!",
        "target": "WHISK",
        "words": [
            "WHISK", "SPATULA", "BEATER", "BLENDER", "MIXER", "LADLE", "TONGS", "SKILLET",
            "PAN", "OVEN", "COOK", "CHEF", "BOWL", "RECIPE", "BAKE", "KNIFE", "SPOON", "FORK",
            "PLATE", "APRON", "SAUCE", "FOOD", "WATER", "TABLE", "CUTTING", "BOARD", "GRATER",
            "COLANDER", "PEELER", "POT", "KETTLE", "TOASTER", "MICROWAVE", "FRIDGE", "FREEZER",
            "SPICE", "PEPPER", "SALT", "SUGAR", "FLOUR", "BUTTER", "OIL", "VINEGAR", "GARLIC",
            "ONION", "HERB", "BASIL", "OREGANO", "THYME", "PARSLEY", "STEAM", "ROAST"
        ],
        "clues": [
            "It has 5 letters and starts with 'W'.",
            "Tool used to mix eggs and whip cream fast!",
            "It has wire loops to spin air into batter."
        ]
    },
    {
        "id": "outer-space",
        "name": "Outer Space",
        "icon": "🚀",
        "badge": "SPACE",
        "description": "Rockets, shiny stars, and floating in space!",
        "target": "SUPERNOVA",
        "words": [
            "SUPERNOVA", "NEBULA", "BLACKHOLE", "PULSAR", "GALAXY", "COSMOS", "STAR", "GRAVITY",
            "ASTEROID", "COMET", "ORBIT", "TELESCOPE", "PLANET", "SOLAR", "SPACE", "ASTRONAUT",
            "ROCKET", "SATELLITE", "LIGHT", "VOID", "METEOR", "ECLIPSE", "CRATER", "LUNAR",
            "MARS", "JUPITER", "SATURN", "VENUS", "MERCURY", "NEPTUNE", "URANUS", "PLUTO",
            "UNIVERSE", "SPACESHIP", "SHUTTLE", "MODULE", "ROVER", "LANDER", "PROBE", "SPECTRUM",
            "RADIATION", "PHOTON", "QUASAR", "ATMOSPHERE", "CORONA", "FLARE", "HORIZON", "DENSITY",
            "MASS", "ZERO", "G", "VACUUM", "STATION"
        ],
        "clues": [
            "It has 9 letters and starts with 'S'.",
            "A gigantic giant star exploding in deep space!",
            "Leaves behind neutron stars and black holes."
        ]
    },
    {
        "id": "drinks-bar",
        "name": "Drinks & Lounges",
        "icon": "🍸",
        "badge": "DRINKS",
        "description": "Fizzy drinks, ice cubes, and cozy cafes!",
        "target": "NEGRONI",
        "words": [
            "NEGRONI", "MANHATTAN", "CAMPARI", "GIN", "VERMOUTH", "COCKTAIL", "BOURBON", "BITTERS",
            "SHAKER", "MIXOLOGY", "SPIRITS", "SPEAKEASY", "BAR", "ICE", "GARNISH", "LIQUOR",
            "GLASS", "WHISKEY", "DRINK", "PARTY", "MOCKTAIL", "JUICE", "SODA", "TONIC", "LIME",
            "LEMON", "ORANGE", "PEEL", "SYRUP", "MINT", "STRAW", "COASTER", "MUG", "BEER",
            "WINE", "CIDER", "CHAMPAGNE", "SPARKLING", "ESPRESSO", "COFFEE", "LATTE", "TEA",
            "MATCHA", "BREW", "KEG", "TAP", "SOMMELIER", "VINTAGE", "BARMAN", "TAVERN", "LOUNGE", "CEL"
        ],
        "clues": [
            "It has 7 letters and starts with 'N'.",
            "Famous cold drink mixed with Gin and citrus peel.",
            "Served over big cold ice cubes."
        ]
    },
    {
        "id": "animals-nature",
        "name": "Animals & Nature",
        "icon": "🌿",
        "badge": "NATURE",
        "description": "Cute animals, green trees, and jungle camouflage!",
        "target": "CHAMELEON",
        "words": [
            "CHAMELEON", "GECKO", "IGUANA", "LIZARD", "REPTILE", "CAMOUFLAGE", "JUNGLE", "FAUNA",
            "ANIMAL", "WILDLIFE", "SAFARI", "HABITAT", "NATURE", "GREEN", "FOREST", "LEAF",
            "PREDATOR", "PET", "TIGER", "LION", "PANTHER", "LEOPARD", "CHEETAH", "ELEPHANT",
            "RHINO", "HIPPO", "ZEBRA", "GIRAFFE", "MONKEY", "GORILLA", "LEMUR", "SLOTH",
            "BEAR", "WOLF", "FOX", "DEER", "RABBIT", "SQUIRREL", "BEAVER", "OTTER", "SEAL",
            "DOLPHIN", "WHALE", "SHARK", "EAGLE", "HAWK", "OWL", "PARROT", "FLAMINGO", "TOAD", "FROG", "SNAKE"
        ],
        "clues": [
            "It has 9 letters and starts with 'C'.",
            "A cool lizard that changes colors to hide!",
            "Has long sticky tongue to catch bugs."
        ]
    },
    {
        "id": "robots-tech",
        "name": "Robots & Tech",
        "icon": "⚡",
        "badge": "ROBOTS",
        "description": "Cool gadgets, computers, and glowing neon circuits!",
        "target": "NEURAL",
        "words": [
            "NEURAL", "SYNAPSE", "CYBERWARE", "MATRIX", "INTERFACE", "CYBORG", "BIOMETRIC", "NETWORK",
            "AI", "GRID", "HACKER", "DATA", "NEON", "CODE", "CHIP", "ROBOT", "SIGNAL", "CITY",
            "ALGORITHM", "COMPUTE", "SERVER", "MEMORY", "CPU", "GPU", "HARDWARE", "SOFTWARE",
            "SYSTEM", "CIRCUIT", "SENSOR", "ACTUATOR", "DRONE", "ANDROID", "MECHA", "AUTOMATION",
            "DIGITAL", "BINARY", "BYTE", "BIT", "LOGIC", "PROCESSOR", "RAM", "STORAGE", "CLOUD",
            "FIRMWARE", "PROTOCOL", "PACKET", "FIREWALL", "ENCRYPTION", "SECURITY", "KILOBYTE", "MEGABYTE", "GIGABYTE"
        ],
        "clues": [
            "It has 6 letters and starts with 'N'.",
            "Brain connection that helps computers think!",
            "Used in smart robots and brain chips."
        ]
    },
    {
        "id": "sports-games",
        "name": "Sports & Games",
        "icon": "⚽",
        "badge": "SPORTS",
        "description": "Running, big stadiums, and winning trophies!",
        "target": "MARATHON",
        "words": [
            "MARATHON", "SPRINT", "TRIATHLON", "RUNNER", "ATHLETE", "STAMINA", "RACE", "TRACK",
            "STADIUM", "FINISH", "PACE", "MEDAL", "CHAMPION", "SPORTS", "SCORE", "BALL", "GAME",
            "FOOTBALL", "SOCCER", "BASKETBALL", "TENNIS", "BASEBALL", "GOLF", "SWIMMING", "BOXING",
            "JUDO", "KARATE", "CYCLING", "ROWING", "SKIING", "SURFING", "SKATE", "HOCKEY",
            "RUGBY", "CRICKET", "VOLLEYBALL", "BADMINTON", "ARCHERY", "FENCING", "GYMNASTICS", "WHISTLE",
            "REFEREE", "COACH", "TEAM", "PLAYER", "MATCH", "TOURNAMENT", "LEAGUE", "TROPHY", "VICTORY", "GOAL", "POINTS"
        ],
        "clues": [
            "It has 8 letters and starts with 'M'.",
            "Super long running race across the city!",
            "Tests how fast and far runners can go."
        ]
    },
    {
        "id": "movies-cinema",
        "name": "Movies & Cinema",
        "icon": "🎬",
        "badge": "MOVIES",
        "description": "Movie stars, popcorn, and big screen stories!",
        "target": "SCREENPLAY",
        "words": [
            "SCREENPLAY", "SCRIPT", "DIRECTOR", "SCENARIO", "DIALOGUE", "CINEMA", "HOLLYWOOD", "FILM",
            "ACTOR", "CAMERA", "SCENE", "MOVIE", "THEATER", "DRAMA", "REEL", "SHOW", "TICKET",
            "PRODUCER", "EDIT", "SOUNDTRACK", "SCORE", "LIGHTING", "SET", "COSTUME", "MAKEUP",
            "PREMIERE", "RED", "CARPET", "AWARD", "OSCAR", "STUDIO", "CASTING", "AUDITION",
            "STUNT", "CLIMAX", "GENRE", "COMEDY", "ACTION", "THRILLER", "HORROR", "ROMANCE",
            "DOCUMENTARY", "ANIMATION", "BLOCKBUSTER", "TRAILER", "POSTER", "POPCORN", "SEAT", "SCREEN", "PROJECTOR", "CREDITS", "CUT"
        ],
        "clues": [
            "It has 10 letters and starts with 'S'.",
            "The written story book that actors read for movies!",
            "Tells directors what scenes and words to film."
        ]
    },
    {
        "id": "music-sound",
        "name": "Music & Sound",
        "icon": "🎵",
        "badge": "MUSIC",
        "description": "Melodies, guitars, concert stages, and beat drops!",
        "target": "SYMPHONY",
        "words": [
            "SYMPHONY", "MELODY", "HARMONY", "RHYTHM", "GUITAR", "PIANO", "DRUMS", "VIOLIN",
            "CONCERT", "BAND", "SONG", "ALBUM", "BEAT", "TEMPO", "RECORD", "STUDIO", "STAGE",
            "VOCALS", "SING", "CHORD", "BASS", "TREBLE", "SYNTHESIZER", "AMPLIFIER", "MICROPHONE",
            "HEADPHONES", "SPEAKER", "TRACK", "REMIX", "COMPOSER", "MAESTRO", "ORCHESTRA", "OPERA",
            "SOLO", "DUET", "CHOIR", "JAZZ", "ROCK", "POP", "CLASSICAL", "HIPHOP",
            "ELECTRONIC", "DISCO", "RECCORDING", "TUNE", "NOTE", "SCALE", "PITCH", "AUSTACO", "ACOUSTIC", "JAM", "ENCORE"
        ],
        "clues": [
            "It has 8 letters and starts with 'S'.",
            "A magnificent large musical piece played by an orchestra!",
            "Composed of four movements with brass, strings, and drums."
        ]
    },
    {
        "id": "ocean-depths",
        "name": "Ocean Depths",
        "icon": "🌊",
        "badge": "OCEAN",
        "description": "Coral reefs, deep sea submarines, and glowing jellyfish!",
        "target": "SUBMARINE",
        "words": [
            "SUBMARINE", "CORAL", "REEF", "JELLYFISH", "ABYSS", "TRENCH", "OCTOPUS", "SQUID",
            "WHALE", "SHARK", "SEAWEED", "KELP", "CURRENT", "TIDE", "WAVE", "OCEAN", "SEA",
            "SONAR", "DEPTH", "NAUTILUS", "ANCHOR", "SHIPWRECK", "MARINA", "SAILOR", "CAPTAIN",
            "COMPASS", "ISLAND", "BEACH", "SAND", "SHELL", "PEARL", "OYSTER", "CRAB",
            "LOBSTER", "SHRIMP", "MANTA", "RAY", "BARNACLE", "HYDROTHERMAL", "VENT", "DIVER",
            "SCUBA", "FINS", "MASK", "PRESSURE", "SUBMERSIBLE", "PLANKTON", "TIDEPOOL", "HARBOR", "PORT", "MARITIME"
        ],
        "clues": [
            "It has 9 letters and starts with 'S'.",
            "A deep underwater ship that travels under the sea!",
            "Uses sonar navigation to explore ocean depths."
        ]
    },
    {
        "id": "flora-botany",
        "name": "Flora & Plants",
        "icon": "🌻",
        "badge": "PLANTS",
        "description": "Blooming flowers, sunlight, seeds, and lush botanical gardens!",
        "target": "PHOTOSYNTHESIS",
        "words": [
            "PHOTOSYNTHESIS", "CHLOROPHYLL", "BOTANY", "GARDEN", "FLOWER", "BLOSSOM", "PETAL", "STEM",
            "ROOT", "SEED", "SPROUT", "LEAF", "BRANCH", "TREE", "OAK", "PINES", "FERN",
            "MOSS", "SUNLIGHT", "OXYGEN", "SOIL", "COMPOST", "FERTILIZER", "POLLEN", "NECTAR",
            "BEE", "HEDGE", "SHRUB", "VINE", "ORCHID", "ROSE", "TULIP", "DAISY",
            "SUNFLOWER", "LILY", "JASMINE", "BAMBOO", "CACTUS", "SUCCULENT", "EVERGREEN", "DECIDUOUS",
            "HARVEST", "GROWTH", "CANOPY", "GROVE", "ORCHARD", "PLANTATION", "FLORA", "VEGETATION", "BOTANIST", "GREENHOUSE"
        ],
        "clues": [
            "It has 14 letters and starts with 'P'.",
            "The magic process plants use to turn sunlight into food!",
            "Uses carbon dioxide and water to make oxygen."
        ]
    },
    {
        "id": "ancient-history",
        "name": "Ancient Kingdoms",
        "icon": "🏛️",
        "badge": "HISTORY",
        "description": "Pyramids, pharaohs, Roman forums, and mythic artifacts!",
        "target": "HIEROGLYPH",
        "words": [
            "HIEROGLYPH", "PYRAMID", "PHARAOH", "EMPIRE", "KINGDOM", "TEMPLE", "DYNASTY", "ARTIFACT",
            "ARCHAEOLOGY", "MUSEUM", "RUINS", "COLOSSEUM", "PARTHENON", "SPHINX", "TOMBO", "SARCOPHAGUS",
            "SCROLL", "PAPYRUS", "STATUE", "MONUMENT", "LEGEND", "MYTH", "GLADIATOR", "CENTURION",
            "CHARIOT", "CROWN", "THRONE", "REIGN", "CONQUEST", "CIVILIZATION", "MESOPOTAMIA", "BABYLON",
            "GREECE", "ROME", "EGYPT", "AZTEC", "MAYA", "INCA", "CARTHAGE", "SHIELD",
            "SWORD", "SPEAR", "ARMOR", "HELMET", "FORTRESS", "CITADEL", "ARCH", "VAULT", "RELIC", "EMPEROR"
        ],
        "clues": [
            "It has 10 letters and starts with 'H'.",
            "Picture writing carved into ancient Egyptian temple walls!",
            "Deciphered by scholars using the famous Rosetta Stone."
        ]
    },
    {
        "id": "mythology-fantasy",
        "name": "Fantasy & Magic",
        "icon": "🐉",
        "badge": "MAGIC",
        "description": "Fire dragons, magic spells, wizards, and enchanted realms!",
        "target": "ALCHEMY",
        "words": [
            "ALCHEMY", "SPELL", "WIZARD", "SORCERER", "WITCH", "POTION", "MAGIC", "DRAGON",
            "PHOENIX", "GRIFFIN", "UNICORN", "CENTAUR", "ELF", "DWARF", "GOBLIN", "TROLL",
            "ORC", "KNIGHT", "CASTLE", "DUNGEON", "QUEST", "REALM", "ENCHANTMENT", "RUNE",
            "CRYSTAL", "WAND", "STAFF", "AMULET", "RING", "GRIMOIRE", "PORTAL", "DIMENSION",
            "MYSTIC", "ORACLE", "PROPHECY", "MANA", "AURA", "GOLEM", "FAIRY", "MERMAID",
            "SIREN", "KRAKEN", "HYDRA", "PEGASUS", "BASILISK", "SHADOW", "LIGHT", "ELEMENTAL", "TALISMAN", "BEAST"
        ],
        "clues": [
            "It has 7 letters and starts with 'A'.",
            "Ancient magic science of turning metals into gold!",
            "Focuses on brewing elixirs of life and transmutation."
        ]
    },
    {
        "id": "vehicles-travel",
        "name": "Travel & Engines",
        "icon": "✈️",
        "badge": "TRAVEL",
        "description": "Airplanes, fast trains, road trips, and global adventures!",
        "target": "LOCOMOTIVE",
        "words": [
            "LOCOMOTIVE", "AIRPLANE", "HELICOPTER", "TRAIN", "SUBWAY", "AUTOMOBILE", "MOTORCYCLE", "BICYCLE",
            "ENGINE", "TURBINE", "PROPELLER", "JET", "VESSEL", "YACHT", "CRUISE", "FERRY",
            "EXPRESS", "HIGHWAY", "RUNWAY", "TERMINAL", "STATION", "DEPORT", "CABIN", "COCKPIT",
            "PILOT", "DRIVER", "CONDUCTOR", "CAPTAIN", "NAVIGATOR", "MAP", "GPS", "COMPASS",
            "JOURNEY", "VOYAGE", "FLIGHT", "TRIP", "TOURISM", "PASSPORT", "VISA", "LUGGAGE",
            "SUITCASE", "TICKET", "DESTINATION", "PASENGER", "TRANSIT", "CARGO", "FREIGHT", "SPEED", "MILEAGE", "ROUTE"
        ],
        "clues": [
            "It has 10 letters and starts with 'L'.",
            "Heavy powered train engine pulling rail cars down tracks!",
            "Driven by steam, diesel, or electric power."
        ]
    },
    {
        "id": "science-lab",
        "name": "Science & Discovery",
        "icon": "🔬",
        "badge": "SCIENCE",
        "description": "Microscopes, test tubes, molecules, and breakthrough experiments!",
        "target": "MICROSCOPE",
        "words": [
            "MICROSCOPE", "MOLECULE", "ATOM", "ELECTRON", "PROTON", "NEUTRON", "GENLOGY", "DNA",
            "CELL", "GENE", "LABORATORY", "EXPERIMENT", "HYPOTHESIS", "THEORY", "ELEMENT", "PERIODIC",
            "CHEMISTRY", "PHYSICS", "BIOLOGY", "QUANTUM", "VACUUM", "GRAVITY", "MAGNET", "CIRCUIT",
            "VOLTAGE", "SPECTRUM", "PRISM", "LASER", "OPTICS", "REACTION", "COMPOUND", "CATALYST",
            "SOLUTION", "SOLVENT", "ACID", "BASE", "BEAKER", "FLASK", "PIPETTE", "CENTRIFUGE",
            "DATA", "ANALYSIS", "RESEARCH", "SCHOLAR", "SCIENTIST", "INNOVATION", "PATENT", "FORMULA", "EQUATION", "OBSERVATION"
        ],
        "clues": [
            "It has 10 letters and starts with 'M'.",
            "Lab instrument used to see tiny cells and bacteria!",
            "Uses glass lenses to magnify microscopic objects."
        ]
    },
    {
        "id": "weather-seasons",
        "name": "Weather & Seasons",
        "icon": "🌩️",
        "badge": "WEATHER",
        "description": "Thunderstorms, rainbows, snowstorms, and sunshine!",
        "target": "HURRICANE",
        "words": [
            "HURRICANE", "TORNADO", "TYPHOON", "CYCLONE", "LIGHTNING", "THUNDER", "STORM", "BLIZZARD",
            "RAIN", "SNOW", "HAIL", "SLEET", "WIND", "GUST", "CLOUDS", "FOG",
            "MIST", "SUNSHINE", "RAINBOW", "TEMPERATURE", "CLIMATE", "BAROMETER", "HUMIDITY", "PRESSURE",
            "FORECAST", "RADAR", "SATELLITE", "MONSOON", "DROUGHT", "HEATWAVE", "FROST", "ICE",
            "SPRING", "SUMMER", "AUTUMN", "FALL", "WINTER", "SEASON", "SOLSTICE", "EQUINOX",
            "BREEZE", "AIR", "ATMOSPHERE", "VAPOR", "PRECIPITATION", "SKY", "BLUE", "SHELTER", "ALERT", "SAFETY"
        ],
        "clues": [
            "It has 9 letters and starts with 'H'.",
            "A giant spinning ocean storm with powerful winds and rain!",
            "Formed over warm ocean waters near the equator."
        ]
    }
]

def seed_database():
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()

    # Clear existing entries
    cursor.execute("DELETE FROM words;")
    cursor.execute("DELETE FROM themes;")

    total_words_count = 0

    for theme_data in THEME_SEED_DATA:
        cursor.execute(
            "INSERT INTO themes (id, name, icon, badge, description) VALUES (?, ?, ?, ?, ?);",
            (theme_data["id"], theme_data["name"], theme_data["icon"], theme_data["badge"], theme_data["description"])
        )

        target = theme_data["target"].upper()
        clues_json = json.dumps(theme_data.get("clues", []))

        for word in theme_data["words"]:
            word_clean = word.strip().upper()
            is_target = 1 if word_clean == target else 0
            
            # Simple association score mapping for seed demo
            associations = {
                word_clean: 100 if is_target else 75
            }

            cursor.execute(
                "INSERT INTO words (theme_id, word, is_target, associations_json, clues_json) VALUES (?, ?, ?, ?, ?);",
                (theme_data["id"], word_clean, is_target, json.dumps(associations), clues_json)
            )
            total_words_count += 1

    conn.commit()
    conn.close()

    print(f"Successfully seeded {len(THEME_SEED_DATA)} themes and {total_words_count} total words into SQLite!")

if __name__ == "__main__":
    seed_database()
