import React, { useState, useEffect } from 'react';
import { QuizComponent } from './QuizComponent';
import { commonNouns } from '../../data/nouns';
import { getUniqueRandomOptions } from '../../utils/quizUtils';
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
      const nounIndex = Math.floor(Math.random() * commonNouns.length);
      const noun = commonNouns[nounIndex];
      
      if (usedNouns.has(noun.noun)) continue;
      usedNouns.add(noun.noun);

      const questionTypes = [
        {
          type: 'translation',
          generate: () => ({
            question: `What is the meaning of "${noun.noun}"?`,
            correctAnswer: noun.translation,
            options: getUniqueRandomOptions(
              noun.translation,
              commonNouns.map(n => n.translation),
              3
            ),
            audioText: noun.noun
          })
        },
        {
          type: 'article',
          generate: () => ({
            question: `What is the correct article for "${noun.noun}"?`,
            correctAnswer: noun.gender,
            options: ['en', 'ett'],
            translation: noun.translation
          })
        },
        {
          type: 'plural',
          generate: () => ({
            question: `What is the plural form of "${noun.noun}"?`,
            correctAnswer: noun.forms.indefinitePlural,
            options: getUniqueRandomOptions(
              noun.forms.indefinitePlural,
              commonNouns.map(n => n.forms.indefinitePlural),
              3,
              (base) => {
                const commonEndings = ['ar', 'er', 'or', 'n'];
                const baseWord = base.slice(0, -2);
                const ending = commonEndings[Math.floor(Math.random() * commonEndings.length)];
                return baseWord + ending;
              }
            ),
            translation: noun.translation
          })
        },
        {
          type: 'definite',
          generate: () => ({
            question: `What is the definite form of "${noun.noun}"?`,
            correctAnswer: noun.forms.definite,
            options: getUniqueRandomOptions(
              noun.forms.definite,
              commonNouns.map(n => n.forms.definite),
              3,
              (base) => {
                const endings = noun.gender === 'en' ? ['en', 'n'] : ['et', 't'];
                const baseWord = noun.noun;
                const ending = endings[Math.floor(Math.random() * endings.length)];
                return baseWord + ending;
              }
            ),
            translation: noun.translation
          })
        },
        {
          type: 'definitePlural',
          generate: () => ({
            question: `What is the definite plural form of "${noun.noun}"?`,
            correctAnswer: noun.forms.definitePlural,
            options: getUniqueRandomOptions(
              noun.forms.definitePlural,
              commonNouns.map(n => n.forms.definitePlural),
              3,
              (base) => {
                const endings = ['arna', 'erna', 'orna', 'na'];
                const baseWord = noun.forms.indefinitePlural;
                const ending = endings[Math.floor(Math.random() * endings.length)];
                return baseWord + ending;
              }
            ),
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
      category="nouns"
    />
  );
} 