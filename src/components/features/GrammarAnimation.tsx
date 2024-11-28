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
  translations: string[];
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
          translations: ["I", "read", "the book"],
          explanation: "In a basic sentence, the verb comes in second position",
          highlight: [1]
        },
        {
          words: ["Nu", "läser", "jag", "boken"],
          translations: ["Now", "read", "I", "the book"],
          explanation: "Even when we add a time word at the start, the verb stays in second position",
          highlight: [1]
        },
        {
          words: ["Igår", "köpte", "han", "en ny", "bok"],
          translations: ["Yesterday", "bought", "he", "a new", "book"],
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
          translations: ["Read", "you", "the book?"],
          explanation: "In questions, the verb moves to first position",
          highlight: [0]
        },
        {
          words: ["Har", "du", "läst", "boken?"],
          translations: ["Have", "you", "read", "the book?"],
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
          translations: ["I", "know", "that", "she", "comes", "tomorrow"],
          explanation: "In subordinate clauses, the word order is different from main clauses",
          highlight: [2, 3, 4]
        },
        {
          words: ["Om", "det", "regnar", "stannar", "jag", "hemma"],
          translations: ["If", "it", "rains", "stay", "I", "home"],
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
          translations: ["I", "read", "not", "the book"],
          explanation: "In main clauses, 'inte' comes after the verb",
          highlight: [2]
        },
        {
          words: ["Han", "har", "inte", "läst", "boken"],
          translations: ["He", "has", "not", "read", "the book"],
          explanation: "With auxiliary verbs, 'inte' comes after the first verb",
          highlight: [2]
        },
        {
          words: ["...att", "han", "inte", "läser", "boken"],
          translations: ["...that", "he", "not", "reads", "the book"],
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
          translations: ["Yesterday", "ate", "I", "dinner", "at", "six"],
          explanation: "Multiple time expressions: general time (igår) comes first",
          highlight: [0, 4, 5]
        },
        {
          words: ["På", "sommaren", "brukar", "jag", "simma", "varje", "dag"],
          translations: ["In", "summer", "usually", "I", "swim", "every", "day"],
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
          translations: ["A", "red", "car"],
          explanation: "Indefinite en-words: adjective base form",
          highlight: [1]
        },
        {
          words: ["Ett", "rött", "hus"],
          translations: ["A", "red", "house"],
          explanation: "Indefinite ett-words: adjective adds -t",
          highlight: [1]
        },
        {
          words: ["Den", "röda", "bilen"],
          translations: ["The", "red", "car"],
          explanation: "Definite form: adjective adds -a",
          highlight: [1]
        },
        {
          words: ["Röda", "bilar"],
          translations: ["Red", "cars"],
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
          translations: ["I", "can", "swim"],
          explanation: "Modal verb + infinitive without 'att'",
          highlight: [1, 2]
        },
        {
          words: ["Hon", "måste", "äta", "nu"],
          translations: ["She", "must", "eat", "now"],
          explanation: "Necessity with måste + infinitive",
          highlight: [1, 2]
        },
        {
          words: ["Vi", "ska", "resa", "imorgon"],
          translations: ["We", "will", "travel", "tomorrow"],
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

  const totalSteps = useMemo(() => grammarRules.reduce((acc, rule) => acc + rule.steps.length, 0), [grammarRules]);
  const currentOverallStep = useMemo(() => {
    let step = 0;
    for (let i = 0; i < currentRule; i++) {
      step += grammarRules[i].steps.length;
    }
    return step + currentStep;
  }, [currentRule, currentStep, grammarRules]);

  const goToStep = useCallback((targetStep: number) => {
    if (targetStep < 0 || targetStep >= totalSteps) return;
    
    let stepCount = 0;
    for (let i = 0; i < grammarRules.length; i++) {
      if (stepCount + grammarRules[i].steps.length > targetStep) {
        setCurrentRule(i);
        setCurrentStep(targetStep - stepCount);
        break;
      }
      stepCount += grammarRules[i].steps.length;
    }
    setIsPlaying(false);
  }, [totalSteps, grammarRules]);

  const handleNext = useCallback(() => goToStep(currentOverallStep + 1), [currentOverallStep, goToStep]);
  const handlePrev = useCallback(() => goToStep(currentOverallStep - 1), [currentOverallStep, goToStep]);

  const currentRuleData = grammarRules[currentRule];
  const currentStepData = currentRuleData.steps[currentStep];
  const progress = (currentOverallStep / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Swedish Grammar Guide
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Master Swedish grammar through interactive visualizations and step-by-step explanations
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Navigation Bar */}
          <div className="border-b border-gray-200 bg-gray-50/50">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  disabled={currentOverallStep === 0}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Previous
                </button>
                <span className="text-sm text-gray-500">
                  Animation {currentOverallStep + 1} of {totalSteps}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleSpeak(currentStepData.words.join(' '))}
                  className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isPlaying ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center p-2 border border-transparent rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Rule: {currentRule + 1} of {grammarRules.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentOverallStep === totalSteps - 1}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="relative h-1 bg-gray-100">
            <motion.div
              className="absolute h-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Title and Step Counter */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                {currentRuleData.title}
              </h2>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                Step {currentStep + 1} of {currentRuleData.steps.length}
              </div>
            </div>

            {/* Animation Area */}
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentRule}-${currentStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  {currentStepData.words.map((word, index) => (
                    <div key={`${word}-${index}`} className="group relative">
                      <motion.div
                        className={`px-4 py-2 rounded-lg text-lg ${
                          currentStepData.highlight.includes(index)
                            ? 'bg-indigo-100 text-indigo-700 font-medium'
                            : 'bg-white text-gray-700'
                        } cursor-help transition-all duration-200 hover:ring-2 hover:ring-indigo-300`}
                      >
                        {word}
                      </motion.div>
                      {/* Tooltip */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        {currentStepData.translations[index]}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-gray-900 transform rotate-45"></div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Explanation Card */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <p className="text-indigo-900 text-lg">
                {currentStepData.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarAnimation;
