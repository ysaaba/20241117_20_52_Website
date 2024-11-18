import type { VerbData, AdjectiveData, NounData } from '../../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateNoun(noun: Partial<NounData>): ValidationResult {
  const errors: string[] = [];

  if (!noun.noun) errors.push('Noun is required');
  if (!noun.indefiniteArticle) errors.push('Indefinite article is required');
  if (!noun.definiteArticle) errors.push('Definite article is required');
  if (!noun.translation) errors.push('Translation is required');
  if (!noun.category) errors.push('Category is required');
  if (!noun.difficulty) errors.push('Difficulty is required');

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateVerb(verb: Partial<VerbData>): ValidationResult {
  const errors: string[] = [];

  if (!verb.verb) errors.push('Verb is required');
  if (!verb.group) errors.push('Verb group is required');
  if (!verb.present) errors.push('Present tense is required');
  if (!verb.past) errors.push('Past tense is required');
  if (!verb.supine) errors.push('Supine form is required');
  if (!verb.translation) errors.push('Translation is required');
  if (!verb.category) errors.push('Category is required');
  if (!verb.difficulty) errors.push('Difficulty is required');

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateAdjective(adjective: Partial<AdjectiveData>): ValidationResult {
  const errors: string[] = [];

  if (!adjective.adjective) errors.push('Adjective is required');
  if (!adjective.translation) errors.push('Translation is required');
  if (!adjective.category) errors.push('Category is required');
  if (!adjective.difficulty) errors.push('Difficulty is required');
  if (!adjective.forms) errors.push('Forms are required');
  if (!adjective.example) errors.push('Example is required');

  return {
    isValid: errors.length === 0,
    errors
  };
}