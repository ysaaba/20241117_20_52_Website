import { BadgeProps } from '@/components/ui/badge';

export const getDifficultyVariant = (difficulty: string): BadgeProps['variant'] => {
  switch (difficulty) {
    case 'beginner':
      return 'green';
    case 'intermediate':
      return 'yellow';
    case 'advanced':
      return 'red';
    default:
      return 'default';
  }
};

export const getCategoryVariant = (category: string): BadgeProps['variant'] => {
  switch (category) {
    case 'everyday':
      return 'purple';
    case 'culture':
      return 'blue';
    case 'nature':
      return 'green';
    case 'travel':
      return 'yellow';
    case 'food':
      return 'red';
    default:
      return 'default';
  }
}; 