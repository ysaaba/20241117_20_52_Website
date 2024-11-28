import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeUp, CheckCircle, Cancel } from '@mui/icons-material';
import { Badge } from '@/components/ui/badge';

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

interface Question {
  id: number;
  swedish: string;
  english: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  type: 'word-order' | 'verb-form' | 'article' | 'adjective' | 'pronoun';
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  hint?: string;
  pronunciation?: {
    ipa: string;
    notes?: string;
  };
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const createRandomizedOptions = (correctAnswer: string, wrongOptions: string[]): string[] => {
  const options = [...wrongOptions];
  const randomPosition = Math.floor(Math.random() * (options.length + 1));
  options.splice(randomPosition, 0, correctAnswer);
  return options;
};

const questions: Question[] = [
  {
    id: 1,
    swedish: "Jag ___ en bok",
    english: "I read a book",
    options: createRandomizedOptions(
      "läser",
      ["läsa", "läste", "har läst"]
    ),
    correctAnswer: "läser",
    explanation: "In Swedish, we use the present tense form 'läser' for actions happening now or regularly. The verb always comes in second position in main clauses.",
    type: "verb-form",
    level: "beginner",
    category: "Present Tense",
    hint: "Think about what form you use to say 'I read' (right now)",
    pronunciation: {
      ipa: "/jɑː ˈleːsər en buːk/",
      notes: "Note the long 'e' sound in 'läser' and the long 'u' sound in 'bok'"
    }
  },
  {
    id: 2,
    swedish: "___ hus är stort",
    english: "The house is big",
    options: createRandomizedOptions(
      "Det",
      ["Ett", "Den", "En"]
    ),
    correctAnswer: "Det",
    explanation: "We use 'det' for ett-words in definite form. 'Hus' is an ett-word, so we use 'det' as the definite article.",
    type: "article",
    level: "beginner",
    category: "Articles",
    hint: "Is 'hus' an en-word or ett-word?",
    pronunciation: {
      ipa: "/deː ˈhʉːs ær stuːʈ/",
      notes: "Pay attention to the unique Swedish 'u' sound in 'hus'"
    }
  },
  {
    id: 3,
    swedish: "Han ___ i Stockholm förra året",
    english: "He lived in Stockholm last year",
    options: createRandomizedOptions(
      "bodde",
      ["bor", "har bott", "skulle bo"]
    ),
    correctAnswer: "bodde",
    explanation: "For completed actions in the past, we use the simple past tense (preteritum). 'Förra året' (last year) indicates a specific time in the past.",
    type: "verb-form",
    level: "intermediate",
    category: "Past Tense",
    hint: "The action is completed and happened at a specific time in the past",
    pronunciation: {
      ipa: "/han ˈbɔdə i stɔkˈhɔlm ˈfœra ˈoːrət/",
      notes: "Note the soft 'd' sound in 'bodde' and the stress on the first syllable of 'Stockholm'"
    }
  },
  {
    id: 4,
    swedish: "___ röda bilen är min",
    english: "The red car is mine",
    options: createRandomizedOptions(
      "Den",
      ["Det", "De", "En"]
    ),
    correctAnswer: "Den",
    explanation: "We use 'den' for en-words in definite form. 'Bil' is an en-word, so we use 'den' as the definite article.",
    type: "article",
    level: "beginner",
    category: "Articles",
    hint: "Is 'bil' an en-word or ett-word?",
    pronunciation: {
      ipa: "/dɛn ˈrøːda ˈbiːlən ær miːn/",
      notes: "Note the long 'ö' sound in 'röda' and the definite ending '-en' in 'bilen'"
    }
  },
  {
    id: 5,
    swedish: "Arrange: [kaffe, dricker, varje morgon, jag]",
    english: "I drink coffee every morning",
    options: createRandomizedOptions(
      "Jag dricker kaffe varje morgon",
      ["Varje morgon jag dricker kaffe", "Dricker jag kaffe varje morgon", "Jag kaffe dricker varje morgon"]
    ),
    correctAnswer: "Jag dricker kaffe varje morgon",
    explanation: "In Swedish main clauses, the verb must come in second position (V2 rule). The subject usually comes first, followed by the verb, then the object and time expressions.",
    type: "word-order",
    level: "intermediate",
    category: "Word Order",
    hint: "Remember the V2 rule - the verb must come in second position",
    pronunciation: {
      ipa: "/jɑː ˈdrɪkər ˈkafə ˈvarjə ˈmɔrɡɔn/",
      notes: "Note the rolled 'r' in 'dricker' and the stress pattern across the phrase"
    }
  },
  {
    id: 6,
    swedish: "Boken är ___ (interesting)",
    english: "The book is interesting",
    options: createRandomizedOptions(
      "intressant",
      ["intressanta", "intressants", "intressante"]
    ),
    correctAnswer: "intressant",
    explanation: "Adjectives in predicate position (after 'är') don't change form based on the noun's gender or number when describing a single noun.",
    type: "adjective",
    level: "beginner",
    category: "Adjectives",
    hint: "After 'är', adjectives usually take their basic form",
    pronunciation: {
      ipa: "/ˈbuːkən ær ɪntrəˈsant/",
      notes: "Note that 'intressant' is stressed on the last syllable"
    }
  },
  {
    id: 7,
    swedish: "___ gillar att laga mat",
    english: "They like to cook",
    options: createRandomizedOptions(
      "De",
      ["Dem", "Dom", "Di"]
    ),
    correctAnswer: "De",
    explanation: "'De' is the subject form (they), while 'dem' is the object form (them). In subject position, we use 'de'.",
    type: "pronoun",
    level: "intermediate",
    category: "Pronouns",
    hint: "Is this pronoun the subject (doing the action) or object (receiving the action)?",
    pronunciation: {
      ipa: "/dɔm ˈjiːlar ɔt ˈlɑːɡa mɑːt/",
      notes: "Note that 'de' is pronounced as 'dom' in spoken Swedish"
    }
  },
  {
    id: 8,
    swedish: "Hon har ___ mat i två timmar",
    english: "She has been cooking food for two hours",
    options: createRandomizedOptions(
      "lagat",
      ["lagar", "lagade", "laga"]
    ),
    correctAnswer: "lagat",
    explanation: "In the present perfect tense (har + supine), we use the supine form of the verb (lagat). This is used for actions that started in the past and continue to the present.",
    type: "verb-form",
    level: "intermediate",
    category: "Present Perfect",
    hint: "After 'har', we need the supine form of the verb",
    pronunciation: {
      ipa: "/huːn har ˈlɑːɡat mɑːt i tvɔː ˈtɪmar/",
      notes: "Pay attention to the stress in 'timmar' and the long vowel in 'har'"
    }
  },
  {
    id: 9,
    swedish: "Det är ___ kallt idag",
    english: "It is very cold today",
    options: createRandomizedOptions(
      "mycket",
      ["väldigt", "så", "jätte"]
    ),
    correctAnswer: "mycket",
    explanation: "'Mycket' is commonly used to intensify adjectives, similar to 'very' in English. Other options like 'väldigt' and 'jätte-' are also correct in spoken Swedish.",
    type: "adjective",
    level: "beginner",
    category: "Adverbs",
    hint: "Which word is most commonly used to say 'very'?",
    pronunciation: {
      ipa: "/deː ær ˈmʏkːət kalt iˈdɑː/",
      notes: "Note the 'y' sound in 'mycket' and the stress pattern"
    }
  },
  {
    id: 10,
    swedish: "___ ska du göra i helgen?",
    english: "What are you going to do on the weekend?",
    options: createRandomizedOptions(
      "Vad",
      ["När", "Var", "Vem"]
    ),
    correctAnswer: "Vad",
    explanation: "'Vad' means 'what' and is used for asking about actions or things. Remember that in questions, the verb comes before the subject.",
    type: "word-order",
    level: "beginner",
    category: "Questions",
    hint: "Which question word asks about an action?",
    pronunciation: {
      ipa: "/vɑːd ska dʉː ˈjœːra i ˈhɛljən/",
      notes: "Note the question intonation and the soft 'g' in 'helgen'"
    }
  },
  {
    id: 11,
    swedish: "Vi måste ___ nu",
    english: "We must leave now",
    options: createRandomizedOptions(
      "gå",
      ["går", "gick", "gått"]
    ),
    correctAnswer: "gå",
    explanation: "After modal verbs like 'måste' (must), we use the infinitive form of the main verb without 'att'.",
    type: "verb-form",
    level: "intermediate",
    category: "Modal Verbs",
    hint: "Modal verbs are followed by the basic form (infinitive)",
    pronunciation: {
      ipa: "/viː ˈmɔstə ɡoː nuː/",
      notes: "Note how 'mste' and 'gå' connect in natural speech"
    }
  },
  {
    id: 12,
    swedish: "Jag vet att han ___ komma imorgon",
    english: "I know that he will come tomorrow",
    options: createRandomizedOptions(
      "ska",
      ["skall", "skulle", "har"]
    ),
    correctAnswer: "ska",
    explanation: "'Ska' is used to express future intentions or plans. In subordinate clauses (after 'att'), the word order is different from main clauses.",
    type: "verb-form",
    level: "advanced",
    category: "Future Tense",
    hint: "Which word expresses future plans?",
    pronunciation: {
      ipa: "/jɑː veːt at han ska ˈkɔma iˈmɔrɔn/",
      notes: "Note how 'ska' is unstressed in the sentence"
    }
  },
  {
    id: 13,
    swedish: "___ gamla huset är till salu",
    english: "The old house is for sale",
    options: createRandomizedOptions(
      "Det",
      ["Den", "De", "Ett"]
    ),
    correctAnswer: "Det",
    explanation: "With ett-words like 'hus', we use 'det' in definite form. The adjective 'gamla' takes the definite form (-a ending) when used with a definite noun.",
    type: "article",
    level: "intermediate",
    category: "Definite Forms",
    hint: "Remember that 'hus' is an ett-word",
    pronunciation: {
      ipa: "/deː ˈɡamla ˈhʉːsət ær tɪl ˈsɑːlʉ/",
      notes: "Note the definite ending '-et' in 'huset' and the 'a' ending in 'gamla'"
    }
  },
  {
    id: 14,
    swedish: "Arrange: [ofta, på bio, går, han]",
    english: "He often goes to the cinema",
    options: createRandomizedOptions(
      "Han går ofta på bio",
      ["Ofta han går på bio", "Han ofta går på bio", "Går han ofta på bio"]
    ),
    correctAnswer: "Han går ofta på bio",
    explanation: "In main clauses, adverbs like 'ofta' come after the verb in V2 position. The subject comes first, followed by the verb, then adverbs, and finally other elements.",
    type: "word-order",
    level: "advanced",
    category: "Adverb Position",
    hint: "Remember: subject - verb - adverb - object/place",
    pronunciation: {
      ipa: "/han ɡoːr ˈɔfta poː biːu/",
      notes: "Note how 'på bio' is treated as one unit in pronunciation"
    }
  },
  {
    id: 15,
    swedish: "Barnen ___ i trädgården",
    english: "The children are playing in the garden",
    options: createRandomizedOptions(
      "leker",
      ["lekar", "lekte", "leka"]
    ),
    correctAnswer: "leker",
    explanation: "Present tense in Swedish is used for both simple present ('play') and present continuous ('are playing'). For regular verbs ending in -a, add -r for present tense.",
    type: "verb-form",
    level: "beginner",
    category: "Present Tense",
    hint: "Think about the present tense ending for -a verbs",
    pronunciation: {
      ipa: "/ˈbɑːɳən ˈleːkər i ˈtrɛdɡoːɖən/",
      notes: "Note the retroflex 'rd' sound in 'trädgården'"
    }
  },
  {
    id: 16,
    swedish: "Jag ___ inte vad hon sa",
    english: "I didn't hear what she said",
    options: createRandomizedOptions(
      "hörde",
      ["hör", "har hört", "hade hört"]
    ),
    correctAnswer: "hörde",
    explanation: "Simple past tense (preteritum) is used for completed actions in the past. Since this refers to a specific moment, we use 'hörde'.",
    type: "verb-form",
    level: "intermediate",
    category: "Past Tense",
    hint: "This is about a specific moment in the past",
    pronunciation: {
      ipa: "/jɑː ˈhœːɖə ɪntə vɑː huːn sɑː/",
      notes: "Note the retroflex 'd' sound in 'hörde'"
    }
  },
  {
    id: 17,
    swedish: "___ stora trädet är gammalt",
    english: "The big tree is old",
    options: createRandomizedOptions(
      "Det",
      ["Den", "De", "Ett"]
    ),
    correctAnswer: "Det",
    explanation: "'Träd' is an ett-word, so we use 'det' as the definite article. The adjective 'stora' is in its definite form because it's used with a definite noun.",
    type: "article",
    level: "beginner",
    category: "Articles",
    hint: "'Träd' (tree) is an ett-word",
    pronunciation: {
      ipa: "/deː ˈstuːra ˈtrɛːdət ær ˈɡamalːt/",
      notes: "Pay attention to the long vowel in 'stora' and the definite ending in 'trädet'"
    }
  },
  {
    id: 18,
    swedish: "Arrange: [alltid, på morgonen, kaffe, hon, dricker]",
    english: "She always drinks coffee in the morning",
    options: createRandomizedOptions(
      "Hon dricker alltid kaffe på morgonen",
      ["Hon alltid dricker kaffe på morgonen", "Alltid dricker hon kaffe på morgonen", "Hon dricker kaffe alltid på morgonen"]
    ),
    correctAnswer: "Hon dricker alltid kaffe på morgonen",
    explanation: "In main clauses, adverbs like 'alltid' come after the verb. The word order is: subject - verb - adverb - object - time expression.",
    type: "word-order",
    level: "advanced",
    category: "Word Order",
    hint: "Remember KONJ rule: Conjunction, Subject, Verb, Adverb, Object, Time",
    pronunciation: {
      ipa: "/huːn ˈdrɪkər ˈaltɪd ˈkafə poː ˈmɔrɡunən/",
      notes: "Note how 'alltid' links smoothly with the surrounding words"
    }
  },
  {
    id: 19,
    swedish: "Vi har ___ i Sverige i fem år",
    english: "We have lived in Sweden for five years",
    options: createRandomizedOptions(
      "bott",
      ["bodde", "bor", "bo"]
    ),
    correctAnswer: "bott",
    explanation: "With 'har' (present perfect), we use the supine form of the verb. This tense is used for actions that started in the past and continue to the present.",
    type: "verb-form",
    level: "intermediate",
    category: "Present Perfect",
    hint: "After 'har', use the supine form",
    pronunciation: {
      ipa: "/viː har bɔt i svɛrjə i fɛm oːr/",
      notes: "The 't' in 'bott' is clearly pronounced"
    }
  },
  {
    id: 20,
    swedish: "Maten är ___ (ready)",
    english: "The food is ready",
    options: createRandomizedOptions(
      "färdig",
      ["färdigt", "färdiga", "färdige"]
    ),
    correctAnswer: "färdig",
    explanation: "When an adjective follows 'är' and describes an en-word ('mat' is an en-word), we use the basic form without any ending.",
    type: "adjective",
    level: "beginner",
    category: "Adjectives",
    hint: "After 'är', use the basic form for singular en-words",
    pronunciation: {
      ipa: "/ˈmɑːtən ær ˈfæːɖɪɡ/",
      notes: "Note the retroflex 'd' sound in 'färdig'"
    }
  },
  {
    id: 21,
    swedish: "Om jag ___ pengar skulle jag resa världen runt",
    english: "If I had money, I would travel around the world",
    options: createRandomizedOptions(
      "hade",
      ["har", "skulle ha", "skulle hade"]
    ),
    correctAnswer: "hade",
    explanation: "In conditional clauses (if-sentences), we use 'hade' in the if-clause and 'skulle' + infinitive in the main clause.",
    type: "verb-form",
    level: "advanced",
    category: "Conditionals",
    hint: "Think about the structure: 'Om + subject + hade..., skulle + subject + infinitive'",
    pronunciation: {
      ipa: "/ɔm jɑː ˈhadə ˈpɛŋar ˈskʉlə jɑː ˈreːsa ˈvæːrdən rʉnt/",
      notes: "Note the conditional tone in pronunciation"
    }
  },
  {
    id: 22,
    swedish: "Arrange: [som, boken, igår, köpte, jag, var, intressant]",
    english: "The book that I bought yesterday was interesting",
    options: createRandomizedOptions(
      "Boken som jag köpte igår var intressant",
      ["Boken jag köpte som igår var intressant", "Boken som köpte jag igår var intressant", "Boken jag som köpte igår var intressant"]
    ),
    correctAnswer: "Boken som jag köpte igår var intressant",
    explanation: "In relative clauses with 'som', the word order follows: subject - verb - time expression. The relative pronoun 'som' connects the main clause with the subordinate clause.",
    type: "word-order",
    level: "advanced",
    category: "Relative Clauses",
    hint: "Remember that 'som' is followed by the subject in relative clauses",
    pronunciation: {
      ipa: "/ˈbuːkən sɔm jɑː ˈɕøptə iˈɡoːr vɑː ɪntrəˈsant/",
      notes: "Pay attention to the linking between words"
    }
  },
  {
    id: 23,
    swedish: "Hon undrade ___ jag ville följa med",
    english: "She wondered if I wanted to come along",
    options: createRandomizedOptions(
      "om",
      ["att", "när", "vilket"]
    ),
    correctAnswer: "om",
    explanation: "In indirect questions, 'om' is used to mean 'if/whether'. The word order in the subordinate clause is different from direct questions.",
    type: "word-order",
    level: "intermediate",
    category: "Indirect Speech",
    hint: "Which word is used to report yes/no questions in indirect speech?",
    pronunciation: {
      ipa: "/huːn ˈɵndrɑːdə ɔm jɑː ˈvɪlə ˈfølja meːd/",
      notes: "Note how 'följa med' forms a unit in pronunciation"
    }
  },
  {
    id: 24,
    swedish: "Ju mer man övar, ___ blir man",
    english: "The more you practice, the better you become",
    options: createRandomizedOptions(
      "desto bättre",
      ["så bättre", "mer bättre", "bättre"]
    ),
    correctAnswer: "desto bättre",
    explanation: "In comparative constructions, 'ju...desto' is used to express 'the more...the more'. This is a fixed expression in Swedish.",
    type: "word-order",
    level: "advanced",
    category: "Comparatives",
    hint: "This is a fixed expression using 'ju' and 'desto'",
    pronunciation: {
      ipa: "/jʉː meːr man ˈøːvar ˈdɛstʊ ˈbɛtrə bliːr man/",
      notes: "Note the stress pattern in the comparative construction"
    }
  },
  {
    id: 25,
    swedish: "Trots ___ det regnade gick vi ut",
    english: "Despite the fact that it was raining, we went out",
    options: createRandomizedOptions(
      "att",
      ["om", "vilket", "som"]
    ),
    correctAnswer: "att",
    explanation: "'Trots att' is a compound conjunction meaning 'despite/although'. It's followed by a complete clause with subject and verb.",
    type: "word-order",
    level: "intermediate",
    category: "Conjunctions",
    hint: "Which word combines with 'trots' to form a conjunction?",
    pronunciation: {
      ipa: "/truːts at de ˈreːɡnadə jɪk viː ʉːt/",
      notes: "The 't' in 'trots' is clearly pronounced"
    }
  },
  {
    id: 26,
    swedish: "Låt oss ___ på bio ikväll",
    english: "Let's go to the movies tonight",
    options: createRandomizedOptions(
      "gå",
      ["går", "gick", "att gå"]
    ),
    correctAnswer: "gå",
    explanation: "After 'låt oss' (let's), we use the infinitive form without 'att'. This is a common construction for suggestions.",
    type: "verb-form",
    level: "intermediate",
    category: "Imperatives",
    hint: "After 'låt oss', use the basic form of the verb",
    pronunciation: {
      ipa: "/loːt ɔs ɡoː poː biːu iˈkvɛl/",
      notes: "Note how 'låt oss' often contracts in speech"
    }
  },
  {
    id: 27,
    swedish: "___ sig ha glömt nyckeln hemma",
    english: "He/She turned out to have forgotten the key at home",
    options: createRandomizedOptions(
      "Visade",
      ["Visat", "Visa", "Visar"]
    ),
    correctAnswer: "Visade",
    explanation: "The reflexive construction 'visa sig' (turn out/appear) uses past tense when referring to a discovered fact. The infinitive follows without 'att'.",
    type: "verb-form",
    level: "advanced",
    category: "Reflexive Verbs",
    hint: "Think about which tense to use when discovering something in the past",
    pronunciation: {
      ipa: "/ˈviːsadə sej ha ˈɡlømt ˈnʏkəln ˈhɛma/",
      notes: "Pay attention to the reflexive pronoun 'sig'"
    }
  },
  {
    id: 28,
    swedish: "Det är viktigt ___ i tid",
    english: "It's important to be on time",
    options: createRandomizedOptions(
      "att vara",
      ["vara", "är", "att är"]
    ),
    correctAnswer: "att vara",
    explanation: "After impersonal expressions like 'det är viktigt', we use 'att' + infinitive. This is similar to English 'to be'.",
    type: "verb-form",
    level: "intermediate",
    category: "Infinitive Constructions",
    hint: "What comes after 'det är viktigt'?",
    pronunciation: {
      ipa: "/deː ær ˈvɪktɪt at ˈvɑːra i tiːd/",
      notes: "Note the clear pronunciation of 'att' before 'vara'"
    }
  },
  {
    id: 29,
    swedish: "Jag vill ___ svenska bättre",
    english: "I want to speak Swedish better",
    options: createRandomizedOptions(
      "tala",
      ["talar", "att tala", "talat"]
    ),
    correctAnswer: "tala",
    explanation: "After modal verbs like 'vill', we use the infinitive form without 'att'. This is different from English where we use 'to'.",
    type: "verb-form",
    level: "advanced",
    category: "Modal Verbs",
    hint: "Modal verbs are followed by the basic form without 'att'",
    pronunciation: {
      ipa: "/jɑː vɪl ˈtɑːla svɛnska ˈbɛtːrə/",
      notes: "Pay attention to the stress in 'bättre'"
    }
  },
  {
    id: 30,
    swedish: "___ du hjälpa mig med läxorna?",
    english: "Could you help me with the homework?",
    options: createRandomizedOptions(
      "Skulle",
      ["Ska", "Vill", "Kan"]
    ),
    correctAnswer: "Skulle",
    explanation: "'Skulle' is used for polite requests, similar to 'could' in English. In questions, the verb comes first.",
    type: "verb-form",
    level: "advanced",
    category: "Modal Verbs",
    hint: "Which modal verb is most polite?",
    pronunciation: {
      ipa: "/ˈskʉlə dʉː ˈjɛlpa mej med ˈlɛksʊɳa/",
      notes: "Note the polite intonation pattern"
    }
  },
  {
    id: 31,
    swedish: "Hon ___ sin telefon hemma",
    english: "She forgot her phone at home",
    options: createRandomizedOptions(
      "glömde",
      ["glömmer", "har glömt", "glöm"]
    ),
    correctAnswer: "glömde",
    explanation: "Simple past tense (preteritum) is used for completed actions in the past. The verb 'glömma' becomes 'glömde' in past tense.",
    type: "verb-form",
    level: "beginner",
    category: "Past Tense",
    hint: "This happened at a specific time in the past",
    pronunciation: {
      ipa: "/huːn ˈɡlœmdə sɪn teləfoːn ˈhɛma/",
      notes: "Note the 'ö' sound in 'glömde'"
    }
  },
  {
    id: 32,
    swedish: "___ röda bilen är snabb",
    english: "The red car is fast",
    options: createRandomizedOptions(
      "Den",
      ["Det", "En", "Ett"]
    ),
    correctAnswer: "Den",
    explanation: "'Bil' is an en-word, so we use 'den' with the definite form. The adjective 'röda' takes the definite form because it comes between the article and the noun.",
    type: "article",
    level: "beginner",
    category: "Articles and Adjectives",
    hint: "Is 'bil' an en-word or ett-word?",
    pronunciation: {
      ipa: "/dɛn ˈrøːda ˈbiːlən ær snab/",
      notes: "Pay attention to the long 'ö' in 'röda'"
    }
  },
  {
    id: 33,
    swedish: "Jag har ___ i Sverige i fem år",
    english: "I have lived in Sweden for five years",
    options: createRandomizedOptions(
      "bott",
      ["bodde", "bor", "bo"]
    ),
    correctAnswer: "bott",
    explanation: "With 'har' (present perfect), we use the supine form of the verb. This describes an action that started in the past and continues to the present.",
    type: "verb-form",
    level: "intermediate",
    category: "Present Perfect",
    hint: "After 'har', use the supine form",
    pronunciation: {
      ipa: "/jɑː har bɔt i svɛrjə i fɛm oːr/",
      notes: "The 't' in 'bott' is clearly pronounced"
    }
  },
  {
    id: 34,
    swedish: "Om jag ___ tid, skulle jag resa mer",
    english: "If I had time, I would travel more",
    options: createRandomizedOptions(
      "hade",
      ["har", "skulle ha", "skulle hade"]
    ),
    correctAnswer: "hade",
    explanation: "In conditional sentences, use 'hade' in the if-clause and 'skulle' + infinitive in the main clause to express hypothetical situations.",
    type: "verb-form",
    level: "advanced",
    category: "Conditionals",
    hint: "This is a hypothetical situation in the present/future",
    pronunciation: {
      ipa: "/ɔm jɑː ˈhɑːdə tiːd ˈskʉlə jɑː ˈreːsa meːr/",
      notes: "Note the conditional intonation pattern"
    }
  },
  {
    id: 35,
    swedish: "Trots ___ det regnar går vi ut",
    english: "Although it's raining, we're going out",
    options: createRandomizedOptions(
      "att",
      ["om", "när", "vilket"]
    ),
    correctAnswer: "att",
    explanation: "'Trots att' is a compound conjunction meaning 'although/despite'. It's always followed by a complete clause.",
    type: "conjunction",
    level: "intermediate",
    category: "Conjunctions",
    hint: "Which word combines with 'trots' to form 'although'?",
    pronunciation: {
      ipa: "/truːts at de ˈreːŋnar ɡoːr viː ʉːt/",
      notes: "Note how 'trots att' links together in speech"
    }
  },
  {
    id: 36,
    swedish: "Ju mer du övar, ___ blir du",
    english: "The more you practice, the better you become",
    options: createRandomizedOptions(
      "desto bättre",
      ["så bättre", "mer bättre", "mycket bättre"]
    ),
    correctAnswer: "desto bättre",
    explanation: "The construction 'ju...desto' is used for comparisons meaning 'the more...the more'. It's a fixed expression in Swedish.",
    type: "word-order",
    level: "advanced",
    category: "Comparisons",
    hint: "This is a fixed expression with 'ju' at the start",
    pronunciation: {
      ipa: "/jʉː meːr dʉː ˈøːvar ˈdɛstʊ ˈbɛtrə bliːr dʉː/",
      notes: "Note the rhythm in this comparative construction"
    }
  },
  {
    id: 37,
    swedish: "___ ligger nycklarna?",
    english: "Where are the keys?",
    options: createRandomizedOptions(
      "Var",
      ["Vad", "När", "Vem"]
    ),
    correctAnswer: "Var",
    explanation: "'Var' is used to ask about location (where). In questions, the verb comes directly after the question word.",
    type: "word-order",
    level: "beginner",
    category: "Questions",
    hint: "Which question word asks about location?",
    pronunciation: {
      ipa: "/vɑːr ˈlɪɡər ˈnʏklaɳa/",
      notes: "Note the question intonation"
    }
  },
  {
    id: 38,
    swedish: "Han undrade ___ jag ville komma",
    english: "He wondered if I wanted to come",
    options: createRandomizedOptions(
      "om",
      ["att", "när", "vilket"]
    ),
    correctAnswer: "om",
    explanation: "In indirect questions, 'om' is used to mean 'if/whether'. The word order in the subordinate clause follows the BIFF rule (Bisats I Fel Följd).",
    type: "conjunction",
    level: "intermediate",
    category: "Indirect Speech",
    hint: "Which word is used to report yes/no questions?",
    pronunciation: {
      ipa: "/han ˈɵndrɑːdə ɔm jɑː ˈvɪlə ˈkɔma/",
      notes: "Pay attention to the subordinate clause intonation"
    }
  },
  {
    id: 39,
    swedish: "De ___ varandra i många år",
    english: "They have known each other for many years",
    options: createRandomizedOptions(
      "har känt",
      ["känner", "kände", "känt"]
    ),
    correctAnswer: "har känt",
    explanation: "Present perfect (har + supine) is used for actions that started in the past and continue to the present. With 'i många år' we use present perfect.",
    type: "verb-form",
    level: "advanced",
    category: "Present Perfect",
    hint: "This is an ongoing situation that started in the past",
    pronunciation: {
      ipa: "/dɔm har ɕɛnt varˈandra i ˈmoːŋa oːr/",
      notes: "Note the length of the vowel in 'år'"
    }
  },
  {
    id: 40,
    swedish: "Maten ___ färdig om en timme",
    english: "The food will be ready in an hour",
    options: createRandomizedOptions(
      "blir",
      ["är", "var", "ska"]
    ),
    correctAnswer: "blir",
    explanation: "'Blir' is used to express becoming or changing state. It's often used for future events that involve a change.",
    type: "verb-form",
    level: "intermediate",
    category: "Future Expressions",
    hint: "Which verb expresses becoming or changing state?",
    pronunciation: {
      ipa: "/ˈmɑːtən bliːr ˈfæːrdɪɡ ɔm en ˈtɪmə/",
      notes: "Note how 'blir' indicates a change of state"
    }
  },
  {
    id: 41,
    swedish: "Jag ___ aldrig varit i Norge",
    english: "I have never been to Norway",
    options: createRandomizedOptions(
      "har",
      ["hade", "skulle", "var"]
    ),
    correctAnswer: "har",
    explanation: "In present perfect negations with 'aldrig', we use 'har' + supine. The word order places 'aldrig' after the auxiliary verb.",
    type: "verb-form",
    level: "intermediate",
    category: "Present Perfect",
    hint: "Which auxiliary verb is used with 'aldrig' in present perfect?",
    pronunciation: {
      ipa: "/jɑː har ˈaldrɪ ˈvɑːrɪt i ˈnɔrjə/",
      notes: "Note how 'aldrig' affects the sentence rhythm"
    }
  },
  {
    id: 42,
    swedish: "___ gamla huset målades om",
    english: "The old house was repainted",
    options: createRandomizedOptions(
      "Det",
      ["Den", "De", "Ett"]
    ),
    correctAnswer: "Det",
    explanation: "'Hus' is an ett-word, so we use 'det' as the definite article. The adjective 'gamla' is in definite form because it's between the article and noun.",
    type: "article",
    level: "beginner",
    category: "Articles",
    hint: "'Hus' is an ett-word, which article do we use?",
    pronunciation: {
      ipa: "/deː ˈɡamla ˈhʉːsət moːladəs ɔm/",
      notes: "Pay attention to the passive 's' ending in 'målades'"
    }
  },
  {
    id: 43,
    swedish: "Arrange: [inte, förstår, varför, hon, kommer, jag]",
    english: "I don't understand why she's coming",
    options: createRandomizedOptions(
      "Jag förstår inte varför hon kommer",
      ["Jag inte förstår varför hon kommer", "Inte förstår jag varför hon kommer", "Jag förstår varför hon inte kommer"]
    ),
    correctAnswer: "Jag förstår inte varför hon kommer",
    explanation: "In main clauses, the negation 'inte' comes after the finite verb. In subordinate clauses (after 'varför'), the word order follows BIFF rule.",
    type: "word-order",
    level: "advanced",
    category: "Negation",
    hint: "Remember: verb second in main clause, 'inte' after the finite verb",
    pronunciation: {
      ipa: "/jɑː fœˈʂtoːr ˈɪntə ˈvɑːˌfœr huːn ˈkɔmər/",
      notes: "Note the stress pattern in the complex sentence"
    }
  },
  {
    id: 44,
    swedish: "Du måste ___ på svaret",
    english: "You have to wait for the answer",
    options: createRandomizedOptions(
      "vänta",
      ["väntar", "väntade", "väntat"]
    ),
    correctAnswer: "vänta",
    explanation: "After modal verbs like 'måste', we use the infinitive form. 'Vänta på' is a fixed verb + preposition combination meaning 'wait for'.",
    type: "verb-form",
    level: "intermediate",
    category: "Verb + Preposition",
    hint: "After 'måste', use the basic form of the verb",
    pronunciation: {
      ipa: "/dʉː ˈmɔstə ˈvɛnta poː ˈsvɑːrət/",
      notes: "Note how 'vänta på' forms a unit in pronunciation"
    }
  },
  {
    id: 45,
    swedish: "Barnen ___ på TV",
    english: "The children are watching TV",
    options: createRandomizedOptions(
      "tittar",
      ["tittas", "titt", "titta"]
    ),
    correctAnswer: "tittar",
    explanation: "'Titta på' is a fixed expression meaning 'look at/watch'. In present tense, -ar verbs add -r to the infinitive.",
    type: "verb-form",
    level: "beginner",
    category: "Verb + Preposition",
    hint: "Present tense of 'titta' + the correct preposition",
    pronunciation: {
      ipa: "/ˈbɑːɳən ˈtɪtar poː teːveː/",
      notes: "Note how 'tittar på' connects in natural speech"
    }
  },
  {
    id: 46,
    swedish: "Han ___ inte ___ spöken",
    english: "He doesn't believe in ghosts",
    options: createRandomizedOptions(
      "tror | på",
      ["tror | i", "tror | om", "tror | av"]
    ),
    correctAnswer: "tror | på",
    explanation: "'Tro på' is a fixed expression meaning 'believe in'. The negation 'inte' comes between the verb and its preposition.",
    type: "verb-form",
    level: "advanced",
    category: "Verb + Preposition",
    hint: "Which preposition goes with 'tro' to mean 'believe in'?",
    pronunciation: {
      ipa: "/han truːr ˈɪntə poː ˈspøːkən/",
      notes: "Pay attention to the placement of 'inte'"
    }
  },
  {
    id: 47,
    swedish: "De ___ åt hans skämt",
    english: "They laughed at his joke",
    options: createRandomizedOptions(
      "skrattade",
      ["skrattar", "skratt", "har skrattat"]
    ),
    correctAnswer: "skrattade",
    explanation: "'Skratta åt' is a fixed expression meaning 'laugh at'. Past tense is used for completed actions in the past.",
    type: "verb-form",
    level: "intermediate",
    category: "Verb + Preposition",
    hint: "This happened in the past - which form of 'skratta' do we use?",
    pronunciation: {
      ipa: "/dɔm ˈskratadə oːt hans ʃɛmt/",
      notes: "Note the 'åt' preposition is unstressed"
    }
  },
  {
    id: 48,
    swedish: "___ klockan är det?",
    english: "What time is it?",
    options: createRandomizedOptions(
      "Hur",
      ["Vad", "När", "Vilken"]
    ),
    correctAnswer: "Hur",
    explanation: "Time questions in Swedish use 'hur' with 'klockan'. Literally 'how much is the clock?'",
    type: "word-order",
    level: "beginner",
    category: "Time Expressions",
    hint: "Which question word is used to ask about time?",
    pronunciation: {
      ipa: "/hʉːr ˈklɔkan ær deː/",
      notes: "Rising intonation for questions"
    }
  },
  {
    id: 49,
    swedish: "Hon bryr sig inte ___ vädret",
    english: "She doesn't care about the weather",
    options: createRandomizedOptions(
      "om",
      ["på", "av", "för"]
    ),
    correctAnswer: "om",
    explanation: "'Bry sig om' is a reflexive verb + preposition combination meaning 'care about'. The reflexive pronoun 'sig' comes before the preposition.",
    type: "verb-form",
    level: "advanced",
    category: "Reflexive Verbs",
    hint: "Which preposition completes 'bry sig __'?",
    pronunciation: {
      ipa: "/huːn brʏːr sej ˈɪntə ɔm ˈvɛːdrət/",
      notes: "Note how the reflexive 'sig' links with the preposition"
    }
  },
  {
    id: 50,
    swedish: "Jag ser fram ___ att träffa dig",
    english: "I'm looking forward to meeting you",
    options: createRandomizedOptions(
      "emot",
      ["mot", "till", "på"]
    ),
    correctAnswer: "emot",
    explanation: "'Se fram emot' is a particle verb meaning 'look forward to'. It's followed by 'att' + infinitive.",
    type: "particle-verb",
    level: "advanced",
    category: "Particle Verbs",
    hint: "Complete the expression 'se fram ___'",
    pronunciation: {
      ipa: "/jɑː seːr fram eˈmuːt at ˈtrɛfa dej/",
      notes: "Stress is on the particle 'emot'"
    }
  },
  {
    id: 51,
    swedish: "Arrange: [igår, köpte, jag, en ny, jacka]",
    english: "I bought a new jacket yesterday",
    options: createRandomizedOptions(
      "Igår köpte jag en ny jacka",
      ["Jag köpte igår en ny jacka", "Köpte jag igår en ny jacka", "Jag köpte en ny jacka igår"]
    ),
    correctAnswer: "Igår köpte jag en ny jacka",
    explanation: "When a sentence begins with a time expression (igår), the verb must come second, followed by the subject. This is called V2 word order.",
    type: "word-order",
    level: "intermediate",
    category: "Word Order",
    hint: "Remember V2 rule: verb must be second element",
    pronunciation: {
      ipa: "/iˈɡoːr ˈɕøptə jɑː en nʏː ˈjaka/",
      notes: "Note how time expression affects word order"
    }
  },
  {
    id: 52,
    swedish: "Katten ___ på bordet",
    english: "The cat is lying on the table",
    options: createRandomizedOptions(
      "ligger",
      ["liggar", "lägger", "lagt"]
    ),
    correctAnswer: "ligger",
    explanation: "'Ligga' (lie) and 'lägga' (lay) are often confused. 'Ligga' describes position/location, while 'lägga' is about placing something.",
    type: "verb-form",
    level: "intermediate",
    category: "Position Verbs",
    hint: "Which verb describes the cat's position?",
    pronunciation: {
      ipa: "/ˈkatən ˈlɪɡər poː ˈbuːrdət/",
      notes: "Don't confuse 'ligger' with 'lägger'"
    }
  },
  {
    id: 53,
    swedish: "___ av oss vill åka hem",
    english: "None of us want to go home",
    options: createRandomizedOptions(
      "Ingen",
      ["Inget", "Inga", "Int"]
    ),
    correctAnswer: "Ingen",
    explanation: "'Ingen' is used for en-words and people, 'inget' for ett-words, and 'inga' for plurals. With 'av oss', use 'ingen'.",
    type: "pronoun",
    level: "advanced",
    category: "Negation",
    hint: "Which form of 'ingen' is used with 'av oss'?",
    pronunciation: {
      ipa: "/ˈɪŋən av ɔs vɪl ˈoːka hem/",
      notes: "Note the stress on first syllable of 'ingen'"
    }
  }
];

const GrammarPractice: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [activeTab, setActiveTab] = useState<'practice' | 'explanations'>('practice');
  const [voiceReady, setVoiceReady] = useState(false);

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

