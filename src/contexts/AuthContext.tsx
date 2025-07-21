import React, { createContext, useState, useEffect, ReactNode } from 'react';
import authService from '../services/authService';
import { AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';

// Define the shape of the context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = await authService.getCurrentUser();
          setState({
            user,
            isAuthenticated: !!user,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to authenticate user',
        });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setState({ ...state, isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: 'Invalid credentials',
      });
      throw error;
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials) => {
    setState({ ...state, isLoading: true, error: null });
    try {
      await authService.register(credentials);
      // After registration, log the user in
      await login({
        username: credentials.username,
        password: credentials.password,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: 'Registration failed',
      });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;