import React from 'react';
import { Trophy } from 'lucide-react';

interface SuccessModalProps {
  onClose: () => void;
  onNext: () => void;
  score: number;
  total: number;
}

export function SuccessModal({ onClose, onNext, score, total }: SuccessModalProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Excellent Work!
          </h2>
          <p className="text-gray-600 mb-6">
            You've completed this set with a score of {score}/{total} ({percentage}%)
          </p>
          <div className="space-x-4">
            <button
              onClick={onNext}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Set
            </button>
            <button
              onClick={onClose}
              className="text-gray-600 px-6 py-2 hover:text-gray-900 transition-colors"
            >
              Review Current
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}