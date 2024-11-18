import { Trophy, ArrowRight, RefreshCw, CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import type { Exercise } from '../types';

interface ExerciseSummaryItem {
  exercise: Exercise;
  userAnswer: string;
  isCorrect: boolean;
}

interface ExerciseSummaryProps {
  summary: ExerciseSummaryItem[];
  onReset: () => void;
  onNext?: () => void;
}

export const ExerciseSummaryView = ({ summary, onReset, onNext }: ExerciseSummaryProps) => {
  const { playAudio } = useSound();
  const totalQuestions = summary.length;
  const correctAnswers = summary.filter(item => item.isCorrect).length;
  const successRate = Math.round((correctAnswers / totalQuestions) * 100);

  const getMessage = () => {
    if (successRate >= 80) return "Amazing work! You're mastering Swedish!";
    if (successRate >= 50) return "Great job! Keep practicing to improve further!";
    return "Don't give up! Practice makes perfect.";
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-12">
        <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Exercise Complete!
        </h2>
        <p className="text-xl text-gray-600">{getMessage()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {totalQuestions}
          </div>
          <div className="text-gray-600">Total Questions</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {correctAnswers}
          </div>
          <div className="text-gray-600">Correct Answers</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {successRate}%
          </div>
          <div className="text-gray-600">Success Rate</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${successRate}%` }}
          />
        </div>

        <div className="space-y-6">
          {summary.map(({ exercise, userAnswer, isCorrect }, index) => (
            <div 
              key={exercise.id}
              className={`p-4 rounded-lg border ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">Question {index + 1}</span>
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
              
              <p className="text-gray-800 mb-1">{exercise.sentence}</p>
              <p className="text-gray-600 italic text-sm mb-2">{exercise.translation}</p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => playAudio(exercise.correctSentence)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen
                </button>
                <span className="text-sm">
                  <span className="text-gray-600">Your answer:</span>{' '}
                  <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                    {userAnswer}
                  </span>
                </span>
                {!isCorrect && (
                  <span className="text-sm">
                    <span className="text-gray-600">Correct:</span>{' '}
                    <span className="text-green-600">{exercise.correctArticle}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg border hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
        {onNext && (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next Exercise
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}; 