
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

export async function createConversation(data: ConversationData, userId: string): Promise<any> {
  try {
    const { data: functionData, error } = await supabase.functions.invoke(
      'create-conversation',
      {
        body: JSON.stringify({
          ...data,
          user_id: userId
        }),
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
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
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
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch conversation:', error);
    throw error;
  }
}
