import React, { useState, useEffect } from 'react';
import { Volume } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SentenceBuilder from '@/components/quiz/SentenceBuilder';
import { grammarQuestions, shuffleQuestions } from '@/data/grammarQuestions';
import { Question } from '@/types/exercises';

const shuffleOptions = (question: Question): string[] => {
  const options = [...question.options];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

const GrammarPractice: React.FC = () => {
  const [exerciseType, setExerciseType] = useState<'multiple-choice' | 'sentence-builder'>('multiple-choice');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'advanced'>('easy');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const shuffledQuestions = shuffleQuestions(grammarQuestions, difficulty);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    setScore(0);
    if (shuffledQuestions.length > 0) {
      setShuffledOptions(shuffleOptions(shuffledQuestions[0]));
    }
  }, [difficulty]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleExerciseTypeChange = (type: 'multiple-choice' | 'sentence-builder') => {
    setExerciseType(type);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    if (questions.length > 0) {
      setShuffledOptions(shuffleOptions(questions[0]));
    }
  };

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'advanced') => {
    setDifficulty(newDifficulty);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowHint(false);
      setShuffledOptions(shuffleOptions(questions[nextIndex]));
    }
  };

  const handleSpeak = (text: string) => {
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(text, 'Swedish Male', {
        pitch: 1,
        rate: 0.9,
        volume: 1
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Swedish Grammar Practice
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Master Swedish grammar through interactive exercises
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => handleExerciseTypeChange('multiple-choice')}
            className={`px-4 py-2 rounded-md ${
              exerciseType === 'multiple-choice'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Multiple Choice
          </button>
          <button
            onClick={() => handleExerciseTypeChange('sentence-builder')}
            className={`px-4 py-2 rounded-md ${
              exerciseType === 'sentence-builder'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Sentence Builder
          </button>
        </div>

        {exerciseType === 'multiple-choice' && (
          <div className="mt-4 flex justify-center space-x-4">
            {(['easy', 'medium', 'advanced'] as const).map((level) => (
              <button
                key={level}
                onClick={() => handleDifficultyChange(level)}
                className={`px-4 py-2 rounded-md capitalize ${
                  difficulty === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8">
          {exerciseType === 'multiple-choice' ? (
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/10">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="default" size="sm">
                    Question {currentQuestionIndex + 1}/{questions.length}
                  </Badge>
                  <div className="flex space-x-4">
                    <Badge variant="purple" size="sm" className="capitalize">
                      Level: {difficulty}
                    </Badge>
                    <Badge variant="green" size="sm">
                      Score: {score}/{questions.length}
                    </Badge>
                  </div>
                </div>

                {currentQuestion && (
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
                          <Volume className="h-6 w-6" />
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
                        {shuffledOptions.map((option) => (
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
                              disabled={selectedAnswer !== null}
                              className="flex-1 text-left"
                            >
                              <span>{option}</span>
                            </button>
                            <button
                              onClick={() => handleSpeak(option)}
                              className="ml-2 text-gray-400 hover:text-gray-600"
                            >
                              <Volume className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {isCorrect === null && !selectedAnswer && currentQuestion.hint && (
                        <button
                          onClick={() => setShowHint(!showHint)}
                          className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Need a hint?
                        </button>
                      )}

                      {showHint && (
                        <p className="mt-2 text-sm text-blue-600 italic">
                          Hint: {currentQuestion.hint}
                        </p>
                      )}

                      {isCorrect === true && (
                        <div className="mt-6">
                          <div className="p-4 rounded-md bg-green-50 text-green-700">
                            <p className="font-medium">
                              Correct! {currentQuestion.explanation}
                            </p>
                          </div>
                          {currentQuestionIndex < questions.length - 1 && (
                            <button
                              onClick={handleNext}
                              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Next Question
                            </button>
                          )}
                        </div>
                      )}

                      {isCorrect === false && (
                        <div className="mt-6">
                          <div className="p-4 rounded-md bg-red-50 text-red-700">
                            <p className="font-medium">
                              Not quite. {currentQuestion.explanation}
                            </p>
                          </div>
                          {currentQuestionIndex < questions.length - 1 && (
                            <button
                              onClick={handleNext}
                              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Next Question
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/10">
              <div className="p-8">
                <SentenceBuilder />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrammarPractice;
