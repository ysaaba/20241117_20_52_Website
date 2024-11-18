import type { VerbData, AdjectiveData, NounData } from '../../types';
import type { CategoryDefinition } from '../schema';

export interface FilterOptions {
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  searchQuery?: string;
  group?: number;
  limit?: number;
  offset?: number;
}

export function filterData<T extends VerbData | AdjectiveData | NounData>(
  data: T[],
  options: FilterOptions
): T[] {
  let filtered = [...data];

  if (options.category) {
    filtered = filtered.filter(item => item.category === options.category);
  }

  if (options.difficulty) {
    filtered = filtered.filter(item => item.difficulty === options.difficulty);
  }

  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    filtered = filtered.filter(item => {
      const searchableFields = Object.values(item).filter(
        value => typeof value === 'string'
      );
      return searchableFields.some(field =>
        field.toLowerCase().includes(query)
      );
    });
  }

  if ('group' in options && options.group !== undefined) {
    filtered = filtered.filter(
      item => 'group' in item && (item as VerbData).group === options.group
    );
  }

  if (options.offset !== undefined) {
    filtered = filtered.slice(options.offset);
  }

  if (options.limit !== undefined) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

export function getCategoryById(
  categories: CategoryDefinition[],
  id: string
): CategoryDefinition | undefined {
  for (const category of categories) {
    if (category.id === id) return category;
    if (category.subcategories) {
      const found = getCategoryById(category.subcategories, id);
      if (found) return found;
    }
  }
  return undefined;
}