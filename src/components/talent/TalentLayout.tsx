
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { TalentNavigation } from '@/components/talent/TalentNavigation';

interface TalentLayoutProps {
  activeTab: string;
  children: React.ReactNode;
}

export const TalentLayout: React.FC<TalentLayoutProps> = ({ activeTab: initialTab, children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [currentTab, setCurrentTab] = useState(initialTab);
  
  // Sync the currentTab state with the location on mount and when location changes
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    // The last segment should be the tab name
    const tabFromUrl = pathSegments[pathSegments.length - 1];
    
    // Only update if it's different from current tab
    if (tabFromUrl && tabFromUrl !== currentTab) {
      setCurrentTab(tabFromUrl);
    }
  }, [location.pathname]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (user?.role !== 'user') {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, user, navigate]);
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };
  
  // Show loading while checking authentication
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Top Navigation Bar */}
      <SharedNavbar />
      
      {/* Main Layout with Sidebar/Bottom Nav */}
      <div className="flex w-full">
        {/* Talent Navigation (Sidebar on desktop, Bottom Nav on mobile) */}
        <TalentNavigation activeTab={currentTab} onTabChange={handleTabChange} />
        
        {/* Main Content Area */}
        <main className={cn(
          "flex-1 min-h-screen",
          isMobile ? "pb-20" : "md:ml-16 lg:ml-64", // Space for navigation
          "pt-16" // Space for navbar
        )}>
          <div className="container max-w-4xl px-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
