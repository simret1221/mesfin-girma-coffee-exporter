/**
 * Origin Service Layer
 * Consumes regional terroir information for Ethiopian coffee growing regions
 * Backed by ETHIOPIAN_ORIGINS with optional /api/origins backend integration.
 */

import { Origin, OriginInfo } from '../types';
import { ETHIOPIAN_ORIGINS } from '../constants/origins';
import { getOriginGoogleMapsUrls } from '../constants/locations';
import { api } from './api';

export const originService = {
  /**
   * Fetch origins from backend if available, or return static definitions
   */
  async getOrigins(): Promise<Origin[]> {
    try {
      const remote = await api.get<Origin[]>('/origins');
      if (Array.isArray(remote) && remote.length > 0) {
        return remote;
      }
    } catch {
      // Return static origins
    }
    return ETHIOPIAN_ORIGINS;
  },

  /**
   * Synchronous getter
   */
  getAllOrigins(): Origin[] {
    return ETHIOPIAN_ORIGINS;
  },

  /**
   * Get single origin by ID
   */
  getOriginById(id: string): Origin | null {
    return (
      ETHIOPIAN_ORIGINS.find(
        (o) => o.id.toLowerCase() === id.toLowerCase()
      ) || null
    );
  },

  /**
   * Get origin by regional name (e.g., 'Yirgacheffe', 'Guji', 'Sidama', 'Harar')
   */
  getOriginByName(name: string): Origin | null {
    const clean = name.toLowerCase().trim();
    return (
      ETHIOPIAN_ORIGINS.find(
        (o) =>
          o.name.toLowerCase() === clean ||
          o.id.toLowerCase() === clean ||
          clean.includes(o.name.toLowerCase())
      ) || null
    );
  },

  /**
   * Get Google Maps links and navigation URLs for this origin
   */
  getGoogleMapsData(originName: string) {
    return getOriginGoogleMapsUrls(originName);
  }
};

export const getAllOrigins = originService.getAllOrigins;
export const getOriginById = originService.getOriginById;
export const getOriginByName = originService.getOriginByName;
