import React from 'react';
import { CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import type { Exercise, ExerciseType } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  userAnswer: string;
  feedback: {
    isCorrect: boolean | null;
    mistakes: string[];
  };
  onChange: (value: string) => void;
  showTranslation: boolean;
  exerciseType: ExerciseType;
}

export function ExerciseCard({
  exercise,
  userAnswer,
  feedback,
  onChange,
  showTranslation,
  exerciseType
}: ExerciseCardProps) {
  const { playAudio } = useSound();

  const getFeedbackColor = () => {
    if (feedback.isCorrect === null) return 'bg-white';
    return feedback.isCorrect ? 'bg-green-50' : 'bg-red-50';
  };

  const getPlaceholder = () => {
    switch (exerciseType) {
      case 'indefinite':
        return 'en/ett';
      case 'definite':
        return '-en/-et/-n/-t';
      case 'indefinitePlural':
        return '-or/-ar/-er/-(none)';
      case 'definitePlural':
        return '-orna/-arna/-erna/-na/-en';
      default:
        return '';
    }
  };

  const handlePlayAudio = () => {
    playAudio(exercise.correctSentence);
  };

  // Split the sentence into parts based on the position of ___
  const parts = exercise.sentence.split('___');
  const beforeInput = parts[0];
  const afterInput = parts[1];

  return (
    <div className={`p-6 rounded-lg shadow-md mb-4 transition-colors ${getFeedbackColor()}`}>
      <div className="mb-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative inline-flex items-center gap-2 text-lg">
              <span className="text-gray-700">{beforeInput}</span>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => onChange(e.target.value)}
                className="w-24 px-2 py-1 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                placeholder={getPlaceholder()}
              />
              <span className="text-gray-700">{afterInput}</span>
              <button
                onClick={handlePlayAudio}
                className="ml-2 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              {feedback.isCorrect !== null && (
                <span className="ml-2">
                  {feedback.isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {showTranslation && (
          <p className="text-sm text-gray-600 italic">
            <span className="font-medium">Translation:</span> {exercise.translation}
          </p>
        )}
        
        {feedback.isCorrect === false && (
          <div className="mt-3 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Correct form:</span>{' '}
              <span className="text-green-700">{exercise.correctArticle}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}