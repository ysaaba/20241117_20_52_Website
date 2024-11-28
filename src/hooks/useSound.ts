import { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    responsiveVoice: {
      speak: (text: string, voice: string, options?: object) => void;
      isPlaying: () => boolean;
      cancel: () => void;
      voiceSupport: () => boolean;
      init: () => void;
    };
  }
}

export const useSound = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if ResponsiveVoice is available
    const checkVoiceAvailability = () => {
      if (window.responsiveVoice && window.responsiveVoice.voiceSupport()) {
        setIsReady(true);
      }
    };

    // Check immediately
    checkVoiceAvailability();

    // Also check after a short delay to ensure initialization
    const timeoutId = setTimeout(checkVoiceAvailability, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const playAudio = useCallback((text: string) => {
    if (!isReady || !window.responsiveVoice) {
      console.warn('ResponsiveVoice is not ready yet');
      return;
    }

    try {
      // Cancel any currently playing speech
      if (window.responsiveVoice.isPlaying()) {
        window.responsiveVoice.cancel();
      }
      
      // Speak the text in Swedish
      window.responsiveVoice.speak(text, "Swedish Male", {
        pitch: 1,
        rate: 0.9,
        volume: 1,
        onend: () => console.log('Speech completed')
      });
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }, [isReady]);

  return {
    playAudio,
    isReady
  };
};