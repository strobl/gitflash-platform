
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../src/integrations/supabase/types";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";

// Helper function to sign in as a specific user
const signInAs = async (email: string, password: string): Promise<SupabaseClient<Database>> => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return supabase;
};

describe("RLS Policies for profiles table", () => {
  let ownerClient: SupabaseClient<Database>;
  let strangerClient: SupabaseClient<Database>;
  let adminClient: SupabaseClient<Database>;
  let ownerUserId: string;
  let strangerUserId: string;
  let adminUserId: string;

  // Setup: Create test users
  beforeAll(async () => {
    // Setup clients
    ownerClient = await signInAs("owner@example.com", "password123");
    strangerClient = await signInAs("stranger@example.com", "password123");
    adminClient = await signInAs("admin@example.com", "password123");

    // Get user IDs
    const { data: ownerData } = await ownerClient.auth.getUser();
    const { data: strangerData } = await strangerClient.auth.getUser();
    const { data: adminData } = await adminClient.auth.getUser();

    ownerUserId = ownerData.user?.id || "";
    strangerUserId = strangerData.user?.id || "";
    adminUserId = adminData.user?.id || "";
  });

  describe("SELECT operations", () => {
    test("User can read their own profile", async () => {
      const { data, error } = await ownerClient
        .from("profiles")
        .select()
        .eq("id", ownerUserId);
      
      expect(error).toBeNull();
      expect(data?.length).toBe(1);
    });

    test("Stranger cannot read profile from other user", async () => {
      const { data, error } = await strangerClient
        .from("profiles")
        .select()
        .eq("id", ownerUserId);
      
      expect(data?.length).toBe(0); // Should return empty result, not an error
    });

    test("Admin can read profile from other user", async () => {
      const { data, error } = await adminClient
        .from("profiles")
        .select()
        .eq("id", ownerUserId);
      
      expect(error).toBeNull();
      expect(data?.length).toBe(1);
    });
  });

  describe("UPDATE operations", () => {
    test("User can update their own profile", async () => {
      const { error } = await ownerClient
        .from("profiles")
        .update({ location: "Berlin" })
        .eq("id", ownerUserId);
      
      expect(error).toBeNull();
    });

    test("Stranger cannot update profile from other user", async () => {
      const { error } = await strangerClient
        .from("profiles")
        .update({ location: "Hacked Location" })
        .eq("id", ownerUserId);
      
      expect(error).not.toBeNull();
    });

    test("Admin can update profile from other user", async () => {
      const { error } = await adminClient
        .from("profiles")
        .update({ location: "Admin Updated Location" })
        .eq("id", ownerUserId);
      
      expect(error).toBeNull();
    });
  });
});
