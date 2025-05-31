
import React, { useState } from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { usePublicJobs } from '@/hooks/usePublicJobs';
import { usePublicInterviews } from '@/hooks/usePublicInterviews';
import { InterviewCard } from '@/components/jobs/InterviewCard';
import { JobTabs } from '@/components/jobs/JobTabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Search, Briefcase, MapPin, Filter, Play, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Jobs() {
  const { jobs, isLoading: jobsLoading, error: jobsError } = usePublicJobs();
  const { interviews, isLoading: interviewsLoading } = usePublicInterviews();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [contractFilter, setContractFilter] = useState('all');

  console.log('🏠 Jobs Page Debug:', {
    interviewsLoading,
    interviewsCount: interviews.length,
    interviews: interviews.map(i => ({ 
      id: i.id, 
      name: i.conversation_name, 
      is_public: i.is_public 
    })),
    jobsLoading,
    jobsCount: jobs.length
  });

  const uniqueLocations = Array.from(new Set(jobs.map(job => job.location)));
  const uniqueContracts = Array.from(new Set(jobs.map(job => job.contract_type)));

  if (jobsLoading || interviewsLoading) {
    console.log('🔄 Still loading... jobsLoading:', jobsLoading, 'interviewsLoading:', interviewsLoading);
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

  console.log('📋 Rendering Jobs page with:', interviews.length, 'interviews');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gitflash-background to-slate-100">
      <SharedNavbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Interview Section - Lead Magnet for all visitors */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-gitflash-primary mr-3" />
              <div>
                <h2 className="text-3xl font-bold text-gitflash-primary">
                  Mit KI Interviews üben
                </h2>
                <p className="text-gitflash-secondary mt-2">
                  Bereiten Sie sich optimal auf Ihre nächste Bewerbung vor
                </p>
              </div>
            </div>
            
            <Button asChild variant="outline" className="hidden md:flex border-gitflash-accent text-gitflash-accent hover:bg-gitflash-accent hover:text-white">
              <Link to="/interviews">
                Alle ansehen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {interviews.length > 0 ? (
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                  {interviews.slice(0, 3).map(interview => (
                    <CarouselItem key={interview.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <InterviewCard interview={interview} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-slate-200">
              <Play className="w-16 h-16 text-gitflash-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gitflash-primary mb-2">
                Bald verfügbar
              </h3>
              <p className="text-gitflash-secondary mb-6">
                Neue KI-Interview-Übungen werden bald verfügbar sein.
              </p>
            </div>
          )}

          <div className="text-center md:hidden mt-6">
            <Button asChild variant="outline" className="border-gitflash-accent text-gitflash-accent hover:bg-gitflash-accent hover:text-white">
              <Link to="/interviews">
                Alle ansehen
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Jobs Section */}
        <section>
          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gitflash-accent" />
              <h3 className="text-lg font-semibold text-gitflash-primary">Jobs finden</h3>
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

            {(searchTerm || locationFilter !== 'all' || contractFilter !== 'all') && (
              <div className="mt-4 flex justify-end">
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
              </div>
            )}
          </div>

          {/* Job Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 text-gitflash-primary mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-gitflash-primary">
                  Aktuelle Stellenanzeigen
                </h2>
                <p className="text-gitflash-secondary">
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
