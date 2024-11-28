export type ExerciseType = 
  | 'landing' 
  | 'articles' 
  | 'nouns' 
  | 'verbGroups' 
  | 'adjectives' 
  | 'adverbs' 
  | 'quiz' 
  | 'stories' 
  | 'grammar-visualizer' 
  | 'grammar-animation' 
  | 'grammar-practice';

export interface Exercise {
  id: number;
  type: 'indefinite' | 'definite' | 'indefinitePlural' | 'definitePlural';
  baseForm: string;
  definiteForm: string;
  indefinitePluralForm: string;
  definitePluralForm: string;
  sentence: string;
  correctArticle: string;
  correctSentence: string;
  noun: string;
  translation: string;
}

export interface ExerciseProgress {
  correct: number;
  wrong: number;
  total: number;
  answeredQuestions: Set<number>;
}

export interface ExerciseSummaryItem {
  exercise: Exercise;
  userAnswer: string;
  isCorrect: boolean;
}
