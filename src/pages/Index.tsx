
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRoleRedirectPath } from '@/utils/routingUtils';
import { HeroSection } from '@/components/home/HeroSection';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { VideoCallSection } from '@/components/home/VideoCallSection';
import { StatsSection } from '@/components/home/StatsSection';
import { JobListings } from '@/components/home/JobListings';
import { CallToActionSection } from '@/components/home/CallToActionSection';
import { Footer } from '@/components/home/Footer';
import { BannerSection } from '@/components/home/BannerSection';
import { Navbar } from '@/components/navigation/Navbar';

export default function Index() {
  const { isAuthenticated, isLoading, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for auth to finish loading before making decisions
    if (!isLoading && isAuthenticated && profile?.role) {
      // Redirect authenticated users to their role-specific dashboard
      const redirectPath = getRoleRedirectPath(profile.role);
      if (redirectPath !== '/login') {
        navigate(redirectPath, { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, profile, navigate]);

  // Show loading while auth is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  // Show landing page for non-authenticated users or users without a role
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <BannerSection />
        <BenefitsSection />
        <FeaturesSection />
        <VideoCallSection />
        <StatsSection />
        <JobListings />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
