import type { VerbData } from '../../types';

export const consumption: VerbData[] = [
  // Eating
  { verb: "äta", group: 4, present: "äter", past: "åt", supine: "ätit", translation: "eat", category: "consumption", difficulty: "beginner" },
  { verb: "tugga", group: 1, present: "tuggar", past: "tuggade", supine: "tuggat", translation: "chew", category: "consumption", difficulty: "beginner" },
  { verb: "svälja", group: 2, present: "sväljer", past: "sväljde", supine: "svalt", translation: "swallow", category: "consumption", difficulty: "intermediate" },
  { verb: "smälta", group: 2, present: "smälter", past: "smälte", supine: "smält", translation: "digest", category: "consumption", difficulty: "intermediate" },
  { verb: "festa", group: 1, present: "festar", past: "festade", supine: "festat", translation: "feast", category: "consumption", difficulty: "intermediate" },

  // Drinking
  { verb: "dricka", group: 4, present: "dricker", past: "drack", supine: "druckit", translation: "drink", category: "consumption", difficulty: "beginner" },
  { verb: "sippa", group: 1, present: "sippar", past: "sippade", supine: "sippat", translation: "sip", category: "consumption", difficulty: "intermediate" },
  { verb: "sörpla", group: 1, present: "sörplar", past: "sörplade", supine: "sörplat", translation: "slurp", category: "consumption", difficulty: "intermediate" },
  { verb: "hälla", group: 2, present: "häller", past: "hällde", supine: "hällt", translation: "pour", category: "consumption", difficulty: "intermediate" },

  // Resource Usage
  { verb: "använda", group: 2, present: "använder", past: "använde", supine: "använt", translation: "use", category: "consumption", difficulty: "beginner" },
  { verb: "förbruka", group: 1, present: "förbrukar", past: "förbrukade", supine: "förbrukat", translation: "consume", category: "consumption", difficulty: "intermediate" },
  { verb: "slösa", group: 1, present: "slösar", past: "slösade", supine: "slösat", translation: "waste", category: "consumption", difficulty: "intermediate" },
  { verb: "spara", group: 1, present: "sparar", past: "sparade", supine: "sparat", translation: "save", category: "consumption", difficulty: "beginner" },
  { verb: "återvinna", group: 2, present: "återvinner", past: "återvann", supine: "återvunnit", translation: "recycle", category: "consumption", difficulty: "advanced" },

  // Consumption Habits
  { verb: "fasta", group: 1, present: "fastar", past: "fastade", supine: "fastat", translation: "fast", category: "consumption", difficulty: "intermediate" },
  { verb: "snacka", group: 1, present: "snackar", past: "snackade", supine: "snackat", translation: "snack", category: "consumption", difficulty: "beginner" },
  { verb: "småäta", group: 2, present: "småäter", past: "smååt", supine: "småätit", translation: "nibble", category: "consumption", difficulty: "intermediate" },
  { verb: "frossa", group: 1, present: "frossar", past: "frossade", supine: "frossat", translation: "gorge", category: "consumption", difficulty: "advanced" },
  { verb: "provsmaka", group: 1, present: "provsmakar", past: "provsmakade", supine: "provsmakar", translation: "taste-test", category: "consumption", difficulty: "advanced" }
];