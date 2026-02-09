import apiClient from '../api-client';

export interface User {
    id: string;
    createdAt: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    organizationName: string | null;
    roles: string[];
    isActive: boolean;
    phoneNumber: string | null;
    staffId: string | null;
    mfaEnabled?: boolean;
    lastLoginAt?: string | null;
    resources?: any[];
}

export interface UsersListResponse {
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface CreateUserPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    staffId?: string;
    phoneNumber?: string;
    organizationName?: string;
    roles: string[];
}

export interface UpdateUserPayload {
    firstName?: string;
    lastName?: string;
    staffId?: string;
    phoneNumber?: string;
    organizationName?: string;
    isActive?: boolean;
}

export interface Statistics {
    totalUsers: number;
    totalCases: number;
    totalFilings: number;
    timestamp: string;
}

class UsersAPI {
    async getUsers(page: number = 1, limit: number = 50): Promise<UsersListResponse> {
        const response = await apiClient.get('/admin/users', {
            params: { page, limit }
        });
        return response.data;
    }

    async getUserById(id: string): Promise<User> {
        const response = await apiClient.get(`/admin/users/${id}`);
        return response.data;
    }

    async createUser(payload: CreateUserPayload): Promise<User> {
        const response = await apiClient.post('/admin/users', payload);
        return response.data;
    }

    async updateUser(id: string, payload: UpdateUserPayload): Promise<User> {
        const response = await apiClient.put(`/admin/users/${id}`, payload);
        return response.data;
    }

    async deleteUser(id: string): Promise<void> {
        await apiClient.delete(`/admin/users/${id}`);
    }

    async sendPasswordResetLink(email: string): Promise<void> {
        await apiClient.post('/auth/forgot-password', { email });
    }

    async getStatistics(): Promise<Statistics> {
        const response = await apiClient.get('/admin/statistics');
        return response.data;
    }
}

export const usersAPI = new UsersAPI();