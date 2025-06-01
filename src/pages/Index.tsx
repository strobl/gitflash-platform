
import React from "react";
import { UnifiedNavbar } from "@/components/navigation/UnifiedNavbar";
import { Hero } from "@/components/landing/Hero";
import { JobListings } from "@/components/landing/JobListings";
import { VideoCallSection } from "@/components/landing/VideoCallSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { EmployerFeatures } from "@/components/landing/EmployerFeatures";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

const Index: React.FC = () => {
  console.log("Index.tsx: Rendering landing page for all users");

  // Landing Page für ALLE (eingeloggt oder nicht)
  return (
    <div className="w-full flex flex-col">
      <div className="bg-white overflow-hidden w-full">
        <div className="w-full">
          <div className="bg-white flex w-full flex-col overflow-hidden items-center">
            <div className="max-w-6xl w-full px-6 lg:px-8 mx-auto">
              <UnifiedNavbar />
              <div className="pt-16 md:pt-28 lg:pt-32">
                <Hero />
              </div>
            </div>
          </div>
          
          <div className="w-full mt-16 md:mt-28 lg:pt-32 flex justify-center">
            <div className="px-3 md:px-6 max-w-[1200px] mx-auto">
              <img 
                src="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash//image%20(4).webp"
                alt="GitFlash banner"
                className="w-full object-cover h-[220px] md:h-[500px]"
              />
            </div>
          </div>
          
          <JobListings />
          <VideoCallSection />
          <StatsSection />
          <EmployerFeatures />
          <CallToAction />
          <div className="max-w-6xl w-full px-6 lg:px-8 mx-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
