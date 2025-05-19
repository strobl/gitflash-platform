
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProfileStatusBadge } from '@/components/admin/ProfileStatusBadge';
import { supabase } from '@/integrations/supabase/client';
import { TalentProfile } from '@/types/talent-profile';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

type ProfileStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'all';

const AdminProfilesListPage: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<TalentProfile[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ProfileStatus>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchProfiles();
  }, []);
  
  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      // Fetch profiles with user information
      const { data, error } = await supabase
        .from('talent_profiles')
        .select('*, profiles:user_id(name)')
        .order('updated_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Type assertion to ensure status matches expected TalentProfile type
      const typedProfiles = (data || []).map(profile => ({
        ...profile,
        status: profile.status as TalentProfile['status']
      }));
      
      setProfiles(typedProfiles);
    } catch (error: any) {
      console.error('Error fetching profiles:', error);
      toast.error('Fehler beim Laden der Profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter profiles based on selected status
  const filteredProfiles = selectedStatus === 'all'
    ? profiles
    : profiles.filter(profile => profile.status === selectedStatus);
  
  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm', { locale: de });
    } catch (error) {
      return dateString;
    }
  };
  
  // Navigate to profile detail
  const handleViewProfile = (id: string) => {
    navigate(`/admin/profiles/${id}`);
  };
  
  return (
    <AdminLayout title="Talent Profile verwalten">
      <Card className="overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Talent Profile</h2>
              <p className="text-sm text-muted-foreground">
                Liste aller Talent-Profile mit Moderationsmöglichkeiten
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Status:</span>
                <Select 
                  value={selectedStatus} 
                  onValueChange={(value) => setSelectedStatus(value as ProfileStatus)}
                >
                  <SelectTrigger className="w-[180px]">
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
                onClick={fetchProfiles}
              >
                Aktualisieren
              </Button>
            </div>
          </div>
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
                          <div>{(profile as any).profiles?.name || 'Unbekannt'}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {profile.headline || 'Keine Headline'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ProfileStatusBadge status={profile.status} />
                      </TableCell>
                      <TableCell>
                        {formatDate(profile.updated_at)}
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
    </AdminLayout>
  );
};

export default AdminProfilesListPage;
