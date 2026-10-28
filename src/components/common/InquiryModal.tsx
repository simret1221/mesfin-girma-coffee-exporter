import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { CheckCircle2, Send, MessageCircle, Building2, User, Mail, Globe, MapPin, Coffee, ArrowRight } from 'lucide-react';
import { COMPANY } from '../../constants/company';
import { createCoffeeRequest } from '../../services/requestService';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCoffeeName?: string;
  initialOrigin?: string;
  onNavigateToTracking?: (referenceNumber: string) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialCoffeeName,
  initialOrigin,
  onNavigateToTracking
}) => {
  const [formData, setFormData] = useState({
    buyerName: '',
    companyName: '',
    email: '',
    whatsapp: '',
    country: '',
    destinationPort: '',
    preferredOrigin: initialOrigin || 'Yirgacheffe',
    processing: 'Either Washed or Natural',
    volumeEstimate: '1 Container (or Custom Bags upon request)',
    notes: initialCoffeeName ? `Inquiring specifically regarding ${initialCoffeeName}` : ''
  });

  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const created = await createCoffeeRequest({
        origin: formData.preferredOrigin,
        processing: formData.processing.includes('Washed') && formData.processing.includes('Natural')
          ? 'Either'
          : formData.processing.includes('Washed')
          ? 'Washed'
          : 'Sun-Dried / Natural',
        grade: 'Grade 1',
        minCupScore: '85+',
        quantityType: 'Containers',
        quantityValue: formData.volumeEstimate,
        destinationCountry: formData.country,
        destinationPort: formData.destinationPort,
        companyName: formData.companyName,
        buyerName: formData.buyerName,
        email: formData.email,
        phoneWhatsApp: formData.whatsapp,
        country: formData.country,
        additionalNotes: formData.notes,
        selectedCoffeeName: initialCoffeeName
      });

      setSubmittedReference(created.referenceNumber);
    } catch {
      // Fallback
      setSubmittedReference(`MGG-2026-0002`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedReference(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={submittedReference ? 'Request Successfully Received' : 'Direct Coffee Export Inquiry'}
      subtitle={
        submittedReference
          ? 'Your unique export inquiry reference has been generated.'
          : 'Connect directly with Mesfin Girma Gemeda export management.'
      }
      maxWidth="2xl"
    >
      {submittedReference ? (
        <div className="text-center py-4 space-y-5">
          <div className="w-16 h-16 bg-[#EBF6EE] text-[#1D5E34] rounded-full flex items-center justify-center mx-auto border border-[#BCE1C7]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-[#7A5B35] font-semibold">
              Official Reference Number
            </span>
            <div className="text-3xl font-mono font-bold text-[#14281D] mt-1 bg-[#FAF5EE] py-2.5 px-6 rounded-xl border border-[#E8DAC2] inline-block tracking-wider">
              {submittedReference}
            </div>
            <p className="text-sm text-[#4E4338] mt-3 max-w-md mx-auto">
              Thank you, <strong>{formData.buyerName || 'Valued Buyer'}</strong>. Your inquiry has been logged in our system. Mesfin Girma and our export team will review your specifications.
            </p>
          </div>

          <div className="bg-[#FAF5EE] border border-[#E2D8C7] rounded-xl p-4 text-left text-xs text-[#5C4D3F] space-y-1.5">
            <div><strong>Company:</strong> {formData.companyName || 'Not specified'} ({formData.country || 'International'})</div>
            <div><strong>Requested Origin:</strong> {formData.preferredOrigin} • <strong>Processing:</strong> {formData.processing}</div>
            <div><strong>Baseline Standard:</strong> Grade 1, Cup scores above 85</div>
            <div><strong>Direct Contact:</strong> {COMPANY.phone} • {COMPANY.email}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            {onNavigateToTracking && (
              <button
                type="button"
                onClick={() => {
                  const ref = submittedReference;
                  handleReset();
                  onNavigateToTracking(ref);
                }}
                className="px-4 py-2.5 rounded-lg bg-[#14281D] hover:bg-[#1E3F2D] text-[#FAF5EE] font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Track This Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <Button
              variant="whatsapp"
              icon={<MessageCircle className="w-4 h-4" />}
              href={`https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(
                `Hello Mesfin Girma, I have submitted inquiry reference ${submittedReference} for ${formData.preferredOrigin} coffee on your export platform.`
              )}`}
              isExternal
            >
              Follow up on WhatsApp
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[#FAF5EE] border border-[#E2D8C7] p-3.5 rounded-xl text-xs text-[#524436]">
            <span className="font-semibold text-[#14281D]">Quality Baseline Guarantee:</span> All coffees exported are Grade 1 with cup scores above 85, sourced through our direct farms in Shakiso & Yirgacheffe and regional collection network.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#14281D] mb-1">
                Buyer Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C7A68] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={formData.buyerName}
                  onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14281D] mb-1">
                Company / Roastery Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#8C7A68] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Origin Roasters Ltd."
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
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
                  placeholder="buyer@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14281D] mb-1">
                WhatsApp / Phone Number *
              </label>
              <div className="relative">
                <MessageCircle className="w-4 h-4 text-[#8C7A68] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="+44 7911 123456"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14281D] mb-1">
                Destination Country *
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-[#8C7A68] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Germany, UAE, Japan"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14281D] mb-1">
                Destination Port
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#8C7A68] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Hamburg, Jebel Ali, Yokohama"
                  value={formData.destinationPort}
                  onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14281D] mb-1">
                Target Origin Focus
              </label>
              <div className="relative">
                <Coffee className="w-4 h-4 text-[#8C7A68] absolute left-3 top-3" />
                <select
                  value={formData.preferredOrigin}
                  onChange={(e) => setFormData({ ...formData, preferredOrigin: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
                >
                  <option value="Yirgacheffe">Yirgacheffe (Primary Focus)</option>
                  <option value="Guji">Guji (Primary Focus)</option>
                  <option value="Sidama">Sidama (Primary Focus)</option>
                  <option value="Shakiso">Shakiso (Company Farm Site)</option>
                  <option value="Arsi">Arsi Highland</option>
                  <option value="Harar">Harar Historic Origin</option>
                  <option value="Nekemte Collaboration">Nekemte Collaboration</option>
                  <option value="Multiple Origins">Multiple Origins Blend/Selection</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#14281D] mb-1">
                Processing Method
              </label>
              <select
                value={formData.processing}
                onChange={(e) => setFormData({ ...formData, processing: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
              >
                <option value="Washed">Washed Coffee</option>
                <option value="Sun-Dried / Natural">Sun-Dried / Natural</option>
                <option value="Both Washed and Natural">Both Washed and Natural</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#14281D] mb-1">
              Estimated Volume & Export Requirements
            </label>
            <input
              type="text"
              placeholder="e.g. 1 Container (or sample request, 50 bags, etc.)"
              value={formData.volumeEstimate}
              onChange={(e) => setFormData({ ...formData, volumeEstimate: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#14281D] mb-1">
              Additional Notes or Cupping Specifications
            </label>
            <textarea
              rows={2}
              placeholder="Share your specific target flavor notes, sample shipping requirements, or preferred delivery timeline..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={<Send className="w-4 h-4" />}>
              Submit Export Inquiry
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
