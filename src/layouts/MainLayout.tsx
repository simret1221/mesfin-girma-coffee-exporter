import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { UserProfile } from '../types';

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
  currentUser: UserProfile | null;
  onRequestClick: () => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onDashboardClick: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activePage,
  setActivePage,
  currentUser,
  onRequestClick,
  onLoginClick,
  onLogoutClick,
  onDashboardClick
}) => {
  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#14281D] flex flex-col font-sans selection:bg-[#C8963E]/30 selection:text-[#14281D]">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onRequestClick={onRequestClick}
        currentUser={currentUser}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        onDashboardClick={onDashboardClick}
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer
        setActivePage={setActivePage}
        onRequestClick={onRequestClick}
      />
    </div>
  );
};
