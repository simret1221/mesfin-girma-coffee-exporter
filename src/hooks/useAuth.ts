import { useState, useCallback } from 'react';
import { User } from '../types';
import { getCurrentUser, loginUser, logoutUser } from '../services/authService';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => getCurrentUser());

  const refreshUser = useCallback(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const login = useCallback(async (email: string, password: string = 'password123') => {
    const user = await loginUser(email, password);
    setCurrentUser(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setCurrentUser(null);
  }, []);

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    role: currentUser?.role || null,
    refreshUser,
    login,
    logout
  };
}
