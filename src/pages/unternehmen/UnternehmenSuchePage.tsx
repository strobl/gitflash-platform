
import React, { useState } from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { TalentSearchProvider } from '@/context/TalentSearchContext';
import { useTalentSearchContext } from '@/context/TalentSearchContext';
import { TalentSearchBar } from '@/components/unternehmen/suche/TalentSearchBar';
import { SearchFilters } from '@/components/unternehmen/suche/SearchFilters';
import { TalentResultList } from '@/components/unternehmen/suche/TalentResultList';

// Component that uses the context needs to be inside the provider
const TalentSearchContent = () => {
  const { query, filters, results, isLoading, handleQueryChange, handleFilterChange } = useTalentSearchContext();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0A2540]">Ergebnisse</h2>
          {!isLoading && <p className="text-gray-500">{results.length} Talente gefunden</p>}
        </div>
        
        <TalentResultList 
          talents={results}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default function UnternehmenSuchePage() {
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
