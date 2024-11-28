export type AdverbCategory = 
  | 'manner'
  | 'time'
  | 'place'
  | 'frequency'
  | 'degree'
  | 'affirmation'
  | 'negation';

export interface AdverbData {
  adverb: string;
  translation: string;
  category: AdverbCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  example: string;
  exampleTranslation: string;
  audioUrl: string;
}
