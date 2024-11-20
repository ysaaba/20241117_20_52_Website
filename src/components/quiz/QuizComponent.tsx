import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types';
import { Button } from '../common/Button';
import { useResponsiveVoice } from '../../hooks/useResponsiveVoice';
import { CheckCircle2, XCircle, Volume2 } from 'lucide-react';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: () => void;
  onReset: () => void;
  category: string;
  recordAnswer: (category: string, correct: boolean, mistakeData: any) => void;
}

export function QuizComponent({ questions, onComplete, onReset, category, recordAnswer }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const { speak, speaking, initialized } = useResponsiveVoice('Swedish Male');

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowTranslation(false);
  }, [currentQuestionIndex]);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    // Record the answer in statistics
    const mistakeData = {
      question: currentQuestion.question,
      correctAnswer: currentQuestion.correctAnswer,
      userAnswer: answer,
      category: category as 'nouns' | 'verbs' | 'adjectives',
      type: currentQuestion.type,
      translation: currentQuestion.translation,
      context: currentQuestion.context
    };
    recordAnswer(category, correct, mistakeData);
  };

  const handleNextClick = () => {
    if (isLastQuestion) {
      onComplete();
      setCurrentQuestionIndex(0);
      setScore(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePlayAudio = () => {
    if (!initialized) {
      console.warn('ResponsiveVoice is not yet initialized');
      return;
    }

    if (!speaking && currentQuestion.audioText) {
      console.log('Playing audio for:', currentQuestion.audioText);
      speak(currentQuestion.audioText);
    }
  };

  if (!currentQuestion) return null;

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{category} Quiz</h2>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="font-medium">Score: {score}/{questions.length}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-in-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Question */}
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-xl font-medium text-gray-900">
              {currentQuestion.question.replace(currentQuestion.correctAnswer, '___')}
            </h3>
            {currentQuestion.audioText && (
              <Button
                onClick={handlePlayAudio}
                disabled={speaking || !initialized}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                {!initialized ? 'Loading...' : speaking ? 'Speaking...' : 'Listen'}
              </Button>
            )}
          </div>

          {/* Answer Options */}
          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
                className={`w-full px-4 py-3 text-left rounded-lg border transition-all
                  ${selectedAnswer === null 
                    ? 'hover:bg-gray-50 border-gray-200' 
                    : selectedAnswer === option
                      ? isCorrect
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                      : option === currentQuestion.correctAnswer
                        ? 'bg-green-50 border-green-500'
                        : 'border-gray-200 opacity-50'
                  }
                  ${selectedAnswer !== null ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{option}</span>
                  {selectedAnswer !== null && (
                    option === currentQuestion.correctAnswer 
                      ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                      : selectedAnswer === option 
                        ? <XCircle className="w-5 h-5 text-red-500" />
                        : null
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback and Translation */}
          {selectedAnswer && (
            <div className="mt-6 space-y-4">
              <div className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {isCorrect 
                  ? '✨ Correct! Well done!' 
                  : `Not quite. The correct answer is: ${currentQuestion.correctAnswer}`
                }
              </div>
              
              {currentQuestion.translation && (
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowTranslation(!showTranslation)}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                  >
                    {showTranslation ? 'Hide' : 'Show'} Translation
                  </Button>
                  {showTranslation && (
                    <div className="p-4 bg-gray-50 rounded-lg text-gray-700">
                      {currentQuestion.translation}
                    </div>
                  )}
                </div>
              )}
              
              <Button
                onClick={handleNextClick}
                variant="primary"
                className="w-full"
              >
                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-6 text-center">
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
        >
          Reset Quiz
        </Button>
      </div>
    </div>
  );
}
