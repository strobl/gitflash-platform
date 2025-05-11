
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { TalentProfile } from '@/types/talent-profile';
import { supabase } from '@/integrations/supabase/client';
import { ProfileStatusBadge } from '@/components/admin/ProfileStatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, Loader2, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';
import { TalentResultList } from '@/components/unternehmen/suche/TalentResultList';
import { TalentCardProps } from '@/components/unternehmen/suche/TalentCard';

type ProfileStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'all';
type ProfileWithUserName = TalentProfile & { userName: string };

const AdminSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ProfileStatus>('all');
  const [profiles, setProfiles] = useState<ProfileWithUserName[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [talentResults, setTalentResults] = useState<Omit<TalentCardProps, 'active'>[]>([]);
  
  useEffect(() => {
    fetchProfiles();
  }, []);
  
  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      // Step 1: Fetch all talent profiles
      const { data: talentProfilesData, error: profilesError } = await supabase
        .from('talent_profiles')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (profilesError) {
        throw profilesError;
      }
      
      // Type assertion for talent profiles
      const talentProfiles = (talentProfilesData || []).map(profile => ({
        ...profile,
        status: profile.status as TalentProfile['status']
      }));
      
      if (talentProfiles.length === 0) {
        setProfiles([]);
        setTalentResults([]);
        setIsLoading(false);
        return;
      }
      
      // Step 2: Get all unique user IDs from the profiles
      const userIds = talentProfiles.map(profile => profile.user_id).filter(Boolean);
      
      if (userIds.length === 0) {
        // No valid user IDs found, set profiles with unknown names
        const profilesWithUnknownNames = talentProfiles.map(profile => ({
          ...profile,
          userName: 'Unbekannt'
        }));
        setProfiles(profilesWithUnknownNames);
        transformProfilesToTalentCards(profilesWithUnknownNames);
        setIsLoading(false);
        return;
      }
      
      // Step 3: Fetch user names from profiles table
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id, name')
        .in('id', userIds);
      
      if (usersError) {
        console.error('Error fetching user profiles:', usersError);
        // Continue with unknown names for users
        const profilesWithUnknownNames = talentProfiles.map(profile => ({
          ...profile,
          userName: 'Unbekannt'
        }));
        setProfiles(profilesWithUnknownNames);
        transformProfilesToTalentCards(profilesWithUnknownNames);
      } else {
        // Step 4: Create a map of user IDs to names for quick lookups
        const userNameMap = new Map();
        (usersData || []).forEach(user => {
          userNameMap.set(user.id, user.name);
        });
        
        // Step 5: Merge talent profiles with user names
        const profilesWithNames = talentProfiles.map(profile => ({
          ...profile,
          userName: userNameMap.get(profile.user_id) || 'Unbekannt'
        }));
        
        setProfiles(profilesWithNames);
        transformProfilesToTalentCards(profilesWithNames);
      }
    } catch (error: any) {
      console.error('Error fetching profiles:', error);
      toast.error('Fehler beim Laden der Profile');
    } finally {
      setIsLoading(false);
    }
  };

  const transformProfilesToTalentCards = (profiles: ProfileWithUserName[]) => {
    // Filter only approved profiles and transform them to TalentCard format
    const approvedProfiles = profiles.filter(profile => profile.status === 'approved');
    
    const talentCards = approvedProfiles.map(profile => {
      // Parse skills from string to array of tags
      const skillsArray = profile.skills 
        ? profile.skills.split(',').map(skill => skill.trim())
        : [];
      
      // Transform to TalentCardProps format
      return {
        id: profile.id,
        name: profile.userName,
        experience: 0, // Default value as we don't have years of experience in the profile
        description: profile.summary || 'Keine Beschreibung vorhanden',
        expertise: skillsArray.map(skill => ({ label: skill, highlighted: skillsArray[0] === skill })),
        availability: [{ label: 'Verfügbar' }], // Default value as we don't have availability info
      };
    });
    
    setTalentResults(talentCards);
  };
  
  // Filter profiles based on search term and selected status
  const filteredProfiles = profiles.filter(profile => {
    const matchesStatus = selectedStatus === 'all' || profile.status === selectedStatus;
    const matchesSearch = searchTerm.trim() === '' || 
      profile.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (profile.headline && profile.headline.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (profile.summary && profile.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (profile.skills && profile.skills.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });
  
  // Get only approved profiles for the talent cards view
  const approvedProfiles = filteredProfiles.filter(profile => profile.status === 'approved');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const resetSearch = () => {
    setSearchTerm('');
    setSelectedStatus('all');
  };
  
  // Navigate to profile detail
  const handleViewProfile = (id: string) => {
    navigate(`/admin/profiles/${id}`);
  };
  
  return (
    <AdminLayout title="Talentsuche" backLink="/admin/profiles">
      <div className="space-y-6">
        {/* Search and filter controls */}
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Talent-Profile durchsuchen</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Suchen nach Name, Skills oder Headline..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="flex-shrink-0 w-full sm:w-48">
                <Select 
                  value={selectedStatus} 
                  onValueChange={(value) => setSelectedStatus(value as ProfileStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Alle Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Filter nach Status</SelectLabel>
                      <SelectItem value="all">Alle Status</SelectItem>
                      <SelectItem value="draft">Entwurf</SelectItem>
                      <SelectItem value="submitted">Eingereicht</SelectItem>
                      <SelectItem value="approved">Freigegeben</SelectItem>
                      <SelectItem value="rejected">Abgelehnt</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                onClick={resetSearch}
                className="flex-shrink-0"
              >
                Zurücksetzen
              </Button>
              
              <Button 
                onClick={fetchProfiles}
                className="flex-shrink-0"
              >
                Aktualisieren
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Statistics/Summary card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Alle Profile</h3>
            <p className="text-2xl font-bold">{profiles.length}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Freigegeben</h3>
            <p className="text-2xl font-bold text-green-600">
              {profiles.filter(p => p.status === 'approved').length}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Eingereicht</h3>
            <p className="text-2xl font-bold text-blue-600">
              {profiles.filter(p => p.status === 'submitted').length}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Ergebnisse</h3>
            <p className="text-2xl font-bold">
              {filteredProfiles.length}
            </p>
          </Card>
        </div>
        
        {/* Results section: Table view for all profiles */}
        <Card>
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Alle Profile</h2>
            <p className="text-sm text-muted-foreground">
              Gesamtübersicht aller Profile im System
            </p>
          </div>
          <div className="relative">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Talent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Zuletzt aktualisiert</TableHead>
                    <TableHead className="text-right">Aktion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center">
                        Keine Profile gefunden
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProfiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">
                          <div className="space-y-1">
                            <div>{profile.userName}</div>
                            <div className="text-sm text-muted-foreground truncate">
                              {profile.headline || 'Keine Headline'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <ProfileStatusBadge status={profile.status} />
                        </TableCell>
                        <TableCell>
                          {profile.updated_at ? format(new Date(profile.updated_at), 'dd.MM.yyyy HH:mm', { locale: de }) : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm"
                            onClick={() => handleViewProfile(profile.id)}
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </Card>
        
        {/* Approved talent cards view for visual representation */}
        <Card>
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Freigegebene Profile</h2>
            <p className="text-sm text-muted-foreground">
              Visuelle Darstellung der freigegebenen Talentprofile
            </p>
          </div>
          <div className="p-6">
            <TalentResultList 
              talents={talentResults}
              isLoading={isLoading}
              onResetSearch={talentResults.length === 0 ? resetSearch : undefined}
            />
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSearchPage;
