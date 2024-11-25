import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeUp, CheckCircle, Cancel } from '@mui/icons-material';

interface Question {
  id: number;
  swedish: string;
  english: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  type: 'word-order' | 'verb-form' | 'article';
}

const questions: Question[] = [
  {
    id: 1,
    swedish: "Jag ___ en bok",
    english: "I read a book",
    options: ["läser", "läsa", "läste", "har läst"],
    correctAnswer: "läser",
    explanation: "Present tense is used for actions happening now or regularly",
    type: "verb-form"
  },
  {
    id: 2,
    swedish: "___ hus är stort",
    english: "The house is big",
    options: ["Ett", "Den", "Det", "En"],
    correctAnswer: "Det",
    explanation: "We use 'det' for ett-words in definite form",
    type: "article"
  }
];

const GrammarPractice: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'sv-SE';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Swedish Grammar Practice
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Test your knowledge of Swedish grammar rules
          </p>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/10">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                  Question {currentQuestionIndex + 1}/{questions.length}
                </span>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  Score: {score}/{questions.length}
                </span>
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
                          onClick={() => speak(currentQuestion.swedish.replace('___', currentQuestion.correctAnswer))}
                          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <VolumeUp className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="mt-2 text-gray-600">{currentQuestion.english}</p>

                      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {currentQuestion.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={showFeedback}
                            className={`relative rounded-lg border p-4 text-left transition-all duration-200 ${
                              selectedAnswer === option
                                ? option === currentQuestion.correctAnswer
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-red-500 bg-red-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <span className="text-lg font-medium text-gray-900">{option}</span>
                            {showFeedback && selectedAnswer === option && (
                              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                                {option === currentQuestion.correctAnswer ? (
                                  <CheckCircle className="h-6 w-6 text-green-500" />
                                ) : (
                                  <Cancel className="h-6 w-6 text-red-500" />
                                )}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      {showFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 rounded-lg bg-gray-100 p-4"
                        >
                          <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {showFeedback && currentQuestionIndex < questions.length - 1 && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
  );
};

export default GrammarPractice;
