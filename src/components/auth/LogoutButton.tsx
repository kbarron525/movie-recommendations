import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface LogoutButtonProps {
  onLogout?: () => void;
  className?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  onLogout, 
  className = 'btn btn-outline-danger' 
}) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button 
      className={className} 
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;