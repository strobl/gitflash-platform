
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UpdateApplicationStatusParams {
  applicationId: string;
  newStatus: string;
  notes?: string;
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ applicationId, newStatus, notes }: UpdateApplicationStatusParams) => {
      console.log('Updating application status:', { applicationId, newStatus, notes });
      
      // First check permissions using our debug function
      const { data: permissionCheck } = await supabase
        .rpc('check_application_update_permission', { app_id: applicationId });
      
      console.log('Permission check result:', permissionCheck);
      
      // Update the application status
      const { data, error } = await supabase
        .from('applications')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId)
        .select(`
          *,
          job:jobs(id, title, user_id)
        `)
        .single();

      if (error) {
        console.error('Error updating application status:', error);
        throw new Error(`Fehler beim Status-Update: ${error.message}`);
      }

      if (!data) {
        throw new Error('Bewerbung nicht gefunden oder keine Berechtigung');
      }

      console.log('Application status updated successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      const statusLabels: Record<string, string> = {
        'new': 'Neu',
        'reviewing': 'In Prüfung',
        'interview': 'Interview',
        'interview_scheduled': 'Interview geplant',
        'offer': 'Angebot',
        'offer_pending': 'Angebot ausstehend',
        'offer_accepted': 'Angebot angenommen',
        'offer_declined': 'Angebot abgelehnt',
        'hired': 'Eingestellt',
        'rejected': 'Abgelehnt',
        'withdrawn': 'Zurückgezogen'
      };

      toast.success(`Status erfolgreich zu "${statusLabels[data.status] || data.status}" geändert`);
      
      // Invalidate all application-related queries
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['applications-stats'] });
    },
    onError: (error: any) => {
      console.error('Failed to update application status:', error);
      toast.error(error.message || 'Unbekannter Fehler beim Status-Update');
    },
  });

  return {
    updateStatus: mutation.mutateAsync,
    updating: mutation.isPending,
    error: mutation.error,
  };
}
