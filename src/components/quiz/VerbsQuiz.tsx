import React, { useState, useEffect } from 'react';
import { QuizComponent } from './QuizComponent';
import { verbs } from '../../data/verbs';
import type { QuizQuestion } from '../../types';
import { getUniqueRandomOptions } from '../../utils/getUniqueRandomOptions';

export function VerbsQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const newQuestions: QuizQuestion[] = [];
    const usedVerbs = new Set();
    
    while (newQuestions.length < 10 && usedVerbs.size < verbs.length) {
      const verbIndex = Math.floor(Math.random() * verbs.length);
      const verb = verbs[verbIndex];
      
      if (usedVerbs.has(verb.verb)) continue;
      usedVerbs.add(verb.verb);

      const questionTypes = [
        {
          type: 'translation',
          generate: () => ({
            question: `What is the meaning of "${verb.verb}"?`,
            correctAnswer: verb.translation,
            options: [
              verb.translation,
              ...getRandomTranslations(verb.translation, 3)
            ].sort(() => Math.random() - 0.5),
            audioText: verb.verb
          })
        },
        {
          type: 'present',
          generate: () => ({
            question: `What is the present tense form of "${verb.verb}"?`,
            correctAnswer: verb.present,
            options: [
              verb.present,
              ...getRandomVerbForms(verb.present, 3)
            ].sort(() => Math.random() - 0.5),
            translation: verb.translation
          })
        },
        {
          type: 'past',
          generate: () => ({
            question: `What is the past tense form of "${verb.verb}"?`,
            correctAnswer: verb.past,
            options: [
              verb.past,
              ...getRandomVerbForms(verb.past, 3)
            ].sort(() => Math.random() - 0.5),
            translation: verb.translation
          })
        },
        {
          type: 'supine',
          generate: () => ({
            question: `What is the supine form of "${verb.verb}"?`,
            correctAnswer: verb.supine,
            options: [
              verb.supine,
              ...getRandomVerbForms(verb.supine, 3)
            ].sort(() => Math.random() - 0.5),
            translation: verb.translation
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
      verbs.map(v => v.translation),
      count
    );
  };

  const getRandomVerbForms = (correct: string, count: number): string[] => {
    return getUniqueRandomOptions(
      correct,
      verbs.map(v => v.present),
      count,
      (base) => {
        const commonEndings = ['ar', 'er', 'r', 'de', 'te', 't', 'it'];
        const ending = commonEndings[Math.floor(Math.random() * commonEndings.length)];
        return base.slice(0, -2) + ending;
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
      category="verbs"
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