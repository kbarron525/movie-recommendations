import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import type {RegisterCredentials} from '../../types/auth';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register, isLoading, error } = useAuth();
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate form
    if (!credentials.username.trim()) {
      setFormError('Username is required');
      return;
    }
    if (!credentials.email.trim()) {
      setFormError('Email is required');
      return;
    }
    if (!credentials.password) {
      setFormError('Password is required');
      return;
    }
    if (credentials.password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return;
    }
    if (credentials.password !== credentials.password_confirm) {
      setFormError('Passwords do not match');
      return;
    }

    try {
      await register(credentials);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Error is already handled by the auth context
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {(formError || error) && (
          <div className="error-message">
            {formError || error}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Choose a username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Create a password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirm">Confirm Password</label>
          <input
            type="password"
            id="password_confirm"
            name="password_confirm"
            value={credentials.password_confirm}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;