import { NounCategory } from '../types';

interface Noun {
  noun: string;
  translation: string;
  category: NounCategory;
  difficulty: string;
  gender: 'en' | 'ett';
  countable?: boolean;
  forms: {
    indefinite: string;
    definite: string;
    indefinitePlural: string;
    definitePlural: string;
  };
  examples: {
    indefinite: { swedish: string; english: string };
    definite: { swedish: string; english: string };
    indefinitePlural: { swedish: string; english: string };
    definitePlural: { swedish: string; english: string };
  };
  semantics?: {
    [key: string]: boolean;
  };
}

export const commonNouns: Noun[] = [
  {
    noun: 'hund',
    translation: 'dog',
    category: 'animals',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en hund',
      definite: 'hunden',
      indefinitePlural: 'hundar',
      definitePlural: 'hundarna'
    },
    examples: {
      indefinite: { 
        swedish: 'Jag ser en hund',
        english: 'I see a dog'
      },
      definite: {
        swedish: 'Hunden är stor',
        english: 'The dog is big'
      },
      indefinitePlural: {
        swedish: 'Det finns många hundar här',
        english: 'There are many dogs here'
      },
      definitePlural: {
        swedish: 'Hundarna springer i parken',
        english: 'The dogs are running in the park'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeBought: true,
      canBeFound: true,
      animate: true,
      natural: true,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false,
      canBeConsumed: false,
      canBeWorn: false,
      canBeUsedAtWork: false
    }
  },
  {
    noun: 'katt',
    translation: 'cat',
    category: 'animals',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en katt',
      definite: 'katten',
      indefinitePlural: 'katter',
      definitePlural: 'katterna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag har en katt',
        english: 'I have a cat'
      },
      definite: {
        swedish: 'Katten sover',
        english: 'The cat is sleeping'
      },
      indefinitePlural: {
        swedish: 'Det finns två katter',
        english: 'There are two cats'
      },
      definitePlural: {
        swedish: 'Katterna är hungriga',
        english: 'The cats are hungry'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeBought: true,
      canBeFound: true,
      animate: true,
      natural: true,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false,
      canBeConsumed: false,
      canBeWorn: false,
      canBeUsedAtWork: false
    }
  },
  {
    noun: 'hand',
    translation: 'hand',
    category: 'bodyParts',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en hand',
      definite: 'handen',
      indefinitePlural: 'händer',
      definitePlural: 'händerna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag har en hand',
        english: 'I have a hand'
      },
      definite: {
        swedish: 'Handen är varm',
        english: 'The hand is warm'
      },
      indefinitePlural: {
        swedish: 'Mina händer är kalla',
        english: 'My hands are cold'
      },
      definitePlural: {
        swedish: 'Händerna är starka',
        english: 'The hands are strong'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      bodyPart: true,
      natural: true,
      animate: true,
      canBeFound: false,
      canBeBought: false,
      canBeBorrowed: false,
      canBeUsedAtWork: false
    }
  },
  {
    noun: 'öga',
    translation: 'eye',
    category: 'bodyParts',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett öga',
      definite: 'ögat',
      indefinitePlural: 'ögon',
      definitePlural: 'ögonen'
    },
    examples: {
      indefinite: {
        swedish: 'Hon har ett blått öga',
        english: 'She has a blue eye'
      },
      definite: {
        swedish: 'Ögat är rött',
        english: 'The eye is red'
      },
      indefinitePlural: {
        swedish: 'Hon har bruna ögon',
        english: 'She has brown eyes'
      },
      definitePlural: {
        swedish: 'Ögonen är trötta',
        english: 'The eyes are tired'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      bodyPart: true,
      natural: true,
      animate: true,
      canBeFound: false,
      canBeBought: false,
      canBeBorrowed: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false
    }
  },
  {
    noun: 'äpple',
    translation: 'apple',
    category: 'food',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett äpple',
      definite: 'äpplet',
      indefinitePlural: 'äpplen',
      definitePlural: 'äpplena'
    },
    examples: {
      indefinite: {
        swedish: 'Jag vill ha ett äpple',
        english: 'I want an apple'
      },
      definite: {
        swedish: 'Äpplet är rött',
        english: 'The apple is red'
      },
      indefinitePlural: {
        swedish: 'Vi behöver fler äpplen',
        english: 'We need more apples'
      },
      definitePlural: {
        swedish: 'Äpplena ligger i kylen',
        english: 'The apples are in the fridge'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeBought: true,
      canBeConsumed: true,
      natural: true,
      canGrow: true,
      animate: false,
      bodyPart: false,
      canBeWorn: false,
      isWeather: false,
      canBeBorrowed: false,
      canBeUsedAtWork: false
    }
  },
  {
    noun: 'dator',
    translation: 'computer',
    category: 'technology',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en dator',
      definite: 'datorn',
      indefinitePlural: 'datorer',
      definitePlural: 'datorerna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag köpte en dator',
        english: 'I bought a computer'
      },
      definite: {
        swedish: 'Datorn är ny',
        english: 'The computer is new'
      },
      indefinitePlural: {
        swedish: 'Vi har många datorer',
        english: 'We have many computers'
      },
      definitePlural: {
        swedish: 'Datorerna är snabba',
        english: 'The computers are fast'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeBought: true,
      canBeBorrowed: true,
      canBeFound: true,
      canBeUsedAtWork: true
    }
  },
  {
    noun: 'stol',
    translation: 'chair',
    category: 'furniture',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en stol',
      definite: 'stolen',
      indefinitePlural: 'stolar',
      definitePlural: 'stolarna'
    },
    examples: {
      indefinite: {
        swedish: 'Det finns en stol här',
        english: 'There is a chair here'
      },
      definite: {
        swedish: 'Stolen är bekväm',
        english: 'The chair is comfortable'
      },
      indefinitePlural: {
        swedish: 'Vi behöver fler stolar',
        english: 'We need more chairs'
      },
      definitePlural: {
        swedish: 'Stolarna är gamla',
        english: 'The chairs are old'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeBorrowed: true,
      canBeFound: true
    }
  },
  {
    noun: 'skjorta',
    translation: 'shirt',
    category: 'clothing',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en skjorta',
      definite: 'skjortan',
      indefinitePlural: 'skjortor',
      definitePlural: 'skjortorna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag köpte en skjorta',
        english: 'I bought a shirt'
      },
      definite: {
        swedish: 'Skjortan är vit',
        english: 'The shirt is white'
      },
      indefinitePlural: {
        swedish: 'Han har många skjortor',
        english: 'He has many shirts'
      },
      definitePlural: {
        swedish: 'Skjortorna hänger i garderoben',
        english: 'The shirts are hanging in the closet'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeWorn: true,
      canBeBought: true,
      canBeBorrowed: true,
      canBeFound: true
    }
  },
  {
    noun: 'sko',
    translation: 'shoe',
    category: 'clothing',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en sko',
      definite: 'skon',
      indefinitePlural: 'skor',
      definitePlural: 'skorna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag har tappat en sko',
        english: 'I have lost a shoe'
      },
      definite: {
        swedish: 'Skon är för liten',
        english: 'The shoe is too small'
      },
      indefinitePlural: {
        swedish: 'Jag behöver nya skor',
        english: 'I need new shoes'
      },
      definitePlural: {
        swedish: 'Skorna är i hallen',
        english: 'The shoes are in the hallway'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeWorn: true,
      canBeBought: true,
      canBeBorrowed: false,
      canBeFound: true,
      canBeStored: true,
      isPersonal: true
    }
  },
  {
    noun: 'penna',
    translation: 'pen',
    category: 'education',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en penna',
      definite: 'pennan',
      indefinitePlural: 'pennor',
      definitePlural: 'pennorna'
    },
    examples: {
      indefinite: {
        swedish: 'Kan jag låna en penna?',
        english: 'Can I borrow a pen?'
      },
      definite: {
        swedish: 'Pennan är blå',
        english: 'The pen is blue'
      },
      indefinitePlural: {
        swedish: 'Jag har många pennor',
        english: 'I have many pens'
      },
      definitePlural: {
        swedish: 'Pennorna ligger på bordet',
        english: 'The pens are on the table'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeBought: true,
      canBeBorrowed: true,
      canBeFound: true,
      canBeUsedAtWork: true
    }
  },
  {
    noun: 'träd',
    translation: 'tree',
    category: 'nature',
    difficulty: 'beginner',
    countable: true,
    gender: 'ett',
    forms: {
      indefinite: 'ett träd',
      definite: 'trädet',
      indefinitePlural: 'träd',
      definitePlural: 'träden'
    },
    examples: {
      indefinite: {
        swedish: 'Det står ett träd där',
        english: 'There is a tree there'
      },
      definite: {
        swedish: 'Trädet är högt',
        english: 'The tree is tall'
      },
      indefinitePlural: {
        swedish: 'Det finns många träd i parken',
        english: 'There are many trees in the park'
      },
      definitePlural: {
        swedish: 'Träden har tappat sina löv',
        english: 'The trees have lost their leaves'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'regn',
    translation: 'rain',
    category: 'weather',
    difficulty: 'beginner',
    gender: 'ett',
    countable: false,
    forms: {
      indefinite: 'regn',
      definite: 'regnet',
      indefinitePlural: '-',
      definitePlural: '-'
    },
    examples: {
      indefinite: {
        swedish: 'Det regnar',
        english: 'It is raining'
      },
      definite: {
        swedish: 'Regnet öser ner',
        english: 'The rain is pouring down'
      },
      indefinitePlural: {
        swedish: '-',
        english: '-'
      },
      definitePlural: {
        swedish: '-',
        english: '-'
      }
    },
    semantics: {
      isWeather: true,
      canBeSeen: true,
      natural: true,
      animate: false,
      bodyPart: false,
      canBeWorn: false,
      canBeConsumed: false,
      canGrow: false,
      canBeBought: false,
      canBeBorrowed: false,
      canBeFound: false,
      canBeUsedAtWork: false
    }
  },
  {
    noun: 'bil',
    translation: 'car',
    category: 'transportation',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en bil',
      definite: 'bilen',
      indefinitePlural: 'bilar',
      definitePlural: 'bilarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag vill köpa en bil',
        english: 'I want to buy a car'
      },
      definite: {
        swedish: 'Bilen är röd',
        english: 'The car is red'
      },
      indefinitePlural: {
        swedish: 'Det finns många bilar här',
        english: 'There are many cars here'
      },
      definitePlural: {
        swedish: 'Bilarna står på parkeringen',
        english: 'The cars are in the parking lot'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'hus',
    translation: 'house',
    category: 'buildings',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett hus',
      definite: 'huset',
      indefinitePlural: 'hus',
      definitePlural: 'husen'
    },
    examples: {
      indefinite: {
        swedish: 'De bygger ett hus',
        english: 'They are building a house'
      },
      definite: {
        swedish: 'Huset är stort',
        english: 'The house is big'
      },
      indefinitePlural: {
        swedish: 'Det finns många hus på gatan',
        english: 'There are many houses on the street'
      },
      definitePlural: {
        swedish: 'Husen är gamla',
        english: 'The houses are old'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'lärare',
    translation: 'teacher',
    category: 'professions',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en lärare',
      definite: 'läraren',
      indefinitePlural: 'lärare',
      definitePlural: 'lärarna'
    },
    examples: {
      indefinite: {
        swedish: 'Hon är en bra lärare',
        english: 'She is a good teacher'
      },
      definite: {
        swedish: 'Läraren undervisar svenska',
        english: 'The teacher teaches Swedish'
      },
      indefinitePlural: {
        swedish: 'Vi har många lärare',
        english: 'We have many teachers'
      },
      definitePlural: {
        swedish: 'Lärarna har möte',
        english: 'The teachers are having a meeting'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: false,
      canBeUsedAtWork: true,
      animate: true,
      profession: true
    }
  },
  {
    noun: 'tallrik',
    translation: 'plate',
    category: 'kitchen',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en tallrik',
      definite: 'tallriken',
      indefinitePlural: 'tallrikar',
      definitePlural: 'tallrikarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag behöver en tallrik',
        english: 'I need a plate'
      },
      definite: {
        swedish: 'Tallriken är ren',
        english: 'The plate is clean'
      },
      indefinitePlural: {
        swedish: 'Vi har många tallrikar',
        english: 'We have many plates'
      },
      definitePlural: {
        swedish: 'Tallrikarna ligger på bordet',
        english: 'The plates are on the table'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeBought: true,
      isBreakable: true,
      canBeWashed: true,
      canBeStored: true,
      canBeFound: true,
      canBeUsedAtWork: false,
      canBeBorrowed: true
    }
  },
  {
    noun: 'mobiltelefon',
    translation: 'mobile phone',
    category: 'electronics',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en mobiltelefon',
      definite: 'mobiltelefonen',
      indefinitePlural: 'mobiltelefoner',
      definitePlural: 'mobiltelefonerna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag har köpt en mobiltelefon',
        english: 'I have bought a mobile phone'
      },
      definite: {
        swedish: 'Mobiltelefonen är ny',
        english: 'The mobile phone is new'
      },
      indefinitePlural: {
        swedish: 'Det finns många mobiltelefoner här',
        english: 'There are many mobile phones here'
      },
      definitePlural: {
        swedish: 'Mobiltelefonerna ligger på bordet',
        english: 'The mobile phones are on the table'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'boll',
    translation: 'ball',
    category: 'sports',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en boll',
      definite: 'bollen',
      indefinitePlural: 'bollar',
      definitePlural: 'bollarna'
    },
    examples: {
      indefinite: {
        swedish: 'Kan du kasta en boll?',
        english: 'Can you throw a ball?'
      },
      definite: {
        swedish: 'Bollen är röd',
        english: 'The ball is red'
      },
      indefinitePlural: {
        swedish: 'Vi behöver fler bollar',
        english: 'We need more balls'
      },
      definitePlural: {
        swedish: 'Bollarna är nya',
        english: 'The balls are new'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'gitarr',
    translation: 'guitar',
    category: 'music',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en gitarr',
      definite: 'gitarren',
      indefinitePlural: 'gitarrer',
      definitePlural: 'gitarrerna'
    },
    examples: {
      indefinite: {
        swedish: 'Hon spelar en gitarr',
        english: 'She plays a guitar'
      },
      definite: {
        swedish: 'Gitarren låter bra',
        english: 'The guitar sounds good'
      },
      indefinitePlural: {
        swedish: 'Det finns många gitarrer i affären',
        english: 'There are many guitars in the store'
      },
      definitePlural: {
        swedish: 'Gitarrerna är dyra',
        english: 'The guitars are expensive'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'syster',
    translation: 'sister',
    category: 'family',
    difficulty: 'beginner',
    gender: 'en',
    forms: {
      indefinite: 'en syster',
      definite: 'systern',
      indefinitePlural: 'systrar',
      definitePlural: 'systrarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag har en syster',
        english: 'I have a sister'
      },
      definite: {
        swedish: 'Systern bor i Stockholm',
        english: 'The sister lives in Stockholm'
      },
      indefinitePlural: {
        swedish: 'Hon har tre systrar',
        english: 'She has three sisters'
      },
      definitePlural: {
        swedish: 'Systrarna kommer på besök',
        english: 'The sisters are coming to visit'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: false,
      animate: true
    }
  },
  {
    noun: 'kaffe',
    translation: 'coffee',
    category: 'drinks',
    difficulty: 'beginner',
    gender: 'ett',
    countable: false,
    forms: {
      indefinite: 'kaffe',
      definite: 'kaffet',
      indefinitePlural: 'kaffe',
      definitePlural: 'kaffet'
    },
    examples: {
      indefinite: {
        swedish: 'Jag vill ha kaffe',
        english: 'I want coffee'
      },
      definite: {
        swedish: 'Kaffet är varmt',
        english: 'The coffee is hot'
      },
      indefinitePlural: {
        swedish: 'De serverar olika kaffe',
        english: 'They serve different coffee'
      },
      definitePlural: {
        swedish: 'Kaffet är gott',
        english: 'The coffee is good'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeConsumed: true,
      canBeBought: true
    }
  },
  {
    noun: 'papper',
    translation: 'paper',
    category: 'office',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett papper',
      definite: 'pappret',
      indefinitePlural: 'papper',
      definitePlural: 'pappren'
    },
    examples: {
      indefinite: {
        swedish: 'Kan du ge mig ett papper?',
        english: 'Can you give me a paper?'
      },
      definite: {
        swedish: 'Pappret är vitt',
        english: 'The paper is white'
      },
      indefinitePlural: {
        swedish: 'Jag behöver fler papper',
        english: 'I need more papers'
      },
      definitePlural: {
        swedish: 'Pappren ligger på skrivbordet',
        english: 'The papers are on the desk'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'tandborste',
    translation: 'toothbrush',
    category: 'bathroom',
    difficulty: 'beginner',
    gender: 'en',
    forms: {
      indefinite: 'en tandborste',
      definite: 'tandborsten',
      indefinitePlural: 'tandborstar',
      definitePlural: 'tandborstarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag behöver en ny tandborste',
        english: 'I need a new toothbrush'
      },
      definite: {
        swedish: 'Tandborsten är blå',
        english: 'The toothbrush is blue'
      },
      indefinitePlural: {
        swedish: 'Vi har flera tandborstar',
        english: 'We have several toothbrushes'
      },
      definitePlural: {
        swedish: 'Tandborstarna står i badrummet',
        english: 'The toothbrushes are in the bathroom'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'spade',
    translation: 'shovel',
    category: 'garden',
    difficulty: 'intermediate',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en spade',
      definite: 'spaden',
      indefinitePlural: 'spadar',
      definitePlural: 'spadarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag köpte en spade',
        english: 'I bought a shovel'
      },
      definite: {
        swedish: 'Spaden är i garaget',
        english: 'The shovel is in the garage'
      },
      indefinitePlural: {
        swedish: 'Vi behöver fler spadar',
        english: 'We need more shovels'
      },
      definitePlural: {
        swedish: 'Spadarna är smutsiga',
        english: 'The shovels are dirty'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'cykel',
    translation: 'bicycle',
    category: 'transportation',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en cykel',
      definite: 'cykeln',
      indefinitePlural: 'cyklar',
      definitePlural: 'cyklarna'
    },
    examples: {
      indefinite: {
        swedish: 'Han har en cykel',
        english: 'He has a bicycle'
      },
      definite: {
        swedish: 'Cykeln är gammal',
        english: 'The bicycle is old'
      },
      indefinitePlural: {
        swedish: 'Det finns många cyklar här',
        english: 'There are many bicycles here'
      },
      definitePlural: {
        swedish: 'Cyklarna står utanför',
        english: 'The bicycles are outside'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'sovrum',
    translation: 'bedroom',
    category: 'buildings',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett sovrum',
      definite: 'sovrummet',
      indefinitePlural: 'sovrum',
      definitePlural: 'sovrummen'
    },
    examples: {
      indefinite: {
        swedish: 'De har ett stort sovrum',
        english: 'They have a large bedroom'
      },
      definite: {
        swedish: 'Sovrummet är på övervåningen',
        english: 'The bedroom is upstairs'
      },
      indefinitePlural: {
        swedish: 'Huset har tre sovrum',
        english: 'The house has three bedrooms'
      },
      definitePlural: {
        swedish: 'Sovrummen är ljusa',
        english: 'The bedrooms are bright'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'glädje',
    translation: 'joy',
    category: 'emotions',
    difficulty: 'intermediate',
    gender: 'en',
    countable: false,
    forms: {
      indefinite: 'en glädje',
      definite: 'glädjen',
      indefinitePlural: 'glädjer',
      definitePlural: 'glädjerna'
    },
    examples: {
      indefinite: {
        swedish: 'Det var en stor glädje',
        english: 'It was a great joy'
      },
      definite: {
        swedish: 'Glädjen syns i hennes ögon',
        english: 'The joy is visible in her eyes'
      },
      indefinitePlural: {
        swedish: 'Livets små glädjer',
        english: 'Life\'s small joys'
      },
      definitePlural: {
        swedish: 'Glädjerna är många',
        english: 'The joys are many'
      }
    },
    semantics: {
      canBeSeen: false,
      isTangible: false
    }
  },
  {
    noun: 'timme',
    translation: 'hour',
    category: 'time',
    difficulty: 'beginner',
    gender: 'en',
    forms: {
      indefinite: 'en timme',
      definite: 'timmen',
      indefinitePlural: 'timmar',
      definitePlural: 'timmarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag väntar en timme',
        english: 'I wait for an hour'
      },
      definite: {
        swedish: 'Timmen går fort',
        english: 'The hour goes by quickly'
      },
      indefinitePlural: {
        swedish: 'Det tar tre timmar',
        english: 'It takes three hours'
      },
      definitePlural: {
        swedish: 'Timmarna flyger förbi',
        english: 'The hours fly by'
      }
    },
    semantics: {
      canBeSeen: false,
      isTangible: false
    }
  },
  {
    noun: 'färg',
    translation: 'color',
    category: 'colors',
    difficulty: 'beginner',
    gender: 'en',
    forms: {
      indefinite: 'en färg',
      definite: 'färgen',
      indefinitePlural: 'färger',
      definitePlural: 'färgerna'
    },
    examples: {
      indefinite: {
        swedish: 'Välj en färg',
        english: 'Choose a color'
      },
      definite: {
        swedish: 'Färgen är vacker',
        english: 'The color is beautiful'
      },
      indefinitePlural: {
        swedish: 'Det finns många färger',
        english: 'There are many colors'
      },
      definitePlural: {
        swedish: 'Färgerna är starka',
        english: 'The colors are strong'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: false
    }
  },
  {
    noun: 'sommar',
    translation: 'summer',
    category: 'seasons',
    difficulty: 'beginner',
    gender: 'en',
    countable: false,
    forms: {
      indefinite: 'en sommar',
      definite: 'sommaren',
      indefinitePlural: 'somrar',
      definitePlural: 'somrarna'
    },
    examples: {
      indefinite: {
        swedish: 'Det var en varm sommar',
        english: 'It was a warm summer'
      },
      definite: {
        swedish: 'Sommaren är här',
        english: 'The summer is here'
      },
      indefinitePlural: {
        swedish: 'Svenska somrar är korta',
        english: 'Swedish summers are short'
      },
      definitePlural: {
        swedish: 'Somrarna blir varmare',
        english: 'The summers are getting warmer'
      }
    },
    semantics: {
      canBeSeen: false,
      isTangible: false
    }
  },
  {
    noun: 'soffa',
    translation: 'sofa',
    category: 'furniture',
    difficulty: 'beginner',
    gender: 'en',
    forms: {
      indefinite: 'en soffa',
      definite: 'soffan',
      indefinitePlural: 'soffor',
      definitePlural: 'sofforna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi köpte en ny soffa',
        english: 'We bought a new sofa'
      },
      definite: {
        swedish: 'Soffan är bekväm',
        english: 'The sofa is comfortable'
      },
      indefinitePlural: {
        swedish: 'De har två soffor',
        english: 'They have two sofas'
      },
      definitePlural: {
        swedish: 'Sofforna är dyra',
        english: 'The sofas are expensive'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true
    }
  },
  {
    noun: 'matematik',
    translation: 'mathematics',
    category: 'education',
    difficulty: 'beginner',
    gender: 'en',
    countable: false,
    forms: {
      indefinite: 'matematik',
      definite: 'matematiken',
      indefinitePlural: '-',
      definitePlural: '-'
    },
    examples: {
      indefinite: {
        swedish: 'Hon studerar matematik',
        english: 'She studies mathematics'
      },
      definite: {
        swedish: 'Matematiken är svår',
        english: 'The mathematics is difficult'
      },
      indefinitePlural: {
        swedish: '-',
        english: '-'
      },
      definitePlural: {
        swedish: '-',
        english: '-'
      }
    },
    semantics: {
      abstract: true,
      canBeUsedAtWork: true,
      canBeSeen: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBought: false,
      canBeBorrowed: false,
      canBeFound: false,
      animate: false,
      bodyPart: false,
      natural: false,
      profession: false
    }
  },
  {
    noun: 'läkare',
    translation: 'doctor',
    category: 'professions',
    difficulty: 'beginner',
    gender: 'en',
    forms: {
      indefinite: 'en läkare',
      definite: 'läkaren',
      indefinitePlural: 'läkare',
      definitePlural: 'läkarna'
    },
    examples: {
      indefinite: {
        swedish: 'Hon är en bra läkare',
        english: 'She is a good doctor'
      },
      definite: {
        swedish: 'Läkaren kommer snart',
        english: 'The doctor is coming soon'
      },
      indefinitePlural: {
        swedish: 'Det finns många läkare här',
        english: 'There are many doctors here'
      },
      definitePlural: {
        swedish: 'Läkarna arbetar hårt',
        english: 'The doctors work hard'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: false,
      canBeUsedAtWork: true,
      animate: true,
      profession: true
    }
  },
  {
    noun: 'älg',
    translation: 'moose',
    category: 'animals',
    difficulty: 'intermediate',
    gender: 'en',
    forms: {
      indefinite: 'en älg',
      definite: 'älgen',
      indefinitePlural: 'älgar',
      definitePlural: 'älgarna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi såg en älg i skogen',
        english: 'We saw a moose in the forest'
      },
      definite: {
        swedish: 'Älgen är Sveriges största djur',
        english: 'The moose is Sweden\'s largest animal'
      },
      indefinitePlural: {
        swedish: 'Det finns många älgar här',
        english: 'There are many moose here'
      },
      definitePlural: {
        swedish: 'Älgarna vandrar söderut',
        english: 'The moose migrate south'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeFound: true,
      animate: true,
      natural: true
    }
  },
  {
    noun: 'blomma',
    translation: 'flower',
    category: 'nature',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en blomma',
      definite: 'blomman',
      indefinitePlural: 'blommor',
      definitePlural: 'blommorna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag plockade en blomma',
        english: 'I picked a flower'
      },
      definite: {
        swedish: 'Blomman är röd',
        english: 'The flower is red'
      },
      indefinitePlural: {
        swedish: 'Det växer blommor i trädgården',
        english: 'Flowers grow in the garden'
      },
      definitePlural: {
        swedish: 'Blommorna är vackra',
        english: 'The flowers are beautiful'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeFound: true,
      canGrow: true,
      natural: true,
      animate: false,
      bodyPart: false,
      canBeConsumed: false,
      isWeather: false,
      canBeBorrowed: false,
      canBeUsedAtWork: false
    }
  },
  {
    noun: 'åska',
    translation: 'thunder',
    category: 'weather',
    difficulty: 'intermediate',
    gender: 'en',
    countable: false,
    forms: {
      indefinite: 'åska',
      definite: 'åskan',
      indefinitePlural: '-',
      definitePlural: '-'
    },
    examples: {
      indefinite: {
        swedish: 'Det kommer en åska',
        english: 'A thunderstorm is coming'
      },
      definite: {
        swedish: 'Åskan är nära',
        english: 'The thunder is close'
      },
      indefinitePlural: {
        swedish: 'Sommarens åskor',
        english: 'Summer thunderstorms'
      },
      definitePlural: {
        swedish: 'Åskorna är kraftiga',
        english: 'The thunderstorms are powerful'
      }
    },
    semantics: {
      isWeather: true,
      canBeSeen: true,
      natural: true,
      animate: false,
      bodyPart: false,
      canBeWorn: false,
      canBeConsumed: false,
      canGrow: false,
      canBeBought: false,
      canBeBorrowed: false,
      canBeFound: false,
      canBeUsedAtWork: false
    }
  },
  {
    noun: 'hjärta',
    translation: 'heart',
    category: 'bodyParts',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett hjärta',
      definite: 'hjärtat',
      indefinitePlural: 'hjärtan',
      definitePlural: 'hjärtana'
    },
    examples: {
      indefinite: {
        swedish: 'Ett hjärta slår',
        english: 'A heart beats'
      },
      definite: {
        swedish: 'Hjärtat är starkt',
        english: 'The heart is strong'
      },
      indefinitePlural: {
        swedish: 'Våra hjärtan',
        english: 'Our hearts'
      },
      definitePlural: {
        swedish: 'Hjärtana slår i takt',
        english: 'The hearts beat in rhythm'
      }
    },
    semantics: {
      bodyPart: true,
      canBeSeen: true,
      natural: true,
      animate: true,
      canBeFound: false,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false
    }
  },
  {
    noun: 'halsduk',
    translation: 'scarf',
    category: 'clothing',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en halsduk',
      definite: 'halsduken',
      indefinitePlural: 'halsdukar',
      definitePlural: 'halsdukarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag behöver en halsduk',
        english: 'I need a scarf'
      },
      definite: {
        swedish: 'Halsduken är varm',
        english: 'The scarf is warm'
      },
      indefinitePlural: {
        swedish: 'Hon har många halsdukar',
        english: 'She has many scarves'
      },
      definitePlural: {
        swedish: 'Halsdukarna är färgglada',
        english: 'The scarves are colorful'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeWorn: true,
      canBeBought: true,
      canBeBorrowed: true,
      canBeFound: true
    }
  },
  {
    noun: 'mikrovågsugn',
    translation: 'microwave',
    category: 'kitchen',
    difficulty: 'intermediate',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en mikrovågsugn',
      definite: 'mikrovågsugnen',
      indefinitePlural: 'mikrovågsugnar',
      definitePlural: 'mikrovågsugnarna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi har en mikrovågsugn i köket',
        english: 'We have a microwave in the kitchen'
      },
      definite: {
        swedish: 'Mikrovågsugnen är ny',
        english: 'The microwave is new'
      },
      indefinitePlural: {
        swedish: 'De säljer mikrovågsugnar på rea',
        english: 'They sell microwaves on sale'
      },
      definitePlural: {
        swedish: 'Mikrovågsugnarna är på lager',
        english: 'The microwaves are in stock'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeBought: true,
      canBeUsedAtWork: true,
      isBreakable: true,
      needsElectricity: true
    }
  },
  {
    noun: 'växt',
    translation: 'plant',
    category: 'nature',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en växt',
      definite: 'växten',
      indefinitePlural: 'växter',
      definitePlural: 'växterna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag köpte en växt igår',
        english: 'I bought a plant yesterday'
      },
      definite: {
        swedish: 'Växten behöver vatten',
        english: 'The plant needs water'
      },
      indefinitePlural: {
        swedish: 'Det finns växter i trädgården',
        english: 'There are plants in the garden'
      },
      definitePlural: {
        swedish: 'Växterna växer snabbt',
        english: 'The plants grow quickly'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeBought: true,
      canGrow: true,
      natural: true,
      isSeasonDependent: true
    }
  },
  {
    noun: 'laddare',
    translation: 'charger',
    category: 'electronics',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en laddare',
      definite: 'laddaren',
      indefinitePlural: 'laddare',
      definitePlural: 'laddarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag behöver en laddare',
        english: 'I need a charger'
      },
      definite: {
        swedish: 'Laddaren är sönder',
        english: 'The charger is broken'
      },
      indefinitePlural: {
        swedish: 'Vi har många laddare hemma',
        english: 'We have many chargers at home'
      },
      definitePlural: {
        swedish: 'Laddarna ligger i lådan',
        english: 'The chargers are in the drawer'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeBought: true,
      canBeBorrowed: true,
      isBreakable: true,
      needsElectricity: true,
      canBeStored: true
    }
  },
  {
    noun: 'museum',
    translation: 'museum',
    category: 'buildings',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett museum',
      definite: 'museet',
      indefinitePlural: 'museer',
      definitePlural: 'museerna'
    },
    examples: {
      indefinite: {
        swedish: 'Det finns ett museum i närheten',
        english: 'There is a museum nearby'
      },
      definite: {
        swedish: 'Museet är stängt på måndagar',
        english: 'The museum is closed on Mondays'
      },
      indefinitePlural: {
        swedish: 'Stockholm har många museer',
        english: 'Stockholm has many museums'
      },
      definitePlural: {
        swedish: 'Museerna är gratis på söndagar',
        english: 'The museums are free on Sundays'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeFound: true,
      isSeasonDependent: true
    }
  },
  {
    noun: 'växthus',
    translation: 'greenhouse',
    category: 'garden',
    difficulty: 'intermediate',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett växthus',
      definite: 'växthuset',
      indefinitePlural: 'växthus',
      definitePlural: 'växthusen'
    },
    examples: {
      indefinite: {
        swedish: 'De har byggt ett växthus',
        english: 'They have built a greenhouse'
      },
      definite: {
        swedish: 'Växthuset är fullt av tomater',
        english: 'The greenhouse is full of tomatoes'
      },
      indefinitePlural: {
        swedish: 'Det finns många växthus här',
        english: 'There are many greenhouses here'
      },
      definitePlural: {
        swedish: 'Växthusen är varma på sommaren',
        english: 'The greenhouses are warm in summer'
      }
    },
    semantics: {
      canBeSeen: true,
      isTangible: true,
      canBeFound: true,
      isSeasonDependent: true
    }
  }
]