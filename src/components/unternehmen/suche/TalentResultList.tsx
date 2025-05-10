
import React from "react";
import { TalentCard, TalentCardProps } from "./TalentCard";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TalentResultListProps {
  talents: Omit<TalentCardProps, 'active'>[];
  isLoading: boolean;
  activeId?: string;
  onResetSearch?: () => void;
}

export const TalentResultList: React.FC<TalentResultListProps> = ({ 
  talents, 
  isLoading, 
  activeId,
  onResetSearch
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <Loader2 className="h-10 w-10 text-gitflash-primary animate-spin mb-4" />
        <p className="text-gray-600">Suche nach passenden Talenten...</p>
      </div>
    );
  }

  if (talents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
          <Search className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Keine Talente gefunden</h3>
        <p className="text-gray-500 max-w-md mb-6">
          Bitte passen Sie Ihre Suchkriterien an oder versuchen Sie es mit anderen Filtern erneut.
        </p>
        {onResetSearch && (
          <Button onClick={onResetSearch} variant="outline">
            Suche zurücksetzen
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
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
