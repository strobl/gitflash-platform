
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Database } from "../_shared/database.types.ts";

// This edge function listens to Realtime changes on application_status_history
// and broadcasts notifications to the appropriate parties

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get the request body
    const body = await req.json();
    
    // Extract status change information
    const { record } = body;
    if (!record) {
      return new Response(
        JSON.stringify({ error: "No record found in payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Get the application details to determine who should be notified
    const supabaseClient = createClient<Database>(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Get application details
    const { data: application, error: applicationError } = await supabaseClient
      .from("applications")
      .select(`
        id,
        job_id,
        status,
        talent_id,
        talent_profiles(user_id),
        jobs(title, user_id)
      `)
      .eq("id", record.application_id)
      .single();
    
    if (applicationError || !application) {
      console.error("Error fetching application:", applicationError);
      return new Response(
        JSON.stringify({ error: "Error fetching application details" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Broadcast status change to the application channel
    // This will be picked up by talents and recruiters who are subscribed to this channel
    await supabaseClient
      .channel("application-status")
      .send({
        type: "broadcast",
        event: "status_changed",
        payload: {
          application_id: application.id,
          old_status: record.old_status,
          new_status: record.new_status,
          changed_at: record.changed_at,
          job_title: application.jobs?.title || "Unknown Job",
        },
      });
    
    // Optionally send external notifications (email, slack, etc.)
    // This is just a placeholder for now
    await notifyExternal(application, record);
    
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Placeholder function for external notifications
async function notifyExternal(application: any, statusChange: any) {
  // In a future implementation, this could send emails or Slack notifications
  console.log("External notification would be sent for:", {
    application_id: application.id,
    job_title: application.jobs?.title || "Unknown Job",
    old_status: statusChange.old_status,
    new_status: statusChange.new_status,
    talent_user_id: application.talent_profiles?.user_id,
    recruiter_user_id: application.jobs?.user_id
  });
}
