import React, { useState } from 'react';
import { Book, Dumbbell, BookOpen, BookText, GraduationCap } from 'lucide-react';
import StoryReader from '../features/StoryLearning/StoryReader';
import StoryExercises from '../features/StoryLearning/StoryExercises';
import { storyTitle, storySubtitle } from '../../data/storyContent';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const StoryLearningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'exercises'>('story');

  const getBadgeClasses = (type: string) => {
    switch (type) {
      case 'level':
        return 'border-yellow-500 bg-yellow-50 text-yellow-700 hover:bg-yellow-100';
      case 'time':
        return 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100';
      case 'focus':
        return 'border-purple-500 bg-purple-50 text-purple-700 hover:bg-purple-100';
      case 'past':
        return 'border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100';
      case 'present':
        return 'border-pink-500 bg-pink-50 text-pink-700 hover:bg-pink-100';
      case 'definite':
        return 'border-orange-500 bg-orange-50 text-orange-700 hover:bg-orange-100';
      case 'adjective':
        return 'border-cyan-500 bg-cyan-50 text-cyan-700 hover:bg-cyan-100';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{storyTitle}</h1>
        <p className="text-gray-600 mb-4">{storySubtitle}</p>
        
        <div className="flex justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-500" />
            <Badge variant="outline" className={cn(getBadgeClasses('level'))}>
              Intermediate
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <BookText className="w-5 h-5 text-blue-500" />
            <Badge variant="outline" className={cn(getBadgeClasses('time'))}>
              45 minutes
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-500" />
            <Badge variant="outline" className={cn(getBadgeClasses('focus'))}>
              Grammar Focus
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className={cn(getBadgeClasses('past'))}>
            Past Tense
          </Badge>
          <Badge variant="outline" className={cn(getBadgeClasses('present'))}>
            Present Perfect
          </Badge>
          <Badge variant="outline" className={cn(getBadgeClasses('definite'))}>
            Definite Forms
          </Badge>
          <Badge variant="outline" className={cn(getBadgeClasses('adjective'))}>
            Adjective Agreement
          </Badge>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('story')}
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'story'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Book className="w-4 h-4" />
            Story
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'exercises'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            Exercises
          </button>
        </div>
      </div>

      {activeTab === 'story' ? <StoryReader /> : <StoryExercises />}
    </div>
  );
};

export default StoryLearningPage;
