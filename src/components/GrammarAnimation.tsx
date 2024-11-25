import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, PauseCircle, RotateCcw, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

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
  const [progress, setProgress] = useState<number>(0);
  const [showRuleOverview, setShowRuleOverview] = useState<boolean>(false);

  const grammarRules: GrammarRule[] = [
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
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      const rule = grammarRules[currentRule];
      const totalDuration = rule.steps.length * 5000;
      const startTime = Date.now();

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
        setProgress(newProgress);

        if (elapsed < totalDuration) {
          timer = setTimeout(updateProgress, 50);
        }
      };

      timer = setTimeout(updateProgress, 50);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentRule]);

  const startAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setProgress(0);
    const rule = grammarRules[currentRule];
    
    rule.steps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, index * 5000);
    });

    setTimeout(() => {
      setIsPlaying(false);
      setProgress(100);
    }, rule.steps.length * 5000);
  };

  const stopAnimation = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const navigateRule = (direction: 'prev' | 'next') => {
    stopAnimation();
    setCurrentStep(0);
    setCurrentRule(prev => {
      if (direction === 'prev') {
        return prev === 0 ? grammarRules.length - 1 : prev - 1;
      } else {
        return (prev + 1) % grammarRules.length;
      }
    });
  };

  const navigateStep = (direction: 'prev' | 'next') => {
    stopAnimation();
    setCurrentStep(prev => {
      if (direction === 'prev') {
        return prev === 0 ? currentRuleData.steps.length - 1 : prev - 1;
      } else {
        return (prev + 1) % currentRuleData.steps.length;
      }
    });
  };

  const currentRuleData = grammarRules[currentRule];
  const currentStepData = currentRuleData.steps[currentStep];

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
            onClick={() => navigateRule('prev')}
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
            onClick={() => navigateRule('next')}
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
                        onClick={() => {/* Implement speech synthesis */}}
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
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => navigateStep('prev')}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            disabled={isPlaying}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
            
          {!isPlaying ? (
            <button
              onClick={startAnimation}
              className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <PlayCircle className="w-8 h-8" />
            </button>
          ) : (
            <button
              onClick={stopAnimation}
              className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <PauseCircle className="w-8 h-8" />
            </button>
          )}
            
          <button
            onClick={() => navigateStep('next')}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            disabled={isPlaying}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
            
          <button
            onClick={() => {
              setCurrentStep(0);
              setProgress(0);
            }}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors ml-4"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        {/* Rule Overview Panel */}
        <div className="mt-8">
          <button
            onClick={() => setShowRuleOverview(!showRuleOverview)}
            className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-800
                     bg-white rounded-lg shadow-sm hover:shadow transition-all"
          >
            {showRuleOverview ? 'Hide' : 'Show'} All Rules
          </button>
          <AnimatePresence>
            {showRuleOverview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-white rounded-lg shadow-sm p-4"
              >
                <div className="grid gap-4">
                  {grammarRules.map((rule, index) => (
                    <button
                      key={rule.title}
                      onClick={() => {
                        setCurrentRule(index);
                        setCurrentStep(0);
                        setProgress(0);
                        setShowRuleOverview(false);
                      }}
                      className={`
                        p-4 rounded-lg text-left transition-all
                        ${currentRule === index
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'hover:bg-gray-50'}
                      `}
                    >
                      <h3 className="font-medium">{rule.title}</h3>
                      <p className="text-sm text-gray-500">
                        {rule.steps.length} steps
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GrammarAnimation;
