
import React from 'react';
import { TeamMember } from './types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RoleDropdown } from './RoleDropdown';
import { Button } from '@/components/ui/button';
import { Mail, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface TeamMemberCardProps {
  member: TeamMember;
  onRemove: () => void;
  onRoleChange: (role: string) => void;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  member, 
  onRemove, 
  onRoleChange 
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2 bg-gitflash-primary text-white">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-xs text-gray-500">{member.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">
        {member.project}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          member.status === 'Aktiv' ? 'bg-green-100 text-green-800' : 
          member.status === 'Inaktiv' ? 'bg-gray-100 text-gray-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {member.status}
        </span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">
        {member.lastActive}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">
        {member.hours}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-gray-700"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => null}>
                Rolle ändern
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-500" 
                onSelect={onRemove}
              >
                Entfernen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};
