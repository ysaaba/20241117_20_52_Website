import React, { useState } from 'react';
import { useQuizStatistics } from '../../hooks/useQuizStatistics';
import { BarChart3, RefreshCw, BookOpen, Languages, Pencil } from 'lucide-react';
import { PracticeMistakesQuiz } from './PracticeMistakesQuiz';

export function QuizStatistics() {
  const { statistics, clearMistakes, resetAllStatistics } = useQuizStatistics();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPractice, setShowPractice] = useState(false);

  const hasAnyData = Object.values(statistics).some(
    stats => stats.totalQuestions > 0
  );

  const debugStats = () => {
    console.log('Current statistics:', statistics);
  };

  if (showPractice) {
    return (
      <PracticeMistakesQuiz
        category={selectedCategory}
        onClose={() => setShowPractice(false)}
      />
    );
  }

  if (!hasAnyData) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Statistics Available
        </h2>
        <p className="text-gray-600">
          Complete some quizzes to see your statistics here!
        </p>
      </div>
    );
  }

  const getAccuracyPercentage = (correct: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  };

  const getMistakesByCategory = (category: string) => {
    return statistics[category]?.mistakes || [];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-full mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Statistics</h1>
          <p className="text-gray-600">Track your progress and practice your mistakes</p>
          <div className="mt-4">
            <button
              onClick={resetAllStatistics}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            >
              Reset All Statistics
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(statistics).map(([category, stats]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold capitalize">{category}</h3>
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <div className="space-y-2">
                <p>Total Questions: {stats.totalQuestions}</p>
                <p className="text-green-600">Correct: {stats.correctAnswers}</p>
                <p className="text-red-600">Wrong: {stats.wrongAnswers}</p>
                <p>Accuracy: {getAccuracyPercentage(stats.correctAnswers, stats.totalQuestions)}%</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Practice Your Mistakes</h2>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="all">All Categories</option>
                <option value="nouns">Nouns</option>
                <option value="adjectives">Adjectives</option>
                <option value="verbs">Verbs</option>
              </select>
              <button
                onClick={() => setShowPractice(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Practice Mistakes
              </button>
              <button
                onClick={() => clearMistakes(selectedCategory === 'all' ? undefined : selectedCategory)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <RefreshCw className="w-4 h-4" />
                Clear Mistakes
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {(selectedCategory === 'all' ? Object.keys(statistics) : [selectedCategory]).map(category => (
              <div key={category}>
                {getMistakesByCategory(category).length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-4 capitalize">{category} Mistakes</h3>
                    <div className="space-y-3">
                      {getMistakesByCategory(category).map((mistake, index) => (
                        <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{mistake.question}</p>
                            <p className="text-sm text-gray-600">
                              Your answer: <span className="text-red-500">{mistake.userAnswer}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Correct answer: <span className="text-green-500">{mistake.correctAnswer}</span>
                            </p>
                            {mistake.translation && (
                              <p className="text-sm text-gray-600">Translation: {mistake.translation}</p>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(mistake.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 