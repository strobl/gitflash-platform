
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const JobListings: React.FC = () => {
  const jobs = [
    { 
      id: 1, 
      title: 'Bauleiter:in Hochbau', 
      status: 'Aktiv', 
      applicants: 12, 
      posted: '12.04.2025',
      views: 345
    },
    { 
      id: 2, 
      title: 'Jurist:in Baurecht', 
      status: 'In Prüfung', 
      applicants: 5, 
      posted: '10.04.2025',
      views: 178
    },
    { 
      id: 3, 
      title: 'BIM-Koordinator:in', 
      status: 'Entwurf', 
      applicants: 0, 
      posted: '08.04.2025',
      views: 0
    },
  ];

  return (
    <div className="bg-white shadow-sm rounded-xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gitflash-primary">Jobanzeigen</h2>
          <Button asChild size="sm" className="bg-gitflash-primary hover:bg-gitflash-primary/90">
            <Link to="/unternehmen/jobs/neu">
              <Plus className="mr-1 h-4 w-4" /> Job erstellen
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Jobtitel suchen..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gitflash-primary"
            />
          </div>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Filter className="mr-1 h-4 w-4" /> Filter
          </Button>
        </div>

        {jobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Jobtitel</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Bewerber</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Erstellt am</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">Views</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">Aktionen</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{job.title}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${job.status === 'Aktiv' ? 'bg-green-100 text-green-800' : 
                          job.status === 'In Prüfung' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{job.applicants}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{job.posted}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{job.views}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" className="text-gitflash-primary hover:text-gitflash-primary/70">
                        Bearbeiten
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Noch keine Jobanzeigen vorhanden.</p>
            <Button asChild className="bg-gitflash-primary hover:bg-gitflash-primary/90">
              <Link to="/unternehmen/jobs/neu">Erste Jobanzeige erstellen</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
