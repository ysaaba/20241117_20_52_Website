export type ExerciseType = 'articles' | 'nouns' | 'verbGroups' | 'adjectives';

export type NounCategory = 
  | 'animals'
  | 'furniture'
  | 'clothing'
  | 'food'
  | 'body parts'
  | 'technology'
  | 'profession'
  | 'vehicles'
  | 'school'
  | 'nature'
  | 'colors'
  | 'seasons'
  | 'abstract'
  | 'garden'
  | 'hygiene'
  | 'music'
  | 'sports'
  | 'office';

export interface Noun {
  noun: string;
  indefiniteArticle: string;
  definiteArticle: string;
  indefinitePlural: string;
  definitePlural: string;
  translation: string;
  category: NounCategory;
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