import React from 'react';
import { COMPANY } from '../constants/company';
import { WhatsAppButton } from '../components/common/Button';
import { IMAGE_PATHS } from '../constants/images';
import { COMPANY_LOCATIONS_MAP } from '../constants/locations';
import { GoogleMapButtons } from '../components/common/GoogleMapComponents';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Globe
} from 'lucide-react';

interface AboutPageProps {
  setActivePage: (page: string) => void;
  onRequestClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActivePage, onRequestClick }) => {
  return (
    <div className="bg-[#FAF5EE] text-[#1E2421]">
      {/* Editorial Opening Hero */}
      <section className="relative py-24 sm:py-36 px-4 sm:px-8 bg-[#0D1A13] text-[#FAF5EE] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGE_PATHS.hero[0]}
            alt="Ethiopian Coffee Highland Origin - Mesfin Coffee"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A13] via-[#0D1A13]/70 to-[#0D1A13]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#C8963E]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C8963E]">
              COMPANY STORY & IDENTITY
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#FAF5EE] leading-[1.05]">
            Rooted in Ethiopia.
            <br />
            <span className="italic font-normal text-[#E2D5BE]">Connected to the world.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#C8BCAB] max-w-2xl font-light leading-relaxed">
            {COMPANY.name} bridges Ethiopia's highland coffee traditions with the demanding quality requirements of international specialty buyers and roasteries.
          </p>
        </div>
      </section>

      {/* Narrative Section 1: Heritage & Founder with Shakiso Farm Photo */}
      <section className="py-24 sm:py-36 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7A68]">
                FOUNDATION & LEADERSHIP
              </span>
              <span className="w-12 h-[1px] bg-[#C8963E]/40" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#14281D] leading-tight">
              An exporter dedicated to origin authenticity.
            </h2>

            <p className="text-sm sm:text-base text-[#5C4D3F] font-light leading-relaxed">
              Founded and directed by <strong>Mesfin Girma</strong>, our company is rooted in the highland terroirs of <strong>West Hararghe (Daro Lebo, Mechara/Mecheta)</strong>, an area with a centuries-old tradition of sun-dried natural coffee preparation.
            </p>

            <p className="text-sm sm:text-base text-[#5C4D3F] font-light leading-relaxed">
              To provide international roasters with direct farm provenance, we operate our own farm sites in <strong>Shakiso</strong> and <strong>Yirgacheffe</strong>, combined with dedicated sourcing networks across <strong>Guji, Sidama, Arsi, Harar</strong>, and collaboration in <strong>Nekemte</strong>.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onRequestClick}
                className="px-8 py-4 rounded-full bg-[#14281D] hover:bg-[#1E3F2D] text-[#FAF5EE] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Build Coffee Requirements</span>
                <ArrowRight className="w-4 h-4 text-[#C8963E]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#14281D] shadow-2xl group">
              <img
                src={IMAGE_PATHS.farms[0]}
                alt="Shakiso Company Farm - Mesfin Coffee"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-xs text-[#FAF5EE] flex justify-between items-end">
                <div>
                  <span className="font-serif text-base font-bold block text-[#EADFCB]">Direct Origin Governance</span>
                  <span className="text-[#C2B59B]">Shakiso & Yirgacheffe Production Sites</span>
                </div>
                <span className="text-[11px] font-mono text-[#C8963E] uppercase font-bold">FARM VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics Strip */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-20 px-4 sm:px-8 border-y border-[#264433]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="border-l-2 border-[#C8963E] pl-5 space-y-1">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#C8963E]">85+</div>
            <div className="text-xs uppercase tracking-wider text-[#FAF5EE] font-semibold">Cup Scores</div>
            <div className="text-[11px] text-[#A8987E]">Strict specialty baseline</div>
          </div>
          <div className="border-l-2 border-white/20 pl-5 space-y-1">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#FAF5EE]">GRADE 1</div>
            <div className="text-xs uppercase tracking-wider text-[#C8963E] font-semibold">Quality Standard</div>
            <div className="text-[11px] text-[#A8987E]">Export baseline grade</div>
          </div>
          <div className="border-l-2 border-[#C8963E] pl-5 space-y-1">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#C8963E]">100</div>
            <div className="text-xs uppercase tracking-wider text-[#FAF5EE] font-semibold">Containers</div>
            <div className="text-[11px] text-[#A8987E]">Export capacity*</div>
          </div>
          <div className="border-l-2 border-white/20 pl-5 space-y-1">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#FAF5EE]">2 Sites</div>
            <div className="text-xs uppercase tracking-wider text-[#C8963E] font-semibold">Company Farms</div>
            <div className="text-[11px] text-[#A8987E]">Shakiso & Yirgacheffe</div>
          </div>
        </div>
      </section>

      {/* Location Storytelling Section with Real Facility Photos */}
      <section className="py-24 sm:py-36 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7A68]">
              LOCATIONS & SOURCING INFRASTRUCTURE
            </span>
            <span className="w-12 h-[1px] bg-[#C8963E]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14281D]">
            Strategic presence from farm to port.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: West Hararghe */}
          <div className="rounded-3xl bg-white border border-[#E5DAC8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-[#14281D]">
                <img
                  src={IMAGE_PATHS.company[0]}
                  alt="West Hararghe Origin - Mesfin Coffee"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#C8963E]">Headquarters</span>
                  <h3 className="font-serif text-xl font-bold text-[#FAF5EE]">West Hararghe</h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed font-light">
                  Daro Lebo, Mechara/Mecheta, Ethiopia. The home origin and foundation of our agricultural operations, specialized in sun-dried processing.
                </p>
                <div className="pt-2">
                  <GoogleMapButtons
                    searchUrl={COMPANY_LOCATIONS_MAP.westHarerge.mapsSearchUrl}
                    directionsUrl={COMPANY_LOCATIONS_MAP.westHarerge.directionsUrl}
                    locationName="West Hararghe Main Office"
                    size="sm"
                    variant="outline"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 pt-0 text-xs font-mono text-[#8C7A68]">
              Origin Collection & Heritage
            </div>
          </div>

          {/* Card 2: Addis Ababa Branch */}
          <div className="rounded-3xl bg-white border border-[#E5DAC8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-[#14281D]">
                <img
                  src={IMAGE_PATHS.company[1]}
                  alt="Addis Ababa Export Branch - Mesfin Coffee"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#C8963E]">Commercial Hub</span>
                  <h3 className="font-serif text-xl font-bold text-[#FAF5EE]">Addis Ababa Branch</h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed font-light">
                  Jemo Michael, Addis Ababa. Our capital branch manages central cupping, export documentation, customs clearance, and container shipping execution.
                </p>
                <div className="pt-2">
                  <GoogleMapButtons
                    searchUrl={COMPANY_LOCATIONS_MAP.addisAbaba.mapsSearchUrl}
                    directionsUrl={COMPANY_LOCATIONS_MAP.addisAbaba.directionsUrl}
                    locationName="Addis Ababa Commercial Branch"
                    size="sm"
                    variant="outline"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 pt-0 text-xs font-mono text-[#8C7A68]">
              Central Quality & Logistics
            </div>
          </div>

          {/* Card 3: Farms & Sourcing */}
          <div className="rounded-3xl bg-white border border-[#E5DAC8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-[#14281D]">
                <img
                  src={IMAGE_PATHS.farms[1]}
                  alt="Yirgacheffe Station - Mesfin Coffee"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#C8963E]">Production Sites</span>
                  <h3 className="font-serif text-xl font-bold text-[#FAF5EE]">Shakiso & Yirgacheffe</h3>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed font-light">
                  Company farm sites in Shakiso and Yirgacheffe, with additional sourcing networks across Sidama, Guji, Arsi, Harar, and Nekemte.
                </p>
                <div className="pt-2">
                  <GoogleMapButtons
                    searchUrl={COMPANY_LOCATIONS_MAP.yirgacheffe.mapsSearchUrl}
                    directionsUrl={COMPANY_LOCATIONS_MAP.yirgacheffe.directionsUrl}
                    locationName="Yirgacheffe Station"
                    size="sm"
                    variant="outline"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 pt-0 text-xs font-mono text-[#8C7A68]">
              Highland Cultivation & Washing
            </div>
          </div>
        </div>
      </section>

      {/* Honest Policy on Certifications */}
      <section className="py-20 px-4 sm:px-8 bg-[#F4EFE6] border-t border-[#E5DAC8]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#8C7A68] font-semibold">
            HONEST POLICY ON FORMAL CERTIFICATIONS
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14281D]">
            Transparency as a core company principle.
          </h3>
          <p className="text-sm text-[#5C4D3F] max-w-2xl mx-auto leading-relaxed font-light">
            While our smallholder farming partners practice traditional organic and shade-grown cultivation methods, formal third-party international certifications are currently not yet confirmed. We never invent or claim unverified certifications.
          </p>
        </div>
      </section>
    </div>
  );
};
