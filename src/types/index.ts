export type ArticleType = 'indefinite' | 'definite' | 'indefinitePlural' | 'definitePlural';

export interface Exercise {
  id: number;
  type: ArticleType;
  sentence: string;
  translation: string;
  correctArticle: string;
  correctSentence: string;
  indefiniteForm?: string;
  definiteForm?: string;
  indefinitePluralForm?: string;
  definitePluralForm?: string;
}

export interface ExerciseProgress {
  correct: number;
  wrong: number;
  answeredQuestions: Set<number>;
  total: number;
}

export interface ExerciseSummaryItem {
  exercise: Exercise;
  userAnswer: string;
  isCorrect: boolean;
}

export type QuizCategory = 'Nouns' | 'Verbs' | 'Adjectives';

export interface MistakeData {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  category: QuizCategory;
  type: string;
  translation?: string;
  context?: string;
}
