
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';
import { Footer } from '@/components/home/Footer';

export default function HomePage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, redirect to appropriate dashboard
  React.useEffect(() => {
    if (user && profile) {
      switch (profile.role) {
        case 'user':
          navigate('/talent/startseite');
          break;
        case 'business':
          navigate('/unternehmen');
          break;
        case 'operator':
          navigate('/admin');
          break;
      }
    }
  }, [user, profile, navigate]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <StatsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
