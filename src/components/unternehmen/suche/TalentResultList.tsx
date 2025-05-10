
import React from "react";
import { TalentCard, TalentCardProps } from "./TalentCard";

interface TalentResultListProps {
  talents: Omit<TalentCardProps, 'active'>[];
  isLoading: boolean;
  activeId?: string;
}

export const TalentResultList: React.FC<TalentResultListProps> = ({ 
  talents, 
  isLoading, 
  activeId 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  if (talents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Keine Talente gefunden</h3>
        <p className="text-gray-500 max-w-md">
          Bitte passen Sie Ihre Suchkriterien an oder versuchen Sie es mit anderen Filtern erneut.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      {talents.map((talent) => (
        <TalentCard
          key={talent.id}
          {...talent}
          active={talent.id === activeId}
        />
      ))}
    </div>
  );
};
