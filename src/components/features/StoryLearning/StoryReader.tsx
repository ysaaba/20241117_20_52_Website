import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, BookOpen, Check } from 'lucide-react';
import { storySections } from '../../../data/stories/skuggor-i-stockholm';
import type { StorySection, Word } from '../../../types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectItemIndicator,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const StoryReader: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const section = storySections[currentSection];
  const progress = ((currentSection + 1) / storySections.length) * 100;

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleNextSection = () => {
    if (currentSection < storySections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleChapterSelect = (value: string) => {
    setCurrentSection(parseInt(value));
  };

  const handleSpeak = (text: string) => {
    if (window.responsiveVoice) {
      window.responsiveVoice.speak(text, 'Swedish Male');
    }
  };

  const renderWord = (word: Word) => (
    <div
      key={word.swedish}
      className="relative group"
    >
      <Badge 
        variant="outline"
        className={cn(
          'cursor-help border-indigo-500 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200'
        )}
      >
        {word.swedish}
      </Badge>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10 shadow-lg">
        {word.english}
      </div>
    </div>
  );

  const renderChapterProgress = () => (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex justify-between text-sm text-gray-500">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );

  return (
    <div className="space-y-6">
      {renderChapterProgress()}
      
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={handlePrevSection}
          disabled={currentSection === 0}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px] transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <div className="flex-1 max-w-md mx-auto">
          <Select
            value={currentSection.toString()}
            onValueChange={handleChapterSelect}
          >
            <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-11">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Kapitel {currentSection + 1}: {section.title}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent 
              className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-700 shadow-md animate-in fade-in-80"
              position="popper"
              sideOffset={4}
            >
              <div className="p-1 h-full w-full">
                {storySections.map((section, index) => (
                  <SelectItem 
                    key={index} 
                    value={index.toString()}
                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <SelectItemIndicator>
                        <Check className="h-4 w-4" />
                      </SelectItemIndicator>
                    </span>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span>Kapitel {index + 1}: {section.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={handleNextSection}
          disabled={currentSection === storySections.length - 1}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px] justify-center transition-colors duration-200"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6 transition-all duration-300">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
          <Badge 
            variant="default"
            size="md"
            className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
          >
            Chapter {currentSection + 1} of {storySections.length}
          </Badge>
        </div>
        
        <div className="prose max-w-none">
          <div className="relative group">
            <p className="text-lg leading-relaxed text-gray-800">
              {section.text}
              <button
                className="ml-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                onClick={() => handleSpeak(section.text)}
                title="Listen to pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Key Vocabulary</h3>
          <div className="flex flex-wrap gap-3">
            {section.vocabulary.map(renderWord)}
          </div>
        </div>

        {section.grammarNotes && (
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Grammar Notes</h3>
            <ul className="list-disc pl-6 space-y-3">
              {section.grammarNotes.map((note, index) => (
                <li key={index} className="text-gray-700 leading-relaxed">{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryReader;
