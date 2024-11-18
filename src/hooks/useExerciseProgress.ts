import { useState } from 'react';
import type { ExerciseProgress } from '../types';

export const useExerciseProgress = (totalExercises: number) => {
  const [progress, setProgress] = useState<ExerciseProgress>({
    correct: 0,
    wrong: 0,
    total: totalExercises,
    answeredQuestions: new Set()
  });

  const updateProgress = (exerciseId: number, isCorrect: boolean) => {
    setProgress(prev => {
      // If already answered, don't update
      if (prev.answeredQuestions.has(exerciseId)) {
        return prev;
      }

      const newAnswered = new Set(prev.answeredQuestions);
      newAnswered.add(exerciseId);

      return {
        ...prev,
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        wrong: isCorrect ? prev.wrong : prev.wrong + 1,
        answeredQuestions: newAnswered
      };
    });
  };

  const resetProgress = () => {
    setProgress({
      correct: 0,
      wrong: 0,
      total: totalExercises,
      answeredQuestions: new Set()
    });
  };

  return { progress, updateProgress, resetProgress };
}; 