import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, ArrowLeft, Bookmark, Award, Share2, MessageCircle } from 'lucide-react';
import { stories } from '../data/stories';
import { useNavigate, useParams } from 'react-router-dom';

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

const StoryView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const story = stories.find(s => s.id === decodeURIComponent(id || ''));
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update progress based on scroll position
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const newProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setProgress(Math.min(newProgress, 100));
      }
    };

    containerRef.current?.addEventListener('scroll', handleScroll);
    return () => containerRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  if (!story) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Story not found</h2>
          <button
            onClick={() => navigate('/stories')}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Stories
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    setShowShare(true);
    // Add share functionality
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setShowShare(false), 2000);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Add bookmark functionality
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentAudioTime(audioRef.current.currentTime);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/stories')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Stories
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={togglePlayPause}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Volume2 className="w-5 h-5" />
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`flex items-center gap-2 ${
                  showNotes ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Notes
              </button>

              <button
                onClick={toggleBookmark}
                className={`flex items-center gap-2 ${
                  isBookmarked ? 'text-yellow-500' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-500' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Story content */}
          <div
            ref={containerRef}
            className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-h-[calc(100vh-12rem)] overflow-y-auto"
          >
            <h1 className="text-3xl font-bold mb-2">{story.title}</h1>
            <h2 className="text-xl text-gray-600 mb-6">{story.englishTitle}</h2>

            <div className="prose prose-lg">
              <div className="space-y-4">
                {story.content.reduce<React.ReactNode[]>((acc, word, index) => {
                  if (word.text === '.' || word.text === '!' || word.text === '?') {
                    acc.push(
                      <WordTooltip key={index} word={word} />,
                      <br key={`br-${index}`} />,
                      <br key={`br2-${index}`} />
                    );
                  } else {
                    acc.push(<WordTooltip key={index} word={word} />);
                  }
                  return acc;
                }, [])}
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-6">Exercises</h3>
              <div className="space-y-8">
                {story.exercises.map((exercise, index) => (
                  <Exercise key={index} exercise={exercise} />
                ))}
              </div>
            </div>
          </div>

          {/* Notes sidebar */}
          <AnimatePresence>
            {showNotes && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '20rem', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your notes here..."
                  className="w-full h-[calc(100vh-16rem)] p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Audio element */}
      <audio
        ref={audioRef}
        src={story.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Share notification */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryView;
