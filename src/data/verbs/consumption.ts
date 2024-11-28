import type { VerbData } from '../../types/verbs';

export const consumption: VerbData[] = [
  // Eating
  { verb: "äta", group: 4, present: "äter", past: "åt", supine: "ätit", translation: "eat", category: "consumption", difficulty: "beginner" },
  { verb: "tugga", group: 1, present: "tuggar", past: "tuggade", supine: "tuggat", translation: "chew", category: "consumption", difficulty: "beginner" },
  { verb: "svälja", group: 2, present: "sväljer", past: "sväljde", supine: "svalt", translation: "swallow", category: "consumption", difficulty: "intermediate" },
  { verb: "smälta", group: 2, present: "smälter", past: "smälte", supine: "smält", translation: "digest", category: "consumption", difficulty: "intermediate" },
  { verb: "festa", group: 1, present: "festar", past: "festade", supine: "festat", translation: "feast", category: "consumption", difficulty: "intermediate" },
  { verb: "smaka", group: 1, present: "smakar", past: "smakade", supine: "smakat", translation: "taste", category: "consumption", difficulty: "beginner" },
  { verb: "provsmaka", group: 1, present: "provsmakar", past: "provsmakade", supine: "provsmakar", translation: "sample/taste-test", category: "consumption", difficulty: "intermediate" },
  { verb: "mumsa", group: 1, present: "mumsar", past: "mumsade", supine: "mumsat", translation: "munch", category: "consumption", difficulty: "intermediate" },

  // Drinking
  { verb: "dricka", group: 4, present: "dricker", past: "drack", supine: "druckit", translation: "drink", category: "consumption", difficulty: "beginner" },
  { verb: "sippa", group: 1, present: "sippar", past: "sippade", supine: "sippat", translation: "sip", category: "consumption", difficulty: "intermediate" },
  { verb: "sörpla", group: 1, present: "sörplar", past: "sörplade", supine: "sörplat", translation: "slurp", category: "consumption", difficulty: "intermediate" },
  { verb: "hälla", group: 2, present: "häller", past: "hällde", supine: "hällt", translation: "pour", category: "consumption", difficulty: "intermediate" },
  { verb: "skåla", group: 1, present: "skålar", past: "skålade", supine: "skålat", translation: "toast", category: "consumption", difficulty: "intermediate" },
  { verb: "klunka", group: 1, present: "klunkar", past: "klunkade", supine: "klunkat", translation: "gulp", category: "consumption", difficulty: "intermediate" },
  { verb: "smutta", group: 1, present: "smuttar", past: "smuttade", supine: "smuttat", translation: "sip/take small drinks", category: "consumption", difficulty: "intermediate" },

  // Resource Usage
  { verb: "använda", group: 2, present: "använder", past: "använde", supine: "använt", translation: "use", category: "consumption", difficulty: "beginner" },
  { verb: "förbruka", group: 1, present: "förbrukar", past: "förbrukade", supine: "förbrukat", translation: "consume", category: "consumption", difficulty: "intermediate" },
  { verb: "slösa", group: 1, present: "slösar", past: "slösade", supine: "slösat", translation: "waste", category: "consumption", difficulty: "intermediate" },
  { verb: "spara", group: 1, present: "sparar", past: "sparade", supine: "sparat", translation: "save", category: "consumption", difficulty: "beginner" },
  { verb: "återvinna", group: 2, present: "återvinner", past: "återvann", supine: "återvunnit", translation: "recycle", category: "consumption", difficulty: "advanced" },
  { verb: "hushålla", group: 2, present: "hushåller", past: "hushöll", supine: "hushållit", translation: "economize/manage resources", category: "consumption", difficulty: "advanced" },
  { verb: "förråda", group: 2, present: "förråder", past: "förrådde", supine: "förrådit", translation: "store up/stockpile", category: "consumption", difficulty: "advanced" },
  { verb: "konsumera", group: 1, present: "konsumerar", past: "konsumerade", supine: "konsumerat", translation: "consume", category: "consumption", difficulty: "intermediate" },

  // Consumption Habits
  { verb: "fasta", group: 1, present: "fastar", past: "fastade", supine: "fastat", translation: "fast", category: "consumption", difficulty: "intermediate" },
  { verb: "banta", group: 1, present: "bantar", past: "bantade", supine: "bantat", translation: "diet", category: "consumption", difficulty: "intermediate" },
  { verb: "frossa", group: 1, present: "frossar", past: "frossade", supine: "frossat", translation: "gorge/indulge", category: "consumption", difficulty: "advanced" },
  { verb: "småäta", group: 2, present: "småäter", past: "smååt", supine: "småätit", translation: "snack", category: "consumption", difficulty: "intermediate" },
  { verb: "överkonsumera", group: 1, present: "överkonsumerar", past: "överkonsumerade", supine: "överkonsumerat", translation: "overconsume", category: "consumption", difficulty: "advanced" },
  
  // Food Preparation
  { verb: "tillaga", group: 1, present: "tillagar", past: "tillagade", supine: "tillagat", translation: "prepare (food)", category: "consumption", difficulty: "intermediate" },
  { verb: "servera", group: 1, present: "serverar", past: "serverade", supine: "serverat", translation: "serve", category: "consumption", difficulty: "intermediate" },
  { verb: "portionera", group: 1, present: "portionerar", past: "portionerade", supine: "portionerat", translation: "portion out", category: "consumption", difficulty: "advanced" },
  { verb: "krydda", group: 1, present: "kryddar", past: "kryddade", supine: "kryddat", translation: "season/spice", category: "consumption", difficulty: "intermediate" }
];