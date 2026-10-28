import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Layers, Compass } from 'lucide-react';
import { CompanyLocation, buildGoogleMapsEmbedUrl } from '../../constants/locations';

interface GoogleMapButtonsProps {
  searchUrl: string;
  directionsUrl: string;
  locationName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'gold' | 'forest' | 'outline' | 'glass';
  className?: string;
  showLabels?: boolean;
}

export const GoogleMapButtons: React.FC<GoogleMapButtonsProps> = ({
  searchUrl,
  directionsUrl,
  locationName = 'Location',
  size = 'md',
  variant = 'gold',
  className = '',
  showLabels = true
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm sm:text-base gap-2.5'
  }[size];

  const primaryBtnClass = {
    gold: 'bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-bold shadow-sm border border-[#E0A84D]',
    forest: 'bg-[#14281D] hover:bg-[#1E3B2B] text-[#FAF5EE] font-bold shadow-sm border border-[#2B4F39]',
    outline: 'bg-transparent hover:bg-[#14281D] text-[#14281D] hover:text-[#FAF5EE] border-2 border-[#14281D]',
    glass: 'bg-black/60 hover:bg-black/80 text-[#FAF5EE] border border-white/30 backdrop-blur-md'
  }[variant];

  const secondaryBtnClass = {
    gold: 'bg-white/90 hover:bg-white text-[#14281D] border border-[#D5C8B4] hover:border-[#C8963E]',
    forest: 'bg-white/90 hover:bg-white text-[#14281D] border border-[#D5C8B4] hover:border-[#14281D]',
    outline: 'bg-transparent hover:bg-[#C8963E]/10 text-[#7A5B35] border border-[#C8963E]/50 hover:border-[#C8963E]',
    glass: 'bg-white/10 hover:bg-white/20 text-[#FAF5EE] border border-white/20 backdrop-blur-md'
  }[variant];

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {/* View on Google Maps Button */}
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${locationName} on Google Maps`}
        className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 cursor-pointer active:scale-95 ${sizeClasses} ${primaryBtnClass}`}
      >
        <MapPin className="w-4 h-4 shrink-0 text-current" />
        {showLabels && <span>View on Google Maps</span>}
        <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
      </a>

      {/* Get Directions Button */}
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get directions to ${locationName} on Google Maps`}
        className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 cursor-pointer active:scale-95 ${sizeClasses} ${secondaryBtnClass}`}
      >
        <Navigation className="w-3.5 h-3.5 shrink-0 text-[#C8963E]" />
        {showLabels && <span>Get Directions</span>}
      </a>
    </div>
  );
};

interface InteractiveGoogleMapProps {
  location: CompanyLocation;
  heightClass?: string;
  className?: string;
  showControls?: boolean;
}

/**
 * Real, authentic interactive Google Map iframe embedded directly in the application.
 * Allows users to zoom, pan, switch satellite/roadmap, and navigate immediately.
 */
export const InteractiveGoogleMap: React.FC<InteractiveGoogleMapProps> = ({
  location,
  heightClass = 'h-[360px] sm:h-[440px]',
  className = '',
  showControls = true
}) => {
  const [isSatellite, setIsSatellite] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Construct standard Google Maps iframe embed query
  const embedQuery = `${location.name} ${location.address}`;
  const embedSrc = buildGoogleMapsEmbedUrl(
    embedQuery,
    location.zoom || 12,
    isSatellite
  );

  return (
    <div className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D8CEBE] shadow-md bg-[#E8E1D3] flex flex-col ${className}`}>
      {/* Map Header Overlay */}
      {showControls && (
        <div className="bg-[#14281D] text-[#FAF5EE] px-4 py-3 sm:px-5 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#234230] z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8963E] animate-pulse shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono tracking-wider uppercase text-[#C8963E] font-semibold truncate">
                  {location.category}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-[11px] text-[#D8CCA9] truncate">
                  {location.cityTown}, {location.country}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#FAF5EE] truncate leading-tight">
                {location.name}
              </h4>
            </div>
          </div>

          {/* Quick Actions: Satellite toggle & Navigation */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsSatellite(!isSatellite)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer border ${
                isSatellite
                  ? 'bg-[#C8963E] text-[#14281D] border-[#C8963E] font-bold'
                  : 'bg-black/40 text-white/80 border-white/20 hover:text-white hover:bg-black/60'
              }`}
              title={isSatellite ? 'Switch to Standard Map' : 'Switch to Satellite View'}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isSatellite ? 'Map View' : 'Satellite'}</span>
            </button>

            <a
              href={location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-lg bg-[#C8963E] hover:bg-[#DCA84E] text-[#070D09] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Get directions in Google Maps app"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Navigate</span>
            </a>
          </div>
        </div>
      )}

      {/* Embedded Real Google Map Frame */}
      <div className={`relative w-full ${heightClass} bg-[#E5DFC8]`}>
        {/* Loading Spinner */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#EAE3D2] text-[#7A5B35] gap-2 z-0">
            <div className="w-7 h-7 border-2 border-[#C8963E] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono tracking-wider uppercase">Loading Google Map...</span>
          </div>
        )}

        <iframe
          key={`${location.id}-${isSatellite}`}
          src={embedSrc}
          title={`Google Map showing ${location.name}`}
          className="w-full h-full border-0 relative z-10"
          loading="lazy"
          onLoad={() => setMapLoaded(true)}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Bottom Link Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex items-center justify-between gap-2">
          <div className="bg-[#FAF5EE]/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#D5CABB] text-[11px] text-[#4E4133] shadow-md pointer-events-auto flex items-center gap-1.5 max-w-[70%] truncate">
            <MapPin className="w-3.5 h-3.5 text-[#C8963E] shrink-0" />
            <span className="truncate">{location.address}</span>
          </div>

          <a
            href={location.mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#14281D]/90 hover:bg-[#14281D] text-[#FAF5EE] text-xs px-3 py-1.5 rounded-xl border border-[#2B4F39] backdrop-blur-md shadow-md pointer-events-auto flex items-center gap-1.5 shrink-0 transition-all font-medium hover:text-[#C8963E]"
          >
            <span>Open in App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
