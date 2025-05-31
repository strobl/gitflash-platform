
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PublicJobCard } from './PublicJobCard';
import { PublicJob } from '@/hooks/usePublicJobs';
import { Briefcase } from 'lucide-react';

interface JobTabsProps {
  jobs: PublicJob[];
  searchTerm: string;
  locationFilter: string;
  contractFilter: string;
}

export function JobTabs({ jobs, searchTerm, locationFilter, contractFilter }: JobTabsProps) {
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesContract = contractFilter === 'all' || job.contract_type === contractFilter;
    
    return matchesSearch && matchesLocation && matchesContract;
  });

  const sortJobsByMostHired = (jobs: PublicJob[]) => {
    return [...jobs].sort((a, b) => (b.applicants || 0) - (a.applicants || 0));
  };

  const sortJobsByNewest = (jobs: PublicJob[]) => {
    return [...jobs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  };

  const sortJobsByHighestSalary = (jobs: PublicJob[]) => {
    return [...jobs].sort((a, b) => {
      const aMax = parseInt(a.hourly_rate_max) || 0;
      const bMax = parseInt(b.hourly_rate_max) || 0;
      return bMax - aMax;
    });
  };

  const mostHiredJobs = sortJobsByMostHired(filteredJobs);
  const newestJobs = sortJobsByNewest(filteredJobs);
  const highestSalaryJobs = sortJobsByHighestSalary(filteredJobs);

  const renderJobList = (jobs: PublicJob[]) => (
    jobs.length > 0 ? (
      <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
        {jobs.map((job, index) => (
          <div key={job.id}>
            <PublicJobCard job={job} />
            {index < jobs.length - 1 && <div className="border-b border-gray-100" />}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-16">
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200 max-w-lg mx-auto">
          <Briefcase className="w-16 h-16 text-gitflash-accent mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gitflash-primary mb-4">
            Keine Stellenanzeigen gefunden
          </h3>
          <p className="text-gitflash-secondary">
            Versuchen Sie andere Suchkriterien oder entfernen Sie Filter.
          </p>
        </div>
      </div>
    )
  );

  return (
    <Tabs defaultValue="most-hired" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-gitflash-accent/20 rounded-xl p-1">
        <TabsTrigger 
          value="most-hired"
          className="text-gitflash-secondary data-[state=active]:bg-gitflash-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
        >
          Am häufigsten eingestellt
        </TabsTrigger>
        <TabsTrigger 
          value="newest"
          className="text-gitflash-secondary data-[state=active]:bg-gitflash-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
        >
          Neueste Jobs
        </TabsTrigger>
        <TabsTrigger 
          value="highest-salary"
          className="text-gitflash-secondary data-[state=active]:bg-gitflash-primary data-[state=active]:text-white rounded-lg transition-all duration-300"
        >
          Höchstes Gehalt
        </TabsTrigger>
      </TabsList>

      <TabsContent value="most-hired">
        {renderJobList(mostHiredJobs)}
      </TabsContent>

      <TabsContent value="newest">
        {renderJobList(newestJobs)}
      </TabsContent>

      <TabsContent value="highest-salary">
        {renderJobList(highestSalaryJobs)}
      </TabsContent>
    </Tabs>
  );
}
