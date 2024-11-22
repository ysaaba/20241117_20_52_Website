import React, { useState } from 'react';
import { 
  TextQuote, 
  Pencil, 
  Languages, 
  GraduationCap, 
  Home, 
  ChevronDown, 
  Dumbbell,
  BookA,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExerciseType } from '../types';

interface NavbarProps {
  selectedType: ExerciseType;
  onSelectType: (type: ExerciseType) => void;
}

interface DropdownState {
  learn: boolean;
  practice: boolean;
}

export function Navbar({ selectedType, onSelectType }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    learn: false,
    practice: false
  });

  const isLandingPage = selectedType === 'landing';

  const handleDropdownToggle = (dropdown: keyof DropdownState) => {
    setDropdownOpen(prev => ({
      learn: false,
      practice: false,
      [dropdown]: !prev[dropdown]
    }));
  };

  const closeDropdowns = () => {
    setDropdownOpen({ learn: false, practice: false });
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const chevronVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      isLandingPage ? 'bg-transparent backdrop-blur-sm bg-blue-900/10' : 'bg-white shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => {
                onSelectType('landing');
                closeDropdowns();
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedType === 'landing'
                  ? isLandingPage 
                    ? 'bg-white/10 text-white' 
                    : 'bg-blue-50 text-blue-700'
                  : isLandingPage
                    ? 'text-white/80 hover:bg-white/10 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            {/* Navigation Items */}
            <div className="flex space-x-4">
              {/* Learn Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('learn')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isLandingPage
                      ? 'text-white/80 hover:bg-white/10 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  Learn
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                    dropdownOpen.learn ? 'rotate-180' : ''
                  }`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen.learn && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            onSelectType('adjectives');
                            closeDropdowns();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Languages className="w-4 h-4" />
                            Adjectives
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            onSelectType('adverbs');
                            closeDropdowns();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Adverbs
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            onSelectType('nouns');
                            closeDropdowns();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <TextQuote className="w-4 h-4" />
                            Nouns
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Practice Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('practice')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isLandingPage
                      ? 'text-white/80 hover:bg-white/10 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Dumbbell className="w-4 h-4" />
                  Practice
                  <motion.div
                    variants={chevronVariants}
                    animate={dropdownOpen.practice ? 'open' : 'closed'}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {dropdownOpen.practice && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            onSelectType('verbGroups');
                            closeDropdowns();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <Pencil className="w-4 h-4" />
                            Verbs
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            onSelectType('articles');
                            closeDropdowns();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <BookA className="w-4 h-4" />
                            Articles
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            onSelectType('quiz');
                            closeDropdowns();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Quiz
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            onSelectType('stories');
                            closeDropdowns();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Stories
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}