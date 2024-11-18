import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { VerbData } from '../types';

interface VerbExerciseCardProps {
  verb: VerbData;
  userAnswer: string;
  feedback: {
    isCorrect: boolean | null;
    mistakes: string[];
  };
  onChange: (value: string) => void;
  showTranslation: boolean;
  tenseType: 'present' | 'past' | 'supine';
}

export function VerbExerciseCard({
  verb,
  userAnswer,
  feedback,
  onChange,
  showTranslation,
  tenseType
}: VerbExerciseCardProps) {
  const getFeedbackColor = () => {
    if (feedback.isCorrect === null) return 'bg-white';
    return feedback.isCorrect ? 'bg-green-50' : 'bg-red-50';
  };

  const getCorrectForm = () => {
    return verb[tenseType];
  };

  const getTenseLabel = () => {
    switch (tenseType) {
      case 'present': return 'Present Tense';
      case 'past': return 'Past Tense';
      case 'supine': return 'Supine';
      default: return '';
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-md mb-4 transition-colors ${getFeedbackColor()}`}>
      <div className="mb-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Group {verb.group} Verb</span>
            <span className="text-sm font-medium text-blue-600">{getTenseLabel()}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-gray-700">{verb.verb}</span>
            <span className="text-gray-400">→</span>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => onChange(e.target.value)}
              className="w-40 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter conjugated form"
            />
            {feedback.isCorrect !== null && (
              <div className="ml-2">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {showTranslation && (
          <p className="text-sm text-gray-600 italic">
            <span className="font-medium">Translation:</span> {verb.translation}
          </p>
        )}
        
        {feedback.isCorrect === false && (
          <div className="mt-3 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Correct form:</span>{' '}
              <span className="text-green-700">{getCorrectForm()}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}