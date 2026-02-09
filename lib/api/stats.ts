import apiClient from '../api-client';

export interface Statistics {
  totalUsers: number;
  totalCases: number;
  totalFilings: number;
  timestamp: string;
}

class StatsAPI {
  async getStatistics(): Promise<Statistics> {
    const response = await apiClient.get('/admin/statistics');
    return response.data;
  }
}

export const statsAPI = new StatsAPI();