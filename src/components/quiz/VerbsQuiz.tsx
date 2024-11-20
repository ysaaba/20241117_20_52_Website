import React, { useState, useEffect } from 'react';
import { QuizComponent } from './QuizComponent';
import { verbs } from '../../data/verbs';
import type { QuizQuestion } from '../../types';
import { generateVerbOptions } from '../../utils/verbUtils';
import { useQuizStatistics } from '../../hooks/useQuizStatistics';
import { getCategoryDisplayName } from '../../utils/categoryUtils';

export function VerbsQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { recordAnswer } = useQuizStatistics();

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
            options: generateVerbOptions(verb.present, 'present', verb.verb),
            translation: verb.translation,
            audioText: verb.verb
          })
        },
        {
          type: 'past',
          generate: () => ({
            question: `What is the past tense form of "${verb.verb}"?`,
            correctAnswer: verb.past,
            options: generateVerbOptions(verb.past, 'past', verb.verb),
            translation: verb.translation,
            audioText: verb.verb
          })
        },
        {
          type: 'supine',
          generate: () => ({
            question: `What is the supine form of "${verb.verb}"?`,
            correctAnswer: verb.supine,
            options: generateVerbOptions(verb.supine, 'supine', verb.verb),
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
    const options = new Set<string>();
    options.add(correct);
    
    while (options.size < count + 1) {
      const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
      if (randomVerb.translation !== correct) {
        options.add(randomVerb.translation);
      }
    }
    
    return Array.from(options).slice(1); // Exclude the correct answer
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
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">{getCategoryDisplayName('verbs')}</h1>
      <QuizComponent
        questions={questions}
        onComplete={handleComplete}
        onReset={handleReset}
        category="verbs"
        recordAnswer={recordAnswer}
      />
    </div>
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