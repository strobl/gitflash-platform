
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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatDistanceToNow, format } from 'date-fns';
import { de } from 'date-fns/locale';
import { CheckCircle, XCircle, Eye, Clock, MapPin, Calendar, Euro, FileText } from 'lucide-react';
import { useUpdateOffer } from '@/hooks/useUpdateOffer';
import { Offer } from '@/hooks/useOffers';

interface OfferViewDialogProps {
  offer: Offer;
  userType: 'talent' | 'business';
  isOpen: boolean;
  onClose: () => void;
}

export function OfferViewDialog({ offer, userType, isOpen, onClose }: OfferViewDialogProps) {
  const { updateOffer, updating } = useUpdateOffer();
  const [responseMessage, setResponseMessage] = useState('');
  
  // Mark as viewed when opened by talent
  useState(() => {
    if (userType === 'talent' && !offer.viewed_at && isOpen) {
      updateOffer({ offerId: offer.id, viewed_at: new Date().toISOString() });
    }
  });

  const handleAccept = async () => {
    await updateOffer({
      offerId: offer.id,
      status: 'accepted',
      response_message: responseMessage || 'Angebot angenommen'
    });
    onClose();
  };

  const handleDecline = async () => {
    await updateOffer({
      offerId: offer.id,
      status: 'declined',
      response_message: responseMessage || 'Angebot abgelehnt'
    });
    onClose();
  };

  const handleSendOffer = async () => {
    await updateOffer({
      offerId: offer.id,
      status: 'sent'
    });
    onClose();
  };

  const handleWithdraw = async () => {
    await updateOffer({
      offerId: offer.id,
      status: 'withdrawn'
    });
    onClose();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'declined': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'viewed': return <Eye className="h-4 w-4 text-blue-600" />;
      case 'sent': return <FileText className="h-4 w-4 text-purple-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'draft': 'Entwurf',
      'sent': 'Versendet',
      'viewed': 'Angesehen',
      'accepted': 'Angenommen',
      'declined': 'Abgelehnt',
      'expired': 'Abgelaufen',
      'withdrawn': 'Zurückgezogen'
    };
    return statusMap[status] || status;
  };

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

  const canAcceptDecline = userType === 'talent' && ['sent', 'viewed'].includes(offer.status);
  const canSend = userType === 'business' && offer.status === 'draft';
  const canWithdraw = userType === 'business' && ['sent', 'viewed'].includes(offer.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              {getStatusIcon(offer.status)}
              Angebot: {offer.position_title}
            </DialogTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              {getStatusLabel(offer.status)}
            </Badge>
          </div>
          <DialogDescription>
            {userType === 'talent' 
              ? 'Überprüfen Sie die Angebotsdetails und entscheiden Sie über Ihre Antwort'
              : 'Angebots-Übersicht und Verwaltung'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm font-medium">Gehalt</div>
                <div className="text-sm text-muted-foreground">{formatSalary()}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <div>
                <div className="text-sm font-medium">Vertragsart</div>
                <div className="text-sm text-muted-foreground">{getContractTypeLabel(offer.contract_type)}</div>
              </div>
            </div>
            
            {offer.start_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium">Startdatum</div>
                  <div className="text-sm text-muted-foreground">{format(new Date(offer.start_date), 'dd.MM.yyyy')}</div>
                </div>
              </div>
            )}
            
            {offer.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium">Arbeitsort</div>
                  <div className="text-sm text-muted-foreground">{offer.location}</div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Additional Details */}
          {offer.working_hours && (
            <div>
              <div className="text-sm font-medium mb-1">Arbeitszeiten</div>
              <div className="text-sm text-muted-foreground">{offer.working_hours}</div>
            </div>
          )}

          {offer.benefits && (
            <div>
              <div className="text-sm font-medium mb-1">Benefits & Zusatzleistungen</div>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap">{offer.benefits}</div>
            </div>
          )}

          {offer.additional_terms && (
            <div>
              <div className="text-sm font-medium mb-1">Zusätzliche Bedingungen</div>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap">{offer.additional_terms}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {offer.remote_work_allowed && (
              <Badge variant="secondary">Remote möglich</Badge>
            )}
            {offer.is_negotiable && (
              <Badge variant="secondary">Verhandelbar</Badge>
            )}
            {offer.counter_offer_allowed && (
              <Badge variant="secondary">Gegenangebote erlaubt</Badge>
            )}
          </div>

          <Separator />

          {/* Timeline Info */}
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Erstellt: {formatDistanceToNow(new Date(offer.created_at), { addSuffix: true, locale: de })}</div>
            {offer.viewed_at && (
              <div>Angesehen: {formatDistanceToNow(new Date(offer.viewed_at), { addSuffix: true, locale: de })}</div>
            )}
            {offer.response_deadline && (
              <div>Antwort bis: {format(new Date(offer.response_deadline), 'dd.MM.yyyy HH:mm')}</div>
            )}
          </div>

          {/* Response Message for Talent */}
          {canAcceptDecline && (
            <div>
              <Label htmlFor="response_message">Nachricht (optional)</Label>
              <Textarea
                id="response_message"
                placeholder="Ihre Nachricht zu diesem Angebot..."
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows={3}
              />
            </div>
          )}

          {/* Previous Response */}
          {offer.response_message && (
            <div>
              <div className="text-sm font-medium mb-1">Antwort</div>
              <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded border">
                {offer.response_message}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Schließen
          </Button>
          
          {canSend && (
            <Button onClick={handleSendOffer} disabled={updating}>
              {updating ? 'Wird versendet...' : 'Angebot versenden'}
            </Button>
          )}
          
          {canWithdraw && (
            <Button variant="outline" onClick={handleWithdraw} disabled={updating}>
              {updating ? 'Wird zurückgezogen...' : 'Zurückziehen'}
            </Button>
          )}
          
          {canAcceptDecline && (
            <>
              <Button variant="outline" onClick={handleDecline} disabled={updating}>
                {updating ? 'Wird abgelehnt...' : 'Ablehnen'}
              </Button>
              <Button onClick={handleAccept} disabled={updating}>
                {updating ? 'Wird angenommen...' : 'Annehmen'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
