
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle, FileText } from 'lucide-react';
import { useOffers } from '@/hooks/useOffers';
import { OfferViewDialog } from './OfferViewDialog';
import { Application } from '@/hooks/useApplications';

interface TalentOfferActionsProps {
  application: Application;
}

export function TalentOfferActions({ application }: TalentOfferActionsProps) {
  const { data: offers = [] } = useOffers({ applicationId: application.id });
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  
  const activeOffer = offers.find(offer => ['sent', 'viewed', 'accepted', 'declined'].includes(offer.status));
  
  if (!activeOffer) {
    return null;
  }

  const getOfferStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'declined': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'viewed': return <Eye className="h-4 w-4 text-blue-600" />;
      case 'sent': return <FileText className="h-4 w-4 text-purple-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getOfferStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'sent': 'Neues Angebot',
      'viewed': 'Angebot angesehen',
      'accepted': 'Angebot angenommen',
      'declined': 'Angebot abgelehnt'
    };
    return statusMap[status] || status;
  };

  const getOfferStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'viewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'declined': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
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
        Angebot ansehen
      </Button>
      
      {selectedOffer && (
        <OfferViewDialog
          offer={selectedOffer}
          userType="talent"
          isOpen={!!selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
}
