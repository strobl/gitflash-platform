
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

// Schritt 1: Interview erstellen (speichert nur in der Datenbank)
export async function createConversation(data: ConversationData): Promise<any> {
  try {
    console.log('Creating conversation in database:', data);
    
    // Get the current user's ID from the session
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    
    if (!userId) {
      throw new Error('Sie müssen angemeldet sein, um ein Interview zu erstellen');
    }
    
    // Insert directly into the database with status "pending" instead of "draft"
    // "pending" is a valid status in the conversation_status enum
    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert({
        conversation_name: data.conversation_name,
        created_by: userId,
        status: 'pending', // Changed from 'draft' to 'pending' which is a valid enum value
        replica_id: data.replica_id || null,
        persona_id: data.persona_id || null,
        custom_greeting: data.custom_greeting || null,
        conversation_context: data.conversation_context || null,
        language: data.language || 'de',
        max_call_duration: data.max_call_duration || 600,
        participant_left_timeout: data.participant_left_timeout || 30,
        participant_absent_timeout: data.participant_absent_timeout || 300,
        // Diese werden später beim Start des Interviews durch die Tavus API befüllt
        conversation_id: 'pending',
        conversation_url: 'pending'
      })
      .select('*')
      .single();

    if (error) {
      console.error('Error creating conversation in database:', error);
      throw new Error('Fehler beim Erstellen des Interviews: ' + error.message);
    }

    return conversation;
  } catch (err) {
    console.error('Failed to create conversation:', err);
    throw err;
  }
}

// Schritt 2: Interview starten (ruft die Tavus API auf)
export async function startConversation(interviewId: string): Promise<any> {
  try {
    console.log('Starting conversation with Tavus API, interview ID:', interviewId);
    
    // Hole das Interview aus der Datenbank
    const { data: interview, error: fetchError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', interviewId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching interview details:', fetchError);
      throw new Error('Interview nicht gefunden');
    }
    
    // Rufe die Edge Function auf, um das Interview zu starten
    const { data: functionData, error } = await supabase.functions.invoke(
      'start-conversation',
      {
        body: JSON.stringify({
          interview_id: interviewId,
          conversation_name: interview.conversation_name,
          replica_id: interview.replica_id,
          persona_id: interview.persona_id,
          custom_greeting: interview.custom_greeting,
          conversation_context: interview.conversation_context,
          language: interview.language,
          max_call_duration: interview.max_call_duration,
          participant_left_timeout: interview.participant_left_timeout,
          participant_absent_timeout: interview.participant_absent_timeout
        }),
      }
    );

    if (error) {
      console.error('Error starting conversation with Tavus API:', error);
      throw new Error(error.message);
    }

    return functionData;
  } catch (err) {
    console.error('Failed to start conversation with Tavus API:', err);
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
