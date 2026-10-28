import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGE_PATHS } from '../../constants/images';
import { ArrowDown } from "lucide-react";

interface CinematicHeroProps {
  onDiscoverCoffee: () => void;
  onBuildRequirements: () => void;
}

interface SlideItem {
  id: string;
  image: string;
  alt: string;
  originBadge: string;
  headlineLine1: string;
  headlineLine2: string;
  supportingText: string;
  kenBurnsClass: string;
  objectPosition: string;
}


const HERO_SLIDES: SlideItem[] = [
  {
    id: '01',
    image: IMAGE_PATHS.hero[0],
    alt: 'Highland Ethiopian coffee landscape - Mesfin Girma Gemeda Coffee Origin',
    originBadge: 'ETHIOPIAN SPECIALTY COFFEE ORIGINS • GUJI • YIRGACHEFFE • SIDAMA',
    headlineLine1: 'DIRECT FROM ETHIOPIA’S',
    headlineLine2: 'LEGENDARY COFFEE ORIGINS.',
    supportingText:
      'MESFIN GIRMA GEMEDA COFFEE SUPPLIES AND EXPORTER — Supplying Grade 1 coffee from Ethiopia to international buyers.',
    kenBurnsClass: 'ken-burns-1',
    objectPosition: 'center 40%'
  },
  {
    id: '02',
    image: IMAGE_PATHS.hero[1],
    alt: 'Selective harvesting and processing of Ethiopian coffee cherries',
    originBadge: 'HARVEST PRECISION • SELECTIVE PICKING • QUALITY ASSURANCE',
    headlineLine1: 'SELECTIVE PICKING.',
    headlineLine2: 'QUALITY IN EVERY LOT.',
    supportingText:
      'Careful harvesting and defect sorting help preserve coffee quality from harvest through processing.',
    kenBurnsClass: 'ken-burns-2',
    objectPosition: 'center 35%'
  },
  {
    id: '03',
    image: IMAGE_PATHS.hero[2],
    alt: 'Ethiopian coffee drying and processing',
    originBadge: 'ARTISAN DRYING • COFFEE PROCESSING',
    headlineLine1: 'CAREFUL DRYING.',
    headlineLine2: 'ETHIOPIAN COFFEE CRAFT.',
    supportingText:
      'Coffee processing and drying handled with care to support quality and consistency.',
    kenBurnsClass: 'ken-burns-3',
    objectPosition: 'center 45%'
  },
  {
    id: '04',
    image: IMAGE_PATHS.hero[3],
    alt: 'Ethiopian coffee export preparation and logistics',
    originBadge: 'EXPORT READINESS • GLOBAL COFFEE SUPPLY',
    headlineLine1: 'ETHIOPIAN COFFEE.',
    headlineLine2: 'READY FOR GLOBAL MARKETS.',
    supportingText:
      'Preparing Ethiopian coffee for international buyers, with an indicated annual export capacity of up to 100 containers.',
    kenBurnsClass: 'ken-burns-1',
    objectPosition: 'center 45%'
  }
];


