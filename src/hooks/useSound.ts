import { useCallback } from 'react';

export const useSound = () => {
  const playAudio = useCallback((text: string) => {
    // Create a new SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set Swedish language
    utterance.lang = 'sv-SE';
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  }, []);

  return {
    playAudio
  };
};