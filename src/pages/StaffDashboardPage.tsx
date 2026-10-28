import React, { useState, useEffect } from 'react';
import { UserProfile, CoffeeRequest, CoffeeProduct, RequestStatus, CoffeeAvailability, CharacteristicType, UserRole } from '../types';
import {
  getAllRequests,
  updateRequestStatus,
  updateRequestStaffNotes,
  deleteRequest
} from '../services/requestService';
import {
  getAllCoffees,
  saveCoffee,
  updateCoffeeAvailability,
  deleteCoffee,
  resetCatalogToDefaults
} from '../services/catalogService';
import { getAllUsers, changeUserRole } from '../services/authService';
import { IMAGE_PATHS } from '../constants/images';
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
  PlusCircle,
  Search,
  Filter,
  Layers,
  Edit2,
  Trash2,
  Save,
  MessageSquare,
  AlertTriangle,
  Ship,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Check,
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Button, WhatsAppButton } from '../components/common/Button';
import {
  StatusBadge,
  GradeBadge,
  ProcessingBadge,
  AvailabilityBadge,
  TypicalRegionalBadge,
  VerifiedInformationBadge
} from '../components/common/Badge';

interface StaffDashboardPageProps {
  user: UserProfile;
  onViewCoffeeDetail: (coffeeId: string) => void;
  onNavigateHome: () => void;
}

