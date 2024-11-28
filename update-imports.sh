#!/bin/bash

# Update verb data imports
find src/data/verbs -name "*.ts" -type f -exec sed -i '' 's/from '\''..\/..\/types'\''/from '\''..\/..\/types\/verbs'\''/g' {} +

# Update story imports
find src/data/stories -name "*.ts" -type f -exec sed -i '' 's/from '\''\.\/types'\''/from '\''\.\/types'\''/g' {} +

# Update template imports
sed -i '' 's/from '\''\.\.\/types'\''/from '\''\.\.\/types\/nouns'\''/g' src/data/templates.ts

# Update validator imports
sed -i '' 's/from '\''\.\.\/\.\.\/types'\''/from '\''\.\.\/\.\.\/types'\''/g' src/data/utils/validators.ts

# Update generator imports
sed -i '' 's/from '\''\.\.\/\.\.\/types'\''/from '\''\.\.\/\.\.\/types'\''/g' src/data/utils/generators.ts

# Update adjectives imports
sed -i '' 's/from '\''\.\.\/types'\''/from '\''\.\.\/types\/adjectives'\''/g' src/data/adjectives.ts

# Update adverbs imports
sed -i '' 's/from '\''\.\.\/types'\''/from '\''\.\.\/types\/adverbs'\''/g' src/data/adverbs.ts

# Update article exercises imports
sed -i '' 's/from '\''\.\.\/types'\''/from '\''\.\.\/types'\''/g' src/data/articleExercises.ts

# Update component imports
find src/components -name "*.tsx" -type f -exec sed -i '' 's/from '\''\.\.\/types'\''/from '\''\.\.\/types'\''/g' {} +
find src/components -name "*.tsx" -type f -exec sed -i '' 's/from '\''\.\.\/\.\.\/types'\''/from '\''\.\.\/\.\.\/types'\''/g' {} +

# Update hooks imports
find src/hooks -name "*.ts" -type f -exec sed -i '' 's/from '\''\.\.\/types'\''/from '\''\.\.\/types'\''/g' {} +

# Update utils imports
find src/utils -name "*.ts" -type f -exec sed -i '' 's/from '\''\.\.\/types'\''/from '\''\.\.\/types'\''/g' {} +
