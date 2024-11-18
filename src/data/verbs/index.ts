import { movement } from './movement';
import { communication } from './communication';
import { cognition } from './cognition';
import { perception } from './perception';
import { consumption } from './consumption';
import { creation } from './creation';
import { emotion } from './emotion';
import { possession } from './possession';
import { academic } from './academic';
import { technology } from './technology';
import { arts } from './arts';
import { social } from './social';
import { work } from './work';
import { nature } from './nature';
import { household } from './household';
import { daily } from './daily';

// Combine all verb categories and ensure uniqueness by verb name
const allVerbs = [
  ...movement,
  ...communication,
  ...cognition,
  ...perception,
  ...consumption,
  ...creation,
  ...emotion,
  ...possession,
  ...academic,
  ...technology,
  ...arts,
  ...social,
  ...work,
  ...nature,
  ...household,
  ...daily
];

// Remove duplicates by keeping only the first occurrence of each verb
export const verbs = Array.from(
  new Map(allVerbs.map((verb) => [verb.verb, verb])).values()
);