"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authStorage, type User } from '@/lib/auth-storage';
import { authAPI, type LoginCredentials } from '@/lib/api/auth';
import { TokenExpiryMonitor } from '@/components/auth/token-expiry-monitor';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      const storedUser = authStorage.getUser();
      const token = authStorage.getToken();
      
      // Check if token is expired
      if (storedUser && token) {
        if (authStorage.isTokenExpired()) {
          // Token expired - clear auth and don't set user
          console.log('[AuthContext] Token expired on load - clearing auth');
          authStorage.clearAuth();
          setUser(null);
        } else {
          setUser(storedUser);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authAPI.login(credentials);
      
      // Store tokens and user data
      authStorage.setToken(response.accessToken);
      authStorage.setRefreshToken(response.refreshToken);
      authStorage.setUser(response.user);
      
      // Store token expiry for automatic logout
      authStorage.setTokenExpiry(response.expiresIn);
      
      // Update state
      setUser(response.user);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      // Clear any partial data
      authStorage.clearAuth();
      throw error;
    }
  };

  const logout = () => {
    // Clear storage
    authStorage.clearAuth();
    
    // Clear state
    setUser(null);
    
    // Call logout API (optional, for server-side cleanup)
    authAPI.logout().catch(() => {
      // Ignore errors on logout
    });
    
    // Redirect to login
    router.push('/auth/login');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      <TokenExpiryMonitor />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}