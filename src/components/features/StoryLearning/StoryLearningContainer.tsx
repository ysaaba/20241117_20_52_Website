import React, { useState } from 'react';
import StoryReader from './StoryReader';
import StoryExercises from './StoryExercises';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, PenTool } from 'lucide-react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`story-tabpanel-${index}`}
      aria-labelledby={`story-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const StoryLearningContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('read');

  return (
    <Card className="bg-white rounded-lg shadow-md">
      <Tabs defaultValue="read" className="w-full" onValueChange={setActiveTab}>
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
