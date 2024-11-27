import React from 'react';
import { CheckCircle2, XCircle, Volume2, HelpCircle, Info } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import type { Exercise, ExerciseType } from '../types';
import * as Tooltip from '@radix-ui/react-tooltip';

interface ExerciseCardProps {
  exercise: Exercise;
  userAnswer: string;
  feedback: {
    isCorrect: boolean | null;
    mistakes: string[];
  };
  onChange: (value: string) => void;
  exerciseType: ExerciseType;
  onSubmit: (exerciseId: number, correctAnswer: string) => void;
  isAnswered: boolean;
}

export function ExerciseCard({
  exercise,
  userAnswer,
  feedback,
  onChange,
  exerciseType,
  onSubmit,
  isAnswered
}: ExerciseCardProps) {
  const { playAudio } = useSound();

  const getFeedbackColor = () => {
    if (!isAnswered) return 'bg-white';
    return feedback.isCorrect ? 'bg-green-50' : 'bg-red-50';
  };

  const getHintText = () => {
    switch (exerciseType) {
      case 'indefinite':
        return 'Use "en" for common gender nouns (en-words) and "ett" for neuter gender nouns (ett-words)';
      case 'definite':
        return 'Add "-en" for common gender nouns and "-et" for neuter gender nouns';
      case 'indefinitePlural':
        return 'Common patterns: -ar (most en-words), -er (many en-words), -or (some feminine en-words), no ending (many ett-words)';
      case 'definitePlural':
        return 'Add "-na" to indefinite plural forms ending in -ar/-er/-or, or "-en" to indefinite plurals without endings';
      default:
        return 'Select the correct article form';
    }
  };

  const getCorrectAnswer = () => {
    switch (exerciseType) {
      case 'indefinite':
        return exercise.baseForm;
      case 'definite':
        return exercise.definiteForm;
      case 'indefinitePlural':
        return exercise.indefinitePluralForm;
      case 'definitePlural':
        return exercise.definitePluralForm;
      default:
        return '';
    }
  };

  const handleSubmit = () => {
    onSubmit(exercise.id, getCorrectAnswer());
  };

  return (
    <div className={`p-6 rounded-xl shadow-md mb-6 transition-all duration-300 ${getFeedbackColor()}`}>
      <div className="space-y-4">
        {/* Header with Sound and Hint */}
        <div className="flex justify-between items-center">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                  <Info className="w-4 h-4" />
                  <span>Hint</span>
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm max-w-xs"
                  sideOffset={5}
                >
                  <div className="space-y-2">
                    <p>{getHintText()}</p>
                    <p className="text-gray-300 text-xs">
                      {exercise.sentence.includes('___') 
                        ? 'Fill in the blank with the correct form'
                        : 'Type the correct form of the word'}
                    </p>
                  </div>
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          <button
            onClick={() => playAudio(exercise.correctSentence)}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
            title="Listen to pronunciation"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Swedish Sentence */}
        <p className="text-lg text-gray-700">{exercise.sentence}</p>

        {/* English Translation */}
        <div className="text-sm text-gray-600">
          <p>{exercise.translation}</p>
        </div>

        {/* Input Section with integrated Check button */}
        <div className="pt-2">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => onChange(e.target.value)}
              disabled={isAnswered}
              className="flex-1 max-w-xs px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your answer"
            />
            {!isAnswered && (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Check Answer
              </button>
            )}
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

        {/* Feedback Section */}
        {feedback.isCorrect === false && (
          <div className="p-4 bg-red-50 rounded-lg border border-red-100">
            <p className="text-sm text-gray-800">
              <span className="font-medium">Correct form:</span>{' '}
              <span className="text-green-700 font-medium">{getCorrectAnswer()}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}