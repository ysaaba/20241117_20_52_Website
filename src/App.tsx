import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ArticlesPage } from './components/ArticlesPage';
import { VerbExercises } from './components/VerbExercises';
import { AdjectivesPage } from './components/AdjectivesPage';
import { NounsPage } from './components/NounsPage';
import { LandingPage } from './components/LandingPage';
import type { ExerciseType } from './types';

function App() {
  const [selectedType, setSelectedType] = useState<ExerciseType>('landing');

  const renderContent = () => {
    switch (selectedType) {
      case 'landing':
        return <LandingPage onGetStarted={() => setSelectedType('articles')} />;
      case 'articles':
        return <ArticlesPage />;
      case 'nouns':
        return <NounsPage />;
      case 'verbGroups':
        return <VerbExercises />;
      case 'adjectives':
        return <AdjectivesPage />;
      default:
        return <LandingPage onGetStarted={() => setSelectedType('articles')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar selectedType={selectedType} onSelectType={setSelectedType} />
      <main className={`${selectedType === 'landing' ? '' : 'pt-24'}`}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;