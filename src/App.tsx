import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ArticlesPage } from './components/ArticlesPage';
import { VerbExercises } from './components/VerbExercises';
import { AdjectivesPage } from './components/AdjectivesPage';
import { NounsPage } from './components/NounsPage';
import type { ExerciseType } from './types';

function App() {
  const [selectedType, setSelectedType] = useState<ExerciseType>('articles');

  const renderContent = () => {
    switch (selectedType) {
      case 'articles':
        return <ArticlesPage />;
      case 'nouns':
        return <NounsPage />;
      case 'verbGroups':
        return <VerbExercises />;
      case 'adjectives':
        return <AdjectivesPage />;
      default:
        return <ArticlesPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar selectedType={selectedType} onSelectType={setSelectedType} />
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;