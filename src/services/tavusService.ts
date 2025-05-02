
import { supabase } from '@/integrations/supabase/client';

interface ConversationData {
  conversation_name: string;
  replica_id?: string;
  persona_id?: string;
  custom_greeting?: string;
  conversation_context?: string;
  language?: string;
  max_call_duration?: number;
  participant_left_timeout?: number;
  participant_absent_timeout?: number;
}

export async function createConversation(data: ConversationData): Promise<any> {
  try {
    const { data: functionData, error } = await supabase.functions.invoke(
      'create-conversation',
      {
        body: JSON.stringify(data),
      }
    );

    if (error) {
      console.error('Error creating conversation:', error);
      throw new Error(error.message);
    }

    return functionData;
  } catch (err) {
    console.error('Failed to create conversation:', err);
    throw err;
  }
}

export async function listConversations(): Promise<any[]> {
  try {
    // Get the current user's ID from the session
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    
    if (!userId) {
      console.error('No authenticated user found');
      throw new Error('Sie müssen angemeldet sein, um Interviews anzuzeigen');
    }

    // Fetch only conversations created by the current user
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    throw error;
  }
}

export async function getConversation(id: string): Promise<any> {
  try {
    // Get the current user's ID from the session
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    
    if (!userId) {
      console.error('No authenticated user found');
      throw new Error('Sie müssen angemeldet sein, um dieses Interview anzuzeigen');
    }

    // Fetch the conversation and verify it belongs to the current user
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .eq('created_by', userId)
      .single();

    if (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }

    if (!data) {
      throw new Error('Interview nicht gefunden oder keine Berechtigung');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch conversation:', error);
    throw error;
  }
}
