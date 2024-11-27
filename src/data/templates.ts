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
    canBeLiked?: boolean;
    natural?: boolean;
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
        canBeSeen: true
      }
    },
    {
      template: "Jag har ___ NOUN",
      translation: "I have a {noun}",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all']
    },
    {
      template: "Kan jag låna ___ NOUN?",
      translation: "Can I borrow a {noun}?",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        canBeBorrowed: true
      }
    },
    {
      template: "Jag vill köpa ___ NOUN",
      translation: "I want to buy a {noun}",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        canBeBought: true
      }
    },
    {
      template: "Det finns ___ NOUN här",
      translation: "There is a {noun} here",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        canBeFound: true
      }
    },
    {
      template: "Min vän har ___ NOUN",
      translation: "My friend has a {noun}",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all']
    },
    {
      template: "Vi behöver ___ NOUN till festen",
      translation: "We need a {noun} for the party",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        canBeBought: true
      }
    },
    {
      template: "Det växer ___ NOUN i trädgården",
      translation: "A {noun} is growing in the garden",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['nature', 'food'],
      semanticGroups: {
        canGrow: true
      }
    },
    {
      template: "Hon använder ___ NOUN på jobbet",
      translation: "She uses a {noun} at work",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['all'],
      semanticGroups: {
        canBeUsedAtWork: true
      }
    },
    {
      template: "Jag lagar ___ NOUN till middag",
      translation: "I'm cooking a {noun} for dinner",
      requiresCountable: true,
      type: 'indefinite',
      categories: ['food'],
      semanticGroups: {
        canBeConsumed: true
      }
    }
  ],
  definite: [
    {
      template: "Jag ser NOUN___",
      translation: "I see the {noun}",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        canBeSeen: true
      }
    },
    {
      template: "NOUN___ är här",
      translation: "The {noun} is here",
      requiresCountable: false,
      type: 'definite',
      categories: ['all']
    },
    {
      template: "NOUN___ är stor",
      translation: "The {noun} is big",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        canBeSeen: true
      }
    },
    {
      template: "Var är NOUN___?",
      translation: "Where is the {noun}?",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        canBeFound: true
      }
    },
    {
      template: "NOUN___ är sönder",
      translation: "The {noun} is broken",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        canBeBought: true
      }
    },
    {
      template: "NOUN___ tillhör mig",
      translation: "The {noun} belongs to me",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        canBeBought: true
      }
    },
    {
      template: "Jag gillar NOUN___",
      translation: "I like the {noun}",
      requiresCountable: false,
      type: 'definite',
      categories: ['all'],
      semanticGroups: {
        canBeLiked: true
      }
    },
    {
      template: "NOUN___ passar perfekt här",
      translation: "The {noun} fits perfectly here",
      requiresCountable: false,
      type: 'definite',
      categories: ['all']
    }
  ],
  indefinitePlural: [
    {
      template: "Jag ser många NOUN",
      translation: "I see many {noun}s",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeSeen: true
      }
    },
    {
      template: "Det finns flera NOUN här",
      translation: "There are several {noun}s here",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeFound: true
      }
    },
    {
      template: "Vi behöver fler NOUN",
      translation: "We need more {noun}s",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all']
    },
    {
      template: "De köper NOUN till huset",
      translation: "They are buying {noun}s for the house",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeBought: true
      }
    },
    {
      template: "Det finns inga NOUN kvar",
      translation: "There are no {noun}s left",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all']
    },
    {
      template: "Hon älskar NOUN",
      translation: "She loves {noun}s",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all']
    },
    {
      template: "Vi har många NOUN i Sverige",
      translation: "We have many {noun}s in Sweden",
      requiresCountable: true,
      type: 'indefinitePlural',
      categories: ['all']
    }
  ],
  definitePlural: [
    {
      template: "NOUN___ är här",
      translation: "The {noun}s are here",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all']
    },
    {
      template: "Jag ser NOUN___",
      translation: "I see the {noun}s",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeSeen: true
      }
    },
    {
      template: "Var är NOUN___?",
      translation: "Where are the {noun}s?",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeFound: true
      }
    },
    {
      template: "NOUN___ är dyra",
      translation: "The {noun}s are expensive",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all'],
      semanticGroups: {
        canBeBought: true
      }
    },
    {
      template: "Jag tycker om NOUN___",
      translation: "I like the {noun}s",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all']
    },
    {
      template: "NOUN___ kommer från Sverige",
      translation: "The {noun}s come from Sweden",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all']
    },
    {
      template: "Vi måste rengöra NOUN___",
      translation: "We must clean the {noun}s",
      requiresCountable: true,
      type: 'definitePlural',
      categories: ['all']
    }
  ]
};
