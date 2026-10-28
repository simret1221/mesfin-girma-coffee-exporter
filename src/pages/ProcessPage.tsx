import React from 'react';
import { COMPANY } from '../constants/company';
import { WhatsAppButton } from '../components/common/Button';
import { IMAGE_PATHS, BACKEND_PROCESSING_STAGES } from '../constants/images';
import {
  Droplets,
  SunMedium,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Layers,
  ArrowRight,
  Filter,
  Sparkles,
  Coffee
} from 'lucide-react';

interface ProcessPageProps {
  onRequestClick: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onRequestClick }) => {
  const journeyStages = [
    {
      step: '01',
      stageName: 'Farm Stage',
      title: 'Farm Stage',
      summary: 'Highland Cultivation & Agroforestry',
      desc: 'High-elevation shade canopy cultivation across diverse microclimates in Shakiso, Yirgacheffe, Guji, and Sidama.',
      image: IMAGE_PATHS.processing.farmStage
    },
    {
      step: '02',
      stageName: 'Harvesting',
      title: 'Harvesting',
      summary: 'Selective Ripe Cherry Handpicking',
      desc: 'Selective handpicking of only fully ripe red cherries by experienced local farming community pickers.',
      image: IMAGE_PATHS.processing.harvesting
    },
    {
      step: '03',
      stageName: 'Transportation',
      title: 'Transportation',
      summary: 'Same-Day Cherry Transport to Station',
      desc: 'Rapid transit from farm plots to nearby collection points and washing stations to preserve cherry freshness.',
      image: IMAGE_PATHS.processing.transportation
    },
    {
      step: '04',
      stageName: 'Drying',
      title: 'Drying',
      summary: 'Raised African Beds & Aeration',
      desc: 'Controlled sun-drying on raised African mesh beds with regular turning to reach the optimal 10.5–11.5% moisture baseline.',
      image: IMAGE_PATHS.processing.drying
    },
    {
      step: '05',
      stageName: 'Filtering',
      title: 'Filtering',
      summary: 'Density Washing & Flotation Separation',
      desc: 'Highland spring water flotation channels separate lower-density floaters, followed by clean water washing.',
      image: IMAGE_PATHS.processing.filtering
    },
    {
      step: '06',
      stageName: 'Examination',
      title: 'Examination',
      summary: 'Q-Grading, Cupping & Physical Defect Inspection',
      desc: 'Rigorous sensory cupping to ensure cup score 85+ baseline and strict Grade 1 export physical examination.',
      image: IMAGE_PATHS.processing.examination
    },
    {
      step: '07',
      stageName: 'Final Preparation',
      title: 'Final Preparation',
      summary: 'Dry Milling, Optical Color Sorting & Bagging',
      desc: 'Dry parchment hulling, precision optical color sorting, and packaging in GrainPro liners with jute export bags.',
      image: IMAGE_PATHS.processing.finalPreparation
    },
    {
      step: '08',
      stageName: 'Exportation',
      title: 'Exportation',
      summary: 'Addis Ababa Staging & Global Container Dispatch',
      desc: 'Consolidation at Addis Ababa export branch (Jemo Michael), container sealing, and maritime port dispatch worldwide.',
      image: IMAGE_PATHS.processing.exportation
    }
  ];

  return (
    <div className="bg-[#FAF5EE] text-[#1E2421]">
      {/* Header Banner */}
      <section className="relative bg-[#14281D] text-[#FAF5EE] py-20 sm:py-32 px-4 sm:px-8 border-b border-[#234230] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGE_PATHS.processing.drying}
            alt="Ethiopian Coffee Drying - Mesfin Coffee"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14281D] via-[#14281D]/80 to-[#14281D]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#C8963E]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C8963E]">
              PROCESSING & LOGISTICS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#FAF5EE] leading-tight">
            Our Coffee Export Process
          </h1>
          <p className="text-base sm:text-xl text-[#C2B5A0] max-w-2xl font-light leading-relaxed">
            The end-to-end journey from Ethiopian highland harvests to international buyer container delivery.
          </p>
        </div>
      </section>

      {/* Main Process Timeline Steps */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="space-y-24 sm:space-y-36">
          {journeyStages.map((stage, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={stage.step}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Step Image */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#14281D] shadow-2xl group border border-[#14281D]/10">
                    <img
                      src={stage.image}
                      alt={`${stage.stageName} - Mesfin Coffee`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[#C8963E] text-xs font-mono font-bold">
                        STAGE {stage.step} / 08
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-5 right-5 text-[#FAF5EE]">
                      <span className="text-xs uppercase tracking-widest text-[#C8963E] block font-mono">
                        {stage.stageName}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold">
                        {stage.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-[#C8963E]">
                      {stage.step}
                    </span>
                    <div className="h-[2px] w-12 bg-[#C8963E]/40" />
                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#7A5B35] font-semibold">
                      {stage.stageName}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#14281D]">
                    {stage.title}
                  </h2>

                  <p className="text-sm sm:text-base font-medium text-[#7A5B35]">
                    {stage.summary}
                  </p>

                  <p className="text-sm sm:text-base text-[#5C4D3F] leading-relaxed font-light">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-20 px-4 sm:px-8 border-t border-[#234230]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold">
            Ready to secure current harvest lots?
          </h2>
          <p className="text-base sm:text-xl text-[#C2B5A0] font-light max-w-2xl mx-auto">
            Direct communication with our export desk. Proforma invoice, sample requests, and shipping schedules provided promptly.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={onRequestClick}
              className="px-8 py-4 rounded-full bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              Request Coffee Offerings
            </button>
            <WhatsAppButton
              message="Hello Mesfin Coffee export desk, I would like to inquire about current processing lots and export availability."
              label="Chat on WhatsApp"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
