
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Access TAVUS_API_KEY from environment variables
const TAVUS_API_KEY = Deno.env.get('TAVUS_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const requestData = await req.json();

    console.log('Creating conversation with data:', JSON.stringify(requestData));

    // Call Tavus API to create a conversation
    const response = await fetch('https://api.tavus.io/v2/conversations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TAVUS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_name: requestData.conversation_name,
        replica_id: requestData.replica_id,
        persona_id: requestData.persona_id,
        custom_greeting: requestData.custom_greeting,
        conversation_context: requestData.conversation_context,
        language: requestData.language || 'de',
        max_call_duration: parseInt(requestData.max_call_duration) || 600,
        participant_left_timeout: parseInt(requestData.participant_left_timeout) || 30,
        participant_absent_timeout: parseInt(requestData.participant_absent_timeout) || 300
      }),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Tavus API error:', responseData);
      return new Response(
        JSON.stringify({
          error: 'Failed to create conversation',
          details: responseData
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
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
    console.error('Error in create-conversation function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
