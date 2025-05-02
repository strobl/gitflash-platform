
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

// Standard Replica und Persona IDs
const DEFAULT_REPLICA_ID = "r9fa0878977a";  // Luna
const DEFAULT_PERSONA_ID = "pe13ed370726"; // AI Interviewer

// Initialize Supabase client with service role for admin access
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  console.log('Request received for start-conversation');
  
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
    console.log('Starting conversation with data:', JSON.stringify(requestData));
    
    if (!requestData.interview_id) {
      return new Response(
        JSON.stringify({ error: 'Interview ID is required' }),
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

    // Fetch the interview template details
    const { data: conversationData, error: conversationError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', requestData.interview_id)
      .single();
    
    if (conversationError || !conversationData) {
      console.error('Error fetching conversation or conversation not found:', conversationError);
      return new Response(
        JSON.stringify({ 
          error: 'Conversation not found', 
          details: conversationError?.message 
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch the interview session
    const { data: sessionData, error: sessionError } = await supabase
      .from('interview_sessions')
      .select('*')
      .eq('id', requestData.session_id)
      .single();
      
    if (sessionError || !sessionData) {
      console.error('Error fetching interview session:', sessionError);
      return new Response(
        JSON.stringify({ 
          error: 'Interview session not found', 
          details: sessionError?.message 
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get the user's profile data to auto-fill the participant name
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      // Continue even if we can't get the profile, just without the participant name
    }

    const participantName = profileData?.name || 'Kandidat';
    console.log(`Using participant name: ${participantName}`);

    // Construct request body exactly as in the curl example, but adding participant information
    const tavusRequestBody = {
      replica_id: conversationData.replica_id || DEFAULT_REPLICA_ID,
      conversation_name: conversationData.conversation_name || "Test Interview",
      persona_id: conversationData.persona_id || DEFAULT_PERSONA_ID,
      conversational_context: conversationData.conversation_context || "Du bist ein KI-Interviewer, der ein professionelles Vorstellungsgespräch führt.",
      participant_name: participantName
    };
    
    console.log('Tavus API request body:', JSON.stringify(tavusRequestBody));
    
    try {
      // Using tavusapi.com endpoint as shown in the curl example
      const tavusResponse = await fetch('https://tavusapi.com/v2/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': TAVUS_API_KEY,
        },
        body: JSON.stringify(tavusRequestBody),
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

      console.log('Conversation created successfully:', JSON.stringify(responseData));
      
      // Extract conversation ID and URL (adapting to actual response structure from Tavus)
      const conversationId = responseData.conversation_id || responseData.id;
      const conversationUrl = responseData.conversation_url || responseData.url;
      
      if (!conversationUrl) {
        console.error('Missing conversation URL in Tavus response:', responseData);
        return new Response(
          JSON.stringify({ 
            error: 'Missing conversation URL in Tavus response', 
            details: responseData 
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Update the interview session in Supabase with Tavus response data
      try {
        const { data: updateData, error: updateError } = await supabase
          .from('interview_sessions')
          .update({
            conversation_id: conversationId || 'unknown',
            conversation_url: conversationUrl,
            status: 'active',
            participant_name: participantName
          })
          .eq('id', requestData.session_id)
          .select();

        if (updateError) {
          console.error('Error updating interview session:', updateError);
        } else {
          console.log('Interview session updated successfully:', updateData);
        }
      } catch (dbError) {
        console.error('Database update error:', dbError);
      }

      // Return successful response
      return new Response(
        JSON.stringify({
          id: conversationId,
          url: conversationUrl,
          interview_id: requestData.interview_id,
          session_id: requestData.session_id,
          status: 'active',
          message: 'Interview successfully created with Tavus',
          participant_name: participantName
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
    console.error('Error in start-conversation function:', error.message, error.stack);
    
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
