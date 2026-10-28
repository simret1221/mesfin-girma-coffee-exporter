import React, { useEffect, useState } from 'react';
import { CoffeeProduct } from '../types';
import { useCoffee } from '../hooks/useCoffee';
import { getSavedCoffeeIds, toggleSaveCoffee } from '../services/authService';
import { api } from '../services/api';

import {
  TypicalRegionalBadge,
  VerifiedInformationBadge,
  GradeBadge,
  CupScoreBadge,
  ProcessingBadge,
  AvailabilityBadge
} from '../components/common/Badge';

import {
  ArrowLeft,
  MapPin,
  Bookmark,
  ExternalLink
} from 'lucide-react';

import { WhatsAppButton } from '../components/common/Button';

interface CoffeeDetailPageProps {
  coffeeId: string;
  onBackToCatalog: () => void;
  onSelectOrigin: (originName: string) => void;
  onRequestCoffee: (coffeeName: string, origin: string) => void;
}

interface Location {
  id: number;
  name: string;
  type: string;
  address: string | null;
  description: string | null;
  latitude: string | null;
  longitude: string | null;
  googleMapsUrl: string | null;
}

interface LocationsResponse {
  success: boolean;
  data: Location[];
}

export const CoffeeDetailPage: React.FC<CoffeeDetailPageProps> = ({
  coffeeId,
  onBackToCatalog,
  onSelectOrigin,
  onRequestCoffee
}) => {
  const {
    coffees,
    loading,
    error
  } = useCoffee();

  const [isSaved, setIsSaved] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);

  /*
   * Find the selected coffee from the PostgreSQL-backed catalog.
   */
  
