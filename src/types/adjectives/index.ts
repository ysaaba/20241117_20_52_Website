export type AdjectiveCategory = 
  | 'appearance'
  | 'size'
  | 'color'
  | 'shape'
  | 'personality'
  | 'emotions'
  | 'temperature'
  | 'texture'
  | 'taste'
  | 'difficulty'
  | 'quality'
  | 'quantity'
  | 'time'
  | 'space'
  | 'weather'
  | 'other';

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
