import React, { useState } from 'react';
import { CheckCircle2, XCircle, Volume2, RefreshCw } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import { QuizSuccessModal } from './QuizSuccessModal';
import confetti from 'canvas-confetti';
import type { QuizQuestion } from '../../types';
import { useQuizStatistics } from '../../hooks/useQuizStatistics';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: () => void;
  onReset: () => void;
  category: 'nouns' | 'verbs' | 'adjectives';
}

export function QuizComponent({ questions, onComplete, onReset, category }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { playAudio } = useSound();
  const { recordAnswer } = useQuizStatistics();

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    recordAnswer(category, correct, {
      id: currentQuestion.id.toString(),
      question: currentQuestion.question,
      correctAnswer: currentQuestion.correctAnswer,
      userAnswer: selectedAnswer,
      category: category,
      type: currentQuestion.type || 'general',
      translation: currentQuestion.translation,
      timestamp: new Date()
    });

    if (correct) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6, x: 0.5 }
      });
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowFeedback(false);
      } else {
        setShowSuccessModal(true);
      }
    }, 1500);
  };

  const handleNext = () => {
    setShowSuccessModal(false);
    onComplete();
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
  };

  const handleResetFromModal = () => {
    setShowSuccessModal(false);
    onReset();
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-sm font-medium text-blue-600">
            Score: {score}/{questions.length}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xl font-medium text-gray-900">
              {currentQuestion.question}
            </h3>
            {currentQuestion.audioText && (
              <button
                onClick={() => playAudio(currentQuestion.audioText!)}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}
          </div>
          {currentQuestion.translation && (
            <p className="text-gray-600 italic">{currentQuestion.translation}</p>
          )}
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-4 text-left rounded-lg border transition-all ${
                selectedAnswer === option
                  ? showFeedback
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                    : 'bg-blue-50 border-blue-500'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showFeedback && option === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
                {showFeedback && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer || showFeedback}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !selectedAnswer || showFeedback
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Submit Answer
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <QuizSuccessModal
          score={score}
          total={questions.length}
          onNext={handleNext}
          onReset={handleResetFromModal}
        />
      )}
    </div>
  );
} 
