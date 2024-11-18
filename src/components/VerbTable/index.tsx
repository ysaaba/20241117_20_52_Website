import React, { useState, useRef } from 'react';
import { useSound } from '../../hooks/useSound';
import { VerbTableTabs } from '../VerbTableTabs';
import { TableHeader } from './TableHeader';
import { TableFilters } from './TableFilters';
import { VerbRow } from './VerbRow';
import { TablePagination } from './TablePagination';
import { verbs } from '../../data/verbs';
import type { VerbData } from '../../types';

interface VerbTableProps {
  onReset: () => void;
}

export function VerbTable({ onReset }: VerbTableProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean | undefined>>({});
  const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedVerbs, setExpandedVerbs] = useState<Set<string>>(new Set());
  const { playAudio } = useSound();
  const inputRefs = useRef<Record<string, HTMLInputElement>>({});
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
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLower || 
      verb.verb.toLowerCase().includes(searchLower) ||
      verb.translation.toLowerCase().includes(searchLower);
    return matchesGroup && matchesDifficulty && matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredVerbs.length / verbsPerPage);
  const startIndex = (currentPage - 1) * verbsPerPage;
  const displayedVerbs = filteredVerbs.slice(startIndex, startIndex + verbsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedVerbs(new Set());
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

  return (
    <div className="w-full min-w-[1024px]">
      <div className="p-4 lg:p-6">
        <div className="flex flex-col gap-4 mb-6">
          <TableHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onReset={handleReset}
          />
          <TableFilters
            selectedDifficulty={selectedDifficulty}
            selectedCategory={selectedCategory}
            categories={categories}
            onDifficultyChange={setSelectedDifficulty}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <VerbTableTabs
          selectedGroup={selectedGroup}
          onSelectGroup={setSelectedGroup}
          verbCounts={verbCounts}
        />

        <div className="mt-4">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6">Group</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Level</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Infinitive</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Translation</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Present</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Past</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Supine</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Listen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedVerbs.map((verb, index) => (
                <VerbRow
                  key={`${verb.verb}-${verb.category}-${index}`}
                  verb={verb}
                  index={index}
                  isExpanded={expandedVerbs.has(verb.verb)}
                  onToggleExpand={() => handleToggleExpand(verb)}
                  answers={answers}
                  feedback={feedback}
                  inputRefs={inputRefs}
                  onInputChange={handleInputChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  onPlayAudio={playAudio}
                  getInputClassName={getInputClassName}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredVerbs.length > 0 && (
        <div className="px-4 lg:px-6 pb-6">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}