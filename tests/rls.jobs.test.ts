
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../src/integrations/supabase/types";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";

const mockJobs = [
  {
    title: "Test Job 1",
    description: "Test job description",
    location: "Berlin",
    contract_type: "Vollzeit",
    billing_type: "Festpreis",
    status: "Aktiv",
    user_id: "", // Will be filled later
  },
  {
    title: "Test Job 2",
    description: "Another test job description",
    location: "München",
    contract_type: "Teilzeit",
    billing_type: "Stundensatz",
    status: "draft", // This one is not active yet
    user_id: "", // Will be filled later
  },
];

// Helper function to sign in as a specific user
const signInAs = async (email: string, password: string): Promise<SupabaseClient<Database>> => {
  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return supabase;
};

describe("RLS Policies for jobs table", () => {
  let ownerClient: SupabaseClient<Database>;
  let strangerClient: SupabaseClient<Database>;
  let adminClient: SupabaseClient<Database>;
  let ownerUserId: string;
  let strangerUserId: string;
  let adminUserId: string;
  let jobIds: string[] = [];

  // Setup: Create test users and jobs
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

    // Set user_id in mock jobs
    mockJobs[0].user_id = ownerUserId;
    mockJobs[1].user_id = ownerUserId;

    // Insert test jobs
    for (const job of mockJobs) {
      const { data, error } = await ownerClient
        .from("jobs")
        .insert(job)
        .select("id")
        .single();
      
      if (error) throw error;
      if (data) jobIds.push(data.id);
    }
  });

  // Cleanup: Delete test jobs
  afterAll(async () => {
    if (jobIds.length > 0) {
      await adminClient.from("jobs").delete().in("id", jobIds);
    }
  });

  describe("SELECT operations", () => {
    test("Owner can read their own active job", async () => {
      const { data, error } = await ownerClient
        .from("jobs")
        .select()
        .eq("id", jobIds[0]);
      
      expect(error).toBeNull();
      expect(data?.length).toBe(1);
    });

    test("Owner can read their own draft job", async () => {
      const { data, error } = await ownerClient
        .from("jobs")
        .select()
        .eq("id", jobIds[1]);
      
      expect(error).toBeNull();
      expect(data?.length).toBe(1);
    });

    test("Stranger can read active job from other user", async () => {
      const { data, error } = await strangerClient
        .from("jobs")
        .select()
        .eq("id", jobIds[0]);
      
      expect(error).toBeNull();
      expect(data?.length).toBe(1);
    });

    test("Stranger cannot read draft job from other user", async () => {
      const { data, error } = await strangerClient
        .from("jobs")
        .select()
        .eq("id", jobIds[1]);
      
      expect(data?.length).toBe(0); // Should return empty result, not an error
    });

    test("Admin can read active job from other user", async () => {
      const { data, error } = await adminClient
        .from("jobs")
        .select()
        .eq("id", jobIds[0]);
      
      expect(error).toBeNull();
      expect(data?.length).toBe(1);
    });

    test("Admin can read draft job from other user", async () => {
      const { data, error } = await adminClient
        .from("jobs")
        .select()
        .eq("id", jobIds[1]);
      
      expect(error).toBeNull();
      expect(data?.length).toBe(1);
    });
  });

  describe("UPDATE operations", () => {
    test("Owner can update their own job", async () => {
      const { error } = await ownerClient
        .from("jobs")
        .update({ title: "Updated Job Title" })
        .eq("id", jobIds[0]);
      
      expect(error).toBeNull();
    });

    test("Stranger cannot update job from other user", async () => {
      const { error } = await strangerClient
        .from("jobs")
        .update({ title: "Hacked Job Title" })
        .eq("id", jobIds[0]);
      
      expect(error).not.toBeNull();
    });

    test("Admin can update job from other user", async () => {
      const { error } = await adminClient
        .from("jobs")
        .update({ title: "Admin Updated Job Title" })
        .eq("id", jobIds[0]);
      
      expect(error).toBeNull();
    });
  });
});
