
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
    // Only redirect if auth is fully loaded and user is authenticated with a role
    if (!isLoading && isAuthenticated && profile?.role) {
      const redirectPath = getRoleRedirectPath(profile.role);
      if (redirectPath !== '/login') {
        // Use a slight delay to ensure the page renders first
        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 100);
      }
    }
  }, [isLoading, isAuthenticated, profile, navigate]);

  // Always show the landing page immediately - no loading state
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
