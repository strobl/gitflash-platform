
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";
import { TalentSearchFilters } from "@/hooks/useTalentSearch";

interface SearchFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: TalentSearchFilters;
  onApplyFilters: (filters: TalentSearchFilters) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  open,
  onClose,
  filters,
  onApplyFilters,
}) => {
  const isMobile = useIsMobile();
  const [localFilters, setLocalFilters] = useState<TalentSearchFilters>(filters);

  const handleReset = () => {
    setLocalFilters({
      profession: [],
      experience: 0,
      location: '',
      remote: false,
      salaryRange: [60000, 120000]
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const updateProfession = (profession: string, checked: boolean) => {
    setLocalFilters(prev => {
      if (checked) {
        return { ...prev, profession: [...prev.profession, profession] };
      } else {
        return { ...prev, profession: prev.profession.filter(p => p !== profession) };
      }
    });
  };

  const filterContent = (
    <div className="flex flex-col space-y-6">
      <div className="space-y-3">
        <h3 className="text-base font-medium">Berufsfelder</h3>
        <div className="flex flex-col space-y-2">
          {['Baurecht', 'Projektmanagement', 'Architektur', 'Bauingenieurwesen', 'BIM'].map((profession) => (
            <div key={profession} className="flex items-center space-x-2">
              <Checkbox 
                id={profession}
                checked={localFilters.profession.includes(profession)}
                onCheckedChange={(checked) => updateProfession(profession, checked === true)}
              />
              <Label htmlFor={profession} className="cursor-pointer">{profession}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">Berufserfahrung</h3>
          <span className="text-sm text-gray-500">{localFilters.experience}+ Jahre</span>
        </div>
        <Slider 
          value={[localFilters.experience]}
          min={0}
          max={15}
          step={1}
          onValueChange={(value) => setLocalFilters(prev => ({ ...prev, experience: value[0] }))}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-medium">Standort</h3>
        <Input 
          placeholder="z.B. Berlin, München"
          value={localFilters.location}
          onChange={(e) => setLocalFilters(prev => ({ ...prev, location: e.target.value }))}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remote" 
          checked={localFilters.remote}
          onCheckedChange={(checked) => setLocalFilters(prev => ({ ...prev, remote: checked === true }))}
        />
        <Label htmlFor="remote" className="cursor-pointer">Nur Remote-Positionen anzeigen</Label>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">Gehaltsrange</h3>
          <span className="text-sm text-gray-500">
            {localFilters.salaryRange[0].toLocaleString('de-DE')} € - 
            {localFilters.salaryRange[1].toLocaleString('de-DE')} €
          </span>
        </div>
        <Slider 
          value={[localFilters.salaryRange[0], localFilters.salaryRange[1]]}
          min={40000}
          max={200000}
          step={5000}
          onValueChange={(value) => setLocalFilters(prev => ({ 
            ...prev, 
            salaryRange: [value[0], value[1]] 
          }))}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <SheetContent className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Suchfilter</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto py-4">
            {filterContent}
          </div>
          
          <SheetFooter className="border-t pt-4">
            <div className="flex justify-between w-full gap-2">
              <Button variant="outline" onClick={handleReset} className="flex-1">
                Zurücksetzen
              </Button>
              <Button onClick={handleApply} className="flex-1">
                Anwenden
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Suchfilter</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {filterContent}
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleReset} className="sm:w-auto w-full">
            Zurücksetzen
          </Button>
          <Button onClick={handleApply} className="sm:w-auto w-full">
            Anwenden
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
