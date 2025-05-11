
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { TalentProfile, ExperienceEntry, EducationEntry } from '@/types/talent-profile';
import { useToast } from '@/hooks/use-toast';

export const useTalentProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  // Fetch profile and related data
  const fetchProfileData = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      // Get profile or create if doesn't exist
      let { data: profileData, error: profileError } = await supabase
        .from('talent_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile not found, create a new one
        const { data: newProfile, error: createError } = await supabase
          .from('talent_profiles')
          .insert([
            { 
              user_id: user.id,
              headline: '',
              summary: '',
              skills: '',
              status: 'draft'
            }
          ])
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          toast({
            title: "Fehler",
            description: "Profil konnte nicht erstellt werden.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        profileData = newProfile;
      } else if (profileError) {
        console.error('Error fetching profile:', profileError);
        toast({
          title: "Fehler",
          description: "Profil konnte nicht geladen werden.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      setProfile(profileData);

      // Fetch experience entries
      if (profileData?.id) {
        const { data: experienceData, error: experienceError } = await supabase
          .from('experience_entries')
          .select('*')
          .eq('talent_profile_id', profileData.id)
          .order('start_date', { ascending: false });

        if (experienceError) {
          console.error('Error fetching experiences:', experienceError);
        } else {
          setExperiences(experienceData || []);
        }

        // Fetch education entries
        const { data: educationData, error: educationError } = await supabase
          .from('education_entries')
          .select('*')
          .eq('talent_profile_id', profileData.id)
          .order('start_date', { ascending: false });

        if (educationError) {
          console.error('Error fetching education:', educationError);
        } else {
          setEducation(educationData || []);
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Laden der Daten.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (updatedProfile: Partial<TalentProfile>) => {
    if (!profile?.id) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('talent_profiles')
        .update(updatedProfile)
        .eq('id', profile.id);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Fehler",
          description: "Profil konnte nicht aktualisiert werden.",
          variant: "destructive"
        });
        return false;
      }

      setProfile({ ...profile, ...updatedProfile });
      toast({
        title: "Gespeichert",
        description: "Änderungen wurden gespeichert.",
      });
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Speichern.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Submit profile for review
  const submitProfile = async () => {
    if (!profile?.id) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('talent_profiles')
        .update({ status: 'submitted' })
        .eq('id', profile.id);

      if (error) {
        console.error('Error submitting profile:', error);
        toast({
          title: "Fehler",
          description: "Profil konnte nicht eingereicht werden.",
          variant: "destructive"
        });
        return false;
      }

      setProfile({ ...profile, status: 'submitted' });
      toast({
        title: "Eingereicht",
        description: "Profil wurde zur Prüfung eingereicht.",
      });
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Einreichen.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add experience entry
  const addExperienceEntry = async (entry: Omit<ExperienceEntry, 'talent_profile_id'>) => {
    if (!profile?.id) return;
    
    setIsSaving(true);
    try {
      const newEntry = {
        ...entry,
        talent_profile_id: profile.id
      };
      
      const { data, error } = await supabase
        .from('experience_entries')
        .insert([newEntry])
        .select();

      if (error) {
        console.error('Error adding experience:', error);
        toast({
          title: "Fehler",
          description: "Berufserfahrung konnte nicht hinzugefügt werden.",
          variant: "destructive"
        });
        return null;
      }

      const addedEntry = data[0];
      setExperiences(prev => [addedEntry, ...prev]);
      toast({
        title: "Gespeichert",
        description: "Berufserfahrung wurde hinzugefügt.",
      });
      return addedEntry;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Hinzufügen.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  // Update experience entry
  const updateExperienceEntry = async (id: string, updates: Partial<ExperienceEntry>) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('experience_entries')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating experience:', error);
        toast({
          title: "Fehler",
          description: "Berufserfahrung konnte nicht aktualisiert werden.",
          variant: "destructive"
        });
        return false;
      }

      setExperiences(prev => 
        prev.map(entry => entry.id === id ? { ...entry, ...updates } : entry)
      );
      toast({
        title: "Gespeichert",
        description: "Berufserfahrung wurde aktualisiert.",
      });
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Aktualisieren.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Delete experience entry
  const deleteExperienceEntry = async (id: string) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('experience_entries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting experience:', error);
        toast({
          title: "Fehler",
          description: "Berufserfahrung konnte nicht gelöscht werden.",
          variant: "destructive"
        });
        return false;
      }

      setExperiences(prev => prev.filter(entry => entry.id !== id));
      toast({
        title: "Gelöscht",
        description: "Berufserfahrung wurde gelöscht.",
      });
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Löschen.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Add education entry
  const addEducationEntry = async (entry: Omit<EducationEntry, 'talent_profile_id'>) => {
    if (!profile?.id) return;
    
    setIsSaving(true);
    try {
      const newEntry = {
        ...entry,
        talent_profile_id: profile.id
      };
      
      const { data, error } = await supabase
        .from('education_entries')
        .insert([newEntry])
        .select();

      if (error) {
        console.error('Error adding education:', error);
        toast({
          title: "Fehler",
          description: "Ausbildung konnte nicht hinzugefügt werden.",
          variant: "destructive"
        });
        return null;
      }

      const addedEntry = data[0];
      setEducation(prev => [addedEntry, ...prev]);
      toast({
        title: "Gespeichert",
        description: "Ausbildung wurde hinzugefügt.",
      });
      return addedEntry;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Hinzufügen.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  // Update education entry
  const updateEducationEntry = async (id: string, updates: Partial<EducationEntry>) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('education_entries')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating education:', error);
        toast({
          title: "Fehler",
          description: "Ausbildung konnte nicht aktualisiert werden.",
          variant: "destructive"
        });
        return false;
      }

      setEducation(prev => 
        prev.map(entry => entry.id === id ? { ...entry, ...updates } : entry)
      );
      toast({
        title: "Gespeichert",
        description: "Ausbildung wurde aktualisiert.",
      });
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Aktualisieren.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Delete education entry
  const deleteEducationEntry = async (id: string) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('education_entries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting education:', error);
        toast({
          title: "Fehler",
          description: "Ausbildung konnte nicht gelöscht werden.",
          variant: "destructive"
        });
        return false;
      }

      setEducation(prev => prev.filter(entry => entry.id !== id));
      toast({
        title: "Gelöscht",
        description: "Ausbildung wurde gelöscht.",
      });
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Löschen.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Upload CV file
  const uploadCv = async (file: File) => {
    if (!profile?.id || !user?.id) return null;
    
    setCvFile(file);
    setIsSaving(true);
    try {
      // Upload file to storage
      const filePath = `${user.id}/${profile.id}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('cv_files')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error('Error uploading CV:', uploadError);
        toast({
          title: "Fehler",
          description: "Lebenslauf konnte nicht hochgeladen werden.",
          variant: "destructive"
        });
        return null;
      }

      // Get the public URL
      const { data } = supabase.storage
        .from('cv_files')
        .getPublicUrl(filePath);
      
      const publicUrl = data.publicUrl;

      // Update profile with CV URL
      const { error: updateError } = await supabase
        .from('talent_profiles')
        .update({ cv_url: publicUrl })
        .eq('id', profile.id);

      if (updateError) {
        console.error('Error updating profile with CV URL:', updateError);
        toast({
          title: "Fehler",
          description: "Lebenslauf-URL konnte nicht gespeichert werden.",
          variant: "destructive"
        });
        return null;
      }

      setProfile({ ...profile, cv_url: publicUrl });
      toast({
        title: "Hochgeladen",
        description: "Lebenslauf wurde erfolgreich hochgeladen.",
      });
      return publicUrl;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Fehler",
        description: "Unerwarteter Fehler beim Hochladen des Lebenslaufs.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    if (user?.id) {
      fetchProfileData();
    }
  }, [user?.id]);

  return {
    profile,
    experiences,
    education,
    isLoading,
    isSaving,
    isSubmitting,
    cvFile,
    updateProfile,
    submitProfile,
    addExperienceEntry,
    updateExperienceEntry,
    deleteExperienceEntry,
    addEducationEntry,
    updateEducationEntry,
    deleteEducationEntry,
    uploadCv
  };
};
