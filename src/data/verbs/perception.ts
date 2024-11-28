import type { VerbData } from '../../types/verbs';

export const perception: VerbData[] = [
  // Visual Perception
  { verb: "se", group: 4, present: "ser", past: "såg", supine: "sett", translation: "see", category: "perception", difficulty: "beginner" },
  { verb: "titta", group: 1, present: "tittar", past: "tittade", supine: "tittat", translation: "look", category: "perception", difficulty: "beginner" },
  { verb: "observera", group: 1, present: "observerar", past: "observerade", supine: "observerat", translation: "observe", category: "perception", difficulty: "intermediate" },
  { verb: "märka", group: 2, present: "märker", past: "märkte", supine: "märkt", translation: "notice", category: "perception", difficulty: "intermediate" },
  { verb: "upptäcka", group: 2, present: "upptäcker", past: "upptäckte", supine: "upptäckt", translation: "discover", category: "perception", difficulty: "intermediate" },
  { verb: "skåda", group: 1, present: "skådar", past: "skådade", supine: "skådat", translation: "behold", category: "perception", difficulty: "advanced" },
  { verb: "granska", group: 1, present: "granskar", past: "granskade", supine: "granskat", translation: "examine", category: "perception", difficulty: "intermediate" },

  // Auditory Perception
  { verb: "höra", group: 2, present: "hör", past: "hörde", supine: "hört", translation: "hear", category: "perception", difficulty: "beginner" },
  { verb: "lyssna", group: 1, present: "lyssnar", past: "lyssnade", supine: "lyssnat", translation: "listen", category: "perception", difficulty: "beginner" },
  { verb: "uppfatta", group: 1, present: "uppfattar", past: "uppfattade", supine: "uppfattat", translation: "perceive", category: "perception", difficulty: "intermediate" },
  { verb: "urskilja", group: 2, present: "urskiljer", past: "urskilde", supine: "urskilt", translation: "distinguish", category: "perception", difficulty: "advanced" },
  { verb: "överrösta", group: 1, present: "överröstar", past: "överröstade", supine: "överröstat", translation: "drown out", category: "perception", difficulty: "advanced" },
  { verb: "tjuvlyssna", group: 1, present: "tjuvlyssnar", past: "tjuvlyssnade", supine: "tjuvlyssnat", translation: "eavesdrop", category: "perception", difficulty: "advanced" },
  { verb: "avlyssna", group: 1, present: "avlyssnar", past: "avlyssnade", supine: "avlyssnat", translation: "wiretap/monitor", category: "perception", difficulty: "advanced" },

  // Touch Perception
  { verb: "känna", group: 2, present: "känner", past: "kände", supine: "känt", translation: "feel", category: "perception", difficulty: "beginner" },
  { verb: "röra", group: 2, present: "rör", past: "rörde", supine: "rört", translation: "touch", category: "perception", difficulty: "beginner" },
  { verb: "stryka", group: 2, present: "stryker", past: "strök", supine: "strukit", translation: "stroke", category: "perception", difficulty: "intermediate" },
  { verb: "klämma", group: 2, present: "klämmer", past: "klämde", supine: "klämt", translation: "squeeze", category: "perception", difficulty: "intermediate" },
  { verb: "massera", group: 1, present: "masserar", past: "masserade", supine: "masserat", translation: "massage", category: "perception", difficulty: "intermediate" },
  { verb: "smeka", group: 1, present: "smekar", past: "smekte", supine: "smekt", translation: "caress", category: "perception", difficulty: "intermediate" },
  { verb: "klia", group: 1, present: "kliar", past: "kliade", supine: "kliat", translation: "scratch", category: "perception", difficulty: "beginner" },

  // Taste and Smell
  { verb: "smaka", group: 1, present: "smakar", past: "smakade", supine: "smakat", translation: "taste", category: "perception", difficulty: "beginner" },
  { verb: "lukta", group: 1, present: "luktar", past: "luktade", supine: "luktat", translation: "smell", category: "perception", difficulty: "beginner" },
  { verb: "dofta", group: 1, present: "doftar", past: "doftade", supine: "doftat", translation: "scent/smell nice", category: "perception", difficulty: "intermediate" },
  { verb: "stinka", group: 2, present: "stinker", past: "stank", supine: "stunkit", translation: "stink", category: "perception", difficulty: "intermediate" },
  { verb: "provsmaka", group: 1, present: "provsmakar", past: "provsmakade", supine: "provsmakat", translation: "taste-test", category: "perception", difficulty: "advanced" }
];