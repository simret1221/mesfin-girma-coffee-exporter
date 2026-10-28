import { useState, useCallback } from 'react';
import { Location } from '../types';
import { locationService } from '../services/locationService';

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>(() => locationService.getAllLocations());
  const [selectedLocationId, setSelectedLocationId] = useState<string>('westHarerge');

  const selectedLocation =
    locations.find((l) => l.id === selectedLocationId) || locations[0];

  const selectLocation = useCallback((id: string) => {
    setSelectedLocationId(id);
  }, []);

  return {
    locations,
    selectedLocation,
    selectedLocationId,
    selectLocation,
    getLocationById: locationService.getLocationById
  };
}
