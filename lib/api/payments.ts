import apiClient from "../api-client";

// ─── Interfaces ───────────────────────────────────────────────────

export interface PaymentStats {
  totalPaid: number;
  totalPending: number;
  totalFailed: number;
  transactionCount: number;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: "Pending" | "Paid" | "Failed" | "Refunded";
  rrr: string;
  orderId: string;
  payerName: string;
  payerEmail: string;
  entityType: string;
  entityId: string;
  transactionDate: string;
  createdAt: string;
}

export interface PaymentHistoryResponse {
  data: Payment[];
  total: number;
  page: number;
  limit: number;
}

export interface PaymentStatsData {
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
  revenueByEntityType?: Array<{
    entityType: string;
    revenue: number;
    transactionCount: number;
    share: number;
  }>;
}

// ─── Payments API Class ──────────────────────────────────────────

class PaymentsAPI {
  /**
   * Get payment statistics
   */
  async getStats(): Promise<PaymentStats> {
    const response = await apiClient.get('/payments/stats');
    return response.data;
  }

  /**
   * Get payment statistics for financial oversight
   */
  async getFinancialStats(): Promise<PaymentStatsData> {
    const response = await apiClient.get('/payments/stats');
    return response.data;
  }

  /**
   * Get payment history (paginated)
   */
  async getHistory(
    page: number = 1,
    limit: number = 10,
    status?: "Pending" | "Paid" | "Failed" | "Refunded"
  ): Promise<PaymentHistoryResponse> {
    const response = await apiClient.get('/payments/history', {
      params: {
        page,
        limit,
        ...(status && { status })
      }
    });
    return response.data;
  }

  /**
   * Get payment by ID
   */
  async getPaymentById(id: string): Promise<Payment> {
    const response = await apiClient.get(`/payments/${id}`);
    return response.data;
  }
}

export const paymentsAPI = new PaymentsAPI();