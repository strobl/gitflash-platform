
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface PublicInterview {
  id: string;
  conversation_name: string;
  conversation_context: string;
  created_at: string;
  is_public: boolean;
  language: string;
  max_call_duration: number;
}

export const usePublicInterviews = () => {
  const [interviews, setInterviews] = useState<PublicInterview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPublicInterviews = async () => {
    setIsLoading(true);
    try {
      console.log('🎯 Fetching public interviews...');
      
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('is_public', true)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);

      console.log('📊 Interviews query result:', { data, error });

      if (error) throw error;

      setInterviews(data || []);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching interviews:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast.error('Fehler beim Laden der Interviews');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicInterviews();
  }, []);

  return {
    interviews,
    isLoading,
    error,
    refetch: fetchPublicInterviews
  };
};
