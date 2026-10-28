/**
 * Google Maps URL and navigation utilities
 */

export function createGoogleMapsSearchUrl(placeNameAndAddress: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeNameAndAddress)}`;
}

export function createGoogleMapsDirectionsUrl(destinationAddress: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationAddress)}`;
}

export function createGoogleMapsEmbedUrl(
  query: string,
  zoom = 12,
  satellite = false
): string {
  const typeParam = satellite ? '&t=k' : '';
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}${typeParam}&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
}
