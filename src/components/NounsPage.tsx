import React, { useState, useMemo } from 'react';
import { Search, Filter, Volume2, BookOpen, ChevronLeft, ChevronRight, X, GraduationCap, Users, Building } from 'lucide-react';
import { commonNouns } from '../data/nouns';
import { useSound } from '../hooks/useSound';
import type { NounCategory } from '../types';

type NounFormType = 'indefinite' | 'definite' | 'indefinitePlural' | 'definitePlural';

const NOUNS_PER_PAGE = 10;

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

export default function NounsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [showExamples, setShowExamples] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const { playSound } = useSound();

  const categories = Array.from(new Set(commonNouns.map(noun => noun.category)));

  const filteredNouns = useMemo(() => {
    return commonNouns
      .slice()
      .sort((a, b) => a.noun.localeCompare(b.noun))
      .filter(noun => {
        const matchesCategory = selectedCategory === 'all' || noun.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'all' || noun.difficulty === selectedDifficulty;
        const matchesSearch = searchQuery === '' || 
          noun.noun.toLowerCase().includes(searchQuery.toLowerCase()) ||
          noun.translation.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesDifficulty && matchesSearch;
      });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const totalPages = Math.ceil(filteredNouns.length / NOUNS_PER_PAGE);
  const currentNouns = filteredNouns.slice(
    (currentPage - 1) * NOUNS_PER_PAGE,
    currentPage * NOUNS_PER_PAGE
  );

  const toggleExample = (noun: string) => {
    setShowExamples(prev => ({
      ...prev,
      [noun]: !prev[noun]
    }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Swedish Nouns</h1>
          <p className="text-gray-600">Learn and practice Swedish nouns with their articles and forms</p>
          <p className="text-sm text-gray-500 mt-2">
            Showing {currentNouns.length} of {filteredNouns.length} nouns
          </p>
        </header>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search nouns..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as NounCategory | 'all');
                  setCurrentPage(1);
                }}
                className="w-full appearance-none pr-8 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentPage(1);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  aria-label="Clear category filter"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value as 'all' | 'beginner' | 'intermediate' | 'advanced');
                  setCurrentPage(1);
                }}
                className="w-full appearance-none pr-8 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              {selectedDifficulty !== 'all' && (
                <button
                  onClick={() => {
                    setSelectedDifficulty('all');
                    setCurrentPage(1);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  aria-label="Clear difficulty filter"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {currentNouns.map((noun, index) => (
            <div
              key={`${noun.noun}-${noun.category}-${noun.translation}-${index}`}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{noun.noun}</h3>
                    <button
                      onClick={() => playSound(noun.noun)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-600 italic mb-3">{noun.translation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    noun.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    noun.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {noun.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                    {noun.category}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => toggleExample(noun.noun)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showExamples[noun.noun] ? 'Hide Details' : 'Show Details'}
                </button>

                {showExamples[noun.noun] && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Forms</h4>
                        <ul className="space-y-1">
                          <li><span className="text-gray-600">Indefinite:</span> {noun.forms.indefinite}</li>
                          <li><span className="text-gray-600">Definite:</span> {noun.forms.definite}</li>
                          <li><span className="text-gray-600">Indefinite Plural:</span> {noun.forms.indefinitePlural}</li>
                          <li><span className="text-gray-600">Definite Plural:</span> {noun.forms.definitePlural}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Examples</h4>
                        {Object.entries(noun.examples).map(([form, example]) => (
                          <div key={form} className="mb-2">
                            <p className="text-blue-800">{example.swedish}</p>
                            <p className="text-gray-600 italic">{example.english}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}