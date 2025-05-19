
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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

    // Check if the user is an admin
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      throw new Error("Profile not found");
    }

    if (profile.role !== "operator" && profile.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    // Get total revenue from successful payments
    const { data: totalRevenue, error: revenueError } = await supabase
      .rpc('get_total_revenue');

    if (revenueError) {
      throw new Error("Error fetching total revenue");
    }

    // Get payments by month for the current year
    const currentYear = new Date().getFullYear();
    const { data: monthlyRevenue, error: monthlyError } = await supabase
      .rpc('get_monthly_revenue', { year: currentYear });

    if (monthlyError) {
      throw new Error("Error fetching monthly revenue");
    }

    // Get recent payments
    const { data: recentPayments, error: paymentsError } = await supabase
      .from("payments")
      .select(`
        id, 
        amount, 
        currency, 
        status, 
        created_at,
        profiles:user_id (name),
        jobs:job_id (title)
      `)
      .eq("status", "succeeded")
      .order("created_at", { ascending: false })
      .limit(10);

    if (paymentsError) {
      throw new Error("Error fetching recent payments");
    }

    return new Response(JSON.stringify({
      totalRevenue: totalRevenue || 0,
      monthlyRevenue: monthlyRevenue || [],
      recentPayments: recentPayments || []
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in get-payment-stats function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
