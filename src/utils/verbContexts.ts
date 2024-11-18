import type { VerbData } from '../types';

interface VerbContext {
  subject: { sv: string; en: string };
  complement: { sv: string; en: string };
  timeExpression: {
    present: { sv: string; en: string };
    past: { sv: string; en: string };
    supine: { sv: string; en: string };
  };
  verb: {
    presentSuffix?: string;
    pastSuffix?: string;
    supineSuffix?: string;
  };
}

const defaultContext: VerbContext = {
  subject: { sv: 'jag', en: 'I' },
  complement: { sv: '', en: '' },
  timeExpression: {
    present: { sv: ' varje dag', en: ' every day' },
    past: { sv: ' igår', en: ' yesterday' },
    supine: { sv: ' många gånger', en: ' many times' }
  },
  verb: {}
};

const contextMap: Record<string, Record<string, VerbContext>> = {
  movement: {
    springa: {
      subject: { sv: 'hon', en: 'she' },
      complement: { sv: 'i parken', en: 'in the park' },
      timeExpression: {
        present: { sv: ' varje morgon', en: ' every morning' },
        past: { sv: ' igår kväll', en: ' last night' },
        supine: { sv: ' i två timmar', en: ' for two hours' }
      },
      verb: {}
    },
    simma: {
      subject: { sv: 'de', en: 'they' },
      complement: { sv: 'i havet', en: 'in the ocean' },
      timeExpression: {
        present: { sv: ' på sommaren', en: ' in the summer' },
        past: { sv: ' förra helgen', en: ' last weekend' },
        supine: { sv: ' hela eftermiddagen', en: ' all afternoon' }
      },
      verb: {}
    }
  },
  communication: {
    prata: {
      subject: { sv: 'vi', en: 'we' },
      complement: { sv: 'om framtiden', en: 'about the future' },
      timeExpression: {
        present: { sv: ' ofta', en: ' often' },
        past: { sv: ' i flera timmar', en: ' for several hours' },
        supine: { sv: ' hela kvällen', en: ' all evening' }
      },
      verb: {}
    },
    skriva: {
      subject: { sv: 'han', en: 'he' },
      complement: { sv: 'en roman', en: 'a novel' },
      timeExpression: {
        present: { sv: ' för närvarande', en: ' currently' },
        past: { sv: ' förra året', en: ' last year' },
        supine: { sv: ' i många år', en: ' for many years' }
      },
      verb: {}
    }
  },
  academic: {
    studera: {
      subject: { sv: 'hon', en: 'she' },
      complement: { sv: 'på universitetet', en: 'at the university' },
      timeExpression: {
        present: { sv: ' den här terminen', en: ' this semester' },
        past: { sv: ' i tre år', en: ' for three years' },
        supine: { sv: ' sedan gymnasiet', en: ' since high school' }
      },
      verb: {}
    },
    forska: {
      subject: { sv: 'de', en: 'they' },
      complement: { sv: 'i medicin', en: 'in medicine' },
      timeExpression: {
        present: { sv: ' vid institutet', en: ' at the institute' },
        past: { sv: ' under projektet', en: ' during the project' },
        supine: { sv: ' i flera år', en: ' for several years' }
      },
      verb: {}
    }
  },
  technology: {
    programmera: {
      subject: { sv: 'jag', en: 'I' },
      complement: { sv: 'en ny app', en: 'a new app' },
      timeExpression: {
        present: { sv: ' just nu', en: ' right now' },
        past: { sv: ' hela helgen', en: ' all weekend' },
        supine: { sv: ' i flera månader', en: ' for several months' }
      },
      verb: {}
    },
    utveckla: {
      subject: { sv: 'teamet', en: 'the team' },
      complement: { sv: 'mjukvaran', en: 'the software' },
      timeExpression: {
        present: { sv: ' denna sprint', en: ' this sprint' },
        past: { sv: ' förra kvartalet', en: ' last quarter' },
        supine: { sv: ' sedan projektstart', en: ' since project start' }
      },
      verb: {}
    }
  },
  arts: {
    måla: {
      subject: { sv: 'konstnären', en: 'the artist' },
      complement: { sv: 'ett porträtt', en: 'a portrait' },
      timeExpression: {
        present: { sv: ' i sin ateljé', en: ' in their studio' },
        past: { sv: ' under utställningen', en: ' during the exhibition' },
        supine: { sv: ' i flera veckor', en: ' for several weeks' }
      },
      verb: {}
    },
    skulptera: {
      subject: { sv: 'hon', en: 'she' },
      complement: { sv: 'i marmor', en: 'in marble' },
      timeExpression: {
        present: { sv: ' med stor precision', en: ' with great precision' },
        past: { sv: ' för museet', en: ' for the museum' },
        supine: { sv: ' i många år', en: ' for many years' }
      },
      verb: {}
    }
  },
  social: {
    träffas: {
      subject: { sv: 'vännerna', en: 'the friends' },
      complement: { sv: 'på caféet', en: 'at the café' },
      timeExpression: {
        present: { sv: ' varje fredag', en: ' every Friday' },
        past: { sv: ' för lunch', en: ' for lunch' },
        supine: { sv: ' regelbundet', en: ' regularly' }
      },
      verb: {}
    },
    fira: {
      subject: { sv: 'familjen', en: 'the family' },
      complement: { sv: 'födelsedagen', en: 'the birthday' },
      timeExpression: {
        present: { sv: ' tillsammans', en: ' together' },
        past: { sv: ' i helgen', en: ' on the weekend' },
        supine: { sv: ' med stor glädje', en: ' with great joy' }
      },
      verb: {}
    }
  },
  work: {
    arbeta: {
      subject: { sv: 'hon', en: 'she' },
      complement: { sv: 'på kontoret', en: 'at the office' },
      timeExpression: {
        present: { sv: ' heltid', en: ' full-time' },
        past: { sv: ' sent igår', en: ' late yesterday' },
        supine: { sv: ' sedan januari', en: ' since January' }
      },
      verb: {}
    },
    presentera: {
      subject: { sv: 'chefen', en: 'the manager' },
      complement: { sv: 'resultaten', en: 'the results' },
      timeExpression: {
        present: { sv: ' för styrelsen', en: ' for the board' },
        past: { sv: ' på mötet', en: ' at the meeting' },
        supine: { sv: ' flera gånger', en: ' several times' }
      },
      verb: {}
    }
  }
};

export function getVerbContext(verb: VerbData): VerbContext {
  return contextMap[verb.category]?.[verb.verb] || defaultContext;
}