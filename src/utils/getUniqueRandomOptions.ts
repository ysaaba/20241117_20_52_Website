export function getUniqueRandomOptions(
  correctAnswer: string,
  existingOptions: string[],
  count: number,
  fallbackGenerator: (base: string) => string
): string[] {
  const options = new Set<string>();
  
  // Try to get options from existing list first
  for (const option of existingOptions) {
    if (option !== correctAnswer && options.size < count) {
      options.add(option);
    }
  }

  // If we still need more options, use the fallback generator
  while (options.size < count) {
    const newOption = fallbackGenerator(correctAnswer);
    if (newOption !== correctAnswer) {
      options.add(newOption);
    }
  }

  return Array.from(options);
} 