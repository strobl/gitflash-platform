
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, FileText, CheckCircle, XCircle } from 'lucide-react';
import { useOffers } from '@/hooks/useOffers';
import { CreateOfferDialog } from './CreateOfferDialog';
import { OfferViewDialog } from './OfferViewDialog';
import { Application } from '@/hooks/useApplications';

interface BusinessOfferActionsProps {
  application: Application;
}

export function BusinessOfferActions({ application }: BusinessOfferActionsProps) {
  const { data: offers = [] } = useOffers({ applicationId: application.id });
  const [showCreateOffer, setShowCreateOffer] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  
  const activeOffer = offers.find(offer => !['withdrawn', 'expired'].includes(offer.status));
  const hasOffer = !!activeOffer;

  const getOfferStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'declined': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'viewed': return <Eye className="h-4 w-4 text-blue-600" />;
      case 'sent': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'draft': return <FileText className="h-4 w-4 text-gray-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getOfferStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'draft': 'Entwurf',
      'sent': 'Versendet',
      'viewed': 'Angesehen',
      'accepted': 'Angenommen',
      'declined': 'Abgelehnt'
    };
    return statusMap[status] || status;
  };

  const getOfferStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'sent': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'viewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'declined': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-2">
      {hasOffer ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge 
              className={`${getOfferStatusColor(activeOffer.status)} flex items-center gap-1`}
              variant="outline"
            >
              {getOfferStatusIcon(activeOffer.status)}
              {getOfferStatusLabel(activeOffer.status)}
            </Badge>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedOffer(activeOffer)}
            className="w-full"
          >
            <FileText className="h-4 w-4 mr-2" />
            Angebot verwalten
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCreateOffer(true)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Angebot erstellen
        </Button>
      )}
      
      {showCreateOffer && (
        <CreateOfferDialog
          application={application}
          isOpen={showCreateOffer}
          onClose={() => setShowCreateOffer(false)}
        />
      )}
      
      {selectedOffer && (
        <OfferViewDialog
          offer={selectedOffer}
          userType="business"
          isOpen={!!selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
}
