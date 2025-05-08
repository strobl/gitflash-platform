
import React from "react";
import { Card } from "@/components/ui/card";

const EmptyStateCard: React.FC = () => {
  return (
    <div className="flex flex-col items-center px-4 py-8">
      <Card className="w-full p-6 flex flex-col items-center gap-2 border border-[#BDC6CF] rounded-lg">
        <div className="mb-2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="12" width="24" height="24" rx="4" stroke="#0A2540" strokeWidth="2" />
            <path d="M18 20H30" stroke="#0A2540" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 24H30" stroke="#0A2540" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 28H30" stroke="#0A2540" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="text-[#0A2540] text-base font-bold text-center">Sie haben aktuell noch keine Jobs.</h3>
        <p className="text-[#546679] text-sm text-center max-w-[280px]">
          Sie werden benachrichtigt, sobald sich Unternehmen bei Ihnen melden.
        </p>
      </Card>
    </div>
  );
};

export default EmptyStateCard;
