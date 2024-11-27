import { useState, useCallback, useEffect } from 'react';
import { exercises as initialIndefiniteExercises } from '../data/indefiniteExercises';
import { exercises as initialDefiniteExercises } from '../data/definiteExercises';
import { generateExercises } from '../utils/sentenceGenerator';
import type { ExerciseType, AnswerState, FeedbackState } from '../types';

export function useExercises(exerciseType: ExerciseType) {
  const [exercises, setExercises] = useState(() => {
    if (exerciseType === 'verbGroups') return [];
    return exerciseType === 'indefinite' ? initialIndefiniteExercises : 
           exerciseType === 'definite' ? initialDefiniteExercises :
           generateExercises(5, 1, exerciseType);
  });
  const [answers, setAnswers] = useState<AnswerState>({});
  const [feedback, setFeedback] = useState<FeedbackState>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showTranslations, setShowTranslations] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 5;

  // Reset state when exercise type changes
  useEffect(() => {
    if (exerciseType === 'verbGroups') {
      setExercises([]);
    } else {
      setExercises(
        exerciseType === 'indefinite' ? initialIndefiniteExercises : 
        exerciseType === 'definite' ? initialDefiniteExercises :
        generateExercises(5, 1, exerciseType)
      );
    }
    setAnswers({});
    setFeedback({});
    setCurrentPage(1);
  }, [exerciseType]);

  const validateAnswer = useCallback((userAnswer: string, exercise: typeof exercises[0]) => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    let correctAnswer = '';
    
    switch (exercise.type) {
      case 'indefinite':
        correctAnswer = exercise.baseForm;
        break;
      case 'definite':
        correctAnswer = exercise.definiteForm;
        break;
      case 'indefinitePlural':
        correctAnswer = exercise.indefinitePluralForm;
        break;
      case 'definitePlural':
        correctAnswer = exercise.definitePluralForm;
        break;
      default:
        correctAnswer = '';
    }
    
    const isCorrect = normalizedUserAnswer === correctAnswer.toLowerCase();
    
    return {
      isCorrect,
      mistakes: isCorrect ? [] : [`Correct form: "${correctAnswer}"`]
    };
  }, []);

  const handleSubmit = useCallback(() => {
    const startIdx = (currentPage - 1) * exercisesPerPage;
    const endIdx = startIdx + exercisesPerPage;
    const currentExercises = exercises.slice(startIdx, endIdx);
    
    const newFeedback: FeedbackState = { ...feedback };
    let newCorrect = 0;
    let newWrong = 0;
    
    currentExercises.forEach(exercise => {
      const result = validateAnswer(answers[exercise.id] || '', exercise);
      newFeedback[exercise.id] = result;
      if (result.isCorrect) {
        newCorrect++;
      } else {
        newWrong++;
      }
    });
    
    setFeedback(newFeedback);
    setCorrectCount(prev => prev + newCorrect);
    setWrongCount(prev => prev + newWrong);

    const allCurrentCorrect = currentExercises.every(ex => newFeedback[ex.id]?.isCorrect);
    if (allCurrentCorrect) {
      const newExercises = generateExercises(100, exercises.length + 1, exerciseType);
      setExercises(prev => [...prev, ...newExercises]);
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [exercises, currentPage, exercisesPerPage, feedback, answers, validateAnswer, exerciseType]);

  const resetExercise = useCallback(() => {
    if (exerciseType === 'verbGroups') {
      setExercises([]);
    } else {
      setExercises(
        exerciseType === 'indefinite' ? initialIndefiniteExercises : 
        exerciseType === 'definite' ? initialDefiniteExercises :
        generateExercises(5, 1, exerciseType)
      );
    }
    setAnswers({});
    setFeedback({});
    setCurrentPage(1);
  }, [exerciseType]);

  const handleAnswerChange = useCallback((id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    setFeedback(prev => ({ ...prev, [id]: { isCorrect: null, mistakes: [] } }));
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(exercises.length / exercisesPerPage)) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [exercises.length, exercisesPerPage]);

  const toggleTranslations = useCallback(() => {
    setShowTranslations(prev => !prev);
  }, []);

  const startIdx = (currentPage - 1) * exercisesPerPage;
  const currentExercises = exercises.slice(startIdx, startIdx + exercisesPerPage);
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);
  
  const isComplete = currentExercises.every(ex => answers[ex.id]);
  const allCurrentCorrect = currentExercises.every(ex => feedback[ex.id]?.isCorrect);

  return {
    exercises,
    answers,
    feedback,
    correctCount,
    wrongCount,
    showTranslations,
    currentPage,
    handleAnswerChange,
    handleSubmit,
    handlePageChange,
    resetExercise,
    toggleTranslations,
    currentExercises,
    totalPages,
    isComplete,
    allCurrentCorrect
  };
}