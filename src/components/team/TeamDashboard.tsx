
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, Mail, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export const TeamDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [teamMembers, setTeamMembers] = useState([
    { 
      id: 1, 
      name: 'Anna Schmidt', 
      email: 'anna.schmidt@example.com', 
      role: 'Administrator', 
      avatar: ''
    },
    { 
      id: 2, 
      name: 'Michael Weber', 
      email: 'michael.weber@example.com', 
      role: 'Recruiter', 
      avatar: '' 
    },
    { 
      id: 3, 
      name: 'Julia Becker', 
      email: 'julia.becker@example.com', 
      role: 'Personalmanager', 
      avatar: '' 
    },
  ]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleInviteTeamMember = () => {
    console.log('Invite team member');
    // Here would go the logic to open a modal or navigate to an invitation form
  };

  const handleRemoveTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const filteredMembers = searchQuery 
    ? teamMembers.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        member.email.toLowerCase().includes(searchQuery.toLowerCase()))
    : teamMembers;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gitflash-primary">Team</h2>
          <Button onClick={handleInviteTeamMember} className="bg-gitflash-primary hover:bg-gitflash-primary/90">
            <Plus className="mr-1 h-4 w-4" /> Teammitglied einladen
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nach Teammitgliedern suchen..."
            className="pl-10"
          />
        </div>

        {filteredMembers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Rolle</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Aktionen</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-gitflash-primary text-white">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{member.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {member.role}
                      </span>
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
                            <DropdownMenuItem onClick={() => console.log('Edit', member.id)}>
                              Bearbeiten
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-500" 
                              onClick={() => handleRemoveTeamMember(member.id)}
                            >
                              Entfernen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Keine Teammitglieder gefunden.</p>
            <Button onClick={handleInviteTeamMember} className="bg-gitflash-primary hover:bg-gitflash-primary/90">
              Teammitglied einladen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
