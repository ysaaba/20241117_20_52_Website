export interface Question {
  id: number;
  difficulty: 'easy' | 'medium' | 'advanced';
  swedish: string;
  english: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  hint?: string;
  pronunciation?: {
    ipa: string;
    notes?: string;
  };
}

export interface ExerciseProgress {
  completed: number;
  total: number;
  correct: number;
}
