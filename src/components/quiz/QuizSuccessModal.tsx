import React from 'react';
import { Trophy, ArrowRight, RefreshCw } from 'lucide-react';

interface QuizSuccessModalProps {
  score: number;
  total: number;
  onNext: () => void;
  onReset: () => void;
}

export function QuizSuccessModal({ score, total, onNext, onReset }: QuizSuccessModalProps) {
  const percentage = Math.round((score / total) * 100);
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
            <Trophy className="w-12 h-12 text-yellow-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz Complete!
          </h2>
          
          <p className="text-gray-600 mb-6">
            You scored {score} out of {total} ({percentage}%)
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            
            <button
              onClick={onNext}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Set
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 