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
  content: Word[];
  audioUrl: string;
  exercises: Exercise[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'everyday' | 'culture' | 'nature' | 'travel' | 'food';
  description: string;
}
