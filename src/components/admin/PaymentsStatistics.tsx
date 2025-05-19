
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PaymentStat {
  totalRevenue: number;
  monthlyRevenue: {
    month: number;
    revenue: number;
  }[];
  recentPayments: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    created_at: string;
    profiles: {
      name: string;
    };
    jobs: {
      title: string;
    };
  }[];
}

const monthNames = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

export const PaymentsStatistics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<PaymentStat | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-payment-stats');
        
        if (error) {
          throw new Error(error.message);
        }
        
        setStats(data);
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

    fetchStats();
  }, [toast]);

  // Format data for chart
  const formatChartData = () => {
    if (!stats || !stats.monthlyRevenue) return [];
    
    return stats.monthlyRevenue.map(item => ({
      name: monthNames[item.month - 1],
      umsatz: item.revenue
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gitflash-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-700">
        <h3 className="text-lg font-medium mb-2">Fehler beim Laden der Zahlungsstatistiken</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
        <p className="text-blue-700">Keine Zahlungsdaten verfügbar.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
  };

  const formatCurrency = (amount: number, currency: string) => {
    return (amount / 100).toLocaleString('de-DE', {
      style: 'currency',
      currency: currency,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gesamtumsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalRevenue.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {stats.monthlyRevenue && stats.monthlyRevenue.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Monatlicher Umsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `${value.toLocaleString('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                      })}`,
                      'Umsatz'
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="umsatz" fill="#0A2540" name="Umsatz" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {stats.recentPayments && stats.recentPayments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Letzte Zahlungen</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datum</TableHead>
                  <TableHead>Nutzer</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead className="text-right">Betrag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatDate(payment.created_at)}</TableCell>
                    <TableCell>{payment.profiles?.name || 'Unbekannt'}</TableCell>
                    <TableCell>{payment.jobs?.title || 'Unbekannt'}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(payment.amount, payment.currency)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
