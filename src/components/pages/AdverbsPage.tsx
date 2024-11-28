import React, { useState, useMemo } from 'react';
import { Search, Filter, Volume2, BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { adverbs } from '../../data/adverbs';
import { useSound } from '../../hooks/useSound';
import type { AdverbCategory, AdverbData } from '../../types';

const ADVERBS_PER_PAGE = 10;

export default function AdverbsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AdverbCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [showExamples, setShowExamples] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const { playSound } = useSound();

  const categories = Array.from(new Set(adverbs.map(adv => adv.category)));

  const filteredAdverbs = useMemo(() => {
    return adverbs
      .slice()
      .sort((a, b) => a.adverb.localeCompare(b.adverb))
      .filter((adv) => {
        const matchesSearch =
          adv.adverb.toLowerCase().includes(searchQuery.toLowerCase()) ||
          adv.translation.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || adv.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'all' || adv.difficulty === selectedDifficulty;
        return matchesSearch && matchesCategory && matchesDifficulty;
      });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const totalPages = Math.ceil(filteredAdverbs.length / ADVERBS_PER_PAGE);
  const currentAdverbs = filteredAdverbs.slice(
    (currentPage - 1) * ADVERBS_PER_PAGE,
    currentPage * ADVERBS_PER_PAGE
  );

  const toggleExample = (adverb: string) => {
    setShowExamples(prev => ({
      ...prev,
      [adverb]: !prev[adverb]
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Swedish Adverbs</h1>
          <p className="text-gray-600">Learn and practice Swedish adverbs with examples and pronunciation</p>
          <p className="text-sm text-gray-500 mt-2">
            Showing {currentAdverbs.length} of {filteredAdverbs.length} adverbs
          </p>
        </header>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search adverbs..."
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
                  setSelectedCategory(e.target.value as AdverbCategory | 'all');
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
          {currentAdverbs.map((adv) => (
            <div key={adv.adverb} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{adv.adverb}</h3>
                    <button
                      onClick={() => playSound(adv.adverb)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-gray-600 italic mb-3">{adv.translation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      adv.difficulty === 'beginner' ? 'green' :
                      adv.difficulty === 'intermediate' ? 'yellow' :
                      'red'
                    }
                    size="sm"
                  >
                    {adv.difficulty}
                  </Badge>
                  <Badge variant="blue" size="sm" className="capitalize">
                    {adv.category}
                  </Badge>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => toggleExample(adv.adverb)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {showExamples[adv.adverb] ? 'Hide Details' : 'Show Details'}
                </button>

                {showExamples[adv.adverb] && (
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Example Usage</h4>
                        <div className="space-y-2">
                          <p className="text-blue-800">{adv.example}</p>
                          <p className="text-gray-600 italic">{adv.exampleTranslation}</p>
                        </div>
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
