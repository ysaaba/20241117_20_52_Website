import type { VerbData } from '../../types';

export const movement: VerbData[] = [
  // Basic Movement
  { verb: "springa", group: 4, present: "springer", past: "sprang", supine: "sprungit", translation: "run", category: "movement", difficulty: "beginner" },
  { verb: "hoppa", group: 1, present: "hoppar", past: "hoppade", supine: "hoppat", translation: "jump", category: "movement", difficulty: "beginner" },
  { verb: "krypa", group: 2, present: "kryper", past: "kröp", supine: "krupit", translation: "crawl", category: "movement", difficulty: "intermediate" },
  { verb: "klättra", group: 1, present: "klättrar", past: "klättrade", supine: "klättrat", translation: "climb", category: "movement", difficulty: "intermediate" },
  { verb: "simma", group: 2, present: "simmar", past: "sam", supine: "summit", translation: "swim", category: "movement", difficulty: "beginner" },
  
  // Directional Movement
  { verb: "vända", group: 2, present: "vänder", past: "vände", supine: "vänt", translation: "turn", category: "movement", difficulty: "beginner" },
  { verb: "stiga", group: 2, present: "stiger", past: "steg", supine: "stigit", translation: "rise/step", category: "movement", difficulty: "intermediate" },
  { verb: "falla", group: 4, present: "faller", past: "föll", supine: "fallit", translation: "fall", category: "movement", difficulty: "beginner" },
  { verb: "sjunka", group: 4, present: "sjunker", past: "sjönk", supine: "sjunkit", translation: "sink", category: "movement", difficulty: "intermediate" },
  { verb: "lyfta", group: 2, present: "lyfter", past: "lyfte", supine: "lyft", translation: "lift", category: "movement", difficulty: "beginner" },
  
  // Transportation
  { verb: "köra", group: 2, present: "kör", past: "körde", supine: "kört", translation: "drive", category: "movement", difficulty: "beginner" },
  { verb: "cykla", group: 1, present: "cyklar", past: "cyklade", supine: "cyklat", translation: "cycle", category: "movement", difficulty: "beginner" },
  { verb: "flyga", group: 2, present: "flyger", past: "flög", supine: "flugit", translation: "fly", category: "movement", difficulty: "intermediate" },
  { verb: "segla", group: 1, present: "seglar", past: "seglade", supine: "seglat", translation: "sail", category: "movement", difficulty: "intermediate" },
  { verb: "åka", group: 2, present: "åker", past: "åkte", supine: "åkt", translation: "travel/go", category: "movement", difficulty: "beginner" },
  
  // Subtle Movement
  { verb: "darra", group: 1, present: "darrar", past: "darrade", supine: "darrat", translation: "tremble", category: "movement", difficulty: "intermediate" },
  { verb: "skaka", group: 1, present: "skakar", past: "skakade", supine: "skakat", translation: "shake", category: "movement", difficulty: "beginner" },
  { verb: "vicka", group: 1, present: "vickar", past: "vickade", supine: "vickat", translation: "wiggle", category: "movement", difficulty: "intermediate" },
  { verb: "gunga", group: 1, present: "gungar", past: "gungade", supine: "gungat", translation: "swing", category: "movement", difficulty: "beginner" },
  { verb: "vagga", group: 1, present: "vaggar", past: "vaggade", supine: "vaggat", translation: "rock", category: "movement", difficulty: "intermediate" },
  
  // Group Movement
  { verb: "samlas", group: 1, present: "samlas", past: "samlades", supine: "samlats", translation: "gather", category: "movement", difficulty: "intermediate" },
  { verb: "mötas", group: 2, present: "möts", past: "möttes", supine: "mötts", translation: "meet", category: "movement", difficulty: "beginner" },
  { verb: "skiljas", group: 2, present: "skiljs", past: "skiljdes", supine: "skiljts", translation: "separate", category: "movement", difficulty: "intermediate" },
  { verb: "följas", group: 2, present: "följs", past: "följdes", supine: "följts", translation: "follow each other", category: "movement", difficulty: "intermediate" },
  { verb: "trängas", group: 2, present: "trängs", past: "trängdes", supine: "trängts", translation: "crowd", category: "movement", difficulty: "advanced" }
  
];