import { useState, useCallback } from 'react';
import { verbs } from '../data/verbs';
import type { VerbData } from '../types';

type TenseType = 'present' | 'past' | 'supine';

export function useVerbExercises() {
  const [currentVerbs, setCurrentVerbs] = useState(() => 
    verbs.slice(0, 5).map(verb => ({ ...verb, tenseType: 'present' as TenseType }))
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { isCorrect: boolean | null; mistakes: string[] }>>({});
  const [showTranslations, setShowTranslations] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const validateAnswer = useCallback((userAnswer: string, verb: VerbData, tenseType: TenseType) => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const isCorrect = normalizedUserAnswer === verb[tenseType];
    return {
      isCorrect,
      mistakes: isCorrect ? [] : [`Incorrect form. The correct form is "${verb[tenseType]}"`]
    };
  }, []);

  const handleSubmit = useCallback(() => {
    const newFeedback = { ...feedback };
    let allCorrect = true;

    currentVerbs.forEach((verb, index) => {
      const answer = answers[`${verb.verb}-${index}`] || '';
      const result = validateAnswer(answer, verb, verb.tenseType);
      newFeedback[`${verb.verb}-${index}`] = result;
      if (!result.isCorrect) allCorrect = false;
    });

    setFeedback(newFeedback);

    if (allCorrect) {
      // Generate new exercises with mixed tenses
      const tenses: TenseType[] = ['present', 'past', 'supine'];
      const newVerbs = verbs
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map(verb => ({
          ...verb,
          tenseType: tenses[Math.floor(Math.random() * tenses.length)]
        }));
      setCurrentVerbs(newVerbs);
      setAnswers({});
      setFeedback({});
      setCurrentPage(prev => prev + 1);
    }
  }, [currentVerbs, answers, feedback, validateAnswer]);

  const handleAnswerChange = useCallback((verbIndex: number, value: string) => {
    const verb = currentVerbs[verbIndex];
    setAnswers(prev => ({ ...prev, [`${verb.verb}-${verbIndex}`]: value }));
    setFeedback(prev => ({ ...prev, [`${verb.verb}-${verbIndex}`]: { isCorrect: null, mistakes: [] } }));
  }, [currentVerbs]);

  const resetExercise = useCallback(() => {
    const initialVerbs = verbs
      .slice(0, 5)
      .map(verb => ({ ...verb, tenseType: 'present' as TenseType }));
    setCurrentVerbs(initialVerbs);
    setAnswers({});
    setFeedback({});
    setCurrentPage(1);
  }, []);

  const toggleTranslations = useCallback(() => {
    setShowTranslations(prev => !prev);
  }, []);

  return {
    currentVerbs,
    answers,
    feedback,
    showTranslations,
    currentPage,
    handleAnswerChange,
    handleSubmit,
    resetExercise,
    toggleTranslations
  };
}