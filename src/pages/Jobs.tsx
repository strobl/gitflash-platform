
import React, { useState } from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { PublicJobCard } from '@/components/jobs/PublicJobCard';
import { usePublicJobs } from '@/hooks/usePublicJobs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, TrendingUp, Users, MapPin, Filter } from 'lucide-react';

export default function Jobs() {
  const { jobs, isLoading, error } = usePublicJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [contractFilter, setContractFilter] = useState('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesContract = contractFilter === 'all' || job.contract_type === contractFilter;
    
    return matchesSearch && matchesLocation && matchesContract;
  });

  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));
  const uniqueContracts = Array.from(new Set(jobs.map(job => job.contract_type)));

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gitflash-background to-slate-100">
        <SharedNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full mx-auto mb-4"></div>
            <p className="text-gitflash-secondary">Stellenanzeigen werden geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gitflash-background to-slate-100">
        <SharedNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gitflash-primary mb-2">Fehler beim Laden</h2>
            <p className="text-gitflash-secondary">Die Stellenanzeigen konnten nicht geladen werden.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gitflash-background to-slate-100">
      <SharedNavbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gitflash-primary via-gitflash-secondary to-gitflash-accent text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ihre Karriere in der
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Baubranche
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Entdecken Sie passende Karrieremöglichkeiten bei führenden Bauunternehmen. 
            Von Projektmanagement bis Bauingenieurwesen – Ihr Traumjob wartet.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Briefcase className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-white">{jobs.length}+</div>
              <div className="text-white/80">Aktuelle Stellen</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-white/80">Erfolgreiche Vermittlungen</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-white/80">Zufriedenheitsrate</div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gitflash-accent" />
            <h3 className="text-lg font-semibold text-gitflash-primary">Filter & Suche</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gitflash-accent w-5 h-5" />
              <Input
                placeholder="Suche nach Position oder Beschreibung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gitflash-accent/30 focus:border-gitflash-accent h-12"
              />
            </div>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="h-12 border-gitflash-accent/30 focus:border-gitflash-accent">
                <MapPin className="w-4 h-4 mr-2 text-gitflash-accent" />
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
              <SelectTrigger className="h-12 border-gitflash-accent/30 focus:border-gitflash-accent">
                <Briefcase className="w-4 h-4 mr-2 text-gitflash-accent" />
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
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Briefcase className="w-6 h-6 text-gitflash-primary mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gitflash-primary">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Stellenanzeige' : 'Stellenanzeigen'}
              </h2>
              <p className="text-gitflash-secondary">
                {searchTerm || locationFilter !== 'all' || contractFilter !== 'all' 
                  ? 'Gefilterte Ergebnisse' 
                  : 'Alle verfügbaren Positionen'
                }
              </p>
            </div>
          </div>
          
          {(searchTerm || locationFilter !== 'all' || contractFilter !== 'all') && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('all');
                setContractFilter('all');
              }}
              className="border-gitflash-accent text-gitflash-accent hover:bg-gitflash-accent hover:text-white"
            >
              Filter zurücksetzen
            </Button>
          )}
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map(job => (
              <PublicJobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200 max-w-lg mx-auto">
              <Briefcase className="w-16 h-16 text-gitflash-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gitflash-primary mb-4">
                Keine Stellenanzeigen gefunden
              </h3>
              <p className="text-gitflash-secondary mb-6">
                {searchTerm || locationFilter !== 'all' || contractFilter !== 'all'
                  ? 'Versuchen Sie andere Suchkriterien oder entfernen Sie Filter.'
                  : 'Derzeit sind keine öffentlichen Stellenanzeigen verfügbar.'
                }
              </p>
              {(searchTerm || locationFilter !== 'all' || contractFilter !== 'all') && (
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setLocationFilter('all');
                    setContractFilter('all');
                  }}
                  className="bg-gitflash-primary hover:bg-gitflash-secondary text-white"
                >
                  Alle Jobs anzeigen
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
