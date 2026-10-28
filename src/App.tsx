import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OurCoffeePage } from './pages/OurCoffeePage';
import { CoffeeDetailPage } from './pages/CoffeeDetailPage';
import { OriginExplorerPage } from './pages/OriginExplorerPage';
import { BuildCoffeePage } from './pages/BuildCoffeePage';
import { CoffeeMatchPage } from './pages/CoffeeMatchPage';
import { TrackRequestPage } from './pages/TrackRequestPage';
import { LocationsPage } from './pages/LocationsPage';
import { ProcessPage } from './pages/ProcessPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { ContactPage } from './pages/ContactPage';
import { AuthPage } from './pages/AuthPage';
import { BuyerDashboardPage } from './pages/BuyerDashboardPage';
import { StaffDashboardPage } from './pages/StaffDashboardPage';
import { InquiryModal } from './components/common/InquiryModal';
import { BuildCoffeeFormData, UserProfile } from './types';
import { getCurrentUser, logoutUser } from './services/authService';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getCurrentUser());
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<string>('mgg-yirgacheffe-washed-g1');
  const [originFilterForCatalog, setOriginFilterForCatalog] = useState<string>('All');
  const [trackingReference, setTrackingReference] = useState<string>('');
  
  // Build coffee context
  const [buildCoffeeContext, setBuildCoffeeContext] = useState<{
    coffeeId?: string;
    coffeeName?: string;
    origin?: string;
  }>({});

  // Match engine state
  const [matchRequirements, setMatchRequirements] = useState<BuildCoffeeFormData>({
    origin: 'Not sure',
    processing: 'Either',
    grade: 'Grade 1',
    minCupScore: '85+',
    quantityType: 'Containers',
    quantityValue: '1 Container',
    destinationCountry: '',
    companyName: '',
    buyerName: '',
    email: '',
    phoneWhatsApp: '',
    country: ''
  });

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [inquiryContext, setInquiryContext] = useState<{ coffeeName?: string; origin?: string }>({});

  // Keep currentUser synced
  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [activePage]);

  // Sync hash & pathname routing on initial load and route changes
  useEffect(() => {
    const handleRouteChange = () => {
      // Check hash first, then pathname as fallback
      const hashStr = window.location.hash.replace(/^#\/?/, '').trim();
      const pathStr = window.location.pathname.replace(/^\//, '').trim();
      const rawRoute = hashStr || pathStr;

      if (!rawRoute || rawRoute === '/' || rawRoute === 'home') {
        setActivePage('home');
        return;
      }

      if (rawRoute.startsWith('coffee/')) {
        const id = rawRoute.replace('coffee/', '');
        setSelectedCoffeeId(id);
        setActivePage('coffee-detail');
      } else if (rawRoute.startsWith('track/')) {
        const ref = rawRoute.replace('track/', '');
        setTrackingReference(ref);
        setActivePage('track');
      } else if (rawRoute.startsWith('coffee') || rawRoute.startsWith('catalog')) {
        const queryIndex = rawRoute.indexOf('?');
        if (queryIndex !== -1) {
          const params = new URLSearchParams(rawRoute.slice(queryIndex));
          const origin = params.get('origin');
          if (origin) {
            setOriginFilterForCatalog(origin);
          }
        }
        setActivePage('coffee');
      } else if (rawRoute === 'buyer' || rawRoute === 'buyer-dashboard') {
        setActivePage('buyer-dashboard');
      } else if (rawRoute === 'staff' || rawRoute === 'staff-dashboard' || rawRoute === 'admin-dashboard') {
        setActivePage('staff-dashboard');
      } else if (
        [
          'home',
          'about',
          'origins',
          'build-coffee',
          'coffee-match',
          'track',
          'locations',
          'process',
          'sustainability',
          'contact',
          'login',
          'register'
        ].includes(rawRoute)
      ) {
        setActivePage(rawRoute);
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Update hash when activePage or parameters change
  const navigateTo = (
    page: string,
    params?: { coffeeId?: string; origin?: string; ref?: string; coffeeName?: string }
  ) => {
    if (page === 'coffee-detail' && params?.coffeeId) {
      setSelectedCoffeeId(params.coffeeId);
      setActivePage('coffee-detail');
      window.location.hash = `coffee/${params.coffeeId}`;
    } else if (page === 'coffee') {
      if (params?.origin) {
        setOriginFilterForCatalog(params.origin);
        window.location.hash = `coffee?origin=${encodeURIComponent(params.origin)}`;
      } else {
        window.location.hash = 'coffee';
      }
      setActivePage('coffee');
    } else if (page === 'track') {
      if (params?.ref) {
        setTrackingReference(params.ref);
        window.location.hash = `track/${params.ref}`;
      } else {
        window.location.hash = 'track';
      }
      setActivePage('track');
    } else if (page === 'build-coffee') {
      if (params?.coffeeName || params?.origin) {
        setBuildCoffeeContext({
          coffeeId: params.coffeeId,
          coffeeName: params.coffeeName,
          origin: params.origin
        });
      }
      window.location.hash = 'build-coffee';
      setActivePage('build-coffee');
    } else {
      window.location.hash = page;
      setActivePage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (coffeeName?: string, origin?: string) => {
    setInquiryContext({ coffeeName, origin });
    setIsInquiryModalOpen(true);
  };

  const handleSelectOriginFromExplorer = (originName: string) => {
    navigateTo('coffee', { origin: originName });
  };

  const handleViewAllCoffees = () => {
    setOriginFilterForCatalog('All');
    navigateTo('coffee');
  };

  const handleViewCoffeeDetails = (coffeeId: string) => {
    navigateTo('coffee-detail', { coffeeId });
  };

  const handleRequestThisCoffee = (coffeeName: string, origin: string) => {
    navigateTo('build-coffee', { coffeeName, origin });
  };

  // Auth actions
  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.role === 'STAFF' || user.role === 'ADMIN') {
      navigateTo('staff-dashboard');
    } else {
      navigateTo('buyer-dashboard');
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    navigateTo('home');
  };

  const handleDashboardClick = () => {
    if (!currentUser) {
      navigateTo('login');
      return;
    }
    if (currentUser.role === 'STAFF' || currentUser.role === 'ADMIN') {
      navigateTo('staff-dashboard');
    } else {
      navigateTo('buyer-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1E2421] selection:bg-[#C8963E]/30 selection:text-[#14281D]">
      {/* Top Navbar with Authentication integration */}
      <Navbar
        activePage={activePage === 'coffee-detail' ? 'coffee' : activePage}
        setActivePage={(page) => {
          if (page === 'coffee') {
            setOriginFilterForCatalog('All');
          }
          navigateTo(page);
        }}
        onRequestClick={() => navigateTo('build-coffee')}
        currentUser={currentUser}
        onLoginClick={() => navigateTo('login')}
        onLogoutClick={handleLogout}
        onDashboardClick={handleDashboardClick}
      />

      {/* Main Page Body */}
      <main className="grow">
        {activePage === 'home' && (
          <HomePage
            setActivePage={(page) => navigateTo(page)}
            onRequestClick={() => navigateTo('build-coffee')}
            onViewCoffeeDetails={handleViewCoffeeDetails}
            onRequestCoffee={handleRequestThisCoffee}
            onSelectOrigin={handleSelectOriginFromExplorer}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            setActivePage={(page) => navigateTo(page)}
            onRequestClick={() => navigateTo('build-coffee')}
          />
        )}

        {activePage === 'coffee' && (
          <OurCoffeePage
            initialOriginFilter={originFilterForCatalog}
            onViewCoffeeDetails={handleViewCoffeeDetails}
            onRequestCoffee={handleRequestThisCoffee}
            onClearInitialOriginFilter={() => setOriginFilterForCatalog('All')}
          />
        )}

        {activePage === 'coffee-detail' && (
          <CoffeeDetailPage
            coffeeId={selectedCoffeeId}
            onBackToCatalog={() => navigateTo('coffee')}
            onSelectOrigin={(originName) => navigateTo('coffee', { origin: originName })}
            onRequestCoffee={handleRequestThisCoffee}
          />
        )}

        {activePage === 'origins' && (
          <OriginExplorerPage
            onSelectOriginToExplore={handleSelectOriginFromExplorer}
            onViewAllCoffees={handleViewAllCoffees}
            onViewCoffeeDetails={handleViewCoffeeDetails}
            onRequestClick={(originName) => navigateTo('build-coffee', { origin: originName })}
          />
        )}

        {/* DAY 3: BUILD YOUR COFFEE */}
        {activePage === 'build-coffee' && (
          <BuildCoffeePage
            initialCoffeeContext={buildCoffeeContext}
            onNavigateToMatchResults={(requirements) => {
              setMatchRequirements(requirements);
              navigateTo('coffee-match');
            }}
            onNavigateToTracking={(referenceNumber) => {
              navigateTo('track', { ref: referenceNumber });
            }}
            onNavigateToCatalog={() => navigateTo('coffee')}
          />
        )}

        {/* DAY 3: COFFEE MATCH ENGINE RESULTS */}
        {activePage === 'coffee-match' && (
          <CoffeeMatchPage
            requirements={matchRequirements}
            onBackToWizard={() => navigateTo('build-coffee')}
            onViewCoffeeDetails={handleViewCoffeeDetails}
            onRequestThisCoffee={handleRequestThisCoffee}
            onSubmitRequirementsDirectly={() => navigateTo('build-coffee')}
          />
        )}

        {/* DAY 3: REQUEST TRACKING */}
        {activePage === 'track' && (
          <TrackRequestPage
            initialReference={trackingReference}
            onNavigateToBuildCoffee={() => navigateTo('build-coffee')}
            onNavigateToCatalog={() => navigateTo('coffee')}
          />
        )}

        {/* DAY 4: AUTHENTICATION */}
        {(activePage === 'login' || activePage === 'register') && (
          <AuthPage
            initialMode={activePage === 'register' ? 'register' : 'login'}
            onAuthSuccess={handleAuthSuccess}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* DAY 4: BUYER DASHBOARD */}
        {activePage === 'buyer-dashboard' && (
          currentUser ? (
            <BuyerDashboardPage
              user={currentUser}
              onNavigateToBuildCoffee={(context) => {
                if (context?.coffeeName || context?.origin) {
                  navigateTo('build-coffee', {
                    coffeeName: context.coffeeName,
                    origin: context.origin
                  });
                } else {
                  navigateTo('build-coffee');
                }
              }}
              onNavigateToCatalog={() => navigateTo('coffee')}
              onNavigateToTracking={(ref) => navigateTo('track', { ref })}
              onViewCoffeeDetail={handleViewCoffeeDetails}
            />
          ) : (
            <AuthPage
              initialMode="login"
              onAuthSuccess={handleAuthSuccess}
              onNavigateHome={() => navigateTo('home')}
            />
          )
        )}

        {/* DAY 4: STAFF & ADMIN DASHBOARD */}
        {(activePage === 'staff-dashboard' || activePage === 'admin-dashboard') && (
          currentUser && (currentUser.role === 'STAFF' || currentUser.role === 'ADMIN') ? (
            <StaffDashboardPage
              user={currentUser}
              onViewCoffeeDetail={handleViewCoffeeDetails}
              onNavigateHome={() => navigateTo('home')}
            />
          ) : (
            <AuthPage
              initialMode="login"
              onAuthSuccess={handleAuthSuccess}
              onNavigateHome={() => navigateTo('home')}
            />
          )
        )}

        {activePage === 'locations' && (
          <LocationsPage
            onRequestClick={() => navigateTo('build-coffee')}
          />
        )}

        {activePage === 'process' && (
          <ProcessPage
            onRequestClick={() => navigateTo('build-coffee')}
          />
        )}

        {activePage === 'sustainability' && (
          <SustainabilityPage
            onRequestClick={() => navigateTo('build-coffee')}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={(page) => {
          if (page === 'coffee') setOriginFilterForCatalog('All');
          navigateTo(page);
        }}
        onRequestClick={() => navigateTo('build-coffee')}
      />

      {/* Direct Export Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialCoffeeName={inquiryContext.coffeeName}
        initialOrigin={inquiryContext.origin}
        onNavigateToTracking={(ref) => navigateTo('track', { ref })}
      />
    </div>
  );
}
