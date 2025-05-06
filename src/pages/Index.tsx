
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { BannerSection } from '@/components/home/BannerSection';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { JobListings } from '@/components/home/JobListings';
import { VideoCallSection } from '@/components/home/VideoCallSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';
import { Footer } from '@/components/home/Footer';

export default function Index() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <BannerSection />
        <BenefitsSection />
        <JobListings />
        <VideoCallSection />
        <StatsSection />
        <CallToActionSection />
      </main>
      
      <Footer />
    </div>
  );
}
