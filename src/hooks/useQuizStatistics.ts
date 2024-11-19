import { useState, useEffect } from 'react';
import { QuizStatistics, QuizMistake } from '../types';

const STORAGE_KEY = 'quiz-statistics';

export function useQuizStatistics() {
  const [statistics, setStatistics] = useState<Record<string, QuizStatistics>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {
      nouns: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null },
      verbs: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null },
      adjectives: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null }
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statistics));
  }, [statistics]);

  const recordAnswer = (category: string, isCorrect: boolean, questionData: QuizMistake) => {
    console.log('Recording answer:', { category, isCorrect, questionData });
    
    setStatistics(prev => {
      const categoryStats = prev[category] || {
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        mistakes: [],
        lastAttempt: new Date()
      };

      const newStats = {
        ...categoryStats,
        totalQuestions: categoryStats.totalQuestions + 1,
        correctAnswers: categoryStats.correctAnswers + (isCorrect ? 1 : 0),
        wrongAnswers: categoryStats.wrongAnswers + (isCorrect ? 0 : 1),
        lastAttempt: new Date()
      };

      if (!isCorrect) {
        newStats.mistakes = [...categoryStats.mistakes, { ...questionData, timestamp: new Date() }];
      }

      const updatedStats = { ...prev, [category]: newStats };
      console.log('Updated statistics:', updatedStats);
      return updatedStats;
    });
  };

  const clearMistakes = (category?: string) => {
    setStatistics(prev => {
      if (category) {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            mistakes: []
          }
        };
      }
      
      return Object.entries(prev).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: {
          ...value,
          mistakes: []
        }
      }), {});
    });
  };

  const resetAllStatistics = () => {
    setStatistics({
      nouns: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null },
      verbs: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null },
      adjectives: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null }
    });
  };

  return { statistics, recordAnswer, clearMistakes, resetAllStatistics };
} 