import { Story } from './types';

export const vandringISkogen: Story = {
  id: 'vandring-i-skogen',
  title: 'Vandring i skogen',
  englishTitle: 'Hiking in the Forest',
  difficulty: 'intermediate',
  category: 'nature',
  description: 'Join a Swedish forest adventure while learning nature-related vocabulary and expressions.',
  content: [
    { text: 'Erik', translation: 'Erik' },
    { text: 'och', translation: 'and' },
    { text: 'Maria', translation: 'Maria' },
    { text: 'går', translation: 'go' },
    { text: 'på', translation: 'on' },
    { text: 'en', translation: 'a' },
    { text: 'vandring', translation: 'hike' },
    { text: 'i', translation: 'in' },
    { text: 'den', translation: 'the' },
    { text: 'svenska', translation: 'Swedish' },
    { text: 'skogen.', translation: 'forest.' },
    { text: 'Luften', translation: 'The air' },
    { text: 'är', translation: 'is' },
    { text: 'frisk', translation: 'fresh' },
    { text: 'och', translation: 'and' },
    { text: 'ren.', translation: 'clean.' },
    { text: 'De', translation: 'They' },
    { text: 'ser', translation: 'see' },
    { text: 'många', translation: 'many' },
    { text: 'vilda', translation: 'wild' },
    { text: 'bär,', translation: 'berries,' },
    { text: 'svampar,', translation: 'mushrooms,' },
    { text: 'och', translation: 'and' },
    { text: 'blommor.', translation: 'flowers.' },
    { text: 'En', translation: 'A' },
    { text: 'älg', translation: 'moose' },
    { text: 'står', translation: 'stands' },
    { text: 'stilla', translation: 'still' },
    { text: 'mellan', translation: 'between' },
    { text: 'träden.', translation: 'the trees.' },
    { text: 'De', translation: 'They' },
    { text: 'plockar', translation: 'pick' },
    { text: 'blåbär', translation: 'blueberries' },
    { text: 'och', translation: 'and' },
    { text: 'lingon.', translation: 'lingonberries.' },
    { text: 'Solen', translation: 'The sun' },
    { text: 'skiner', translation: 'shines' },
    { text: 'genom', translation: 'through' },
    { text: 'granarna.', translation: 'the spruce trees.' }
  ],
  audioUrl: '/audio/vandring-i-skogen.mp3',
  exercises: [
    {
      question: 'Var går Erik och Maria?',
      englishQuestion: 'Where do Erik and Maria go?',
      options: ['I staden (In the city)', 'I skogen (In the forest)', 'På stranden (On the beach)', 'I parken (In the park)'],
      correctAnswer: 'I skogen (In the forest)'
    },
    {
      question: 'Vilket djur ser de?',
      englishQuestion: 'Which animal do they see?',
      options: ['En björn (A bear)', 'En älg (A moose)', 'En räv (A fox)', 'En varg (A wolf)'],
      correctAnswer: 'En älg (A moose)'
    },
    {
      question: 'Vilka bär plockar de?',
      englishQuestion: 'What berries do they pick?',
      options: ['Hallon och jordgubbar (Raspberries and strawberries)', 'Blåbär och lingon (Blueberries and lingonberries)', 'Vinbär och krusbär (Currants and gooseberries)', 'Björnbär och hallon (Blackberries and raspberries)'],
      correctAnswer: 'Blåbär och lingon (Blueberries and lingonberries)'
    },
    {
      question: 'Hur beskrivs luften i skogen?',
      englishQuestion: 'How is the air in the forest described?',
      options: ['Varm och fuktig (Warm and humid)', 'Frisk och ren (Fresh and clean)', 'Kall och rå (Cold and raw)', 'Tung och kvav (Heavy and stuffy)'],
      correctAnswer: 'Frisk och ren (Fresh and clean)'
    }
  ]
};
