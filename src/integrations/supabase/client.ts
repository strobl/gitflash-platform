
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gehhxwqlhzsesxzqleks.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaGh4d3FsaHpzZXN4enFsZWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNzkxOTYsImV4cCI6MjA2MTc1NTE5Nn0.n0xnb83NgWgJFA1eZ6K_36N_JhePnmiEYnRS-vHEcWM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
