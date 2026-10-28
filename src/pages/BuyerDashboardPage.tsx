import React, { useState, useEffect } from 'react';
import { UserProfile, CoffeeRequest, CoffeeProduct } from '../types';
import { getRequestsForUser } from '../services/requestService';
import { getAllCoffees } from '../services/catalogService';
import { getSavedCoffeeIds, toggleSaveCoffee, updateUserProfile } from '../services/authService';
import {
  Coffee,
  Building2,
  User,
  Globe,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  Bookmark,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  MapPin,
  Trash2,
  Ship,
  Eye,
  Check,
  Edit2,
  X
} from 'lucide-react';
import { Button, WhatsAppButton } from '../components/common/Button';
import { StatusBadge, GradeBadge, ProcessingBadge, TypicalRegionalBadge } from '../components/common/Badge';

interface BuyerDashboardPageProps {
  user: UserProfile;
  onNavigateToBuildCoffee: (context?: { coffeeName?: string; origin?: string }) => void;
  onNavigateToCatalog: () => void;
  onNavigateToTracking: (referenceNumber: string) => void;
  onViewCoffeeDetail: (coffeeId: string) => void;
}

export const BuyerDashboardPage: React.FC<BuyerDashboardPageProps> = ({
  user,
  onNavigateToBuildCoffee,
  onNavigateToCatalog,
  onNavigateToTracking,
  onViewCoffeeDetail
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'saved' | 'profile'>('requests');
  const [requests, setRequests] = useState<CoffeeRequest[]>([]);
  const [savedCoffees, setSavedCoffees] = useState<CoffeeProduct[]>([]);
  const [selectedRequestForModal, setSelectedRequestForModal] = useState<CoffeeRequest | null>(null);

  // Profile edit states
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editCompany, setEditCompany] = useState<string>(user.companyName);
  const [editName, setEditName] = useState<string>(user.buyerName);
  const [editPhone, setEditPhone] = useState<string>(user.phoneWhatsApp);
  const [editCountry, setEditCountry] = useState<string>(user.country);
  const [editPort, setEditPort] = useState<string>(user.destinationPort || '');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);

  // Load user data
  useEffect(() => {
    const userRequests = getRequestsForUser(user);
    setRequests(userRequests);

    const savedIds = getSavedCoffeeIds();
    const allCoffees = getAllCoffees();
    const matched = allCoffees.filter((c) => savedIds.includes(c.id));
    setSavedCoffees(matched);
  }, [user]);

  const handleRemoveSavedCoffee = (coffeeId: string) => {
    const updatedIds = toggleSaveCoffee(coffeeId);
    const allCoffees = getAllCoffees();
    setSavedCoffees(allCoffees.filter((c) => updatedIds.includes(c.id)));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      updateUserProfile({
        companyName: editCompany,
        buyerName: editName,
        phoneWhatsApp: editPhone,
        country: editCountry,
        destinationPort: editPort
      });
      setIsEditingProfile(false);
      setProfileSuccessMsg('Profile details updated successfully.');
      setTimeout(() => setProfileSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update profile');
    }
  };

  // Metrics
  const activeCount = requests.filter(
    (r) => r.status === 'Submitted' || r.status === 'Under Review' || r.status === 'Quote Prepared' || r.status === 'Processing'
  ).length;
  const completedCount = requests.filter(
    (r) => r.status === 'Ready for Export' || r.status === 'Completed'
  ).length;

  return (
    <div className="bg-[#FAF5EE] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#14281D] via-[#1B3627] to-[#14281D] text-[#FAF5EE] rounded-3xl p-6 sm:p-8 border border-[#2A4434] shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#C8963E]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#C8963E] text-[#14281D]">
                  International Buyer Account
                </span>
                <span className="text-xs text-[#A8987E] flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#C8963E]" />
                  {user.country}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#EADFCB]">
                Welcome, {user.buyerName}
              </h1>
              <p className="text-sm text-[#C2B59B] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#C8963E]" />
                <span className="font-semibold text-white">{user.companyName}</span>
                <span className="text-[#3A5042]">|</span>
                <span>Direct Exporter Connection</span>
              </p>
            </div>

            {/* Quick Action CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                onClick={() => onNavigateToBuildCoffee()}
                className="shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Build New Coffee Request</span>
              </Button>
              <WhatsAppButton
                label="Direct Export WhatsApp"
                size="md"
              />
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E2D6C2] shadow-xs">
            <div className="flex items-center justify-between text-[#8A7459] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Requests</span>
              <FileText className="w-5 h-5 text-[#C8963E]" />
            </div>
            <div className="text-3xl font-bold font-serif text-[#14281D]">
              {requests.length}
            </div>
            <div className="text-[11px] text-[#7A664E] mt-1">Export inquiries logged</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E2D6C2] shadow-xs">
            <div className="flex items-center justify-between text-[#8A7459] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-bold font-serif text-amber-800">
              {activeCount}
            </div>
            <div className="text-[11px] text-[#7A664E] mt-1">Under review / quote staging</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E2D6C2] shadow-xs">
            <div className="flex items-center justify-between text-[#8A7459] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Export Ready</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold font-serif text-emerald-800">
              {completedCount}
            </div>
            <div className="text-[11px] text-[#7A664E] mt-1">Prepared or completed lots</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E2D6C2] shadow-xs">
            <div className="flex items-center justify-between text-[#8A7459] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Saved Coffees</span>
              <Bookmark className="w-5 h-5 text-[#14281D]" />
            </div>
            <div className="text-3xl font-bold font-serif text-[#14281D]">
              {savedCoffees.length}
            </div>
            <div className="text-[11px] text-[#7A664E] mt-1">Bookmarked catalog lots</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#D8CCB8] space-x-2">
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'border-[#14281D] text-[#14281D]'
                : 'border-transparent text-[#7A664E] hover:text-[#14281D]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Inquiries & Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'border-[#14281D] text-[#14281D]'
                : 'border-transparent text-[#7A664E] hover:text-[#14281D]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Catalog Coffees ({savedCoffees.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#14281D] text-[#14281D]'
                : 'border-transparent text-[#7A664E] hover:text-[#14281D]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Company Profile</span>
          </button>
        </div>

        {/* TAB 1: MY REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {requests.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E2D6C2] space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#ECE4D4] flex items-center justify-center text-[#7A664E]">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#14281D]">
                  No Export Requests Yet
                </h3>
                <p className="text-sm text-[#7A664E] max-w-md mx-auto">
                  You haven't submitted any coffee requirements yet. Use our multi-step wizard to specify origin, processing, grade, and volume.
                </p>
                <Button variant="primary" onClick={() => onNavigateToBuildCoffee()}>
                  <PlusCircle className="w-4 h-4" />
                  <span>Build Your First Coffee Request</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-[#E2D6C2] p-5 hover:border-[#14281D]/30 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-sm font-bold text-[#14281D] bg-[#F4EFE6] px-2.5 py-1 rounded-md border border-[#E2D6C2]">
                          {req.referenceNumber}
                        </span>
                        <StatusBadge status={req.status} />
                        <span className="text-xs text-[#8A7459] flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(req.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-[#14281D]">
                          {req.formData.origin} Specialty Lot • {req.formData.processing}
                        </h4>
                        <div className="text-xs text-[#6B5740] flex items-center gap-2 mt-0.5 flex-wrap">
                          <span>Grade: <strong className="text-[#14281D]">{req.formData.grade}</strong></span>
                          <span>•</span>
                          <span>Volume: <strong className="text-[#14281D]">{req.formData.quantityValue || req.formData.quantityType}</strong></span>
                          <span>•</span>
                          <span>Destination: <strong className="text-[#14281D]">{req.formData.destinationCountry} {req.formData.destinationPort ? `(${req.formData.destinationPort})` : ''}</strong></span>
                        </div>
                      </div>

                      {/* Timeline snippet */}
                      {req.timeline && req.timeline.length > 0 && (
                        <div className="text-xs text-[#7A664E] bg-[#FAF5EE] px-3 py-1.5 rounded-lg border border-[#E8DFC8] inline-block">
                          <span className="font-medium text-[#14281D]">Latest Update:</span>{' '}
                          {req.timeline[req.timeline.length - 1].message}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => setSelectedRequestForModal(req)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-[#14281D] bg-[#F4EFE6] hover:bg-[#EAE1D1] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => onNavigateToTracking(req.referenceNumber)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#14281D] bg-[#C8963E] hover:bg-[#B38130] transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Ship className="w-3.5 h-3.5" />
                        <span>Live Tracking</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED COFFEES */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            {savedCoffees.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E2D6C2] space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#ECE4D4] flex items-center justify-center text-[#7A664E]">
                  <Bookmark className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#14281D]">
                  No Saved Coffees
                </h3>
                <p className="text-sm text-[#7A664E] max-w-md mx-auto">
                  Bookmark coffees from our catalog to save candidate lots for cupping samples or export container contracts.
                </p>
                <Button variant="primary" onClick={onNavigateToCatalog}>
                  <span>Browse Coffee Catalog</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedCoffees.map((coffee) => (
                  <div
                    key={coffee.id}
                    className="bg-white rounded-2xl border border-[#E2D6C2] overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 w-full relative bg-[#14281D]">
                        <img
                          src={coffee.image}
                          alt={coffee.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => handleRemoveSavedCoffee(coffee.id)}
                            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow-md transition-colors cursor-pointer"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute top-3 left-3 flex gap-1">
                          <GradeBadge grade={coffee.grade} size="sm" />
                          <ProcessingBadge method={coffee.processingMethod} size="sm" />
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="text-xs uppercase tracking-wider text-[#C8963E] font-bold">
                          {coffee.origin} • {coffee.region.split('(')[0].trim()}
                        </div>
                        <h4 className="text-base font-serif font-bold text-[#14281D]">
                          {coffee.name}
                        </h4>
                        <p className="text-xs text-[#7A664E] line-clamp-2">
                          {coffee.description}
                        </p>
                        <div className="pt-2">
                          <TypicalRegionalBadge />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-[#F2ECE1] mt-3 flex items-center gap-2">
                      <button
                        onClick={() => onViewCoffeeDetail(coffee.id)}
                        className="flex-1 py-2 text-xs font-semibold rounded-xl bg-[#FAF5EE] hover:bg-[#F2ECE1] text-[#14281D] transition-colors cursor-pointer text-center"
                      >
                        Lot Details
                      </button>
                      <button
                        onClick={() =>
                          onNavigateToBuildCoffee({
                            coffeeName: coffee.name,
                            origin: coffee.origin
                          })
                        }
                        className="flex-1 py-2 text-xs font-semibold rounded-xl bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] transition-colors cursor-pointer text-center"
                      >
                        Request Lot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMPANY PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-[#E2D6C2] p-8 max-w-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-[#E8DFC8] mb-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#14281D]">
                  International Importer Profile
                </h3>
                <p className="text-xs text-[#7A664E] mt-0.5">
                  Information automatically pre-filled when requesting samples or container allocations.
                </p>
              </div>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF5EE] hover:bg-[#F0E6D4] text-[#14281D] text-xs font-semibold border border-[#D9CDB8] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {profileSuccessMsg && (
              <div className="mb-6 p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>{profileSuccessMsg}</span>
              </div>
            )}

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editCompany}
                    onChange={(e) => setEditCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Contact / Buyer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="text"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={editCountry}
                      onChange={(e) => setEditCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Default Destination Port (Optional)
                  </label>
                  <input
                    type="text"
                    value={editPort}
                    onChange={(e) => setEditPort(e.target.value)}
                    placeholder="e.g. Hamburg, Rotterdam, Yokohama, Long Beach..."
                    className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <Button type="submit" variant="primary" size="md">
                    <span>Save Changes</span>
                  </Button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#7A664E] hover:text-[#14281D] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFC8]">
                    <span className="text-[#8A7459] block">Company Name</span>
                    <strong className="text-sm text-[#14281D] block mt-0.5">{user.companyName}</strong>
                  </div>
                  <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFC8]">
                    <span className="text-[#8A7459] block">Buyer / Representative</span>
                    <strong className="text-sm text-[#14281D] block mt-0.5">{user.buyerName}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFC8]">
                    <span className="text-[#8A7459] block">Email</span>
                    <strong className="text-sm text-[#14281D] block mt-0.5">{user.email}</strong>
                  </div>
                  <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFC8]">
                    <span className="text-[#8A7459] block">WhatsApp / Phone</span>
                    <strong className="text-sm text-[#14281D] block mt-0.5">{user.phoneWhatsApp}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFC8]">
                    <span className="text-[#8A7459] block">Country</span>
                    <strong className="text-sm text-[#14281D] block mt-0.5">{user.country}</strong>
                  </div>
                  <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFC8]">
                    <span className="text-[#8A7459] block">Preferred Destination Port</span>
                    <strong className="text-sm text-[#14281D] block mt-0.5">
                      {user.destinationPort || 'Information available upon request'}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* REQUEST DETAIL MODAL */}
      {selectedRequestForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF5EE] rounded-3xl border border-[#D9CDB8] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8DFC8] flex items-center justify-between sticky top-0 bg-[#FAF5EE] z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#14281D] bg-[#ECE4D4] px-2.5 py-0.5 rounded border border-[#D0C2AB]">
                    {selectedRequestForModal.referenceNumber}
                  </span>
                  <StatusBadge status={selectedRequestForModal.status} />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#14281D] mt-1">
                  Export Coffee Request Summary
                </h3>
              </div>
              <button
                onClick={() => setSelectedRequestForModal(null)}
                className="w-8 h-8 rounded-full bg-[#ECE4D4] hover:bg-[#D9CDB8] text-[#14281D] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs">
              {/* Coffee Specifications */}
              <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] space-y-3">
                <h4 className="font-bold uppercase tracking-wider text-[#C8963E] text-[11px]">
                  Coffee Requirements
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[#8A7459] block">Origin</span>
                    <span className="font-bold text-[#14281D] text-sm">{selectedRequestForModal.formData.origin}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Processing</span>
                    <span className="font-bold text-[#14281D] text-sm">{selectedRequestForModal.formData.processing}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Grade</span>
                    <span className="font-bold text-[#14281D] text-sm">{selectedRequestForModal.formData.grade}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Volume</span>
                    <span className="font-bold text-[#14281D] text-sm">{selectedRequestForModal.formData.quantityValue || selectedRequestForModal.formData.quantityType}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Destination</span>
                    <span className="font-bold text-[#14281D] text-sm">{selectedRequestForModal.formData.destinationCountry}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Destination Port</span>
                    <span className="font-bold text-[#14281D] text-sm">{selectedRequestForModal.formData.destinationPort || 'TBD'}</span>
                  </div>
                </div>

                {selectedRequestForModal.formData.additionalNotes && (
                  <div className="pt-2 border-t border-[#F2ECE1]">
                    <span className="text-[#8A7459] block">Buyer Notes:</span>
                    <p className="text-[#14281D] mt-0.5">{selectedRequestForModal.formData.additionalNotes}</p>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] space-y-3">
                <h4 className="font-bold uppercase tracking-wider text-[#C8963E] text-[11px]">
                  Status Progression & Updates
                </h4>
                <div className="space-y-3">
                  {selectedRequestForModal.timeline.map((event, idx) => (
                    <div key={idx} className="flex items-start gap-3 relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#14281D] mt-1 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#14281D]">{event.status}</span>
                          <span className="text-[10px] text-[#8A7459]">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[#6B5740] mt-0.5">{event.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    const ref = selectedRequestForModal.referenceNumber;
                    setSelectedRequestForModal(null);
                    onNavigateToTracking(ref);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#14281D] text-[#FAF5EE] font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Ship className="w-4 h-4 text-[#C8963E]" />
                  <span>Open Full Tracking View</span>
                </button>
                <WhatsAppButton label="Ask Question via WhatsApp" size="sm" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
