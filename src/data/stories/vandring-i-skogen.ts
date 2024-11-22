import { Story } from './types';

export const vandringISkogen: Story = {
  id: 'vandring-i-skogen',
  title: 'Vandring i skogen',
  englishTitle: 'Hiking in the Forest',
  difficulty: 'intermediate',
  category: 'nature',
  description: 'Experience the beauty of Swedish nature through a story about hiking in the forest, while learning vocabulary related to nature and outdoor activities.',
  content: [
    { text: 'En', translation: 'A' },
    { text: 'tidig', translation: 'early' },
    { text: 'höstmorgon', translation: 'autumn morning' },
    { text: 'började', translation: 'started' },
    { text: 'Erik', translation: 'Erik' },
    { text: 'sin', translation: 'his' },
    { text: 'vandring', translation: 'hike' },
    { text: 'genom', translation: 'through' },
    { text: 'den', translation: 'the' },
    { text: 'svenska', translation: 'Swedish' },
    { text: 'skogen', translation: 'forest' },
    { text: '.', translation: null },
    { text: 'Luften', translation: 'The air' },
    { text: 'var', translation: 'was' },
    { text: 'krispig', translation: 'crisp' },
    { text: 'och', translation: 'and' },
    { text: 'frisk', translation: 'fresh' },
    { text: '.', translation: null },
    { text: 'Trädens', translation: 'The trees\'' },
    { text: 'löv', translation: 'leaves' },
    { text: 'hade', translation: 'had' },
    { text: 'börjat', translation: 'begun' },
    { text: 'skifta', translation: 'to change' },
    { text: 'färg', translation: 'color' },
    { text: '.', translation: null },
    { text: 'I', translation: 'In' },
    { text: 'sin', translation: 'his' },
    { text: 'ryggsäck', translation: 'backpack' },
    { text: 'hade', translation: 'had' },
    { text: 'han', translation: 'he' },
    { text: 'en', translation: 'a' },
    { text: 'termos', translation: 'thermos' },
    { text: 'med', translation: 'with' },
    { text: 'varmt', translation: 'hot' },
    { text: 'kaffe', translation: 'coffee' },
    { text: 'och', translation: 'and' },
    { text: 'några', translation: 'some' },
    { text: 'smörgåsar', translation: 'sandwiches' },
    { text: '.', translation: null },
    { text: 'Längs', translation: 'Along' },
    { text: 'stigen', translation: 'the path' },
    { text: 'såg', translation: 'saw' },
    { text: 'han', translation: 'he' },
    { text: 'många', translation: 'many' },
    { text: 'svampar', translation: 'mushrooms' },
    { text: 'och', translation: 'and' },
    { text: 'bär', translation: 'berries' },
    { text: '.', translation: null },
    { text: 'Plötsligt', translation: 'Suddenly' },
    { text: 'stannade', translation: 'stopped' },
    { text: 'han', translation: 'he' },
    { text: '.', translation: null },
    { text: 'En', translation: 'A' },
    { text: 'stor', translation: 'large' },
    { text: 'älg', translation: 'moose' },
    { text: 'stod', translation: 'stood' },
    { text: 'stilla', translation: 'still' },
    { text: 'bland', translation: 'among' },
    { text: 'träden', translation: 'the trees' },
    { text: 'och', translation: 'and' },
    { text: 'betade', translation: 'grazed' },
    { text: '.', translation: null },
  ],
  audioUrl: '/audio/vandring-i-skogen.mp3',
  exercises: [
    {
      question: 'Vilken årstid utspelar sig berättelsen i?',
      englishQuestion: 'In which season does the story take place?',
      options: ['Vår (Spring)', 'Sommar (Summer)', 'Höst (Autumn)', 'Vinter (Winter)'],
      correctAnswer: 'Höst (Autumn)'
    },
    {
      question: 'Vad hade Erik i sin ryggsäck?',
      englishQuestion: 'What did Erik have in his backpack?',
      options: [
        'Böcker och pennor (Books and pens)',
        'Kaffe och smörgåsar (Coffee and sandwiches)',
        'Kamera och karta (Camera and map)',
        'Vatten och frukt (Water and fruit)'
      ],
      correctAnswer: 'Kaffe och smörgåsar (Coffee and sandwiches)'
    },
    {
      question: 'Vilket djur såg Erik i skogen?',
      englishQuestion: 'Which animal did Erik see in the forest?',
      options: ['En björn (A bear)', 'En älg (A moose)', 'En räv (A fox)', 'En varg (A wolf)'],
      correctAnswer: 'En älg (A moose)'
    },
    {
      question: 'Vad såg Erik längs stigen?',
      englishQuestion: 'What did Erik see along the path?',
      options: [
        'Blommor och stenar (Flowers and stones)',
        'Svampar och bär (Mushrooms and berries)',
        'Pinnar och löv (Sticks and leaves)',
        'Fåglar och ekorrar (Birds and squirrels)'
      ],
      correctAnswer: 'Svampar och bär (Mushrooms and berries)'
    },
    {
      question: 'Hur beskrivs luften i berättelsen?',
      englishQuestion: 'How is the air described in the story?',
      options: [
        'Varm och fuktig (Warm and humid)',
        'Krispig och frisk (Crisp and fresh)',
        'Kall och regnig (Cold and rainy)',
        'Het och torr (Hot and dry)'
      ],
      correctAnswer: 'Krispig och frisk (Crisp and fresh)'
    }
  ]
};
