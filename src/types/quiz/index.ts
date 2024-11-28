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
  context?: string;
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
  context?: string;
  timestamp: Date;
}
