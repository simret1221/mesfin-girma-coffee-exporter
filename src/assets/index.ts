/**
 * Centralized Asset Catalog
 * Re-exports the verified company images from public/images/
 */

import { IMAGE_PATHS } from '../constants/images';

export const ASSETS = {
  images: IMAGE_PATHS,
  logoText: 'MESFIN GIRMA',
  tagline: 'Coffee Supplies & Exporter'
};

export { IMAGE_PATHS };
export default ASSETS;
