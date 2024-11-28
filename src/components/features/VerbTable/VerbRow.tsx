import React from 'react';
import { Volume2, ChevronDown, ChevronUp, XCircle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { VerbData } from '../../../types';
import { cn } from '../../../lib/utils';
import { useSound } from '../../../hooks/useSound';
import { ExampleSentences } from './ExampleSentences';

interface VerbRowProps {
  verb: VerbData;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  answers: Record<string, string>;
  feedback: Record<string, boolean>;
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement>>;
  onInputChange: (verb: string, tense: 'present' | 'past' | 'supine', value: string) => void;
  onBlur: (verb: string, tense: 'present' | 'past' | 'supine', value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, verb: string, tense: 'present' | 'past' | 'supine') => void;
  getInputClassName: (key: string) => string;
}

export function VerbRow({
  verb,
  index,
  isExpanded,
  onToggleExpand,
  answers,
  feedback,
  inputRefs,
  onInputChange,
  onBlur,
  onKeyDown,
  getInputClassName
}: VerbRowProps) {
  const { playAudio } = useSound();
  
  const baseInputClass = `
    block w-full min-w-[120px] px-2 py-1.5 text-sm
    border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400
    disabled:bg-gray-50 disabled:text-gray-500
    sm:text-sm
  `;

  return (
    <>
      <tr className={`${isExpanded ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors`}>
        <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
          <span className="inline-flex items-center">
            Group {verb.group}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-gray-500 capitalize">{verb.category}</td>
        <td className="px-4 py-3 text-sm">
          <span>
            <Badge 
              variant={
                verb.difficulty === 'beginner' ? 'green' :
                verb.difficulty === 'intermediate' ? 'yellow' :
                'red'
              }
              size="sm"
            >
              {verb.difficulty}
            </Badge>
          </span>
        </td>
        <td className="px-4 py-3">
          <button
            onClick={onToggleExpand}
            className="group inline-flex items-center gap-2 font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            {verb.verb}
            <span className="text-gray-400 group-hover:text-blue-600">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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
                onChange={(e) => onInputChange(verb.verb, tense as any, e.target.value)}
                onBlur={(e) => onBlur(verb.verb, tense as any, e.target.value)}
                onKeyDown={(e) => onKeyDown(e, verb.verb, tense as any)}
                className={`${baseInputClass} ${getInputClassName(`${verb.verb}-${tense}`)}`}
                placeholder={`Enter ${tense}`}
              />
              {answers[`${verb.verb}-${tense}`] && feedback[`${verb.verb}-${tense}`] !== undefined && (
                feedback[`${verb.verb}-${tense}`] 
                  ? <CheckCircle className="w-5 h-5 text-green-500" />
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
      {isExpanded && (
        <tr className="bg-blue-50">
          <td colSpan={9} className="px-8 py-4">
            <ExampleSentences verb={verb} playAudio={playAudio} />
          </td>
        </tr>
      )}
    </>
  );
}