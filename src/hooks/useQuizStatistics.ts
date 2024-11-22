import { useState, useEffect } from 'react';
import { QuizStatistics, QuizMistake } from '../types';

const STORAGE_KEY = 'quiz-statistics';

export function useQuizStatistics() {
  const [statistics, setStatistics] = useState<Record<string, QuizStatistics>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        nouns: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null },
        adjectives: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null },
        verbs: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null }
      };
    }

    // Parse stored data and convert string dates back to Date objects
    const parsedStats = JSON.parse(stored);
    Object.values(parsedStats).forEach((stats: any) => {
      if (stats.lastAttempt) {
        stats.lastAttempt = new Date(stats.lastAttempt);
      }
      stats.mistakes = stats.mistakes.map((mistake: any) => ({
        ...mistake,
        timestamp: new Date(mistake.timestamp)
      }));
    });
    return parsedStats;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statistics));
  }, [statistics]);

  const recordAnswer = (category: string, isCorrect: boolean, questionData: Omit<QuizMistake, 'id' | 'timestamp'>) => {
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
        const mistake: QuizMistake = {
          ...questionData,
          id: `${category}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date()
        };
        newStats.mistakes = [...categoryStats.mistakes, mistake];
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
      adjectives: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null },
      verbs: { totalQuestions: 0, correctAnswers: 0, wrongAnswers: 0, mistakes: [], lastAttempt: null }
    });
  };

  return { statistics, recordAnswer, clearMistakes, resetAllStatistics };
}