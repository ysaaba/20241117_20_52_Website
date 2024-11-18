import { cognition } from './verbs/cognition';
import { communication } from './verbs/communication';
import { consumption } from './verbs/consumption';
import { creation } from './verbs/creation';
import { emotion } from './verbs/emotion';
import { movement } from './verbs/movement';
import { perception } from './verbs/perception';
import { possession } from './verbs/possession';
import { academic } from './verbs/academic';
import { technology } from './verbs/technology';
import { arts } from './verbs/arts';
import { social } from './verbs/social';
import { work } from './verbs/work';
import { household } from './verbs/household';
import { daily } from './verbs/daily';

export const verbs = [
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
  ...household,
  ...daily
];