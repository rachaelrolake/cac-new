import apiClient from "../api-client";

// ─── Interfaces ───────────────────────────────────────────────────

export interface ServiceFee {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    code: string;
    description: string | null;
    amount: string;
    currency: string;
    entityType: string | null;
    feeType: string;
    penaltyRate: string | null;
    isActive: boolean;
    ltdGteFee: string | null;
    smallCompanyFee: string | null;
    privateOtherThanSmallFee: string | null;
    publicFee: string | null;
    dailyDefaultPenalty: string | null;
    otherPenalties: string | null;
}

export interface CreateServiceFeePayload {
    name: string;
    code: string;
    description?: string;
    amount: number;
    currency: string;
    entityType?: string;
    feeType: string;
    penaltyRate?: number;
    isActive: boolean;
    ltdGteFee?: number;
    smallCompanyFee?: number;
    privateOtherThanSmallFee?: number;
    publicFee?: number;
    dailyDefaultPenalty?: number;
    otherPenalties?: number;
}

export interface UpdateServiceFeePayload {
    name?: string;
    code?: string;
    description?: string;
    amount?: number;
    currency?: string;
    entityType?: string;
    feeType?: string;
    penaltyRate?: number;
    isActive?: boolean;
    ltdGteFee?: number;
    smallCompanyFee?: number;
    privateOtherThanSmallFee?: number;
    publicFee?: number;
    dailyDefaultPenalty?: number;
    otherPenalties?: number;
}

// ─── Service Fees API Class ──────────────────────────────────────

class ServiceFeesAPI {
    /**
     * List service fees, optionally filtered by category
     */
    async getServiceFees(category?: string): Promise<ServiceFee[]> {
        const response = await apiClient.get('/system-admin/service-fees', {
            params: category ? { category } : {}
        });
        return response.data;
    }

    /**
     * Get service fee by ID
     */
    async getServiceFeeById(id: string): Promise<ServiceFee> {
        const response = await apiClient.get(`/system-admin/service-fees/${id}`);
        return response.data;
    }

    /**
     * Create service fee
     */
    async createServiceFee(payload: CreateServiceFeePayload): Promise<ServiceFee> {
        const response = await apiClient.post('/system-admin/service-fees', payload);
        return response.data;
    }

    /**
     * Update service fee
     */
    async updateServiceFee(id: string, payload: UpdateServiceFeePayload): Promise<ServiceFee> {
        const response = await apiClient.put(`/system-admin/service-fees/${id}`, payload);
        return response.data;
    }

    /**
     * Delete service fee (soft delete)
     */
    async deleteServiceFee(id: string): Promise<void> {
        await apiClient.delete(`/system-admin/service-fees/${id}`);
    }
}

export const serviceFeesAPI = new ServiceFeesAPI();