import type { VerbData } from '../../types/verbs';

export const possession: VerbData[] = [
  // Basic Possession
  { verb: "ha", group: 4, present: "har", past: "hade", supine: "haft", translation: "have", category: "possession", difficulty: "beginner" },
  { verb: "äga", group: 2, present: "äger", past: "ägde", supine: "ägt", translation: "own", category: "possession", difficulty: "beginner" },
  { verb: "få", group: 4, present: "får", past: "fick", supine: "fått", translation: "get/receive", category: "possession", difficulty: "beginner" },
  { verb: "ta", group: 4, present: "tar", past: "tog", supine: "tagit", translation: "take", category: "possession", difficulty: "beginner" },
  { verb: "ge", group: 4, present: "ger", past: "gav", supine: "givit", translation: "give", category: "possession", difficulty: "beginner" },

  // Acquisition
  { verb: "köpa", group: 2, present: "köper", past: "köpte", supine: "köpt", translation: "buy", category: "possession", difficulty: "beginner" },
  { verb: "sälja", group: 2, present: "säljer", past: "sålde", supine: "sålt", translation: "sell", category: "possession", difficulty: "beginner" },
  { verb: "låna", group: 1, present: "lånar", past: "lånade", supine: "lånat", translation: "borrow", category: "possession", difficulty: "beginner" },
  { verb: "hyra", group: 2, present: "hyr", past: "hyrde", supine: "hyrt", translation: "rent", category: "possession", difficulty: "intermediate" },
  { verb: "byta", group: 2, present: "byter", past: "bytte", supine: "bytt", translation: "exchange", category: "possession", difficulty: "intermediate" },

  // Management
  { verb: "spara", group: 1, present: "sparar", past: "sparade", supine: "sparat", translation: "save", category: "possession", difficulty: "beginner" },
  { verb: "förvara", group: 1, present: "förvarar", past: "förvarade", supine: "förvarat", translation: "store", category: "possession", difficulty: "intermediate" },
  { verb: "samla", group: 1, present: "samlar", past: "samlade", supine: "samlat", translation: "collect", category: "possession", difficulty: "beginner" },
  { verb: "organisera", group: 1, present: "organiserar", past: "organiserade", supine: "organiserat", translation: "organize", category: "possession", difficulty: "intermediate" },
  { verb: "investera", group: 1, present: "investerar", past: "investerade", supine: "investerat", translation: "invest", category: "possession", difficulty: "advanced" },

  // Loss and Transfer
  { verb: "förlora", group: 1, present: "förlorar", past: "förlorade", supine: "förlorat", translation: "lose", category: "possession", difficulty: "intermediate" },
  { verb: "skänka", group: 2, present: "skänker", past: "skänkte", supine: "skänkt", translation: "donate", category: "possession", difficulty: "intermediate" },
  { verb: "dela", group: 1, present: "delar", past: "delade", supine: "delat", translation: "share", category: "possession", difficulty: "beginner" },
  { verb: "ärva", group: 2, present: "ärver", past: "ärvde", supine: "ärvt", translation: "inherit", category: "possession", difficulty: "intermediate" },
  { verb: "överlåta", group: 4, present: "överlåter", past: "överlät", supine: "överlåtit", translation: "transfer", category: "possession", difficulty: "advanced" }
];