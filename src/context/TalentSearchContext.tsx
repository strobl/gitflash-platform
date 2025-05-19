
import React, { createContext, useContext, ReactNode } from 'react';
import { useTalentSearch, TalentSearchFilters } from '@/hooks/useTalentSearch';
import { TalentCardProps } from '@/components/unternehmen/suche/TalentCard';

interface TalentSearchContextType {
  query: string;
  filters: TalentSearchFilters;
  results: Omit<TalentCardProps, 'active'>[];
  isLoading: boolean;
  handleQueryChange: (query: string) => void;
  handleFilterChange: (filters: TalentSearchFilters) => void;
}

const TalentSearchContext = createContext<TalentSearchContextType | undefined>(undefined);

export const TalentSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const searchState = useTalentSearch();
  
  return (
    <TalentSearchContext.Provider value={searchState}>
      {children}
    </TalentSearchContext.Provider>
  );
};

export const useTalentSearchContext = (): TalentSearchContextType => {
  const context = useContext(TalentSearchContext);
  if (!context) {
    throw new Error('useTalentSearchContext must be used within a TalentSearchProvider');
  }
  return context;
};
