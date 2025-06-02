
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UpdateOfferParams {
  offerId: string;
  status?: string;
  response_message?: string;
  viewed_at?: string;
}

export function useUpdateOffer() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ offerId, ...updates }: UpdateOfferParams) => {
      console.log('Updating offer:', { offerId, updates });
      
      const updateData: any = { ...updates };
      
      if (updates.status) {
        updateData.responded_at = new Date().toISOString();
      }
      
      if (updates.viewed_at) {
        updateData.viewed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('offers')
        .update(updateData)
        .eq('id', offerId)
        .select()
        .single();

      if (error) {
        console.error('Error updating offer:', error);
        throw new Error(`Fehler beim Aktualisieren des Angebots: ${error.message}`);
      }

      console.log('Offer updated successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      const statusLabels: Record<string, string> = {
        'sent': 'Versendet',
        'accepted': 'Angenommen',
        'declined': 'Abgelehnt',
        'withdrawn': 'Zurückgezogen'
      };

      if (data.status) {
        toast.success(`Angebot ${statusLabels[data.status] || data.status}`);
      }
      
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
    onError: (error: any) => {
      console.error('Failed to update offer:', error);
      toast.error(error.message || 'Unbekannter Fehler beim Aktualisieren des Angebots');
    },
  });

  return {
    updateOffer: mutation.mutateAsync,
    updating: mutation.isPending,
    error: mutation.error,
  };
}
