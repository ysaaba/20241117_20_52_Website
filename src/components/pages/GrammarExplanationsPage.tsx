import React from 'react';
import GrammarExplanations from '../features/GrammarExplanations';

const GrammarExplanationsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Swedish Grammar Explanations
      </h1>
      <GrammarExplanations />
    </div>
  );
};

export default GrammarExplanationsPage;
