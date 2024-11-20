export const getCategoryDisplayName = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'nouns':
      return 'Noun Exercises';
    case 'verbs':
      return 'Verb Exercises';
    case 'adjectives':
      return 'Adjective Exercises';
    case 'all':
      return 'All Exercises';
    default:
      return category;
  }
};
