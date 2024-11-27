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
  currentPage: number;
}

const EXERCISES_PER_PAGE = 10;
const TOTAL_PAGES = 3;
const TOTAL_EXERCISES = EXERCISES_PER_PAGE * TOTAL_PAGES;

const initializeSession = (type: ArticleType): ExerciseSession => {
  console.log('Initializing session for type:', type);
  const exercises = generateExercises(TOTAL_EXERCISES, 1, type);
  console.log('Generated exercises for session:', exercises.length);
  
  return {
    exercises,
    completed: false,
    progress: {
      correct: 0,
      wrong: 0,
      total: TOTAL_EXERCISES,
      answeredQuestions: new Set()
    },
    summary: [],
    currentPage: 1
  };
};

export default function ArticlesPage() {
  const [selectedTab, setSelectedTab] = useState<ArticleType>('indefinite');
  const [sessions, setSessions] = useState<Record<ArticleType, ExerciseSession>>(() => {
    const initialSessions = {
      indefinite: initializeSession('indefinite'),
      definite: initializeSession('definite'),
      indefinitePlural: initializeSession('indefinitePlural'),
      definitePlural: initializeSession('definitePlural')
    };
    console.log('Initial sessions:', initialSessions);
    return initialSessions;
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
    console.log('Completing session for tab:', tabType);
    setSessions(prev => {
      const currentSession = prev[tabType];
      return {
        ...prev,
        [tabType]: {
          ...currentSession,
          completed: true
        }
      };
    });
  };

  const handleNewSession = (tabType: ArticleType) => {
    console.log('Starting new session for tab:', tabType);
    setSessions(prev => ({
      ...prev,
      [tabType]: initializeSession(tabType)
    }));
  };

  const handleUpdateProgress = (exerciseId: number, isCorrect: boolean, answer: string) => {
    setSessions(prev => {
      const currentSession = prev[selectedTab];
      const exercise = currentSession.exercises.find(ex => ex.id === exerciseId);
      
      if (!exercise || currentSession.progress.answeredQuestions.has(exerciseId)) {
        return prev;
      }

      const newAnsweredQuestions = new Set(currentSession.progress.answeredQuestions);
      newAnsweredQuestions.add(exerciseId);

      const newProgress = {
        ...currentSession.progress,
        correct: currentSession.progress.correct + (isCorrect ? 1 : 0),
        wrong: currentSession.progress.wrong + (isCorrect ? 0 : 1),
        answeredQuestions: newAnsweredQuestions,
        total: TOTAL_EXERCISES
      };

      const newSummary = [
        ...currentSession.summary,
        { exercise, userAnswer: answer, isCorrect }
      ];

      return {
        ...prev,
        [selectedTab]: {
          ...currentSession,
          progress: newProgress,
          summary: newSummary
        }
      };
    });
  };

  const handlePageChange = (page: number) => {
    setSessions(prev => ({
      ...prev,
      [selectedTab]: {
        ...prev[selectedTab],
        currentPage: page
      }
    }));
  };

  const currentSession = sessions[selectedTab];
  const startIdx = (currentSession.currentPage - 1) * EXERCISES_PER_PAGE;
  const currentExercises = currentSession.exercises.slice(startIdx, startIdx + EXERCISES_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        {/* Exercise Area with Tabs */}
        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
          {/* Tabs */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-md">
              <nav className="flex" aria-label="Tabs">
                {tabs.map((tab) => {
                  const isActive = tab.id === selectedTab;
                  const Icon = tab.icon;
                  const isCompleted = sessions[tab.id as ArticleType].completed;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id as ArticleType)}
                      className={`
                        flex items-center justify-center gap-2 py-4 px-1 flex-1 font-medium text-sm
                        ${isActive
                          ? 'text-blue-600 border-b-2 border-blue-500'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }
                        ${tab.id === 'indefinite' ? 'rounded-l-xl' : ''}
                        ${tab.id === 'definitePlural' ? 'rounded-r-xl' : ''}
                        transition-colors duration-200 relative
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.title}</span>
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            <ArticleExercise
              exercises={currentExercises}
              progress={currentSession.progress}
              summary={currentSession.summary}
              onUpdateProgress={handleUpdateProgress}
              onComplete={() => handleSessionComplete(selectedTab)}
              isCompleted={currentSession.completed}
              currentPage={currentSession.currentPage}
              onPageChange={handlePageChange}
              totalPages={TOTAL_PAGES}
              totalExercises={TOTAL_EXERCISES}
              onReset={() => handleNewSession(selectedTab)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}