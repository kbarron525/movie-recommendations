import { useContext } from 'react';
import MovieContext from '../contexts/MovieContext';

// Custom hook to use the movie context
export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};