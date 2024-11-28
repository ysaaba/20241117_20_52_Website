import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import PronunciationGuide from './PronunciationGuide';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

interface GrammarRule {
  id: string;
  category: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  explanation: string;
  examples: Array<{
    swedish: string;
    english: string;
    notes?: string;
  }>;
  additionalNotes?: string[];
  commonMistakes?: string[];
}

const grammarRules: GrammarRule[] = [
  {
    id: 'word-order-main',
    category: 'Word Order',
    title: 'Main Clause Word Order (V2 Rule)',
    level: 'beginner',
    explanation: 'In Swedish main clauses, the verb must always come in second position (V2 rule). This fundamental rule is crucial for forming correct Swedish sentences.',
    examples: [
      {
        swedish: 'Jag läser boken',
        english: 'I read the book',
        notes: 'Basic order: Subject + Verb + Object'
      },
      {
        swedish: 'Igår läste jag boken',
        english: 'Yesterday I read the book',
        notes: 'Time expression first: Time + Verb + Subject + Object'
      },
      {
        swedish: 'På biblioteket läser studenterna böcker',
        english: 'At the library, the students read books',
        notes: 'Place expression first: Place + Verb + Subject + Object'
      },
      {
        swedish: 'Varje dag dricker hon kaffe',
        english: 'Every day she drinks coffee',
        notes: 'Time phrase first: Time + Verb + Subject + Object'
      }
    ],
    additionalNotes: [
      'The verb must always be in second position',
      'If something other than the subject starts the sentence, the subject must come after the verb',
      'This rule applies to all declarative main clauses',
      'The first position can be filled by any type of phrase (time, place, object, etc.)',
      'In questions, the verb comes first instead of second'
    ],
    commonMistakes: [
      'Putting the verb in third position (*Igår jag läste boken)',
      'Forgetting to invert subject and verb when another element starts the sentence',
      'Applying main clause word order to subordinate clauses'
    ]
  },
  {
    id: 'pronouns',
    category: 'Pronouns',
    title: 'Personal and Possessive Pronouns',
    level: 'beginner',
    explanation: 'Swedish pronouns change form based on their function in the sentence (subject vs. object) and possession.',
    examples: [
      {
        swedish: 'jag → mig → min/mitt/mina',
        english: 'I → me → my/mine',
        notes: 'First person singular'
      },
      {
        swedish: 'du → dig → din/ditt/dina',
        english: 'you → you → your/yours',
        notes: 'Second person singular'
      },
      {
        swedish: 'han → honom → hans',
        english: 'he → him → his',
        notes: 'Third person masculine'
      },
      {
        swedish: 'hon → henne → hennes',
        english: 'she → her → her/hers',
        notes: 'Third person feminine'
      },
      {
        swedish: 'den/det → den/det → dess',
        english: 'it → it → its',
        notes: 'Third person inanimate (en/ett words)'
      }
    ],
    additionalNotes: [
      'Subject pronouns are used for the doer of the action',
      'Object pronouns are used after prepositions and as direct/indirect objects',
      'Possessive pronouns must agree with the noun they modify in gender and number',
      'Some possessive pronouns have different forms for en-words, ett-words, and plural'
    ],
    commonMistakes: [
      'Using subject pronouns after prepositions',
      'Forgetting to match possessive pronouns with noun gender',
      'Using wrong form with reflexive verbs'
    ]
  },
  {
    id: 'verb-groups',
    category: 'Verbs',
    title: 'Verb Groups and Conjugation',
    level: 'beginner',
    explanation: 'Swedish verbs are divided into different groups based on their conjugation patterns. Understanding these groups helps predict how verbs change in different tenses.',
    examples: [
      {
        swedish: 'Group 1: tala → talar → talade → talat',
        english: 'speak → speaks → spoke → spoken',
        notes: '-ar verbs (largest and most regular group)'
      },
      {
        swedish: 'Group 2a: ringa → ringer → ringde → ringt',
        english: 'call → calls → called → called',
        notes: '-er verbs with -de in past'
      },
      {
        swedish: 'Group 2b: köpa → köper → köpte → köpt',
        english: 'buy → buys → bought → bought',
        notes: '-er verbs with -te in past'
      },
      {
        swedish: 'Group 3: bo → bor → bodde → bott',
        english: 'live → lives → lived → lived',
        notes: 'Short verbs with -r in present'
      },
      {
        swedish: 'Group 4: skriva → skriver → skrev → skrivit',
        english: 'write → writes → wrote → written',
        notes: 'Strong/irregular verbs'
      }
    ],
    additionalNotes: [
      'Most new verbs follow Group 1 pattern',
      'Present tense is used for both simple present and present continuous',
      'Past participle is used with har/hade for perfect tenses',
      'Supine form (perfect participle) ends in -t or -it',
      'Some common verbs are irregular and must be memorized'
    ],
    commonMistakes: [
      'Applying Group 1 pattern to all verbs',
      'Using wrong past tense form',
      'Forgetting to change stem in strong verbs'
    ]
  },
  {
    id: 'adjective-declension',
    category: 'Adjectives',
    title: 'Adjective Declension and Agreement',
    level: 'intermediate',
    explanation: 'Swedish adjectives change form based on the gender (en/ett), number (singular/plural), and definiteness of the noun they modify. This complex system follows specific patterns.',
    examples: [
      {
        swedish: 'en grön bil → den gröna bilen',
        english: 'a green car → the green car',
        notes: 'en-word: Basic form → Definite form'
      },
      {
        swedish: 'ett grönt hus → det gröna huset',
        english: 'a green house → the green house',
        notes: 'ett-word: T-form → Definite form'
      },
      {
        swedish: 'gröna bilar → de gröna bilarna',
        english: 'green cars → the green cars',
        notes: 'Plural: Same form for definite/indefinite'
      },
      {
        swedish: 'Den nya röda bilen är snabb',
        english: 'The new red car is fast',
        notes: 'Multiple adjectives: All take definite form'
      }
    ],
    additionalNotes: [
      'Basic form: Used with indefinite en-words',
      'T-form: Used with indefinite ett-words',
      'A-form: Used with definite nouns and plurals',
      'Predicate adjectives agree with subject',
      'Some adjectives are irregular',
      'Nationality adjectives dont take -a in plural'
    ],
    commonMistakes: [
      'Forgetting to add -t with ett-words',
      'Using basic form with definite nouns',
      'Wrong form in predicative position',
      'Mixing up forms with multiple adjectives'
    ]
  },
  {
    id: 'articles-and-determiners',
    category: 'Articles',
    title: 'Articles and Determiners',
    level: 'beginner',
    explanation: 'Swedish uses both indefinite articles (en/ett) and definite suffixes (-en/-et) to mark nouns. The choice depends on the nouns gender and whether its specific or general.',
    examples: [
      {
        swedish: 'en bok → boken',
        english: 'a book → the book',
        notes: 'en-word singular'
      },
      {
        swedish: 'ett bord → bordet',
        english: 'a table → the table',
        notes: 'ett-word singular'
      },
      {
        swedish: 'böcker → böckerna',
        english: 'books → the books',
        notes: 'Plural forms'
      },
      {
        swedish: 'den här boken',
        english: 'this book',
        notes: 'Demonstrative + definite'
      }
    ],
    additionalNotes: [
      'En/ett must match the nouns gender',
      'Definite form adds suffix to the noun',
      'Double definiteness with demonstratives',
      'Some nouns only use definite form',
      'Generic statements often use definite form'
    ],
    commonMistakes: [
      'Using wrong gender article',
      'Forgetting double definiteness',
      'Using definite form with possessives',
      'Wrong plural definite ending'
    ]
  },
  {
    id: 'prepositions-location',
    category: 'Prepositions',
    title: '1. Location Prepositions (På, I, Vid)',
    level: 'beginner',
    explanation: 'Location prepositions in Swedish indicate where something or someone is. The most common ones are "på" (on/at) and "i" (in). The choice between them follows specific patterns that often differ from English.',
    examples: [
      {
        swedish: 'Boken ligger på bordet',
        english: 'The book is on the table',
        notes: 'på = on (for surfaces)'
      },
      {
        swedish: 'Kläderna är i lådan',
        english: 'The clothes are in the drawer',
        notes: 'i = in (for containers/enclosed spaces)'
      },
      {
        swedish: 'Tavlan hänger på väggen',
        english: 'The painting hangs on the wall',
        notes: 'på = on (for vertical surfaces)'
      },
      {
        swedish: 'Han bor i Stockholm',
        english: 'He lives in Stockholm',
        notes: 'i = in (for cities)'
      },
      {
        swedish: 'Hon bor på Kungsgatan',
        english: 'She lives on Kungsgatan',
        notes: 'på = on (for streets)'
      }
    ],
    additionalNotes: [
      'Use på for:',
      '- Surfaces (bordet, golvet)',
      '- Streets (Kungsgatan)',
      '- Islands (Gotland)',
      '- Some institutions (universitet, sjukhuset)',
      
      'Use i for:',
      '- Enclosed spaces (rummet, huset)',
      '- Cities and countries (Stockholm, Sverige)',
      '- Containers (lådan, väskan)',
      
      'Use vid/bredvid for:',
      '- Proximity ("by/near")',
      '- Next to something'
    ],
    commonMistakes: [
      'Using i instead of på for streets (wrong: *i Kungsgatan)',
      'Using på instead of i for cities (wrong: *på Stockholm)',
      'Forgetting to use på with islands (should be: på Gotland)',
      'Using wrong preposition with buildings/institutions'
    ]
  },
  {
    id: 'prepositions-movement',
    category: 'Prepositions',
    title: '2. Movement Prepositions (Till, Från, Genom)',
    level: 'beginner',
    explanation: 'Movement prepositions show direction and motion. They indicate where something or someone is moving to, from, or through.',
    examples: [
      {
        swedish: 'Vi går till parken',
        english: 'We are going to the park',
        notes: 'till = to (direction towards)'
      },
      {
        swedish: 'Han springer från huset',
        english: 'He runs from the house',
        notes: 'från = from (direction away)'
      },
      {
        swedish: 'De åker genom tunneln',
        english: 'They drive through the tunnel',
        notes: 'genom = through'
      },
      {
        swedish: 'Hon går förbi affären',
        english: 'She walks past the store',
        notes: 'förbi = past'
      }
    ],
    additionalNotes: [
      'Common movement prepositions:',
      '- till: to (destination)',
      '- från: from (origin)',
      '- genom/igenom: through',
      '- förbi: past',
      '- mot: towards',
      '- över: across/over',
      
      'Special cases:',
      '- Use till for destinations',
      '- Use från for starting points',
      '- genom can be either genom or igenom'
    ],
    commonMistakes: [
      'Using i or på instead of till for movement',
      'Forgetting the preposition with motion verbs',
      'Using wrong preposition with transportation (åka med buss, not *åka i buss)'
    ]
  },
  {
    id: 'prepositions-time',
    category: 'Prepositions',
    title: '3. Time Prepositions (På, I, Om)',
    level: 'beginner',
    explanation: 'Time prepositions in Swedish follow specific patterns depending on whether you are talking about days, months, years, or general time expressions.',
    examples: [
      {
        swedish: 'Vi ses på måndag',
        english: 'See you on Monday',
        notes: 'på = on (for days)'
      },
      {
        swedish: 'Han kommer i december',
        english: 'He comes in December',
        notes: 'i = in (for months)'
      },
      {
        swedish: 'Mötet börjar om en timme',
        english: 'The meeting starts in an hour',
        notes: 'om = in (future time)'
      },
      {
        swedish: 'De träffades under sommaren',
        english: 'They met during the summer',
        notes: 'under = during'
      }
    ],
    additionalNotes: [
      'Use på for:',
      '- Days of the week (på måndag)',
      '- Times of day (på morgonen)',
      '- Dates (på fredag den 13:e)',
      
      'Use i for:',
      '- Months (i december)',
      '- Years (i 2024)',
      '- Seasons (i sommar - when future)',
      
      'Use om for:',
      '- Future time (om en timme)',
      '- Regular intervals (om dagarna)',
      
      'Use under for:',
      '- Duration (under dagen)',
      '- Past events (under sommaren)'
    ],
    commonMistakes: [
      'Using i instead of på for days',
      'Using på instead of i for months',
      'Confusing om and i for future expressions',
      'Forgetting prepositions in time expressions'
    ]
  },
  {
    id: 'prepositions-verb-combinations',
    category: 'Prepositions',
    title: '4. Common Verb + Preposition Combinations',
    level: 'beginner',
    explanation: 'Many Swedish verbs require specific prepositions that might differ from their English counterparts. These combinations often need to be memorized.',
    examples: [
      {
        swedish: 'Jag lyssnar på musik',
        english: 'I listen to music',
        notes: 'lyssna på = listen to'
      },
      {
        swedish: 'Hon tänker på sommaren',
        english: 'She thinks about summer',
        notes: 'tänka på = think about'
      },
      {
        swedish: 'Vi pratar om vädret',
        english: 'We talk about the weather',
        notes: 'prata om = talk about'
      },
      {
        swedish: 'De väntar på bussen',
        english: 'They wait for the bus',
        notes: 'vänta på = wait for'
      }
    ],
    additionalNotes: [
      'Common combinations:',
      '- tänka på (think about)',
      '- prata om (talk about)',
      '- titta på (look at)',
      '- lyssna på (listen to)',
      '- vänta på (wait for)',
      '- bry sig om (care about)',
      '- tro på (believe in)',
      '- skratta åt (laugh at)',
      
      'Tips for learning:',
      '- Learn verbs together with their prepositions',
      '- Practice with common phrases',
      '- Notice patterns (many verbs use på)'
    ],
    commonMistakes: [
      'Omitting required prepositions',
      'Using English preposition patterns',
      'Mixing up om and på with different verbs',
      'Forgetting that some verbs need no preposition in Swedish'
    ]
  },
  {
    id: 'numbers-time',
    category: 'Numbers and Time',
    title: 'Numbers, Time, and Date Expressions',
    level: 'beginner',
    explanation: 'Swedish has specific patterns for expressing numbers, time, and dates. Numbers follow regular patterns with some exceptions for common numbers.',
    examples: [
      {
        swedish: 'Klockan r tre och kvart',
        english: 'It\'s quarter past three',
        notes: 'Time expression'
      },
      {
        swedish: 'Den tredje maj',
        english: 'The third of May',
        notes: 'Date with ordinal number'
      },
      {
        swedish: 'tjugoett, tjugotvå, tjugotre',
        english: 'twenty-one, twenty-two, twenty-three',
        notes: 'Numbers 21-29'
      }
    ],
    additionalNotes: [
      'Numbers 1-12 are irregular',
      'Time is expressed using 24-hour clock',
      'Dates use ordinal numbers',
      'Years are read as hundreds'
    ],
    commonMistakes: [
      'Wrong ordinal number form in dates',
      'Incorrect time expressions',
      'Mixing up number patterns'
    ]
  },
  {
    id: 'modal-verbs',
    category: 'Verbs',
    title: 'Modal Verbs and Auxiliaries',
    level: 'intermediate',
    explanation: 'Modal verbs modify the meaning of main verbs to express ability, possibility, permission, or obligation. They follow special patterns in Swedish.',
    examples: [
      {
        swedish: 'Jag kan simma',
        english: 'I can swim',
        notes: 'kan = ability/possibility'
      },
      {
        swedish: 'Du måste göra läxorna',
        english: 'You must do the homework',
        notes: 'måste = necessity/obligation'
      },
      {
        swedish: 'Vi ska åka imorgon',
        english: 'We will/shall go tomorrow',
        notes: 'ska = future intention'
      },
      {
        swedish: 'Hon vill lära sig svenska',
        english: 'She wants to learn Swedish',
        notes: 'vill = want to'
      }
    ],
    additionalNotes: [
      'Common modals: kan, måste, ska, vill, får, bör',
      'Modal + infinitive without "att"',
      'Some modals are irregular',
      'Different meanings in different contexts'
    ],
    commonMistakes: [
      'Adding "att" after modal verbs',
      'Wrong word order with modals',
      'Confusing similar modals'
    ]
  },
  {
    id: 'relative-clauses',
    category: 'Sentence Structure',
    title: 'Relative Clauses',
    level: 'intermediate',
    explanation: 'Relative clauses provide additional information about a noun using relative pronouns som, vilket, vars. They follow specific word order rules.',
    examples: [
      {
        swedish: 'Mannen som bor här är lärare',
        english: 'The man who lives here is a teacher',
        notes: 'som = who/which/that'
      },
      {
        swedish: 'Boken, vilket jag läste igår, var bra',
        english: 'The book, which I read yesterday, was good',
        notes: 'vilket = which (referring to whole clause)'
      },
      {
        swedish: 'Flickan vars katt sprang bort',
        english: 'The girl whose cat ran away',
        notes: 'vars = whose'
      }
    ],
    additionalNotes: [
      'Som is most common relative pronoun',
      'Vilket used for whole clauses',
      'Vars shows possession',
      'Subject-verb inversion applies'
    ],
    commonMistakes: [
      'Wrong relative pronoun choice',
      'Incorrect word order',
      'Forgetting som in subject position'
    ]
  },
  {
    id: 'passive-voice',
    category: 'Verbs',
    title: 'Passive Voice',
    level: 'advanced',
    explanation: 'Swedish has two ways to form passive voice: -s form and bli + past participle. Each has specific uses and connotations.',
    examples: [
      {
        swedish: 'Boken läses av många',
        english: 'The book is read by many',
        notes: 'S-passive (general/habitual)'
      },
      {
        swedish: 'Huset blir byggt i år',
        english: 'The house is being built this year',
        notes: 'Bli-passive (specific action/change)'
      },
      {
        swedish: 'Dörren öppnades',
        english: 'The door was opened',
        notes: 'S-passive past tense'
      }
    ],
    additionalNotes: [
      'S-passive more common in writing',
      'Bli-passive emphasizes change',
      'Some verbs prefer one form',
      'Can combine with modals'
    ],
    commonMistakes: [
      'Wrong passive form choice',
      'Incorrect verb conjugation',
      'Overuse of passive voice'
    ]
  },
  {
    id: 'conjunctions',
    category: 'Sentence Structure',
    title: 'Coordinating and Subordinating Conjunctions',
    level: 'intermediate',
    explanation: 'Conjunctions connect words, phrases, or clauses. Coordinating conjunctions join similar elements, while subordinating conjunctions create dependent clauses.',
    examples: [
      {
        swedish: 'Hon sjunger och dansar',
        english: 'She sings and dances',
        notes: 'och = and (coordinating)'
      },
      {
        swedish: 'Jag stannar hemma eftersom det regnar',
        english: 'I\'m staying home because it\'s raining',
        notes: 'eftersom = because (subordinating)'
      },
      {
        swedish: 'Antingen kommer han eller ringer han',
        english: 'Either he\'ll come or he\'ll call',
        notes: 'antingen...eller = either...or'
      }
    ],
    additionalNotes: [
      'Common coordinators: och, eller, men, för',
      'Common subordinators: att, när, om, eftersom',
      'Affects word order differently',
      'Can create complex sentences'
    ],
    commonMistakes: [
      'Wrong conjunction type',
      'Incorrect word order after conjunction',
      'Missing necessary conjunctions'
    ]
  }
];

