import React, { useState, useEffect } from 'react';
import { QuizComponent } from './QuizComponent';
import { commonNouns } from '../../data/nouns';
import type { QuizQuestion } from '../../types';

export function NounsQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const newQuestions: QuizQuestion[] = [];
    const usedNouns = new Set();
    
    while (newQuestions.length < 10 && usedNouns.size < commonNouns.length) {
      // Select random noun
      const nounIndex = Math.floor(Math.random() * commonNouns.length);
      const noun = commonNouns[nounIndex];
      
      if (usedNouns.has(noun.noun)) continue;
      usedNouns.add(noun.noun);

      // Generate question types randomly
      const questionTypes = [
        {
          type: 'translation',
          generate: () => ({
            question: `What is the meaning of "${noun.noun}"?`,
            correctAnswer: noun.translation,
            options: [
              noun.translation,
              ...getRandomTranslations(noun.translation, 3)
            ].sort(() => Math.random() - 0.5),
            audioText: noun.noun
          })
        },
        {
          type: 'article',
          generate: () => ({
            question: `What is the correct article for "${noun.noun}"?`,
            correctAnswer: noun.gender,
            options: ['en', 'ett'].sort(() => Math.random() - 0.5),
            translation: noun.translation
          })
        },
        {
          type: 'plural',
          generate: () => ({
            question: `What is the plural form of "${noun.noun}"?`,
            correctAnswer: noun.forms.indefinitePlural,
            options: [
              noun.forms.indefinitePlural,
              ...getRandomPluralForms(noun.forms.indefinitePlural, 3)
            ].sort(() => Math.random() - 0.5),
            translation: noun.translation
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
    const translations = commonNouns
      .map(n => n.translation)
      .filter(t => t !== correct);
    return shuffleArray(translations).slice(0, count);
  };

  const getRandomPluralForms = (correct: string, count: number): string[] => {
    const commonEndings = ['ar', 'er', 'or', 'n'];
    return Array(count).fill(null).map(() => {
      const base = correct.slice(0, -2);
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