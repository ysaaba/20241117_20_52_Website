import { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle } from 'lucide-react';
import { Exercise } from '../types';
import { ProgressBar } from './ProgressBar';
import { useSound } from '../hooks/useSound';
import { ExerciseSummaryView } from './ExerciseSummary';

interface ArticleExerciseProps {
  exercises: Exercise[];
  progress: {
    correct: number;
    wrong: number;
    total: number;
    answeredQuestions: Set<number>;
  };
  summary: ExerciseSummary[];
  onUpdateProgress: (exerciseId: number, isCorrect: boolean, answer: string) => void;
  onComplete?: () => void;
  onReset?: () => void;
  isCompleted?: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

interface ExerciseSummary {
  exercise: Exercise;
  userAnswer: string;
  isCorrect: boolean;
}

export const ArticleExercise = ({ 
  exercises, 
  progress,
  summary,
  onUpdateProgress,
  onComplete, 
  onReset,
  isCompleted,
  currentPage,
  onPageChange,
  totalPages
}: ArticleExerciseProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { playSound } = useSound();

  const handleAnswerChange = (exerciseId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [exerciseId]: value }));
  };

  const handleSubmit = (exerciseId: number, correctArticle: string) => {
    const answer = answers[exerciseId] || '';
    const isCorrect = answer.toLowerCase() === correctArticle.toLowerCase();
    onUpdateProgress(exerciseId, isCorrect, answer);
  };

  const isCorrect = (exerciseId: number, correctArticle: string) => {
    const answer = answers[exerciseId] || '';
    return answer.toLowerCase() === correctArticle.toLowerCase();
  };

  useEffect(() => {
    if (isCompleted && summary.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isCompleted, summary.length]);

  if (isCompleted && summary.length > 0) {
    return (
      <ExerciseSummaryView
        summary={summary}
        onReset={() => onReset?.()}
        onNext={onComplete ?? undefined}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressBar 
        correct={progress.correct}
        wrong={progress.wrong}
        total={progress.total}
      />
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {exercises.map((exercise) => {
          const isAnswered = progress.answeredQuestions.has(exercise.id);
          const isAnswerCorrect = isCorrect(exercise.id, exercise.correctArticle);
          const [beforeInput, afterInput] = exercise.sentence.split('___');

          return (
            <div key={exercise.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-gray-700">{beforeInput}</span>
                    <input
                      type="text"
                      value={answers[exercise.id] || ''}
                      onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
                      disabled={isAnswered}
                      className="w-24 px-2 py-1 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="en/ett"
                    />
                    <span className="text-gray-700">{afterInput}</span>
                  </div>
                </div>
                <button
                  onClick={() => playSound(exercise.correctSentence)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                {isAnswered && (
                  <div className="ml-2">
                    {isAnswerCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 italic mb-4">{exercise.translation}</p>
              
              {!isAnswered && (
                <button
                  onClick={() => handleSubmit(exercise.id, exercise.correctArticle)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Check Answer
                </button>
              )}
              
              {isAnswered && !isAnswerCorrect && (
                <p className="text-sm text-red-600">
                  Correct answer: {exercise.correctSentence}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 