interface Noun {
  noun: string;
  translation: string;
  category: string;
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

export function removeDuplicates(nouns: Noun[]): Noun[] {
  const seen = new Set<string>();
  return nouns.filter(noun => {
    if (seen.has(noun.noun)) return false;
    seen.add(noun.noun);
    return true;
  });
}

export const commonNouns: Noun[] = removeDuplicates([
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
      canBeFound: true,
      animate: true,
      natural: true,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
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
      canBeFound: true,
      animate: true,
      natural: true,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'hand',
    translation: 'hand',
    category: 'body parts',
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
      bodyPart: true,
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
    noun: 'öga',
    translation: 'eye',
    category: 'body parts',
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
        swedish: 'Han har bruna ögon',
        english: 'He has brown eyes'
      },
      definitePlural: {
        swedish: 'Ögonen är trötta',
        english: 'The eyes are tired'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: true
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
        swedish: 'Jag äter ett äpple',
        english: 'I am eating an apple'
      },
      definite: {
        swedish: 'Äpplet är rött',
        english: 'The apple is red'
      },
      indefinitePlural: {
        swedish: 'Det finns många äpplen i korgen',
        english: 'There are many apples in the basket'
      },
      definitePlural: {
        swedish: 'Äpplena är mogna',
        english: 'The apples are ripe'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: true,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
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
        swedish: 'Det finns många datorer här',
        english: 'There are many computers here'
      },
      definitePlural: {
        swedish: 'Datorerna är snabba',
        english: 'The computers are fast'
      }
    },
    semantics: {
      canBeSeen: true,
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
      canBeWorn: true,
      canBeBought: true,
      canBeBorrowed: true,
      canBeFound: true
    }
  },
  {
    noun: 'skor',
    translation: 'shoes',
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
        swedish: 'Jag behöver en ny sko',
        english: 'I need a new shoe'
      },
      definite: {
        swedish: 'Skon är för liten',
        english: 'The shoe is too small'
      },
      indefinitePlural: {
        swedish: 'Dessa skor är dyra',
        english: 'These shoes are expensive'
      },
      definitePlural: {
        swedish: 'Skorna är smutsiga',
        english: 'The shoes are dirty'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeWorn: true,
      canBeBought: true,
      canBeBorrowed: true,
      canBeFound: true
    }
  },
  {
    noun: 'penna',
    translation: 'pen',
    category: 'school',
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
        swedish: 'Tallrikarna står i skåpet',
        english: 'The plates are in the cupboard'
      }
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
    }
  },
  {
    noun: 'syster',
    translation: 'sister',
    category: 'family',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
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
    }
  },
  {
    noun: 'kaffe',
    translation: 'coffee',
    category: 'drinks',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett kaffe',
      definite: 'kaffet',
      indefinitePlural: 'kaffen',
      definitePlural: 'kaffena'
    },
    examples: {
      indefinite: {
        swedish: 'Jag vill ha ett kaffe',
        english: 'I want a coffee'
      },
      definite: {
        swedish: 'Kaffet är varmt',
        english: 'The coffee is hot'
      },
      indefinitePlural: {
        swedish: 'De serverar olika kaffen',
        english: 'They serve different coffees'
      },
      definitePlural: {
        swedish: 'Kaffena är goda',
        english: 'The coffees are good'
      }
    },
    semantics: {
      canBeConsumed: true,
      canBeBought: true,
      canBeSeen: true
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
    }
  },
  {
    noun: 'tandborste',
    translation: 'toothbrush',
    category: 'bathroom',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
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
    }
  },
  {
    noun: 'cykel',
    translation: 'bicycle',
    category: 'vehicles',
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
    }
  },
  {
    noun: 'sovrum',
    translation: 'bedroom',
    category: 'rooms',
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
    }
  },
  {
    noun: 'timme',
    translation: 'hour',
    category: 'time',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
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
    }
  },
  {
    noun: 'färg',
    translation: 'color',
    category: 'colors',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
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
    }
  },
  {
    noun: 'soffa',
    translation: 'sofa',
    category: 'furniture',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
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
    }
  },
  {
    noun: 'matematik',
    translation: 'mathematics',
    category: 'school',
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
    countable: true,
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
    countable: true,
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
      canBeFound: true,
      animate: true,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
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
        swedish: 'Blommorna doftar gott',
        english: 'The flowers smell good'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
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
    category: 'body parts',
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
      canBeWorn: true,
      canBeBought: true,
      canBeBorrowed: true,
      canBeFound: true
    }
  },
  {
    noun: 'häst',
    translation: 'horse',
    category: 'animals',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en häst',
      definite: 'hästen',
      indefinitePlural: 'hästar',
      definitePlural: 'hästarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag ser en häst i hagen',
        english: 'I see a horse in the paddock'
      },
      definite: {
        swedish: 'Hästen är vacker',
        english: 'The horse is beautiful'
      },
      indefinitePlural: {
        swedish: 'Det finns många hästar här',
        english: 'There are many horses here'
      },
      definitePlural: {
        swedish: 'Hästarna springer fritt',
        english: 'The horses are running freely'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: true,
      natural: true,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'fot',
    translation: 'foot',
    category: 'body parts',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en fot',
      definite: 'foten',
      indefinitePlural: 'fötter',
      definitePlural: 'fötterna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag har skadat en fot',
        english: 'I have injured a foot'
      },
      definite: {
        swedish: 'Foten gör ont',
        english: 'The foot hurts'
      },
      indefinitePlural: {
        swedish: 'Mina fötter är kalla',
        english: 'My feet are cold'
      },
      definitePlural: {
        swedish: 'Fötterna behöver vila',
        english: 'The feet need rest'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: true
    }
  },
  {
    noun: 'björn',
    translation: 'bear',
    category: 'animals',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en björn',
      definite: 'björnen',
      indefinitePlural: 'björnar',
      definitePlural: 'björnarna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi såg en björn i skogen',
        english: 'We saw a bear in the forest'
      },
      definite: {
        swedish: 'Björnen äter bär',
        english: 'The bear is eating berries'
      },
      indefinitePlural: {
        swedish: 'Det finns vilda björnar här',
        english: 'There are wild bears here'
      },
      definitePlural: {
        swedish: 'Björnarna sover på vintern',
        english: 'The bears sleep during winter'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: true,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'bord',
    translation: 'table',
    category: 'furniture',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett bord',
      definite: 'bordet',
      indefinitePlural: 'bord',
      definitePlural: 'borden'
    },
    examples: {
      indefinite: {
        swedish: 'Vi behöver ett bord här',
        english: 'We need a table here'
      },
      definite: {
        swedish: 'Bordet är gjort av trä',
        english: 'The table is made of wood'
      },
      indefinitePlural: {
        swedish: 'Det finns många bord i rummet',
        english: 'There are many tables in the room'
      },
      definitePlural: {
        swedish: 'Borden är för höga',
        english: 'The tables are too high'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'bil',
    translation: 'car',
    category: 'vehicles',
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
        swedish: 'Det finns många bilar på gatan',
        english: 'There are many cars on the street'
      },
      definitePlural: {
        swedish: 'Bilarna står på parkeringen',
        english: 'The cars are in the parking lot'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'bok',
    translation: 'book',
    category: 'objects',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en bok',
      definite: 'boken',
      indefinitePlural: 'böcker',
      definitePlural: 'böckerna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag läser en bok',
        english: 'I am reading a book'
      },
      definite: {
        swedish: 'Boken är intressant',
        english: 'The book is interesting'
      },
      indefinitePlural: {
        swedish: 'Det finns många böcker i biblioteket',
        english: 'There are many books in the library'
      },
      definitePlural: {
        swedish: 'Böckerna är på svenska',
        english: 'The books are in Swedish'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'fågel',
    translation: 'bird',
    category: 'animals',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en fågel',
      definite: 'fågeln',
      indefinitePlural: 'fåglar',
      definitePlural: 'fåglarna'
    },
    examples: {
      indefinite: {
        swedish: 'En fågel sjunger i trädet',
        english: 'A bird is singing in the tree'
      },
      definite: {
        swedish: 'Fågeln bygger ett bo',
        english: 'The bird is building a nest'
      },
      indefinitePlural: {
        swedish: 'Fåglar flyger söderut på vintern',
        english: 'Birds fly south in winter'
      },
      definitePlural: {
        swedish: 'Fåglarna äter frön',
        english: 'The birds are eating seeds'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: true,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'dörr',
    translation: 'door',
    category: 'household',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en dörr',
      definite: 'dörren',
      indefinitePlural: 'dörrar',
      definitePlural: 'dörrarna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi behöver en ny dörr',
        english: 'We need a new door'
      },
      definite: {
        swedish: 'Dörren är stängd',
        english: 'The door is closed'
      },
      indefinitePlural: {
        swedish: 'Huset har många dörrar',
        english: 'The house has many doors'
      },
      definitePlural: {
        swedish: 'Dörrarna är låsta',
        english: 'The doors are locked'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'månad',
    translation: 'month',
    category: 'time',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en månad',
      definite: 'månaden',
      indefinitePlural: 'månader',
      definitePlural: 'månaderna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag stannar en månad i Sverige',
        english: 'I am staying one month in Sweden'
      },
      definite: {
        swedish: 'Månaden går fort',
        english: 'The month goes by quickly'
      },
      indefinitePlural: {
        swedish: 'Det tar tre månader att lära sig',
        english: 'It takes three months to learn'
      },
      definitePlural: {
        swedish: 'Månaderna blir kallare',
        english: 'The months are getting colder'
      }
    },
    semantics: {
      canBeSeen: false,
      canBeFound: false,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'nyckel',
    translation: 'key',
    category: 'objects',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en nyckel',
      definite: 'nyckeln',
      indefinitePlural: 'nycklar',
      definitePlural: 'nycklarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag har tappat en nyckel',
        english: 'I have lost a key'
      },
      definite: {
        swedish: 'Nyckeln är till ytterdörren',
        english: 'The key is for the front door'
      },
      indefinitePlural: {
        swedish: 'Jag har många nycklar',
        english: 'I have many keys'
      },
      definitePlural: {
        swedish: 'Nycklarna ligger på bordet',
        english: 'The keys are on the table'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'väska',
    translation: 'bag',
    category: 'objects',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en väska',
      definite: 'väskan',
      indefinitePlural: 'väskor',
      definitePlural: 'väskorna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag köpte en ny väska',
        english: 'I bought a new bag'
      },
      definite: {
        swedish: 'Väskan är full',
        english: 'The bag is full'
      },
      indefinitePlural: {
        swedish: 'Det finns många väskor i affären',
        english: 'There are many bags in the store'
      },
      definitePlural: {
        swedish: 'Väskorna är dyra',
        english: 'The bags are expensive'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: true,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'lampa',
    translation: 'lamp',
    category: 'household',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en lampa',
      definite: 'lampan',
      indefinitePlural: 'lampor',
      definitePlural: 'lamporna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi behöver en ny lampa',
        english: 'We need a new lamp'
      },
      definite: {
        swedish: 'Lampan lyser starkt',
        english: 'The lamp shines brightly'
      },
      indefinitePlural: {
        swedish: 'Det finns lampor i varje rum',
        english: 'There are lamps in every room'
      },
      definitePlural: {
        swedish: 'Lamporna är moderna',
        english: 'The lamps are modern'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'penna',
    translation: 'pen',
    category: 'office',
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
        swedish: 'Pennan skriver inte',
        english: 'The pen is not writing'
      },
      indefinitePlural: {
        swedish: 'Jag köpte nya pennor',
        english: 'I bought new pens'
      },
      definitePlural: {
        swedish: 'Pennorna ligger på skrivbordet',
        english: 'The pens are on the desk'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'moln',
    translation: 'cloud',
    category: 'nature',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett moln',
      definite: 'molnet',
      indefinitePlural: 'moln',
      definitePlural: 'molnen'
    },
    examples: {
      indefinite: {
        swedish: 'Jag ser ett moln på himlen',
        english: 'I see a cloud in the sky'
      },
      definite: {
        swedish: 'Molnet ser ut som en häst',
        english: 'The cloud looks like a horse'
      },
      indefinitePlural: {
        swedish: 'Det är många moln idag',
        english: 'There are many clouds today'
      },
      definitePlural: {
        swedish: 'Molnen är mörka',
        english: 'The clouds are dark'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: true,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'tröja',
    translation: 'sweater',
    category: 'clothing',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en tröja',
      definite: 'tröjan',
      indefinitePlural: 'tröjor',
      definitePlural: 'tröjorna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag köpte en varm tröja',
        english: 'I bought a warm sweater'
      },
      definite: {
        swedish: 'Tröjan är för stor',
        english: 'The sweater is too big'
      },
      indefinitePlural: {
        swedish: 'Hon har många tröjor',
        english: 'She has many sweaters'
      },
      definitePlural: {
        swedish: 'Tröjorna hänger i garderoben',
        english: 'The sweaters are hanging in the closet'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: true,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'strand',
    translation: 'beach',
    category: 'places',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en strand',
      definite: 'stranden',
      indefinitePlural: 'stränder',
      definitePlural: 'stränderna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi hittade en fin strand',
        english: 'We found a nice beach'
      },
      definite: {
        swedish: 'Stranden är full av människor',
        english: 'The beach is full of people'
      },
      indefinitePlural: {
        swedish: 'Sverige har många stränder',
        english: 'Sweden has many beaches'
      },
      definitePlural: {
        swedish: 'Stränderna är populära på sommaren',
        english: 'The beaches are popular in summer'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'kniv',
    translation: 'knife',
    category: 'kitchen',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en kniv',
      definite: 'kniven',
      indefinitePlural: 'knivar',
      definitePlural: 'knivarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag behöver en vass kniv',
        english: 'I need a sharp knife'
      },
      definite: {
        swedish: 'Kniven är i lådan',
        english: 'The knife is in the drawer'
      },
      indefinitePlural: {
        swedish: 'Vi har många knivar',
        english: 'We have many knives'
      },
      definitePlural: {
        swedish: 'Knivarna måste vara vassa',
        english: 'The knives must be sharp'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'måne',
    translation: 'moon',
    category: 'nature',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en måne',
      definite: 'månen',
      indefinitePlural: 'månar',
      definitePlural: 'månarna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi ser en stor måne ikväll',
        english: 'We see a big moon tonight'
      },
      definite: {
        swedish: 'Månen lyser starkt',
        english: 'The moon shines brightly'
      },
      indefinitePlural: {
        swedish: 'Jupiter har många månar',
        english: 'Jupiter has many moons'
      },
      definitePlural: {
        swedish: 'Månarna kretsar runt planeten',
        english: 'The moons orbit around the planet'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'näsa',
    translation: 'nose',
    category: 'body parts',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en näsa',
      definite: 'näsan',
      indefinitePlural: 'näsor',
      definitePlural: 'näsorna'
    },
    examples: {
      indefinite: {
        swedish: 'Han har en stor näsa',
        english: 'He has a big nose'
      },
      definite: {
        swedish: 'Näsan är röd av kylan',
        english: 'The nose is red from the cold'
      },
      indefinitePlural: {
        swedish: 'Hundar har känsliga näsor',
        english: 'Dogs have sensitive noses'
      },
      definitePlural: {
        swedish: 'Näsorna är olika på alla människor',
        english: 'The noses are different on all people'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: true
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
        swedish: 'Han har på sig en vit skjorta',
        english: 'He is wearing a white shirt'
      },
      definite: {
        swedish: 'Skjortan behöver strykas',
        english: 'The shirt needs ironing'
      },
      indefinitePlural: {
        swedish: 'Jag köpte nya skjortor igår',
        english: 'I bought new shirts yesterday'
      },
      definitePlural: {
        swedish: 'Skjortorna hänger i garderoben',
        english: 'The shirts are hanging in the closet'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: true,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'axel',
    translation: 'shoulder',
    category: 'body parts',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en axel',
      definite: 'axeln',
      indefinitePlural: 'axlar',
      definitePlural: 'axlarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag har ont i en axel',
        english: 'I have pain in a shoulder'
      },
      definite: {
        swedish: 'Axeln är stel',
        english: 'The shoulder is stiff'
      },
      indefinitePlural: {
        swedish: 'Hans axlar är starka',
        english: 'His shoulders are strong'
      },
      definitePlural: {
        swedish: 'Axlarna värker efter träningen',
        english: 'The shoulders ache after the workout'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: true
    }
  },
  {
    noun: 'gaffel',
    translation: 'fork',
    category: 'kitchen',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en gaffel',
      definite: 'gaffeln',
      indefinitePlural: 'gafflar',
      definitePlural: 'gafflarna'
    },
    examples: {
      indefinite: {
        swedish: 'Kan du ge mig en gaffel?',
        english: 'Can you give me a fork?'
      },
      definite: {
        swedish: 'Gaffeln ligger på bordet',
        english: 'The fork is on the table'
      },
      indefinitePlural: {
        swedish: 'Vi behöver fler gafflar',
        english: 'We need more forks'
      },
      definitePlural: {
        swedish: 'Gafflarna är i lådan',
        english: 'The forks are in the drawer'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'träd',
    translation: 'tree',
    category: 'nature',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett träd',
      definite: 'trädet',
      indefinitePlural: 'träd',
      definitePlural: 'träden'
    },
    examples: {
      indefinite: {
        swedish: 'Det står ett träd i trädgården',
        english: 'There is a tree in the garden'
      },
      definite: {
        swedish: 'Trädet är mycket gammalt',
        english: 'The tree is very old'
      },
      indefinitePlural: {
        swedish: 'Det finns många träd i skogen',
        english: 'There are many trees in the forest'
      },
      definitePlural: {
        swedish: 'Träden tappar sina löv på hösten',
        english: 'The trees lose their leaves in autumn'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'sjukhus',
    translation: 'hospital',
    category: 'places',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett sjukhus',
      definite: 'sjukhuset',
      indefinitePlural: 'sjukhus',
      definitePlural: 'sjukhusen'
    },
    examples: {
      indefinite: {
        swedish: 'Det finns ett sjukhus i närheten',
        english: 'There is a hospital nearby'
      },
      definite: {
        swedish: 'Sjukhuset är nybyggt',
        english: 'The hospital is newly built'
      },
      indefinitePlural: {
        swedish: 'Stockholm har flera sjukhus',
        english: 'Stockholm has several hospitals'
      },
      definitePlural: {
        swedish: 'Sjukhusen är öppna dygnet runt',
        english: 'The hospitals are open around the clock'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'vind',
    translation: 'wind',
    category: 'weather',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en vind',
      definite: 'vinden',
      indefinitePlural: 'vindar',
      definitePlural: 'vindarna'
    },
    examples: {
      indefinite: {
        swedish: 'En stark vind blåser idag',
        english: 'A strong wind is blowing today'
      },
      definite: {
        swedish: 'Vinden kommer från norr',
        english: 'The wind is coming from the north'
      },
      indefinitePlural: {
        swedish: 'Kalla vindar från havet',
        english: 'Cold winds from the sea'
      },
      definitePlural: {
        swedish: 'Vindarna är farliga för små båtar',
        english: 'The winds are dangerous for small boats'
      }
    },
    semantics: {
      canBeSeen: false,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: true,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'sked',
    translation: 'spoon',
    category: 'kitchen',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en sked',
      definite: 'skeden',
      indefinitePlural: 'skedar',
      definitePlural: 'skedarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag behöver en sked till soppan',
        english: 'I need a spoon for the soup'
      },
      definite: {
        swedish: 'Skeden är av silver',
        english: 'The spoon is made of silver'
      },
      indefinitePlural: {
        swedish: 'Vi har många skedar',
        english: 'We have many spoons'
      },
      definitePlural: {
        swedish: 'Skedarna är i diskmaskinen',
        english: 'The spoons are in the dishwasher'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'finger',
    translation: 'finger',
    category: 'body parts',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett finger',
      definite: 'fingret',
      indefinitePlural: 'fingrar',
      definitePlural: 'fingrarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag har skadat ett finger',
        english: 'I have injured a finger'
      },
      definite: {
        swedish: 'Fingret är svullet',
        english: 'The finger is swollen'
      },
      indefinitePlural: {
        swedish: 'Hennes fingrar är långa',
        english: 'Her fingers are long'
      },
      definitePlural: {
        swedish: 'Fingrarna är kalla',
        english: 'The fingers are cold'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: true
    }
  },
  {
    noun: 'tavla',
    translation: 'painting',
    category: 'art',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en tavla',
      definite: 'tavlan',
      indefinitePlural: 'tavlor',
      definitePlural: 'tavlorna'
    },
    examples: {
      indefinite: {
        swedish: 'Hon målade en vacker tavla',
        english: 'She painted a beautiful painting'
      },
      definite: {
        swedish: 'Tavlan hänger på väggen',
        english: 'The painting hangs on the wall'
      },
      indefinitePlural: {
        swedish: 'Det finns många tavlor i museet',
        english: 'There are many paintings in the museum'
      },
      definitePlural: {
        swedish: 'Tavlorna är mycket värdefulla',
        english: 'The paintings are very valuable'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
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
      indefinite: 'ett regn',
      definite: 'regnet',
      indefinitePlural: 'regn',
      definitePlural: 'regnen'
    },
    examples: {
      indefinite: {
        swedish: 'Ett lätt regn faller',
        english: 'A light rain is falling'
      },
      definite: {
        swedish: 'Regnet har slutat',
        english: 'The rain has stopped'
      },
      indefinitePlural: {
        swedish: 'Kraftiga regn väntas',
        english: 'Heavy rains are expected'
      },
      definitePlural: {
        swedish: 'Regnen kommer på hösten',
        english: 'The rains come in autumn'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: true,
      canBeWorn: false,
      canGrow: false,
      isWeather: true,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'tandborste',
    translation: 'toothbrush',
    category: 'bathroom',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
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
        swedish: 'Vi har extra tandborstar',
        english: 'We have extra toothbrushes'
      },
      definitePlural: {
        swedish: 'Tandborstarna ligger i badrummet',
        english: 'The toothbrushes are in the bathroom'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
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
        swedish: 'Han köpte en ny dator',
        english: 'He bought a new computer'
      },
      definite: {
        swedish: 'Datorn är snabb',
        english: 'The computer is fast'
      },
      indefinitePlural: {
        swedish: 'Alla datorer är upptagna',
        english: 'All computers are occupied'
      },
      definitePlural: {
        swedish: 'Datorerna behöver uppdateras',
        english: 'The computers need to be updated'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'hjärta',
    translation: 'heart',
    category: 'body parts',
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
        swedish: 'Ett hjärta slår snabbt',
        english: 'A heart beats fast'
      },
      definite: {
        swedish: 'Hjärtat är en muskel',
        english: 'The heart is a muscle'
      },
      indefinitePlural: {
        swedish: 'Deras hjärtan är starka',
        english: 'Their hearts are strong'
      },
      definitePlural: {
        swedish: 'Hjärtana slår i takt',
        english: 'The hearts beat in rhythm'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: true
    }
  },
  {
    noun: 'hylla',
    translation: 'shelf',
    category: 'furniture',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en hylla',
      definite: 'hyllan',
      indefinitePlural: 'hyllor',
      definitePlural: 'hyllorna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi behöver en ny hylla',
        english: 'We need a new shelf'
      },
      definite: {
        swedish: 'Hyllan är full med böcker',
        english: 'The shelf is full of books'
      },
      indefinitePlural: {
        swedish: 'Det finns tomma hyllor här',
        english: 'There are empty shelves here'
      },
      definitePlural: {
        swedish: 'Hyllorna är gjorda av trä',
        english: 'The shelves are made of wood'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'moln',
    translation: 'cloud',
    category: 'weather',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett moln',
      definite: 'molnet',
      indefinitePlural: 'moln',
      definitePlural: 'molnen'
    },
    examples: {
      indefinite: {
        swedish: 'Jag ser ett stort moln',
        english: 'I see a big cloud'
      },
      definite: {
        swedish: 'Molnet ser ut som en häst',
        english: 'The cloud looks like a horse'
      },
      indefinitePlural: {
        swedish: 'Det är många moln på himlen',
        english: 'There are many clouds in the sky'
      },
      definitePlural: {
        swedish: 'Molnen är mörka',
        english: 'The clouds are dark'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: true,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'spegel',
    translation: 'mirror',
    category: 'household',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en spegel',
      definite: 'spegeln',
      indefinitePlural: 'speglar',
      definitePlural: 'speglarna'
    },
    examples: {
      indefinite: {
        swedish: 'Hon köpte en ny spegel',
        english: 'She bought a new mirror'
      },
      definite: {
        swedish: 'Spegeln är smutsig',
        english: 'The mirror is dirty'
      },
      indefinitePlural: {
        swedish: 'Det finns många speglar i rummet',
        english: 'There are many mirrors in the room'
      },
      definitePlural: {
        swedish: 'Speglarna reflekterar ljuset',
        english: 'The mirrors reflect the light'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'nyckel',
    translation: 'key',
    category: 'objects',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en nyckel',
      definite: 'nyckeln',
      indefinitePlural: 'nycklar',
      definitePlural: 'nycklarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag hittade en nyckel',
        english: 'I found a key'
      },
      definite: {
        swedish: 'Nyckeln passar inte i låset',
        english: 'The key doesn\'t fit in the lock'
      },
      indefinitePlural: {
        swedish: 'Jag har många nycklar',
        english: 'I have many keys'
      },
      definitePlural: {
        swedish: 'Nycklarna ligger på bordet',
        english: 'The keys are on the table'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'öga',
    translation: 'eye',
    category: 'body parts',
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
        swedish: 'Han har bruna ögon',
        english: 'He has brown eyes'
      },
      definitePlural: {
        swedish: 'Ögonen är trötta',
        english: 'The eyes are tired'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: true
    }
  },
  {
    noun: 'tidning',
    translation: 'newspaper',
    category: 'media',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en tidning',
      definite: 'tidningen',
      indefinitePlural: 'tidningar',
      definitePlural: 'tidningarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag läser en tidning',
        english: 'I am reading a newspaper'
      },
      definite: {
        swedish: 'Tidningen kommer varje morgon',
        english: 'The newspaper comes every morning'
      },
      indefinitePlural: {
        swedish: 'Det finns många tidningar här',
        english: 'There are many newspapers here'
      },
      definitePlural: {
        swedish: 'Tidningarna är på svenska',
        english: 'The newspapers are in Swedish'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'väska',
    translation: 'bag',
    category: 'accessories',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en väska',
      definite: 'väskan',
      indefinitePlural: 'väskor',
      definitePlural: 'väskorna'
    },
    examples: {
      indefinite: {
        swedish: 'Hon har en ny väska',
        english: 'She has a new bag'
      },
      definite: {
        swedish: 'Väskan är full',
        english: 'The bag is full'
      },
      indefinitePlural: {
        swedish: 'Det finns många väskor i affären',
        english: 'There are many bags in the store'
      },
      definitePlural: {
        swedish: 'Väskorna är dyra',
        english: 'The bags are expensive'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: true,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'kudde',
    translation: 'pillow',
    category: 'furniture',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en kudde',
      definite: 'kudden',
      indefinitePlural: 'kuddar',
      definitePlural: 'kuddarna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag behöver en ny kudde',
        english: 'I need a new pillow'
      },
      definite: {
        swedish: 'Kudden är mjuk',
        english: 'The pillow is soft'
      },
      indefinitePlural: {
        swedish: 'Det finns många kuddar i soffan',
        english: 'There are many pillows on the couch'
      },
      definitePlural: {
        swedish: 'Kuddarna behöver tvättas',
        english: 'The pillows need to be washed'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'vante',
    translation: 'mitten',
    category: 'clothing',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en vante',
      definite: 'vanten',
      indefinitePlural: 'vantar',
      definitePlural: 'vantarna'
    },
    examples: {
      indefinite: {
        swedish: 'Hon tappade en vante',
        english: 'She lost a mitten'
      },
      definite: {
        swedish: 'Vanten är för liten',
        english: 'The mitten is too small'
      },
      indefinitePlural: {
        swedish: 'Jag köpte nya vantar igår',
        english: 'I bought new mittens yesterday'
      },
      definitePlural: {
        swedish: 'Vantarna är varma',
        english: 'The mittens are warm'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: true,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'paraply',
    translation: 'umbrella',
    category: 'accessories',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett paraply',
      definite: 'paraplyet',
      indefinitePlural: 'paraplyer',
      definitePlural: 'paraplyerna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag behöver ett paraply',
        english: 'I need an umbrella'
      },
      definite: {
        swedish: 'Paraplyet är sönder',
        english: 'The umbrella is broken'
      },
      indefinitePlural: {
        swedish: 'Det finns paraplyer i hallen',
        english: 'There are umbrellas in the hallway'
      },
      definitePlural: {
        swedish: 'Paraplyerna är blöta',
        english: 'The umbrellas are wet'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'kruka',
    translation: 'pot',
    category: 'garden',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en kruka',
      definite: 'krukan',
      indefinitePlural: 'krukor',
      definitePlural: 'krukorna'
    },
    examples: {
      indefinite: {
        swedish: 'Jag köpte en kruka till växten',
        english: 'I bought a pot for the plant'
      },
      definite: {
        swedish: 'Krukan är av keramik',
        english: 'The pot is made of ceramic'
      },
      indefinitePlural: {
        swedish: 'Vi har många krukor i trädgården',
        english: 'We have many pots in the garden'
      },
      definitePlural: {
        swedish: 'Krukorna står på balkongen',
        english: 'The pots are on the balcony'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'kniv',
    translation: 'knife',
    category: 'kitchen',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en kniv',
      definite: 'kniven',
      indefinitePlural: 'knivar',
      definitePlural: 'knivarna'
    },
    examples: {
      indefinite: {
        swedish: 'Kan du ge mig en kniv?',
        english: 'Can you give me a knife?'
      },
      definite: {
        swedish: 'Kniven är vass',
        english: 'The knife is sharp'
      },
      indefinitePlural: {
        swedish: 'Vi har många knivar',
        english: 'We have many knives'
      },
      definitePlural: {
        swedish: 'Knivarna ligger i lådan',
        english: 'The knives are in the drawer'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'näsa',
    translation: 'nose',
    category: 'body parts',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en näsa',
      definite: 'näsan',
      indefinitePlural: 'näsor',
      definitePlural: 'näsorna'
    },
    examples: {
      indefinite: {
        swedish: 'Han har en stor näsa',
        english: 'He has a big nose'
      },
      definite: {
        swedish: 'Näsan är röd av kylan',
        english: 'The nose is red from the cold'
      },
      indefinitePlural: {
        swedish: 'Hundar har känsliga näsor',
        english: 'Dogs have sensitive noses'
      },
      definitePlural: {
        swedish: 'Näsorna är olika på alla människor',
        english: 'The noses are different on all people'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: true
    }
  },
  {
    noun: 'måne',
    translation: 'moon',
    category: 'nature',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en måne',
      definite: 'månen',
      indefinitePlural: 'månar',
      definitePlural: 'månarna'
    },
    examples: {
      indefinite: {
        swedish: 'En måne lyser på himlen',
        english: 'A moon shines in the sky'
      },
      definite: {
        swedish: 'Månen är full ikväll',
        english: 'The moon is full tonight'
      },
      indefinitePlural: {
        swedish: 'Jupiter har många månar',
        english: 'Jupiter has many moons'
      },
      definitePlural: {
        swedish: 'Månarna kretsar runt planeten',
        english: 'The moons orbit around the planet'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'kaka',
    translation: 'cookie',
    category: 'food',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en kaka',
      definite: 'kakan',
      indefinitePlural: 'kakor',
      definitePlural: 'kakorna'
    },
    examples: {
      indefinite: {
        swedish: 'Vill du ha en kaka?',
        english: 'Would you like a cookie?'
      },
      definite: {
        swedish: 'Kakan smakar gott',
        english: 'The cookie tastes good'
      },
      indefinitePlural: {
        swedish: 'Vi bakade kakor igår',
        english: 'We baked cookies yesterday'
      },
      definitePlural: {
        swedish: 'Kakorna är nybakade',
        english: 'The cookies are freshly baked'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: true,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'strand',
    translation: 'beach',
    category: 'places',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en strand',
      definite: 'stranden',
      indefinitePlural: 'stränder',
      definitePlural: 'stränderna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi hittade en fin strand',
        english: 'We found a nice beach'
      },
      definite: {
        swedish: 'Stranden är full av människor',
        english: 'The beach is full of people'
      },
      indefinitePlural: {
        swedish: 'Det finns många stränder här',
        english: 'There are many beaches here'
      },
      definitePlural: {
        swedish: 'Stränderna är populära på sommaren',
        english: 'The beaches are popular in summer'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'fjäril',
    translation: 'butterfly',
    category: 'animals',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en fjäril',
      definite: 'fjärilen',
      indefinitePlural: 'fjärilar',
      definitePlural: 'fjärilarna'
    },
    examples: {
      indefinite: {
        swedish: 'En fjäril flög förbi',
        english: 'A butterfly flew by'
      },
      definite: {
        swedish: 'Fjärilen är vacker',
        english: 'The butterfly is beautiful'
      },
      indefinitePlural: {
        swedish: 'Det finns många fjärilar i trädgården',
        english: 'There are many butterflies in the garden'
      },
      definitePlural: {
        swedish: 'Fjärilarna dansar i luften',
        english: 'The butterflies dance in the air'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: true,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'ilska',
    translation: 'anger',
    category: 'emotions',
    difficulty: 'beginner',
    gender: 'en',
    countable: false,
    forms: {
      indefinite: 'en ilska',
      definite: 'ilskan',
      indefinitePlural: '-',
      definitePlural: '-'
    },
    examples: {
      indefinite: {
        swedish: 'Han kände en stor ilska',
        english: 'He felt a great anger'
      },
      definite: {
        swedish: 'Ilskan växte inom honom',
        english: 'The anger grew within him'
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
      canBeSeen: false,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'vår',
    translation: 'spring',
    category: 'seasons',
    difficulty: 'beginner',
    gender: 'en',
    countable: false,
    forms: {
      indefinite: 'en vår',
      definite: 'våren',
      indefinitePlural: 'vårar',
      definitePlural: 'vårarna'
    },
    examples: {
      indefinite: {
        swedish: 'Det blir en varm vår',
        english: 'It will be a warm spring'
      },
      definite: {
        swedish: 'Våren kommer tidigt i år',
        english: 'Spring is coming early this year'
      },
      indefinitePlural: {
        swedish: 'Vi har upplevt många vårar tillsammans',
        english: 'We have experienced many springs together'
      },
      definitePlural: {
        swedish: 'Vårarna blir varmare',
        english: 'The springs are getting warmer'
      }
    },
    semantics: {
      canBeSeen: false,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'ingenjör',
    translation: 'engineer',
    category: 'professions',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en ingenjör',
      definite: 'ingenjören',
      indefinitePlural: 'ingenjörer',
      definitePlural: 'ingenjörerna'
    },
    examples: {
      indefinite: {
        swedish: 'Hon är en duktig ingenjör',
        english: 'She is a skilled engineer'
      },
      definite: {
        swedish: 'Ingenjören löste problemet',
        english: 'The engineer solved the problem'
      },
      indefinitePlural: {
        swedish: 'Vi behöver fler ingenjörer',
        english: 'We need more engineers'
      },
      definitePlural: {
        swedish: 'Ingenjörerna arbetar på projektet',
        english: 'The engineers are working on the project'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: true,
      natural: false,
      canBeBought: false,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'trumma',
    translation: 'drum',
    category: 'music',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en trumma',
      definite: 'trumman',
      indefinitePlural: 'trummor',
      definitePlural: 'trummorna'
    },
    examples: {
      indefinite: {
        swedish: 'Han spelar en trumma',
        english: 'He plays a drum'
      },
      definite: {
        swedish: 'Trumman låter högt',
        english: 'The drum sounds loud'
      },
      indefinitePlural: {
        swedish: 'Hon har många trummor',
        english: 'She has many drums'
      },
      definitePlural: {
        swedish: 'Trummorna står i hörnet',
        english: 'The drums are in the corner'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'fotboll',
    translation: 'football/soccer',
    category: 'sports',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en fotboll',
      definite: 'fotbollen',
      indefinitePlural: 'fotbollar',
      definitePlural: 'fotbollarna'
    },
    examples: {
      indefinite: {
        swedish: 'Vi behöver en ny fotboll',
        english: 'We need a new football'
      },
      definite: {
        swedish: 'Fotbollen är punkterad',
        english: 'The football is flat'
      },
      indefinitePlural: {
        swedish: 'Det finns fotbollar i gymnastiksalen',
        english: 'There are footballs in the gym'
      },
      definitePlural: {
        swedish: 'Fotbollarna måste pumpas',
        english: 'The footballs need to be pumped'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'suddgummi',
    translation: 'eraser',
    category: 'school',
    difficulty: 'beginner',
    gender: 'ett',
    countable: true,
    forms: {
      indefinite: 'ett suddgummi',
      definite: 'suddgummit',
      indefinitePlural: 'suddgummin',
      definitePlural: 'suddgummina'
    },
    examples: {
      indefinite: {
        swedish: 'Kan jag låna ett suddgummi?',
        english: 'Can I borrow an eraser?'
      },
      definite: {
        swedish: 'Suddgummit är nytt',
        english: 'The eraser is new'
      },
      indefinitePlural: {
        swedish: 'Vi har många suddgummin',
        english: 'We have many erasers'
      },
      definitePlural: {
        swedish: 'Suddgummina ligger i pennskålen',
        english: 'The erasers are in the pencil holder'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'surfplatta',
    translation: 'tablet',
    category: 'electronics',
    difficulty: 'beginner',
    gender: 'en',
    countable: true,
    forms: {
      indefinite: 'en surfplatta',
      definite: 'surfplattan',
      indefinitePlural: 'surfplattor',
      definitePlural: 'surfplattorna'
    },
    examples: {
      indefinite: {
        swedish: 'Hon köpte en ny surfplatta',
        english: 'She bought a new tablet'
      },
      definite: {
        swedish: 'Surfplattan är laddad',
        english: 'The tablet is charged'
      },
      indefinitePlural: {
        swedish: 'Skolan har många surfplattor',
        english: 'The school has many tablets'
      },
      definitePlural: {
        swedish: 'Surfplattorna används i klassrummet',
        english: 'The tablets are used in the classroom'
      }
    },
    semantics: {
      canBeSeen: true,
      canBeFound: true,
      animate: false,
      natural: false,
      canBeBought: true,
      canBeUsedAtWork: true,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: true,
      bodyPart: false
    }
  },
  {
    noun: 'glädje',
    translation: 'joy',
    category: 'emotions',
    difficulty: 'beginner',
    gender: 'en',
    countable: false,
    forms: {
      indefinite: 'en glädje',
      definite: 'glädjen',
      indefinitePlural: '-',
      definitePlural: '-'
    },
    examples: {
      indefinite: {
        swedish: 'Hon kände en stor glädje',
        english: 'She felt a great joy'
      },
      definite: {
        swedish: 'Glädjen lyste i hennes ögon',
        english: 'The joy shone in her eyes'
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
      canBeSeen: false,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: true,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  },
  {
    noun: 'höst',
    translation: 'autumn/fall',
    category: 'seasons',
    difficulty: 'beginner',
    gender: 'en',
    countable: false,
    forms: {
      indefinite: 'en höst',
      definite: 'hösten',
      indefinitePlural: 'höstar',
      definitePlural: 'höstarna'
    },
    examples: {
      indefinite: {
        swedish: 'Det blir en kall höst',
        english: 'It will be a cold autumn'
      },
      definite: {
        swedish: 'Hösten är min favoritsäsong',
        english: 'Autumn is my favorite season'
      },
      indefinitePlural: {
        swedish: 'Vi har upplevt många höstar här',
        english: 'We have experienced many autumns here'
      },
      definitePlural: {
        swedish: 'Höstarna blir kortare',
        english: 'The autumns are getting shorter'
      }
    },
    semantics: {
      canBeSeen: false,
      canBeFound: true,
      animate: false,
      natural: true,
      canBeBought: false,
      canBeUsedAtWork: false,
      canBeConsumed: false,
      canBeWorn: false,
      canGrow: false,
      isWeather: false,
      canBeBorrowed: false,
      bodyPart: false
    }
  }
]);