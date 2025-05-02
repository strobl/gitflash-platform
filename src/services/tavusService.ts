import { supabase } from '@/integrations/supabase/client';

export interface CreateConversationRequest {
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

export interface ConversationResponse {
  conversation_id: string;
  conversation_name: string;
  conversation_url: string;
  replica_id?: string;
  persona_id?: string;
  status: string;
}

export const createConversation = async (data: CreateConversationRequest, userId: string): Promise<ConversationResponse> => {
  console.log('Calling create-conversation function with:', data);
  
  try {
    const { data: response, error } = await supabase.functions.invoke('create-conversation', {
      body: data
    });

    if (error) {
      console.error('Error invoking create-conversation function:', error);
      throw new Error(error.message || 'Failed to create conversation');
    }

    if (!response || !response.conversation_id) {
      console.error('Invalid response from create-conversation function:', response);
      throw new Error('Invalid response from server');
    }

    console.log('Successfully created conversation:', response);

    // Save conversation to database
    try {
      const { data: conversationData, error: dbError } = await supabase
        .from('conversations')
        .insert({
          conversation_id: response.conversation_id,
          conversation_name: response.conversation_name,
          conversation_url: response.conversation_url,
          replica_id: response.replica_id || null,
          persona_id: response.persona_id || null,
          status: response.status,
          conversation_context: data.conversation_context,
          custom_greeting: data.custom_greeting,
          language: data.language || 'de',
          max_call_duration: data.max_call_duration || 600,
          participant_left_timeout: data.participant_left_timeout || 30,
          participant_absent_timeout: data.participant_absent_timeout || 300,
          created_by: userId
        })
        .select()
        .single();

      if (dbError) {
        console.error('Error saving conversation to database:', dbError);
        // Continue even if database save fails - we'll return the API response
      } else {
        console.log('Saved conversation to database:', conversationData);
      }
    } catch (dbError) {
      console.error('Exception saving conversation to database:', dbError);
      // Continue even if database save fails - we'll return the API response
    }

    return response;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

// Get conversation by ID
export const getConversation = async (id: string) => {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

// List all conversations for the current user
export const listConversations = async () => {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
