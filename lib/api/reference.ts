import apiClient from "../api-client";

// ─── Interfaces ───────────────────────────────────────────────────

export interface BusinessClassification {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string | null;
  requiresConsent: boolean;
}

export interface BusinessType {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  requiresConsent: boolean;
  businessClassification: BusinessClassification;
}

export interface NatureOfBusiness {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface SpecificNatureOfBusiness {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  natureOfBusiness: NatureOfBusiness;
}

export interface ConsentReason {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  description: string | null;
  isActive: boolean;
}

export interface OfficerType {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  description: string | null;
  isActive: boolean;
}

export interface IdentificationType {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  description: string | null;
  isActive: boolean;
}

export interface RestrictedWord {
  id: string;
  createdAt: string;
  updatedAt: string;
  word: string;
  category: string;
  reason: string;
  isActive: boolean;
}

export interface Notice {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "error";
  targetAudience: string | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  isPinned: boolean;
}

export interface ApplicationType {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  code: string;
  currency: string;
  price: string;
}

// ─── API Classes ──────────────────────────────────────────────────

class BusinessClassificationsAPI {
  async getAll(): Promise<BusinessClassification[]> {
    const response = await apiClient.get('/reference/business-classifications');
    return response.data;
  }

  async create(data: { name: string; code?: string; requiresConsent: boolean }): Promise<BusinessClassification> {
    const response = await apiClient.post('/reference/business-classifications', data);
    return response.data;
  }
}

class BusinessTypesAPI {
  async getAll(): Promise<BusinessType[]> {
    const response = await apiClient.get('/reference/business-types');
    return response.data;
  }

  async getByClassification(classificationId: string): Promise<BusinessType[]> {
    const response = await apiClient.get('/reference/business-types', {
      params: { classificationId }
    });
    return response.data;
  }

  async create(data: { name: string; businessClassificationId: string; requiresConsent: boolean }): Promise<BusinessType> {
    const response = await apiClient.post('/reference/business-types', data);
    return response.data;
  }
}

class NaturesOfBusinessAPI {
  async getAll(): Promise<NatureOfBusiness[]> {
    const response = await apiClient.get('/reference/natures-of-business');
    return response.data;
  }

  async create(data: { name: string }): Promise<NatureOfBusiness> {
    const response = await apiClient.post('/reference/natures-of-business', data);
    return response.data;
  }
}

class SpecificNaturesOfBusinessAPI {
  async getAll(): Promise<SpecificNatureOfBusiness[]> {
    const response = await apiClient.get('/reference/specific-natures-of-business');
    return response.data;
  }

  async getByNature(natureId: string): Promise<SpecificNatureOfBusiness[]> {
    const response = await apiClient.get('/reference/specific-natures-of-business', {
      params: { natureId }
    });
    return response.data;
  }

  async create(data: { name: string; natureOfBusinessId: string }): Promise<SpecificNatureOfBusiness> {
    const response = await apiClient.post('/reference/specific-natures-of-business', data);
    return response.data;
  }
}

class ConsentReasonsAPI {
  async getAll(): Promise<ConsentReason[]> {
    const response = await apiClient.get('/system-admin/consent-reasons');
    return response.data;
  }

  async getById(id: string): Promise<ConsentReason> {
    const response = await apiClient.get(`/system-admin/consent-reasons/${id}`);
    return response.data;
  }

  async create(data: { name: string; code: string; description?: string; isActive?: boolean }): Promise<ConsentReason> {
    const response = await apiClient.post('/system-admin/consent-reasons', data);
    return response.data;
  }

  async update(id: string, data: { name?: string; code?: string; description?: string; isActive?: boolean }): Promise<ConsentReason> {
    const response = await apiClient.put(`/system-admin/consent-reasons/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/system-admin/consent-reasons/${id}`);
  }
}

class ApplicationTypesAPI {
  async getAll(): Promise<ApplicationType[]> {
    const response = await apiClient.get('/reference/application-types');
    return response.data;
  }

  async create(data: { name: string; code: string; currency: string; price: number }): Promise<ApplicationType> {
    const response = await apiClient.post('/reference/application-types', data);
    return response.data;
  }
}

class OfficerTypesAPI {
  async getAll(): Promise<OfficerType[]> {
    const response = await apiClient.get('/system-admin/officer-types');
    return response.data;
  }

