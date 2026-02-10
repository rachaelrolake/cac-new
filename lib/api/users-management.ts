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

// Public User

export interface PublicUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  otherName: string | null;
  phoneNumber: string | null;
  dob: string | null;
  gender: string | null;
  nationality: string | null;
  identityType: string | null;
  identityNumber: string | null;
  occupation: string | null;
  isActive: boolean;
  accountStatus: string;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PublicUsersListResponse {
  data: PublicUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PublicUsersStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
}

// Accredited Agents

export interface AccreditedAgent {
  id: string;
  agentId: string;
  agentType: string;
  agentName: string;
  licenseNumber: string | null;
  professionalBody: string | null;
  yearsOfExperience: number;
  specialization: string[] | null;
  firmName: string | null;
  firmRegistrationNumber: string | null;
  firmAddress: string | null;
  officeAddress: string | null;
  status: string;
  isVerified: boolean;
  verifiedAt: string | null;
  isRejected: boolean;
  rejectedAt: string | null;
  rejectionReason: string | null;
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    isActive: boolean;
    accountStatus: string;
    lastLoginAt: string | null;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AccreditedAgentsListResponse {
  data: AccreditedAgent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AccreditedAgentsStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  pending: number;
}

export interface DeclineAgentPayload {
  reason: string;
}

class AccreditedAgentsAPI {
  async getAccreditedAgents(
    page: number = 1,
    limit: number = 20,
    status?: string
  ): Promise<AccreditedAgentsListResponse> {
    const response = await apiClient.get('/admin/accredited-agents', {
      params: { page, limit, ...(status && { status }) }
    });
    return response.data;
  }

  async getAccreditedAgentById(id: string): Promise<AccreditedAgent> {
    const response = await apiClient.get(`/admin/accredited-agents/${id}`);
    return response.data;
  }

  async getAccreditedAgentsStats(): Promise<AccreditedAgentsStats> {
    const response = await apiClient.get('/admin/accredited-agents/stats');
    return response.data;
  }

  async approveAgent(id: string): Promise<void> {
    await apiClient.post(`/admin/accredited-agents/${id}/approve`);
  }

  async declineAgent(id: string, payload: DeclineAgentPayload): Promise<void> {
    await apiClient.post(`/admin/accredited-agents/${id}/decline`, payload);
  }
}

class PublicUsersAPI {
  async getPublicUsers(page: number = 1, limit: number = 20): Promise<PublicUsersListResponse> {
    const response = await apiClient.get('/admin/public-users', {
      params: { page, limit }
    });
    return response.data;
  }

  async getPublicUserById(id: string): Promise<PublicUser> {
    const response = await apiClient.get(`/admin/public-users/${id}`);
    return response.data;
  }

  async getPublicUsersStats(): Promise<PublicUsersStats> {
    const response = await apiClient.get('/admin/public-users/stats');
    return response.data;
  }

  async deactivateUser(id: string): Promise<void> {
    await apiClient.delete(`/admin/users/${id}`);
  }

  async toggleUserStatus(id: string, isActive: boolean): Promise<void> {
    // Using the same endpoint - backend should handle suspend/activate based on current status
    await apiClient.delete(`/admin/users/${id}`);
  }
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
export const publicUsersAPI = new PublicUsersAPI();
export const accreditedAgentsAPI = new AccreditedAgentsAPI();