import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ExerciseType } from '../types';

const pathToType: Record<string, ExerciseType> = {
  '/': 'landing',
  '/stories': 'stories',
  '/articles': 'articles',
  '/verbs': 'verbGroups',
  '/adjectives': 'adjectives',
  '/adverbs': 'adverbs',
  '/nouns': 'nouns',
  '/quiz': 'quiz'
};

const typeToPath: Record<ExerciseType, string> = {
  'landing': '/',
  'stories': '/stories',
  'articles': '/articles',
  'verbGroups': '/verbs',
  'adjectives': '/adjectives',
  'adverbs': '/adverbs',
  'nouns': '/nouns',
  'quiz': '/quiz'
};

export function useRouteState(
  selectedType: ExerciseType,
  setSelectedType: (type: ExerciseType) => void
) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    const fullPath = path ? `/${path}` : '/';
    const type = pathToType[fullPath];
    if (type && type !== selectedType) {
      setSelectedType(type);
    }
  }, [location, selectedType, setSelectedType]);

  const handleNavigation = useCallback((type: ExerciseType) => {
    setSelectedType(type);
    navigate(typeToPath[type]);
  }, [navigate, setSelectedType]);

  return {
    handleNavigation
  };
}
