export function getUniqueRandomOptions<T>(
  correct: T,
  pool: T[],
  count: number,
  generateFallback?: (base: T) => T
): T[] {
  // Remove the correct answer from the pool
  const availableOptions = pool.filter(item => item !== correct);
  let options: T[] = [];

  // Try to get unique options from the pool first
  while (options.length < count && availableOptions.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableOptions.length);
    const option = availableOptions[randomIndex];
    availableOptions.splice(randomIndex, 1);
    options.push(option);
  }

  // If we don't have enough options and have a fallback generator, use it
  if (options.length < count && generateFallback) {
    while (options.length < count) {
      const generated = generateFallback(correct);
      if (!options.includes(generated) && generated !== correct) {
        options.push(generated);
      }
    }
  }

  // Add the correct answer and shuffle
  return [...options, correct].sort(() => Math.random() - 0.5);
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
} 