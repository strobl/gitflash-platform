
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

// Function must be public to receive webhooks from Stripe
serve(async (req) => {
  try {
    const stripeSignature = req.headers.get("stripe-signature");
    if (!stripeSignature) {
      return new Response("No stripe signature", { status: 400 });
    }

    // Get the raw request body
    const body = await req.text();
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2023-10-16",
    });

    // Verify the event using the webhook signing secret
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        stripeSignature,
        Deno.env.get("STRIPE_WEBHOOK_SECRET")!
      );
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed.`, err);
      return new Response(`Webhook signature verification failed.`, { status: 400 });
    }

    // Initialize Supabase client using the service role key to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!, {
      auth: {
        persistSession: false,
      }
    });

    console.log(`Processing webhook event: ${event.type}`);

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      
      console.log(`Processing successful checkout: ${session.id}`);
      
      // Update payment status
      const { error: paymentUpdateError } = await supabase
        .from("payments")
        .update({ 
          status: "succeeded", 
          stripe_payment_intent_id: session.payment_intent,
          updated_at: new Date().toISOString()
        })
        .eq("stripe_session_id", session.id);

      if (paymentUpdateError) {
        console.error("Error updating payment:", paymentUpdateError);
        return new Response(JSON.stringify({ error: "Error updating payment" }), { status: 500 });
      }

      // Update job status
      const jobId = session.metadata?.jobId;
      if (jobId) {
        const { error: jobUpdateError } = await supabase
          .from("jobs")
          .update({ 
            is_paid: true,
            status: "In Prüfung", // Set to pending admin review
            updated_at: new Date().toISOString()
          })
          .eq("id", jobId);

        if (jobUpdateError) {
          console.error("Error updating job:", jobUpdateError);
          return new Response(JSON.stringify({ error: "Error updating job" }), { status: 500 });
        }
      }
    }

    // Handle the payment_intent.payment_failed event
    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      
      console.log(`Processing payment failure: ${paymentIntent.id}`);
      
      // Get the session ID from the payment intent
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });
      
      if (sessions.data.length > 0) {
        const sessionId = sessions.data[0].id;
        
        // Update payment status
        const { error: paymentUpdateError } = await supabase
          .from("payments")
          .update({ 
            status: "failed", 
            updated_at: new Date().toISOString()
          })
          .eq("stripe_session_id", sessionId);

        if (paymentUpdateError) {
          console.error("Error updating payment:", paymentUpdateError);
          return new Response(JSON.stringify({ error: "Error updating payment" }), { status: 500 });
        }
      }
    }

    // Handle charge.refunded event
    if (event.type === "charge.refunded") {
      const charge = event.data.object;
      
      console.log(`Processing refund for charge: ${charge.id}`);
      
      // Find payment with this charge's payment intent
      const paymentIntentId = charge.payment_intent;
      
      if (paymentIntentId) {
        const { data: payments, error: paymentError } = await supabase
          .from("payments")
          .select("*")
          .eq("stripe_payment_intent_id", paymentIntentId);
          
        if (paymentError) {
          console.error("Error finding payment:", paymentError);
        } else if (payments && payments.length > 0) {
          const payment = payments[0];
          
          // Update payment status
          const { error: updateError } = await supabase
            .from("payments")
            .update({
              status: "refunded",
              updated_at: new Date().toISOString()
            })
            .eq("id", payment.id);
            
          if (updateError) {
            console.error("Error updating payment status:", updateError);
          }
          
          // Update refund request if exists
          const { data: refundRequests } = await supabase
            .from("refund_requests")
            .select("*")
            .eq("payment_id", payment.id)
            .eq("status", "pending");
            
          if (refundRequests && refundRequests.length > 0) {
            await supabase
              .from("refund_requests")
              .update({
                status: "approved",
                updated_at: new Date().toISOString()
              })
              .eq("id", refundRequests[0].id);
          }
          
          // Update job status
          await supabase
            .from("jobs")
            .update({
              is_paid: false,
              status: "Zahlung erstattet",
              updated_at: new Date().toISOString()
            })
            .eq("id", payment.job_id);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Error in handle-stripe-webhook function:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
