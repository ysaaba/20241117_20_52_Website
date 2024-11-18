import React from 'react';
import { BookText, Play, Palette, Book } from 'lucide-react';
import type { ExerciseType } from '../types';

interface NavbarProps {
  selectedType: ExerciseType;
  onSelectType: (type: ExerciseType) => void;
}

export function Navbar({ selectedType, onSelectType }: NavbarProps) {
  const navItems = [
    {
      id: 'articles',
      title: 'Articles',
      icon: BookText
    },
    {
      id: 'nouns',
      title: 'Nouns',
      icon: Book
    },
    {
      id: 'verbGroups',
      title: 'Verb Groups',
      icon: Play
    },
    {
      id: 'adjectives',
      title: 'Adjectives',
      icon: Palette
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <span className="text-xl font-bold text-blue-600">Swedish Practice</span>
          <div className="flex space-x-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onSelectType(item.id as ExerciseType)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  selectedType === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}