interface Props {
  selectedLevel?: 'beginner' | 'intermediate' | 'advanced';
}

interface TableData {
  headers: string[];
  rows: string[][];
}

interface VisualizationData {
  type: 'table' | 'tree' | 'flowchart';
  title: string;
  data: TableData | any;
}

const grammarVisualizations: Record<string, VisualizationData[]> = {
  'verb-groups': [
    {
      type: 'table',
      title: 'Verb Conjugation Patterns',
      data: {
        headers: ['Group', 'Infinitive', 'Present', 'Past', 'Supine', 'Example'],
        rows: [
          ['1', '-a', '-ar', '-ade', '-at', 'tala → talar → talade → talat'],
          ['2a', '-a', '-er', '-de', '-t', 'ringa → ringer → ringde → ringt'],
          ['2b', '-a', '-er', '-te', '-t', 'köpa → köper → köpte → köpt'],
          ['3', '-', '-r', '-dde', '-tt', 'bo → bor → bodde → bott'],
          ['4', '-a', '-er', 'irregular', '-it', 'skriva → skriver → skrev → skrivit']
        ]
      }
    }
  ],
  'pronouns': [
    {
      type: 'table',
      title: 'Personal Pronouns',
      data: {
        headers: ['Person', 'Subject', 'Object', 'Possessive (en)', 'Possessive (ett)', 'Possessive (pl)'],
        rows: [
          ['1sg', 'jag', 'mig', 'min', 'mitt', 'mina'],
          ['2sg', 'du', 'dig', 'din', 'ditt', 'dina'],
          ['3sg (m)', 'han', 'honom', 'hans', 'hans', 'hans'],
          ['3sg (f)', 'hon', 'henne', 'hennes', 'hennes', 'hennes'],
          ['3sg (n)', 'den/det', 'den/det', 'dess', 'dess', 'dess'],
          ['1pl', 'vi', 'oss', 'vår', 'vårt', 'våra'],
          ['2pl', 'ni', 'er', 'er', 'ert', 'era'],
          ['3pl', 'de', 'dem', 'deras', 'deras', 'deras']
        ]
      }
    }
  ],
  'adjective-declension': [
    {
      type: 'table',
      title: 'Adjective Forms',
      data: {
        headers: ['Type', 'En-word', 'Ett-word', 'Plural', 'Definite'],
        rows: [
          ['Basic', 'grön', 'grönt', 'gröna', 'gröna'],
          ['With -a', 'gamla', 'gamla', 'gamla', 'gamla'],
          ['With -e', 'lille', 'lilla', 'små', 'lilla'],
          ['Irregular', 'god', 'gott', 'goda', 'goda']
        ]
      }
    }
  ]
};

