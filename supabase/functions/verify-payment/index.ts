
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

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
    // Get the request body
    const { sessionId } = await req.json();
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    // Initialize Supabase client using the anon key for authentication
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

    // Get the authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      throw new Error("Authentication failed");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2023-10-16",
    });

    // Get the Stripe checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      throw new Error("Stripe session not found");
    }

    // Get the payment from our database
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select("*, jobs(*)")
      .eq("stripe_session_id", sessionId)
      .eq("user_id", user.id)
      .single();

    if (paymentError) {
      throw new Error("Payment not found");
    }

    // If the session is paid but our database doesn't reflect it yet,
    // update our database (as a fallback if webhook didn't work)
    if (session.payment_status === "paid" && payment.status !== "succeeded") {
      // Update payment status
      const { error: updatePaymentError } = await supabase
        .from("payments")
        .update({ 
          status: "succeeded", 
          stripe_payment_intent_id: session.payment_intent,
          updated_at: new Date().toISOString()
        })
        .eq("id", payment.id);

      if (updatePaymentError) {
        console.error("Error updating payment:", updatePaymentError);
      }

      // Update job status
      const { error: updateJobError } = await supabase
        .from("jobs")
        .update({ 
          is_paid: true,
          status: "In Prüfung", // Set to pending admin review
          updated_at: new Date().toISOString()
        })
        .eq("id", payment.job_id);

      if (updateJobError) {
        console.error("Error updating job:", updateJobError);
      }
    }

    // Return the payment and session information
    return new Response(JSON.stringify({
      payment: {
        id: payment.id,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        created_at: payment.created_at
      },
      job: payment.jobs,
      session: {
        id: session.id,
        payment_status: session.payment_status
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in verify-payment function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
