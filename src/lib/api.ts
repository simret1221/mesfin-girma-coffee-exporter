const API_BASE_URL = "http://localhost:4000/api";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

export interface Coffee {
  id: number;
  name: string;
  originId: number | null;
  processingMethod: string | null;
  grade: string | null;
  cupScore: number | null;
  altitude: string | null;
  variety: string | null;
  description: string | null;
  imageUrl: string | null;
  available: boolean;
  origin?: {
    id: number;
    name: string;
    region: string | null;
  } | null;
}

export interface Origin {
  id: number;
  name: string;
  region: string | null;
  description: string | null;
  imageUrl: string | null;
}

export interface Company {
  name: string;
  locations: {
    mainAddress: string;
    branches: string[];
  };
  farms: string[];
  ownedWashingPlaces: string[];
  collaborationAreas: string[];
  focusAreas: string[];
  products: {
    processingMethods: string[];
    origins: string[];
    grade: string;
    cupScore: string;
    capacity: string;
  };
  social: {
    whatsappDisplayName: string;
    tiktok: string;
  };
}

export interface Location {
  id: number;
  name: string;
  type: string;
  address: string | null;
  description: string | null;
  latitude: string | null;
  longitude: string | null;
  googleMapsUrl: string | null;
}

export interface InquiryItem {
  coffeeProductId: number;
  quantity?: number;
}

export interface CreateInquiry {
  buyerName: string;
  companyName?: string;
  email: string;
  phone?: string;
  country?: string;
  message?: string;
  requestedQuantity?: number;
  items?: InquiryItem[];
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    reference: string;
    status: string;
    createdAt: string;
  };
}

export const api = {
  getCoffees: () =>
    apiRequest<{ success: boolean; data: Coffee[] }>("/coffees"),

  getCoffee: (id: number) =>
    apiRequest<{ success: boolean; data: Coffee }>(`/coffees/${id}`),

  getOrigins: () =>
    apiRequest<{ success: boolean; data: Origin[] }>("/origins"),

  getOrigin: (id: number) =>
    apiRequest<{ success: boolean; data: Origin }>(`/origins/${id}`),

  getCompany: () =>
    apiRequest<{ success: boolean; data: Company }>("/company"),

  getLocations: () =>
    apiRequest<{ success: boolean; data: Location[] }>("/locations"),

  createInquiry: (inquiry: CreateInquiry) =>
    apiRequest<InquiryResponse>("/inquiries", {
      method: "POST",
      body: JSON.stringify(inquiry),
    }),

  trackInquiry: (reference: string) =>
    apiRequest<{
      success: boolean;
      data: {
        id: number;
        reference: string;
        buyerName: string;
        companyName: string | null;
        email: string;
        country: string | null;
        message: string | null;
        requestedQuantity: number | null;
        status: string;
        createdAt: string;
        updatedAt: string;
      };
    }>(`/inquiries/${encodeURIComponent(reference)}`),
};