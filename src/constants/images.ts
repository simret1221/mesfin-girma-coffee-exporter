/**
 * Standardized Centralized Image Paths & Category Structures
 * Matches the MESFIN GIRMA GEMEDA COFFEE EXPORTER backend structure.
 */

export const IMAGE_PATHS = {
  
  // COFFEE PRODUCTS
  coffee: [
    '/images/Coffee/yirgacheffe-washed-g1.jpg',
    '/images/Coffee/guji-natural-g1.jpg',
    '/images/Coffee/sidama-washed-g1.jpg',
    '/images/Coffee/shakiso-natural-g1.jpg',
    '/images/Coffee/arsi-washed-g1.jpg',
    '/images/Coffee/harar-natural-g1.jpg',
  ] as const,


  // 2. ORIGIN IMAGES (Category: origins)
  origins: {
    yirgacheffe: '/images/origins/yirgacheffe/yirgacheffe-origin.jpg',
    yirgacheffeWashedSite: '/images/origins/yirgacheffe/actual-yirgacaffe- wahsed-coffee- site-image.jpg',
    guji: '/images/origins/guji/guji-origin.jpg',
    sidama: '/images/origins/Sidama/actual-sidama-farm-image-01.jpg',
    shakiso: '/images/origins/Shakiso/actual-shakiso-farm-image-01.jpg',
    arsi: '/images/origins/arsi/arsi-washed-g1.jpg',
    harar: '/images/origins/harar/harar-natural-g1.jpg'
  },

  // 3. COMPANY IMAGES (Category: Company)
  company: [
    '/images/Company/actual-company-image- 1.jpg',
    '/images/Company/actual-company-image- 2.jpg',
    '/images/Company/actual-company-image- 3.jpg'
  ] as const,

  // 4. FARM IMAGES (Category: Farms)
  farms: [
    '/images/Farms/actual-farm-image.jpg',
    '/images/Farms/actual-farm-image-1.1.jpg',
    '/images/Farms/actual-farm-image-1.2.jpg',
    '/images/Farms/actual-farm-image-1.3.jpg',
    '/images/Farms/actual-farm-image-1.4.jpg',
    '/images/Farms/actual-farm-image-1.5.jpg',
    '/images/Farms/actual-farm-image-1.6.jpg',
    '/images/Farms/shakiso-farm.jpg',
    '/images/Farms/yirgacheffe-station.jpg'
  ] as const,

  // 5. HERO IMAGES (Category: hero)
  hero: [
    '/images/hero/actual-hero-image-001.jpg',
    '/images/hero/actual-hero-image-002.jpg',
    '/images/hero/actual-hero-image-003.jpg',
    '/images/hero/actual-hero-image-004.jpg'
    
  ] as const,

  // 6. PROCESSING IMAGES (Category: processing)
  // Matches the 8 backend processing stages:
  // Farm Stage, Harvesting, Transportation, Drying, Filtering, Examination, Final Preparation, Exportation
  processing: {
    farmStage: '/images/processing/01-farm-stage.jpg',
    harvesting: '/images/processing/01-harvest.jpg',
    transportation: '/images/processing/03-transportation.jpg',
    drying: '/images/processing/03-drying.jpg',
    filtering: '/images/processing/02-washing.jpg',
    examination: '/images/processing/04-quality-cupping.jpg',
    finalPreparation: '/images/processing/05-export-prep.jpg',
    exportation: '/images/processing/08-exportation.jpg'
  },
} as const;

/**
 * Fallback map from backend paths to real files on disk
 * Used by the server middleware and frontend fallback handlers.
 */

