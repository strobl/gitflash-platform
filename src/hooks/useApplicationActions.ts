
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
      const { data, error } = await supabase
        .from('application_actions')
        .insert({
          application_id: applicationId,
          action_type: actionType,
          action_data: actionData,
          created_by: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast.success('Aktion erfolgreich ausgeführt');
    },
    onError: (error: any) => {
      toast.error('Fehler beim Ausführen der Aktion: ' + error.message);
    }
  });

  return {
    createAction: createAction.mutateAsync,
    isCreatingAction: createAction.isPending
  };
}
