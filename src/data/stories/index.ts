export * from './types';
export { enDagIParken } from './en-dag-i-parken';
export { frukostPaCafe } from './frukost-pa-cafe';
export { midsommarFirande } from './midsommar-firande';
export { vandringISkogen } from './vandring-i-skogen';

import { Story } from './types';
import { enDagIParken } from './en-dag-i-parken';
import { frukostPaCafe } from './frukost-pa-cafe';
import { midsommarFirande } from './midsommar-firande';
import { vandringISkogen } from './vandring-i-skogen';

export const stories: Story[] = [
  enDagIParken,
  frukostPaCafe,
  midsommarFirande,
  vandringISkogen,
];
