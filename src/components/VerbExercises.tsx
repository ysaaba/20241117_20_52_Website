import { useState } from 'react';
import { Book, RefreshCw, Sparkles, Table2 } from 'lucide-react';
import { VerbExerciseCard } from './VerbExerciseCard';
import { VerbTable } from './VerbTable';
import { useVerbExercises } from '../hooks/useVerbExercises';

type ViewMode = 'cards' | 'table';

export function VerbExercises() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const {
    currentVerbs,
    answers,
    feedback,
    showTranslations,
    handleAnswerChange,
    handleSubmit,
    resetExercise,
    toggleTranslations
  } = useVerbExercises();

  const isComplete = currentVerbs.every((_, index) => answers[`${currentVerbs[index].verb}-${index}`]);

  return (
    <div className="py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Swedish Verb Conjugation
        </h1>
        <p className="text-gray-600 mb-4">
          Practice conjugating verbs in different tenses
        </p>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              viewMode === 'cards'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Exercise Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Table2 className="w-5 h-5" />
            Conjugation Table
          </button>
        </div>
      </header>

      {viewMode === 'cards' ? (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-4">
            {currentVerbs.map((verb, index) => (
              <VerbExerciseCard
                key={`${verb.verb}-${index}`}
                verb={verb}
                userAnswer={answers[`${verb.verb}-${index}`] || ''}
                feedback={feedback[`${verb.verb}-${index}`] || { isCorrect: null, mistakes: [] }}
                onChange={(value) => handleAnswerChange(index, value)}
                showTranslation={showTranslations}
                tenseType={verb.tenseType}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-between items-center mt-8">
            <button
              onClick={toggleTranslations}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Book className="w-5 h-5" />
              {showTranslations ? 'Hide' : 'Show'} Translations
            </button>

            <div className="flex gap-4">
              <button
                onClick={resetExercise}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Reset
              </button>

              <button
                onClick={handleSubmit}
                disabled={!isComplete}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                  isComplete
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                Check Answers
              </button>
            </div>
          </div>
        </div>
      ) : (
        <VerbTable onReset={resetExercise} />
      )}
    </div>
  );
}