import React from 'react';
import { Volume2 } from 'lucide-react';
import type { VerbData } from '../../../types';
import { getContextualExample } from '../../../utils/getContextualExample';

interface ExampleSentencesProps {
  verb: VerbData;
  playAudio: (text: string) => void;
}

export function ExampleSentences({ verb, playAudio }: ExampleSentencesProps) {
  
  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 p-4">
      {(['present', 'past', 'supine'] as const).map((tense) => {
        const example = getContextualExample(verb, tense);
        return (
          <div key={tense} className="flex flex-col space-y-2">
            <div className="text-sm font-medium text-blue-700 capitalize">
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
  );
}