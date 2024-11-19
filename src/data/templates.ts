import { NounCategory } from '../types';

type ArticleType = 'indefinite' | 'definite' | 'indefinitePlural' | 'definitePlural';

export interface Template {
  template: string;
  translation: string;
  requiresCountable: boolean;
  type: ArticleType;
  categories: NounCategory[];
  semanticGroups?: {
    canBeWorn?: boolean;
    canBeConsumed?: boolean;
    canBeUsedAtWork?: boolean;
    canGrow?: boolean;
    isWeather?: boolean;
    canBeBought?: boolean;
    canBeBorrowed?: boolean;
    canBeFound?: boolean;
    canBeSeen?: boolean;
    isBreakable?: boolean;
    isEdible?: boolean;
    isPerson?: boolean;
    isAbstract?: boolean;
    isTangible?: boolean;
    isTimeRelated?: boolean;
    bodyPart?: boolean;
    natural?: boolean;
    canBeStored?: boolean;
    needsElectricity?: boolean;
    canBeWashed?: boolean;
    isSeasonDependent?: boolean;
    isPersonal?: boolean;
  };
}

export const templates: Record<ArticleType, Template[]> = {
  indefinite: [
    {
      template: "Jag ser ___ NOUN",
      translation: "I see a {noun}",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        canBeSeen: true,
        isTangible: true
      }
    },
    {
      template: "Jag har ___ NOUN",
      translation: "I have a {noun}",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        isTangible: true,
        canBeBorrowed: true
      }
    },
    {
      template: "Kan jag låna ___ NOUN?",
      translation: "May I borrow a {noun}?",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['electronics', 'office', 'kitchen'],
      semanticGroups: {
        canBeBorrowed: true,
        isTangible: true,
        canBeWorn: false,
        isPersonal: false
      }
    },
    {
      template: "Jag vill köpa ___ NOUN",
      translation: "I want to buy a {noun}",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        canBeBought: true,
        isTangible: true
      }
    },
    {
      template: "Det finns ___ NOUN här",
      translation: "There is a {noun} here",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        canBeFound: true,
        isTangible: true
      }
    },
    {
      template: "Min vän har ___ NOUN",
      translation: "My friend has a {noun}",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        isTangible: true,
        canBeBorrowed: true
      }
    },
    {
      template: "Vi behöver ___ NOUN till festen",
      translation: "We need a {noun} for the party",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        canBeBought: true,
        isTangible: true
      }
    },
    {
      template: "Det växer ___ NOUN i trädgården",
      translation: "A {noun} is growing in the garden",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['nature', 'food'],
      semanticGroups: {
        canGrow: true,
        isTangible: true
      }
    },
    {
      template: "Hon använder ___ NOUN på jobbet",
      translation: "She uses a {noun} at work",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['technology', 'office', 'electronics'],
      semanticGroups: {
        canBeUsedAtWork: true,
        isTangible: true,
        bodyPart: false
      }
    },
    {
      template: "Vi använder ___ NOUN på jobbet",
      translation: "We use a {noun} at work",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['technology', 'office', 'electronics'],
      semanticGroups: {
        canBeUsedAtWork: true,
        isTangible: true,
        bodyPart: false
      }
    },
    {
      template: "Jag lagar ___ NOUN till middag",
      translation: "I'm cooking a {noun} for dinner",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['food'],
      semanticGroups: {
        isEdible: true,
        canBeConsumed: true
      }
    },
    {
      template: "___ NOUN är trasig",
      translation: "The {noun} is broken",
      requiresCountable: true,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        isBreakable: true,
        isTangible: true
      }
    },
    {
      template: "___ NOUN arbetar här",
      translation: "The {noun} works here",
      requiresCountable: true,
      type: 'definite',
      categories: ['people'],
      semanticGroups: {
        isPerson: true
      }
    },
    {
      template: "Vi behöver mer ___ NOUN",
      translation: "We need more {noun}",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['food', 'drinks'],
      semanticGroups: {
        canBeConsumed: true
      }
    },
    {
      template: "Min granne har ___ NOUN i trädgården",
      translation: "My neighbor has a {noun} in the garden",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['garden', 'nature', 'animals'],
      semanticGroups: {
        canBeSeen: true,
        isTangible: true,
        canBeFound: true
      }
    },
    {
      template: "Det står ___ NOUN i köket",
      translation: "There is a {noun} in the kitchen",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['kitchen', 'furniture', 'electronics'],
      semanticGroups: {
        canBeSeen: true,
        isTangible: true
      }
    },
    {
      template: "Min syster önskar sig ___ NOUN till jul",
      translation: "My sister wants a {noun} for Christmas",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['electronics', 'clothing', 'music', 'sports'],
      semanticGroups: {
        canBeBought: true,
        isTangible: true
      }
    },
    {
      template: "Det finns ___ NOUN i kylskåpet",
      translation: "There is a {noun} in the refrigerator",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['food', 'drinks'],
      semanticGroups: {
        canBeConsumed: true,
        isTangible: true
      }
    },
    {
      template: "Jag behöver ___ NOUN till middagen",
      translation: "I need a {noun} for dinner",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['kitchen', 'food'],
      semanticGroups: {
        canBeConsumed: true,
        isTangible: true
      }
    },
    {
      template: "Min bror spelar ___ NOUN",
      translation: "My brother plays a {noun}",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['music', 'sports'],
      semanticGroups: {
        isTangible: true,
        canBeUsedAtWork: true
      }
    },
    {
      template: "Det blåser från ___ NOUN",
      translation: "It's blowing from a {noun}",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['nature'],
      semanticGroups: {
        canBeSeen: true,
        natural: true
      }
    },
    {
      template: "Det ligger ___ NOUN på bordet",
      translation: "There is a {noun} on the table",
      requiresCountable: true,
      categories: ['all'],
      semanticGroups: {
        isTangible: true,
        canBeStored: true
      }
    },
    {
      template: "Min granne har ___ NOUN",
      translation: "My neighbor has a {noun}",
      requiresCountable: true,
      categories: ['all'],
      semanticGroups: {
        isTangible: true,
        canBeBought: true
      }
    },
    {
      template: "Jag hittade ___ NOUN i parken",
      translation: "I found a {noun} in the park",
      requiresCountable: true,
      categories: ['all'],
      semanticGroups: {
        isTangible: true,
        canBeFound: true
      }
    },
    {
      template: "Det står ___ NOUN i hörnet",
      translation: "There is a {noun} in the corner",
      requiresCountable: true,
      categories: ['furniture', 'electronics', 'decoration'],
      semanticGroups: {
        isTangible: true,
        canBeStored: true
      }
    },
  ],
  definite: [
    {
      template: "Jag ser NOUN___",
      translation: "I see the {noun}",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        canBeSeen: true,
        isTangible: true
      }
    },
    {
      template: "NOUN___ är här",
      translation: "The {noun} is here",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "NOUN___ är stor",
      translation: "The {noun} is big",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        canBeSeen: true,
        isTangible: true
      }
    },
    {
      template: "Var är NOUN___?",
      translation: "Where is the {noun}?",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        canBeFound: true,
        isTangible: true
      }
    },
    {
      template: "NOUN___ är sönder",
      translation: "The {noun} is broken",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        isBreakable: true,
        isTangible: true
      }
    },
    {
      template: "NOUN___ tillhör mig",
      translation: "The {noun} belongs to me",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        canBeBought: true,
        isTangible: true
      }
    },
    {
      template: "Jag gillar NOUN___",
      translation: "I like the {noun}",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "NOUN___ passar perfekt här",
      translation: "The {noun} fits perfectly here",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "NOUN___ är trasig",
      translation: "The {noun} is broken",
      requiresCountable: true,
      type: 'definite',
      categories: ['electronics', 'furniture', 'kitchen'],
      semanticGroups: {
        isTangible: true,
        isBreakable: true
      }
    },
    {
      template: "NOUN___ ligger på bordet",
      translation: "The {noun} is on the table",
      requiresCountable: true,
      type: 'definite',
      categories: ['electronics', 'kitchen', 'office'],
      semanticGroups: {
        isTangible: true,
        canBeSeen: true
      }
    },
    {
      template: "NOUN___ är stängd idag",
      translation: "The {noun} is closed today",
      requiresCountable: true,
      type: 'definite',
      categories: ['buildings'],
      semanticGroups: {
        isTangible: true,
        canBeSeen: true
      }
    },
    {
      template: "NOUN___ är varm",
      translation: "The {noun} is warm",
      requiresCountable: true,
      type: 'definite',
      categories: ['food', 'drinks', 'electronics'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "NOUN___ passar perfekt",
      translation: "The {noun} fits perfectly",
      requiresCountable: true,
      type: 'definite',
      categories: ['clothing', 'furniture'],
      semanticGroups: {
        isTangible: true,
        canBeWorn: true
      }
    },
    {
      template: "NOUN___ behöver vatten",
      translation: "The {noun} needs water",
      requiresCountable: true,
      type: 'definite',
      categories: ['nature', 'garden'],
      semanticGroups: {
        canGrow: true,
        natural: true
      }
    },
    {
      template: "NOUN___ är på övervåningen",
      translation: "The {noun} is upstairs",
      requiresCountable: true,
      type: 'definite',
      categories: ['furniture', 'rooms'],
      semanticGroups: {
        isTangible: true,
        canBeSeen: true
      }
    },
    {
      template: "NOUN passar perfekt här",
      translation: "The {noun} fits perfectly here",
      requiresCountable: true,
      categories: ['furniture', 'decoration', 'electronics'],
      semanticGroups: {
        isTangible: true,
        canBeStored: true
      }
    },
    {
      template: "Jag glömde NOUN hemma",
      translation: "I forgot the {noun} at home",
      requiresCountable: true,
      categories: ['electronics', 'personal', 'office'],
      semanticGroups: {
        isTangible: true,
        canBeFound: true,
        isPersonal: true
      }
    },
    {
      template: "NOUN fungerar inte längre",
      translation: "The {noun} doesn't work anymore",
      requiresCountable: true,
      categories: ['electronics'],
      semanticGroups: {
        isTangible: true,
        needsElectricity: true
      }
    },
    {
      template: "Var köpte du NOUN?",
      translation: "Where did you buy the {noun}?",
      requiresCountable: true,
      categories: ['all'],
      semanticGroups: {
        isTangible: true,
        canBeBought: true
      }
    },
  ],
  indefinitePlural: [
    {
      template: "Jag ser många NOUN",
      translation: "I see many {noun}s",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeSeen: true,
        isTangible: true
      }
    },
    {
      template: "Det finns flera NOUN här",
      translation: "There are several {noun}s here",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeFound: true,
        isTangible: true
      }
    },
    {
      template: "Vi behöver fler NOUN",
      translation: "We need more {noun}s",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "De köper NOUN till huset",
      translation: "They are buying {noun} for the house",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['furniture', 'kitchen', 'electronics', 'bathroom'],
      semanticGroups: {
        canBeBought: true,
        isTangible: true
      }
    },
    {
      template: "Det finns inga NOUN kvar",
      translation: "There are no {noun}s left",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "Hon älskar NOUN",
      translation: "She loves {noun}s",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "Vi har många NOUN i Sverige",
      translation: "We have many {noun} in Sweden",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['animals', 'nature', 'buildings'],
      semanticGroups: {
        isTangible: true,
        canBeFound: true
      }
    },
    {
      template: "Det finns NOUN i parken",
      translation: "There are {noun} in the park",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['animals', 'nature'],
      semanticGroups: {
        canBeSeen: true,
        canBeFound: true,
        isTangible: true
      }
    },
    {
      template: "Vi säljer NOUN i affären",
      translation: "We sell {noun} in the store",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['clothing', 'electronics', 'food', 'drinks'],
      semanticGroups: {
        canBeBought: true,
        isTangible: true
      }
    },
    {
      template: "Jag samlar på NOUN",
      translation: "I collect {noun}",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['music', 'electronics', 'nature'],
      semanticGroups: {
        canBeBought: true,
        isTangible: true,
        canBeFound: true
      }
    },
    {
      template: "Vi odlar NOUN i växthuset",
      translation: "We grow {noun} in the greenhouse",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['food', 'nature'],
      semanticGroups: {
        canGrow: true,
        natural: true
      }
    },
    {
      template: "Det ligger NOUN på stranden",
      translation: "There are {noun} on the beach",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['nature'],
      semanticGroups: {
        canBeFound: true,
        isTangible: true,
        natural: true
      }
    },
    {
      template: "Vi har NOUN i källaren",
      translation: "We have {noun} in the basement",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['furniture', 'electronics', 'kitchen'],
      semanticGroups: {
        isTangible: true,
        canBeStored: true
      }
    },
    {
      template: "Hon reparerar NOUN",
      translation: "She repairs {noun}",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['electronics', 'vehicles'],
      semanticGroups: {
        isBreakable: true,
        isTangible: true
      }
    },
    {
      template: "Det finns många NOUN i trädgården",
      translation: "There are many {noun}s in the garden",
      requiresCountable: true,
      categories: ['nature', 'animals'],
      semanticGroups: {
        isTangible: true,
        canBeFound: true,
        natural: true
      }
    },
    {
      template: "Vi ska köpa nya NOUN idag",
      translation: "We are going to buy new {noun}s today",
      requiresCountable: true,
      categories: ['furniture', 'electronics', 'clothing'],
      semanticGroups: {
        isTangible: true,
        canBeBought: true
      }
    },
    {
      template: "Jag ser några NOUN därborta",
      translation: "I see some {noun}s over there",
      requiresCountable: true,
      categories: ['all'],
      semanticGroups: {
        canBeSeen: true,
        isTangible: true
      }
    },
    {
      template: "De säljer billiga NOUN här",
      translation: "They sell cheap {noun}s here",
      requiresCountable: true,
      categories: ['all'],
      semanticGroups: {
        isTangible: true,
        canBeBought: true
      }
    },
  ],
  definitePlural: [
    {
      template: "NOUN___ är här",
      translation: "The {noun}s are here",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "Jag ser NOUN___",
      translation: "I see the {noun}s",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeSeen: true,
        isTangible: true
      }
    },
    {
      template: "Var är NOUN___?",
      translation: "Where are the {noun}s?",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeFound: true,
        isTangible: true
      }
    },
    {
      template: "NOUN___ är dyra",
      translation: "The {noun}s are expensive",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeBought: true,
        isTangible: true
      }
    },
    {
      template: "Jag tycker om NOUN___",
      translation: "I like the {noun}s",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "NOUN___ kommer från Sverige",
      translation: "The {noun}s come from Sweden",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "Vi måste rengöra NOUN___",
      translation: "We must clean the {noun}s",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all'],
      semanticGroups: {
        isTangible: true
      }
    },
    {
      template: "NOUN___ är på reparation",
      translation: "The {noun} are being repaired",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['electronics', 'vehicles', 'furniture'],
      semanticGroups: {
        isBreakable: true,
        isTangible: true
      }
    },
    {
      template: "NOUN___ är på rea denna vecka",
      translation: "The {noun} are on sale this week",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['clothing', 'electronics', 'furniture'],
      semanticGroups: {
        canBeBought: true,
        isTangible: true
      }
    },
    {
      template: "NOUN___ växer i trädgården",
      translation: "The {noun} grow in the garden",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['nature'],
      semanticGroups: {
        canGrow: true,
        isTangible: true,
        natural: true
      }
    },
    {
      template: "NOUN___ är i diskmaskinen",
      translation: "The {noun} are in the dishwasher",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['kitchen'],
      semanticGroups: {
        isTangible: true,
        canBeWashed: true
      }
    },
    {
      template: "NOUN___ är på laddning",
      translation: "The {noun} are charging",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['electronics', 'technology'],
      semanticGroups: {
        isTangible: true,
        needsElectricity: true
      }
    },
    {
      template: "NOUN___ är i garderoben",
      translation: "The {noun} are in the closet",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['clothing'],
      semanticGroups: {
        canBeWorn: true,
        isTangible: true,
        canBeStored: true
      }
    },
    {
      template: "NOUN___ är stängda på vintern",
      translation: "The {noun} are closed in winter",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['buildings', 'garden'],
      semanticGroups: {
        isTangible: true,
        isSeasonDependent: true
      }
    },
    {
      template: "NOUN ligger i lådan",
      translation: "The {noun}s are in the drawer",
      requiresCountable: true,
      categories: ['all'],
      semanticGroups: {
        isTangible: true,
        canBeStored: true
      }
    },
    {
      template: "Jag måste tvätta NOUN",
      translation: "I need to wash the {noun}s",
      requiresCountable: true,
      categories: ['clothing', 'kitchen'],
      semanticGroups: {
        isTangible: true,
        canBeWashed: true
      }
    },
    {
      template: "NOUN är på rea den här veckan",
      translation: "The {noun}s are on sale this week",
      requiresCountable: true,
      categories: ['all'],
      semanticGroups: {
        isTangible: true,
        canBeBought: true
      }
    },
    {
      template: "Var ska vi ställa NOUN?",
      translation: "Where should we put the {noun}s?",
      requiresCountable: true,
      categories: ['furniture', 'decoration', 'kitchen'],
      semanticGroups: {
        isTangible: true,
        canBeStored: true
      }
    },
  ]
};
