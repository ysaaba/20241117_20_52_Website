import React, { useState, useMemo } from 'react';
import { BookOpen, GraduationCap, Users, Building } from 'lucide-react';
import { ArticleExercise } from './ArticleExercise';
import { generateExercises } from '../data/articleExercises';
import type { ArticleType, Exercise } from '../types';

interface ExerciseSummary {
  exercise: Exercise;
  userAnswer: string;
  isCorrect: boolean;
}

interface ExerciseSession {
  exercises: Exercise[];
  completed: boolean;
  progress: {
    correct: number;
    wrong: number;
    total: number;
    answeredQuestions: Set<number>;
  };
  summary: ExerciseSummary[];
}

export function ArticlesPage() {
  const [selectedTab, setSelectedTab] = useState<ArticleType>('indefinite');
  const [sessions, setSessions] = useState<Record<ArticleType, ExerciseSession>>({
    indefinite: {
      exercises: generateExercises(25, 1, 'indefinite'),
      completed: false,
      progress: {
        correct: 0,
        wrong: 0,
        total: 25,
        answeredQuestions: new Set()
      },
      summary: []
    },
    definite: {
      exercises: generateExercises(25, 1, 'definite'),
      completed: false,
      progress: {
        correct: 0,
        wrong: 0,
        total: 25,
        answeredQuestions: new Set()
      },
      summary: []
    },
    indefinitePlural: {
      exercises: generateExercises(25, 1, 'indefinitePlural'),
      completed: false,
      progress: {
        correct: 0,
        wrong: 0,
        total: 25,
        answeredQuestions: new Set()
      },
      summary: []
    },
    definitePlural: {
      exercises: generateExercises(25, 1, 'definitePlural'),
      completed: false,
      progress: {
        correct: 0,
        wrong: 0,
        total: 25,
        answeredQuestions: new Set()
      },
      summary: []
    }
  });

  const tabs = [
    {
      id: 'indefinite',
      title: 'Indefinite Articles',
      description: 'Practice using en/ett',
      icon: BookOpen
    },
    {
      id: 'definite',
      title: 'Definite Articles',
      description: 'Practice using -en/-et',
      icon: GraduationCap
    },
    {
      id: 'indefinitePlural',
      title: 'Plural Indefinite',
      description: 'Practice using -ar/-er/-or',
      icon: Users
    },
    {
      id: 'definitePlural',
      title: 'Definite Plural',
      description: 'Practice using -arna/-erna',
      icon: Building
    }
  ];

  const handleTabChange = (newTab: ArticleType) => {
    setSelectedTab(newTab);
  };

  const handleSessionComplete = (tabType: ArticleType) => {
    setSessions(prev => ({
      ...prev,
      [tabType]: {
        ...prev[tabType],
        completed: true
      }
    }));
  };

  const handleUpdateProgress = (exerciseId: number, isCorrect: boolean, answer: string) => {
    setSessions(prev => {
      const currentSession = prev[selectedTab];
      const exercise = currentSession.exercises.find(ex => ex.id === exerciseId);
      
      if (currentSession.progress.answeredQuestions.has(exerciseId)) {
        return prev;
      }

      return {
        ...prev,
        [selectedTab]: {
          ...currentSession,
          progress: {
            ...currentSession.progress,
            correct: isCorrect ? currentSession.progress.correct + 1 : currentSession.progress.correct,
            wrong: !isCorrect ? currentSession.progress.wrong + 1 : currentSession.progress.wrong,
            answeredQuestions: new Set([...currentSession.progress.answeredQuestions, exerciseId])
          },
          summary: exercise ? [
            ...currentSession.summary,
            {
              exercise,
              userAnswer: answer,
              isCorrect
            }
          ] : currentSession.summary
        }
      };
    });

    setSessions(prev => {
      const currentSession = prev[selectedTab];
      if (currentSession.progress.correct + currentSession.progress.wrong === currentSession.progress.total) {
        return {
          ...prev,
          [selectedTab]: {
            ...currentSession,
            completed: true
          }
        };
      }
      return prev;
    });
  };

  const handleResetSession = (tabType: ArticleType) => {
    setSessions(prev => ({
      ...prev,
      [tabType]: {
        exercises: generateExercises(25, 1, tabType),
        completed: false,
        progress: {
          correct: 0,
          wrong: 0,
          total: 25,
          answeredQuestions: new Set()
        },
        summary: []
      }
    }));
  };

  return (
    <main className="py-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Swedish Articles Practice
          </h1>
          <p className="text-gray-600 mb-6">
            Master Swedish articles and noun forms through interactive exercises
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isCompleted = sessions[tab.id as ArticleType].completed;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as ArticleType)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-colors relative ${
                    selectedTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full" />
                  )}
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="font-medium text-sm">{tab.title}</span>
                  <span className="text-xs text-gray-500">{tab.description}</span>
                </button>
              );
            })}
          </div>
        </header>

        <ArticleExercise 
          exercises={sessions[selectedTab].exercises}
          progress={sessions[selectedTab].progress}
          summary={sessions[selectedTab].summary}
          onUpdateProgress={handleUpdateProgress}
          onComplete={() => handleSessionComplete(selectedTab)}
          onReset={() => handleResetSession(selectedTab)}
          isCompleted={sessions[selectedTab].completed}
        />
      </div>
    </main>
  );
} 