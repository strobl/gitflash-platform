
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Define types for the request payload
type RequestPayload = {
  jobId: string;
};

// Define the Supabase client with admin rights to bypass RLS
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  { auth: { persistSession: false } }
);

// Set up CORS headers for the function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    // Get the authenticated user
    const token = authHeader.replace("Bearer ", "");
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    // Parse request body
    const { jobId } = await req.json() as RequestPayload;
    if (!jobId) {
      throw new Error("Missing job ID");
    }

    // Get job details and verify ownership
    const { data: job, error: jobError } = await supabaseAdmin
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .eq("user_id", user.id)
      .single();

    if (jobError || !job) {
      throw new Error("Job not found or you don't have permission to access it");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Get price ID from environment variable
    const priceId = Deno.env.get("STRIPE_PRICE_JOB_POST");
    if (!priceId) {
      throw new Error("STRIPE_PRICE_JOB_POST is not set");
    }

    // Retrieve price information from Stripe
    const price = await stripe.prices.retrieve(priceId);
    const amount = price.unit_amount || 0;
    const currency = price.currency || "eur";

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        }
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?job_id=${jobId}`,
      cancel_url: `${req.headers.get("origin")}/unternehmen/jobs`,
      client_reference_id: jobId,
      customer_email: user.email,
      metadata: {
        jobId,
      }
    });

    // Update job status
    await supabaseAdmin
      .from("jobs")
      .update({ status: "PendingPayment" })
      .eq("id", jobId);

    // Create payment record
    await supabaseAdmin.from("payments").insert({
      job_id: jobId,
      user_id: user.id,
      amount,
      currency,
      status: "created",
      stripe_session_id: session.id,
    });

    // Return session URL to client
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${errorMessage}`);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
