
import React, { useState } from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { PublicJobCard } from '@/components/jobs/PublicJobCard';
import { usePublicJobs } from '@/hooks/usePublicJobs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Briefcase } from 'lucide-react';

export default function Jobs() {
  const { jobs, isLoading, error } = usePublicJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [contractFilter, setContractFilter] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesContract = !contractFilter || job.contract_type === contractFilter;
    
    return matchesSearch && matchesLocation && matchesContract;
  });

  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));
  const uniqueContracts = Array.from(new Set(jobs.map(job => job.contract_type)));

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SharedNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <SharedNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Fehler beim Laden</h2>
            <p className="text-gray-600">Die Stellenanzeigen konnten nicht geladen werden.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SharedNavbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gitflash-primary mb-2">
            Stellenanzeigen
          </h1>
          <p className="text-xl text-gray-600">
            Entdecken Sie passende Karrieremöglichkeiten in der Baubranche
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Suche nach Position oder Beschreibung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Ort auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle Orte</SelectItem>
                {uniqueLocations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={contractFilter} onValueChange={setContractFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Vertragsart" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle Vertragsarten</SelectItem>
                {uniqueContracts.map(contract => (
                  <SelectItem key={contract} value={contract}>
                    {contract}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center mb-6">
          <Briefcase className="w-5 h-5 text-gitflash-primary mr-2" />
          <span className="text-gray-700 font-medium">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Stellenanzeige' : 'Stellenanzeigen'} gefunden
          </span>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <PublicJobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Keine Stellenanzeigen gefunden
            </h3>
            <p className="text-gray-600">
              {searchTerm || locationFilter || contractFilter
                ? 'Versuchen Sie andere Suchkriterien.'
                : 'Derzeit sind keine öffentlichen Stellenanzeigen verfügbar.'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
