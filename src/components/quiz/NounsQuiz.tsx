import React, { useState, useEffect } from 'react';
import { QuizComponent } from './QuizComponent';
import { commonNouns } from '../../data/nouns';
import type { QuizQuestion } from '../../types';
import { useQuizStatistics } from '../../hooks/useQuizStatistics';
import { getCategoryDisplayName } from '../../utils/categoryUtils';

export function NounsQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { recordAnswer } = useQuizStatistics();

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const availableNouns = commonNouns.slice();
    const newQuestions: QuizQuestion[] = [];
    
    for (let i = 0; i < Math.min(10, availableNouns.length); i++) {
      const randomIndex = Math.floor(Math.random() * availableNouns.length);
      const noun = availableNouns[randomIndex];
      availableNouns.splice(randomIndex, 1);

      const formType = ['definite', 'indefinitePlural', 'definitePlural'][Math.floor(Math.random() * 3)] as const;
      let variations = generateNounFormVariations(noun, formType);
      
      // Filter out any invalid variations
      variations = variations.filter(v => v && v.trim() !== '' && v !== '-');
      
      const questionType = Math.random();
      let questionData: Partial<QuizQuestion>;
      
      if (questionType < 0.4) { // 40% chance for form questions
        const exampleSentence = noun.examples[formType].swedish;
        const correctForm = noun.forms[formType];
        
        // Ensure we have exactly 3 valid wrong options
        let wrongOptions: string[] = [];
        if (variations.length >= 3) {
          wrongOptions = variations.slice(0, 3);
        } else {
          const backupOptions = generateBackupFormVariations(noun, formType);
          wrongOptions = [...variations, ...backupOptions].slice(0, 3);
        }

        // Validate all options are non-empty
        wrongOptions = wrongOptions.map(opt => opt || correctForm + 'x');

        questionData = {
          type: 'form',
          question: `Fill in the blank with the correct form of "${noun.noun}":\n\n${
            exampleSentence.replace(new RegExp(`\\b${correctForm}\\b`, 'gi'), '_____')
          }`,
          correctAnswer: correctForm,
          options: [correctForm, ...wrongOptions].sort(() => Math.random() - 0.5),
          translation: noun.examples[formType].english,
          audioText: exampleSentence.replace(new RegExp(`\\b${correctForm}\\b`, 'gi'), '...')
        };
      } else if (questionType < 0.7) { // 30% chance for article questions
        questionData = {
          type: 'article',
          question: `What is the correct article for "${noun.noun}"?`,
          correctAnswer: noun.gender,
          options: ['en', 'ett'],
          translation: noun.translation,
          audioText: noun.noun
        };
      } else { // 30% chance for translation questions
        // Get translations from same category first
        const categoryNouns = availableNouns.filter(n => n.category === noun.category);
        const otherNouns = availableNouns.filter(n => n.category !== noun.category);
        
        // Ensure we have exactly 3 valid wrong options
        const wrongOptions: string[] = [];
        
        // Try category translations first
        for (const catNoun of categoryNouns) {
          if (wrongOptions.length >= 3) break;
          if (catNoun.translation !== noun.translation && 
              catNoun.translation.trim() !== '' && 
              !wrongOptions.includes(catNoun.translation)) {
            wrongOptions.push(catNoun.translation);
          }
        }
        
        // Fill remaining slots with other translations if needed
        for (const otherNoun of otherNouns) {
          if (wrongOptions.length >= 3) break;
          if (otherNoun.translation !== noun.translation && 
              otherNoun.translation.trim() !== '' && 
              !wrongOptions.includes(otherNoun.translation)) {
            wrongOptions.push(otherNoun.translation);
          }
        }
        
        // If we still don't have enough options, add some backup translations
        while (wrongOptions.length < 3) {
          const backupTranslation = generateBackupTranslation(noun.translation, wrongOptions);
          if (backupTranslation && backupTranslation.trim() !== '' && !wrongOptions.includes(backupTranslation)) {
            wrongOptions.push(backupTranslation);
          }
        }

        // For translation questions, provide audio for both the word and its definite form
        const audioTexts = [
          noun.noun,
          noun.forms.definite,
          noun.forms.indefinitePlural,
          noun.forms.definitePlural
        ].join('. ');

        questionData = {
          type: 'translation',
          question: `What is the meaning of "${noun.noun}"?`,
          correctAnswer: noun.translation,
          options: [noun.translation, ...wrongOptions].sort(() => Math.random() - 0.5),
          audioText: audioTexts
        };
      }

      newQuestions.push({
        id: i + 1,
        ...questionData as QuizQuestion
      });
    }

    setQuestions(newQuestions);
  };

  const generateNounFormVariations = (noun: typeof commonNouns[0], formType: 'definite' | 'indefinitePlural' | 'definitePlural'): string[] => {
    const variations: string[] = [];
    const baseNoun = noun.noun;
    
    switch (formType) {
      case 'definite':
        if (noun.gender === 'en') {
          variations.push(
            baseNoun + 'et',  // Wrong gender ending
            baseNoun + 'n',   // Missing 'e'
            noun.forms.indefinitePlural // Using plural instead
          );
        } else {
          variations.push(
            baseNoun + 'en',  // Wrong gender ending
            baseNoun + 't',   // Missing 'e'
            noun.forms.indefinitePlural // Using plural instead
          );
        }
        break;
        
      case 'indefinitePlural':
        // Common plural patterns in Swedish
        const pluralEndings = ['ar', 'er', 'or'];
        pluralEndings.forEach(ending => {
          if (noun.forms.indefinitePlural !== baseNoun + ending) {
            variations.push(baseNoun + ending);
          }
        });
        // Add the definite form as a variation
        if (noun.forms.definite !== baseNoun) {
          variations.push(noun.forms.definite);
        }
        break;
        
      case 'definitePlural':
        const baseForm = noun.forms.indefinitePlural;
        const definitePluralEndings = ['na', 'a', 'arna', 'erna', 'orna'];
        definitePluralEndings.forEach(ending => {
          const variation = baseForm + ending;
          if (variation !== noun.forms.definitePlural) {
            variations.push(variation);
          }
        });
        break;
    }
    
    // Filter out invalid variations
    return variations.filter(v => 
      v && 
      v.trim() !== '' && 
      v !== '-' && 
      v !== noun.forms[formType] && 
      v !== baseNoun &&
      v.length > 1
    );
  };

  const generateBackupFormVariations = (noun: typeof commonNouns[0], formType: 'definite' | 'indefinitePlural' | 'definitePlural'): string[] => {
    const backups: string[] = [];
    const baseNoun = noun.noun;
    
    const commonEndings = {
      definite: ['en', 'et', 'n', 't', 'det', 'den'],
      indefinitePlural: ['ar', 'er', 'or', 'rar', 'ror', 'ar'],
      definitePlural: ['arna', 'erna', 'orna', 'na', 'ena', 'rna']
    };
    
    const endings = commonEndings[formType];
    
    for (const ending of endings) {
      const variation = formType === 'definitePlural' 
        ? noun.forms.indefinitePlural + ending
        : baseNoun + ending;
        
      if (variation && 
          variation.trim() !== '' && 
          variation !== '-' &&
          variation !== noun.forms[formType] && 
          !backups.includes(variation)) {
        backups.push(variation);
      }
    }
    
    return backups;
  };

  const generateBackupTranslation = (correctTranslation: string, existingOptions: string[]): string => {
    const modifiers = [
      'small', 'large', 'old', 'new', 'red', 'blue', 'green',
      'wooden', 'metal', 'plastic', 'glass', 'paper', 'special'
    ];
    
    // Ensure the correct translation is valid
    if (!correctTranslation || correctTranslation.trim() === '') {
      return 'unknown item';
    }
    
    let attempts = 0;
    let attempt = correctTranslation;
    
    while ((attempt === correctTranslation || existingOptions.includes(attempt)) && attempts < modifiers.length) {
      const modifier = modifiers[attempts];
      attempt = `${modifier} ${correctTranslation}`;
      attempts++;
    }
    
    // If we couldn't generate a unique modification, return a numbered variation
    if (attempt === correctTranslation || existingOptions.includes(attempt)) {
      return `${correctTranslation} (type ${existingOptions.length + 1})`;
    }
    
    return attempt;
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
      <h1 className="text-3xl font-bold text-center mb-8">{getCategoryDisplayName('nouns')}</h1>
      <QuizComponent
        questions={questions}
        onComplete={handleComplete}
        onReset={handleReset}
        category="nouns"
        recordAnswer={recordAnswer}
      />
    </div>
  );
} 