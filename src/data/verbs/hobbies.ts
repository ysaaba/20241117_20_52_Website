import { Verb } from "../../types/verb";

export const hobbies: Verb[] = [
  // Collecting
  { verb: "samla", group: 1, present: "samlar", past: "samlade", supine: "samlat", translation: "collect", category: "hobbies", difficulty: "beginner" },
  { verb: "katalogisera", group: 1, present: "katalogiserar", past: "katalogiserade", supine: "katalogiserat", translation: "catalog", category: "hobbies", difficulty: "advanced" },
  { verb: "värdera", group: 1, present: "värderar", past: "värderade", supine: "värderat", translation: "appraise", category: "hobbies", difficulty: "intermediate" },

  // Gardening
  { verb: "odla", group: 1, present: "odlar", past: "odlade", supine: "odlat", translation: "grow/cultivate", category: "hobbies", difficulty: "beginner" },
  { verb: "plantera", group: 1, present: "planterar", past: "planterade", supine: "planterat", translation: "plant", category: "hobbies", difficulty: "beginner" },
  { verb: "beskära", group: 2, present: "beskär", past: "beskar", supine: "beskurit", translation: "prune", category: "hobbies", difficulty: "intermediate" },
  { verb: "kompostera", group: 1, present: "komposterar", past: "komposterade", supine: "komposterat", translation: "compost", category: "hobbies", difficulty: "intermediate" },

  // DIY & Crafts
  { verb: "återvinna", group: 2, present: "återvinner", past: "återvann", supine: "återvunnit", translation: "upcycle", category: "hobbies", difficulty: "intermediate" },
  { verb: "dekorera", group: 1, present: "dekorerar", past: "dekorerade", supine: "dekorerat", translation: "decorate", category: "hobbies", difficulty: "intermediate" },
  { verb: "pyssla", group: 1, present: "pysslar", past: "pysslade", supine: "pysslat", translation: "craft/tinker", category: "hobbies", difficulty: "beginner" },
  { verb: "limma", group: 1, present: "limmar", past: "limmade", supine: "limmat", translation: "glue", category: "hobbies", difficulty: "beginner" },

  // Gaming & Puzzles
  { verb: "spelleda", group: 2, present: "spelleder", past: "spelledde", supine: "spellett", translation: "gamemaster", category: "hobbies", difficulty: "advanced" },
  { verb: "rollspela", group: 1, present: "rollspelar", past: "rollspelade", supine: "rollspelat", translation: "roleplay", category: "hobbies", difficulty: "intermediate" },
  { verb: "schackmatta", group: 1, present: "schackmattar", past: "schackmattade", supine: "schackmattat", translation: "checkmate", category: "hobbies", difficulty: "advanced" },

  // Photography
  { verb: "fotografera", group: 1, present: "fotograferar", past: "fotograferade", supine: "fotograferat", translation: "photograph", category: "hobbies", difficulty: "intermediate" },
  { verb: "framkalla", group: 1, present: "framkallar", past: "framkallade", supine: "framkallat", translation: "develop photos", category: "hobbies", difficulty: "advanced" },
  { verb: "retuschera", group: 1, present: "retuscherar", past: "retuscherade", supine: "retuscherat", translation: "retouch", category: "hobbies", difficulty: "advanced" }
]; 