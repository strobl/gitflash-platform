
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Offer } from '@/hooks/useOffers';
import { 
  Euro, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

interface OfferViewDialogProps {
  offer: Offer;
  userType: 'talent' | 'business';
  isOpen: boolean;
  onClose: () => void;
}

export function OfferViewDialog({ offer, userType, isOpen, onClose }: OfferViewDialogProps) {
  const [responding, setResponding] = useState(false);

  const formatSalary = () => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-purple-100 text-purple-800';
      case 'viewed': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'draft': 'Entwurf',
      'sent': 'Versendet',
      'viewed': 'Angesehen',
      'accepted': 'Angenommen',
      'declined': 'Abgelehnt'
    };
    return statusMap[status] || status;
  };

  const handleResponse = async (response: 'accept' | 'decline') => {
    setResponding(true);
    // TODO: Implement actual response logic
    console.log(`${response === 'accept' ? 'Accepting' : 'Declining'} offer:`, offer.id);
    
    // Simulate API call
    setTimeout(() => {
      setResponding(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{offer.position_title}</DialogTitle>
              <DialogDescription>
                Angebot erstellt am {new Date(offer.created_at).toLocaleDateString('de-DE')}
              </DialogDescription>
            </div>
            <Badge className={getStatusColor(offer.status)}>
              {getStatusLabel(offer.status)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Finanzielle Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Euro className="h-5 w-5" />
                Vergütung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-2">
                {formatSalary()}
              </div>
              <div className="text-sm text-gray-600">
                {getContractTypeLabel(offer.contract_type)}
                {offer.working_hours && ` • ${offer.working_hours}`}
              </div>
            </CardContent>
          </Card>

          {/* Arbeitsdetails */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Arbeitsdetails
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {offer.start_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">
                    Startdatum: {new Date(offer.start_date).toLocaleDateString('de-DE')}
                  </span>
                </div>
              )}
              
              {offer.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{offer.location}</span>
                  {offer.remote_work_allowed && (
                    <Badge variant="outline" className="ml-2">Remote möglich</Badge>
                  )}
                </div>
              )}

              {offer.working_hours && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{offer.working_hours}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          {offer.benefits && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Benefits & Zusatzleistungen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{offer.benefits}</p>
              </CardContent>
            </Card>
          )}

          {/* Zusätzliche Bedingungen */}
          {offer.additional_terms && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Zusätzliche Bedingungen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{offer.additional_terms}</p>
              </CardContent>
            </Card>
          )}

          {/* Response Deadline */}
          {offer.response_deadline && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-orange-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    Antwort bis: {new Date(offer.response_deadline).toLocaleDateString('de-DE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <div className="flex gap-2 w-full">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Schließen
            </Button>
            
            {userType === 'talent' && offer.status === 'sent' && (
              <>
                <Button 
                  variant="destructive" 
                  onClick={() => handleResponse('decline')}
                  disabled={responding}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  {responding ? 'Wird abgelehnt...' : 'Ablehnen'}
                </Button>
                <Button 
                  onClick={() => handleResponse('accept')}
                  disabled={responding}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {responding ? 'Wird angenommen...' : 'Annehmen'}
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
