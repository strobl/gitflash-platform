
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface Offer {
  id: string;
  application_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  position_title: string;
  salary_amount?: number;
  salary_currency: string;
  salary_type: string;
  start_date?: string;
  contract_type: string;
  working_hours?: string;
  location?: string;
  remote_work_allowed: boolean;
  benefits?: string;
  additional_terms?: string;
  status: string;
  expires_at?: string;
  response_deadline?: string;
  viewed_at?: string;
  responded_at?: string;
  response_message?: string;
  is_negotiable: boolean;
  counter_offer_allowed: boolean;
}

interface UseOffersParams {
  applicationId?: string;
}

export function useOffers({ applicationId }: UseOffersParams) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['offers', applicationId, user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      console.log('Fetching offers for:', { applicationId, userId: user.id });

      let query = supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false });

      if (applicationId) {
        query = query.eq('application_id', applicationId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching offers:', error);
        throw error;
      }

      console.log('Offers fetched successfully:', data?.length || 0, 'offers');
      return data as Offer[];
    },
    enabled: !!user?.id,
  });
}
