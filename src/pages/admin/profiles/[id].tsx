
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProfileStatusBadge } from '@/components/admin/ProfileStatusBadge';
import { supabase } from '@/integrations/supabase/client';
import { TalentProfile, ExperienceEntry, EducationEntry } from '@/types/talent-profile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const AdminProfileDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  useEffect(() => {
    if (id) {
      fetchProfileData(id);
    }
  }, [id]);
  
  const fetchProfileData = async (profileId: string) => {
    setIsLoading(true);
    try {
      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('talent_profiles')
        .select('*, profiles:user_id(name)')
        .eq('id', profileId)
        .single();
      
      if (profileError) throw profileError;
      
      // Set profile and user name
      setProfile(profileData);
      setUserName((profileData as any).profiles?.name || 'Unbekannt');
      
      // Fetch experience entries
      const { data: experienceData, error: experienceError } = await supabase
        .from('experience_entries')
        .select('*')
        .eq('talent_profile_id', profileId)
        .order('start_date', { ascending: false });
      
      if (experienceError) throw experienceError;
      setExperiences(experienceData || []);
      
      // Fetch education entries
      const { data: educationData, error: educationError } = await supabase
        .from('education_entries')
        .select('*')
        .eq('talent_profile_id', profileId)
        .order('start_date', { ascending: false });
      
      if (educationError) throw educationError;
      setEducation(educationData || []);
      
    } catch (error: any) {
      console.error('Error fetching profile data:', error);
      toast.error('Fehler beim Laden der Profildaten');
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfileStatus = async (status: 'approved' | 'rejected') => {
    if (!profile?.id) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('talent_profiles')
        .update({ status })
        .eq('id', profile.id);
      
      if (error) throw error;
      
      // Update local state
      setProfile(prev => prev ? { ...prev, status } : null);
      
      // Show success message
      const action = status === 'approved' ? 'freigegeben' : 'abgelehnt';
      toast.success(`Profil erfolgreich ${action}`);
      
    } catch (error: any) {
      console.error(`Error updating profile status to ${status}:`, error);
      toast.error('Fehler bei der Aktualisierung des Status');
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Helpers for date formatting
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MM/yyyy', { locale: de });
    } catch (error) {
      return dateString;
    }
  };
  
  const formatDateRange = (startDate?: string, endDate?: string) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'heute';
    return `${start} - ${end}`;
  };
  
  if (isLoading) {
    return (
      <AdminLayout 
        title="Profil Details"
        backLink="/admin/profiles"
      >
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full"></div>
        </div>
      </AdminLayout>
    );
  }
  
  if (!profile) {
    return (
      <AdminLayout 
        title="Profil nicht gefunden"
        backLink="/admin/profiles"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2">Profil wurde nicht gefunden</h3>
              <p className="text-muted-foreground mb-4">
                Das angeforderte Profil existiert nicht oder wurde gelöscht.
              </p>
              <Button onClick={() => navigate('/admin/profiles')}>
                Zurück zur Übersicht
              </Button>
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout 
      title={`Profil: ${profile.headline || userName}`}
      backLink="/admin/profiles"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{userName}</CardTitle>
                <CardDescription>{profile.headline}</CardDescription>
              </div>
              <ProfileStatusBadge status={profile.status as any} size="lg" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Zusammenfassung</h4>
              <p className="text-muted-foreground whitespace-pre-line">
                {profile.summary || 'Keine Zusammenfassung vorhanden.'}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills ? (
                  profile.skills.split(',').map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100">
                      {skill.trim()}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">Keine Skills angegeben.</span>
                )}
              </div>
            </div>
            
            {profile.cv_url && (
              <div>
                <h4 className="font-medium mb-2">Lebenslauf</h4>
                <Button variant="outline" asChild>
                  <a href={profile.cv_url} target="_blank" rel="noopener noreferrer">
                    Lebenslauf anzeigen/herunterladen
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Berufserfahrung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {experiences.length === 0 ? (
              <p className="text-muted-foreground">Keine Berufserfahrungen erfasst.</p>
            ) : (
              experiences.map((exp, index) => (
                <div key={exp.id || index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{exp.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {formatDateRange(exp.start_date, exp.end_date)}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Ausbildung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {education.length === 0 ? (
              <p className="text-muted-foreground">Keine Ausbildungen erfasst.</p>
            ) : (
              education.map((edu, index) => (
                <div key={edu.id || index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{edu.degree}</h4>
                      <span className="text-sm text-muted-foreground">
                        {formatDateRange(edu.start_date, edu.end_date)}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {edu.institution}
                    </div>
                    {edu.description && (
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-center gap-4 pt-2 pb-8">
          {profile.status === 'submitted' && (
            <>
              <Button
                variant="destructive"
                onClick={() => updateProfileStatus('rejected')}
                disabled={isUpdating}
                className="w-40"
              >
                Ablehnen
              </Button>
              <Button
                variant="default"
                onClick={() => updateProfileStatus('approved')}
                disabled={isUpdating}
                className="w-40"
              >
                Freigeben
              </Button>
            </>
          )}
          
          {profile.status === 'approved' && (
            <Button
              variant="destructive"
              onClick={() => updateProfileStatus('rejected')}
              disabled={isUpdating}
              className="w-40"
            >
              Status auf "Abgelehnt" ändern
            </Button>
          )}
          
          {profile.status === 'rejected' && (
            <Button
              variant="default"
              onClick={() => updateProfileStatus('approved')}
              disabled={isUpdating}
              className="w-40"
            >
              Status auf "Freigegeben" ändern
            </Button>
          )}
          
          {profile.status === 'draft' && (
            <div className="text-center text-muted-foreground">
              Dieses Profil ist im Entwurfsmodus und wurde noch nicht vom Talent zur Prüfung eingereicht.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfileDetailPage;
