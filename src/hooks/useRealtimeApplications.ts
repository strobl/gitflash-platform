
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export function useRealtimeApplications() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.id) return;

    console.log('Setting up realtime subscription for applications');

    const channel = supabase
      .channel('applications-realtime')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'applications'
        },
        (payload) => {
          console.log('Application updated via realtime:', payload);
          
          // Invalidate applications queries to refetch data
          queryClient.invalidateQueries({ queryKey: ['applications'] });
          queryClient.invalidateQueries({ queryKey: ['applications-stats'] });
          
          // Show toast notification if status changed
          if (payload.new && payload.old && payload.new.status !== payload.old.status) {
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
              'rejected': 'Abgelehnt'
            };
            
            toast.info(`Bewerbungsstatus aktualisiert: ${statusLabels[payload.new.status] || payload.new.status}`);
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up realtime subscription');
      supabase.removeChannel(channel);
    };
  }, [user?.id, queryClient]);
}
