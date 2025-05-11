
import { useState, useEffect } from 'react';
import { TeamMember } from './types';
import { toast } from '@/hooks/use-toast';

// Mock data to simulate API response
const mockTeamMembers: TeamMember[] = [
  { 
    id: 1, 
    name: 'Lisa Meier', 
    email: 'lisa.meier@example.com', 
    role: 'HR', 
    project: 'BIM Einführung',
    status: 'Aktiv',
    lastActive: '12.04.2025',
    hours: 42,
    avatar: ''
  },
  { 
    id: 2, 
    name: 'Tobias König', 
    email: 'tobias.koenig@example.com', 
    role: 'PM', 
    project: 'Neubau Projekt',
    status: 'Aktiv',
    lastActive: '14.04.2025',
    hours: 58,
    avatar: '' 
  },
  { 
    id: 3, 
    name: 'Ahmet Yilmaz', 
    email: 'ahmet.yilmaz@example.com', 
    role: 'TGA Ingenieur', 
    project: 'Sanierung Lage',
    status: 'Inaktiv',
    lastActive: '28.03.2025',
    hours: 0,
    avatar: '' 
  },
  { 
    id: 4, 
    name: 'Sophie Wagner', 
    email: 'sophie.wagner@example.com', 
    role: 'Bauherr', 
    project: 'TGA-Konzept Nr. 9',
    status: 'Aktiv',
    lastActive: '10.04.2025',
    hours: 35,
    avatar: '' 
  },
  { 
    id: 5, 
    name: 'Jonas Roth', 
    email: 'jonas.roth@example.com', 
    role: 'Koordniator HLS', 
    project: 'Kondensatoryzm',
    status: 'Wartet auf Zusage',
    lastActive: '-',
    hours: 0,
    avatar: '' 
  },
];

export const useTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch team members
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock data for now
        setTeamMembers(mockTeamMembers);
        setError(null);
      } catch (err) {
        setError('Fehler beim Laden der Teammitglieder');
        toast({
          title: 'Fehler',
          description: 'Die Teammitglieder konnten nicht geladen werden.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const inviteMember = async (email: string, role: string) => {
    try {
      // Simulate API call to invite team member
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new mock team member with unique ID
      const newMember: TeamMember = {
        id: Math.max(...teamMembers.map(m => m.id), 0) + 1,
        name: email.split('@')[0].replace('.', ' '),
        email,
        role,
        project: 'Neues Projekt',
        status: 'Wartet auf Zusage',
        lastActive: '-',
        hours: 0,
      };
      
      // Add to the local state (optimistic update)
      setTeamMembers([...teamMembers, newMember]);
      
      toast({
        title: 'Einladung gesendet',
        description: `Einladung an ${email} wurde erfolgreich gesendet.`,
      });
    } catch (err) {
      toast({
        title: 'Fehler',
        description: 'Die Einladung konnte nicht gesendet werden.',
        variant: 'destructive',
      });
    }
  };

  const removeMember = async (id: number) => {
    try {
      // Simulate API call to remove team member
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove from local state (optimistic update)
      setTeamMembers(teamMembers.filter(member => member.id !== id));
      
      toast({
        title: 'Mitglied entfernt',
        description: 'Das Teammitglied wurde erfolgreich entfernt.',
      });
    } catch (err) {
      toast({
        title: 'Fehler',
        description: 'Das Teammitglied konnte nicht entfernt werden.',
        variant: 'destructive',
      });
    }
  };

  const updateMemberRole = async (id: number, role: string) => {
    try {
      // Simulate API call to update member role
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update in local state (optimistic update)
      setTeamMembers(
        teamMembers.map(member =>
          member.id === id ? { ...member, role } : member
        )
      );
      
      toast({
        title: 'Rolle aktualisiert',
        description: 'Die Rolle wurde erfolgreich aktualisiert.',
      });
    } catch (err) {
      toast({
        title: 'Fehler',
        description: 'Die Rolle konnte nicht aktualisiert werden.',
        variant: 'destructive',
      });
    }
  };

  return {
    teamMembers,
    isLoading,
    error,
    inviteMember,
    removeMember,
    updateMemberRole,
  };
};
