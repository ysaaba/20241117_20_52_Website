import type { VerbData } from '../../types/verbs';

export const movement: VerbData[] = [
  // Basic Movement
  { verb: "springa", group: 4, present: "springer", past: "sprang", supine: "sprungit", translation: "run", category: "movement", difficulty: "beginner" },
  { verb: "hoppa", group: 1, present: "hoppar", past: "hoppade", supine: "hoppat", translation: "jump", category: "movement", difficulty: "beginner" },
  { verb: "krypa", group: 2, present: "kryper", past: "kröp", supine: "krupit", translation: "crawl", category: "movement", difficulty: "intermediate" },
  { verb: "klättra", group: 1, present: "klättrar", past: "klättrade", supine: "klättrat", translation: "climb", category: "movement", difficulty: "intermediate" },
  { verb: "simma", group: 2, present: "simmar", past: "sam", supine: "summit", translation: "swim", category: "movement", difficulty: "beginner" },
  { verb: "smyga", group: 2, present: "smyger", past: "smög", supine: "smugit", translation: "sneak", category: "movement", difficulty: "intermediate" },
  { verb: "promenera", group: 1, present: "promenerar", past: "promenerade", supine: "promenerat", translation: "walk", category: "movement", difficulty: "beginner" },
  
  // Directional Movement
  { verb: "vända", group: 2, present: "vänder", past: "vände", supine: "vänt", translation: "turn", category: "movement", difficulty: "beginner" },
  { verb: "stiga", group: 2, present: "stiger", past: "steg", supine: "stigit", translation: "rise/step", category: "movement", difficulty: "intermediate" },
  { verb: "falla", group: 4, present: "faller", past: "föll", supine: "fallit", translation: "fall", category: "movement", difficulty: "beginner" },
  { verb: "sjunka", group: 4, present: "sjunker", past: "sjönk", supine: "sjunkit", translation: "sink", category: "movement", difficulty: "intermediate" },
  { verb: "lyfta", group: 2, present: "lyfter", past: "lyfte", supine: "lyft", translation: "lift", category: "movement", difficulty: "beginner" },
  { verb: "kliva", group: 2, present: "kliver", past: "klev", supine: "klivit", translation: "step", category: "movement", difficulty: "intermediate" },
  { verb: "svänga", group: 2, present: "svänger", past: "svängde", supine: "svängt", translation: "turn/swing", category: "movement", difficulty: "intermediate" },
  
  // Transportation
  { verb: "köra", group: 2, present: "kör", past: "körde", supine: "kört", translation: "drive", category: "movement", difficulty: "beginner" },
  { verb: "cykla", group: 1, present: "cyklar", past: "cyklade", supine: "cyklat", translation: "cycle", category: "movement", difficulty: "beginner" },
  { verb: "flyga", group: 2, present: "flyger", past: "flög", supine: "flugit", translation: "fly", category: "movement", difficulty: "intermediate" },
  { verb: "segla", group: 1, present: "seglar", past: "seglade", supine: "seglat", translation: "sail", category: "movement", difficulty: "intermediate" },
  { verb: "åka", group: 2, present: "åker", past: "åkte", supine: "åkt", translation: "travel/go", category: "movement", difficulty: "beginner" },
  { verb: "paddla", group: 1, present: "paddlar", past: "paddlade", supine: "paddlat", translation: "paddle", category: "movement", difficulty: "intermediate" },
  { verb: "rida", group: 2, present: "rider", past: "red", supine: "ridit", translation: "ride", category: "movement", difficulty: "intermediate" },
  
  // Subtle Movement
  { verb: "darra", group: 1, present: "darrar", past: "darrade", supine: "darrat", translation: "tremble", category: "movement", difficulty: "intermediate" },
  { verb: "skaka", group: 1, present: "skakar", past: "skakade", supine: "skakat", translation: "shake", category: "movement", difficulty: "beginner" },
  { verb: "vicka", group: 1, present: "vickar", past: "vickade", supine: "vickat", translation: "wiggle", category: "movement", difficulty: "intermediate" },
  { verb: "vingla", group: 1, present: "vinglar", past: "vinglade", supine: "vinglat", translation: "wobble", category: "movement", difficulty: "intermediate" },
  { verb: "gunga", group: 1, present: "gungar", past: "gungade", supine: "gungat", translation: "swing/rock", category: "movement", difficulty: "beginner" },
  { verb: "fly", group: 3, present: "flyr", past: "flydde", supine: "flytt", translation: "flee", category: "movement", difficulty: "intermediate" },
  { verb: "nå", group: 3, present: "når", past: "nådde", supine: "nått", translation: "reach", category: "movement", difficulty: "intermediate" },
  { verb: "ro", group: 3, present: "ror", past: "rodde", supine: "rott", translation: "row", category: "movement", difficulty: "intermediate" },
  
  // Sports Movement
  { verb: "dribbla", group: 1, present: "dribblar", past: "dribblade", supine: "dribblat", translation: "dribble", category: "movement", difficulty: "intermediate" },
  { verb: "tackla", group: 1, present: "tacklar", past: "tacklade", supine: "tacklat", translation: "tackle", category: "movement", difficulty: "intermediate" },
  { verb: "jonglera", group: 1, present: "jonglerar", past: "jonglerade", supine: "jonglerat", translation: "juggle", category: "movement", difficulty: "advanced" },
  { verb: "balansera", group: 1, present: "balanserar", past: "balanserade", supine: "balanserat", translation: "balance", category: "movement", difficulty: "intermediate" },
  
  // Complex Movement
  { verb: "accelerera", group: 1, present: "accelererar", past: "accelererade", supine: "accelererat", translation: "accelerate", category: "movement", difficulty: "advanced" },
  { verb: "navigera", group: 1, present: "navigerar", past: "navigerade", supine: "navigerat", translation: "navigate", category: "movement", difficulty: "intermediate" },
  { verb: "parera", group: 1, present: "parerar", past: "parerade", supine: "parerat", translation: "parry/dodge", category: "movement", difficulty: "advanced" }
];