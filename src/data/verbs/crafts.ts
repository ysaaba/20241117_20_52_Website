import { Verb } from "../../types/verb";

export const crafts: Verb[] = [
  // Woodworking
  { verb: "tälja", group: 2, present: "täljer", past: "täljde", supine: "täljt", translation: "whittle/carve", category: "crafts", difficulty: "intermediate" },
  { verb: "hyvla", group: 1, present: "hyvlar", past: "hyvlade", supine: "hyvlat", translation: "plane wood", category: "crafts", difficulty: "advanced" },
  { verb: "svarva", group: 1, present: "svarvar", past: "svarvade", supine: "svarvat", translation: "turn wood", category: "crafts", difficulty: "advanced" },
  { verb: "fanera", group: 1, present: "fanerar", past: "fanerade", supine: "fanerat", translation: "veneer", category: "crafts", difficulty: "advanced" },

  // Metalworking
  { verb: "löda", group: 2, present: "löder", past: "lödde", supine: "lött", translation: "solder", category: "crafts", difficulty: "advanced" },
  { verb: "hamra", group: 1, present: "hamrar", past: "hamrade", supine: "hamrat", translation: "hammer", category: "crafts", difficulty: "intermediate" },
  { verb: "fila", group: 1, present: "filar", past: "filade", supine: "filat", translation: "file metal", category: "crafts", difficulty: "intermediate" },

  // Leatherworking
  { verb: "garva", group: 1, present: "garvar", past: "garvade", supine: "garvat", translation: "tan leather", category: "crafts", difficulty: "advanced" },
  { verb: "prägla", group: 1, present: "präglar", past: "präglade", supine: "präglat", translation: "emboss", category: "crafts", difficulty: "advanced" },
  { verb: "sadelmakra", group: 1, present: "sadelmakrar", past: "sadelmakrade", supine: "sadelmakrat", translation: "do saddlery", category: "crafts", difficulty: "advanced" }
]; 