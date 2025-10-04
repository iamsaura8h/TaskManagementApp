import React, { createContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: boolean | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<boolean | null>(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setUser(true);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // If erasableSyntaxOnly is enabled, avoid JSX and use a function to provide context
  return React.createElement(
    AuthContext.Provider,
    { value: { user, login, logout } },
    children
  );
};
