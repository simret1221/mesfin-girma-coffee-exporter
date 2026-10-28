import React, { useState, useEffect } from 'react';
import { CoffeeRequest } from '../types';
import { fetchRequestByReference, getAllRequests } from '../services/requestService';
import { TimelineTracker } from '../components/tracking/TimelineTracker';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Coffee,
  MapPin,
  Calendar,
  Building2,
  User,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { COMPANY } from '../constants/company';
import { WhatsAppButton } from '../components/common/Button';

interface TrackRequestPageProps {
  initialReference?: string;
  onNavigateToBuildCoffee: () => void;
  onNavigateToCatalog: () => void;
}

export const TrackRequestPage: React.FC<TrackRequestPageProps> = ({
  initialReference,
  onNavigateToBuildCoffee,
  onNavigateToCatalog
}) => {
  const [referenceInput, setReferenceInput] = useState<string>(initialReference || '');
  const [currentRequest, setCurrentRequest] = useState<CoffeeRequest | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notFoundError, setNotFoundError] = useState<boolean>(false);

  // Auto-search if initialReference is passed
  useEffect(() => {
    if (initialReference && initialReference.trim()) {
      setReferenceInput(initialReference);
      handleSearch(initialReference);
    }
  }, [initialReference]);

  const handleSearch = async (refToSearch?: string) => {
    const targetRef = (refToSearch || referenceInput).trim();
    if (!targetRef) return;

    setIsLoading(true);
    setHasSearched(true);
    setNotFoundError(false);

    try {
      const found = await fetchRequestByReference(targetRef);
      if (found) {
        setCurrentRequest(found);
        setNotFoundError(false);
      } else {
        setCurrentRequest(null);
        setNotFoundError(true);
      }
    } catch {
      setCurrentRequest(null);
      setNotFoundError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  // Recent locally submitted references for easy one-click testing
  const allSaved = getAllRequests().slice(0, 3);

  return (
    <div className="space-y-0">
      {/* 1. Page Hero */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-14 sm:py-18 px-4 sm:px-8 border-b border-[#234230] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3627] text-xs text-[#E5DBC7] border border-[#2B4F39]">
            <Clock className="w-3.5 h-3.5 text-[#C8963E]" />
            <span>Real-Time Export Request Tracking • Official MGG References</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF5EE] tracking-tight">
            Track Coffee Export Request
          </h1>

          <p className="text-sm sm:text-base text-[#C2B5A0] max-w-2xl font-light leading-relaxed">
            Enter your official <strong>MGG Reference Number</strong> to inspect the current review, quote, and preparation status of your coffee inquiry.
          </p>
        </div>
      </section>

      {/* 2. Search Lookup Box Section */}
      <section className="bg-[#FAF5EE] border-b border-[#E2D6C2] py-8 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative grow">
              <Search className="w-4 h-4 text-[#8C7A68] absolute left-4 top-3.5" />
              <input
                type="text"
                value={referenceInput}
                onChange={(e) => setReferenceInput(e.target.value)}
                placeholder="Enter Reference (e.g. MGG-2026-0001)"
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D] font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !referenceInput.trim()}
              className="py-3 px-7 rounded-xl bg-[#14281D] hover:bg-[#1E3F2D] text-[#FAF5EE] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer shadow-sm disabled:opacity-50 shrink-0"
            >
              {isLoading ? 'Searching...' : 'Track Request'}
            </button>
          </form>

          {/* Quick Demo Pill Helper */}
          {allSaved.length > 0 && !hasSearched && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A5B35] pt-1">
              <span>Recently logged references:</span>
              {allSaved.map((r) => (
                <button
                  key={r.referenceNumber}
                  type="button"
                  onClick={() => {
                    setReferenceInput(r.referenceNumber);
                    handleSearch(r.referenceNumber);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#D5C9B6] hover:border-[#14281D] font-mono text-[#14281D] cursor-pointer"
                >
                  {r.referenceNumber}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Main Results Display */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-[#FBF9F5]">
        <div className="max-w-4xl mx-auto">
          {/* Error: Request Not Found */}
          {notFoundError && hasSearched && (
            <div className="bg-[#FAF5EE] border border-[#E2D6C2] rounded-3xl p-10 sm:p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF2F2] text-[#9B1C1C] flex items-center justify-center mx-auto border border-[#F8B4B4]">
                <AlertCircle className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-serif font-bold text-[#14281D]">
                Request not found.
              </h3>

              <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed">
                Please check your reference number and try again. Format should be <strong>MGG-YYYY-XXXX</strong> (e.g. MGG-2026-0001).
              </p>

              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => {
                    setReferenceInput('');
                    setHasSearched(false);
                    setNotFoundError(false);
                  }}
                  className="py-2.5 px-4 rounded-xl border border-[#D5C9B6] text-xs font-semibold text-[#5C4D3F] hover:bg-[#F2ECE1] cursor-pointer"
                >
                  Clear Search
                </button>

                <button
                  onClick={onNavigateToBuildCoffee}
                  className="py-2.5 px-5 rounded-xl bg-[#14281D] text-[#FAF5EE] text-xs font-bold hover:bg-[#1E3F2D] cursor-pointer"
                >
                  Submit a New Request
                </button>
              </div>
            </div>
          )}

          {/* Success: Request Retrieved */}
          {currentRequest && (
            <div className="space-y-8">
              {/* Header Card */}
              <div className="bg-[#FAF5EE] border border-[#E0D4C0] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-[#7A5B35] uppercase tracking-wider">
                      Official Export Reference
                    </span>
                    <span className="text-[#A8987E]">•</span>
                    <span className="text-[#5C4D3F]">
                      Submitted on{' '}
                      {new Date(currentRequest.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#14281D] mt-1 tracking-wider">
                    {currentRequest.referenceNumber}
                  </h2>

                  <p className="text-xs text-[#5C4D3F] mt-1">
                    Buyer: <strong>{currentRequest.formData.buyerName}</strong> (
                    {currentRequest.formData.companyName})
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  <div className="px-3.5 py-1.5 rounded-full bg-[#14281D] text-[#C8963E] border border-[#C8963E]/40 text-xs font-bold tracking-wide uppercase">
                    Status: {currentRequest.status}
                  </div>

                  <WhatsAppButton
                    message={`Hello Mesfin Girma, following up on request ${currentRequest.referenceNumber} regarding ${currentRequest.formData.origin} coffee.`}
                    label="WhatsApp Follow-up"
                    size="sm"
                  />
                </div>
              </div>

              {/* Visual Timeline Tracker */}
              <div className="bg-[#FAF5EE] border border-[#E0D4C0] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
                <TimelineTracker
                  currentStatus={currentRequest.status}
                  timelineEvents={currentRequest.timeline}
                />
              </div>

              {/* Requirement Specifications Details Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coffee Specs */}
                <div className="bg-[#FAF5EE] border border-[#E0D4C0] rounded-3xl p-6 space-y-4">
                  <h3 className="text-sm font-serif font-bold text-[#14281D] uppercase tracking-wider border-b border-[#EAE0D0] pb-2">
                    Coffee Specifications
                  </h3>

                  <div className="space-y-2.5 text-xs text-[#5C4D3F]">
                    <div className="flex justify-between py-1 border-b border-[#F2ECE1]">
                      <span className="text-[#8C7A68]">Origin:</span>
                      <strong className="text-[#14281D]">
                        {currentRequest.formData.origin === 'Other Ethiopia'
                          ? `Other Ethiopia (${currentRequest.formData.otherOriginText || ''})`
                          : currentRequest.formData.origin}
                      </strong>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#F2ECE1]">
                      <span className="text-[#8C7A68]">Processing:</span>
                      <strong className="text-[#14281D]">
                        {currentRequest.formData.processing}
                      </strong>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#F2ECE1]">
                      <span className="text-[#8C7A68]">Grade:</span>
                      <strong className="text-[#14281D]">{currentRequest.formData.grade}</strong>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#F2ECE1]">
                      <span className="text-[#8C7A68]">Target Cup Score:</span>
                      <strong className="text-[#14281D]">
                        {currentRequest.formData.minCupScore || 'Baseline >85'}
                      </strong>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-[#8C7A68]">Requested Quantity:</span>
                      <strong className="text-[#14281D]">
                        {currentRequest.formData.quantityValue || currentRequest.formData.quantityType}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Shipping & Contact */}
                <div className="bg-[#FAF5EE] border border-[#E0D4C0] rounded-3xl p-6 space-y-4">
                  <h3 className="text-sm font-serif font-bold text-[#14281D] uppercase tracking-wider border-b border-[#EAE0D0] pb-2">
                    Destination & Buyer Profile
                  </h3>

                  <div className="space-y-2.5 text-xs text-[#5C4D3F]">
                    <div className="flex justify-between py-1 border-b border-[#F2ECE1]">
                      <span className="text-[#8C7A68]">Destination Country:</span>
                      <strong className="text-[#14281D]">
                        {currentRequest.formData.destinationCountry}
                      </strong>
                    </div>

                    {currentRequest.formData.destinationPort && (
                      <div className="flex justify-between py-1 border-b border-[#F2ECE1]">
                        <span className="text-[#8C7A68]">Discharge Port:</span>
                        <strong className="text-[#14281D]">
                          {currentRequest.formData.destinationPort}
                        </strong>
                      </div>
                    )}

                    <div className="flex justify-between py-1 border-b border-[#F2ECE1]">
                      <span className="text-[#8C7A68]">Company:</span>
                      <strong className="text-[#14281D]">
                        {currentRequest.formData.companyName}
                      </strong>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#F2ECE1]">
                      <span className="text-[#8C7A68]">Buyer Contact:</span>
                      <strong className="text-[#14281D]">
                        {currentRequest.formData.buyerName}
                      </strong>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-[#8C7A68]">Email / Phone:</span>
                      <span className="text-[#14281D]">
                        {currentRequest.formData.email} • {currentRequest.formData.phoneWhatsApp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {currentRequest.formData.additionalNotes && (
                <div className="bg-[#FAF5EE] border border-[#E0D4C0] rounded-2xl p-5 text-xs text-[#5C4D3F] space-y-1">
                  <strong className="text-[#14281D] block">Buyer's Additional Notes:</strong>
                  <p>{currentRequest.formData.additionalNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* Initial State Helper */}
          {!hasSearched && (
            <div className="text-center py-10 space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] text-[#7A5B35] border border-[#E0D4C0] flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-[#C8963E]" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#14281D]">
                Have a reference from a previous request?
              </h3>
              <p className="text-xs text-[#5C4D3F] leading-relaxed">
                Enter your code in the search bar above to view the latest status from our export management team in Ethiopia.
              </p>
              <div className="pt-2">
                <button
                  onClick={onNavigateToBuildCoffee}
                  className="px-5 py-2.5 rounded-xl bg-[#14281D] text-[#FAF5EE] text-xs font-semibold hover:bg-[#1E3F2D] cursor-pointer"
                >
                  Start a New Coffee Request →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
