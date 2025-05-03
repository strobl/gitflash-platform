
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.8.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Access environment variables
const TAVUS_API_KEY = Deno.env.get('TAVUS_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// Initialize Supabase client with service role for admin access
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  console.log('Request received for get-conversation-recording');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Authorization header missing');
      return new Response(
        JSON.stringify({ error: 'Authorization header missing' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Extract the JWT token
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the JWT token using service role
    let userId;
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser(token);
      
      if (userError || !user) {
        throw new Error('Invalid token or user not found');
      }
      
      userId = user.id;
      console.log('Authenticated user ID:', userId);
    } catch (authError) {
      console.error('Authentication failed:', authError);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication token', details: authError.message }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Parse the request body
    const requestData = await req.json();
    console.log('Requesting recording with data:', JSON.stringify(requestData));
    
    if (!requestData.conversation_id) {
      return new Response(
        JSON.stringify({ error: 'Conversation ID is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { conversation_id, session_id } = requestData;

    // Check if TAVUS_API_KEY is configured
    if (!TAVUS_API_KEY) {
      console.error('TAVUS_API_KEY not configured');
      return new Response(
        JSON.stringify({ 
          error: 'API key not configured', 
          tip: 'Please set the TAVUS_API_KEY in the Supabase dashboard' 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch the session from database
    const { data: sessionData, error: sessionError } = await supabase
      .from('interview_sessions')
      .select('*')
      .eq('id', session_id)
      .eq('conversation_id', conversation_id)
      .single();
    
    if (sessionError || !sessionData) {
      console.error('Error fetching session or session not found:', sessionError);
      return new Response(
        JSON.stringify({ 
          error: 'Session not found', 
          details: sessionError?.message 
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Session data found:', sessionData);

    // If recording URL is already available and status is 'ready', return it directly
    if (sessionData.recording_url && sessionData.recording_status === 'ready') {
      console.log('Returning cached recording URL:', sessionData.recording_url);
      return new Response(
        JSON.stringify({
          recording_url: sessionData.recording_url,
          status: 'ready',
          conversation_id,
          session_id,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    try {
      // Make a request to Tavus API to get recording details
      // Note: According to Tavus API docs, the endpoint should be:
      // https://tavusapi.com/v2/conversations/{conversation_id}/recording
      const recordingUrl = `https://tavusapi.com/v2/conversations/${conversation_id}/recording`;
      console.log('Requesting recording from Tavus API:', recordingUrl);
      
      const tavusResponse = await fetch(recordingUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': TAVUS_API_KEY,
        },
      });

      const responseStatus = tavusResponse.status;
      console.log('Tavus API response status:', responseStatus);
      
      // Get response as text first to log it
      const tavusResponseText = await tavusResponse.text();
      console.log('Tavus API response body:', tavusResponseText);
      
      let responseData;
      let recordingStatus = 'pending';
      let recordingUrl = null;
      
      try {
        if (tavusResponseText) {
          responseData = JSON.parse(tavusResponseText);
          
          if (responseData.status === 'ready' && responseData.url) {
            recordingUrl = responseData.url;
            recordingStatus = 'ready';
          } else if (responseData.status === 'processing') {
            recordingStatus = 'processing';
          } else if (responseData.error || responseData.status === 'failed') {
            recordingStatus = 'failed';
          }
        }
      } catch (parseError) {
        console.error('Error parsing Tavus response:', parseError);
        recordingStatus = 'error';
      }
      
      // Update the session record with recording status and URL if available
      const { error: updateError } = await supabase
        .from('interview_sessions')
        .update({
          recording_status: recordingStatus,
          recording_url: recordingUrl,
        })
        .eq('id', session_id);

      if (updateError) {
        console.error('Error updating session with recording details:', updateError);
      } else {
        console.log('Session updated with recording status:', recordingStatus);
      }
      
      // Return response to client
      return new Response(
        JSON.stringify({
          recording_url: recordingUrl,
          status: recordingStatus,
          tavus_response: responseData,
          conversation_id,
          session_id,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
      
    } catch (fetchError) {
      console.error('Network error when calling Tavus API:', fetchError);
      
      // Update the session record with error status
      await supabase
        .from('interview_sessions')
        .update({
          recording_status: 'error'
        })
        .eq('id', session_id);
        
      return new Response(
        JSON.stringify({ 
          error: 'Network error when calling Tavus API', 
          details: fetchError.message || String(fetchError),
          status: 'error'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Error in get-conversation-recording function:', error.message, error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error',
        stack: error.stack || 'No stack trace available'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
