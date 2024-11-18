import { Exercise, ExerciseType } from '../types';
import { commonNouns } from './nouns';

interface NounCategory {
  noun: string;
  translation: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  gender: 'en' | 'ett';
  forms: {
    indefinite: string;
    definite: string;
    indefinitePlural: string;
    definitePlural: string;
  };
  examples: {
    indefinite: { swedish: string; english: string };
    definite: { swedish: string; english: string };
    indefinitePlural: { swedish: string; english: string };
    definitePlural: { swedish: string; english: string };
  };
}

// Remove the old nouns array and use commonNouns instead
const templates = {
  indefinite: {
    animals: [
      { sv: "Jag ser ___ {noun} i parken", en: "I see a {noun} in the park" },
      { sv: "Det finns ___ {noun} i trädgården", en: "There is a {noun} in the garden" },
      { sv: "Min granne har ___ {noun}", en: "My neighbor has a {noun}" }
    ],
    furniture: [
      { sv: "Jag behöver ___ {noun}", en: "I need a {noun}" },
      { sv: "Det står ___ {noun} i rummet", en: "There is a {noun} in the room" },
      { sv: "Vi har köpt ___ {noun}", en: "We have bought a {noun}" }
    ],
    food: [
      { sv: "Jag vill ha ___ {noun}", en: "I want a {noun}" },
      { sv: "Kan jag få ___ {noun}, tack?", en: "Can I have a {noun}, please?" },
      { sv: "Hon äter ___ {noun}", en: "She is eating a {noun}" }
    ],
    bodyParts: [
      { sv: "Hon har ___ {noun}", en: "She has a {noun}" },
      { sv: "Det gör ont i ___ {noun}", en: "A {noun} hurts" },
      { sv: "Jag såg ___ {noun}", en: "I saw a {noun}" }
    ],
    clothing: [
      { sv: "Jag behöver ___ {noun}", en: "I need a {noun}" },
      { sv: "Hon köpte ___ {noun}", en: "She bought a {noun}" },
      { sv: "Det ligger ___ {noun} här", en: "There is a {noun} here" }
    ]
  },
  definite: {
    animals: [
      { sv: "{noun}___ springer snabbt", en: "The {noun} runs fast" },
      { sv: "{noun}___ sover", en: "The {noun} is sleeping" },
      { sv: "Var är {noun}___?", en: "Where is the {noun}?" }
    ],
    furniture: [
      { sv: "{noun}___ är ny", en: "The {noun} is new" },
      { sv: "{noun}___ står där", en: "The {noun} is standing there" },
      { sv: "{noun}___ är sönder", en: "The {noun} is broken" }
    ],
    food: [
      { sv: "{noun}___ är färsk", en: "The {noun} is fresh" },
      { sv: "{noun}___ smakar gott", en: "The {noun} tastes good" },
      { sv: "Var är {noun}___?", en: "Where is the {noun}?" }
    ],
    bodyParts: [
      { sv: "{noun}___ gör ont", en: "The {noun} hurts" },
      { sv: "{noun}___ är stark", en: "The {noun} is strong" },
      { sv: "Titta på {noun}___", en: "Look at the {noun}" }
    ],
    clothing: [
      { sv: "{noun}___ är ren", en: "The {noun} is clean" },
      { sv: "{noun}___ passar bra", en: "The {noun} fits well" },
      { sv: "Var är {noun}___?", en: "Where is the {noun}?" }
    ]
  }
};

export function generateExercises(count: number, startId: number, type: ExerciseType): Exercise[] {
  const exercises: Exercise[] = [];
  
  for (let i = 0; i < count; i++) {
    // Select a random noun from commonNouns
    const noun = commonNouns[Math.floor(Math.random() * commonNouns.length)];
    
    // Get templates for the noun's category
    const categoryTemplates = templates[type === 'indefinite' ? 'indefinite' : 'definite'][noun.category as keyof typeof templates.indefinite] || 
      templates[type === 'indefinite' ? 'indefinite' : 'definite'].animals; // fallback to animals if category not found
    
    const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
    
    // Replace {noun} placeholder with actual noun
    const sentence = template.sv.replace('{noun}', noun.noun);
    const translation = template.en.replace('{noun}', noun.translation);
    
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