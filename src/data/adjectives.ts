import type { AdjectiveData } from '../types';

export const adjectives: AdjectiveData[] = [
  // Appearance
  {
    adjective: "vacker",
    translation: "beautiful",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "vacker",
      definite: "vackra",
      plural: "vackra",
      comparative: "vackrare",
      superlative: "vackrast"
    },
    examples: {
      base: { swedish: "En vacker dag", english: "A beautiful day" },
      definite: { swedish: "Den vackra blomman", english: "The beautiful flower" },
      comparative: { swedish: "En vackrare solnedgång", english: "A more beautiful sunset" },
      superlative: { swedish: "Den vackraste utsikten", english: "The most beautiful view" }
    },
    synonym: ["fin", "snygg", "skön"]
  },
  {
    adjective: "ful",
    translation: "ugly",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "ful",
      definite: "fula",
      plural: "fula",
      comparative: "fulare",
      superlative: "fulast"
    },
    examples: {
      base: { swedish: "Ett fult väder", english: "An ugly weather" },
      definite: { swedish: "Det fula vädret", english: "The ugly weather" },
      comparative: { swedish: "Ett fulare hus", english: "An uglier house" },
      superlative: { swedish: "Det fulaste jag sett", english: "The ugliest I've seen" }
    },
    antonym: "vacker"
  },
  {
    adjective: "snygg",
    translation: "good-looking",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "snygg",
      definite: "snygga",
      plural: "snygga",
      comparative: "snyggare",
      superlative: "snyggast"
    },
    examples: {
      base: { swedish: "En snygg kostym", english: "A good-looking suit" },
      definite: { swedish: "Den snygga frisyren", english: "The good-looking hairstyle" },
      comparative: { swedish: "En snyggare design", english: "A better-looking design" },
      superlative: { swedish: "Den snyggaste modellen", english: "The best-looking model" }
    },
    synonym: ["vacker", "fin"]
  },
  {
    adjective: "stilig",
    translation: "handsome",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "stilig",
      definite: "stiliga",
      plural: "stiliga",
      comparative: "stiligare",
      superlative: "stiligast"
    },
    examples: {
      base: { swedish: "En stilig man", english: "A handsome man" },
      definite: { swedish: "Den stiliga kavajen", english: "The handsome jacket" },
      comparative: { swedish: "En stiligare klädsel", english: "A more handsome outfit" },
      superlative: { swedish: "Den stiligaste skådespelaren", english: "The most handsome actor" }
    },
    synonym: ["snygg", "elegant"]
  },
  {
    adjective: "tjock",
    translation: "fat",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "tjock",
      definite: "tjocka",
      plural: "tjocka",
      comparative: "tjockare",
      superlative: "tjockast"
    },
    examples: {
      base: { swedish: "En tjock bok", english: "A thick book" },
      definite: { swedish: "Den tjocka jackan", english: "The thick jacket" },
      comparative: { swedish: "En tjockare tröja", english: "A thicker sweater" },
      superlative: { swedish: "Den tjockaste väggen", english: "The thickest wall" }
    },
    antonym: "smal"
  },
  {
    adjective: "smal",
    translation: "thin",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "smal",
      definite: "smala",
      plural: "smala",
      comparative: "smalare",
      superlative: "smalast"
    },
    examples: {
      base: { swedish: "En smal väg", english: "A narrow road" },
      definite: { swedish: "Den smala dörren", english: "The narrow door" },
      comparative: { swedish: "En smalare midja", english: "A thinner waist" },
      superlative: { swedish: "Den smalaste gränden", english: "The narrowest alley" }
    },
    antonym: "tjock"
  },
  {
    adjective: "lång",
    translation: "tall",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "lång",
      definite: "långa",
      plural: "långa",
      comparative: "längre",
      superlative: "längst"
    },
    examples: {
      base: { swedish: "En lång person", english: "A tall person" },
      definite: { swedish: "Den långa mannen", english: "The tall man" },
      comparative: { swedish: "En längre byggnad", english: "A taller building" },
      superlative: { swedish: "Den längsta spelaren", english: "The tallest player" }
    },
    antonym: "kort"
  },
  {
    adjective: "kort",
    translation: "short",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "kort",
      definite: "korta",
      plural: "korta",
      comparative: "kortare",
      superlative: "kortast"
    },
    examples: {
      base: { swedish: "En kort kjol", english: "A short skirt" },
      definite: { swedish: "Den korta håret", english: "The short hair" },
      comparative: { swedish: "En kortare väg", english: "A shorter way" },
      superlative: { swedish: "Den kortaste personen", english: "The shortest person" }
    },
    antonym: "lång"
  },
  {
    adjective: "elegant",
    translation: "elegant",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "elegant",
      definite: "eleganta",
      plural: "eleganta",
      comparative: "elegantare",
      superlative: "elegantast"
    },
    examples: {
      base: { swedish: "En elegant klänning", english: "An elegant dress" },
      definite: { swedish: "Den eleganta damen", english: "The elegant lady" },
      comparative: { swedish: "En elegantare stil", english: "A more elegant style" },
      superlative: { swedish: "Den elegantaste festen", english: "The most elegant party" }
    },
    synonym: ["stilig", "fin"]
  },
  {
    adjective: "rak",
    translation: "straight",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "rak",
      definite: "raka",
      plural: "raka",
      comparative: "rakare",
      superlative: "rakast"
    },
    examples: {
      base: { swedish: "Ett rakt hår", english: "A straight hair" },
      definite: { swedish: "Den raka linjen", english: "The straight line" },
      comparative: { swedish: "En rakare hållning", english: "A straighter posture" },
      superlative: { swedish: "Den rakaste vägen", english: "The straightest path" }
    },
    antonym: "krokig"
  },
  {
    adjective: "lockig",
    translation: "curly",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "lockig",
      definite: "lockiga",
      plural: "lockiga",
      comparative: "lockigare",
      superlative: "lockigast"
    },
    examples: {
      base: { swedish: "Ett lockigt hår", english: "A curly hair" },
      definite: { swedish: "Det lockiga håret", english: "The curly hair" },
      comparative: { swedish: "Ett lockigare hår", english: "A curlier hair" },
      superlative: { swedish: "Det lockigaste håret", english: "The curliest hair" }
    },
    antonym: "rak"
  },
  {
    adjective: "slank",
    translation: "slim",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "slank",
      definite: "slanka",
      plural: "slanka",
      comparative: "slankare",
      superlative: "slankast"
    },
    examples: {
      base: { swedish: "En slank figur", english: "A slim figure" },
      definite: { swedish: "Den slanka modellen", english: "The slim model" },
      comparative: { swedish: "En slankare midja", english: "A slimmer waist" },
      superlative: { swedish: "Den slankaste personen", english: "The slimmest person" }
    },
    synonym: ["smal", "tunn"]
  },
  {
    adjective: "kraftig",
    translation: "sturdy",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "kraftig",
      definite: "kraftiga",
      plural: "kraftiga",
      comparative: "kraftigare",
      superlative: "kraftigast"
    },
    examples: {
      base: { swedish: "En kraftig man", english: "A sturdy man" },
      definite: { swedish: "Den kraftiga byggnaden", english: "The sturdy building" },
      comparative: { swedish: "En kraftigare konstruktion", english: "A sturdier construction" },
      superlative: { swedish: "Den kraftigaste personen", english: "The sturdiest person" }
    },
    synonym: ["robust", "stark"]
  },
  {
    adjective: "skäggig",
    translation: "bearded",
    category: "appearance",
    difficulty: "beginner",
    forms: {
      base: "skäggig",
      definite: "skäggiga",
      plural: "skäggiga",
      comparative: "skäggigare",
      superlative: "skäggigast"
    },
    examples: {
      base: { swedish: "En skäggig man", english: "A bearded man" },
      definite: { swedish: "Den skäggiga mannen", english: "The bearded man" },
      comparative: { swedish: "En skäggigare version", english: "A more bearded version" },
      superlative: { swedish: "Den skäggigaste deltagaren", english: "The most bearded participant" }
    }
  },

  // Colors
  {
    adjective: "röd",
    translation: "red",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "röd",
      definite: "röda",
      plural: "röda",
      comparative: "rödare",
      superlative: "rödast"
    },
    examples: {
      base: { swedish: "En röd bil", english: "A red car" },
      definite: { swedish: "Den röda bilen", english: "The red car" },
      comparative: { swedish: "En rödare färg", english: "A redder color" },
      superlative: { swedish: "Den rödaste rosen", english: "The reddest rose" }
    }
  },
  {
    adjective: "blå",
    translation: "blue",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "blå",
      definite: "blåa",
      plural: "blåa",
      comparative: "blåare",
      superlative: "blåast"
    },
    examples: {
      base: { swedish: "En blå himmel", english: "A blue sky" },
      definite: { swedish: "Den blåa himlen", english: "The blue sky" },
      comparative: { swedish: "Ett blåare hav", english: "A bluer sea" },
      superlative: { swedish: "Den blåaste sjön", english: "The bluest lake" }
    }
  },

  // Size
  {
    adjective: "stor",
    translation: "big",
    category: "size",
    difficulty: "beginner",
    forms: {
      base: "stor",
      definite: "stora",
      plural: "stora",
      comparative: "större",
      superlative: "störst"
    },
    examples: {
      base: { swedish: "Ett stort hus", english: "A big house" },
      definite: { swedish: "Det stora huset", english: "The big house" },
      comparative: { swedish: "Ett större rum", english: "A bigger room" },
      superlative: { swedish: "Det största trädet", english: "The biggest tree" }
    },
    antonym: "liten"
  },
  {
    adjective: "liten",
    translation: "small",
    category: "size",
    difficulty: "beginner",
    forms: {
      base: "liten",
      definite: "lilla",
      plural: "små",
      comparative: "mindre",
      superlative: "minst"
    },
    examples: {
      base: { swedish: "En liten katt", english: "A small cat" },
      definite: { swedish: "Den lilla katten", english: "The small cat" },
      comparative: { swedish: "En mindre hund", english: "A smaller dog" },
      superlative: { swedish: "Det minsta barnet", english: "The smallest child" }
    },
    antonym: "stor"
  },

  // Personality
  {
    adjective: "glad",
    translation: "happy",
    category: "personality",
    difficulty: "beginner",
    forms: {
      base: "glad",
      definite: "glada",
      plural: "glada",
      comparative: "gladare",
      superlative: "gladast"
    },
    examples: {
      base: { swedish: "En glad flicka", english: "A happy girl" },
      definite: { swedish: "Den glada flickan", english: "The happy girl" },
      comparative: { swedish: "En gladare person", english: "A happier person" },
      superlative: { swedish: "Den gladaste dagen", english: "The happiest day" }
    },
    antonym: "ledsen"
  },
  {
    adjective: "snäll",
    translation: "kind",
    category: "personality",
    difficulty: "beginner",
    forms: {
      base: "snäll",
      definite: "snälla",
      plural: "snälla",
      comparative: "snällare",
      superlative: "snällast"
    },
    examples: {
      base: { swedish: "En snäll granne", english: "A kind neighbor" },
      definite: { swedish: "Den snälla grannen", english: "The kind neighbor" },
      comparative: { swedish: "En snällare lärare", english: "A kinder teacher" },
      superlative: { swedish: "Den snällaste personen", english: "The kindest person" }
    },
    antonym: "elak"
  },

  // Weather/Temperature
  {
    adjective: "varm",
    translation: "warm",
    category: "temperature",
    difficulty: "beginner",
    forms: {
      base: "varm",
      definite: "varma",
      plural: "varma",
      comparative: "varmare",
      superlative: "varmast"
    },
    examples: {
      base: { swedish: "En varm dag", english: "A warm day" },
      definite: { swedish: "Den varma solen", english: "The warm sun" },
      comparative: { swedish: "Ett varmare klimat", english: "A warmer climate" },
      superlative: { swedish: "Den varmaste sommaren", english: "The warmest summer" }
    },
    antonym: "kall"
  },
  {
    adjective: "kall",
    translation: "cold",
    category: "temperature",
    difficulty: "beginner",
    forms: {
      base: "kall",
      definite: "kalla",
      plural: "kalla",
      comparative: "kallare",
      superlative: "kallast"
    },
    examples: {
      base: { swedish: "En kall vinter", english: "A cold winter" },
      definite: { swedish: "Den kalla vinden", english: "The cold wind" },
      comparative: { swedish: "Ett kallare vatten", english: "A colder water" },
      superlative: { swedish: "Den kallaste natten", english: "The coldest night" }
    },
    antonym: "varm"
  },

  // Age
  {
    adjective: "gammal",
    translation: "old",
    category: "age",
    difficulty: "beginner",
    forms: {
      base: "gammal",
      definite: "gamla",
      plural: "gamla",
      comparative: "äldre",
      superlative: "äldst"
    },
    examples: {
      base: { swedish: "En gammal bok", english: "An old book" },
      definite: { swedish: "Den gamla boken", english: "The old book" },
      comparative: { swedish: "En äldre bil", english: "An older car" },
      superlative: { swedish: "Den äldsta byggnaden", english: "The oldest building" }
    },
    antonym: "ung"
  },
  {
    adjective: "ung",
    translation: "young",
    category: "age",
    difficulty: "beginner",
    forms: {
      base: "ung",
      definite: "unga",
      plural: "unga",
      comparative: "yngre",
      superlative: "yngst"
    },
    examples: {
      base: { swedish: "En ung man", english: "A young man" },
      definite: { swedish: "Den unga kvinnan", english: "The young woman" },
      comparative: { swedish: "En yngre syster", english: "A younger sister" },
      superlative: { swedish: "Den yngsta brodern", english: "The youngest brother" }
    },
    antonym: "gammal"
  },

  // Emotions
  {
    adjective: "arg",
    translation: "angry",
    category: "emotion",
    difficulty: "beginner",
    forms: {
      base: "arg",
      definite: "arga",
      plural: "arga",
      comparative: "argare",
      superlative: "argast"
    },
    examples: {
      base: { swedish: "En arg hund", english: "An angry dog" },
      definite: { swedish: "Den arga hunden", english: "The angry dog" },
      comparative: { swedish: "En argare katt", english: "An angrier cat" },
      superlative: { swedish: "Den argaste mannen", english: "The angriest man" }
    },
    antonym: "lugn"
  },

  // More Colors
  {
    adjective: "grön",
    translation: "green",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "grön",
      definite: "gröna",
      plural: "gröna",
      comparative: "grönare",
      superlative: "grönast"
    },
    examples: {
      base: { swedish: "Ett grönt blad", english: "A green leaf" },
      definite: { swedish: "Det gröna gräset", english: "The green grass" },
      comparative: { swedish: "En grönare skog", english: "A greener forest" },
      superlative: { swedish: "Den grönaste parken", english: "The greenest park" }
    }
  },
  {
    adjective: "gul",
    translation: "yellow",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "gul",
      definite: "gula",
      plural: "gula",
      comparative: "gulare",
      superlative: "gulast"
    },
    examples: {
      base: { swedish: "En gul blomma", english: "A yellow flower" },
      definite: { swedish: "Den gula solen", english: "The yellow sun" },
      comparative: { swedish: "En gulare citron", english: "A more yellow lemon" },
      superlative: { swedish: "Den gulaste bananen", english: "The most yellow banana" }
    }
  },

  // Physical Characteristics
  {
    adjective: "stark",
    translation: "strong",
    category: "physical",
    difficulty: "beginner",
    forms: {
      base: "stark",
      definite: "starka",
      plural: "starka",
      comparative: "starkare",
      superlative: "starkast"
    },
    examples: {
      base: { swedish: "En stark person", english: "A strong person" },
      definite: { swedish: "Den starka mannen", english: "The strong man" },
      comparative: { swedish: "En starkare muskel", english: "A stronger muscle" },
      superlative: { swedish: "Den starkaste atleten", english: "The strongest athlete" }
    },
    antonym: "svag"
  },
  {
    adjective: "trött",
    translation: "tired",
    category: "physical",
    difficulty: "beginner",
    forms: {
      base: "trött",
      definite: "trötta",
      plural: "trötta",
      comparative: "tröttare",
      superlative: "tröttast"
    },
    examples: {
      base: { swedish: "En trött student", english: "A tired student" },
      definite: { swedish: "Den trötta hunden", english: "The tired dog" },
      comparative: { swedish: "En tröttare arbetare", english: "A more tired worker" },
      superlative: { swedish: "Den tröttaste gruppen", english: "The most tired group" }
    }
  },

  // Qualities
  {
    adjective: "ny",
    translation: "new",
    category: "quality",
    difficulty: "beginner",
    forms: {
      base: "ny",
      definite: "nya",
      plural: "nya",
      comparative: "nyare",
      superlative: "nyast"
    },
    examples: {
      base: { swedish: "En ny telefon", english: "A new phone" },
      definite: { swedish: "Den nya bilen", english: "The new car" },
      comparative: { swedish: "En nyare modell", english: "A newer model" },
      superlative: { swedish: "Den nyaste versionen", english: "The newest version" }
    },
    antonym: "gammal"
  },
  {
    adjective: "ren",
    translation: "clean",
    category: "quality",
    difficulty: "beginner",
    forms: {
      base: "ren",
      definite: "rena",
      plural: "rena",
      comparative: "renare",
      superlative: "renast"
    },
    examples: {
      base: { swedish: "Ett rent rum", english: "A clean room" },
      definite: { swedish: "Det rena golvet", english: "The clean floor" },
      comparative: { swedish: "En renare stad", english: "A cleaner city" },
      superlative: { swedish: "Den renaste luften", english: "The cleanest air" }
    },
    antonym: "smutsig"
  },

  // More Emotions
  {
    adjective: "rädd",
    translation: "scared",
    category: "emotion",
    difficulty: "beginner",
    forms: {
      base: "rädd",
      definite: "rädda",
      plural: "rädda",
      comparative: "räddare",
      superlative: "räddast"
    },
    examples: {
      base: { swedish: "En rädd katt", english: "A scared cat" },
      definite: { swedish: "Den rädda fågeln", english: "The scared bird" },
      comparative: { swedish: "En räddare kanin", english: "A more scared rabbit" },
      superlative: { swedish: "Det räddaste djuret", english: "The most scared animal" }
    },
    antonym: "modig"
  },
  {
    adjective: "ledsen",
    translation: "sad",
    category: "emotion",
    difficulty: "beginner",
    forms: {
      base: "ledsen",
      definite: "ledsna",
      plural: "ledsna",
      comparative: "ledsnare",
      superlative: "ledsnast"
    },
    examples: {
      base: { swedish: "En ledsen pojke", english: "A sad boy" },
      definite: { swedish: "Den ledsna flickan", english: "The sad girl" },
      comparative: { swedish: "En ledsnare hund", english: "A sadder dog" },
      superlative: { swedish: "Det ledsnaste barnet", english: "The saddest child" }
    },
    antonym: "glad"
  },
  {
    adjective: "lycklig",
    translation: "happy",
    category: "emotion",
    difficulty: "beginner",
    forms: {
      base: "lycklig",
      definite: "lyckliga",
      plural: "lyckliga",
      comparative: "lyckligare",
      superlative: "lyckligast"
    },
    examples: {
      base: { swedish: "En lycklig familj", english: "A happy family" },
      definite: { swedish: "Det lyckliga paret", english: "The happy couple" },
      comparative: { swedish: "En lyckligare tid", english: "A happier time" },
      superlative: { swedish: "Den lyckligaste dagen", english: "The happiest day" }
    },
    synonym: ["glad", "nöjd"]
  },
  {
    adjective: "nervös",
    translation: "nervous",
    category: "emotion",
    difficulty: "beginner",
    forms: {
      base: "nervös",
      definite: "nervösa",
      plural: "nervösa",
      comparative: "nervösare",
      superlative: "nervösast"
    },
    examples: {
      base: { swedish: "En nervös student", english: "A nervous student" },
      definite: { swedish: "Den nervösa talaren", english: "The nervous speaker" },
      comparative: { swedish: "En nervösare deltagare", english: "A more nervous participant" },
      superlative: { swedish: "Den nervösaste kandidaten", english: "The most nervous candidate" }
    },
    antonym: "lugn"
  },

  // Taste
  {
    adjective: "söt",
    translation: "sweet",
    category: "taste",
    difficulty: "beginner",
    forms: {
      base: "söt",
      definite: "söta",
      plural: "söta",
      comparative: "sötare",
      superlative: "sötast"
    },
    examples: {
      base: { swedish: "En söt kaka", english: "A sweet cake" },
      definite: { swedish: "Den söta glassen", english: "The sweet ice cream" },
      comparative: { swedish: "En sötare choklad", english: "A sweeter chocolate" },
      superlative: { swedish: "Den sötaste desserten", english: "The sweetest dessert" }
    },
    antonym: "bitter"
  },
  {
    adjective: "salt",
    translation: "salty",
    category: "taste",
    difficulty: "beginner",
    forms: {
      base: "salt",
      definite: "salta",
      plural: "salta",
      comparative: "saltare",
      superlative: "saltast"
    },
    examples: {
      base: { swedish: "En salt soppa", english: "A salty soup" },
      definite: { swedish: "Den salta maten", english: "The salty food" },
      comparative: { swedish: "En saltare sås", english: "A saltier sauce" },
      superlative: { swedish: "Det saltaste havet", english: "The saltiest sea" }
    }
  },

  // Texture
  {
    adjective: "mjuk",
    translation: "soft",
    category: "texture",
    difficulty: "beginner",
    forms: {
      base: "mjuk",
      definite: "mjuka",
      plural: "mjuka",
      comparative: "mjukare",
      superlative: "mjukast"
    },
    examples: {
      base: { swedish: "En mjuk kudde", english: "A soft pillow" },
      definite: { swedish: "Den mjuka mattan", english: "The soft carpet" },
      comparative: { swedish: "Ett mjukare tyg", english: "A softer fabric" },
      superlative: { swedish: "Den mjukaste sängen", english: "The softest bed" }
    },
    antonym: "hård"
  },
  {
    adjective: "hård",
    translation: "hard",
    category: "texture",
    difficulty: "beginner",
    forms: {
      base: "hård",
      definite: "hårda",
      plural: "hårda",
      comparative: "hårdare",
      superlative: "hårdast"
    },
    examples: {
      base: { swedish: "En hård sten", english: "A hard stone" },
      definite: { swedish: "Den hårda väggen", english: "The hard wall" },
      comparative: { swedish: "Ett hårdare material", english: "A harder material" },
      superlative: { swedish: "Den hårdaste metallen", english: "The hardest metal" }
    },
    antonym: "mjuk"
  },

  // Intelligence
  {
    adjective: "smart",
    translation: "smart",
    category: "intelligence",
    difficulty: "beginner",
    forms: {
      base: "smart",
      definite: "smarta",
      plural: "smarta",
      comparative: "smartare",
      superlative: "smartast"
    },
    examples: {
      base: { swedish: "En smart lösning", english: "A smart solution" },
      definite: { swedish: "Den smarta eleven", english: "The smart student" },
      comparative: { swedish: "Ett smartare svar", english: "A smarter answer" },
      superlative: { swedish: "Den smartaste idén", english: "The smartest idea" }
    },
    antonym: "dum"
  },
  {
    adjective: "klok",
    translation: "wise",
    category: "intelligence",
    difficulty: "beginner",
    forms: {
      base: "klok",
      definite: "kloka",
      plural: "kloka",
      comparative: "klokare",
      superlative: "klokast"
    },
    examples: {
      base: { swedish: "En klok person", english: "A wise person" },
      definite: { swedish: "Den kloka kvinnan", english: "The wise woman" },
      comparative: { swedish: "Ett klokare beslut", english: "A wiser decision" },
      superlative: { swedish: "Det klokaste rådet", english: "The wisest advice" }
    }
  },

  // More Colors
  {
    adjective: "brun",
    translation: "brown",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "brun",
      definite: "bruna",
      plural: "bruna",
      comparative: "brunare",
      superlative: "brunast"
    },
    examples: {
      base: { swedish: "Ett brunt bord", english: "A brown table" },
      definite: { swedish: "Den bruna stolen", english: "The brown chair" },
      comparative: { swedish: "En brunare färg", english: "A browner color" },
      superlative: { swedish: "Den brunaste jorden", english: "The brownest soil" }
    }
  },
  {
    adjective: "grå",
    translation: "grey",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "grå",
      definite: "gråa",
      plural: "gråa",
      comparative: "gråare",
      superlative: "gråast"
    },
    examples: {
      base: { swedish: "En grå dag", english: "A grey day" },
      definite: { swedish: "Den gråa himlen", english: "The grey sky" },
      comparative: { swedish: "Ett gråare moln", english: "A greyer cloud" },
      superlative: { swedish: "Den gråaste asfalten", english: "The greyest asphalt" }
    }
  },

  // Temperature
  {
    adjective: "het",
    translation: "hot",
    category: "temperature",
    difficulty: "beginner",
    forms: {
      base: "het",
      definite: "heta",
      plural: "heta",
      comparative: "hetare",
      superlative: "hetast"
    },
    examples: {
      base: { swedish: "En het kopp kaffe", english: "A hot cup of coffee" },
      definite: { swedish: "Den heta solen", english: "The hot sun" },
      comparative: { swedish: "En hetare dag", english: "A hotter day" },
      superlative: { swedish: "Den hetaste öknen", english: "The hottest desert" }
    },
    antonym: "sval"
  },
  {
    adjective: "sval",
    translation: "cool",
    category: "temperature",
    difficulty: "beginner",
    forms: {
      base: "sval",
      definite: "svala",
      plural: "svala",
      comparative: "svalare",
      superlative: "svalast"
    },
    examples: {
      base: { swedish: "En sval bris", english: "A cool breeze" },
      definite: { swedish: "Den svala kvällen", english: "The cool evening" },
      comparative: { swedish: "Ett svalare rum", english: "A cooler room" },
      superlative: { swedish: "Den svalaste platsen", english: "The coolest place" }
    }
  },

  // Weight
  {
    adjective: "tung",
    translation: "heavy",
    category: "physical",
    difficulty: "beginner",
    forms: {
      base: "tung",
      definite: "tunga",
      plural: "tunga",
      comparative: "tyngre",
      superlative: "tyngst"
    },
    examples: {
      base: { swedish: "En tung väska", english: "A heavy bag" },
      definite: { swedish: "Den tunga lådan", english: "The heavy box" },
      comparative: { swedish: "En tyngre sten", english: "A heavier stone" },
      superlative: { swedish: "Den tyngsta vikten", english: "The heaviest weight" }
    },
    antonym: "lätt"
  },
  {
    adjective: "lätt",
    translation: "light",
    category: "physical",
    difficulty: "beginner",
    forms: {
      base: "lätt",
      definite: "lätta",
      plural: "lätta",
      comparative: "lättare",
      superlative: "lättast"
    },
    examples: {
      base: { swedish: "En lätt fjäder", english: "A light feather" },
      definite: { swedish: "Den lätta boken", english: "The light book" },
      comparative: { swedish: "Ett lättare paket", english: "A lighter package" },
      superlative: { swedish: "Den lättaste väskan", english: "The lightest bag" }
    },
    antonym: "tung"
  },

  // More Personality
  {
    adjective: "rolig",
    translation: "funny",
    category: "personality",
    difficulty: "beginner",
    forms: {
      base: "rolig",
      definite: "roliga",
      plural: "roliga",
      comparative: "roligare",
      superlative: "roligast"
    },
    examples: {
      base: { swedish: "En rolig historia", english: "A funny story" },
      definite: { swedish: "Den roliga filmen", english: "The funny movie" },
      comparative: { swedish: "Ett roligare skämt", english: "A funnier joke" },
      superlative: { swedish: "Den roligaste personen", english: "The funniest person" }
    },
    synonym: ["lustig", "skojig"]
  },
  {
    adjective: "tyst",
    translation: "quiet",
    category: "personality",
    difficulty: "beginner",
    forms: {
      base: "tyst",
      definite: "tysta",
      plural: "tysta",
      comparative: "tystare",
      superlative: "tystast"
    },
    examples: {
      base: { swedish: "Ett tyst rum", english: "A quiet room" },
      definite: { swedish: "Det tysta biblioteket", english: "The quiet library" },
      comparative: { swedish: "En tystare plats", english: "A quieter place" },
      superlative: { swedish: "Den tystaste morgonen", english: "The quietest morning" }
    },
    antonym: "högljudd"
  },

  // More Personality/Character
  {
    adjective: "modig",
    translation: "brave",
    category: "personality",
    difficulty: "beginner",
    forms: {
      base: "modig",
      definite: "modiga",
      plural: "modiga",
      comparative: "modigare",
      superlative: "modigast"
    },
    examples: {
      base: { swedish: "En modig soldat", english: "A brave soldier" },
      definite: { swedish: "Den modiga brandmannen", english: "The brave firefighter" },
      comparative: { swedish: "En modigare handling", english: "A braver action" },
      superlative: { swedish: "Den modigaste insatsen", english: "The bravest effort" }
    },
    antonym: "feg"
  },
  {
    adjective: "lat",
    translation: "lazy",
    category: "personality",
    difficulty: "beginner",
    forms: {
      base: "lat",
      definite: "lata",
      plural: "lata",
      comparative: "latare",
      superlative: "latast"
    },
    examples: {
      base: { swedish: "En lat katt", english: "A lazy cat" },
      definite: { swedish: "Den lata studenten", english: "The lazy student" },
      comparative: { swedish: "En latare person", english: "A lazier person" },
      superlative: { swedish: "Den lataste gruppen", english: "The laziest group" }
    },
    antonym: "flitig"
  },

  // More Physical States
  {
    adjective: "hungrig",
    translation: "hungry",
    category: "physical",
    difficulty: "beginner",
    forms: {
      base: "hungrig",
      definite: "hungriga",
      plural: "hungriga",
      comparative: "hungrigare",
      superlative: "hungrigast"
    },
    examples: {
      base: { swedish: "En hungrig hund", english: "A hungry dog" },
      definite: { swedish: "Det hungriga barnet", english: "The hungry child" },
      comparative: { swedish: "En hungrigare varg", english: "A hungrier wolf" },
      superlative: { swedish: "Den hungrigaste gruppen", english: "The hungriest group" }
    },
    antonym: "mätt"
  },
  {
    adjective: "sjuk",
    translation: "sick",
    category: "physical",
    difficulty: "beginner",
    forms: {
      base: "sjuk",
      definite: "sjuka",
      plural: "sjuka",
      comparative: "sjukare",
      superlative: "sjukast"
    },
    examples: {
      base: { swedish: "En sjuk kollega", english: "A sick colleague" },
      definite: { swedish: "Den sjuka patienten", english: "The sick patient" },
      comparative: { swedish: "En sjukare person", english: "A sicker person" },
      superlative: { swedish: "Den sjukaste personen", english: "The sickest person" }
    },
    antonym: "frisk"
  },

  // More Quality Descriptors
  {
    adjective: "dyr",
    translation: "expensive",
    category: "quality",
    difficulty: "beginner",
    forms: {
      base: "dyr",
      definite: "dyra",
      plural: "dyra",
      comparative: "dyrare",
      superlative: "dyrast"
    },
    examples: {
      base: { swedish: "En dyr klocka", english: "An expensive watch" },
      definite: { swedish: "Den dyra bilen", english: "The expensive car" },
      comparative: { swedish: "Ett dyrare hus", english: "A more expensive house" },
      superlative: { swedish: "Den dyraste restaurangen", english: "The most expensive restaurant" }
    },
    antonym: "billig"
  },
  {
    adjective: "billig",
    translation: "cheap",
    category: "quality",
    difficulty: "beginner",
    forms: {
      base: "billig",
      definite: "billiga",
      plural: "billiga",
      comparative: "billigare",
      superlative: "billigast"
    },
    examples: {
      base: { swedish: "En billig resa", english: "A cheap trip" },
      definite: { swedish: "Den billiga maten", english: "The cheap food" },
      comparative: { swedish: "Ett billigare alternativ", english: "A cheaper alternative" },
      superlative: { swedish: "Det billigaste hotellet", english: "The cheapest hotel" }
    },
    antonym: "dyr"
  },

  // More Personality Traits
  {
    adjective: "nyfiken",
    translation: "curious",
    category: "personality",
    difficulty: "beginner",
    forms: {
      base: "nyfiken",
      definite: "nyfikna",
      plural: "nyfikna",
      comparative: "nyfiknare",
      superlative: "nyfiknast"
    },
    examples: {
      base: { swedish: "En nyfiken katt", english: "A curious cat" },
      definite: { swedish: "Det nyfikna barnet", english: "The curious child" },
      comparative: { swedish: "En nyfiknare forskare", english: "A more curious researcher" },
      superlative: { swedish: "Den nyfiknaste eleven", english: "The most curious student" }
    }
  },
  {
    adjective: "generös",
    translation: "generous",
    category: "personality",
    difficulty: "beginner",
    forms: {
      base: "generös",
      definite: "generösa",
      plural: "generösa",
      comparative: "generösare",
      superlative: "generösast"
    },
    examples: {
      base: { swedish: "En generös person", english: "A generous person" },
      definite: { swedish: "Den generösa grannen", english: "The generous neighbor" },
      comparative: { swedish: "En generösare gåva", english: "A more generous gift" },
      superlative: { swedish: "Den generösaste givaren", english: "The most generous donor" }
    },
    antonym: "snål"
  },
  {
    adjective: "artig",
    translation: "polite",
    category: "personality",
    difficulty: "beginner",
    forms: {
      base: "artig",
      definite: "artiga",
      plural: "artiga",
      comparative: "artigare",
      superlative: "artigast"
    },
    examples: {
      base: { swedish: "En artig pojke", english: "A polite boy" },
      definite: { swedish: "Den artiga servitrisen", english: "The polite waitress" },
      comparative: { swedish: "Ett artigare svar", english: "A more polite answer" },
      superlative: { swedish: "Den artigaste gästen", english: "The most polite guest" }
    },
    antonym: "oartig"
  },

  // Physical States
  {
    adjective: "pigg",
    translation: "energetic",
    category: "physical",
    difficulty: "beginner",
    forms: {
      base: "pigg",
      definite: "pigga",
      plural: "pigga",
      comparative: "piggare",
      superlative: "piggast"
    },
    examples: {
      base: { swedish: "En pigg morgonmänniska", english: "An energetic morning person" },
      definite: { swedish: "Den pigga studenten", english: "The energetic student" },
      comparative: { swedish: "En piggare version", english: "A more energetic version" },
      superlative: { swedish: "Den piggaste deltagaren", english: "The most energetic participant" }
    },
    antonym: "trött"
  },
  {
    adjective: "törstig",
    translation: "thirsty",
    category: "physical",
    difficulty: "beginner",
    forms: {
      base: "törstig",
      definite: "törstiga",
      plural: "törstiga",
      comparative: "törstigare",
      superlative: "törstigast"
    },
    examples: {
      base: { swedish: "En törstig löpare", english: "A thirsty runner" },
      definite: { swedish: "Den törstiga hunden", english: "The thirsty dog" },
      comparative: { swedish: "En törstigare grupp", english: "A thirstier group" },
      superlative: { swedish: "Den törstigaste personen", english: "The thirstiest person" }
    }
  },

  // Important Qualities
  {
    adjective: "viktig",
    translation: "important",
    category: "quality",
    difficulty: "beginner",
    forms: {
      base: "viktig",
      definite: "viktiga",
      plural: "viktiga",
      comparative: "viktigare",
      superlative: "viktigast"
    },
    examples: {
      base: { swedish: "En viktig beslut", english: "An important decision" },
      definite: { swedish: "Den viktiga bilen", english: "The important car" },
      comparative: { swedish: "Ett viktigare hus", english: "A more important house" },
      superlative: { swedish: "Den viktigaste beslutet", english: "The most important decision" }
    }
  },

  // Time-related
  {
    adjective: "tidig",
    translation: "early",
    category: "time",
    difficulty: "beginner",
    forms: {
      base: "tidig",
      definite: "tidiga",
      plural: "tidiga",
      comparative: "tidigare",
      superlative: "tidigast"
    },
    examples: {
      base: { swedish: "En tidig morgon", english: "An early morning" },
      definite: { swedish: "Den tidiga våren", english: "The early spring" },
      comparative: { swedish: "Ett tidigare möte", english: "An earlier meeting" },
      superlative: { swedish: "Den tidigaste bussen", english: "The earliest bus" }
    },
    antonym: "sen"
  },
  {
    adjective: "sen",
    translation: "late",
    category: "time",
    difficulty: "beginner",
    forms: {
      base: "sen",
      definite: "sena",
      plural: "sena",
      comparative: "senare",
      superlative: "senast"
    },
    examples: {
      base: { swedish: "En sen kväll", english: "A late evening" },
      definite: { swedish: "Den sena middagen", english: "The late dinner" },
      comparative: { swedish: "Ett senare tåg", english: "A later train" },
      superlative: { swedish: "Den senaste nyheten", english: "The latest news" }
    },
    antonym: "tidig"
  },

  // Distance-related
  {
    adjective: "nära",
    translation: "close",
    category: "distance",
    difficulty: "beginner",
    forms: {
      base: "nära",
      definite: "nära",
      plural: "nära",
      comparative: "närmare",
      superlative: "närmast"
    },
    examples: {
      base: { swedish: "En nära vän", english: "A close friend" },
      definite: { swedish: "Den nära parken", english: "The nearby park" },
      comparative: { swedish: "En närmare relation", english: "A closer relationship" },
      superlative: { swedish: "Den närmaste affären", english: "The closest store" }
    },
    antonym: "långt"
  },
  {
    adjective: "långt",
    translation: "far",
    category: "distance",
    difficulty: "beginner",
    forms: {
      base: "långt",
      definite: "långa",
      plural: "långa",
      comparative: "längre",
      superlative: "längst"
    },
    examples: {
      base: { swedish: "Ett långt avstånd", english: "A far distance" },
      definite: { swedish: "Den långa resan", english: "The long journey" },
      comparative: { swedish: "En längre sträcka", english: "A longer distance" },
      superlative: { swedish: "Den längsta vägen", english: "The longest road" }
    },
    antonym: "nära"
  },

  // More Weather Conditions
  {
    adjective: "blåsig",
    translation: "windy",
    category: "weather",
    difficulty: "beginner",
    forms: {
      base: "blåsig",
      definite: "blåsiga",
      plural: "blåsiga",
      comparative: "blåsigare",
      superlative: "blåsigast"
    },
    examples: {
      base: { swedish: "En blåsig dag", english: "A windy day" },
      definite: { swedish: "Den blåsiga kusten", english: "The windy coast" },
      comparative: { swedish: "Ett blåsigare ställe", english: "A windier place" },
      superlative: { swedish: "Den blåsigaste platsen", english: "The windiest place" }
    }
  },
  {
    adjective: "dimmig",
    translation: "foggy",
    category: "weather",
    difficulty: "beginner",
    forms: {
      base: "dimmig",
      definite: "dimmiga",
      plural: "dimmiga",
      comparative: "dimmigare",
      superlative: "dimmigast"
    },
    examples: {
      base: { swedish: "En dimmig morgon", english: "A foggy morning" },
      definite: { swedish: "Den dimmiga staden", english: "The foggy city" },
      comparative: { swedish: "Ett dimmigare område", english: "A foggier area" },
      superlative: { swedish: "Den dimmigaste dalen", english: "The foggiest valley" }
    }
  },

  // Difficulty-related
  {
    adjective: "enkel",
    translation: "simple",
    category: "quality",
    difficulty: "beginner",
    forms: {
      base: "enkel",
      definite: "enkla",
      plural: "enkla",
      comparative: "enklare",
      superlative: "enklast"
    },
    examples: {
      base: { swedish: "En enkel lösning", english: "A simple solution" },
      definite: { swedish: "Den enkla förklaringen", english: "The simple explanation" },
      comparative: { swedish: "En enklare metod", english: "A simpler method" },
      superlative: { swedish: "Det enklaste sättet", english: "The simplest way" }
    },
    antonym: "svår"
  },
  {
    adjective: "svår",
    translation: "difficult",
    category: "quality",
    difficulty: "beginner",
    forms: {
      base: "svår",
      definite: "svåra",
      plural: "svåra",
      comparative: "svårare",
      superlative: "svårast"
    },
    examples: {
      base: { swedish: "En svår uppgift", english: "A difficult task" },
      definite: { swedish: "Det svåra provet", english: "The difficult test" },
      comparative: { swedish: "Ett svårare problem", english: "A more difficult problem" },
      superlative: { swedish: "Den svåraste frågan", english: "The most difficult question" }
    },
    antonym: "enkel"
  },

  // Cleanliness
  {
    adjective: "smutsig",
    translation: "dirty",
    category: "quality",
    difficulty: "beginner",
    forms: {
      base: "smutsig",
      definite: "smutsiga",
      plural: "smutsiga",
      comparative: "smutsigare",
      superlative: "smutsigast"
    },
    examples: {
      base: { swedish: "En smutsig skjorta", english: "A dirty shirt" },
      definite: { swedish: "Den smutsiga bilen", english: "The dirty car" },
      comparative: { swedish: "Ett smutsigare fönster", english: "A dirtier window" },
      superlative: { swedish: "Den smutsigaste gatan", english: "The dirtiest street" }
    },
    antonym: "ren"
  },

  // Speed-related
  {
    adjective: "snabb",
    translation: "fast",
    category: "quality",
    difficulty: "beginner",
    forms: {
      base: "snabb",
      definite: "snabba",
      plural: "snabba",
      comparative: "snabbare",
      superlative: "snabbast"
    },
    examples: {
      base: { swedish: "En snabb bil", english: "A fast car" },
      definite: { swedish: "Den snabba löparen", english: "The fast runner" },
      comparative: { swedish: "Ett snabbare tåg", english: "A faster train" },
      superlative: { swedish: "Den snabbaste vägen", english: "The fastest way" }
    },
    antonym: "långsam"
  },
  {
    adjective: "långsam",
    translation: "slow",
    category: "quality",
    difficulty: "beginner",
    forms: {
      base: "långsam",
      definite: "långsamma",
      plural: "långsamma",
      comparative: "långsammare",
      superlative: "långsammast"
    },
    examples: {
      base: { swedish: "En långsam process", english: "A slow process" },
      definite: { swedish: "Den långsamma datorn", english: "The slow computer" },
      comparative: { swedish: "En långsammare metod", english: "A slower method" },
      superlative: { swedish: "Den långsammaste gruppen", english: "The slowest group" }
    },
    antonym: "snabb"
  },

  // More Weather
  {
    adjective: "mulen",
    translation: "cloudy",
    category: "weather",
    difficulty: "beginner",
    forms: {
      base: "mulen",
      definite: "mulna",
      plural: "mulna",
      comparative: "mulnare",
      superlative: "mulnast"
    },
    examples: {
      base: { swedish: "En mulen dag", english: "A cloudy day" },
      definite: { swedish: "Den mulna himlen", english: "The cloudy sky" },
      comparative: { swedish: "Ett mulnare väder", english: "A cloudier weather" },
      superlative: { swedish: "Den mulnaste dagen", english: "The cloudiest day" }
    },
    antonym: "klar"
  },
  {
    adjective: "fuktig",
    translation: "humid",
    category: "weather",
    difficulty: "beginner",
    forms: {
      base: "fuktig",
      definite: "fuktiga",
      plural: "fuktiga",
      comparative: "fuktigare",
      superlative: "fuktigast"
    },
    examples: {
      base: { swedish: "En fuktig källare", english: "A humid basement" },
      definite: { swedish: "Den fuktiga luften", english: "The humid air" },
      comparative: { swedish: "Ett fuktigare klimat", english: "A more humid climate" },
      superlative: { swedish: "Den fuktigaste platsen", english: "The most humid place" }
    },
    antonym: "torr"
  },

  // More Colors
  {
    adjective: "rosa",
    translation: "pink",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "rosa",
      definite: "rosa",
      plural: "rosa",
      comparative: "mer rosa",
      superlative: "mest rosa"
    },
    examples: {
      base: { swedish: "En rosa klänning", english: "A pink dress" },
      definite: { swedish: "Den rosa blomman", english: "The pink flower" },
      comparative: { swedish: "En mer rosa nyans", english: "A pinker shade" },
      superlative: { swedish: "Den mest rosa färgen", english: "The pinkest color" }
    }
  },
  {
    adjective: "lila",
    translation: "purple",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "lila",
      definite: "lila",
      plural: "lila",
      comparative: "mer lila",
      superlative: "mest lila"
    },
    examples: {
      base: { swedish: "En lila väska", english: "A purple bag" },
      definite: { swedish: "Den lila jackan", english: "The purple jacket" },
      comparative: { swedish: "En mer lila färg", english: "A more purple color" },
      superlative: { swedish: "Den mest lila tonen", english: "The most purple tone" }
    }
  },
  {
    adjective: "orange",
    translation: "orange",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "orange",
      definite: "orange",
      plural: "orange",
      comparative: "mer orange",
      superlative: "mest orange"
    },
    examples: {
      base: { swedish: "En orange frukt", english: "An orange fruit" },
      definite: { swedish: "Den orange solnedgången", english: "The orange sunset" },
      comparative: { swedish: "En mer orange nyans", english: "A more orange shade" },
      superlative: { swedish: "Den mest orange färgen", english: "The most orange color" }
    }
  },
  {
    adjective: "vit",
    translation: "white",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "vit",
      definite: "vita",
      plural: "vita",
      comparative: "vitare",
      superlative: "vitast"
    },
    examples: {
      base: { swedish: "En vit vägg", english: "A white wall" },
      definite: { swedish: "Den vita snön", english: "The white snow" },
      comparative: { swedish: "Ett vitare papper", english: "A whiter paper" },
      superlative: { swedish: "Den vitaste färgen", english: "The whitest color" }
    }
  },
  {
    adjective: "svart",
    translation: "black",
    category: "color",
    difficulty: "beginner",
    forms: {
      base: "svart",
      definite: "svarta",
      plural: "svarta",
      comparative: "svartare",
      superlative: "svartast"
    },
    examples: {
      base: { swedish: "En svart katt", english: "A black cat" },
      definite: { swedish: "Den svarta bilen", english: "The black car" },
      comparative: { swedish: "Ett svartare tyg", english: "A blacker fabric" },
      superlative: { swedish: "Den svartaste natten", english: "The blackest night" }
    }
  },
  {
    adjective: "ambitiös",
    translation: "ambitious",
    category: "professional",
    difficulty: "intermediate",
    forms: {
      base: "ambitiös",
      definite: "ambitiösa",
      plural: "ambitiösa",
      comparative: "ambitiösare",
      superlative: "ambitiösast"
    },
    examples: {
      base: { swedish: "En ambitiös student", english: "An ambitious student" },
      definite: { swedish: "Den ambitiösa planen", english: "The ambitious plan" },
      comparative: { swedish: "En ambitiösare målsättning", english: "A more ambitious goal" },
      superlative: { swedish: "Den ambitiösaste medarbetaren", english: "The most ambitious employee" }
    }
  },
  {
    adjective: "effektiv",
    translation: "efficient",
    category: "professional",
    difficulty: "intermediate",
    forms: {
      base: "effektiv",
      definite: "effektiva",
      plural: "effektiva",
      comparative: "effektivare",
      superlative: "effektivast"
    },
    examples: {
      base: { swedish: "En effektiv metod", english: "An efficient method" },
      definite: { swedish: "Den effektiva lösningen", english: "The efficient solution" },
      comparative: { swedish: "Ett effektivare system", english: "A more efficient system" },
      superlative: { swedish: "Det effektivaste sättet", english: "The most efficient way" }
    }
  },
  {
    adjective: "digital",
    translation: "digital",
    category: "technology",
    difficulty: "intermediate",
    forms: {
      base: "digital",
      definite: "digitala",
      plural: "digitala",
      comparative: "mer digital",
      superlative: "mest digital"
    },
    examples: {
      base: { swedish: "En digital plattform", english: "A digital platform" },
      definite: { swedish: "Den digitala lösningen", english: "The digital solution" },
      comparative: { swedish: "En mer digital version", english: "A more digital version" },
      superlative: { swedish: "Den mest digitala processen", english: "The most digital process" }
    }
  },
  {
    adjective: "miljövänlig",
    translation: "environmentally friendly",
    category: "environmental",
    difficulty: "intermediate",
    forms: {
      base: "miljövänlig",
      definite: "miljövänliga",
      plural: "miljövänliga",
      comparative: "miljövänligare",
      superlative: "miljövänligast"
    },
    examples: {
      base: { swedish: "En miljövänlig produkt", english: "An environmentally friendly product" },
      definite: { swedish: "Den miljövänliga lösningen", english: "The environmentally friendly solution" },
      comparative: { swedish: "Ett miljövänligare alternativ", english: "A more environmentally friendly alternative" },
      superlative: { swedish: "Det miljövänligaste valet", english: "The most environmentally friendly choice" }
    }
  },
  {
    adjective: "flexibel",
    translation: "flexible",
    category: "modern_life",
    difficulty: "intermediate",
    forms: {
      base: "flexibel",
      definite: "flexibla",
      plural: "flexibla",
      comparative: "flexiblare",
      superlative: "flexiblast"
    },
    examples: {
      base: { swedish: "Ett flexibelt schema", english: "A flexible schedule" },
      definite: { swedish: "Den flexibla arbetstiden", english: "The flexible working hours" },
      comparative: { swedish: "En flexiblare lösning", english: "A more flexible solution" },
      superlative: { swedish: "Det flexiblaste alternativet", english: "The most flexible option" }
    }
  },
  {
    adjective: "kreativ",
    translation: "creative",
    category: "personality",
    difficulty: "intermediate",
    forms: {
      base: "kreativ",
      definite: "kreativa",
      plural: "kreativa",
      comparative: "kreativare",
      superlative: "kreativast"
    },
    examples: {
      base: { swedish: "En kreativ lösning", english: "A creative solution" },
      definite: { swedish: "Den kreativa processen", english: "The creative process" },
      comparative: { swedish: "Ett kreativare förslag", english: "A more creative suggestion" },
      superlative: { swedish: "Det kreativaste projektet", english: "The most creative project" }
    }
  },
  {
    adjective: "självständig",
    translation: "independent",
    category: "personality",
    difficulty: "intermediate",
    forms: {
      base: "självständig",
      definite: "självständiga",
      plural: "självständiga",
      comparative: "mer självständig",
      superlative: "mest självständig"
    },
    examples: {
      base: { swedish: "En självständig person", english: "An independent person" },
      definite: { swedish: "Den självständiga arbetaren", english: "The independent worker" },
      comparative: { swedish: "En mer självständig approach", english: "A more independent approach" },
      superlative: { swedish: "Den mest självständiga medarbetaren", english: "The most independent employee" }
    }
  },
  {
    adjective: "kompetent",
    translation: "competent",
    category: "professional",
    difficulty: "intermediate",
    forms: {
      base: "kompetent",
      definite: "kompetenta",
      plural: "kompetenta",
      comparative: "mer kompetent",
      superlative: "mest kompetent"
    },
    examples: {
      base: { swedish: "En kompetent chef", english: "A competent manager" },
      definite: { swedish: "Den kompetenta personalen", english: "The competent staff" },
      comparative: { swedish: "En mer kompetent kandidat", english: "A more competent candidate" },
      superlative: { swedish: "Den mest kompetenta experten", english: "The most competent expert" }
    }
  },
  {
    adjective: "produktiv",
    translation: "productive",
    category: "professional",
    difficulty: "intermediate",
    forms: {
      base: "produktiv",
      definite: "produktiva",
      plural: "produktiva",
      comparative: "produktivare",
      superlative: "produktivast"
    },
    examples: {
      base: { swedish: "En produktiv dag", english: "A productive day" },
      definite: { swedish: "Den produktiva gruppen", english: "The productive group" },
      comparative: { swedish: "Ett produktivare möte", english: "A more productive meeting" },
      superlative: { swedish: "Den produktivaste månaden", english: "The most productive month" }
    }
  },
  {
    adjective: "uppkopplad",
    translation: "connected",
    category: "technology",
    difficulty: "intermediate",
    forms: {
      base: "uppkopplad",
      definite: "uppkopplade",
      plural: "uppkopplade",
      comparative: "mer uppkopplad",
      superlative: "mest uppkopplad"
    },
    examples: {
      base: { swedish: "En uppkopplad enhet", english: "A connected device" },
      definite: { swedish: "Den uppkopplade datorn", english: "The connected computer" },
      comparative: { swedish: "Ett mer uppkopplat hem", english: "A more connected home" },
      superlative: { swedish: "Det mest uppkopplade kontoret", english: "The most connected office" }
    }
  },
  {
    adjective: "interaktiv",
    translation: "interactive",
    category: "technology",
    difficulty: "intermediate",
    forms: {
      base: "interaktiv",
      definite: "interaktiva",
      plural: "interaktiva",
      comparative: "mer interaktiv",
      superlative: "mest interaktiv"
    },
    examples: {
      base: { swedish: "En interaktiv presentation", english: "An interactive presentation" },
      definite: { swedish: "Den interaktiva skärmen", english: "The interactive screen" },
      comparative: { swedish: "En mer interaktiv upplevelse", english: "A more interactive experience" },
      superlative: { swedish: "Den mest interaktiva appen", english: "The most interactive app" }
    }
  },
  {
    adjective: "hållbar",
    translation: "sustainable",
    category: "environmental",
    difficulty: "intermediate",
    forms: {
      base: "hållbar",
      definite: "hållbara",
      plural: "hållbara",
      comparative: "hållbarare",
      superlative: "hållbarast"
    },
    examples: {
      base: { swedish: "En hållbar utveckling", english: "A sustainable development" },
      definite: { swedish: "Den hållbara framtiden", english: "The sustainable future" },
      comparative: { swedish: "En hållbarare livsstil", english: "A more sustainable lifestyle" },
      superlative: { swedish: "Det hållbaraste systemet", english: "The most sustainable system" }
    }
  },
  {
    adjective: "förnybar",
    translation: "renewable",
    category: "environmental",
    difficulty: "intermediate",
    forms: {
      base: "förnybar",
      definite: "förnybara",
      plural: "förnybara",
      comparative: "mer förnybar",
      superlative: "mest förnybar"
    },
    examples: {
      base: { swedish: "En förnybar energikälla", english: "A renewable energy source" },
      definite: { swedish: "Den förnybara energin", english: "The renewable energy" },
      comparative: { swedish: "En mer förnybar lösning", english: "A more renewable solution" },
      superlative: { swedish: "Den mest förnybara tekniken", english: "The most renewable technology" }
    }
  },
  {
    adjective: "tillgänglig",
    translation: "accessible",
    category: "modern_life",
    difficulty: "intermediate",
    forms: {
      base: "tillgänglig",
      definite: "tillgängliga",
      plural: "tillgängliga",
      comparative: "mer tillgänglig",
      superlative: "mest tillgänglig"
    },
    examples: {
      base: { swedish: "En tillgänglig service", english: "An accessible service" },
      definite: { swedish: "Den tillgängliga informationen", english: "The accessible information" },
      comparative: { swedish: "En mer tillgänglig plattform", english: "A more accessible platform" },
      superlative: { swedish: "Den mest tillgängliga versionen", english: "The most accessible version" }
    }
  },
  {
    adjective: "mobil",
    translation: "mobile",
    category: "modern_life",
    difficulty: "intermediate",
    forms: {
      base: "mobil",
      definite: "mobila",
      plural: "mobila",
      comparative: "mer mobil",
      superlative: "mest mobil"
    },
    examples: {
      base: { swedish: "En mobil arbetsplats", english: "A mobile workplace" },
      definite: { swedish: "Den mobila enheten", english: "The mobile device" },
      comparative: { swedish: "En mer mobil lösning", english: "A more mobile solution" },
      superlative: { swedish: "Den mest mobila versionen", english: "The most mobile version" }
    }
  },
  {
    adjective: "innovativ",
    translation: "innovative",
    category: "professional",
    difficulty: "intermediate",
    forms: {
      base: "innovativ",
      definite: "innovativa",
      plural: "innovativa",
      comparative: "mer innovativ",
      superlative: "mest innovativ"
    },
    examples: {
      base: { swedish: "En innovativ idé", english: "An innovative idea" },
      definite: { swedish: "Den innovativa lösningen", english: "The innovative solution" },
      comparative: { swedish: "En mer innovativ approach", english: "A more innovative approach" },
      superlative: { swedish: "Det mest innovativa företaget", english: "The most innovative company" }
    }
  },
  {
    adjective: "strategisk",
    translation: "strategic",
    category: "professional",
    difficulty: "intermediate",
    forms: {
      base: "strategisk",
      definite: "strategiska",
      plural: "strategiska",
      comparative: "mer strategisk",
      superlative: "mest strategisk"
    },
    examples: {
      base: { swedish: "Ett strategiskt beslut", english: "A strategic decision" },
      definite: { swedish: "Den strategiska planen", english: "The strategic plan" },
      comparative: { swedish: "En mer strategisk position", english: "A more strategic position" },
      superlative: { swedish: "Det mest strategiska draget", english: "The most strategic move" }
    }
  },
  {
    adjective: "virtuell",
    translation: "virtual",
    category: "technology",
    difficulty: "intermediate",
    forms: {
      base: "virtuell",
      definite: "virtuella",
      plural: "virtuella",
      comparative: "mer virtuell",
      superlative: "mest virtuell"
    },
    examples: {
      base: { swedish: "Ett virtuellt möte", english: "A virtual meeting" },
      definite: { swedish: "Den virtuella världen", english: "The virtual world" },
      comparative: { swedish: "En mer virtuell upplevelse", english: "A more virtual experience" },
      superlative: { swedish: "Den mest virtuella miljön", english: "The most virtual environment" }
    }
  },
  {
    adjective: "automatisk",
    translation: "automatic",
    category: "technology",
    difficulty: "intermediate",
    forms: {
      base: "automatisk",
      definite: "automatiska",
      plural: "automatiska",
      comparative: "mer automatisk",
      superlative: "mest automatisk"
    },
    examples: {
      base: { swedish: "Ett automatiskt system", english: "An automatic system" },
      definite: { swedish: "Den automatiska processen", english: "The automatic process" },
      comparative: { swedish: "En mer automatisk lösning", english: "A more automatic solution" },
      superlative: { swedish: "Det mest automatiska flödet", english: "The most automatic flow" }
    }
  },
  {
    adjective: "klimatsmart",
    translation: "climate-smart",
    category: "environmental",
    difficulty: "intermediate",
    forms: {
      base: "klimatsmart",
      definite: "klimatsmarta",
      plural: "klimatsmarta",
      comparative: "mer klimatsmart",
      superlative: "mest klimatsmart"
    },
    examples: {
      base: { swedish: "Ett klimatsmart val", english: "A climate-smart choice" },
      definite: { swedish: "Den klimatsmarta lösningen", english: "The climate-smart solution" },
      comparative: { swedish: "En mer klimatsmart approach", english: "A more climate-smart approach" },
      superlative: { swedish: "Det mest klimatsmarta alternativet", english: "The most climate-smart alternative" }
    }
  },
  {
    adjective: "energieffektiv",
    translation: "energy-efficient",
    category: "environmental",
    difficulty: "intermediate",
    forms: {
      base: "energieffektiv",
      definite: "energieffektiva",
      plural: "energieffektiva",
      comparative: "mer energieffektiv",
      superlative: "mest energieffektiv"
    },
    examples: {
      base: { swedish: "En energieffektiv byggnad", english: "An energy-efficient building" },
      definite: { swedish: "Den energieffektiva maskinen", english: "The energy-efficient machine" },
      comparative: { swedish: "Ett mer energieffektivt system", english: "A more energy-efficient system" },
      superlative: { swedish: "Den mest energieffektiva modellen", english: "The most energy-efficient model" }
    }
  },
  {
    adjective: "anpassningsbar",
    translation: "adaptable",
    category: "modern_life",
    difficulty: "intermediate",
    forms: {
      base: "anpassningsbar",
      definite: "anpassningsbara",
      plural: "anpassningsbara",
      comparative: "mer anpassningsbar",
      superlative: "mest anpassningsbar"
    },
    examples: {
      base: { swedish: "En anpassningsbar lösning", english: "An adaptable solution" },
      definite: { swedish: "Den anpassningsbara designen", english: "The adaptable design" },
      comparative: { swedish: "Ett mer anpassningsbart system", english: "A more adaptable system" },
      superlative: { swedish: "Den mest anpassningsbara metoden", english: "The most adaptable method" }
    }
  },
  {
    adjective: "dynamisk",
    translation: "dynamic",
    category: "modern_life",
    difficulty: "intermediate",
    forms: {
      base: "dynamisk",
      definite: "dynamiska",
      plural: "dynamiska",
      comparative: "mer dynamisk",
      superlative: "mest dynamisk"
    },
    examples: {
      base: { swedish: "En dynamisk miljö", english: "A dynamic environment" },
      definite: { swedish: "Den dynamiska utvecklingen", english: "The dynamic development" },
      comparative: { swedish: "En mer dynamisk approach", english: "A more dynamic approach" },
      superlative: { swedish: "Det mest dynamiska teamet", english: "The most dynamic team" }
    }
  },
  {
    adjective: "utåtriktad",
    translation: "outgoing",
    category: "personality",
    difficulty: "intermediate",
    forms: {
      base: "utåtriktad",
      definite: "utåtriktade",
      plural: "utåtriktade",
      comparative: "mer utåtriktad",
      superlative: "mest utåtriktad"
    },
    examples: {
      base: { swedish: "En utåtriktad person", english: "An outgoing person" },
      definite: { swedish: "Den utåtriktade säljaren", english: "The outgoing salesperson" },
      comparative: { swedish: "En mer utåtriktad personlighet", english: "A more outgoing personality" },
      superlative: { swedish: "Den mest utåtriktade deltagaren", english: "The most outgoing participant" }
    }
  },
  {
    adjective: "målmedveten",
    translation: "goal-oriented",
    category: "personality",
    difficulty: "intermediate",
    forms: {
      base: "målmedveten",
      definite: "målmedvetna",
      plural: "målmedvetna",
      comparative: "mer målmedveten",
      superlative: "mest målmedveten"
    },
    examples: {
      base: { swedish: "En målmedveten student", english: "A goal-oriented student" },
      definite: { swedish: "Den målmedvetna chefen", english: "The goal-oriented manager" },
      comparative: { swedish: "En mer målmedveten approach", english: "A more goal-oriented approach" },
      superlative: { swedish: "Den mest målmedvetna medarbetaren", english: "The most goal-oriented employee" }
    }
  }
];