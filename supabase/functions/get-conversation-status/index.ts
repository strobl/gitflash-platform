
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
  console.log('Request received for get-conversation-status');
  
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
    console.log('Checking conversation status with data:', JSON.stringify(requestData));
    
    if (!requestData.conversation_id) {
      return new Response(
        JSON.stringify({ error: 'Conversation ID is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!requestData.session_id) {
      return new Response(
        JSON.stringify({ error: 'Session ID is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

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

    const conversation_id = requestData.conversation_id;
    const session_id = requestData.session_id;
    
    try {
      // Call Tavus API to get conversation status
      console.log(`Fetching status for conversation: ${conversation_id}`);
      const tavusResponse = await fetch(`https://tavusapi.com/v2/conversations/${conversation_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': TAVUS_API_KEY,
        }
      });

      const responseStatus = tavusResponse.status;
      console.log('Tavus API response status:', responseStatus);
      
      // Get response as text first to log it
      const tavusResponseText = await tavusResponse.text();
      console.log('Tavus API response body:', tavusResponseText);
      
      // Parse response if possible
      let responseData;
      try {
        if (tavusResponseText) {
          responseData = JSON.parse(tavusResponseText);
        }
      } catch (parseError) {
        console.error('Error parsing Tavus response:', parseError);
        return new Response(
          JSON.stringify({ 
            error: `Failed to parse Tavus API response (Status ${responseStatus})`, 
            details: tavusResponseText,
            parseError: parseError.message
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      if (!tavusResponse.ok) {
        console.error(`Tavus API error (${responseStatus}):`, responseData || tavusResponseText);
        return new Response(
          JSON.stringify({
            error: `Tavus API error (Status ${responseStatus})`,
            details: responseData || tavusResponseText
          }),
          {
            status: responseStatus || 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      if (!responseData) {
        console.error('Empty response from Tavus API');
        return new Response(
          JSON.stringify({ 
            error: 'Empty response from Tavus API',
            rawResponse: tavusResponseText 
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Conversation status fetched successfully:', JSON.stringify(responseData));
      
      // Extract conversation data
      const conversationStatus = responseData.status || 'unknown';
      const conversationDuration = responseData.duration || null;
      const conversationStartedAt = responseData.started_at || null;
      const conversationEndedAt = responseData.ended_at || null;
      const conversationParticipantJoinedAt = responseData.participant_joined_at || null;
      const conversationParticipantLeftAt = responseData.participant_left_at || null;

      // Map Tavus status to our local status
      let mappedStatus = conversationStatus;
      if (conversationStatus === 'completed' || conversationStatus === 'ended') {
        mappedStatus = 'ended';
      } else if (conversationStatus === 'active' && conversationParticipantJoinedAt) {
        mappedStatus = 'active';
      } else if (conversationStatus === 'active' && !conversationParticipantJoinedAt) {
        mappedStatus = 'waiting';
      }

      // Update the session status in Supabase if it has changed
      try {
        // First get the current status
        const { data: currentSessionData, error: sessionError } = await supabase
          .from('interview_sessions')
          .select('status')
          .eq('id', session_id)
          .single();
          
        if (sessionError) {
          console.error('Error fetching current session status:', sessionError);
        } else if (currentSessionData && currentSessionData.status !== mappedStatus) {
          // Update the status if it's different
          console.log(`Updating session status from ${currentSessionData.status} to ${mappedStatus}`);
          const { error: updateError } = await supabase
            .from('interview_sessions')
            .update({
              status: mappedStatus,
            })
            .eq('id', session_id);

          if (updateError) {
            console.error('Error updating session status:', updateError);
          } else {
            console.log('Session status updated successfully');
          }
        }
      } catch (dbError) {
        console.error('Database error when updating session status:', dbError);
      }

      // Return successful response with Tavus data
      return new Response(
        JSON.stringify({
          id: conversation_id,
          session_id: session_id,
          tavus_status: conversationStatus,
          status: mappedStatus,
          duration: conversationDuration,
          started_at: conversationStartedAt,
          ended_at: conversationEndedAt,
          participant_joined_at: conversationParticipantJoinedAt,
          participant_left_at: conversationParticipantLeftAt,
          details: responseData
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (fetchError) {
      console.error('Network error when calling Tavus API:', fetchError);
      return new Response(
        JSON.stringify({ 
          error: 'Network error when calling Tavus API', 
          details: fetchError.message || String(fetchError)
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Error in get-conversation-status function:', error.message, error.stack);
    
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
