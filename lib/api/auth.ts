import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    agentType: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

class AuthAPI {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await axios.post(`${API_BASE_URL}/auth/forgot-password`, data);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await axios.post(`${API_BASE_URL}/auth/reset-password`, data);
  }

  async logout(): Promise<void> {
    // Add logout endpoint if available
    // await axios.post(`${API_BASE_URL}/auth/logout`);
  }
}

export const authAPI = new AuthAPI();