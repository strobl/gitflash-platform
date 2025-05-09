
import React from "react";
import { DesktopSearchPage } from "@/components/search/DesktopSearchPage";
import { Header } from "@/components/search/Header";
import { BottomNavigation } from "@/components/search/BottomNavigation";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header className="sticky top-0 z-10" />
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <h1 className="text-4xl font-bold mb-4 text-[#0A2540]">Personalsuche für die Baubranche</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl">
          Finden Sie qualifizierte Fachkräfte für die Baubranche. Unsere Plattform verbindet Arbeitgeber mit spezialisierten Fachleuten aus dem Bausektor.
        </p>
        <DesktopSearchPage />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Index;
