import apiClient from "../api-client";

// ─── Interfaces ───────────────────────────────────────────────────

export interface DashboardApplication {
  id: string;
  name: string;
  code: string;
  type: string;
  classification: string;
  createdAt: string;
  status: string;
  registrationNumber: string | null;
}

export interface DashboardApplicationsResponse {
  data: DashboardApplication[];
  total: number;
  page: number;
  limit: number;
}

export interface ActivityLog {
  id: string;
  description: string;
  action: string;
  entityType: string;
  entityId: string;
  performedBy: string;
  timestamp: string;
}

export interface ActivityLogsResponse {
  data: ActivityLog[];
  total: number;
  page: number;
  limit: number;
}

// ─── Dashboard API Class ──────────────────────────────────────────

class DashboardAPI {
  /**
   * Get all applications summary (across all types)
   */
  async getApplications(
    page: number = 1,
    limit: number = 10
  ): Promise<DashboardApplicationsResponse> {
    const response = await apiClient.get('/dashboard/applications', {
      params: { page, limit }
    });
    return response.data;
  }

  /**
   * Get recent activity feed
   */
  async getActivity(
    page: number = 1,
    limit: number = 10
  ): Promise<ActivityLogsResponse> {
    const response = await apiClient.get('/dashboard/activity', {
      params: { page, limit }
    });
    return response.data;
  }
}

export const dashboardAPI = new DashboardAPI();