export const BACKEND_TO_LOCAL_IMAGE_MAP: Record<string, string> = {
  // Coffee Products
  '/images/Coffee/actual-cofee-image 01.jpg':
    '/images/coffee/yirgacheffe-washed-g1.jpg',

  // Origins
  '/images/origins/yirgacheffe/actual-yirgacheffe-farm-image-01.jpg':
    '/images/origins/yirgacheffe/yirgacheffe-origin.jpg',
  '/images/origins/yirgacheffe/actual-yirgacaffe- wahsed-coffee- site-image.jpg':
    '/images/farms/yirgacheffe-station.jpg',
  '/images/origins/guji/actual-guji-farm-image-01.jpg':
    '/images/origins/guji/guji-origin.jpg',
  '/images/origins/Sidama/actual-sidama-farm-image-01.jpg':
    '/images/origins/sidama/sidama-origin.jpg',
  '/images/origins/Shakiso/actual-shakiso-farm-image-01.jpg':
    '/images/origins/shakiso/shakiso-farm.jpg',
  '/images/origins/arsi/actual-arsi-farm-image01.jpg':
    '/images/origins/arsi/arsi-washed-g1.jpg',
  '/images/origins/harar/actual-harar-farm-image-01.jpg':
    '/images/origins/harar/harar-natural-g1.jpg',

  // Company
  '/images/Company/actual-company-image- 1.jpg':
    '/images/company/actual-company-image- 1',
  '/images/Company/actual-company-image- 2.jpg':
    '/images/company/actual-company-image- 2',
  '/images/Company/actual-company-image- 3.jpg':
    '/images/Company/actual-company-image- 3',
  '/images/Company/actual-company-image- 4.jpg':
    '/images/Company/addis-branch.jpg',
  '/images/Company/actual-company-image- 5.jpg':
    '/images/Company/hararghe-origin.jpg',

  // Farms
  '/images/Farms/actual-farm-image.jpg':
    '/images/farms/actual-farm-image-1.1.jpg',
  '/images/Farms/actual-farm-image-1.jpg':
    '/images/farms/actual-farm-image-1.2.jpg',
  '/images/Farms/actual-farm-image-1.1.jpg':
    '/images/farms/actual-farm-image-1.3.jpg',
  '/images/Farms/actual-farm-image-1.2.jpg':
    '/images/farms/actual-farm-image-1.4.jpg',
  '/images/Farms/actual-farm-image-1.3.jpg':
    '/images/farms/actual-farm-image-1.5.jpg',
  '/images/Farms/actual-farm-image-1.4.jpg':
    '/images/farms/actual-farm-image-1.6.jpg',
  '/images/Farms/actual-farm-image-1.5.jpg':
    '/images/farms/shakiso-farm.jpg',
  '/images/Farms/actual-farm-image-1.6.jpg':
    '/images/farms/yirgacheffe-station.jpg',
  '/images/Farms/actual-farm-image-1.7.jpg':
    '/images/farms/actual-farm-image.jpg',

  // Hero
  '/images/hero/actual-hero-image-001.jpg':
    '/images/hero/actual-hero-image-001',
  '/images/hero/actual-hero-image-01.jpg':
    '/images/processing/actual-hero-image-002',
  '/images/hero/actual-hero-image-02.jpg':
    '/images/processing/actual-hero-image-003',
  '/images/hero/actual-hero-image-03.jpg':
    '/images/processing/actual-hero-image-004',

  // Processing
  '/images/processing/farm-stage.jpg':
    '/images/processing/01-farm-stage.jpg',
  '/images/processing/cherry-harvest.jpg':
    '/images/processing/01-harvest.jpg',
  '/images/processing/transportation.jpg':
    '/images/processing/03-transportation.jpg',
  '/images/processing/raised-drying-beds.jpg':
    '/images/processing/03-drying.jpg',
  '/images/processing/washing-station.jpg':
    '/images/processing/02-washing.jpg',
  '/images/processing/cupping-lab.jpg':
    '/images/processing/04-quality-cupping.jpg',
  '/images/processing/warehouse-export.jpg':
    '/images/processing/05-export-prep.jpg',
  '/images/processing/exportation.jpg':
    '/images/processing/08-exportation.jpg',

  // Additional mappings required by the new instruction
  '/images/farms/farm-shakiso.jpg':
    '/images/farms/shakiso-farm.jpg',
  '/images/farms/station-yirgacheffe.jpg':
    '/images/farms/yirgacheffe-station.jpg',
};

/**
 * Resolves an image path to its safe fallback if needed.
 */
export function getSafeImageSrc(path: string | undefined): string {
  if (!path) return IMAGE_PATHS.hero[0];
  return path;
}

/**
 * 8 Standardized Backend Processing Stages
 */
export interface ProcessingStageItem {
  step: string;
  stageName: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
}

export const BACKEND_PROCESSING_STAGES: ProcessingStageItem[] = [
  {
    step: '01',
    stageName: 'Farm Stage',
    title: 'Farm Stage',
    subtitle: 'Highland Cultivation & Agroforestry',
    desc: 'High-elevation shade canopy cultivation across diverse microclimates in Shakiso, Yirgacheffe, Guji, and Sidama.',
    image: IMAGE_PATHS.processing.farmStage
  },
  {
    step: '02',
    stageName: 'Harvesting',
    title: 'Harvesting',
    subtitle: 'Selective Ripe Cherry Handpicking',
    desc: 'Selective handpicking of only fully ripe red cherries by experienced local farming community pickers.',
    image: IMAGE_PATHS.processing.harvesting
  },
  {
    step: '03',
    stageName: 'Transportation',
    title: 'Transportation',
    subtitle: 'Same-Day Cherry Transport to Station',
    desc: 'Rapid transit from farm plots to nearby collection points and washing stations to preserve cherry freshness.',
    image: IMAGE_PATHS.processing.transportation
  },
  {
    step: '04',
    stageName: 'Drying',
    title: 'Drying',
    subtitle: 'Raised African Beds & Aeration',
    desc: 'Controlled sun-drying on raised African mesh beds with regular turning to reach the optimal 10.5–11.5% moisture baseline.',
    image: IMAGE_PATHS.processing.drying
  },
  {
    step: '05',
    stageName: 'Filtering',
    title: 'Filtering',
    subtitle: 'Density Washing & Flotation Separation',
    desc: 'Highland spring water flotation channels separate lower-density floaters, followed by clean water washing.',
    image: IMAGE_PATHS.processing.filtering
  },
  {
    step: '06',
    stageName: 'Examination',
    title: 'Examination',
    subtitle: 'Q-Grading, Cupping & Physical Defect Inspection',
    desc: 'Rigorous sensory cupping to ensure cup score 85+ baseline and strict Grade 1 export physical examination.',
    image: IMAGE_PATHS.processing.examination
  },
  {
    step: '07',
    stageName: 'Final Preparation',
    title: 'Final Preparation',
    subtitle: 'Dry Milling, Optical Color Sorting & Bagging',
    desc: 'Dry parchment hulling, precision optical color sorting, and packaging in GrainPro liners with jute export bags.',
    image: IMAGE_PATHS.processing.finalPreparation
  },
  {
    step: '08',
    stageName: 'Exportation',
    title: 'Exportation',
    subtitle: 'Addis Ababa Staging & Global Container Dispatch',
    desc: 'Consolidation at Addis Ababa export branch (Jemo Michael), container sealing, and maritime port dispatch worldwide.',
    image: IMAGE_PATHS.processing.exportation
  }
];

/**
 * Standardized Backend Origin Names
 */
export const BACKEND_ORIGIN_NAMES = [
  'Yirgacheffe',
  'Guji',
  'Sidama',
  'Shakiso',
  'Arsi',
  'Harar'
] as const;

export type BackendOriginName = typeof BACKEND_ORIGIN_NAMES[number];
