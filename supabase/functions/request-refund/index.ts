
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
    const { paymentId, reason } = await req.json();
    if (!paymentId) {
      throw new Error("Payment ID is required");
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

    // Initialize Supabase client with service role key for admin operations
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseAdmin = createClient(supabaseUrl!, supabaseServiceKey!, {
      auth: {
        persistSession: false,
      }
    });

    // Get the payment details
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select("*, jobs!inner(*)")
      .eq("id", paymentId)
      .single();

    if (paymentError || !payment) {
      throw new Error("Payment not found");
    }

    // Check if the user owns the job
    if (payment.user_id !== user.id) {
      throw new Error("You do not have permission to request a refund for this payment");
    }

    // Check if the payment status allows for refunds
    if (payment.status !== "succeeded") {
      throw new Error("Only successful payments can be refunded");
    }

    // Create a refund request record
    const { data: refundRequest, error: refundRequestError } = await supabaseAdmin
      .from("refund_requests")
      .insert({
        payment_id: paymentId,
        user_id: user.id,
        reason: reason,
        status: "pending",
      })
      .select()
      .single();

    if (refundRequestError) {
      throw new Error(`Error creating refund request: ${refundRequestError.message}`);
    }

    // Optional: If you want to process refunds automatically:
    // const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
    //   apiVersion: "2023-10-16",
    // });
    // 
    // if (payment.stripe_payment_intent_id) {
    //   // Process the refund through Stripe
    //   await stripe.refunds.create({
    //     payment_intent: payment.stripe_payment_intent_id,
    //     reason: 'requested_by_customer'
    //   });
    //   
    //   // Update payment status in database
    //   await supabaseAdmin
    //     .from("payments")
    //     .update({ status: "refunded" })
    //     .eq("id", paymentId);
    //   
    //   // Update refund request status
    //   await supabaseAdmin
    //     .from("refund_requests")
    //     .update({ status: "approved" })
    //     .eq("id", refundRequest.id);
    // }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Refund request submitted successfully", 
        requestId: refundRequest.id 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in request-refund function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
