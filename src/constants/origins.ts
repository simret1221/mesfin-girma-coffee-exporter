import { OriginInfo } from '../types';
import { IMAGE_PATHS } from './images';

export const ETHIOPIAN_ORIGINS: OriginInfo[] = [
  {
    id: 'yirgacheffe',
    name: 'Yirgacheffe',
    region: 'Gedeo Zone, Southern Ethiopia',
    description:
      'Yirgacheffe is a high-altitude Ethiopian coffee region known for floral, citrus and tea-like characteristics, with both washed and natural coffees.',
    shortDescription:
      'Yirgacheffe is a high-altitude Ethiopian coffee region known for floral, citrus and tea-like characteristics, with both washed and natural coffees.',
    typicalAltitudeMin: 1700,
    typicalAltitudeMax: 2200,
    typicalAltitude: '1,700–2,200 masl',
    typicalVarieties: 'Ethiopian heirloom/local varieties',
    typicalCharacteristics: 'Floral, citrus, tea-like, sweet',
    primaryFocus: true,
    isPrimaryFocus: true,
    availableProcessing: ['Washed', 'Sun-Dried / Natural'],
    color: '#1A4329',
    coordinates: { x: 42, y: 68 },
    image: IMAGE_PATHS.origins.yirgacheffe,
    flavorNotes: ['Jasmine Floral', 'Bergamot Citrus', 'Earl Grey Tea', 'Cane Sweetness'],
    terrainDescription: 'Steep lush hillsides, iron-rich red clay soil, and perennial spring rivers.'
  },
  {
    id: 'guji',
    name: 'Guji',
    region: 'Oromia Region, Southern Ethiopia',
    description:
      'Guji is a high-altitude Ethiopian coffee region known for fruity, floral and sweet characteristics.',
    shortDescription:
      'Guji is a high-altitude Ethiopian coffee region known for fruity, floral and sweet characteristics.',
    typicalAltitudeMin: 1800,
    typicalAltitudeMax: 2200,
    typicalAltitude: '1,800–2,200 masl',
    typicalVarieties: 'Ethiopian heirloom/local varieties',
    typicalCharacteristics: 'Fruity, floral, sweet, berry-like',
    primaryFocus: true,
    isPrimaryFocus: true,
    availableProcessing: ['Washed', 'Sun-Dried / Natural'],
    color: '#265337',
    coordinates: { x: 53, y: 72 },
    image: IMAGE_PATHS.origins.guji,
    flavorNotes: ['Wild Strawberry', 'Peach Nectar', 'Honeysuckle', 'Tropical Sweet'],
    terrainDescription: 'Vast forested highlands with cool microclimates and ancient semi-forest coffee canopies.'
  },
  {
    id: 'sidama',
    name: 'Sidama',
    region: 'Sidama Region, Southern Ethiopia',
    description:
      'Sidama is a diverse Ethiopian coffee-growing region producing coffees with sweet, fruity, floral and citrus characteristics.',
    shortDescription:
      'Sidama is a diverse Ethiopian coffee-growing region producing coffees with sweet, fruity, floral and citrus characteristics.',
    typicalAltitudeMin: 1500,
    typicalAltitudeMax: 2200,
    typicalAltitude: '1,500–2,200 masl',
    typicalVarieties: 'Ethiopian heirloom/local varieties',
    typicalCharacteristics: 'Citrus, floral, fruity, sweet',
    primaryFocus: true,
    isPrimaryFocus: true,
    availableProcessing: ['Washed', 'Sun-Dried / Natural'],
    color: '#2F6141',
    coordinates: { x: 46, y: 60 },
    image: IMAGE_PATHS.origins.sidama,
    flavorNotes: ['Lemon Crisp', 'Orange Blossom', 'Ripe Stonefruit', 'Brown Sugar'],
    terrainDescription: 'Rolling highlands bordering the Great Rift Valley, with exceptional water quality and rich soil.'
  },
  {
    id: 'shakiso',
    name: 'Shakiso',
    region: 'Guji Highlands (Company Farm Location)',
    description:
      'Shakiso is an Ethiopian coffee-producing area associated with high-altitude coffees with fruity and floral characteristics.',
    shortDescription:
      'Shakiso is an Ethiopian coffee-producing area associated with high-altitude coffees with fruity and floral characteristics.',
    typicalAltitudeMin: 1700,
    typicalAltitudeMax: 2200,
    typicalAltitude: '1,700–2,200 masl',
    typicalVarieties: 'Ethiopian heirloom/local varieties',
    typicalCharacteristics: 'Fruity, floral, chocolate-like',
    primaryFocus: false,
    isPrimaryFocus: false,
    availableProcessing: ['Washed', 'Sun-Dried / Natural'],
    color: '#3B734E',
    coordinates: { x: 56, y: 75 },
    image: IMAGE_PATHS.origins.shakiso,
    flavorNotes: ['Dark Cocoa', 'Black Cherry', 'Lavender', 'Syrupy Body'],
    terrainDescription: 'High mountain slopes where our direct farm operates, surrounded by rich natural volcanic loam.'
  },
  {
    id: 'arsi',
    name: 'Arsi',
    region: 'Oromia Highlands, Central-Eastern Ethiopia',
    description:
      'Arsi is an Ethiopian coffee-producing region associated with high-altitude coffees with floral, citrus and fruity characteristics.',
    shortDescription:
      'Arsi is an Ethiopian coffee-producing region associated with high-altitude coffees with floral, citrus and fruity characteristics.',
    typicalAltitudeMin: 1800,
    typicalAltitudeMax: 2200,
    typicalAltitude: '1,800–2,200 masl',
    typicalVarieties: 'Ethiopian heirloom/local varieties',
    typicalCharacteristics: 'Floral, citrus, fruity, sweet',
    primaryFocus: false,
    isPrimaryFocus: false,
    availableProcessing: ['Washed', 'Sun-Dried / Natural'],
    color: '#49835A',
    coordinates: { x: 58, y: 48 },
    image: IMAGE_PATHS.origins.arsi,
    flavorNotes: ['Crisp Lime', 'Red Currant', 'White Florals', 'Honey Sweet'],
    terrainDescription: 'High-elevation volcanic plateaus with cold mountain nights that slow cherry maturation.'
  },
  {
    id: 'harar',
    name: 'Harar',
    region: 'Eastern Highlands, Hararghe',
    description:
      'Harar is an important Ethiopian coffee-producing area known for distinctive berry, dried-fruit and wine-like characteristics.',
    shortDescription:
      'Harar is an important Ethiopian coffee-producing area known for distinctive berry, dried-fruit and wine-like characteristics.',
    typicalAltitudeMin: 1400,
    typicalAltitudeMax: 2000,
    typicalAltitude: '1,400–2,000 masl',
    typicalVarieties: 'Ethiopian local varieties',
    typicalCharacteristics: 'Berry, dried fruit, wine-like, chocolate',
    primaryFocus: false,
    isPrimaryFocus: false,
    availableProcessing: ['Sun-Dried / Natural'],
    color: '#5C3826',
    coordinates: { x: 80, y: 38 },
    image: IMAGE_PATHS.origins.harar,
    flavorNotes: ['Blueberry Jam', 'Dried Fig', 'Winey Acidity', 'Mocha Chocolate'],
    terrainDescription: 'Historic sunny highland climate ideal for traditional sun-drying of unwashed whole cherries.'
  }
];
