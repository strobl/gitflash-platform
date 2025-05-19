
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface Payment {
  id: string;
  status: string;
  amount: number;
  currency: string;
  created_at: string;
  job: {
    id: string;
    title: string;
    status: string;
  };
}

export const PaymentHistory: React.FC = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('payments')
          .select(`
            id,
            status,
            amount,
            currency,
            created_at,
            job_id,
            jobs(id, title, status)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform the data to match our interface
        const formattedPayments = data.map(payment => ({
          id: payment.id,
          status: payment.status,
          amount: payment.amount,
          currency: payment.currency,
          created_at: payment.created_at,
          job: payment.jobs
        }));

        setPayments(formattedPayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
        toast.error('Fehler beim Laden der Zahlungen');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  const formatAmount = (amount: number, currency: string) => {
    return (amount / 100).toLocaleString('de-DE', {
      style: 'currency',
      currency: currency,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <Badge className="bg-green-500">Erfolgreich</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">In Bearbeitung</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Fehlgeschlagen</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Zahlungshistorie</CardTitle>
          <CardDescription>Ihre vergangenen Zahlungen</CardDescription>
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (payments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Zahlungshistorie</CardTitle>
          <CardDescription>Ihre vergangenen Zahlungen</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Sie haben noch keine Zahlungen getätigt.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zahlungshistorie</CardTitle>
        <CardDescription>Ihre vergangenen Zahlungen</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map(payment => (
            <div key={payment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{payment.job?.title || 'Unnamed Job'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(payment.created_at), { addSuffix: true, locale: de })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(payment.status)}
                  <span className="font-medium">{formatAmount(payment.amount, payment.currency)}</span>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Job Status: </span>
                <span>{payment.job?.status || 'Unbekannt'}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