  const handleSpeak = (text: string) => {
    if (voiceReady && window.responsiveVoice) {
      window.responsiveVoice.speak(text, 'Swedish Male', {
        pitch: 1,
        rate: 0.9,
        volume: 1
      });
    }
  };

  const filteredQuestions = questions.filter(q => q.level === selectedLevel);
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Swedish Grammar
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Master Swedish grammar through interactive exercises and clear explanations
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              onClick={() => {
                setSelectedLevel(level as 'beginner' | 'intermediate' | 'advanced');
                setCurrentQuestionIndex(0);
                setScore(0);
                setStreak(0);
                setShowFeedback(false);
                setSelectedAnswer(null);
              }}
              className={`px-4 py-2 rounded-md ${
                selectedLevel === level
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/10">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="default" size="sm">
                  Question {currentQuestionIndex + 1}/{filteredQuestions.length}
                </Badge>
                <div className="flex space-x-4">
                  <Badge variant="green" size="sm">
                    Score: {score}/{filteredQuestions.length}
                  </Badge>
                  <Badge variant="yellow" size="sm">
                    Streak: {streak}
                  </Badge>
                </div>
              </div>

              <div className="mt-8">
                <div className="rounded-xl bg-gray-50 p-8">
                  <div className="flex items-center justify-center space-x-4">
                    <h2 className="text-2xl font-medium text-gray-900">
                      {currentQuestion.swedish}
                    </h2>
                    <button
                      onClick={() => handleSpeak(currentQuestion.swedish.replace('___', currentQuestion.correctAnswer))}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <VolumeUp />
                    </button>
                  </div>
                  <p className="mt-2 text-gray-500">{currentQuestion.english}</p>
                  {currentQuestion.pronunciation && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p className="font-mono">{currentQuestion.pronunciation.ipa}</p>
                      {currentQuestion.pronunciation.notes && (
                        <p className="mt-1 text-gray-500 italic">
                          {currentQuestion.pronunciation.notes}
                        </p>
                      )}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-purple-600">Category: {currentQuestion.category}</p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option}
                        className={`${
                          selectedAnswer === option
                            ? option === currentQuestion.correctAnswer
                              ? 'bg-green-100 text-green-700 ring-green-700'
                              : 'bg-red-100 text-red-700 ring-red-700'
                            : 'bg-white text-gray-900 ring-gray-300'
                        } relative rounded-lg px-6 py-4 shadow-sm ring-1 ring-inset hover:bg-gray-50 flex items-center justify-between`}
                      >
                        <button
                          onClick={() => handleAnswerSelect(option)}
                          disabled={showFeedback}
                          className="flex-1 text-left"
                        >
                          <span>{option}</span>
                        </button>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeak(option);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-200 transition-opacity cursor-pointer"
                        >
                          <VolumeUp className="text-gray-600" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {!showFeedback && !showHint && currentQuestion.hint && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Need a hint?
                    </button>
                  )}

                  {showHint && (
                    <div className="mt-4 text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
                      {currentQuestion.hint}
                    </div>
                  )}

                  {showFeedback && (
                    <div className="mt-6">
                      <div className={`p-4 rounded-md ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        <p className="font-medium">
                          {selectedAnswer === currentQuestion.correctAnswer
                            ? 'Correct! '
                            : 'Not quite. '}
                          {currentQuestion.explanation}
                        </p>
                      </div>
                      <button
                        onClick={handleNext}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Next Question
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarPractice;
