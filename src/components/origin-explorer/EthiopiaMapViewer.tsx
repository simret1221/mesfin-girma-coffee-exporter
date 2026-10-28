import React, { useState } from 'react';
import { OriginInfo } from '../../types';
import { MapPin, Navigation, ExternalLink, Layers, Compass } from 'lucide-react';
import { getOriginGoogleMapsUrls } from '../../constants/locations';

interface EthiopiaMapViewerProps {
  origins: OriginInfo[];
  selectedOriginId: string;
  onSelectOrigin: (origin: OriginInfo) => void;
}

/**
 * Authentic Interactive Google Map viewer for Ethiopian coffee growing regions.
 * Replaces fake SVG vector drawings with real satellite & geographic imagery of Ethiopian terroir.
 */
export const EthiopiaMapViewer: React.FC<EthiopiaMapViewerProps> = ({
  origins,
  selectedOriginId,
  onSelectOrigin
}) => {
  const [isSatellite, setIsSatellite] = useState(true); // Default to satellite to appreciate Ethiopian highland terroir

  const currentOrigin =
    origins.find((o) => o.id === selectedOriginId) || origins[0];

  const mapData = getOriginGoogleMapsUrls(currentOrigin.name);

  // Build real Google Maps embed query for the selected origin in Ethiopia
  const query = `${currentOrigin.name} ${currentOrigin.region || ''} Ethiopia`;
  const typeParam = isSatellite ? '&t=k' : '';
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}${typeParam}&z=10&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D8CEBE] shadow-md bg-[#14281D] flex flex-col">
      {/* Top Map Control Bar */}
      <div className="bg-[#14281D] text-[#FAF5EE] px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#234230]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8963E] animate-pulse" />
          <span className="text-xs font-serif font-bold text-[#FAF5EE]">
            {currentOrigin.name} Terroir Map
          </span>
          <span className="text-[11px] text-[#C2B5A0] hidden sm:inline">
            ({currentOrigin.region})
          </span>
        </div>

        {/* View Toggle & Google Maps Link */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSatellite(!isSatellite)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer border ${
              isSatellite
                ? 'bg-[#C8963E] text-[#14281D] border-[#C8963E] font-bold'
                : 'bg-black/40 text-white/80 border-white/20 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isSatellite ? 'Satellite' : 'Roadmap'}</span>
          </button>

          <a
            href={mapData.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-[#FAF5EE] border border-white/20 text-xs font-medium transition-colors flex items-center gap-1"
            title="Open in Google Maps application"
          >
            <ExternalLink className="w-3 h-3 text-[#C8963E]" />
            <span className="hidden sm:inline">Open App</span>
          </a>
        </div>
      </div>

      {/* Origin Selection Quick Pills */}
      <div className="bg-[#0D1C13] px-3 py-2 border-b border-[#234230] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {origins.map((origin) => {
          const isSelected = origin.id === currentOrigin.id;
          return (
            <button
              key={origin.id}
              type="button"
              onClick={() => onSelectOrigin(origin)}
              className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer font-medium ${
                isSelected
                  ? 'bg-[#C8963E] text-[#070D09] font-bold shadow-sm'
                  : 'text-[#E5DAC8]/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {origin.name}
            </button>
          );
        })}
      </div>

      {/* Real Interactive Google Maps Frame */}
      <div className="relative w-full aspect-[4/3] min-h-[300px] sm:min-h-[360px] bg-[#E8E1D3]">
        <iframe
          key={`${currentOrigin.id}-${isSatellite}`}
          src={embedSrc}
          title={`Google Map satellite view of ${currentOrigin.name}, Ethiopia`}
          className="w-full h-full border-0 relative z-10"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Bottom Info Pill */}
        <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex items-center justify-between gap-2">
          <div className="bg-[#14281D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#2B4F39] text-[11px] text-[#FAF5EE] shadow-md pointer-events-auto flex items-center gap-1.5 max-w-[70%] truncate">
            <MapPin className="w-3.5 h-3.5 text-[#C8963E] shrink-0" />
            <span className="truncate">{currentOrigin.name}, {currentOrigin.region}, Ethiopia</span>
          </div>

          <a
            href={mapData.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C8963E] hover:bg-[#DCA84E] text-[#070D09] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md pointer-events-auto flex items-center gap-1.5 shrink-0 transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Navigate</span>
          </a>
        </div>
      </div>
    </div>
  );
};
