export type NounCategory =
  | 'people'
  | 'family'
  | 'professions'
  | 'animals'
  | 'food'
  | 'drinks'
  | 'clothing'
  | 'furniture'
  | 'technology'
  | 'bodyParts'
  | 'nature'
  | 'weather'
  | 'buildings'
  | 'transportation'
  | 'education'
  | 'emotions'
  | 'time'
  | 'colors'
  | 'sports'
  | 'music'
  | 'art'
  | 'science'
  | 'medicine'
  | 'business'
  | 'travel';

export type VerbCategory =
  | 'movement'
  | 'communication'
  | 'cognition'
  | 'perception'
  | 'consumption'
  | 'creation'
  | 'emotion'
  | 'possession'
  | 'social'
  | 'care'
  | 'work'
  | 'leisure'
  | 'daily'
  | 'change'
  | 'weather'
  | 'hobbies'
  | 'crafts'
  | 'arts'
  | 'household';

export interface CategoryMetadata {
  id: string;
  name: string;
  description: string;
  icon?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}