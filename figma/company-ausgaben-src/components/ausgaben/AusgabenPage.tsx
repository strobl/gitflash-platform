
import React from "react";
import { NavigationBar } from "./NavigationBar";
import { ExpenseOverview } from "./ExpenseOverview";
import { BottomNavigation } from "./BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

export const AusgabenPage: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white max-w-[480px] md:max-w-[800px] lg:max-w-[1000px] w-full mx-auto rounded-xl shadow-lg">
      <div className="w-full">
        <NavigationBar />
        <ExpenseOverview />
      </div>
      {isMobile && <BottomNavigation />}
      {!isMobile && (
        <div className="hidden md:flex justify-between items-center p-4 border-t border-[#E7E9EC]">
          <div className="text-xs text-[#6C7C8C]">© 2025 Expense Dashboard</div>
          <div className="flex gap-4">
            <button className="text-xs text-[#0A2540] hover:underline">Impressum</button>
            <button className="text-xs text-[#0A2540] hover:underline">Datenschutz</button>
            <button className="text-xs text-[#0A2540] hover:underline">Hilfe</button>
          </div>
        </div>
      )}
    </div>
  );
};
