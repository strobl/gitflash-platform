
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface UserTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const UserTypeSelect: React.FC<UserTypeSelectProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="w-full mb-4">
      <label className="text-[10px] font-bold text-[#0A2540] mb-1.5 block">
        Login als
      </label>
      <ToggleGroup 
        type="single" 
        value={value} 
        onValueChange={(val) => val && onChange(val)} 
        className="w-full border border-[#6C7C8C] rounded-md overflow-hidden"
      >
        <ToggleGroupItem 
          value="candidate" 
          className="flex-1 text-xs py-2 data-[state=on]:bg-[#0A2540] data-[state=on]:text-white transition-colors"
        >
          Als Talent
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="employer" 
          className="flex-1 text-xs py-2 data-[state=on]:bg-[#0A2540] data-[state=on]:text-white transition-colors"
        >
          Als Unternehmen
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default UserTypeSelect;
