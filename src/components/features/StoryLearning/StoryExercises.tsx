import React, { useState } from 'react';
import { Check, X, ArrowRight, Trophy } from 'lucide-react';
import { exercises } from '../../../data/stories/skuggor-i-stockholm';
import type { Exercise } from '../../../types';

const StoryExercises: React.FC = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentExercise = exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100;

  const isCorrectAnswer = (answer: string): boolean => {
    if (Array.isArray(currentExercise.correctAnswer)) {
      return currentExercise.correctAnswer.includes(answer);
    }
    return answer === currentExercise.correctAnswer;
  };

  const handleAnswerSubmit = () => {
    if (!showFeedback) {
      setShowFeedback(true);
      if (isCorrectAnswer(selectedAnswer)) {
        setScore(score + 1);
      }
    } else {
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
      } else {
        setCompleted(true);
      }
    }
  };

  if (completed) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="text-lg mb-4">
          You completed all exercises with a score of {score} out of {exercises.length}!
        </p>
        <button
          onClick={() => {
            setCurrentExerciseIndex(0);
            setScore(0);
            setCompleted(false);
            setSelectedAnswer('');
            setShowFeedback(false);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Question {currentExerciseIndex + 1} of {exercises.length}
            </h3>
            <p className="text-gray-700">{currentExercise.question}</p>
          </div>

          {currentExercise.type === 'multiple-choice' && currentExercise.options ? (
            <div className="space-y-3">
              {currentExercise.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center space-x-2 p-3 rounded-md border cursor-pointer transition-colors ${
                    selectedAnswer === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  } ${showFeedback ? 'cursor-not-allowed' : ''}`}
                >
                  <input
                    type="radio"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    disabled={showFeedback}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span
                    className={`text-sm font-medium ${
                      showFeedback && isCorrectAnswer(option)
                        ? 'text-green-600'
                        : showFeedback && option === selectedAnswer
                        ? 'text-red-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              placeholder="Type your answer..."
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={showFeedback}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          )}

          {showFeedback && (
            <div className={`p-4 rounded-md ${
              isCorrectAnswer(selectedAnswer) ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrectAnswer(selectedAnswer) ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <p className="font-medium text-green-600">Correct!</p>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-red-600" />
                    <p className="font-medium text-red-600">Incorrect</p>
                  </>
                )}
              </div>
              {currentExercise.explanation && (
                <p className="text-sm text-gray-600">{currentExercise.explanation}</p>
              )}
            </div>
          )}

          <button
            onClick={handleAnswerSubmit}
            disabled={!selectedAnswer}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {showFeedback ? (
              <span className="flex items-center justify-center gap-2">
                Next Question <ArrowRight className="w-4 h-4" />
              </span>
            ) : (
              'Check Answer'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryExercises;
