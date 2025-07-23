import React, {useState} from 'react';
import {useAuth} from '../../hooks/useAuth';
import type {RegisterCredentials} from '../../types/auth';

interface RegisterFormProps {
    onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({onSuccess}) => {
    const {register, isLoading, error} = useAuth();
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        username: '',
        email: '',
        password: '',
        password_confirm: '',
    });
    const [formError, setFormError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = (): string | null => {
        if (!credentials.username.trim()) return 'Username is required';
        if (!credentials.email.trim()) return 'Email is required';
        if (!credentials.password) return 'Password is required';
        if (credentials.password.length < 8) return 'Password must be at least 8 characters';
        if (credentials.password !== credentials.password_confirm) return 'Passwords do not match';
        return null;
    };
    /**
     * Handles the form submission, validates the input, and triggers the registration process.
     *
     * @param {React.FormEvent} e - The form submission event.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        // Validate form
        const error = validateForm();
        if (error) {
            setFormError(error);
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