import type { VerbData, AdjectiveData, NounData } from '../types';

export interface DataSchema {
  version: string;
  lastUpdated: string;
  categories: {
    nouns: CategoryDefinition[];
    verbs: CategoryDefinition[];
    adjectives: CategoryDefinition[];
  };
  data: {
    nouns: NounData[];
    verbs: VerbData[];
    adjectives: AdjectiveData[];
  };
}

export interface CategoryDefinition {
  id: string;
  name: string;
  description: string;
  icon?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  subcategories?: CategoryDefinition[];
}