import React, { useState } from 'react';
import { stories } from '../data/stories';
import { motion } from 'framer-motion';
import { BookOpen, Clock, BarChart2, Volume2, Star, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WordTooltipProps {
  word: {
    text: string;
    translation: string | null;
  };
}

const WordTooltip: React.FC<WordTooltipProps> = ({ word }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!word.translation) return <span className="mx-0.5">{word.text}</span>;

  return (
    <motion.span
      className="relative inline-block mx-0.5 cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`${isHovered ? 'text-blue-500 underline decoration-dotted' : ''} transition-colors duration-200`}>
        {word.text}
      </span>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-lg text-sm text-gray-700 whitespace-nowrap z-50"
        >
          <div className="relative">
            {word.translation}
            <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-gray-200 rotate-45"></div>
          </div>
        </motion.div>
      )}
    </motion.span>
  );
};

interface ExerciseProps {
  exercise: {
    question: string;
    englishQuestion: string;
    options: string[];
    correctAnswer: string;
  };
}

const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showTranslations, setShowTranslations] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowTranslations(true);
  };

  const isCorrect = selectedAnswer === exercise.correctAnswer;

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h4 className="text-lg font-medium mb-2">{exercise.question}</h4>
      <p className="text-gray-600 text-sm mb-4">{exercise.englishQuestion}</p>
      <div className="space-y-2">
        {exercise.options.map((option, index) => {
          const [swedishText, englishTranslation] = showTranslations 
            ? option.split(' (')
            : [option.split(' (')[0], ''];

          return (
            <button
              key={index}
              onClick={() => !selectedAnswer && handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                selectedAnswer === null
                  ? 'hover:bg-blue-50 bg-gray-50'
                  : selectedAnswer === option
                    ? isCorrect
                      ? 'bg-green-100 border-green-200'
                      : 'bg-red-100 border-red-200'
                    : option === exercise.correctAnswer
                      ? 'bg-green-100 border-green-200'
                      : 'bg-gray-50 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{swedishText}</span>
                {selectedAnswer === option && (
                  <span>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                )}
              </div>
              {showTranslations && englishTranslation && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="block text-sm text-gray-500 mt-1"
                >
                  {englishTranslation.replace(')', '')}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const StoryCard: React.FC<{ story: typeof stories[0] }> = ({ story }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

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
    const uniqueWords = new Set(story.content.map(w => w.text.toLowerCase())).size;
    const totalWords = story.content.length;
    const score = Math.round((uniqueWords / totalWords) * 100);
    return Math.min(score, 100);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add audio preview logic here
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => navigate(`/stories/${story.id}`)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(story.difficulty)}`}>
              {story.difficulty.charAt(0).toUpperCase() + story.difficulty.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(story.category)}`}>
              {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
            </span>
          </div>
          <button
            onClick={handleBookmark}
            className="text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-2">
          {story.title}
          <span className="text-gray-500 text-base ml-2">({story.englishTitle})</span>
        </h3>
        <p className="text-gray-600 mb-4">{story.description}</p>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{getReadingTime()} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart2 className="w-4 h-4" />
            <span>{getComplexityScore()}% unique words</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{story.exercises.length} exercises</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/stories/${story.id}`);
            }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <BookOpen className="w-5 h-5" />
            Read Story
          </button>
          
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-600 transition-colors duration-200"
          >
            <Volume2 className="w-5 h-5" />
            Preview Audio
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const StoriesPage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredStories = stories.filter(story => {
    if (selectedDifficulty && story.difficulty !== selectedDifficulty) return false;
    if (selectedCategory && story.category !== selectedCategory) return false;
    return true;
  });

  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const categories = ['everyday', 'culture', 'nature', 'travel', 'food'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Swedish Stories</h1>
      
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3">Filter by Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {filteredStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
