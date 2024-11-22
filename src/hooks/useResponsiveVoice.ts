import { useState, useEffect } from 'react';

declare global {
  interface Window {
    responsiveVoice: {
      speak: (
        text: string,
        voice: string,
        options?: {
          pitch?: number;
          rate?: number;
          volume?: number;
          onstart?: () => void;
          onend?: () => void;
        }
      ) => void;
      cancel: () => void;
      voiceSupport: () => boolean;
      isPlaying: () => boolean;
      init?: () => void;
    };
  }
}

export function useResponsiveVoice(voice: string = 'Swedish Male') {
  const [speaking, setSpeaking] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check if ResponsiveVoice is available
    const checkResponsiveVoice = () => {
      if (typeof window.responsiveVoice !== 'undefined' && window.responsiveVoice.voiceSupport()) {
        console.log('ResponsiveVoice is available and supported');
        if (typeof window.responsiveVoice.init === 'function') {
          window.responsiveVoice.init();
        }
        setInitialized(true);
      } else {
        console.warn('ResponsiveVoice not found or not supported, retrying in 1 second...');
        setTimeout(checkResponsiveVoice, 1000);
      }
    };

    checkResponsiveVoice();

    return () => {
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
    };
  }, []);

  const speak = (text: string) => {
    if (!window.responsiveVoice || !initialized) {
      console.error('ResponsiveVoice is not loaded or initialized');
      return;
    }

    console.log('Speaking:', text, 'with voice:', voice);

    if (speaking) {
      window.responsiveVoice.cancel();
    }

    try {
      window.responsiveVoice.speak(text, voice, {
        pitch: 1,
        rate: 0.8,
        volume: 1,
        onstart: () => {
          console.log('Speech started');
          setSpeaking(true);
        },
        onend: () => {
          console.log('Speech ended');
          setSpeaking(false);
        },
      });
    } catch (error) {
      console.error('Error speaking:', error);
      setSpeaking(false);
    }
  };

  const cancel = () => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
      setSpeaking(false);
    }
  };

  return {
    speak,
    cancel,
    speaking,
    initialized,
  };
}
