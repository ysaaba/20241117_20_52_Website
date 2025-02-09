import { Question } from '@/types/exercises';

export const grammarQuestions: Question[] = [
  // Easy level questions
  {
    id: 1,
    difficulty: 'easy',
    swedish: "Jag ___ en bok",
    english: "I read a book",
    options: ["läser", "läsa", "läste", "har läst"],
    correctAnswer: "läser",
    explanation: "In Swedish, we use the present tense form 'läser' for actions happening now or regularly.",
    category: "Present Tense",
    hint: "Think about what form you use to say 'I read' (right now)",
    pronunciation: {
      ipa: "/jɑː ˈleːsər en buːk/",
      notes: "Note the long 'e' sound in 'läser'"
    }
  },
  {
    id: 2,
    difficulty: 'easy',
    swedish: "___ hus är stort",
    english: "The house is big",
    options: ["Det", "Den", "En", "Ett"],
    correctAnswer: "Det",
    explanation: "We use 'det' for ett-words in definite form. 'Hus' is an ett-word.",
    category: "Articles",
    hint: "Is 'hus' an en-word or ett-word?",
    pronunciation: {
      ipa: "/deːt huːs æːr stoːʈ/",
      notes: "Note the long vowels in 'hus' and 'är'"
    }
  },
  {
    id: 3,
    difficulty: 'easy',
    swedish: "Hon ___ kaffe",
    english: "She drinks coffee",
    options: ["dricker", "dricka", "drack", "har druckit"],
    correctAnswer: "dricker",
    explanation: "Present tense is used for regular actions. 'Dricker' is the present tense form of 'dricka'.",
    category: "Present Tense",
    hint: "What form do we use for regular, present actions?",
    pronunciation: {
      ipa: "/huːn ˈdrɪkər ˈkafə/",
      notes: "The 'ck' in 'dricker' is pronounced like 'k'"
    }
  },
  {
    id: 4,
    difficulty: 'easy',
    swedish: "___ pojke är min bror",
    english: "That boy is my brother",
    options: ["Den", "Det", "De", "Denna"],
    correctAnswer: "Den",
    explanation: "We use 'den' with en-words. 'Pojke' is an en-word.",
    category: "Demonstrative Pronouns",
    hint: "Is 'pojke' an en-word or ett-word?",
    pronunciation: {
      ipa: "/dɛn ˈpɔjkə æːr miːn bruːr/",
      notes: "Note how 'den' is shorter than 'det'"
    }
  },
  {
    id: 5,
    difficulty: 'easy',
    swedish: "Vi ___ glass",
    english: "We eat ice cream",
    options: ["äter", "äta", "åt", "har ätit"],
    correctAnswer: "äter",
    explanation: "Present tense 'äter' is used for current or habitual actions.",
    category: "Present Tense",
    hint: "Which form shows something happening now?",
    pronunciation: {
      ipa: "/viː ˈeːtər ɡlas/",
      notes: "The 'ä' in 'äter' is pronounced like 'e' in 'bed'"
    }
  },

  // Medium level questions
  {
    id: 6,
    difficulty: 'medium',
    swedish: "Vi ___ i parken igår",
    english: "We walked in the park yesterday",
    options: ["promenerade", "promenerar", "ska promenera", "har promenerat"],
    correctAnswer: "promenerade",
    explanation: "Past simple (preteritum) is used for completed actions in the past. 'Igår' (yesterday) indicates past time.",
    category: "Past Tense",
    hint: "The word 'igår' tells you when this happened",
    pronunciation: {
      ipa: "/viː prɔmənˈeːradə i ˈparkən iˈɡoːr/",
      notes: "Note the stress on 'e' in 'promenerade'"
    }
  },
  {
    id: 7,
    difficulty: 'medium',
    swedish: "De röda ___ är mina",
    english: "The red shoes are mine",
    options: ["skorna", "skor", "skon", "skornas"],
    correctAnswer: "skorna",
    explanation: "Definite plural form is used here: 'skor' (shoes) becomes 'skorna' (the shoes) in definite form.",
    category: "Definiteness",
    hint: "We're talking about specific shoes (the red ones)",
    pronunciation: {
      ipa: "/deː ˈrøːda ˈskuːɳa æːr ˈmiːna/",
      notes: "The 'r' in 'skorna' is pronounced with a retroflex 'ɳ'"
    }
  },
  {
    id: 8,
    difficulty: 'medium',
    swedish: "Han ___ redan maten",
    english: "He has already eaten the food",
    options: ["har ätit", "åt", "äter", "ska äta"],
    correctAnswer: "har ätit",
    explanation: "Present perfect (har + supinum) is used for actions completed in the recent past.",
    category: "Perfect Tense",
    hint: "Think about what tense we use with 'redan' (already)",
    pronunciation: {
      ipa: "/han haːr ˈeːtɪt ˈreːdan ˈmaːtən/",
      notes: "Note the difference between 'ätit' and 'äter'"
    }
  },
  {
    id: 9,
    difficulty: 'medium',
    swedish: "Du måste ___ dina läxor",
    english: "You must do your homework",
    options: ["göra", "gör", "gjorde", "har gjort"],
    correctAnswer: "göra",
    explanation: "After modal verbs like 'måste', we use the infinitive form of the verb.",
    category: "Modal Verbs",
    hint: "What form follows 'måste'?",
    pronunciation: {
      ipa: "/duː ˈmɔstə ˈjœːra diːna ˈlɛksuːr/",
      notes: "The 'g' in 'göra' is pronounced like 'j'"
    }
  },
  {
    id: 10,
    difficulty: 'medium',
    swedish: "___ gamla huset är till salu",
    english: "The old house is for sale",
    options: ["Det", "Den", "De", "Denna"],
    correctAnswer: "Det",
    explanation: "With ett-words in definite form that have an adjective, we use 'det'.",
    category: "Definite Articles with Adjectives",
    hint: "Is 'hus' an en-word or ett-word? Remember the adjective rule!",
    pronunciation: {
      ipa: "/deːt ˈɡamla ˈhuːsət æːr tɪl ˈsɑːlu/",
      notes: "Notice how 'gamla' ends with 'a' when used with the definite article"
    }
  },

  // Advanced level questions
  {
    id: 11,
    difficulty: 'advanced',
    swedish: "Om jag ___ tid, skulle jag läsa mer",
    english: "If I had time, I would read more",
    options: ["hade", "har", "skulle ha", "ska ha"],
    correctAnswer: "hade",
    explanation: "In conditional sentences (if-clauses), we use 'hade' in the if-part when talking about hypothetical present/future situations.",
    category: "Conditionals",
    hint: "This is a hypothetical situation - what form do we use in Swedish if-clauses?",
    pronunciation: {
      ipa: "/ɔm jɑː ˈhɑːdə tiːd ˈskɵlə jɑː ˈleːsa meːr/",
      notes: "Pay attention to the vowel length in 'hade' and 'tid'"
    }
  },
  {
    id: 12,
    difficulty: 'advanced',
    swedish: "Boken ___ av min syster igår",
    english: "The book was read by my sister yesterday",
    options: ["lästes", "läste", "har lästs", "blev läst"],
    correctAnswer: "lästes",
    explanation: "Passive voice in the past tense is formed with -s ending: 'läste' (read) becomes 'lästes' (was read).",
    category: "Passive Voice",
    hint: "How do we form passive voice in the past tense?",
    pronunciation: {
      ipa: "/ˈbuːkən ˈlɛstəs av min ˈsʏstər iˈɡoːr/",
      notes: "The 's' in 'lästes' marks passive voice"
    }
  },
  {
    id: 13,
    difficulty: 'advanced',
    swedish: "Trots att det regnade, ___ vi ut",
    english: "Despite the rain, we went out",
    options: ["gick", "hade gått", "skulle gå", "går"],
    correctAnswer: "gick",
    explanation: "Simple past tense is used in both clauses when describing actual events in the past, even in complex sentences.",
    category: "Complex Sentences",
    hint: "Both actions happened in the past - what tense should we use?",
    pronunciation: {
      ipa: "/trɔts at deːt ˈreːɡnadə ˈjɪk viː ʉːt/",
      notes: "Note the short 'i' sound in 'gick'"
    }
  },
  {
    id: 14,
    difficulty: 'advanced',
    swedish: "Ju mer du övar, desto ___ blir du",
    english: "The more you practice, the better you become",
    options: ["bättre", "bra", "god", "bäst"],
    correctAnswer: "bättre",
    explanation: "In comparative constructions with 'ju...desto', we use the comparative form of the adjective.",
    category: "Comparatives",
    hint: "What's the comparative form of 'bra'?",
    pronunciation: {
      ipa: "/juː meːr duː ˈøːvar ˈdɛstu ˈbɛtrə bliːr duː/",
      notes: "Notice the stress pattern in 'bättre'"
    }
  },
  {
    id: 15,
    difficulty: 'advanced',
    swedish: "Han undrade ___ jag ville följa med",
    english: "He wondered if I wanted to come along",
    options: ["om", "att", "när", "hur"],
    correctAnswer: "om",
    explanation: "In indirect questions about yes/no questions, we use 'om' (if/whether).",
    category: "Indirect Speech",
    hint: "Think about how you would ask this as a direct question",
    pronunciation: {
      ipa: "/han ˈɵndradə ɔm jɑː ˈvɪlə ˈfølja meːd/",
      notes: "Pay attention to the subordinate clause word order"
    }
  }
];

export const shuffleQuestions = (questions: Question[], difficulty: string): Question[] => {
  const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
  // Fisher-Yates shuffle algorithm
  for (let i = filteredQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
  }
  return filteredQuestions;
};