import type { VerbData } from '../../types/verbs';

export const household: VerbData[] = [
  // Cleaning
  { verb: "damma", group: 1, present: "dammar", past: "dammade", supine: "dammat", translation: "dust", category: "household", difficulty: "beginner" },
  { verb: "moppa", group: 1, present: "moppar", past: "moppade", supine: "moppat", translation: "mop", category: "household", difficulty: "beginner" },
  { verb: "skura", group: 1, present: "skurar", past: "skurade", supine: "skurat", translation: "scrub", category: "household", difficulty: "intermediate" },
  { verb: "vädra", group: 1, present: "vädrar", past: "vädrade", supine: "vädrat", translation: "air out", category: "household", difficulty: "intermediate" },
  { verb: "polera", group: 1, present: "polerar", past: "polerade", supine: "polerat", translation: "polish", category: "household", difficulty: "intermediate" },

  // Laundry
  { verb: "tvätta", group: 1, present: "tvättar", past: "tvättade", supine: "tvättat", translation: "wash", category: "household", difficulty: "beginner" },
  { verb: "stryka", group: 2, present: "stryker", past: "strök", supine: "strukit", translation: "iron", category: "household", difficulty: "intermediate" },
  { verb: "vika", group: 2, present: "viker", past: "vek", supine: "vikit", translation: "fold", category: "household", difficulty: "beginner" },
  { verb: "hänga", group: 2, present: "hänger", past: "hängde", supine: "hängt", translation: "hang", category: "household", difficulty: "beginner" },
  { verb: "mangla", group: 1, present: "manglar", past: "manglade", supine: "manglat", translation: "mangle", category: "household", difficulty: "advanced" },

  // Maintenance
  { verb: "reparera", group: 1, present: "reparerar", past: "reparerade", supine: "reparerat", translation: "repair", category: "household", difficulty: "intermediate" },
  { verb: "måla", group: 1, present: "målar", past: "målade", supine: "målat", translation: "paint", category: "household", difficulty: "beginner" },
  { verb: "tapetsera", group: 1, present: "tapetserar", past: "tapetserade", supine: "tapetserat", translation: "wallpaper", category: "household", difficulty: "advanced" },
  { verb: "renovera", group: 1, present: "renoverar", past: "renoverade", supine: "renoverat", translation: "renovate", category: "household", difficulty: "advanced" },
  { verb: "fixa", group: 1, present: "fixar", past: "fixade", supine: "fixat", translation: "fix", category: "household", difficulty: "beginner" },

  // Cooking
  { verb: "koka", group: 1, present: "kokar", past: "kokade", supine: "kokat", translation: "boil", category: "household", difficulty: "beginner" },
  { verb: "steka", group: 2, present: "steker", past: "stekte", supine: "stekt", translation: "fry", category: "household", difficulty: "beginner" },
  { verb: "baka", group: 1, present: "bakar", past: "bakade", supine: "bakat", translation: "bake", category: "household", difficulty: "beginner" },
  { verb: "grilla", group: 1, present: "grillar", past: "grillade", supine: "grillat", translation: "grill", category: "household", difficulty: "intermediate" },

  // Home Improvement
  { verb: "installera", group: 1, present: "installerar", past: "installerade", supine: "installerat", translation: "install", category: "household", difficulty: "intermediate" },
  { verb: "montera", group: 1, present: "monterar", past: "monterade", supine: "monterat", translation: "mount/assemble", category: "household", difficulty: "intermediate" },
  { verb: "isolera", group: 1, present: "isolerar", past: "isolerade", supine: "isolerat", translation: "insulate", category: "household", difficulty: "advanced" },
  { verb: "ventilera", group: 1, present: "ventilerar", past: "ventilerade", supine: "ventilerat", translation: "ventilate", category: "household", difficulty: "intermediate" }
]; 