export const StaffDashboardPage: React.FC<StaffDashboardPageProps> = ({
  user,
  onViewCoffeeDetail,
  onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'coffees' | 'users'>('requests');
  const [requests, setRequests] = useState<CoffeeRequest[]>([]);
  const [coffees, setCoffees] = useState<CoffeeProduct[]>([]);
  const [usersList, setUsersList] = useState<UserProfile[]>([]);

  // Search & Filters for Requests
  const [reqSearch, setReqSearch] = useState<string>('');
  const [reqStatusFilter, setReqStatusFilter] = useState<string>('All');

  // Search & Filters for Coffees
  const [coffeeSearch, setCoffeeSearch] = useState<string>('');
  const [coffeeOriginFilter, setCoffeeOriginFilter] = useState<string>('All');

  // Request Management Modal
  const [selectedRequest, setSelectedRequest] = useState<CoffeeRequest | null>(null);
  const [newStatusInput, setNewStatusInput] = useState<RequestStatus>('Submitted');
  const [customStatusMsg, setCustomStatusMsg] = useState<string>('');
  const [staffNoteInput, setStaffNoteInput] = useState<string>('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Coffee Edit / Create Modal
  const [editingCoffee, setEditingCoffee] = useState<CoffeeProduct | null>(null);
  const [isNewCoffee, setIsNewCoffee] = useState<boolean>(false);
  const [coffeeModalOpen, setCoffeeModalOpen] = useState<boolean>(false);

  // Form fields for coffee edit
  const [cName, setCName] = useState<string>('');
  const [cOrigin, setCOrigin] = useState<string>('Yirgacheffe');
  const [cRegion, setCRegion] = useState<string>('');
  const [cGrade, setCGrade] = useState<'Grade 1' | 'Grade 2'>('Grade 1');
  const [cCupScore, setCCupScore] = useState<string>('Above 85');
  const [cProcessing, setCProcessing] = useState<'Washed' | 'Sun-Dried / Natural'>('Washed');
  const [cAltitude, setCAltitude] = useState<string>('1,800–2,200 masl');
  const [cAltitudeType, setCAltitudeType] = useState<CharacteristicType>('typical_regional');
  const [cVariety, setCVariety] = useState<string>('Ethiopian heirloom/local varieties');
  const [cVarietyType, setCVarietyType] = useState<CharacteristicType>('typical_regional');
  const [cFlavor, setCFlavor] = useState<string>('Floral, citrus, sweet');
  const [cFlavorType, setCFlavorType] = useState<CharacteristicType>('typical_regional');
  const [cAvailability, setCAvailability] = useState<CoffeeAvailability>('Available for Export');
  const [cDescription, setCDescription] = useState<string>('');
  const [cImage, setCImage] = useState<string>('');

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRequests(getAllRequests());
    setCoffees(getAllCoffees());
    if (user.role === 'ADMIN') {
      setUsersList(getAllUsers());
    }
  };

  // Open Request Modal
  const handleOpenRequestModal = (req: CoffeeRequest) => {
    setSelectedRequest(req);
    setNewStatusInput(req.status);
    setCustomStatusMsg('');
    setStaffNoteInput(req.staffNotes || '');
    setActionSuccessMsg(null);
  };

  // Update Status handler
  const handleApplyStatusChange = () => {
    if (!selectedRequest) return;
    try {
      const updated = updateRequestStatus(
        selectedRequest.referenceNumber,
        newStatusInput,
        customStatusMsg,
        staffNoteInput
      );
      setSelectedRequest(updated);
      loadData();
      setActionSuccessMsg('Status updated and logged to request timeline.');
      setTimeout(() => setActionSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  // Save Staff Notes only
  const handleSaveStaffNotes = () => {
    if (!selectedRequest) return;
    try {
      const updated = updateRequestStaffNotes(selectedRequest.referenceNumber, staffNoteInput);
      setSelectedRequest(updated);
      loadData();
      setActionSuccessMsg('Internal staff notes saved.');
      setTimeout(() => setActionSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save staff notes');
    }
  };

  // Open Edit Coffee Modal
  const handleOpenEditCoffee = (coffee: CoffeeProduct) => {
    setIsNewCoffee(false);
    setEditingCoffee(coffee);
    setCName(coffee.name);
    setCOrigin(coffee.origin);
    setCRegion(coffee.region);
    setCGrade(coffee.grade);
    setCCupScore(coffee.cupScoreBaseline);
    setCProcessing(coffee.processingMethod);
    setCAltitude(coffee.altitude);
    setCAltitudeType(coffee.altitudeType);
    setCVariety(coffee.variety);
    setCVarietyType(coffee.varietyType);
    setCFlavor(coffee.flavorProfile);
    setCFlavorType(coffee.flavorProfileType);
    setCAvailability(coffee.availability);
    setCDescription(coffee.description);
    setCImage(coffee.image);
    setCoffeeModalOpen(true);
  };

  // Open New Coffee Modal
  const handleOpenNewCoffee = () => {
    setIsNewCoffee(true);
    setEditingCoffee(null);
    setCName('');
    setCOrigin('Yirgacheffe');
    setCRegion('Gedeo Zone, Southern Ethiopia');
    setCGrade('Grade 1');
    setCCupScore('Above 85');
    setCProcessing('Washed');
    setCAltitude('1,800–2,200 masl');
    setCAltitudeType('typical_regional');
    setCVariety('Ethiopian heirloom/local varieties');
    setCVarietyType('typical_regional');
    setCFlavor('Citrus, floral, jasmine, bright acidity');
    setCFlavorType('typical_regional');
    setCAvailability('Available for Export');
    setCDescription('Grade 1 specialty export lot prepared according to Ethiopian export quality baseline.');
    setCImage(IMAGE_PATHS.coffee[0]);
    setCoffeeModalOpen(true);
  };

  // Save Coffee handler
  const handleSaveCoffeeForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName.trim()) {
      alert('Coffee name is required.');
      return;
    }

    const coffeeId = isNewCoffee
      ? `mgg-${cOrigin.toLowerCase().replace(/\s+/g, '-')}-${cProcessing.toLowerCase().includes('wash') ? 'washed' : 'natural'}-${Date.now().toString().slice(-4)}`
      : editingCoffee!.id;

    const newCoffeeObj: CoffeeProduct = {
      id: coffeeId,
      name: cName.trim(),
      origin: cOrigin,
      region: cRegion.trim() || `${cOrigin} Growing Zone, Ethiopia`,
      grade: cGrade,
      cupScoreBaseline: cCupScore,
      processingMethod: cProcessing,
      altitude: cAltitude.trim() || 'Information available upon request',
      altitudeType: cAltitudeType,
      variety: cVariety.trim() || 'Information available upon request',
      varietyType: cVarietyType,
      flavorProfile: cFlavor.trim() || 'Information available upon request',
      flavorProfileType: cFlavorType,
      availability: cAvailability,
      harvest: 'Current harvest season (Details upon request)',
      description: cDescription.trim() || 'Specialty export coffee lot.',
      image: cImage.trim() || IMAGE_PATHS.coffee[0]
    };

    saveCoffee(newCoffeeObj);
    setCoffeeModalOpen(false);
    loadData();
  };

  // Quick availability toggle
  const handleToggleAvailability = (id: string, current: CoffeeAvailability) => {
    const next: Record<CoffeeAvailability, CoffeeAvailability> = {
      'Available for Export': 'Upon Request',
      'Upon Request': 'Processing',
      Processing: 'Harvesting',
      Harvesting: 'Available for Export'
    };
    const target = next[current] || 'Available for Export';
    updateCoffeeAvailability(id, target);
    loadData();
  };

  // Delete coffee handler
  const handleDeleteCoffee = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the active catalog?`)) {
      deleteCoffee(id);
      loadData();
    }
  };

  // Reset catalog
  const handleResetCatalog = () => {
    if (confirm('Reset entire coffee catalog back to initial confirmed lots?')) {
      resetCatalogToDefaults();
      loadData();
    }
  };

  // Change user role (Admin only)
  const handleRoleChange = (userId: string, targetRole: UserRole) => {
    changeUserRole(userId, targetRole);
    loadData();
  };

  // Filtered Requests
  const filteredRequests = requests.filter((r) => {
    if (reqStatusFilter !== 'All' && r.status !== reqStatusFilter) return false;
    if (reqSearch.trim()) {
      const q = reqSearch.toLowerCase();
      const matchRef = r.referenceNumber.toLowerCase().includes(q);
      const matchComp = r.formData.companyName?.toLowerCase().includes(q);
      const matchBuyer = r.formData.buyerName?.toLowerCase().includes(q);
      const matchOrigin = r.formData.origin?.toLowerCase().includes(q);
      const matchEmail = r.formData.email?.toLowerCase().includes(q);
      if (!matchRef && !matchComp && !matchBuyer && !matchOrigin && !matchEmail) {
        return false;
      }
    }
    return true;
  });

  // Filtered Coffees
  const filteredCoffees = coffees.filter((c) => {
    if (coffeeOriginFilter !== 'All' && c.origin !== coffeeOriginFilter) return false;
    if (coffeeSearch.trim()) {
      const q = coffeeSearch.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.origin.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Status options
  const statusOptions: RequestStatus[] = [
    'Submitted',
    'Under Review',
    'Quote Prepared',
    'Buyer Confirmation',
    'Processing',
    'Ready for Export',
    'Completed'
  ];

  return (
    <div className="bg-[#FAF5EE] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="bg-[#14281D] text-[#FAF5EE] rounded-3xl p-6 sm:p-8 border border-[#2A4434] shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#C8963E] text-[#14281D]">
                  {user.role === 'ADMIN' ? '⚡ Administrator Operations' : '📋 Export Staff Management'}
                </span>
                <span className="text-xs text-[#A8987E]">
                  Mesfin Girma Gemeda Coffee Supplies & Exporter
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#EADFCB]">
                Export Operations & Coffee Control
              </h1>
              <p className="text-xs sm:text-sm text-[#C2B59B]">
                Export capacity: <strong>Up to 100 containers</strong> • Quality Baseline: <strong>Grade 1, Cup scores above 85</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateHome}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1F3B2B] hover:bg-[#284D38] text-[#E0D8C7] transition-colors cursor-pointer"
              >
                View Live Website
              </button>
            </div>
          </div>
        </div>

        {/* Metric Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A7459] block">
              Total Inquiries
            </span>
            <div className="text-2xl font-bold font-serif text-[#14281D] mt-1">
              {requests.length}
            </div>
            <span className="text-[10px] text-[#7A664E]">All buyer submissions</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-700 block">
              Needs Review
            </span>
            <div className="text-2xl font-bold font-serif text-amber-800 mt-1">
              {requests.filter((r) => r.status === 'Submitted' || r.status === 'Under Review').length}
            </div>
            <span className="text-[10px] text-[#7A664E]">Pending quote staging</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-700 block">
              Quotes & Processing
            </span>
            <div className="text-2xl font-bold font-serif text-blue-800 mt-1">
              {requests.filter((r) => r.status === 'Quote Prepared' || r.status === 'Buyer Confirmation' || r.status === 'Processing').length}
            </div>
            <span className="text-[10px] text-[#7A664E]">Active commercial steps</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-700 block">
              Export Ready / Done
            </span>
            <div className="text-2xl font-bold font-serif text-emerald-800 mt-1">
              {requests.filter((r) => r.status === 'Ready for Export' || r.status === 'Completed').length}
            </div>
            <span className="text-[10px] text-[#7A664E]">Staged or shipped</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A7459] block">
              Catalog Lots
            </span>
            <div className="text-2xl font-bold font-serif text-[#14281D] mt-1">
              {coffees.length}
            </div>
            <span className="text-[10px] text-[#7A664E]">Grade 1 verified lots</span>
          </div>
        </div>

        {/* Tab Selection */}
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
            <span>Buyer Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coffees')}
            className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === 'coffees'
                ? 'border-[#14281D] text-[#14281D]'
                : 'border-transparent text-[#7A664E] hover:text-[#14281D]'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Coffee Lots Management ({coffees.length})</span>
          </button>

          {user.role === 'ADMIN' && (
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 px-4 font-semibold text-sm transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === 'users'
                  ? 'border-[#14281D] text-[#14281D]'
                  : 'border-transparent text-[#7A664E] hover:text-[#14281D]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>User & Team Admin ({usersList.length})</span>
            </button>
          )}
        </div>

        {/* TAB 1: REQUESTS MANAGEMENT */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {/* Search & Status Filter bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8A7459] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={reqSearch}
                  onChange={(e) => setReqSearch(e.target.value)}
                  placeholder="Search reference #, company name, buyer, or origin..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF5EE] border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421] placeholder-[#8A7459] focus:outline-none focus:ring-1 focus:ring-[#14281D]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs text-[#7A664E] font-medium shrink-0 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Filter Status:
                </span>
                {['All', ...statusOptions].map((st) => (
                  <button
                    key={st}
                    onClick={() => setReqStatusFilter(st)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
                      reqStatusFilter === st
                        ? 'bg-[#14281D] text-[#FAF5EE]'
                        : 'bg-[#FAF5EE] text-[#7A664E] hover:bg-[#EDE5D6]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Requests Table / Card list */}
            {filteredRequests.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E2D6C2]">
                <FileText className="w-10 h-10 text-[#8A7459] mx-auto mb-2" />
                <h4 className="font-bold text-[#14281D] text-base">No Requests Found</h4>
                <p className="text-xs text-[#7A664E] mt-1">Try clearing your filters or search keywords.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[#E2D6C2] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF5EE] text-[#7A664E] uppercase tracking-wider font-semibold border-b border-[#E2D6C2]">
                      <tr>
                        <th className="py-3.5 px-4">Ref # & Date</th>
                        <th className="py-3.5 px-4">Buyer & Company</th>
                        <th className="py-3.5 px-4">Coffee Requirements</th>
                        <th className="py-3.5 px-4">Volume & Destination</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE7D8]">
                      {filteredRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-[#FAF5EE]/70 transition-colors">
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="font-mono font-bold text-[#14281D] block">
                              {req.referenceNumber}
                            </span>
                            <span className="text-[10px] text-[#8A7459]">
                              {new Date(req.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <strong className="text-[#14281D] block">{req.formData.companyName}</strong>
                            <span className="text-[#6B5740] block">{req.formData.buyerName}</span>
                            <span className="text-[10px] text-[#8A7459]">{req.formData.email}</span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-semibold text-[#14281D]">
                              {req.formData.origin} • {req.formData.processing}
                            </div>
                            <div className="text-[11px] text-[#6B5740]">
                              {req.formData.grade} (Baseline {req.formData.minCupScore || '85+'})
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-medium text-[#14281D]">
                              {req.formData.quantityValue || req.formData.quantityType}
                            </div>
                            <div className="text-[10px] text-[#7A664E]">
                              {req.formData.destinationCountry} {req.formData.destinationPort ? `(${req.formData.destinationPort})` : ''}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <StatusBadge status={req.status} />
                          </td>

                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleOpenRequestModal(req)}
                              className="px-3 py-1.5 rounded-lg bg-[#C8963E] hover:bg-[#B38130] text-[#14281D] font-bold text-xs shadow-xs transition-colors cursor-pointer"
                            >
                              Manage Request
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COFFEE LOTS MANAGEMENT */}
        {activeTab === 'coffees' && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8A7459] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={coffeeSearch}
                  onChange={(e) => setCoffeeSearch(e.target.value)}
                  placeholder="Search coffee name or region..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF5EE] border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={coffeeOriginFilter}
                  onChange={(e) => setCoffeeOriginFilter(e.target.value)}
                  className="px-3 py-2 bg-[#FAF5EE] border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421] cursor-pointer"
                >
                  <option value="All">All Origins</option>
                  <option value="Yirgacheffe">Yirgacheffe</option>
                  <option value="Guji">Guji</option>
                  <option value="Sidama">Sidama</option>
                  <option value="Shakiso">Shakiso</option>
                  <option value="Arsi">Arsi</option>
                  <option value="Harar">Harar</option>
                </select>

                <Button variant="primary" size="sm" onClick={handleOpenNewCoffee}>
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Coffee Lot</span>
                </Button>

                <button
                  onClick={handleResetCatalog}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#FAF5EE] hover:bg-[#ECE4D4] text-[#7A664E] border border-[#D0C2AB] flex items-center gap-1 transition-colors cursor-pointer"
                  title="Reset to confirmed default lots"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Coffee Lots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoffees.map((coffee) => (
                <div
                  key={coffee.id}
                  className="bg-white rounded-2xl border border-[#E2D6C2] overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 w-full relative bg-[#14281D]">
                      <img
                        src={coffee.image}
                        alt={coffee.name}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute top-3 left-3 flex gap-1">
                        <GradeBadge grade={coffee.grade} size="sm" />
                        <ProcessingBadge method={coffee.processingMethod} size="sm" />
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-[#C8963E] uppercase tracking-wider block">
                          {coffee.origin} • {coffee.region.split('(')[0].trim()}
                        </span>
                        <h4 className="text-base font-serif font-bold text-[#14281D]">
                          {coffee.name}
                        </h4>
                      </div>

                      {/* Characteristics with verified / typical badge indicators */}
                      <div className="space-y-1.5 text-xs text-[#5A4630] bg-[#FAF5EE] p-3 rounded-xl border border-[#E8DFC8]">
                        <div>
                          <span className="font-semibold text-[#14281D]">Altitude:</span> {coffee.altitude}{' '}
                          {coffee.altitudeType === 'typical_regional' ? (
                            <span className="text-[10px] text-[#8A7459] italic">(Typical Regional)</span>
                          ) : (
                            <span className="text-[10px] text-emerald-700 font-bold">(Verified Lot)</span>
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-[#14281D]">Varieties:</span> {coffee.variety}{' '}
                          {coffee.varietyType === 'typical_regional' ? (
                            <span className="text-[10px] text-[#8A7459] italic">(Typical Regional)</span>
                          ) : (
                            <span className="text-[10px] text-emerald-700 font-bold">(Verified Lot)</span>
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-[#14281D]">Flavor:</span> {coffee.flavorProfile}{' '}
                          {coffee.flavorProfileType === 'typical_regional' ? (
                            <span className="text-[10px] text-[#8A7459] italic">(Typical Regional)</span>
                          ) : (
                            <span className="text-[10px] text-emerald-700 font-bold">(Verified Lot)</span>
                          )}
                        </div>
                      </div>

                      {/* Availability status toggle pill */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-semibold text-[#8A7459]">Availability:</span>
                        <button
                          onClick={() => handleToggleAvailability(coffee.id, coffee.availability)}
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                          title="Click to cycle availability status"
                        >
                          <AvailabilityBadge status={coffee.availability} size="sm" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-5 pt-0 border-t border-[#F2ECE1] mt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onViewCoffeeDetail(coffee.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF5EE] hover:bg-[#ECE4D4] text-[#14281D] cursor-pointer"
                    >
                      Preview
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditCoffee(coffee)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#14281D] hover:bg-[#1E3B2B] text-[#FAF5EE] flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit Lot</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCoffee(coffee.id, coffee.name)}
                        className="p-1.5 text-xs rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                        title="Delete Lot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: USER & TEAM ADMIN (ADMIN ONLY) */}
        {activeTab === 'users' && user.role === 'ADMIN' && (
          <div className="bg-white rounded-3xl border border-[#E2D6C2] p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC8]">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#14281D]">
                  Platform User Directory & Role Assignment
                </h3>
                <p className="text-xs text-[#7A664E]">
                  Manage registered international buyers, export staff specialists, and system administrators.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF5EE] text-[#7A664E] uppercase tracking-wider font-semibold border-b border-[#E2D6C2]">
                  <tr>
                    <th className="py-3 px-4">User / Contact</th>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Email & Phone</th>
                    <th className="py-3 px-4">Country</th>
                    <th className="py-3 px-4">Current Role</th>
                    <th className="py-3 px-4 text-right">Assign Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE7D8]">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-[#FAF5EE]/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <strong className="text-[#14281D] block">{u.buyerName}</strong>
                        <span className="text-[10px] text-[#8A7459]">ID: {u.id}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#14281D]">
                        {u.companyName}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-[#14281D]">{u.email}</div>
                        <div className="text-[10px] text-[#8A7459]">{u.phoneWhatsApp}</div>
                      </td>
                      <td className="py-3.5 px-4">{u.country}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.role === 'ADMIN'
                              ? 'bg-purple-100 text-purple-800'
                              : u.role === 'STAFF'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                          className="bg-[#FAF5EE] border border-[#D0C2AB] rounded-lg px-2 py-1 text-xs font-semibold text-[#14281D] cursor-pointer"
                        >
                          <option value="BUYER">BUYER</option>
                          <option value="STAFF">STAFF</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* REQUEST DETAIL & STATUS MANAGEMENT MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF5EE] rounded-3xl border border-[#D9CDB8] shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-[#E8DFC8] flex items-center justify-between sticky top-0 bg-[#FAF5EE] z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#14281D] bg-[#ECE4D4] px-2.5 py-0.5 rounded border border-[#D0C2AB]">
                    {selectedRequest.referenceNumber}
                  </span>
                  <StatusBadge status={selectedRequest.status} />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#14281D] mt-1">
                  Export Coffee Request Management
                </h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-full bg-[#ECE4D4] hover:bg-[#D9CDB8] text-[#14281D] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notification message */}
            {actionSuccessMsg && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}

            <div className="p-6 space-y-6 text-xs">
              {/* Buyer Contact Information */}
              <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold uppercase tracking-wider text-[#C8963E] text-[11px]">
                    Buyer Contact Information
                  </h4>
                  <a
                    href={`https://wa.me/${selectedRequest.formData.phoneWhatsApp?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#25D366] font-semibold hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Buyer WhatsApp</span>
                  </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[#8A7459] block">Company</span>
                    <strong className="text-[#14281D] text-sm block">{selectedRequest.formData.companyName}</strong>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Contact Representative</span>
                    <strong className="text-[#14281D] text-sm block">{selectedRequest.formData.buyerName}</strong>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Email</span>
                    <strong className="text-[#14281D] block">{selectedRequest.formData.email}</strong>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">WhatsApp / Phone</span>
                    <strong className="text-[#14281D] block">{selectedRequest.formData.phoneWhatsApp}</strong>
                  </div>
                </div>
              </div>

              {/* Coffee Specifications */}
              <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] space-y-3">
                <h4 className="font-bold uppercase tracking-wider text-[#C8963E] text-[11px]">
                  Requested Coffee Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[#8A7459] block">Requested Origin</span>
                    <strong className="text-sm text-[#14281D] block">{selectedRequest.formData.origin}</strong>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Processing</span>
                    <strong className="text-sm text-[#14281D] block">{selectedRequest.formData.processing}</strong>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Grade</span>
                    <strong className="text-sm text-[#14281D] block">{selectedRequest.formData.grade}</strong>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Requested Volume</span>
                    <strong className="text-sm text-[#14281D] block">
                      {selectedRequest.formData.quantityValue || selectedRequest.formData.quantityType}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Destination</span>
                    <strong className="text-[#14281D] block">
                      {selectedRequest.formData.destinationCountry} {selectedRequest.formData.destinationPort ? `(${selectedRequest.formData.destinationPort})` : ''}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#8A7459] block">Date Received</span>
                    <span className="text-[#14281D] block">{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {selectedRequest.formData.additionalNotes && (
                  <div className="pt-2 border-t border-[#F2ECE1]">
                    <span className="text-[#8A7459] block font-semibold">Buyer Requirements Note:</span>
                    <p className="text-[#14281D] mt-0.5">{selectedRequest.formData.additionalNotes}</p>
                  </div>
                )}
              </div>

              {/* STATUS CHANGER PANEL */}
              <div className="bg-white p-5 rounded-2xl border-2 border-[#14281D]/20 space-y-4">
                <h4 className="font-bold uppercase tracking-wider text-[#14281D] text-xs flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C8963E]" />
                  <span>Update Request Lifecycle Status</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                      New Status Step
                    </label>
                    <select
                      value={newStatusInput}
                      onChange={(e) => setNewStatusInput(e.target.value as RequestStatus)}
                      className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#D0C2AB] rounded-xl text-xs font-bold text-[#14281D]"
                    >
                      {statusOptions.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                      Custom Timeline Message (Optional)
                    </label>
                    <input
                      type="text"
                      value={customStatusMsg}
                      onChange={(e) => setCustomStatusMsg(e.target.value)}
                      placeholder="e.g. Sample 100g green dispatched via DHL tracking #..."
                      className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" size="md" onClick={handleApplyStatusChange}>
                    <span>Apply Status Change & Append Timeline</span>
                  </Button>
                </div>
              </div>

              {/* INTERNAL STAFF PRIVATE NOTES */}
              <div className="bg-[#FAF5EE] p-5 rounded-2xl border border-[#D9CDB8] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold uppercase tracking-wider text-[#14281D] text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C8963E]" />
                    <span>Internal Mesfin Girma Gemeda Export Notes</span>
                  </h4>
                  <span className="text-[10px] text-[#7A664E] italic">Private • Visible only to Staff & Admin</span>
                </div>
                <textarea
                  rows={3}
                  value={staffNoteInput}
                  onChange={(e) => setStaffNoteInput(e.target.value)}
                  placeholder="Record internal lot allocations, cupping scores, dry mill staging dates, proforma terms..."
                  className="w-full p-3 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421] focus:outline-none focus:ring-1 focus:ring-[#14281D]"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveStaffNotes}
                    className="px-3.5 py-1.5 rounded-lg bg-[#14281D] hover:bg-[#1E3B2B] text-[#FAF5EE] font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5 text-[#C8963E]" />
                    <span>Save Internal Note</span>
                  </button>
                </div>
              </div>

              {/* Timeline History */}
              <div className="bg-white p-4 rounded-2xl border border-[#E2D6C2] space-y-3">
                <h4 className="font-bold uppercase tracking-wider text-[#C8963E] text-[11px]">
                  Request Timeline Audit Trail
                </h4>
                <div className="space-y-2.5">
                  {selectedRequest.timeline.map((event, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <div className="w-2 h-2 rounded-full bg-[#14281D] mt-1 shrink-0" />
                      <div>
                        <span className="font-bold text-[#14281D]">{event.status}</span>
                        <span className="text-[10px] text-[#8A7459] ml-2">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                        <p className="text-[#6B5740] mt-0.5">{event.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / CREATE COFFEE LOT MODAL */}
      {coffeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF5EE] rounded-3xl border border-[#D9CDB8] shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E8DFC8] flex items-center justify-between sticky top-0 bg-[#FAF5EE] z-10">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#14281D]">
                  {isNewCoffee ? 'Add New Ethiopian Specialty Coffee Lot' : `Edit Lot: ${cName}`}
                </h3>
                <p className="text-xs text-[#7A664E]">
                  Staff management with strict distinction between typical regional characteristics and verified lot data.
                </p>
              </div>
              <button
                onClick={() => setCoffeeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#ECE4D4] hover:bg-[#D9CDB8] text-[#14281D] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Strict data rule banner */}
            <div className="mx-6 mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Data Accuracy Rule:</strong> Regional altitude, varieties, and flavor notes must remain labeled
                "Typical Regional Characteristics" unless specifically cupped and verified for this individual company lot.
              </div>
            </div>

            <form onSubmit={handleSaveCoffeeForm} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Coffee Lot Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={cName}
                    onChange={(e) => setCName(e.target.value)}
                    placeholder="e.g. Yirgacheffe Washed Grade 1"
                    className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Origin *
                  </label>
                  <select
                    value={cOrigin}
                    onChange={(e) => setCOrigin(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                  >
                    <option value="Yirgacheffe">Yirgacheffe</option>
                    <option value="Guji">Guji</option>
                    <option value="Sidama">Sidama</option>
                    <option value="Shakiso">Shakiso</option>
                    <option value="Arsi">Arsi</option>
                    <option value="Harar">Harar</option>
                    <option value="Nekemte">Nekemte (Collaboration)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Grade Baseline *
                  </label>
                  <select
                    value={cGrade}
                    onChange={(e) => setCGrade(e.target.value as 'Grade 1' | 'Grade 2')}
                    className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                  >
                    <option value="Grade 1">Grade 1 (Company Baseline)</option>
                    <option value="Grade 2">Grade 2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Cup Score Baseline *
                  </label>
                  <input
                    type="text"
                    required
                    value={cCupScore}
                    onChange={(e) => setCCupScore(e.target.value)}
                    placeholder="e.g. Above 85"
                    className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Processing Method *
                  </label>
                  <select
                    value={cProcessing}
                    onChange={(e) => setCProcessing(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                  >
                    <option value="Washed">Washed</option>
                    <option value="Sun-Dried / Natural">Sun-Dried / Natural</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                  Region / Specific Zone
                </label>
                <input
                  type="text"
                  value={cRegion}
                  onChange={(e) => setCRegion(e.target.value)}
                  placeholder="e.g. Gedeo Zone, Southern Ethiopia (Company Farm Site)"
                  className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                />
              </div>

              {/* Altitude with Characteristic Type Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end p-3 bg-white rounded-xl border border-[#E2D6C2]">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Altitude
                  </label>
                  <input
                    type="text"
                    value={cAltitude}
                    onChange={(e) => setCAltitude(e.target.value)}
                    placeholder="e.g. 1,800–2,200 masl"
                    className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#D0C2AB] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8A7459] mb-1">
                    Classification
                  </label>
                  <select
                    value={cAltitudeType}
                    onChange={(e) => setCAltitudeType(e.target.value as CharacteristicType)}
                    className="w-full px-2.5 py-1.5 bg-[#FAF5EE] border border-[#D0C2AB] rounded-lg text-xs font-medium"
                  >
                    <option value="typical_regional">Typical Regional</option>
                    <option value="verified_lot">Verified Lot</option>
                  </select>
                </div>
              </div>

              {/* Variety with Characteristic Type Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end p-3 bg-white rounded-xl border border-[#E2D6C2]">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Botanical Varieties
                  </label>
                  <input
                    type="text"
                    value={cVariety}
                    onChange={(e) => setCVariety(e.target.value)}
                    placeholder="e.g. Ethiopian heirloom/local varieties"
                    className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#D0C2AB] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8A7459] mb-1">
                    Classification
                  </label>
                  <select
                    value={cVarietyType}
                    onChange={(e) => setCVarietyType(e.target.value as CharacteristicType)}
                    className="w-full px-2.5 py-1.5 bg-[#FAF5EE] border border-[#D0C2AB] rounded-lg text-xs font-medium"
                  >
                    <option value="typical_regional">Typical Regional</option>
                    <option value="verified_lot">Verified Lot</option>
                  </select>
                </div>
              </div>

              {/* Flavor Profile with Characteristic Type Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end p-3 bg-white rounded-xl border border-[#E2D6C2]">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Flavor Profile Notes
                  </label>
                  <input
                    type="text"
                    value={cFlavor}
                    onChange={(e) => setCFlavor(e.target.value)}
                    placeholder="e.g. Floral, citrus, sweet, tea-like"
                    className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#D0C2AB] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#8A7459] mb-1">
                    Classification
                  </label>
                  <select
                    value={cFlavorType}
                    onChange={(e) => setCFlavorType(e.target.value as CharacteristicType)}
                    className="w-full px-2.5 py-1.5 bg-[#FAF5EE] border border-[#D0C2AB] rounded-lg text-xs font-medium"
                  >
                    <option value="typical_regional">Typical Regional</option>
                    <option value="verified_lot">Verified Lot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Availability Status
                  </label>
                  <select
                    value={cAvailability}
                    onChange={(e) => setCAvailability(e.target.value as CoffeeAvailability)}
                    className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                  >
                    <option value="Available for Export">Available for Export</option>
                    <option value="Upon Request">Upon Request</option>
                    <option value="Processing">Processing</option>
                    <option value="Harvesting">Harvesting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={cImage}
                    onChange={(e) => setCImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D2F1F] mb-1">
                  Lot Description
                </label>
                <textarea
                  rows={2}
                  value={cDescription}
                  onChange={(e) => setCDescription(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D0C2AB] rounded-xl text-xs text-[#1E2421]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E8DFC8]">
                <button
                  type="button"
                  onClick={() => setCoffeeModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#7A664E] hover:text-[#14281D] cursor-pointer"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="md">
                  <span>{isNewCoffee ? 'Create Coffee Lot' : 'Save Changes'}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
