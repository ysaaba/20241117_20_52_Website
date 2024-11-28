import React, { useState } from 'react';
import { VerbRow } from './VerbRow';
import { useSound } from '../../../hooks/useSound';
import { VerbTableTabs } from '../VerbTableTabs';
import type { VerbData } from '../../../types';
import { verbs } from '../../../data/verbs';

interface VerbTableProps {
  onReset: () => void;
}

export function VerbTable({ onReset }: VerbTableProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedVerbs, setExpandedVerbs] = useState<Set<string>>(new Set());
  const { playAudio } = useSound();
  const inputRefs = useState<Record<string, HTMLInputElement>>({});
  const [isValidating, setIsValidating] = useState(false);
  const verbsPerPage = 10;

  const handleReset = () => {
    setAnswers({});
    setFeedback({});
    setSelectedGroup('all');
    setSearchQuery('');
    setSelectedDifficulty('all');
    setSelectedCategory('all');
    setCurrentPage(1);
    setExpandedVerbs(new Set());
    onReset();
  };

  const verbCounts = verbs.reduce((acc, verb) => {
    acc[verb.group] = (acc[verb.group] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const categories = Array.from(new Set(verbs.map(verb => verb.category)));

  const filteredVerbs = verbs.filter(verb => {
    const matchesGroup = selectedGroup === 'all' || verb.group === selectedGroup;
    const matchesDifficulty = selectedDifficulty === 'all' || verb.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || verb.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      verb.verb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verb.translation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesDifficulty && matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredVerbs.length / verbsPerPage);
  const startIndex = (currentPage - 1) * verbsPerPage;
  const displayedVerbs = filteredVerbs.slice(startIndex, startIndex + verbsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedVerbs(new Set());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (verb: string, tense: 'present' | 'past' | 'supine', value: string) => {
    const key = `${verb}-${tense}`;
    setAnswers(prev => ({ ...prev, [key]: value }));
    setFeedback(prev => ({ ...prev, [key]: undefined }));
  };

  const validateAnswer = (verb: string, tense: 'present' | 'past' | 'supine', value: string) => {
    if (!isValidating) {
      setIsValidating(true);
      const key = `${verb}-${tense}`;
      const verbData = verbs.find(v => v.verb === verb);
      const isCorrect = value.trim().toLowerCase() === verbData?.[tense].toLowerCase();
      setFeedback(prev => ({ ...prev, [key]: isCorrect }));
      setTimeout(() => setIsValidating(false), 500);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    verb: string,
    currentTense: 'present' | 'past' | 'supine'
  ) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      const tenses = ['present', 'past', 'supine'];
      const currentIndex = tenses.indexOf(currentTense);
      const nextTense = tenses[currentIndex + 1];
      const nextVerb = displayedVerbs[displayedVerbs.findIndex(v => v.verb === verb) + 1];
      
      const currentValue = (event.target as HTMLInputElement).value;
      validateAnswer(verb, currentTense, currentValue);

      if (nextTense) {
        const nextKey = `${verb}-${nextTense}`;
        inputRefs.current[nextKey]?.focus();
      } else if (nextVerb) {
        const nextKey = `${nextVerb.verb}-present`;
        inputRefs.current[nextKey]?.focus();
      }
    }
  };

  const handleBlur = (verb: string, tense: 'present' | 'past' | 'supine', value: string) => {
    if (value.trim()) {
      validateAnswer(verb, tense, value);
    }
  };

  const getInputClassName = (key: string) => {
    const baseClasses = "w-32 p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-400";
    if (!answers[key]) return baseClasses;
    return `${baseClasses} ${
      feedback[key] 
        ? "bg-green-50 border-green-300" 
        : feedback[key] === false
        ? "bg-red-50 border-red-300"
        : ""
    }`;
  };

  const handleToggleExpand = (verb: VerbData) => {
    setExpandedVerbs(prev => {
      const next = new Set(prev);
      if (next.has(verb.verb)) {
        next.delete(verb.verb);
      } else {
        next.add(verb.verb);
      }
      return next;
    });
  };

  const exampleVerb = verbs.find(v => v.translation === 'run') || verbs[0];  // Default to first verb if 'run' not found
  const examples = {
    movement: {
      present: { swedish: `Hon ${exampleVerb.present} i parken varje morgon.`, english: `She ${exampleVerb.translation}s in the park every morning.` },
      past: { swedish: `Hon ${exampleVerb.past} i parken igår kväll.`, english: `She ${exampleVerb.translation === 'run' ? 'ran' : exampleVerb.translation + 'ed'} in the park last night.` },
      supine: { swedish: `Hon har ${exampleVerb.supine} i parken i två timmar.`, english: `She has ${exampleVerb.translation === 'run' ? 'run' : exampleVerb.translation + 'ed'} in the park for two hours.` }
    },
    communication: {
      present: { swedish: `Han ${exampleVerb.present} med sin vän på svenska.`, english: `He ${exampleVerb.translation}s with his friend in Swedish.` },
      past: { swedish: `De ${exampleVerb.past} i telefon igår.`, english: `They ${exampleVerb.translation === 'speak' ? 'spoke' : exampleVerb.translation + 'ed'} on the phone yesterday.` },
      supine: { swedish: `Vi har ${exampleVerb.supine} om vädret.`, english: `We have ${exampleVerb.translation === 'speak' ? 'spoken' : exampleVerb.translation + 'ed'} about the weather.` }
    },
    cognition: {
      present: { swedish: `Jag ${exampleVerb.present} på mitt arbete.`, english: `I ${exampleVerb.translation} about my work.` },
      past: { swedish: `Hon ${exampleVerb.past} på svaret länge.`, english: `She ${exampleVerb.translation === 'think' ? 'thought' : exampleVerb.translation + 'ed'} about the answer for a long time.` },
      supine: { swedish: `De har ${exampleVerb.supine} på saken hela dagen.`, english: `They have ${exampleVerb.translation === 'think' ? 'thought' : exampleVerb.translation + 'ed'} about the matter all day.` }
    },
    emotion: {
      present: { swedish: `Barnet ${exampleVerb.present} när det får glass.`, english: `The child ${exampleVerb.translation}s when they get ice cream.` },
      past: { swedish: `Han ${exampleVerb.past} när han fick bra nyheter.`, english: `He ${exampleVerb.translation === 'smile' ? 'smiled' : exampleVerb.translation + 'ed'} when he got good news.` },
      supine: { swedish: `Hon har ${exampleVerb.supine} mycket idag.`, english: `She has ${exampleVerb.translation === 'smile' ? 'smiled' : exampleVerb.translation + 'ed'} a lot today.` }
    }
  };

  const defaultExample = {
    present: { swedish: `Vi ${exampleVerb.present} varje dag.`, english: `We ${exampleVerb.translation} every day.` },
    past: { swedish: `De ${exampleVerb.past} igår.`, english: `They ${exampleVerb.translation === 'run' ? 'ran' : exampleVerb.translation + 'ed'} yesterday.` },
    supine: { swedish: `Jag har ${exampleVerb.supine} hela veckan.`, english: `I have ${exampleVerb.translation === 'run' ? 'run' : exampleVerb.translation + 'ed'} all week.` }
  };

  const getContextualExample = (verb: VerbData, tense: 'present' | 'past' | 'supine') => {
    const example = examples[verb.category as keyof typeof examples]?.[tense] || defaultExample[tense];
    return example;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Verb Conjugation Table</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search verbs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <VerbTableTabs
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroup}
        verbCounts={verbCounts}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Group</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Level</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Infinitive</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Translation</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Present</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Past</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Supine</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Listen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedVerbs.map((verb, index) => (
              <React.Fragment key={`${verb.verb}-${verb.category}-${index}`}>
                <tr className={`${expandedVerbs.has(verb.verb) ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors`}>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                    <span className="inline-flex items-center">
                      Group {verb.group}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 capitalize">{verb.category}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      verb.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      verb.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {verb.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleExpand(verb)}
                      className="group inline-flex items-center gap-2 font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {verb.verb}
                      <span className="text-gray-400 group-hover:text-blue-600">
                        {expandedVerbs.has(verb.verb) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 italic">{verb.translation}</td>
                  {['present', 'past', 'supine'].map((tense) => (
                    <td key={`${verb.verb}-${tense}`} className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          ref={el => {
                            if (el) inputRefs.current[`${verb.verb}-${tense}`] = el;
                          }}
                          type="text"
                          value={answers[`${verb.verb}-${tense}`] || ''}
                          onChange={(e) => handleInputChange(verb.verb, tense as any, e.target.value)}
                          onBlur={(e) => handleBlur(verb.verb, tense as any, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, verb.verb, tense as any)}
                          className={getInputClassName(`${verb.verb}-${tense}`)}
                          placeholder={`Enter ${tense}`}
                        />
                        {answers[`${verb.verb}-${tense}`] && feedback[`${verb.verb}-${tense}`] !== undefined && (
                          feedback[`${verb.verb}-${tense}`] 
                            ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                            : <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      {answers[`${verb.verb}-${tense}`] && feedback[`${verb.verb}-${tense}`] === false && (
                        <p className="mt-1 text-xs text-red-600">
                          Correct: {verb[tense as keyof VerbData]}
                        </p>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => playAudio(verb.verb)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                {expandedVerbs.has(verb.verb) && (
                  <tr className="bg-blue-50">
                    <td colSpan={9} className="px-8 py-4">
                      <div className="space-y-4">
                        {(['present', 'past', 'supine'] as const).map((tense) => {
                          const example = getContextualExample(verb, tense);
                          return (
                            <div key={tense} className="flex items-start gap-4">
                              <div className="w-20 text-sm font-medium text-blue-700 capitalize">
                                {tense}:
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm text-blue-800 font-medium">
                                    {example.swedish}
                                  </p>
                                  <button
                                    onClick={() => playAudio(example.swedish)}
                                    className="p-1 text-blue-400 hover:text-blue-600 transition-colors"
                                    title="Listen to pronunciation"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-blue-600">
                                  {example.english}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${
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
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}