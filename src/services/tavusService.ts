
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
        replica_id: data.replica_id || "r9d30b0e55ac",  // Updated correct default
        persona_id: data.persona_id || "p5317866",  // Updated correct default
        custom_greeting: data.custom_greeting || "Willkommen zum Interview. Bitte stellen Sie sich kurz vor.",
        conversation_context: data.conversation_context || "Du bist ein freundlicher Interviewer für eine Stelle in der Baubranche. Stelle relevante Fragen zum Hintergrund, zur Erfahrung und zu den Fähigkeiten des Kandidaten.",
        language: data.language || 'de',
        max_call_duration: data.max_call_duration || 600,
        participant_left_timeout: data.participant_left_timeout || 30,
        participant_absent_timeout: data.participant_absent_timeout || 300,
        // Diese werden später beim Start des Interviews durch die Tavus API befüllt
        conversation_id: null,
        conversation_url: null
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

// Schritt 2: Interview-Session starten (erstellt eine neue Session und ruft die Tavus API auf)
export async function startConversation(interviewId: string): Promise<any> {
  try {
    console.log('Starting conversation with Tavus API, interview ID:', interviewId);
    
    // Hole das Interview-Template aus der Datenbank
    const { data: interview, error: fetchError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', interviewId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching interview details:', fetchError);
      throw new Error('Interview nicht gefunden');
    }

    console.log('Retrieved interview data:', interview);
    
    // Get the current auth token and user ID
    const { data: { session } } = await supabase.auth.getSession();
    const authToken = session?.access_token;
    const userId = session?.user?.id;
    
    if (!authToken || !userId) {
      throw new Error('Sie müssen angemeldet sein, um ein Interview zu starten');
    }
    
    // Create a new interview session entry
    const { data: interviewSession, error: sessionError } = await supabase
      .from('interview_sessions')
      .insert({
        interview_id: interviewId,
        created_by: userId,
        status: 'pending'
      })
      .select('*')
      .single();
    
    if (sessionError || !interviewSession) {
      console.error('Error creating interview session:', sessionError);
      throw new Error('Fehler beim Erstellen der Interview-Session');
    }
    
    console.log('Created interview session:', interviewSession);
    console.log('Sending request to edge function with interview ID:', interviewId);
    
    // Daten für die Edge Function
    const requestBody = {
      interview_id: interviewId,
      session_id: interviewSession.id
    };
    
    console.log('Edge function request body:', JSON.stringify(requestBody));
    
    // Rufe die Edge Function auf, um das Interview zu starten
    const { data: functionData, error } = await supabase.functions.invoke(
      'start-conversation',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    // Detaillierteres Fehlerlogging
    if (error) {
      console.error('Edge function error object:', error);
      
      // Versuch, eine detailliertere Fehlermeldung zu extrahieren
      let errorMessage = 'Fehler beim Aufrufen der Edge Function';
      if (error.message) {
        errorMessage += ': ' + error.message;
      } else if (typeof error === 'object' && error !== null) {
        errorMessage += ': ' + JSON.stringify(error);
      }
      
      throw new Error(errorMessage);
    }
    
    if (!functionData) {
      console.error('No data returned from start-conversation edge function');
      throw new Error('Keine Daten von der Edge Function erhalten');
    }
    
    console.log('Edge function response:', functionData);
    
    // Check if the response contains an error
    if (functionData.error) {
      console.error('Edge function returned an error:', functionData.error, functionData.details);
      let errorDetails = functionData.details ? 
        (typeof functionData.details === 'object' ? JSON.stringify(functionData.details) : functionData.details) 
        : '';
      throw new Error(`${functionData.error}${errorDetails ? ': ' + errorDetails : ''}`);
    }
    
    // Verwenden Sie 'url' oder 'conversation_url', je nachdem, was zurückgegeben wird
    const conversationUrl = functionData.url || functionData.conversation_url;
    
    if (!conversationUrl) {
      console.error('No conversation URL returned', functionData);
      throw new Error('Keine Interview-URL von Tavus erhalten');
    }

    // Return the data including the conversation URL and session ID
    return {
      ...functionData,
      conversation_url: conversationUrl,
      interview_id: interviewId,
      session_id: interviewSession.id,
      participant_name: functionData.participant_name
    };
  } catch (err) {
    console.error('Failed to start conversation with Tavus API:', err);
    throw err;
  }
}

// Neue Funktion zum Aktualisieren des Status einer Interview-Session
export async function updateInterviewSessionStatus(sessionId: string, status: string): Promise<any> {
  try {
    console.log(`Updating interview session ${sessionId} status to ${status}`);
    
    // Get the current user's ID from the session
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    
    if (!userId) {
      console.error('No authenticated user found');
      throw new Error('Sie müssen angemeldet sein, um diese Aktion durchzuführen');
    }
    
    // Update the session status
    const { data, error } = await supabase
      .from('interview_sessions')
      .update({ status })
      .eq('id', sessionId)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating interview session status:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to update interview session status:', error);
    throw error;
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

// Neue Funktion zum Laden der Interview-Sessions für ein bestimmtes Interview
export async function getInterviewSessions(interviewId: string): Promise<any[]> {
  try {
    // Get the current user's ID from the session
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    
    if (!userId) {
      console.error('No authenticated user found');
      throw new Error('Sie müssen angemeldet sein, um Interview-Sessions anzuzeigen');
    }

    // Fetch the sessions for this interview
    const { data, error } = await supabase
      .from('interview_sessions')
      .select('*')
      .eq('interview_id', interviewId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching interview sessions:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch interview sessions:', error);
    throw error;
  }
}

// Funktion zum Laden einer einzelnen Session
export async function getInterviewSession(sessionId: string): Promise<any> {
  try {
    // Get the current user's ID from the session
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    
    if (!userId) {
      console.error('No authenticated user found');
      throw new Error('Sie müssen angemeldet sein, um diese Interview-Session anzuzeigen');
    }

    // Fetch the session
    const { data, error } = await supabase
      .from('interview_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (error) {
      console.error('Error fetching interview session:', error);
      throw error;
    }

    if (!data) {
      throw new Error('Interview-Session nicht gefunden oder keine Berechtigung');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch interview session:', error);
    throw error;
  }
}

// New function to get the real-time status of a conversation from Tavus API
export async function getConversationStatus(conversationId: string, sessionId: string): Promise<any> {
  try {
    console.log(`Fetching status for conversation: ${conversationId}, session: ${sessionId}`);
    
    // Get the current auth token
    const { data: { session } } = await supabase.auth.getSession();
    const authToken = session?.access_token;
    
    if (!authToken) {
      throw new Error('Sie müssen angemeldet sein, um den Gesprächsstatus abzurufen');
    }
    
    // Call the edge function to get the conversation status
    const { data, error } = await supabase.functions.invoke(
      'get-conversation-status',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          session_id: sessionId
        }),
      }
    );
    
    if (error) {
      console.error('Error fetching conversation status:', error);
      throw new Error(`Fehler beim Abrufen des Gesprächsstatus: ${error.message}`);
    }
    
    if (!data) {
      console.error('No data returned from get-conversation-status edge function');
      throw new Error('Keine Daten vom Server erhalten');
    }
    
    console.log('Conversation status:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch conversation status:', error);
    throw error;
  }
}
