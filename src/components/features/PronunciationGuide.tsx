import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronDown, ChevronUp, X } from 'lucide-react';

declare global {
  interface Window {
    responsiveVoice: {
      speak: (text: string, voice: string, options?: {
        pitch: number;
        rate: number;
        volume: number;
      }) => void;
      isPlaying: () => boolean;
      cancel: () => void;
      voiceSupport: () => boolean;
      init: () => void;
    };
  }
}

interface SoundExample {
  symbol: string;
  ipa: string;
  description: string;
  examples: {
    swedish: string;
    english: string;
    ipa: string;
  }[];
}

const vowelSounds: SoundExample[] = [
  {
    symbol: 'a',
    ipa: '/ɑː/, /a/',
    description: 'Like "a" in "father" (long) or "cat" (short)',
    examples: [
      { swedish: 'tal', english: 'speech', ipa: '/tɑːl/' },
      { swedish: 'katt', english: 'cat', ipa: '/kat/' }
    ]
  },
  {
    symbol: 'e',
    ipa: '/eː/, /ɛ/',
    description: 'Like "ay" in "say" (long) or "e" in "bed" (short)',
    examples: [
      { swedish: 'se', english: 'see', ipa: '/seː/' },
      { swedish: 'hem', english: 'home', ipa: '/hɛm/' }
    ]
  },
  {
    symbol: 'i',
    ipa: '/iː/, /ɪ/',
    description: 'Like "ee" in "see" (long) or "i" in "bit" (short)',
    examples: [
      { swedish: 'vi', english: 'we', ipa: '/viː/' },
      { swedish: 'sitt', english: 'sit', ipa: '/sɪt/' }
    ]
  },
  {
    symbol: 'o',
    ipa: '/uː/, /ɔ/',
    description: 'Like "oo" in "food" (long) or "o" in "hot" (short)',
    examples: [
      { swedish: 'bo', english: 'live', ipa: '/buː/' },
      { swedish: 'bott', english: 'lived', ipa: '/bɔt/' }
    ]
  },
  {
    symbol: 'u',
    ipa: '/ʉː/, /ɵ/',
    description: 'No English equivalent, rounded lips with high tongue position',
    examples: [
      { swedish: 'hus', english: 'house', ipa: '/hʉːs/' },
      { swedish: 'full', english: 'full', ipa: '/fɵl/' }
    ]
  },
  {
    symbol: 'y',
    ipa: '/yː/, /ʏ/',
    description: 'Like German "ü", rounded lips while saying "ee"',
    examples: [
      { swedish: 'ny', english: 'new', ipa: '/nyː/' },
      { swedish: 'flytta', english: 'move', ipa: '/ˈflʏta/' }
    ]
  },
  {
    symbol: 'å',
    ipa: '/oː/, /ɔ/',
    description: 'Like "o" in "more" (long) or "o" in "bought" (short)',
    examples: [
      { swedish: 'år', english: 'year', ipa: '/oːr/' },
      { swedish: 'håll', english: 'hold', ipa: '/hɔl/' }
    ]
  },
  {
    symbol: 'ä',
    ipa: '/ɛː/, /ɛ/',
    description: 'Like "ai" in "fair" (long) or "e" in "bed" (short)',
    examples: [
      { swedish: 'ära', english: 'honor', ipa: '/ˈɛːra/' },
      { swedish: 'häst', english: 'horse', ipa: '/hɛst/' }
    ]
  },
  {
    symbol: 'ö',
    ipa: '/øː/, /œ/',
    description: 'Like German "ö", rounded lips while saying "ai" in "fair"',
    examples: [
      { swedish: 'öl', english: 'beer', ipa: '/øːl/' },
      { swedish: 'höst', english: 'autumn', ipa: '/hœst/' }
    ]
  }
];

