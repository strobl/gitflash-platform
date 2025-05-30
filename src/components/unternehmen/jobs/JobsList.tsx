
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter, Trash2, Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useJobsList } from '@/hooks/useJobsList';
import { EmptyState } from '@/components/unternehmen/jobs/EmptyState';
import { JobStatusBadge } from '@/components/unternehmen/jobs/JobStatusBadge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const JobsList: React.FC = () => {
  const { jobs, isLoading, deleteJob } = useJobsList();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<{ id: string; title: string } | null>(null);
  const navigate = useNavigate();

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleJobClick = (jobId: string) => {
    navigate(`/unternehmen/jobanzeigen/${jobId}`);
  };

  const handleEditClick = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    navigate(`/unternehmen/jobs/bearbeiten/${jobId}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, job: { id: string; title: string }) => {
    e.stopPropagation();
    setJobToDelete(job);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;
    
    try {
      await deleteJob(jobToDelete.id);
      setDeleteDialogOpen(false);
      setJobToDelete(null);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
      </div>
    );
  }

  return (
    <>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Filter className="mr-1 h-4 w-4" /> Filter
            </Button>
          </div>

          {filteredJobs.length > 0 ? (
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
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleJobClick(job.id)}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{job.title}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <JobStatusBadge status={job.status} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{job.applicants}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{job.posted}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{job.views}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gitflash-primary hover:text-gitflash-primary/70"
                            onClick={(e) => handleEditClick(e, job.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={(e) => handleDeleteClick(e, { id: job.id, title: job.title })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Jobanzeige löschen</AlertDialogTitle>
            <AlertDialogDescription>
              Sind Sie sicher, dass Sie die Jobanzeige "{jobToDelete?.title}" löschen möchten? 
              Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Löschen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
