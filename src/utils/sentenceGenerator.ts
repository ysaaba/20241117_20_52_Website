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

const generateSentence = (template: Template, noun: Noun, type: ArticleType): {
  sentence: string;
  correctSentence: string;
} => {
  const sentence = template.template.replace('NOUN', noun.noun);
  const correctArticle = getCorrectArticle(noun, type);

  const correctSentence = type === 'indefinite' || type === 'indefinitePlural'
    ? sentence.replace('___', correctArticle)
    : sentence.replace('NOUN___', noun.noun + correctArticle);

  return { sentence, correctSentence };
};

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