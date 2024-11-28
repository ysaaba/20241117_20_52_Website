import type { VerbData } from '../types';

const irregularVerbs: Record<string, { past: string; supine: string }> = {
  'run': { past: 'ran', supine: 'run' },
  'speak': { past: 'spoke', supine: 'spoken' },
  'think': { past: 'thought', supine: 'thought' },
  'swim': { past: 'swam', supine: 'swum' },
  'drink': { past: 'drank', supine: 'drunk' },
  'sing': { past: 'sang', supine: 'sung' },
  'write': { past: 'wrote', supine: 'written' },
  'eat': { past: 'ate', supine: 'eaten' },
  'take': { past: 'took', supine: 'taken' },
  'give': { past: 'gave', supine: 'given' }
};

const getVerbForm = (verb: string, tense: 'present' | 'past' | 'supine'): string => {
  const irregular = irregularVerbs[verb];
  if (!irregular) {
    return tense === 'present' ? verb + 's' : verb + 'ed';
  }
  return tense === 'present' ? verb + 's' : irregular[tense];
};

export function getContextualExample(verb: VerbData, tense: 'present' | 'past' | 'supine') {
  const examples = {
    movement: {
      present: { swedish: `Hon ${verb.present} i parken varje morgon.`, english: `She ${getVerbForm(verb.translation, 'present')} in the park every morning.` },
      past: { swedish: `Hon ${verb.past} i parken igår kväll.`, english: `She ${getVerbForm(verb.translation, 'past')} in the park last night.` },
      supine: { swedish: `Hon har ${verb.supine} i parken i två timmar.`, english: `She has ${getVerbForm(verb.translation, 'supine')} in the park for two hours.` }
    },
    communication: {
      present: { swedish: `Han ${verb.present} med sin vän på svenska.`, english: `He ${getVerbForm(verb.translation, 'present')} with his friend in Swedish.` },
      past: { swedish: `De ${verb.past} i telefon igår.`, english: `They ${getVerbForm(verb.translation, 'past')} on the phone yesterday.` },
      supine: { swedish: `Vi har ${verb.supine} om vädret.`, english: `We have ${getVerbForm(verb.translation, 'supine')} about the weather.` }
    },
    cognition: {
      present: { swedish: `Jag ${verb.present} på mitt arbete.`, english: `I ${verb.translation} about my work.` },
      past: { swedish: `Hon ${verb.past} på svaret länge.`, english: `She ${getVerbForm(verb.translation, 'past')} about the answer for a long time.` },
      supine: { swedish: `De har ${verb.supine} på saken hela dagen.`, english: `They have ${getVerbForm(verb.translation, 'supine')} about the matter all day.` }
    },
    emotion: {
      present: { swedish: `Barnet ${verb.present} när det får glass.`, english: `The child ${getVerbForm(verb.translation, 'present')} when they get ice cream.` },
      past: { swedish: `Han ${verb.past} när han fick bra nyheter.`, english: `He ${getVerbForm(verb.translation, 'past')} when he got good news.` },
      supine: { swedish: `Hon har ${verb.supine} mycket idag.`, english: `She has ${getVerbForm(verb.translation, 'supine')} a lot today.` }
    }
  };

  const defaultExample = {
    present: { swedish: `Vi ${verb.present} varje dag.`, english: `We ${verb.translation} every day.` },
    past: { swedish: `De ${verb.past} igår.`, english: `They ${getVerbForm(verb.translation, 'past')} yesterday.` },
    supine: { swedish: `Jag har ${verb.supine} hela veckan.`, english: `I have ${getVerbForm(verb.translation, 'supine')} all week.` }
  };

  return examples[verb.category as keyof typeof examples]?.[tense] || defaultExample[tense];
}