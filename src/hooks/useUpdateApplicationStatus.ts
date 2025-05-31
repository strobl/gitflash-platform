
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface UpdateApplicationStatusParams {
  applicationId: string;
  currentVersion: number;
  newStatus: string;
  notes?: string;
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ applicationId, newStatus }: UpdateApplicationStatusParams) => {
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

      return data;
    },
    onSuccess: () => {
      // Invalidate applications queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });

  return {
    updateStatus: mutation.mutateAsync,
    updating: mutation.isPending,
    error: mutation.error,
  };
}
