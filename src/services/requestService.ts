import { CoffeeRequest, BuildCoffeeFormData, RequestStatus, RequestTimelineEvent, UserProfile } from '../types';
import { getCurrentUser } from './authService';

const STORAGE_KEY = 'mgg_coffee_requests_v2';

const SEED_REQUESTS: CoffeeRequest[] = [
  {
    id: 'seed-req-001',
    referenceNumber: 'MGG-2026-0001',
    buyerId: 'user-buyer-001',
    status: 'Quote Prepared',
    formData: {
      origin: 'Guji',
      processing: 'Sun-Dried / Natural',
      grade: 'Grade 1',
      minCupScore: '86+',
      quantityType: 'Containers',
      quantityValue: '1 Container',
      destinationCountry: 'Germany',
      destinationPort: 'Hamburg',
      destinationNotes: 'Direct vessel routing preferred',
      companyName: 'Hanseatic Coffee Importers GmbH',
      buyerName: 'Lukas Weber',
      email: 'buyer@sample.com',
      phoneWhatsApp: '+49 40 12345678',
      country: 'Germany',
      additionalNotes: 'Inquiring for upcoming main harvest delivery. Looking for bright stone fruit profile.'
    },
    timeline: [
      {
        status: 'Submitted',
        message: 'Your coffee request has been received by Mesfin Girma Gemeda export desk.',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString()
      },
      {
        status: 'Under Review',
        message: 'Coffee specification reviewed and matched with Guji highland natural lots.',
        timestamp: new Date(Date.now() - 3600000 * 36).toISOString()
      },
      {
        status: 'Quote Prepared',
        message: 'Proforma quotation and export lot specifications sent to buyer email.',
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString()
      }
    ],
    matchedCoffeeIds: ['mgg-guji-natural-g1'],
    staffNotes: 'High priority German importer. Sample lot 100g green dispatched via courier. Follow up on Monday.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: 'seed-req-002',
    referenceNumber: 'MGG-2026-0002',
    buyerId: 'user-buyer-001',
    status: 'Under Review',
    formData: {
      origin: 'Yirgacheffe',
      processing: 'Washed',
      grade: 'Grade 1',
      minCupScore: '87+',
      quantityType: 'Containers',
      quantityValue: '2 Containers',
      destinationCountry: 'Germany',
      destinationPort: 'Hamburg',
      companyName: 'Hanseatic Coffee Importers GmbH',
      buyerName: 'Lukas Weber',
      email: 'buyer@sample.com',
      phoneWhatsApp: '+49 40 12345678',
      country: 'Germany',
      additionalNotes: 'Need floral, bergamot-forward Grade 1 lot from company farm site.'
    },
    timeline: [
      {
        status: 'Submitted',
        message: 'Your coffee request has been received.',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        status: 'Under Review',
        message: 'Export manager is evaluating lot availability at Yirgacheffe washing station.',
        timestamp: new Date(Date.now() - 3600000 * 8).toISOString()
      }
    ],
    matchedCoffeeIds: ['mgg-yirgacheffe-washed-g1'],
    staffNotes: 'Evaluating washing station lot allocation. Container staging ready.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: 'seed-req-003',
    referenceNumber: 'MGG-2026-0003',
    status: 'Processing',
    formData: {
      origin: 'Sidama',
      processing: 'Washed',
      grade: 'Grade 1',
      minCupScore: '85+',
      quantityType: 'Containers',
      quantityValue: '1 Container',
      destinationCountry: 'Sweden',
      destinationPort: 'Gothenburg',
      companyName: 'Nordic Specialty Roasters AB',
      buyerName: 'Elena Lindqvist',
      email: 'elena@nordicroasters.se',
      phoneWhatsApp: '+46 31 987654',
      country: 'Sweden',
      additionalNotes: 'Standard Grade 1 washed profile required for autumn single-origin feature.'
    },
    timeline: [
      {
        status: 'Submitted',
        message: 'Request received.',
        timestamp: new Date(Date.now() - 3600000 * 96).toISOString()
      },
      {
        status: 'Quote Prepared',
        message: 'Formal contract and proforma sent.',
        timestamp: new Date(Date.now() - 3600000 * 72).toISOString()
      },
      {
        status: 'Buyer Confirmation',
        message: 'Buyer confirmed proforma and sample approval.',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString()
      },
      {
        status: 'Processing',
        message: 'Milling, optical sorting, and preparation at Addis Ababa dry mill.',
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString()
      }
    ],
    matchedCoffeeIds: ['mgg-sidama-washed-g1'],
    staffNotes: 'Contract signed. Milling scheduled for end of week in Addis Ababa.',
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'seed-req-004',
    referenceNumber: 'MGG-2026-0004',
    status: 'Ready for Export',
    formData: {
      origin: 'Shakiso',
      processing: 'Sun-Dried / Natural',
      grade: 'Grade 1',
      minCupScore: '86+',
      quantityType: 'Containers',
      quantityValue: '2 Containers',
      destinationCountry: 'Japan',
      destinationPort: 'Yokohama',
      companyName: 'Tokyo Artisan Coffee Trading',
      buyerName: 'Kenji Sato',
      email: 'sato@tokyoartisan.jp',
      phoneWhatsApp: '+81 3 5555 0192',
      country: 'Japan',
      additionalNotes: 'Strict moisture and Grade 1 physical standard verification required.'
    },
    timeline: [
      {
        status: 'Submitted',
        message: 'Request received.',
        timestamp: new Date(Date.now() - 3600000 * 140).toISOString()
      },
      {
        status: 'Buyer Confirmation',
        message: 'LC opened and confirmed.',
        timestamp: new Date(Date.now() - 3600000 * 90).toISOString()
      },
      {
        status: 'Processing',
        message: 'Preparation, quality cupping, and export bagging complete.',
        timestamp: new Date(Date.now() - 3600000 * 40).toISOString()
      },
      {
        status: 'Ready for Export',
        message: 'Export documentation validated. Cargo staged for transport.',
        timestamp: new Date(Date.now() - 3600000 * 6).toISOString()
      }
    ],
    matchedCoffeeIds: ['mgg-shakiso-natural-g1'],
    staffNotes: 'Phytosanitary certificate and inspection completed.',
    createdAt: new Date(Date.now() - 3600000 * 140).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString()
  }
];

