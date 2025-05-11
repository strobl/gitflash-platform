
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import ProfileHeader from '@/figma/company-profilecv-src/components/profile/ProfileHeader';
import ProfileCard from '@/figma/company-profilecv-src/components/profile/ProfileCard';
import ExperienceSection from '@/figma/company-profilecv-src/components/profile/ExperienceSection';
import EducationSection from '@/figma/company-profilecv-src/components/profile/EducationSection';
import ProjectsSection from '@/figma/company-profilecv-src/components/profile/ProjectsSection';
import AwardsSection from '@/figma/company-profilecv-src/components/profile/AwardsSection';
import { getRoleRedirectPath } from '@/utils/routingUtils';

export default function TalentProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile, isLoading: authLoading } = useAuth();
  
  const [talentProfile, setTalentProfile] = useState<any>(null);
  const [userName, setUserName] = useState<string>('Talent');
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication and role
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      } else if (profile?.role !== 'business' && profile?.role !== 'operator') {
        navigate(getRoleRedirectPath(profile?.role));
        return;
      }
    }
  }, [isAuthenticated, profile, authLoading, navigate]);

  useEffect(() => {
    const fetchTalentProfile = async () => {
      if (authLoading) return; // Wait until auth check is done
      
      try {
        setIsLoading(true);
        
        // Load talent profile
        const { data: profileData, error: profileError } = await supabase
          .from('talent_profiles')
          .select('*')
          .eq('id', id)
          .eq('status', 'approved') // Only approved profiles
          .single();
          
        if (profileError) {
          throw profileError;
        }
        
        if (!profileData) {
          setError("Dieses Profil konnte nicht gefunden werden oder ist nicht freigegeben.");
          setIsLoading(false);
          return;
        }
        
        setTalentProfile(profileData);
        
        // Load user's name
        if (profileData.user_id) {
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', profileData.user_id)
            .single();
            
          if (!userError && userData) {
            setUserName(userData.name);
          }
        }
        
        // Load experience entries
        const { data: expData, error: expError } = await supabase
          .from('experience_entries')
          .select('*')
          .eq('talent_profile_id', id)
          .order('start_date', { ascending: false });
          
        if (!expError) {
          setExperiences(expData || []);
        }
        
        // Load education entries
        const { data: eduData, error: eduError } = await supabase
          .from('education_entries')
          .select('*')
          .eq('talent_profile_id', id)
          .order('start_date', { ascending: false });
          
        if (!eduError) {
          setEducation(eduData || []);
        }
        
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error fetching talent profile:', error);
        setError("Dieses Profil konnte nicht gefunden werden oder ist nicht freigegeben.");
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchTalentProfile();
    }
  }, [id, authLoading]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SharedNavbar />
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
          </div>
        ) : error ? (
          <Card className="p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Profil nicht verfügbar</h2>
              <p className="text-gray-500">{error}</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Content container with max width for better readability */}
            <div className="max-w-3xl mx-auto">
              {/* Using components from company-profilecv-src */}
              <ProfileHeader />
              <ProfileCard />
              <ExperienceSection />
              <EducationSection />
              <ProjectsSection />
              <AwardsSection />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
