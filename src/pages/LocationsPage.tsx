import React, { useState } from 'react';
import { COMPANY } from '../constants/company';
import { IMAGE_PATHS } from '../constants/images';
import {
  COMPANY_LOCATIONS_MAP,
  COMPANY_LOCATIONS_LIST,
  CompanyLocation
} from '../constants/locations';
import {
  GoogleMapButtons,
  InteractiveGoogleMap
} from '../components/common/GoogleMapComponents';
import {
  MapPin,
  Building2,
  Globe,
  Coffee,
  CheckCircle2,
  Navigation,
  Compass,
  ArrowRight
} from 'lucide-react';

interface LocationsPageProps {
  onRequestClick: () => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({ onRequestClick }) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('westHarerge');

  const selectedLoc: CompanyLocation =
    COMPANY_LOCATIONS_MAP[selectedLocationId] || COMPANY_LOCATIONS_LIST[0];

  return (
    <div className="space-y-0">
      {/* Header Banner */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-16 sm:py-20 px-4 sm:px-8 border-b border-[#234230]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3627] text-xs text-[#E5DBC7] border border-[#2B4F39]">
            <MapPin className="w-3.5 h-3.5 text-[#C8963E]" />
            <span>National Infrastructure • Hararghe to Addis Ababa & Southern Highlands</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF5EE]">
            Our Locations & Sourcing Network
          </h1>
          <p className="text-sm sm:text-base text-[#C2B5A0] max-w-2xl font-light leading-relaxed">
            From our executive headquarters in West Hararghe to our central commercial branch in Addis Ababa and our company farm sites in Shakiso and Yirgacheffe. Explore every real location with live Google Maps and directions.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Confirmed Headquarters & Addis Branch Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: West Hararghe Headquarters */}
            <div className="bg-[#FAF5EE] border border-[#14281D]/20 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group">
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-[#14281D]">
                  <img
                    src={IMAGE_PATHS.company[0]}
                    alt="West Hararghe Headquarters - Mesfin Coffee"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14281D] text-[#C8963E] text-xs font-semibold uppercase tracking-wider">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Executive Headquarters</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-[#C8963E] font-mono block uppercase tracking-widest">
                      West Hararghe, Daro Lebo
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF5EE]">
                      Main Office — Mechara / Mecheta
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed font-light">
                    Directs regional coffee collection, grower relations, dry-processing oversight, and local community sourcing across historic Eastern Oromia coffee areas.
                  </p>

                  <div className="pt-3 border-t border-[#EAE0D0] text-xs space-y-2 text-[#5C4D3F]">
                    <div>
                      <strong className="text-[#14281D]">Address:</strong> {COMPANY_LOCATIONS_MAP.westHarerge.address}
                    </div>
                    <div>
                      <strong className="text-[#14281D]">Direct Phone:</strong> {COMPANY.phone} ({COMPANY.phoneInternational})
                    </div>
                    <div>
                      <strong className="text-[#14281D]">Operations:</strong> Origin collection, regional processing, grower network
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Google Maps Navigation Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 border-t border-[#EAE0D0] mt-auto">
                <GoogleMapButtons
                  searchUrl={COMPANY_LOCATIONS_MAP.westHarerge.mapsSearchUrl}
                  directionsUrl={COMPANY_LOCATIONS_MAP.westHarerge.directionsUrl}
                  locationName="West Hararghe Main Office"
                  variant="gold"
                />
              </div>
            </div>

            {/* Card 2: Addis Ababa Branch */}
            <div className="bg-[#FAF5EE] border border-[#14281D]/20 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group">
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-[#14281D]">
                  <img
                    src={IMAGE_PATHS.company[1]}
                    alt="Addis Ababa Export Branch - Mesfin Coffee"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14281D] text-[#C8963E] text-xs font-semibold uppercase tracking-wider">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Commercial & Export Branch</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-[#C8963E] font-mono block uppercase tracking-widest">
                      Addis Ababa Capital Hub
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF5EE]">
                      Addis Ababa Branch — Jemo Michael
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed font-light">
                    Central export operations managing international buyer relationships, sample dispatch, laboratory cupping sessions, commercial contracts, and container freight logistics.
                  </p>

                  <div className="pt-3 border-t border-[#EAE0D0] text-xs space-y-2 text-[#5C4D3F]">
                    <div>
                      <strong className="text-[#14281D]">Address:</strong> {COMPANY_LOCATIONS_MAP.addisAbaba.address}
                    </div>
                    <div>
                      <strong className="text-[#14281D]">Commercial Desk:</strong> {COMPANY.phone} ({COMPANY.phoneInternational})
                    </div>
                    <div>
                      <strong className="text-[#14281D]">Facilities:</strong> Cupping lab, sample preparation, customs clearance, logistics
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Google Maps Navigation Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 border-t border-[#EAE0D0] mt-auto">
                <GoogleMapButtons
                  searchUrl={COMPANY_LOCATIONS_MAP.addisAbaba.mapsSearchUrl}
                  directionsUrl={COMPANY_LOCATIONS_MAP.addisAbaba.directionsUrl}
                  locationName="Addis Ababa Export Branch"
                  variant="gold"
                />
              </div>
            </div>
          </div>

          {/* REAL INTERACTIVE GOOGLE MAPS EXPERIENCE */}
          <div className="bg-[#FAF5EE] border border-[#E0D4C0] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#7A5B35] font-semibold">
                Interactive Geographic Navigation
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#14281D]">
                Explore Real Company Facilities on Google Maps
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4D3F]">
                Select any location below to view its live satellite & road map in Ethiopia, inspect the facility, or get one-click turn-by-turn directions.
              </p>
            </div>

            {/* Location Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#EAE0D0] pb-4">
              {COMPANY_LOCATIONS_LIST.map((loc) => {
                const isSelected = loc.id === selectedLoc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#14281D] text-[#FAF5EE] shadow-md border border-[#14281D]'
                        : 'bg-white text-[#5C4D3F] border border-[#E0D4C0] hover:bg-[#F2ECE1] hover:text-[#14281D]'
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C8963E]' : 'text-[#8C7A68]'}`} />
                    <span className="font-semibold">{loc.shortName}</span>
                    {loc.isOwnedFarm && (
                      <span className="text-[10px] bg-[#C8963E] text-[#14281D] px-1.5 py-0.2 rounded font-bold uppercase">
                        Farm
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Map Frame + Location Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: REAL Google Map */}
              <div className="lg:col-span-7">
                <InteractiveGoogleMap
                  location={selectedLoc}
                  heightClass="h-[380px] sm:h-[460px]"
                />
              </div>

              {/* Right: Selected Location Detail Card */}
              <div className="lg:col-span-5 bg-white border border-[#E0D4C0] rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#14281D] text-[#C8963E] uppercase tracking-wider">
                    {selectedLoc.category}
                  </span>
                  <span className="text-xs text-[#7A5B35] font-mono">
                    {selectedLoc.cityTown}, Ethiopia
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#14281D]">
                  {selectedLoc.name}
                </h4>

                <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed">
                  {selectedLoc.description}
                </p>

                {/* Verified Address & Details */}
                <div className="bg-[#FAF5EE] p-4 rounded-xl border border-[#EAE0D0] text-xs space-y-2 text-[#5C4D3F]">
                  <div>
                    <strong className="text-[#14281D] block">Verified Address:</strong>
                    <span>{selectedLoc.address}</span>
                  </div>
                  <div>
                    <strong className="text-[#14281D] block">Region:</strong>
                    <span>{selectedLoc.region}, {selectedLoc.country}</span>
                  </div>
                  {selectedLoc.phone && (
                    <div>
                      <strong className="text-[#14281D] block">Direct Contact:</strong>
                      <span>{selectedLoc.phone} ({COMPANY.phoneInternational})</span>
                    </div>
                  )}
                  <div>
                    <strong className="text-[#14281D] block">Operations Status:</strong>
                    <span className="text-[#1E5C32] font-semibold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5C32]" />
                      Active Ethiopian Export Infrastructure
                    </span>
                  </div>
                </div>

                {/* Google Maps View & Directions Action Buttons */}
                <div className="pt-2 space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A5B35] block">
                    Google Maps Navigation
                  </span>
                  <GoogleMapButtons
                    searchUrl={selectedLoc.mapsSearchUrl}
                    directionsUrl={selectedLoc.directionsUrl}
                    locationName={selectedLoc.name}
                    variant="forest"
                    size="md"
                    className="w-full"
                  />
                </div>

                {/* Sourcing Inquiry CTA */}
                <div className="pt-3 border-t border-[#EAE0D0]">
                  <button
                    onClick={onRequestClick}
                    className="w-full py-3 rounded-xl bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] text-xs font-bold uppercase tracking-wider transition-all text-center cursor-pointer shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Inquire Sourcing from {selectedLoc.cityTown}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Complete Sourcing & Processing Network Grid with Direct Map Links */}
            <div className="pt-6 border-t border-[#EAE0D0] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#14281D]">
                  All Verified Network Locations & Sourcing Hubs
                </h4>
                <span className="text-xs text-[#7A5B35]">
                  Click to display on map or launch navigation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COMPANY_LOCATIONS_LIST.map((loc) => {
                  const isCurrent = loc.id === selectedLoc.id;
                  return (
                    <div
                      key={loc.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-[#14281D] text-[#FAF5EE] border-[#14281D] shadow-md ring-2 ring-[#C8963E]'
                          : 'bg-white text-[#14281D] border-[#E0D4C0] hover:bg-[#F7F3EC]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedLocationId(loc.id)}
                        className="text-left w-full cursor-pointer focus:outline-none"
                      >
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider block ${
                            isCurrent ? 'text-[#C8963E]' : 'text-[#7A5B35]'
                          }`}
                        >
                          {loc.category}
                        </span>
                        <span className="font-serif font-bold text-sm block mt-1 leading-snug">
                          {loc.name}
                        </span>
                        <span
                          className={`text-xs block mt-1 ${
                            isCurrent ? 'text-[#C2B5A0]' : 'text-[#6B5A49]'
                          }`}
                        >
                          {loc.address}
                        </span>
                      </button>

                      <div className="pt-3 mt-3 border-t border-current/15 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedLocationId(loc.id)}
                          className={`text-xs font-semibold underline underline-offset-2 cursor-pointer ${
                            isCurrent ? 'text-[#C8963E]' : 'text-[#14281D]'
                          }`}
                        >
                          Show on Map
                        </button>

                        <a
                          href={loc.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded transition-colors ${
                            isCurrent
                              ? 'bg-[#C8963E] text-[#14281D] hover:bg-white'
                              : 'bg-[#14281D] text-[#FAF5EE] hover:bg-[#C8963E] hover:text-[#14281D]'
                          }`}
                          title={`Navigate to ${loc.name}`}
                        >
                          <Compass className="w-3 h-3" />
                          <span>Directions</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
