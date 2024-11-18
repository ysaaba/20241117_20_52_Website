import { CheckCircle2, XCircle, Target } from 'lucide-react';

interface ProgressBarProps {
  correct: number;
  wrong: number;
  total: number;
}

export const ProgressBar = ({ correct, wrong, total }: ProgressBarProps) => {
  const correctPercentage = (correct / total) * 100;
  const wrongPercentage = (wrong / total) * 100;
  const remainingPercentage = 100 - correctPercentage - wrongPercentage;
  const completed = correct + wrong;

  return (
    <div className="w-full mb-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600">Correct</span>
          </div>
          <div className="text-2xl font-bold text-green-600 mt-1">{correct}</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-gray-600">Wrong</span>
          </div>
          <div className="text-2xl font-bold text-red-600 mt-1">{wrong}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Remaining</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{total - completed}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="flex h-full transition-all duration-500 ease-out">
            <div 
              style={{ width: `${correctPercentage}%` }}
              className="bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
            />
            <div 
              style={{ width: `${wrongPercentage}%` }}
              className="bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500"
            />
            <div 
              style={{ width: `${remainingPercentage}%` }}
              className="bg-gray-200 transition-all duration-500"
            />
          </div>
        </div>

        {/* Progress Markers */}
        <div className="absolute -bottom-3 left-0 w-full flex justify-between px-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const position = (index / 4) * 100;
            const isCompleted = position <= (completed / total) * 100;
            return (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                } transform translate-y-1/2 transition-colors duration-300`}
              />
            );
          })}
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="h-full bg-black bg-opacity-5" />
        </div>
      </div>

      {/* Optional: Motivational Message */}
      {completed > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {completed === total ? (
              <span className="text-blue-600 font-medium">
                Great job completing all questions!
              </span>
            ) : (
              <span>
                Keep going! {total - completed} questions remaining
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};