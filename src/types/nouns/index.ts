export type NounCategory = 
  // People and Professions
  | 'people'
  | 'family'
  | 'professions'
  | 'animals'
  | 'buildings'
  | 'transportation'
  | 'garden'
  | 'furniture'
  | 'clothing'
  | 'kitchen'
  | 'bathroom'
  | 'hygiene'
  | 'food'
  | 'drinks'
  | 'technology'
  | 'electronics'
  | 'office'
  | 'business'
  | 'education'
  | 'sports'
  | 'music'
  | 'nature'
  | 'weather'
  | 'seasons'
  | 'bodyParts'
  | 'emotions'
  | 'time'
  | 'colors'
  | 'abstract';

export interface Noun {
  noun: string;
  translation: string;
  category: NounCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  gender: 'en' | 'ett';
  countable: boolean;
  forms: {
    indefinite: string;
    definite: string;
    indefinitePlural: string;
    definitePlural: string;
  };
  examples: {
    indefinite: { swedish: string; english: string };
    definite: { swedish: string; english: string };
    indefinitePlural: { swedish: string; english: string };
    definitePlural: { swedish: string; english: string };
  };
  semantics?: {
    canBeSeen?: boolean;
    canBeWorn?: boolean;
    canBeConsumed?: boolean;
    canBeUsedAtWork?: boolean;
    canBeBorrowed?: boolean;
    canBeBought?: boolean;
    canBeFound?: boolean;
    canGrow?: boolean;
    natural?: boolean;
    isWeather?: boolean;
    animate?: boolean;
    bodyPart?: boolean;
    abstract?: boolean;
    profession?: boolean;
  };
}
