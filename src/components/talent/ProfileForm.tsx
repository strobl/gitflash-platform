
import React, { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { TalentProfile } from '@/types/talent-profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

import { ProfileHeader } from './ProfileHeader';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { CvUpload } from './CvUpload';
import { useTalentProfile } from '@/hooks/useTalentProfile';
import { useToast } from '@/hooks/use-toast';

export const ProfileForm: React.FC = () => {
  const { 
    profile,
    experiences,
    education,
    isLoading,
    isSaving,
    isSubmitting,
    updateProfile,
    submitProfile,
    addExperienceEntry,
    updateExperienceEntry,
    deleteExperienceEntry,
    addEducationEntry,
    updateEducationEntry,
    deleteEducationEntry,
    uploadCv
  } = useTalentProfile();
  
  const { toast } = useToast();
  
  // Form state
  const [headline, setHeadline] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState('');
  
  // Initialize form with profile data
  useEffect(() => {
    if (profile) {
      setHeadline(profile.headline || '');
      setSummary(profile.summary || '');
      setSkills(profile.skills || '');
    }
  }, [profile]);
  
  // Debounce values for autosave
  const debouncedHeadline = useDebounce(headline, 800);
  const debouncedSummary = useDebounce(summary, 800);  
  const debouncedSkills = useDebounce(skills, 800);
  
  // Autosave when debounced values change
  useEffect(() => {
    if (profile && debouncedHeadline !== profile.headline) {
      updateProfile({ headline: debouncedHeadline });
    }
  }, [debouncedHeadline]);
  
  useEffect(() => {
    if (profile && debouncedSummary !== profile.summary) {
      updateProfile({ summary: debouncedSummary });
    }
  }, [debouncedSummary]);
  
  useEffect(() => {
    if (profile && debouncedSkills !== profile.skills) {
      updateProfile({ skills: debouncedSkills });
    }
  }, [debouncedSkills]);
  
  const handleSubmitProfile = async () => {
    if (!headline || !summary || !skills) {
      toast({
        title: "Unvollständiges Profil",
        description: "Bitte fülle alle Pflichtfelder aus, bevor du dein Profil einreichst.",
        variant: "destructive"
      });
      return;
    }
    
    await submitProfile();
  };
  
  // Check if profile is editable (in draft state)
  const isEditable = profile?.status === 'draft';
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="py-8">
        <p className="text-center text-muted-foreground">
          Profilinformationen konnten nicht geladen werden.
        </p>
      </div>
    );
  }
  
  return (
    <div className="py-6 space-y-6">
      <ProfileHeader profile={profile} isEditable={isEditable} />
      
      <Card>
        <CardHeader>
          <CardTitle>Grundlegende Informationen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="z.B. Senior Frontend Developer mit 5 Jahren Erfahrung"
              disabled={!isEditable || isSaving}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Zusammenfassung</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Kurze Zusammenfassung deiner Fähigkeiten und Erfahrungen"
              disabled={!isEditable || isSaving}
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills">Skills (kommagetrennt)</Label>
            <Input
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="z.B. React, TypeScript, Node.js, GraphQL"
              disabled={!isEditable || isSaving}
            />
          </div>
        </CardContent>
      </Card>
      
      <ExperienceForm
        experiences={experiences}
        onAdd={addExperienceEntry}
        onUpdate={updateExperienceEntry}
        onDelete={deleteExperienceEntry}
        isEditable={isEditable}
      />
      
      <EducationForm
        education={education}
        onAdd={addEducationEntry}
        onUpdate={updateEducationEntry}
        onDelete={deleteEducationEntry}
        isEditable={isEditable}
      />
      
      <CvUpload
        cvUrl={profile.cv_url}
        onUpload={uploadCv}
        isEditable={isEditable}
      />
      
      {isEditable && (
        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={handleSubmitProfile} 
            disabled={isSubmitting || !headline || !summary || !skills}
          >
            {isSubmitting ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Wird eingereicht...
              </>
            ) : (
              'Zur Prüfung einreichen'
            )}
          </Button>
        </div>
      )}
      
      {isSaving && (
        <div className="fixed bottom-4 right-4">
          <div className="bg-black/70 text-white px-4 py-2 rounded-md text-sm flex items-center">
            <Loader className="h-3 w-3 mr-2 animate-spin" />
            Wird gespeichert...
          </div>
        </div>
      )}
    </div>
  );
};
