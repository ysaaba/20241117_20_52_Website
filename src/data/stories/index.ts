export * from './types';
export { enDagIParken } from './en-dag-i-parken';
export { frukostPaCafe } from './frukost-pa-cafe';
export { midsommarFirande } from './midsommar-firande';
export { vandringISkogen } from './vandring-i-skogen';
export { julFirande } from './jul-firande';
export { musikfestival } from './musikfestival';
export { paKontoret } from './pa-kontoret';
export { studentLiv } from './student-liv';
export { sommarstugan } from './sommarstugan';

import { Story } from './types';
import { enDagIParken } from './en-dag-i-parken';
import { frukostPaCafe } from './frukost-pa-cafe';
import { midsommarFirande } from './midsommar-firande';
import { vandringISkogen } from './vandring-i-skogen';
import { julFirande } from './jul-firande';
import { musikfestival } from './musikfestival';
import { paKontoret } from './pa-kontoret';
import { studentLiv } from './student-liv';
import { sommarstugan } from './sommarstugan';

export const stories: Story[] = [
  enDagIParken,
  frukostPaCafe,
  midsommarFirande,
  vandringISkogen,
  julFirande,
  musikfestival,
  paKontoret,
  studentLiv,
  sommarstugan,
];
