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
  const maxAttempts = count * 3; // Limit the number of attempts to prevent infinite loops
  
  // Debug logging
  console.log('Starting exercise generation:', { 
    type, 
    count, 
    availableNouns: availableNouns.length,
    nounCategories: [...new Set(availableNouns.map(n => n.category))]
  });
  
  // Pre-filter templates that are valid for this type
  const templateList: Template[] = templates[type];
  if (!templateList || templateList.length === 0) {
    console.error('No templates found for type:', type);
    return exercises;
  }
  
  console.log('Available templates:', {
    count: templateList.length,
    categories: [...new Set(templateList.flatMap((t: { categories: NounCategory[] }) => t.categories))],
    semanticGroups: [...new Set(templateList.flatMap((t: { semanticGroups?: Record<string, boolean> }) => t.semanticGroups ? Object.keys(t.semanticGroups) : []))]
  });
  
  while (exercises.length < count && availableNouns.length > 0 && attempts < maxAttempts) {
    attempts++;
    
    // Get a random template
    const template = templateList[Math.floor(Math.random() * templateList.length)];
    
    // Pre-filter nouns based on basic requirements (countability and category)
    let potentialNouns = availableNouns.filter(noun => {
      if (template.requiresCountable && noun.countable === false) {
        return false;
      }
      
      const categoryMatch = template.categories.includes('all') || 
                          template.categories.includes(noun.category as NounCategory);
      
      if (!categoryMatch) {
        console.log('Category mismatch:', {
          nounCategory: noun.category,
          templateCategories: template.categories,
          noun: noun.noun
        });
        return false;
      }
      
      return true;
    });
    
    console.log('After basic filtering:', {
      template: template.template,
      potentialNounsCount: potentialNouns.length,
      categories: [...new Set(potentialNouns.map(n => n.category))]
    });
    
    // Then filter based on semantic requirements if needed
    if (template.semanticGroups) {
      const beforeCount = potentialNouns.length;
      potentialNouns = potentialNouns.filter(noun => {
        for (const [requirement, required] of Object.entries(template.semanticGroups || {})) {
          if (required && (!noun.semantics || !noun.semantics[requirement])) {
            console.log('Semantic mismatch:', {
              noun: noun.noun,
              requirement,
              nounSemantics: noun.semantics
            });
            return false;
          }
        }
        return true;
      });
      console.log('After semantic filtering:', {
        beforeCount,
        afterCount: potentialNouns.length,
        template: template.template,
        semanticGroups: template.semanticGroups
      });
    }
    
    if (potentialNouns.length === 0) {
      // If we've tried too many times with no success, log an error and break
      if (attempts >= maxAttempts) {
        console.error('Unable to generate enough exercises with compatible nouns', {
          attempts,
          maxAttempts,
          exercisesGenerated: exercises.length
        });
        break;
      }
      continue;
    }
    
    // Get a random compatible noun
    const randomIndex = Math.floor(Math.random() * potentialNouns.length);
    const noun = potentialNouns[randomIndex];
    
    // Remove used noun from available nouns
    availableNouns = availableNouns.filter(n => n !== noun);
    
    const sentence = template.template.replace('NOUN', noun.noun);
    const englishArticle = type === 'indefinite' 
      ? (startsWithVowelSound(noun.translation) ? 'an' : 'a')
      : 'the';
    
    // First replace any explicit "a" or "an" in the template with the correct article
    let translation = template.translation
      .replace(/\b(a|an)\s+\{noun\}/gi, `${englishArticle} {noun}`)
      .replace('{noun}', noun.translation);
    
    // Then handle any remaining {noun} replacements
    translation = translation.replace('{noun}', noun.translation);
    
    const correctArticle = type === 'indefinite' 
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
    
    console.log('Generated exercise:', {
      sentence,
      correctSentence,
      translation,
      noun: noun.noun
    });
  }
  
  // Debug logging
  console.log('Finished generating exercises:', { 
    count: exercises.length, 
    attempts,
    remainingNouns: availableNouns.length 
  });
  
  return exercises;
}