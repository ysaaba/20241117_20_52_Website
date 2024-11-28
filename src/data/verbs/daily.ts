import type { VerbData } from '../../types/verbs';

export const daily: VerbData[] = [
  // Basic Needs
  { verb: "sova", group: 2, present: "sover", past: "sov", supine: "sovit", translation: "sleep", category: "daily", difficulty: "beginner" },
  { verb: "vila", group: 1, present: "vilar", past: "vilade", supine: "vilat", translation: "rest", category: "daily", difficulty: "beginner" },
  { verb: "bada", group: 1, present: "badar", past: "badade", supine: "badat", translation: "bathe", category: "daily", difficulty: "beginner" },
  { verb: "duscha", group: 1, present: "duschar", past: "duschade", supine: "duschat", translation: "shower", category: "daily", difficulty: "beginner" },
  { verb: "borsta", group: 1, present: "borstar", past: "borstade", supine: "borstat", translation: "brush", category: "daily", difficulty: "beginner" },
  { verb: "äta", group: 4, present: "äter", past: "åt", supine: "ätit", translation: "eat", category: "daily", difficulty: "beginner" },
  { verb: "dricka", group: 4, present: "dricker", past: "drack", supine: "druckit", translation: "drink", category: "daily", difficulty: "beginner" },
  { verb: "andas", group: 1, present: "andas", past: "andades", supine: "andats", translation: "breathe", category: "daily", difficulty: "beginner" },

  // Group 3 Daily Activities
  { verb: "stå", group: 4, present: "står", past: "stod", supine: "stått", translation: "stand", category: "daily", difficulty: "beginner" },
  { verb: "sitta", group: 2, present: "sitter", past: "satt", supine: "suttit", translation: "sit", category: "daily", difficulty: "beginner" },
  { verb: "ligga", group: 4, present: "ligger", past: "låg", supine: "legat", translation: "lie down", category: "daily", difficulty: "beginner" },
  { verb: "klä", group: 3, present: "klär", past: "klädde", supine: "klätt", translation: "dress", category: "daily", difficulty: "intermediate" },
  { verb: "bo", group: 3, present: "bor", past: "bodde", supine: "bott", translation: "live", category: "daily", difficulty: "beginner" },
  { verb: "gå", group: 3, present: "går", past: "gick", supine: "gått", translation: "walk/go", category: "daily", difficulty: "beginner" },
  { verb: "springa", group: 4, present: "springer", past: "sprang", supine: "sprungit", translation: "run", category: "daily", difficulty: "intermediate" },
  { verb: "cykla", group: 1, present: "cyklar", past: "cyklade", supine: "cyklat", translation: "cycle", category: "daily", difficulty: "intermediate" },
  { verb: "bry", group: 3, present: "bryr", past: "brydde", supine: "brytt", translation: "care", category: "daily", difficulty: "intermediate" },
  { verb: "nå", group: 3, present: "når", past: "nådde", supine: "nått", translation: "reach", category: "daily", difficulty: "intermediate" },
  { verb: "ske", group: 3, present: "sker", past: "skedde", supine: "skett", translation: "happen", category: "daily", difficulty: "intermediate" },
  { verb: "se", group: 3, present: "ser", past: "såg", supine: "sett", translation: "see", category: "daily", difficulty: "beginner" },
  { verb: "dö", group: 3, present: "dör", past: "dog", supine: "dött", translation: "die", category: "daily", difficulty: "intermediate" },

  // Morning Routines
  { verb: "vakna", group: 1, present: "vaknar", past: "vaknade", supine: "vaknat", translation: "wake up", category: "daily", difficulty: "beginner" },
  { verb: "kliva", group: 2, present: "kliver", past: "klev", supine: "klivit", translation: "step", category: "daily", difficulty: "intermediate" },
  { verb: "raka", group: 1, present: "rakar", past: "rakade", supine: "rakat", translation: "shave", category: "daily", difficulty: "intermediate" },
  { verb: "kamma", group: 1, present: "kammar", past: "kammade", supine: "kammat", translation: "comb", category: "daily", difficulty: "beginner" },
  { verb: "sminka", group: 1, present: "sminkar", past: "sminkade", supine: "sminkat", translation: "put on makeup", category: "daily", difficulty: "intermediate" },
  { verb: "tvätta", group: 1, present: "tvättar", past: "tvättade", supine: "tvättat", translation: "wash", category: "daily", difficulty: "beginner" },
  { verb: "klä på sig", group: 2, present: "klär på sig", past: "klädde på sig", supine: "klätt på sig", translation: "get dressed", category: "daily", difficulty: "intermediate" },
  { verb: "frukostera", group: 1, present: "frukosterar", past: "frukosterade", supine: "frukosterat", translation: "have breakfast", category: "daily", difficulty: "intermediate" },

  // Household Tasks
  { verb: "städa", group: 1, present: "städar", past: "städade", supine: "städat", translation: "clean", category: "daily", difficulty: "beginner" },
  { verb: "diska", group: 1, present: "diskar", past: "diskade", supine: "diskat", translation: "do dishes", category: "daily", difficulty: "beginner" },
  { verb: "dammsuga", group: 2, present: "dammsuger", past: "dammsög", supine: "dammsugit", translation: "vacuum", category: "daily", difficulty: "intermediate" },
  { verb: "tvätta", group: 1, present: "tvättar", past: "tvättade", supine: "tvättat", translation: "do laundry", category: "daily", difficulty: "beginner" },
  { verb: "stryka", group: 2, present: "stryker", past: "strök", supine: "strukit", translation: "iron", category: "daily", difficulty: "intermediate" },
  { verb: "vika", group: 2, present: "viker", past: "vek", supine: "vikit", translation: "fold", category: "daily", difficulty: "beginner" },
  { verb: "bädda", group: 1, present: "bäddar", past: "bäddade", supine: "bäddat", translation: "make the bed", category: "daily", difficulty: "beginner" },
  
  // Evening Routines
  { verb: "laga mat", group: 1, present: "lagar mat", past: "lagade mat", supine: "lagat mat", translation: "cook food", category: "daily", difficulty: "intermediate" },
  { verb: "äta middag", group: 4, present: "äter middag", past: "åt middag", supine: "ätit middag", translation: "have dinner", category: "daily", difficulty: "beginner" },
  { verb: "koppla av", group: 1, present: "kopplar av", past: "kopplade av", supine: "kopplat av", translation: "relax", category: "daily", difficulty: "intermediate" },
  { verb: "borsta tänderna", group: 1, present: "borstar tänderna", past: "borstade tänderna", supine: "borstat tänderna", translation: "brush teeth", category: "daily", difficulty: "beginner" },
  { verb: "ta av sig", group: 4, present: "tar av sig", past: "tog av sig", supine: "tagit av sig", translation: "undress", category: "daily", difficulty: "intermediate" }
];