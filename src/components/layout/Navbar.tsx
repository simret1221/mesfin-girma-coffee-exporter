import React, { useState, useEffect } from 'react';
import { COMPANY } from '../../constants/company';
import {
  Menu,
  X,
  Coffee,
  Phone,
  User,
  LogOut,
  LayoutDashboard,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { WhatsAppButton } from '../common/Button';
import { UserProfile } from '../../types';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onRequestClick: () => void;
  currentUser: UserProfile | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onDashboardClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onRequestClick,
  currentUser,
  onLoginClick,
  onLogoutClick,
  onDashboardClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'coffee', label: 'Coffee' },
    { id: 'origins', label: 'Origins' },
    { id: 'about', label: 'Our Story' },
    { id: 'process', label: 'Process' },
    { id: 'locations', label: 'Locations' },
    { id: 'track', label: 'Track' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A140F]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-3.5'
            : activePage === 'home'
            ? 'bg-gradient-to-b from-[#070D09]/80 via-[#070D09]/40 to-transparent backdrop-blur-xs border-b border-white/5 py-4 sm:py-5'
            : 'bg-[#14281D]/95 backdrop-blur-xs border-b border-white/5 py-4 sm:py-5'
        } text-[#FAF5EE]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo - Minimal & Powerful */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#C8963E] flex items-center justify-center text-[#14281D] font-bold text-xs tracking-widest shrink-0 transition-transform duration-300 group-hover:scale-105">
                MG
              </div>
              <div className="space-y-0.5">
                <span className="block text-sm sm:text-base font-serif font-bold tracking-wider text-[#FAF5EE] uppercase group-hover:text-[#C8963E] transition-colors leading-none">
                  MESFIN COFFEE
                </span>
                <span className="block text-[10px] tracking-[0.2em] text-[#C2B59B] uppercase font-light leading-none">
                  ETHIOPIAN EXPORTER
                </span>
              </div>
            </button>

            {/* Desktop Editorial Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-medium">
              {navLinks.map((link) => {
                const isActive =
                  activePage === link.id ||
                  (link.id === 'coffee' && activePage === 'coffee-detail');
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative py-1 transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#C8963E] font-semibold'
                        : 'text-[#E0D8C7]/80 hover:text-[#FAF5EE]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C8963E] rounded-full animate-in fade-in" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right CTAs: Portal & Primary Action */}
            <div className="hidden sm:flex items-center gap-3.5">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onDashboardClick}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      activePage.includes('dashboard')
                        ? 'bg-[#C8963E] text-[#14281D] border-[#C8963E]'
                        : 'bg-white/5 text-[#FAF5EE] border-white/10 hover:border-[#C8963E]'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#C8963E]" />
                    <span>{currentUser.buyerName.split(' ')[0]}</span>
                    <span className="text-[10px] opacity-75 font-mono">[{currentUser.role}]</span>
                  </button>

                  <button
                    onClick={onLogoutClick}
                    className="p-1.5 rounded-full text-[#A8987E] hover:text-[#FAF5EE] hover:bg-white/10 transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="text-xs tracking-wider uppercase font-medium text-[#C2B59B] hover:text-[#FAF5EE] transition-colors cursor-pointer px-2 py-1"
                >
                  Sign In
                </button>
              )}

              {/* Primary CTA: Build Your Coffee */}
              <button
                onClick={onRequestClick}
                className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Build Your Coffee</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            {/* Mobile hamburger menu toggle */}
            <div className="flex lg:hidden items-center gap-2.5">
              <button
                onClick={onRequestClick}
                className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-[#C8963E] text-[#14281D]"
              >
                Build Coffee
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-[#E0D8C7] hover:bg-white/10 focus:outline-none cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Editorial Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#0D1A13]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300">
          {/* Top header inside overlay */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 text-left"
            >
              <div className="w-9 h-9 rounded-full bg-[#C8963E] flex items-center justify-center text-[#14281D] font-bold text-xs tracking-widest">
                MG
              </div>
              <span className="text-sm font-serif font-bold tracking-wider text-[#FAF5EE] uppercase">
                MESFIN COFFEE
              </span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full text-[#E0D8C7] hover:bg-white/10 cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Large Numbered Editorial Links */}
          <nav className="my-auto py-6 space-y-4">
            {navLinks.map((link, idx) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="w-full flex items-baseline justify-between py-2 text-left group cursor-pointer"
                >
                  <span
                    className={`font-serif text-2xl sm:text-3xl transition-transform duration-300 group-hover:translate-x-2 ${
                      isActive ? 'text-[#C8963E] italic' : 'text-[#FAF5EE]'
                    }`}
                  >
                    {link.label}
                  </span>
                  <span className="text-xs font-mono text-[#8C7A68]">
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Bottom user action & primary CTA */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            {currentUser ? (
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
                <div>
                  <span className="text-xs text-[#FAF5EE] font-bold block">{currentUser.buyerName}</span>
                  <span className="text-[11px] text-[#A8987E]">{currentUser.companyName} • [{currentUser.role}]</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onDashboardClick();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#C8963E] text-[#14281D] font-bold text-xs"
                  >
                    Portal
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogoutClick();
                    }}
                    className="p-1.5 text-xs text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLoginClick();
                }}
                className="w-full py-3 rounded-full text-center font-medium border border-white/15 text-[#FAF5EE] text-xs uppercase tracking-wider"
              >
                Sign In to Portal / Register
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestClick();
              }}
              className="w-full py-3.5 rounded-full text-center font-bold bg-[#C8963E] text-[#14281D] text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <span>Build Your Coffee Requirements</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
