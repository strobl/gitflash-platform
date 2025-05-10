
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

interface TalentSearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onOpenFilters: () => void;
}

export const TalentSearchBar: React.FC<TalentSearchBarProps> = ({ 
  query, 
  onQueryChange, 
  onOpenFilters 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="relative flex-1">
        <Input 
          className="h-12 text-lg pl-4 pr-10" 
          placeholder="Suchen Sie z. B. Baujurist mit 5 Jahren Erfahrung oder 'Bauleiter'" 
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
      </div>
      <Button 
        onClick={onOpenFilters}
        className="h-12 bg-[#0A2540] hover:bg-[#0A2540]/90 text-white gap-2"
      >
        <Filter size={18} />
        <span>Filter</span>
      </Button>
    </div>
  );
};
