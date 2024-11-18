import type { Exercise } from '../../types';
import { nouns } from '../collections/nouns';
import {
  indefiniteSentenceTemplates,
  definiteSentenceTemplates,
  indefinitePluralTemplates,
  definitePluralTemplates
} from '../templates';

export interface GeneratorOptions {
  count: number;
  startId?: number;
  type: 'indefinite' | 'definite' | 'indefinitePlural' | 'definitePlural';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
}

export function generateExercises({
  count,
  startId = 1,
  type,
  difficulty,
  category
}: GeneratorOptions): Exercise[] {
  const exercises: Exercise[] = [];
  const usedTemplates = new Set<string>();
  const usedNouns = new Set<string>();

  // Filter nouns based on difficulty and category
  let availableNouns = [...nouns];
  if (difficulty) {
    availableNouns = availableNouns.filter(n => n.difficulty === difficulty);
  }
  if (category) {
    availableNouns = availableNouns.filter(n => n.category === category);
  }

  // Select templates based on exercise type
  const templates = {
    indefinite: indefiniteSentenceTemplates,
    definite: definiteSentenceTemplates,
    indefinitePlural: indefinitePluralTemplates,
    definitePlural: definitePluralTemplates
  }[type];

  for (let i = 0; i < count; i++) {
    // Select a random noun and template
    const noun = getRandomUnused(availableNouns, usedNouns);
    const template = getRandomUnused(templates, usedTemplates);

    if (!noun || !template) {
      // Reset used sets if we run out of unique options
      if (!noun) usedNouns.clear();
      if (!template) usedTemplates.clear();
      continue;
    }

    // Generate the exercise
    const exercise = createExercise({
      id: startId + i,
      noun,
      template,
      type
    });

    exercises.push(exercise);
  }

  return exercises;
}

function getRandomUnused<T>(items: T[], usedItems: Set<string>): T | null {
  const available = items.filter(
    item => !usedItems.has(getItemIdentifier(item))
  );
  if (available.length === 0) return null;

  const item = available[Math.floor(Math.random() * available.length)];
  usedItems.add(getItemIdentifier(item));
  return item;
}

function getItemIdentifier(item: any): string {
  return item.noun || item.template || item.toString();
}

function createExercise({
  id,
  noun,
  template,
  type
}: {
  id: number;
  noun: any;
  template: any;
  type: string;
}): Exercise {
  const correctArticle = {
    indefinite: noun.indefiniteArticle,
    definite: noun.definiteArticle,
    indefinitePlural: noun.indefinitePlural,
    definitePlural: noun.definitePlural
  }[type];

  const sentence = type === 'definite' || type === 'definitePlural'
    ? template.template.replace('NOUN', noun.noun)
    : template.template.replace('NOUN', noun.noun);

  const correctSentence = type === 'indefinite' || type === 'indefinitePlural'
    ? sentence.replace('___', correctArticle)
    : sentence.replace('NOUN___', noun.noun + correctArticle);

  const translation = template.translation.replace('NOUN', noun.translation);

  return {
    id,
    sentence,
    correctArticle,
    correctSentence,
    noun: noun.noun,
    translation
  };
}