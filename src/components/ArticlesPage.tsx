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

const EXERCISES_PER_PAGE = 5;
const PAGES_PER_SESSION = 5;
const TOTAL_EXERCISES = EXERCISES_PER_PAGE * PAGES_PER_SESSION;

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
      // Reset the current session and generate new exercises
      const newSession = initializeSession(tabType);
      return {
        ...prev,
        [tabType]: newSession
      };
    });
  };

  const handleUpdateProgress = (exerciseId: number, isCorrect: boolean, answer: string) => {
    setSessions(prev => {
      const currentSession = prev[selectedTab];
      
      if (currentSession.progress.answeredQuestions.has(exerciseId)) {
        return prev;
      }

      const exercise = currentSession.exercises.find(ex => ex.id === exerciseId);
      if (!exercise) return prev;

      const newAnsweredQuestions = new Set(currentSession.progress.answeredQuestions);
      newAnsweredQuestions.add(exerciseId);

      const newProgress = {
        ...currentSession.progress,
        correct: isCorrect ? currentSession.progress.correct + 1 : currentSession.progress.correct,
        wrong: !isCorrect ? currentSession.progress.wrong + 1 : currentSession.progress.wrong,
        answeredQuestions: newAnsweredQuestions
      };

      const newSummary = [
        ...currentSession.summary,
        { exercise, userAnswer: answer, isCorrect }
      ];

      const currentPageExercises = currentExercises;
      const isPageComplete = currentPageExercises.every(ex => 
        newAnsweredQuestions.has(ex.id)
      );

      const shouldAdvancePage = isPageComplete && 
        currentSession.currentPage < PAGES_PER_SESSION;

      const isAllCompleted = newAnsweredQuestions.size === TOTAL_EXERCISES;

      return {
        ...prev,
        [selectedTab]: {
          ...currentSession,
          progress: newProgress,
          summary: newSummary,
          currentPage: shouldAdvancePage ? currentSession.currentPage + 1 : currentSession.currentPage,
          completed: isAllCompleted
        }
      };
    });
  };

  const handleResetSession = (tabType: ArticleType) => {
    console.log('Resetting session for tab:', tabType);
    setSessions(prev => ({
      ...prev,
      [tabType]: initializeSession(tabType)
    }));
  };

  const handlePageChange = (page: number) => {
    setSessions(prev => {
      const session = prev[selectedTab];
      const validPage = Math.max(1, Math.min(page, PAGES_PER_SESSION));
      
      return {
        ...prev,
        [selectedTab]: {
          ...session,
          currentPage: validPage
        }
      };
    });
  };

  const currentSession = sessions[selectedTab];
  const currentExercises = useMemo(() => {
    const session = sessions[selectedTab];
    const startIndex = (session.currentPage - 1) * EXERCISES_PER_PAGE;
    const endIndex = startIndex + EXERCISES_PER_PAGE;
    const exercises = session.exercises.slice(startIndex, endIndex);
    
    console.log('Current exercises:', {
      selectedTab,
      currentPage: session.currentPage,
      startIndex,
      endIndex,
      exercisesLength: exercises.length,
      exercises
    });
    
    return exercises;
  }, [sessions, selectedTab]);

  console.log('Current session state:', {
    selectedTab,
    currentExercises,
    totalPages: PAGES_PER_SESSION,
    currentPage: sessions[selectedTab].currentPage
  });

  return (
    <main className="py-8">
      <div className="max-w-3xl mx-auto px-4">
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
          exercises={currentExercises}
          progress={sessions[selectedTab].progress}
          summary={sessions[selectedTab].summary}
          onUpdateProgress={handleUpdateProgress}
          onComplete={() => handleSessionComplete(selectedTab)}
          onReset={() => handleResetSession(selectedTab)}
          isCompleted={sessions[selectedTab].completed}
          currentPage={sessions[selectedTab].currentPage}
          onPageChange={handlePageChange}
          totalPages={PAGES_PER_SESSION}
        />
      </div>
    </main>
  );
} 