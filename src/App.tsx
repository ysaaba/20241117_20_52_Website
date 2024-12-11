import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ArticlesPage from './components/pages/ArticlesPage';
import VerbExercises from './components/features/VerbExercises';
import AdjectivesPage from './components/pages/AdjectivesPage';
import NounsPage from './components/pages/NounsPage';
import LandingPage from './components/pages/LandingPage';
import QuizPage from './components/pages/QuizPage';
import StoriesPage from './components/pages/StoriesPage';
import StoryView from './components/pages/StoryView';
import Navbar from './components/layout/Navbar';
import type { ExerciseType } from './types';
import useRouteState from './hooks/useRouteState';
import AdverbsPage from './components/pages/AdverbsPage';
import GrammarVisualizerPage from './components/pages/GrammarVisualizerPage';
import GrammarAnimation from './components/features/GrammarAnimation';
import GrammarPractice from './components/features/GrammarPractice';
import GrammarExplanationsPage from './components/pages/GrammarExplanationsPage';
import StoryLearningPage from './components/pages/StoryLearningPage';
import { StrictMode } from 'react';

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
          <Route path="/grammar-visualizer" element={<GrammarVisualizerPage />} />
          <Route path="/grammar-animation" element={<GrammarAnimation />} />
          <Route path="/grammar-practice" element={<GrammarPractice />} />
          <Route path="/grammar-explanations" element={<GrammarExplanationsPage />} />
          <Route path="/story-learning" element={<StoryLearningPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  const [selectedType, setSelectedType] = React.useState<ExerciseType>('landing');
  
  return (
    <StrictMode>
      <Router>
        <MainContent selectedType={selectedType} setSelectedType={setSelectedType} />
      </Router>
    </StrictMode>
  );
};

export default App;