// Format: MGG-YYYY-XXXX
export function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const existing = getAllRequests();
  const existingNumbers = new Set(existing.map((r) => r.referenceNumber.toUpperCase()));

  let nextSequence = existing.length + 1;
  let reference = '';

  do {
    const sequencePadded = String(nextSequence).padStart(4, '0');
    reference = `MGG-${year}-${sequencePadded}`;
    nextSequence++;
  } while (existingNumbers.has(reference.toUpperCase()));

  return reference;
}

export function getAllRequests(): CoffeeRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REQUESTS));
      return SEED_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REQUESTS));
      return SEED_REQUESTS;
    }
    return parsed;
  } catch {
    return SEED_REQUESTS;
  }
}

export function getRequestsForUser(user: UserProfile | null): CoffeeRequest[] {
  if (!user) return [];
  const all = getAllRequests();

  // If user is Staff or Admin, they can access all requests
  if (user.role === 'STAFF' || user.role === 'ADMIN') {
    return all;
  }

  // If user is Buyer, match by user ID, email, or company name
  const userEmail = user.email.toLowerCase();
  const userName = user.buyerName.toLowerCase();
  const userCompany = user.companyName.toLowerCase();

  return all.filter((r) => {
    if (r.buyerId && r.buyerId === user.id) return true;
    if (r.formData.email && r.formData.email.toLowerCase() === userEmail) return true;
    if (r.formData.buyerName && r.formData.buyerName.toLowerCase() === userName) return true;
    if (r.formData.companyName && r.formData.companyName.toLowerCase() === userCompany) return true;
    return false;
  });
}

export function getRequestByReference(referenceNumber: string): CoffeeRequest | null {
  const cleaned = referenceNumber.trim().toUpperCase();
  const all = getAllRequests();
  return all.find((r) => r.referenceNumber.toUpperCase() === cleaned) || null;
}

