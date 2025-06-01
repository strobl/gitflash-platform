
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Check, X, MessageSquare } from 'lucide-react';
import { useApplicationActions } from '@/hooks/useApplicationActions';
import { Application } from '@/hooks/useApplications';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TalentActionButtonsProps {
  application: Application;
}

export function TalentActionButtons({ application }: TalentActionButtonsProps) {
  const { createAction, isCreatingAction } = useApplicationActions();
  const [declineReason, setDeclineReason] = useState('');
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);

  const handleScheduleInterview = async () => {
    await createAction({
      applicationId: application.id,
      actionType: 'schedule_interview',
      actionData: { message: 'Ich bin bereit für ein Interview. Bitte teilen Sie mir mögliche Termine mit.' }
    });
  };

  const handleAcceptOffer = async () => {
    await createAction({
      applicationId: application.id,
      actionType: 'accept_offer',
      actionData: { accepted_at: new Date().toISOString() }
    });
  };

  const handleDeclineOffer = async () => {
    await createAction({
      applicationId: application.id,
      actionType: 'decline_offer',
      actionData: { reason: declineReason, declined_at: new Date().toISOString() }
    });
    setIsDeclineDialogOpen(false);
    setDeclineReason('');
  };

  const handleRequestFeedback = async () => {
    await createAction({
      applicationId: application.id,
      actionType: 'request_feedback',
      actionData: { message: 'Ich würde gerne Feedback zu meiner Bewerbung erhalten.' }
    });
  };

  const getActionButtons = () => {
    switch (application.status) {
      case 'interview':
        return (
          <Button
            onClick={handleScheduleInterview}
            disabled={isCreatingAction}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Interview planen
          </Button>
        );

      case 'offer':
      case 'offer_pending':
        return (
          <div className="flex gap-2">
            <Button
              onClick={handleAcceptOffer}
              disabled={isCreatingAction}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="mr-2 h-4 w-4" />
              Angebot annehmen
            </Button>
            
            <Dialog open={isDeclineDialogOpen} onOpenChange={setIsDeclineDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                  <X className="mr-2 h-4 w-4" />
                  Ablehnen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Angebot ablehnen</DialogTitle>
                  <DialogDescription>
                    Möchten Sie uns mitteilen, warum Sie das Angebot ablehnen?
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="decline-reason">Grund (optional)</Label>
                    <Textarea
                      id="decline-reason"
                      value={declineReason}
                      onChange={(e) => setDeclineReason(e.target.value)}
                      placeholder="Zum Beispiel: Gehalt entspricht nicht meinen Vorstellungen..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDeclineDialogOpen(false)}>
                      Abbrechen
                    </Button>
                    <Button 
                      onClick={handleDeclineOffer}
                      disabled={isCreatingAction}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Angebot ablehnen
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );

      case 'rejected':
        return (
          <Button
            onClick={handleRequestFeedback}
            disabled={isCreatingAction}
            variant="outline"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Feedback anfragen
          </Button>
        );

      case 'offer_accepted':
        return (
          <Badge className="bg-green-100 text-green-800">
            Angebot angenommen
          </Badge>
        );

      case 'offer_declined':
        return (
          <Badge className="bg-red-100 text-red-800">
            Angebot abgelehnt
          </Badge>
        );

      case 'interview_scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Calendar className="mr-1 h-3 w-3" />
            Interview geplant
          </Badge>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getActionButtons()}
    </div>
  );
}
