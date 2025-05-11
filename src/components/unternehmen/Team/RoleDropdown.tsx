
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RoleDropdownProps {
  currentRole: string;
  onChange: (role: string) => void;
}

export const RoleDropdown: React.FC<RoleDropdownProps> = ({ currentRole, onChange }) => {
  const roles = [
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Recruiter', label: 'Recruiter' },
    { value: 'Personalmanager', label: 'Personalmanager' },
    { value: 'Viewer', label: 'Viewer' },
  ];

  return (
    <Select defaultValue={currentRole} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Rolle wählen" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
