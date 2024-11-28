import { useState, useEffect } from 'react';
import { Book, RefreshCw, Sparkles, Table2 } from 'lucide-react';
import { VerbExerciseCard } from './VerbExerciseCard';
import { VerbTable } from './VerbTable';
import { useVerbExercises } from '../hooks/useVerbExercises';
import { VolumeUp } from '@mui/icons-material';

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

type ViewMode = 'cards' | 'table';

export default function VerbExercises() {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [voiceReady, setVoiceReady] = useState(false);

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

  useEffect(() => {
    // Load ResponsiveVoice script
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=u9E3wZGX';
    script.async = true;
    script.onload = () => setVoiceReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
    };
  }, []);

  const handleSpeak = (text: string) => {
    if (voiceReady && window.responsiveVoice) {
      window.responsiveVoice.speak(text, 'Swedish Male', {
        pitch: 1,
        rate: 0.9,
        volume: 1
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-full mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Swedish Verb Conjugation
          </h1>
          <p className="text-gray-600 mb-4">
            Practice conjugating verbs in different tenses
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
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
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
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
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium">{verb.sentence}</span>
                      <button
                        onClick={() => handleSpeak(verb.sentence)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Listen to sentence"
                      >
                        <VolumeUp className="h-5 w-5 text-blue-500" />
                      </button>
                    </div>
                  </div>
                </VerbExerciseCard>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
              <button
                onClick={toggleTranslations}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Book className="w-5 h-5" />
                {showTranslations ? 'Hide' : 'Show'} Translations
              </button>

              <div className="flex w-full sm:w-auto gap-4">
                <button
                  onClick={resetExercise}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!isComplete}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="w-full overflow-x-auto">
              <VerbTable onReset={resetExercise} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}