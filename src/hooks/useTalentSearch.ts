
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TalentCardProps } from '@/components/unternehmen/suche/TalentCard';

export interface TalentSearchFilters {
  profession: string[];
  experience: number;
  location: string;
  remote: boolean;
  salaryRange: [number, number];
}

// Mock data to use until the backend is ready
const MOCK_TALENTS: Omit<TalentCardProps, 'active'>[] = [
  {
    id: '1',
    name: 'Michael Schmidt',
    experience: 5,
    description: 'Erfahrener Baujurist mit Spezialisierung auf Vertragsrecht und öffentliches Baurecht. Langjährige Erfahrung in der Beratung von Bauunternehmen und Projektentwicklern.',
    expertise: [
      { label: 'Baujurist', highlighted: true },
      { label: 'Vertragsrecht' },
      { label: 'Öffentliches Baurecht' }
    ],
    availability: [
      { label: 'Ab sofort' },
      { label: 'Vollzeit' }
    ],
    leaderboardRank: 3
  },
  {
    id: '2',
    name: 'Sabine Weber',
    experience: 8,
    description: 'Projektmanagerin mit umfangreicher Erfahrung in der Leitung von Großprojekten im Infrastrukturbereich. Expertise in agilen Methoden und Stakeholder-Management.',
    expertise: [
      { label: 'Projektmanagement', highlighted: true },
      { label: 'Infrastruktur' },
      { label: 'Agile' }
    ],
    availability: [
      { label: 'Ab Januar 2026' },
      { label: 'Remote' }
    ],
    leaderboardRank: 1
  },
  {
    id: '3',
    name: 'Thomas Müller',
    experience: 3,
    description: 'Bauingenieur mit Fokus auf nachhaltige Bauweisen und energieeffiziente Gebäudekonzepte. Erfahrung in der Planung und Überwachung von Wohn- und Gewerbebauten.',
    expertise: [
      { label: 'Bauingenieur', highlighted: true },
      { label: 'Energieeffizienz' },
      { label: 'Nachhaltigkeit' }
    ],
    availability: [
      { label: 'Ab März 2026' },
      { label: 'Teilzeit möglich' }
    ],
    leaderboardRank: 7
  },
  {
    id: '4',
    name: 'Julia Schneider',
    experience: 10,
    description: 'Architektin mit internationaler Erfahrung in der Planung von Bürogebäuden und öffentlichen Einrichtungen. Spezialisiert auf BIM und moderne Planungstools.',
    expertise: [
      { label: 'Architektur', highlighted: true },
      { label: 'BIM' },
      { label: 'Bürogebäude' }
    ],
    availability: [
      { label: 'Ab sofort' },
      { label: 'Projektweise' }
    ],
    leaderboardRank: 2
  },
  {
    id: '5',
    name: 'Felix Bauer',
    experience: 7,
    description: 'Bauleiter mit fundiertem technischem Wissen und ausgeprägten Führungsqualitäten. Erfahrung in der Koordination von Subunternehmern und Gewerken auf Großbaustellen.',
    expertise: [
      { label: 'Bauleiter', highlighted: true },
      { label: 'Projektsteuerung' },
      { label: 'Qualitätssicherung' }
    ],
    availability: [
      { label: 'Ab September 2025' },
      { label: 'Vollzeit' }
    ],
    leaderboardRank: 5
  }
];

// Helper function to filter talents based on search filters
const filterTalents = (talents: Omit<TalentCardProps, 'active'>[], query: string, filters: TalentSearchFilters): Omit<TalentCardProps, 'active'>[] => {
  return talents.filter(talent => {
    // Filter by query text
    if (query && !talent.name.toLowerCase().includes(query.toLowerCase()) && 
        !talent.description.toLowerCase().includes(query.toLowerCase()) &&
        !talent.expertise.some(e => e.label.toLowerCase().includes(query.toLowerCase()))) {
      return false;
    }
    
    // Filter by profession
    if (filters.profession.length > 0 && 
        !talent.expertise.some(e => filters.profession.includes(e.label))) {
      return false;
    }
    
    // Filter by experience
    if (talent.experience < filters.experience) {
      return false;
    }
    
    // Filter by location (simplified - in real app would match against talent location field)
    if (filters.location && !talent.description.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Filter by remote status (simplified - in real app would match against remote field)
    if (filters.remote && !talent.availability.some(a => a.label.toLowerCase().includes('remote'))) {
      return false;
    }
    
    // Filter by salary range - would implement in real app
    
    return true;
  });
};

export const useTalentSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Omit<TalentCardProps, 'active'>[]>([]);
  
  // Parse filters from URL search params or use defaults
  const [filters, setFilters] = useState<TalentSearchFilters>({
    profession: searchParams.get('profession')?.split(',').filter(Boolean) || [],
    experience: Number(searchParams.get('exp')) || 0,
    location: searchParams.get('location') || '',
    remote: searchParams.get('remote') === 'true',
    salaryRange: [
      Number(searchParams.get('minSalary')) || 60000, 
      Number(searchParams.get('maxSalary')) || 120000
    ]
  });

  // Debounce function
  const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, delay);
    };
  };

  // Update search params in URL
  const updateUrlParams = useCallback(() => {
    const newParams = new URLSearchParams();
    
    if (query) newParams.set('q', query);
    if (filters.profession.length > 0) newParams.set('profession', filters.profession.join(','));
    if (filters.experience > 0) newParams.set('exp', filters.experience.toString());
    if (filters.location) newParams.set('location', filters.location);
    if (filters.remote) newParams.set('remote', 'true');
    newParams.set('minSalary', filters.salaryRange[0].toString());
    newParams.set('maxSalary', filters.salaryRange[1].toString());
    
    setSearchParams(newParams);
  }, [query, filters, setSearchParams]);

  // Debounced update function
  const debouncedUpdateUrlParams = useCallback(debounce(updateUrlParams, 400), [updateUrlParams]);
  
  // Perform search
  const performSearch = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be an API call
      // For now, we use the mock data and filter it client-side
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredResults = filterTalents(MOCK_TALENTS, query, filters);
      setResults(filteredResults);
    } catch (error) {
      console.error('Error searching talents:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, filters]);

  // Handle query change
  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  // Handle filter change
  const handleFilterChange = (newFilters: TalentSearchFilters) => {
    setFilters(newFilters);
  };

  // Effect to perform search when query or filters change
  useEffect(() => {
    performSearch();
    debouncedUpdateUrlParams();
  }, [query, filters, performSearch, debouncedUpdateUrlParams]);

  return {
    query,
    filters,
    results,
    isLoading,
    handleQueryChange,
    handleFilterChange
  };
};
