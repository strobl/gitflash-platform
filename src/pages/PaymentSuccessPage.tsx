
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { Loader2 } from 'lucide-react';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('job_id');
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<any>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (error) throw error;
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        toast.error('Fehler beim Laden der Jobdetails');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return (
    <div className="min-h-screen flex flex-col">
      <SharedNavbar />
      <main className="flex-1 container mx-auto max-w-4xl py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg text-gray-600">Zahlungsinformationen werden verarbeitet...</p>
            </div>
          ) : (
            <>
              <Alert className="bg-green-50 border-green-200 mb-8">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <AlertTitle className="text-green-800 text-xl font-semibold ml-2">
                  Zahlung erfolgreich!
                </AlertTitle>
                <AlertDescription className="ml-8 text-green-700">
                  Ihre Stellenanzeige wurde erfolgreich bezahlt und wird in Kürze veröffentlicht.
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                {jobDetails && (
                  <div className="border rounded-md p-4 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-2">{jobDetails.title}</h2>
                    <div className="text-gray-600 mb-1">Standort: {jobDetails.location}</div>
                    <div className="text-gray-600">Vertragsart: {jobDetails.contract_type}</div>
                    <div className="mt-4 text-gray-500 text-sm">
                      Status: {jobDetails.status === 'active' ? (
                        <span className="text-green-600 font-medium">Aktiv</span>
                      ) : (
                        <span className="text-amber-600 font-medium">Wird bearbeitet</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-8">
                  <Button asChild className="flex-1">
                    <Link to="/unternehmen/jobs">
                      Alle Jobanzeigen anzeigen
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link to={jobId ? `/unternehmen/jobanzeigen/${jobId}` : "/unternehmen/jobs"}>
                      Jobdetails anzeigen
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
