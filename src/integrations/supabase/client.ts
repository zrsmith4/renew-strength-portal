// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://izikncebdvtnddtmsdfa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6aWtuY2ViZHZ0bmRkdG1zZGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMDUxNTAsImV4cCI6MjA2Mzg4MTE1MH0.k-hoMB9Ivtc4XGSoSeUM3JZPNxiX8RxZfZuDR7Doz9k";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);