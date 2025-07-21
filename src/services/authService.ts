import api from './api';

// Define types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

// Authentication service
const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/token/', credentials);
    
    // Store tokens in localStorage
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    
    return response.data;
  },
  
  // Register user
  async register(credentials: RegisterCredentials): Promise<User> {
    const response = await api.post<User>('/movies/auth/register/', credentials);
    return response.data;
  },
  
  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
  
  // Get current user profile
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get<User>('/movies/auth/profile/');
      return response.data;
    } catch (_error) {
      console.log('Error fetching user profile:', _error);
      return null;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};

export default authService;