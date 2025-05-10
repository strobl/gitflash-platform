
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface FilterOptions {
  profession: string[];
  experience: number;
  location: string;
  remote: boolean;
  salaryRange: [number, number];
}

interface SearchFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

const professions = [
  "Baujurist", 
  "Bauingenieur", 
  "Architekt", 
  "Bauleiter", 
  "Projektmanager"
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  open,
  onClose,
  filters,
  onApplyFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleProfessionToggle = (profession: string) => {
    setLocalFilters(prev => {
      if (prev.profession.includes(profession)) {
        return {
          ...prev,
          profession: prev.profession.filter(p => p !== profession)
        };
      } else {
        return {
          ...prev,
          profession: [...prev.profession, profession]
        };
      }
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const defaultFilters: FilterOptions = {
      profession: [],
      experience: 0,
      location: "",
      remote: false,
      salaryRange: [60000, 120000],
    };
    setLocalFilters(defaultFilters);
    onApplyFilters(defaultFilters);
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-[90%] sm:max-w-md" side="right">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-[#0A2540]">Suchfilter</SheetTitle>
        </SheetHeader>
        
        <div className="py-4 space-y-6">
          {/* Profession Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#0A2540]">Berufsfeld</h3>
            <div className="space-y-3">
              {professions.map((profession) => (
                <div key={profession} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`profession-${profession}`}
                    checked={localFilters.profession.includes(profession)}
                    onCheckedChange={() => handleProfessionToggle(profession)}
                  />
                  <Label htmlFor={`profession-${profession}`} className="text-sm cursor-pointer">
                    {profession}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Experience Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#0A2540]">Mindest-Erfahrung (Jahre)</h3>
            <div className="space-y-2">
              <Slider
                value={[localFilters.experience]}
                min={0}
                max={20}
                step={1}
                onValueChange={(value) => setLocalFilters(prev => ({ ...prev, experience: value[0] }))}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0 Jahre</span>
                <span>{localFilters.experience} Jahre</span>
                <span>20+ Jahre</span>
              </div>
            </div>
          </div>
          
          {/* Location Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#0A2540]">Standort</h3>
            <Select 
              value={localFilters.location}
              onValueChange={(value) => setLocalFilters(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Alle Standorte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle Standorte</SelectItem>
                <SelectItem value="berlin">Berlin</SelectItem>
                <SelectItem value="hamburg">Hamburg</SelectItem>
                <SelectItem value="munich">München</SelectItem>
                <SelectItem value="cologne">Köln</SelectItem>
                <SelectItem value="frankfurt">Frankfurt</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Remote Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#0A2540]">Remote-Optionen</h3>
            <div className="flex items-center space-x-2">
              <Switch 
                id="remote" 
                checked={localFilters.remote}
                onCheckedChange={(checked) => setLocalFilters(prev => ({ ...prev, remote: checked }))} 
              />
              <Label htmlFor="remote">Nur Remote-Angebote zeigen</Label>
            </div>
          </div>
          
          {/* Salary Range Filter */}
          <div className="space-y-4">
            <h3 className="font-medium text-[#0A2540]">Gehaltsbereich</h3>
            <div className="space-y-2">
              <Slider
                value={localFilters.salaryRange}
                min={30000}
                max={200000}
                step={10000}
                onValueChange={(value) => setLocalFilters(prev => ({ ...prev, salaryRange: [value[0], value[1]] }))}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{localFilters.salaryRange[0].toLocaleString('de-DE')} €</span>
                <span>{localFilters.salaryRange[1].toLocaleString('de-DE')} €</span>
              </div>
            </div>
          </div>
        </div>
        
        <SheetFooter className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleReset}>
            Filter zurücksetzen
          </Button>
          <Button className="bg-[#0A2540] hover:bg-[#0A2540]/90" onClick={handleApply}>
            Filter anwenden
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
