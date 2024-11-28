import type { VerbData } from '../../types/verbs';

export const creation: VerbData[] = [
  // Making and Building
  { verb: "skapa", group: 1, present: "skapar", past: "skapade", supine: "skapat", translation: "create", category: "creation", difficulty: "beginner" },
  { verb: "bygga", group: 2, present: "bygger", past: "byggde", supine: "byggt", translation: "build", category: "creation", difficulty: "intermediate" },
  { verb: "tillverka", group: 1, present: "tillverkar", past: "tillverkade", supine: "tillverkat", translation: "manufacture", category: "creation", difficulty: "intermediate" },
  { verb: "konstruera", group: 1, present: "konstruerar", past: "konstruerade", supine: "konstruerat", translation: "construct", category: "creation", difficulty: "advanced" },
  { verb: "forma", group: 1, present: "formar", past: "formade", supine: "format", translation: "shape", category: "creation", difficulty: "intermediate" },
  { verb: "producera", group: 1, present: "producerar", past: "producerade", supine: "producerat", translation: "produce", category: "creation", difficulty: "intermediate" },
  { verb: "fabricera", group: 1, present: "fabricerar", past: "fabricerade", supine: "fabricerat", translation: "fabricate", category: "creation", difficulty: "advanced" },
  { verb: "montera", group: 1, present: "monterar", past: "monterade", supine: "monterat", translation: "assemble", category: "creation", difficulty: "intermediate" },

  // Artistic Creation
  { verb: "måla", group: 1, present: "målar", past: "målade", supine: "målat", translation: "paint", category: "creation", difficulty: "beginner" },
  { verb: "teckna", group: 1, present: "tecknar", past: "tecknade", supine: "tecknat", translation: "draw", category: "creation", difficulty: "beginner" },
  { verb: "skulptera", group: 1, present: "skulpterar", past: "skulpterade", supine: "skulpterat", translation: "sculpt", category: "creation", difficulty: "advanced" },
  { verb: "komponera", group: 1, present: "komponerar", past: "komponerade", supine: "komponerat", translation: "compose", category: "creation", difficulty: "advanced" },

  // Digital Creation
  { verb: "animera", group: 1, present: "animerar", past: "animerade", supine: "animerat", translation: "animate", category: "creation", difficulty: "advanced" },
  { verb: "designa", group: 1, present: "designar", past: "designade", supine: "designat", translation: "design", category: "creation", difficulty: "intermediate" },
  { verb: "redigera", group: 1, present: "redigerar", past: "redigerade", supine: "redigerat", translation: "edit", category: "creation", difficulty: "intermediate" },
  { verb: "formatera", group: 1, present: "formaterar", past: "formaterade", supine: "formaterat", translation: "format", category: "creation", difficulty: "intermediate" },
  { verb: "rendera", group: 1, present: "renderar", past: "renderade", supine: "renderat", translation: "render", category: "creation", difficulty: "advanced" },
  { verb: "modellera", group: 1, present: "modellerar", past: "modellerade", supine: "modellerat", translation: "model (3D)", category: "creation", difficulty: "advanced" },
  
  // Writing and Composition
  { verb: "författa", group: 1, present: "författar", past: "författade", supine: "författat", translation: "author/write", category: "creation", difficulty: "advanced" },
  { verb: "dikta", group: 1, present: "diktar", past: "diktade", supine: "diktat", translation: "compose poetry", category: "creation", difficulty: "advanced" },
  { verb: "texta", group: 1, present: "textar", past: "textade", supine: "textat", translation: "write text", category: "creation", difficulty: "beginner" },
  { verb: "formulera", group: 1, present: "formulerar", past: "formulerade", supine: "formulerat", translation: "formulate", category: "creation", difficulty: "intermediate" },
  
  // Crafting and Handiwork
  { verb: "snickra", group: 1, present: "snickrar", past: "snickrade", supine: "snickrat", translation: "do carpentry", category: "creation", difficulty: "advanced" },
  { verb: "sy", group: 3, present: "syr", past: "sydde", supine: "sytt", translation: "sew", category: "creation", difficulty: "intermediate" },
  { verb: "sticka", group: 1, present: "stickar", past: "stickade", supine: "stickat", translation: "knit", category: "creation", difficulty: "intermediate" },
  { verb: "virka", group: 1, present: "virkar", past: "virkade", supine: "virkat", translation: "crochet", category: "creation", difficulty: "intermediate" },
  { verb: "smida", group: 2, present: "smider", past: "smidde", supine: "smitt", translation: "forge", category: "creation", difficulty: "advanced" },
  { verb: "så", group: 3, present: "sår", past: "sådde", supine: "sått", translation: "sow", category: "creation", difficulty: "intermediate" },
  { verb: "slå", group: 3, present: "slår", past: "slog", supine: "slagit", translation: "hit/strike", category: "creation", difficulty: "intermediate" },

  // Construction
  { verb: "bygga", group: 2, present: "bygger", past: "byggde", supine: "byggt", translation: "build", category: "creation", difficulty: "intermediate" },
  { verb: "svetsa", group: 1, present: "svetsar", past: "svetsade", supine: "svetsat", translation: "weld", category: "creation", difficulty: "advanced" },
  { verb: "smida", group: 2, present: "smider", past: "smidde", supine: "smitt", translation: "forge", category: "creation", difficulty: "advanced" },
  { verb: "sticka", group: 1, present: "stickar", past: "stickade", supine: "stickat", translation: "knit", category: "creation", difficulty: "intermediate" },

  // Food Creation
  { verb: "baka", group: 1, present: "bakar", past: "bakade", supine: "bakat", translation: "bake", category: "creation", difficulty: "beginner" },
  { verb: "brygga", group: 2, present: "brygger", past: "bryggde", supine: "bryggt", translation: "brew", category: "creation", difficulty: "intermediate" },
  { verb: "fermentera", group: 1, present: "fermenterar", past: "fermenterade", supine: "fermenterat", translation: "ferment", category: "creation", difficulty: "advanced" },

  // Digital Design
  { verb: "vektorisera", group: 1, present: "vektoriserar", past: "vektoriserade", supine: "vektoriserat", translation: "vectorize", category: "creation", difficulty: "advanced" },
  { verb: "pixelera", group: 1, present: "pixelerar", past: "pixelerade", supine: "pixelerat", translation: "pixelate", category: "creation", difficulty: "advanced" },

  // Crafting
  { verb: "väva", group: 2, present: "väver", past: "vävde", supine: "vävt", translation: "weave", category: "creation", difficulty: "advanced" },
  { verb: "svarva", group: 1, present: "svarvar", past: "svarvade", supine: "svarvat", translation: "turn/lathe", category: "creation", difficulty: "advanced" },
  { verb: "gjuta", group: 2, present: "gjuter", past: "göt", supine: "gjutit", translation: "cast/mold", category: "creation", difficulty: "advanced" }
];