export async function createCoffeeRequest(
  formData: BuildCoffeeFormData,
  matchedCoffeeIds?: string[]
): Promise<CoffeeRequest> {
  const referenceNumber = generateReferenceNumber();
  const now = new Date().toISOString();
  const currentUser = getCurrentUser();

  const newRequest: CoffeeRequest = {
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    referenceNumber,
    buyerId: currentUser?.id,
    status: 'Submitted',
    formData,
    timeline: [
      {
        status: 'Submitted',
        message: 'Your coffee request has been received by Mesfin Girma Gemeda export team.',
        timestamp: now
      }
    ],
    matchedCoffeeIds: matchedCoffeeIds || [],
    staffNotes: '',
    createdAt: now,
    updatedAt: now
  };

  // Attempt backend API sync
  try {
    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest)
    });
    if (res.ok) {
      const serverData = await res.json();
      if (serverData.request) {
        saveRequestLocally(serverData.request);
        return serverData.request;
      }
    }
  } catch {
    // Local persistence fallback
  }

  saveRequestLocally(newRequest);
  return newRequest;
}

export function saveRequestLocally(request: CoffeeRequest): void {
  try {
    const existing = getAllRequests();
    const updated = [request, ...existing.filter((r) => r.referenceNumber !== request.referenceNumber)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // quota or private mode fallback
  }
}

export function updateRequestStatus(
  referenceNumber: string,
  newStatus: RequestStatus,
  customMessage?: string,
  staffNote?: string
): CoffeeRequest {
  const all = getAllRequests();
  const index = all.findIndex((r) => r.referenceNumber.toUpperCase() === referenceNumber.toUpperCase());
  if (index === -1) {
    throw new Error(`Request with reference ${referenceNumber} not found.`);
  }

  const existing = all[index];
  const now = new Date().toISOString();

  const defaultMessages: Record<RequestStatus, string> = {
    Submitted: 'Your coffee request has been received.',
    'Under Review': 'Export specialist is reviewing origin lot availability and cupping scores.',
    'Quote Prepared': 'Proforma quotation and export terms prepared and dispatched to buyer.',
    'Buyer Confirmation': 'Awaiting final proforma confirmation and export contract details.',
    Processing: 'Coffee undergoing milling, color sorting, and grading preparation.',
    'Ready for Export': 'Lots inspected, export containers staged and ready for shipping.',
    Completed: 'Shipment dispatched to destination port. Commercial export cycle completed.'
  };

  const newTimelineEvent: RequestTimelineEvent = {
    status: newStatus,
    message: customMessage?.trim() || defaultMessages[newStatus],
    timestamp: now
  };

  const updatedRequest: CoffeeRequest = {
    ...existing,
    status: newStatus,
    timeline: [...existing.timeline, newTimelineEvent],
    staffNotes: staffNote !== undefined ? staffNote : existing.staffNotes,
    updatedAt: now
  };

  all[index] = updatedRequest;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to update request status', err);
  }

  return updatedRequest;
}

export function updateRequestStaffNotes(referenceNumber: string, staffNotes: string): CoffeeRequest {
  const all = getAllRequests();
  const index = all.findIndex((r) => r.referenceNumber.toUpperCase() === referenceNumber.toUpperCase());
  if (index === -1) {
    throw new Error(`Request with reference ${referenceNumber} not found.`);
  }

  const updatedRequest: CoffeeRequest = {
    ...all[index],
    staffNotes,
    updatedAt: new Date().toISOString()
  };

  all[index] = updatedRequest;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to update staff notes', err);
  }

  return updatedRequest;
}

export function deleteRequest(referenceNumber: string): void {
  const all = getAllRequests();
  const filtered = all.filter((r) => r.referenceNumber.toUpperCase() !== referenceNumber.toUpperCase());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete request', err);
  }
}

export async function fetchRequestByReference(referenceNumber: string): Promise<CoffeeRequest | null> {
  try {
    const res = await fetch(`/api/requests/${encodeURIComponent(referenceNumber.trim())}`);
    if (res.ok) {
      const data = await res.json();
      if (data.request) {
        saveRequestLocally(data.request);
        return data.request;
      }
    }
  } catch {
    // fallback
  }

  return getRequestByReference(referenceNumber);
}
