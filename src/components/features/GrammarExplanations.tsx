import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import PronunciationGuide from './PronunciationGuide';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';

declare global {
  interface Window {
    responsiveVoice: {
      speak: (text: string, voice: string, options?: object | undefined) => void;
      isPlaying: () => boolean;
      cancel: () => void;
      voiceSupport: () => boolean;
      init: () => void;
    };
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
  proTips?: string[];
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
    ],
    proTips: [
      'Practice by starting sentences with different elements (time, place, object) to get comfortable with inversion',
      'Remember that "verb second" means position, not necessarily the second word',
      'When in doubt, identify the verb first and ensure it\'s in position two',
      'Think of the first position as one unit, even if it contains multiple words'
    ]
  },
  {
    id: 'future-tense',
    category: 'Tenses',
    title: 'Future Tense: Kommer att vs. Ska',
    level: 'intermediate',
    explanation: 'Swedish uses two main constructions to express future events: "kommer att" and "ska". While both indicate future actions, they have subtle differences in usage and implication.',
    examples: [
      {
        swedish: 'Jag kommer att resa till Sverige nästa år.',
        english: 'I will travel to Sweden next year.',
        notes: 'Neutral statement about a future plan'
      },
      {
        swedish: 'Jag ska resa till Sverige nästa år.',
        english: 'I am going to travel to Sweden next year.',
        notes: 'Implies a decision or intention'
      },
      {
        swedish: 'Det kommer att regna imorgon.',
        english: 'It will rain tomorrow.',
        notes: 'Prediction based on facts or evidence'
      },
      {
        swedish: 'Jag ska lära mig svenska.',
        english: 'I am going to learn Swedish.',
        notes: 'Expresses a personal intention or promise'
      }
    ],
    additionalNotes: [
      '"Kommer att" is more neutral and often used for predictions or statements about the future',
      '"Ska" implies intention, decision, or promise',
      '"Ska" can also be used for scheduled events or instructions',
      'In some cases, the simple present tense can also express future actions in Swedish'
    ],
    commonMistakes: [
      'Using "kommer att" for personal intentions or promises',
      'Using "ska" for neutral predictions about the future',
      'Confusing "ska" (future) with "skulle" (conditional)'
    ],
    proTips: [
      'Use "kommer att" when talking about weather predictions or other neutral future events',
      'Use "ska" when making promises or expressing personal plans',
      'Listen to native speakers to get a feel for when each form is more natural',
      'Remember that the present tense can often replace both forms for scheduled events'
    ]
  },
  {
    id: 'adverbs',
    category: 'Adverbs',
    title: 'Adverbs and Adverbial Phrases (Adverb och adverbial)',
    level: 'intermediate',
    explanation: 'Swedish adverbs modify verbs, adjectives, or other adverbs. Their placement follows strict rules depending on the clause type. Some adverbs, especially modal adverbs like "kanske" and "nog", can affect word order or add subtle meanings to sentences.',
    examples: [
      {
        swedish: 'Han springer snabbt',
        english: 'He runs quickly',
        notes: 'Manner adverb after verb in main clause'
      },
      {
        swedish: 'Jag vet att hon ofta läser',
        english: 'I know that she often reads',
        notes: 'Time adverb before verb in subordinate clause'
      },
      {
        swedish: 'Kanske kommer hon imorgon',
        english: 'Maybe she\'ll come tomorrow',
        notes: 'Modal adverb affecting word order'
      },
      {
        swedish: 'Det är ju så',
        english: 'That\'s how it is (as we know)',
        notes: 'Modal particle adding shared knowledge'
      },
      {
        swedish: 'Hon är väldigt duktig',
        english: 'She is very skilled',
        notes: 'Degree adverb modifying adjective'
      },
      {
        swedish: 'De bor någonstans här i närheten',
        english: 'They live somewhere around here',
        notes: 'Complex adverbial phrase of place'
      }
    ],
    additionalNotes: [
      'Adverb placement differs in main and subordinate clauses',
      'Modal adverbs can affect sentence structure',
      'Some adverbs have special positions (ju, väl, nog)',
      'Time adverbs can often start sentences',
      'Multiple adverbs follow specific order patterns',
      'Many adjectives can function as adverbs'
    ],
    commonMistakes: [
      'Wrong adverb placement in different clause types',
      'Incorrect order with multiple adverbs',
      'Using adjective form instead of adverb form',
      'Misplacing modal particles like "ju" and "väl"',
      'Wrong word order after "kanske"',
      'Confusing similar adverbs (fort/snabbt)'
    ],
    proTips: [
      'Learn BIFF rule for subordinate clauses',
      'Practice with modal particles in conversation',
      'Notice how natives use adverbs for emphasis',
      'Pay attention to adverb order with multiple adverbs',
      'Learn common adverbial phrases as units'
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
    ],
    proTips: [
      'Create memory aids by grouping pronouns by person (first, second, third)',
      'Practice with common phrases to internalize preposition + pronoun combinations',
      'Pay attention to the gender of nouns when using possessive pronouns',
      'Learn reflexive pronouns alongside regular pronouns as they often work together'
    ]
  },
  {
    id: 'subjunctive-mood',
    category: 'Verbs',
    title: 'The Subjunctive Mood',
    level: 'advanced',
    explanation: 'The subjunctive mood in Swedish is used to express wishes, hypothetical situations, or doubt. It is relatively rare in modern Swedish but still appears in certain fixed expressions and formal language.',
    examples: [
      {
        swedish: 'Leve kungen!',
        english: 'Long live the king!',
        notes: 'Fixed expression using subjunctive'
      },
      {
        swedish: 'Om jag vore rik...',
        english: 'If I were rich...',
        notes: 'Hypothetical situation using subjunctive form of "vara"'
      },
      {
        swedish: 'Må det gå dig väl.',
        english: 'May it go well for you.',
        notes: 'Expressing a wish using subjunctive'
      }
    ],
    additionalNotes: [
      'The subjunctive is formed by modifying the stem of the verb',
      'It is more common in older texts and formal language',
      'Many subjunctive forms have been replaced by other constructions in modern Swedish'
    ],
    commonMistakes: [
      'Overusing the subjunctive in contexts where it#s not necessary',
      'Confusing subjunctive forms with imperative or present tense forms',
      'Failing to recognize subjunctive in fixed expressions'
    ],
    proTips: [
      'Learn the most common fixed expressions that use the subjunctive',
      'Practice with hypothetical situations to get a feel for the subjunctive',
      'Pay attention to verb conjugation in formal or old texts',
      'Remember that the subjunctive is not as common as other moods in modern Swedish'
    ]
  },
  {
    id: 'conditional-mood',
    category: 'Verbs',
    title: 'The Conditional Mood',
    level: 'advanced',
    explanation: 'The conditional mood in Swedish is used to express hypothetical situations or actions. It is formed using the auxiliary verb "skulle" followed by the infinitive form of the main verb.',
    examples: [
      {
        swedish: 'Jag skulle resa om jag hade pengar.',
        english: 'I would travel if I had money.',
        notes: 'Basic conditional structure'
      },
      {
        swedish: 'Hon skulle ha kommit om hon vetat.',
        english: 'She would have come if she had known.',
        notes: 'Past conditional'
      },
      {
        swedish: 'Vi skulle kunna göra det imorgon.',
        english: 'We could do it tomorrow.',
        notes: 'Conditional with modal verb'
      }
    ],
    additionalNotes: [
      'The conditional is often used in "if" clauses',
      'It can express politeness or soften requests',
      'The past conditional uses "skulle ha" + supine form'
    ],
    commonMistakes: [
      'Confusing "skulle" with "skola" (shall/will)',
      'Using present tense instead of infinitive after "skulle"',
      'Forgetting to use "ha" in past conditional constructions'
    ],
    proTips: [
      'Practice with "if" clauses to get a feel for the conditional',
      'Use the conditional to express politeness or make requests',
      'Pay attention to verb conjugation in conditional sentences',
      'Remember that the past conditional is used for hypothetical past situations'
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
    ],
    proTips: [
      'Learn the most common verb groups and their patterns',
      'Practice with verb conjugation in different tenses',
      'Pay attention to verb stems and endings',
      'Remember that some verbs are irregular and must be memorized'
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
    ],
    proTips: [
      'Practice with adjective declension in different contexts',
      'Pay attention to noun gender and number',
      'Learn the most common adjective forms and patterns',
      'Remember that some adjectives are irregular'
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
    ],
    proTips: [
      'Practice with indefinite and definite articles',
      'Pay attention to noun gender and number',
      'Learn the most common article forms and patterns',
      'Remember that some nouns only use definite form'
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
    ],
    proTips: [
      'Practice with location prepositions in different contexts',
      'Pay attention to the type of location (surface, container, city, etc.)',
      'Learn the most common preposition forms and patterns',
      'Remember that some prepositions have multiple uses'
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
    ],
    proTips: [
      'Practice with movement prepositions in different contexts',
      'Pay attention to the direction of motion',
      'Learn the most common preposition forms and patterns',
      'Remember that some prepositions have multiple uses'
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
    ],
    proTips: [
      'Practice with time prepositions in different contexts',
      'Pay attention to the type of time expression (day, month, year, etc.)',
      'Learn the most common preposition forms and patterns',
      'Remember that some prepositions have multiple uses'
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
    ],
    proTips: [
      'Practice with verb + preposition combinations in different contexts',
      'Pay attention to the verb and its required preposition',
      'Learn the most common combinations and patterns',
      'Remember that some verbs have multiple prepositions'
    ]
  },
  {
    id: 'numbers-and-time',
    category: 'Numbers and Time',
    title: 'Numbers, Time, and Date Expressions',
    level: 'beginner',
    explanation: 'Swedish numbers follow regular patterns with some exceptions for common numbers. Time expressions use the 24-hour clock, and dates use ordinal numbers. Understanding these patterns is essential for everyday communication.',
    examples: [
      {
        swedish: 'Klockan är kvart över tre (15:15)',
        english: 'It\'s quarter past three',
        notes: 'Time expression with minutes'
      },
      {
        swedish: 'Den tredje maj tjugohundratjugotre',
        english: 'The third of May 2023',
        notes: 'Date with ordinal number and year'
      },
      {
        swedish: 'Trettiotvå komma fem procent',
        english: 'Thirty-two point five percent',
        notes: 'Decimal numbers and percentages'
      },
      {
        swedish: 'För det första... för det andra...',
        english: 'Firstly... secondly...',
        notes: 'Ordinal numbers in expressions'
      },
      {
        swedish: 'Hundratals människor kom',
        english: 'Hundreds of people came',
        notes: 'Approximate quantities'
      },
      {
        swedish: 'En och en halv timme',
        english: 'One and a half hours',
        notes: 'Fractions and time'
      }
    ],
    additionalNotes: [
      'Numbers 1-12 have irregular forms',
      'Compound numbers are written as one word (tjugofem)',
      'Years are typically read as hundreds (nittonhundraåttioett)',
      'Time uses 24-hour clock in formal contexts',
      'Ordinal numbers are used for dates and lists',
      'Decimal numbers use comma instead of point',
      'Thousands are marked with space, not comma',
      'Special forms exist for groups (dussin, par, tjog)'
    ],
    commonMistakes: [
      'Using wrong ordinal number form in dates',
      'Incorrect compound number formation',
      'Mixing up time expressions (half/quarter)',
      'Wrong decimal separator (point vs comma)',
      'Incorrect placement of units with numbers',
      'Forgetting gender agreement with numbers'
    ],
    proTips: [
      'Learn numbers in meaningful chunks (1-10, 11-19, tens)',
      'Practice telling time in both 12 and 24-hour formats',
      'Remember common quantity expressions',
      'Pay attention to number gender with en/ett words',
      'Learn ordinal numbers alongside cardinal numbers'
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
    ],
    proTips: [
      'Practice with modal verbs in different contexts',
      'Pay attention to the modal verb and its meaning',
      'Learn the most common modal forms and patterns',
      'Remember that some modals are irregular'
    ]
  },
  {
    id: 'relative-clauses',
    category: 'Sentence Structure',
    title: 'Relative Clauses (Bisatser)',
    level: 'intermediate',
    explanation: 'Relative clauses in Swedish provide additional information about a noun using relative pronouns. They follow specific word order rules (BIFF rule: I Bisats kommer Inte Före Finita verbet) and can be either defining (essential information) or non-defining (extra information).',
    examples: [
      {
        swedish: 'Mannen som arbetar här är min bror',
        english: 'The man who works here is my brother',
        notes: 'Defining clause with som as subject'
      },
      {
        swedish: 'Boken, vilken jag köpte igår, är intressant',
        english: 'The book, which I bought yesterday, is interesting',
        notes: 'Non-defining clause with vilken'
      },
      {
        swedish: 'Huset där jag växte upp ligger i Stockholm',
        english: 'The house where I grew up is in Stockholm',
        notes: 'Relative clause with där (location)'
      },
      {
        swedish: 'Studenten vars föräldrar är lärare studerar medicin',
        english: 'The student whose parents are teachers studies medicine',
        notes: 'Possession with vars'
      },
      {
        swedish: 'Det är allt vad jag vet om saken',
        english: 'That is all I know about the matter',
        notes: 'Vad after allt'
      },
      {
        swedish: 'Jag känner kvinnan som du pratade med',
        english: 'I know the woman (that) you talked to',
        notes: 'Som as object (could be omitted in English)'
      }
    ],
    additionalNotes: [
      'Som is the most versatile relative pronoun',
      'Som must be used when it\'s the subject of the relative clause',
      'Som can be omitted when it\'s the object (like English "that")',
      'Vilken/vilket/vilka are more formal alternatives to som',
      'Vars is used for possession and never changes form',
      'Där/dit are used for location/direction',
      'Word order follows the BIFF rule in relative clauses',
      'Non-defining clauses are set off by commas',
      'The choice of pronoun can affect the meaning and style'
    ],
    commonMistakes: [
      'Forgetting to use som when it\'s the subject',
      'Wrong word order with negations (inte)',
      'Missing or misplaced commas in non-defining clauses',
      'Using wrong form of vilken/vilket/vilka',
      'Confusing vars with vems',
      'Incorrect placement of prepositions',
      'Using som instead of vars for possession',
      'Forgetting subject-verb agreement in the relative clause'
    ],
    proTips: [
      'Learn the BIFF rule for subordinate clause word order',
      'Practice identifying whether som is subject or object',
      'Use som as your default choice in informal contexts',
      'Remember that vars never changes form',
      'Pay attention to comma usage with non-defining clauses',
      'Notice how prepositions can move in relative clauses'
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
    ],
    proTips: [
      'Practice with passive voice in different contexts',
      'Pay attention to the type of passive voice (S-passive or bli-passive)',
      'Learn the most common passive voice forms and patterns',
      'Remember that some verbs prefer one form'
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
    ],
    proTips: [
      'Practice with conjunctions in different contexts',
      'Pay attention to the type of conjunction (coordinating or subordinating)',
      'Learn the most common conjunction forms and patterns',
      'Remember that conjunctions can affect word order'
    ]
  },
  {
    id: 'noun-declensions',
    category: 'Nouns',
    title: 'Swedish Noun Declensions',
    level: 'beginner',
    explanation: 'Swedish nouns are classified as either "en" words or "ett" words. This classification determines how the noun changes in its definite and plural forms.',
    examples: [
      {
        swedish: 'En pinne → pinnen → pinnar → pinnarna',
        english: 'A stick → the stick → sticks → the sticks',
        notes: '"En" word ending in "e"'
      },
      {
        swedish: 'En flicka → flickan → flickor → flickorna',
        english: 'A girl → the girl → girls → the girls',
        notes: '"En" word ending in "a"'
      },
      {
        swedish: 'En telefon → telefonen → telefoner → telefonerna',
        english: 'A phone → the phone → phones → the phones',
        notes: '"En" borrowed word'
      },
      {
        swedish: 'Ett piano → pianot → pianon → pianona',
        english: 'A piano → the piano  pianos → the pianos',
        notes: '"Ett" word ending in vowel'
      },
      {
        swedish: 'Ett bord → bordet → bord → borden',
        english: 'A table → the table → tables → the tables',
        notes: '"Ett" word ending in consonant'
      }
    ],
    additionalNotes: [
      'For "en" words ending in "e": add -en (definite), -ar (plural), -arna (definite plural)',
      'For "en" words ending in "a": replace "a" with -an (definite), add -or (plural), add -na (definite plural)',
      'For borrowed "en" words: add -en (definite), -er (plural), -erna (definite plural)',
      'For "ett" words ending in vowel: add -t (definite), -n (plural), -na (definite plural)',
      'For "ett" words ending in consonant: add -et (definite), no change (plural), -en (definite plural)'
    ],
    commonMistakes: [
      'Using wrong article ("en" vs "ett")',
      'Adding wrong plural ending',
      'Forgetting to replace final "a" in words like "flicka"',
      'Using wrong definite plural ending'
    ],
    proTips: [
      'Practice with noun declension in different contexts',
      'Pay attention to the type of noun (en-word or ett-word)',
      'Learn the most common noun forms and patterns',
      'Remember that some nouns have irregular forms'
    ]
  },
  {
    id: 'irregular-nouns',
    category: 'Nouns',
    title: 'Irregular Noun Patterns',
    level: 'intermediate',
    explanation: 'Some Swedish nouns follow irregular patterns in their plural and definite forms. These are often common, frequently used words that have preserved older grammatical patterns.',
    examples: [
      {
        swedish: 'En man → mannen → män → männen',
        english: 'A man → the man → men → the men',
        notes: 'Umlaut change in plural (a → ä)'
      },
      {
        swedish: 'Ett öga → ögat → ögon → ögonen',
        english: 'An eye → the eye → eyes → the eyes',
        notes: 'Changes -a to -on in plural'
      },
      {
        swedish: 'En fot → foten → fötter → fötterna',
        english: 'A foot → the foot → feet → the feet',
        notes: 'Umlaut change (o → ö) and -ter ending'
      },
      {
        swedish: 'En mus → musen → möss → mössen',
        english: 'A mouse → the mouse �� mice → the mice',
        notes: 'Umlaut change (u → ö) and consonant doubling'
      },
      {
        swedish: 'Ett barn → barnet → barn → barnen',
        english: 'A child → the child → children → the children',
        notes: 'No change in indefinite plural form'
      }
    ],
    additionalNotes: [
      'Many irregular nouns show umlaut changes (a→ä, o→ö, u→y) in their plural forms',
      'Some nouns have unique plural endings not found in regular patterns',
      'Many body parts and family terms have irregular forms',
      'Some irregular nouns preserve Old Norse grammatical patterns',
      'The definite plural often follows regular patterns even when the indefinite plural is irregular'
    ],
    commonMistakes: [
      'Applying regular plural rules to irregular nouns',
      'Forgetting the umlaut change in plural forms',
      'Using wrong definite plural endings',
      'Missing consonant doubling in certain forms'
    ],
    proTips: [
      'Practice with irregular nouns in different contexts',
      'Pay attention to the type of noun (irregular or regular)',
      'Learn the most common irregular noun forms and patterns',
      'Remember that some nouns have unique plural endings'
    ]
  },
  {
    id: 'indefinite-pronouns',
    category: 'Pronouns',
    title: 'Indefinite Pronouns',
    level: 'intermediate',
    explanation: 'Swedish indefinite pronouns refer to unspecified persons, things, or quantities. They change form based on gender (en/ett) and number, and can often function as both pronouns and determiners. These pronouns are grouped into categories based on their meaning: existential (någon), universal (all), negative (ingen), and others.',
    examples: [
      {
        swedish: 'Någon knackar på dörren',
        english: 'Someone is knocking on the door',
        notes: 'Existential: någon/något/några'
      },
      {
        swedish: 'Alla barn måste sova',
        english: 'All children must sleep',
        notes: 'Universal: all/allt/alla'
      },
      {
        swedish: 'Ingen förstår mig',
        english: 'Nobody understands me',
        notes: 'Negative: ingen/inget/inga'
      },
      {
        swedish: 'Man måste tänka först',
        english: 'One must think first',
        notes: 'Generic: man (no gender/number)'
      },
      {
        swedish: 'Båda systrarna kom',
        english: 'Both sisters came',
        notes: 'Specific quantity: båda/bägge'
      },
      {
        swedish: 'Hon gjorde det själv',
        english: 'She did it herself',
        notes: 'Reflexive: själv/självt/själva'
      },
      {
        swedish: 'Vi behöver en annan lösning',
        english: 'We need another solution',
        notes: 'Difference: annan/annat/andra'
      },
      {
        swedish: 'Många studenter läser svenska',
        english: 'Many students study Swedish',
        notes: 'Quantity: många (plural only)'
      }
    ],
    additionalNotes: [
      'Indefinite pronouns often show gender and number agreement',
      'Some pronouns can function as both pronouns and determiners',
      'Man is used similarly to the English generic "one" or "you"',
      'Själv is used for emphasis and in reflexive constructions',
      'Quantity words like många and få are often used as pronouns',
      'Some forms are used only in specific contexts or expressions'
    ],
    commonMistakes: [
      'Using wrong gender form (någon vs något)',
      'Forgetting number agreement with countable nouns',
      'Overusing man instead of more specific pronouns',
      'Mixing up annan (other) and nästa (next)',
      'Using själv in wrong position in the sentence',
      'Confusing båda and bägge usage'
    ],
    proTips: [
      'Learn pronouns in groups based on their function',
      'Practice gender and number agreement systematically',
      'Pay attention to position in the sentence',
      'Learn common fixed expressions with indefinite pronouns',
      'Notice when pronouns can also function as determiners'
    ]
  },
  {
    id: 'auxiliary-verbs',
    category: 'Verbs',
    title: 'Auxiliary Verbs (Hjälpverb)',
    level: 'intermediate',
    explanation: 'Auxiliary verbs in Swedish are used together with main verbs to express tense, mood, or aspect. The most common auxiliaries are "har" (have), "ska" (shall/will), "kommer att" (will), and modal auxiliaries like "kan" (can), "måste" (must), and "vill" (want to).',
    examples: [
      {
        swedish: 'Jag har ätit frukost',
        english: 'I have eaten breakfast',
        notes: 'Perfect tense with "har" + supine'
      },
      {
        swedish: 'Hon ska resa imorgon',
        english: 'She will travel tomorrow',
        notes: 'Future with "ska" + infinitive'
      },
      {
        swedish: 'Det kommer att regna',
        english: 'It will rain',
        notes: 'Future with "kommer att" + infinitive'
      },
      {
        swedish: 'Vi kan simma',
        english: 'We can swim',
        notes: 'Modal "kan" + infinitive'
      },
      {
        swedish: 'Du måste studera mer',
        english: 'You must study more',
        notes: 'Modal "måste" + infinitive'
      },
      {
        swedish: 'De vill dansa',
        english: 'They want to dance',
        notes: 'Modal "vill" + infinitive'
      }
    ],
    additionalNotes: [
      'Perfect tense uses "har/hade" + supine form',
      'Future can be expressed with "ska", "kommer att", or present tense',
      'Modal auxiliaries are followed by infinitive without "att"',
      'Double modals are possible (e.g., "måste kunna")',
      'Word order changes in subordinate clauses',
      'Some auxiliaries can also function as main verbs'
    ],
    commonMistakes: [
      'Using infinitive instead of supine with "har"',
      'Adding "att" after modal verbs',
      'Wrong word order in subordinate clauses',
      'Confusing "ska" and "kommer att"',
      'Using wrong form after double modals'
    ],
    proTips: [
      'Learn which form follows each auxiliary (supine vs. infinitive)',
      'Practice subordinate clause word order',
      'Pay attention to the subtle differences between future expressions',
      'Learn common combinations of modal verbs',
      'Notice when auxiliaries are used as main verbs'
    ]
  },
  {
    id: 'phrasal-verbs',
    category: 'Verbs',
    title: 'Phrasal Verbs (Partikelverb)',
    level: 'intermediate',
    explanation: 'Swedish phrasal verbs combine a verb with a particle (usually a preposition or adverb) to create new meanings. The particle often changes the meaning significantly from the basic verb. These combinations are stressed on the particle rather than the verb, which is a key feature in pronunciation.',
    examples: [
      {
        swedish: 'Jag kommer på en idé',
        english: 'I come up with an idea',
        notes: 'komma (come) + på = think of/come up with'
      },
      {
        swedish: 'Hon går ut med vännerna',
        english: 'She goes out with friends',
        notes: 'gå (walk/go) + ut = go out'
      },
      {
        swedish: 'De slår av lampan',
        english: 'They turn off the light',
        notes: 'slå (hit) + av = turn off'
      },
      {
        swedish: 'Vi skriver under kontraktet',
        english: 'We sign the contract',
        notes: 'skriva (write) + under = sign'
      },
      {
        swedish: 'Han ringer upp mig senare',
        english: 'He calls me back later',
        notes: 'ringa (call) + upp = call back'
      },
      {
        swedish: 'De håller på med läxorna',
        english: 'They are working on their homework',
        notes: 'hålla (hold) + på = be busy with/continue'
      }
    ],
    additionalNotes: [
      'The particle is stressed in speech (unlike English)',
      'Particles can significantly change the meaning of the base verb',
      'Word order varies between main and subordinate clauses',
      'Some particles can be separated from their verbs',
      'Many phrasal verbs have idiomatic meanings',
      'The same verb can combine with different particles to create different meanings'
    ],
    commonMistakes: [
      'Not stressing the particle in pronunciation',
      'Wrong word order with separable particles',
      'Confusing similar phrasal verbs',
      'Using literal translations from English',
      'Forgetting to separate particle in main clauses',
      'Wrong particle choice with specific verbs'
    ],
    proTips: [
      'Learn phrasal verbs as complete units with their meanings',
      'Practice the stress pattern (stressed particle)',
      'Pay attention to separable vs. inseparable combinations',
      'Learn common verb-particle combinations systematically',
      'Notice patterns in particle usage across different verbs'
    ]
  },
  {
    id: 'relative-pronouns',
    category: 'Pronouns',
    title: 'Relative Pronouns (Relativpronomen)',
    level: 'intermediate',
    explanation: 'Relative pronouns in Swedish connect clauses and provide additional information about a noun. The most common relative pronoun is "som", which can mean who, which, or that. Other relative pronouns include "vars" (whose), "vilken/vilket/vilka" (which), and "vad" (what).',
    examples: [
      {
        swedish: 'Mannen som bor här är lärare',
        english: 'The man who lives here is a teacher',
        notes: 'som referring to people'
      },
      {
        swedish: 'Boken som ligger på bordet är min',
        english: 'The book that lies on the table is mine',
        notes: 'som referring to things'
      },
      {
        swedish: 'Min syster, vars man är läkare, bor i Stockholm',
        english: 'My sister, whose husband is a doctor, lives in Stockholm',
        notes: 'vars showing possession'
      },
      {
        swedish: 'Huset, vilket byggdes förra året, är stort',
        english: 'The house, which was built last year, is big',
        notes: 'vilket in non-restrictive clauses'
      },
      {
        swedish: 'Jag förstår vad du menar',
        english: 'I understand what you mean',
        notes: 'vad in indirect questions/statements'
      },
      {
        swedish: 'De böcker vilka du köpte igår är dyra',
        english: 'The books which you bought yesterday are expensive',
        notes: 'vilka (plural) in formal style'
      }
    ],
    additionalNotes: [
      'Som is the most common and versatile relative pronoun',
      'Som can be omitted when it\'s the object of the relative clause',
      'Vars is used for possession and never changes form',
      'Vilken/vilket/vilka agree in gender and number',
      'Vad is used mainly in indirect questions and after allt',
      'Word order in relative clauses follows subordinate clause patterns'
    ],
    commonMistakes: [
      'Using wrong form of vilken/vilket/vilka',
      'Forgetting to use som when it\'s the subject',
      'Wrong word order in relative clauses',
      'Confusing vars with vems (interrogative)',
      'Using som instead of vars for possession',
      'Unnecessary use of vilken when som would be better'
    ],
    proTips: [
      'Use som as your default relative pronoun',
      'Remember that vars never changes form',
      'Pay attention to formal vs informal usage',
      'Practice subordinate clause word order',
      'Learn common fixed expressions with relative pronouns'
    ]
  },
  {
    id: 'bli-usage',
    category: 'Verbs',
    title: 'Using "Bli" (Become/Get/Be)',
    level: 'intermediate',
    explanation: 'The verb "bli" is one of the most versatile verbs in Swedish, used to express becoming, getting, being (future), and in passive constructions. It can indicate change of state, future events, or passive voice depending on context.',
    examples: [
      {
        swedish: 'Han blir läkare nästa år',
        english: 'He will become a doctor next year',
        notes: 'Future change of state/profession'
      },
      {
        swedish: 'Det blir kallt ikväll',
        english: 'It will get cold tonight',
        notes: 'Future change in condition'
      },
      {
        swedish: 'Jag blir glad när jag ser dig',
        english: 'I get happy when I see you',
        notes: 'Change in emotional state'
      },
      {
        swedish: 'Maten blir lagad av kocken',
        english: 'The food is being prepared by the chef',
        notes: 'Passive construction with bli'
      },
      {
        swedish: 'Vi får se vad det blir',
        english: 'We\'ll see what happens',
        notes: 'Common expression for future outcome'
      },
      {
        swedish: 'Det blir bra!',
        english: 'It will be fine!',
        notes: 'Common reassuring phrase'
      }
    ],
    additionalNotes: [
      'Bli is irregular: bli → blir → blev → blivit',
      'Can express both gradual and sudden changes',
      'Often used for future events instead of kommer att',
      'Forms passive voice with past participle',
      'Common in fixed expressions and idioms',
      'Can indicate both temporary and permanent changes'
    ],
    commonMistakes: [
      'Confusing bli with vara for present states',
      'Wrong word order in passive constructions',
      'Using bli when no change is involved',
      'Incorrect past participle form in passives',
      'Mixing up bli and kommer att in future expressions',
      'Wrong tense choice in subordinate clauses'
    ],
    proTips: [
      'Think of bli as indicating change or becoming',
      'Use bli for future states that differ from present',
      'Learn common bli expressions as fixed phrases',
      'Practice passive constructions with different verbs',
      'Notice when natives use bli vs. kommer att'
    ]
  },
  {
    id: 'question-words',
    category: 'Pronouns',
    title: 'Question Words (Frågeord)',
    level: 'beginner',
    explanation: 'Swedish question words are used to form both direct questions and indirect questions. They always trigger inversion (verb before subject) in direct questions, but follow the BIFF rule in indirect questions. Each question word has specific uses and sometimes changes form based on context.',
    examples: [
      {
        swedish: 'Vem är det? / Vems bok är det?',
        english: 'Who is it? / Whose book is it?',
        notes: 'vem (who) / vems (whose) for people'
      },
      {
        swedish: 'Vad gör du? / Vad är det?',
        english: 'What are you doing? / What is it?',
        notes: 'vad (what) for things/actions'
      },
      {
        swedish: 'Vilken tid är det? / Vilket hus?',
        english: 'What time is it? / Which house?',
        notes: 'vilken/vilket/vilka (which) agrees with noun'
      },
      {
        swedish: 'Hur mår du? / Hur mycket?',
        english: 'How are you? / How much?',
        notes: 'hur (how) for manner/degree'
      },
      {
        swedish: 'När kommer du? / När som helst',
        english: 'When are you coming? / Anytime',
        notes: 'när (when) for time'
      },
      {
        swedish: 'Var bor du? / Vart ska du?',
        english: 'Where do you live? / Where are you going?',
        notes: 'var (where) location / vart (where to) direction'
      }
    ],
    additionalNotes: [
      'Question words usually come first in direct questions',
      'Word order changes in indirect questions',
      'Vilken/vilket/vilka agree with the noun\'s gender and number',
      'Var vs. vart: location vs. direction',
      'Question words can combine with prepositions',
      'Some question words have special forms in certain expressions',
      'Many question words can also function as relative pronouns'
    ],
    commonMistakes: [
      'Wrong word order in indirect questions',
      'Confusing var and vart',
      'Using wrong form of vilken/vilket/vilka',
      'Forgetting prepositions with question words',
      'Mixing up vem and vad',
      'Wrong placement of inte in questions'
    ],
    proTips: [
      'Learn question words with common phrases',
      'Practice both direct and indirect questions',
      'Pay attention to word order differences',
      'Remember that var/vart distinction is important',
      'Notice how natives use question words in conversation'
    ]
  },
  {
    id: 's-verbs',
    category: 'Verbs',
    title: 'Verbs with -s (S-verbs/Deponent Verbs)',
    level: 'intermediate',
    explanation: 'Swedish has a special group of verbs that end in -s. These include reflexive verbs (where the action reflects back on the subject), reciprocal verbs (actions done to each other), and passive forms. Some verbs only exist in their -s form (deponent verbs).',
    examples: [
      {
        swedish: 'Vi ses imorgon',
        english: 'See you tomorrow',
        notes: 'Reciprocal: ses (see each other)'
      },
      {
        swedish: 'Hon känns ledsen',
        english: 'She seems sad',
        notes: 'Deponent: kännas (to feel/seem)'
      },
      {
        swedish: 'De träffas ofta',
        english: 'They meet often',
        notes: 'Reciprocal: träffas (meet each other)'
      },
      {
        swedish: 'Jag minns inte',
        english: 'I don\'t remember',
        notes: 'Deponent: minnas (to remember)'
      },
      {
        swedish: 'Det hoppas jag',
        english: 'I hope so',
        notes: 'Deponent: hoppas (to hope)'
      },
      {
        swedish: 'De skrattas åt',
        english: 'They are being laughed at',
        notes: 'Passive: skrattas (being laughed at)'
      }
    ],
    additionalNotes: [
      'Some verbs only exist with -s (true deponent verbs)',
      'Many -s verbs express reciprocal actions',
      'The -s ending can indicate passive voice',
      'Some verbs change meaning with -s',
      'Deponent verbs conjugate like regular verbs but keep -s',
      'Many common expressions use -s verbs'
    ],
    commonMistakes: [
      'Forgetting to keep -s in all forms',
      'Using reflexive pronoun with -s verbs',
      'Confusing passive -s with deponent -s',
      'Wrong conjugation of irregular -s verbs',
      'Using active form when -s form is required',
      'Adding extra reflexive pronouns unnecessarily'
    ],
    proTips: [
      'Learn which verbs are true deponent verbs',
      'Practice conjugating -s verbs in all tenses',
      'Notice the difference between passive and deponent use',
      'Remember common expressions with -s verbs',
      'Pay attention to verbs that change meaning with -s'
    ]
  },
  {
    id: 'konjunktiv',
    category: 'Verbs',
    title: 'Subjunctive Mood (Konjunktiv)',
    level: 'advanced',
    explanation: 'The subjunctive mood (konjunktiv) in Swedish is used to express wishes, hypothetical situations, and formal/ceremonial expressions. While less common in modern Swedish, it survives in certain fixed expressions and formal language. The present subjunctive ends in -e, and the past subjunctive is formed with "vore" (were).',
    examples: [
      {
        swedish: 'Leve kungen!',
        english: 'Long live the king!',
        notes: 'Present subjunctive in ceremonial expression'
      },
      {
        swedish: 'Om jag vore rik...',
        english: 'If I were rich...',
        notes: 'Past subjunctive with vore (hypothetical)'
      },
      {
        swedish: 'Vare därmed hur det vill',
        english: 'Be that as it may',
        notes: 'Fixed expression with present subjunctive'
      },
      {
        swedish: 'Må det gå dig väl',
        english: 'May it go well for you',
        notes: 'Formal wish with må + infinitive'
      },
      {
        swedish: 'Om det så vore...',
        english: 'Even if it were so...',
        notes: 'Hypothetical with vore'
      },
      {
        swedish: 'Gud bevare konungen',
        english: 'God save the king',
        notes: 'Traditional formula with present subjunctive'
      }
    ],
    additionalNotes: [
      'Modern Swedish often replaces subjunctive with skulle + infinitive',
      'Present subjunctive survives mainly in fixed expressions',
      'Past subjunctive "vore" is still commonly used',
      'Må can be used to express wishes and permission',
      'Some formal/legal texts still use subjunctive forms',
      'Many subjunctive expressions are archaic or ceremonial'
    ],
    commonMistakes: [
      'Using indicative where subjunctive is required in formal contexts',
      'Incorrect formation of present subjunctive',
      'Overusing subjunctive in modern speech',
      'Confusing skulle constructions with true subjunctive',
      'Wrong word order in subjunctive expressions',
      'Using vore in non-hypothetical situations'
    ],
    proTips: [
      'Learn common fixed expressions with subjunctive',
      'Use skulle + infinitive for most modern contexts',
      'Remember vore for hypothetical situations',
      'Pay attention to formal/ceremonial language',
      'Notice subjunctive forms in older texts'
    ]
  },
  {
    id: 'reflexive-verbs',
    category: 'Verbs',
    title: 'Reflexive Verbs and Pronouns (Reflexiva verb och pronomen)',
    level: 'intermediate',
    explanation: 'Swedish reflexive verbs are used with reflexive pronouns (sig, mig, dig, etc.) to indicate that the action reflects back on the subject. Some verbs are inherently reflexive, while others can be used both reflexively and non-reflexively with different meanings.',
    examples: [
      {
        swedish: 'Jag tvättar mig',
        english: 'I wash myself',
        notes: 'Basic reflexive usage'
      },
      {
        swedish: 'Hon känner sig trött',
        english: 'She feels tired',
        notes: 'Reflexive with adjective'
      },
      {
        swedish: 'De gifter sig nästa år',
        english: 'They are getting married next year',
        notes: 'Inherently reflexive verb'
      },
      {
        swedish: 'Vi bestämmer oss för att stanna',
        english: 'We decide to stay',
        notes: 'Reflexive with preposition'
      },
      {
        swedish: 'Han lär sig svenska',
        english: 'He is learning Swedish',
        notes: 'Common reflexive verb'
      },
      {
        swedish: 'Barnen klär på sig',
        english: 'The children are getting dressed',
        notes: 'Reflexive with particle'
      }
    ],
    additionalNotes: [
      'Reflexive pronouns change based on person (mig, dig, sig, etc.)',
      'Some verbs have different meanings when used reflexively',
      'Many daily activities are expressed with reflexive verbs',
      'Word order can vary with particles',
      'Some verbs are always reflexive',
      'Can combine with particles and prepositions'
    ],
    commonMistakes: [
      'Using wrong reflexive pronoun',
      'Forgetting reflexive pronoun with inherently reflexive verbs',
      'Wrong word order with particles',
      'Using reflexive when not needed',
      'Confusing reciprocal and reflexive use',
      'Translating directly from English'
    ],
    proTips: [
      'Learn common reflexive verbs as complete units',
      'Practice with daily routine activities',
      'Pay attention to word order with particles',
      'Notice meaning changes between reflexive/non-reflexive use',
      'Remember that some verbs are always reflexive'
    ]
  },
  {
    id: 'double-verbs',
    category: 'Verbs',
    title: 'Double Verbs (Verbkedjor)',
    level: 'intermediate',
    explanation: 'Swedish often uses combinations of two or more verbs in sequence. The first verb is conjugated, while subsequent verbs are typically in the infinitive form. These combinations can express ability, intention, desire, or ongoing actions.',
    examples: [
      {
        swedish: 'Jag försöker lära mig svenska',
        english: 'I try to learn Swedish',
        notes: 'försöker (conjugated) + lära (infinitive)'
      },
      {
        swedish: 'Hon sitter och läser',
        english: 'She is sitting and reading',
        notes: 'Pseudo-coordination for ongoing action'
      },
      {
        swedish: 'Vi brukar åka dit',
        english: 'We usually go there',
        notes: 'brukar + infinitive for habitual action'
      },
      {
        swedish: 'Han slutade röka',
        english: 'He stopped smoking',
        notes: 'slutade (conjugated) + röka (infinitive)'
      },
      {
        swedish: 'De börjar bli trötta',
        english: 'They are starting to get tired',
        notes: 'börjar + bli + adjective'
      },
      {
        swedish: 'Jag står och väntar',
        english: 'I am standing waiting',
        notes: 'Position verb + och + verb for ongoing action'
      }
    ],
    additionalNotes: [
      'First verb is conjugated according to tense/person',
      'Second verb usually in infinitive form',
      'Some combinations use "och" between verbs',
      'Position verbs can indicate ongoing actions',
      'Modal verbs commonly form double verb constructions',
      'Some verbs require "att" before the infinitive'
    ],
    commonMistakes: [
      'Using "att" when not needed',
      'Conjugating both verbs',
      'Wrong word order in subordinate clauses',
      'Forgetting "och" in pseudo-coordination',
      'Using wrong verb form after modals',
      'Confusing which verbs require "att"'
    ],
    proTips: [
      'Learn which verbs require "att" before infinitive',
      'Practice position verb combinations',
      'Notice patterns with modal verbs',
      'Pay attention to pseudo-coordination usage',
      'Remember word order rules in subordinate clauses'
    ]
  },
  {
    id: 'word-order',
    category: 'Sentence Structure',
    title: 'Word Order (Ordföljd)',
    level: 'intermediate',
    explanation: 'Swedish word order follows specific patterns, with the verb always in second position (V2 rule) in main clauses. Different rules apply to subordinate clauses (BIFF rule), questions, and special constructions. Understanding these patterns is crucial for forming correct Swedish sentences.',
    examples: [
      {
        swedish: 'Jag läser boken idag',
        english: 'I read the book today',
        notes: 'Basic SVO order: Subject + Verb + Object'
      },
      {
        swedish: 'Igår läste jag boken',
        english: 'Yesterday I read the book',
        notes: 'V2: Time expression first, verb second'
      },
      {
        swedish: 'Jag vet att han inte läser boken',
        english: 'I know that he doesn\'t read the book',
        notes: 'Subordinate clause: Subject + inte + Verb'
      },
      {
        swedish: 'Läser du boken?',
        english: 'Are you reading the book?',
        notes: 'Question word order: Verb first'
      },
      {
        swedish: 'Nu har jag läst boken',
        english: 'Now I have read the book',
        notes: 'Time word first, maintaining V2'
      },
      {
        swedish: 'Både läser och skriver han bra',
        english: 'He both reads and writes well',
        notes: 'Special construction with både/och'
      }
    ],
    additionalNotes: [
      'Main clause always has verb in second position',
      'Time expressions can start a sentence but trigger inversion',
      'Subordinate clauses follow BIFF rule (inte before finite verb)',
      'Questions start with verb or question word',
      'Adverbs placement differs in main and subordinate clauses',
      'Special rules apply with certain conjunctions'
    ],
    commonMistakes: [
      'Putting verb third in main clauses',
      'Wrong placement of inte',
      'Forgetting inversion after fronted elements',
      'Using main clause word order in subordinate clauses',
      'Wrong adverb placement',
      'Incorrect placement of time expressions'
    ],
    proTips: [
      'Always identify the finite verb first',
      'Remember V2 rule for main clauses',
      'Learn BIFF rule for subordinate clauses',
      'Practice with time expressions',
      'Pay attention to adverb placement'
    ]
  },
  {
    id: 'compound-words',
    category: 'Word Formation',
    title: 'Compound Words (Sammansatta ord)',
    level: 'intermediate',
    explanation: 'Swedish frequently combines words to create compound nouns, adjectives, and verbs. The last word determines the gender and grammatical category of the compound. Often, a linking -s- is added between components. Understanding compound formation rules helps expand vocabulary and comprehension.',
    examples: [
      {
        swedish: 'bok + hylla → bokhylla',
        english: 'book + shelf → bookshelf',
        notes: 'Simple noun + noun combination'
      },
      {
        swedish: 'sommar + dag → sommardag',
        english: 'summer + day → summer day',
        notes: 'No linking -s-'
      },
      {
        swedish: 'arbete + rum → arbetsrum',
        english: 'work + room → study/office',
        notes: 'With linking -s-'
      },
      {
        swedish: 'blå + bär → blåbär',
        english: 'blue + berry → blueberry',
        notes: 'Adjective + noun compound'
      },
      {
        swedish: 'köp + man → köpman',
        english: 'buy + man → merchant',
        notes: 'Verb stem + noun compound'
      },
      {
        swedish: 'barn + bok + handel → barnbokshandel',
        english: 'children + book + trade → children\'s bookstore',
        notes: 'Multiple component compound with linking -s-'
      }
    ],
    additionalNotes: [
      'The last word determines gender and declension',
      'Linking -s- often appears between components',
      'First elements often appear in stem form',
      'Stress is usually on the first component',
      'Can combine multiple words into longer compounds',
      'Some compounds change meaning unpredictably'
    ],
    commonMistakes: [
      'Forgetting linking -s- where needed',
      'Adding linking -s- where not needed',
      'Writing compounds as separate words',
      'Wrong stress pattern in pronunciation',
      'Incorrect plural formation',
      'Direct translation from English compounds'
    ],
    proTips: [
      'Learn common compound patterns',
      'Notice where linking -s- typically appears',
      'Pay attention to stress in compounds',
      'Look for logical connections between components',
      'Practice breaking down long compounds'
    ]
  },
  {
    id: 'comparison',
    category: 'Adjectives',
    title: 'Comparison of Adjectives and Adverbs (Komparation)',
    level: 'intermediate',
    explanation: 'Swedish adjectives and adverbs can be compared in three degrees: positive (grundform), comparative (komparativ), and superlative (superlativ). The comparison can be formed either by adding endings (-are, -ast) or using "mer" and "mest" for longer words.',
    examples: [
      {
        swedish: 'stor → större → störst',
        english: 'big → bigger → biggest',
        notes: 'Regular comparison with umlaut'
      },
      {
        swedish: 'glad → gladare → gladast',
        english: 'happy → happier → happiest',
        notes: 'Regular comparison without umlaut'
      },
      {
        swedish: 'intressant → mer intressant → mest intressant',
        english: 'interesting → more interesting → most interesting',
        notes: 'Periphrastic comparison (with mer/mest)'
      },
      {
        swedish: 'bra → bättre → bäst',
        english: 'good → better → best',
        notes: 'Irregular comparison'
      },
      {
        swedish: 'många → fler → flest',
        english: 'many → more → most',
        notes: 'Suppletive forms (different stems)'
      },
      {
        swedish: 'fort → fortare → fortast',
        english: 'fast → faster → fastest',
        notes: 'Adverb comparison'
      }
    ],
    additionalNotes: [
      'Short adjectives usually take -are/-ast endings',
      'Longer adjectives often use mer/mest',
      'Some adjectives show umlaut changes',
      'Common adjectives often have irregular forms',
      'Adverbs follow similar patterns to adjectives',
      'Definite superlative adds -e or -a'
    ],
    commonMistakes: [
      'Using wrong comparison method (endings vs. mer/mest)',
      'Forgetting umlaut changes',
      'Wrong superlative ending in definite form',
      'Mixing up irregular forms',
      'Using comparison with absolute adjectives',
      'Wrong agreement in superlative forms'
    ],
    proTips: [
      'Learn irregular comparisons as complete sets',
      'Notice patterns with umlaut changes',
      'Practice both attributive and predicative use',
      'Remember special forms for common adjectives',
      'Pay attention to definite superlative forms'
    ]
  },
  {
    id: 'verb-prefixes',
    category: 'Verbs',
    title: 'Verb Particles and Prefixes (Verbpartiklar och prefix)',
    level: 'intermediate',
    explanation: 'Swedish verbs can be modified with prefixes and particles to change or refine their meaning. Common prefixes include be-, för-, an-, på-, av-, and others. These modifications can significantly alter the meaning of the base verb and create new vocabulary.',
    examples: [
      {
        swedish: 'tala → betala',
        english: 'speak → pay',
        notes: 'be- prefix changing meaning completely'
      },
      {
        swedish: 'stå → förstå',
        english: 'stand → understand',
        notes: 'för- prefix creating abstract meaning'
      },
      {
        swedish: 'vända → använda',
        english: 'turn → use',
        notes: 'an- prefix modifying meaning'
      },
      {
        swedish: 'söka → besöka',
        english: 'seek → visit',
        notes: 'be- prefix specifying action'
      },
      {
        swedish: 'klara → förklara',
        english: 'manage → explain',
        notes: 'för- creating new meaning'
      },
      {
        swedish: 'hålla → innehålla',
        english: 'hold → contain',
        notes: 'inne- specifying direction/location'
      }
    ],
    additionalNotes: [
      'Prefixes often change the verb\'s meaning significantly',
      'Some combinations create completely new meanings',
      'Prefixes can affect verb conjugation patterns',
      'Multiple prefixes can be combined',
      'Some prefixes change the verb\'s valency',
      'Stress patterns may change with prefixes'
    ],
    commonMistakes: [
      'Using wrong prefix for intended meaning',
      'Incorrect stress patterns with prefixes',
      'Mixing up similar prefix combinations',
      'Wrong conjugation of prefixed verbs',
      'Direct translation from English prefixes',
      'Forgetting meaning changes with prefixes'
    ],
    proTips: [
      'Learn prefixed verbs as complete units',
      'Notice patterns in prefix meanings',
      'Pay attention to stress in prefixed verbs',
      'Practice with common prefix combinations',
      'Learn related verb families together'
    ]
  },
  {
    id: 'temporal-expressions',
    category: 'Time and Date',
    title: 'Temporal Expressions (Tidsuttryck)',
    level: 'intermediate',
    explanation: 'Swedish has specific patterns for expressing time, including clock time, dates, durations, and frequencies. These expressions often use special prepositions and word orders, and many common expressions differ significantly from English patterns.',
    examples: [
      {
        swedish: 'Klockan är kvart över tre',
        english: 'It\'s quarter past three',
        notes: 'Clock time with quarter hours'
      },
      {
        swedish: 'Vi ses i övermorgon',
        english: 'See you the day after tomorrow',
        notes: 'Compound time word with i'
      },
      {
        swedish: 'Hon kommer om tre veckor',
        english: 'She\'s coming in three weeks',
        notes: 'Future time with om'
      },
      {
        swedish: 'De har bott här sedan förra året',
        english: 'They have lived here since last year',
        notes: 'Duration with sedan'
      },
      {
        swedish: 'Mötet börjar vid midnatt',
        english: 'The meeting starts at midnight',
        notes: 'Point in time with vid'
      },
      {
        swedish: 'Vi träffas varannan tisdag',
        english: 'We meet every other Tuesday',
        notes: 'Regular intervals'
      }
    ],
    additionalNotes: [
      'Clock times use 24-hour system in formal contexts',
      'Dates use ordinal numbers (den tredje)',
      'Different prepositions for point vs. duration',
      'Special expressions for relative time',
      'Frequency expressions have specific patterns',
      'Many time expressions are compound words'
    ],
    commonMistakes: [
      'Wrong preposition choice (i/om/på)',
      'Incorrect ordinal number in dates',
      'Mixing up sedan and för...sedan',
      'Wrong word order with time expressions',
      'Direct translation of English patterns',
      'Confusion with half hours (halv X)'
    ],
    proTips: [
      'Learn clock times as fixed expressions',
      'Practice both formal and informal time',
      'Notice preposition patterns',
      'Remember special compound time words',
      'Pay attention to word order with time expressions'
    ]
  },
  {
    id: 'satzmelodie',
    category: 'Pronunciation',
    title: 'Sentence Melody (Satzmelodie)',
    level: 'intermediate',
    explanation: 'Swedish has two distinct intonation patterns (accents) that can change the meaning of words and affect sentence melody. These are called Accent 1 (acute) and Accent 2 (grave). The melody of Swedish sentences also follows specific patterns for statements, questions, and emphasis.',
    examples: [
      {
        swedish: 'anden (Accent 1)',
        english: 'the duck',
        notes: 'Single peak accent pattern'
      },
      {
        swedish: 'anden (Accent 2)',
        english: 'the spirit',
        notes: 'Double peak accent pattern'
      },
      {
        swedish: 'Kommer du?↗',
        english: 'Are you coming?',
        notes: 'Rising intonation for yes/no questions'
      },
      {
        swedish: 'Vad gör du?↘',
        english: 'What are you doing?',
        notes: 'Falling intonation for wh-questions'
      },
      {
        swedish: 'Det var INTE jag!',
        english: 'It was NOT me!',
        notes: 'Emphasis on negation'
      },
      {
        swedish: 'stegen (Accent 1)',
        english: 'the steps',
        notes: 'Single peak: ˈste.gen'
      },
      {
        swedish: 'stegen (Accent 2)',
        english: 'the ladder',
        notes: 'Double peak: ˈste̖.gen'
      },
      {
        swedish: 'Nu förstår jag!↘',
        english: 'Now I understand!',
        notes: 'Falling intonation with emphasis on "nu"'
      },
      {
        swedish: 'Jaså? Gör du det?↗',
        english: 'Oh really? You do?',
        notes: 'Double rising intonation for surprise'
      },
      {
        swedish: 'Kaffe... te... eller juice...↗',
        english: 'Coffee... tea... or juice...',
        notes: 'Rising pattern for options'
      }
    ],
    additionalNotes: [
      'Accent 1 has a single peak in pitch',
      'Accent 2 has two peaks in pitch',
      'Yes/no questions typically have rising intonation',
      'Wh-questions typically have falling intonation',
      'Emphasis can be shown through pitch and stress',
      'Compound words usually take Accent 2',
      'Regional variations exist in intonation patterns',
      'Accent 1 has a single peak in pitch',
      'Accent 2 has two peaks in pitch',
      'Yes/no questions typically have rising intonation',
      'Wh-questions typically have falling intonation',
      'Emphasis can be shown through pitch and stress',
      'Compound words usually take Accent 2',
      'Regional variations exist in intonation patterns'
    ],
    commonMistakes: [
      'Using English intonation patterns',
      'Not distinguishing between Accent 1 and 2',
      'Wrong intonation in questions',
      'Missing emphasis in contrastive statements',
      'Incorrect stress in compound words'
    ],
    proTips: [
      'Listen carefully to native speakers\' intonation',
      'Practice minimal pairs with different accents',
      'Record yourself and compare with native speech',
      'Pay attention to regional variations',
      'Focus on question intonation patterns'
    ]
  }
];

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
  ],
  'indefinite-pronouns': [
    {
      type: 'table',
      title: 'Indefinite Pronouns Overview',
      data: {
        headers: ['Category', 'En-form', 'Ett-form', 'Plural', 'Usage Notes'],
        rows: [
          ['Existential', 'någon', 'något', 'några', 'someone/something/some'],
          ['Universal', 'all', 'allt', 'alla', 'all/everything/everyone'],
          ['Negative', 'ingen', 'inget', 'inga', 'no one/nothing/none'],
          ['Other/Another', 'annan', 'annat', 'andra', 'other/another'],
          ['Both', 'båda/bägge', 'båda/bägge', 'båda/bägge', 'both (no gender distinction)'],
          ['Self', 'själv', 'självt', 'själva', 'self/alone/by oneself'],
          ['Many', '-', '-', 'många', 'many (plural only)'],
          ['Few', '-', '-', 'få', 'few (plural only)'],
          ['Each', 'varje', 'varje', '-', 'each (singular only)'],
          ['Several', '-', '-', 'flera', 'several (plural only)'],
          ['Generic', 'man', '-', '-', 'one/you (general reference)']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Expressions with Indefinite Pronouns',
      data: {
        headers: ['Swedish', 'English', 'Type'],
        rows: [
          ['allting', 'everything', 'Fixed form'],
          ['ingenting', 'nothing', 'Fixed form'],
          ['någonting', 'something', 'Fixed form'],
          ['var och en', 'each and everyone', 'Fixed expression'],
          ['vem som helst', 'anyone/whoever', 'Fixed expression'],
          ['vilket som helst', 'whichever', 'Fixed expression'],
          ['som helst', 'any/whatever', 'Suffix expression'],
          ['själva verket', 'actually/in fact', 'Fixed expression'],
          ['varenda en', 'every single one', 'Emphatic expression']
        ]
      }
    }
  ],
  'auxiliary-verbs': [
    {
      type: 'table',
      title: 'Common Auxiliary Verbs',
      data: {
        headers: ['Category', 'Auxiliary', 'Following Form', 'Usage', 'Example'],
        rows: [
          ['Perfect', 'har/hade', 'supine', 'completed actions', 'har läst (have read)'],
          ['Future', 'ska', 'infinitive', 'intentions/plans', 'ska resa (will travel)'],
          ['Future', 'kommer att', 'infinitive', 'predictions', 'kommer att regna (will rain)'],
          ['Modal', 'kan', 'infinitive', 'ability/possibility', 'kan simma (can swim)'],
          ['Modal', 'måste', 'infinitive', 'necessity', 'måste äta (must eat)'],
          ['Modal', 'vill', 'infinitive', 'want to', 'vill dansa (want to dance)'],
          ['Modal', 'bör', 'infinitive', 'should', 'bör träna (should exercise)'],
          ['Modal', 'får', 'infinitive', 'may/permission', 'får gå (may go)']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Double Modal Combinations',
      data: {
        headers: ['Swedish', 'English', 'Usage Notes'],
        rows: [
          ['måste kunna', 'must be able to', 'necessity + ability'],
          ['vill kunna', 'want to be able to', 'desire + ability'],
          ['ska kunna', 'will be able to', 'future + ability'],
          ['borde kunna', 'should be able to', 'recommendation + ability'],
          ['får kunna', 'may be able to', 'permission + ability'],
          ['skulle kunna', 'would be able to', 'conditional + ability'],
          ['skulle vilja', 'would like to', 'polite requests'],
          ['måste våga', 'must dare to', 'necessity + courage']
        ]
      }
    },
    {
      type: 'table',
      title: 'Word Order with Auxiliaries',
      data: {
        headers: ['Clause Type', 'Swedish', 'English', 'Pattern'],
        rows: [
          ['Main', 'Jag kan simma', 'I can swim', 'Subject + Aux + Infinitive'],
          ['Question', 'Kan du simma?', 'Can you swim?', 'Aux + Subject + Infinitive'],
          ['Subordinate', '...att jag kan simma', '...that I can swim', 'Subject + Aux + Infinitive'],
          ['Negative Main', 'Jag kan inte simma', 'I cannot swim', 'Subject + Aux + inte + Infinitive'],
          ['Negative Sub.', '...att jag inte kan simma', '...that I cannot swim', 'Subject + inte + Aux + Infinitive'],
          ['Perfect Main', 'Jag har simmat', 'I have swum', 'Subject + har + Supine'],
          ['Perfect Sub.', '...att jag har simmat', '...that I have swum', 'Subject + har + Supine']
        ]
      }
    }
  ],
  'phrasal-verbs': [
    {
      type: 'table',
      title: 'Common Verb-Particle Combinations',
      data: {
        headers: ['Base Verb', 'Particle', 'Phrasal Verb', 'Meaning', 'Example'],
        rows: [
          ['komma', 'på', 'komma på', 'think of/realize', 'Jag kom på svaret (I thought of the answer)'],
          ['gå', 'ut', 'gå ut', 'go out', 'Vi går ut ikväll (We\'re going out tonight)'],
          ['slå', 'av', 'slå av', 'turn off', 'Slå av TV:n (Turn off the TV)'],
          ['hålla', 'på', 'hålla på', 'continue/be busy with', 'Hon håller på med jobbet (She\'s busy working)'],
          ['tycka', 'om', 'tycka om', 'like', 'Jag tycker om dig (I like you)'],
          ['se', 'ut', 'se ut', 'look/appear', 'Du ser bra ut (You look good)'],
          ['stänga', 'av', 'stänga av', 'turn off', 'Stäng av datorn (Turn off the computer)'],
          ['sätta', 'på', 'sätta på', 'turn on', 'Sätt på radion (Turn on the radio)']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Particles and Their Basic Meanings',
      data: {
        headers: ['Particle', 'Basic Meaning', 'Common Uses', 'Example'],
        rows: [
          ['av', 'off/away', 'disconnection/removal', 'stänga av (turn off)'],
          ['på', 'on/onto', 'connection/activation', 'sätta på (turn on)'],
          ['upp', 'up', 'upward motion/completion', 'äta upp (eat up)'],
          ['ut', 'out', 'outward motion', 'gå ut (go out)'],
          ['in', 'in', 'inward motion', 'komma in (come in)'],
          ['om', 'about', 'concerning/again', 'tycka om (like)'],
          ['till', 'to', 'addition/closing', 'lägga till (add)'],
          ['med', 'with', 'participation', 'hänga med (follow along)']
        ]
      }
    },
    {
      type: 'table',
      title: 'Word Order Patterns with Phrasal Verbs',
      data: {
        headers: ['Clause Type', 'Word Order', 'Example', 'Translation'],
        rows: [
          ['Main Clause', 'Verb + Particle + Object', 'Hon stänger av datorn', 'She turns off the computer'],
          ['Main with Pronoun', 'Verb + Pronoun + Particle', 'Hon stänger den av', 'She turns it off'],
          ['Question', 'Verb + Subject + Particle', 'Stänger du av datorn?', 'Are you turning off the computer?'],
          ['Subordinate', 'Subject + Particle + Verb', '...att hon av stänger datorn', '...that she turns off the computer'],
          ['With Modal', 'Modal + Verb + Particle', 'Jag måste stänga av datorn', 'I must turn off the computer'],
          ['Negative', 'Verb + inte + Particle', 'Hon stänger inte av datorn', 'She doesn\'t turn off the computer']
        ]
      }
    }
  ],
  'relative-pronouns': [
    {
      type: 'table',
      title: 'Swedish Relative Pronouns Overview',
      data: {
        headers: ['Pronoun', 'Forms', 'Usage', 'Example'],
        rows: [
          ['som', 'unchangeable', 'general relative pronoun (who/which/that)', 'Mannen som kommer... (The man who comes...)'],
          ['vars', 'unchangeable', 'possession (whose)', 'Kvinnan vars bil... (The woman whose car...)'],
          ['vilken', 'vilken/vilket/vilka', 'formal/specific reference', 'Boken, vilken jag läste... (The book, which I read...)'],
          ['vad', 'unchangeable', 'what (after allt/det)', 'Allt vad han sa... (Everything that he said...)'],
          ['där', 'unchangeable', 'where (place reference)', 'Huset där jag bor... (The house where I live...)'],
          ['dit', 'unchangeable', 'to where (direction)', 'Staden dit vi åker... (The city to which we\'re going...)']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Patterns with Relative Pronouns',
      data: {
        headers: ['Pattern', 'Example', 'Translation', 'Usage Notes'],
        rows: [
          ['som + subject', 'Mannen som kommer', 'The man who comes', 'Som required as subject'],
          ['som + object', 'Boken (som) jag läste', 'The book (that) I read', 'Som optional as object'],
          ['vars + noun', 'Pojken vars föräldrar', 'The boy whose parents', 'Shows possession'],
          ['det som', 'Det som händer', 'That which happens', 'Common combination'],
          ['allt vad', 'Allt vad jag vet', 'All that I know', 'Fixed expression'],
          ['där/dit', 'Platsen där vi möttes', 'The place where we met', 'Location reference']
        ]
      }
    },
    {
      type: 'table',
      title: 'Word Order in Relative Clauses',
      data: {
        headers: ['Clause Type', 'Word Order', 'Example', 'Translation'],
        rows: [
          ['Basic', 'som + subject + verb', 'Bilen som min bror köpte', 'The car that my brother bought'],
          ['With Object', 'som + verb + subject', 'Mannen som träffade jag', 'The man whom I met'],
          ['With Adverb', 'som + adverb + subject + verb', 'Boken som ofta han läser', 'The book that he often reads'],
          ['With Vars', 'vars + noun + subject + verb', 'Kvinnan vars man arbetar här', 'The woman whose husband works here'],
          ['With Vilken', 'vilken/vilket/vilka + subject + verb', 'Huset, vilket ligger där', 'The house, which lies there'],
          ['Negative', 'som + inte + verb', 'Mannen som inte kommer', 'The man who isn\'t coming']
        ]
      }
    }
  ],
  'numbers-and-time': [
    {
      type: 'table',
      title: 'Basic Numbers and Their Forms',
      data: {
        headers: ['Number', 'Cardinal', 'Ordinal', 'Usage Example'],
        rows: [
          ['1', 'en/ett', 'första', 'en bok, ett hus, den första'],
          ['2', 'två', 'andra', 'två böcker, den andra'],
          ['3', 'tre', 'tredje', 'tre hus, den tredje'],
          ['4', 'fyra', 'fjärde', 'fyra böcker, den fjärde'],
          ['5', 'fem', 'femte', 'fem hus, den femte'],
          ['10', 'tio', 'tionde', 'tio böcker, den tionde'],
          ['11', 'elva', 'elfte', 'elva hus, den elfte'],
          ['12', 'tolv', 'tolfte', 'tolv böcker, den tolfte'],
          ['20', 'tjugo', 'tjugonde', 'tjugo hus, den tjugonde'],
          ['100', 'hundra', 'hundrade', 'hundra böcker, den hundrade']
        ]
      }
    },
    {
      type: 'table',
      title: 'Time Expressions',
      data: {
        headers: ['Time', 'Swedish (Informal)', 'Swedish (24-hour)', 'English'],
        rows: [
          ['8:15', 'kvart över åtta', 'åtta och femton', 'quarter past eight'],
          ['8:30', 'halv nio', 'åtta och trettio', 'half past eight'],
          ['8:45', 'kvart i nio', 'åtta och fyrtiofem', 'quarter to nine'],
          ['12:00', 'tolv', 'tolv', 'twelve (noon)'],
          ['13:00', 'ett', 'tretton', 'one PM'],
          ['00:00', 'tolv', 'tjugofyra', 'twelve (midnight)'],
          ['17:45', 'kvart i sex', 'sjutton och fyrtiofem', 'quarter to six PM']
        ]
      }
    },
    {
      type: 'table',
      title: 'Special Number Forms and Quantities',
      data: {
        headers: ['Swedish', 'English', 'Usage Example'],
        rows: [
          ['ett dussin', 'a dozen', 'ett dussin ägg (a dozen eggs)'],
          ['ett par', 'a pair/couple', 'ett par skor (a pair of shoes)'],
          ['ett tjog', 'score (20)', 'ett tjog ägg (twenty eggs)'],
          ['hundratals', 'hundreds of', 'hundratals människor (hundreds of people)'],
          ['tusentals', 'thousands of', 'tusentals böcker (thousands of books)'],
          ['miljontals', 'millions of', 'miljontals kronor (millions of crowns)'],
          ['några stycken', 'a few', 'några stycken äpplen (a few apples)'],
          ['ett halvt', 'a half', 'ett halvt bröd (half a bread)']
        ]
      }
    },
    {
      type: 'table',
      title: 'Date and Year Expressions',
      data: {
        headers: ['Type', 'Swedish', 'English', 'Notes'],
        rows: [
          ['Date', 'den 3:e maj', 'the 3rd of May', 'Ordinal + month'],
          ['Year', '2023', 'tjugohundratjugotre', '2023 (twenty-twenty-three)'],
          ['Decade', '80-talet', 'åttiotalet', 'the 1980s'],
          ['Century', '1900-talet', 'nittonhundratalet', 'the 20th century'],
          ['Season', 'våren 2023', 'spring 2023', 'Season + year'],
          ['Month/Year', 'maj 2023', 'May 2023', 'Month + year'],
          ['Week', 'vecka 23', 'week 23', 'Common in schedules']
        ]
      }
    }
  ],
  'relative-clauses': [
    {
      type: 'table',
      title: 'Relative Pronouns and Their Uses',
      data: {
        headers: ['Pronoun', 'Forms', 'Function', 'Example', 'Notes'],
        rows: [
          ['som', 'unchangeable', 'subject/object', 'Mannen som kommer...', 'Most common, general use'],
          ['vilken', 'vilken/vilket/vilka', 'formal alternative', 'Boken, vilken...', 'Agrees in gender/number'],
          ['vars', 'unchangeable', 'possession', 'Kvinnan vars bil...', 'Never changes form'],
          ['där', 'unchangeable', 'location', 'Huset där jag bor...', 'For places'],
          ['dit', 'unchangeable', 'direction', 'Staden dit vi åker...', 'For destinations'],
          ['vad', 'unchangeable', 'after allt/det', 'Allt vad han sa...', 'Limited use']
        ]
      }
    },
    {
      type: 'table',
      title: 'Word Order in Relative Clauses (BIFF Rule)',
      data: {
        headers: ['Type', 'Word Order Pattern', 'Example', 'Translation'],
        rows: [
          ['Basic', 'som + subject + verb + object', 'bilen som min bror köpte', 'the car that my brother bought'],
          ['With Negation', 'som + inte + verb', 'mannen som inte kommer', 'the man who isn\'t coming'],
          ['With Adverb', 'som + adverb + subject + verb', 'boken som ofta läses', 'the book that is often read'],
          ['With Object', 'som + object + subject + verb', 'flickan som jag såg', 'the girl whom I saw'],
          ['With Preposition', 'prep + vilken/som + subject + verb', 'bordet på vilket/som katten sitter', 'the table on which the cat sits'],
          ['With Vars', 'vars + noun + verb', 'mannen vars bil är röd', 'the man whose car is red']
        ]
      }
    },
    {
      type: 'table',
      title: 'Defining vs Non-defining Clauses',
      data: {
        headers: ['Type', 'Swedish Example', 'English Translation', 'Usage'],
        rows: [
          ['Defining', 'Mannen som bor här är läkare', 'The man who lives here is a doctor', 'Essential information'],
          ['Non-defining', 'Min bror, som bor i Stockholm, är läkare', 'My brother, who lives in Stockholm, is a doctor', 'Extra information'],
          ['Defining with vars', 'Studenten vars föräldrar är här', 'The student whose parents are here', 'Essential possession'],
          ['Non-defining with vilken', 'Boken, vilken jag köpte, är bra', 'The book, which I bought, is good', 'Formal, extra info'],
          ['Defining with där', 'Huset där jag bor', 'The house where I live', 'Essential location'],
          ['Non-defining with där', 'Stockholm, där jag bor, är vackert', 'Stockholm, where I live, is beautiful', 'Extra location']
        ]
      }
    }
  ],
  'bli-usage': [
    {
      type: 'table',
      title: 'Common Uses of Bli',
      data: {
        headers: ['Function', 'Structure', 'Example', 'Translation'],
        rows: [
          ['Become', 'bli + noun/adjective', 'Hon blir lärare', 'She becomes/will become a teacher'],
          ['Get', 'bli + adjective', 'Det blir varmt', 'It gets/will get warm'],
          ['Future be', 'bli + adjective/adverb', 'Det blir bra', 'It will be good'],
          ['Passive', 'bli + past participle', 'Bilen blir tvättad', 'The car is being washed'],
          ['Change state', 'bli + av med/till', 'Han blev av med jobbet', 'He lost his job'],
          ['Result', 'bli + av/till', 'Det blev ingenting', 'Nothing came of it']
        ]
      }
    },
    {
      type: 'table',
      title: 'Bli vs. Other Verbs',
      data: {
        headers: ['Context', 'With Bli', 'Alternative', 'Usage Note'],
        rows: [
          ['Future', 'Det blir regn', 'Det kommer att regna', 'Bli more colloquial'],
          ['Passive', 'Blir gjord', 'Görs', 'Bli emphasizes process'],
          ['State change', 'Blir arg', 'Är arg', 'Bli for change, är for state'],
          ['Profession', 'Blir läkare', 'Ska bli läkare', 'Bli more definite'],
          ['Weather', 'Blir kallt', 'Kommer att bli kallt', 'Bli more common'],
          ['Result', 'Blev bra', 'Var bra', 'Bli for outcome']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Expressions with Bli',
      data: {
        headers: ['Swedish', 'English', 'Usage'],
        rows: [
          ['Bli av', 'Happen/take place', 'När blir det av? (When will it happen?)'],
          ['Bli till', 'Come about/become of', 'Vad blev det till? (What came of it?)'],
          ['Bli över', 'Be left over', 'Det blev mycket över (There was a lot left)'],
          ['Bli av med', 'Get rid of', 'Bli av med problemen (Get rid of the problems)'],
          ['Bli sig själv', 'Be oneself again', 'Hon har inte blivit sig själv (She hasn\'t been herself)'],
          ['Bli efter', 'Fall behind', 'Vi blir efter i schemat (We\'re falling behind schedule)'],
          ['Bli kvar', 'Remain/stay behind', 'Han blev kvar på jobbet (He stayed late at work)'],
          ['Bli utan', 'Go without/miss out', 'Vi blev utan mat (We went without food)']
        ]
      }
    }
  ],
  'question-words': [
    {
      type: 'table',
      title: 'Swedish Question Words Overview',
      data: {
        headers: ['Question Word', 'Forms', 'Meaning', 'Example', 'Usage'],
        rows: [
          ['vem', 'vem/vems', 'who/whose', 'Vem är det?', 'For people'],
          ['vad', 'unchangeable', 'what', 'Vad gör du?', 'For things/actions'],
          ['vilken', 'vilken/vilket/vilka', 'which/what', 'Vilken bok?', 'For specific choice'],
          ['hur', 'unchangeable', 'how', 'Hur mår du?', 'For manner/degree'],
          ['när', 'unchangeable', 'when', 'När kommer du?', 'For time'],
          ['var', 'var/vart', 'where/where to', 'Var bor du?', 'For location/direction'],
          ['varför', 'unchangeable', 'why', 'Varför gråter du?', 'For reason']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Question Word Combinations',
      data: {
        headers: ['Combination', 'Meaning', 'Example', 'Usage Note'],
        rows: [
          ['hur många', 'how many', 'Hur många böcker?', 'With countable nouns'],
          ['hur mycket', 'how much', 'Hur mycket vatten?', 'With uncountable nouns'],
          ['var någonstans', 'where (exactly)', 'Var någonstans bor du?', 'More specific location'],
          ['vad för', 'what kind of', 'Vad för mat?', 'Asking about type'],
          ['hur dags', 'what time', 'Hur dags börjar det?', 'Specific time question'],
          ['hur länge', 'how long', 'Hur länge stannar du?', 'Duration of time'],
          ['hur ofta', 'how often', 'Hur ofta tränar du?', 'Frequency']
        ]
      }
    },
    {
      type: 'table',
      title: 'Word Order in Questions',
      data: {
        headers: ['Question Type', 'Pattern', 'Example', 'Translation'],
        rows: [
          ['Direct', 'Question word + Verb + Subject', 'Vad gör du?', 'What are you doing?'],
          ['Indirect', 'Subject + Question word + Subject + Verb', 'Jag vet vad du gör', 'I know what you\'re doing'],
          ['With Modal', 'Question word + Modal + Subject + Verb', 'När kan du komma?', 'When can you come?'],
          ['With Negation', 'Question word + Verb + Subject + inte', 'Varför kommer du inte?', 'Why aren\'t you coming?'],
          ['With Preposition', 'Preposition + Question word', 'Med vem pratar du?', 'Who are you talking to?'],
          ['Echo Question', 'Question word (final position)', 'Du bor var?', 'You live where?']
        ]
      }
    },
    {
      type: 'table',
      title: 'Question Words in Fixed Expressions',
      data: {
        headers: ['Expression', 'Meaning', 'Example', 'Usage'],
        rows: [
          ['vad som helst', 'whatever/anything', 'Ta vad som helst', 'Indifference/any option'],
          ['när som helst', 'anytime', 'Kom när som helst', 'Any time possible'],
          ['var som helst', 'anywhere', 'Sätt dig var som helst', 'Any location'],
          ['hur som helst', 'anyway/anyhow', 'Hur som helst, jag måste gå', 'Changing topic'],
          ['vem det än är', 'whoever it is', 'Släpp in vem det än är', 'Any person'],
          ['varför inte', 'why not', 'Varför inte göra det?', 'Suggestion'],
          ['hur då', 'how so/how come', 'Hur då menar du?', 'Asking for clarification']
        ]
      }
    }
  ],
  's-verbs': [
    {
      type: 'table',
      title: 'Types of S-verbs',
      data: {
        headers: ['Type', 'Function', 'Example', 'Translation', 'Notes'],
        rows: [
          ['Deponent', 'Only exists with -s', 'hoppas', 'to hope', 'No active form exists'],
          ['Reciprocal', 'Mutual action', 'träffas', 'to meet (each other)', 'Action between people'],
          ['Passive', 'Action received', 'höras', 'to be heard', 'Alternative to bli-passive'],
          ['Reflexive-like', 'Action on self', 'kännas', 'to feel/seem', 'State or experience'],
          ['Middle voice', 'Spontaneous process', 'samlas', 'to gather', 'No clear agent'],
          ['Mediopassive', 'General possibility', 'böjas', 'can be bent', 'Inherent property']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Deponent Verbs',
      data: {
        headers: ['Verb', 'Present', 'Past', 'Supine', 'English'],
        rows: [
          ['andas', 'andas', 'andades', 'andats', 'breathe'],
          ['hoppas', 'hoppas', 'hoppades', 'hoppats', 'hope'],
          ['lyckas', 'lyckas', 'lyckades', 'lyckats', 'succeed'],
          ['minnas', 'minns', 'mindes', 'mints', 'remember'],
          ['synas', 'syns', 'syntes', 'synts', 'be visible'],
          ['kännas', 'känns', 'kändes', 'känts', 'feel/seem'],
          ['finnas', 'finns', 'fanns', 'funnits', 'exist'],
          ['färdas', 'färdas', 'färdades', 'färdats', 'travel']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Expressions with S-verbs',
      data: {
        headers: ['Expression', 'Meaning', 'Usage', 'Notes'],
        rows: [
          ['Vi ses!', 'See you!', 'Saying goodbye', 'Reciprocal'],
          ['Det finns', 'There is/are', 'Existence', 'Deponent'],
          ['Hur känns det?', 'How does it feel?', 'Asking about sensation', 'Deponent'],
          ['Det hoppas jag', 'I hope so', 'Expressing hope', 'Deponent'],
          ['Ryktas det att...', 'Is it rumored that...', 'Gossip/hearsay', 'Passive'],
          ['Det behövs', 'It is needed', 'Necessity', 'Passive/deponent'],
          ['Låter bra', 'Sounds good', 'Agreement', 'Middle voice'],
          ['Det förstås', 'Of course', 'Agreement', 'Fixed expression']
        ]
      }
    },
    {
      type: 'table',
      title: 'Verb Forms With and Without -s',
      data: {
        headers: ['Base Verb', 'With -s', 'Meaning Change', 'Example'],
        rows: [
          ['träffa (meet)', 'träffas', 'meet each other', 'Vi träffas ofta (We meet often)'],
          ['höra (hear)', 'höras', 'be audible', 'Musiken hörs bra (The music can be heard well)'],
          ['se (see)', 'ses', 'see each other', 'Vi ses imorgon (See you tomorrow)'],
          ['slå (hit)', 'slåss', 'fight', 'De slåss ofta (They fight often)'],
          ['följa (follow)', 'följas åt', 'go together', 'Vi följs åt hem (We go home together)'],
          ['möta (meet)', 'mötas', 'meet each other', 'De möts vid stationen (They meet at the station)']
        ]
      }
    }
  ],
  'konjunktiv': [
    {
      type: 'table',
      title: 'Forms of Subjunctive',
      data: {
        headers: ['Type', 'Formation', 'Example', 'Usage', 'Modern Alternative'],
        rows: [
          ['Present', 'Stem + -e', 'leve, vare', 'Wishes, formal expressions', 'ska/må + infinitive'],
          ['Past', 'vore', 'om jag vore', 'Hypothetical situations', 'skulle vara'],
          ['Perfect', 'hade + supine', 'hade varit', 'Past hypothetical', 'skulle ha varit'],
          ['Må construction', 'må + infinitive', 'må det gå väl', 'Wishes/permission', 'kan/skulle'],
          ['Skulle construction', 'skulle + infinitive', 'skulle komma', 'Modern substitute', '-'],
          ['Vare sig', 'Fixed expression', 'vare sig...eller', 'Whether...or', 'oavsett om']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Fixed Expressions with Subjunctive',
      data: {
        headers: ['Swedish', 'English', 'Type', 'Context'],
        rows: [
          ['Leve kungen!', 'Long live the king!', 'Present subjunctive', 'Ceremonial'],
          ['Vare sig', 'Whether', 'Fixed expression', 'Formal writing'],
          ['Gud bevare', 'God save', 'Present subjunctive', 'Traditional'],
          ['Det vore bra', 'It would be good', 'Past subjunctive', 'Polite/hypothetical'],
          ['Må så vara', 'So be it', 'Må construction', 'Formal agreement'],
          ['Vare därmed sagt', 'Let it be said', 'Present subjunctive', 'Formal conclusion'],
          ['Kommen ihåg', 'Remember (plural)', 'Archaic subjunctive', 'Old texts'],
          ['Tack vare', 'Thanks to', 'Fossilized form', 'Common expression']
        ]
      }
    },
    {
      type: 'table',
      title: 'Modern Alternatives to Subjunctive',
      data: {
        headers: ['Context', 'Traditional', 'Modern', 'Example'],
        rows: [
          ['Wishes', 'Leve...', 'Länge ska... leva', 'Länge ska hon leva'],
          ['Hypothetical', 'vore', 'skulle vara', 'Det skulle vara bra'],
          ['Permission', 'Må han komma', 'Han kan/får komma', 'Han får komma in'],
          ['Formal request', 'Må det tillåtas', 'Kan det tillåtas', 'Kan det tillåtas att...'],
          ['Possibility', 'Det vore möjligt', 'Det skulle kunna vara möjligt', 'Det skulle kunna fungera'],
          ['Ceremonial', 'Gud bevare', 'Gud ska bevara', 'Gud ska bevara Sverige']
        ]
      }
    },
    {
      type: 'table',
      title: 'Subjunctive in Different Time Perspectives',
      data: {
        headers: ['Time', 'Structure', 'Example', 'Translation'],
        rows: [
          ['Present', 'vore/må vara', 'Om jag vore rik', 'If I were rich'],
          ['Past', 'hade varit', 'Om jag hade varit där', 'If I had been there'],
          ['Future', 'skulle vara', 'Det skulle vara bra', 'It would be good'],
          ['Perfect', 'hade kunnat', 'Jag hade kunnat hjälpa', 'I could have helped'],
          ['Future Perfect', 'skulle ha varit', 'Det skulle ha varit bra', 'It would have been good'],
          ['Timeless', 'vare sig', 'Vare sig du vill eller inte', 'Whether you want to or not']
        ]
      }
    }
  ],
  'reflexive-verbs': [
    {
      type: 'table',
      title: 'Reflexive Pronouns',
      data: {
        headers: ['Person', 'Singular', 'Plural', 'Example'],
        rows: [
          ['1st', 'mig', 'oss', 'Jag tvättar mig (I wash myself)'],
          ['2nd', 'dig', 'er', 'Du tvättar dig (You wash yourself)'],
          ['3rd', 'sig', 'sig', 'Han/Hon/Det tvättar sig (He/She/It washes him/her/itself)'],
          ['Formal', 'sig', 'sig', 'Ni tvättar er (You wash yourself/yourselves)'],
          ['Reciprocal', '-', 'varandra', 'De kramar varandra (They hug each other)'],
          ['Emphatic', 'själv', 'själva', 'Jag gjorde det själv (I did it myself)']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Reflexive Verbs',
      data: {
        headers: ['Verb', 'Meaning', 'Example', 'Notes'],
        rows: [
          ['gifta sig', 'get married', 'De gifter sig', 'Always reflexive'],
          ['känna sig', 'feel', 'Jag känner mig glad', 'Different from känna (know)'],
          ['lära sig', 'learn', 'Hon lär sig svenska', 'Common usage'],
          ['sätta sig', 'sit down', 'Vi sätter oss', 'Movement verb'],
          ['skynda sig', 'hurry', 'Du måste skynda dig', 'Always reflexive'],
          ['bestämma sig', 'decide', 'De bestämmer sig', 'With preposition för'],
          ['vila sig', 'rest', 'Han vilar sig', 'Optional reflexive'],
          ['förlova sig', 'get engaged', 'De förlovar sig', 'Always reflexive']
        ]
      }
    },
    {
      type: 'table',
      title: 'Reflexive Verbs with Particles',
      data: {
        headers: ['Verb', 'Particle', 'Meaning', 'Example'],
        rows: [
          ['klä på sig', 'på', 'get dressed', 'Hon klär på sig'],
          ['ta av sig', 'av', 'take off', 'Han tar av sig skorna'],
          ['ställa sig upp', 'upp', 'stand up', 'Vi ställer oss upp'],
          ['sätta sig ner', 'ner', 'sit down', 'De sätter sig ner'],
          ['ge sig av', 'av', 'leave', 'Jag ger mig av nu'],
          ['hålla sig borta', 'borta', 'stay away', 'Du måste hålla dig borta'],
          ['lägga sig i', 'i', 'interfere', 'Lägg dig inte i!'],
          ['passa sig för', 'för', 'be careful of', 'Pass dig för hunden']
        ]
      }
    },
    {
      type: 'table',
      title: 'Meaning Changes with Reflexive Use',
      data: {
        headers: ['Base Verb', 'Non-reflexive', 'Reflexive', 'Example'],
        rows: [
          ['känna', 'know someone', 'feel (emotionally)', 'Jag känner mig trött'],
          ['lära', 'teach', 'learn', 'Hon lär sig svenska'],
          ['bestämma', 'determine', 'decide', 'Vi bestämmer oss'],
          ['bete', 'graze (animals)', 'behave', 'Du beter dig konstigt'],
          ['röra', 'touch/move', 'exercise', 'De rör sig mycket'],
          ['tänka', 'think', 'intend', 'Jag tänker mig att...'],
          ['finna', 'find', 'find oneself', 'Han finner sig i situationen'],
          ['vända', 'turn something', 'turn oneself', 'Hon vänder sig om']
        ]
      }
    }
  ],
  'double-verbs': [
    {
      type: 'table',
      title: 'Common Double Verb Patterns',
      data: {
        headers: ['Pattern', 'Structure', 'Example', 'Usage'],
        rows: [
          ['Modal + Infinitive', 'kan/vill/måste + verb', 'kan simma', 'Ability/desire/necessity'],
          ['Position + och + Verb', 'sitter/står + och + verb', 'sitter och läser', 'Ongoing action'],
          ['Phase + Infinitive', 'börjar/slutar + verb', 'börjar arbeta', 'Start/end of action'],
          ['Try/Manage + Infinitive', 'försöker/lyckas + verb', 'försöker lära sig', 'Attempt/success'],
          ['Like/Used to + Infinitive', 'gillar/brukar + verb', 'brukar träna', 'Habitual action'],
          ['Help/Teach + Infinitive', 'hjälper/lär + verb', 'hjälper bära', 'Assistance/instruction']
        ]
      }
    },
    {
      type: 'table',
      title: 'Verbs Requiring "att" Before Infinitive',
      data: {
        headers: ['Verb', 'Example', 'Translation', 'Notes'],
        rows: [
          ['älskar', 'älskar att dansa', 'loves to dance', 'Emotional response'],
          ['hatar', 'hatar att vänta', 'hates to wait', 'Emotional response'],
          ['behöver', 'behöver att vila', 'needs to rest', 'Necessity'],
          ['lovar', 'lovar att komma', 'promises to come', 'Commitment'],
          ['hoppas', 'hoppas att vinna', 'hopes to win', 'Expectation'],
          ['planerar', 'planerar att resa', 'plans to travel', 'Intention']
        ]
      }
    },
    {
      type: 'table',
      title: 'Pseudo-coordination with "och"',
      data: {
        headers: ['First Verb', 'Example', 'Meaning', 'Usage'],
        rows: [
          ['sitter', 'sitter och läser', 'is reading', 'Seated activity'],
          ['står', 'står och pratar', 'is talking', 'Standing activity'],
          ['ligger', 'ligger och sover', 'is sleeping', 'Lying activity'],
          ['går', 'går och handlar', 'goes shopping', 'Movement + action'],
          ['springer', 'springer och leker', 'runs and plays', 'Active movement'],
          ['kommer', 'kommer och hälsar på', 'comes to visit', 'Movement purpose']
        ]
      }
    },
    {
      type: 'table',
      title: 'Word Order with Double Verbs',
      data: {
        headers: ['Clause Type', 'Pattern', 'Example', 'Translation'],
        rows: [
          ['Main', 'Subject + V1 + V2', 'Jag vill simma', 'I want to swim'],
          ['Question', 'V1 + Subject + V2', 'Kan du hjälpa?', 'Can you help?'],
          ['Subordinate', 'Subject + V1 + V2', '...att jag vill simma', '...that I want to swim'],
          ['With Object', 'V1 + Object + V2', 'hjälper honom bära', 'helps him carry'],
          ['With Particle', 'V1 + V2 + Particle', 'vill komma in', 'wants to come in'],
          ['With Negation', 'V1 + inte + V2', 'kan inte simma', 'cannot swim']
        ]
      }
    }
  ],
  'word-order': [
    {
      type: 'table',
      title: 'Main Clause Patterns',
      data: {
        headers: ['Pattern', 'Position 1', 'Position 2 (V2)', 'Position 3', 'Position 4', 'Example'],
        rows: [
          ['Basic', 'Subject', 'Verb', 'Object', 'Adverbial', 'Jag läser boken idag'],
          ['Inverted', 'Adverbial', 'Verb', 'Subject', 'Object', 'Idag läser jag boken'],
          ['Question', 'Verb', 'Subject', 'Object', 'Adverbial', 'Läser du boken idag?'],
          ['Wh-question', 'Question word', 'Verb', 'Subject', 'Object', 'Var läser du boken?'],
          ['With auxiliary', 'Subject', 'Auxiliary', 'Object', 'Main verb', 'Jag har läst boken'],
          ['Time first', 'Time', 'Verb', 'Subject', 'Object', 'Nu läser jag boken']
        ]
      }
    },
    {
      type: 'table',
      title: 'Subordinate Clause Patterns (BIFF)',
      data: {
        headers: ['Type', 'Conjunction', 'Subject', 'Negation/Adverb', 'Verb', 'Example'],
        rows: [
          ['att-clause', 'att', 'han', 'inte', 'läser', 'att han inte läser'],
          ['när-clause', 'när', 'jag', 'alltid', 'kommer', 'när jag alltid kommer'],
          ['om-clause', 'om', 'du', 'bara', 'visste', 'om du bara visste'],
          ['eftersom-clause', 'eftersom', 'vi', 'aldrig', 'går', 'eftersom vi aldrig går'],
          ['som-clause', 'som', 'hon', 'ofta', 'sjunger', 'som hon ofta sjunger'],
          ['därför att-clause', 'därför att', 'de', 'sällan', 'träffas', 'därför att de sällan träffas']
        ]
      }
    },
    {
      type: 'table',
      title: 'Adverb Placement',
      data: {
        headers: ['Clause Type', 'Pattern', 'Example', 'Translation'],
        rows: [
          ['Main', 'S + V + Adv + O', 'Jag läser ofta böcker', 'I often read books'],
          ['Negative main', 'S + V + inte + O', 'Jag läser inte böcker', 'I don\'t read books'],
          ['Subordinate', 'S + Adv + V + O', 'att jag ofta läser', 'that I often read'],
          ['Neg. subordinate', 'S + inte + V + O', 'att jag inte läser', 'that I don\'t read'],
          ['Time adverbs', 'Time + V + S + O', 'Ibland läser jag böcker', 'Sometimes I read books'],
          ['Multiple adverbs', 'S + V + Adv1 + Adv2', 'Jag läser ofta gärna', 'I often like to read']
        ]
      }
    },
    {
      type: 'table',
      title: 'Special Word Order Cases',
      data: {
        headers: ['Construction', 'Pattern', 'Example', 'Usage'],
        rows: [
          ['både/och', 'både + V1 + och + V2', 'både läser och skriver', 'Paired activities'],
          ['ju/desto', 'ju + adj, desto + adj', 'ju mer, desto bättre', 'Comparisons'],
          ['antingen/eller', 'antingen + X eller + Y', 'antingen nu eller sen', 'Alternatives'],
          ['varken/eller', 'varken + X eller + Y', 'varken äter eller dricker', 'Double negatives'],
          ['inte bara/utan också', 'inte bara X utan också Y', 'inte bara läser utan också skriver', 'Adding information'],
          ['såväl/som', 'såväl X som Y', 'såväl pojkar som flickor', 'Inclusive pairs']
        ]
      }
    }
  ],
  'adverbs': [
    {
      type: 'table',
      title: 'Types of Adverbs',
      data: {
        headers: ['Type', 'Examples', 'Usage', 'Position'],
        rows: [
          ['Time', 'ofta, alltid, aldrig, ibland', 'Frequency/When', 'After verb (main) / Before verb (sub)'],
          ['Place', 'här, där, hemma, ute', 'Location/Direction', 'Usually after object'],
          ['Manner', 'snabbt, långsamt, väl', 'How action is done', 'After verb'],
          ['Degree', 'mycket, lite, ganska', 'Intensity/Amount', 'Before word modified'],
          ['Modal', 'kanske, nog, visst', 'Probability/Attitude', 'Various positions'],
          ['Connecting', 'därför, dessutom, också', 'Linking ideas', 'Various positions']
        ]
      }
    },
    {
      type: 'table',
      title: 'Modal Particles and Their Meanings',
      data: {
        headers: ['Particle', 'Position', 'Meaning', 'Example'],
        rows: [
          ['ju', 'After verb', 'As we know/obviously', 'Det är ju så (That\'s obviously so)'],
          ['väl', 'After verb', 'Presumably/right?', 'Du kommer väl? (You\'re coming, right?)'],
          ['nog', 'After verb', 'Probably/I think', 'Det går nog bra (It\'ll probably be fine)'],
          ['visst', 'Various', 'Certainly/surely', 'Det var visst så (It was certainly so)'],
          ['faktiskt', 'Various', 'Actually/in fact', 'Det var faktiskt bra (It was actually good)'],
          ['bara', 'Various', 'Just/only', 'Kom bara in! (Just come in!)']
        ]
      }
    },
    {
      type: 'table',
      title: 'Adverb Order in Different Clauses',
      data: {
        headers: ['Clause Type', 'Pattern', 'Example', 'Translation'],
        rows: [
          ['Main', 'V + Time + Manner + Place', 'Hon springer ofta snabbt hemåt', 'She often runs quickly homeward'],
          ['Subordinate', 'S + Adv + V', 'att hon ofta springer', 'that she often runs'],
          ['Question', 'V + S + Adv', 'Springer hon ofta?', 'Does she run often?'],
          ['With Modal', 'Modal + S + Adv', 'Kanske hon ofta springer', 'Maybe she often runs'],
          ['Multiple Time', 'Time1 + V + Time2', 'Igår kom hon sent', 'Yesterday she came late'],
          ['Negation', 'V + inte + other adv', 'Hon springer inte fort', 'She doesn\'t run fast']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Adverbial Phrases',
      data: {
        headers: ['Swedish', 'English', 'Type', 'Example'],
        rows: [
          ['då och då', 'now and then', 'Time', 'Vi ses då och då'],
          ['hit och dit', 'here and there', 'Place', 'Hon går hit och dit'],
          ['fram och tillbaka', 'back and forth', 'Movement', 'Han går fram och tillbaka'],
          ['då och då', 'now and then', 'Time', 'Det händer då och då'],
          ['mer eller mindre', 'more or less', 'Degree', 'Det är mer eller mindre klart'],
          ['i alla fall', 'in any case', 'Modal', 'Jag kommer i alla fall']
        ]
      }
    }
  ],
  'compound-words': [
    {
      type: 'table',
      title: 'Common Compound Patterns',
      data: {
        headers: ['Pattern', 'Example', 'Translation', 'Notes'],
        rows: [
          ['Noun + Noun', 'fotboll (fot+boll)', 'football', 'Most common pattern'],
          ['Adjective + Noun', 'snabbmat (snabb+mat)', 'fast food', 'Describes type'],
          ['Verb + Noun', 'simhall (sim+hall)', 'swimming pool', 'Activity location'],
          ['Noun + Verb', 'handarbeta (hand+arbeta)', 'do handicraft', 'Method of action'],
          ['Adjective + Adjective', 'svartvit (svart+vit)', 'black and white', 'Combined qualities'],
          ['Multiple Components', 'barnsjukhus (barn+sjuk+hus)', 'children\'s hospital', 'Complex meaning']
        ]
      }
    },
    {
      type: 'table',
      title: 'Linking -s- Rules',
      data: {
        headers: ['Rule', 'Example', 'Counter-Example', 'Notes'],
        rows: [
          ['After work-related words', 'arbetsplats', 'arbetslös', 'arbete → arbets-'],
          ['After quality words', 'kvalitetsprodukt', 'kvalitetskontroll', 'kvalitet → kvalitets-'],
          ['After time words', 'årstid', 'årskurs', 'år → års-'],
          ['After place words', 'landskap', 'landväg', 'land → lands-/land-'],
          ['After compound first parts', 'födelsedagspresent', 'födelsedag', 'Multiple compounds'],
          ['Never after -ing, -ling', 'körlektion', 'körskola', 'No -s- after certain endings']
        ]
      }
    },
    {
      type: 'table',
      title: 'Meaning Changes in Compounds',
      data: {
        headers: ['Components', 'Compound', 'Literal Meaning', 'Actual Meaning'],
        rows: [
          ['sjuk + hus', 'sjukhus', 'sick house', 'hospital'],
          ['smör + gås', 'smörgås', 'butter goose', 'sandwich'],
          ['jord + gubbe', 'jordgubbe', 'earth old man', 'strawberry'],
          ['varm + korv', 'varmkorv', 'warm sausage', 'hot dog'],
          ['spring + pojke', 'springpojke', 'run boy', 'messenger boy'],
          ['ät + äpple', 'ätäpple', 'eat apple', 'eating apple']
        ]
      }
    },
    {
      type: 'table',
      title: 'Stress and Pronunciation',
      data: {
        headers: ['Compound', 'Stress Pattern', 'Components', 'Notes'],
        rows: [
          ['´fotboll', 'FOTboll', 'fot + boll', 'Main stress on first part'],
          ['´jordgubbe', 'JORDgubbe', 'jord + gubbe', 'Clear compound stress'],
          ['´barnbok', 'BARNbok', 'barn + bok', 'Short compound'],
          ['´järnvägs´station', 'JÄRNvägsstation', 'järnväg + station', 'Secondary stress possible'],
          ['´brand´försäkrings´bolag', 'BRANDförsäkringsbolag', 'brand + försäkring + bolag', 'Multiple stresses'],
          ['´sol och ´vår', 'SOL och VÅR', 'sol + och + vår', 'Not a true compound']
        ]
      }
    }
  ],
  'comparison': [
    {
      type: 'table',
      title: 'Regular Comparison Patterns',
      data: {
        headers: ['Type', 'Positive', 'Comparative', 'Superlative', 'Example'],
        rows: [
          ['Basic', '-', '-are', '-ast', 'stark → starkare → starkast'],
          ['With umlaut', '-', '-re', '-st', 'stor → större → störst'],
          ['Periphrastic', '-', 'mer + pos', 'mest + pos', 'intressant → mer intressant → mest intressant'],
          ['Two syllables', '-', '-are/-re', '-ast/-st', 'vacker → vackrare → vackrast'],
          ['Ending in -el', '-el', '-lare', '-last', 'enkel → enklare → enklast'],
          ['Ending in -en', '-en', '-nare', '-nast', 'mogen → mognare → mognast']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Irregular Comparisons',
      data: {
        headers: ['Positive', 'Comparative', 'Superlative', 'English'],
        rows: [
          ['bra', 'bättre', 'bäst', 'good/well'],
          ['dålig', 'sämre', 'sämst', 'bad'],
          ['gammal', 'äldre', 'äldst', 'old'],
          ['liten', 'mindre', 'minst', 'small'],
          ['många', 'fler(a)', 'flest', 'many'],
          ['ung', 'yngre', 'yngst', 'young'],
          ['få', 'färre', 'färst', 'few'],
          ['nära', 'närmare', 'närmast', 'near']
        ]
      }
    },
    {
      type: 'table',
      title: 'Superlative Forms in Different Contexts',
      data: {
        headers: ['Usage', 'Form', 'Example', 'Translation'],
        rows: [
          ['Predicative', '-ast', 'Hon är vackrast', 'She is (the) most beautiful'],
          ['Attributive def.', '-aste/-a', 'den vackraste flickan', 'the most beautiful girl'],
          ['With av/i/bland', '-ast', 'störst av alla', 'biggest of all'],
          ['Absolute', '-ast', 'Hon sjöng vackrast', 'She sang most beautifully'],
          ['With som', '-ast', 'så fort som möjligt', 'as fast as possible'],
          ['Adverbial', '-ast', 'Spring fortast du kan', 'Run as fast as you can']
        ]
      }
    },
    {
      type: 'table',
      title: 'Special Comparison Constructions',
      data: {
        headers: ['Construction', 'Example', 'Translation', 'Usage'],
        rows: [
          ['än', 'större än huset', 'bigger than the house', 'Basic comparison'],
          ['ju ... desto', 'ju större, desto bättre', 'the bigger, the better', 'Proportional'],
          ['som', 'lika stor som', 'as big as', 'Equality'],
          ['inte lika', 'inte lika stor som', 'not as big as', 'Inequality'],
          ['av/bland', 'störst av alla', 'biggest of all', 'Group comparison'],
          ['i + def.pl', 'bäst i klassen', 'best in the class', 'Group context']
        ]
      }
    }
  ],
  'verb-prefixes': [
    {
      type: 'table',
      title: 'Common Verb Prefixes and Their Meanings',
      data: {
        headers: ['Prefix', 'Basic Meaning', 'Example', 'Translation'],
        rows: [
          ['be-', 'make/affect', 'betala (pay)', 'tala → betala'],
          ['för-', 'change/transform', 'förstå (understand)', 'stå → förstå'],
          ['an-', 'towards/begin', 'använda (use)', 'vända → använda'],
          ['på-', 'onto/start', 'påbörja (begin)', 'börja → påbörja'],
          ['av-', 'off/away', 'avsluta (finish)', 'sluta → avsluta'],
          ['in-', 'into/inward', 'inse (realize)', 'se → inse'],
          ['ut-', 'out/outward', 'uttrycka (express)', 'trycka → uttrycka'],
          ['upp-', 'up/complete', 'uppfatta (perceive)', 'fatta → uppfatta']
        ]
      }
    },
    {
      type: 'table',
      title: 'Meaning Changes with Prefixes',
      data: {
        headers: ['Base Verb', 'Prefixed Form', 'Original Meaning', 'New Meaning'],
        rows: [
          ['komma', 'bekomma', 'come', 'receive/affect'],
          ['stå', 'förstå', 'stand', 'understand'],
          ['tala', 'betala', 'speak', 'pay'],
          ['söka', 'besöka', 'seek', 'visit'],
          ['hålla', 'innehålla', 'hold', 'contain'],
          ['gå', 'utgå', 'go', 'emanate/proceed'],
          ['fatta', 'omfatta', 'grasp', 'comprise'],
          ['leva', 'uppleva', 'live', 'experience']
        ]
      }
    },
    {
      type: 'table',
      title: 'Common Prefix Combinations',
      data: {
        headers: ['Combination', 'Example', 'Meaning', 'Usage'],
        rows: [
          ['för- + upp-', 'föruppvärma', 'pre-heat', 'Technical/cooking'],
          ['in- + be-', 'inbegripa', 'include', 'Formal/administrative'],
          ['ut- + an-', 'utandas', 'exhale', 'Physiological'],
          ['på- + be-', 'påbegynna', 'commence', 'Formal/literary'],
          ['av- + be-', 'avbetala', 'pay off', 'Financial'],
          ['upp- + lev-', 'uppleva', 'experience', 'General use'],
          ['in- + för-', 'införa', 'introduce/implement', 'Administrative'],
          ['ut- + för-', 'utföra', 'perform/execute', 'General action']
        ]
      }
    },
    {
      type: 'table',
      title: 'Prefix Effects on Verb Usage',
      data: {
        headers: ['Effect Type', 'Example', 'Change', 'Notes'],
        rows: [
          ['Transitivity', 'tänka → betänka', 'intransitive → transitive', 'be- often adds object'],
          ['Aspect', 'börja → påbörja', 'start → begin specifically', 'på- adds specificity'],
          ['Direction', 'komma → inkomma', 'come → come in', 'in- adds direction'],
          ['Completion', 'göra → utgöra', 'do → constitute', 'ut- adds completeness'],
          ['Intensity', 'visa → bevisa', 'show → prove', 'be- adds intensity'],
          ['Reversal', 'göra → förgöra', 'make → destroy', 'för- can reverse'],
          ['Location', 'sätta → insätta', 'set → insert', 'in- specifies location'],
          ['Duration', 'hålla → uppehålla', 'hold → maintain', 'upp- adds duration']
        ]
      }
    }
  ],
  'temporal-expressions': [
    {
      type: 'table',
      title: 'Clock Time Expressions',
      data: {
        headers: ['Time', 'Informal', 'Formal (24h)', 'Notes'],
        rows: [
          ['8:15', 'kvart över åtta', 'åtta och femton', 'Quarter past'],
          ['8:30', 'halv nio', 'åtta och trettio', 'Half hours (next hour)'],
          ['8:45', 'kvart i nio', 'åtta och fyrtiofem', 'Quarter to'],
          ['12:00', 'tolv', 'tolv', 'Noon/Midnight'],
          ['13:00', 'ett', 'tretton', 'Afternoon times'],
          ['23:45', 'kvart i tolv', 'tjugotre och fyrtiofem', 'Late evening'],
          ['00:00', 'tolv', 'tjugofyra', 'End of day']
        ]
      }
    },
    {
      type: 'table',
      title: 'Time Prepositions',
      data: {
        headers: ['Preposition', 'Usage', 'Example', 'Notes'],
        rows: [
          ['i', 'months/seasons/parts of day', 'i december, i sommar', 'General time period'],
          ['på', 'days/dates/decades', 'på måndag, på 80-talet', 'Specific days/periods'],
          ['om', 'future time', 'om tre dagar', 'Time ahead'],
          ['för...sedan', 'past time', 'för två år sedan', 'Time ago'],
          ['vid', 'point in time', 'vid midnatt', 'Exact moment'],
          ['under', 'during period', 'under sommaren', 'Throughout time']
        ]
      }
    },
    {
      type: 'table',
      title: 'Frequency and Duration',
      data: {
        headers: ['Expression', 'Meaning', 'Example', 'Usage'],
        rows: [
          ['varje', 'every', 'varje dag', 'Regular occurrence'],
          ['varannan', 'every other', 'varannan vecka', 'Alternating'],
          ['en gång i', 'once per', 'en gång i veckan', 'Frequency'],
          ['sedan/i', 'for (duration)', 'i tre år', 'Length of time'],
          ['mellan...och', 'between...and', 'mellan nio och fem', 'Time span'],
          ['från...till', 'from...to', 'från måndag till fredag', 'Time period']
        ]
      }
    },
    {
      type: 'table',
      title: 'Special Time Expressions',
      data: {
        headers: ['Swedish', 'English', 'Type', 'Example Usage'],
        rows: [
          ['i förrgår', 'day before yesterday', 'Past', 'Jag såg henne i förrgår'],
          ['i övermorgon', 'day after tomorrow', 'Future', 'Vi ses i övermorgon'],
          ['dygnet runt', 'around the clock', 'Duration', 'Butiken är öppen dygnet runt'],
          ['när som helst', 'anytime', 'Indefinite', 'Du kan komma när som helst'],
          ['då och då', 'now and then', 'Frequency', 'Vi träffas då och då'],
          ['med jämna mellanrum', 'at regular intervals', 'Pattern', 'Han ringer med jämna mellanrum']
        ]
      }
    }
  ],
  'satzmelodie': [
    {
      type: 'table',
      title: 'Swedish Accent Patterns',
      data: {
        headers: ['Word', 'Accent Type', 'Meaning', 'Pattern'],
        rows: [
          ['anden', 'Accent 1', 'the duck', 'Single peak (´)'],
          ['anden', 'Accent 2', 'the spirit', 'Double peak (`)'],
          ['tomten', 'Accent 1', 'the plot (of land)', 'Single peak (´)'],
          ['tomten', 'Accent 2', 'Santa Claus', 'Double peak (`)'],
          ['buren', 'Accent 1', 'the cage', 'Single peak (´)'],
          ['buren', 'Accent 2', 'carried', 'Double peak (`)']
        ]
      }
    },
    {
      type: 'table',
      title: 'Sentence Intonation Patterns',
      data: {
        headers: ['Sentence Type', 'Pattern', 'Example', 'Notes'],
        rows: [
          ['Statement', 'Falling', 'Jag går hem.↘', 'Gradual fall'],
          ['Yes/No Question', 'Rising', 'Går du hem?↗', 'Rise at end'],
          ['Wh-Question', 'Falling', 'Var går du?↘', 'Fall from question word'],
          ['Emphasis', 'Peak on focus', 'JAG går hem.', 'Strong stress'],
          ['Continuation', 'Level or rising', 'När jag kommer hem...→', 'Indicates more to come'],
          ['List', 'Rise, rise, fall', 'äpplen↗, päron↗, bananer↘', 'Final item falls']
        ]
      }
    },
    {
      type: 'table',
      title: 'Accent Patterns in Compound Words',
      data: {
        headers: ['Compound Word', 'Components', 'Accent Type', 'Meaning'],
        rows: [
          ['vardagsrum', 'vardag + rum', 'Accent 2', 'living room'],
          ['jordgubbe', 'jord + gubbe', 'Accent 2', 'strawberry'],
          ['kaffekopp', 'kaffe + kopp', 'Accent 2', 'coffee cup'],
          ['matsäck', 'mat + säck', 'Accent 2', 'packed lunch'],
          ['bokhylla', 'bok + hylla', 'Accent 2', 'bookshelf'],
          ['barnbok', 'barn + bok', 'Accent 2', 'children\'s book']
        ]
      }
    },
    {
      type: 'table',
      title: 'Regional Accent Variations',
      data: {
        headers: ['Region', 'Characteristic', 'Example Word', 'Pattern'],
        rows: [
          ['Stockholm', 'Sharp accent distinction', 'anden', 'Clear Accent 1/2 difference'],
          ['Skåne', 'Softer distinction', 'anden', 'Less pronounced difference'],
          ['Göteborg', 'Distinct rise-fall', 'gatan', 'Strong pitch movement'],
          ['Norrland', 'Extended pitch range', 'huset', 'Wider pitch intervals'],
          ['Finland Swedish', 'Less tonal', 'bilen', 'Minimal pitch movement'],
          ['Standard Swedish', 'Reference form', 'handen', 'Textbook pattern']
        ]
      }
    },
    {
      type: 'table',
      title: 'Intonation in Different Contexts',
      data: {
        headers: ['Context', 'Pattern', 'Example', 'Effect'],
        rows: [
          ['Excitement', '↗↗↗', 'Vad roligt!', 'Multiple rising tones'],
          ['Disappointment', '↘↘', 'Jaha...', 'Falling, extended'],
          ['Listing Items', '↗,↗,↘', 'ett, två, tre', 'Rise, rise, fall'],
          ['Hesitation', '→→', 'Jaa...', 'Extended level tone'],
          ['Strong Emphasis', '⋀', 'NEJ!', 'Sharp rise-fall'],
          ['Gentle Request', '↗↘', 'Kan du...?', 'Rise-fall pattern']
        ]
      }
    },
    {
      type: 'table',
      title: 'Detailed Pitch Patterns',
      data: {
        headers: ['Word', 'Accent Type', 'Pitch Visualization', 'Description'],
        rows: [
          [
            'anden',
            'Accent 1',
            '◢___\nAN-den',
            'Sharp fall on first syllable, stays low'
          ],
          [
            'anden',
            'Accent 2',
            '◢_◣\nAN-den',
            'Fall-rise pattern across syllables'
          ],
          [
            'flicka',
            'Accent 2',
            '◢_◣\nFLIC-ka',
            'Fall on FLIC, rise on -ka'
          ],
          [
            'sommar',
            'Accent 2',
            '◢_◣\nSOM-mar',
            'Fall-rise across syllables'
          ],
          [
            'tala',
            'Accent 1',
            '◢___\nTA-la',
            'Sharp fall, remains low'
          ],
          [
            'talet',
            'Accent 2',
            '◢_◣\nTA-let',
            'Fall-rise pattern'
          ]
        ]
      }
    },
    {
      type: 'table',
      title: 'Sentence Pitch Movement',
      data: {
        headers: ['Sentence', 'Type', 'Pitch Pattern', 'Description'],
        rows: [
          [
            'Jag går hem',
            'Statement',
            '___◢___\nJAG GÅR HEM',
            'Gradual descent'
          ],
          [
            'Går du hem?',
            'Yes/No Question',
            '_____◣\nGÅR DU HEM',
            'Rising at the end'
          ],
          [
            'Vad gör du?',
            'Wh-Question',
            '◢____\nVAD GÖR DU',
            'High start, falling'
          ],
          [
            'INTE jag!',
            'Emphasis',
            '◥◢___\nIN-TE JAG',
            'Extra emphasis on INTE'
          ],
          [
            'Kaffe... te...',
            'List',
            '◣ ◣\nKAF-FE... TE...',
            'Rising on each item'
          ]
        ]
      }
    },
    {
      type: 'table',
      title: 'Compound Word Patterns',
      data: {
        headers: ['Word', 'Components', 'Pitch Pattern', 'Description'],
        rows: [
          [
            'vardagsrum',
            'vardag+rum',
            '◢__◣\nVAR-dags-rum',
            'Main fall + final rise'
          ],
          [
            'jordgubbe',
            'jord+gubbe',
            '◢__◣\nJORD-gub-be',
            'Fall on first, rise at end'
          ],
          [
            'kaffekopp',
            'kaffe+kopp',
            '◢__◣\nKAF-fe-kopp',
            'Fall-rise pattern'
          ],
          [
            'bokhylla',
            'bok+hylla',
            '◢__◣\nBOK-hyl-la',
            'Fall + gentle rise'
          ]
        ]
      }
    }
  ],
  'pitch-pattern-legend': [
    {
      type: 'table',
      title: 'Pitch Pattern Legend',
      data: {
        headers: ['Symbol', 'Meaning', 'Example', 'Usage'],
        rows: [
          ['◢', 'Sharp fall', 'TA-la', 'Start of stressed syllable'],
          ['◣', 'Sharp rise', 'kom-MER', 'End rise in questions'],
          ['___', 'Low level', 'efter', 'Unstressed syllables'],
          ['◥', 'High level', 'JA', 'Emphasized syllables'],
          ['→', 'Sustained', 'jaaa...', 'Lengthened sounds'],
          ['◢__◣', 'Fall-rise', 'AND-en', 'Accent 2 pattern']
        ]
      }
    }
  ],
  'noun-stress': [
    {
      type: 'table',
      title: 'Basic Noun Stress Patterns',
      data: {
        headers: ['Form', 'Example', 'Pitch Pattern', 'Description'],
        rows: [
          [
            'Indefinite Singular',
            'en FLICKA',
            '◢___\nFLIC-ka',
            'Main stress on first syllable'
          ],
          [
            'Definite Singular',
            'FLICKAN',
            '◢_◣\nFLIC-kan',
            'Rise on definite suffix'
          ],
          [
            'Indefinite Plural',
            'FLICKOR',
            '◢__\nFLIC-kor',
            'Stress remains on first syllable'
          ],
          [
            'Definite Plural',
            'FLICKORNA',
            '◢__◣\nFLIC-kor-na',
            'Secondary rise on definite suffix'
          ]
        ]
      }
    },
    {
      type: 'table',
      title: 'Compound Noun Patterns',
      data: {
        headers: ['Compound', 'Components', 'Pitch Pattern', 'Description'],
        rows: [
          [
            'sommardag',
            'sommar + dag',
            '◢___◣\nSOM-mar-dag',
            'Main stress + final rise'
          ],
          [
            'järnvägsstation',
            'järnväg + station',
            '◢____◣\nJÄRN-vägs-sta-tion',
            'Long compound, maintain pattern'
          ],
          [
            'skolböcker',
            'skol + böcker',
            '◢__◣\nSKOL-böc-ker',
            'Compound plural form'
          ],
          [
            'kaffekoppen',
            'kaffe + kopp + en',
            '◢___◣\nKAF-fe-kopp-en',
            'Compound with definite'
          ]
        ]
      }
    },
    {
      type: 'table',
      title: 'Definite Form Variations',
      data: {
        headers: ['Base Form', 'Definite Form', 'Pitch Pattern', 'Notes'],
        rows: [
          [
            'bok',
            'boken',
            '◢_◣\nBO-ken',
            'Short word + definite'
          ],
          [
            'telefon',
            'telefonen',
            '◢__◣\nTE-le-FON-en',
            'Long word + definite'
          ],
          [
            'äpple',
            'äpplet',
            '◢_◣\nÄPP-let',
            'Neuter noun + definite'
          ],
          [
            'hus',
            'huset',
            '◢_◣\nHU-set',
            'Short neuter + definite'
          ]
        ]
      }
    },
    {
      type: 'table',
      title: 'Regional Noun Variations',
      data: {
        headers: ['Region', 'Example', 'Pattern', 'Characteristics'],
        rows: [
          [
            'Stockholm',
            'flickan',
            '◢_◣\nFLIC-kan',
            'Clear two-peak pattern'
          ],
          [
            'Skåne',
            'flickan',
            '◢___\nFLIC-kan',
            'Flatter, less distinct rise'
          ],
          [
            'Göteborg',
            'flickan',
            '◢_↗\nFLIC-kan',
            'Stronger final rise'
          ],
          [
            'Norrland',
            'flickan',
            '◢__◣\nFLIC-kan',
            'Extended pitch range'
          ]
        ]
      }
    },
    {
      type: 'table',
      title: 'Special Noun Patterns',
      data: {
        headers: ['Type', 'Example', 'Pattern', 'Description'],
        rows: [
          [
            'Loan Words',
            'garage',
            '__◢\nga-RAGE',
            'Final stress (French)'
          ],
          [
            'Abbreviations',
            'TV:n',
            '◥◣\nTE-VE:n',
            'Equal stress both syllables'
          ],
          [
            'Foreign Names',
            'Paris',
            '__◢\npa-RIS',
            'Final stress maintained'
          ],
          [
            'Mixed Compounds',
            'TV-apparat',
            '◥_◢__\nTE-VE-app-rat',
            'Multiple stress points'
          ]
        ]
      }
    },
    {
      type: 'table',
      title: 'Length and Stress Interaction',
      data: {
        headers: ['Pattern', 'Example', 'Visualization', 'Rule'],
        rows: [
          [
            'Short + Short',
            'hus-et',
            '◢_◣\nHU-set',
            'Complementary length'
          ],
          [
            'Long + Short',
            'bok-en',
            '◢__\nBO-ken',
            'Maintains length contrast'
          ],
          [
            'Short + Long',
            'tak-et',
            '◢_◣\nTA-ket',
            'Complementary distribution'
          ],
          [
            'Long + Long',
            'bil-en',
            '◢__◣\nBI-len',
            'Both syllables full length'
          ]
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
                onClick={() => {}}
                isActive={activeLevel === level}
              >
                {level}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <ToggleGroup
            className="w-full"
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
                onClick={() => {}}
                isActive={selectedCategory === category}
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

                {rule.additionalNotes && rule.additionalNotes.length > 0 && (
                  <div className="mt-4 bg-green-50 p-4 rounded-md">
                    <h3 className="font-medium text-green-900 mb-2">Key Points:</h3>
                    <ul className="list-disc list-inside space-y-1 text-green-800">
                      {rule.additionalNotes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {rule.commonMistakes && rule.commonMistakes.length > 0 && (
                  <div className="mt-4 bg-red-50 p-4 rounded-md">
                    <h3 className="font-medium text-red-900 mb-2">Common Mistakes:</h3>
                    <ul className="list-disc list-inside space-y-1 text-red-800">
                      {rule.commonMistakes.map((mistake, index) => (
                        <li key={index}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {rule.proTips && rule.proTips.length > 0 && (
                  <div className="mt-4 bg-blue-50 p-4 rounded-md">
                    <h3 className="font-medium text-blue-900 mb-2">Pro Tips:</h3>
                    <ul className="list-disc list-inside space-y-1 text-blue-800">
                      {rule.proTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
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
