
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUpdateApplicationStatus } from '@/hooks/useUpdateApplicationStatus';
import { useApplicationActions } from '@/hooks/useApplicationActions';
import { Application } from '@/hooks/useApplications';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface TalentActionButtonsProps {
  application: Application;
}

export function TalentActionButtons({ application }: TalentActionButtonsProps) {
  const { updateStatus, updating } = useUpdateApplicationStatus();
  const { createAction, isCreatingAction } = useApplicationActions();
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);

  const handleAcceptOffer = async () => {
    try {
      await createAction({
        applicationId: application.id,
        actionType: 'accept_offer',
        actionData: { message: 'Angebot angenommen' }
      });
    } catch (error) {
      console.error('Error accepting offer:', error);
    }
  };

  const handleDeclineOffer = async () => {
    try {
      await createAction({
        applicationId: application.id,
        actionType: 'decline_offer', 
        actionData: { message: 'Angebot abgelehnt' }
      });
    } catch (error) {
      console.error('Error declining offer:', error);
    }
  };

  const handleRequestFeedback = async () => {
    try {
      await createAction({
        applicationId: application.id,
        actionType: 'request_feedback',
        actionData: { message: 'Feedback angefordert' }
      });
    } catch (error) {
      console.error('Error requesting feedback:', error);
    }
  };

  const handleWithdrawApplication = async () => {
    try {
      await updateStatus({
        applicationId: application.id,
        newStatus: 'withdrawn'
      });
      setShowWithdrawDialog(false);
    } catch (error) {
      console.error('Error withdrawing application:', error);
    }
  };

  const canAcceptOffer = ['offer', 'offer_pending'].includes(application.status);
  const canDeclineOffer = ['offer', 'offer_pending'].includes(application.status);
  const canWithdraw = ['new', 'reviewing'].includes(application.status);
  const canRequestFeedback = ['rejected'].includes(application.status);

  if (!canAcceptOffer && !canDeclineOffer && !canWithdraw && !canRequestFeedback) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {canAcceptOffer && (
        <Button
          onClick={handleAcceptOffer}
          disabled={isCreatingAction}
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Angebot annehmen
        </Button>
      )}

      {canDeclineOffer && (
        <Button
          onClick={handleDeclineOffer}
          disabled={isCreatingAction}
          variant="outline"
          size="sm"
        >
          <XCircle className="h-4 w-4 mr-1" />
          Angebot ablehnen
        </Button>
      )}

      {canRequestFeedback && (
        <Button
          onClick={handleRequestFeedback}
          disabled={isCreatingAction}
          variant="outline"
          size="sm"
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Feedback anfragen
        </Button>
      )}

      {canWithdraw && (
        <AlertDialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Bewerbung zurückziehen
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bewerbung zurückziehen?</AlertDialogTitle>
              <AlertDialogDescription>
                Sind Sie sicher, dass Sie diese Bewerbung zurückziehen möchten? 
                Diese Aktion kann nicht rückgängig gemacht werden.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleWithdrawApplication}
                disabled={updating}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {updating ? 'Wird zurückgezogen...' : 'Zurückziehen'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
