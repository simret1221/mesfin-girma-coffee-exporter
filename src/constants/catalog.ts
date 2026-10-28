import { CoffeeProduct } from '../types';
import { IMAGE_PATHS } from './images';


export const INITIAL_COFFEE_CATALOG: CoffeeProduct[] = [
  {
    id: 'mgg-yirgacheffe-washed-g1',
    name: 'Yirgacheffe Washed Grade 1',
    origin: 'Yirgacheffe',
    region: 'Gedeo Zone, Southern Ethiopia',
    grade: 'Grade 1',
    cupScoreBaseline: 'Above 85',
    processingMethod: 'Washed',
    altitude: 'Not specified',
    altitudeType: 'typical_regional',
    variety: 'Ethiopian heirloom/local varieties',
    varietyType: 'typical_regional',
    flavorProfile: 'Floral, citrus, tea-like, sweet',
    flavorProfileType: 'typical_regional',
    availability: 'Available for Export',
    harvest: 'Harvest details available upon request',
    description:
      'Washed Grade 1 coffee from the Yirgacheffe origin of Ethiopia. Contact our team for current lot specifications, samples, and export availability.',
    image:
      IMAGE_PATHS.coffee[0] ||
      '/images/coffee/yirgacheffe-washed-g1.jpg',
    isFeatured: true
  },
  {
    id: 'mgg-guji-natural-g1',
    name: 'Guji Natural Grade 1',
    origin: 'Guji',
    region: 'Oromia Region, Southern Ethiopia',
    grade: 'Grade 1',
    cupScoreBaseline: 'Above 85',
    processingMethod: 'Sun-Dried / Natural',
    altitude: 'Not specified',
    altitudeType: 'typical_regional',
    variety: 'Ethiopian heirloom/local varieties',
    varietyType: 'typical_regional',
    flavorProfile: 'Fruity, floral, sweet',
    flavorProfileType: 'typical_regional',
    availability: 'Available for Export',
    harvest: 'Harvest details available upon request',
    description:
      'Natural Grade 1 coffee from the Guji origin. Contact our team for current lot availability, processing details, samples, and export specifications.',
    image:
      IMAGE_PATHS.coffee[1] ||
      '/images/coffee/guji-natural-g1.jpg',
    isFeatured: true
  },
  {
    id: 'mgg-sidama-washed-g1',
    name: 'Sidama Washed Grade 1',
    origin: 'Sidama',
    region: 'Sidama Region, Ethiopia',
    grade: 'Grade 1',
    cupScoreBaseline: 'Above 85',
    processingMethod: 'Washed',
    altitude: 'Not specified',
    altitudeType: 'typical_regional',
    variety: 'Ethiopian heirloom/local varieties',
    varietyType: 'typical_regional',
    flavorProfile: 'Citrus, floral, fruity, sweet',
    flavorProfileType: 'typical_regional',
    availability: 'Available for Export',
    harvest: 'Harvest details available upon request',
    description:
      'Washed Grade 1 coffee from the Sidama origin. Contact our team for current lot specifications, samples, and export availability.',
    image:
      IMAGE_PATHS.coffee[2] ||
      '/images/coffee/sidama-washed-g1.jpg',
    isFeatured: true
  },
  {
    id: 'mgg-shakiso-natural-g1',
    name: 'Shakiso Natural Grade 1',
    origin: 'Shakiso',
    region: 'Guji Area, Oromia, Ethiopia',
    grade: 'Grade 1',
    cupScoreBaseline: 'Above 85',
    processingMethod: 'Sun-Dried / Natural',
    altitude: 'Not specified',
    altitudeType: 'typical_regional',
    variety: 'Not specified',
    varietyType: 'typical_regional',
    flavorProfile: 'Details available upon request',
    flavorProfileType: 'typical_regional',
    availability: 'Available for Export',
    harvest: 'Harvest details available upon request',
    description:
      'Natural Grade 1 coffee associated with the Shakiso area. Contact our team to confirm current lot details, sourcing information, and availability.',
    image:
      IMAGE_PATHS.coffee[3] ||
      '/images/coffee/shakiso-natural-g1.jpg',
    isFeatured: false
  },
  {
    id: 'mgg-arsi-washed-g1',
    name: 'Arsi Washed Grade 1',
    origin: 'Arsi',
    region: 'Oromia Region, Ethiopia',
    grade: 'Grade 1',
    cupScoreBaseline: 'Above 85',
    processingMethod: 'Washed',
    altitude: 'Not specified',
    altitudeType: 'typical_regional',
    variety: 'Not specified',
    varietyType: 'typical_regional',
    flavorProfile: 'Details available upon request',
    flavorProfileType: 'typical_regional',
    availability: 'Available for Export',
    harvest: 'Harvest details available upon request',
    description:
      'Washed Grade 1 coffee associated with the Arsi origin. Contact our team for confirmation of current lots, processing specifications, and export availability.',
    image:
      IMAGE_PATHS.coffee[4] ||
      '/images/coffee/arsi-washed-g1.jpg',
    isFeatured: false
  },
  {
    id: 'mgg-harar-natural-g1',
    name: 'Harar Natural Grade 1',
    origin: 'Harar',
    region: 'Eastern Ethiopia',
    grade: 'Grade 1',
    cupScoreBaseline: 'Above 85',
    processingMethod: 'Sun-Dried / Natural',
    altitude: 'Not specified',
    altitudeType: 'typical_regional',
    variety: 'Not specified',
    varietyType: 'typical_regional',
    flavorProfile: 'Details available upon request',
    flavorProfileType: 'typical_regional',
    availability: 'Available for Export',
    harvest: 'Harvest details available upon request',
    description:
      'Naturally processed Grade 1 coffee associated with the Harar origin. Contact our team for current lot specifications, samples, and export availability.',
    image:
      IMAGE_PATHS.coffee[5] ||
      '/images/coffee/harar-natural-g1.jpg',
    isFeatured: false
  }
];
