import type {User} from './auth';

export type Genre = 
  | 'ACTION'
  | 'COMEDY'
  | 'DRAMA'
  | 'FANTASY'
  | 'HORROR'
  | 'MYSTERY'
  | 'ROMANCE'
  | 'THRILLER'
  | 'SCI_FI'
  | 'DOCUMENTARY'
  | 'ANIMATION'
  | 'OTHER';

export const GenreLabels: Record<Genre, string> = {
  ACTION: 'Action',
  COMEDY: 'Comedy',
  DRAMA: 'Drama',
  FANTASY: 'Fantasy',
  HORROR: 'Horror',
  MYSTERY: 'Mystery',
  ROMANCE: 'Romance',
  THRILLER: 'Thriller',
  SCI_FI: 'Science Fiction',
  DOCUMENTARY: 'Documentary',
  ANIMATION: 'Animation',
  OTHER: 'Other'
};

export interface Movie {
  id: number;
  title: string;
  genre: Genre;
  release_year: number | null;
  rating: number;
  review: string;
  created_by: User;
  created_at: string;
  updated_at: string;
}

export interface MovieFormData {
  title: string;
  genre: Genre;
  release_year: number | null;
  rating: number;
  review: string;
}

export interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  isLoading: boolean;
  error: string | null;
}