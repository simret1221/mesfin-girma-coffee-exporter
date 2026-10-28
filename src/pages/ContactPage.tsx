import React, { useState } from 'react';
import { COMPANY } from '../constants/company';
import { Button, WhatsAppButton } from '../components/common/Button';
import { createCoffeeRequest } from '../services/requestService';
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
  Phone,
  Mail,
  MessageCircle,
  Share2,
  Send,
  Building2,
  CheckCircle2,
  Clock,
  Globe,
  Coffee,
  Navigation,
  Compass,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    buyerName: '',
    companyName: '',
    email: '',
    phoneWhatsApp: '',
    country: '',
    targetOrigin: 'Yirgacheffe',
    processing: 'Washed',
    volumeEstimate: '1 Container',
    message: ''
  });

  const [activeMapId, setActiveMapId] = useState<string>('addisAbaba');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  const activeMapLocation: CompanyLocation =
    COMPANY_LOCATIONS_MAP[activeMapId] || COMPANY_LOCATIONS_MAP.addisAbaba;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.buyerName || !formData.email || !formData.companyName) {
      alert('Please provide your name, company name, and email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newReq = await createCoffeeRequest({
        origin: formData.targetOrigin,
        processing: (formData.processing as any) || 'Washed',
        grade: 'Grade 1',
        minCupScore: '85+',
        quantityType: 'Containers',
        quantityValue: formData.volumeEstimate,
        destinationCountry: formData.country,
        companyName: formData.companyName,
        buyerName: formData.buyerName,
        email: formData.email,
        phoneWhatsApp: formData.phoneWhatsApp,
        additionalNotes: formData.message,
        country: formData.country
      });

      setSubmittedReference(newReq.referenceNumber);
    } catch {
      alert('Failed to log request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-0">
      {/* Header Banner */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-16 sm:py-20 px-4 sm:px-8 border-b border-[#234230]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3627] text-xs text-[#E5DBC7] border border-[#2B4F39]">
            <MapPin className="w-3.5 h-3.5 text-[#C8963E]" />
            <span>Direct Commercial Liaison • Verified Headquarters & Capital Branch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF5EE]">
            Contact & Commercial Export Desk
          </h1>

          <p className="text-sm sm:text-base text-[#C2B5A0] max-w-2xl font-light leading-relaxed">
            Connect directly with Mesfin Girma and our export team. Request coffee offering sheets, proforma invoices, sample dispatches, or plan a visit to our facilities in Addis Ababa and West Hararghe.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Cards + Inquiry Form */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Channels & Verified Addresses */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#7A5B35] font-semibold block mb-1">
                  Official Communication Channels
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#14281D]">
                  Direct Exporter Contact
                </h2>
                <p className="text-xs sm:text-sm text-[#5C4D3F] mt-1 leading-relaxed">
                  Export inquiries are handled by company leadership. We provide fast responses via WhatsApp, phone, and official email.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-3">
                {/* Phone */}
                <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E0D4C0] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#14281D] text-[#C8963E] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-[#7A5B35] block font-semibold">Direct Phone / Call</span>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="text-sm sm:text-base font-bold text-[#14281D] hover:text-[#C8963E] transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                    <span className="text-xs text-[#8C7A68] block mt-0.5">
                      International: {COMPANY.phoneInternational}
                    </span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E0D4C0] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-[#7A5B35] block font-semibold">WhatsApp Export Desk</span>
                    <a
                      href={COMPANY.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-bold text-[#14281D] hover:text-[#1EBE5D] transition-colors"
                    >
                      {COMPANY.whatsappName} ({COMPANY.phoneInternational})
                    </a>
                    <span className="text-xs text-[#8C7A68] block mt-0.5">Instant messaging & sample requests</span>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E0D4C0] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#14281D] text-[#C8963E] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-[#7A5B35] block font-semibold">Official Export Email</span>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-sm font-bold text-[#14281D] hover:text-[#C8963E] transition-colors break-all"
                    >
                      {COMPANY.email}
                    </a>
                    <span className="text-xs text-[#8C7A68] block mt-0.5">Contracts & proforma invoices</span>
                  </div>
                </div>

                {/* TikTok Media */}
                <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E0D4C0] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#14281D] text-[#C8963E] flex items-center justify-center shrink-0">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#7A5B35] block font-semibold">TikTok Media</span>
                    <a
                      href={COMPANY.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#14281D] hover:text-[#C8963E] transition-colors"
                    >
                      @{COMPANY.tiktok}
                    </a>
                    <span className="text-xs text-[#8C7A68] block mt-0.5">Mesfin_Girma_Gemeda</span>
                  </div>
                </div>
              </div>

              {/* Physical Office Locations with Google Maps Navigation */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#14281D]">
                    Physical Facilities & Navigation
                  </h3>
                  <span className="text-xs text-[#7A5B35]">Google Maps</span>
                </div>

                {/* Office 1: Addis Ababa Branch */}
                <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#E0D4C0] space-y-3 text-xs shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-[#14281D]">
                      <MapPin className="w-4 h-4 text-[#C8963E]" />
                      <span className="text-sm font-serif">Addis Ababa Branch</span>
                    </div>
                    <span className="text-[10px] bg-[#14281D] text-[#C8963E] px-2 py-0.5 rounded font-mono uppercase font-bold">
                      Commercial Desk
                    </span>
                  </div>
                  <p className="text-[#5C4D3F]">
                    {COMPANY_LOCATIONS_MAP.addisAbaba.address}
                  </p>
                  <div className="pt-2 border-t border-[#EAE0D0] flex flex-wrap items-center gap-2">
                    <GoogleMapButtons
                      searchUrl={COMPANY_LOCATIONS_MAP.addisAbaba.mapsSearchUrl}
                      directionsUrl={COMPANY_LOCATIONS_MAP.addisAbaba.directionsUrl}
                      locationName="Addis Ababa Branch"
                      size="sm"
                      variant="forest"
                    />
                  </div>
                </div>

                {/* Office 2: Main Headquarters */}
                <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#E0D4C0] space-y-3 text-xs shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-[#14281D]">
                      <Building2 className="w-4 h-4 text-[#C8963E]" />
                      <span className="text-sm font-serif">Executive Headquarters</span>
                    </div>
                    <span className="text-[10px] bg-[#14281D] text-[#C8963E] px-2 py-0.5 rounded font-mono uppercase font-bold">
                      West Hararghe
                    </span>
                  </div>
                  <p className="text-[#5C4D3F]">
                    {COMPANY_LOCATIONS_MAP.westHarerge.address}
                  </p>
                  <div className="pt-2 border-t border-[#EAE0D0] flex flex-wrap items-center gap-2">
                    <GoogleMapButtons
                      searchUrl={COMPANY_LOCATIONS_MAP.westHarerge.mapsSearchUrl}
                      directionsUrl={COMPANY_LOCATIONS_MAP.westHarerge.directionsUrl}
                      locationName="West Hararghe Headquarters"
                      size="sm"
                      variant="forest"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Commercial Inquiry Form */}
            <div className="lg:col-span-7 bg-[#FAF5EE] border border-[#E0D4C0] rounded-3xl p-8 sm:p-10 shadow-sm">
              {submittedReference ? (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 bg-[#EBF6EE] text-[#1D5E34] rounded-full flex items-center justify-center mx-auto border border-[#BCE1C7]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#7A5B35] font-semibold">
                      Inquiry Successfully Registered
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#14281D] mt-1">
                      Reference: {submittedReference}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C4D3F] mt-2 max-w-md mx-auto">
                      Thank you, <strong>{formData.buyerName}</strong>. Your inquiry has been dispatched to Mesfin Girma and our export desk.
                    </p>
                  </div>

                  <div className="bg-white border border-[#E2D6C2] rounded-xl p-4 text-xs text-left text-[#5C4D3F] space-y-1 max-w-md mx-auto">
                    <div><strong>Company:</strong> {formData.companyName} ({formData.country})</div>
                    <div><strong>Origin:</strong> {formData.targetOrigin} • <strong>Process:</strong> {formData.processing}</div>
                    <div><strong>Estimated Volume:</strong> {formData.volumeEstimate}</div>
                  </div>

                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <WhatsAppButton
                      message={`Hello Mesfin Coffee export desk, following up on inquiry reference #${submittedReference}.`}
                      label="Follow up on WhatsApp"
                    />
                    <button
                      onClick={() => {
                        setSubmittedReference(null);
                        setFormData({
                          buyerName: '',
                          companyName: '',
                          email: '',
                          phoneWhatsApp: '',
                          country: '',
                          targetOrigin: 'Yirgacheffe',
                          processing: 'Washed',
                          volumeEstimate: '1 Container',
                          message: ''
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl border border-[#D5C9B6] text-xs font-semibold text-[#14281D] hover:bg-[#F2ECE1] cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#7A5B35] font-semibold block mb-1">
                      Official Export Inquiries
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-[#14281D]">
                      Direct Commercial Inquiry
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C4D3F] mt-1 leading-relaxed">
                      Please specify your company and coffee requirements. You will receive a unique tracking reference code immediately upon submission.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#14281D] mb-1">
                        Buyer / Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.buyerName}
                        onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#14281D] mb-1">
                        Company / Roastery Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nordic Specialty Roasters"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#14281D] mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="buyer@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#14281D] mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        placeholder="+1 555 123 4567"
                        value={formData.phoneWhatsApp}
                        onChange={(e) => setFormData({ ...formData, phoneWhatsApp: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#14281D] mb-1">
                        Destination Country
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Germany, Japan, USA"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#14281D] mb-1">
                        Target Origin
                      </label>
                      <select
                        value={formData.targetOrigin}
                        onChange={(e) => setFormData({ ...formData, targetOrigin: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      >
                        <option value="Yirgacheffe">Yirgacheffe</option>
                        <option value="Guji">Guji</option>
                        <option value="Sidama">Sidama</option>
                        <option value="Shakiso">Shakiso</option>
                        <option value="Arsi">Arsi</option>
                        <option value="Harar">Harar</option>
                        <option value="Any Ethiopian Origin">Any Ethiopian Origin</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#14281D] mb-1">
                        Processing Method
                      </label>
                      <select
                        value={formData.processing}
                        onChange={(e) => setFormData({ ...formData, processing: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                      >
                        <option value="Washed">Washed</option>
                        <option value="Sun-Dried / Natural">Sun-Dried / Natural</option>
                        <option value="Either Washed or Natural">Either Washed or Natural</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Volume Requirement
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1 Container, 2 Containers, Sample set"
                      value={formData.volumeEstimate}
                      onChange={(e) => setFormData({ ...formData, volumeEstimate: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#14281D] mb-1">
                      Detailed Message / Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify sample delivery address, target flavor profile, or delivery timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#14281D] hover:bg-[#1E3B2B] text-[#FAF5EE] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-[#C8963E]" />
                      <span>{isSubmitting ? 'Logging Inquiry...' : 'Submit Official Export Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* DEDICATED REAL GOOGLE MAPS INTERACTIVE EXPERIENCE */}
          <div className="bg-[#FAF5EE] border border-[#E0D4C0] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14281D] text-[#C8963E] text-xs font-mono font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Live Google Maps Navigation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#14281D]">
                Visit Our Ethiopian Export Facilities
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4D3F]">
                Select a facility below to view its live location on Google Maps, explore satellite imagery, and launch turn-by-turn navigation directly on your device.
              </p>
            </div>

            {/* Quick Location Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#EAE0D0] pb-4">
              {[
                { id: 'addisAbaba', label: 'Addis Ababa Branch (Jemo Michael)', role: 'Commercial & Export' },
                { id: 'westHarerge', label: 'Main Office (Mechara / Mecheta)', role: 'Executive Headquarters' },
                { id: 'shakiso', label: 'Shakiso Farm & Processing Hub', role: 'Company Farm' },
                { id: 'yirgacheffe', label: 'Yirgacheffe Washing Station', role: 'Company Farm' }
              ].map((item) => {
                const isSelected = activeMapId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveMapId(item.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#14281D] text-[#C8963E] shadow-md border border-[#14281D]'
                        : 'bg-white text-[#5C4D3F] border border-[#E0D4C0] hover:bg-[#F2ECE1] hover:text-[#14281D]'
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C8963E]' : 'text-[#8C7A68]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Interactive Map Frame */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <InteractiveGoogleMap
                  location={activeMapLocation}
                  heightClass="h-[360px] sm:h-[420px]"
                />
              </div>

              {/* Location Card & Navigation Launcher */}
              <div className="lg:col-span-4 bg-white border border-[#E0D4C0] rounded-2xl p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#14281D] text-[#C8963E] uppercase tracking-wider">
                    {activeMapLocation.category}
                  </span>
                  <span className="text-xs text-[#7A5B35] font-mono">
                    {activeMapLocation.cityTown}
                  </span>
                </div>

                <h4 className="text-xl font-serif font-bold text-[#14281D]">
                  {activeMapLocation.name}
                </h4>

                <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed">
                  {activeMapLocation.description}
                </p>

                <div className="p-3.5 bg-[#FAF5EE] rounded-xl border border-[#EAE0D0] text-xs space-y-1.5 text-[#5C4D3F]">
                  <div>
                    <strong className="text-[#14281D] block">Verified Address:</strong>
                    <span>{activeMapLocation.address}</span>
                  </div>
                  <div>
                    <strong className="text-[#14281D] block">Direct Line:</strong>
                    <span>{COMPANY.phone} ({COMPANY.phoneInternational})</span>
                  </div>
                  <div>
                    <strong className="text-[#14281D] block">Visiting Guidelines:</strong>
                    <span>International buyers and roasters are welcome for pre-scheduled cupping sessions and lot inspections.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <GoogleMapButtons
                    searchUrl={activeMapLocation.mapsSearchUrl}
                    directionsUrl={activeMapLocation.directionsUrl}
                    locationName={activeMapLocation.name}
                    variant="gold"
                    size="md"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
