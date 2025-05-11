
import React from 'react';
import { TeamMemberCard } from './TeamMemberCard';
import { TeamMember } from './types';

interface TeamListProps {
  members: TeamMember[];
  onRemove: (id: number) => void;
  onRoleChange: (id: number, role: string) => void;
}

export const TeamList: React.FC<TeamListProps> = ({ members, onRemove, onRoleChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Name<br />(Rolle)
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Projekt/nr</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Letzter Einsatz</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Stunden<br />(M)
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Aktionen</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <TeamMemberCard 
              key={member.id} 
              member={member} 
              onRemove={() => onRemove(member.id)} 
              onRoleChange={(role) => onRoleChange(member.id, role)} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