const consonantSounds: SoundExample[] = [
  {
    symbol: 'sj',
    ipa: '/ɧ/',
    description: 'A unique Swedish sound, similar to "sh" but more back in the mouth',
    examples: [
      { swedish: 'sjö', english: 'lake', ipa: '/ɧøː/' },
      { swedish: 'sju', english: 'seven', ipa: '/ɧʉː/' }
    ]
  },
  {
    symbol: 'tj',
    ipa: '/ɕ/',
    description: 'Similar to "ch" in "cheese" but softer',
    examples: [
      { swedish: 'tjej', english: 'girl', ipa: '/ɕej/' },
      { swedish: 'kjol', english: 'skirt', ipa: '/ɕuːl/' }
    ]
  },
  {
    symbol: 'rs',
    ipa: '/ʂ/',
    description: 'Retroflex "sh" sound when "r" and "s" combine',
    examples: [
      { swedish: 'fars', english: 'father\'s', ipa: '/faʂ/' },
      { swedish: 'kors', english: 'cross', ipa: '/kɔʂ/' }
    ]
  },
  {
    symbol: 'rt',
    ipa: '/ʈ/',
    description: 'Retroflex "t" sound when "r" and "t" combine',
    examples: [
      { swedish: 'karta', english: 'map', ipa: '/ˈkɑːʈa/' },
      { swedish: 'svart', english: 'black', ipa: '/svaʈ/' }
    ]
  },
  {
    symbol: 'rd',
    ipa: '/ɖ/',
    description: 'Retroflex "d" sound when "r" and "d" combine',
    examples: [
      { swedish: 'bord', english: 'table', ipa: '/buːɖ/' },
      { swedish: 'gård', english: 'yard', ipa: '/goːɖ/' }
    ]
  }
];

interface Props {
  onClose?: () => void;
}

const PronunciationGuide: React.FC<Props> = ({ onClose }) => {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'vowels' | 'consonants'>('vowels');
  const [voiceReady, setVoiceReady] = useState(false);

  useEffect(() => {
    // Load ResponsiveVoice script
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=u9E3wZGX';
    script.async = true;
    script.onload = () => setVoiceReady(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.responsiveVoice) {
        window.responsiveVoice.cancel();
      }
    };
  }, []);

  const handleSpeak = (text: string) => {
    if (voiceReady && window.responsiveVoice) {
      window.responsiveVoice.speak(text, 'Swedish Male', {
        pitch: 1,
        rate: 0.9,
        volume: 1
      });
    }
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Swedish Pronunciation Guide
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
          aria-label="Close pronunciation guide"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('vowels')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'vowels'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Vowels
        </button>
        <button
          onClick={() => setActiveTab('consonants')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'consonants'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Consonants
        </button>
      </div>

      <div className="space-y-4">
        {(activeTab === 'vowels' ? vowelSounds : consonantSounds).map((sound) => (
          <motion.div
            key={sound.symbol}
            className="border rounded-lg overflow-hidden"
            initial={false}
          >
            <button
              onClick={() => setSelectedSound(selectedSound === sound.symbol ? null : sound.symbol)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-4">
                <span className="text-xl font-medium">{sound.symbol}</span>
                <span className="text-sm text-gray-500">{sound.ipa}</span>
              </div>
              {selectedSound === sound.symbol ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>

            <AnimatePresence>
              {selectedSound === sound.symbol && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 border-t">
                    <p className="text-gray-700 mb-4">{sound.description}</p>
                    
                    <div className="space-y-3">
                      {sound.examples.map((example, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                        >
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-green-600">{example.swedish}</span>
                              <button
                                onClick={() => handleSpeak(example.swedish)}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Listen to pronunciation"
                              >
                                <Volume2 className="h-5 w-5" />
                              </button>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              <span className="mr-2">{example.ipa}</span>
                              <span>({example.english})</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-md">
        <h3 className="font-medium text-blue-900 mb-2">Pro Tips:</h3>
        <ul className="list-disc list-inside space-y-1 text-blue-800">
          <li>Long vowels typically occur in stressed syllables</li>
          <li>Short vowels are followed by two consonants</li>
          <li>Practice with native audio to perfect your pronunciation</li>
          <li>Pay special attention to unique Swedish sounds like 'sj' and 'tj'</li>
        </ul>
      </div>
    </div>
  );
};

export default PronunciationGuide;
