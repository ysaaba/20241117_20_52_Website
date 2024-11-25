import { useCallback } from 'react';
import { useResponsiveVoice } from './useResponsiveVoice';

export function useSound() {
  const { speak, speaking, initialized } = useResponsiveVoice('Swedish Male');

  const playSound = useCallback((questionPart: string) => {
    if (!initialized || speaking) return;
    speak(questionPart);
  }, [initialized, speaking, speak]);

  return { playSound, speaking };
}