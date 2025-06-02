
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CreateOfferParams {
  application_id: string;
  position_title: string;
  salary_amount?: number;
  salary_currency?: string;
  salary_type: string;
  start_date?: string;
  contract_type: string;
  working_hours?: string;
  location?: string;
  remote_work_allowed?: boolean;
  benefits?: string;
  additional_terms?: string;
  response_deadline?: string;
  is_negotiable?: boolean;
  counter_offer_allowed?: boolean;
}

export function useCreateOffer() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: CreateOfferParams) => {
      console.log('Creating offer:', params);
      
      const { data, error } = await supabase
        .from('offers')
        .insert({
          ...params,
          created_by: (await supabase.auth.getUser()).data.user?.id,
          status: 'draft'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating offer:', error);
        throw new Error(`Fehler beim Erstellen des Angebots: ${error.message}`);
      }

      console.log('Offer created successfully:', data);
      return data;
    },
    onSuccess: () => {
      toast.success('Angebot erfolgreich erstellt');
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
    onError: (error: any) => {
      console.error('Failed to create offer:', error);
      toast.error(error.message || 'Unbekannter Fehler beim Erstellen des Angebots');
    },
  });

  return {
    createOffer: mutation.mutateAsync,
    creating: mutation.isPending,
    error: mutation.error,
  };
}
