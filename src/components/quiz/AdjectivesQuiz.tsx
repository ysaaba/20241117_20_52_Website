import React, { useState, useEffect } from 'react';
import { QuizComponent } from './QuizComponent';
import { adjectives } from '../../data/adjectives';
import type { QuizQuestion } from '../../types';
import { getUniqueRandomOptions } from '../../utils/getUniqueRandomOptions';
import { useQuizStatistics } from '../../hooks/useQuizStatistics';
import { getCategoryDisplayName } from '../../utils/categoryUtils';

export function AdjectivesQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { recordAnswer } = useQuizStatistics();

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
          type: 'form' as const,
          generate: () => {
            const forms = ['base', 'definite', 'plural'] as const;
            const formType = forms[Math.floor(Math.random() * forms.length)];
            
            const exampleSentence = adjective.examples[formType]?.swedish || adjective.examples.base.swedish;
            // Escape special characters and ensure case-insensitive whole word match
            const escapedForm = adjective.forms[formType].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const questionSentence = exampleSentence.replace(
              new RegExp(`\\b${escapedForm}\\b`, 'gi'), 
              '_____'
            );
            
            // Generate variations based on the correct form
            const variations = generateAdjectiveVariations(adjective.forms[formType]);
            
            return {
              type: 'form' as const,
              question: `Fill in the blank with the correct form of "${adjective.adjective}":\n\n${questionSentence}`,
              correctAnswer: adjective.forms[formType],
              options: [
                adjective.forms[formType],
                ...variations.slice(0, 3)
              ].sort(() => Math.random() - 0.5),
              translation: adjective.examples[formType]?.english || adjective.examples.base.english,
              audioText: adjective.adjective
            };
          }
        },
        {
          type: 'comparative' as const,
          generate: () => {
            if (!adjective.examples.comparative) {
              return {
                type: 'comparative' as const,
                question: `What is the comparative form of "${adjective.adjective}" (more ${adjective.translation})?`,
                correctAnswer: adjective.forms.comparative,
                options: [
                  adjective.forms.comparative,
                  ...getRandomComparativeForms(adjective.forms.comparative, 3)
                ].sort(() => Math.random() - 0.5),
                translation: `more ${adjective.translation}`,
                audioText: adjective.adjective
              };
            }

            const exampleSentence = adjective.examples.comparative.swedish;
            const questionSentence = exampleSentence.replace(
              new RegExp(`\\b${adjective.forms.comparative}\\b`, 'i'),
              '_____'
            );
            
            return {
              type: 'comparative' as const,
              question: `Fill in the blank with the comparative form of "${adjective.adjective}":\n\n${questionSentence}`,
              correctAnswer: adjective.forms.comparative,
              options: [
                adjective.forms.comparative,
                ...getRandomComparativeForms(adjective.forms.comparative, 3)
              ].sort(() => Math.random() - 0.5),
              translation: adjective.examples.comparative.english,
              audioText: adjective.adjective
            };
          }
        },
        {
          type: 'superlative' as const,
          generate: () => {
            if (!adjective.examples.superlative) {
              return {
                type: 'superlative' as const,
                question: `What is the superlative form of "${adjective.adjective}" (most ${adjective.translation})?`,
                correctAnswer: adjective.forms.superlative,
                options: [
                  adjective.forms.superlative,
                  ...getRandomSuperlativeForms(adjective.forms.superlative, 3)
                ].sort(() => Math.random() - 0.5),
                translation: `most ${adjective.translation}`,
                audioText: adjective.adjective
              };
            }

            const exampleSentence = adjective.examples.superlative.swedish;
            const questionSentence = exampleSentence.replace(
              new RegExp(`\\b${adjective.forms.superlative}\\b`, 'i'),
              '_____'
            );
            
            return {
              type: 'superlative' as const,
              question: `Fill in the blank with the superlative form of "${adjective.adjective}":\n\n${questionSentence}`,
              correctAnswer: adjective.forms.superlative,
              options: [
                adjective.forms.superlative,
                ...getRandomSuperlativeForms(adjective.forms.superlative, 3)
              ].sort(() => Math.random() - 0.5),
              translation: adjective.examples.superlative.english,
              audioText: adjective.adjective
            };
          }
        }
      ];

      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const questionData = questionType.generate();

      newQuestions.push({
        id: newQuestions.length + 1,
        type: questionType.type,
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

  const generateAdjectiveVariations = (correct: string): string[] => {
    const variations: string[] = [];
    
    // Common Swedish adjective patterns
    if (correct.endsWith('a')) {
      variations.push(
        correct.slice(0, -1),     // Remove 'a'
        correct + 't',            // Add 't'
        correct.slice(0, -1) + 't', // Replace 'a' with 't'
        correct + 'r'             // Add 'r'
      );
    } else if (correct.endsWith('t')) {
      variations.push(
        correct.slice(0, -1),     // Remove 't'
        correct.slice(0, -1) + 'a', // Replace 't' with 'a'
        correct + 'a',            // Add 'a'
        correct.slice(0, -1) + 'r'  // Replace 't' with 'r'
      );
    } else {
      variations.push(
        correct + 'a',            // Add 'a'
        correct + 't',            // Add 't'
        correct + 'r',            // Add 'r'
        correct + 'ar'            // Add 'ar'
      );
    }
    
    // Filter out any variations that match the correct answer
    // and remove duplicates
    return [...new Set(variations.filter(v => v !== correct))];
  };

  const getRandomComparativeForms = (correct: string, count: number): string[] => {
    const variations: string[] = [];
    
    // Common patterns for comparative forms
    if (correct.endsWith('are')) {
      variations.push(
        correct.slice(0, -3),           // Base form
        correct.slice(0, -3) + 'ast',   // Superlative form
        correct.slice(0, -3) + 'a',     // Definite form
        correct.slice(0, -3) + 'ar',    // Wrong ending
        correct + 'st'                  // Mixed form
      );
    }
    
    // Filter out duplicates and the correct answer
    const uniqueVariations = [...new Set(variations.filter(v => v !== correct))];
    
    // If we don't have enough variations, add some basic patterns
    while (uniqueVariations.length < count) {
      uniqueVariations.push(correct + 'e');
    }
    
    return uniqueVariations.slice(0, count);
  };

  const getRandomSuperlativeForms = (correct: string, count: number): string[] => {
    const variations: string[] = [];
    
    // Common patterns for superlative forms
    if (correct.endsWith('ast')) {
      variations.push(
        correct.slice(0, -3),           // Base form
        correct.slice(0, -3) + 'are',   // Comparative form
        correct.slice(0, -3) + 'a',     // Definite form
        correct + 'e',                  // Wrong ending
        correct.slice(0, -3) + 'aste'   // Alternative ending
      );
    }
    
    // Filter out duplicates and the correct answer
    const uniqueVariations = [...new Set(variations.filter(v => v !== correct))];
    
    // If we don't have enough variations, add some basic patterns
    while (uniqueVariations.length < count) {
      uniqueVariations.push(correct + 'e');
    }
    
    return uniqueVariations.slice(0, count);
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
      <h1 className="text-3xl font-bold text-center mb-8">{getCategoryDisplayName('adjectives')}</h1>
      <QuizComponent
        questions={questions}
        onComplete={handleComplete}
        onReset={handleReset}
        category="adjectives"
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