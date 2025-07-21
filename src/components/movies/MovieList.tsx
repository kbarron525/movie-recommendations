import React, { useEffect } from 'react';
import { useMovie } from '../../hooks/useMovie';
import type {Movie} from '../../types/movie';
import { GenreLabels } from '../../types/movie';

interface MovieListProps {
  onEdit?: (movie: Movie) => void;
  onDelete?: (movie: Movie) => void;
  showUserMoviesOnly?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ 
  onEdit, 
  onDelete,
  showUserMoviesOnly = false
}) => {
  const { 
    movies, 
    isLoading, 
    error, 
    fetchMovies, 
    fetchUserMovies,
    deleteMovie
  } = useMovie();

  useEffect(() => {
    if (showUserMoviesOnly) {
      fetchUserMovies();
    } else {
      fetchMovies();
    }
  }, [showUserMoviesOnly, fetchMovies, fetchUserMovies]);

  const handleDelete = async (movie: Movie) => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      try {
        await deleteMovie(movie.id);
        if (onDelete) {
          onDelete(movie);
        }
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  if (isLoading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (movies.length === 0) {
    return (
      <div className="no-movies">
        <p>No movies found. Add some movies to get started!</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <div className="movie-header">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-rating">{movie.rating}/10</div>
          </div>
          <div className="movie-details">
            <div className="movie-genre">
              <span className="label">Genre:</span> {GenreLabels[movie.genre]}
            </div>
            {movie.release_year && (
              <div className="movie-year">
                <span className="label">Year:</span> {movie.release_year}
              </div>
            )}
            <div className="movie-creator">
              <span className="label">Added by:</span> {movie.created_by.username}
            </div>
          </div>
          {movie.review && (
            <div className="movie-review">
              <p>{movie.review}</p>
            </div>
          )}
          <div className="movie-actions">
            {onEdit && (
              <button 
                className="btn btn-sm btn-primary" 
                onClick={() => onEdit(movie)}
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button 
                className="btn btn-sm btn-danger" 
                onClick={() => handleDelete(movie)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;