
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
    
    // Verify that the user has the 'business' role
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (profileError || !profileData) {
      console.error('Error fetching user profile:', profileError);
      throw new Error('Fehler beim Abrufen des Benutzerprofils');
    }
    
    if (profileData.role !== 'business') {
      throw new Error('Nur Unternehmen können Interviews erstellen');
    }
    
    // Insert directly into the database with status "pending" 
    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert({
        conversation_name: data.conversation_name,
        created_by: userId,
        status: 'pending',
        replica_id: data.replica_id || "r9fa0878977a",  // Standard-Replica-ID
        persona_id: data.persona_id || "pe13ed370726",  // Standard-Persona-ID
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
    
    // Get the current auth token to pass to the edge function
    const { data: { session } } = await supabase.auth.getSession();
    const authToken = session?.access_token;
    
    if (!authToken) {
      throw new Error('Sie müssen angemeldet sein, um ein Interview zu starten');
    }
    
    // Rufe die Edge Function auf, um das Interview zu starten
    const { data: functionData, error } = await supabase.functions.invoke(
      'start-conversation',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          interview_id: interviewId,
          conversation_name: interview.conversation_name,
          replica_id: interview.replica_id || "r9fa0878977a",  // Standard-Replica-ID verwenden
          persona_id: interview.persona_id || "pe13ed370726",  // Standard-Persona-ID verwenden
          custom_greeting: interview.custom_greeting,
          conversation_context: interview.conversation_context,
          language: interview.language || 'deutsch',
          max_call_duration: interview.max_call_duration,
          participant_left_timeout: interview.participant_left_timeout,
          participant_absent_timeout: interview.participant_absent_timeout
        }),
      }
    );

    // Detaillierteres Fehlerlogging
    if (error) {
      console.error('Error invoking start-conversation edge function:', error);
      
      // Versuch, eine detailliertere Fehlermeldung zu extrahieren
      const errorDetails = typeof error === 'object' && error !== null ? JSON.stringify(error, null, 2) : error?.toString();
      
      throw new Error(`Fehler beim Aufrufen der Edge Function: ${errorDetails}`);
    }
    
    if (!functionData) {
      console.error('No data returned from start-conversation edge function');
      throw new Error('Keine Daten von der Edge Function erhalten');
    }
    
    // Check if the response contains an error
    if (functionData.error) {
      console.error('Edge function returned an error:', functionData.error, functionData.details);
      throw new Error(`${functionData.error}${functionData.details ? ': ' + JSON.stringify(functionData.details) : ''}`);
    }
    
    // Add more detailed logging for troubleshooting
    console.log('Tavus API response data:', functionData);
    
    if (!functionData.conversation_url && !functionData.url) {
      console.error('No conversation URL returned from Tavus API', functionData);
      throw new Error('Keine Interview-URL von Tavus erhalten');
    }

    // Return the data including the conversation URL
    return {
      ...functionData,
      conversation_url: functionData.conversation_url || functionData.url,
      interview_id: interviewId
    };
  } catch (err) {
    console.error('Failed to start conversation with Tavus API:', err);
    toast.error(`${err instanceof Error ? err.message : 'Unbekannter Fehler beim Starten des Interviews'}`);
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
