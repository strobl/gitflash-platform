
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.8.0';
import { jwtVerify } from 'https://deno.land/x/jose@v4.13.1/jwt/verify.ts';
import { createRemoteJWKSet } from 'https://deno.land/x/jose@v4.13.1/jwks/remote.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Access TAVUS_API_KEY from environment variables
const TAVUS_API_KEY = Deno.env.get('TAVUS_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
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
    
    // Verify the JWT token and extract user information
    let userId;
    try {
      // Verify JWT token using Supabase JWKS
      const JWKS = createRemoteJWKSet(new URL(`${SUPABASE_URL}/auth/v1/jwks`));
      const { payload } = await jwtVerify(token, JWKS);
      
      // Extract the user ID from the sub claim
      userId = payload.sub;
      if (!userId) {
        throw new Error('User ID not found in token');
      }
      
      console.log('Authenticated user ID:', userId);
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Verify that the user exists and has the 'business' role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
      
    if (profileError || !profile) {
      console.error('Error fetching user profile:', profileError);
      return new Response(
        JSON.stringify({ error: 'User profile not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    if (profile.role !== 'business') {
      console.error('Unauthorized: Only business users can create interviews');
      return new Response(
        JSON.stringify({ error: 'Only business users can create interviews' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse the request body
    const requestData = await req.json();
    console.log('Creating conversation with data:', JSON.stringify(requestData));

    if (!TAVUS_API_KEY) {
      console.error('TAVUS_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract values from request - using proper defaults that match the form defaults
    // instead of hardcoded values that might not match
    const replicaId = requestData.replica_id || "r9d30b0e55ac"; // Standard replica_id
    const personaId = requestData.persona_id || "p32c3fd65c8c"; // Standard persona_id
    const conversationContext = requestData.conversation_context || "Du bist ein freundlicher Interviewer für eine Stelle in der Baubranche. Stelle relevante Fragen zum Hintergrund, zur Erfahrung und zu den Fähigkeiten des Kandidaten.";
    const customGreeting = "Willkommen zum Interview. Bitte stellen Sie sich kurz vor.";

    console.log(`Using replica_id: ${replicaId}, persona_id: ${personaId}`);
    console.log(`Conversation context: ${conversationContext.substring(0, 100)}...`);

    // Call Tavus API to create a conversation
    console.log('Calling Tavus API...');
    const tavusResponse = await fetch('https://api.tavus.io/v2/conversations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TAVUS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_name: requestData.conversation_name,
        replica_id: replicaId,
        persona_id: personaId,
        custom_greeting: customGreeting,
        conversation_context: conversationContext,
        language: requestData.language || 'de',
        max_call_duration: parseInt(requestData.max_call_duration) || 600,
        participant_left_timeout: parseInt(requestData.participant_left_timeout) || 30,
        participant_absent_timeout: parseInt(requestData.participant_absent_timeout) || 300
      }),
    });

    const tavusResponseText = await tavusResponse.text();
    console.log('Tavus API response status:', tavusResponse.status);
    console.log('Tavus API response body:', tavusResponseText);

    let responseData;
    try {
      responseData = JSON.parse(tavusResponseText);
    } catch (e) {
      console.error('Error parsing Tavus response:', e);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse Tavus API response', 
          details: tavusResponseText 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    if (!tavusResponse.ok) {
      console.error('Tavus API error:', JSON.stringify(responseData));
      return new Response(
        JSON.stringify({
          error: 'Failed to create conversation',
          details: responseData
        }),
        {
          status: tavusResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Conversation created successfully:', JSON.stringify(responseData));

    // Save to Supabase database - use the userId from JWT, not from request
    try {
      // Insert the conversation data with the verified userId
      const { data: insertedData, error: insertError } = await supabase
        .from('conversations')
        .insert({
          conversation_id: responseData.conversation_id,
          conversation_name: requestData.conversation_name,
          conversation_url: responseData.conversation_url,
          created_by: userId, // Use the authenticated user ID from the JWT
          status: responseData.status || 'active',
          // Use provided values, ensuring they're saved exactly as provided
          persona_id: personaId,
          replica_id: replicaId,
          custom_greeting: customGreeting,
          conversation_context: conversationContext,
          language: requestData.language || 'de',
          max_call_duration: parseInt(requestData.max_call_duration) || 600,
          participant_left_timeout: parseInt(requestData.participant_left_timeout) || 30,
          participant_absent_timeout: parseInt(requestData.participant_absent_timeout) || 300
        });

      if (insertError) {
        console.error('Error saving to database:', insertError);
        return new Response(
          JSON.stringify({
            error: 'Failed to save conversation to database',
            details: insertError
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Conversation saved to database:', insertedData);
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      // Continue even if database insert fails
    }

    // Return successful response
    return new Response(
      JSON.stringify(responseData),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in create-conversation function:', error.message);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
