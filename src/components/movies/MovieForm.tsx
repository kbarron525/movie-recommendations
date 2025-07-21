import React, { useState, useEffect } from 'react';
import { useMovie } from '../../hooks/useMovie';
import {type Movie, type MovieFormData, GenreLabels } from '../../types/movie';

interface MovieFormProps {
  movie?: Movie;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ 
  movie, 
  onSuccess, 
  onCancel 
}) => {
  const { addMovie, updateMovie, isLoading, error } = useMovie();
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    genre: 'OTHER',
    release_year: null,
    rating: 5,
    review: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  // If editing, populate form with movie data
  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        genre: movie.genre,
        release_year: movie.release_year,
        rating: Number(movie.rating),
        review: movie.review,
      });
    }
  }, [movie]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'release_year') {
      // Handle release_year as number or null
      const yearValue = value ? parseInt(value, 10) : null;
      setFormData((prev) => ({
        ...prev,
        [name]: yearValue,
      }));
    } else if (name === 'rating') {
      // Handle rating as number
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate form
    if (!formData.title.trim()) {
      setFormError('Title is required');
      return;
    }
    
    if (formData.rating < 0 || formData.rating > 10) {
      setFormError('Rating must be between 0 and 10');
      return;
    }

    try {
      if (movie) {
        // Update existing movie
        await updateMovie(movie.id, formData);
      } else {
        // Add new movie
        await addMovie(formData);
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving movie:', error);
      // Error is already handled by the movie context
    }
  };

  return (
    <div className="movie-form">
      <h2>{movie ? 'Edit Movie' : 'Add New Movie'}</h2>
      <form onSubmit={handleSubmit}>
        {(formError || error) && (
          <div className="error-message">
            {formError || error}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Enter movie title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            disabled={isLoading}
            required
          >
            {Object.entries(GenreLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="release_year">Release Year</label>
          <input
            type="number"
            id="release_year"
            name="release_year"
            value={formData.release_year || ''}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Enter release year (optional)"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating (0-10)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Enter rating (0-10)"
            min="0"
            max="10"
            step="0.1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Write your review (optional)"
            rows={4}
          />
        </div>
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : (movie ? 'Update Movie' : 'Add Movie')}
          </button>
          {onCancel && (
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MovieForm;