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
    title: 'Placement and Usage of Adverbs',
    level: 'intermediate',
    explanation: 'In Swedish, adverbs typically come after the verb in main clauses, but before the verb in subordinate clauses. They modify verbs, adjectives, or other adverbs.',
    examples: [
      {
        swedish: 'Hon springer snabbt.',
        english: 'She runs quickly.',
        notes: 'Adverb after verb in main clause'
      },
      {
        swedish: 'Jag vet att hon ofta läser böcker.',
        english: 'I know that she often reads books.',
        notes: 'Adverb before verb in subordinate clause'
      },
      {
        swedish: 'Han är mycket intelligent.',
        english: 'He is very intelligent.',
        notes: 'Adverb modifying an adjective'
      },
      {
        swedish: 'De kommer alltid i tid.',
        english: 'They always come on time.',
        notes: 'Time adverb in a main clause'
      }
    ],
    additionalNotes: [
      'Common adverbs: ofta (often), alltid (always), aldrig (never), snabbt (quickly), mycket (very)',
      'Some adverbs can be placed at the beginning of a sentence for emphasis',
      'Adverbs do not change form based on the word they modify',
      'The placement of "inte" (not) follows the same rules as other adverbs'
    ],
    commonMistakes: [
      'Placing adverbs before the verb in main clauses',
      'Putting adverbs after the verb in subordinate clauses',
      'Confusing adverbs with adjectives'
    ],
    proTips: [
      'Learn the BIFF rule (I Bisats kommer Inte Före Finita verbet) for subordinate clauses',
      'Practice with "inte" first, as it\'s the most common adverb and follows the same rules',
      'When you hear a new adverb, note whether it\'s in a main or subordinate clause',
      'Remember that modal adverbs like "kanske" can affect word order'
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
    ],
    proTips: [
      'Practice with number expressions in different contexts',
      'Pay attention to the type of number (ordinal, cardinal, etc.)',
      'Learn the most common number forms and patterns',
      'Remember that some numbers have irregular forms'
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
    ],
    proTips: [
      'Practice with relative clauses in different contexts',
      'Pay attention to the relative pronoun and its meaning',
      'Learn the most common relative clause forms and patterns',
      'Remember that subject-verb inversion applies'
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
        english: 'A piano → the piano → pianos → the pianos',
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
        english: 'A mouse → the mouse → mice → the mice',
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
