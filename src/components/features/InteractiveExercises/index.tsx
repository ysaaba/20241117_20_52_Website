import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SentenceBuilder from '@/components/quiz/SentenceBuilder';

interface Exercise {
  id: string;
  type: 'sentence-builder';
  question: string;
  words: string[];
  correctAnswer: string;
}

const exercises: Exercise[] = [
  // Basic Sentences
  {
    id: '1',
    type: 'sentence-builder',
    question: 'Build a basic Swedish sentence (I speak Swedish):',
    words: ['jag', 'pratar', 'svenska'],
    correctAnswer: 'jag pratar svenska'
  },
  // Present Tense
  {
    id: '2',
    type: 'sentence-builder',
    question: 'Create a present tense sentence (I am reading a book):',
    words: ['jag', 'läser', 'en', 'bok'],
    correctAnswer: 'jag läser en bok'
  },
  // Word Order with Adverbs
  {
    id: '3',
    type: 'sentence-builder',
    question: 'Place the adverb correctly (I often drink coffee):',
    words: ['jag', 'dricker', 'ofta', 'kaffe'],
    correctAnswer: 'jag dricker ofta kaffe'
  },
  // Questions
  {
    id: '4',
    type: 'sentence-builder',
    question: 'Form a question (Do you speak English?):',
    words: ['pratar', 'du', 'engelska'],
    correctAnswer: 'pratar du engelska'
  },
  // Negation
  {
    id: '5',
    type: 'sentence-builder',
    question: 'Create a negative sentence (I do not like fish):',
    words: ['jag', 'tycker', 'inte', 'om', 'fisk'],
    correctAnswer: 'jag tycker inte om fisk'
  },
  // Time Expressions
  {
    id: '6',
    type: 'sentence-builder',
    question: 'Use time expression (I am going home tomorrow):',
    words: ['jag', 'går', 'hem', 'imorgon'],
    correctAnswer: 'jag går hem imorgon'
  },
  // Modal Verbs
  {
    id: '7',
    type: 'sentence-builder',
    question: 'Use modal verb (I want to sleep):',
    words: ['jag', 'vill', 'sova'],
    correctAnswer: 'jag vill sova'
  },
  // Adjective Agreement
  {
    id: '8',
    type: 'sentence-builder',
    question: 'Use correct adjective form (The red car is new):',
    words: ['den', 'röda', 'bilen', 'är', 'ny'],
    correctAnswer: 'den röda bilen är ny'
  },
  // Possessives
  {
    id: '9',
    type: 'sentence-builder',
    question: 'Use possessive (My sister lives in Stockholm):',
    words: ['min', 'syster', 'bor', 'i', 'Stockholm'],
    correctAnswer: 'min syster bor i Stockholm'
  },
  // Compound Sentences
  {
    id: '10',
    type: 'sentence-builder',
    question: 'Create a compound sentence (I am tired but happy):',
    words: ['jag', 'är', 'trött', 'men', 'glad'],
    correctAnswer: 'jag är trött men glad'
  },
  // Prepositions
  {
    id: '11',
    type: 'sentence-builder',
    question: 'Use correct preposition (The book is on the table):',
    words: ['boken', 'ligger', 'på', 'bordet'],
    correctAnswer: 'boken ligger på bordet'
  },
  // Past Tense
  {
    id: '12',
    type: 'sentence-builder',
    question: 'Form past tense sentence (I went to school):',
    words: ['jag', 'gick', 'till', 'skolan'],
    correctAnswer: 'jag gick till skolan'
  },
  // Future Tense
  {
    id: '13',
    type: 'sentence-builder',
    question: 'Express future (I will travel to Sweden):',
    words: ['jag', 'ska', 'resa', 'till', 'Sverige'],
    correctAnswer: 'jag ska resa till Sverige'
  },
  // Reflexive Verbs
  {
    id: '14',
    type: 'sentence-builder',
    question: 'Use reflexive verb (I wash myself):',
    words: ['jag', 'tvättar', 'mig'],
    correctAnswer: 'jag tvättar mig'
  },
  // Plural Forms
  {
    id: '15',
    type: 'sentence-builder',
    question: 'Use plural form (The dogs are black):',
    words: ['hundarna', 'är', 'svarta'],
    correctAnswer: 'hundarna är svarta'
  }
];

const InteractiveExercises: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);

  const handleCorrectAnswer = () => {
    setScore(prev => prev + 1);
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    }
  };

  // Wrap the entire component with error boundary
  try {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Interactive Exercises</h2>
          <div className="mb-4">
            <span className="font-semibold">Score: {score}</span>
          </div>
          
          {currentExercise < exercises.length ? (
            <SentenceBuilder
              exercise={exercises[currentExercise]}
              onCorrect={handleCorrectAnswer}
            />
          ) : (
            <div className="text-center p-4">
              <h3 className="text-xl">All exercises completed!</h3>
              <p>Final score: {score}/{exercises.length}</p>
            </div>
          )}
        </div>
      </DndProvider>
    );
  } catch (error) {
    console.error('Error in InteractiveExercises:', error);
    return (
      <div className="p-4 text-red-500">
        Error loading exercises. Please try refreshing the page.
      </div>
    );
  }
};

export default InteractiveExercises; 