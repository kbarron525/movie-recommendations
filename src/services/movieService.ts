import api from './api';
import type {Movie, MovieFormData} from '../types/movie';

// Movie service
const movieService = {
  // Get all movies
  async getAllMovies(): Promise<Movie[]> {
    const response = await api.get<Movie[]>('/movies/');
    return response.data;
  },
  
  // Get user's movies
  async getUserMovies(): Promise<Movie[]> {
    const response = await api.get<Movie[]>('/movies/my_movies/');
    return response.data;
  },
  
  // Get movie by ID
  async getMovieById(id: number): Promise<Movie> {
    const response = await api.get<Movie>(`/movies/${id}/`);
    return response.data;
  },
  
  // Create new movie
  async createMovie(movieData: MovieFormData): Promise<Movie> {
    const response = await api.post<Movie>('/movies/', movieData);
    return response.data;
  },
  
  // Update movie
  async updateMovie(id: number, movieData: MovieFormData): Promise<Movie> {
    const response = await api.put<Movie>(`/movies/${id}/`, movieData);
    return response.data;
  },
  
  // Delete movie
  async deleteMovie(id: number): Promise<void> {
    await api.delete(`/movies/${id}/`);
  }
};

export default movieService;