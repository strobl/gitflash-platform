
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

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      
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

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Error in handle-stripe-webhook function:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
