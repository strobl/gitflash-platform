
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PaymentDetails {
  payment: {
    id: string;
    status: string;
    amount: number;
    currency: string;
    created_at: string;
  };
  job: {
    id: string;
    title: string;
    status: string;
  };
  session: {
    id: string;
    payment_status: string;
  };
}

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const sessionId = searchParams.get('session_id');

  // Function to verify payment status
  const verifyPayment = async () => {
    if (!sessionId) {
      setError('Keine Zahlung gefunden');
      setLoading(false);
      return;
    }

    try {
      setCheckingStatus(true);
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data && data.payment) {
        setPaymentDetails(data);
        
        // If payment is still pending, set up retry
        if (data.payment.status === 'pending' && retryCount < 5) {
          setTimeout(() => {
            setRetryCount(prevCount => prevCount + 1);
          }, 3000); // Retry after 3 seconds
        } else {
          setLoading(false);
        }
      } else {
        throw new Error('Zahlung konnte nicht verifiziert werden');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten';
      setError(errorMessage);
      toast({
        title: "Fehler",
        description: errorMessage,
        variant: "destructive",
      });
      setLoading(false);
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [sessionId, retryCount]); // Re-run when retryCount changes

  const handleRetryCheck = () => {
    setError(null);
    setRetryCount(prevCount => prevCount + 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SharedNavbar />
        <div className="container mx-auto flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-gitflash-primary" />
            <h2 className="text-2xl font-semibold mb-2">Zahlung wird überprüft...</h2>
            <p className="text-muted-foreground mb-4">Bitte warten Sie, während wir Ihre Zahlung verarbeiten.</p>
            {retryCount > 0 && (
              <p className="text-sm text-muted-foreground">
                Status wird aktualisiert... ({retryCount}/5 Versuche)
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (error || !paymentDetails) {
    return (
      <div className="flex flex-col min-h-screen">
        <SharedNavbar />
        <div className="container mx-auto flex-grow py-12">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <CardTitle className="text-red-600">Fehler bei der Zahlungsverarbeitung</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{error || 'Zahlungsdetails konnten nicht geladen werden'}</p>
              <Alert className="mb-4">
                <AlertDescription>
                  Wenn Sie glauben, dass Ihre Zahlung erfolgreich war, können Sie den Status manuell überprüfen oder unseren Kundendienst kontaktieren.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => navigate('/unternehmen')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück zur Übersicht
              </Button>
              <Button 
                onClick={handleRetryCheck} 
                disabled={checkingStatus}
                className="w-full sm:w-auto"
              >
                {checkingStatus ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Überprüfe...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Status erneut prüfen
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  const formattedAmount = (paymentDetails.payment.amount / 100).toLocaleString('de-DE', {
    style: 'currency',
    currency: paymentDetails.payment.currency,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <SharedNavbar />
      <div className="container mx-auto flex-grow py-12">
        <Card className="max-w-lg mx-auto">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Zahlung erfolgreich!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Job-Titel</h3>
              <p>{paymentDetails.job.title}</p>
            </div>
            <div>
              <h3 className="font-semibold">Betrag</h3>
              <p>{formattedAmount}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>
                {paymentDetails.job.status === 'In Prüfung'
                  ? 'Zahlung erhalten, Job wird jetzt geprüft'
                  : paymentDetails.job.status}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700 mt-4">
              <p>
                <strong>Wichtig:</strong> Ihr Job wurde zur Prüfung eingereicht und wird in Kürze von unserem Team geprüft.
                Sie erhalten eine Benachrichtigung, sobald der Job veröffentlicht wurde.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              onClick={() => navigate('/unternehmen')}
              className="w-full sm:w-auto"
            >
              Zurück zur Übersicht
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate(`/unternehmen/jobs/${paymentDetails.job.id}`)}
              className="w-full sm:w-auto"
            >
              Job-Details ansehen
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
