import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeUp, ArrowForward, ArrowBack } from '@mui/icons-material';

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

interface SentencePart {
  type: string;
  word: string;
  color: string;
  explanation: string;
}

interface SentenceExample {
  parts: SentencePart[];
  pronunciation: string;
  english: string;
}

interface PatternExample {
  title: string;
  description: string;
  sentences: SentenceExample[];
}

const examples: PatternExample[] = [
  {
    title: "Basic Statement",
    description: "Simple subject-verb-object sentences following the V2 rule",
    sentences: [
      {
        parts: [
          { type: "Subject", word: "jag", color: "#4CAF50", explanation: "The subject (who/what) typically comes first in basic statements" },
          { type: "Verb", word: "läser", color: "#2196F3", explanation: "The main verb comes in second position in main clauses (V2 rule)" },
          { type: "Object", word: "en bok", color: "#9C27B0", explanation: "The object (what/whom) typically comes after the verb" }
        ],
        pronunciation: "yah LAY-ser en book",
        english: "I read a book"
      },
      {
        parts: [
          { type: "Subject", word: "hon", color: "#4CAF50", explanation: "Subject pronoun" },
          { type: "Verb", word: "skriver", color: "#2196F3", explanation: "Present tense verb" },
          { type: "Object", word: "ett brev", color: "#9C27B0", explanation: "Object with indefinite article" }
        ],
        pronunciation: "hoon SKREE-ver et brayv",
        english: "She writes a letter"
      }
    ]
  },
  {
    title: "Time Expressions",
    description: "Understanding word order with time expressions",
    sentences: [
      {
        parts: [
          { type: "Time", word: "på morgonen", color: "#FF9800", explanation: "Time expressions can come first" },
          { type: "Verb", word: "dricker", color: "#2196F3", explanation: "Verb still comes second (V2 rule)" },
          { type: "Subject", word: "jag", color: "#4CAF50", explanation: "Subject moves after verb when time expression is first" },
          { type: "Object", word: "kaffe", color: "#9C27B0", explanation: "Object follows the subject" }
        ],
        pronunciation: "paw mor-GO-nen DRICK-er yah KAF-fe",
        english: "In the morning, I drink coffee"
      },
      {
        parts: [
          { type: "Subject", word: "vi", color: "#4CAF50", explanation: "Subject first" },
          { type: "Verb", word: "åker", color: "#2196F3", explanation: "Verb second" },
          { type: "Object", word: "till stranden", color: "#9C27B0", explanation: "Destination" },
          { type: "Time", word: "varje sommar", color: "#FF9800", explanation: "Time expression at the end" }
        ],
        pronunciation: "vee OH-ker till STRAN-den VAR-ye SOM-mar",
        english: "We go to the beach every summer"
      }
    ]
  },
  {
    title: "Questions",
    description: "Question formation in Swedish",
    sentences: [
      {
        parts: [
          { type: "Question", word: "var", color: "#FF5722", explanation: "Question word comes first" },
          { type: "Verb", word: "bor", color: "#2196F3", explanation: "Verb must be second" },
          { type: "Subject", word: "du", color: "#4CAF50", explanation: "Subject comes after verb in questions" },
          { type: "Location", word: "nu", color: "#FF9800", explanation: "Time/location information" }
        ],
        pronunciation: "var BOOR du nu",
        english: "Where do you live now?"
      },
      {
        parts: [
          { type: "Verb", word: "pratar", color: "#2196F3", explanation: "Verb first in yes/no questions" },
          { type: "Subject", word: "du", color: "#4CAF50", explanation: "Subject follows verb" },
          { type: "Object", word: "svenska", color: "#9C27B0", explanation: "Object comes after subject" }
        ],
        pronunciation: "PRAH-tar du SVEN-ska",
        english: "Do you speak Swedish?"
      }
    ]
  },
  {
    title: "Adjective Agreement",
    description: "How adjectives change based on the noun they modify",
    sentences: [
      {
        parts: [
          { type: "Article", word: "en", color: "#FF5722", explanation: "Indefinite article for en-words" },
          { type: "Adjective", word: "röd", color: "#673AB7", explanation: "Basic form for singular en-words" },
          { type: "Noun", word: "bil", color: "#4CAF50", explanation: "En-word noun" }
        ],
        pronunciation: "en rööd beel",
        english: "A red car"
      },
      {
        parts: [
          { type: "Article", word: "ett", color: "#FF5722", explanation: "Indefinite article for ett-words" },
          { type: "Adjective", word: "rött", color: "#673AB7", explanation: "Adds -t for ett-words" },
          { type: "Noun", word: "hus", color: "#4CAF50", explanation: "Ett-word noun" }
        ],
        pronunciation: "et röt hoos",
        english: "A red house"
      },
      {
        parts: [
          { type: "Article", word: "den", color: "#FF5722", explanation: "Definite article for en-words" },
          { type: "Adjective", word: "röda", color: "#673AB7", explanation: "Adds -a in definite form" },
          { type: "Noun", word: "bilen", color: "#4CAF50", explanation: "Definite form of en-word" }
        ],
        pronunciation: "den RÖ-da BEE-len",
        english: "The red car"
      }
    ]
  }
];

const GrammarVisualizerPage: React.FC = () => {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [voiceReady, setVoiceReady] = useState(false);

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

  const currentExample = examples[currentExampleIndex];
  const currentSentence = currentExample.sentences[currentSentenceIndex];

  const handleNext = () => {
    if (currentSentenceIndex < currentExample.sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    } else if (currentExampleIndex < examples.length - 1) {
      setCurrentExampleIndex(currentExampleIndex + 1);
      setCurrentSentenceIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    } else if (currentExampleIndex > 0) {
      setCurrentExampleIndex(currentExampleIndex - 1);
      setCurrentSentenceIndex(examples[currentExampleIndex - 1].sentences.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Swedish Grammar Visualizer
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Interactive visualization of Swedish sentence structures
          </p>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/10">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{currentExample.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">{currentExample.description}</p>
                </div>
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  Pattern {currentExampleIndex + 1}/{examples.length}
                </span>
              </div>

              <div className="mt-8">
                <div className="rounded-xl bg-gray-50 p-6">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <AnimatePresence mode="wait">
                      {currentSentence.parts.map((part, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="group relative"
                        >
                          <div
                            className="flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-all duration-200 hover:scale-105"
                            style={{ backgroundColor: part.color }}
                          >
                            <span className="text-lg font-medium">{part.word}</span>
                            <button
                              onClick={() => handleSpeak(part.word)}
                              className="rounded-full p-1 transition-colors hover:bg-white/20"
                            >
                              <VolumeUp className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="absolute left-1/2 top-full z-10 mt-2 hidden -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white group-hover:block">
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
                            {part.explanation}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm font-medium text-gray-500">
                      Pronunciation: <span className="text-gray-900">{currentSentence.pronunciation}</span>
                    </p>
                    <p className="mt-2 text-lg text-gray-900">{currentSentence.english}</p>
                    <button
                      onClick={() => handleSpeak(currentSentence.pronunciation)}
                      className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <VolumeUp className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentExampleIndex === 0 && currentSentenceIndex === 0}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  <ArrowBack className="mr-2 h-4 w-4" />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={
                    currentExampleIndex === examples.length - 1 &&
                    currentSentenceIndex === currentExample.sentences.length - 1
                  }
                  className="inline-flex items-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Next
                  <ArrowForward className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarVisualizerPage;
