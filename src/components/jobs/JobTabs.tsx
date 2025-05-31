
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { JobList } from './JobList';
import { PublicJob } from '@/hooks/usePublicJobs';

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

  return (
    <Tabs defaultValue="most-hired" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6 lg:mb-8 bg-white border border-gitflash-accent/20 rounded-xl p-1">
        <TabsTrigger 
          value="most-hired"
          className="text-gitflash-secondary data-[state=active]:bg-gitflash-primary data-[state=active]:text-white rounded-lg transition-all duration-300 text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4 py-2"
        >
          <span className="hidden sm:inline">Am häufigsten eingestellt</span>
          <span className="sm:hidden">Häufigste</span>
        </TabsTrigger>
        <TabsTrigger 
          value="newest"
          className="text-gitflash-secondary data-[state=active]:bg-gitflash-primary data-[state=active]:text-white rounded-lg transition-all duration-300 text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4 py-2"
        >
          <span className="hidden sm:inline">Neueste Jobs</span>
          <span className="sm:hidden">Neueste</span>
        </TabsTrigger>
        <TabsTrigger 
          value="highest-salary"
          className="text-gitflash-secondary data-[state=active]:bg-gitflash-primary data-[state=active]:text-white rounded-lg transition-all duration-300 text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4 py-2"
        >
          <span className="hidden sm:inline">Höchstes Gehalt</span>
          <span className="sm:hidden">Höchste</span>
        </TabsTrigger>
      </TabsList>

      <div className="space-y-4">
        <TabsContent value="most-hired">
          <JobList jobs={mostHiredJobs} title="Am häufigsten eingestellt" />
        </TabsContent>

        <TabsContent value="newest">
          <JobList jobs={newestJobs} title="Neueste Jobs" />
        </TabsContent>

        <TabsContent value="highest-salary">
          <JobList jobs={highestSalaryJobs} title="Höchstes Gehalt" />
        </TabsContent>
      </div>
    </Tabs>
  );
}
