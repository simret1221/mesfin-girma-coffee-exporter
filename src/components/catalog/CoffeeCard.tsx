import React, { useState, useEffect } from 'react';
import { CoffeeProduct } from '../../types';
import {
  TypicalRegionalBadge,
  VerifiedInformationBadge,
  GradeBadge,
  CupScoreBadge,
  ProcessingBadge,
  AvailabilityBadge
} from '../common/Badge';
import { ArrowRight, MessageSquareText, Mountain, MapPin, Bookmark, ExternalLink } from 'lucide-react';
import { getSavedCoffeeIds, toggleSaveCoffee } from '../../services/authService';
import { getOriginGoogleMapsUrls } from '../../constants/locations';

interface CoffeeCardProps {
  coffee: CoffeeProduct;
  onViewDetails: (coffeeId: string) => void;
  onRequestCoffee: (coffeeName: string, origin: string) => void;
}

export const CoffeeCard: React.FC<CoffeeCardProps> = ({
  coffee,
  onViewDetails,
  onRequestCoffee
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const saved = getSavedCoffeeIds();
    setIsSaved(saved.includes(coffee.id));
  }, [coffee.id]);

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleSaveCoffee(coffee.id);
    setIsSaved(updated.includes(coffee.id));
  };
  return (
    <article className="bg-[#FAF5EE] border border-[#E2D6C2] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-[#14281D]/30 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Coffee Image Container */}
        <div className="h-56 w-full relative overflow-hidden bg-[#14281D]">
          <img
            src={coffee.image}
            alt={coffee.name}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <GradeBadge grade={coffee.grade} size="sm" />
            <ProcessingBadge method={coffee.processingMethod} size="sm" />
          </div>

          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleBookmark}
              className={`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#C8963E] text-[#14281D] shadow-md'
                  : 'bg-black/40 hover:bg-black/60 text-[#FAF5EE]'
              }`}
              title={isSaved ? 'Saved to Buyer Portal' : 'Save lot to candidate list'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <CupScoreBadge score={coffee.cupScoreBaseline} size="sm" />
          </div>

          {/* Bottom image location snippet */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-[#FAF5EE] z-10">
            <span className="flex items-center gap-1 font-medium drop-shadow-sm">
              <MapPin className="w-3 h-3 text-[#C8963E]" />
              {coffee.origin} • {coffee.region.split('(')[0].trim()}
            </span>
            <a
              href={getOriginGoogleMapsUrls(coffee.origin).searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#C8963E] hover:text-white font-bold text-[10px] inline-flex items-center gap-1 bg-black/50 hover:bg-black/80 px-2 py-0.5 rounded-md backdrop-blur-xs transition-colors"
              title={`View ${coffee.origin} on Google Maps`}
            >
              <span>Map</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-wider text-[#7A5B35] font-semibold">
                {coffee.origin} Origin
              </span>
              <AvailabilityBadge availability={coffee.availability} />
            </div>

            <h3 className="text-xl font-serif font-bold text-[#14281D] mt-1 group-hover:text-[#1E3F2D] transition-colors">
              {coffee.name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#5C4D3F] line-clamp-3 leading-relaxed">
            {coffee.description}
          </p>

          {/* Key Characteristics Specification Strip */}
          <div className="bg-[#F2ECE1] p-3.5 rounded-xl space-y-2 text-xs border border-[#E5DAC8]">
            <div className="flex justify-between items-center text-[#5C4D3F]">
              <span className="text-[#8C7A68] flex items-center gap-1">
                <Mountain className="w-3 h-3 text-[#C8963E]" />
                Altitude:
              </span>
              <span className="font-semibold text-[#14281D]">{coffee.altitude}</span>
            </div>

            <div className="flex justify-between items-center text-[#5C4D3F]">
              <span className="text-[#8C7A68]">Processing:</span>
              <span className="font-medium text-[#14281D]">{coffee.processingMethod}</span>
            </div>

            <div className="flex justify-between items-start text-[#5C4D3F]">
              <span className="text-[#8C7A68] shrink-0">Typical Flavor:</span>
              <span className="font-medium text-[#14281D] text-right truncate max-w-[170px]" title={coffee.flavorProfile}>
                {coffee.flavorProfile}
              </span>
            </div>
          </div>

          {/* Regional Label Badge */}
          <div className="pt-0.5">
            <TypicalRegionalBadge size="sm" />
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-6 pt-0 border-t border-[#EAE0D0] mt-2 space-y-2.5">
        <div className="text-[11px] text-[#8C7A68] italic flex items-center justify-between pt-2">
          <span>Lot data & cupping sheets:</span>
          <span className="font-medium text-[#14281D]">Upon Request</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(coffee.id)}
            className="py-2.5 px-3 rounded-lg border border-[#14281D]/30 hover:border-[#14281D] hover:bg-[#14281D]/5 text-xs font-semibold text-[#14281D] text-center transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onRequestCoffee(coffee.name, coffee.origin)}
            className="py-2.5 px-3 rounded-lg bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] text-xs font-bold text-center transition-all cursor-pointer shadow-xs active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            <span>Request This Coffee</span>
          </button>
        </div>
      </div>
    </article>
  );
};
