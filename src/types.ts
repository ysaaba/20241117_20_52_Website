export type ExerciseType = 'landing' | 'articles' | 'nouns' | 'verbGroups' | 'adjectives';
export type NounCategory = 
  | 'animals'
  | 'objects'
  | 'nature'
  | 'all'
  | 'furniture'
  | 'clothing'
  | 'food'
  | 'drinks'
  | 'body parts'
  | 'technology'
  | 'profession'
  | 'vehicles'
  | 'school'
  | 'colors'
  | 'seasons'
  | 'abstract'
  | 'garden'
  | 'hygiene'
  | 'music'
  | 'sports'
  | 'office'
  | 'electronics'
  | 'business'
  | 'kitchen'
  | 'weather'
  | 'time'
  | 'bathroom'
;

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
}

export type ArticleType = 'indefinite' | 'definite' | 'indefinitePlural' | 'definitePlural';

export interface Exercise {
  id: number;
  sentence: string;
  correctArticle: string;
  correctSentence: string;
  noun: string;
  translation: string;
}

export interface VerbData {
  verb: string;
  group: 1 | 2 | 3 | 4;
  present: string;
  past: string;
  supine: string;
  translation: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  examples?: {
    present?: { swedish: string; english: string };
    past?: { swedish: string; english: string };
    supine?: { swedish: string; english: string };
  };
}

export interface AdjectiveData {
  adjective: string;
  translation: string;
  category: AdjectiveCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  forms: {
    base: string;
    definite: string;
    plural: string;
    comparative: string;
    superlative: string;
  };
  examples: {
    base: { swedish: string; english: string };
    definite: { swedish: string; english: string };
    comparative: { swedish: string; english: string };
    superlative: { swedish: string; english: string };
  };
  antonym?: string;
  synonym?: string[];
}

export type AdjectiveCategory =
  | 'appearance'
  | 'color'
  | 'size'
  | 'personality'
  | 'temperature'
  | 'age'
  | 'emotion'
  | 'quality'
  | 'taste'
  | 'texture'
  | 'intelligence'
  | 'physical'
  | 'weather'
  | 'distance'
  | 'time';

export type ExerciseProgress = {
  correct: number;
  wrong: number;
  total: number;
  answeredQuestions: Set<number>;
};
