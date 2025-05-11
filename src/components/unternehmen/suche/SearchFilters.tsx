
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface SearchFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: {
    profession: string[];
    experience: number;
    location: string;
    remote: boolean;
    salaryRange: [number, number];
  };
  onApplyFilters: (filters: any) => void;
}

const availableProfessions = [
  "Baurecht",
  "Projektentwicklung",
  "Bauingenieurwesen",
  "Architektur",
  "BIM",
  "Vergaberecht",
  "Projektmanagement",
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  open,
  onClose,
  filters,
  onApplyFilters,
}) => {
  const [localFilters, setLocalFilters] = useState({ ...filters });

  const handleProfessionChange = (profession: string) => {
    setLocalFilters((prev) => {
      if (prev.profession.includes(profession)) {
        return {
          ...prev,
          profession: prev.profession.filter((p) => p !== profession),
        };
      } else {
        return {
          ...prev,
          profession: [...prev.profession, profession],
        };
      }
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({
      profession: [],
      experience: 0,
      location: "",
      remote: false,
      salaryRange: [60000, 120000],
    });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Fachbereich</h4>
            <div className="grid grid-cols-2 gap-3">
              {availableProfessions.map((profession) => (
                <div key={profession} className="flex items-center space-x-2">
                  <Checkbox
                    id={`profession-${profession}`}
                    checked={localFilters.profession.includes(profession)}
                    onCheckedChange={() => handleProfessionChange(profession)}
                  />
                  <Label
                    htmlFor={`profession-${profession}`}
                    className="text-sm font-normal"
                  >
                    {profession}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Erfahrung (Jahre)</h4>
              <span className="text-sm text-muted-foreground">
                {localFilters.experience}+
              </span>
            </div>
            <Slider
              min={0}
              max={20}
              step={1}
              value={[localFilters.experience]}
              onValueChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, experience: value[0] }))
              }
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="location" className="text-sm font-medium">
              Standort
            </Label>
            <Input
              id="location"
              placeholder="z.B. Berlin"
              value={localFilters.location}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={localFilters.remote}
              onCheckedChange={(checked) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  remote: checked === true,
                }))
              }
            />
            <Label htmlFor="remote" className="text-sm font-normal">
              Remote verfügbar
            </Label>
          </div>
        </div>
        
        <SheetFooter className="flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleReset} className="w-full">
            Zurücksetzen
          </Button>
          <Button onClick={handleApply} className="w-full">
            Filter anwenden
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
