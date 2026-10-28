import React from 'react';
import { COMPANY } from '../constants/company';
import { ETHIOPIAN_ORIGINS } from '../constants/origins';
import { COMPANY_LOCATIONS_MAP } from '../constants/locations';
import { getAllCoffees } from '../services/catalogService';
import { CinematicHero } from '../components/home/CinematicHero';
import { IMAGE_PATHS, BACKEND_PROCESSING_STAGES } from '../constants/images';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Mountain,
  Droplets,
  SunMedium,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Globe,
  Award,
  ExternalLink
} from 'lucide-react';
import { WhatsAppButton } from '../components/common/Button';


interface HomePageProps {
  setActivePage: (page: string) => void;
  onRequestClick: () => void;
  onViewCoffeeDetails?: (coffeeId: string) => void;
  onRequestCoffee?: (coffeeName: string, origin: string) => void;
  onSelectOrigin?: (originName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActivePage,
  onRequestClick,
  onViewCoffeeDetails,
  onRequestCoffee,
  onSelectOrigin,
}) => {
  const primaryOrigins = ETHIOPIAN_ORIGINS.filter(
    (o) => o.isPrimaryFocus
  );

  const allCoffees = getAllCoffees();
  const showcaseCoffees = allCoffees.slice(0, 4);

  const processStages = BACKEND_PROCESSING_STAGES;

  // Keep the rest of your existing HomePage component here.


  return (
    <div className="bg-[#FAF5EE] text-[#1E2421] selection:bg-[#C8963E]/30 selection:text-[#14281D]">
      {/* =========================================================================
          1. CINEMATIC HERO (Full First Viewport - Luxury Editorial Agency Style)
          ========================================================================= */}
      <CinematicHero
        onDiscoverCoffee={() => {
          setActivePage('coffee');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBuildRequirements={onRequestClick}
      />

      {/* =========================================================================
          2. CHAPTER 01 — THE ORIGIN (Storytelling Chapter)
          ========================================================================= */}
      <section className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-7">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7A68]">
                01 — THE ORIGIN
              </span>
              <span className="w-12 h-[1px] bg-[#C8963E]/40" />
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14281D] leading-[1.08]">
              Ethiopia, where coffee begins.
            </h2>

            <p className="text-base sm:text-lg text-[#5C4D3F] font-light leading-relaxed">
              Every lot exported by <strong>MESFIN GIRMA GEMEDA COFFEE</strong> originates from the native birthplace of Coffea Arabica. In mineral-rich volcanic highlands beneath ancient forest shade, wild heirloom varietals develop the distinctive floral, bergamot, and ripe berry notes revered by the global specialty coffee community.
            </p>

            <p className="text-sm text-[#7A6B5C] font-light leading-relaxed">
              With our company farm sites in <strong>Shakiso</strong> and <strong>Yirgacheffe</strong>, combined with deep regional collection partnerships across Guji, Sidama, Arsi, and Harar, we maintain unbroken traceability from soil to port.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  setActivePage('origins');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#14281D] hover:text-[#C8963E] border-b-2 border-[#14281D] hover:border-[#C8963E] pb-1 transition-all cursor-pointer group"
              >
                <span>Explore Ethiopian Growing Regions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Real Company Origin / Farm Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#14281D] shadow-2xl group">
              <img
                src={IMAGE_PATHS.farms[1]}
                alt="Yirgacheffe Coffee Station - Mesfin Coffee"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-xs text-[#FAF5EE] flex justify-between items-end">
                <div>
                  <span className="block font-serif text-lg font-bold text-[#EADFCB]">Yirgacheffe Washing Station</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[#C2B59B] text-xs">Direct Company Farm Operations · Southern Ethiopia</span>
                    <span className="text-white/30">•</span>
                    <a
                      href={COMPANY_LOCATIONS_MAP.yirgacheffe.mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8963E] hover:underline text-[11px] font-medium inline-flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Google Maps</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  </div>
                </div>
                <span className="text-[11px] font-mono tracking-wider text-[#C8963E] uppercase font-bold">
                  VERIFIED ORIGIN
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. LARGE EDITORIAL STATISTICS STRIP (Agency Style)
          ========================================================================= */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-20 sm:py-24 px-4 sm:px-8 border-y border-[#264433]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <div className="space-y-2 border-l-2 border-[#C8963E] pl-5">
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#C8963E] leading-none">
                85+
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-[#FAF5EE]">
                Cup Score Baseline
              </div>
              <div className="text-xs text-[#A8987E]">Rigorous sensory cupping standard</div>
            </div>

            <div className="space-y-2 border-l-2 border-white/20 pl-5">
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#FAF5EE] leading-none">
                GRADE 1
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-[#C8963E]">
                Specialty Quality
              </div>
              <div className="text-xs text-[#A8987E]">Strict baseline for export lots</div>
            </div>

            <div className="space-y-2 border-l-2 border-[#C8963E] pl-5">
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#C8963E] leading-none">
                100
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-[#FAF5EE]">
                Containers Capacity*
              </div>
              <div className="text-xs text-[#A8987E]">Full container volume handling</div>
            </div>

            <div className="space-y-2 border-l-2 border-white/20 pl-5">
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#FAF5EE] leading-none">
                6
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-[#C8963E]">
                Ethiopian Origins
              </div>
              <div className="text-xs text-[#A8987E]">Primary hubs & direct farm sites</div>
            </div>
          </div>

          <div className="text-xs text-[#8A7459] pt-4 border-t border-[#234230] text-center sm:text-left">
            *Up to 100 containers refers to verified company export capacity, not current standing warehouse inventory.
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CHAPTER 02 — THE ORIGINS (Visual Cards with Real Origin Images)
          ========================================================================= */}
      <section className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7A68]">
                02 — THE ORIGINS
              </span>
              <span className="w-12 h-[1px] bg-[#C8963E]/40" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14281D]">
              Explore the regions behind our coffee.
            </h2>
          </div>

          <button
            onClick={() => {
              setActivePage('origins');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#14281D] hover:text-[#C8963E] transition-colors cursor-pointer shrink-0"
          >
            <span>Open Origin Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Prominent Origin Cards with Real Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {primaryOrigins.map((origin) => (
            <div
              key={origin.id}
              onClick={() => {
                setActivePage('origins');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#E5DAC8] shadow-sm hover:shadow-2xl hover:border-[#14281D]/30 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-80 w-full overflow-hidden bg-[#14281D]">
                  <img
                    src={origin.image}
                    alt={origin.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#FAF5EE] bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      Primary Specialty Focus
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 space-y-1">
                    <span className="text-xs text-[#C8963E] font-mono block uppercase tracking-widest">
                      {origin.region.split(',')[0]}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-[#FAF5EE]">
                      {origin.name}
                    </h3>
                  </div>
                </div>

                <div className="p-7 space-y-5">
                  <p className="text-sm text-[#5C4D3F] line-clamp-3 leading-relaxed font-light">
                    {origin.description}
                  </p>

                  <div className="pt-3 border-t border-[#F2ECE1] space-y-2 text-xs text-[#6B5740]">
                    <div className="flex justify-between">
                      <span className="text-[#8C7A68]">Typical Altitude:</span>
                      <strong className="text-[#14281D]">{origin.typicalAltitude}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7A68]">Processing:</span>
                      <span className="text-[#14281D]">{origin.availableProcessing.join(' · ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7A68]">Sensory Profile:</span>
                      <span className="text-[#14281D] truncate max-w-[170px]" title={origin.typicalCharacteristics}>
                        {origin.typicalCharacteristics}
                      </span>
                    </div>
                  </div>

                  {/* Clean unboxed disclaimer metadata */}
                  <div className="pt-2 text-[11px] text-[#8C7A68] italic border-t border-[#F5EFE6]">
                    *Typical regional characteristics; lot sheets confirmed per harvest.
                  </div>
                </div>
              </div>

              <div className="p-7 pt-0">
                <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#14281D] group-hover:text-[#C8963E] transition-colors">
                  <span>Explore {origin.name} Terroir</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Sourcing Callout */}
        <div className="p-8 rounded-3xl bg-[#F4EFE6] border border-[#E0D4C0] flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs">
          <div className="space-y-1">
            <span className="font-serif font-bold text-base text-[#14281D] block">
              Additional Sourcing & Processing Networks
            </span>
            <p className="text-[#6B5740] leading-relaxed max-w-3xl">
              In addition to Yirgacheffe, Guji, and Sidama, we process coffees from <strong>Shakiso</strong> (our direct farm site), <strong>Arsi</strong>, <strong>Harar</strong>, and <strong>Nekemte</strong> through direct origin infrastructure.
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('coffee');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full bg-[#14281D] text-[#FAF5EE] font-semibold uppercase tracking-wider text-xs shrink-0 hover:bg-[#1E3F2D] transition-colors cursor-pointer"
          >
            Browse Sourcing
          </button>
        </div>
      </section>

      {/* =========================================================================
          5. FULL-WIDTH VISUAL BREAK (Real Drying Beds Imagery)
          ========================================================================= */}
      <section className="relative py-32 sm:py-48 bg-[#0A140F] text-[#FAF5EE] overflow-hidden px-4 sm:px-8">
        <div className="absolute inset-0">
          <img
            src={IMAGE_PATHS.processing.drying}
            alt="Ethiopian Coffee Drying Beds - Mesfin Coffee"
            className="w-full h-full object-cover opacity-35 scale-100 transition-transform duration-1000"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A140F]/90 via-[#0A140F]/50 to-[#0A140F]/90" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#0A140F]/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] font-semibold text-[#C8963E]">
            THE STORY OF THE BEAN
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-[#FAF5EE]">
            "Every origin tells a different story."
          </h2>

          <p className="text-base sm:text-xl text-[#C8BCAB] max-w-2xl mx-auto font-light leading-relaxed">
            From tea-like floral Yirgacheffes to winey berry-laden Guji and Harar naturals, discover lots prepared to the highest international quality baseline.
          </p>

          <div className="pt-4">
            <button
              onClick={() => {
                setActivePage('coffee');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-bold text-xs uppercase tracking-widest shadow-2xl transition-all cursor-pointer"
            >
              <span>Explore Ethiopian Coffee</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CHAPTER 03 — THE COFFEE (Editorial Showcase with Real Lot Photos)
          ========================================================================= */}
      
<section className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-16">
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7A68]">
          03 — THE COFFEE
        </span>
        <span className="w-12 h-[1px] bg-[#C8963E]/40" />
      </div>

      <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14281D]">
        Discover our coffees.
      </h2>
    </div>

    <button
      type="button"
      onClick={() => {
        setActivePage('coffee');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#14281D] hover:text-[#C8963E] transition-colors cursor-pointer shrink-0"
    >
      <span>View Full Catalog</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>

  {/* Editorial Coffee Grid with Real Company Coffee Images */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
    
{showcaseCoffees.map((coffee) => {

  const viewCoffeeDetails = async () => {
    if (!onViewCoffeeDetails) {
      console.error('Coffee details navigation is not connected.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/coffees');
      const result = await response.json();

      if (
        !response.ok ||
        !result.success ||
        !Array.isArray(result.data)
      ) {
        throw new Error('Failed to load coffee records from the API.');
      }

      const apiCoffee = result.data.find(
        (item: { origin?: { name?: string } }) =>
          item.origin?.name?.toLowerCase() ===
          coffee.origin.toLowerCase()
      );

      if (!apiCoffee) {
        console.error(
          'No matching database coffee found for:',
          coffee.origin
        );
        return;
      }

      onViewCoffeeDetails(String(apiCoffee.id));
    } catch (error) {
      console.error('Could not open coffee details:', error);
    }
  };

  return (
    <div
      key={coffee.id}
      className="bg-white rounded-3xl border border-[#E5DAC8] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#14281D]/30 transition-all duration-500 flex flex-col justify-between group"
    >
      <div>
        <div
          onClick={viewCoffeeDetails}
          className="relative h-64 w-full overflow-hidden bg-[#14281D] cursor-pointer"
        >
          <img
            src={coffee.image}
            alt={coffee.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Coffee Grade */}
          <div className="absolute top-3.5 left-3.5 pointer-events-none">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#FAF5EE] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
              {coffee.grade}
            </span>
          </div>

          {/* Cup Score */}
          <div className="absolute top-3.5 right-3.5 pointer-events-none">
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#14281D] bg-[#C8963E] px-2.5 py-1 rounded-md">
              85+ Cup
            </span>
          </div>

          {/* Origin and Processing Method */}
          <div className="absolute bottom-3.5 left-4 right-4 text-xs text-[#FAF5EE] pointer-events-none">
            <span className="text-[#C8963E] font-medium block">
              {coffee.origin}
            </span>
            <span className="text-white/80">
              {coffee.processingMethod}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3
            onClick={viewCoffeeDetails}
            className="font-serif text-xl font-bold text-[#14281D] leading-snug group-hover:text-[#C8963E] transition-colors cursor-pointer"
          >
            {coffee.name}
          </h3>

          <div className="text-xs text-[#6B5740] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#8C7A68]">Altitude:</span>
              <span className="font-medium text-[#14281D]">
                {coffee.altitude}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#8C7A68]">Typical Notes:</span>
              <span
                className="font-medium text-[#14281D] truncate max-w-[140px]"
                title={coffee.flavorProfile}
              >
                {coffee.flavorProfile}
              </span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[#8C7A68] italic border-t border-[#F5EFE6]">
            *Typical regional traits; harvest cupping confirmed on demand.
          </div>
        </div>
      </div>

      {/* Coffee Actions */}
      <div className="p-6 pt-0 border-t border-[#F2ECE1] mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={viewCoffeeDetails}
          className="flex-1 py-2.5 text-xs font-semibold rounded-xl bg-[#FAF5EE] hover:bg-[#ECE4D4] text-[#14281D] text-center transition-colors cursor-pointer"
        >
          View Details
        </button>

        <button
          type="button"
          onClick={() => {
            if (onRequestCoffee) {
              onRequestCoffee(coffee.name, coffee.origin);
            } else {
              onRequestClick();
            }
          }}
          className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] text-center transition-colors cursor-pointer"
        >
          Request Lot
        </button>
      </div>
    </div>
  );
})}

  </div>
</section>


      {/* =========================================================================
          7. CHAPTER 04 — THE PROCESS (Visual Sequence with Real Photos for Each Step)
          ========================================================================= */}
          
<section className="bg-[#14281D] text-[#FAF5EE] py-24 sm:py-36 px-4 sm:px-8 lg:px-12 border-y border-[#264433]">
  <div className="max-w-7xl mx-auto space-y-16">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8963E]">
            04 — THE PROCESS
          </span>
          <span className="w-12 h-[1px] bg-[#C8963E]/40" />
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF5EE]">
          From cherry to export.
        </h2>

        <p className="text-base sm:text-lg text-[#C2B59B] max-w-2xl font-light leading-relaxed">
          A careful 8-stage sequence of selective harvesting, precision washed and natural processing, raised-bed drying, and strict physical grading.
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          setActivePage('process');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#C8963E] hover:text-[#FAF5EE] transition-colors cursor-pointer shrink-0"
      >
        <span>Explore All 8 Stages</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>

    {/* 8-Stage Process Sequence */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {processStages.map((stage) => (
        <div
          key={stage.step}
          onClick={() => {
            setActivePage('process');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="rounded-3xl bg-[#0D1A13] border border-white/10 overflow-hidden space-y-4 flex flex-col justify-between group hover:border-[#C8963E]/50 transition-all duration-500 shadow-xl cursor-pointer"
        >
          <div>
            <div className="relative h-44 w-full overflow-hidden bg-[#0A140F]">
              <img
                src={stage.image}
                alt={stage.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A13] via-transparent to-black/30" />

              <div className="absolute top-3 left-3">
                <span className="font-mono text-xs font-bold text-[#14281D] bg-[#C8963E] px-2 py-0.5 rounded-md">
                  {stage.step}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#C8963E] font-semibold block">
                {stage.subtitle}
              </span>

              <h3 className="font-serif text-xl font-bold text-[#FAF5EE] group-hover:text-[#C8963E] transition-colors">
                {stage.title}
              </h3>

              <p className="text-xs text-[#A8987E] leading-relaxed pt-1 font-light">
                {stage.desc}
              </p>
            </div>
          </div>

          <div className="p-5 pt-0">
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-[#C8963E]">
              <span>Stage Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* =========================================================================
          8. CHAPTER 05 & 06 — QUALITY & EXPORT CAPABILITY (Editorial Split)
          ========================================================================= */}
      <section className="py-24 sm:py-36 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-7">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7A68]">
                05 — THE QUALITY
              </span>
              <span className="w-12 h-[1px] bg-[#C8963E]/40" />
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14281D] leading-[1.08]">
              Grade 1.
              <br />
              Cup scores above 85.
            </h2>

            <p className="text-base sm:text-lg text-[#5C4D3F] font-light leading-relaxed">
              We focus our production and export operations exclusively on baseline Grade 1 specialty coffees. Every lot is assessed for screen consistency, zero primary defects, and distinctive origin character.
            </p>

            <div className="space-y-3.5 pt-2 text-xs">
              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-[#E2D6C2] shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#C8963E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#14281D] block text-sm">Verified Baseline Parameters</strong>
                  <span className="text-[#6B5740] leading-relaxed">
                    Grade 1 baseline · Cup scores above 85 · Traceable to confirmed growing zones in Shakiso, Yirgacheffe, Guji, and Sidama.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-[#E2D6C2] shadow-xs">
                <Building2 className="w-5 h-5 text-[#14281D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#14281D] block text-sm">Export Infrastructure</strong>
                  <span className="text-[#6B5740] leading-relaxed block">
                    Main office in West Hararghe (Daro Lebo, Mechara/Mecheta) and central commercial branch in Addis Ababa (Jemo Michael).
                  </span>
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                    <a
                      href={COMPANY_LOCATIONS_MAP.addisAbaba.mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8963E] hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Addis Ababa on Maps</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                    <span className="text-[#C2B5A0]">•</span>
                    <a
                      href={COMPANY_LOCATIONS_MAP.westHarerge.mapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8963E] hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>West Hararghe on Maps</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter 06: The Export capability card with real facility image */}
          <div className="lg:col-span-6 bg-[#14281D] text-[#FAF5EE] rounded-3xl p-8 sm:p-12 space-y-7 border border-[#2A4434] shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C8963E]">
                06 — THE EXPORT
              </span>
              <span className="w-12 h-[1px] bg-[#C8963E]/40" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF5EE] leading-tight">
              From Ethiopia to the world.
            </h3>

            <p className="text-sm text-[#C2B59B] leading-relaxed font-light">
              With an export capability of <strong>up to 100 containers</strong>, MESFIN GIRMA GEMEDA COFFEE is equipped to manage containerized full-vessel allocations as well as bespoke micro-lot sample distributions for international importers and specialty roasters.
            </p>

            <div className="pt-2 border-t border-[#2A4434] grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#8A7459] block">Export Capacity:</span>
                <strong className="text-base font-serif text-[#FAF5EE] block">Up to 100 Containers*</strong>
              </div>
              <div>
                <span className="text-[#8A7459] block">Company Farm Sites:</span>
                <strong className="text-base font-serif text-[#FAF5EE] block">Shakiso & Yirgacheffe</strong>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onRequestClick}
                className="px-7 py-3.5 rounded-full bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Inquire Container Allocation
              </button>
              <WhatsAppButton label="WhatsApp Desk" size="sm" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CHAPTER 07 — THE BUYER JOURNEY & FINAL CTA (Agency Level Climax)
          ========================================================================= */}
      
<section className="bg-[#FAF5EE] py-24 sm:py-36 px-4 sm:px-8 border-t border-[#E8DFC8]">
  <div className="max-w-4xl mx-auto text-center space-y-8">
    <div className="flex items-center justify-center gap-3">
      <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C7A68]">
        07 — THE BUYER JOURNEY
      </span>
    </div>

    <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#14281D] leading-[1.05]">
      Tell us what you're looking for.
    </h2>

    <p className="text-base sm:text-xl text-[#5C4D3F] font-light max-w-2xl mx-auto leading-relaxed">
      Use our interactive requirements engine to specify origin, processing,
      grade, and container volume. Receive a match based on your requirements
      and a unique tracking reference when your request is submitted.
    </p>

    {/* Interactive Buyer Journey Steps */}
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 text-xs">
      <button
        type="button"
        onClick={() => {
          setActivePage('origins');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="p-4 bg-white hover:bg-[#FDFBF7] rounded-2xl border border-[#E2D6C2] hover:border-[#C8963E] shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[#C8963E] block font-bold text-sm">01</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C8963E] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <strong className="text-[#14281D] group-hover:text-[#C8963E] block mt-1 text-sm transition-colors">
          Explore
        </strong>
        <span className="text-[#8C7A68] text-[11px] block mt-0.5">
          Origins & Lots
        </span>
      </button>

      <button
        type="button"
        onClick={onRequestClick}
        className="p-4 bg-white hover:bg-[#FDFBF7] rounded-2xl border border-[#E2D6C2] hover:border-[#C8963E] shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[#C8963E] block font-bold text-sm">02</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C8963E] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <strong className="text-[#14281D] group-hover:text-[#C8963E] block mt-1 text-sm transition-colors">
          Specify
        </strong>
        <span className="text-[#8C7A68] text-[11px] block mt-0.5">
          Quality Needs
        </span>
      </button>

      <button
        type="button"
        onClick={() => {
          setActivePage('coffee-match');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="p-4 bg-white hover:bg-[#FDFBF7] rounded-2xl border border-[#E2D6C2] hover:border-[#C8963E] shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[#C8963E] block font-bold text-sm">03</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C8963E] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <strong className="text-[#14281D] group-hover:text-[#C8963E] block mt-1 text-sm transition-colors">
          Match
        </strong>
        <span className="text-[#8C7A68] text-[11px] block mt-0.5">
          Verified Lots
        </span>
      </button>

      <button
        type="button"
        onClick={onRequestClick}
        className="p-4 bg-white hover:bg-[#FDFBF7] rounded-2xl border border-[#E2D6C2] hover:border-[#C8963E] shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[#C8963E] block font-bold text-sm">04</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C8963E] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <strong className="text-[#14281D] group-hover:text-[#C8963E] block mt-1 text-sm transition-colors">
          Request
        </strong>
        <span className="text-[#8C7A68] text-[11px] block mt-0.5">
          Samples & Quote
        </span>
      </button>

      <button
        type="button"
        onClick={() => {
          setActivePage('track');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="p-4 bg-white hover:bg-[#FDFBF7] rounded-2xl border border-[#E2D6C2] hover:border-[#C8963E] shadow-xs hover:shadow-md transition-all text-left group cursor-pointer col-span-2 sm:col-span-1"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[#C8963E] block font-bold text-sm">05</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C8963E] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <strong className="text-[#14281D] group-hover:text-[#C8963E] block mt-1 text-sm transition-colors">
          Track
        </strong>
        <span className="text-[#8C7A68] text-[11px] block mt-0.5">
          MGG Reference
        </span>
      </button>
    </div>

    {/* Buyer Journey Actions */}
    <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
      <button
        type="button"
        onClick={onRequestClick}
        className="px-10 py-5 rounded-full bg-[#14281D] hover:bg-[#1E3F2D] text-[#FAF5EE] font-bold text-sm uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
      >
        <span>Build Your Coffee</span>
        <ArrowRight className="w-4 h-4 text-[#C8963E] stroke-[2.5]" />
      </button>

      <button
        type="button"
        onClick={() => {
          setActivePage('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="px-8 py-5 rounded-full bg-white hover:bg-[#F2ECE1] text-[#14281D] border border-[#D0C2AB] font-semibold text-sm uppercase tracking-wider transition-colors cursor-pointer"
      >
        Contact Export Desk
      </button>
    </div>
  </div>
</section>

    </div>
  );
};
