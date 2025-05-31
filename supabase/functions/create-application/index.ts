
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ApplicationRequest {
  jobId: string;
  name: string;
  email: string;
  linkedinProfile?: string;
  cvFile?: File;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const formData = await req.formData();
    const jobId = formData.get('jobId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const linkedinProfile = formData.get('linkedinProfile') as string || null;
    const cvFile = formData.get('cvFile') as File | null;

    console.log('Creating application for:', { jobId, name, email });

    // Check if user already exists
    const { data: existingUser } = await supabaseClient.auth.admin.getUserByEmail(email);
    
    let userId: string;
    let isNewUser = false;
    let generatedPassword: string | null = null;

    if (existingUser.user) {
      // User exists, we'll need them to login
      userId = existingUser.user.id;
      console.log('User already exists:', userId);
    } else {
      // Create new user account
      isNewUser = true;
      generatedPassword = crypto.randomUUID();
      
      const { data: newUser, error: signUpError } = await supabaseClient.auth.admin.createUser({
        email,
        password: generatedPassword,
        user_metadata: {
          name,
          role: 'user'
        },
        email_confirm: true // Auto-confirm email
      });

      if (signUpError || !newUser.user) {
        throw new Error(`Failed to create user: ${signUpError?.message}`);
      }

      userId = newUser.user.id;
      console.log('Created new user:', userId);
    }

    // Upload CV if provided
    let resumeUrl: string | null = null;
    if (cvFile) {
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from('resumes')
        .upload(fileName, cvFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('CV upload error:', uploadError);
      } else {
        const { data: urlData } = supabaseClient.storage
          .from('resumes')
          .getPublicUrl(fileName);
        resumeUrl = urlData.publicUrl;
        console.log('CV uploaded:', resumeUrl);
      }
    }

    // Create application record
    const { data: application, error: applicationError } = await supabaseClient
      .from('applications')
      .insert({
        job_id: jobId,
        talent_id: userId,
        applicant_name: name,
        applicant_email: email,
        linkedin_profile: linkedinProfile,
        resume_url: resumeUrl,
        status: 'new'
      })
      .select()
      .single();

    if (applicationError) {
      throw new Error(`Failed to create application: ${applicationError.message}`);
    }

    console.log('Application created:', application.id);

    // Return response with user info
    return new Response(JSON.stringify({
      success: true,
      application: application,
      user: {
        id: userId,
        email,
        isNewUser,
        generatedPassword: isNewUser ? generatedPassword : undefined
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in create-application function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
