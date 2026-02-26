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
  documents?: UserDocument[];
}

export interface UserDocument {
  id: string;
  fileName: string;
  fileUrl: string;
  documentType: string;
  mimeType: string;
  fileSize: string;
  storageType: string;
  entityType: string;
  entityId: string | null;
  createdAt: string;
}

export interface FilingHistoryItem {
  id: string;
  type: string;
  name: string;
  status: string;
  registrationNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FilingHistoryResponse {
  data: FilingHistoryItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ActivityLogItem {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

export interface ActivityLogsResponse {
  data: ActivityLogItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OtherAdmin {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  roles: string;
  isActive: boolean;
  accountStatus: string;
  organizationName: string | null;
  lastLoginAt: string | null;
}

export interface OtherAdminsResponse {
  data: OtherAdmin[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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

// Insolvency Agents

export interface InsolvencyAgent {
  id: string;
  agentId: string;
  agentType: string;
  agentName: string;
  insolvencyLicenseNumber: string | null;
  insolvencyCertificationDate: string | null;
  professionalBody: string | null;
  yearsOfExperience: number;
  specialization: string[] | null;
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

export interface InsolvencyAgentsListResponse {
  data: InsolvencyAgent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InsolvencyAgentsStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  pending: number;
}

// Entity Accounts

export interface EntityAccount {
  id: string;
  createdAt: string;
  updatedAt: string;
  companyName: string;
  registrationType: string;
  registrationStatus: string;
  currentStep: number;
  rcNumber: string | null;
  registrationDate: string | null;
  approvalMode: string | null;
  companyType: string;
  principalBusinessActivity: string;
  email: string;
  phoneNumber: string;
  articleOfAssociation: string;
  articleFileUrl: string | null;
  directors: any[] | null;
  secretaries: any[] | null;
  totalNumberIssuedShares: number | null;
  nominalValueOfEachShare: string | null;
  totalNumberOfOrdinaryShares: number | null;
  applicationData: any | null;
  submissionMethod: string | null;
  totalAggregateUnpaidOrdinaryShares: string | null;
  totalNumberOfPreferenceShares: number | null;
  totalAggregateUnpaidPreferenceShares: string | null;
  shareholders: any[] | null;
  pscs: any[] | null;
  mainObjects: string | null;
  ancillaryObjects: string | null;
  acceptGeneralObjectClause: boolean;
  liabilityType: string | null;
  shareCapital: string | null;
  shareCapitalInWords: string | null;
  numberOfShares: number | null;
  valuePerShare: string | null;
  objectsOfMemorandum: string | null;
  trackingCode: string | null;
  supportingDocuments: any | null;
  isManualSubmission: boolean;
}

export interface EntityAccountsListResponse {
  data: EntityAccount[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EntityAccountsStats {
  totalApplications: number;
  approved: number;
  pending: number;
  rejected: number;
  underReview: number;
}

export interface DeclineEntityPayload {
  reason: string;
}

export interface QueryEntityPayload {
  note: string;
}

class EntityAccountsAPI {
  async getEntityAccounts(
    page: number = 1, 
    limit: number = 20,
    status?: string
  ): Promise<EntityAccountsListResponse> {
    const response = await apiClient.get('/admin/entities', {
      params: { page, limit, ...(status && { status }) }
    });
    return response.data;
  }

  async getEntityAccountById(id: string): Promise<EntityAccount> {
    const response = await apiClient.get(`/admin/entities/${id}`);
    return response.data;
  }

  async getEntityAccountsStats(): Promise<EntityAccountsStats> {
    const response = await apiClient.get('/admin/entities/stats');
    return response.data;
  }

  async approveEntity(id: string): Promise<void> {
    await apiClient.patch(`/admin/entities/${id}/approve`);
  }

  async declineEntity(id: string, payload: DeclineEntityPayload): Promise<void> {
    await apiClient.patch(`/admin/entities/${id}/decline`, payload);
  }

  async queryEntity(id: string, payload: QueryEntityPayload): Promise<void> {
    await apiClient.patch(`/admin/entities/${id}/query`, payload);
  }
}

class InsolvencyAgentsAPI {
  async getInsolvencyAgents(
    page: number = 1, 
    limit: number = 20,
    status?: string
  ): Promise<InsolvencyAgentsListResponse> {
    const response = await apiClient.get('/admin/insolvency-agents', {
      params: { page, limit, ...(status && { status }) }
    });
    return response.data;
  }

  async getInsolvencyAgentById(id: string): Promise<InsolvencyAgent> {
    const response = await apiClient.get(`/admin/insolvency-agents/${id}`);
    return response.data;
  }

  async getInsolvencyAgentsStats(): Promise<InsolvencyAgentsStats> {
    const response = await apiClient.get('/admin/insolvency-agents/stats');
    return response.data;
  }

  async approveAgent(id: string): Promise<void> {
    await apiClient.post(`/admin/insolvency-agents/${id}/approve`);
  }

  async declineAgent(id: string, payload: DeclineAgentPayload): Promise<void> {
    await apiClient.post(`/admin/insolvency-agents/${id}/decline`, payload);
  }
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

  async getFilingHistory(userId: string, page: number = 1, limit: number = 10): Promise<FilingHistoryResponse> {
    const response = await apiClient.get(`/admin/users/${userId}/filing-history`, {
      params: { page, limit }
    });
    return response.data;
  }

  async getActivityLogs(userId: string, page: number = 1, limit: number = 20): Promise<ActivityLogsResponse> {
    const response = await apiClient.get(`/admin/users/${userId}/activity-logs`, {
      params: { page, limit }
    });
    return response.data;
  }

  async getOtherAdmins(userId: string, page: number = 1, limit: number = 10): Promise<OtherAdminsResponse> {
    const response = await apiClient.get(`/admin/users/${userId}/other-admins`, {
      params: { page, limit }
    });
    return response.data;
  }
}

export const usersAPI = new UsersAPI();
export const publicUsersAPI = new PublicUsersAPI();
export const accreditedAgentsAPI = new AccreditedAgentsAPI();
export const insolvencyAgentsAPI = new InsolvencyAgentsAPI();
export const entityAccountsAPI = new EntityAccountsAPI();