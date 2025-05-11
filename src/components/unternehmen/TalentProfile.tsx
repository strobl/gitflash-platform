
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { getRoleRedirectPath } from '@/utils/routingUtils';

// Import components using relative paths
import ProfileHeader from '../../../figma/company-profilecv-src/components/profile/ProfileHeader';
import ProfileCard from '../../../figma/company-profilecv-src/components/profile/ProfileCard';
import ExperienceSection from '../../../figma/company-profilecv-src/components/profile/ExperienceSection';
import EducationSection from '../../../figma/company-profilecv-src/components/profile/EducationSection';
import ProjectsSection from '../../../figma/company-profilecv-src/components/profile/ProjectsSection';
import AwardsSection from '../../../figma/company-profilecv-src/components/profile/AwardsSection';
import ProfileNavigation from '../../../figma/company-profilecv-src/components/profile/ProfileNavigation';
import ProfileFooter from '../../../figma/company-profilecv-src/components/profile/ProfileFooter';

// Supabase URL and anon key from integration/client file
const SUPABASE_URL = "https://gehhxwqlhzsesxzqleks.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaGh4d3FsaHpzZXN4enFsZWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNzkxOTYsImV4cCI6MjA2MTc1NTE5Nn0.n0xnb83NgWgJFA1eZ6K_36N_JhePnmiEYnRS-vHEcWM";

export default function TalentProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile, isLoading: authLoading } = useAuth();
  
  const [talentProfile, setTalentProfile] = useState<any>(null);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("experience");

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
      if (authLoading || !id) return; // Wait until auth check is done
      
      try {
        setIsLoading(true);
        
        // Load talent profile - ONLY approved profiles
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
        
        // For projects_entries and awards_entries, use a different approach since they don't appear in the type definitions
        // Use fetch API with the Supabase REST endpoint directly
        const projectsResponse = await fetch(
          `${SUPABASE_URL}/rest/v1/projects_entries?talent_profile_id=eq.${id}&order=created_at.desc`,
          {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjects(projectsData || []);
        }
        
        const awardsResponse = await fetch(
          `${SUPABASE_URL}/rest/v1/awards_entries?talent_profile_id=eq.${id}&order=created_at.desc`,
          {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (awardsResponse.ok) {
          const awardsData = await awardsResponse.json();
          setAwards(awardsData || []);
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

  const renderActiveSection = () => {
    switch (activeTab) {
      case "experience":
        return experiences.length > 0 ? (
          <ExperienceSection />
        ) : (
          <div className="p-4 text-gray-500 text-center">Keine Berufserfahrung eingetragen.</div>
        );
      case "education":
        return education.length > 0 ? (
          <EducationSection />
        ) : (
          <div className="p-4 text-gray-500 text-center">Keine Ausbildungsdaten eingetragen.</div>
        );
      case "awards":
        return awards.length > 0 ? (
          <AwardsSection />
        ) : (
          <div className="p-4 text-gray-500 text-center">Keine Auszeichnungen eingetragen.</div>
        );
      case "projects":
        return projects.length > 0 ? (
          <ProjectsSection />
        ) : (
          <div className="p-4 text-gray-500 text-center">Keine Projektdaten eingetragen.</div>
        );
      default:
        return <ExperienceSection />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  return (
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
            <div className="bg-white rounded-xl overflow-hidden">
              <ProfileHeader />
              <ProfileCard />
              <ProfileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
              <div className="min-h-[60vh]">
                {renderActiveSection()}
              </div>
              <ProfileFooter />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
