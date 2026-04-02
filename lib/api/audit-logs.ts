import apiClient from "../api-client";

// ─── Interfaces ───────────────────────────────────────────────────

export interface AuditLog {
    id: string;
    createdAt: string;
    updatedAt: string;
    entityType: string;
    entityId: string;
    action: string;
    userId: string | null;
    userEmail: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    oldValues: any | null;
    newValues: any | null;
    timestamp: string;
}

export interface AuditLogsResponse {
    data: AuditLog[];
    total: number;
}

export interface AuditLogFilters {
    user?: string;
    role?: string;
    action?: string;
    entityType?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

// ─── Audit Logs API Class ──────────────────────────────────────────

class AuditLogsAPI {
    /**
     * Get audit logs with optional filters
     */
    async getAuditLogs(filters?: AuditLogFilters): Promise<AuditLogsResponse> {
        const params: any = {
            page: filters?.page || 1,
            limit: filters?.limit || 10,
        };

        if (filters?.user) params.user = filters.user;
        if (filters?.role) params.role = filters.role;
        if (filters?.action) params.action = filters.action;
        if (filters?.entityType) params.entityType = filters.entityType;
        if (filters?.startDate) params.startDate = filters.startDate;
        if (filters?.endDate) params.endDate = filters.endDate;

        const response = await apiClient.get('/audit-logs', { params });
        return response.data;
    }

    /**
     * Get audit log by ID
     */
    async getAuditLogById(id: string): Promise<AuditLog> {
        const response = await apiClient.get(`/audit-logs/${id}`);
        return response.data;
    }
}

export const auditLogsAPI = new AuditLogsAPI();