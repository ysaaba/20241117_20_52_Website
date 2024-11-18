import type { VerbData } from '../types';
import { getVerbContext } from './verbContexts';

export function getContextualExample(verb: VerbData, tense: 'present' | 'past' | 'supine') {
  const context = getVerbContext(verb);
  
  const examples = {
    present: { 
      swedish: `${context.subject.sv} ${verb.present} ${context.complement.sv}${context.timeExpression.present.sv}`,
      english: `${context.subject.en} ${verb.translation}${context.verb.presentSuffix || 's'} ${context.complement.en}${context.timeExpression.present.en}`
    },
    past: { 
      swedish: `${context.subject.sv} ${verb.past} ${context.complement.sv}${context.timeExpression.past.sv}`,
      english: `${context.subject.en} ${verb.translation}${context.verb.pastSuffix || 'ed'} ${context.complement.en}${context.timeExpression.past.en}`
    },
    supine: { 
      swedish: `${context.subject.sv} har ${verb.supine} ${context.complement.sv}${context.timeExpression.supine.sv}`,
      english: `${context.subject.en} has ${verb.translation}${context.verb.supineSuffix || 'ed'} ${context.complement.en}${context.timeExpression.supine.en}`
    }
  };

  return examples[tense];
}