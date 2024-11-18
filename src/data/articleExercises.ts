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
  let availableNouns = [...commonNouns];
  
  // Debug logging
  console.log('Generating exercises:', { type, count, availableNouns: availableNouns.length });
  
  while (exercises.length < count && availableNouns.length > 0) {
    // Get a random noun
    const randomIndex = Math.floor(Math.random() * availableNouns.length);
    const noun = availableNouns[randomIndex];
    
    // Remove used noun from available nouns
    availableNouns.splice(randomIndex, 1);
    
    const templateList = templates[type];
    if (!templateList || templateList.length === 0) {
      console.error('No templates found for type:', type);
      continue;
    }
    
    const template = templateList[Math.floor(Math.random() * templateList.length)];
    
    const sentence = template.template.replace('NOUN', noun.noun);
    const englishArticle = type === 'indefinite' 
      ? (startsWithVowelSound(noun.translation) ? 'an' : 'a')
      : 'the';
    
    const translation = template.translation
      .replace('a {noun}', `${englishArticle} ${noun.translation}`)
      .replace('{noun}', noun.translation);
    
    let correctArticle = type === 'indefinite' 
      ? noun.gender 
      : (noun.gender === 'en' ? 'en' : 'et');
    
    const correctSentence = sentence.replace('___', correctArticle);

    exercises.push({
      id: startId + exercises.length,
      sentence,
      correctArticle,
      correctSentence,
      noun: noun.noun,
      translation
    });
    
    // If we run out of nouns but still need more exercises, reset the available nouns
    if (availableNouns.length === 0 && exercises.length < count) {
      availableNouns = [...commonNouns];
    }
  }
  
  // Debug logging
  console.log('Generated exercises:', exercises.length);
  
  return exercises;
} 