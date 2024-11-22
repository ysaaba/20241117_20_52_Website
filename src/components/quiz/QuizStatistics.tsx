import React, { useState, useMemo } from 'react';
import { useQuizStatistics } from '../../hooks/useQuizStatistics';
import { PracticeMistakesQuiz } from './PracticeMistakesQuiz';
import { BarChart3, RefreshCw } from 'lucide-react';
import { getCategoryDisplayName } from '../../utils/categoryUtils';

export function QuizStatistics() {
  const { statistics, clearMistakes, resetAllStatistics } = useQuizStatistics();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPractice, setShowPractice] = useState(false);

  const getMistakesByCategory = (category: string) => {
    if (!statistics) return [];
    if (category === 'all') {
      return Object.values(statistics).flatMap(stat => stat.mistakes || []);
    }
    return statistics[category]?.mistakes || [];
  };

  const filteredMistakes = useMemo(() => 
    getMistakesByCategory(selectedCategory),
    [selectedCategory, statistics]
  );

  const getAccuracyPercentage = (correct: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  };

  if (showPractice) {
    return (
      <PracticeMistakesQuiz
        category={selectedCategory}
        onClose={() => setShowPractice(false)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-full mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Statistics</h1>
          <p className="text-gray-600">Track your progress and practice your mistakes</p>
          <div className="mt-4">
            <button
              onClick={resetAllStatistics}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              Reset All Statistics
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(statistics || {})
            .filter(([category]) => category !== 'all')
            .map(([category, stats]) => (
              <div key={category} className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold capitalize text-gray-800">{getCategoryDisplayName(category)}</h3>
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700">Total Questions: {stats.totalQuestions}</p>
                  <p className="text-green-600">Correct: {stats.correctAnswers}</p>
                  <p className="text-red-600">Wrong: {stats.wrongAnswers}</p>
                  <p className="text-gray-700">
                    Accuracy: {getAccuracyPercentage(stats.correctAnswers, stats.totalQuestions)}%
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Practice Your Mistakes</h2>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-white text-gray-800 border-gray-200 focus:border-gray-500 focus:ring-gray-500"
              >
                <option value="all">{getCategoryDisplayName('all')}</option>
                <option value="nouns">{getCategoryDisplayName('nouns')}</option>
                <option value="adjectives">{getCategoryDisplayName('adjectives')}</option>
                <option value="verbs">{getCategoryDisplayName('verbs')}</option>
              </select>
              <button
                onClick={() => setShowPractice(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Practice Now
              </button>
              <button
                onClick={() => clearMistakes(selectedCategory === 'all' ? undefined : selectedCategory)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Clear Mistakes
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredMistakes.length > 0 ? (
              <div className="space-y-3">
                {filteredMistakes.map((mistake, index) => (
                  <div key={mistake.id || index} className="flex items-start justify-between p-3 bg-white rounded-lg border border-gray-100">
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
            ) : (
              <p className="text-gray-600 text-center">No mistakes to practice!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}