import React from 'react';
import { COMPANY } from '../constants/company';
import { WhatsAppButton } from '../components/common/Button';
import { IMAGE_PATHS } from '../constants/images';
import { ShieldCheck, Heart, Leaf, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface SustainabilityPageProps {
  onRequestClick: () => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ onRequestClick }) => {
  return (
    <div className="bg-[#FAF5EE] text-[#1E2421]">
      {/* Header Banner */}
      <section className="relative bg-[#14281D] text-[#FAF5EE] py-20 sm:py-32 px-4 sm:px-8 border-b border-[#234230] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGE_PATHS.farms[0]}
            alt="Ethiopian Forest Canopy - Mesfin Coffee"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14281D] via-[#14281D]/80 to-[#14281D]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#C8963E]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C8963E]">
              ORIGIN INTEGRITY & STEWARDSHIP
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#FAF5EE]">
            Sustainability & Traceability
          </h1>
          <p className="text-base sm:text-xl text-[#C2B5A0] max-w-2xl font-light leading-relaxed">
            Honest origin relationships, direct farm stewardship, and transparent sourcing rooted in Ethiopian coffee communities.
          </p>
        </div>
      </section>

      {/* Main Principles */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#8C7A68] font-semibold">
              TRANSPARENT STEWARDSHIP
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#14281D]">
              Rooted in Farming Communities
            </h2>

            <p className="text-base text-[#524436] leading-relaxed font-light">
              At <strong>MESFIN GIRMA GEMEDA COFFEE SUPPLIES AND EXPORTER</strong>, sustainability begins with genuine local relationships. Operating from our main office in <strong>West Hararghe (Daro Lebo, Mechara/Mecheta)</strong> and our direct farm operations in <strong>Shakiso and Yirgacheffe</strong>, we work closely alongside smallholder coffee-farming families.
            </p>

            <p className="text-base text-[#524436] leading-relaxed font-light">
              By maintaining direct communication and physical presence at the washing and drying stations, we ensure fair cherry procurement, prompt payments to local pickers and growers, and agricultural continuity across generations.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-[#E0D4C0] shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#1D5E34] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-[#14281D]">Direct Farm Ownership</h4>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-0.5">Our farms in Shakiso and Yirgacheffe enable direct agronomic oversight and full lot traceability.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-[#E0D4C0] shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#1D5E34] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-[#14281D]">Forest Canopy & Biodiversity Protection</h4>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-0.5">Ethiopian coffee thrives under natural shade trees like Cordia and Acacia, protecting soil health and bird habitats.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-[#E0D4C0] shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#1D5E34] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-[#14281D]">Water Stewardship in Washing</h4>
                  <p className="text-xs sm:text-sm text-[#5C4D3F] mt-0.5">Washing stations implement clean water settling pits and natural filtration to protect mountain stream ecosystems.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Policy Box */}
          <div className="lg:col-span-5 bg-[#14281D] text-[#FAF5EE] rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl border border-[#2A4434]">
            <div className="w-12 h-12 rounded-2xl bg-[#C8963E]/20 text-[#C8963E] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF5EE]">
              Our Honest Certification Policy
            </h3>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#C8BCAB] leading-relaxed space-y-2">
              <p>
                <strong className="text-[#FAF5EE]">Confirmed Status:</strong> Formal third-party international certifications are <em>not yet confirmed</em> for current offerings.
              </p>
              <p>
                We adhere to strict transparency: we do not invent or claim unverified certifications. All coffees exported are verified by their genuine physical Grade 1 baseline, sensory cup scores above 85, and origin traceability.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#A8987E] leading-relaxed font-light">
              Should your roastery require dedicated certification auditing (e.g. Organic, Rainforest Alliance, or Fairtrade), we welcome discussions for targeted lot certification programs.
            </p>

            <div className="pt-2">
              <button
                onClick={onRequestClick}
                className="w-full py-4 rounded-full bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] text-xs uppercase tracking-widest font-bold transition-all text-center cursor-pointer shadow-lg"
              >
                Discuss Custom Traceability Needs
              </button>
            </div>
          </div>
        </div>

        {/* Visual Farms Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="rounded-3xl overflow-hidden bg-white border border-[#E5DAC8] shadow-sm group">
            <div className="relative h-64 w-full overflow-hidden bg-[#14281D]">
              <img
                src={IMAGE_PATHS.farms[0]}
                alt="Shakiso Farm - Mesfin Coffee"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-xs font-mono text-[#C8963E] uppercase tracking-wider block">Shade-Canopy Cultivation</span>
                <h4 className="font-serif text-2xl font-bold text-[#FAF5EE]">Shakiso Highland Farm</h4>
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs sm:text-sm text-[#5C4D3F] font-light leading-relaxed">
                Ancient semi-forest coffee canopy in Guji highlands, nurtured with zero synthetic chemical inputs and hand-harvested by local community pickers.
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-white border border-[#E5DAC8] shadow-sm group">
            <div className="relative h-64 w-full overflow-hidden bg-[#14281D]">
              <img
                src={IMAGE_PATHS.farms[1]}
                alt="Yirgacheffe Washing Station - Mesfin Coffee"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-xs font-mono text-[#C8963E] uppercase tracking-wider block">Clean Highland Springs</span>
                <h4 className="font-serif text-2xl font-bold text-[#FAF5EE]">Yirgacheffe Washing Station</h4>
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs sm:text-sm text-[#5C4D3F] font-light leading-relaxed">
                Eco-pulpers with natural water recirculation channels, preserving mountain stream purity while highlighting floral acidity and tea-like sweetness.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