const GrammarExplanations: React.FC<Props> = ({ selectedLevel }) => {
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [activeLevel, setActiveLevel] = useState<string | null>(selectedLevel || null);
  const levels: Array<'beginner' | 'intermediate' | 'advanced'> = ['beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    // Load ResponsiveVoice script
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=u9E3wZGX';
    script.async = true;
    script.onload = () => setVoiceReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
    };
  }, []);

  const filteredRules = grammarRules
    .filter(rule => !activeLevel || rule.level === activeLevel)
    .filter(rule => !selectedCategory || rule.category === selectedCategory);

  const availableCategories = Array.from(
    new Set(
      (activeLevel 
        ? grammarRules.filter(rule => rule.level === activeLevel)
        : grammarRules
      ).map(rule => rule.category)
    )
  );

  const handleExampleClick = (swedish: string) => {
    if (voiceReady && window.responsiveVoice) {
      window.responsiveVoice.speak(swedish, 'Swedish Male', {
        pitch: 1,
        rate: 0.9,
        volume: 1
      });
    }
  };

  const renderTable = (tableData: TableData) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 my-4">
        <thead className="bg-gray-50">
          <tr>
            {tableData.headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderVisualizations = (ruleId: string) => {
    const visualizations = grammarVisualizations[ruleId];
    if (!visualizations) return null;

    return (
      <div className="mt-6 space-y-6">
        {visualizations.map((viz, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">{viz.title}</h4>
            {viz.type === 'table' && renderTable(viz.data)}
            {/* Add other visualization types here */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex flex-col gap-4">
          <ToggleGroup
            className="w-full"
            type="single"
            variant="solid"
            value={activeLevel ? [activeLevel] : []}
            onValueChange={(value) => {
              const level = value[0] as 'beginner' | 'intermediate' | 'advanced' | undefined;
              setActiveLevel(level || null);
              setSelectedCategory(null);
            }}
          >
            {levels.map(level => (
              <ToggleGroupItem
                key={level}
                value={level}
                className="capitalize"
              >
                {level}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <ToggleGroup
            className="w-full"
            type="single"
            variant="solid"
            value={selectedCategory ? [selectedCategory] : []}
            onValueChange={(value) => {
              const category = value.length ? value[0] : null;
              setSelectedCategory(category);
            }}
          >
            {availableCategories.map(category => (
              <ToggleGroupItem
                key={category}
                value={category}
              >
                {category}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowPronunciation(!showPronunciation)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {showPronunciation ? 'Hide Pronunciation Guide' : 'Show Pronunciation Guide'}
          </button>
        </div>
      </div>

      {showPronunciation && (
        <div className="mb-8">
          <PronunciationGuide onClose={() => setShowPronunciation(false)} />
        </div>
      )}

      <div className="space-y-6">
        {filteredRules.map(rule => (
          <div
            key={rule.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 bg-white"
            >
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-medium text-gray-900">{rule.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant={
                      rule.level === 'beginner' ? 'green' :
                      rule.level === 'intermediate' ? 'yellow' :
                      'red'
                    }
                    size="sm"
                  >
                    {rule.level}
                  </Badge>
                  <Badge variant="blue" size="sm" className="capitalize">
                    {rule.category}
                  </Badge>
                </div>
              </div>
              {expandedRule === rule.id ? <ChevronUp /> : <ChevronDown />}
            </button>

            {expandedRule === rule.id && (
              <div className="px-6 pb-4">
                <p className="text-gray-700 mb-4">{rule.explanation}</p>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Examples:</h4>
                  {rule.examples.map((example, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-md p-3 border border-gray-200"
                    >
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-green-600">{example.swedish}</p>
                        <button
                          onClick={() => handleExampleClick(example.swedish)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Volume2 className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-gray-600">{example.english}</p>
                      {example.notes && (
                        <p className="text-sm text-gray-500 mt-1">{example.notes}</p>
                      )}
                    </div>
                  ))}
                </div>

                {renderVisualizations(rule.id)}

                {rule.additionalNotes && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Points:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {rule.additionalNotes.map((note, index) => (
                        <li key={index} className="text-gray-700">{note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {rule.commonMistakes && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Common Mistakes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-red-600">
                      {rule.commonMistakes.map((mistake, index) => (
                        <li key={index}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrammarExplanations;
