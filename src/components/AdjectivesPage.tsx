import React, { useState, useMemo } from 'react';
import { Search, Filter, Volume2, BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { adjectives } from '../data/adjectives';
import { useSound } from '../hooks/useSound';
import type { AdjectiveCategory, AdjectiveData } from '../types';

const ADJECTIVES_PER_PAGE = 10;

export default function AdjectivesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AdjectiveCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [showExamples, setShowExamples] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const { playSound } = useSound();

  const categories = Array.from(new Set(adjectives.map(adj => adj.category)));

  const filteredAdjectives = useMemo(() => {
    return adjectives
      .slice()
      .sort((a, b) => a.adjective.localeCompare(b.adjective))
      .filter((adj) => {
        const matchesSearch =
          adj.adjective.toLowerCase().includes(searchQuery.toLowerCase()) ||
          adj.translation.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || adj.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'all' || adj.difficulty === selectedDifficulty;
        return matchesSearch && matchesCategory && matchesDifficulty;
      });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const totalPages = Math.ceil(filteredAdjectives.length / ADJECTIVES_PER_PAGE);
  const currentAdjectives = filteredAdjectives.slice(
    (currentPage - 1) * ADJECTIVES_PER_PAGE,
    currentPage * ADJECTIVES_PER_PAGE
  );

  const toggleExample = (adjective: string) => {
    setShowExamples(prev => ({
      ...prev,
      [adjective]: !prev[adjective]
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Swedish Adjectives</h1>
          <p className="text-gray-600">Learn and practice Swedish adjectives with examples and pronunciation</p>
          <p className="text-sm text-gray-500 mt-2">
            Showing {currentAdjectives.length} of {filteredAdjectives.length} adjectives
          </p>
        </header>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search adjectives..."
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
                  setSelectedCategory(e.target.value as AdjectiveCategory | 'all');
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

        <div className="grid gap-4">
          {currentAdjectives.map((adj) => (
            <div key={adj.adjective} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{adj.adjective}</h3>
                    <button
                      onClick={() => playSound(adj.adjective)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-600 italic mb-3">{adj.translation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    adj.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    adj.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {adj.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                    {adj.category}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => toggleExample(adj.adjective)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showExamples[adj.adjective] ? 'Hide Details' : 'Show Details'}
                </button>

                {showExamples[adj.adjective] && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Forms</h4>
                        <ul className="space-y-1">
                          <li><span className="text-gray-600">Base:</span> {adj.forms.base}</li>
                          <li><span className="text-gray-600">Definite:</span> {adj.forms.definite}</li>
                          <li><span className="text-gray-600">Plural:</span> {adj.forms.plural}</li>
                          <li><span className="text-gray-600">Comparative:</span> {adj.forms.comparative}</li>
                          <li><span className="text-gray-600">Superlative:</span> {adj.forms.superlative}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Examples</h4>
                        {Object.entries(adj.examples).map(([form, example]) => (
                          <div key={form} className="mb-2">
                            <p className="text-blue-800">{example.swedish}</p>
                            <p className="text-gray-600 italic">{example.english}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {(adj.synonym || adj.antonym) && (
                      <div className="pt-4 border-t">
                        {adj.synonym && (
                          <p className="text-sm">
                            <span className="text-gray-600">Synonyms:</span>{' '}
                            {adj.synonym.join(', ')}
                          </p>
                        )}
                        {adj.antonym && (
                          <p className="text-sm">
                            <span className="text-gray-600">Antonym:</span>{' '}
                            {adj.antonym}
                          </p>
                        )}
                      </div>
                    )}
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