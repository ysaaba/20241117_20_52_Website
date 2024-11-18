import { NounCategory } from '../types';

interface TemplatesByCategory {
  [key: string]: {
    indefinite: Array<{ sv: string; en: string }>;
    definite: Array<{ sv: string; en: string }>;
    indefinitePlural: Array<{ sv: string; en: string }>;
    definitePlural: Array<{ sv: string; en: string }>;
  };
}

export const templates: TemplatesByCategory = {
  animals: {
    indefinite: [
      { sv: "Jag ser ___ {noun} i parken", en: "I see a {noun} in the park" },
      { sv: "Vi har ___ {noun} hemma", en: "We have a {noun} at home" },
      { sv: "Min granne har ___ {noun}", en: "My neighbor has a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ springer snabbt", en: "The {noun} runs fast" },
      { sv: "{noun}___ äter mat", en: "The {noun} is eating food" },
      { sv: "{noun}___ sover i sin bädd", en: "The {noun} is sleeping in its bed" }
    ],
    indefinitePlural: [
      { sv: "Det finns många {noun} här", en: "There are many {noun} here" },
      { sv: "Vi ser några {noun} i skogen", en: "We see some {noun} in the forest" }
    ],
    definitePlural: [
      { sv: "{noun}___ är vackra", en: "The {noun} are beautiful" },
      { sv: "{noun}___ lever i naturen", en: "The {noun} live in nature" }
    ]
  },
  furniture: {
    indefinite: [
      { sv: "Vi har köpt ___ {noun}", en: "We have bought a {noun}" },
      { sv: "Det står ___ {noun} i rummet", en: "There is a {noun} in the room" },
      { sv: "Jag behöver ___ {noun} till mitt rum", en: "I need a {noun} for my room" }
    ],
    definite: [
      { sv: "{noun}___ är ny", en: "The {noun} is new" },
      { sv: "{noun}___ passar perfekt här", en: "The {noun} fits perfectly here" },
      { sv: "{noun}___ är gjord av trä", en: "The {noun} is made of wood" }
    ],
    indefinitePlural: [
      { sv: "Vi har flera {noun}", en: "We have several {noun}" },
      { sv: "De säljer fina {noun}", en: "They sell nice {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ är moderna", en: "The {noun} are modern" },
      { sv: "{noun}___ kommer från IKEA", en: "The {noun} are from IKEA" }
    ]
  },
  clothing: {
    indefinite: [
      { sv: "Jag har köpt ___ {noun}", en: "I have bought a {noun}" },
      { sv: "Hon behöver ___ {noun}", en: "She needs a {noun}" },
      { sv: "Jag provar ___ {noun}", en: "I'm trying on a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ passar bra", en: "The {noun} fits well" },
      { sv: "{noun}___ är för stor", en: "The {noun} is too big" },
      { sv: "{noun}___ är i tvätten", en: "The {noun} is in the laundry" }
    ],
    indefinitePlural: [
      { sv: "Det finns många {noun} i affären", en: "There are many {noun} in the store" },
      { sv: "Jag behöver nya {noun}", en: "I need new {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ ligger i garderoben", en: "The {noun} are in the closet" },
      { sv: "{noun}___ är på rea", en: "The {noun} are on sale" }
    ]
  }
};
