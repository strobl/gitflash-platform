
import React from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { JobListings } from "@/components/landing/JobListings";
import { VideoCallSection } from "@/components/landing/VideoCallSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { EmployerFeatures } from "@/components/landing/EmployerFeatures";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

const Index: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-white overflow-hidden w-full">
        <div className="w-full">
          <div className="bg-white flex w-full flex-col overflow-hidden items-center pb-8">
            <div className="max-w-6xl w-full px-6 lg:px-8 mx-auto">
              <Header />
              <Hero />
            </div>
          </div>
          
          <div className="w-full">
            <img 
              src="https://gehhxwqlhzsesxzqleks.supabase.co/storage/v1/object/public/gitflash//image%20(4).webp"
              alt="GitFlash banner"
              className="w-full object-cover h-[300px] md:h-[500px]"
            />
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
