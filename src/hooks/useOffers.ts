
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

// Mock data for testing
const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    application_id: 'app-1',
    created_by: 'business-user-1',
    created_at: '2025-06-01T10:00:00Z',
    updated_at: '2025-06-01T10:00:00Z',
    position_title: 'Bauleiter Hochbau',
    salary_amount: 450000, // 4500 EUR in cents
    salary_currency: 'EUR',
    salary_type: 'monthly',
    start_date: '2025-07-01',
    contract_type: 'full-time',
    working_hours: '40h/Woche',
    location: 'Berlin',
    remote_work_allowed: false,
    benefits: 'Firmenwagen, Weiterbildung',
    additional_terms: 'Probezeit 6 Monate',
    status: 'sent',
    response_deadline: '2025-06-10T23:59:59Z',
    is_negotiable: true,
    counter_offer_allowed: true,
  },
  {
    id: 'offer-2',
    application_id: 'app-2',
    created_by: 'business-user-1',
    created_at: '2025-06-01T14:30:00Z',
    updated_at: '2025-06-01T15:00:00Z',
    position_title: 'Jurist Baurecht',
    salary_amount: 520000, // 5200 EUR in cents
    salary_currency: 'EUR',
    salary_type: 'monthly',
    start_date: '2025-06-15',
    contract_type: 'full-time',
    working_hours: 'Flexibel',
    location: 'München',
    remote_work_allowed: true,
    benefits: 'Homeoffice, Gesundheitsvorsorge',
    status: 'viewed',
    viewed_at: '2025-06-01T16:00:00Z',
    response_deadline: '2025-06-08T23:59:59Z',
    is_negotiable: true,
    counter_offer_allowed: true,
  }
];

export function useOffers({ applicationId }: UseOffersParams) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['offers', applicationId, user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      console.log('Fetching offers for:', { applicationId, userId: user.id });

      // For now, return mock data to test the UI
      let filteredOffers = mockOffers;
      
      if (applicationId) {
        filteredOffers = mockOffers.filter(offer => offer.application_id === applicationId);
      }

      console.log('Offers fetched successfully:', filteredOffers.length, 'offers');
      return filteredOffers;
    },
    enabled: !!user?.id,
  });
}
