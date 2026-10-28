export const COMPANY = {
  name: 'MESFIN GIRMA GEMEDA COFFEE SUPPLIES AND EXPORTER',
  shortName: 'Mesfin Girma Gemeda Coffee',
  slogan: 'From Ethiopian Origin to the World.',
  heroHeadline: 'Ethiopian Specialty Coffee, From Origin to the World',
  heroSupportingText: "Sourced from Ethiopia's distinctive coffee-growing regions and prepared to meet the requirements of international buyers.",

  // Contact details
  phone: '0967576305',
  phoneInternational: '+251 967 576 305',
  email: 'mesfincoffee1416@gmail.com',
  whatsappName: 'Mesfin Girma',
  whatsappNumber: '251967576305',
  whatsappUrl: 'https://wa.me/251967576305?text=Hello%20Mesfin%20Girma%20Gemeda%20Coffee%2C%20I%20am%20an%20international%20buyer%20inquiring%20about%20Ethiopian%20specialty%20coffee.',
  tiktok: 'Mesfin_Girma_Gemeda',
  tiktokUrl: 'https://www.tiktok.com/@Mesfin_Girma_Gemeda',

  // Locations
  mainLocation: {
    title: 'Main Office',
    region: 'West Hararghe',
    woreda: 'Daro Lebo',
    town: 'Mechara/Mecheta',
    country: 'Ethiopia',
    description: 'Headquarters directing regional coffee collection, local community sourcing, and processing oversight.'
  },
  addisLocation: {
    title: 'Addis Ababa Branch',
    area: 'Jemo Michael',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    description: 'Central commercial and export operations branch coordinating international buyer relations and logistics.'
  },

  // Confirmed operational parameters
  farms: ['Shakiso', 'Yirgacheffe'],
  products: ['Washed coffee', 'Unwashed coffee'],
  processingMethods: ['Washed', 'Sun-Dried / Natural'],
  primarySpecialtyFocus: ['Yirgacheffe', 'Guji', 'Sidama'],
  additionalSourcingAreas: ['Shakiso', 'Arsi', 'Harar', 'Nekemte through collaboration'],
  exportCapacity: 'Up to 100 containers',
  qualityBaseline: {
    grade: 'Grade 1',
    cupScore: 'Above 85'
  },
  altitudeStatement: 'Varies by production site.',
  certificationsStatement: 'Not yet confirmed. Available upon verified qualification.'
};

export const COMPANY_LOCATIONS = [
  {
    id: 'main-office',
    name: 'Main Office — Mechara / Mecheta',
    category: 'Main Office',
    zoneWoreda: 'West Hararghe, Daro Lebo',
    cityTown: 'Mechara/Mecheta',
    addressDetail: 'Daro Lebo, West Hararghe, Mechara/Mecheta, Ethiopia',
    phone: '0967576305',
    coordinates: { x: 74, y: 44 }, // Eastern Oromia / Hararghe
    description: 'Executive headquarters directing coffee collection, local grower relationships, and regional processing.'
  },
  {
    id: 'addis-branch',
    name: 'Addis Ababa Branch — Jemo Michael',
    category: 'Addis Ababa Branch',
    zoneWoreda: 'Addis Ababa',
    cityTown: 'Jemo Michael',
    addressDetail: 'Jemo Michael, Addis Ababa, Ethiopia',
    phone: '0967576305',
    coordinates: { x: 50, y: 40 }, // Central capital
    description: 'International buyer liaison, commercial documentation, logistics coordination, and export staging.'
  },
  {
    id: 'farm-shakiso',
    name: 'Shakiso Farm & Processing Hub',
    category: 'Own Farm',
    zoneWoreda: 'Guji Zone, Shakiso',
    cityTown: 'Shakiso',
    addressDetail: 'Shakiso, Guji Zone, Ethiopia',
    coordinates: { x: 53, y: 72 }, // High altitude Guji
    description: 'High-altitude production farm and sun-drying beds producing fruity, floral, and sweet natural lots.'
  },
  {
    id: 'farm-yirgacheffe',
    name: 'Yirgacheffe Farm & Washing Station',
    category: 'Own Farm',
    zoneWoreda: 'Gedeo Zone, Yirgacheffe',
    cityTown: 'Yirgacheffe',
    addressDetail: 'Yirgacheffe, Southern Ethiopia',
    coordinates: { x: 42, y: 68 }, // Classic Yirgacheffe valley
    description: 'Pristine mountain washing station producing renowned floral, citrus, and tea-like Grade 1 coffees.'
  },
  {
    id: 'hub-sidama',
    name: 'Sidama Sourcing Network',
    category: 'Sourcing & Processing',
    zoneWoreda: 'Sidama Region',
    cityTown: 'Hawassa / Bensa Corridor',
    addressDetail: 'Sidama Coffee Belt, Ethiopia',
    coordinates: { x: 46, y: 60 },
    description: 'Collection network sourcing sweet, citrus, and floral coffees across Sidama micro-climates.'
  },
  {
    id: 'hub-arsi',
    name: 'Arsi Highland Sourcing',
    category: 'Sourcing & Processing',
    zoneWoreda: 'Arsi Zone',
    cityTown: 'Asella / Chilalo region',
    addressDetail: 'Arsi Highlands, Ethiopia',
    coordinates: { x: 58, y: 48 },
    description: 'Highland sourcing area delivering floral, citrus, and fruity sweet profile lots.'
  },
  {
    id: 'hub-harar',
    name: 'Harar Historic Origin Network',
    category: 'Sourcing & Processing',
    zoneWoreda: 'East / West Hararghe',
    cityTown: 'Harar / Mechara corridor',
    addressDetail: 'Hararghe Coffee Region, Ethiopia',
    coordinates: { x: 80, y: 38 },
    description: 'Celebrated sun-dried dry-process coffees known for deep berry, wine-like, and chocolate notes.'
  },
  {
    id: 'hub-nekemte',
    name: 'Nekemte Regional Collaboration',
    category: 'Collaboration Hub',
    zoneWoreda: 'East Welega',
    cityTown: 'Nekemte',
    addressDetail: 'Western Oromia Collaboration, Ethiopia',
    coordinates: { x: 30, y: 42 },
    description: 'Strategic sourcing collaboration delivering distinctive Western Ethiopian specialty lots.'
  }
];
