import type { Exercise, Template, Noun } from '../../types';
import { nouns } from '../collections/nouns';
import {
  indefiniteSentenceTemplates,
  definiteSentenceTemplates,
  indefinitePluralTemplates,
  definitePluralTemplates
} from '../templates';

const templates = {
  indefinite: indefiniteSentenceTemplates,
  definite: definiteSentenceTemplates,
  indefinitePlural: indefinitePluralTemplates,
  definitePlural: definitePluralTemplates
};

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
  const usedNouns = new Set<string>();

  // Get available templates for the type
  const availableTemplates = templates[type];

  // Filter nouns based on difficulty and category
  const availableNouns = [...nouns].filter(noun => {
    if (difficulty && noun.difficulty !== difficulty) return false;
    if (category && noun.category !== category) return false;
    return true;
  });

  while (exercises.length < count && availableNouns.length > 0) {
    const noun = getRandomUnused(availableNouns, usedNouns);
    if (!noun) break;

    try {
      const template = getCompatibleTemplate(noun, availableTemplates);
      const exercise = createExercise({
        id: startId + exercises.length,
        noun,
        template,
        type
      });
      exercises.push(exercise);
    } catch (error) {
      console.warn(`Skipping noun "${noun.noun}": ${error.message}`);
    }
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
  noun: Noun;
  template: Template;
  type: ArticleType;
}): Exercise {
  let nounForm: string;
  let correctArticle: string;
  
  switch (type) {
    case 'indefinite':
      nounForm = noun.noun;
      correctArticle = noun.forms.indefinite.split(' ')[0];
      break;
    case 'definite':
      nounForm = noun.noun;
      correctArticle = noun.forms.definite;
      break;
    case 'indefinitePlural':
      nounForm = noun.forms.indefinitePlural;
      correctArticle = '';
      break;
    case 'definitePlural':
      nounForm = noun.forms.definitePlural;
      correctArticle = '';
      break;
    default:
      nounForm = noun.noun;
      correctArticle = noun.forms.indefinite.split(' ')[0];
  }

  const sentence = template.template.replace('NOUN', nounForm);
  const correctSentence = type === 'indefinitePlural' || type === 'definitePlural'
    ? sentence
    : sentence.replace('___', correctArticle);

  const translation = template.translation.replace('{noun}', 
    type.includes('Plural') ? noun.translation + 's' : noun.translation
  );

  return {
    id,
    sentence,
    correctArticle,
    correctSentence,
    noun: nounForm,
    translation
  };
}

function isTemplateCompatible(template: Template, noun: Noun): boolean {
  // Check category compatibility
  if (!template.categories.includes('all') && 
      !template.categories.includes(noun.category)) {
    return false;
  }

  // Check semantic compatibility
  if (template.semanticGroups && noun.semantics) {
    // Required semantic properties check
    for (const [property, required] of Object.entries(template.semanticGroups)) {
      if (required && !noun.semantics[property]) {
        return false;
      }
    }

    // Logical exclusions
    if (template.semanticGroups.canBeConsumed && 
        (noun.category === 'furniture' || 
         noun.category === 'technology' ||
         noun.semantics.abstract)) {
      return false;
    }

    if (template.semanticGroups.canBeWorn && 
        !['clothing', 'accessories'].includes(noun.category)) {
      return false;
    }

    if (template.semanticGroups.canGrow && 
        !['nature', 'food'].includes(noun.category)) {
      return false;
    }
  }

  return true;
}

function getCompatibleTemplate(noun: Noun, templates: Template[]): Template {
  const compatibleTemplates = templates.filter(template => {
    const isCompatible = isTemplateCompatible(template, noun);
    if (!isCompatible) {
      console.debug(
        `Template "${template.template}" incompatible with noun "${noun.noun}"`
      );
    }
    return isCompatible;
  });

  if (compatibleTemplates.length === 0) {
    throw new Error(
      `No compatible templates found for noun "${noun.noun}" ` +
      `(category: ${noun.category})`
    );
  }

  return compatibleTemplates[Math.floor(Math.random() * compatibleTemplates.length)];
}