
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ApplicationHistoryEntry {
  id: string;
  application_id: string;
  old_status: string | null;
  new_status: string;
  changed_by: string;
  notes: string | null;
  created_at: string;
}

export function useApplicationHistory(applicationId: string) {
  return useQuery({
    queryKey: ['application-history', applicationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('application_status_history')
        .select('*')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching application history:', error);
        throw error;
      }

      return data as ApplicationHistoryEntry[];
    },
    enabled: !!applicationId,
  });
}
