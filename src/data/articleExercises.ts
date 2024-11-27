import { Exercise, NounCategory } from '../types';
import { commonNouns } from './nouns';
import { templates, Template, ArticleType } from './templates';

function startsWithVowelSound(word: string): boolean {
  // Basic vowel check
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const firstLetter = word.toLowerCase().charAt(0);
  
  // Special cases for 'h' words where 'h' is silent
  const silentHWords = ['hour', 'honest', 'honour', 'heir', 'herb', 'honorable'];
  if (silentHWords.some(h => word.toLowerCase().startsWith(h))) {
    return true;
  }
  
  // Special case for 'u' words that sound like 'yu'
  const uExceptions = ['university', 'uniform', 'union', 'unique', 'unit', 'unicorn', 'united', 'universe', 'utility'];
  if (uExceptions.some(u => word.toLowerCase().startsWith(u))) {
    return false;
  }

  // Special case for 'eu' words that sound like 'yu'
  const euExceptions = ['european', 'euphemism', 'eulogy'];
  if (euExceptions.some(eu => word.toLowerCase().startsWith(eu))) {
    return false;
  }

  // Special case for 'one'/'once' which start with 'w' sound
  if (word.toLowerCase().startsWith('one') || word.toLowerCase().startsWith('once')) {
    return true;
  }
  
  return vowels.includes(firstLetter);
}

export function generateExercises(count: number, startId: number, type: ArticleType): Exercise[] {
  const exercises: Exercise[] = [];
  let availableNouns = [...commonNouns];
  let attempts = 0;
  const maxAttempts = count * 3;
  
  console.log('Starting exercise generation:', { 
    type, 
    count, 
    availableNouns: availableNouns.length,
    nounCategories: [...new Set(availableNouns.map(n => n.category))]
  });
  
  const templateList: Template[] = templates[type];
  if (!templateList || templateList.length === 0) {
    console.error('No templates found for type:', type);
    return exercises;
  }
  
  while (exercises.length < count && availableNouns.length > 0 && attempts < maxAttempts) {
    attempts++;
    
    const template = templateList[Math.floor(Math.random() * templateList.length)];
    let potentialNouns = availableNouns.filter(noun => {
      if (template.requiresCountable && noun.countable === false) return false;
      return template.categories.includes('all') || template.categories.includes(noun.category as NounCategory);
    });
    
    if (template.semanticGroups) {
      potentialNouns = potentialNouns.filter(noun => {
        for (const [requirement, required] of Object.entries(template.semanticGroups || {})) {
          if (required && (!noun.semantics || !noun.semantics[requirement])) return false;
        }
        return true;
      });
    }
    
    if (potentialNouns.length === 0) {
      if (attempts >= maxAttempts) {
        console.error('Unable to generate enough exercises with compatible nouns');
        break;
      }
      continue;
    }
    
    const noun = potentialNouns[Math.floor(Math.random() * potentialNouns.length)];
    availableNouns = availableNouns.filter(n => n !== noun);
    
    let sentence = template.template;
    let correctArticle = '';
    let correctSentence = '';
    
    switch (type) {
      case 'indefinite':
        correctArticle = noun.gender; // 'en' or 'ett'
        sentence = template.template.replace('NOUN', noun.noun);
        correctSentence = sentence.replace('___', correctArticle);
        break;
        
      case 'definite':
        correctArticle = noun.forms.definite;
        sentence = template.template.replace('NOUN___', noun.noun);
        correctSentence = sentence.replace('NOUN___', correctArticle);
        break;
        
      case 'indefinitePlural':
        correctArticle = noun.forms.indefinitePlural;
        sentence = template.template.replace('NOUN___', noun.noun);
        correctSentence = sentence.replace('NOUN___', correctArticle);
        break;
        
      case 'definitePlural':
        correctArticle = noun.forms.definitePlural;
        sentence = template.template.replace('NOUN___', noun.noun);
        correctSentence = sentence.replace('NOUN___', correctArticle);
        break;
    }
    
    const exercise: Exercise = {
      id: startId + exercises.length,
      type,
      sentence,
      translation: template.translation.replace('{noun}', noun.translation),
      correctAnswer: correctArticle,
      correctSentence,
      noun: noun.noun,
      baseForm: noun.forms.indefinite,
      definiteForm: noun.forms.definite,
      indefinitePluralForm: noun.forms.indefinitePlural,
      definitePluralForm: noun.forms.definitePlural
    };

    console.log('Generated exercise:', {
      type,
      sentence,
      translation: exercise.translation,
      correctAnswer: correctArticle,
      correctSentence
    });
    
    exercises.push(exercise);
  }
  
  return exercises;
}