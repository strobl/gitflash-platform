
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.8.0';
import * as jose from 'https://deno.land/x/jose@v4.13.1/index.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Access environment variables
const TAVUS_API_KEY = Deno.env.get('TAVUS_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const SUPABASE_JWT_SECRET = Deno.env.get('SUPABASE_JWT_SECRET') || '';

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
      // Use Supabase client to get user from token
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
    
    // Check if user has a valid role (either 'business' or 'user')
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
        JSON.stringify({ error: 'API key not configured' }),
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

    // Apply role-based permissions:
    // - Business users can only start conversations they created
    // - Talent users (role='user') can start any active/pending conversations
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
    } else if (profileData.role === 'user') {
      // Talent users are allowed to start any active/pending conversation
      console.log('Talent user is starting an interview');
      // No additional permission check needed - any talent can start any interview
    } else {
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

    // Call Tavus API to create a conversation - UPDATED ACCORDING TO DOCS
    console.log('Calling Tavus API...');
    
    // Format the request body according to Tavus API documentation
    const tavusRequestBody = {
      replica_id: requestData.replica_id || undefined,
      persona_id: requestData.persona_id || undefined,
      conversation_name: requestData.conversation_name,
      conversational_context: requestData.conversation_context || undefined,
      custom_greeting: requestData.custom_greeting || undefined,
      properties: {
        max_call_duration: parseInt(requestData.max_call_duration) || 600,
        participant_left_timeout: parseInt(requestData.participant_left_timeout) || 30,
        participant_absent_timeout: parseInt(requestData.participant_absent_timeout) || 300,
        language: requestData.language || 'deutsch',
      }
    };
    
    console.log('Tavus API request body:', JSON.stringify(tavusRequestBody));
    
    const tavusResponse = await fetch('https://api.tavus.io/v2/conversations', {
      method: 'POST',
      headers: {
        'x-api-key': TAVUS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tavusRequestBody),
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

    // Update the interview in Supabase with Tavus response data
    try {
      const { data: updateData, error: updateError } = await supabase
        .from('conversations')
        .update({
          conversation_id: responseData.conversation_id || responseData.id,
          conversation_url: responseData.conversation_url || responseData.url,
          status: responseData.status || 'active',
        })
        .eq('id', requestData.interview_id)
        .select();

      if (updateError) {
        console.error('Error updating interview:', updateError);
        return new Response(
          JSON.stringify({
            error: 'Failed to update interview',
            details: updateError
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Interview updated successfully:', updateData);
    } catch (dbError) {
      console.error('Database update error:', dbError);
      // Continue even if database update fails
    }

    // Return successful response
    return new Response(
      JSON.stringify({
        ...responseData,
        interview_id: requestData.interview_id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in start-conversation function:', error.message);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
