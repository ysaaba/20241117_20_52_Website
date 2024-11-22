import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ArticlesPage } from './components/ArticlesPage';
import { VerbExercises } from './components/VerbExercises';
import { AdjectivesPage } from './components/AdjectivesPage';
import { NounsPage } from './components/NounsPage';
import { LandingPage } from './components/LandingPage';
import { QuizPage } from './components/QuizPage';
import StoriesPage from './components/StoriesPage';
import StoryView from './components/StoryView';
import { Navbar } from './components/Navbar';
import type { ExerciseType } from './types';
import { useRouteState } from './hooks/useRouteState';
import { AdverbsPage } from './components/AdverbsPage';

// MainContent component to handle the routing and content display
const MainContent: React.FC<{ selectedType: ExerciseType; setSelectedType: (type: ExerciseType) => void }> = ({
  selectedType,
  setSelectedType,
}) => {
  const { handleNavigation } = useRouteState(selectedType, setSelectedType);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar selectedType={selectedType} onSelectType={handleNavigation} />
      <main className={`${selectedType === 'landing' ? '' : 'pt-24'}`}>
        <Routes>
          <Route path="/" element={<LandingPage onGetStarted={() => handleNavigation('articles')} />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/stories/:id" element={<StoryView />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/verbs" element={<VerbExercises />} />
          <Route path="/adjectives" element={<AdjectivesPage />} />
          <Route path="/adverbs" element={<AdverbsPage />} />
          <Route path="/nouns" element={<NounsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  const [selectedType, setSelectedType] = useState<ExerciseType>('landing');

  return (
    <Router>
      <MainContent selectedType={selectedType} setSelectedType={setSelectedType} />
    </Router>
  );
}

export default App;