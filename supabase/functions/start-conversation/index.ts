
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

// Standard Replica und Persona IDs (aus den Screenshots)
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
    
    // Check if user has a valid role
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (profileError || !profileData) {
      console.error('Error fetching user profile:', profileError);
      return new Response(
        JSON.stringify({ error: 'User profile not found', details: profileError?.message }),
        {
          status: 403,
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

    if (!TAVUS_API_KEY) {
      console.error('TAVUS_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured', tip: 'Please set the TAVUS_API_KEY in the Supabase dashboard' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Log API key exists (without revealing it)
    console.log('TAVUS_API_KEY is configured:', !!TAVUS_API_KEY, 'Length:', TAVUS_API_KEY ? TAVUS_API_KEY.length : 0);
    if (TAVUS_API_KEY && TAVUS_API_KEY.trim() === '') {
      console.error('TAVUS_API_KEY is empty');
      return new Response(
        JSON.stringify({ error: 'API key is empty', tip: 'Please set a valid TAVUS_API_KEY in the Supabase dashboard' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch the conversation details
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

    // Apply role-based permissions
    if (profileData.role === 'business') {
      if (conversationData.created_by !== userId) {
        console.error('Permission denied: Business user can only start their own interviews');
        return new Response(
          JSON.stringify({ error: 'You do not have permission to start this interview' }),
          {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    } else if (profileData.role !== 'user') {
      // Unknown role
      console.error('Unknown user role:', profileData.role);
      return new Response(
        JSON.stringify({ error: 'Invalid user role' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Vereinfachter API-Aufruf basierend auf den Screenshots
    console.log('Calling Tavus API...');
    
    // Vereinfachte API-Request Struktur
    const tavusRequestBody = {
      replica_id: DEFAULT_REPLICA_ID,
      persona_id: DEFAULT_PERSONA_ID,
      conversation_name: requestData.conversation_name || conversationData.conversation_name || 'Interview'
    };
    
    // Optional Felder nur hinzufügen, wenn sie vorhanden sind
    if (requestData.conversation_context || conversationData.conversation_context) {
      tavusRequestBody.conversation_context = requestData.conversation_context || conversationData.conversation_context;
    }
    
    if (requestData.custom_greeting || conversationData.custom_greeting) {
      tavusRequestBody.custom_greeting = requestData.custom_greeting || conversationData.custom_greeting;
    }
    
    console.log('Tavus API request body:', JSON.stringify(tavusRequestBody));
    
    try {
      // API-Aufruf mit korrektem Endpunkt und Headers
      const tavusResponse = await fetch('https://api.tavus.io/v2/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': TAVUS_API_KEY,
        },
        body: JSON.stringify(tavusRequestBody),
      });

      const responseStatus = tavusResponse.status;
      console.log('Tavus API response status:', responseStatus);
      
      // Versuch, die Antwort als JSON zu parsen
      let responseData;
      try {
        const tavusResponseText = await tavusResponse.text();
        console.log('Tavus API response body:', tavusResponseText);
        
        if (tavusResponseText) {
          responseData = JSON.parse(tavusResponseText);
        }
      } catch (parseError) {
        console.error('Error parsing Tavus response:', parseError);
        return new Response(
          JSON.stringify({ 
            error: `Failed to parse Tavus API response (Status ${responseStatus})`, 
            details: parseError.message
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      if (!tavusResponse.ok) {
        console.error(`Tavus API error (${responseStatus}):`, responseData || 'No response data');
        return new Response(
          JSON.stringify({
            error: `Tavus API error (Status ${responseStatus})`,
            details: responseData || 'No response data'
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
          JSON.stringify({ error: 'Empty response from Tavus API' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Conversation created successfully:', JSON.stringify(responseData));
      
      // Extrahiere die daily.co URL aus der Antwort
      const conversationId = responseData.id;
      const conversationUrl = responseData.url;
      
      if (!conversationUrl || !conversationId) {
        console.error('Missing conversation URL or ID in Tavus response:', responseData);
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

      // Update the interview in Supabase with Tavus response data
      try {
        const { data: updateData, error: updateError } = await supabase
          .from('conversations')
          .update({
            conversation_id: conversationId,
            conversation_url: conversationUrl,
            status: 'active',
            replica_id: DEFAULT_REPLICA_ID,
            persona_id: DEFAULT_PERSONA_ID
          })
          .eq('id', requestData.interview_id)
          .select();

        if (updateError) {
          console.error('Error updating interview:', updateError);
        } else {
          console.log('Interview updated successfully:', updateData);
        }
      } catch (dbError) {
        console.error('Database update error:', dbError);
      }

      // Return successful response with the URL that the frontend will open
      return new Response(
        JSON.stringify({
          id: conversationId,
          url: conversationUrl,
          interview_id: requestData.interview_id,
          status: 'active'
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
