import React, { useState } from 'react';
import { ETHIOPIAN_ORIGINS } from '../constants/origins';
import { getAllCoffees } from '../services/catalogService';
import { OriginInfo, CoffeeProduct } from '../types';
import { EthiopiaMapViewer } from '../components/origin-explorer/EthiopiaMapViewer';
import {
  MapPin,
  Mountain,
  Layers,
  Sparkles,
  Coffee,
  ArrowRight,
  ExternalLink,
  Compass,
  Navigation,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { TypicalRegionalBadge } from '../components/common/Badge';
import { getOriginGoogleMapsUrls } from '../constants/locations';
import { GoogleMapButtons } from '../components/common/GoogleMapComponents';

interface OriginExplorerPageProps {
  onSelectOriginToExplore: (originName: string) => void;
  onRequestClick: (origin?: string) => void;
  onViewCoffeeDetails: (coffeeId: string) => void;
  onViewAllCoffees: () => void;
}

export const OriginExplorerPage: React.FC<OriginExplorerPageProps> = ({
  onSelectOriginToExplore,
  onRequestClick,
  onViewCoffeeDetails,
  onViewAllCoffees
}) => {
  const [selectedOrigin, setSelectedOrigin] = useState<OriginInfo>(ETHIOPIAN_ORIGINS[0]);

  // Related coffees for this origin
  const allCoffees = getAllCoffees();
  const relatedCoffees = allCoffees.filter(
    (c: CoffeeProduct) => c.origin.toLowerCase() === selectedOrigin.name.toLowerCase()
  );

  // Real Google Maps navigation URLs for this origin
  const mapUrls = getOriginGoogleMapsUrls(selectedOrigin.name);

  // Check if this origin is an owned company farm site
  const isCompanyFarm =
    selectedOrigin.name.toLowerCase().includes('shakiso') ||
    selectedOrigin.name.toLowerCase().includes('yirgacheffe');

  return (
    <div className="space-y-0">
      {/* 1. Header Hero Banner */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-16 sm:py-20 px-4 sm:px-8 border-b border-[#234230]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3627] text-xs text-[#E5DBC7] border border-[#2B4F39]">
            <MapPin className="w-3.5 h-3.5 text-[#C8963E]" />
            <span>Interactive Ethiopian Terroir & Geographic Explorer</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF5EE]">
            Ethiopian Specialty Coffee Origins
          </h1>

          <p className="text-sm sm:text-base text-[#C2B5A0] max-w-2xl font-light leading-relaxed">
            Explore the microclimates, typical regional flavor profiles, and mountain elevations across Yirgacheffe, Guji, Sidama, Shakiso, Arsi, and Harar. Inspect every origin live on Google Maps.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#C8963E]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8963E]" />
              <span className="text-[#FAF5EE]">Primary Focus: Yirgacheffe • Guji • Sidama</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8963E]/60" />
              <span className="text-[#FAF5EE]">Company Farm Sites: Shakiso & Yirgacheffe</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8963E]/40" />
              <span className="text-[#FAF5EE]">Regional Networks: Arsi & Harar</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Map & Origin Panel Section */}
      <section className="py-12 sm:py-18 px-4 sm:px-8 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Origin Quick Filter Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#7A5B35] font-semibold">
                Select Origin:
              </span>
              <button
                onClick={onViewAllCoffees}
                className="text-xs font-semibold text-[#14281D] hover:text-[#C8963E] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>View All Ethiopian Coffee</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pb-2">
              {ETHIOPIAN_ORIGINS.map((origin) => {
                const isSelected = selectedOrigin.id === origin.id;
                const isPrimary = origin.primaryFocus || origin.isPrimaryFocus;

                return (
                  <button
                    key={origin.id}
                    onClick={() => setSelectedOrigin(origin)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#14281D] text-[#C8963E] shadow-md border border-[#C8963E]/40'
                        : 'bg-[#FAF5EE] text-[#5C4D3F] border border-[#E0D4C0] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C8963E]' : 'text-[#8C7A68]'}`} />
                    <span>{origin.name}</span>
                    {isPrimary && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#C8963E] text-[#14281D]">
                        Primary
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Grid: Real Interactive Google Map + Origin Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Real Google Map Container */}
            <div className="lg:col-span-6 bg-[#FAF5EE] border border-[#E0D4C0] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-[#EAE0D0] pb-4">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#14281D]">
                    Real Google Map Terroir Explorer
                  </h2>
                  <p className="text-xs text-[#7A5B35]">
                    Live satellite imagery and road network across {selectedOrigin.name}, Ethiopia
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#14281D] bg-[#F2ECE1] px-2.5 py-1 rounded">
                  Horn of Africa
                </span>
              </div>

              {/* Dedicated Real Google Map Viewer */}
              <EthiopiaMapViewer
                origins={ETHIOPIAN_ORIGINS}
                selectedOriginId={selectedOrigin.id}
                onSelectOrigin={(origin) => setSelectedOrigin(origin)}
              />

              <div className="space-y-2 text-xs text-[#6B5A49]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#14281D] border border-[#C8963E]" />
                  <span><strong>Primary Specialty Focus:</strong> Yirgacheffe, Guji, Sidama</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C8963E]" />
                  <span><strong>Company Farm Sites:</strong> Shakiso & Yirgacheffe Station</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5C3826]" />
                  <span><strong>Dedicated Sourcing Networks:</strong> Arsi & Harar Historic Origins</span>
                </div>
              </div>
            </div>

            {/* Selected Origin Information Panel / Card */}
            <div className="lg:col-span-6 bg-[#FAF5EE] border border-[#E0D4C0] rounded-3xl overflow-hidden shadow-sm">
              {/* Origin Photo Hero Banner */}
              <div className="h-56 w-full relative bg-[#14281D] overflow-hidden">
                {selectedOrigin.image && (
                  <img
                    src={selectedOrigin.image}
                    alt={selectedOrigin.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14281D] via-transparent to-black/30 pointer-events-none" />

                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  {isCompanyFarm ? (
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#C8963E] text-[#14281D] uppercase shadow-sm">
                      Company Farm Site
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-black/60 text-[#FAF5EE] border border-white/20 backdrop-blur-md uppercase">
                      Regional Sourcing Network
                    </span>
                  )}
                  <TypicalRegionalBadge size="sm" />
                </div>

                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between z-10">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#C8963E] font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{selectedOrigin.region}, Ethiopia</span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#FAF5EE]">
                      {selectedOrigin.name}
                    </h2>
                  </div>

                  {(selectedOrigin.primaryFocus || selectedOrigin.isPrimaryFocus) && (
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#C8963E] text-[#14281D] uppercase">
                      Primary Focus
                    </span>
                  )}
                </div>
              </div>

              {/* Panel Content Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Short Description */}
                <blockquote className="p-4 rounded-xl bg-[#F2ECE1] border-l-4 border-[#C8963E] text-xs sm:text-sm text-[#4E4133] italic leading-relaxed">
                  "{selectedOrigin.description || selectedOrigin.shortDescription}"
                </blockquote>

                {/* Google Maps Actions for this Origin: "Explore on Map" & "Get Directions" */}
                <div className="bg-[#FAF5EE] p-4 rounded-2xl border border-[#E0D4C0] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#14281D] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#C8963E]" />
                      <span>Location: {selectedOrigin.name}, {selectedOrigin.region}, Ethiopia</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#7A5B35]">
                      {isCompanyFarm ? 'Direct Operations' : 'Regional Collaboration'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={mapUrls.searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Explore on Google Maps</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>

                    <a
                      href={mapUrls.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F2ECE1] text-[#14281D] border border-[#D5C8B4] hover:border-[#14281D] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#C8963E]" />
                      <span>Get Directions</span>
                    </a>
                  </div>
                </div>

                {/* Flavor Notes Tag Cloud */}
                {selectedOrigin.flavorNotes && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-semibold text-[#14281D] uppercase tracking-wider">
                        Typical Flavor Notes
                      </h3>
                      <span className="text-[11px] text-[#7A5B35] italic">Regional Descriptor</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedOrigin.flavorNotes.map((note) => (
                        <span
                          key={note}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FAF5EE] text-[#14281D] border border-[#D5CABB]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Structured Specifications Matrix */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-[#14281D] uppercase tracking-wider">
                      Typical Regional Characteristics
                    </h3>
                    <TypicalRegionalBadge size="sm" />
                  </div>

                  <div className="border border-[#E2D6C2] rounded-2xl overflow-hidden text-xs divide-y divide-[#E2D6C2]">
                    {/* Altitude */}
                    <div className="flex justify-between p-3.5 bg-white items-center">
                      <span className="text-[#7A5B35] font-medium flex items-center gap-1.5">
                        <Mountain className="w-3.5 h-3.5 text-[#C8963E]" /> Typical Altitude Range:
                      </span>
                      <strong className="text-[#14281D]">{selectedOrigin.typicalAltitude}</strong>
                    </div>

                    {/* Varieties */}
                    <div className="flex justify-between p-3.5 bg-[#FAF5EE] items-center">
                      <span className="text-[#7A5B35] font-medium flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#C8963E]" /> Typical Varieties:
                      </span>
                      <span className="text-[#14281D] font-medium text-right">{selectedOrigin.typicalVarieties}</span>
                    </div>

                    {/* Characteristics */}
                    <div className="flex justify-between p-3.5 bg-white items-center">
                      <span className="text-[#7A5B35] font-medium flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" /> Typical Characteristics:
                      </span>
                      <span className="text-[#14281D] font-semibold text-right">{selectedOrigin.typicalCharacteristics}</span>
                    </div>

                    {/* Processing */}
                    <div className="flex justify-between p-3.5 bg-[#FAF5EE] items-center">
                      <span className="text-[#7A5B35] font-medium flex items-center gap-1.5">
                        <Coffee className="w-3.5 h-3.5 text-[#C8963E]" /> Available Processing:
                      </span>
                      <div className="flex gap-1.5">
                        {selectedOrigin.availableProcessing.map((proc) => (
                          <span key={proc} className="font-semibold text-[#14281D]">
                            {proc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Coffees from this Origin */}
                {relatedCoffees.length > 0 && (
                  <div className="space-y-3 pt-1">
                    <h3 className="text-xs font-semibold text-[#14281D] uppercase tracking-wider">
                      Confirmed Offerings from {selectedOrigin.name}
                    </h3>
                    <div className="space-y-2">
                      {relatedCoffees.map((c) => (
                        <div
                          key={c.id}
                          className="p-3 bg-white border border-[#E0D4C0] rounded-xl flex items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <span className="font-serif font-bold text-[#14281D] block">
                              {c.name}
                            </span>
                            <span className="text-[11px] text-[#7A5B35]">
                              {c.grade} • Cup Score: {c.cupScoreBaseline} • {c.processingMethod}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onViewCoffeeDetails(c.id)}
                              className="px-2.5 py-1.5 rounded-lg border border-[#D5C9B6] text-[#14281D] hover:bg-[#F2ECE1] text-[11px] font-semibold cursor-pointer"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => onRequestClick(selectedOrigin.name)}
                              className="px-3 py-1.5 rounded-lg bg-[#C8963E] text-[#14281D] font-bold text-[11px] hover:bg-[#B38130] cursor-pointer"
                            >
                              Request
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regional Disclaimer Note */}
                <div className="bg-[#F2ECE1] p-3 rounded-lg text-[11px] text-[#6B5A49] leading-relaxed border border-[#DFD1BE]">
                  <strong className="text-[#14281D]">Important Data Rule:</strong> Regional altitude, varieties, and flavor descriptors are typical characteristics of {selectedOrigin.name}. They are not guaranteed specifications of every single coffee lot. Actual lot specifications are provided upon inquiry.
                </div>

                {/* Action Buttons: "Explore Coffee" and "View All Ethiopian Coffee" */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => onSelectOriginToExplore(selectedOrigin.name)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#14281D] hover:bg-[#1E3B2B] text-[#FAF5EE] text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Explore {selectedOrigin.name} Coffee</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onViewAllCoffees}
                    className="py-3 px-4 rounded-xl border border-[#14281D]/30 hover:border-[#14281D] text-[#14281D] text-xs font-semibold transition-all text-center cursor-pointer"
                  >
                    View All Ethiopian Coffee
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
