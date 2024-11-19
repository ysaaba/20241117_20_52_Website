import React, { useState, useEffect } from 'react';
import { QuizComponent } from './QuizComponent';
import { adjectives } from '../../data/adjectives';
import type { QuizQuestion } from '../../types';
import { getUniqueRandomOptions } from '../../utils/getUniqueRandomOptions';

export function AdjectivesQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const newQuestions: QuizQuestion[] = [];
    const usedAdjectives = new Set();
    
    while (newQuestions.length < 10 && usedAdjectives.size < adjectives.length) {
      const adjectiveIndex = Math.floor(Math.random() * adjectives.length);
      const adjective = adjectives[adjectiveIndex];
      
      if (usedAdjectives.has(adjective.adjective)) continue;
      usedAdjectives.add(adjective.adjective);

      const questionTypes = [
        {
          type: 'translation',
          generate: () => ({
            question: `What is the meaning of "${adjective.adjective}"?`,
            correctAnswer: adjective.translation,
            options: [
              adjective.translation,
              ...getRandomTranslations(adjective.translation, 3)
            ].sort(() => Math.random() - 0.5),
            audioText: adjective.adjective
          })
        },
        {
          type: 'comparative',
          generate: () => ({
            question: `What is the comparative form of "${adjective.adjective}"?`,
            correctAnswer: adjective.forms.comparative,
            options: [
              adjective.forms.comparative,
              ...getRandomComparativeForms(adjective.forms.comparative, 3)
            ].sort(() => Math.random() - 0.5),
            translation: adjective.translation
          })
        },
        {
          type: 'superlative',
          generate: () => ({
            question: `What is the superlative form of "${adjective.adjective}"?`,
            correctAnswer: adjective.forms.superlative,
            options: [
              adjective.forms.superlative,
              ...getRandomSuperlativeForms(adjective.forms.superlative, 3)
            ].sort(() => Math.random() - 0.5),
            translation: adjective.translation
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
    return getUniqueRandomOptions(
      correct,
      adjectives.map(a => a.translation),
      count
    );
  };

  const getRandomComparativeForms = (correct: string, count: number): string[] => {
    return getUniqueRandomOptions(
      correct,
      adjectives.map(a => a.forms.comparative),
      count,
      (base) => {
        const wrongPatterns = [
          base + 'are',  // standard comparative
          base + 'aste', // mixing with superlative
          base + 'ere',  // similar but wrong
          base + 'ire',  // similar but wrong
          base + 'ar',   // similar to present tense
          base + 'arer'  // double comparative
        ];
        return wrongPatterns[Math.floor(Math.random() * wrongPatterns.length)];
      }
    );
  };

  const getRandomSuperlativeForms = (correct: string, count: number): string[] => {
    return getUniqueRandomOptions(
      correct,
      adjectives.map(a => a.forms.superlative),
      count,
      (base) => {
        const wrongPatterns = [
          base + 'est',   // similar but wrong
          base + 'aste',  // similar but wrong
          base + 'are',   // comparative instead
          base + 'ast',   // without final 'e'
          base + 'aste',  // double ending
          base + 'arast'  // mixed comparative/superlative
        ];
        return wrongPatterns[Math.floor(Math.random() * wrongPatterns.length)];
      }
    );
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