import React, { useState, useMemo } from 'react';
import { stories, type Story } from '../../data/stories';
import { motion } from 'framer-motion';
import { BookOpen, Clock, BarChart2, Volume2, Bookmark, Search, Filter, X, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const STORIES_PER_PAGE = 6;

const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'everyday':
        return 'bg-purple-100 text-purple-800';
      case 'culture':
        return 'bg-blue-100 text-blue-800';
      case 'nature':
        return 'bg-emerald-100 text-emerald-800';
      case 'travel':
        return 'bg-orange-100 text-orange-800';
      case 'food':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate estimated reading time based on content length
  const getReadingTime = () => {
    const wordsPerMinute = 100; // Slower for language learning
    const wordCount = story.content.length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // Calculate story complexity score
  const getComplexityScore = () => {
    // Remove punctuation when calculating unique words
    const uniqueWords = new Set(story.content.map(w => w.text.toLowerCase().replace(/[.,!?]$/, ''))).size;
    const totalWords = story.content.length;
    const complexityScore = Math.round((uniqueWords / totalWords) * 100);
    return Math.min(complexityScore, 100); // Cap at 100
  };

  const handleCopyText = (e: React.MouseEvent) => {
    e.stopPropagation();
    const storyText = story.content.map(word => word.text).join(' ');
    navigator.clipboard.writeText(storyText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer"
    >
      <div className="p-6" onClick={() => navigate(`/stories/${encodeURIComponent(story.id)}`)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="blue" size="sm">
              {story.difficulty.charAt(0).toUpperCase() + story.difficulty.slice(1)}
            </Badge>
            <Badge variant="purple" size="sm">
              {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
            </Badge>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
            }}
            className={`p-1 rounded-full transition-colors duration-200 ${
              isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-500' : ''}`} />
          </button>
        </div>

        <h3 className="text-xl font-bold mb-1">{story.title}</h3>
        <p className="text-gray-600 mb-4">{story.englishTitle}</p>
        <p className="text-gray-500 text-sm mb-6">{story.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{getReadingTime()} min</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{story.content.length} words</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart2 className="w-4 h-4" />
            <span>{getComplexityScore()}% unique</span>
          </div>
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1 hover:text-gray-700 transition-colors duration-200"
            title="Copy story text"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          {story.audioUrl && (
            <div className="flex items-center gap-1">
              <Volume2 className="w-4 h-4" />
              <span>Audio</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const StoriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = Array.from(new Set(stories.map(story => story.category)));

  const filteredStories = useMemo(() => {
    return stories
      .filter((story) => {
        const matchesSearch =
          story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'all' || story.difficulty === selectedDifficulty;
        return matchesSearch && matchesCategory && matchesDifficulty;
      });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const totalPages = Math.ceil(filteredStories.length / STORIES_PER_PAGE);
  const currentStories = filteredStories.slice(
    (currentPage - 1) * STORIES_PER_PAGE,
    currentPage * STORIES_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Swedish Stories</h1>
          <p className="text-gray-600">Practice Swedish with interactive stories and audio</p>
          <p className="text-sm text-gray-500 mt-2">
            Showing {currentStories.length} of {filteredStories.length} stories
          </p>
        </header>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search stories..."
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
                  setSelectedCategory(e.target.value);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border enabled:hover:bg-gray-50 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg border ${
                  currentPage === page
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border enabled:hover:bg-gray-50 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesPage;
