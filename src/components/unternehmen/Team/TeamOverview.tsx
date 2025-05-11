
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TeamList } from './TeamList';
import { InviteMemberModal } from './InviteMemberModal';
import { useTeam } from './useTeam';
import { Search, Plus, UserPlus } from 'lucide-react';
import { EmptyTeamState } from './EmptyTeamState';

export const TeamOverview: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { teamMembers, isLoading, error, inviteMember, removeMember, updateMemberRole } = useTeam();
  
  const filteredMembers = searchQuery 
    ? teamMembers.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        member.email.toLowerCase().includes(searchQuery.toLowerCase()))
    : teamMembers;

  const handleInviteMember = (email: string, role: string) => {
    inviteMember(email, role);
    setIsInviteModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gitflash-primary">Team</h2>
            {teamMembers.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">{teamMembers.length} Mitglieder</p>
            )}
          </div>
          <Button 
            onClick={() => setIsInviteModalOpen(true)} 
            className="bg-gitflash-primary hover:bg-gitflash-primary/90"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Mitglied einladen
          </Button>
        </div>
        
        {teamMembers.length > 0 && (
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nach Name, E-Mail, Fähigkeit oder Erfahrung..."
              className="pl-10"
            />
          </div>
        )}

        {teamMembers.length === 0 ? (
          <EmptyTeamState onInviteClick={() => setIsInviteModalOpen(true)} />
        ) : (
          <TeamList 
            members={filteredMembers} 
            onRemove={removeMember} 
            onRoleChange={updateMemberRole} 
          />
        )}
      </div>

      <InviteMemberModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
        onInvite={handleInviteMember} 
      />
    </div>
  );
};
