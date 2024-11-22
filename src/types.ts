export type ExerciseType = 'landing' | 'articles' | 'nouns' | 'verbGroups' | 'adjectives' | 'quiz';
export type NounCategory = 
  // People and Professions
  | 'people'
  | 'family'
  | 'professions'
  
  // Living Things
  | 'animals'
  
  // Places and Structures
  | 'buildings'
  | 'transportation'
  | 'garden'
  
  // Home and Living
  | 'furniture'
  | 'clothing'
  | 'kitchen'
  | 'bathroom'
  | 'hygiene'
  
  // Food and Drink
  | 'food'
  | 'drinks'
  
  // Technology and Work
  | 'technology'
  | 'electronics'
  | 'office'
  | 'business'
  
  // Education and Activities
  | 'education'
  | 'sports'
  | 'music'
  
  // Nature and Environment
  | 'nature'
  | 'weather'
  | 'seasons'
  
  // Body and Health
  | 'bodyParts'
  
  // Abstract Concepts
  | 'emotions'
  | 'time'
  | 'colors'
  | 'abstract'
  
  // Special Categories
  | 'all'
  | 'objects'
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
  | 'time'
  | 'professional'
  | 'technology'
  | 'environmental'
  | 'modern_life';

export type ExerciseProgress = {
  correct: number;
  wrong: number;
  total: number;
  answeredQuestions: Set<number>;
};

export interface QuizQuestion {
  id: number;
  type: 'form' | 'comparative' | 'superlative' | 'translation';
  question: string;
  options: string[];
  correctAnswer: string;
  translation?: string;
  audioText?: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  context?: string;  // Added for adjective form questions
}

export interface QuizStatistics {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  mistakes: QuizMistake[];
  lastAttempt: Date;
}

export interface QuizMistake {
  id: string;
  question: string;
  correctAnswer: string;
  userAnswer: string;
  category: 'nouns' | 'verbs' | 'adjectives';
  type: string;
  translation?: string;
  context?: string;  // Added for adjective form questions
  timestamp: Date;
}

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
  };
}
