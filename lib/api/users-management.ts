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

export interface Resource {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  icon: string | null;
  action: string;
  controller: string;
  areas: any;
  order: number;
  endDate: string | null;
  parent?: Resource | null;
  children?: Resource[];
}

export interface UserPermission {
  id: string;
  resourceId: string;
  resourceName: string;
  controller: string;
  action: string;
}

export interface UserPermissionsResponse {
  userId: string;
  permissions: UserPermission[];
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

  // Permissions methods
  async getResources(): Promise<Resource[]> {
    const response = await apiClient.get('/admin/resources');
    return response.data;
  }

  async getUserPermissions(userId: string): Promise<UserPermissionsResponse> {
    const response = await apiClient.get(`/admin/users/${userId}/permissions`);
    return response.data;
  }

  async updateUserPermissions(userId: string, resourceIds: string[]): Promise<UserPermissionsResponse> {
    const response = await apiClient.put(`/admin/users/${userId}/permissions`, {
      resourceIds
    });
    return response.data;
  }
}

export const usersAPI = new UsersAPI();