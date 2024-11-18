import { useCallback } from 'react';

export function useSound() {
  const playAudio = useCallback(async (text: string, lang: string = 'Swedish Male') => {
    try {
      // Add this script to your index.html:
      // <script src="https://code.responsivevoice.org/responsivevoice.js?key=YOUR_FREE_KEY"></script>
      
      const questionPart = text.split('___')[0];
      // @ts-ignore (since ResponsiveVoice is added via global script)
      window.responsiveVoice.speak(questionPart, lang);
    } catch (error) {
      console.error('TTS failed:', error);
    }
  }, []);

  return { playAudio };
}