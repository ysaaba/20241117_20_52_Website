import React, { useState } from 'react';
import { NounsQuiz } from './quiz/NounsQuiz';
import { AdjectivesQuiz } from './quiz/AdjectivesQuiz';
import { VerbsQuiz } from './quiz/VerbsQuiz';
import { BookOpen, Languages, Pencil, BarChart3 } from 'lucide-react';
import { QuizStatistics } from './quiz/QuizStatistics';

export default function QuizPage() {
  const [activeTab, setActiveTab] = useState('nouns');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-full mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Swedish Language Quiz
          </h1>
          <p className="text-gray-600 mb-4">
            Test your knowledge with multiple-choice questions
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('nouns')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                activeTab === 'nouns'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Nouns Quiz
            </button>
            <button
              onClick={() => setActiveTab('adjectives')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                activeTab === 'adjectives'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Languages className="w-5 h-5" />
              Adjectives Quiz
            </button>
            <button
              onClick={() => setActiveTab('verbs')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                activeTab === 'verbs'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Pencil className="w-5 h-5" />
              Verbs Quiz
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                activeTab === 'statistics'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Statistics
            </button>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          {activeTab === 'nouns' && <NounsQuiz />}
          {activeTab === 'adjectives' && <AdjectivesQuiz />}
          {activeTab === 'verbs' && <VerbsQuiz />}
          {activeTab === 'statistics' && <QuizStatistics />}
        </div>
      </div>
    </div>
  );
} 