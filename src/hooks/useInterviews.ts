
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

export interface Interview {
  id: string;
  conversation_name: string;
  conversation_context: string;
  created_at: string;
  is_public: boolean;
  language: string;
  max_call_duration: number;
  status: string;
}

export const useInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, profile } = useAuth();

  const fetchInterviews = async () => {
    setIsLoading(true);
    try {
      console.log('🎯 Fetching interviews for business user...');
      
      if (!user || profile?.role !== 'business') {
        console.log('❌ User not authenticated or not a business user');
        setInterviews([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('status', 'active')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

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
    fetchInterviews();
  }, [user, profile?.role]);

  return {
    interviews,
    isLoading,
    error,
    refetch: fetchInterviews
  };
};
