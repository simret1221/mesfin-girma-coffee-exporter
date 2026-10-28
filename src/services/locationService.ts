/**
 * Location Service Layer
 * Consumes verified company facilities and regional sourcing locations
 * Supports GET /api/locations backend integration with local fallback.
 */

import { Location, CompanyLocation } from '../types';
import {
  COMPANY_LOCATIONS_LIST,
  COMPANY_LOCATIONS_MAP,
  getLocationById as getStaticLocationById
} from '../constants/locations';
import { api } from './api';

export const locationService = {
  /**
   * Fetches locations from Express backend /api/locations or returns static verified locations
   */
  async getLocations(): Promise<Location[]> {
    try {
      const remote = await api.get<Location[]>('/locations');
      if (Array.isArray(remote) && remote.length > 0) {
        return remote;
      }
    } catch {
      // Seamless local fallback
    }
    return COMPANY_LOCATIONS_LIST;
  },

  /**
   * Synchronous getter
   */
  getAllLocations(): Location[] {
    return COMPANY_LOCATIONS_LIST;
  },

  /**
   * Get location by ID or name
   */
  getLocationById(idOrName: string): Location {
    return getStaticLocationById(idOrName);
  },

  /**
   * Get dictionary map of locations
   */
  getLocationMap(): Record<string, Location> {
    return COMPANY_LOCATIONS_MAP;
  }
};

export const getAllLocations = locationService.getAllLocations;
export const getLocationById = locationService.getLocationById;
