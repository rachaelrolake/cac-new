import apiClient from "../api-client";

// ─── Interfaces ───────────────────────────────────────────────────

// Shared
export interface Applicant {
    id: string;
    firstName: string;
    lastName: string;
    role?: string;
}

// Name Reservations
export interface Reservation {
    id: string;
    avCode: string;
    businessName: string;
    businessType: string;
    classification: string;
    applicant: Applicant;
    status: string;
    issueDate: string | null;
    expiryDate: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ReservationDetail {
    id: string
    createdAt: string
    updatedAt: string
    businessName: string
    proposedName2: string | null
    proposedName3: string | null
    email: string
    businessCommencementDate: string | null
    avCode: string
    issueDate: string | null
    expiryDate: string | null
    status: string
    ownedBy: {
        id: string
        firstName: string
        lastName: string
        email: string
        phoneNumber: string | null
        roles: string[]
        isActive: boolean
        accountStatus: string
        lastLoginAt: string | null
        createdAt: string
        organizationName: string | null
    }
    businessType: {
        id: string
        name: string
        requiresConsent: boolean
        businessClassification: {
            id: string
            name: string
            code: string | null
            requiresConsent: boolean
        }
    }
    applicationType: {
        id: string
        name: string
        code: string
        currency: string
        price: string
    }
}

export interface ReservationsListResponse {
    data: Reservation[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ReservationsStats {
    total: number;
    approved: number;
    pending: number;
    expiringSoon: number;
}

// Consent Applications
export interface ConsentApplication {
    id: string;
    arCode: string;
    entityName: string;
    entityClassification: string;
    entityType: string;
    reasonForConsent: string;
    applicant: Applicant;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface ConsentApplicationsListResponse {
    data: ConsentApplication[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ConsentApplicationsStats {
    total: number;
    approved: number;
    pending: number;
    queried: number;
}

// Registrations
export interface Registration {
    id: string;
    arCode: string;
    entityName: string;
    entityClassification: string;
    entityType: string;
    applicant: Applicant;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface RegistrationsListResponse {
    data: Registration[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface RegistrationsStats {
    total: number;
    approved: number;
    pending: number;
    queried: number;
}

export interface RejectQueryPayload {
    reason: string;
}

// ─── Name Availability ────────────────────────────────────────────

export interface NameAvailabilityConflict {
  existingName: string;
  conflictType: string;
  similarityScore: number;
  explanation: string;
}

export interface NameAvailabilityDistinctivenessCheck {
  isDistinctive: boolean;
  hasUniqueKeyword: boolean;
  genericWordsFound: string[];
  geographicalWordsFound: string[];
}

export interface NameAvailabilityValidation {
  isValid: boolean;
  overallSimilarityScore: number;
  conflicts: NameAvailabilityConflict[];
  restrictedWordViolations: string[];
  distinctivenessCheck: NameAvailabilityDistinctivenessCheck;
  requiresConsent: string[];
  flaggedIssues: string[];
}

export interface NameAvailabilityResult {
  available: boolean;
  message: string;
  validation?: NameAvailabilityValidation;
}

class NameAvailabilityAPI {
  async checkName(name: string, businessActivity: string): Promise<NameAvailabilityResult> {
    const response = await apiClient.get('/reservations/check-name', {
      params: { name, businessActivity },
    });
    return response.data;
  }
}

// ─── API Classes ──────────────────────────────────────────────────

class ReservationsAPI {
    async getReservations(
        page: number = 1,
        limit: number = 10,
        status?: string,
        search?: string
    ): Promise<ReservationsListResponse> {
        const response = await apiClient.get('/admin/pre-incorporation/reservations', {
            params: {
                page,
                limit,
                ...(status && { status }),
                ...(search && { search }),
            }
        });
        return response.data;
    }

    async getReservationsStats(): Promise<ReservationsStats> {
        const response = await apiClient.get('/admin/pre-incorporation/reservations/stats');
        return response.data;
    }

    async getReservationById(id: string): Promise<any> {
        const response = await apiClient.get(`/admin/pre-incorporation/reservations/${id}`);
        return response.data;
    }

    async approveReservation(id: string): Promise<void> {
        await apiClient.patch(`/admin/pre-incorporation/reservations/${id}/approve`);
    }

    async rejectReservation(id: string, payload: RejectQueryPayload): Promise<void> {
        await apiClient.patch(`/admin/pre-incorporation/reservations/${id}/reject`, payload);
    }

    async queryReservation(id: string, payload: RejectQueryPayload): Promise<void> {
        await apiClient.patch(`/admin/pre-incorporation/reservations/${id}/query`, payload);
    }
}

class ConsentApplicationsAPI {
    async getConsentApplications(
        page: number = 1,
        limit: number = 10,
        status?: string,
        search?: string
    ): Promise<ConsentApplicationsListResponse> {
        const response = await apiClient.get('/admin/pre-incorporation/consent-applications', {
            params: {
                page,
                limit,
                ...(status && { status }),
                ...(search && { search }),
            }
        });
        return response.data;
    }

    async getConsentApplicationsStats(): Promise<ConsentApplicationsStats> {
        const response = await apiClient.get('/admin/pre-incorporation/consent-applications/stats');
        return response.data;
    }

    async getConsentApplicationById(type: string, id: string): Promise<any> {
        const response = await apiClient.get(`/admin/pre-incorporation/consent-applications/${type}/${id}`);
        return response.data;
    }

    async approveConsentApplication(type: string, id: string): Promise<void> {
        await apiClient.patch(`/admin/pre-incorporation/consent-applications/${type}/${id}/approve`);
    }

    async rejectConsentApplication(type: string, id: string, payload: RejectQueryPayload): Promise<void> {
        await apiClient.patch(`/admin/pre-incorporation/consent-applications/${type}/${id}/reject`, payload);
    }

    async queryConsentApplication(type: string, id: string, payload: RejectQueryPayload): Promise<void> {
        await apiClient.patch(`/admin/pre-incorporation/consent-applications/${type}/${id}/query`, payload);
    }
}

class RegistrationsAPI {
    async getRegistrations(
        page: number = 1,
        limit: number = 10,
        status?: string,
        search?: string
    ): Promise<RegistrationsListResponse> {
        const response = await apiClient.get('/admin/pre-incorporation/registrations', {
            params: {
                page,
                limit,
                ...(status && { status }),
                ...(search && { search }),
            }
        });
        return response.data;
    }

    async getRegistrationsStats(): Promise<RegistrationsStats> {
        const response = await apiClient.get('/admin/pre-incorporation/registrations/stats');
        return response.data;
    }

    async getRegistrationById(type: string, id: string): Promise<any> {
        const response = await apiClient.get(`/admin/pre-incorporation/registrations/${type}/${id}`);
        return response.data;
    }

    async approveRegistration(type: string, id: string): Promise<void> {
        await apiClient.patch(`/admin/pre-incorporation/registrations/${type}/${id}/approve`);
    }

    async rejectRegistration(type: string, id: string, payload: RejectQueryPayload): Promise<void> {
        await apiClient.patch(`/admin/pre-incorporation/registrations/${type}/${id}/reject`, payload);
    }

    async queryRegistration(type: string, id: string, payload: RejectQueryPayload): Promise<void> {
        await apiClient.patch(`/admin/pre-incorporation/registrations/${type}/${id}/query`, payload);
    }
}

// ─── Exports ──────────────────────────────────────────────────────

export const reservationsAPI = new ReservationsAPI();
export const nameAvailabilityAPI = new NameAvailabilityAPI();
export const consentApplicationsAPI = new ConsentApplicationsAPI();
export const registrationsAPI = new RegistrationsAPI();