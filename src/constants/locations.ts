/**
 * Centralized Company & Origin Location Configuration
 * Standardized for Mesfin Girma Gemeda Coffee Supplies & Exporter.
 * Supports interactive Google Maps viewing, navigation, and embedded maps.
 */

export interface CompanyLocation {
  id: string;
  name: string;
  shortName: string;
  category: string;
  address: string;
  cityTown: string;
  region: string;
  country: string;
  description: string;
  phone?: string;
  phoneInternational?: string;
  email?: string;
  mapsSearchUrl: string;
  directionsUrl: string;
  embedMapUrl: string;
  isOwnedFarm?: boolean;
  isCollaboration?: boolean;
  image?: string;
  zoom?: number;
}

/**
 * Builds standard Google Maps search URL (works on web and opens Google Maps app on mobile)
 */
export function buildGoogleMapsSearchUrl(placeNameAndAddress: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeNameAndAddress)}`;
}

/**
 * Builds standard Google Maps directions URL (works on web and opens Google Maps app on mobile)
 */
export function buildGoogleMapsDirectionsUrl(destination: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

/**
 * Builds standard Google Maps embed URL for interactive iframes without requiring API billing key
 */
export function buildGoogleMapsEmbedUrl(query: string, zoom = 12, satellite = false): string {
  const typeParam = satellite ? '&t=k' : '';
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}${typeParam}&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
}

/**
 * Primary verified company locations and regional sourcing origins.
 * Source of truth for all frontend location mapping and API fallback.
 */
export const COMPANY_LOCATIONS_MAP: Record<string, CompanyLocation> = {
  westHarerge: {
    id: 'westHarerge',
    name: 'Main Office — Mechara / Mecheta',
    shortName: 'West Hararghe Main Office',
    category: 'Executive Headquarters',
    address: 'Daro Lebo, Mechara/Mecheta, West Hararghe, Ethiopia',
    cityTown: 'Mechara/Mecheta',
    region: 'West Hararghe, Daro Lebo',
    country: 'Ethiopia',
    description: 'Executive headquarters directing coffee collection, local grower relationships, dry-processing oversight, and regional operations across historic Eastern Oromia.',
    phone: '0967576305',
    phoneInternational: '+251 967 576 305',
    email: 'mesfincoffee1416@gmail.com',
    mapsSearchUrl: buildGoogleMapsSearchUrl('Daro Lebo Mechara Mecheta West Hararghe Ethiopia'),
    directionsUrl: buildGoogleMapsDirectionsUrl('Daro Lebo Mechara Mecheta West Hararghe Ethiopia'),
    embedMapUrl: buildGoogleMapsEmbedUrl('Mechara West Hararghe Ethiopia', 12),
    image: '/images/Company/actual-company-image- 1.jpg',
    zoom: 12
  },
  addisAbaba: {
    id: 'addisAbaba',
    name: 'Addis Ababa Branch — Jemo Michael',
    shortName: 'Addis Ababa Branch',
    category: 'Commercial & Export Branch',
    address: 'Jemo Michael, Addis Ababa, Ethiopia',
    cityTown: 'Jemo Michael',
    region: 'Addis Ababa',
    country: 'Ethiopia',
    description: 'Central commercial and export operations branch coordinating international buyer relations, sample dispatch, laboratory sensory cupping, export documentation, and container freight logistics.',
    phone: '0967576305',
    phoneInternational: '+251 967 576 305',
    email: 'mesfincoffee1416@gmail.com',
    mapsSearchUrl: buildGoogleMapsSearchUrl('Jemo Michael Addis Ababa Ethiopia'),
    directionsUrl: buildGoogleMapsDirectionsUrl('Jemo Michael Addis Ababa Ethiopia'),
    embedMapUrl: buildGoogleMapsEmbedUrl('Jemo Michael Addis Ababa Ethiopia', 14),
    image: '/images/Company/actual-company-image- 2.jpg',
    zoom: 14
  },
  shakiso: {
    id: 'shakiso',
    name: 'Shakiso Farm & Processing Hub',
    shortName: 'Shakiso Farm Site',
    category: 'Company Farm Site',
    address: 'Shakiso, Guji Zone, Ethiopia',
    cityTown: 'Shakiso',
    region: 'Guji Zone, Shakiso',
    country: 'Ethiopia',
    description: 'Company-owned high-altitude production farm and African sun-drying beds producing fruity, floral, and sweet natural lots in the Guji highlands.',
    mapsSearchUrl: buildGoogleMapsSearchUrl('Shakiso Guji Zone Ethiopia'),
    directionsUrl: buildGoogleMapsDirectionsUrl('Shakiso Guji Zone Ethiopia'),
    embedMapUrl: buildGoogleMapsEmbedUrl('Shakiso Ethiopia', 12),
    isOwnedFarm: true,
    image: '/images/origins/Shakiso/actual-shakiso-farm-image-01.jpg',
    zoom: 12
  },
  yirgacheffe: {
    id: 'yirgacheffe',
    name: 'Yirgacheffe Farm & Washing Station',
    shortName: 'Yirgacheffe Washing Station',
    category: 'Company Farm Site & Washing Station',
    address: 'Yirgacheffe, Southern Ethiopia',
    cityTown: 'Yirgacheffe',
    region: 'Gedeo Zone, Southern Ethiopia',
    country: 'Ethiopia',
    description: 'Company-owned mountain washing station and farm with natural spring water channels, producing renowned floral, bergamot, and tea-like Grade 1 washed coffees.',
    mapsSearchUrl: buildGoogleMapsSearchUrl('Yirgacheffe Ethiopia'),
    directionsUrl: buildGoogleMapsDirectionsUrl('Yirgacheffe Ethiopia'),
    embedMapUrl: buildGoogleMapsEmbedUrl('Yirgacheffe Ethiopia', 12),
    isOwnedFarm: true,
    image: '/images/origins/yirgacheffe/actual-yirgacheffe-farm-image-01.jpg',
    zoom: 12
  },
  sidama: {
    id: 'sidama',
    name: 'Sidama Sourcing Network',
    shortName: 'Sidama Sourcing Network',
    category: 'Regional Sourcing Network',
    address: 'Sidama Coffee Belt, Ethiopia',
    cityTown: 'Hawassa / Bensa Corridor',
    region: 'Sidama Region',
    country: 'Ethiopia',
    description: 'Regional collection network sourcing sweet, citrus, and floral coffees across Sidama micro-climates through dedicated local farmer associations.',
    mapsSearchUrl: buildGoogleMapsSearchUrl('Sidama Ethiopia'),
    directionsUrl: buildGoogleMapsDirectionsUrl('Sidama Ethiopia'),
    embedMapUrl: buildGoogleMapsEmbedUrl('Sidama Ethiopia', 11),
    isCollaboration: true,
    image: '/images/origins/Sidama/actual-sidama-farm-image-01.jpg',
    zoom: 11
  },
  guji: {
    id: 'guji',
    name: 'Guji Origin Sourcing Area',
    shortName: 'Guji Sourcing Area',
    category: 'Specialty Sourcing Region',
    address: 'Guji Zone, Oromia, Ethiopia',
    cityTown: 'Guji Zone',
    region: 'Oromia Region, Southern Ethiopia',
    country: 'Ethiopia',
    description: 'Vast forested highlands with cool microclimates and ancient semi-forest coffee canopies renowned for wild strawberry, peach nectar, and honey sweetness.',
    mapsSearchUrl: buildGoogleMapsSearchUrl('Guji Zone Ethiopia'),
    directionsUrl: buildGoogleMapsDirectionsUrl('Guji Zone Ethiopia'),
    embedMapUrl: buildGoogleMapsEmbedUrl('Guji Ethiopia', 10),
    isCollaboration: true,
    image: '/images/origins/guji/actual-guji-farm-image-01.jpg',
    zoom: 10
  },
  arsi: {
    id: 'arsi',
    name: 'Arsi Highland Sourcing',
    shortName: 'Arsi Highlands',
    category: 'Highland Sourcing Area',
    address: 'Arsi Highlands, Oromia, Ethiopia',
    cityTown: 'Asella / Chilalo region',
    region: 'Arsi Zone, Oromia',
    country: 'Ethiopia',
    description: 'Highland sourcing area delivering floral, citrus, and fruity sweet profile lots from high volcanic plateaus with cold mountain nights.',
    mapsSearchUrl: buildGoogleMapsSearchUrl('Arsi Ethiopia'),
    directionsUrl: buildGoogleMapsDirectionsUrl('Arsi Ethiopia'),
    embedMapUrl: buildGoogleMapsEmbedUrl('Arsi Ethiopia', 10),
    isCollaboration: true,
    image: '/images/origins/arsi/actual-arsi-farm-image01.jpg',
    zoom: 10
  },
  harar: {
    id: 'harar',
    name: 'Harar Historic Origin Network',
    shortName: 'Harar Origin Network',
    category: 'Historic Sourcing Network',
    address: 'Hararghe Coffee Region, Ethiopia',
    cityTown: 'Harar / Mechara corridor',
    region: 'East / West Hararghe',
    country: 'Ethiopia',
    description: 'Celebrated sun-dried dry-process coffees known for deep blueberry, wine-like acidity, dried fig, and rich mocha chocolate notes.',
    mapsSearchUrl: buildGoogleMapsSearchUrl('Harar Ethiopia'),
    directionsUrl: buildGoogleMapsDirectionsUrl('Harar Ethiopia'),
    embedMapUrl: buildGoogleMapsEmbedUrl('Harar Ethiopia', 11),
    isCollaboration: true,
    image: '/images/origins/harer/actual-harer-farm-image-01.jpg',
    zoom: 11
  }
};

/**
 * Key mapping aliases to ensure legacy or alternative IDs resolve properly.
 */
COMPANY_LOCATIONS_MAP['main-office'] = COMPANY_LOCATIONS_MAP.westHarerge;
COMPANY_LOCATIONS_MAP['addis-branch'] = COMPANY_LOCATIONS_MAP.addisAbaba;
COMPANY_LOCATIONS_MAP['farm-shakiso'] = COMPANY_LOCATIONS_MAP.shakiso;
COMPANY_LOCATIONS_MAP['farm-yirgacheffe'] = COMPANY_LOCATIONS_MAP.yirgacheffe;
COMPANY_LOCATIONS_MAP['hub-sidama'] = COMPANY_LOCATIONS_MAP.sidama;
COMPANY_LOCATIONS_MAP['hub-arsi'] = COMPANY_LOCATIONS_MAP.arsi;
COMPANY_LOCATIONS_MAP['hub-harar'] = COMPANY_LOCATIONS_MAP.harar;

/**
 * Array of all company locations for listing and mapping
 */
export const COMPANY_LOCATIONS_LIST: CompanyLocation[] = [
  COMPANY_LOCATIONS_MAP.westHarerge,
  COMPANY_LOCATIONS_MAP.addisAbaba,
  COMPANY_LOCATIONS_MAP.shakiso,
  COMPANY_LOCATIONS_MAP.yirgacheffe,
  COMPANY_LOCATIONS_MAP.sidama,
  COMPANY_LOCATIONS_MAP.guji,
  COMPANY_LOCATIONS_MAP.arsi,
  COMPANY_LOCATIONS_MAP.harar
];

/**
 * Helper to get a location by ID or name
 */
export function getLocationById(idOrName: string): CompanyLocation {
  const normalized = idOrName.toLowerCase().trim();
  if (COMPANY_LOCATIONS_MAP[normalized]) {
    return COMPANY_LOCATIONS_MAP[normalized];
  }
  const match = COMPANY_LOCATIONS_LIST.find(
    (l) =>
      l.id.toLowerCase() === normalized ||
      l.shortName.toLowerCase().includes(normalized) ||
      l.name.toLowerCase().includes(normalized) ||
      l.cityTown.toLowerCase().includes(normalized)
  );
  return match || COMPANY_LOCATIONS_MAP.westHarerge;
}

/**
 * Origin-specific Google Maps helper for Ethiopian origins
 */
export function getOriginGoogleMapsUrls(originName: string): {
  searchUrl: string;
  directionsUrl: string;
  embedUrl: string;
  location: CompanyLocation;
} {
  const normalized = originName.toLowerCase().trim();
  const found =
    COMPANY_LOCATIONS_MAP[normalized] ||
    COMPANY_LOCATIONS_LIST.find(
      (loc) =>
        loc.name.toLowerCase().includes(normalized) ||
        loc.cityTown.toLowerCase().includes(normalized) ||
        loc.region.toLowerCase().includes(normalized)
    );

  if (found) {
    return {
      searchUrl: found.mapsSearchUrl,
      directionsUrl: found.directionsUrl,
      embedUrl: found.embedMapUrl,
      location: found
    };
  }

  const query = `${originName} Ethiopia`;
  return {
    searchUrl: buildGoogleMapsSearchUrl(query),
    directionsUrl: buildGoogleMapsDirectionsUrl(query),
    embedUrl: buildGoogleMapsEmbedUrl(query),
    location: {
      id: normalized,
      name: `${originName} Coffee Origin`,
      shortName: originName,
      category: 'Ethiopian Coffee Origin',
      address: `${originName}, Ethiopia`,
      cityTown: originName,
      region: `${originName} Region`,
      country: 'Ethiopia',
      description: `Ethiopian specialty coffee growing zone in ${originName}.`,
      mapsSearchUrl: buildGoogleMapsSearchUrl(query),
      directionsUrl: buildGoogleMapsDirectionsUrl(query),
      embedMapUrl: buildGoogleMapsEmbedUrl(query),
      isCollaboration: true
    }
  };
}
