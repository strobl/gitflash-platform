
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UpdateApplicationStatusParams {
  applicationId: string;
  currentVersion: number;
  newStatus: string;
  notes?: string;
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ applicationId, newStatus, notes }: UpdateApplicationStatusParams) => {
      console.log('Updating application status:', { applicationId, newStatus, notes });
      
      const { data, error } = await supabase
        .from('applications')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId)
        .select()
        .single();

      if (error) {
        console.error('Error updating application status:', error);
        throw error;
      }

      console.log('Application status updated successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      // Show success notification
      const statusLabels: Record<string, string> = {
        'new': 'Neu',
        'reviewing': 'In Prüfung',
        'interview': 'Interview', 
        'offer': 'Angebot',
        'hired': 'Eingestellt',
        'rejected': 'Abgelehnt'
      };

      toast.success(`Status zu "${statusLabels[data.status] || data.status}" geändert`);
      
      // Invalidate all related queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['applications-stats'] });
    },
    onError: (error: any) => {
      console.error('Failed to update application status:', error);
      toast.error('Fehler beim Aktualisieren des Status: ' + (error.message || 'Unbekannter Fehler'));
    },
  });

  return {
    updateStatus: mutation.mutateAsync,
    updating: mutation.isPending,
    error: mutation.error,
  };
}
