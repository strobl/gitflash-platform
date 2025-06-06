
import React, { useState } from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { usePublicJobs } from '@/hooks/usePublicJobs';
import { JobTabs } from '@/components/jobs/JobTabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, MapPin, Filter } from 'lucide-react';

export default function Jobs() {
  const { jobs, isLoading: jobsLoading, error: jobsError } = usePublicJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [contractFilter, setContractFilter] = useState('all');

  console.log('🏠 Jobs Page Debug:', {
    jobsLoading,
    jobsCount: jobs.length
  });

  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));
  const uniqueContracts = Array.from(new Set(jobs.map(job => job.contract_type)));

  if (jobsLoading) {
    console.log('🔄 Still loading... jobsLoading:', jobsLoading);
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gitflash-background to-slate-100">
        <SharedNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-4"></div>
            <p className="text-gitflash-secondary">Inhalte werden geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  if (jobsError) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gitflash-background to-slate-100">
        <SharedNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gitflash-primary mb-2">Fehler beim Laden</h2>
            <p className="text-gitflash-secondary">Die Inhalte konnten nicht geladen werden.</p>
          </div>
        </div>
      </div>
    );
  }

  console.log('📋 Rendering Jobs page with:', jobs.length, 'jobs');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gitflash-background to-slate-100">
      <SharedNavbar />

      <main className="flex-1 container mx-auto px-4 pt-6 lg:pt-8 pb-16">
        {/* Search and Filters */}
        <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-xl mb-6 lg:mb-8 border border-slate-200">
          <div className="flex items-center gap-2 mb-3 lg:mb-4">
            <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-gitflash-accent" />
            <h3 className="text-base lg:text-lg font-semibold text-gitflash-primary">Jobs finden</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <div className="sm:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gitflash-accent w-4 h-4 lg:w-5 lg:h-5" />
              <Input
                placeholder="Suche nach Position oder Beschreibung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 lg:pl-10 border-gitflash-accent/30 focus:border-gitflash-accent h-10 lg:h-12 text-sm lg:text-base"
              />
            </div>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="h-10 lg:h-12 border-gitflash-accent/30 focus:border-gitflash-accent text-sm lg:text-base">
                <MapPin className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-gitflash-accent" />
                <SelectValue placeholder="Ort auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Orte</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={contractFilter} onValueChange={setContractFilter}>
              <SelectTrigger className="h-10 lg:h-12 border-gitflash-accent/30 focus:border-gitflash-accent text-sm lg:text-base">
                <Briefcase className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-gitflash-accent" />
                <SelectValue placeholder="Vertragsart" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Vertragsarten</SelectItem>
                {uniqueContracts.map(contract => (
                  <SelectItem key={contract} value={contract}>
                    {contract}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || locationFilter !== 'all' || contractFilter !== 'all') && (
            <div className="mt-3 lg:mt-4 flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('all');
                  setContractFilter('all');
                }}
                className="border-gitflash-accent text-gitflash-accent hover:bg-gitflash-accent hover:text-white text-sm lg:text-base px-3 lg:px-4 py-2"
                size="sm"
              >
                Filter zurücksetzen
              </Button>
            </div>
          )}
        </div>

        {/* Jobs Section */}
        <section>
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 lg:w-6 lg:h-6 text-gitflash-primary mr-2 lg:mr-3" />
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gitflash-primary">
                  Aktuelle Stellenanzeigen
                </h2>
                <p className="text-sm lg:text-base text-gitflash-secondary">
                  Entdecken Sie passende Karrieremöglichkeiten
                </p>
              </div>
            </div>
          </div>

          <JobTabs 
            jobs={jobs}
            searchTerm={searchTerm}
            locationFilter={locationFilter}
            contractFilter={contractFilter}
          />
        </section>
      </main>
    </div>
  );
}
