
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobDetail } from '@/hooks/useJobDetail';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Calendar, BriefcaseIcon, ArrowLeft, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

export default function PublicJobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { job, isLoading, error } = useJobDetail(id);

  // Function to format the date
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: de });
    } catch (e) {
      return 'Unbekannt';
    }
  };
  
  // Convert HTML content to safe display
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SharedNavbar />
        <div className="flex flex-1 justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin text-gitflash-primary" />
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !job || job.status !== 'Aktiv') {
    return (
      <div className="min-h-screen flex flex-col">
        <SharedNavbar />
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {error || "Job nicht gefunden"}
            </h2>
            <p className="text-gray-600 mb-6">
              Diese Stellenanzeige ist nicht mehr verfügbar oder existiert nicht.
            </p>
            <Button 
              onClick={() => navigate("/jobs")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Zurück zur Jobübersicht
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get job contract type label
  const getJobTypeLabel = (type: string) => {
    switch (type) {
      case 'fulltime': return 'Vollzeit';
      case 'parttime': return 'Teilzeit';
      case 'freelance': return 'Freiberuflich';
      case 'temporary': return 'Befristet';
      default: return type;
    }
  };

  // Format salary range
  const formatSalary = () => {
    if (!job.hourly_rate_min || !job.hourly_rate_max) return 'Auf Anfrage';
    
    if (job.billing_type === 'Stunden') {
      return `${job.hourly_rate_min}€ - ${job.hourly_rate_max}€ / Stunde`;
    } else if (job.billing_type === 'Monat') {
      return `${job.hourly_rate_min}€ - ${job.hourly_rate_max}€ / Monat`;
    } else {
      return `${job.hourly_rate_min}€ - ${job.hourly_rate_max}€ / Tag`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      
      <div className="bg-gitflash-primary/10 py-6">
        <div className="container mx-auto px-4">
          <Button 
            onClick={() => navigate("/jobs")}
            variant="ghost"
            className="flex items-center gap-2 mb-4 text-gitflash-primary"
          >
            <ArrowLeft size={16} /> Zurück zur Jobübersicht
          </Button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
              <h2 className="font-semibold text-xl mb-4">Jobbeschreibung</h2>
              {job.description ? (
                <div 
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={createMarkup(job.description)}
                />
              ) : (
                <p className="text-gray-500 italic">Keine Beschreibung vorhanden.</p>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Info Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-gitflash-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Standort</h3>
                    <p className="text-gray-600">{job.location || 'Remote'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <BriefcaseIcon className="text-gitflash-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Beschäftigungsart</h3>
                    <p className="text-gray-600">{getJobTypeLabel(job.contract_type)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="text-gitflash-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Veröffentlicht</h3>
                    <p className="text-gray-600">{formatDate(job.created_at)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <User className="text-gitflash-primary shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Vergütung</h3>
                    <p className="text-gray-600">{formatSalary()}</p>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Button 
                    className="bg-gitflash-primary hover:bg-gitflash-primary/90 w-full"
                  >
                    Jetzt bewerben
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="font-medium text-gray-900 mb-3">Jobanzeigen-Statistik</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-500 text-sm">Aufrufe</p>
                  <p className="font-semibold text-xl">{job.views || 0}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-500 text-sm">Bewerber</p>
                  <p className="font-semibold text-xl">{job.applicants || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
