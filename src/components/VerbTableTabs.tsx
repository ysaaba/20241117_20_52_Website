import React from 'react';
import { BookOpen, Users, Sparkles, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
// import type { VerbData } from '../types';

interface VerbTableTabsProps {
  selectedGroup: number | 'all';
  onSelectGroup: (group: number | 'all') => void;
  verbCounts: Record<number, number>;
}

export function VerbTableTabs({ selectedGroup, onSelectGroup, verbCounts }: VerbTableTabsProps) {
  const tabs = [
    { id: 'all', label: 'All Verbs', icon: BookOpen },
    { id: 1, label: 'Group 1 (-ar)', icon: Users, description: 'Regular -ar verbs' },
    { id: 2, label: 'Group 2 (-er)', icon: Sparkles, description: 'Regular -er verbs' },
    { id: 3, label: 'Group 3', icon: Zap, description: 'Short vowel verbs' },
    { id: 4, label: 'Group 4', icon: Zap, description: 'Strong/Irregular verbs' },
  ];

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => {
            const isSelected = selectedGroup === (tab.id === 'all' ? 'all' : Number(tab.id));
            const Icon = tab.icon;
            const count = tab.id === 'all' ? Object.values(verbCounts).reduce((a, b) => a + b, 0) : verbCounts[Number(tab.id)] || 0;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectGroup(tab.id === 'all' ? 'all' : Number(tab.id))}
                className={cn(
                  'group inline-flex items-center px-4 py-2 border-b-2 font-medium text-sm',
                  isSelected
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span>{tab.label}</span>
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}