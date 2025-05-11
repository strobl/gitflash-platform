
import React, { useState, useEffect } from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { TalentSearchProvider } from '@/context/TalentSearchContext';
import { useTalentSearchContext } from '@/context/TalentSearchContext';
import { TalentSearchBar } from '@/components/unternehmen/suche/TalentSearchBar';
import { SearchFilters } from '@/components/unternehmen/suche/SearchFilters';
import { TalentResultList } from '@/components/unternehmen/suche/TalentResultList';
import { useIsMobile } from '@/hooks/use-mobile';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getRoleRedirectPath } from '@/utils/routingUtils';

// Component that uses the context needs to be inside the provider
const TalentSearchContent = () => {
  const { query, filters, results, isLoading, handleQueryChange, handleFilterChange } = useTalentSearchContext();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const resetSearch = () => {
    handleQueryChange('');
    handleFilterChange({
      profession: [],
      experience: 0,
      location: '',
      remote: false,
      salaryRange: [60000, 120000]
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-4">Talentsuche</h1>
        <p className="text-gray-600 mb-6">
          Finden Sie die besten Talente der Baubranche für Ihre Projekte
        </p>
        
        <div className="mb-6">
          <TalentSearchBar 
            query={query} 
            onQueryChange={handleQueryChange}
            onOpenFilters={() => setIsFiltersOpen(true)}
          />
        </div>
        
        <SearchFilters 
          open={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
          filters={filters}
          onApplyFilters={handleFilterChange}
        />
      </div>
      
      <div className="pb-20 md:pb-0"> {/* Add padding bottom for mobile to prevent content being hidden by nav bar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0A2540]">Ergebnisse</h2>
          {!isLoading && <p className="text-gray-500">{results.length} Talente gefunden</p>}
        </div>
        
        <TalentResultList 
          talents={results}
          isLoading={isLoading}
          activeId={id}
          onResetSearch={results.length === 0 ? resetSearch : undefined}
        />
      </div>
    </div>
  );
};

export default function UnternehmenSuchePage() {
  const { profile, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check authentication and role
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (profile?.role !== 'business' && profile?.role !== 'operator') {
        navigate(getRoleRedirectPath(profile?.role));
      }
    }
  }, [isAuthenticated, profile, isLoading, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SharedNavbar />
      <div className="flex-grow">
        <TalentSearchProvider>
          <TalentSearchContent />
        </TalentSearchProvider>
      </div>
    </div>
  );
}
