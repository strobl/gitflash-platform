
import React, { useState } from 'react';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { PublicJobsList } from '@/components/jobs/public/PublicJobsList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, BriefcaseIcon } from 'lucide-react';

export default function PublicJobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero section */}
        <div className="bg-gitflash-primary py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Finden Sie Ihren nächsten Job in der Baubranche
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Entdecken Sie die besten Stellenangebote für Fachleute in der Baubranche
              </p>

              {/* Search box */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Jobtitel, Fähigkeiten oder Unternehmen"
                      className="pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="relative flex-grow">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Stadt oder 'Remote'"
                      className="pl-10 w-full"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                  <Button className="bg-gitflash-primary hover:bg-gitflash-primary/90 whitespace-nowrap">
                    Jobs finden
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job listings */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Aktuelle Stellenangebote</h2>
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="text-gitflash-primary" size={20} />
              <span className="font-medium">Jobs für Bauexperten</span>
            </div>
          </div>
          
          <PublicJobsList 
            searchTerm={searchTerm} 
            locationFilter={locationFilter} 
          />
        </div>
      </main>
    </div>
  );
}
