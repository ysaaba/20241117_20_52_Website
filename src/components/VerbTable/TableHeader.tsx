import React from 'react';
import { Search, RefreshCw, X } from 'lucide-react';

interface TableHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export function TableHeader({ searchQuery, onSearchChange, onReset }: TableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Verb Conjugation Table</h2>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search verbs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-auto pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}