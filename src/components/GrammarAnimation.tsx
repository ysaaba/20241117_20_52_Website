import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, PauseCircle, RotateCcw, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

interface ResponsiveVoice {
  speak: (text: string, voice: string, options?: object) => void;
  isPlaying: () => boolean;
  cancel: () => void;
  voiceSupport: () => boolean;
  init: () => void;
}

declare global {
  interface Window {
    responsiveVoice: ResponsiveVoice;
  }
}

interface AnimationStep {
  words: string[];
  explanation: string;
  highlight: number[];
}

interface GrammarRule {
  title: string;
  steps: AnimationStep[];
}

const GrammarAnimation: React.FC = () => {
  const [currentRule, setCurrentRule] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [voiceReady, setVoiceReady] = useState(false);

  const grammarRules: GrammarRule[] = useMemo(() => [
    {
      title: "V2 Rule (Verb Second)",
      steps: [
        {
          words: ["Jag", "läser", "boken"],
          explanation: "In a basic sentence, the verb comes in second position",
          highlight: [1]
        },
        {
          words: ["Nu", "läser", "jag", "boken"],
          explanation: "Even when we add a time word at the start, the verb stays in second position",
          highlight: [1]
        },
        {
          words: ["Igår", "köpte", "han", "en ny", "bok"],
          explanation: "This pattern is consistent with different time expressions",
          highlight: [1]
        }
      ]
    },
    {
      title: "Question Formation",
      steps: [
        {
          words: ["Läser", "du", "boken?"],
          explanation: "In questions, the verb moves to first position",
          highlight: [0]
        },
        {
          words: ["Har", "du", "läst", "boken?"],
          explanation: "With auxiliary verbs, the auxiliary moves to first position",
          highlight: [0, 2]
        }
      ]
    },
    {
      title: "Subordinate Clauses",
      steps: [
        {
          words: ["Jag", "vet", "att", "hon", "kommer", "imorgon"],
          explanation: "In subordinate clauses, the word order is different from main clauses",
          highlight: [2, 3, 4]
        },
        {
          words: ["Om", "det", "regnar", "stannar", "jag", "hemma"],
          explanation: "When a subordinate clause comes first, it affects the main clause word order",
          highlight: [0, 1, 2, 3]
        }
      ]
    },
    {
      title: "Negation Placement",
      steps: [
        {
          words: ["Jag", "läser", "inte", "boken"],
          explanation: "In main clauses, 'inte' comes after the verb",
          highlight: [2]
        },
        {
          words: ["Han", "har", "inte", "läst", "boken"],
          explanation: "With auxiliary verbs, 'inte' comes after the first verb",
          highlight: [2]
        },
        {
          words: ["...att", "han", "inte", "läser", "boken"],
          explanation: "In subordinate clauses, 'inte' comes before the verb",
          highlight: [2, 3]
        }
      ]
    },
    {
      title: "Time Expressions",
      steps: [
        {
          words: ["Igår", "åt", "jag", "middag", "klockan", "sex"],
          explanation: "Multiple time expressions: general time (igår) comes first",
          highlight: [0, 4, 5]
        },
        {
          words: ["På", "sommaren", "brukar", "jag", "simma", "varje", "dag"],
          explanation: "Habitual actions with time expressions",
          highlight: [0, 1, 5, 6]
        }
      ]
    },
    {
      title: "Adjective Agreement",
      steps: [
        {
          words: ["En", "röd", "bil"],
          explanation: "Indefinite en-words: adjective base form",
          highlight: [1]
        },
        {
          words: ["Ett", "rött", "hus"],
          explanation: "Indefinite ett-words: adjective adds -t",
          highlight: [1]
        },
        {
          words: ["Den", "röda", "bilen"],
          explanation: "Definite form: adjective adds -a",
          highlight: [1]
        },
        {
          words: ["Röda", "bilar"],
          explanation: "Plural form: adjective adds -a",
          highlight: [0]
        }
      ]
    },
    {
      title: "Modal Verbs",
      steps: [
        {
          words: ["Jag", "kan", "simma"],
          explanation: "Modal verb + infinitive without 'att'",
          highlight: [1, 2]
        },
        {
          words: ["Hon", "måste", "äta", "nu"],
          explanation: "Necessity with måste + infinitive",
          highlight: [1, 2]
        },
        {
          words: ["Vi", "ska", "resa", "imorgon"],
          explanation: "Future plans with ska + infinitive",
          highlight: [1, 2]
        }
      ]
    }
  ], []);

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

  const handleSpeak = useCallback((text: string) => {
    if (voiceReady && window.responsiveVoice) {
      window.responsiveVoice.speak(text, 'Swedish Male', {
        pitch: 1,
        rate: 0.9,
        volume: 1
      });
    }
  }, [voiceReady]);

  useEffect(() => {
    let intervalId: number | undefined;

    if (isPlaying && currentStep < grammarRules[currentRule].steps.length - 1) {
      intervalId = window.setInterval(() => {
        setCurrentStep(prev => {
          if (prev < grammarRules[currentRule].steps.length - 1) {
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      }, 3000);
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isPlaying, currentStep, currentRule, grammarRules]);

  const handlePlayPause = () => {
    if (currentStep === grammarRules[currentRule].steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentStep < grammarRules[currentRule].steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsPlaying(false);
    }
  };

  const handleNextRule = () => {
    if (currentRule < grammarRules.length - 1) {
      setCurrentRule(currentRule + 1);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  };

  const handlePrevRule = () => {
    if (currentRule > 0) {
      setCurrentRule(currentRule - 1);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  };

  const currentRuleData = grammarRules[currentRule];
  const currentStepData = currentRuleData.steps[currentStep];
  const progress = (currentStep / (currentRuleData.steps.length - 1)) * 100;

  const renderWordOrderAnimation = () => (
    <div className="relative h-64 bg-gray-100 rounded-lg p-4">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: [0, 100, 200, 0], transition: { duration: 4, repeat: Infinity } }}
        className="absolute top-8 left-4 bg-blue-500 text-white p-2 rounded"
      >
        Subject
      </motion.div>
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: [100, 200, 0, 100], transition: { duration: 4, repeat: Infinity } }}
        className="absolute top-8 left-4 bg-green-500 text-white p-2 rounded"
      >
        Verb
      </motion.div>
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: [200, 0, 100, 200], transition: { duration: 4, repeat: Infinity } }}
        className="absolute top-8 left-4 bg-purple-500 text-white p-2 rounded"
      >
        Object
      </motion.div>
      <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-600">
        Watch how the verb always stays in second position
      </div>
    </div>
  );

  const renderDefiniteFormsAnimation = () => (
    <div className="relative h-64 bg-gray-100 rounded-lg p-4">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1], transition: { duration: 2, repeat: Infinity } }}
        className="absolute top-8 left-4 bg-blue-500 text-white p-2 rounded"
      >
        bok
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: [0, 1, 0], x: [50, 0, 50], transition: { duration: 2, repeat: Infinity } }}
        className="absolute top-8 left-16 bg-green-500 text-white p-2 rounded"
      >
        +en
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1], transition: { duration: 1, delay: 1 } }}
        className="absolute top-32 left-4 text-2xl font-bold text-blue-800"
      >
        boken
      </motion.div>
      <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-600">
        Watch how the definite article is added as a suffix
      </div>
    </div>
  );

  const renderVerbConjugationAnimation = () => (
    <div className="relative h-64 bg-gray-100 rounded-lg p-4">
      <div className="flex justify-center space-x-8">
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: [-10, 0],
            opacity: [0.5, 1],
            transition: { duration: 1, repeat: Infinity, repeatType: "reverse" }
          }}
          className="text-center"
        >
          <div className="bg-blue-500 text-white p-2 rounded mb-2">att tala</div>
          <div className="text-sm text-gray-600">Infinitive</div>
        </motion.div>
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: [-10, 0],
            opacity: [0.5, 1],
            transition: { duration: 1, delay: 0.3, repeat: Infinity, repeatType: "reverse" }
          }}
          className="text-center"
        >
          <div className="bg-green-500 text-white p-2 rounded mb-2">talar</div>
          <div className="text-sm text-gray-600">Present</div>
        </motion.div>
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: [-10, 0],
            opacity: [0.5, 1],
            transition: { duration: 1, delay: 0.6, repeat: Infinity, repeatType: "reverse" }
          }}
          className="text-center"
        >
          <div className="bg-purple-500 text-white p-2 rounded mb-2">talade</div>
          <div className="text-sm text-gray-600">Past</div>
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-600">
        See how verbs change form in different tenses
      </div>
    </div>
  );

  const renderAdjectiveAgreementAnimation = () => (
    <div className="relative h-64 bg-gray-100 rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-blue-500 text-white p-2 rounded mb-2">en röd bil</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-green-500 text-white p-2 rounded"
          >
            den röda bilen
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-purple-500 text-white p-2 rounded mb-2">ett rött hus</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="bg-yellow-500 text-white p-2 rounded"
          >
            det röda huset
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-600">
        Watch how adjectives change based on gender and definiteness
      </div>
    </div>
  );

  const renderSubordinateClausesAnimation = () => (
    <div className="relative h-64 bg-gray-100 rounded-lg p-4">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-500 text-white p-2 rounded mb-4 inline-block"
      >
        Main Clause
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-green-500 text-white p-2 rounded mb-4 ml-4 inline-block"
      >
        Subordinate Clause
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-2">Jag vet</div>
        <div className="mb-2">↓</div>
        <div>att han inte kommer</div>
      </motion.div>
      <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-600">
        Notice the different word order in subordinate clauses
      </div>
    </div>
  );

  const animations: { [key: string]: () => JSX.Element } = {
    wordOrder: renderWordOrderAnimation,
    definiteForms: renderDefiniteFormsAnimation,
    verbConjugation: renderVerbConjugationAnimation,
    adjectiveAgreement: renderAdjectiveAgreementAnimation,
    subordinateClauses: renderSubordinateClausesAnimation,
  };

  const renderAnimation = animations[currentRuleData.title] || (() => <div>Animation not found</div>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Swedish Grammar Rules
          </h1>
          <p className="text-gray-600">
            Interactive animations to master Swedish grammar patterns
          </p>
        </header>

        {/* Rule Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevRule}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous Rule
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {currentRuleData.title}
            </h2>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {currentRuleData.steps.length}
            </div>
          </div>
          <button
            onClick={handleNextRule}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Next Rule
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Main Animation Card */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 bg-gray-100">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Words Animation */}
            <div className="min-h-[200px] flex items-center justify-center mb-8">
              <AnimatePresence mode="wait">
                <div className="flex flex-wrap justify-center gap-4">
                  {currentStepData.words.map((word, index) => (
                    <motion.div
                      key={word + index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`
                        px-4 py-2 rounded-lg text-lg
                        ${currentStepData.highlight.includes(index)
                          ? 'bg-blue-500 text-white font-semibold'
                          : 'bg-gray-50 text-gray-800'}
                      `}
                    >
                      {word}
                      {/* Pronunciation Button */}
                      <button
                        onClick={() => handleSpeak(word)}
                        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>

            {/* Explanation */}
            <motion.div
              key={currentStepData.explanation}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-lg text-gray-700 bg-gray-50 p-4 rounded-lg inline-block">
                {currentStepData.explanation}
              </p>
            </motion.div>

            {/* Grammar Animation */}
            {renderAnimation()}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            disabled={isPlaying}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
            
          {!isPlaying ? (
            <button
              onClick={handlePlayPause}
              className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <PlayCircle className="w-8 h-8" />
            </button>
          ) : (
            <button
              onClick={handlePlayPause}
              className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <PauseCircle className="w-8 h-8" />
            </button>
          )}
            
          <button
            onClick={handleNext}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            disabled={isPlaying}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
            
          <button
            onClick={handleReset}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors ml-4"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrammarAnimation;
