import { NounCategory } from '../types';

type ArticleType = 'indefinite' | 'definite' | 'indefinitePlural' | 'definitePlural';

export interface Template {
  template: string;
  translation: string;
  requiresCountable: boolean;
  categories: NounCategory[];
}

export const templates: Record<ArticleType, Template[]> = {
  indefinite: [
    // General templates
    {
      template: "Jag ser ___ NOUN",
      translation: "I see a {noun}",
      requiresCountable: true,
      categories: ['all']
    },
    {
      template: "Kan jag låna ___ NOUN?",
      translation: "Can I borrow a {noun}?",
      requiresCountable: true,
      categories: ['all']
    },
    {
      template: "Vi köpte ___ NOUN igår",
      translation: "We bought a {noun} yesterday",
      requiresCountable: true,
      categories: ['all']
    },
    {
      template: "Jag hittade ___ NOUN",
      translation: "I found a {noun}",
      requiresCountable: true,
      categories: ['all']
    },

    // Food & Drinks
    {
      template: "Jag lagar ___ NOUN till middag",
      translation: "I'm cooking a {noun} for dinner",
      requiresCountable: true,
      categories: ['food']
    },
    {
      template: "Han dricker ___ NOUN",
      translation: "He drinks a {noun}",
      requiresCountable: true,
      categories: ['drinks']
    },

    // Furniture & Home
    {
      template: "De har köpt ___ NOUN till vardagsrummet",
      translation: "They bought a {noun} for the living room",
      requiresCountable: true,
      categories: ['furniture']
    },
    {
      template: "Vi behöver ___ NOUN till köket",
      translation: "We need a {noun} for the kitchen",
      requiresCountable: true,
      categories: ['furniture', 'kitchen']
    },

    // Technology
    {
      template: "Hon använder ___ NOUN på jobbet",
      translation: "She uses a {noun} at work",
      requiresCountable: true,
      categories: ['technology']
    },
    {
      template: "Jag vill ha ___ ny NOUN",
      translation: "I want a new {noun}",
      requiresCountable: true,
      categories: ['technology']
    },

    // Clothing (based on lines 220-280)
    {
      template: "Hon har på sig ___ ny NOUN",
      translation: "She is wearing a new {noun}",
      requiresCountable: true,
      categories: ['clothing']
    },
    {
      template: "Jag provade ___ NOUN i affären",
      translation: "I tried on a {noun} in the store",
      requiresCountable: true,
      categories: ['clothing']
    },

    // School & Education (based on lines 282-311)
    {
      template: "Hon använder ___ blå NOUN",
      translation: "She uses a blue {noun}",
      requiresCountable: true,
      categories: ['school']
    },
    {
      template: "Det ligger ___ NOUN på bordet",
      translation: "There is a {noun} on the table",
      requiresCountable: true,
      categories: ['school', 'office']
    },

    // Nature & Weather (based on lines 312-373)
    {
      template: "Det växer ___ stor NOUN i parken",
      translation: "A big {noun} grows in the park",
      requiresCountable: true,
      categories: ['nature']
    },
    {
      template: "Det blir ___ NOUN idag",
      translation: "It will be a {noun} today",
      requiresCountable: true,
      categories: ['weather']
    },
    {
      template: "Det är ___ NOUN ute",
      translation: "It is a {noun} outside",
      requiresCountable: true,
      categories: ['weather']
    },
    {
      template: "Vi får ___ NOUN imorgon",
      translation: "We'll get a {noun} tomorrow",
      requiresCountable: true,
      categories: ['weather']
    }
  ],
  definite: [
    // General templates
    {
      template: "NOUN___ är här",
      translation: "The {noun} is here",
      requiresCountable: true,
      categories: ['all']
    },

    // Colors & Appearance (from färg example)
    {
      template: "NOUN___ är vacker",
      translation: "The {noun} is beautiful",
      requiresCountable: true,
      categories: ['colors']
    },

    // Time & Seasons (from timme, sommar examples)
    {
      template: "NOUN___ går fort",
      translation: "The {noun} goes by quickly",
      requiresCountable: true,
      categories: ['time', 'seasons']
    },

    // Kitchen & Bathroom (from tallrik, tandborste examples)
    {
      template: "NOUN___ är ren",
      translation: "The {noun} is clean",
      requiresCountable: true,
      categories: ['kitchen', 'bathroom']
    },

    // Food & Kitchen
    {
      template: "NOUN___ smakar gott",
      translation: "The {noun} tastes good",
      requiresCountable: true,
      categories: ['food']
    },
    {
      template: "NOUN___ står i kylskåpet",
      translation: "The {noun} is in the refrigerator",
      requiresCountable: true,
      categories: ['food', 'drinks']
    },

    // Technology
    {
      template: "NOUN___ fungerar inte",
      translation: "The {noun} doesn't work",
      requiresCountable: true,
      categories: ['technology']
    },
    {
      template: "NOUN___ är ny",
      translation: "The {noun} is new",
      requiresCountable: true,
      categories: ['technology', 'furniture']
    },

    // Professions (based on lines 437-456)
    {
      template: "NOUN___ undervisar svenska",
      translation: "The {noun} teaches Swedish",
      requiresCountable: true,
      categories: ['profession']
    },
    {
      template: "NOUN___ kommer snart",
      translation: "The {noun} is coming soon",
      requiresCountable: true,
      categories: ['profession']
    },

    // Animals & Nature (based on lines 1026-1086)
    {
      template: "NOUN___ är Sveriges största djur",
      translation: "The {noun} is Sweden's largest animal",
      requiresCountable: true,
      categories: ['animals']
    },
    {
      template: "NOUN___ växer i trädgården",
      translation: "The {noun} grows in the garden",
      requiresCountable: true,
      categories: ['nature']
    }
  ],
  indefinitePlural: [
    // General templates
    {
      template: "Det finns många ___ NOUN",
      translation: "There are many {noun}s",
      requiresCountable: true,
      categories: ['all']
    },

    // Garden & Tools (from spade example)
    {
      template: "Vi behöver fler ___ NOUN",
      translation: "We need more {noun}s",
      requiresCountable: true,
      categories: ['garden']
    },

    // Nature & Animals (from älg, blomma examples)
    {
      template: "Det växer ___ NOUN i trädgården",
      translation: "There are {noun}s growing in the garden",
      requiresCountable: true,
      categories: ['nature']
    },

    // Food & Drinks
    {
      template: "Vi har ___ NOUN i kylen",
      translation: "We have {noun}s in the fridge",
      requiresCountable: true,
      categories: ['food', 'drinks']
    },
    {
      template: "De säljer ___ NOUN här",
      translation: "They sell {noun}s here",
      requiresCountable: true,
      categories: ['food', 'drinks']
    },

    // Furniture
    {
      template: "Det står ___ NOUN i rummet",
      translation: "There are {noun}s in the room",
      requiresCountable: true,
      categories: ['furniture']
    },
    {
      template: "Vi har beställt ___ NOUN",
      translation: "We have ordered {noun}s",
      requiresCountable: true,
      categories: ['furniture', 'technology']
    },

    // Body Parts (based on lines 1119-1148)
    {
      template: "Våra ___ NOUN slår",
      translation: "Our {noun}s beat",
      requiresCountable: true,
      categories: ['body parts']
    },

    // Clothing (based on lines 1150-1179)
    {
      template: "Hon har ___ färgglada NOUN",
      translation: "She has colorful {noun}s",
      requiresCountable: true,
      categories: ['clothing']
    },
    {
      template: "De säljer ___ varma NOUN",
      translation: "They sell warm {noun}s",
      requiresCountable: true,
      categories: ['clothing']
    }
  ],
  definitePlural: [
    // Animals & Nature (from älg example)
    {
      template: "NOUN___ vandrar söderut",
      translation: "The {noun}s migrate south",
      requiresCountable: true,
      categories: ['animals']
    },

    // Time & Weather (from timme, regn examples)
    {
      template: "NOUN___ flyger förbi",
      translation: "The {noun}s fly by",
      requiresCountable: true,
      categories: ['time', 'weather']
    },

    // Professions (from lärare, läkare examples)
    {
      template: "NOUN___ arbetar hårt",
      translation: "The {noun}s work hard",
      requiresCountable: true,
      categories: ['profession']
    },

    // Food & Kitchen
    {
      template: "NOUN___ ligger på bordet",
      translation: "The {noun}s are on the table",
      requiresCountable: true,
      categories: ['food', 'kitchen']
    },
    {
      template: "NOUN___ är färska",
      translation: "The {noun}s are fresh",
      requiresCountable: true,
      categories: ['food']
    },

    // Technology
    {
      template: "NOUN___ måste uppdateras",
      translation: "The {noun}s need to be updated",
      requiresCountable: true,
      categories: ['technology']
    },
    {
      template: "NOUN___ är dyra",
      translation: "The {noun}s are expensive",
      requiresCountable: true,
      categories: ['technology', 'furniture']
    },

    // Weather & Seasons (based on lines 1088-1117)
    {
      template: "NOUN___ är kraftiga i år",
      translation: "The {noun}s are powerful this year",
      requiresCountable: true,
      categories: ['weather']
    },

    // Professions (based on lines 995-1024)
    {
      template: "NOUN___ arbetar på sjukhuset",
      translation: "The {noun}s work at the hospital",
      requiresCountable: true,
      categories: ['profession']
    },
    {
      template: "NOUN___ har ett viktigt möte",
      translation: "The {noun}s have an important meeting",
      requiresCountable: true,
      categories: ['profession']
    }
  ]
};
