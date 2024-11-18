import { Exercise, ExerciseType } from '../types';
import { commonNouns } from './nouns';
import { templates } from './templates';

function startsWithVowelSound(word: string): boolean {
  // Basic vowel check
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const firstLetter = word.toLowerCase().charAt(0);
  
  // Special cases for 'h' words where 'h' is silent
  const silentHWords = ['hour', 'honest', 'honour', 'heir'];
  if (silentHWords.some(h => word.toLowerCase().startsWith(h))) {
    return true;
  }
  
  // Special case for 'u' words that sound like 'yu'
  const uExceptions = ['university', 'uniform', 'union', 'unique', 'unit'];
  if (uExceptions.some(u => word.toLowerCase().startsWith(u))) {
    return false;
  }
  
  return vowels.includes(firstLetter);
}

export function generateExercises(count: number, startId: number, type: ExerciseType): Exercise[] {
  const exercises: Exercise[] = [];
  
  for (let i = 0; i < count; i++) {
    const noun = commonNouns[Math.floor(Math.random() * commonNouns.length)];
    
    // Get templates for the article type, not noun category
    const templateList = templates[type];
    if (!templateList) {
      throw new Error(`No templates found for type: ${type}`);
    }
    
    const template = templateList[Math.floor(Math.random() * templateList.length)];
    
    // Only proceed if the template matches the noun's category
    if (!template.categories.includes(noun.category) && !template.categories.includes('all')) {
      continue;
    }
    
    const sentence = template.template.replace('NOUN', noun.noun);
    const englishArticle = type === 'indefinite' 
      ? (startsWithVowelSound(noun.translation) ? 'an' : 'a')
      : 'the';
    
    const translation = template.translation
      .replace('a {noun}', `${englishArticle} ${noun.translation}`)
      .replace('{noun}', noun.translation);
    
    let correctArticle: string;
    if (type === 'indefinite') {
      correctArticle = noun.gender;
    } else {
      correctArticle = noun.gender === 'en' ? 'en' : 'et';
    }
    
    const correctSentence = sentence.replace('___', correctArticle);

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