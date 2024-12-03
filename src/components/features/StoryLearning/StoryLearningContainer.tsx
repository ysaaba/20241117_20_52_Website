import React from 'react';
import StoryReader from './StoryReader';
import StoryExercises from './StoryExercises';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, PenTool } from 'lucide-react';

const StoryLearningContainer: React.FC = () => {
  return (
    <Card className="bg-white rounded-lg shadow-md">
      <Tabs defaultValue="read" className="w-full">
        <div className="border-b px-6 py-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="read" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Read Story
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              Practice
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="read" className="mt-0">
            <StoryReader />
          </TabsContent>
          
          <TabsContent value="practice" className="mt-0">
            <StoryExercises />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};

export default StoryLearningContainer;
