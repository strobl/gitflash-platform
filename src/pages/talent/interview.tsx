
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { TalentNavigation } from '@/components/talent/TalentNavigation';
import TalentInterviewPanel from '@/components/talent/TalentInterviewPanel';

export default function TalentInterviewPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
    // Redirect to dashboard if not a talent
    else if (!isLoading && user?.role !== 'user') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, user, navigate]);
  
  // Show loading while checking authentication
  if (isLoading || !isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Top Navigation Bar */}
      <SharedNavbar />
      
      {/* Main Layout with Sidebar/Bottom Nav */}
      <div className="flex w-full">
        {/* Talent Navigation (Sidebar on desktop, Bottom Nav on mobile) */}
        <TalentNavigation activeTab="interview" onTabChange={() => {}} />
        
        {/* Main Content Area */}
        <main className={cn(
          "flex-1 min-h-screen",
          isMobile ? "pb-20" : "md:ml-16 lg:ml-64", // Space for navigation
          "pt-16" // Space for navbar
        )}>
          <div className="container max-w-4xl px-4">
            <TalentInterviewPanel />
          </div>
        </main>
      </div>
    </div>
  );
}
