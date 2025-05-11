
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader, Download, Check, AlertTriangle, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Contract {
  id: string;
  title: string;
  company_name: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  amount: number;
  created_at: string;
  invoice_url?: string;
}

export const PaymentsView: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        
        // In einem echten Szenario würden wir hier die Verträge aus der Datenbank laden
        // Da wir noch keine Verträge-Tabelle haben, verwenden wir Beispieldaten
        // const { data, error } = await supabase
        //   .from('contracts')
        //   .select('*')
        //   .eq('user_id', user.id)
        //   .order('created_at', { ascending: false });
        
        // if (error) throw error;
        
        // Demo-Daten für die Anzeige
        const mockContracts: Contract[] = [
          {
            id: '1',
            title: 'Baurechtliche Beratung',
            company_name: 'Müller Bau GmbH',
            status: 'active',
            amount: 2500,
            created_at: '2025-04-15T10:00:00Z',
            invoice_url: 'https://example.com/invoice-123.pdf'
          },
          {
            id: '2',
            title: 'Projektmanagement Bürogebäude',
            company_name: 'Schmidt Immobilien AG',
            status: 'pending',
            amount: 4800,
            created_at: '2025-05-02T14:30:00Z'
          },
          {
            id: '3',
            title: 'Baurechtsanalyse',
            company_name: 'Becker Architekten',
            status: 'completed',
            amount: 1200,
            created_at: '2025-03-20T09:15:00Z',
            invoice_url: 'https://example.com/invoice-456.pdf'
          }
        ];
        
        setContracts(mockContracts);
      } catch (error) {
        console.error('Error fetching contracts:', error);
        toast({
          title: "Fehler",
          description: "Verträge konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, [user?.id]);

  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Ausstehend</Badge>;
      case 'active':
        return <Badge className="bg-green-500">Aktiv</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Abgeschlossen</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Storniert</Badge>;
      default:
        return <Badge>Unbekannt</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Meine Verträge & Zahlungen</h2>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader className="h-8 w-8 animate-spin text-gitflash-primary" />
        </div>
      ) : contracts.length > 0 ? (
        <div className="space-y-4">
          {contracts.map((contract) => (
            <Card key={contract.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{contract.title}</CardTitle>
                    <CardDescription>{contract.company_name}</CardDescription>
                  </div>
                  {getStatusBadge(contract.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Betrag</p>
                    <p className="text-lg font-semibold">{formatCurrency(contract.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Datum</p>
                    <p>{formatDate(contract.created_at)}</p>
                  </div>
                  <div className="flex justify-start md:justify-end">
                    {contract.invoice_url ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={contract.invoice_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Rechnung
                        </a>
                      </Button>
                    ) : contract.status === 'pending' ? (
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-sm">Zahlung ausstehend</span>
                      </div>
                    ) : contract.status === 'active' ? (
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Vertrag aktiv</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <CreditCard className="w-12 h-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">Keine Verträge vorhanden</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Sie haben noch keine aktiven Verträge oder Zahlungen. 
                Stöbern Sie in den verfügbaren Jobs oder warten Sie auf Anfragen von Unternehmen.
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/talent/erkunden')}
              >
                Jobs erkunden
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
