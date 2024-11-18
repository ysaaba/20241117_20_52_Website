import { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Exercise } from '../types';
import { ProgressBar } from './ProgressBar';
import { useExerciseProgress } from '../hooks/useExerciseProgress';
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
  isCompleted 
}: ArticleExerciseProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { playAudio } = useSound();
  
  const exercisesPerPage = 5;
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);
  const startIndex = (currentPage - 1) * exercisesPerPage;
  const currentExercises = exercises.slice(startIndex, startIndex + exercisesPerPage);

  const handleAnswerChange = (exerciseId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [exerciseId]: value }));
  };

  const handleSubmit = (exerciseId: number, correctArticle: string) => {
    const answer = answers[exerciseId] || '';
    const isCorrect = answer.toLowerCase() === correctArticle.toLowerCase();
    onUpdateProgress(exerciseId, isCorrect, answer);
    
    if (progress.correct + progress.wrong === exercises.length - 1) {
      onComplete?.();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePlayAudio = (sentence: string) => {
    playAudio(sentence);
  };

  if (isCompleted && summary.length > 0) {
    return (
      <ExerciseSummaryView
        summary={summary}
        onReset={onReset}
        onNext={onComplete}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProgressBar 
        correct={progress.correct}
        wrong={progress.wrong}
        total={progress.total}
      />
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            Next
          </button>
        </div>
      </div>
      
      {currentExercises.map((exercise) => {
        const parts = exercise.sentence.split('___');
        const isAnswered = progress.answeredQuestions.has(exercise.id);
        const currentAnswer = answers[exercise.id] || '';
        const isCorrect = currentAnswer.toLowerCase() === exercise.correctArticle.toLowerCase();

        return (
          <div 
            key={exercise.id}
            className={`mb-6 p-6 rounded-lg shadow-md ${
              isAnswered
                ? isCorrect ? 'bg-green-50' : 'bg-red-50'
                : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-gray-700">{parts[0]}</span>
                  <input
                    type="text"
                    value={answers[exercise.id] || ''}
                    onChange={(e) => handleAnswerChange(exercise.id, e.target.value)}
                    disabled={isAnswered}
                    className="w-24 px-2 py-1 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="en/ett"
                  />
                  <span className="text-gray-700">{parts[1]}</span>
                </div>
              </div>
              <button
                onClick={() => playAudio(exercise.correctSentence)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              {isAnswered && (
                <div className="ml-2">
                  {isCorrect ? (
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
            
            {isAnswered && !isCorrect && (
              <p className="text-sm text-red-600">
                Correct answer: {exercise.correctSentence}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}; 