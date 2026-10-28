import React from 'react';
import { BuildCoffeeFormData, CoffeeMatchResult } from '../types';
import { findCoffeeMatches } from '../services/matchService';
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
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Coffee,
  Mountain,
  MapPin,
  SlidersHorizontal,
  Send,
  MessageSquare
} from 'lucide-react';
import { WhatsAppButton } from '../components/common/Button';

interface CoffeeMatchPageProps {
  requirements: BuildCoffeeFormData;
  onBackToWizard: () => void;
  onViewCoffeeDetails: (coffeeId: string) => void;
  onRequestThisCoffee: (coffeeName: string, origin: string) => void;
  onSubmitRequirementsDirectly: () => void;
}

export const CoffeeMatchPage: React.FC<CoffeeMatchPageProps> = ({
  requirements,
  onBackToWizard,
  onViewCoffeeDetails,
  onRequestThisCoffee,
  onSubmitRequirementsDirectly
}) => {
  const matches: CoffeeMatchResult[] = findCoffeeMatches(requirements);

  return (
    <div className="space-y-0">
      {/* Header Banner */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-14 sm:py-18 px-4 sm:px-8 border-b border-[#234230] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3627] text-xs text-[#E5DBC7] border border-[#2B4F39]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />
            <span>Deterministic Match Results • Confirmed Catalog Offerings</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF5EE] tracking-tight">
            Your Coffee Matches
          </h1>

          <p className="text-sm sm:text-base text-[#C2B5A0] max-w-2xl font-light leading-relaxed">
            Based on your specified origin, processing method, and quality baseline, here are matching Ethiopian specialty coffees.
          </p>
        </div>
      </section>

      {/* Selected Requirements Summary Bar */}
      <section className="bg-[#FAF5EE] border-b border-[#E2D6C2] py-4 px-4 sm:px-8 sticky top-20 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#7A5B35]">Your Criteria:</span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#D5C9B6] font-medium text-[#14281D]">
              Origin: <strong>{requirements.origin}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#D5C9B6] font-medium text-[#14281D]">
              Process: <strong>{requirements.processing}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-[#D5C9B6] font-medium text-[#14281D]">
              Grade: <strong>{requirements.grade}</strong>
            </span>
            {requirements.minCupScore && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#D5C9B6] font-medium text-[#14281D]">
                Target Score: <strong>{requirements.minCupScore}</strong>
              </span>
            )}
          </div>

          <button
            onClick={onBackToWizard}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#14281D] hover:text-[#C8963E] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Modify Requirements</span>
          </button>
        </div>
      </section>

      {/* Matches Grid or No Match Banner */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto space-y-8">
          {matches.length === 0 ? (
            /* No Exact Match Found State */
            <div className="bg-[#FAF5EE] border border-[#E2D6C2] rounded-3xl p-10 sm:p-14 text-center space-y-5 max-w-xl mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#F2ECE1] text-[#7A5B35] flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-[#C8963E]" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#14281D]">
                No Exact Match Found
              </h3>

              <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed">
                No active catalog listing exactly matches your combined origin, processing, and cup score parameters right now.
              </p>

              <div className="bg-white p-4 rounded-xl border border-[#D5C9B6] text-xs text-[#5C4D3F] text-left space-y-1">
                <div className="font-semibold text-[#14281D]">Why is this?</div>
                <div>• We do not invent artificial lots or fake inventory numbers to force a match.</div>
                <div>• We source up to 100 containers seasonally across Ethiopia.</div>
                <div>• Our team can review custom lot sourcing to fulfill your specifications.</div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={onSubmitRequirementsDirectly}
                  className="py-3 px-6 rounded-xl bg-[#14281D] hover:bg-[#1E3F2D] text-[#FAF5EE] text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#C8963E]" />
                  <span>Submit Requirements for Exporter Review</span>
                </button>

                <button
                  onClick={onBackToWizard}
                  className="py-3 px-5 rounded-xl border border-[#D5C9B6] hover:bg-[#F2ECE1] text-xs font-semibold text-[#5C4D3F] cursor-pointer"
                >
                  Adjust Filters
                </button>
              </div>
            </div>
          ) : (
            /* Results Available */
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-[#7A5B35]">
                <span>
                  Found <strong>{matches.length}</strong> matching coffee offerings
                </span>
                <span className="text-[#1D5E34] font-medium">✓ Grade 1 baseline standard</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {matches.map(({ coffee, matchScore, explanation }) => (
                  <article
                    key={coffee.id}
                    className="bg-[#FAF5EE] border border-[#E2D6C2] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-[#14281D]/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image header */}
                      <div className="h-52 w-full relative overflow-hidden bg-[#14281D]">
                        <img
                          src={coffee.image}
                          alt={coffee.name}
                          className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                          <GradeBadge grade={coffee.grade} size="sm" />
                          <ProcessingBadge method={coffee.processingMethod} size="sm" />
                        </div>

                        <div className="absolute top-3 right-3 z-10">
                          <CupScoreBadge score={coffee.cupScoreBaseline} size="sm" />
                        </div>

                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-[#FAF5EE] z-10">
                          <span className="flex items-center gap-1 font-medium">
                            <MapPin className="w-3 h-3 text-[#C8963E]" />
                            {coffee.origin} • {coffee.region.split('(')[0].trim()}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-wider text-[#7A5B35] font-semibold">
                              {coffee.origin} Origin
                            </span>
                            <AvailabilityBadge availability={coffee.availability} />
                          </div>

                          <h3 className="text-xl font-serif font-bold text-[#14281D] mt-1">
                            {coffee.name}
                          </h3>
                        </div>

                        {/* Match Explanation Badge */}
                        <div className="p-3 rounded-xl bg-[#EBF6EE] border border-[#BCE1C7] text-xs text-[#1D5E34] flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#1D5E34] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">
                            <strong>Why it matches:</strong> {explanation}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#5C4D3F] line-clamp-2 leading-relaxed">
                          {coffee.description}
                        </p>

                        <div className="bg-[#F2ECE1] p-3 rounded-xl space-y-1.5 text-xs border border-[#E5DAC8]">
                          <div className="flex justify-between items-center text-[#5C4D3F]">
                            <span className="text-[#8C7A68]">Typical Altitude:</span>
                            <span className="font-semibold text-[#14281D]">{coffee.altitude}</span>
                          </div>
                          <div className="flex justify-between items-center text-[#5C4D3F]">
                            <span className="text-[#8C7A68]">Processing:</span>
                            <span className="font-medium text-[#14281D]">{coffee.processingMethod}</span>
                          </div>
                          <div className="flex justify-between items-center text-[#5C4D3F]">
                            <span className="text-[#8C7A68]">Flavor Profile:</span>
                            <span className="font-medium text-[#14281D] text-right truncate max-w-[170px]">
                              {coffee.flavorProfile}
                            </span>
                          </div>
                        </div>

                        <div className="pt-0.5">
                          <TypicalRegionalBadge size="sm" />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 pt-0 border-t border-[#EAE0D0] mt-2 space-y-2">
                      <div className="text-[11px] text-[#8C7A68] italic pt-2">
                        Container inventory & sample specs: <strong>Upon Request</strong>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onViewCoffeeDetails(coffee.id)}
                          className="py-2.5 px-3 rounded-lg border border-[#14281D]/30 hover:border-[#14281D] hover:bg-[#14281D]/5 text-xs font-semibold text-[#14281D] text-center cursor-pointer transition-colors"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => onRequestThisCoffee(coffee.name, coffee.origin)}
                          className="py-2.5 px-3 rounded-lg bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] text-xs font-bold text-center cursor-pointer transition-all shadow-xs"
                        >
                          Request This Coffee
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Bottom Option to submit full requirements regardless */}
              <div className="mt-8 p-6 rounded-3xl bg-[#FAF5EE] border border-[#E0D4C0] flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-[#14281D] text-base">
                    Want to formalize these requirements into an official inquiry?
                  </h4>
                  <p className="text-xs text-[#5C4D3F] mt-0.5">
                    Submit your complete requirement sheet to receive a direct quotation and reference code from Mesfin Girma.
                  </p>
                </div>
                <button
                  onClick={onSubmitRequirementsDirectly}
                  className="px-6 py-3 rounded-xl bg-[#14281D] hover:bg-[#1E3F2D] text-[#FAF5EE] text-xs font-bold cursor-pointer shrink-0 shadow-sm"
                >
                  Submit Coffee Request Now
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
