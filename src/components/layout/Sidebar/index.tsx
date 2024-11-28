import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import type { ExerciseType } from '../../types';

interface SidebarProps {
  selectedType: ExerciseType;
  onSelectType: (type: ExerciseType) => void;
}

export function Sidebar({ selectedType, onSelectType }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-4 left-4 p-2 bg-white rounded-lg shadow-lg md:hidden z-50"
      >
        {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-white shadow-lg z-50
        transition-transform duration-300 ease-in-out
        ${isExpanded ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        w-64
      `}>

        {/* Collapse handle for desktop */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 
                     bg-white p-1 rounded-full shadow-lg border
                     hidden md:flex items-center justify-center"
        >
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} />
        </button>
      </aside>
    </>
  );
} 