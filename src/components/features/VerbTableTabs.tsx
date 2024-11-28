import React from 'react';
import { Book, Table2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '../../lib/utils';
// import type { VerbData } from '../types';

interface VerbTableTabsProps {
  selectedGroup: number | 'all';
  onSelectGroup: (group: number | 'all') => void;
  verbCounts: Record<number, number>;
}

export function VerbTableTabs({ selectedGroup, onSelectGroup, verbCounts }: VerbTableTabsProps) {
  const tabs = [
    { id: 'all', label: 'All Verbs', icon: Book, count: Object.values(verbCounts).reduce((a, b) => a + b, 0) },
    { id: 1, label: 'Group 1 (-ar)', icon: Table2, description: 'Regular -ar verbs', count: verbCounts[1] || 0 },
    { id: 2, label: 'Group 2 (-er)', icon: Sparkles, description: 'Regular -er verbs', count: verbCounts[2] || 0 },
    { id: 3, label: 'Group 3', icon: Sparkles, description: 'Short vowel verbs', count: verbCounts[3] || 0 },
    { id: 4, label: 'Group 4', icon: Sparkles, description: 'Strong/Irregular verbs', count: verbCounts[4] || 0 },
  ];

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => {
            const isSelected = selectedGroup === (tab.id === 'all' ? 'all' : Number(tab.id));
            const Icon = tab.icon;

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
                <Badge variant="default" size="sm" className="ml-2">
                  {tab.count}
                </Badge>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}