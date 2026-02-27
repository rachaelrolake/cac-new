import Cookies from 'js-cookie';

const TOKEN_KEY = 'cac_auth_token';
const REFRESH_TOKEN_KEY = 'cac_refresh_token';
const USER_KEY = 'cac_user_data';
const TOKEN_EXPIRY_KEY = 'cac_token_expiry';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  agentType: string;
}

class AuthStorage {
  // Token management - using cookies
  setToken(token: string): void {
    Cookies.set(TOKEN_KEY, token, { 
      expires: 7, // 7 days
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
  }

  getToken(): string | null {
    return Cookies.get(TOKEN_KEY) || null;
  }

  removeToken(): void {
    Cookies.remove(TOKEN_KEY);
  }

  // Refresh token management - using cookies
  setRefreshToken(token: string): void {
    Cookies.set(REFRESH_TOKEN_KEY, token, { 
      expires: 30, // 30 days
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
  }

  getRefreshToken(): string | null {
    return Cookies.get(REFRESH_TOKEN_KEY) || null;
  }

  removeRefreshToken(): void {
    Cookies.remove(REFRESH_TOKEN_KEY);
  }

  // Token expiry management
  setTokenExpiry(expiresIn: number): void {
    // expiresIn is in seconds, calculate absolute timestamp
    const expiresAt = Date.now() + (expiresIn * 1000);
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString());
    }
  }

  getTokenExpiry(): number | null {
    if (typeof window !== 'undefined') {
      const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
      return expiry ? parseInt(expiry, 10) : null;
    }
    return null;
  }

  removeTokenExpiry(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
    }
  }

  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    if (!expiry) return true;
    return Date.now() >= expiry;
  }

  getTimeUntilExpiry(): number {
    const expiry = this.getTokenExpiry();
    if (!expiry) return 0;
    return Math.max(0, expiry - Date.now());
  }

  // User data management - using localStorage for non-sensitive data
  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  removeUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_KEY);
    }
  }

  // Clear all auth data
  clearAuth(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUser();
    this.removeTokenExpiry();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authStorage = new AuthStorage();