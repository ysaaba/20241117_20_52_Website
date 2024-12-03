import { Story } from './types';

export const enDagIParken: Story = {
  id: 'en-dag-i-parken',
  title: 'En dag i parken',
  englishTitle: 'A Day in the Park',
  difficulty: 'beginner',
  category: 'everyday',
  description: 'Learn everyday Swedish vocabulary through a simple story about a beautiful day in the park.',
  content: [
    { text: 'Det', translation: 'It' },
    { text: 'var', translation: 'was' },
    { text: 'en', translation: 'a' },
    { text: 'vacker', translation: 'beautiful' },
    { text: 'sommar', translation: 'summer' },
    { text: 'dag', translation: 'day' },
    { text: 'i', translation: 'in' },
    { text: 'parken.', translation: 'the park.' },
    { text: 'Solen', translation: 'The sun' },
    { text: 'sken', translation: 'shone' },
    { text: 'och', translation: 'and' },
    { text: 'fåglarna', translation: 'the birds' },
    { text: 'sjöng', translation: 'sang' },
    { text: 'glatt.', translation: 'happily.' },
    { text: 'På', translation: 'On' },
    { text: 'gräsmattan', translation: 'the lawn' },
    { text: 'satt', translation: 'sat' },
    { text: 'många', translation: 'many' },
    { text: 'familjer', translation: 'families' },
    { text: 'med', translation: 'with' },
    { text: 'sina', translation: 'their' },
    { text: 'picknickkorgar.', translation: 'picnic baskets.' },
    { text: 'Barnen', translation: 'The children' },
    { text: 'lekte', translation: 'played' },
    { text: 'och', translation: 'and' },
    { text: 'skrattade', translation: 'laughed' },
    { text: 'medan', translation: 'while' },
    { text: 'de', translation: 'they' },
    { text: 'sprang', translation: 'ran' },
    { text: 'runt.', translation: 'around.' },
  ],
  audioUrl: '/audio/stories/en-dag-i-parken.mp3',
  exercises: [
    {
      question: 'Hur var dagen i parken?',
      englishQuestion: 'How was the day in the park?',
      options: ['Regnig (Rainy)', 'Vacker (Beautiful)', 'Kall (Cold)', 'Mörk (Dark)'],
      correctAnswer: 'Vacker (Beautiful)'
    },
    {
      question: 'Vad gjorde fåglarna?',
      englishQuestion: 'What did the birds do?',
      options: ['Flög (Flew)', 'Åt (Ate)', 'Sjöng (Sang)', 'Sov (Slept)'],
      correctAnswer: 'Sjöng (Sang)'
    },
    {
      question: 'Vad hade familjerna med sig?',
      englishQuestion: 'What did the families bring with them?',
      options: ['Böcker (Books)', 'Picknickkorgar (Picnic baskets)', 'Paraplyer (Umbrellas)', 'Cyklar (Bicycles)'],
      correctAnswer: 'Picknickkorgar (Picnic baskets)'
    },
    {
      question: 'Vad gjorde barnen i parken?',
      englishQuestion: 'What did the children do in the park?',
      options: ['Sov (Slept)', 'Lekte och skrattade (Played and laughed)', 'Läste (Read)', 'Åt glass (Ate ice cream)'],
      correctAnswer: 'Lekte och skrattade (Played and laughed)'
    }
  ]
};