const SLIDE_DURATION_MS = 5500;

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onDiscoverCoffee,
  onBuildRequirements
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all 3 hero images immediately on mount to prevent any visual delay
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  const changeSlide = useCallback((nextIndex: number) => {
    setIsTransitioning(true);
    // Smooth fast exit (200ms) followed by staggered entrance of new slide content
    setTimeout(() => {
      setCurrentSlideIndex(nextIndex);
      setProgressKey((prev) => prev + 1);
      setIsTransitioning(false);
    }, 200);
  }, []);

  const goToNextSlide = useCallback(() => {
    const nextIdx = (currentSlideIndex + 1) % HERO_SLIDES.length;
    changeSlide(nextIdx);
  }, [currentSlideIndex, changeSlide]);

  const goToPrevSlide = useCallback(() => {
    const prevIdx = (currentSlideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    changeSlide(prevIdx);
  }, [currentSlideIndex, changeSlide]);

  const goToSlide = (targetIndex: number) => {
    if (targetIndex === currentSlideIndex) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    changeSlide(targetIndex);
  };

  // Main automatic slideshow loop
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setTimeout(() => {
      goToNextSlide();
    }, SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlideIndex, isPaused, goToNextSlide]);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section
      aria-label="Ethiopian Specialty Coffee Direct Export"
      className="relative w-full h-screen h-[100dvh] min-h-[520px] flex flex-col justify-between bg-[#070D09] text-[#FAF5EE] overflow-hidden -mt-[68px] sm:-mt-[80px] pt-[68px] sm:pt-[80px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =========================================================================
          1. CINEMATIC BACKGROUND SLIDESHOW WITH KEN BURNS & SLOW CROSSFADE
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`w-full h-full object-cover select-none ${
                  isActive ? slide.kenBurnsClass : 'scale-105'
                }`}
                style={{ objectPosition: slide.objectPosition }}
              />
            </div>
          );
        })}

        {/* Multi-layered cinematic gradient overlays for pristine contrast and legibility */}
        {/* Top vignette for floating transparent navbar */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#070D09]/95 via-[#070D09]/50 to-transparent z-20 pointer-events-none" />

        {/* Left deep editorial text vignette */}
        <div className="absolute inset-y-0 left-0 w-full md:w-4/5 lg:w-3/5 bg-gradient-to-r from-[#070D09]/95 via-[#070D09]/75 md:via-[#070D09]/50 to-transparent z-20 pointer-events-none" />

        {/* Bottom marquee & indicator vignette */}
        <div className="absolute inset-x-0 bottom-0 h-40 sm:h-52 bg-gradient-to-t from-[#070D09] via-[#070D09]/85 to-transparent z-20 pointer-events-none" />

        {/* Subtle warm atmospheric film tint */}
        <div className="absolute inset-0 bg-[#0A140F]/30 mix-blend-multiply z-20 pointer-events-none" />
      </div>

      {/* =========================================================================
          2. MAIN EDITORIAL CONTENT: TYPOGRAPHY, SUPPORTING COPY & CTAS
          Always fully visible, centered, responsive, and prominent across all screen heights
          ========================================================================= */}
      <div className="relative z-30 flex-1 min-h-0 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-2 sm:py-4">
        <div className="max-w-4xl space-y-2 sm:space-y-3.5 lg:space-y-4 xl:space-y-5">
          {/* Eyebrow Origin Tag */}
          <div
            className={`flex items-center gap-2.5 sm:gap-3 transition-all duration-400 ease-out ${
              isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
            }`}
          >
            <span className="w-6 sm:w-10 h-[2px] bg-[#C8963E]" />
            <span className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-[#C8963E] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {currentSlide.originBadge}
            </span>
          </div>

          {/* Large Cinematic Editorial Headline */}
          <div
            className={`space-y-1 sm:space-y-1.5 transition-all duration-500 ease-out ${
              isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0 delay-75'
            }`}
          >
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] 2xl:text-[4.25rem] font-bold tracking-tight text-[#FAF5EE] leading-[1.04] sm:leading-[1.0] lg:leading-[0.98]">
              <span className="block drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                {currentSlide.headlineLine1}
              </span>
              <span className="block font-normal italic text-[#EAE0D0] drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                {currentSlide.headlineLine2}
              </span>
            </h1>
          </div>

          {/* Supporting Text / Slogan - HIGH CONTRAST & CRYSTAL CLEAR */}
          <div
            className={`pt-0.5 sm:pt-1 transition-all duration-500 ease-out ${
              isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0 delay-150'
            }`}
          >
            <p className="text-xs sm:text-base md:text-lg lg:text-xl text-[#F5EADB] max-w-2xl font-normal leading-snug sm:leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {currentSlide.supportingText}
            </p>
          </div>

          {/* Two Premium CTA Click Buttons - ALWAYS VISIBLE, HIGH CONTRAST & ACCESSIBLE */}
          <div
            className={`flex flex-wrap items-center gap-3 sm:gap-4 pt-1.5 sm:pt-2.5 transition-all duration-500 ease-out ${
              isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0 delay-225'
            }`}
          >
            {/* Primary Action Button: DISCOVER OUR COFFEE */}
            <button
              type="button"
              onClick={onDiscoverCoffee}
              className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#C8963E] hover:bg-[#DCA84E] text-[#070D09] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(200,150,62,0.4)] hover:shadow-[0_0_30px_rgba(200,150,62,0.7)] hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center gap-2 group z-40 border border-[#F0BE6C]"
            >
              <span>DISCOVER OUR COFFEE</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary Action Button: BUILD YOUR REQUIREMENTS */}
            <button
              type="button"
              onClick={onBuildRequirements}
              className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-black/60 hover:bg-[#14281D] text-[#FAF5EE] border-2 border-[#C8963E]/80 hover:border-[#C8963E] font-semibold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center gap-2 z-40 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            >
              <span>BUILD YOUR REQUIREMENTS</span>
              <ArrowUpRight className="w-4 h-4 text-[#C8963E]" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. BOTTOM MOVING HORIZONTAL MARQUEE SYSTEM (CONTINUOUS SEAMLESS LOOP)
          Visually prominent, high contrast, moving smoothly from right to left
          ========================================================================= */}
      <div className="relative z-30 w-full overflow-hidden border-y border-[#C8963E]/30 bg-[#070D09]/90 backdrop-blur-md py-2 sm:py-2.5 select-none shrink-0 shadow-lg">
        <div className="animate-hero-marquee flex items-center whitespace-nowrap">
          {/* Repeated segments to ensure seamless infinite looping */}
          {[0, 1, 2, 3].map((rep) => (
            <div
              key={rep}
              className="flex items-center gap-5 sm:gap-7 px-4 text-[#FAF5EE] text-[11px] sm:text-xs md:text-sm tracking-[0.26em] uppercase font-serif font-medium"
            >
              <span>ETHIOPIAN COFFEE</span>
              <span className="text-[#C8963E] text-sm leading-none">•</span>
              <span>GUJI</span>
              <span className="text-[#C8963E] text-sm leading-none">•</span>
              <span>YIRGACHEFFE</span>
              <span className="text-[#C8963E] text-sm leading-none">•</span>
              <span>SIDAMA</span>
              <span className="text-[#C8963E] text-sm leading-none">•</span>
              <span>GRADE 1</span>
              <span className="text-[#C8963E] text-sm leading-none">•</span>
              <span>WASHED</span>
              <span className="text-[#C8963E] text-sm leading-none">•</span>
              <span>NATURAL</span>
              <span className="text-[#C8963E] text-sm leading-none">•</span>
              <span>DIRECT EXPORT</span>
              <span className="text-[#C8963E] text-sm leading-none">•</span>
              <span>ETHIOPIA</span>
              <span className="text-[#C8963E] text-sm leading-none">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          4. BOTTOM BAR: SLIDE INDICATOR CLICK BUTTONS, PROGRESS & CONTROLS
          Always visible, pinned at bottom, crystal clear navigation
          ========================================================================= */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 py-2 sm:py-2.5 flex flex-row items-center justify-between text-xs text-[#FAF5EE] shrink-0 bg-[#070D09]/80 backdrop-blur-md border-t border-white/5">
        {/* Left Side: Quality Export Staging Spec */}
        <div className="hidden md:flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#C8963E] animate-pulse" />
          <span className="font-bold text-[#FAF5EE] uppercase tracking-wider text-[11px]">
            DIRECT EXPORT BASELINE:
          </span>
          <span className="text-[#D8CCA9] text-[11px]">
            Grade 1 · Cup Scores 85+ · Full Container Logistics
          </span>
        </div>

        {/* Center / Right: Slide Indicator & Progress Line */}
        <div className="flex items-center gap-3 sm:gap-5 ml-auto">
          {/* Interactive Slide Click Buttons (01 / 02 / 03) */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-black/60 p-1 rounded-lg border border-white/20 shadow-md">
            {HERO_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer rounded ${
                    isSelected
                      ? 'text-[#070D09] bg-[#C8963E] shadow-[0_0_12px_rgba(200,150,62,0.8)] scale-105'
                      : 'text-[#FAF5EE]/80 hover:text-white hover:bg-white/15'
                  }`}
                  title={`Jump to slide ${slide.id}`}
                  aria-label={`Slide ${slide.id}`}
                >
                  {slide.id}
                </button>
              );
            })}
          </div>

          {/* Thin Animated Duration Progress Line */}
          <div className="flex items-center gap-2.5">
            <div className="w-16 sm:w-28 h-[3px] bg-white/25 rounded-full overflow-hidden relative shadow-inner">
              <div
                key={progressKey}
                className="h-full bg-[#C8963E] animate-hero-progress"
                style={{
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              />
            </div>

            {/* Current Active Counter */}
            <div className="flex items-baseline font-mono text-xs tracking-wider">
              <span className="text-[#C8963E] font-black text-sm drop-shadow-sm">
                {currentSlide.id}
              </span>
              <span className="text-[#FAF5EE]/70 text-xs font-semibold">
                &nbsp;/&nbsp;0{HERO_SLIDES.length}
              </span>
            </div>
          </div>

          {/* Previous / Next Arrow Click Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={goToPrevSlide}
              aria-label="Previous Hero Slide"
              className="w-8 h-8 rounded-full text-white hover:text-[#070D09] hover:bg-[#C8963E] bg-black/60 border border-white/20 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm"
              title="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Next Hero Slide"
              className="w-8 h-8 rounded-full text-white hover:text-[#070D09] hover:bg-[#C8963E] bg-black/60 border border-white/20 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm"
              title="Next slide"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          
{/* Editorial Scroll Line Prompt (Interactive Smooth Scroll) */}
<button
  type="button"
  onClick={() => {
    const target = document.getElementById('the-origins');

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({
        top: window.innerHeight * 0.85,
        behavior: 'smooth'
      });
    }
  }}
  className="hidden lg:flex items-center gap-3 text-xs tracking-widest uppercase text-[#FAF5EE]/70 hover:text-[#C8963E] transition-colors font-mono cursor-pointer group pl-2 border-l border-white/20"
  aria-label="Scroll to origins section"
>
  <span>SCROLL</span>

  <div className="w-12 h-[1px] bg-[#FAF5EE]/40 relative overflow-hidden group-hover:bg-[#C8963E]/60 transition-colors">
    <div className="absolute inset-y-0 left-0 w-1/2 bg-[#C8963E] animate-[shimmer_2s_infinite]" />
  </div>
  <ArrowDown className="w-3.5 h-3.5 text-[#C8963E] group-hover:translate-y-1 transition-transform" />

  
</button>

        </div>
      </div>
    </section>
  );
};
