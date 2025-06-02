
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOffers } from '@/hooks/useOffers';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { 
  User, 
  Euro, 
  Calendar, 
  MapPin, 
  MessageCircle, 
  FileText,
  Clock
} from 'lucide-react';

export function ContractsOverview() {
  const { data: allOffers = [] } = useOffers({});
  
  // Filter für aktive Verträge (akzeptierte Offers)
  const activeContracts = allOffers.filter(offer => offer.status === 'accepted');
  const pendingOffers = allOffers.filter(offer => ['sent', 'viewed'].includes(offer.status));
  
  const formatSalary = (offer: any) => {
    if (!offer.salary_amount) return 'Nicht spezifiziert';
    
    const amount = offer.salary_amount / 100;
    const formatted = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: offer.salary_currency
    }).format(amount);
    
    const typeLabels: Record<string, string> = {
      'hourly': '/Stunde',
      'monthly': '/Monat',
      'yearly': '/Jahr',
      'project': ' (Projekt)'
    };
    
    return `${formatted}${typeLabels[offer.salary_type] || ''}`;
  };

  const getContractTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'full-time': 'Vollzeit',
      'part-time': 'Teilzeit',
      'freelance': 'Freelance',
      'contract': 'Zeitvertrag'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Statistiken */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktive Verträge</p>
                <p className="text-2xl font-bold text-green-600">{activeContracts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Offene Angebote</p>
                <p className="text-2xl font-bold text-orange-600">{pendingOffers.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monatliche Kosten</p>
                <p className="text-2xl font-bold text-blue-600">
                  {new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(
                    activeContracts
                      .filter(c => c.salary_type === 'monthly')
                      .reduce((sum, c) => sum + (c.salary_amount || 0), 0) / 100
                  )}
                </p>
              </div>
              <Euro className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verträge und Angebote */}
      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contracts">Aktive Verträge ({activeContracts.length})</TabsTrigger>
          <TabsTrigger value="offers">Offene Angebote ({pendingOffers.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contracts" className="space-y-4">
          {activeContracts.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Keine aktiven Verträge</h3>
                <p className="text-gray-600">
                  Sobald Kandidaten Ihre Angebote annehmen, erscheinen hier die aktiven Verträge.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {activeContracts.map((contract) => (
                <Card key={contract.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{contract.position_title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <User className="h-4 w-4" />
                          <span>Talent Name</span>
                          <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">
                          {formatSalary(contract)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {getContractTypeLabel(contract.contract_type)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {contract.start_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Start: {new Date(contract.start_date).toLocaleDateString('de-DE')}</span>
                        </div>
                      )}
                      
                      {contract.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{contract.location}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Seit {formatDistanceToNow(new Date(contract.created_at), { locale: de })}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Nachricht
                        </Button>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="offers" className="space-y-4">
          {pendingOffers.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Keine offenen Angebote</h3>
                <p className="text-gray-600">
                  Gehen Sie zu "Bewerbungen", um neue Angebote zu erstellen.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingOffers.map((offer) => (
                <Card key={offer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{offer.position_title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <User className="h-4 w-4" />
                          <span>Talent Name</span>
                          <Badge className={
                            offer.status === 'viewed' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }>
                            {offer.status === 'viewed' ? 'Angesehen' : 'Versendet'}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {formatSalary(offer)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {getContractTypeLabel(offer.contract_type)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Gesendet {formatDistanceToNow(new Date(offer.created_at), { addSuffix: true, locale: de })}
                        {offer.response_deadline && (
                          <span className="ml-2">
                            • Antwort bis {new Date(offer.response_deadline).toLocaleDateString('de-DE')}
                          </span>
                        )}
                      </div>
                      <Button size="sm" variant="outline">
                        Details ansehen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
