/**
 * Frontend Data Models & Types
 * Mesfin Girma Gemeda Coffee Supplies & Exporter
 * Centralized, backend-compatible TypeScript interfaces
 */

export type CharacteristicType = 'typical_regional' | 'verified_lot';
export type ProcessingMethod = 'Washed' | 'Sun-Dried / Natural' | 'Washed & Sun-Dried';
export type CoffeeAvailability = 'Available for Export' | 'Harvesting' | 'Processing' | 'Upon Request';

/**
 * 1. Coffee Model
 * Represents a single lot or offering in the specialty export catalog.
 */
export interface CoffeeProduct {
  id: string;
  lotCode?: string;
  name: string;
  origin: string;
  region: string;
  grade: 'Grade 1' | 'Grade 2';
  cupScoreBaseline: string; // e.g. "Above 85", "86+", "88"
  processingMethod: 'Washed' | 'Sun-Dried / Natural';
  altitude: string;
  altitudeType: CharacteristicType;
  variety: string;
  varietyType: CharacteristicType;
  flavorProfile: string;
  flavorProfileType: CharacteristicType;
  availability: CoffeeAvailability;
  harvest: string;
  description: string;
  image: string;
  isFeatured?: boolean;
}

// Standard alias required by backend integration
export type Coffee = CoffeeProduct;

/**
 * 2. Origin Model
 * Represents an Ethiopian coffee growing terroir / regional zone.
 */
export interface OriginInfo {
  id: string;
  name: string;
  region: string;
  description: string;
  shortDescription?: string;
  typicalAltitudeMin: number;
  typicalAltitudeMax: number;
  typicalAltitude: string; // formatted e.g. "1,700–2,200 masl"
  typicalVarieties: string;
  typicalCharacteristics: string;
  primaryFocus: boolean;
  isPrimaryFocus?: boolean;
  availableProcessing: string[];
  coordinates: { x: number; y: number }; // Percentage (0-100)
  color?: string;
  image?: string;
  flavorNotes?: string[];
  terrainDescription?: string;
}

// Standard alias required by backend integration
export type Origin = OriginInfo;

/**
 * 3. Location Model
 * Represents an owned farm, washing station, sourcing network, or office branch.
 */
export interface CompanyLocation {
  id: string;
  name: string;
  shortName?: string;
  category: 'Main Office' | 'Addis Ababa Branch' | 'Own Farm' | 'Sourcing & Processing' | 'Collaboration Hub' | string;
  zoneWoreda?: string;
  cityTown: string;
  address?: string;
  addressDetail?: string;
  region?: string;
  country?: string;
  phone?: string;
  phoneInternational?: string;
  email?: string;
  coordinates?: { x: number; y: number };
  description: string;
  mapsSearchUrl?: string;
  directionsUrl?: string;
  embedMapUrl?: string;
  isOwnedFarm?: boolean;
  isCollaboration?: boolean;
  image?: string;
  zoom?: number;
}

// Standard alias required by backend integration
export type Location = CompanyLocation;

/**
 * 4. Request Timeline Event
 */
export type RequestStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Quote Prepared'
  | 'Buyer Confirmation'
  | 'Processing'
  | 'Ready for Export'
  | 'Completed';

export interface RequestTimelineEvent {
  status: RequestStatus;
  message: string;
  timestamp: string;
}

// Standard alias required by backend integration
export type RequestTimeline = RequestTimelineEvent;

/**
 * Form data payload submitted by international green coffee buyers
 */
export interface BuildCoffeeFormData {
  // Origin
  origin: 'Yirgacheffe' | 'Guji' | 'Sidama' | 'Other Ethiopia' | 'Not sure' | string;
  otherOriginText?: string;

  // Processing
  processing: 'Washed' | 'Sun-Dried / Natural' | 'Either' | string;

  // Quality
  grade: 'Grade 1' | 'No preference' | string;
  minCupScore?: string;

  // Quantity
  quantityType: 'Bags' | 'Containers' | 'Custom' | string;
  quantityValue?: string;

  // Logistics
  destinationCountry: string;
  destinationPort?: string;
  destinationNotes?: string;
  incoterm?: string;

  // Buyer Information
  companyName: string;
  buyerName: string;
  email: string;
  phoneWhatsApp: string;
  country: string;
  additionalNotes?: string;

  // Selected coffee lot context
  selectedCoffeeId?: string;
  selectedCoffeeName?: string;
}

/**
 * 5. Coffee Request Model
 * Submitted buyer inquiry, order or container contract request.
 */
export interface CoffeeRequest {
  id: string;
  referenceNumber: string; // Format: MGG-YYYY-XXXX
  status: RequestStatus;
  formData: BuildCoffeeFormData;
  timeline: RequestTimelineEvent[];
  matchedCoffeeIds?: string[];
  staffNotes?: string;
  buyerId?: string;
  quoteNotes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 6. User Model
 */
export type UserRole = 'BUYER' | 'STAFF' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  buyerName: string;
  companyName: string;
  phoneWhatsApp: string;
  country: string;
  destinationPort?: string;
  savedCoffeeIds?: string[];
  createdAt: string;
}

// Standard alias required by backend integration
export type User = UserProfile;

/**
 * 7. Match Result Model
 * Output of the matching algorithm comparing buyer requirements to coffee offerings.
 */
export interface CoffeeMatchResult {
  coffee: CoffeeProduct;
  matchScore: number; // 0 - 100
  explanation: string;
  matchedCriteria: {
    origin: boolean;
    processing: boolean;
    grade: boolean;
    cupScore: boolean;
    availability: boolean;
  };
}

// Standard alias required by backend integration
export type MatchResult = CoffeeMatchResult;

export type CatalogSortOption = 'featured' | 'cupScore' | 'origin' | 'name';

export interface BuyerRequirementForm extends BuildCoffeeFormData {
  targetCupScore: string;
}
