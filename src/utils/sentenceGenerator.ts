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

export function generateExercises(count: number, startId: number = 1, type: ExerciseType = 'indefinite'): Exercise[] {
  // Early return for verb exercises as they use a different system
  if (type === 'verbGroups' || type === 'adjectives') {
    return [];
  }

  const articleType = type as ArticleType;
  const templates = getTemplatesForType(articleType);
  const exercises: Exercise[] = [];
  
  const usedTemplates = new Set<string>();
  const usedNouns = new Set<string>();
  
  for (let i = 0; i < count; i++) {
    // Get unique noun
    let noun: Noun;
    do {
      noun = commonNouns[Math.floor(Math.random() * commonNouns.length)];
    } while (usedNouns.has(noun.noun) && usedNouns.size < commonNouns.length);
    
    // Get unique template
    let template: Template;
    do {
      template = templates[Math.floor(Math.random() * templates.length)];
    } while (usedTemplates.has(template.template) && usedTemplates.size < templates.length);
    
    usedNouns.add(noun.noun);
    usedTemplates.add(template.template);
    
    // Reset sets if we've used all options to avoid running out
    if (usedNouns.size === commonNouns.length) usedNouns.clear();
    if (usedTemplates.size === templates.length) usedTemplates.clear();
    
    const { sentence, correctSentence } = generateSentence(template, noun, articleType);
    const correctArticle = getCorrectArticle(noun, articleType);
    const translation = template.translation.replace('NOUN', noun.translation);
    
    exercises.push({
      id: startId + i,
      sentence,
      correctArticle,
      correctSentence,
      noun: noun.noun,
      translation
    });
  }
  
  return exercises;
}