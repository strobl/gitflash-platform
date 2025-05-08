
import React from "react";
import Header from "./Header";
import InterviewList from "./InterviewList";
import AppNavigation from "./AppNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const MainApp: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <Header />
      <div className={`flex-1 ${isMobile ? "w-full" : "max-w-[1200px]"} mx-auto bg-[#F2F4F6] p-4 pb-20`}>
        <h1 className="text-xl font-bold text-[#0A2540] mt-2">
          Sehen Sie Feedback zu Ihren bisherigen Interview-Leistungen
        </h1>
        <InterviewList />
      </div>
      <AppNavigation />
    </div>
  );
};

export default MainApp;
