type VerbForm = 'present' | 'past' | 'supine';

const commonEndings = {
  present: ['er', 'ar', 'or', 'r'],
  past: ['de', 'te', 'dde', 'ade'],
  supine: ['t', 'tt', 'it', 'at']
};

const generateSimilarEnding = (correctForm: string, formType: VerbForm): string => {
  const stem = correctForm.replace(/[aeior]+$/, '');
  const currentEnding = correctForm.slice(stem.length);
  
  // Get possible endings for this form type
  const possibleEndings = commonEndings[formType].filter(ending => ending !== currentEnding);
  
  // Return stem + random ending
  return stem + possibleEndings[Math.floor(Math.random() * possibleEndings.length)];
};

const vowels = ['a', 'e', 'i', 'o', 'ö', 'å', 'ä'];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const generateVerbOptions = (
  correctAnswer: string,
  formType: VerbForm,
  infinitive: string
): string[] => {
  const options = new Set<string>();
  options.add(correctAnswer);

  // Generate 3 unique incorrect options
  while (options.size < 4) {
    const randomMethod = Math.random();
    let newOption: string;

    if (randomMethod < 0.4) {
      // Use common ending variation
      newOption = generateSimilarEnding(correctAnswer, formType);
    } else if (randomMethod < 0.7) {
      // Modify a vowel in the stem
      const stem = correctAnswer.replace(/[aeior]+$/, '');
      const ending = correctAnswer.slice(stem.length);
      const stemVowels = stem.match(/[aeioöåä]/g) || [];
      if (stemVowels.length > 0) {
        const vowelToReplace = stemVowels[Math.floor(Math.random() * stemVowels.length)];
        const newVowel = vowels[Math.floor(Math.random() * vowels.length)];
        newOption = stem.replace(vowelToReplace, newVowel) + ending;
      } else {
        newOption = generateSimilarEnding(correctAnswer, formType);
      }
    } else {
      // Use infinitive + common ending
      const stem = infinitive.slice(0, -1); // Remove 'a' from infinitive
      const ending = commonEndings[formType][Math.floor(Math.random() * commonEndings[formType].length)];
      newOption = stem + ending;
    }

    if (newOption !== correctAnswer && newOption.length >= 3) {
      options.add(newOption);
    }
  }

  return shuffleArray(Array.from(options));
};
