
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TalentCardProps } from '@/components/unternehmen/suche/TalentCard';
import { toast } from 'sonner';

interface SearchFilters {
  profession: string[];
  experience: number;
  location: string;
  remote: boolean;
  salaryRange: [number, number];
}

interface TalentSearchContextType {
  query: string;
  filters: SearchFilters;
  results: Omit<TalentCardProps, 'active'>[];
  isLoading: boolean;
  handleQueryChange: (query: string) => void;
  handleFilterChange: (filters: SearchFilters) => void;
  resetSearch: () => void;
}

const defaultFilters: SearchFilters = {
  profession: [],
  experience: 0,
  location: '',
  remote: false,
  salaryRange: [60000, 120000]
};

const TalentSearchContext = createContext<TalentSearchContextType | undefined>(undefined);

export const TalentSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [results, setResults] = useState<Omit<TalentCardProps, 'active'>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch talent profiles when query or filters change
  useEffect(() => {
    const fetchTalentProfiles = async () => {
      setIsLoading(true);
      
      try {
        // First, fetch only approved talent profiles
        const { data: talentProfilesData, error: profilesError } = await supabase
          .from('talent_profiles')
          .select('*, user_id')
          .eq('status', 'approved')
          .order('updated_at', { ascending: false });
          
        if (profilesError) throw profilesError;
        
        if (!talentProfilesData || talentProfilesData.length === 0) {
          setResults([]);
          setIsLoading(false);
          return;
        }
        
        // Get all unique user_ids to fetch names separately
        const userIds = talentProfilesData.map(profile => profile.user_id).filter(Boolean);
        
        // Fetch user profiles separately to get names
        const { data: profilesData, error: namesError } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', userIds);
        
        if (namesError) throw namesError;
        
        // Create a map of user_id to name for quick lookup
        const nameMap = new Map();
        if (profilesData) {
          profilesData.forEach(profile => {
            nameMap.set(profile.id, profile.name);
          });
        }
        
        // Transform talent profiles to card format
        const talentCards = talentProfilesData.map(profile => {
          // Parse skills from string to array of tags
          const skillsArray = profile.skills 
            ? profile.skills.split(',').map((skill: string) => skill.trim())
            : [];
          
          // Get name from the map or use default
          const name = nameMap.get(profile.user_id) || 'Unbekannt';
          
          // Transform to TalentCardProps format
          return {
            id: profile.id,
            name,
            experience: 0, // Default value as we don't have years of experience in the profile
            description: profile.summary || 'Keine Beschreibung vorhanden',
            expertise: skillsArray.map((skill: string) => ({ 
              label: skill, 
              highlighted: skillsArray[0] === skill 
            })),
            availability: [{ label: 'Verfügbar' }], // Default availability
          };
        });
        
        // Filter results based on query and filters
        const filtered = talentCards.filter(talent => {
          // Simple search implementation - match against name, description and skills
          if (query) {
            const searchLower = query.toLowerCase();
            const nameMatch = talent.name.toLowerCase().includes(searchLower);
            const descMatch = talent.description.toLowerCase().includes(searchLower);
            const skillsMatch = talent.expertise.some(tag => 
              tag.label.toLowerCase().includes(searchLower)
            );
            
            if (!(nameMatch || descMatch || skillsMatch)) {
              return false;
            }
          }
          
          // Filter by profession/expertise
          if (filters.profession.length > 0) {
            const hasMatchingSkill = talent.expertise.some(skill =>
              filters.profession.includes(skill.label)
            );
            if (!hasMatchingSkill) return false;
          }
          
          // More filters could be added here
          
          return true;
        });
        
        setResults(filtered);
      } catch (error: any) {
        console.error('Error fetching talent profiles:', error);
        toast.error('Fehler beim Laden der Profile');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTalentProfiles();
  }, [query, filters]);
  
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };
  
  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };
  
  const resetSearch = () => {
    setQuery('');
    setFilters(defaultFilters);
  };
  
  return (
    <TalentSearchContext.Provider value={{
      query,
      filters,
      results,
      isLoading,
      handleQueryChange,
      handleFilterChange,
      resetSearch
    }}>
      {children}
    </TalentSearchContext.Provider>
  );
};

export const useTalentSearchContext = () => {
  const context = useContext(TalentSearchContext);
  if (context === undefined) {
    throw new Error('useTalentSearchContext must be used within a TalentSearchProvider');
  }
  return context;
};
