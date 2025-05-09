
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

export const SearchFilter: React.FC = () => {
  return (
    <Card className="p-6 shadow-md">
      <div className="flex flex-col space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#0A2540] mb-3">Personalsuche</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input 
              className="h-12 text-lg" 
              placeholder="Suchen Sie z. B. Baujurist mit 5 Jahren Erfahrung oder 'Bauleiter'" 
              type="search"
            />
          </div>
          <Button className="h-12 bg-[#0A2540] hover:bg-[#0A2540]/90 gap-2">
            <Search size={18} />
            <span>Suchen</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-[#0A2540] cursor-pointer">
          <Filter size={16} />
          <span className="text-base">Filter bearbeiten</span>
        </div>
      </div>
    </Card>
  );
};
