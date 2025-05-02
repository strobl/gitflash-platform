
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.8.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Access TAVUS_API_KEY from environment variables
const TAVUS_API_KEY = Deno.env.get('TAVUS_API_KEY');

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
        replica_id: requestData.replica_id || undefined,
        persona_id: requestData.persona_id || undefined,
        custom_greeting: requestData.custom_greeting || undefined,
        conversation_context: requestData.conversation_context || undefined,
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

    // Save to Supabase database
    try {
      // Create a Supabase client
      const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Extract user_id from the request data
      const userId = requestData.user_id;

      // Insert the conversation data
      const { data: insertedData, error: insertError } = await supabase
        .from('conversations')
        .insert({
          conversation_id: responseData.conversation_id,
          conversation_name: requestData.conversation_name,
          conversation_url: responseData.conversation_url,
          created_by: userId,
          status: responseData.status || 'active',
          persona_id: requestData.persona_id || null,
          replica_id: requestData.replica_id || null,
          custom_greeting: requestData.custom_greeting || null,
          conversation_context: requestData.conversation_context || null,
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
