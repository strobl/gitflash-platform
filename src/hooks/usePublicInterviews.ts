
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
      console.log('🎯 Fetching public interviews for Lead Magnet...');
      
      // Erweiterte Debug-Query: Erst alle Conversations abrufen
      const { data: allConversations, error: allError } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📊 ALL conversations in DB:', { 
        total: allConversations?.length || 0, 
        data: allConversations,
        error: allError 
      });

      if (allConversations) {
        const publicOnes = allConversations.filter(conv => conv.is_public === true);
        const activeOnes = allConversations.filter(conv => conv.status === 'active');
        const publicAndActive = allConversations.filter(conv => conv.is_public === true && conv.status === 'active');
        
        console.log('🔍 Debug Analysis:', {
          totalConversations: allConversations.length,
          publicConversations: publicOnes.length,
          activeConversations: activeOnes.length,
          publicAndActiveConversations: publicAndActive.length,
          publicOnes: publicOnes.map(c => ({ id: c.id, name: c.conversation_name, is_public: c.is_public, status: c.status })),
          activeOnes: activeOnes.map(c => ({ id: c.id, name: c.conversation_name, is_public: c.is_public, status: c.status }))
        });
      }

      // Originale Query für öffentliche Interviews
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('is_public', true)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);

      console.log('📊 Public interviews query result:', { 
        queryFilters: { is_public: true, status: 'active' },
        data, 
        error,
        resultCount: data?.length || 0
      });

      if (error) {
        console.error('❌ Supabase query error:', error);
        throw error;
      }

      console.log('✅ Setting interviews state with:', data?.length || 0, 'interviews');
      setInterviews(data || []);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching public interviews:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      toast.error('Fehler beim Laden der öffentlichen Interviews');
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
