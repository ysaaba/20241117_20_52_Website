import { useState, useEffect } from 'react';
import { Exercise, ExerciseProgress, ExerciseSummaryItem } from '../types';
import { ExerciseSummaryView } from './ExerciseSummary';
import { ExerciseCard } from './ExerciseCard';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { VolumeUp } from '@mui/icons-material';

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

interface ArticleExerciseProps {
  exercises: Exercise[];
  progress: {
    correct: number;
    wrong: number;
    total: number;
    answeredQuestions: Set<number>;
  };
  summary: ExerciseSummaryItem[];
  onUpdateProgress: (exerciseId: number, isCorrect: boolean, answer: string) => void;
  onComplete: () => void;
  isCompleted: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  totalExercises: number;
  onReset?: () => void;
}

export const ArticleExercise = ({
  exercises,
  progress,
  summary,
  onUpdateProgress,
  onComplete,
  isCompleted,
  currentPage,
  onPageChange,
  totalPages,
  totalExercises,
  onReset
}: ArticleExerciseProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, { isCorrect: boolean | null; mistakes: string[] }>>({});
  const [voiceReady, setVoiceReady] = useState(false);

  useEffect(() => {
    // Load ResponsiveVoice script
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=u9E3wZGX';
    script.async = true;
    script.onload = () => setVoiceReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
    };
  }, []);

  const handleSpeak = (text: string) => {
    if (voiceReady && window.responsiveVoice) {
      window.responsiveVoice.speak(text, 'Swedish Male', {
        pitch: 1,
        rate: 0.9,
        volume: 1
      });
    }
  };

  const handleAnswerChange = (exerciseId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [exerciseId]: value }));
    setFeedback(prev => ({ ...prev, [exerciseId]: { isCorrect: null, mistakes: [] } }));
  };

  const handleSubmit = (exerciseId: number, correctAnswer: string) => {
    const answer = answers[exerciseId] || '';
    const isCorrect = answer.toLowerCase() === correctAnswer.toLowerCase();
    onUpdateProgress(exerciseId, isCorrect, answer);
    setFeedback(prev => ({
      ...prev,
      [exerciseId]: { isCorrect, mistakes: isCorrect ? [] : [correctAnswer] }
    }));
  };

  const getCorrectFormKey = (type: ArticleType): keyof Pick<Exercise, 'baseForm' | 'definiteForm' | 'indefinitePluralForm' | 'definitePluralForm'> => {
    switch (type) {
      case 'indefinite':
        return 'baseForm';
      case 'definite':
        return 'definiteForm';
      case 'indefinitePlural':
        return 'indefinitePluralForm';
      case 'definitePlural':
        return 'definitePluralForm';
    }
  };

  const handleCheckPageAnswers = () => {
    exercises.forEach(exercise => {
      const answer = answers[exercise.id] || '';
      if (answer) {
        const correctFormKey = getCorrectFormKey(exercise.type);
        handleSubmit(exercise.id, exercise[correctFormKey]);
      }
    });
  };

  useEffect(() => {
    if (isCompleted && summary.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isCompleted, summary.length]);

  const isPageComplete = exercises.every(ex => progress.answeredQuestions.has(ex.id));

  return (
    <div className="h-full flex flex-col">
      {isCompleted ? (
        <ExerciseSummaryView
          summary={summary}
          onReset={onReset || (() => {})}
          onNext={currentPage < totalPages ? () => onPageChange(currentPage + 1) : undefined}
        />
      ) : (
        <div className="flex-1">
          {/* Progress Bar */}
          <div className="mb-6 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress: {progress.answeredQuestions.size} / {totalExercises} exercises</span>
              <span>Score: {progress.correct} correct, {progress.wrong} incorrect</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(progress.answeredQuestions.size / totalExercises) * 100}%` }}
              />
            </div>
          </div>

          {/* Exercise Cards */}
          <div className="space-y-4">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                userAnswer={answers[exercise.id] || ''}
                feedback={feedback[exercise.id] || { isCorrect: null, mistakes: [] }}
                onChange={(value) => handleAnswerChange(exercise.id, value)}
                exerciseType={exercise.type}
                onSubmit={() => handleSubmit(exercise.id, exercise[getCorrectFormKey(exercise.type)])}
                isAnswered={progress.answeredQuestions.has(exercise.id)}
                onSpeak={() => handleSpeak(exercise.sentence.replace('___', exercise.correctArticle))}
              />
            ))}
          </div>

          {/* Pagination and Submit Button */}
          <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleCheckPageAnswers}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>Check Page Answers</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>

              {progress.answeredQuestions.size === totalExercises && (
                <button
                  onClick={onComplete}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Submit Answers</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};