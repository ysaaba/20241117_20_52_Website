import { commonNouns } from '../data/nouns';
import {
  indefiniteSentenceTemplates,
  definiteSentenceTemplates,
  indefinitePluralTemplates,
  definitePluralTemplates
} from '../data/templates';
import type { ExerciseType, Exercise, Template, Noun } from '../types';

type ArticleType = 'indefinite' | 'definite' | 'indefinitePlural' | 'definitePlural';

const getTemplatesForType = (type: ArticleType) => {
  switch (type) {
    case 'indefinite':
      return indefiniteSentenceTemplates;
    case 'definite':
      return definiteSentenceTemplates;
    case 'indefinitePlural':
      return indefinitePluralTemplates;
    case 'definitePlural':
      return definitePluralTemplates;
    default:
      return indefiniteSentenceTemplates;
  }
};

const getCorrectArticle = (noun: Noun, type: ArticleType): string => {
  switch (type) {
    case 'indefinite':
      return noun.indefiniteArticle;
    case 'definite':
      return noun.definiteArticle;
    case 'indefinitePlural':
      return noun.indefinitePlural;
    case 'definitePlural':
      return noun.definitePlural;
    default:
      return noun.indefiniteArticle;
  }
};

interface TemplateContext {
  noun: Noun;
  type: ArticleType;
  useDefiniteForm: boolean;
}

function isTemplateCompatible(template: Template, noun: Noun): boolean {
  // Basic category check
  if (!template.categories.includes('all') && 
      !template.categories.includes(noun.category)) {
    return false;
  }

  // Check if noun form matches template type
  if (template.type !== 'indefinite' && noun.countable) {
    return false;
  }

  // Check semantic compatibility
  if (template.semanticGroups) {
    const nounSemantics = noun.semantics || {};

    // Special handling for uncountable nouns
    if (!noun.countable && template.type === 'indefinite') {
      return false;
    }

    // Prevent borrowing weather phenomena, body parts, abstract concepts
    if (template.semanticGroups.canBeBorrowed) {
      if (noun.category === 'weather' || 
          noun.category === 'body parts' ||
          noun.category === 'abstract' ||
          nounSemantics.isWeather ||
          nounSemantics.bodyPart ||
          nounSemantics.abstract ||
          nounSemantics.animate) {
        return false;
      }
    }

    // Only allow borrowing physical, movable objects
    if (template.semanticGroups.canBeBorrowed) {
      const borrowableCategories = ['objects', 'technology', 'school', 'clothing'];
      if (!borrowableCategories.includes(noun.category)) {
        return false;
      }
    }

    // Check other required semantic properties
    for (const [property, required] of Object.entries(template.semanticGroups)) {
      if (required && !nounSemantics[property]) {
        return false;
      }
    }
  }

  return true;
}

function generateSentence(template: Template, noun: Noun, type: ArticleType): {
  sentence: string;
  translation: string;
} {
  if (!isTemplateCompatible(template, noun)) {
    throw new Error(`Template "${template.template}" is not compatible with noun "${noun.noun}"`);
  }

  const context = {
    noun,
    type,
    useDefiniteForm: type === 'definite' || type === 'definitePlural'
  };

  return generateTemplateString(template, context);
}

function generateTemplateString(template: Template, context: TemplateContext): {
  sentence: string;
  translation: string;
} {
  const { noun, type, useDefiniteForm } = context;
  
  // Handle uncountable nouns
  if (!noun.countable && (type === 'indefinitePlural' || type === 'definitePlural')) {
    return generateUncountableTemplate(template, noun);
  }

  let sentence = template.template;
  let translation = template.translation;

  // Replace noun placeholders
  if (useDefiniteForm) {
    sentence = sentence.replace('NOUN___', `${noun.noun}${noun.forms.definite}`);
    translation = translation.replace('{noun}', noun.translation);
  } else {
    sentence = sentence.replace('NOUN', noun.noun);
    translation = translation.replace('{noun}', noun.translation);
  }

  // Handle articles based on type
  if (type === 'indefinite' || type === 'indefinitePlural') {
    const article = type === 'indefinite' ? noun.forms.indefinite.split(' ')[0] : '';
    sentence = sentence.replace('___', article);
    
    // Handle English articles
    const englishArticle = getEnglishArticle(noun.translation, type);
    translation = translation.replace('a {noun}', `${englishArticle} {noun}`);
  }

  return { sentence, translation };
}

function getEnglishArticle(word: string, type: ArticleType): string {
  if (type === 'indefinitePlural') return '';
  if (type === 'indefinite') {
    return startsWithVowelSound(word) ? 'an' : 'a';
  }
  return 'the';
}

function startsWithVowelSound(word: string): boolean {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const firstLetter = word.toLowerCase().charAt(0);
  
  // Special cases
  const silentHWords = ['hour', 'honest', 'honour', 'heir'];
  if (silentHWords.some(h => word.toLowerCase().startsWith(h))) {
    return true;
  }
  
  const uExceptions = ['university', 'uniform', 'union', 'unique', 'unit'];
  if (uExceptions.some(u => word.toLowerCase().startsWith(u))) {
    return false;
  }
  
  return vowels.includes(firstLetter);
}

function getCompatibleTemplate(noun: Noun, templates: Template[]): Template {
  const compatibleTemplates = templates.filter(template => 
    isTemplateCompatible(template, noun)
  );

  if (compatibleTemplates.length === 0) {
    throw new Error(`No compatible templates found for noun "${noun.noun}"`);
  }

  return compatibleTemplates[Math.floor(Math.random() * compatibleTemplates.length)];
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

  // Get available templates for the type
  const availableTemplates = templates[type];

  // Filter nouns based on difficulty and category
  let availableNouns = [...nouns].filter(noun => {
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