import React, { useState, useMemo, useEffect } from 'react';
import { useCoffee } from '../hooks/useCoffee';
import { CatalogSortOption } from '../types';
import { CoffeeCard } from '../components/catalog/CoffeeCard';
import {
  TypicalRegionalBadge,
  VerifiedInformationBadge,
} from '../components/common/Badge';
import {
  Search,
  ArrowUpDown,
  Sparkles,
  Info,
  RotateCcw,
  SlidersHorizontal,
  X,
  Coffee,
} from 'lucide-react';

interface OurCoffeePageProps {
  initialOriginFilter?: string;
  onViewCoffeeDetails: (coffeeId: string) => void;
  onRequestCoffee: (coffeeName: string, origin: string) => void;
  onClearInitialOriginFilter?: () => void;
}

export const OurCoffeePage: React.FC<OurCoffeePageProps> = ({
  initialOriginFilter,
  onViewCoffeeDetails,
  onRequestCoffee,
  onClearInitialOriginFilter,
}) => {
  // ============================================================
  // COFFEE DATA
  // PostgreSQL / Express is now the source of truth.
  // ============================================================
  const { coffees, loading, error } = useCoffee();

  // ============================================================
  // FILTER STATES
  // ============================================================
  const [selectedOrigin, setSelectedOrigin] = useState<string>(
    initialOriginFilter || 'All'
  );

  const [selectedProcessing, setSelectedProcessing] =
    useState<string>('All');

  const [selectedGrade, setSelectedGrade] = useState<string>('All');

  const [selectedCupScore, setSelectedCupScore] =
    useState<string>('All');

  const [selectedAvailability, setSelectedAvailability] =
    useState<string>('All');

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [sortBy, setSortBy] =
    useState<CatalogSortOption>('featured');

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState<boolean>(false);

  // ============================================================
  // SYNC INITIAL ORIGIN FILTER
  // ============================================================
  useEffect(() => {
    if (initialOriginFilter) {
      setSelectedOrigin(initialOriginFilter);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [initialOriginFilter]);

  // ============================================================
  // FILTER OPTIONS
  // ============================================================
  const originOptions = [
    'All',
    'Yirgacheffe',
    'Guji',
    'Sidama',
    'Shakiso',
    'Arsi',
    'Harar',
  ];

  const processingOptions = [
    'All',
    'Washed',
    'Sun-Dried / Natural',
  ];

  const gradeOptions = ['All', 'Grade 1'];

  const cupScoreOptions = ['All', 'Above 85'];

  const availabilityOptions = [
    'All',
    'Available for Export',
    'Upon Request',
  ];

  // ============================================================
  // ACTIVE FILTER CHECK
  // ============================================================
  const hasActiveFilters =
    selectedOrigin !== 'All' ||
    selectedProcessing !== 'All' ||
    selectedGrade !== 'All' ||
    selectedCupScore !== 'All' ||
    selectedAvailability !== 'All' ||
    searchQuery.trim() !== '';

  // ============================================================
  // CLEAR FILTERS
  // ============================================================
  const handleClearFilters = () => {
    setSelectedOrigin('All');
    setSelectedProcessing('All');
    setSelectedGrade('All');
    setSelectedCupScore('All');
    setSelectedAvailability('All');
    setSearchQuery('');
    setSortBy('featured');

    if (onClearInitialOriginFilter) {
      onClearInitialOriginFilter();
    }
  };

  // ============================================================
  // FILTER + SORT
  // ============================================================
  const filteredAndSortedCoffees = useMemo(() => {
    const result = coffees.filter((coffee) => {
      // --------------------------------------------------------
      // Origin
      // --------------------------------------------------------
      if (
        selectedOrigin !== 'All' &&
        coffee.origin.toLowerCase() !==
          selectedOrigin.toLowerCase()
      ) {
        return false;
      }

      // --------------------------------------------------------
      // Processing Method
      // Backend can return null, so check safely.
      // --------------------------------------------------------
      if (selectedProcessing !== 'All') {
        const processing =
          coffee.processingMethod?.toLowerCase() || '';

        if (!processing.includes(selectedProcessing.toLowerCase())) {
          return false;
        }
      }

      // --------------------------------------------------------
      // Grade
      // --------------------------------------------------------
      if (
        selectedGrade !== 'All' &&
        coffee.grade !== selectedGrade
      ) {
        return false;
      }

      // --------------------------------------------------------
      // Cup Score
      // --------------------------------------------------------
      if (selectedCupScore !== 'All') {
        const cupScore =
          coffee.cupScoreBaseline?.toLowerCase() || '';

        if (
          selectedCupScore === 'Above 85' &&
          !cupScore.includes('85')
        ) {
          return false;
        }
      }

      // --------------------------------------------------------
      // Availability
      // --------------------------------------------------------
      if (
        selectedAvailability !== 'All' &&
        coffee.availability !== selectedAvailability
      ) {
        return false;
      }

      // --------------------------------------------------------
      // Search
      // --------------------------------------------------------
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();

        const matchesName = coffee.name
          .toLowerCase()
          .includes(query);

        const matchesOrigin = coffee.origin
          .toLowerCase()
          .includes(query);

        const matchesRegion = coffee.region
          .toLowerCase()
          .includes(query);

        const matchesProcessing = (
          coffee.processingMethod || ''
        )
          .toLowerCase()
          .includes(query);

        const matchesFlavor = (
          coffee.flavorProfile || ''
        )
          .toLowerCase()
          .includes(query);

        if (
          !matchesName &&
          !matchesOrigin &&
          !matchesRegion &&
          !matchesProcessing &&
          !matchesFlavor
        ) {
          return false;
        }
      }

      return true;
    });

    // ==========================================================
    // SORTING
    // ==========================================================
    result.sort((a, b) => {
      if (sortBy === 'featured') {
        return (
          (b.isFeatured ? 1 : 0) -
          (a.isFeatured ? 1 : 0)
        );
      }

      if (sortBy === 'cupScore') {
        // Exact scores are not available in the backend.
        // Keep deterministic ordering instead of inventing scores.
        return b.name.localeCompare(a.name);
      }

      if (sortBy === 'origin') {
        return a.origin.localeCompare(b.origin);
      }

      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });

    return result;
  }, [
    coffees,
    selectedOrigin,
    selectedProcessing,
    selectedGrade,
    selectedCupScore,
    selectedAvailability,
    searchQuery,
    sortBy,
  ]);

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FBF9F5]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#D5C9B6] border-t-[#14281D] rounded-full animate-spin mx-auto" />

          <p className="text-sm text-[#7A5B35]">
            Loading our coffee catalog...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FBF9F5] px-4">
        <div className="max-w-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#F2ECE1] text-[#7A5B35] flex items-center justify-center mx-auto">
            <Coffee className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#14281D]">
            Unable to load our coffee catalog
          </h2>

          <p className="text-sm text-[#5C4D3F]">
            {error}
          </p>

          <p className="text-xs text-[#8C7A68]">
            Please make sure the backend server is running.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN PAGE
  // ============================================================
  return (
    <div className="space-y-0">

      {/* ======================================================
          1. PAGE HERO
      ======================================================= */}
      <section className="bg-[#14281D] text-[#FAF5EE] py-16 sm:py-20 px-4 sm:px-8 border-b border-[#234230] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8963E_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3627] text-xs text-[#E5DBC7] border border-[#2B4F39]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8963E]" />

            <span>
              Export Standards: Grade 1 Baseline • Cup Score Above 85 • Up to 100 Containers
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF5EE] tracking-tight">
            Discover Ethiopian Coffee
          </h1>

          <p className="text-sm sm:text-base text-[#C2B5A0] max-w-2xl font-light leading-relaxed">
            Sourced from Ethiopia's distinctive coffee-growing regions and prepared to meet the requirements of international buyers. Explore our specialty coffees by origin, processing method, grade, and quality information.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <VerifiedInformationBadge label="✓ Verified Baseline Information" />
            <TypicalRegionalBadge label="Typical Regional Characteristics" />
          </div>

          <div className="bg-[#1C3627] p-3 rounded-xl border border-[#2D563D] text-xs text-[#C8BCAB] max-w-3xl flex items-start gap-2.5 mt-2">
            <Info className="w-4 h-4 text-[#C8963E] shrink-0 mt-0.5" />

            <p>
              <strong>Data Classification Notice:</strong>{' '}
              Regional altitude, varietal classifications, and flavor notes represent{' '}
              <em>Typical Regional Characteristics</em>. Exact lot cupping sheets, moisture levels, and pre-shipment green samples are provided upon request.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          2. SEARCH + FILTERS
      ======================================================= */}
      <section className="bg-[#FAF5EE] border-b border-[#E2D6C2] py-6 px-4 sm:px-8 sticky top-20 z-30 shadow-xs backdrop-blur-md">

        <div className="max-w-7xl mx-auto space-y-4">

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">

            {/* Search */}
            <div className="relative grow max-w-xl">

              <Search className="w-4 h-4 text-[#8C7A68] absolute left-3.5 top-3" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search by coffee name, origin, region, processing, or flavor note..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5C9B6] bg-white focus:outline-none focus:ring-2 focus:ring-[#14281D] placeholder:text-[#9C8B74]"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-[#8C7A68] hover:text-[#14281D] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

            </div>

            {/* Mobile Filter */}
            <div className="flex items-center gap-2 md:hidden">

              <button
                onClick={() =>
                  setIsMobileFiltersOpen(
                    !isMobileFiltersOpen
                  )
                }
                className={`grow py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  hasActiveFilters
                    ? 'bg-[#14281D] text-[#C8963E] border-[#14281D]'
                    : 'bg-white text-[#14281D] border-[#D5C9B6]'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />

                <span>
                  Filters {hasActiveFilters && '(Active)'}
                </span>
              </button>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="p-2.5 rounded-xl border border-[#D5C9B6] bg-white text-[#7A5B35] hover:text-[#14281D] cursor-pointer"
                  title="Clear all filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0">

              <span className="text-xs font-semibold text-[#7A5B35] flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort:
              </span>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as CatalogSortOption
                  )
                }
                className="px-3 py-2 text-xs rounded-xl border border-[#D5C9B6] bg-white text-[#14281D] font-medium focus:outline-none focus:ring-2 focus:ring-[#14281D]"
              >
                <option value="featured">
                  Featured First
                </option>

                <option value="cupScore">
                  Cup Score (85+)
                </option>

                <option value="origin">
                  Origin (A to Z)
                </option>

                <option value="name">
                  Name (A to Z)
                </option>
              </select>

            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex flex-col gap-3 pt-1 border-t border-[#EAE0D0]">

            {/* Origins */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">

              <span className="font-semibold text-[#7A5B35] mr-2">
                Origin:
              </span>

              {originOptions.map((origin) => {

                const isSelected =
                  selectedOrigin.toLowerCase() ===
                  origin.toLowerCase();

                return (
                  <button
                    key={origin}
                    onClick={() =>
                      setSelectedOrigin(origin)
                    }
                    className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#14281D] text-[#C8963E] font-bold shadow-xs'
                        : 'bg-[#F2ECE1] text-[#5C4D3F] hover:bg-[#EAE0D0]'
                    }`}
                  >
                    {origin}
                  </button>
                );
              })}

            </div>

            {/* Sub Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">

              <div className="flex flex-wrap items-center gap-4">

                {/* Processing */}
                <div className="flex items-center gap-1.5">

                  <span className="text-[#8C7A68]">
                    Processing:
                  </span>

                  <select
                    value={selectedProcessing}
                    onChange={(e) =>
                      setSelectedProcessing(e.target.value)
                    }
                    className="px-2.5 py-1 text-xs rounded-lg border border-[#D5C9B6] bg-white text-[#14281D] focus:outline-none"
                  >
                    {processingOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>

                </div>

                {/* Grade */}
                <div className="flex items-center gap-1.5">

                  <span className="text-[#8C7A68]">
                    Grade:
                  </span>

                  <select
                    value={selectedGrade}
                    onChange={(e) =>
                      setSelectedGrade(e.target.value)
                    }
                    className="px-2.5 py-1 text-xs rounded-lg border border-[#D5C9B6] bg-white text-[#14281D] focus:outline-none"
                  >
                    {gradeOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>

                </div>

                {/* Cup Score */}
                <div className="flex items-center gap-1.5">

                  <span className="text-[#8C7A68]">
                    Cup Score:
                  </span>

                  <select
                    value={selectedCupScore}
                    onChange={(e) =>
                      setSelectedCupScore(e.target.value)
                    }
                    className="px-2.5 py-1 text-xs rounded-lg border border-[#D5C9B6] bg-white text-[#14281D] focus:outline-none"
                  >
                    {cupScoreOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                </div>

                {/* Availability */}
                <div className="flex items-center gap-1.5">

                  <span className="text-[#8C7A68]">
                    Availability:
                  </span>

                  <select
                    value={selectedAvailability}
                    onChange={(e) =>
                      setSelectedAvailability(e.target.value)
                    }
                    className="px-2.5 py-1 text-xs rounded-lg border border-[#D5C9B6] bg-white text-[#14281D] focus:outline-none"
                  >
                    {availabilityOptions.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-[#7A5B35] hover:text-[#14281D] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}

            </div>
          </div>

          {/* Mobile Filters */}
          {isMobileFiltersOpen && (
            <div className="md:hidden bg-[#F2ECE1] border border-[#DECFBB] rounded-2xl p-4 space-y-4 text-xs">

              <div className="flex justify-between items-center border-b border-[#E0D4C0] pb-2">

                <span className="font-serif font-bold text-[#14281D]">
                  Catalog Filters
                </span>

                <button
                  onClick={handleClearFilters}
                  className="text-[11px] text-[#7A5B35] underline cursor-pointer"
                >
                  Clear All
                </button>

              </div>

              {/* Mobile Origin */}
              <div>

                <label className="block font-semibold text-[#14281D] mb-1.5">
                  Origin
                </label>

                <div className="flex flex-wrap gap-1.5">

                  {originOptions.map((origin) => (

                    <button
                      key={origin}
                      onClick={() =>
                        setSelectedOrigin(origin)
                      }
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
                        selectedOrigin.toLowerCase() ===
                        origin.toLowerCase()
                          ? 'bg-[#14281D] text-[#C8963E] font-bold'
                          : 'bg-white text-[#5C4D3F] border border-[#D5C9B6]'
                      }`}
                    >
                      {origin}
                    </button>

                  ))}

                </div>
              </div>

              {/* Mobile Processing */}
              <div>

                <label className="block font-semibold text-[#14281D] mb-1.5">
                  Processing Method
                </label>

                <div className="flex flex-wrap gap-1.5">

                  {processingOptions.map((p) => (

                    <button
                      key={p}
                      onClick={() =>
                        setSelectedProcessing(p)
                      }
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
                        selectedProcessing === p
                          ? 'bg-[#14281D] text-[#C8963E] font-bold'
                          : 'bg-white text-[#5C4D3F] border border-[#D5C9B6]'
                      }`}
                    >
                      {p}
                    </button>

                  ))}

                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">

                <div>

                  <label className="block font-semibold text-[#14281D] mb-1">
                    Grade
                  </label>

                  <select
                    value={selectedGrade}
                    onChange={(e) =>
                      setSelectedGrade(e.target.value)
                    }
                    className="w-full px-2 py-1.5 rounded-lg border border-[#D5C9B6] bg-white"
                  >
                    {gradeOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>

                </div>

                <div>

                  <label className="block font-semibold text-[#14281D] mb-1">
                    Cup Score
                  </label>

                  <select
                    value={selectedCupScore}
                    onChange={(e) =>
                      setSelectedCupScore(e.target.value)
                    }
                    className="w-full px-2 py-1.5 rounded-lg border border-[#D5C9B6] bg-white"
                  >
                    {cupScoreOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                </div>

              </div>

              <button
                onClick={() =>
                  setIsMobileFiltersOpen(false)
                }
                className="w-full py-2.5 rounded-xl bg-[#14281D] text-[#FAF5EE] font-semibold text-center cursor-pointer mt-2"
              >
                Apply Filters ({filteredAndSortedCoffees.length} Coffees)
              </button>

            </div>
          )}

        </div>
      </section>

      {/* ======================================================
          3. CATALOG
      ======================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 bg-[#FBF9F5]">

        <div className="max-w-7xl mx-auto space-y-8">

          {/* Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#7A5B35]">

            <div>
              Showing{' '}
              <strong>
                {filteredAndSortedCoffees.length}
              </strong>{' '}
              Ethiopian specialty offerings

              {selectedOrigin !== 'All' && (
                <span>
                  {' '}in <strong>{selectedOrigin}</strong>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#1D5E34] font-medium">
                ✓ Grade 1 Export Baseline
              </span>

              <span>•</span>

              <span className="text-[#14281D] font-medium">
                Cup Score Above 85
              </span>
            </div>

          </div>

          {/* Empty State */}
          {filteredAndSortedCoffees.length === 0 ? (

            <div className="bg-[#FAF5EE] border border-[#E2D6C2] rounded-3xl p-12 sm:p-16 text-center space-y-4 max-w-lg mx-auto shadow-sm">

              <div className="w-16 h-16 rounded-2xl bg-[#F2ECE1] text-[#7A5B35] flex items-center justify-center mx-auto">
                <Coffee className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-serif font-bold text-[#14281D]">
                No coffees match your current filters.
              </h3>

              <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed">
                Try widening your origin, processing, or search parameters. We can also source and prepare custom Grade 1 lots from across Ethiopia upon request.
              </p>

              <div className="pt-2">

                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 rounded-xl bg-[#14281D] hover:bg-[#1E3B2B] text-[#FAF5EE] font-semibold text-xs transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear Filters</span>
                </button>

              </div>
            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredAndSortedCoffees.map((coffee) => (

                <CoffeeCard
                  key={coffee.id}
                  coffee={coffee}
                  onViewDetails={onViewCoffeeDetails}
                  onRequestCoffee={onRequestCoffee}
                />

              ))}

            </div>

          )}

        </div>
      </section>

      {/* ======================================================
          4. BUYER INQUIRY BANNER
      ======================================================= */}
      <section className="py-14 px-4 sm:px-8 bg-[#14281D] text-[#FAF5EE] border-t border-[#234230]">

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="space-y-1.5 text-center md:text-left">

            <span className="text-xs uppercase tracking-widest text-[#C8963E] font-semibold">
              Looking for a Specific Lot or Profile?
            </span>

            <h3 className="text-2xl font-serif font-bold text-[#FAF5EE]">
              We Source & Export Up to 100 Containers
            </h3>

            <p className="text-xs text-[#C8BCAB] max-w-xl">
              Tell us your target origin, processing method, and container volume. We coordinate directly from our washing stations and farms.
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-3">

            <button
              onClick={() =>
                onRequestCoffee(
                  'Custom Container Lot',
                  selectedOrigin !== 'All'
                    ? selectedOrigin
                    : 'Yirgacheffe'
                )
              }
              className="px-6 py-3 rounded-xl bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Request Custom Lot
            </button>

          </div>

        </div>
      </section>

    </div>
  );
};