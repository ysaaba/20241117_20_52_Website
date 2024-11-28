export interface VerbData {
  verb: string;
  group: 1 | 2 | 3 | 4;
  present: string;
  past: string;
  supine: string;
  translation: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  examples?: {
    present?: { swedish: string; english: string };
    past?: { swedish: string; english: string };
    supine?: { swedish: string; english: string };
  };
}
