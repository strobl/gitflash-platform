
import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { JobHeader } from '@/components/unternehmen/JobDetail/JobHeader';
import { JobMetaSection } from '@/components/unternehmen/JobDetail/JobMetaSection';
import { JobDescription } from '@/components/unternehmen/JobDetail/JobDescription';
import { ApplicantsTab } from '@/components/unternehmen/JobDetail/ApplicantsTab';
import { StatsTab } from '@/components/unternehmen/JobDetail/StatsTab';
import { CloseJobDialog } from '@/components/unternehmen/JobDetail/CloseJobDialog';
import { useJobDetail } from '@/hooks/useJobDetail';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function JobAnzeigeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile, isLoading: authLoading } = useAuth();
  
  const [activeTab, setActiveTab] = useState<string>("applicants");
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  
  const { 
    job, 
    applicants, 
    stats, 
    isLoading, 
    error, 
    updateJobStatus,
    duplicateJob
  } = useJobDetail(id);
  
  // Callback functions for actions
  const handleEdit = useCallback(() => {
    navigate(`/unternehmen/jobs/bearbeiten/${id}`);
  }, [navigate, id]);
  
  const handleOpenCloseDialog = useCallback(() => {
    setIsCloseDialogOpen(true);
  }, []);
  
  const handleCloseDialog = useCallback(() => {
    setIsCloseDialogOpen(false);
  }, []);
  
  const handleConfirmClose = useCallback(async () => {
    const success = await updateJobStatus('Geschlossen');
    if (success) {
      setIsCloseDialogOpen(false);
    }
  }, [updateJobStatus]);

  // Show loading state
  if (authLoading || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SharedNavbar />
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-80">
            <div className="animate-spin h-10 w-10 border-4 border-gitflash-primary/20 border-t-gitflash-primary rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has business role
  if (profile?.role !== 'business' && profile?.role !== 'operator') {
    return <Navigate to="/talent" replace />;
  }
  
  // Show error state
  if (error || !job) {
    return (
      <div className="flex flex-col min-h-screen">
        <SharedNavbar />
        <div className="container mx-auto py-8 px-4">
          <div className="text-center py-10">
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              {error || "Jobanzeige nicht gefunden"}
            </h2>
            <p className="text-gray-500 mb-6">
              Die angeforderte Jobanzeige konnte nicht geladen werden.
            </p>
            <button 
              onClick={() => navigate("/unternehmen/jobs")}
              className="bg-gitflash-primary text-white px-4 py-2 rounded hover:bg-gitflash-primary/90"
            >
              Zurück zur Übersicht
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SharedNavbar />
      
      <div className="container mx-auto py-8 px-4">
        {/* Job Header with Actions */}
        <JobHeader 
          job={job} 
          onEdit={handleEdit} 
          onClose={handleOpenCloseDialog}
          onDuplicate={duplicateJob}
        />
        
        {/* Job Meta Information */}
        <JobMetaSection 
          job={job} 
          views={stats?.views || 0} 
          applicants={applicants.length}
        />
        
        {/* Tab Navigation */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="applicants">Bewerber</TabsTrigger>
            <TabsTrigger value="description">Beschreibung</TabsTrigger>
            <TabsTrigger value="stats">Statistiken</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applicants">
            <ApplicantsTab applicants={applicants} />
          </TabsContent>
          
          <TabsContent value="description">
            <JobDescription description={job.description} />
          </TabsContent>
          
          <TabsContent value="stats">
            {stats && <StatsTab stats={stats} />}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Close Job Dialog */}
      {job && (
        <CloseJobDialog 
          isOpen={isCloseDialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmClose}
          jobTitle={job.title}
        />
      )}
    </div>
  );
}
