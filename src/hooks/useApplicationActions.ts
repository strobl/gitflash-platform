
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CreateActionParams {
  applicationId: string;
  actionType: 'schedule_interview' | 'accept_offer' | 'decline_offer' | 'request_feedback';
  actionData?: any;
}

export function useApplicationActions() {
  const queryClient = useQueryClient();

  const createAction = useMutation({
    mutationFn: async ({ applicationId, actionType, actionData }: CreateActionParams) => {
      console.log('Creating application action:', { applicationId, actionType, actionData });
      
      const { data: user } = await supabase.auth.getUser();
      if (!user.user?.id) {
        throw new Error('Benutzer nicht authentifiziert');
      }

      const { data, error } = await supabase
        .from('application_actions')
        .insert({
          application_id: applicationId,
          action_type: actionType,
          action_data: actionData,
          created_by: user.user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating application action:', error);
        throw error;
      }

      // Also update the application status if needed
      let newStatus = null;
      switch (actionType) {
        case 'accept_offer':
          newStatus = 'offer_accepted';
          break;
        case 'decline_offer':
          newStatus = 'offer_declined';
          break;
        case 'schedule_interview':
          newStatus = 'interview_scheduled';
          break;
      }

      if (newStatus) {
        const { error: updateError } = await supabase
          .from('applications')
          .update({ status: newStatus })
          .eq('id', applicationId);

        if (updateError) {
          console.error('Error updating application status:', updateError);
          // Don't throw here, the action was still created
        }
      }

      return data;
    },
    onSuccess: (data, variables) => {
      const actionLabels: Record<string, string> = {
        'schedule_interview': 'Interview-Anfrage gesendet',
        'accept_offer': 'Angebot angenommen',
        'decline_offer': 'Angebot abgelehnt',
        'request_feedback': 'Feedback-Anfrage gesendet'
      };

      toast.success(actionLabels[variables.actionType] || 'Aktion erfolgreich ausgeführt');
      
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['applications-stats'] });
    },
    onError: (error: any) => {
      console.error('Application action failed:', error);
      toast.error('Fehler beim Ausführen der Aktion: ' + (error.message || 'Unbekannter Fehler'));
    }
  });

  return {
    createAction: createAction.mutateAsync,
    isCreatingAction: createAction.isPending
  };
}
