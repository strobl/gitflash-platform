
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { SharedNavbar } from '@/components/navigation/SharedNavbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setError('Keine Zahlung gefunden');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId },
        });

        if (error) {
          throw new Error(error.message);
        }

        setPaymentDetails(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten';
        setError(errorMessage);
        toast({
          title: "Fehler",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, toast]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <SharedNavbar />
        <div className="container mx-auto flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-gitflash-primary" />
            <h2 className="text-2xl font-semibold mb-2">Zahlung wird überprüft...</h2>
            <p className="text-muted-foreground">Bitte warten Sie, während wir Ihre Zahlung verarbeiten.</p>
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
              <CardTitle className="text-red-600">Fehler bei der Zahlungsverarbeitung</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error || 'Zahlungsdetails konnten nicht geladen werden'}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/unternehmen')}>
                Zurück zur Übersicht
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
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate('/unternehmen')}>
              Zurück zur Übersicht
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
