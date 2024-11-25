import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeUp, ArrowForward, ArrowBack } from '@mui/icons-material';

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
    description: "Simple subject-verb-object sentences",
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
    title: "Complex Time Expressions",
    description: "Multiple time expressions in one sentence",
    sentences: [
      {
        parts: [
          { type: "Time (General)", word: "på sommaren", color: "#FF9800", explanation: "General time expression comes first" },
          { type: "Verb", word: "simmar", color: "#2196F3", explanation: "Verb maintains second position" },
          { type: "Subject", word: "jag", color: "#4CAF50", explanation: "Subject moves after verb due to time expression" },
          { type: "Time (Specific)", word: "varje morgon", color: "#FF9800", explanation: "Specific time expression typically comes later" }
        ],
        pronunciation: "paw SOM-mar-en SIM-mar yah VAR-ye MOR-gon",
        english: "In the summer, I swim every morning"
      }
    ]
  },
  {
    title: "Nested Clauses",
    description: "Complex sentences with multiple clauses",
    sentences: [
      {
        parts: [
          { type: "Subject", word: "jag", color: "#4CAF50", explanation: "Main clause subject" },
          { type: "Verb", word: "tror", color: "#2196F3", explanation: "Main clause verb" },
          { type: "Subordinator", word: "att", color: "#FF5722", explanation: "Introduces first subordinate clause" },
          { type: "Sub. Subject", word: "hon", color: "#4CAF50", explanation: "Subject of first subordinate clause" },
          { type: "Sub. Verb", word: "vet", color: "#2196F3", explanation: "Verb of first subordinate clause" },
          { type: "Subordinator", word: "när", color: "#FF5722", explanation: "Introduces second subordinate clause" },
          { type: "Sub. Subject 2", word: "vi", color: "#4CAF50", explanation: "Subject of second subordinate clause" },
          { type: "Sub. Verb 2", word: "kommer", color: "#2196F3", explanation: "Verb of second subordinate clause" }
        ],
        pronunciation: "yah TROOR at hoon VAYT nair vee KOM-er",
        english: "I think that she knows when we are coming"
      }
    ]
  },
  {
    title: "Relative Clauses",
    description: "Sentences with relative pronouns",
    sentences: [
      {
        parts: [
          { type: "Subject", word: "mannen", color: "#4CAF50", explanation: "Main clause subject" },
          { type: "Relative", word: "som", color: "#FF99FF", explanation: "Relative pronoun" },
          { type: "Verb", word: "bor", color: "#2196F3", explanation: "Verb in relative clause" },
          { type: "Location", word: "bredvid", color: "#FFCC99", explanation: "Preposition" },
          { type: "Object", word: "mig", color: "#FFCC99", explanation: "Object pronoun" },
          { type: "Main Verb", word: "är", color: "#2196F3", explanation: "Main clause verb" },
          { type: "Complement", word: "läkare", color: "#FFCC99", explanation: "Complement" }
        ],
        pronunciation: "MAN-nen som boor BRED-veed may air LAY-kar-e",
        english: "The man who lives next to me is a doctor"
      }
    ]
  }
];

const GrammarVisualizerPage: React.FC = () => {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

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

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'sv-SE';
    window.speechSynthesis.speak(utterance);
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
                              onClick={() => speak(part.word)}
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
