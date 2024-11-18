import type { VerbData } from '../../types';

export const communication: VerbData[] = [
  // Basic Communication
  { verb: "prata", group: 1, present: "pratar", past: "pratade", supine: "pratat", translation: "talk", category: "communication", difficulty: "beginner" },
  { verb: "säga", group: 4, present: "säger", past: "sa", supine: "sagt", translation: "say", category: "communication", difficulty: "beginner" },
  { verb: "berätta", group: 1, present: "berättar", past: "berättade", supine: "berättat", translation: "tell", category: "communication", difficulty: "beginner" },
  { verb: "förklara", group: 1, present: "förklarar", past: "förklarade", supine: "förklarat", translation: "explain", category: "communication", difficulty: "intermediate" },
  { verb: "diskutera", group: 1, present: "diskuterar", past: "diskuterade", supine: "diskuterat", translation: "discuss", category: "communication", difficulty: "intermediate" },
  
  // Written Communication
  { verb: "skriva", group: 4, present: "skriver", past: "skrev", supine: "skrivit", translation: "write", category: "communication", difficulty: "beginner" },
  { verb: "texta", group: 1, present: "textar", past: "textade", supine: "textat", translation: "text", category: "communication", difficulty: "beginner" },
  { verb: "maila", group: 1, present: "mailar", past: "mailade", supine: "mailat", translation: "email", category: "communication", difficulty: "beginner" },
  { verb: "anteckna", group: 1, present: "antecknar", past: "antecknade", supine: "antecknat", translation: "take notes", category: "communication", difficulty: "intermediate" },
  { verb: "signera", group: 1, present: "signerar", past: "signerade", supine: "signerat", translation: "sign", category: "communication", difficulty: "intermediate" },
  
  // Expressive Communication
  { verb: "ropa", group: 1, present: "ropar", past: "ropade", supine: "ropat", translation: "shout", category: "communication", difficulty: "beginner" },
  { verb: "viska", group: 1, present: "viskar", past: "viskade", supine: "viskat", translation: "whisper", category: "communication", difficulty: "beginner" },
  { verb: "skrika", group: 4, present: "skriker", past: "skrek", supine: "skrikit", translation: "scream", category: "communication", difficulty: "beginner" },
  { verb: "mumla", group: 1, present: "mumlar", past: "mumlade", supine: "mumlat", translation: "mumble", category: "communication", difficulty: "intermediate" },
  { verb: "sjunga", group: 4, present: "sjunger", past: "sjöng", supine: "sjungit", translation: "sing", category: "communication", difficulty: "intermediate" },
  
  // Social Communication
  { verb: "hälsa", group: 1, present: "hälsar", past: "hälsade", supine: "hälsat", translation: "greet", category: "communication", difficulty: "beginner" },
  { verb: "tacka", group: 1, present: "tackar", past: "tackade", supine: "tackat", translation: "thank", category: "communication", difficulty: "beginner" },
  { verb: "gratulera", group: 1, present: "gratulerar", past: "gratulerade", supine: "gratulerat", translation: "congratulate", category: "communication", difficulty: "intermediate" },
  { verb: "presentera", group: 1, present: "presenterar", past: "presenterade", supine: "presenterat", translation: "present", category: "communication", difficulty: "intermediate" },
  { verb: "rekommendera", group: 1, present: "rekommenderar", past: "rekommenderade", supine: "rekommenderat", translation: "recommend", category: "communication", difficulty: "advanced" },

    // Basic Group 3 Verbs
  { verb: "bo", group: 3, present: "bor", past: "bodde", supine: "bott", translation: "live", category: "daily", difficulty: "beginner" },
  { verb: "tro", group: 3, present: "tror", past: "trodde", supine: "trott", translation: "believe", category: "cognition", difficulty: "beginner" },
  { verb: "sy", group: 3, present: "syr", past: "sydde", supine: "sytt", translation: "sew", category: "creation", difficulty: "intermediate" },
  { verb: "nå", group: 3, present: "når", past: "nådde", supine: "nått", translation: "reach", category: "movement", difficulty: "beginner" },
  { verb: "må", group: 3, present: "mår", past: "mådde", supine: "mått", translation: "feel", category: "emotion", difficulty: "beginner" },

  // Movement and Position
  { verb: "stå", group: 3, present: "står", past: "stod", supine: "stått", translation: "stand", category: "movement", difficulty: "beginner" },
  { verb: "gå", group: 3, present: "går", past: "gick", supine: "gått", translation: "walk/go", category: "movement", difficulty: "beginner" },
  { verb: "slå", group: 3, present: "slår", past: "slog", supine: "slagit", translation: "hit", category: "movement", difficulty: "intermediate" },
  { verb: "dö", group: 3, present: "dör", past: "dog", supine: "dött", translation: "die", category: "change", difficulty: "intermediate" },
  { verb: "klä", group: 3, present: "klär", past: "klädde", supine: "klätt", translation: "dress", category: "daily", difficulty: "intermediate" },

  // Communication and Expression
  { verb: "le", group: 3, present: "ler", past: "log", supine: "lett", translation: "smile", category: "emotion", difficulty: "beginner" },
  { verb: "se", group: 3, present: "ser", past: "såg", supine: "sett", translation: "see", category: "perception", difficulty: "beginner" },
  { verb: "be", group: 3, present: "ber", past: "bad", supine: "bett", translation: "ask/pray", category: "communication", difficulty: "intermediate" },
  { verb: "rå", group: 3, present: "rår", past: "rådde", supine: "rått", translation: "control/manage", category: "possession", difficulty: "advanced" },
  { verb: "strö", group: 3, present: "strör", past: "strödde", supine: "strött", translation: "sprinkle", category: "movement", difficulty: "advanced" },

  // Mental and Emotional States
  { verb: "spy", group: 3, present: "spyr", past: "spydde", supine: "spytt", translation: "vomit", category: "health", difficulty: "intermediate" },
  { verb: "gny", group: 3, present: "gnyr", past: "gnydde", supine: "gnytt", translation: "whine", category: "communication", difficulty: "advanced" },
  { verb: "fly", group: 3, present: "flyr", past: "flydde", supine: "flytt", translation: "flee", category: "movement", difficulty: "intermediate" },
  { verb: "ske", group: 3, present: "sker", past: "skedde", supine: "skett", translation: "happen", category: "change", difficulty: "intermediate" },
  { verb: "gro", group: 3, present: "gror", past: "grodde", supine: "grott", translation: "grow", category: "change", difficulty: "intermediate" },

  // Daily Activities
  { verb: "ro", group: 3, present: "ror", past: "rodde", supine: "rott", translation: "row", category: "movement", difficulty: "intermediate" },
  { verb: "så", group: 3, present: "sår", past: "sådde", supine: "sått", translation: "sow", category: "creation", difficulty: "advanced" },
  { verb: "få", group: 3, present: "får", past: "fick", supine: "fått", translation: "get/receive", category: "possession", difficulty: "beginner" },
  { verb: "spå", group: 3, present: "spår", past: "spådde", supine: "spått", translation: "predict", category: "cognition", difficulty: "advanced" }

];