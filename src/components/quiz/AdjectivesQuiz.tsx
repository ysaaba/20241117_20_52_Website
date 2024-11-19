import React, { useState, useEffect } from 'react';
import { QuizComponent } from './QuizComponent';
import { adjectives } from '../../data/adjectives';
import type { QuizQuestion } from '../../types';

export function AdjectivesQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const newQuestions: QuizQuestion[] = [];
    const usedAdjectives = new Set();
    
    while (newQuestions.length < 10 && usedAdjectives.size < adjectives.length) {
      const adjIndex = Math.floor(Math.random() * adjectives.length);
      const adj = adjectives[adjIndex];
      
      if (usedAdjectives.has(adj.adjective)) continue;
      usedAdjectives.add(adj.adjective);

      const questionTypes = [
        {
          type: 'translation',
          generate: () => ({
            question: `What is the meaning of "${adj.adjective}"?`,
            correctAnswer: adj.translation,
            options: [
              adj.translation,
              ...getRandomTranslations(adj.translation, 3)
            ].sort(() => Math.random() - 0.5),
            audioText: adj.adjective
          })
        },
        {
          type: 'comparative',
          generate: () => ({
            question: `What is the comparative form of "${adj.adjective}"?`,
            correctAnswer: adj.forms.comparative,
            options: [
              adj.forms.comparative,
              ...getRandomComparativeForms(adj.forms.comparative, 3)
            ].sort(() => Math.random() - 0.5),
            translation: adj.translation
          })
        },
        {
          type: 'superlative',
          generate: () => ({
            question: `What is the superlative form of "${adj.adjective}"?`,
            correctAnswer: adj.forms.superlative,
            options: [
              adj.forms.superlative,
              ...getRandomSuperlativeForms(adj.forms.superlative, 3)
            ].sort(() => Math.random() - 0.5),
            translation: adj.translation
          })
        }
      ];

      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const questionData = questionType.generate();

      newQuestions.push({
        id: newQuestions.length + 1,
        ...questionData
      });
    }

    setQuestions(newQuestions);
  };

  const getRandomTranslations = (correct: string, count: number): string[] => {
    const translations = adjectives
      .map(a => a.translation)
      .filter(t => t !== correct);
    return shuffleArray(translations).slice(0, count);
  };

  const getRandomComparativeForms = (correct: string, count: number): string[] => {
    const commonEndings = ['are', 're', 'ere'];
    return Array(count).fill(null).map(() => {
      const base = correct.slice(0, -3);
      const ending = commonEndings[Math.floor(Math.random() * commonEndings.length)];
      return base + ending;
    });
  };

  const getRandomSuperlativeForms = (correct: string, count: number): string[] => {
    const commonEndings = ['ast', 'est', 'st'];
    return Array(count).fill(null).map(() => {
      const base = correct.slice(0, -3);
      const ending = commonEndings[Math.floor(Math.random() * commonEndings.length)];
      return base + ending;
    });
  };

  const handleComplete = () => {
    generateQuestions();
  };

  const handleReset = () => {
    generateQuestions();
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <QuizComponent
      questions={questions}
      onComplete={handleComplete}
      onReset={handleReset}
      category="adjectives"
    />
  );
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
} 