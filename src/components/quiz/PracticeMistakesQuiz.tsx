import React, { useState, useEffect } from 'react';
import { QuizComponent } from './QuizComponent';
import { useQuizStatistics } from '../../hooks/useQuizStatistics';
import type { QuizQuestion, QuizMistake } from '../../types';

interface PracticeMistakesQuizProps {
  category: string;
  onClose: () => void;
}

export function PracticeMistakesQuiz({ category, onClose }: PracticeMistakesQuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { statistics } = useQuizStatistics();

  useEffect(() => {
    const mistakes = category === 'all' 
      ? Object.values(statistics).flatMap(stat => stat.mistakes)
      : statistics[category]?.mistakes || [];

    const practiceQuestions: QuizQuestion[] = mistakes.map((mistake, index) => ({
      id: index + 1,
      question: mistake.question,
      correctAnswer: mistake.correctAnswer,
      options: [
        mistake.correctAnswer,
        mistake.userAnswer,
        // Add two random options based on the mistake type
        ...generateRandomOptions(mistake, 2)
      ].filter((option, index, self) => 
        self.indexOf(option) === index // Remove duplicates
      ).slice(0, 4) // Ensure we only have 4 options
      .sort(() => Math.random() - 0.5), // Shuffle options
      translation: mistake.translation,
      category: mistake.category,
      type: mistake.type
    }));

    setQuestions(practiceQuestions);
  }, [category, statistics]);

  const generateRandomOptions = (mistake: QuizMistake, count: number): string[] => {
    // This is a simplified version - you might want to use your existing random option generators
    const commonEndings = ['ar', 'er', 'r', 'de', 'te', 't', 'it'];
    return Array(count).fill(null).map(() => {
      const base = mistake.correctAnswer.slice(0, -2);
      const ending = commonEndings[Math.floor(Math.random() * commonEndings.length)];
      return base + ending;
    });
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No mistakes to practice!</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Statistics
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Practicing Mistakes</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Back to Statistics
        </button>
      </div>
      <QuizComponent
        questions={questions}
        onComplete={onClose}
        onReset={() => setQuestions(questions)}
        category={category as any}
      />
    </div>
  );
} 