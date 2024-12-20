import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, ArrowLeft, MessageCircle, Copy, Check } from 'lucide-react';
import { stories } from '../../data/stories';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { getDifficultyVariant, getCategoryVariant } from '@/utils/badges';

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
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Reset audio state when story changes
    setIsPlaying(false);
    setAudioError(null);

    // Initialize audio source when component mounts or story changes
    if (audioRef.current && story?.audioUrl) {
      // Get the base URL from Vite's env
      const base = import.meta.env.BASE_URL || '/';
      
      // Remove leading slash from audioUrl if it exists
      const audioPath = story.audioUrl.startsWith('/') ? story.audioUrl.slice(1) : story.audioUrl;
      
      // Combine base URL with audio path
      const absoluteUrl = `${window.location.origin}${base}${audioPath}`;
      
      console.log('Loading audio from:', absoluteUrl); // Debug log
      audioRef.current.src = absoluteUrl;
      audioRef.current.load();
    }
  }, [story?.id]);

  const handleSpeak = (text: string) => {
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(text, 'Swedish Male', {
        pitch: 1,
        rate: 0.9,
        volume: 1
      });
    }
  };

  // Audio handling
  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setAudioError(null);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      setAudioError('Failed to play audio. Please check if audio file exists.');
      setIsPlaying(false);
    }
  };

  const handleCopyText = () => {
    if (story) {
      const storyText = story.content.map(word => word.text).join(' ');
      navigator.clipboard.writeText(storyText).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/stories')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Stories
            </button>
            <div className="flex items-center gap-4">
              {story.audioUrl && (
                <button
                  onClick={togglePlayPause}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isPlaying ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                  disabled={!!audioError}
                  title={audioError || undefined}
                >
                  <Volume2 className="w-5 h-5" />
                  {isPlaying ? 'Pause' : 'Play Audio'}
                  {audioError && (
                    <span className="text-red-500 text-sm ml-2">
                      {audioError}
                    </span>
                  )}
                </button>
              )}
              <button
                onClick={handleCopyText}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                title="Copy story text"
              >
                {isCopied ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  showNotes ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Notes
              </button>
              <button
                onClick={() => handleSpeak(story.content.map(word => word.text).join(' '))}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Listen to story"
              >
                <Volume2 className="w-5 h-5 text-blue-500" />
              </button>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{story.title}</h1>
              <h2 className="text-xl text-gray-600 mb-4">{story.englishTitle}</h2>
              <div className="flex items-center gap-3">
                <Badge variant={getDifficultyVariant(story.difficulty)}>
                  {story.difficulty.charAt(0).toUpperCase() + story.difficulty.slice(1)}
                </Badge>
                <Badge variant={getCategoryVariant(story.category)}>
                  {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Story content */}
          <div className="flex-1">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
                {story.content.reduce<React.ReactNode[]>((acc, word, index) => {
                  const endsWithPunctuation = /[.!?]$/.test(word.text);
                  acc.push(<WordTooltip key={index} word={word} />);
                  if (endsWithPunctuation) {
                    acc.push(<br key={`br-${index}`} />, <br key={`br2-${index}`} />);
                  }
                  return acc;
                }, [])}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-bold mb-8">Practice Exercises</h3>
                <div className="space-y-8">
                  {story.exercises.map((exercise, index) => (
                    <Exercise key={index} exercise={exercise} />
                  ))}
                </div>
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
                className="sticky top-6"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold mb-4">Notes</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write your notes here..."
                    className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={10}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Audio element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.error('Audio failed to load:', e);
          setIsPlaying(false);
          setAudioError('Failed to load audio file. Please check your internet connection.');
        }}
        preload="auto"
      />
    </div>
  );
};

export default StoryView;
