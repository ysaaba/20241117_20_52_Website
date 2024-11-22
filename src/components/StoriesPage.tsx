import React, { useState, useRef } from 'react';
import { stories, Story } from '../data/stories';

const StoriesPage: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showTranslation, setShowTranslation] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleWordHover = (translation: string) => {
    setShowTranslation(translation);
  };

  const handleWordLeave = () => {
    setShowTranslation(null);
  };

  const handleAnswerSelect = (exerciseIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [exerciseIndex]: answer
    }));
  };

  const playAudio = () => {
    if (audioRef.current && selectedStory) {
      audioRef.current.play();
    }
  };

  const filteredStories = stories.filter(story => {
    const matchesDifficulty = selectedDifficulty === 'all' || story.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
    return matchesDifficulty && matchesCategory;
  });

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
        return 'bg-blue-100 text-blue-800';
      case 'culture':
        return 'bg-purple-100 text-purple-800';
      case 'nature':
        return 'bg-emerald-100 text-emerald-800';
      case 'travel':
        return 'bg-indigo-100 text-indigo-800';
      case 'food':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Svenska Berättelser</h1>
      
      {/* Filters */}
      {!selectedStory && (
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Categories</option>
              <option value="everyday">Everyday Life</option>
              <option value="culture">Culture</option>
              <option value="nature">Nature</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
            </select>
          </div>
        </div>
      )}
      
      {/* Story Selection */}
      {!selectedStory && (
        <div className="grid gap-4">
          {filteredStories.map(story => (
            <div
              key={story.id}
              className="p-6 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setSelectedStory(story)}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{story.title}</h2>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${getDifficultyColor(story.difficulty)}`}>
                    {story.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-sm ${getCategoryColor(story.category)}`}>
                    {story.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">{story.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Selected Story View */}
      {selectedStory && (
        <div>
          <button
            onClick={() => {
              setSelectedStory(null);
              setSelectedAnswers({});
            }}
            className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tillbaka till berättelser
          </button>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{selectedStory.title}</h2>
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded-full text-sm ${getDifficultyColor(selectedStory.difficulty)}`}>
                {selectedStory.difficulty}
              </span>
              <span className={`px-2 py-1 rounded-full text-sm ${getCategoryColor(selectedStory.category)}`}>
                {selectedStory.category}
              </span>
            </div>
          </div>

          {/* Audio Player */}
          <div className="mb-6">
            <button
              onClick={playAudio}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lyssna på berättelsen
            </button>
            <audio ref={audioRef} src={selectedStory.audioUrl} />
          </div>

          {/* Story Content */}
          <div className="mb-8 text-lg leading-relaxed p-6 bg-white rounded-lg shadow-sm">
            {selectedStory.content.map((word, index) => (
              <span
                key={index}
                className="relative inline-block mx-1 cursor-help"
                onMouseEnter={() => handleWordHover(word.translation)}
                onMouseLeave={handleWordLeave}
              >
                {word.text}
                {showTranslation === word.translation && (
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm mb-1 whitespace-nowrap">
                    {word.translation}
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* Exercises */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Övningar</h3>
            {selectedStory.exercises.map((exercise, index) => (
              <div key={index} className="mb-6 p-6 border rounded-lg bg-white">
                <p className="font-medium mb-3">{exercise.question}</p>
                <div className="grid gap-2">
                  {exercise.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name={`exercise-${index}`}
                        value={option}
                        checked={selectedAnswers[index] === option}
                        onChange={() => handleAnswerSelect(index, option)}
                        className="form-radio text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {selectedAnswers[index] && (
                  <div className="mt-3 p-3 rounded">
                    {selectedAnswers[index] === exercise.correctAnswer ? (
                      <p className="text-green-600 font-medium">✓ Rätt svar!</p>
                    ) : (
                      <p className="text-red-600 font-medium">✗ Försök igen!</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;
