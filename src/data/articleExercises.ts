import { Exercise, ExerciseType } from '../types';

interface NounCategory {
  noun: string;
  translation: string;
  category: 'living' | 'object' | 'abstract' | 'food' | 'place';
  gender: 'en' | 'ett';
}

// Base nouns with their categories
const nouns: NounCategory[] = [
  // Living beings (mostly en-words)
  { noun: 'hund', translation: 'dog', category: 'living', gender: 'en' },
  { noun: 'katt', translation: 'cat', category: 'living', gender: 'en' },
  { noun: 'fågel', translation: 'bird', category: 'living', gender: 'en' },
  { noun: 'barn', translation: 'child', category: 'living', gender: 'ett' },
  { noun: 'djur', translation: 'animal', category: 'living', gender: 'ett' },

  // Objects (mixed en/ett)
  { noun: 'bok', translation: 'book', category: 'object', gender: 'en' },
  { noun: 'telefon', translation: 'phone', category: 'object', gender: 'en' },
  { noun: 'bord', translation: 'table', category: 'object', gender: 'ett' },
  { noun: 'hus', translation: 'house', category: 'object', gender: 'ett' },
  { noun: 'glas', translation: 'glass', category: 'object', gender: 'ett' },

  // Food and drinks (mixed)
  { noun: 'äpple', translation: 'apple', category: 'food', gender: 'ett' },
  { noun: 'banan', translation: 'banana', category: 'food', gender: 'en' },
  { noun: 'smörgås', translation: 'sandwich', category: 'food', gender: 'en' },
  { noun: 'vatten', translation: 'water', category: 'food', gender: 'ett' },
  { noun: 'kaffe', translation: 'coffee', category: 'food', gender: 'ett' },

  // Places
  { noun: 'park', translation: 'park', category: 'place', gender: 'en' },
  { noun: 'skola', translation: 'school', category: 'place', gender: 'en' },
  { noun: 'bibliotek', translation: 'library', category: 'place', gender: 'ett' },
  { noun: 'torg', translation: 'square', category: 'place', gender: 'ett' },
  { noun: 'sjukhus', translation: 'hospital', category: 'place', gender: 'ett' },

  // Abstract concepts
  { noun: 'idé', translation: 'idea', category: 'abstract', gender: 'en' },
  { noun: 'problem', translation: 'problem', category: 'abstract', gender: 'ett' },
  { noun: 'fråga', translation: 'question', category: 'abstract', gender: 'en' },
  { noun: 'svar', translation: 'answer', category: 'abstract', gender: 'ett' },
  { noun: 'namn', translation: 'name', category: 'abstract', gender: 'ett' },
];

const templates = {
  indefinite: {
    living: [
      { sv: "Jag ser ___ {noun} i parken", en: "I see a {noun} in the park" },
      { sv: "Det finns ___ {noun} i trädgården", en: "There is a {noun} in the garden" },
      { sv: "Min granne har ___ {noun}", en: "My neighbor has a {noun}" }
    ],
    object: [
      { sv: "Jag behöver ___ {noun}", en: "I need a {noun}" },
      { sv: "Det ligger ___ {noun} på bordet", en: "There is a {noun} on the table" },
      { sv: "Kan du ge mig ___ {noun}?", en: "Can you give me a {noun}?" }
    ],
    food: [
      { sv: "Jag vill ha ___ {noun}", en: "I want a {noun}" },
      { sv: "Kan jag få ___ {noun}, tack?", en: "Can I have a {noun}, please?" },
      { sv: "Hon äter ___ {noun}", en: "She is eating a {noun}" }
    ],
    place: [
      { sv: "Det finns ___ {noun} i närheten", en: "There is a {noun} nearby" },
      { sv: "Vi ska besöka ___ {noun}", en: "We are going to visit a {noun}" },
      { sv: "De bygger ___ {noun} här", en: "They are building a {noun} here" }
    ],
    abstract: [
      { sv: "Jag har ___ {noun}", en: "I have a {noun}" },
      { sv: "Det är ___ {noun} som jag tänker på", en: "It's a {noun} that I'm thinking about" },
      { sv: "Vi diskuterar ___ {noun}", en: "We are discussing a {noun}" }
    ]
  },
  definite: {
    living: [
      { sv: "{noun}___ springer snabbt", en: "The {noun} runs fast" },
      { sv: "{noun}___ sover i soffan", en: "The {noun} is sleeping on the couch" },
      { sv: "Var är {noun}___?", en: "Where is the {noun}?" }
    ],
    object: [
      { sv: "{noun}___ är ny", en: "The {noun} is new" },
      { sv: "Var ligger {noun}___?", en: "Where is the {noun}?" },
      { sv: "{noun}___ är sönder", en: "The {noun} is broken" }
    ],
    food: [
      { sv: "{noun}___ är färsk", en: "The {noun} is fresh" },
      { sv: "{noun}___ smakar gott", en: "The {noun} tastes good" },
      { sv: "Var köpte du {noun}___?", en: "Where did you buy the {noun}?" }
    ],
    place: [
      { sv: "{noun}___ är stängd", en: "The {noun} is closed" },
      { sv: "{noun}___ ligger nära", en: "The {noun} is nearby" },
      { sv: "Känner du till {noun}___?", en: "Do you know the {noun}?" }
    ],
    abstract: [
      { sv: "{noun}___ är intressant", en: "The {noun} is interesting" },
      { sv: "Vad tycker du om {noun}___?", en: "What do you think about the {noun}?" },
      { sv: "{noun}___ är viktig", en: "The {noun} is important" }
    ]
  }
};

export function generateExercises(count: number, startId: number, type: ExerciseType): Exercise[] {
  const exercises: Exercise[] = [];
  
  for (let i = 0; i < count; i++) {
    // Select a random noun
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    // Get templates for the noun's category
    const categoryTemplates = templates[type === 'indefinite' ? 'indefinite' : 'definite'][noun.category];
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