  async getById(id: string): Promise<OfficerType> {
    const response = await apiClient.get(`/system-admin/officer-types/${id}`);
    return response.data;
  }

  async create(data: { name: string; code: string; description?: string; isActive?: boolean }): Promise<OfficerType> {
    const response = await apiClient.post('/system-admin/officer-types', data);
    return response.data;
  }

  async update(id: string, data: { name?: string; code?: string; description?: string; isActive?: boolean }): Promise<OfficerType> {
    const response = await apiClient.put(`/system-admin/officer-types/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/system-admin/officer-types/${id}`);
  }
}

class IdentificationTypesAPI {
  async getAll(): Promise<IdentificationType[]> {
    const response = await apiClient.get('/system-admin/identification-types');
    return response.data;
  }

  async getById(id: string): Promise<IdentificationType> {
    const response = await apiClient.get(`/system-admin/identification-types/${id}`);
    return response.data;
  }

  async create(data: { name: string; code: string; description?: string; isActive?: boolean }): Promise<IdentificationType> {
    const response = await apiClient.post('/system-admin/identification-types', data);
    return response.data;
  }

  async update(id: string, data: { name?: string; code?: string; description?: string; isActive?: boolean }): Promise<IdentificationType> {
    const response = await apiClient.put(`/system-admin/identification-types/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/system-admin/identification-types/${id}`);
  }
}

class RestrictedWordsAPI {
  async getAll(): Promise<RestrictedWord[]> {
    const response = await apiClient.get('/system-admin/restricted-words');
    return response.data;
  }

  async getById(id: string): Promise<RestrictedWord> {
    const response = await apiClient.get(`/system-admin/restricted-words/${id}`);
    return response.data;
  }

  async create(data: { word: string; category: string; reason: string; isActive?: boolean }): Promise<RestrictedWord> {
    const response = await apiClient.post('/system-admin/restricted-words', data);
    return response.data;
  }

  async update(id: string, data: { word?: string; category?: string; reason?: string; isActive?: boolean }): Promise<RestrictedWord> {
    const response = await apiClient.put(`/system-admin/restricted-words/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/system-admin/restricted-words/${id}`);
  }
}

class NoticesAPI {
  async getAll(): Promise<Notice[]> {
    const response = await apiClient.get('/system-admin/notices');
    return response.data;
  }

  async getById(id: string): Promise<Notice> {
    const response = await apiClient.get(`/system-admin/notices/${id}`);
    return response.data;
  }

  async create(data: { 
    title: string; 
    content: string; 
    type: "info" | "warning" | "success" | "error"; 
    targetAudience?: string; 
    startDate?: string; 
    endDate?: string; 
    isActive?: boolean; 
    isPinned?: boolean 
  }): Promise<Notice> {
    const response = await apiClient.post('/system-admin/notices', data);
    return response.data;
  }

  async update(id: string, data: { 
    title?: string; 
    content?: string; 
    type?: "info" | "warning" | "success" | "error"; 
    targetAudience?: string; 
    startDate?: string; 
    endDate?: string; 
    isActive?: boolean; 
    isPinned?: boolean 
  }): Promise<Notice> {
    const response = await apiClient.put(`/system-admin/notices/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/system-admin/notices/${id}`);
  }
}

// ─── Exports ──────────────────────────────────────────────────────

export const businessClassificationsAPI = new BusinessClassificationsAPI();
export const businessTypesAPI = new BusinessTypesAPI();
export const naturesOfBusinessAPI = new NaturesOfBusinessAPI();
export const specificNaturesOfBusinessAPI = new SpecificNaturesOfBusinessAPI();
export const consentReasonsAPI = new ConsentReasonsAPI();
export const applicationTypesAPI = new ApplicationTypesAPI();
export const officerTypesAPI = new OfficerTypesAPI();
export const identificationTypesAPI = new IdentificationTypesAPI();
export const restrictedWordsAPI = new RestrictedWordsAPI();
export const noticesAPI = new NoticesAPI();