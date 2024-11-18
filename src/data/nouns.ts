// Comprehensive Swedish noun database with correct plural forms
export const commonNouns: Noun[] = [
  // People and Family
  { noun: 'person', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'person', category: 'people' },
  { noun: 'kvinna', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'woman', category: 'people' },
  { noun: 'man', indefiniteArticle: 'en', definiteArticle: 'nen', indefinitePlural: 'män', definitePlural: 'nen', translation: 'man', category: 'people' },
  { noun: 'barn', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'child', category: 'people' },
  { noun: 'familj', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'family', category: 'people' },
  { noun: 'syster', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'rar', definitePlural: 'rarna', translation: 'sister', category: 'people' },
  { noun: 'bror', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'der', definitePlural: 'derna', translation: 'brother', category: 'people' },
  
  // Professions
  { noun: 'läkare', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: '', definitePlural: 'na', translation: 'doctor', category: 'professions' },
  { noun: 'lärare', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: '', definitePlural: 'na', translation: 'teacher', category: 'professions' },
  { noun: 'ingenjör', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'engineer', category: 'professions' },
  { noun: 'kock', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'chef', category: 'professions' },
  { noun: 'konstnär', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'artist', category: 'professions' },
  
  // Animals
  { noun: 'hund', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'dog', category: 'animals' },
  { noun: 'katt', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'cat', category: 'animals' },
  { noun: 'fågel', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'bird', category: 'animals' },
  { noun: 'häst', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'horse', category: 'animals' },
  { noun: 'fisk', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'fish', category: 'animals' },
  
  // Food and Drinks
  { noun: 'äpple', indefiniteArticle: 'ett', definiteArticle: 't', indefinitePlural: 'n', definitePlural: 'na', translation: 'apple', category: 'food' },
  { noun: 'bröd', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'bread', category: 'food' },
  { noun: 'kaffe', indefiniteArticle: 'ett', definiteArticle: 't', indefinitePlural: 'n', definitePlural: 'na', translation: 'coffee', category: 'food' },
  { noun: 'soppa', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'soup', category: 'food' },
  { noun: 'smörgås', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'sandwich', category: 'food' },
  
  // Clothing
  { noun: 'skjorta', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'shirt', category: 'clothing' },
  { noun: 'byxa', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'pant', category: 'clothing' },
  { noun: 'skor', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: '', definitePlural: 'na', translation: 'shoe', category: 'clothing' },
  { noun: 'klänning', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'dress', category: 'clothing' },
  { noun: 'jacka', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'jacket', category: 'clothing' },
  
  // Furniture
  { noun: 'bord', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'table', category: 'furniture' },
  { noun: 'stol', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'chair', category: 'furniture' },
  { noun: 'säng', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'bed', category: 'furniture' },
  { noun: 'soffa', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'sofa', category: 'furniture' },
  { noun: 'hylla', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'shelf', category: 'furniture' },
  
  // Technology
  { noun: 'dator', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'er', definitePlural: 'erna', translation: 'computer', category: 'technology' },
  { noun: 'telefon', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'phone', category: 'technology' },
  { noun: 'kamera', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'camera', category: 'technology' },
  { noun: 'skärm', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'screen', category: 'technology' },
  { noun: 'router', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'router', category: 'technology' },
  
  // Body Parts
  { noun: 'hand', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'händer', definitePlural: 'händerna', translation: 'hand', category: 'body' },
  { noun: 'fot', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'fötter', definitePlural: 'fötterna', translation: 'foot', category: 'body' },
  { noun: 'öga', indefiniteArticle: 'ett', definiteArticle: 't', indefinitePlural: 'ögon', definitePlural: 'ögonen', translation: 'eye', category: 'body' },
  { noun: 'öra', indefiniteArticle: 'ett', definiteArticle: 't', indefinitePlural: 'öron', definitePlural: 'öronen', translation: 'ear', category: 'body' },
  { noun: 'näsa', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'nose', category: 'body' },
  
  // Nature and Weather
  { noun: 'träd', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'tree', category: 'nature' },
  { noun: 'blomma', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'flower', category: 'nature' },
  { noun: 'moln', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'cloud', category: 'nature' },
  { noun: 'regn', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'rain', category: 'nature' },
  { noun: 'vind', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'wind', category: 'nature' },
  
  // Places and Buildings
  { noun: 'hus', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'house', category: 'places' },
  { noun: 'skola', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'school', category: 'places' },
  { noun: 'sjukhus', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'hospital', category: 'places' },
  { noun: 'affär', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'store', category: 'places' },
  { noun: 'restaurang', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'restaurant', category: 'places' },
  
  // Transportation
  { noun: 'bil', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'car', category: 'transportation' },
  { noun: 'buss', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'bus', category: 'transportation' },
  { noun: 'tåg', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'train', category: 'transportation' },
  { noun: 'cykel', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'bicycle', category: 'transportation' },
  { noun: 'flygplan', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'airplane', category: 'transportation' },
  
  // Kitchen Items
  { noun: 'tallrik', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'plate', category: 'kitchen' },
  { noun: 'gaffel', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'fork', category: 'kitchen' },
  { noun: 'kniv', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'knife', category: 'kitchen' },
  { noun: 'sked', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'spoon', category: 'kitchen' },
  { noun: 'kopp', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'cup', category: 'kitchen' },
  
  // Rooms
  { noun: 'sovrum', indefiniteArticle: 'ett', definiteArticle: 'met', indefinitePlural: '', definitePlural: 'men', translation: 'bedroom', category: 'rooms' },
  { noun: 'kök', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'kitchen', category: 'rooms' },
  { noun: 'badrum', indefiniteArticle: 'ett', definiteArticle: 'met', indefinitePlural: '', definitePlural: 'men', translation: 'bathroom', category: 'rooms' },
  { noun: 'vardagsrum', indefiniteArticle: 'ett', definiteArticle: 'met', indefinitePlural: '', definitePlural: 'men', translation: 'living room', category: 'rooms' },
  { noun: 'kontor', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'office', category: 'rooms' },
  
  // Electronics
  { noun: 'laddare', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: '', definitePlural: 'na', translation: 'charger', category: 'electronics' },
  { noun: 'högtalare', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: '', definitePlural: 'na', translation: 'speaker', category: 'electronics' },
  { noun: 'fjärrkontroll', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'remote control', category: 'electronics' },
  { noun: 'surfplatta', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'tablet', category: 'electronics' },
  { noun: 'tangentbord', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'keyboard', category: 'electronics' },
  
  // School/Education
  { noun: 'penna', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'pen', category: 'school' },
  { noun: 'suddgummi', indefiniteArticle: 'ett', definiteArticle: 't', indefinitePlural: 'n', definitePlural: 'na', translation: 'eraser', category: 'school' },
  { noun: 'anteckningsbok', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'böcker', definitePlural: 'böckerna', translation: 'notebook', category: 'school' },
  { noun: 'klassrum', indefiniteArticle: 'ett', definiteArticle: 'met', indefinitePlural: '', definitePlural: 'men', translation: 'classroom', category: 'school' },
  { noun: 'lärobok', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'böcker', definitePlural: 'böckerna', translation: 'textbook', category: 'school' },
  
  // Bathroom Items
  { noun: 'tandborste', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'toothbrush', category: 'bathroom' },
  { noun: 'tvål', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'soap', category: 'bathroom' },
  { noun: 'handduk', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'towel', category: 'bathroom' },
  { noun: 'schampo', indefiniteArticle: 'ett', definiteArticle: 't', indefinitePlural: 'n', definitePlural: 'na', translation: 'shampoo', category: 'bathroom' },
  { noun: 'spegel', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'mirror', category: 'bathroom' },
  
  // Time
  { noun: 'minut', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'minute', category: 'time' },
  { noun: 'timme', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'hour', category: 'time' },
  { noun: 'vecka', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'week', category: 'time' },
  { noun: 'månad', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'month', category: 'time' },
  { noun: 'sekund', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'second', category: 'time' },
  
  // Sports
  { noun: 'boll', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'ball', category: 'sports' },
  { noun: 'racket', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'racket', category: 'sports' },
  { noun: 'mål', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'goal', category: 'sports' },
  { noun: 'klubba', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'club/stick', category: 'sports' },
  { noun: 'plan', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'field/court', category: 'sports' },
  
  // Emotions/Feelings
  { noun: 'glädje', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: '', definitePlural: '', translation: 'joy', category: 'emotions' },
  { noun: 'sorg', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'sorrow', category: 'emotions' },
  { noun: 'ilska', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: '', definitePlural: '', translation: 'anger', category: 'emotions' },
  { noun: 'rädsla', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'fear', category: 'emotions' },
  { noun: 'kärlek', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: '', definitePlural: '', translation: 'love', category: 'emotions' },
  
  // Tools
  { noun: 'hammare', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: '', definitePlural: 'na', translation: 'hammer', category: 'tools' },
  { noun: 'skruvmejsel', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'screwdriver', category: 'tools' },
  { noun: 'spik', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'nail', category: 'tools' },
  { noun: 'såg', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'saw', category: 'tools' },
  { noun: 'skruv', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'screw', category: 'tools' },
  
  // Office Supplies
  { noun: 'häftapparat', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'stapler', category: 'office' },
  { noun: 'sax', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'scissors', category: 'office' },
  { noun: 'tejp', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'tape', category: 'office' },
  { noun: 'gem', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'paperclip', category: 'office' },
  { noun: 'mapp', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'folder', category: 'office' },
  
  // Garden
  { noun: 'spade', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'shovel', category: 'garden' },
  { noun: 'kruka', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'pot', category: 'garden' },
  { noun: 'gräsklippare', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: '', definitePlural: 'na', translation: 'lawnmower', category: 'garden' },
  { noun: 'vattenslang', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'hose', category: 'garden' },
  { noun: 'räfsa', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'rake', category: 'garden' },
  
  // Musical Instruments
  { noun: 'gitarr', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'guitar', category: 'musical' },
  { noun: 'piano', indefiniteArticle: 'ett', definiteArticle: 't', indefinitePlural: 'n', definitePlural: 'na', translation: 'piano', category: 'musical' },
  { noun: 'trumma', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'drum', category: 'musical' },
  { noun: 'flöjt', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'flute', category: 'musical' },
  { noun: 'fiol', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'violin', category: 'musical' },
  
  // Vehicles Parts
  { noun: 'motor', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'er', definitePlural: 'erna', translation: 'engine', category: 'vehicles' },
  { noun: 'däck', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'tire', category: 'vehicles' },
  { noun: 'ratt', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'steering wheel', category: 'vehicles' },
  { noun: 'växellåda', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'gearbox', category: 'vehicles' },
  { noun: 'broms', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'brake', category: 'vehicles' },
  
  // Hygiene Products
  { noun: 'tandkräm', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'toothpaste', category: 'hygiene' },
  { noun: 'deodorant', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'deodorant', category: 'hygiene' },
  { noun: 'kam', indefiniteArticle: 'en', definiteArticle: 'men', indefinitePlural: 'mar', definitePlural: 'marna', translation: 'comb', category: 'hygiene' },
  { noun: 'rakapparat', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'razor', category: 'hygiene' },
  { noun: 'bomull', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: '', definitePlural: '', translation: 'cotton', category: 'hygiene' },
  
  // Jewelry
  { noun: 'ring', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'ring', category: 'jewelry' },
  { noun: 'halsband', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'necklace', category: 'jewelry' },
  { noun: 'armband', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'bracelet', category: 'jewelry' },
  { noun: 'örhänge', indefiniteArticle: 'ett', definiteArticle: 't', indefinitePlural: 'n', definitePlural: 'na', translation: 'earring', category: 'jewelry' },
  { noun: 'brosch', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'brooch', category: 'jewelry' },
  
  // Containers
  { noun: 'låda', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'box', category: 'containers' },
  { noun: 'påse', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'bag', category: 'containers' },
  { noun: 'burk', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'jar', category: 'containers' },
  { noun: 'flaska', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'or', definitePlural: 'orna', translation: 'bottle', category: 'containers' },
  { noun: 'korg', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'basket', category: 'containers' },
  
  // Stationery
  { noun: 'linjal', indefiniteArticle: 'en', definiteArticle: 'en', indefinitePlural: 'er', definitePlural: 'erna', translation: 'ruler', category: 'stationery' },
  { noun: 'häfte', indefiniteArticle: 'ett', definiteArticle: 't', indefinitePlural: 'n', definitePlural: 'na', translation: 'notebook', category: 'stationery' },
  { noun: 'stämpel', indefiniteArticle: 'en', definiteArticle: 'n', indefinitePlural: 'ar', definitePlural: 'arna', translation: 'stamp', category: 'stationery' },
  { noun: 'kuvert', indefiniteArticle: 'ett', definiteArticle: 'et', indefinitePlural: '', definitePlural: 'en', translation: 'envelope', category: 'stationery' },
  { noun: 'klistermärke', indefiniteArticle: 'ett', definiteArticle: 't', indefinitePlural: 'n', definitePlural: 'na', translation: 'sticker', category: 'stationery' }
] as const;