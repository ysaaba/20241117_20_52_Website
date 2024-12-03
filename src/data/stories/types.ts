export interface Word {
  text: string;
  translation: string | null;
}

export interface Exercise {
  question: string;
  options: string[];
  correctAnswer: string;
  englishQuestion: string;
}

export interface Story {
  id: string;
  title: string;
  englishTitle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'everyday' | 'culture' | 'nature' | 'travel' | 'food';
  description: string;
  content: Array<{
    text: string;
    translation: string;
  }>;
  audioUrl?: string;
  exercises: Array<{
    question: string;
    englishQuestion: string;
    options: string[];
    correctAnswer: string;
  }>;
}
