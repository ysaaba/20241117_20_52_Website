import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeUp, CheckCircle, Cancel } from '@mui/icons-material';
import GrammarExplanations from './GrammarExplanations';

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

const questions: Question[] = [
  {
    id: 1,
    swedish: "Jag ___ en bok",
    english: "I read a book",
    options: ["läser", "läsa", "läste", "har läst"],
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
    options: ["Ett", "Den", "Det", "En"],
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
    options: ["bodde", "bor", "har bott", "skulle bo"],
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
    options: ["Den", "Det", "De", "En"],
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
    options: [
      "Jag dricker kaffe varje morgon",
      "Varje morgon jag dricker kaffe",
      "Dricker jag kaffe varje morgon",
      "Jag kaffe dricker varje morgon"
    ],
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
    options: ["intressant", "intressanta", "intressants", "intressante"],
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
    options: ["De", "Dem", "Dom", "Di"],
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
    options: ["lagat", "lagar", "lagade", "laga"],
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
    options: ["mycket", "väldigt", "så", "jätte"],
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
    options: ["Vad", "När", "Var", "Vem"],
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
    options: ["gå", "går", "gick", "gått"],
    correctAnswer: "gå",
    explanation: "After modal verbs like 'måste' (must), we use the infinitive form of the main verb without 'att'.",
    type: "verb-form",
    level: "intermediate",
    category: "Modal Verbs",
    hint: "Modal verbs are followed by the basic form (infinitive)",
    pronunciation: {
      ipa: "/viː ˈmɔstə ɡoː nuː/",
      notes: "Note how 'måste' and 'gå' connect in natural speech"
    }
  },
  {
    id: 12,
    swedish: "Jag vet att han ___ komma imorgon",
    english: "I know that he will come tomorrow",
    options: ["ska", "skall", "skulle", "har"],
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
    options: ["Det", "Den", "De", "Ett"],
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
    options: [
      "Han går ofta på bio",
      "Ofta han går på bio",
      "Han ofta går på bio",
      "Går han ofta på bio"
    ],
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
    options: ["leker", "lekar", "lekte", "leka"],
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

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeTab === 'practice'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Practice Exercises
          </button>
          <button
            onClick={() => setActiveTab('explanations')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeTab === 'explanations'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Grammar Explanations
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'practice' ? (
            <motion.div
              key="practice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/10">
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                      Question {currentQuestionIndex + 1}/{filteredQuestions.length}
                    </span>
                    <div className="flex space-x-4">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        Score: {score}/{filteredQuestions.length}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                        Streak: {streak}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="rounded-xl bg-gray-50 p-8">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentQuestionIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="text-center"
                        >
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
                              <button
                                key={option}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={showFeedback}
                                className={`${
                                  selectedAnswer === option
                                    ? option === currentQuestion.correctAnswer
                                      ? 'bg-green-100 text-green-700 ring-green-700'
                                      : 'bg-red-100 text-red-700 ring-red-700'
                                    : 'bg-white text-gray-900 ring-gray-300'
                                } relative rounded-lg px-6 py-4 shadow-sm ring-1 ring-inset hover:bg-gray-50`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{option}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSpeak(option);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-200 transition-opacity"
                                  >
                                    <VolumeUp className="text-gray-600" />
                                  </button>
                                </div>
                              </button>
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
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-6"
                            >
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
                            </motion.div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="explanations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <GrammarExplanations selectedLevel={selectedLevel} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrammarPractice;
