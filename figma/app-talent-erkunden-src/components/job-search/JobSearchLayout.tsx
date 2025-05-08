
import React from "react";
import NavBar from "./NavBar";
import InterviewSection from "./InterviewSection";
import JobDiscoverySection from "./JobDiscoverySection";
import MobileNav from "./MobileNav";
import DesktopSidebar from "./DesktopSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const JobSearchLayout: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full flex">
      {!isMobile && <DesktopSidebar />}
      
      <div className={cn(
        "flex flex-col w-full",
        isMobile ? "pb-16" : "md:ml-16 lg:ml-64"
      )}>
        <div className="w-full mx-auto">
          <NavBar />
          <InterviewSection />
          <JobDiscoverySection />
        </div>
      </div>
      
      {isMobile && <MobileNav />}
    </div>
  );
};

export default JobSearchLayout;