const coffee: CoffeeProduct | null =
  coffees.find(
    (item) => String(item.id) === String(coffeeId)
  ) ?? null;


  /*
   * Related coffees are also coming from PostgreSQL.
   */
  const relatedCoffees = coffee
    ? coffees
        .filter(
          (item) =>
            item.id !== coffee.id &&
            item.origin.toLowerCase() === coffee.origin.toLowerCase()
        )
        .slice(0, 2)
    : [];

  /*
   * Load saved coffee state.
   */
  useEffect(() => {
    if (!coffee) {
      return;
    }

    const saved = getSavedCoffeeIds();
    setIsSaved(saved.includes(coffee.id));
  }, [coffee]);

  /*
   * Load the real location information from the backend.
   *
   * We intentionally do not invent coordinates or Google Maps URLs.
   * If a verified URL has not been entered in PostgreSQL yet,
   * the map buttons will simply not be shown.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadLocation() {
      if (!coffee) {
        setLocation(null);
        return;
      }

      try {
        const response = await api.get<LocationsResponse>('/locations');

        if (!cancelled && response.success) {
          const matchedLocation = response.data.find(
            (item) =>
              item.name.toLowerCase() === coffee.origin.toLowerCase()
          );

          setLocation(matchedLocation ?? null);
        }
      } catch {
        if (!cancelled) {
          setLocation(null);
        }
      }
    }

    void loadLocation();

    return () => {
      cancelled = true;
    };
  }, [coffee]);

  const handleToggleBookmark = () => {
    if (!coffee) {
      return;
    }

    const updated = toggleSaveCoffee(coffee.id);
    setIsSaved(updated.includes(coffee.id));
  };

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-[#FBF9F5] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#C8963E] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#5C4D3F]">
            Loading coffee details...
          </p>
        </div>
      </section>
    );
  }

  if (error || !coffee) {
    return (
      <section className="min-h-[60vh] bg-[#FBF9F5] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-serif font-bold text-[#14281D] mb-3">
            Coffee Not Found
          </h2>

          <p className="text-sm text-[#5C4D3F] mb-6">
            {error ?? 'The requested coffee could not be found.'}
          </p>

          <button
            onClick={onBackToCatalog}
            className="px-5 py-3 rounded-xl bg-[#14281D] text-[#C8963E] font-bold text-sm cursor-pointer"
          >
            Back to All Coffees
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-0">

      {/* Top Breadcrumb & Navigation Bar */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-4 px-4 sm:px-8 border-b border-[#234230]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">

          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-1.5 text-[#C8963E] hover:text-[#FAF5EE] transition-colors cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Coffees</span>
          </button>

          <div className="flex items-center gap-2 text-[#A8987E]">
            <span
              className="cursor-pointer hover:underline"
              onClick={onBackToCatalog}
            >
              Catalog
            </span>

            <span>/</span>

            <span
              className="cursor-pointer hover:underline text-[#C8963E]"
              onClick={() => onSelectOrigin(coffee.origin)}
            >
              {coffee.origin}
            </span>

            <span>/</span>

            <span className="text-[#FAF5EE] font-medium truncate max-w-[200px]">
              {coffee.name}
            </span>
          </div>
        </div>
      </section>

      {/* Main Detail Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-6">

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden bg-[#14281D] shadow-xl border border-[#E0D4C0] aspect-[4/3] w-full">

                <img
                  src={coffee.image}
                  alt={coffee.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <GradeBadge
                    grade={coffee.grade}
                    size="md"
                  />

                  <ProcessingBadge
                    method={coffee.processingMethod}
                    size="md"
                  />
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <CupScoreBadge
                    score={coffee.cupScoreBaseline}
                    size="md"
                  />
                </div>

                {/* Bottom Image Information */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FAF5EE] z-10">

                  <div className="flex items-center gap-2">

                    <span className="flex items-center gap-1.5 font-medium drop-shadow-md">
                      <MapPin className="w-4 h-4 text-[#C8963E]" />
                      {coffee.region}
                    </span>

                    {location?.googleMapsUrl && (
                      <>
                        <span className="text-white/40">
                          •
                        </span>

                        <a
                          href={location.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C8963E] hover:underline font-bold text-[11px] inline-flex items-center gap-1 drop-shadow-sm"
                        >
                          <span>Google Maps</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      </>
                    )}

                  </div>

                  <AvailabilityBadge
                    availability={coffee.availability}
                  />
                </div>
              </div>

              {/* Data Transparency */}
              <div className="bg-[#FAF5EE] border border-[#E2D6C2] rounded-2xl p-5 space-y-3 text-xs">

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#14281D] uppercase tracking-wider text-[11px]">
                    Information Standard
                  </span>

                  <VerifiedInformationBadge
                    label="✓ Verified Baseline"
                    size="sm"
                  />
                </div>

                <p className="text-[#5C4D3F] leading-relaxed">
                  Mesfin Girma Gemeda Coffee provides verified company
                  baseline information while lot-specific specifications
                  such as exact altitude, variety, flavor profile,
                  cupping details, moisture analysis, and harvest details
                  are provided upon request.
                </p>
              </div>

              {/* Direct Inquiry */}
              <div className="bg-[#14281D] text-[#FAF5EE] rounded-2xl p-6 space-y-4">

                <h4 className="text-sm font-serif font-bold text-[#FAF5EE]">
                  Direct Inquiries & Sample Dispatch
                </h4>

                <p className="text-xs text-[#C2B5A0] leading-relaxed">
                  International green coffee buyers and roasters can
                  request physical pre-shipment samples and custom
                  export terms directly from Mesfin Girma.
                </p>

                <div className="pt-1 flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={() =>
                      onRequestCoffee(
                        coffee.name,
                        coffee.origin
                      )
                    }
                    className="flex-1 py-3 px-4 rounded-xl bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-bold text-xs transition-all text-center cursor-pointer shadow-md"
                  >
                    Request This Coffee
                  </button>

                  <WhatsAppButton
                    message={`Hello Mesfin Girma, I would like to inquire about ${coffee.name} (Origin: ${coffee.origin}) for specialty export.`}
                    label="WhatsApp Chat"
                    size="sm"
                  />

                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-6 space-y-6">

              {/* Title */}
              <div>

                <div className="flex items-center gap-2 mb-2">

                  <span className="text-xs font-semibold uppercase tracking-widest text-[#7A5B35]">
                    Ethiopian Specialty Coffee
                  </span>

                  <span className="text-[#A8987E]">
                    •
                  </span>

                  <span className="text-xs font-medium text-[#1D5E34]">
                    {coffee.availability}
                  </span>

                </div>

                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#14281D]">
                  {coffee.name}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-[#EAE0D0]">

                  <p className="text-sm text-[#7A5B35] font-medium">
                    Origin: <strong>{coffee.origin}</strong> • {coffee.region}
                  </p>

                  {location?.googleMapsUrl && (
                    <a
                      href={location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8963E] hover:underline text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  )}

                </div>
              </div>

              {/* Description */}
              <div className="prose prose-stone text-xs sm:text-sm text-[#5C4D3F] leading-relaxed">
                <p>
                  {coffee.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="space-y-3 pt-2">

                <div className="flex items-center justify-between border-b border-[#EAE0D0] pb-2">

                  <h3 className="text-sm font-serif font-bold text-[#14281D] uppercase tracking-wider">
                    Coffee Specification
                  </h3>

                  <span className="text-[11px] text-[#7A5B35] italic">
                    Confirmed Company Baseline
                  </span>

                </div>

                <div className="border border-[#E2D6C2] rounded-2xl overflow-hidden text-xs divide-y divide-[#E2D6C2]">

                  {/* Grade */}
                  <div className="flex justify-between p-3.5 bg-white items-center">

                    <span className="text-[#7A5B35] font-medium">
                      Quality Grade:
                    </span>

                    <div className="flex items-center gap-2">

                      <span className="font-semibold text-[#14281D]">
                        {coffee.grade}
                      </span>

                      <VerifiedInformationBadge
                        size="sm"
                        label="✓ Verified"
                      />

                    </div>
                  </div>

                  {/* Cup Score */}
                  <div className="flex justify-between p-3.5 bg-[#FAF5EE] items-center">

                    <span className="text-[#7A5B35] font-medium">
                      Cup Score Baseline:
                    </span>

                    <div className="flex items-center gap-2">

                      <span className="font-semibold text-[#14281D]">
                        {coffee.cupScoreBaseline}
                      </span>

                      <VerifiedInformationBadge
                        size="sm"
                        label="✓ Verified"
                      />

                    </div>
                  </div>

                  {/* Processing */}
                  <div className="flex justify-between p-3.5 bg-white items-center">

                    <span className="text-[#7A5B35] font-medium">
                      Processing Method:
                    </span>

                    <div className="flex items-center gap-2">

                      <span className="font-semibold text-[#14281D]">
                        {coffee.processingMethod}
                      </span>

                      <VerifiedInformationBadge
                        size="sm"
                        label="✓ Company Info"
                      />

                    </div>
                  </div>

                  {/* Altitude */}
                  <div className="flex justify-between p-3.5 bg-[#FAF5EE] items-center">

                    <span className="text-[#7A5B35] font-medium">
                      Altitude:
                    </span>

                    <div className="flex items-center gap-2">

                      <span className="font-semibold text-[#14281D]">
                        {coffee.altitude}
                      </span>

                      {coffee.altitude !== 'Available upon request' && (
                        <TypicalRegionalBadge size="sm" />
                      )}

                    </div>
                  </div>

                  {/* Variety */}
                  <div className="flex justify-between p-3.5 bg-white items-center">

                    <span className="text-[#7A5B35] font-medium">
                      Variety:
                    </span>

                    <div className="flex items-center gap-2">

                      <span className="font-medium text-[#14281D]">
                        {coffee.variety}
                      </span>

                      {coffee.variety !== 'Available upon request' && (
                        <TypicalRegionalBadge size="sm" />
                      )}

                    </div>
                  </div>

                  {/* Flavor */}
                  <div className="flex justify-between p-3.5 bg-[#FAF5EE] items-center">

                    <span className="text-[#7A5B35] font-medium">
                      Flavor Profile:
                    </span>

                    <span className="font-semibold text-[#14281D] text-right">
                      {coffee.flavorProfile}
                    </span>

                  </div>

                  {/* Harvest */}
                  <div className="flex justify-between p-3.5 bg-white items-center">

                    <span className="text-[#7A5B35] font-medium">
                      Harvest Details:
                    </span>

                    <span className="text-[#5C4D3F] italic">
                      Information available upon request
                    </span>

                  </div>

                  {/* Inventory */}
                  <div className="flex justify-between p-3.5 bg-[#FAF5EE] items-center">

                    <span className="text-[#7A5B35] font-medium">
                      Container Inventory:
                    </span>

                    <span className="text-[#5C4D3F] italic">
                      Information available upon request
                    </span>

                  </div>

                  {/* Pricing */}
                  <div className="flex justify-between p-3.5 bg-white items-center">

                    <span className="text-[#7A5B35] font-medium">
                      Pricing / Contract:
                    </span>

                    <span className="text-[#5C4D3F] italic">
                      Information available upon request
                    </span>

                  </div>

                </div>
              </div>

              {/* Origin Explorer */}
              <div className="p-4 rounded-xl bg-[#F2ECE1] border border-[#DECFBB] flex items-center justify-between gap-4">

                <div>

                  <h4 className="text-xs font-serif font-bold text-[#14281D]">
                    Explore {coffee.origin}
                  </h4>

                  <p className="text-[11px] text-[#5C4D3F] mt-0.5">
                    Explore available origin information and location details.
                  </p>

                </div>

                <button
                  onClick={() => onSelectOrigin(coffee.origin)}
                  className="px-3.5 py-2 rounded-lg bg-[#14281D] text-[#C8963E] text-xs font-semibold hover:bg-[#1E3F2D] transition-colors shrink-0 cursor-pointer"
                >
                  Explore {coffee.origin}
                </button>

              </div>

              {/* Main CTA */}
              <div className="pt-2 space-y-2">

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={handleToggleBookmark}
                    className={`py-4 px-5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                      isSaved
                        ? 'bg-[#14281D] text-[#C8963E] border-[#14281D]'
                        : 'bg-white text-[#14281D] border-[#D0C2AB] hover:border-[#14281D]'
                    }`}
                    title={
                      isSaved
                        ? 'Lot saved in Buyer Portal'
                        : 'Save lot to candidate list'
                    }
                  >

                    <Bookmark
                      className={`w-4 h-4 ${
                        isSaved
                          ? 'fill-current text-[#C8963E]'
                          : ''
                      }`}
                    />

                    <span>
                      {isSaved ? 'Saved Lot' : 'Save Lot'}
                    </span>

                  </button>

                  <button
                    onClick={() =>
                      onRequestCoffee(
                        coffee.name,
                        coffee.origin
                      )
                    }
                    className="flex-1 py-4 rounded-xl bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-bold text-sm uppercase tracking-wider transition-all shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>
                      Request This Coffee
                    </span>
                  </button>

                </div>

                <div className="text-center text-[11px] text-[#8C7A68]">
                  Connects directly with Mesfin Girma Gemeda export operations
                </div>

              </div>

            </div>
          </div>

          {/* Related Coffees */}
          {relatedCoffees.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#EAE0D0] space-y-6">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-serif font-bold text-[#14281D]">
                    Other Offerings from {coffee.origin}
                  </h3>

                  <p className="text-xs text-[#7A5B35]">
                    Explore other coffees available from the same origin.
                  </p>

                </div>

                <button
                  onClick={onBackToCatalog}
                  className="text-xs font-semibold text-[#14281D] hover:text-[#C8963E] cursor-pointer"
                >
                  View All Coffees →
                </button>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {relatedCoffees.map((rel) => (

                  <div
                    key={rel.id}
                    className="p-5 rounded-2xl bg-[#FAF5EE] border border-[#E0D4C0] flex items-center gap-4 hover:shadow-md transition-shadow"
                  >

                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />

                    <div className="grow space-y-1">

                      <div className="flex items-center gap-2 text-[11px]">

                        <span className="font-semibold text-[#7A5B35]">
                          {rel.origin}
                        </span>

                        <span>
                          •
                        </span>

                        <span className="text-[#1D5E34]">
                          {rel.processingMethod}
                        </span>

                      </div>

                      <h4 className="text-sm font-serif font-bold text-[#14281D]">
                        {rel.name}
                      </h4>

                      <p className="text-[11px] text-[#5C4D3F] line-clamp-1">
                        {rel.flavorProfile}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        onRequestCoffee(
                          rel.name,
                          rel.origin
                        )
                      }
                      className="px-3.5 py-2 rounded-lg bg-[#C8963E] text-[#14281D] font-bold text-xs hover:bg-[#B38130] cursor-pointer shrink-0"
                    >
                      Request
                    </button>

                  </div>

                ))}

              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};