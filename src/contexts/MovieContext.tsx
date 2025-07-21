import React, { createContext, useState, useEffect, ReactNode } from 'react';
import movieService from '../services/movieService';
import { MovieFormData, MovieState } from '../types/movie';

// Define the shape of the context
interface MovieContextType extends MovieState {
  fetchMovies: () => Promise<void>;
  fetchUserMovies: () => Promise<void>;
  getMovie: (id: number) => Promise<void>;
  addMovie: (movieData: MovieFormData) => Promise<void>;
  updateMovie: (id: number, movieData: MovieFormData) => Promise<void>;
  deleteMovie: (id: number) => Promise<void>;
  clearSelectedMovie: () => void;
}

// Create the context with a default value
const MovieContext = createContext<MovieContextType | undefined>(undefined);

// Props for the MovieProvider component
interface MovieProviderProps {
  children: ReactNode;
}

// MovieProvider component
export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [state, setState] = useState<MovieState>({
    movies: [],
    selectedMovie: null,
    isLoading: false,
    error: null,
  });

  // Fetch all movies
  const fetchMovies = async () => {
    setState({ ...state, isLoading: true, error: null });
    try {
      const movies = await movieService.getAllMovies();
      setState({
        ...state,
        movies,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to fetch movies',
      });
    }
  };

  // Fetch user's movies
  const fetchUserMovies = async () => {
    setState({ ...state, isLoading: true, error: null });
    try {
      const movies = await movieService.getUserMovies();
      setState({
        ...state,
        movies,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching user movies:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to fetch your movies',
      });
    }
  };

  // Get a specific movie
  const getMovie = async (id: number) => {
    setState({ ...state, isLoading: true, error: null });
    try {
      const movie = await movieService.getMovieById(id);
      setState({
        ...state,
        selectedMovie: movie,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching movie:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to fetch movie details',
      });
    }
  };

  // Add a new movie
  const addMovie = async (movieData: MovieFormData) => {
    setState({ ...state, isLoading: true, error: null });
    try {
      const newMovie = await movieService.createMovie(movieData);
      setState({
        ...state,
        movies: [newMovie, ...state.movies],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error adding movie:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to add movie',
      });
    }
  };

  // Update an existing movie
  const updateMovie = async (id: number, movieData: MovieFormData) => {
    setState({ ...state, isLoading: true, error: null });
    try {
      const updatedMovie = await movieService.updateMovie(id, movieData);
      setState({
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === id ? updatedMovie : movie
        ),
        selectedMovie: updatedMovie,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error updating movie:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to update movie',
      });
    }
  };

  // Delete a movie
  const deleteMovie = async (id: number) => {
    setState({ ...state, isLoading: true, error: null });
    try {
      await movieService.deleteMovie(id);
      setState({
        ...state,
        movies: state.movies.filter((movie) => movie.id !== id),
        selectedMovie: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error deleting movie:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'Failed to delete movie',
      });
    }
  };

  // Clear selected movie
  const clearSelectedMovie = () => {
    setState({
      ...state,
      selectedMovie: null,
    });
  };

  // Fetch movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Provide the movie context to children
  return (
    <MovieContext.Provider
      value={{
        ...state,
        fetchMovies,
        fetchUserMovies,
        getMovie,
        addMovie,
        updateMovie,
        deleteMovie,
        clearSelectedMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;