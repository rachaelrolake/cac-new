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

export interface DashboardStats {
  overview: {
    totalApplications: number;
    approvedApplications: number;
    approvedPercentage: number;
    pendingApplications: number;
    pendingPercentage: number;
    queriedApplications: number;
    queriedPercentage: number;
    rejectedApplications: number;
    rejectedPercentage: number;
    thisWeekGrowth: number;
  };
  users: {
    publicUsers: number;
    publicUsersGrowth: number;
    entityAccounts: number;
    entityAccountsGrowth: number;
    accreditedAgents: number;
    insolvencyPractitioners: number;
  };
  breakdown: {
    companies: number;
    businessNames: number;
    llps: number;
    lps: number;
    incorporatedTrustees: number;
    nameConsents: number;
    postIncorporationFilings: number;
    reservations: number;
  };
}

export interface ExecutiveSummary {
  users: {
    publicUsers: number;
    publicUsersGrowth: number;
    entityAccounts: number;
    entityAccountsGrowth: number;
    accreditedAgents: number;
    accreditedAgentsGrowth: number;
    insolvencyPractitioners: number;
    insolvencyPractitionersGrowth: number;
  };
  applicationOverview: {
    total: number;
    approved: number;
    pending: number;
    queried: number;
    rejected: number;
  };
  topApplicationTypes: Array<{
    type: string;
    count: number;
  }>;
  pendingApprovals: {
    total: number;
    breakdown: Array<{
      type: string;
      count: number;
      oldestDays: number;
    }>;
  };
  supportAndSystemIssues: {
    openTickets: number;
    highPriorityTickets: number;
  };
}

export interface PaymentStats {
  totalRevenue: number;
  thisMonth: {
    revenue: number;
    count: number;
  };
  today: {
    revenue: number;
    count: number;
  };
  avgTransaction: number;
  successful: {
    amount: number;
    count: number;
  };
  failed: {
    count: number;
  };
  pending: {
    amount: number;
    count: number;
  };
  refunded: {
    amount: number;
    count: number;
  };
  transactionCount: number;
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
   * Get dashboard statistics
   */
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  }

  /**
   * Get executive summary
   */
  async getExecutiveSummary(): Promise<ExecutiveSummary> {
    const response = await apiClient.get('/dashboard/executive-summary');
    return response.data;
  }

  /**
   * Get payment statistics (Financial Oversight)
   */
  async getPaymentStats(): Promise<PaymentStats> {
    const response = await apiClient.get('/payments/stats');
    return response.data;
  }
}

export const dashboardAPI = new DashboardAPI();