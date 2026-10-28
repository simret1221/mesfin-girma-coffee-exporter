import React, { useState, useEffect } from 'react';
import { BuildCoffeeFormData, CoffeeRequest } from '../types';
import { createCoffeeRequest } from '../services/requestService';
import { findCoffeeMatches } from '../services/matchService';
import {
  Coffee,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles,
  MapPin,
  Droplets,
  SunMedium,
  Award,
  Layers,
  Globe,
  Ship,
  Building2,
  User,
  Mail,
  Phone,
  MessageSquare,
  FileCheck,
  Send,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { TypicalRegionalBadge, VerifiedInformationBadge } from '../components/common/Badge';
import { WhatsAppButton } from '../components/common/Button';
import { getCurrentUser } from '../services/authService';

interface BuildCoffeePageProps {
  initialCoffeeContext?: { coffeeId?: string; coffeeName?: string; origin?: string };
  onNavigateToMatchResults: (requirements: BuildCoffeeFormData) => void;
  onNavigateToTracking: (referenceNumber: string) => void;
  onNavigateToCatalog: () => void;
}

export const BuildCoffeePage: React.FC<BuildCoffeePageProps> = ({
  initialCoffeeContext,
  onNavigateToMatchResults,
  onNavigateToTracking,
  onNavigateToCatalog
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRequest, setSubmittedRequest] = useState<CoffeeRequest | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentUser = getCurrentUser();

  // Form State
  const [formData, setFormData] = useState<BuildCoffeeFormData>({
    origin: initialCoffeeContext?.origin || 'Not sure',
    otherOriginText: '',
    processing: 'Either',
    grade: 'Grade 1',
    minCupScore: '85+',
    quantityType: 'Containers',
    quantityValue: '1 Container',
    destinationCountry: currentUser?.country || '',
    destinationPort: currentUser?.destinationPort || '',
    destinationNotes: '',
    incoterm: '',
    companyName: currentUser?.companyName || '',
    buyerName: currentUser?.buyerName || '',
    email: currentUser?.email || '',
    phoneWhatsApp: currentUser?.phoneWhatsApp || '',
    country: currentUser?.country || '',
    additionalNotes: initialCoffeeContext?.coffeeName
      ? `Inquiring specifically for: ${initialCoffeeContext.coffeeName}`
      : '',
    selectedCoffeeId: initialCoffeeContext?.coffeeId,
    selectedCoffeeName: initialCoffeeContext?.coffeeName
  });

  // Reset error when user changes fields
  useEffect(() => {
    setValidationError(null);
  }, [formData, currentStep]);

  // Validation function per step
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (formData.origin === 'Other Ethiopia' && !formData.otherOriginText?.trim()) {
        setValidationError('Please specify your requested Ethiopian origin.');
        return false;
      }
      return true;
    }
    if (step === 5) {
      if (!formData.destinationCountry.trim()) {
        setValidationError('Please provide your destination country.');
        return false;
      }
      return true;
    }
    if (step === 6) {
      if (!formData.companyName.trim()) {
        setValidationError('Company / Roastery name is required.');
        return false;
      }
      if (!formData.buyerName.trim()) {
        setValidationError('Buyer / Contact person name is required.');
        return false;
      }
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        setValidationError('Please enter a valid business email address.');
        return false;
      }
      if (!formData.phoneWhatsApp.trim()) {
        setValidationError('WhatsApp or phone number is required for export communication.');
        return false;
      }
      if (!formData.country.trim()) {
        setFormData((prev) => ({ ...prev, country: prev.destinationCountry }));
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleGoToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Submit request and move to step 8
  const handleSubmitRequest = async () => {
    if (!validateStep(6)) {
      setCurrentStep(6);
      return;
    }
    setIsSubmitting(true);
    setValidationError(null);

    try {
      // Find matches for linking
      const matches = findCoffeeMatches(formData);
      const matchedIds = matches.map((m) => m.coffee.id);

      const request = await createCoffeeRequest(formData, matchedIds);
      setSubmittedRequest(request);
      setCurrentStep(8);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch {
      setValidationError('Failed to submit request. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    'Origin',
    'Processing',
    'Quality',
    'Quantity',
    'Destination',
    'Buyer Info',
    'Review',
    'Confirmation'
  ];

  return (
    <div className="space-y-0">
      {/* 1. Page Hero */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-14 sm:py-18 px-4 sm:px-8 border-b border-[#234230] relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3627] text-xs text-[#E5DBC7] border border-[#2B4F39]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />
            <span>Guided Buyer Requirements • Direct Exporter Sourcing</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF5EE] tracking-tight">
            Build Your Coffee Requirements
          </h1>

          <p className="text-sm sm:text-base text-[#C2B5A0] max-w-2xl font-light leading-relaxed">
            Tell us what you are looking for and we'll help you find matching Ethiopian coffee.
          </p>

          {formData.selectedCoffeeName && (
            <div className="pt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#C8963E]/20 text-[#C8963E] border border-[#C8963E]/40 text-xs">
              <Coffee className="w-4 h-4" />
              <span>
                Pre-selected Coffee: <strong>{formData.selectedCoffeeName}</strong>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 2. Wizard Stepper Bar */}
      <section className="bg-[#FAF5EE] border-b border-[#E2D6C2] py-4 px-4 sm:px-8 sticky top-20 z-20 shadow-xs">
        <div className="max-w-4xl mx-auto">
          {/* Visual Step Progress Bar */}
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E2D6C2] -translate-y-1/2 -z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-[#14281D] -translate-y-1/2 transition-all duration-300 -z-0"
              style={{ width: `${((currentStep - 1) / (stepTitles.length - 1)) * 100}%` }}
            />

            {stepTitles.map((title, idx) => {
              const stepNum = idx + 1;
              const isPassed = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div key={title} className="flex flex-col items-center relative z-10">
                  <button
                    disabled={currentStep === 8 || stepNum > currentStep}
                    onClick={() => handleGoToStep(stepNum)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#14281D] text-[#C8963E] ring-4 ring-[#C8963E]/30 scale-110 shadow-sm'
                        : isPassed
                        ? 'bg-[#1E3F2D] text-[#FAF5EE]'
                        : 'bg-[#F2ECE1] text-[#8C7A68] border border-[#D5C9B6]'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> : stepNum}
                  </button>
                  <span className="hidden sm:block text-[11px] font-medium text-[#7A5B35] mt-1.5">
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Wizard Content Card */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-[#FBF9F5]">
        <div className="max-w-3xl mx-auto">
          {/* Validation Alert */}
          {validationError && (
            <div className="mb-6 p-4 rounded-xl bg-[#FDF2F2] border border-[#F8B4B4] text-xs text-[#9B1C1C] flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <div className="bg-[#FAF5EE] border border-[#E0D4C0] rounded-3xl p-6 sm:p-10 shadow-sm">
            {/* STEP 1: ORIGIN */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7A5B35] font-semibold">
                    Step 1 of 8 • Origin Preference
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14281D] mt-1">
                    Select Ethiopian Coffee Origin
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-1">
                    Choose one of our primary specialty focus areas, or choose <em>Not sure</em> to view recommendations across regions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    {
                      id: 'Yirgacheffe',
                      title: 'Yirgacheffe',
                      desc: 'Floral, citrus, tea-like elegance (Primary Focus & Company Farm site)'
                    },
                    {
                      id: 'Guji',
                      title: 'Guji',
                      desc: 'Fruity, floral, sweet berry profile (Primary Specialty Focus)'
                    },
                    {
                      id: 'Sidama',
                      title: 'Sidama',
                      desc: 'Sweet, citrus, stonefruit & floral characteristics (Primary Focus)'
                    },
                    {
                      id: 'Other Ethiopia',
                      title: 'Other Ethiopia',
                      desc: 'Shakiso, Arsi, Harar, Nekemte collaboration, or custom region'
                    },
                    {
                      id: 'Not sure',
                      title: 'Not sure (Flexible)',
                      desc: 'Explore options across all confirmed Ethiopian origins'
                    }
                  ].map((opt) => {
                    const isSelected = formData.origin === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, origin: opt.id })}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#14281D] text-[#FAF5EE] border-[#14281D] shadow-md ring-2 ring-[#C8963E]/40'
                            : 'bg-white text-[#14281D] border-[#D5C9B6] hover:bg-[#F7F3EC]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-serif font-bold text-base">{opt.title}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#C8963E] bg-[#C8963E]' : 'border-[#A8987E]'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#14281D]" />}
                          </span>
                        </div>
                        <p
                          className={`text-xs mt-2 leading-relaxed ${
                            isSelected ? 'text-[#C2B5A0]' : 'text-[#6B5A49]'
                          }`}
                        >
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {formData.origin === 'Other Ethiopia' && (
                  <div className="pt-2 space-y-2">
                    <label className="block text-xs font-semibold text-[#14281D]">
                      Specify Requested Region (e.g. Shakiso, Arsi, Harar, Nekemte) *
                    </label>
                    <input
                      type="text"
                      value={formData.otherOriginText || ''}
                      onChange={(e) => setFormData({ ...formData, otherOriginText: e.target.value })}
                      placeholder="e.g. Shakiso Highland / Harar"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                    />
                  </div>
                )}

                <div className="bg-[#F2ECE1] p-3 rounded-xl border border-[#DECFBB] text-[11px] text-[#6B5A49]">
                  <strong className="text-[#14281D]">Note:</strong> Sourcing claims are restricted to verified company origins. Regional notes represent <em>Typical Regional Characteristics</em>.
                </div>
              </div>
            )}

            {/* STEP 2: PROCESSING */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7A5B35] font-semibold">
                    Step 2 of 8 • Processing Method
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14281D] mt-1">
                    Select Processing Method
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-1">
                    Confirmed company preparations: Washed and Sun-Dried / Natural.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'Washed',
                      title: 'Washed',
                      icon: Droplets,
                      desc: 'Fresh water depulping and fermentation, emphasizing floral clarity, citric sweetness, and clean cup profile.'
                    },
                    {
                      id: 'Sun-Dried / Natural',
                      title: 'Sun-Dried / Natural',
                      icon: SunMedium,
                      desc: 'Whole ripe cherries dried slowly on raised African beds, delivering rich berry sweetness, fruit complexity, and heavier body.'
                    },
                    {
                      id: 'Either',
                      title: 'Either (Open)',
                      icon: Sparkles,
                      desc: 'Open to both washed and natural lots based on cupping quality and current season offerings.'
                    }
                  ].map((proc) => {
                    const isSelected = formData.processing === proc.id;
                    const Icon = proc.icon;

                    return (
                      <button
                        key={proc.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, processing: proc.id as any })}
                        className={`p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#14281D] text-[#FAF5EE] border-[#14281D] shadow-md ring-2 ring-[#C8963E]/40'
                            : 'bg-white text-[#14281D] border-[#D5C9B6] hover:bg-[#F7F3EC]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                isSelected ? 'bg-[#C8963E] text-[#14281D]' : 'bg-[#F2ECE1] text-[#7A5B35]'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-[#C8963E] bg-[#C8963E]' : 'border-[#A8987E]'
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#14281D]" />}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-base mt-3">{proc.title}</h4>
                        </div>
                        <p
                          className={`text-xs mt-2 leading-relaxed ${
                            isSelected ? 'text-[#C2B5A0]' : 'text-[#6B5A49]'
                          }`}
                        >
                          {proc.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: QUALITY */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7A5B35] font-semibold">
                    Step 3 of 8 • Quality Standards
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14281D] mt-1">
                    Grade & Target Cup Score
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-1">
                    Confirmed company export baseline: <strong>Grade 1 with cup scores above 85</strong>.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-2">
                      Grade Preference
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'Grade 1', label: 'Grade 1 (Standard Export Baseline)' },
                        { id: 'No preference', label: 'No preference' }
                      ].map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, grade: g.id as any })}
                          className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                            formData.grade === g.id
                              ? 'bg-[#14281D] text-[#C8963E] border-[#14281D]'
                              : 'bg-white text-[#5C4D3F] border-[#D5C9B6] hover:bg-[#F2ECE1]'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Minimum Cup Score Target (Optional numeric target)
                    </label>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {['85+', '86+', '87+', '88+'].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => setFormData({ ...formData, minCupScore: score })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                            formData.minCupScore === score
                              ? 'bg-[#14281D] text-[#C8963E] border-[#14281D] font-bold'
                              : 'bg-white text-[#5C4D3F] border-[#D5C9B6]'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={formData.minCupScore || ''}
                      onChange={(e) => setFormData({ ...formData, minCupScore: e.target.value })}
                      placeholder="e.g. 86+ or custom target score"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                    />
                  </div>
                </div>

                <div className="bg-[#F2ECE1] p-3.5 rounded-xl border border-[#DECFBB] text-xs text-[#6B5A49]">
                  <strong className="text-[#14281D]">Quality Promise Rule:</strong> We do not automatically guarantee that a matching micro-lot exists for extreme cup scores without physical cupping validation. If no exact match is active, our team will review custom sourcing availability.
                </div>
              </div>
            )}

            {/* STEP 4: QUANTITY */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7A5B35] font-semibold">
                    Step 4 of 8 • Volume Requirements
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14281D] mt-1">
                    Estimated Quantity
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-1">
                    Export capacity: <strong>Up to 100 containers</strong>. (Capacity specification, not current stock).
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {['Containers', 'Bags', 'Custom'].map((qType) => (
                      <button
                        key={qType}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            quantityType: qType as any,
                            quantityValue:
                              qType === 'Containers'
                                ? '1 Container'
                                : qType === 'Bags'
                                ? '50 Bags'
                                : ''
                          })
                        }
                        className={`p-3.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                          formData.quantityType === qType
                            ? 'bg-[#14281D] text-[#C8963E] border-[#14281D]'
                            : 'bg-white text-[#5C4D3F] border-[#D5C9B6] hover:bg-[#F2ECE1]'
                        }`}
                      >
                        {qType}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Quantity Specification (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.quantityValue || ''}
                      onChange={(e) => setFormData({ ...formData, quantityValue: e.target.value })}
                      placeholder="e.g. 1 Container (or sample request, 100 bags, etc.)"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                    />
                  </div>
                </div>

                <div className="bg-[#FAF5EE] p-3.5 rounded-xl border border-[#E0D4C0] text-xs text-[#5C4D3F]">
                  <strong>Inventory Transparency:</strong> We do not display fabricated warehouse stock numbers. All container allocations are confirmed directly by Mesfin Girma Gemeda export operations upon review.
                </div>
              </div>
            )}

            {/* STEP 5: DESTINATION */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7A5B35] font-semibold">
                    Step 5 of 8 • Shipping Destination
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14281D] mt-1">
                    Port & Destination Details
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-1">
                    Tell us where your container or coffee shipment will be discharged.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Destination Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.destinationCountry}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          destinationCountry: e.target.value,
                          country: formData.country || e.target.value
                        })
                      }
                      placeholder="e.g. Germany, Japan, United States, UAE"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Destination Port (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.destinationPort || ''}
                      onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                      placeholder="e.g. Port of Hamburg, Yokohama, Long Beach, Jebel Ali"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Incoterms / Commercial Terms (Optional, left editable)
                    </label>
                    <input
                      type="text"
                      value={formData.incoterm || ''}
                      onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                      placeholder="e.g. FOB Djibouti, CIF, or discuss with exporter"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Additional Shipping Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.destinationNotes || ''}
                      onChange={(e) => setFormData({ ...formData, destinationNotes: e.target.value })}
                      placeholder="Any specific delivery timeframe, sample courier instructions, or port handling requests..."
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: BUYER INFORMATION */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7A5B35] font-semibold">
                    Step 6 of 8 • Buyer Profile
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14281D] mt-1">
                    Contact & Roastery Information
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-1">
                    No account required. We will use this to prepare your quote and generate your reference number.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Company / Roastery Name *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-[#8C7A68] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Hanseatic Roasters Ltd"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Buyer / Contact Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8C7A68] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.buyerName}
                        onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                        placeholder="e.g. Marcus Thorne"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8C7A68] absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="buyer@company.com"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      WhatsApp / Phone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#8C7A68] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.phoneWhatsApp}
                        onChange={(e) => setFormData({ ...formData, phoneWhatsApp: e.target.value })}
                        placeholder="+49 170 1234567"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14281D] mb-1">
                    Additional Requirements or Cupping Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.additionalNotes || ''}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Specify target taste attributes, sample quantities, or certificate requirements..."
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                  />
                </div>
              </div>
            )}

            {/* STEP 7: REVIEW */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7A5B35] font-semibold">
                    Step 7 of 8 • Review & Match
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14281D] mt-1">
                    Review Your Requirements
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-1">
                    Confirm your criteria below. You can find immediate matching coffees or submit your request for direct exporter review.
                  </p>
                </div>

                {/* Summary Card with Edit Buttons */}
                <div className="border border-[#E2D6C2] rounded-2xl overflow-hidden divide-y divide-[#E2D6C2] text-xs">
                  {/* Origin */}
                  <div className="p-4 bg-white flex items-center justify-between">
                    <div>
                      <span className="text-[#8C7A68] block">Origin Selection:</span>
                      <strong className="text-sm text-[#14281D]">
                        {formData.origin === 'Other Ethiopia'
                          ? `Other Ethiopia (${formData.otherOriginText || 'Not specified'})`
                          : formData.origin}
                      </strong>
                    </div>
                    <button
                      onClick={() => handleGoToStep(1)}
                      className="text-[#C8963E] hover:underline font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Processing */}
                  <div className="p-4 bg-[#FAF5EE] flex items-center justify-between">
                    <div>
                      <span className="text-[#8C7A68] block">Processing Method:</span>
                      <strong className="text-sm text-[#14281D]">{formData.processing}</strong>
                    </div>
                    <button
                      onClick={() => handleGoToStep(2)}
                      className="text-[#C8963E] hover:underline font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Quality */}
                  <div className="p-4 bg-white flex items-center justify-between">
                    <div>
                      <span className="text-[#8C7A68] block">Quality Baseline:</span>
                      <strong className="text-sm text-[#14281D]">
                        {formData.grade} • Target Score: {formData.minCupScore || 'Any'}
                      </strong>
                    </div>
                    <button
                      onClick={() => handleGoToStep(3)}
                      className="text-[#C8963E] hover:underline font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Quantity */}
                  <div className="p-4 bg-[#FAF5EE] flex items-center justify-between">
                    <div>
                      <span className="text-[#8C7A68] block">Requested Volume:</span>
                      <strong className="text-sm text-[#14281D]">
                        {formData.quantityValue || formData.quantityType}
                      </strong>
                    </div>
                    <button
                      onClick={() => handleGoToStep(4)}
                      className="text-[#C8963E] hover:underline font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Destination */}
                  <div className="p-4 bg-white flex items-center justify-between">
                    <div>
                      <span className="text-[#8C7A68] block">Destination:</span>
                      <strong className="text-sm text-[#14281D]">
                        {formData.destinationCountry}
                        {formData.destinationPort ? ` (Port: ${formData.destinationPort})` : ''}
                      </strong>
                      {formData.incoterm && (
                        <span className="block text-[11px] text-[#5C4D3F]">
                          Commercial term: {formData.incoterm}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleGoToStep(5)}
                      className="text-[#C8963E] hover:underline font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Buyer Contact */}
                  <div className="p-4 bg-[#FAF5EE] flex items-center justify-between">
                    <div>
                      <span className="text-[#8C7A68] block">Buyer Details:</span>
                      <strong className="text-sm text-[#14281D]">
                        {formData.buyerName} • {formData.companyName}
                      </strong>
                      <span className="block text-[11px] text-[#5C4D3F]">
                        {formData.email} • {formData.phoneWhatsApp}
                      </span>
                    </div>
                    <button
                      onClick={() => handleGoToStep(6)}
                      className="text-[#C8963E] hover:underline font-semibold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Match Engine CTA vs Direct Submit CTA */}
                <div className="p-5 rounded-2xl bg-[#14281D] text-[#FAF5EE] space-y-3">
                  <div className="flex items-center gap-2 text-[#C8963E] text-xs font-semibold uppercase tracking-wider">
                    <Search className="w-4 h-4" />
                    <span>Instant Catalog Match Engine</span>
                  </div>
                  <p className="text-xs text-[#C2B5A0] leading-relaxed">
                    Compare your criteria against our verified Grade 1 catalog before final submission, or submit immediately to generate an official <strong>MGG Reference Number</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigateToMatchResults(formData)}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-bold text-xs transition-all text-center cursor-pointer shadow-md"
                    >
                      Find My Coffee Matches →
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmitRequest}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#1E3F2D] hover:bg-[#2A523C] text-[#FAF5EE] font-bold text-xs border border-[#3E6B52] transition-all text-center cursor-pointer"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Coffee Request'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: CONFIRMATION & REFERENCE */}
            {currentStep === 8 && submittedRequest && (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#EBF6EE] text-[#1D5E34] border border-[#BCE1C7] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-[#7A5B35] font-semibold">
                    Submission Confirmed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14281D] mt-1">
                    Your Coffee Request Has Been Submitted
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-2 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{submittedRequest.formData.buyerName}</strong>. Your export inquiry has been logged in our system.
                  </p>
                </div>

                {/* Generated MGG-YYYY-XXXX Reference Number Card */}
                <div className="bg-[#FAF5EE] border-2 border-[#14281D]/30 rounded-2xl p-6 max-w-md mx-auto space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#7A5B35] font-semibold block">
                    Your Official Request Reference Number
                  </span>
                  <div className="text-3xl font-mono font-bold text-[#14281D] bg-white py-3 px-6 rounded-xl border border-[#D5C9B6] tracking-wider inline-block">
                    {submittedRequest.referenceNumber}
                  </div>
                  <div className="flex items-center justify-center gap-3 text-xs text-[#5C4D3F] pt-1">
                    <span>
                      Status: <strong className="text-[#1D5E34]">{submittedRequest.status}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Date:{' '}
                      {new Date(submittedRequest.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Requested Requirements Snapshot */}
                <div className="bg-white border border-[#E0D4C0] rounded-2xl p-5 text-left text-xs text-[#5C4D3F] space-y-2 max-w-md mx-auto">
                  <div className="font-semibold text-[#14281D] border-b border-[#EAE0D0] pb-1.5">
                    Requested Coffee Specifications
                  </div>
                  <div>
                    <strong>Origin:</strong> {submittedRequest.formData.origin} •{' '}
                    <strong>Processing:</strong> {submittedRequest.formData.processing}
                  </div>
                  <div>
                    <strong>Grade:</strong> {submittedRequest.formData.grade} •{' '}
                    <strong>Target Score:</strong> {submittedRequest.formData.minCupScore || 'Baseline 85+'}
                  </div>
                  <div>
                    <strong>Quantity:</strong> {submittedRequest.formData.quantityValue || 'Upon request'} •{' '}
                    <strong>Destination:</strong> {submittedRequest.formData.destinationCountry}
                  </div>
                </div>

                {/* Navigation CTAs */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <button
                    onClick={() => onNavigateToTracking(submittedRequest.referenceNumber)}
                    className="py-3 px-6 rounded-xl bg-[#14281D] hover:bg-[#1E3F2D] text-[#FAF5EE] text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Track Request Status</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <WhatsAppButton
                    message={`Hello Mesfin Girma, I have submitted an official coffee request with reference ${submittedRequest.referenceNumber} on your export platform.`}
                    label="Chat with Mesfin on WhatsApp"
                    size="md"
                  />
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons (Steps 1 to 6) */}
            {currentStep < 7 && (
              <div className="mt-8 pt-6 border-t border-[#EAE0D0] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-[#D5C9B6] hover:bg-[#F2ECE1] text-xs font-semibold text-[#5C4D3F] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onNavigateToCatalog}
                    className="text-xs text-[#7A5B35] hover:underline cursor-pointer"
                  >
                    Cancel to Catalog
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-[#14281D] hover:bg-[#1E3F2D] text-[#FAF5EE] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
