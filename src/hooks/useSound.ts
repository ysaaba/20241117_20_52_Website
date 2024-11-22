import { useCallback } from 'react';
import { useResponsiveVoice } from './useResponsiveVoice';

export function useSound() {
  const { speak, speaking, initialized } = useResponsiveVoice('Swedish Male');

  const playSound = (questionPart: string) => {
    if (!initialized || speaking) return;
    speak(questionPart);
  };

  return { playSound, speaking };
}