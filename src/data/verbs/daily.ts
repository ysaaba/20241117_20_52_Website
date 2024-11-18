import type { VerbData } from '../../types';

export const daily: VerbData[] = [
  // Basic Needs
  { verb: "sova", group: 2, present: "sover", past: "sov", supine: "sovit", translation: "sleep", category: "daily", difficulty: "beginner" },
  { verb: "vila", group: 1, present: "vilar", past: "vilade", supine: "vilat", translation: "rest", category: "daily", difficulty: "beginner" },
  { verb: "bada", group: 1, present: "badar", past: "badade", supine: "badat", translation: "bathe", category: "daily", difficulty: "beginner" },
  { verb: "duscha", group: 1, present: "duschar", past: "duschade", supine: "duschat", translation: "shower", category: "daily", difficulty: "beginner" },
  { verb: "borsta", group: 1, present: "borstar", past: "borstade", supine: "borstat", translation: "brush", category: "daily", difficulty: "beginner" },

  // Group 3 Daily Activities
  { verb: "stå", group: 3, present: "står", past: "stod", supine: "stått", translation: "stand", category: "daily", difficulty: "beginner" },
  { verb: "sitta", group: 2, present: "sitter", past: "satt", supine: "suttit", translation: "sit", category: "daily", difficulty: "beginner" },
  { verb: "ligga", group: 4, present: "ligger", past: "låg", supine: "legat", translation: "lie down", category: "daily", difficulty: "beginner" },
  { verb: "klä", group: 3, present: "klär", past: "klädde", supine: "klätt", translation: "dress", category: "daily", difficulty: "intermediate" },
  { verb: "bo", group: 3, present: "bor", past: "bodde", supine: "bott", translation: "live", category: "daily", difficulty: "beginner" },

  // Routines
  { verb: "vakna", group: 1, present: "vaknar", past: "vaknade", supine: "vaknat", translation: "wake up", category: "daily", difficulty: "beginner" },
  { verb: "kliva", group: 2, present: "kliver", past: "klev", supine: "klivit", translation: "step", category: "daily", difficulty: "intermediate" },
  { verb: "raka", group: 1, present: "rakar", past: "rakade", supine: "rakat", translation: "shave", category: "daily", difficulty: "intermediate" },
  { verb: "kamma", group: 1, present: "kammar", past: "kammade", supine: "kammat", translation: "comb", category: "daily", difficulty: "beginner" },
  { verb: "sminka", group: 1, present: "sminkar", past: "sminkade", supine: "sminkat", translation: "put on makeup", category: "daily", difficulty: "intermediate" }
]; 