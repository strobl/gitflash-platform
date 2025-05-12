
import React, { useState } from 'react';
import { useAdminJobApproval } from '@/hooks/useAdminJobApproval';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { Button } from '@/components/ui/button';
import { Check, X, Filter, Search, Loader2 } from 'lucide-react';
import { AdminJobCard } from '@/components/admin/jobs/AdminJobCard';
import { AdminJobApproveDialog } from '@/components/admin/jobs/AdminJobApproveDialog';
import { AdminJobRejectDialog } from '@/components/admin/jobs/AdminJobRejectDialog';
import { useNavigate } from 'react-router-dom';

export default function JobApprovalPage() {
  const { 
    pendingJobs, 
    isLoading, 
    error, 
    approveJob, 
    rejectJob 
  } = useAdminJobApproval();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle job approval
  const handleApproveClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setApproveDialogOpen(true);
  };

  // Handle job rejection
  const handleRejectClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setRejectDialogOpen(true);
  };

  // Handle approve confirmation
  const handleApproveConfirm = async () => {
    if (selectedJobId) {
      await approveJob(selectedJobId);
    }
    setApproveDialogOpen(false);
    setSelectedJobId(null);
  };

  // Handle reject confirmation
  const handleRejectConfirm = async (reason: string) => {
    if (selectedJobId) {
      await rejectJob(selectedJobId, reason);
    }
    setRejectDialogOpen(false);
    setSelectedJobId(null);
  };

  // Filter jobs based on search term
  const filteredJobs = pendingJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gitflash-primary">Job-Freigaben</h1>
              <p className="text-gray-600">Prüfen und verwalten Sie eingereichte Jobs</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/dashboard')}
            >
              Zurück zum Dashboard
            </Button>
          </div>

          {/* Search and filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Job suchen..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gitflash-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                <Filter className="mr-1 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          {/* Job list */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-gitflash-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              <p className="font-medium">Fehler beim Laden der Jobs</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                {searchTerm ? "Keine passenden Jobs gefunden" : "Keine Jobs zur Prüfung"}
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm 
                  ? "Bitte versuchen Sie es mit einem anderen Suchbegriff." 
                  : "Zurzeit gibt es keine Jobs, die auf Freigabe warten."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map(job => (
                <AdminJobCard
                  key={job.id}
                  job={job}
                  onApprove={() => handleApproveClick(job.id)}
                  onReject={() => handleRejectClick(job.id)}
                  onView={() => navigate(`/admin/jobs/${job.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Approval Dialog */}
      <AdminJobApproveDialog
        isOpen={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
        onConfirm={handleApproveConfirm}
        jobTitle={pendingJobs.find(job => job.id === selectedJobId)?.title || ''}
      />

      {/* Reject Dialog */}
      <AdminJobRejectDialog
        isOpen={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onConfirm={handleRejectConfirm}
        jobTitle={pendingJobs.find(job => job.id === selectedJobId)?.title || ''}
      />
    </div>
  );
}
