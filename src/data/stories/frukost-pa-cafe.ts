import { Story } from './types';

export const frukostPaCafe: Story = {
  id: 'frukost-pa-cafe',
  title: 'Frukost på café',
  englishTitle: 'Breakfast at a Café',
  difficulty: 'beginner',
  category: 'food',
  description: 'Learn Swedish food vocabulary and café expressions through a story about a typical Swedish breakfast.',
  content: [
    { text: 'Anna', translation: 'Anna' },
    { text: 'går', translation: 'goes' },
    { text: 'till', translation: 'to' },
    { text: 'sitt', translation: 'her' },
    { text: 'favoritcafé', translation: 'favorite café' },
    { text: 'en', translation: 'a' },
    { text: 'kall', translation: 'cold' },
    { text: 'vintermorgon.', translation: 'winter morning.' },
    { text: 'Caféet', translation: 'The café' },
    { text: 'är', translation: 'is' },
    { text: 'varmt', translation: 'warm' },
    { text: 'och', translation: 'and' },
    { text: 'mysigt.', translation: 'cozy.' },
    { text: 'Hon', translation: 'She' },
    { text: 'beställer', translation: 'orders' },
    { text: 'en', translation: 'a' },
    { text: 'stor', translation: 'large' },
    { text: 'kopp', translation: 'cup' },
    { text: 'kaffe', translation: 'coffee' },
    { text: 'och', translation: 'and' },
    { text: 'en', translation: 'a' },
    { text: 'nybakad', translation: 'freshly baked' },
    { text: 'kanelbulle.', translation: 'cinnamon bun.' },
    { text: 'Doften', translation: 'The aroma' },
    { text: 'av', translation: 'of' },
    { text: 'färskt', translation: 'fresh' },
    { text: 'bröd', translation: 'bread' },
    { text: 'och', translation: 'and' },
    { text: 'kaffe', translation: 'coffee' },
    { text: 'fyller', translation: 'fills' },
    { text: 'luften.', translation: 'the air.' },
    { text: 'Vid', translation: 'At' },
    { text: 'fönstret', translation: 'the window' },
    { text: 'kan', translation: 'can' },
    { text: 'hon', translation: 'she' },
    { text: 'se', translation: 'see' },
    { text: 'snöflingor', translation: 'snowflakes' },
    { text: 'dansa', translation: 'dance' },
    { text: 'i', translation: 'in' },
    { text: 'vinden.', translation: 'the wind.' },
  ],
  audioUrl: '/audio/stories/frukost-pa-cafe.mp3',
  exercises: [
    {
      question: 'Vad beställer Anna att dricka?',
      englishQuestion: 'What does Anna order to drink?',
      options: ['Te (Tea)', 'Kaffe (Coffee)', 'Juice (Juice)', 'Vatten (Water)'],
      correctAnswer: 'Kaffe (Coffee)'
    },
    {
      question: 'Hur är caféet beskrivet?',
      englishQuestion: 'How is the café described?',
      options: ['Kallt och mörkt (Cold and dark)', 'Varmt och mysigt (Warm and cozy)', 'Stort och högljutt (Big and noisy)', 'Litet och trångt (Small and cramped)'],
      correctAnswer: 'Varmt och mysigt (Warm and cozy)'
    },
    {
      question: 'Vad ser Anna genom fönstret?',
      englishQuestion: 'What does Anna see through the window?',
      options: ['Regn (Rain)', 'Snöflingor (Snowflakes)', 'Sol (Sun)', 'Moln (Clouds)'],
      correctAnswer: 'Snöflingor (Snowflakes)'
    },
    {
      question: 'Vilken årstid utspelar sig berättelsen i?',
      englishQuestion: 'In which season does the story take place?',
      options: ['Sommar (Summer)', 'Höst (Autumn)', 'Vinter (Winter)', 'Vår (Spring)'],
      correctAnswer: 'Vinter (Winter)'
    },
    {
      question: 'Hur beskrivs kanelbullen?',
      englishQuestion: 'How is the cinnamon bun described?',
      options: ['Gammal (Old)', 'Nybakad (Freshly baked)', 'Kall (Cold)', 'Varm (Hot)'],
      correctAnswer: 'Nybakad (Freshly baked)'
    }
  ]
};
