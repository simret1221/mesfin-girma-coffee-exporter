import React from 'react';
import { COMPANY } from '../../constants/company';
import { COMPANY_LOCATIONS_MAP } from '../../constants/locations';
import { MapPin, Phone, Mail, MessageCircle, Share2, ArrowUpRight, ArrowUp, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
  onRequestClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onRequestClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A140F] text-[#E0D8C7] border-t border-white/10">
      {/* Upper Editorial Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C8963E]">
              MESFIN GIRMA GEMEDA COFFEE SUPPLIES AND EXPORTER
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF5EE] leading-tight">
              From Ethiopian Origin
              <br />
              <span className="italic text-[#E2D5BE] font-normal">to the World.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A8987E] font-light leading-relaxed">
              Grade 1 specialty coffees sourced directly from Yirgacheffe, Guji, Sidama, Shakiso, Arsi, Harar, and Nekemte collaboration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={onRequestClick}
              className="px-8 py-4 rounded-full bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer flex items-center gap-2"
            >
              <span>Build Coffee Requirements</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <a
              href={COMPANY.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF5EE] border border-white/15 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              WhatsApp Export Desk
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-xs">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-3">
            <span className="font-serif font-bold text-base text-[#FAF5EE] block">
              {COMPANY.shortName}
            </span>
            <p className="text-[#8C7A68] leading-relaxed">
              Direct connection to Ethiopian specialty coffee origins with company farms in Shakiso and Yirgacheffe, providing international buyers with Grade 1 baseline lots and cup scores above 85.
            </p>
            <div className="text-[11px] text-[#C8963E] pt-2">
              Export Capacity: Up to 100 Containers*
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <span className="font-mono uppercase tracking-widest text-[#C8963E] font-semibold block text-[11px]">
              Platform Navigation
            </span>
            <ul className="space-y-2 text-[#A8987E]">
              <li>
                <button
                  onClick={() => handleNavClick('coffee')}
                  className="hover:text-[#FAF5EE] transition-colors cursor-pointer"
                >
                  Coffee Catalog & Offerings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('origins')}
                  className="hover:text-[#FAF5EE] transition-colors cursor-pointer"
                >
                  Ethiopia Origin Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('build-coffee')}
                  className="hover:text-[#FAF5EE] transition-colors cursor-pointer"
                >
                  Build Your Coffee Requirements
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('track')}
                  className="hover:text-[#FAF5EE] transition-colors cursor-pointer"
                >
                  Track Export Inquiry
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-[#FAF5EE] transition-colors cursor-pointer"
                >
                  Our Story & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('process')}
                  className="hover:text-[#FAF5EE] transition-colors cursor-pointer"
                >
                  Our 5-Step Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('locations')}
                  className="hover:text-[#FAF5EE] transition-colors cursor-pointer"
                >
                  Company Operations & Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Company Locations with Google Maps Navigation */}
          <div className="space-y-3">
            <span className="font-mono uppercase tracking-widest text-[#C8963E] font-semibold block text-[11px]">
              Locations & Facilities
            </span>
            <div className="space-y-3 text-[#A8987E]">
              <div>
                <strong className="text-[#FAF5EE] block">Main Location:</strong>
                <span>West Hararghe, Daro Lebo, Mechara/Mecheta, Ethiopia</span>
                <div className="pt-1 flex items-center gap-3">
                  <a
                    href={COMPANY_LOCATIONS_MAP.westHarerge.mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8963E] hover:text-[#FAF5EE] text-[11px] font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                  <a
                    href={COMPANY_LOCATIONS_MAP.westHarerge.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FAF5EE]/70 hover:text-[#C8963E] text-[11px] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Directions</span>
                  </a>
                </div>
              </div>
              <div>
                <strong className="text-[#FAF5EE] block">Addis Ababa Branch:</strong>
                <span>Jemo Michael, Addis Ababa, Ethiopia</span>
                <div className="pt-1 flex items-center gap-3">
                  <a
                    href={COMPANY_LOCATIONS_MAP.addisAbaba.mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8963E] hover:text-[#FAF5EE] text-[11px] font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                  <a
                    href={COMPANY_LOCATIONS_MAP.addisAbaba.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FAF5EE]/70 hover:text-[#C8963E] text-[11px] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Directions</span>
                  </a>
                </div>
              </div>
              <div>
                <strong className="text-[#FAF5EE] block">Company Farm Sites:</strong>
                <span>Shakiso & Yirgacheffe</span>
                <div className="pt-1 flex items-center gap-3 text-[11px]">
                  <a
                    href={COMPANY_LOCATIONS_MAP.shakiso.mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8963E] hover:text-[#FAF5EE] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Shakiso Map</span>
                  </a>
                  <span className="text-white/20">•</span>
                  <a
                    href={COMPANY_LOCATIONS_MAP.yirgacheffe.mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8963E] hover:text-[#FAF5EE] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Yirgacheffe Map</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Verified Direct Contacts */}
          <div className="space-y-3">
            <span className="font-mono uppercase tracking-widest text-[#C8963E] font-semibold block text-[11px]">
              Direct Contact
            </span>
            <div className="space-y-2.5 text-[#A8987E]">
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-2 hover:text-[#FAF5EE] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C8963E]" />
                <span>{COMPANY.phone} ({COMPANY.phoneInternational})</span>
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 hover:text-[#FAF5EE] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#C8963E]" />
                <span>{COMPANY.email}</span>
              </a>
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FAF5EE] transition-colors text-[#25D366]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: Mesfin Girma</span>
              </a>
              <a
                href={COMPANY.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FAF5EE] transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-[#C8963E]" />
                <span>TikTok: {COMPANY.tiktok}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Back to Top */}
      <div className="border-t border-white/5 py-8 px-4 sm:px-8 bg-[#070D0A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A664E]">
          <div>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>*Up to 100 containers refers to export capacity, not current inventory.</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#C8963E] hover:text-[#FAF5EE] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
